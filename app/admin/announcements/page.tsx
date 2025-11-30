"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Megaphone, Calendar, Plus, Pencil, Trash2, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Announcement {
    id: number
    title: string
    content: string
    date: string
    author: string
    type: "new" | "warning" | "info"
}

export default function AnnouncementsPage() {
    const [announcements, setAnnouncements] = useState<Announcement[]>([])
    const [showForm, setShowForm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentId, setCurrentId] = useState<number | null>(null)

    // Form State
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [type, setType] = useState<"new" | "warning" | "info">("info")

    // Fetch Announcements
    useEffect(() => {
        fetchAnnouncements()
    }, [])

    const fetchAnnouncements = async () => {
        try {
            const res = await fetch("/api/announcements")
            const data = await res.json()
            setAnnouncements(data)
        } catch (error) {
            console.error("Failed to fetch announcements", error)
        }
    }

    const resetForm = () => {
        setTitle("")
        setContent("")
        setType("info")
        setIsEditing(false)
        setCurrentId(null)
        setShowForm(false)
    }

    const handleEdit = (announcement: Announcement) => {
        setTitle(announcement.title)
        setContent(announcement.content)
        setType(announcement.type)
        setCurrentId(announcement.id)
        setIsEditing(true)
        setShowForm(true)
    }

    const handleSubmit = async () => {
        if (!title || !content) return

        const payload = { title, content, type }

        try {
            if (isEditing && currentId) {
                // Update
                await fetch("/api/announcements", {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: currentId, ...payload }),
                })
            } else {
                // Create
                await fetch("/api/announcements", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                })
            }
            fetchAnnouncements()
            resetForm()
        } catch (error) {
            console.error("Failed to save announcement", error)
        }
    }

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure you want to delete this announcement?")) return

        try {
            await fetch(`/api/announcements?id=${id}`, {
                method: "DELETE",
            })
            fetchAnnouncements()
        } catch (error) {
            console.error("Failed to delete announcement", error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
                    <p className="text-muted-foreground">Create and manage announcements</p>
                </div>
                <Button onClick={() => setShowForm(true)} className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    New Announcement
                </Button>
            </div>

            {/* Create/Edit Dialog */}
            <Dialog open={showForm} onOpenChange={(open) => !open && resetForm()}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? "Edit Announcement" : "Create New Announcement"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                placeholder="Announcement title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="type">Type</Label>
                            <Select value={type} onValueChange={(val: any) => setType(val)}>
                                <SelectTrigger className="rounded-xl">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="new">New (Blue)</SelectItem>
                                    <SelectItem value="warning">Warning (Orange)</SelectItem>
                                    <SelectItem value="info">Info (Light Blue)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Announcement content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="rounded-xl min-h-[120px] resize-none"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={resetForm} className="rounded-xl">
                            Cancel
                        </Button>
                        <Button onClick={handleSubmit} className="rounded-xl">
                            {isEditing ? "Update" : "Publish"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Announcements List */}
            <div className="grid gap-4">
                {announcements.map((announcement) => (
                    <Card key={announcement.id} className="rounded-2xl border border-border bg-card shadow-md">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-start gap-4">
                                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${announcement.type === 'warning' ? 'bg-orange-500/10' :
                                        announcement.type === 'new' ? 'bg-blue-500/10' : 'bg-sky-500/10'
                                    }`}>
                                    <Megaphone className={`h-6 w-6 ${announcement.type === 'warning' ? 'text-orange-500' :
                                            announcement.type === 'new' ? 'text-blue-500' : 'text-sky-500'
                                        }`} />
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
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(announcement)}
                                        className="rounded-xl"
                                    >
                                        <Pencil className="h-4 w-4 mr-2" />
                                        Edit
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="sm"
                                        onClick={() => handleDelete(announcement.id)}
                                        className="rounded-xl"
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
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
