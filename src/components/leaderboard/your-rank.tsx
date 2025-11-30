import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, TrendingUp } from "lucide-react"

interface YourRankProps {
  rank: number
  totalUsers: number
  score: number
  previousRank: number
}

export function YourRank({ rank, totalUsers, score, previousRank }: YourRankProps) {
  const rankChange = previousRank - rank
  const percentile = Math.round((1 - rank / totalUsers) * 100)

  return (
    <Card className="rounded-2xl border-none bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
          <Trophy className="h-4 w-4 text-[#F59E0B]" />
          Your Rank
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14 border-4 border-primary shadow-md">
            <AvatarImage src="/current-user-avatar.png" />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">JD</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-foreground">#{rank}</span>
              {rankChange > 0 && (
                <span className="flex items-center gap-1 text-sm font-medium text-[#16A34A]">
                  <TrendingUp className="h-4 w-4" />+{rankChange}
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Top {percentile}% of {totalUsers.toLocaleString()} users
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-between rounded-xl bg-muted p-3">
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">{score.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total XP</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">128</p>
            <p className="text-xs text-muted-foreground">Contributions</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-foreground">15</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
