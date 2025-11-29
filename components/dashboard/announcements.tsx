"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Calendar, Megaphone, Star } from "lucide-react"

interface Announcement {
  id: number
  title: string
  content: string // Changed from description to content to match API
  type: "new" | "warning" | "info"
  date: string
}

const getBadgeVariant = (type: string) => {
  switch (type) {
    case "new":
      return "bg-[#0077C0] text-white"
    case "warning":
      return "bg-[#F59E0B]/20 text-[#F59E0B]"
    case "info":
      return "bg-[#C7EEFF] text-[#0077C0]"
    default:
      return "bg-muted text-muted-foreground"
  }
}

const getBadgeLabel = (type: string) => {
  switch (type) {
    case "new":
      return "New"
    case "warning":
      return "Notice"
    case "info":
      return "Info"
    default:
      return type
  }
}

const getIcon = (type: string) => {
  switch (type) {
    case "new": return Star
    case "warning": return Calendar
    default: return Megaphone
  }
}

export function Announcements() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch("/api/announcements")
        const data = await res.json()
        setAnnouncements(data.slice(0, 3)) // Show only top 3
      } catch (error) {
        console.error("Failed to fetch announcements", error)
      }
    }
    fetchAnnouncements()
  }, [])

  return (
    <Card className="rounded-2xl border-none bg-card shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <Bell className="h-6 w-6 text-[#0077C0]" />
          <CardTitle className="text-xl font-bold text-foreground">Announcements</CardTitle>
        </div>
        <Badge variant="secondary" className="bg-[#C7EEFF] text-[#0077C0] text-sm px-3 py-1">
          {announcements.length} New
        </Badge>
      </CardHeader>
      <CardContent className="pt-2">
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const Icon = getIcon(announcement.type)
            return (
              <div
                key={announcement.id}
                className="group flex items-start gap-4 rounded-xl p-4 transition-colors hover:bg-muted/50 cursor-pointer"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#C7EEFF]">
                  <Icon className="h-5 w-5 text-[#0077C0]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-base text-foreground truncate">{announcement.title}</h4>
                    <Badge className={`shrink-0 text-xs px-2 py-0.5 ${getBadgeVariant(announcement.type)}`}>
                      {getBadgeLabel(announcement.type)}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{announcement.content}</p>
                  <span className="text-xs text-muted-foreground/70 mt-1 block">{announcement.date}</span>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
