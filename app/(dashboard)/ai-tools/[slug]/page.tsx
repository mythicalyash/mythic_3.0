"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
    Code2,
    Terminal,
    RefreshCw,
    FileCode,
    Languages,
    PenTool,
    Sparkles,
    ImageIcon,
    Video,
    Bot,
    FileText,
    Search,
    Wand2,
    Image as LucideImage,
    Music,
    Mic,
} from "lucide-react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"

// Define the data for each tool
const toolData: Record<
    string,
    {
        name: string
        description: string
        icon: any
        placeholder: string
        chips: { icon: any; label: string }[]
    }
> = {
    "ai-writer": {
        name: "AI Writer",
        description: "Generate high-quality content, articles, and blog posts with AI assistance.",
        icon: PenTool,
        placeholder: "What would you like to write about today?",
        chips: [
            { icon: FileText, label: "Write a Blog Post" },
            { icon: Sparkles, label: "Improve Writing" },
            { icon: Languages, label: "Translate Text" },
            { icon: Search, label: "SEO Optimization" },
        ],
    },
    "code-assistant": {
        name: "Code Assistant",
        description:
            "Generate code instantly with AI. Transform ideas into clean, functional code in seconds. Perfect for developers and beginners alike.",
        icon: Code2,
        placeholder: "How can I help? Describe your agent and I'll build it.",
        chips: [
            { icon: Terminal, label: "Generate Unit Tests" },
            { icon: RefreshCw, label: "Refactor Code" },
            { icon: FileCode, label: "Generate Boilerplate Code" },
            { icon: Languages, label: "Translate Code" },
            { icon: Code2, label: "Implement Features" },
        ],
    },
    "image-generator": {
        name: "Image Generator",
        description: "Create stunning images and artwork from text descriptions using AI.",
        icon: ImageIcon,
        placeholder: "Describe the image you want to create...",
        chips: [
            { icon: LucideImage, label: "Realistic Photo" },
            { icon: Wand2, label: "Digital Art" },
            { icon: ImageIcon, label: "Logo Design" },
            { icon: Sparkles, label: "Enhance Image" },
        ],
    },
    "document-analyzer": {
        name: "Document Analyzer",
        description: "Extract insights, summarize, and analyze documents with AI.",
        icon: FileText,
        placeholder: "Paste text or describe the document you want to analyze...",
        chips: [
            { icon: FileText, label: "Summarize Document" },
            { icon: Search, label: "Extract Key Points" },
            { icon: Languages, label: "Translate Document" },
            { icon: Sparkles, label: "Analyze Sentiment" },
        ],
    },
    "video-summarizer": {
        name: "Video Summarizer",
        description: "Get quick summaries and key points from video content.",
        icon: Video,
        placeholder: "Paste a video link or transcript to summarize...",
        chips: [
            { icon: Video, label: "Summarize Video" },
            { icon: Search, label: "Extract Highlights" },
            { icon: FileText, label: "Generate Transcript" },
            { icon: Languages, label: "Translate Subtitles" },
        ],
    },
    "ai-assistant": {
        name: "AI Assistant",
        description: "Your personal AI assistant for tasks, research, and daily activities.",
        icon: Bot,
        placeholder: "How can I help you today?",
        chips: [
            { icon: Search, label: "Research Topic" },
            { icon: Sparkles, label: "Brainstorm Ideas" },
            { icon: FileText, label: "Draft Email" },
            { icon: Mic, label: "Voice Command" },
        ],
    },
}

export default function ToolPage() {
    const params = useParams()
    const slug = params.slug as string
    const tool = toolData[slug]

    const [input, setInput] = useState("")
    const [output, setOutput] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    if (!tool) {
        return notFound()
    }

    const Icon = tool.icon

    const handleGenerate = async () => {
        if (!input.trim()) return

        setIsLoading(true)
        setOutput("")

        try {
            const response = await fetch("/api/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    tool: slug,
                    prompt: input,
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate content")
            }

            setOutput(data.result)
        } catch (error) {
            console.error("Error:", error)
            setOutput("An error occurred while generating content. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleChipClick = (label: string) => {
        setInput((prev) => (prev ? `${prev} ${label}` : label))
    }

    return (
        <div className="flex min-h-[calc(100vh-4rem)] flex-col">
            {/* Breadcrumb */}
            <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
                <Link href="/" className="hover:text-foreground">
                    Home
                </Link>
                <span>/</span>
                <Link href="/ai-tools" className="hover:text-foreground">
                    Tools
                </Link>
                <span>/</span>
                <span className="text-foreground">{tool.name}</span>
            </div>

            <div className="flex flex-1 flex-col items-center justify-center text-center">
                {/* Hero Section */}
                <div className="mb-8 max-w-2xl">
                    <div className="mb-6 flex justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <Icon className="h-8 w-8" />
                        </div>
                    </div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">{tool.name}</h1>
                    <p className="text-lg text-muted-foreground">{tool.description}</p>
                </div>

                {/* Input Section */}
                <div className="w-full max-w-3xl rounded-2xl border bg-card p-4 shadow-sm">
                    <div className="mb-4">
                        <Textarea
                            placeholder={tool.placeholder}
                            className="min-h-[120px] resize-none border-none bg-transparent text-lg focus-visible:ring-0"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button variant="outline" className="gap-2 rounded-xl">
                            <Terminal className="h-4 w-4" />
                            Options
                        </Button>
                        <Button
                            className="gap-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                            onClick={handleGenerate}
                            disabled={isLoading || !input.trim()}
                        >
                            {isLoading ? (
                                <>
                                    <RefreshCw className="h-4 w-4 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    Generate
                                    <Sparkles className="h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Output Section */}
                {output && (
                    <div className="mt-8 w-full max-w-3xl rounded-2xl border bg-card p-6 shadow-sm text-left">
                        <h3 className="mb-4 text-lg font-semibold">Generated Output</h3>
                        <div className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap">
                            {output}
                        </div>
                        <div className="mt-4 flex justify-end gap-2">
                            <Button variant="outline" size="sm" className="rounded-xl" onClick={() => navigator.clipboard.writeText(output)}>
                                Copy
                            </Button>
                        </div>
                    </div>
                )}

                {/* Suggestion Chips */}
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                    {tool.chips.map((chip, index) => (
                        <SuggestionChip
                            key={index}
                            icon={chip.icon}
                            label={chip.label}
                            onClick={() => handleChipClick(chip.label)}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

function SuggestionChip({ icon: Icon, label, onClick }: { icon: any; label: string; onClick?: () => void }) {
    return (
        <button
            className="flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            onClick={onClick}
        >
            <Icon className="h-4 w-4" />
            {label}
        </button>
    )
}
