import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Award, Flame, MessageSquare, Star, Zap, Target, BookOpen } from "lucide-react"

const achievements = [
  { name: "First Post", icon: MessageSquare, color: "text-[#AAC4F5]", bg: "bg-[#AAC4F5]/20", earned: true },
  { name: "Hot Streak", icon: Flame, color: "text-[#FF4D4F]", bg: "bg-[#FF4D4F]/10", earned: true },
  { name: "Top Helper", icon: Star, color: "text-[#FFD700]", bg: "bg-[#FFD700]/10", earned: true },
  { name: "Power User", icon: Zap, color: "text-[#FFA146]", bg: "bg-[#FFA146]/10", earned: true },
  { name: "Achiever", icon: Target, color: "text-[#27C46B]", bg: "bg-[#27C46B]/10", earned: false },
  { name: "Scholar", icon: BookOpen, color: "text-[#AAC4F5]", bg: "bg-[#AAC4F5]/20", earned: false },
]

export function AchievementsGrid() {
  return (
    <Card className="rounded-2xl border-none bg-card shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
          <Award className="h-4 w-4 text-[#FFA146]" />
          Achievements
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-3">
          {achievements.map((achievement) => (
            <div
              key={achievement.name}
              className={`flex flex-col items-center gap-1 rounded-xl p-3 ${
                achievement.earned ? achievement.bg : "bg-muted opacity-50"
              }`}
            >
              <achievement.icon
                className={`h-6 w-6 ${achievement.earned ? achievement.color : "text-muted-foreground"}`}
              />
              <span className="text-xs font-medium text-foreground text-center">{achievement.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
