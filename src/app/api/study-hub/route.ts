import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "study-hub.json")

async function getData() {
    try {
        const data = await fs.readFile(dataFilePath, "utf8")
        return JSON.parse(data)
    } catch (error) {
        return { subjects: [], resources: [] }
    }
}

async function saveData(data: any) {
    await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2))
}

export async function GET() {
    const data = await getData()
    return NextResponse.json(data)
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const data = await getData()

        if (body.type === "subject") {
            const newSubject = {
                id: body.name.toLowerCase().replace(/\s+/g, '-'),
                name: body.name,
                subtitle: body.subtitle || "Study Material"
            }
            data.subjects.push(newSubject)
            await saveData(data)
            return NextResponse.json(newSubject)
        }
        else if (body.type === "resource") {
            const newResource = {
                id: Date.now(),
                subjectId: body.subjectId,
                title: body.title,
                fileUrl: body.fileUrl,
                fileType: body.fileType, // 'pdf' or 'text'
                content: body.content, // for text type
                date: new Date().toISOString().split('T')[0]
            }
            data.resources.push(newResource)
            await saveData(data)
            return NextResponse.json(newResource)
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to save data" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const id = Number(searchParams.get("id"))
        const type = searchParams.get("type")

        const data = await getData()

        if (type === "resource") {
            data.resources = data.resources.filter((r: any) => r.id !== id)
            await saveData(data)
            return NextResponse.json({ success: true })
        }

        return NextResponse.json({ error: "Invalid type" }, { status: 400 })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
    }
}
