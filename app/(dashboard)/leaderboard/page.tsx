"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { TopThree } from "@/components/leaderboard/top-three"
import { LeaderboardRow } from "@/components/leaderboard/leaderboard-row"
import { YourRank } from "@/components/leaderboard/your-rank"
import { AchievementsGrid } from "@/components/leaderboard/achievements-grid"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Calendar } from "lucide-react"

const filters = ["Weekly", "Monthly", "All Time"]

const leaderboardData = [
  {
    rank: 1,
    name: "Sarah Chen",
    avatar: "/placeholder.svg?key=sarah",
    initials: "SC",
    score: 12450,
    contributions: 234,
    change: "same" as const,
  },
  {
    rank: 2,
    name: "Mike Johnson",
    avatar: "/placeholder.svg?key=mike",
    initials: "MJ",
    score: 11200,
    contributions: 198,
    change: "up" as const,
  },
  {
    rank: 3,
    name: "Emily Davis",
    avatar: "/placeholder.svg?key=emily",
    initials: "ED",
    score: 10850,
    contributions: 187,
    change: "down" as const,
  },
  {
    rank: 4,
    name: "Alex Kim",
    avatar: "/placeholder.svg?key=alex",
    initials: "AK",
    score: 9800,
    contributions: 165,
    change: "up" as const,
  },
  {
    rank: 5,
    name: "Jordan Lee",
    avatar: "/placeholder.svg?key=jordan",
    initials: "JL",
    score: 9200,
    contributions: 154,
    change: "same" as const,
  },
  {
    rank: 6,
    name: "Taylor Swift",
    avatar: "/placeholder.svg?key=taylor",
    initials: "TS",
    score: 8900,
    contributions: 142,
    change: "up" as const,
  },
  {
    rank: 7,
    name: "Chris Brown",
    avatar: "/placeholder.svg?key=chris",
    initials: "CB",
    score: 8500,
    contributions: 138,
    change: "down" as const,
  },
  {
    rank: 8,
    name: "John Doe",
    avatar: "/placeholder.svg?key=john",
    initials: "JD",
    score: 8200,
    contributions: 128,
    change: "up" as const,
    isCurrentUser: true,
  },
  {
    rank: 9,
    name: "Jane Smith",
    avatar: "/placeholder.svg?key=jane",
    initials: "JS",
    score: 7800,
    contributions: 120,
    change: "same" as const,
  },
  {
    rank: 10,
    name: "Bob Wilson",
    avatar: "/placeholder.svg?key=bob",
    initials: "BW",
    score: 7500,
    contributions: 115,
    change: "down" as const,
  },
]

export default function LeaderboardPage() {
  const [activeFilter, setActiveFilter] = useState("Weekly")

  const topThree = leaderboardData.slice(0, 3)
  const restOfList = leaderboardData.slice(3)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
          <p className="text-muted-foreground">See who's leading the community</p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={activeFilter === filter ? "default" : "ghost"}
              className={`rounded-xl px-4 ${
                activeFilter === filter
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card hover:bg-muted text-foreground"
              }`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Leaderboard */}
        <div className="space-y-6 lg:col-span-2">
          {/* Top 3 */}
          <TopThree users={topThree} />

          {/* Rest of List */}
          <Card className="rounded-2xl border-none bg-card shadow-sm">
            <CardHeader className="border-b border-border pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                <Trophy className="h-5 w-5 text-[#FFD700]" />
                Rankings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 p-4">
              {restOfList.map((user) => (
                <LeaderboardRow key={user.rank} {...user} />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          <YourRank rank={8} totalUsers={5234} score={8200} previousRank={12} />
          <AchievementsGrid />

          {/* This Week's Top Gainers */}
          <Card className="rounded-2xl border-none bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
                <Calendar className="h-4 w-4 text-[#27C46B]" />
                Top Gainers This Week
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Alex Kim", gain: "+1,250 XP", avatar: "/placeholder.svg?key=alex", initials: "AK" },
                { name: "Taylor Swift", gain: "+980 XP", avatar: "/placeholder.svg?key=taylor", initials: "TS" },
                { name: "John Doe", gain: "+850 XP", avatar: "/placeholder.svg?key=john", initials: "JD" },
              ].map((user, index) => (
                <div key={index} className="flex items-center gap-3 rounded-xl p-2 hover:bg-muted transition-colors">
                  <span className="w-5 text-sm font-bold text-muted-foreground">{index + 1}</span>
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-primary/20">
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <span className="flex-1 text-sm font-medium text-foreground">{user.name}</span>
                  <span className="text-sm font-bold text-[#27C46B]">{user.gain}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
