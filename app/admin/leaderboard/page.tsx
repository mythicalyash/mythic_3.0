"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Trophy, Medal, Award } from "lucide-react"

const leaderboardData = [
    {
        rank: 1,
        name: "Rahul Sharma",
        points: 8500,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
        badge: "Gold",
    },
    {
        rank: 2,
        name: "Priya Patel",
        points: 8200,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
        badge: "Silver",
    },
    {
        rank: 3,
        name: "Amit Kumar",
        points: 7900,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
        badge: "Bronze",
    },
    {
        rank: 4,
        name: "Sneha Reddy",
        points: 7500,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
        badge: "",
    },
    {
        rank: 5,
        name: "Vikram Singh",
        points: 7200,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
        badge: "",
    },
]

const getBadgeIcon = (badge: string) => {
    if (badge === "Gold") return <Trophy className="h-5 w-5 text-amber-500" />
    if (badge === "Silver") return <Medal className="h-5 w-5 text-gray-400" />
    if (badge === "Bronze") return <Award className="h-5 w-5 text-orange-600" />
    return null
}

export default function AdminLeaderboardPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground">Leaderboard</h1>
                <p className="text-muted-foreground">View student rankings and points</p>
            </div>

            <div className="grid gap-4">
                {leaderboardData.map((student) => (
                    <Card
                        key={student.rank}
                        className={`rounded-2xl border border-border bg-card shadow-md ${student.rank <= 3 ? "ring-2 ring-primary/20" : ""
                            }`}
                    >
                        <CardContent className="p-6">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary font-bold text-xl">
                                    {student.rank}
                                </div>
                                <Avatar className="h-14 w-14 border-2 border-primary">
                                    <AvatarImage src={student.avatar} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                        {student.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-foreground text-lg">{student.name}</h3>
                                    <p className="text-muted-foreground">{student.points.toLocaleString()} XP</p>
                                </div>
                                {student.badge && (
                                    <div className="flex items-center gap-2">
                                        {getBadgeIcon(student.badge)}
                                        <span className="font-medium text-foreground">{student.badge}</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
