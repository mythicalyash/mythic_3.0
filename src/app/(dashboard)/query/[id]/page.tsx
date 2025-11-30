"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { VoteArrow } from "@/components/ui/vote-arrow"
import {
    Eye,
    MessageSquare,
    CheckCircle2,
    ArrowLeft,
    Send,
} from "lucide-react"

// Mock data - in a real app, this would come from an API
const queryData: Record<string, any> = {
    "1": {
        id: "1",
        title: "How do I handle async/await errors properly in JavaScript?",
        description: `I'm trying to understand the best practices for error handling when using async/await. Should I use try-catch blocks everywhere or is there a better pattern?

Here's what I'm currently doing:

\`\`\`javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}
\`\`\`

Is this the right approach? Are there any better patterns I should be aware of?`,
        author: { name: "Alex Smith", avatar: "/placeholder.svg?key=alex", initials: "AS" },
        tags: ["javascript", "async", "error-handling"],
        votes: 42,
        views: 1234,
        createdAt: "2 hours ago",
        answers: [
            {
                id: "a1",
                author: { name: "Sarah Chen", avatar: "/placeholder.svg?key=sarah", initials: "SC" },
                content: `Your approach is correct! Using try-catch blocks is the standard way to handle errors with async/await. However, here are some additional patterns you might find useful:

1. **Centralized Error Handling**: Create a wrapper function for consistent error handling
2. **Error Boundaries**: For React applications, use error boundaries
3. **Promise.allSettled**: When dealing with multiple promises

Here's an example of a wrapper function:

\`\`\`javascript
async function handleAsync(promise) {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
}

// Usage
const [data, error] = await handleAsync(fetch('/api/data'));
if (error) {
  // Handle error
}
\`\`\``,
                votes: 28,
                createdAt: "1 hour ago",
                isAccepted: true,
            },
            {
                id: "a2",
                author: { name: "Mike Johnson", avatar: "/placeholder.svg?key=mike", initials: "MJ" },
                content: `Another approach is to use a library like \`async-error-catcher\` or create your own error handling middleware. This is especially useful in Express.js applications.

Also, don't forget to handle promise rejections globally:

\`\`\`javascript
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
\`\`\``,
                votes: 15,
                createdAt: "30 minutes ago",
                isAccepted: false,
            },
        ],
    },
    "2": {
        id: "2",
        title: "What's the difference between Server Components and Client Components in Next.js?",
        description: `I'm new to Next.js 14 and confused about when to use Server Components vs Client Components. Can someone explain the key differences and when to use each?`,
        author: { name: "Sarah Chen", avatar: "/placeholder.svg?key=sarah", initials: "SC" },
        tags: ["nextjs", "react", "server-components"],
        votes: 38,
        views: 892,
        createdAt: "4 hours ago",
        answers: [
            {
                id: "a1",
                author: { name: "Alex Smith", avatar: "/placeholder.svg?key=alex", initials: "AS" },
                content: `Great question! Here's a breakdown:

**Server Components (default in Next.js 14):**
- Render on the server
- Can directly access backend resources (databases, file system)
- Don't add to the client-side JavaScript bundle
- Cannot use hooks like useState, useEffect
- Cannot use browser APIs

**Client Components:**
- Render on the client
- Can use React hooks and browser APIs
- Add to the JavaScript bundle
- Need "use client" directive at the top of the file

**When to use each:**
- Use Server Components by default for better performance
- Use Client Components when you need interactivity, state, or browser APIs`,
                votes: 32,
                createdAt: "3 hours ago",
                isAccepted: true,
            },
        ],
    },
}

