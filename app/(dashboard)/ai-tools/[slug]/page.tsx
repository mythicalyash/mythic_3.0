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
    "notes-summarizer": {
        name: "Notes Summarizer",
        description: "Upload notes or paste text to get concise summaries and key insights.",
        icon: FileText,
        placeholder: "Paste your notes here or upload a document...",
        chips: [
            { icon: FileText, label: "Summarize Notes" },
            { icon: Search, label: "Extract Key Points" },
            { icon: Sparkles, label: "Simplify Text" },
            { icon: Languages, label: "Translate Notes" },
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
        if (!input.trim() && !selectedFile) return

        setIsLoading(true)
        setOutput("")

        try {
            let response;
            if (selectedFile) {
                const formData = new FormData()
                formData.append("tool", slug)
                formData.append("prompt", input)
                formData.append("file", selectedFile)

                response = await fetch("/api/gemini", {
                    method: "POST",
                    body: formData,
                })
            } else {
                response = await fetch("/api/gemini", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tool: slug,
                        prompt: input,
                    }),
                })
            }

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

    const [selectedFile, setSelectedFile] = useState<File | null>(null)

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        if (file.type === "application/pdf") {
            setSelectedFile(file)
            // Clear input if it was just a placeholder or previous file content
            // But we might want to keep user's typed prompt.
        } else {
            // For non-PDFs, we can still read as text or treat as file.
            // For now, let's treat text files as text input as before, or maybe just use file API for everything?
            // The user specifically asked for PDF to be stored as PDF.
            // Let's stick to the plan: PDF -> File API. Text -> Text Input (legacy behavior) or File API?
            // Simpler to keep text files as text input for now unless requested otherwise.
            const reader = new FileReader()
            reader.onload = (e) => {
                const text = e.target?.result as string
                setInput((prev) => (prev ? `${prev}\n\n${text}` : text))
            }
            reader.readAsText(file)
        }
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
                        {selectedFile && (
                            <div className="mt-2 flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-sm">
                                <FileText className="h-4 w-4 text-primary" />
                                <span className="flex-1 truncate">{selectedFile.name}</span>
                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="relative">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                accept=".txt,.md,.json,.csv,.pdf"
                                onChange={handleFileUpload}
                            />
                            <Button
                                variant="outline"
                                className="gap-2 rounded-xl"
                                onClick={() => document.getElementById("file-upload")?.click()}
                            >
                                <FileCode className="h-4 w-4" />
                                Upload Document
                            </Button>
                        </div>
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
