"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Megaphone, Calendar, Plus } from "lucide-react"

const mockAnnouncements = [
    {
        id: 1,
        title: "Mid-Term Exam Schedule Released",
        content: "The mid-term examination schedule has been released. Please check your dashboard.",
        date: "2024-01-15",
        author: "Admin",
    },
    {
        id: 2,
        title: "Library Maintenance",
        content: "The library will be closed for maintenance on Saturday.",
        date: "2024-01-14",
        author: "Admin",
    },
    {
        id: 3,
        title: "New Study Materials Available",
        content: "New study materials for Semester 5 are now available in the Study Hub.",
        date: "2024-01-13",
        author: "Admin",
    },
]

export default function AnnouncementsPage() {
    const [announcements] = useState(mockAnnouncements)
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
                    <p className="text-muted-foreground">Create and manage announcements</p>
                </div>
                <Button onClick={() => setShowForm(!showForm)} className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    New Announcement
                </Button>
            </div>

            {/* Create Form */}
            {showForm && (
                <Card className="rounded-2xl border border-border bg-card shadow-md">
                    <CardHeader>
                        <CardTitle>Create New Announcement</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" placeholder="Announcement title" className="rounded-xl mt-2" />
                        </div>
                        <div>
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Announcement content"
                                className="rounded-xl mt-2 min-h-32"
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button className="rounded-xl">Publish</Button>
                            <Button variant="outline" onClick={() => setShowForm(false)} className="rounded-xl">
                                Cancel
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Announcements List */}
            <div className="grid gap-4">
                {announcements.map((announcement) => (
                    <Card key={announcement.id} className="rounded-2xl border border-border bg-card shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
                                    <Megaphone className="h-6 w-6 text-orange-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground mb-2">{announcement.title}</h3>
                                    <p className="text-muted-foreground mb-3">{announcement.content}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {announcement.date}
                                        </span>
                                        <span>By {announcement.author}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" className="rounded-xl">
                                        Edit
                                    </Button>
                                    <Button variant="destructive" size="sm" className="rounded-xl">
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
