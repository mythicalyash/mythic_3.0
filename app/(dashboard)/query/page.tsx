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
  Plus,
  Search,
  TrendingUp,
  Clock,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QuestionCard } from "@/components/query/question-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const tabs = ["Newest", "Active", "Unanswered", "Frequent"]
const filterTags = ["javascript", "typescript", "react", "nextjs", "css", "node", "python", "database"]

const questions = [
  {
    id: "1",
    title: "How do I handle async/await errors properly in JavaScript?",
    summary:
      "I'm trying to understand the best practices for error handling when using async/await. Should I use try-catch blocks everywhere or is there a better pattern?",
    author: { name: "Alex Smith", avatar: "/placeholder.svg?key=alex", initials: "AS" },
    tags: ["javascript", "async", "error-handling"],
    votes: 42,
    answers: 5,
    views: 1234,
    hasAcceptedAnswer: true,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    title: "What's the difference between Server Components and Client Components in Next.js?",
    summary:
      "I'm new to Next.js 14 and confused about when to use Server Components vs Client Components. Can someone explain the key differences?",
    author: { name: "Sarah Chen", avatar: "/placeholder.svg?key=sarah", initials: "SC" },
    tags: ["nextjs", "react", "server-components"],
    votes: 38,
    answers: 3,
    views: 892,
    hasAcceptedAnswer: true,
    createdAt: "4 hours ago",
  },
  {
    id: "3",
    title: "Best way to implement authentication in a Next.js application?",
    summary:
      "Looking for recommendations on implementing authentication. Should I use NextAuth.js, Clerk, or build a custom solution?",
    author: { name: "Mike Johnson", avatar: "/placeholder.svg?key=mike", initials: "MJ" },
    tags: ["nextjs", "authentication", "security"],
    votes: 28,
    answers: 7,
    views: 2156,
    hasAcceptedAnswer: false,
    createdAt: "6 hours ago",
  },
  {
    id: "4",
    title: "How to optimize React component re-renders?",
    summary:
      "My React app is getting slow due to unnecessary re-renders. What are the best techniques to optimize performance?",
    author: { name: "Emily Davis", avatar: "/placeholder.svg?key=emily", initials: "ED" },
    tags: ["react", "performance", "optimization"],
    votes: 24,
    answers: 4,
    views: 678,
    hasAcceptedAnswer: true,
    createdAt: "8 hours ago",
  },
  {
    id: "5",
    title: "TypeScript: How to create proper type guards?",
    summary:
      "I need to narrow down types in my TypeScript code. What's the best approach to create custom type guards?",
    author: { name: "Jordan Lee", avatar: "/placeholder.svg?key=jordan", initials: "JL" },
    tags: ["typescript", "types", "type-guards"],
    votes: 19,
    answers: 0,
    views: 345,
    hasAcceptedAnswer: false,
    createdAt: "12 hours ago",
  },
]

const trendingTags = [
  { name: "react", count: 1234 },
  { name: "nextjs", count: 987 },
  { name: "typescript", count: 876 },
  { name: "javascript", count: 765 },
  { name: "tailwindcss", count: 543 },
]

