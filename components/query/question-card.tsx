import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronUp, MessageSquare, Eye, CheckCircle2 } from "lucide-react"
import Link from "next/link"

interface QuestionCardProps {
  id: string
  title: string
  summary: string
  author: {
    name: string
    avatar: string
    initials: string
  }
  tags: string[]
  votes: number
  answers: number
  views: number
  hasAcceptedAnswer?: boolean
  createdAt: string
}

export function QuestionCard({
  id,
  title,
  summary,
  author,
  tags,
  votes,
  answers,
  views,
  hasAcceptedAnswer,
  createdAt,
}: QuestionCardProps) {
  return (
    <Link href={`/query/${id}`}>
      <Card className="group rounded-2xl border-none bg-card shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
        <CardContent className="p-5">
          <div className="flex gap-4">
            {/* Stats Column */}
            <div className="hidden sm:flex flex-col items-center gap-3 text-center">
              <div className="flex flex-col items-center">
                <button className="rounded-lg p-1 hover:bg-muted transition-colors">
                  <ChevronUp className="h-5 w-5 text-muted-foreground" />
                </button>
                <span className="text-lg font-bold text-foreground">{votes}</span>
                <span className="text-xs text-muted-foreground">votes</span>
              </div>
              <div
                className={`flex flex-col items-center rounded-lg px-2 py-1 ${hasAcceptedAnswer ? "bg-[#27C46B]/10" : ""}`}
              >
                <span className={`text-lg font-bold ${hasAcceptedAnswer ? "text-[#27C46B]" : "text-foreground"}`}>
                  {answers}
                </span>
                <span className={`text-xs ${hasAcceptedAnswer ? "text-[#27C46B]" : "text-muted-foreground"}`}>
                  answers
                </span>
                {hasAcceptedAnswer && <CheckCircle2 className="mt-1 h-4 w-4 text-[#27C46B]" />}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground group-hover:text-[#AAC4F5] transition-colors line-clamp-2">
                {title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{summary}</p>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6 border border-primary/30">
                    <AvatarImage src={author.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/20 text-primary-foreground text-xs">
                      {author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground">{author.name}</span> asked {createdAt}
                  </span>
                </div>

                {/* Mobile stats */}
                <div className="flex items-center gap-3 text-xs text-muted-foreground sm:hidden">
                  <span className="flex items-center gap-1">
                    <ChevronUp className="h-3.5 w-3.5" />
                    {votes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageSquare className="h-3.5 w-3.5" />
                    {answers}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    {views}
                  </span>
                </div>

                {/* Desktop views */}
                <span className="hidden text-xs text-muted-foreground sm:flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" />
                  {views} views
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
