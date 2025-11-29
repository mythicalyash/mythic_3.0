"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ToolCard } from "@/components/ai-tools/tool-card"
import {
  Search,
  Sparkles,
  ImageIcon,
  Code2,
  MessageSquare,
  Briefcase,
  PenTool,
  BarChart3,
  Languages,
  Lightbulb,
  Music,
  Video,
  Bot,
} from "lucide-react"

const categories = ["All", "Content", "Code", "Productivity", "Writing", "Design"]

const tools = [
  {
    name: "AI Writer",
    description: "Generate high-quality content, articles, and blog posts with AI assistance.",
    icon: PenTool,
    category: "Writing",
    isPopular: true,
    href: "/ai-tools/ai-writer",
  },
  {
    name: "Code Assistant",
    description: "Get help with coding, debugging, and code optimization across multiple languages.",
    icon: Code2,
    category: "Code",
    isPopular: true,
    href: "/ai-tools/code-assistant",
  },
  {
    name: "Image Generator",
    description: "Create stunning images and artwork from text descriptions using AI.",
    icon: ImageIcon,
    category: "Design",
    isNew: true,
    href: "/ai-tools/image-generator",
  },

  {
    name: "Document Analyzer",
    description: "Extract insights, summarize, and analyze documents with AI.",
    icon: ImageIcon,
    category: "Content",
    isPopular: true,
    href: "/ai-tools/document-analyzer",
  },

  {
    name: "Video Summarizer",
    description: "Get quick summaries and key points from video content.",
    icon: Video,
    category: "Content",
    href: "/ai-tools/video-summarizer",
  },
  {
    name: "AI Assistant",
    description: "Your personal AI assistant for tasks, research, and daily activities.",
    icon: Bot,
    category: "Productivity",
    isNew: true,
    href: "/ai-tools/ai-assistant",
  },
]

export default function AIToolsPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTools = tools.filter((tool) => {
    const matchesCategory = activeCategory === "All" || tool.category === activeCategory
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#AAC4F5] to-[#8AB0F0] p-8 text-white shadow-lg">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white" />
          <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-white" />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            AI-Powered Tools
          </div>
          <h1 className="mb-3 text-3xl font-bold">AI Tools</h1>
          <p className="text-white/90">
            Discover powerful AI tools to boost your productivity, creativity, and workflow. From content generation to
            code assistance, we've got you covered.
          </p>
        </div>
        {/* Decorative illustration area */}
        <div className="absolute -bottom-4 -right-4 hidden h-40 w-40 md:block">
          <img
            src="/placeholder.svg?key=jn7sw"
            alt="AI illustration"
            className="h-full w-full object-contain opacity-80"
          />
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search AI tools..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-xl border-none bg-card pl-11 py-5 shadow-sm focus-visible:ring-primary"
        />
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "ghost"}
            className={`rounded-xl px-4 whitespace-nowrap ${activeCategory === category
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card hover:bg-muted text-foreground"
              }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredTools.map((tool) => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>

      {/* Empty State */}
      {filteredTools.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">No tools found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
