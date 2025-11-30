"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Trophy,
  Zap,
  Star,
  Target,
  Calendar,
  MapPin,
  LinkIcon,
  FileText,
  Award,
  Activity,
} from "lucide-react"

const tabs = ["Overview", "Activity", "Badges", "Notes"]

const stats = [
  { label: "Contributions", value: "128", icon: Trophy },
  { label: "Day Streak", value: "15", icon: Zap },
  { label: "Badges", value: "12", icon: Star },
  { label: "XP Points", value: "8,200", icon: Target },
]

const skills = ["React", "TypeScript", "Next.js", "Node.js", "TailwindCSS", "GraphQL", "PostgreSQL"]

const badges = [
  {
    name: "Hot Streak",
    icon: Zap,
    color: "text-[#DC2626]",
    bg: "bg-[#DC2626]/10",
    description: "7 day contribution streak",
    date: "Feb 2024",
  },
  {
    name: "Power User",
    icon: Target,
    color: "text-[#F59E0B]",
    bg: "bg-[#F59E0B]/10",
    description: "Reached 5000 XP",
    date: "Apr 2024",
  },
  {
    name: "Note Taker",
    icon: FileText,
    color: "text-[#16A34A]",
    bg: "bg-[#16A34A]/10",
    description: "Created 20+ notes",
    date: "May 2024",
  },
]

const recentActivities = [
  { type: "badge", title: "Earned badge: Power User", time: "2 days ago" },
  { type: "note", title: "Created note: JavaScript patterns", time: "3 days ago" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Overview")

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="overflow-hidden rounded-2xl border-none bg-card shadow-sm">
        <div className="h-32 bg-gradient-to-r from-[#0077C0]/30 via-[#C7EEFF]/50 to-secondary" />

        <CardContent className="relative px-6 pb-6">
          {/* Avatar */}
          <Avatar className="-mt-16 h-28 w-28 border-4 border-card shadow-xl">
            <AvatarImage src="/user-profile.png" />
            <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
          </Avatar>

          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">John Doe</h1>
              <p className="text-muted-foreground">Pro Member</p>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                Full-stack developer passionate about building great user experiences. Love to share knowledge and help
                others grow.
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  San Francisco, CA
                </span>
                <span className="flex items-center gap-1">
                  <LinkIcon className="h-4 w-4" />
                  johndoe.dev
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined Jan 2024
                </span>
              </div>
            </div>

            <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">Edit Profile</Button>
          </div>

          {/* Stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-3 rounded-xl bg-muted p-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                  <stat.icon className="h-5 w-5 text-[#0077C0]" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? "default" : "ghost"}
            className={`rounded-xl px-4 whitespace-nowrap ${activeTab === tab
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card hover:bg-muted text-foreground"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="space-y-6 lg:col-span-2">
          {activeTab === "Overview" && (
            <>
              {/* About */}
              <Card className="rounded-2xl border-none bg-card shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-foreground">About Me</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    I'm a full-stack developer with 5+ years of experience building web applications. I specialize in
                    React, TypeScript, and Node.js. Currently working on exciting projects involving AI and machine
                    learning integrations. I love contributing to open source and helping others learn to code.
                  </p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card className="rounded-2xl border-none bg-card shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-foreground">Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="rounded-full bg-secondary px-3 py-1 text-sm font-medium text-secondary-foreground"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="rounded-2xl border-none bg-card shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-bold text-foreground">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-muted"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
                        <Activity className="h-4 w-4 text-[#0077C0]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          )}

          {activeTab === "Badges" && (
            <Card className="rounded-2xl border-none bg-card shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <Award className="h-5 w-5 text-[#F59E0B]" />
                  Earned Badges ({badges.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2">
                  {badges.map((badge) => (
                    <div key={badge.name} className={`flex items-start gap-3 rounded-xl ${badge.bg} p-4`}>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-card shadow-sm">
                        <badge.icon className={`h-6 w-6 ${badge.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{badge.name}</p>
                        <p className="text-sm text-muted-foreground">{badge.description}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{badge.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Achievements Preview */}
          <Card className="rounded-2xl border-none bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-bold text-foreground">
                <Award className="h-4 w-4 text-[#F59E0B]" />
                Recent Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3">
                {badges.slice(0, 6).map((badge) => (
                  <div
                    key={badge.name}
                    className={`flex flex-col items-center gap-1 rounded-xl ${badge.bg} p-3`}
                    title={badge.description}
                  >
                    <badge.icon className={`h-6 w-6 ${badge.color}`} />
                    <span className="text-xs font-medium text-foreground text-center line-clamp-1">{badge.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Similar Users */}
          <Card className="rounded-2xl border-none bg-card shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-base font-bold text-foreground">Similar Contributors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: "Sarah Chen", role: "Developer", avatar: "/sarah-user.jpg", initials: "SC" },
                { name: "Mike Johnson", role: "Designer", avatar: "/mike-user.jpg", initials: "MJ" },
                { name: "Emily Davis", role: "Engineer", avatar: "/emily-user.jpg", initials: "ED" },
              ].map((user) => (
                <div
                  key={user.name}
                  className="flex items-center gap-3 rounded-xl p-2 hover:bg-muted transition-colors"
                >
                  <Avatar className="h-10 w-10 border-2 border-primary/30">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-primary/20 text-primary-foreground text-sm">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg text-xs">
                    Follow
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
