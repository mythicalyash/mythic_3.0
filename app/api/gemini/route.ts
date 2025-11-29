import { NextRequest, NextResponse } from "next/server"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { aiConfig } from "@/lib/ai-config"

export async function POST(req: NextRequest) {
    try {
        const { tool, prompt } = await req.json()

        if (!tool || !prompt) {
            return NextResponse.json(
                { error: "Missing tool or prompt" },
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

        const result = await chat.sendMessage(prompt)
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

