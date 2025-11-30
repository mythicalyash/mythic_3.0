import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ThumbsUp, Award, FileText } from "lucide-react"

const activities = [
  {
    id: 3,
    type: "badge",
    title: "Earned a new badge",
    description: "First 100 contributions",
    time: "1 day ago",
    icon: Award,
    color: "text-[#FFA146]",
    bgColor: "bg-[#FFA146]/10",
  },
  {
    id: 4,
    type: "note",
    title: "Created a new note",
    description: "JavaScript Design Patterns",
    time: "2 days ago",
    icon: FileText,
    color: "text-[#FF4D4F]",
    bgColor: "bg-[#FF4D4F]/10",
  },
]

export function RecentActivity() {
  return (
    <Card className="rounded-2xl border-none bg-card shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold text-foreground">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-muted">
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${activity.bgColor}`}>
              <activity.icon className={`h-6 w-6 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-base text-foreground">{activity.title}</p>
              <p className="truncate text-sm text-muted-foreground">{activity.description}</p>
            </div>
            <span className="text-sm text-muted-foreground whitespace-nowrap">{activity.time}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
