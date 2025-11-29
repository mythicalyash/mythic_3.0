import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Star, Zap, Target } from "lucide-react"

export function ProfileSummary() {
  const stats = [
    { label: "Contributions", value: "128", icon: Trophy },
    { label: "Badges", value: "12", icon: Star },
    { label: "XP Points", value: "2,450", icon: Zap },
    { label: "Streak", value: "15 days", icon: Target },
  ]

  return (
    <Card className="rounded-2xl border-none bg-card shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-20 w-20 border-4 border-primary shadow-md">
            <AvatarImage src="/professional-avatar-user.jpg" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xl">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-foreground">John Doe</h3>
              <Badge className="rounded-full bg-secondary text-secondary-foreground px-2.5 py-0.5 text-sm font-medium">
                3 New
              </Badge>
            </div>
            <p className="text-base text-muted-foreground">Pro Member since 2024</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3 rounded-xl bg-muted p-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <stat.icon className="h-6 w-6 text-[#0077C0]" />
              </div>
              <div>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
