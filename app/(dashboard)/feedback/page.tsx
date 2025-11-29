"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
    AlertTriangle,
    Palette,
    Lightbulb,
    MessageSquare,
    Send,
    ArrowLeft,
    CheckCircle2,
    Mail,
    Phone,
    MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"

const categories = [
    {
        id: "issue",
        title: "Report an Issue",
        description: "Something isn't working as expected? Let us know.",
        icon: AlertTriangle,
        color: "text-red-500",
        bg: "bg-red-500/10",
        borderColor: "hover:border-red-500/50",
    },
    {
        id: "ui-ux",
        title: "UI/UX Suggestions",
        description: "Ideas to improve the look and feel of the platform.",
        icon: Palette,
        color: "text-purple-500",
        bg: "bg-purple-500/10",
        borderColor: "hover:border-purple-500/50",
    },
    {
        id: "feature",
        title: "Feature Requests",
        description: "Have an idea for a new feature? We'd love to hear it.",
        icon: Lightbulb,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        borderColor: "hover:border-amber-500/50",
    },
    {
        id: "general",
        title: "General Feedback",
        description: "Any other thoughts or feedback you'd like to share.",
        icon: MessageSquare,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        borderColor: "hover:border-blue-500/50",
    },
]

export default function FeedbackPage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
    const [submitted, setSubmitted] = useState(false)

    const handleCategoryClick = (id: string) => {
        setSelectedCategory(id)
        setSubmitted(false)
    }

    const handleBack = () => {
        setSelectedCategory(null)
        setSubmitted(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate submission
        setTimeout(() => {
            setSubmitted(true)
        }, 500)
    }

    const activeCategory = categories.find((c) => c.id === selectedCategory)

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground">Feedback Center</h1>
                <p className="text-muted-foreground">
                    Help us improve your experience by sharing your thoughts and suggestions.
                </p>
            </div>

            {!selectedCategory ? (
                <div className="space-y-8">
                    <div className="grid gap-6 md:grid-cols-2">
                        {categories.map((category) => (
                            <Card
                                key={category.id}
                                className={cn(
                                    "group cursor-pointer transition-all hover:shadow-md border-2 border-transparent",
                                    category.borderColor
                                )}
                                onClick={() => handleCategoryClick(category.id)}
                            >
                                <CardContent className="p-6 flex items-start gap-4">
                                    <div
                                        className={cn(
                                            "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110",
                                            category.bg
                                        )}
                                    >
                                        <category.icon className={cn("h-6 w-6", category.color)} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg text-foreground mb-1">
                                            {category.title}
                                        </h3>
                                        <p className="text-muted-foreground">{category.description}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Contact Us Section */}
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold text-foreground">Contact Us</h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
                                        <Mail className="h-6 w-6 text-blue-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Email Us</h3>
                                        <p className="text-sm text-muted-foreground mt-1">support@mythics.com</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
                                        <Phone className="h-6 w-6 text-green-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Call Us</h3>
                                        <p className="text-sm text-muted-foreground mt-1">+1 (555) 123-4567</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-none shadow-sm bg-card hover:shadow-md transition-shadow">
                                <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                                        <MapPin className="h-6 w-6 text-orange-500" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground">Visit Us</h3>
                                        <p className="text-sm text-muted-foreground mt-1">123 Campus Drive, Tech City</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            ) : (
                <Card className="max-w-2xl mx-auto border-none shadow-lg">
                    <CardHeader>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-fit mb-2 -ml-2 text-muted-foreground hover:text-foreground"
                            onClick={handleBack}
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Back to Categories
                        </Button>
                        <div className="flex items-center gap-3">
                            <div
                                className={cn(
                                    "flex h-10 w-10 items-center justify-center rounded-lg",
                                    activeCategory?.bg
                                )}
                            >
                                {activeCategory && (
                                    <activeCategory.icon className={cn("h-5 w-5", activeCategory.color)} />
                                )}
                            </div>
                            <CardTitle>{activeCategory?.title}</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {submitted ? (
                            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                                <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold">Thank You!</h3>
                                <p className="text-muted-foreground max-w-md">
                                    Your feedback has been submitted successfully. We appreciate your input and will review it shortly.
                                </p>
                                <Button onClick={handleBack} className="mt-4">
                                    Submit Another
                                </Button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Subject</Label>
                                    <Input
                                        id="subject"
                                        placeholder="Brief summary of your feedback"
                                        required
                                        className="rounded-xl"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Please provide detailed feedback..."
                                        required
                                        className="min-h-[150px] rounded-xl resize-none"
                                    />
                                </div>
                                <div className="flex justify-end pt-2">
                                    <Button type="submit" className="rounded-xl px-6">
                                        <Send className="h-4 w-4 mr-2" />
                                        Submit Feedback
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
