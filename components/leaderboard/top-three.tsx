import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Crown, Medal } from "lucide-react"

interface TopUser {
  rank: number
  name: string
  avatar: string
  initials: string
  score: number
  contributions: number
}

interface TopThreeProps {
  users: TopUser[]
}

export function TopThree({ users }: TopThreeProps) {
  const [first, second, third] = users

  const podiumOrder = [second, first, third]
  const heights = ["h-24", "h-32", "h-20"]
  const colors = ["bg-[#94A3B8]", "bg-[#F59E0B]", "bg-[#CD7F32]"]
  const ringColors = ["ring-[#94A3B8]", "ring-[#F59E0B]", "ring-[#CD7F32]"]
  const sizes = ["h-16 w-16", "h-20 w-20", "h-14 w-14"]
  const icons = [
    <Medal key="2" className="h-5 w-5 text-[#94A3B8]" />,
    <Crown key="1" className="h-6 w-6 text-[#F59E0B]" />,
    <Medal key="3" className="h-4 w-4 text-[#CD7F32]" />,
  ]

  return (
    <Card className="overflow-hidden rounded-2xl border-none bg-gradient-to-br from-[#0077C0]/20 to-[#C7EEFF]/30 shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-end justify-center gap-4">
          {podiumOrder.map((user, index) => (
            <div key={user.rank} className="flex flex-col items-center">
              {/* Avatar */}
              <div className="relative mb-3">
                <Avatar className={`${sizes[index]} ${ringColors[index]} ring-4 shadow-lg`}>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="bg-primary text-primary-foreground font-bold">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-card p-1 shadow-md">
                  {icons[index]}
                </div>
              </div>

              {/* Name & Score */}
              <p className={`font-bold text-foreground ${index === 1 ? "text-lg" : "text-sm"}`}>{user.name}</p>
              <p className={`font-bold ${index === 1 ? "text-xl text-[#F59E0B]" : "text-lg text-muted-foreground"}`}>
                {user.score.toLocaleString()} XP
              </p>

              {/* Podium */}
              <div
                className={`mt-3 w-20 ${heights[index]} ${colors[index]} rounded-t-xl flex items-center justify-center text-white font-bold text-xl shadow-md`}
              >
                #{user.rank}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
