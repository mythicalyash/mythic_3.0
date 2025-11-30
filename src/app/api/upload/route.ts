import { NextRequest, NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const file = formData.get("file") as File

        if (!file) {
            return NextResponse.json({ error: "No file received" }, { status: 400 })
        }

        const buffer = Buffer.from(await file.arrayBuffer())
        const filename = Date.now() + "_" + file.name.replaceAll(" ", "_")
        const uploadDir = path.join(process.cwd(), "public/uploads")

        await writeFile(path.join(uploadDir, filename), buffer)

        return NextResponse.json({
            url: `/uploads/${filename}`,
            filename: file.name
        })
    } catch (error) {
        console.error("Upload error:", error)
        return NextResponse.json({ error: "Upload failed" }, { status: 500 })
    }
}