export default function QueryDetailPage() {
    const params = useParams()
    const router = useRouter()
    const queryId = params.id as string

    const query = queryData[queryId]
    const [newAnswer, setNewAnswer] = useState("")
    const [answers, setAnswers] = useState(query?.answers || [])
    const [userVotes, setUserVotes] = useState<Record<string, "up" | "down" | null>>({})

    if (!query) {
        return (
            <div className="flex flex-col items-center justify-center py-16">
                <h2 className="text-2xl font-bold text-foreground">Query not found</h2>
                <Button onClick={() => router.push("/query")} className="mt-4">
                    Back to Queries
                </Button>
            </div>
        )
    }

    const handleSubmitAnswer = () => {
        if (!newAnswer.trim()) return

        const answer = {
            id: `a${answers.length + 1}`,
            author: { name: "John Doe", avatar: "/placeholder.svg?key=john", initials: "JD" },
            content: newAnswer,
            votes: 0,
            createdAt: "Just now",
            isAccepted: false,
        }

        setAnswers([...answers, answer])
        setNewAnswer("")
    }

    const handleVote = (answerId: string, direction: "up" | "down") => {
        const currentVote = userVotes[answerId]

        // If clicking the same vote, remove it
        if (currentVote === direction) {
            setUserVotes({ ...userVotes, [answerId]: null })
            setAnswers(
                answers.map((answer: any) =>
                    answer.id === answerId
                        ? { ...answer, votes: answer.votes + (direction === "up" ? -1 : 1) }
                        : answer
                )
            )
        } else {
            // If switching vote or voting for the first time
            const voteChange = currentVote === null ? (direction === "up" ? 1 : -1) : (direction === "up" ? 2 : -2)

            setUserVotes({ ...userVotes, [answerId]: direction })
            setAnswers(
                answers.map((answer: any) =>
                    answer.id === answerId ? { ...answer, votes: answer.votes + voteChange } : answer
                )
            )
        }
    }

    const acceptedAnswer = answers.find((a: any) => a.isAccepted)
    const otherAnswers = answers.filter((a: any) => !a.isAccepted)

    return (
        <div className="space-y-6">
            {/* Back Button */}
            <Button
                variant="ghost"
                onClick={() => router.push("/query")}
                className="rounded-xl hover:bg-muted"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Queries
            </Button>

            {/* Query Header */}
            <Card className="rounded-2xl border-none bg-card shadow-sm">
                <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                        {/* Vote Section */}
                        <div className="flex flex-col items-center gap-2">
                            <button className="rounded-lg p-1.5 hover:bg-muted transition-colors">
                                <VoteArrow direction="up" className="h-6 w-6" />
                            </button>
                            <span className="text-2xl font-bold text-foreground">{query.votes}</span>
                            <button className="rounded-lg p-1.5 hover:bg-muted transition-colors">
                                <VoteArrow direction="down" className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-foreground mb-4">{query.title}</h1>

                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                {query.tags.map((tag: string) => (
                                    <Badge
                                        key={tag}
                                        variant="secondary"
                                        className="rounded-full bg-secondary px-3 py-1 text-sm font-medium"
                                    >
                                        {tag}
                                    </Badge>
                                ))}
                            </div>

                            <div className="prose prose-sm max-w-none text-foreground mb-4">
                                <p className="whitespace-pre-wrap text-muted-foreground leading-relaxed">
                                    {query.description}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                    <Avatar className="h-6 w-6 border border-primary/30">
                                        <AvatarImage src={query.author.avatar} />
                                        <AvatarFallback className="bg-primary/20 text-primary-foreground text-xs">
                                            {query.author.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <span>
                                        <span className="font-medium text-foreground">{query.author.name}</span> asked{" "}
                                        {query.createdAt}
                                    </span>
                                </div>
                                <span className="flex items-center gap-1">
                                    <Eye className="h-4 w-4" />
                                    {query.views} views
                                </span>
                                <span className="flex items-center gap-1">
                                    <MessageSquare className="h-4 w-4" />
                                    {answers.length} answers
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Answers Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-foreground">
                    {answers.length} {answers.length === 1 ? "Answer" : "Answers"}
                </h2>

                {/* Accepted Answer */}
                {acceptedAnswer && (
                    <Card className="rounded-2xl border-2 border-[#27C46B] bg-[#27C46B]/5 shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                {/* Vote Section */}
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => handleVote(acceptedAnswer.id, "up")}
                                        className={`rounded-lg p-1.5 transition-all ${userVotes[acceptedAnswer.id] === "up"
                                            ? "bg-primary/20 text-primary"
                                            : "hover:bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        <VoteArrow direction="up" className="h-5 w-5" />
                                    </button>
                                    <span className="text-xl font-bold text-foreground">
                                        {acceptedAnswer.votes}
                                    </span>
                                    <button
                                        onClick={() => handleVote(acceptedAnswer.id, "down")}
                                        className={`rounded-lg p-1.5 transition-all ${userVotes[acceptedAnswer.id] === "down"
                                            ? "bg-red-500/20 text-red-500"
                                            : "hover:bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        <VoteArrow direction="down" className="h-5 w-5" />
                                    </button>
                                    <CheckCircle2 className="h-8 w-8 text-[#27C46B] mt-2" />
                                </div>

                                {/* Answer Content */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Badge className="bg-[#27C46B] text-white hover:bg-[#27C46B]/90">
                                            <CheckCircle2 className="h-3 w-3 mr-1" />
                                            Accepted Answer
                                        </Badge>
                                    </div>

                                    <div className="prose prose-sm max-w-none mb-4">
                                        <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                                            {acceptedAnswer.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Avatar className="h-6 w-6 border border-primary/30">
                                            <AvatarImage src={acceptedAnswer.author.avatar} />
                                            <AvatarFallback className="bg-primary/20 text-primary-foreground text-xs">
                                                {acceptedAnswer.author.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>
                                            <span className="font-medium text-foreground">
                                                {acceptedAnswer.author.name}
                                            </span>{" "}
                                            answered {acceptedAnswer.createdAt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Other Answers */}
                {otherAnswers.map((answer) => (
                    <Card key={answer.id} className="rounded-2xl border-none bg-card shadow-sm">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                {/* Vote Section */}
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        onClick={() => handleVote(answer.id, "up")}
                                        className={`rounded-lg p-1.5 transition-all ${userVotes[answer.id] === "up"
                                            ? "bg-primary/20 text-primary"
                                            : "hover:bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        <VoteArrow direction="up" className="h-5 w-5" />
                                    </button>
                                    <span className="text-xl font-bold text-foreground">{answer.votes}</span>
                                    <button
                                        onClick={() => handleVote(answer.id, "down")}
                                        className={`rounded-lg p-1.5 transition-all ${userVotes[answer.id] === "down"
                                            ? "bg-red-500/20 text-red-500"
                                            : "hover:bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        <VoteArrow direction="down" className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Answer Content */}
                                <div className="flex-1">
                                    <div className="prose prose-sm max-w-none mb-4">
                                        <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                                            {answer.content}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Avatar className="h-6 w-6 border border-primary/30">
                                            <AvatarImage src={answer.author.avatar} />
                                            <AvatarFallback className="bg-primary/20 text-primary-foreground text-xs">
                                                {answer.author.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span>
                                            <span className="font-medium text-foreground">{answer.author.name}</span>{" "}
                                            answered {answer.createdAt}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* New Answer Input */}
            <Card className="rounded-2xl border-none bg-card shadow-sm">
                <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-foreground mb-4">Your Answer</h3>
                    <Textarea
                        placeholder="Write your answer here... You can use markdown formatting."
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        className="min-h-[150px] rounded-xl border-border bg-background resize-none"
                    />
                    <div className="flex items-center justify-between mt-4">
                        <span className="text-sm text-muted-foreground">
                            {newAnswer.length} characters
                        </span>
                        <Button
                            onClick={handleSubmitAnswer}
                            disabled={!newAnswer.trim()}
                            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                            <Send className="mr-2 h-4 w-4" />
                            Submit Answer
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
