"use client"

import { useState, useEffect } from "react"
import {
    Book,
    FileText,
    Files,
    BrainCircuit,
    HelpCircle,
    ChevronDown,
    BookOpen,
    Code2,
    Database,
    Layout,
    Cpu,
    Globe,
    Network,
    ArrowLeft,
    File,
    Link as LinkIcon,
    Download
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

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

export default function StudyHubPage() {
    const [semester, setSemester] = useState("Semester 1")
    const [department, setDepartment] = useState("CSE – Computer Science Engineering")

    const [subjects, setSubjects] = useState<Subject[]>([])
    const [resources, setResources] = useState<Resource[]>([])
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null)

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

    const getSubjectResources = (subjectId: string) => {
        return resources.filter(r => r.subjectId === subjectId)
    }

    // Icon mapping helper (optional, can fallback to BookOpen)
    const getSubjectIcon = (name: string) => {
        const lower = name.toLowerCase()
        if (lower.includes("java")) return Code2
        if (lower.includes("dsa")) return Cpu
        if (lower.includes("dbms")) return Database
        if (lower.includes("os")) return Layout
        if (lower.includes("web")) return Globe
        if (lower.includes("network")) return Network
        return BookOpen
    }

    if (selectedSubject) {
        const subjectResources = getSubjectResources(selectedSubject.id)
        const SubjectIcon = getSubjectIcon(selectedSubject.name)

        return (
            <div className="space-y-6">
                <Button
                    variant="ghost"
                    onClick={() => setSelectedSubject(null)}
                    className="gap-2 pl-0 hover:bg-transparent hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Subjects
                </Button>

                <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <SubjectIcon className="h-8 w-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">{selectedSubject.name}</h1>
                        <p className="text-muted-foreground">{selectedSubject.subtitle}</p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {subjectResources.length === 0 ? (
                        <Card className="rounded-2xl border-dashed border-2 border-border bg-muted/30">
                            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                                <FileText className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
                                <h3 className="text-lg font-semibold">No resources yet</h3>
                                <p className="text-muted-foreground">Check back later for study materials.</p>
                            </CardContent>
                        </Card>
                    ) : (
                        subjectResources.map((resource) => (
                            <Card key={resource.id} className="rounded-xl border border-border bg-card hover:shadow-md transition-all">
                                <CardContent className="p-4 flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 overflow-hidden">
                                        <div className="h-12 w-12 shrink-0 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            {resource.fileType === 'pdf' ? <File className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="font-semibold text-foreground truncate">{resource.title}</h3>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <span>{resource.date}</span>
                                                <span>•</span>
                                                <span className="uppercase">{resource.fileType}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {resource.fileType === 'pdf' && resource.fileUrl && (
                                        <Button className="rounded-xl shrink-0" asChild>
                                            <a href={resource.fileUrl} target="_blank" rel="noopener noreferrer">
                                                <Download className="h-4 w-4 mr-2" />
                                                Download
                                            </a>
                                        </Button>
                                    )}
                                    {resource.fileType === 'text' && (
                                        <Button variant="outline" className="rounded-xl shrink-0">
                                            View
                                        </Button>
                                    )}
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            {/* Top Bar */}
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-muted/50 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Study Hub</h1>
                    <p className="text-sm text-muted-foreground">Access all your learning resources in one place</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    {/* Semester Selector */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between gap-2 rounded-xl bg-background sm:w-40">
                                {semester}
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40 rounded-xl">
                            {["Semester 1", "Semester 2", "Semester 3", "Semester 4", "Semester 5", "Semester 6"].map((sem) => (
                                <DropdownMenuItem key={sem} onClick={() => setSemester(sem)}>
                                    {sem}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Department Selector */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between gap-2 rounded-xl bg-background sm:w-72">
                                <span className="truncate">{department}</span>
                                <ChevronDown className="h-4 w-4 text-muted-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-72 rounded-xl">
                            {[
                                "CSE – Computer Science Engineering",
                                "ECE – Electronics & Communication",
                                "ME – Mechanical Engineering",
                                "CE – Civil Engineering",
                            ].map((dept) => (
                                <DropdownMenuItem key={dept} onClick={() => setDepartment(dept)}>
                                    {dept}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* Subject Cards Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {subjects.map((subject) => {
                    const SubjectIcon = getSubjectIcon(subject.name)
                    const resourceCount = getSubjectResources(subject.id).length

                    return (
                        <Card
                            key={subject.id}
                            className="group cursor-pointer overflow-hidden rounded-2xl border-border bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/50"
                            onClick={() => setSelectedSubject(subject)}
                        >
                            <CardHeader className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <SubjectIcon className="h-6 w-6" />
                                    </div>
                                    <Badge variant="secondary" className="rounded-lg bg-muted text-muted-foreground">
                                        {resourceCount} Resources
                                    </Badge>
                                </div>
                                <CardTitle className="text-xl font-bold text-foreground mb-1">{subject.name}</CardTitle>
                                <p className="text-sm text-muted-foreground">{subject.subtitle}</p>
                            </CardHeader>
                            <CardContent className="p-6 pt-0">
                                <div className="flex items-center text-sm text-primary font-medium">
                                    View Materials
                                    <ArrowLeft className="h-4 w-4 ml-1 rotate-180 transition-transform group-hover:translate-x-1" />
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}
