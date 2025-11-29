"use client"

import { useState } from "react"
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

// Mock Data for Subjects
const subjects = [
    {
        id: "java",
        name: "JAVA",
        subtitle: "Object Oriented Programming",
        icon: Code2,
        resources: [
            { name: "Books", icon: Book },
            { name: "eBooks", icon: BookOpen },
            { name: "PDF Notes", icon: FileText },
            { name: "Summarized Notes", icon: Files, badge: "New", badgeColor: "bg-[#27C46B]" },
            { name: "Generate Flashcards", icon: BrainCircuit },
            { name: "Practice Questions", icon: HelpCircle },
        ],
    },
    {
        id: "dsa",
        name: "DSA",
        subtitle: "Data Structures & Algorithms",
        icon: Cpu,
        resources: [
            { name: "Books", icon: Book },
            { name: "eBooks", icon: BookOpen },
            { name: "PDF Notes", icon: FileText, badge: "Popular", badgeColor: "bg-[#FFA146]" },
            { name: "Summarized Notes", icon: Files },
            { name: "Generate Flashcards", icon: BrainCircuit },
            { name: "Practice Questions", icon: HelpCircle },
        ],
    },
    {
        id: "dbms",
        name: "DBMS",
        subtitle: "Database Management Systems",
        icon: Database,
        resources: [
            { name: "Books", icon: Book },
            { name: "eBooks", icon: BookOpen },
            { name: "PDF Notes", icon: FileText },
            { name: "Summarized Notes", icon: Files },
            { name: "Generate Flashcards", icon: BrainCircuit },
            { name: "Practice Questions", icon: HelpCircle, badge: "New", badgeColor: "bg-[#27C46B]" },
        ],
    },
    {
        id: "os",
        name: "OS",
        subtitle: "Operating Systems",
        icon: Layout,
        resources: [
            { name: "Books", icon: Book },
            { name: "eBooks", icon: BookOpen },
            { name: "PDF Notes", icon: FileText },
            { name: "Summarized Notes", icon: Files },
            { name: "Generate Flashcards", icon: BrainCircuit },
            { name: "Practice Questions", icon: HelpCircle },
        ],
    },
    {
        id: "web-dev",
        name: "Web Development",
        subtitle: "Full Stack Development",
        icon: Globe,
        resources: [
            { name: "Books", icon: Book },
            { name: "eBooks", icon: BookOpen },
            { name: "PDF Notes", icon: FileText },
            { name: "Summarized Notes", icon: Files },
            { name: "Generate Flashcards", icon: BrainCircuit, badge: "Popular", badgeColor: "bg-[#FFA146]" },
            { name: "Practice Questions", icon: HelpCircle },
        ],
    },
    {
        id: "cn",
        name: "Computer Network",
        subtitle: "Network Fundamentals",
        icon: Network,
        resources: [
            { name: "Books", icon: Book },
            { name: "eBooks", icon: BookOpen },
            { name: "PDF Notes", icon: FileText },
            { name: "Summarized Notes", icon: Files },
            { name: "Generate Flashcards", icon: BrainCircuit },
            { name: "Practice Questions", icon: HelpCircle },
        ],
    },
]

export default function StudyHubPage() {
    const [semester, setSemester] = useState("Semester 1")
    const [department, setDepartment] = useState("CSE – Computer Science Engineering")
    // Track open state for each card independently
    const [openCards, setOpenCards] = useState<Record<string, boolean>>({})

    const toggleCard = (id: string) => {
        setOpenCards((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <div className="space-y-8">
            {/* Top Bar */}
            <div className="flex flex-col gap-4 rounded-2xl border border-border bg-[#f5f5f5] p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Study Hub</h1>
                    <p className="text-sm text-muted-foreground">Access all your learning resources in one place</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                    {/* Semester Selector */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-full justify-between gap-2 rounded-xl bg-white sm:w-40">
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
                            <Button variant="outline" className="w-full justify-between gap-2 rounded-xl bg-white sm:w-72">
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
                    const isOpen = openCards[subject.id] || false
                    return (
                        <div
                            key={subject.id}
                            className={cn(
                                "relative transition-all duration-200",
                                isOpen ? "z-50" : "z-0"
                            )}
                        >
                            <Card className="overflow-visible rounded-2xl border-border bg-card shadow-sm transition-all hover:shadow-md">
                                <CardHeader className="bg-white p-6 relative z-20 rounded-2xl">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0077c0]/10 text-[#0077c0]">
                                                <subject.icon className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-bold text-foreground">{subject.name}</CardTitle>
                                                <p className="text-sm text-muted-foreground">{subject.subtitle}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => toggleCard(subject.id)}
                                            className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-muted"
                                        >
                                            <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
                                        </Button>
                                    </div>
                                </CardHeader>

                                {/* Floating Content */}
                                <div
                                    className={cn(
                                        "absolute left-0 right-0 top-[calc(100%-1rem)] bg-white rounded-b-2xl border border-t-0 border-border shadow-lg transition-all duration-200 ease-in-out overflow-hidden z-10",
                                        isOpen ? "max-h-[500px] opacity-100 pt-6" : "max-h-0 opacity-0 pt-0"
                                    )}
                                >
                                    <CardContent className="p-6">
                                        <div className="grid grid-cols-2 gap-3">
                                            {subject.resources.map((resource, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-white p-4 text-center transition-colors hover:border-[#0077c0]/30 hover:bg-[#0077c0]/5 cursor-pointer"
                                                >
                                                    {resource.badge && (
                                                        <Badge
                                                            className={`absolute -right-2 -top-2 px-1.5 py-0.5 text-[10px] text-white hover:bg-opacity-90 ${resource.badgeColor}`}
                                                        >
                                                            {resource.badge}
                                                        </Badge>
                                                    )}
                                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#AAC4F5]/20 text-[#0077c0] group-hover:bg-[#0077c0] group-hover:text-white transition-colors">
                                                        <resource.icon className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-xs font-medium text-foreground">{resource.name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
