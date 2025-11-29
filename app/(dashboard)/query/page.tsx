"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { QuestionCard } from "@/components/query/question-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Plus, TrendingUp, HelpCircle, Clock } from "lucide-react"

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

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Query</h1>
          <p className="text-muted-foreground">Ask questions and get answers from the community</p>
        </div>
        <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
          <Plus className="mr-2 h-4 w-4" />
          Ask Question
        </Button>
      </div>

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
            className={`rounded-xl px-4 whitespace-nowrap ${
              activeTab === tab
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
            className={`cursor-pointer rounded-full px-3 py-1 text-sm font-medium transition-all ${
              selectedTags.includes(tag)
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
          {questions.map((question) => (
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
