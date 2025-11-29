"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Plus } from "lucide-react"

const subjects = ["JAVA", "DSA", "DBMS", "OS", "Web Development", "Computer Network"]

export default function AdminStudyHubPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold text-foreground">Admin Study Hub</h1>
                    <p className="text-muted-foreground">Manage study resources and materials</p>
                </div>
                <Button className="rounded-xl">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Resource
                </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {subjects.map((subject) => (
                    <Card key={subject} className="rounded-2xl border border-border bg-card shadow-md hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
                                    <BookOpen className="h-6 w-6 text-blue-500" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground mb-2">{subject}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">Manage resources</p>
                                    <Button variant="outline" size="sm" className="rounded-xl w-full">
                                        <FileText className="h-4 w-4 mr-2" />
                                        View Resources
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
