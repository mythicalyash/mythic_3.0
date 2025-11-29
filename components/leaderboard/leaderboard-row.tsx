import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrendingUp, TrendingDown, Minus } from "lucide-react"

interface LeaderboardRowProps {
  rank: number
  name: string
  avatar: string
  initials: string
  score: number
  contributions: number
  change?: "up" | "down" | "same"
  isCurrentUser?: boolean
}

export function LeaderboardRow({
  rank,
  name,
  avatar,
  initials,
  score,
  contributions,
  change = "same",
  isCurrentUser,
}: LeaderboardRowProps) {
  const changeIcons = {
    up: <TrendingUp className="h-4 w-4 text-[#16A34A]" />,
    down: <TrendingDown className="h-4 w-4 text-[#DC2626]" />,
    same: <Minus className="h-4 w-4 text-muted-foreground" />,
  }

  return (
    <div
      className={`flex items-center gap-4 rounded-xl p-4 transition-colors ${
        isCurrentUser ? "bg-primary/10 ring-2 ring-primary" : "bg-card hover:bg-muted"
      }`}
    >
      {/* Rank */}
      <div className="flex w-12 items-center gap-2">
        <span className="text-lg font-bold text-foreground">#{rank}</span>
        {changeIcons[change]}
      </div>

      {/* Avatar & Name */}
      <div className="flex flex-1 items-center gap-3 min-w-0">
        <Avatar className="h-10 w-10 border-2 border-primary/30 flex-shrink-0">
          <AvatarImage src={avatar || "/placeholder.svg"} />
          <AvatarFallback className="bg-primary/20 text-primary-foreground text-sm">{initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="font-semibold text-foreground truncate">
            {name}
            {isCurrentUser && <span className="ml-2 text-xs font-medium text-primary">(You)</span>}
          </p>
          <p className="text-xs text-muted-foreground">{contributions} contributions</p>
        </div>
      </div>

      {/* Score */}
      <div className="text-right">
        <p className="text-lg font-bold text-foreground">{score.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">XP</p>
      </div>
    </div>
  )
}
