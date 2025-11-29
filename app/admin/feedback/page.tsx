"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, User, Calendar } from "lucide-react"

const mockFeedback = [
    {
        id: 1,
        student: "Rahul Sharma",
        rating: 5,
        category: "Platform",
        feedback: "Great platform! Very helpful for studies.",
        date: "2024-01-15",
        status: "pending",
    },
    {
        id: 2,
        student: "Priya Patel",
        rating: 4,
        category: "Study Hub",
        feedback: "Study materials are good but need more examples.",
        date: "2024-01-14",
        status: "reviewed",
    },
    {
        id: 3,
        student: "Amit Kumar",
        rating: 5,
        category: "AI Tools",
        feedback: "AI tools are amazing and very useful!",
        date: "2024-01-13",
        status: "pending",
    },
]

export default function FeedbackPage() {
    const [feedback] = useState(mockFeedback)

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground">Feedback Review</h1>
                <p className="text-muted-foreground">Review and respond to student feedback</p>
            </div>

            <div className="grid gap-4">
                {feedback.map((item) => (
                    <Card key={item.id} className="rounded-2xl border border-border bg-card shadow-md">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`h-4 w-4 ${i < item.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                        <Badge variant="outline" className="rounded-full">
                                            {item.category}
                                        </Badge>
                                        <Badge
                                            variant={item.status === "pending" ? "destructive" : "default"}
                                            className="rounded-full"
                                        >
                                            {item.status}
                                        </Badge>
                                    </div>
                                    <p className="text-foreground mb-3">{item.feedback}</p>
                                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                            <User className="h-4 w-4" />
                                            {item.student}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="h-4 w-4" />
                                            {item.date}
                                        </span>
                                    </div>
                                </div>
                                <Button className="rounded-xl">Mark as Reviewed</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
