"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, Clock, User } from "lucide-react"

const mockQueries = [
    {
        id: 1,
        student: "Rahul Sharma",
        email: "rahul@example.com",
        subject: "Assignment Submission Issue",
        message: "I'm unable to submit my assignment. The submit button is not working.",
        status: "pending",
        time: "2 hours ago",
    },
    {
        id: 2,
        student: "Priya Patel",
        email: "priya@example.com",
        subject: "Library Access",
        message: "How can I get access to the digital library?",
        status: "resolved",
        time: "5 hours ago",
    },
    {
        id: 3,
        student: "Amit Kumar",
        email: "amit@example.com",
        subject: "Exam Schedule Query",
        message: "When will the mid-term exam schedule be released?",
        status: "pending",
        time: "1 day ago",
    },
]

export default function AdminQueryPage() {
    const [queries] = useState(mockQueries)
    const [searchQuery, setSearchQuery] = useState("")

    const filteredQueries = queries.filter(
        (query) =>
            query.student.toLowerCase().includes(searchQuery.toLowerCase()) ||
            query.subject.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground">Admin Query Management</h1>
                <p className="text-muted-foreground">Manage and respond to student queries</p>
            </div>

            {/* Search */}
            <Card className="rounded-2xl border-none bg-card shadow-sm">
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search queries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 rounded-xl"
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Queries List */}
            <div className="grid gap-4">
                {filteredQueries.map((query) => (
                    <Card key={query.id} className="rounded-2xl border border-border bg-card shadow-md">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="font-semibold text-foreground">{query.subject}</h3>
                                        <Badge
                                            variant={query.status === "pending" ? "destructive" : "default"}
                                            className="rounded-full"
                                        >
                                            {query.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                                        <span className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            {query.student}
                                        </span>
                                        <span>{query.email}</span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {query.time}
                                        </span>
                                    </div>
                                    <p className="text-muted-foreground">{query.message}</p>
                                </div>
                                <Button className="rounded-xl">Respond</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
