"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Clock } from "lucide-react"

interface NoteCardProps {
  id: string
  title: string
  snippet: string
  category: string
  colorTag: string
  updatedAt: string
  isFavorite?: boolean
  isActive?: boolean
  onClick?: () => void
}

const colorMap: Record<string, string> = {
  blue: "bg-[#0077C0]",
  green: "bg-[#16A34A]",
  orange: "bg-[#F59E0B]",
  red: "bg-[#DC2626]",
  cyan: "bg-[#C7EEFF]",
}

export function NoteCard({
  title,
  snippet,
  category,
  colorTag,
  updatedAt,
  isFavorite,
  isActive,
  onClick,
}: NoteCardProps) {
  return (
    <Card
      className={`group cursor-pointer rounded-2xl border-none shadow-sm transition-all hover:shadow-md ${
        isActive ? "bg-primary/10 ring-2 ring-primary" : "bg-card"
      }`}
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          {/* Color tag */}
          <div className={`mt-1 h-full w-1 rounded-full ${colorMap[colorTag] || colorMap.blue}`} />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-foreground line-clamp-1">{title}</h3>
              {isFavorite && <Star className="h-4 w-4 fill-[#F59E0B] text-[#F59E0B] flex-shrink-0" />}
            </div>

            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{snippet}</p>

            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                {category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {updatedAt}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
