"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { BookOpen, FileText, Plus, Upload, Trash2, X, File, Link as LinkIcon } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Subject {
    id: string
    name: string
    subtitle: string
}

interface Resource {
    id: number
    subjectId: string
    title: string
    fileUrl?: string
    content?: string
    fileType: "pdf" | "text"
    date: string
}

export default function AdminStudyHubPage() {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [resources, setResources] = useState<Resource[]>([])

    // Dialog States
    const [showAddResource, setShowAddResource] = useState(false)
    const [showAddSubject, setShowAddSubject] = useState(false)
    const [viewSubjectId, setViewSubjectId] = useState<string | null>(null)

    // Form States
    const [newSubjectName, setNewSubjectName] = useState("")
    const [newSubjectSubtitle, setNewSubjectSubtitle] = useState("")

    const [resourceSubject, setResourceSubject] = useState("")
    const [resourceTitle, setResourceTitle] = useState("")
    const [resourceType, setResourceType] = useState<"pdf" | "text">("pdf")
    const [textContent, setTextContent] = useState("")
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch("/api/study-hub")
            const data = await res.json()
            setSubjects(data.subjects || [])
            setResources(data.resources || [])
        } catch (error) {
            console.error("Failed to fetch data", error)
        }
    }

    const handleAddSubject = async () => {
        if (!newSubjectName) return

        try {
            await fetch("/api/study-hub", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "subject",
                    name: newSubjectName,
                    subtitle: newSubjectSubtitle
                })
            })
            fetchData()
            setShowAddSubject(false)
            setNewSubjectName("")
            setNewSubjectSubtitle("")
        } catch (error) {
            console.error("Failed to add subject", error)
        }
    }

    const handleFileUpload = async (file: File) => {
        const formData = new FormData()
        formData.append("file", file)

        const res = await fetch("/api/upload", {
            method: "POST",
            body: formData
        })

        if (!res.ok) throw new Error("Upload failed")

        const data = await res.json()
        return data.url
    }

    const handleAddResource = async () => {
        if (!resourceSubject || !resourceTitle) return

        try {
            setUploading(true)
            let fileUrl = ""

            if (resourceType === "pdf" && selectedFile) {
                fileUrl = await handleFileUpload(selectedFile)
            }

            await fetch("/api/study-hub", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    type: "resource",
                    subjectId: resourceSubject,
                    title: resourceTitle,
                    fileType: resourceType,
                    fileUrl: fileUrl,
                    content: textContent
                })
            })

            fetchData()
            setShowAddResource(false)
            // Reset form
            setResourceTitle("")
            setResourceType("pdf")
            setTextContent("")
            setSelectedFile(null)
            setResourceSubject("")
        } catch (error) {
            console.error("Failed to add resource", error)
        } finally {
            setUploading(false)
        }
    }

    const handleDeleteResource = async (id: number) => {
        if (!confirm("Delete this resource?")) return

        try {
            await fetch(`/api/study-hub?id=${id}&type=resource`, {
                method: "DELETE"
            })
            fetchData()
        } catch (error) {
            console.error("Failed to delete resource", error)
        }
    }

    const getSubjectResources = (subjectId: string) => {
        return resources.filter(r => r.subjectId === subjectId)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-foreground">Admin Study Hub</h1>
                    <p className="text-muted-foreground">Manage study resources and materials</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={() => setShowAddSubject(true)} variant="outline" className="rounded-xl">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Subject
                    </Button>
                    <Button onClick={() => setShowAddResource(true)} className="rounded-xl">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Resource
                    </Button>
                </div>
            </div>

            {/* Add Subject Dialog */}
            <Dialog open={showAddSubject} onOpenChange={setShowAddSubject}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add New Subject</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Subject Name</Label>
                            <Input
                                placeholder="e.g. Machine Learning"
                                value={newSubjectName}
                                onChange={(e) => setNewSubjectName(e.target.value)}
                                className="rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Subtitle (Optional)</Label>
                            <Input
                                placeholder="e.g. Advanced AI Concepts"
                                value={newSubjectSubtitle}
                                onChange={(e) => setNewSubjectSubtitle(e.target.value)}
                                className="rounded-xl"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddSubject} className="rounded-xl">Create Subject</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Add Resource Dialog */}
            <Dialog open={showAddResource} onOpenChange={setShowAddResource}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Add Study Resource</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label>Subject</Label>
                            <Select value={resourceSubject} onValueChange={setResourceSubject}>
                                <SelectTrigger className="rounded-xl">
                                    <SelectValue placeholder="Select a subject" />
                                </SelectTrigger>
                                <SelectContent>
                                    {subjects.map(s => (
                                        <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Resource Title</Label>
                            <Input
                                placeholder="e.g. Unit 1 Notes"
                                value={resourceTitle}
                                onChange={(e) => setResourceTitle(e.target.value)}
                                className="rounded-xl"
                            />
                        </div>

                        <Tabs value={resourceType} onValueChange={(v: any) => setResourceType(v)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 rounded-xl">
                                <TabsTrigger value="pdf" className="rounded-lg">PDF Document</TabsTrigger>
                                <TabsTrigger value="text" className="rounded-lg">Text Content</TabsTrigger>
                            </TabsList>
                            <TabsContent value="pdf" className="space-y-4 mt-4">
                                <div
                                    className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:bg-muted/50 transition-colors cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept=".pdf,.doc,.docx"
                                        onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                                    />
                                    <div className="flex flex-col items-center gap-2">
                                        <Upload className="h-8 w-8 text-muted-foreground" />
                                        {selectedFile ? (
                                            <p className="text-sm font-medium text-primary">{selectedFile.name}</p>
                                        ) : (
                                            <>
                                                <p className="text-sm font-medium">Click to upload file</p>
                                                <p className="text-xs text-muted-foreground">PDF, DOC up to 10MB</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="text" className="mt-4">
                                <Textarea
                                    placeholder="Enter study notes content..."
                                    className="min-h-[150px] rounded-xl resize-none"
                                    value={textContent}
                                    onChange={(e) => setTextContent(e.target.value)}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleAddResource} disabled={uploading} className="rounded-xl">
                            {uploading ? "Uploading..." : "Add Resource"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* View Resources Dialog */}
            <Dialog open={!!viewSubjectId} onOpenChange={(open) => !open && setViewSubjectId(null)}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>
                            {subjects.find(s => s.id === viewSubjectId)?.name} Resources
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto pr-2">
                        {viewSubjectId && getSubjectResources(viewSubjectId).length === 0 ? (
                            <p className="text-center text-muted-foreground py-8">No resources added yet.</p>
                        ) : (
                            viewSubjectId && getSubjectResources(viewSubjectId).map(resource => (
                                <div key={resource.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50 border border-border">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className="h-10 w-10 shrink-0 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                            {resource.fileType === 'pdf' ? <File className="h-5 w-5" /> : <FileText className="h-5 w-5" />}
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="font-medium truncate">{resource.title}</h4>
                                            <p className="text-xs text-muted-foreground">{resource.date}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 shrink-0">
                                        {resource.fileType === 'pdf' && resource.fileUrl && (
                                            <Button variant="ghost" size="icon" className="rounded-lg" asChild>
                                                <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                                    <LinkIcon className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="rounded-lg text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleDeleteResource(resource.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </DialogContent>
            </Dialog>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                    <Card key={subject.id} className="rounded-2xl border border-border bg-card shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                                    <BookOpen className="h-6 w-6 text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-foreground mb-1 truncate">{subject.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-3 truncate">{subject.subtitle}</p>
                                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                                        <FileText className="h-3 w-3" />
                                        {getSubjectResources(subject.id).length} Resources
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="rounded-xl w-full"
                                        onClick={() => setViewSubjectId(subject.id)}
                                    >
                                        Manage Resources
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