export default function QueryPage() {
  const [activeTab, setActiveTab] = useState("Newest")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [queryTitle, setQueryTitle] = useState("")
  const [queryDescription, setQueryDescription] = useState("")
  const [queryTags, setQueryTags] = useState("")
  const [questionsList, setQuestionsList] = useState(questions)

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const handleSubmitQuery = () => {
    // Parse tags from comma-separated string
    const tagsArray = queryTags
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0)
      .slice(0, 5) // Limit to 5 tags

    // Create new question object
    const newQuestion = {
      id: `${questionsList.length + 1}`,
      title: queryTitle,
      summary: queryDescription,
      author: { name: "John Doe", avatar: "/placeholder.svg?key=john", initials: "JD" },
      tags: tagsArray,
      votes: 0,
      answers: 0,
      views: 0,
      hasAcceptedAnswer: false,
      createdAt: "Just now",
    }

    // Add new question to the beginning of the list
    setQuestionsList([newQuestion, ...questionsList])

    // Reset form
    setQueryTitle("")
    setQueryDescription("")
    setQueryTags("")
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Query</h1>
          <p className="text-muted-foreground">Ask questions and get answers from the community</p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
        >
          <Plus className="mr-2 h-4 w-4" />
          Ask Question
        </Button>
      </div>

      {/* Ask Question Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Ask a Question</DialogTitle>
            <DialogDescription>
              Share your question with the community and get helpful answers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-foreground">
                Question Title
              </label>
              <Input
                id="title"
                placeholder="e.g., How do I center a div in CSS?"
                value={queryTitle}
                onChange={(e) => setQueryTitle(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-foreground">
                Description
              </label>
              <Textarea
                id="description"
                placeholder="Provide more details about your question..."
                value={queryDescription}
                onChange={(e) => setQueryDescription(e.target.value)}
                className="min-h-[150px] rounded-xl resize-none"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tags" className="text-sm font-medium text-foreground">
                Tags
              </label>
              <Input
                id="tags"
                placeholder="e.g., javascript, react, css (comma separated)"
                value={queryTags}
                onChange={(e) => setQueryTags(e.target.value)}
                className="rounded-xl"
              />
              <p className="text-xs text-muted-foreground">
                Add up to 5 tags to help others find your question
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitQuery}
              disabled={!queryTitle.trim() || !queryDescription.trim()}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Post Question
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search questions..."
          className="w-full rounded-xl border-none bg-card pl-11 py-5 shadow-sm focus-visible:ring-primary"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            className={`rounded-xl px-4 whitespace-nowrap ${activeTab === tab
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card hover:bg-muted text-foreground"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Filter Tags */}
      <div className="flex flex-wrap gap-2">
        {filterTags.map((tag) => (
          <Badge
            key={tag}
            variant="secondary"
            className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-all ${selectedTags.includes(tag)
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-primary/20"
              }`}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Question List */}
        <div className="space-y-4 lg:col-span-2">
          {questionsList.map((question) => (
            <QuestionCard key={question.id} {...question} />
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats Card */}
          <Card className="rounded-2xl border-none bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
                <HelpCircle className="h-4 w-4 text-[#AAC4F5]" />
                Community Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">12,458</p>
                <p className="text-xs text-muted-foreground">Questions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">45,872</p>
                <p className="text-xs text-muted-foreground">Answers</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-[#27C46B]">89%</p>
                <p className="text-xs text-muted-foreground">Answered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">5,234</p>
                <p className="text-xs text-muted-foreground">Users</p>
              </div>
            </CardContent>
          </Card>

          {/* Trending Tags */}
          <Card className="rounded-2xl border-none bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
                <TrendingUp className="h-4 w-4 text-[#FFA146]" />
                Trending Tags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {trendingTags.map((tag) => (
                <div
                  key={tag.name}
                  className="flex items-center justify-between rounded-xl p-2 transition-colors hover:bg-muted cursor-pointer"
                >
                  <Badge
                    variant="secondary"
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                  >
                    {tag.name}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{tag.count} questions</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-2xl border-none bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
                <Clock className="h-4 w-4 text-[#27C46B]" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="rounded-xl p-2 transition-colors hover:bg-muted">
                <p className="text-sm font-medium text-foreground line-clamp-1">New answer on "React hooks..."</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="rounded-xl p-2 transition-colors hover:bg-muted">
                <p className="text-sm font-medium text-foreground line-clamp-1">Question updated: TypeScript...</p>
                <p className="text-xs text-muted-foreground">15 minutes ago</p>
              </div>
              <div className="rounded-xl p-2 transition-colors hover:bg-muted">
                <p className="text-sm font-medium text-foreground line-clamp-1">Answer accepted on Next.js...</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
