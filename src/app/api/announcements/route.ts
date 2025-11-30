import { NextRequest, NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

const dataFilePath = path.join(process.cwd(), "data", "announcements.json")

// Helper to read data
async function getAnnouncements() {
    try {
        const data = await fs.readFile(dataFilePath, "utf8")
        return JSON.parse(data)
    } catch (error) {
        return []
    }
}

// Helper to write data
async function saveAnnouncements(announcements: any[]) {
    await fs.writeFile(dataFilePath, JSON.stringify(announcements, null, 2))
}

export async function GET() {
    const announcements = await getAnnouncements()
    return NextResponse.json(announcements)
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const announcements = await getAnnouncements()

        const newAnnouncement = {
            id: Date.now(), // Simple ID generation
            ...body,
            date: new Date().toISOString().split('T')[0], // Current date YYYY-MM-DD
            author: "Admin" // Default author
        }

        announcements.unshift(newAnnouncement) // Add to top
        await saveAnnouncements(announcements)

        return NextResponse.json(newAnnouncement)
    } catch (error) {
        return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 })
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json()
        const { id, ...updates } = body

        const announcements = await getAnnouncements()
        const index = announcements.findIndex((a: any) => a.id === id)

        if (index === -1) {
            return NextResponse.json({ error: "Announcement not found" }, { status: 404 })
        }

        announcements[index] = { ...announcements[index], ...updates }
        await saveAnnouncements(announcements)

        return NextResponse.json(announcements[index])
    } catch (error) {
        return NextResponse.json({ error: "Failed to update announcement" }, { status: 500 })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url)
        const id = Number(searchParams.get("id"))

        let announcements = await getAnnouncements()
        announcements = announcements.filter((a: any) => a.id !== id)

        await saveAnnouncements(announcements)

        return NextResponse.json({ success: true })
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete announcement" }, { status: 500 })
    }
}
