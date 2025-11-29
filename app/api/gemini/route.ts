import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { GoogleAIFileManager } from "@google/generative-ai/server"
import { aiConfig } from "@/lib/ai-config"
import { writeFile, unlink } from "fs/promises"
import { join } from "path"
import { tmpdir } from "os"

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get("content-type") || ""
        let tool, prompt, file

        if (contentType.includes("multipart/form-data")) {
            const formData = await req.formData()
            tool = formData.get("tool") as string
            prompt = formData.get("prompt") as string
            file = formData.get("file") as File
        } else {
            const body = await req.json()
            tool = body.tool
            prompt = body.prompt
        }

        if (!tool || (!prompt && !file)) {
            return NextResponse.json(
                { error: "Missing tool, prompt, or file" },
                { status: 400 }
            )
        }

        const config = aiConfig[tool]
        if (!config) {
            return NextResponse.json(
                { error: "Invalid tool selected" },
                { status: 400 }
            )
        }

        const apiKey = process.env.GEMINI_API_KEY
        if (!apiKey) {
            return NextResponse.json(
                { error: "GEMINI_API_KEY is not set in environment variables" },
                { status: 500 }
            )
        }

        const genAI = new GoogleGenerativeAI(apiKey)
        const model = genAI.getGenerativeModel({ model: config.model })

        let fileUri = null
        let mimeType = null

        if (file) {
            const fileManager = new GoogleAIFileManager(apiKey)
            const bytes = await file.arrayBuffer()
            const buffer = Buffer.from(bytes)

            // Write to temp file
            const tempFilePath = join(tmpdir(), `upload-${Date.now()}-${file.name}`)
            await writeFile(tempFilePath, buffer)

            try {
                const uploadResult = await fileManager.uploadFile(tempFilePath, {
                    mimeType: file.type || "application/pdf",
                    displayName: file.name,
                })

                fileUri = uploadResult.file.uri
                mimeType = uploadResult.file.mimeType
            } finally {
                // Clean up temp file
                await unlink(tempFilePath).catch(console.error)
            }
        }

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: config.systemPrompt }],
                },
                {
                    role: "model",
                    parts: [{ text: "Understood. I am ready to assist you as per your instructions." }],
                },
            ],
            generationConfig: {
                temperature: config.temperature || 0.7,
            },
        })

        let result
        if (fileUri && mimeType) {
            result = await chat.sendMessage([
                {
                    fileData: {
                        mimeType: mimeType,
                        fileUri: fileUri,
                    },
                },
                { text: prompt || "Summarize this document." },
            ])
        } else {
            result = await chat.sendMessage(prompt)
        }

        const response = await result.response
        const text = response.text()

        return NextResponse.json({ result: text })
    } catch (error) {
        console.error("Error generating content:", error)
        const errorMessage = error instanceof Error ? error.message : "Failed to generate content"
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        )
    }
}

