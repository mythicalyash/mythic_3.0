"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Check,
    X,
    Search,
    MessageSquare,
    Megaphone,
    BookOpen,
    MessageCircle,
    Trophy,
    Users,
    Calendar,
    MapPin,
    Target,
    Zap,
    Star,
} from "lucide-react"

// Mock student applicants data
const mockApplicants = [
    {
        id: "STU001",
        name: "Rahul Sharma",
        email: "rahul.sharma@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
        id: "STU002",
        name: "Priya Patel",
        email: "priya.patel@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
        id: "STU003",
        name: "Amit Kumar",
        email: "amit.kumar@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    },
    {
        id: "STU004",
        name: "Sneha Reddy",
        email: "sneha.reddy@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sneha",
    },
    {
        id: "STU005",
        name: "Vikram Singh",
        email: "vikram.singh@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
    {
        id: "STU006",
        name: "Anjali Gupta",
        email: "anjali.gupta@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
    },
    {
        id: "STU007",
        name: "Rohan Verma",
        email: "rohan.verma@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohan",
    },
    {
        id: "STU008",
        name: "Kavya Nair",
        email: "kavya.nair@example.com",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kavya",
    },
]

const adminPages = [

    {
        name: "Announcements",
        href: "/admin/announcements",
        icon: Megaphone,
        description: "Create announcements",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        name: "Admin Study Hub",
        href: "/admin/study-hub",
        icon: BookOpen,
        description: "Manage study resources",
        color: "text-green-500",
        bg: "bg-green-500/10",
    },
    {
        name: "Feedback Review",
        href: "/admin/feedback",
        icon: MessageCircle,
        description: "Review student feedback",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        name: "Leaderboard",
        href: "/admin/leaderboard",
        icon: Trophy,
        description: "View rankings",
        color: "text-amber-500",
        bg: "bg-amber-500/10",
    },
]

const stats = [
    { label: "Contributions", value: "128", icon: Trophy },
    { label: "Day Streak", value: "15", icon: Zap },
    { label: "Badges", value: "12", icon: Star },
    { label: "XP Points", value: "8,200", icon: Target },
]

export default function AdminHomePage() {
    const [searchEmail, setSearchEmail] = useState("")
    const [searchUrn, setSearchUrn] = useState("")
    const [applicants, setApplicants] = useState(mockApplicants)

    const filteredApplicants = applicants.filter(
        (applicant) =>
            applicant.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
            applicant.id.toLowerCase().includes(searchUrn.toLowerCase())
    )

    const handleAccept = (id: string) => {
        console.log("Accepted:", id)
        setApplicants(applicants.filter((a) => a.id !== id))
    }

    const handleDeny = (id: string) => {
        console.log("Denied:", id)
        setApplicants(applicants.filter((a) => a.id !== id))
    }

    return (
        <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
            {/* Header */}
            <div className="flex flex-col gap-2 shrink-0">
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">Manage student applications and platform</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3 h-full min-h-0 grid-cols-1">
                {/* Main Content - Student Applicants */}
                <div className="lg:col-span-2 flex flex-col gap-6 h-full min-h-0">
                    {/* Search Filters */}
                    <Card className="rounded-2xl border-none bg-card shadow-sm shrink-0">
                        <CardContent className="p-4 flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Filter by Email..."
                                    value={searchEmail}
                                    onChange={(e) => setSearchEmail(e.target.value)}
                                    className="pl-10 rounded-xl"
                                />
                            </div>
                            <div className="relative flex-1">
                                <Target className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Filter by URN..."
                                    value={searchUrn}
                                    onChange={(e) => setSearchUrn(e.target.value)}
                                    className="pl-10 rounded-xl"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Student Applicants List */}
                    <Card className="rounded-2xl border-none bg-card shadow-sm flex-1 min-h-0 flex flex-col">
                        <CardHeader className="shrink-0">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-primary" />
                                Student Applicants ({filteredApplicants.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex-1 overflow-y-auto pr-2">
                            <div className="space-y-4">
                                {filteredApplicants.map((applicant) => (
                                    <Card
                                        key={applicant.id}
                                        className="rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <CardContent className="p-4 flex items-center gap-4">
                                            <Avatar className="h-12 w-12 border-2 border-primary shrink-0">
                                                <AvatarImage src={applicant.avatar} />
                                                <AvatarFallback className="bg-primary text-primary-foreground">
                                                    {applicant.name
                                                        .split(" ")
                                                        .map((n) => n[0])
                                                        .join("")}
                                                </AvatarFallback>
                                            </Avatar>

                                            <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                                <div>
                                                    <h3 className="font-semibold text-foreground truncate">{applicant.name}</h3>
                                                    <p className="text-xs text-muted-foreground">Name</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-foreground truncate">{applicant.email}</p>
                                                    <p className="text-xs text-muted-foreground">Email</p>
                                                </div>
                                                <div>
                                                    <p className="text-sm text-foreground font-mono">{applicant.id}</p>
                                                    <p className="text-xs text-muted-foreground">URN</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2 shrink-0 ml-4">
                                                <Button
                                                    onClick={() => handleAccept(applicant.id)}
                                                    className="rounded-xl bg-green-500 hover:bg-green-600 text-white h-10 w-10 p-0"
                                                    title="Accept"
                                                >
                                                    <Check className="h-5 w-5" />
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeny(applicant.id)}
                                                    variant="destructive"
                                                    className="rounded-xl h-10 w-10 p-0"
                                                    title="Deny"
                                                >
                                                    <X className="h-5 w-5" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Sidebar - Profile */}
                <div className="hidden lg:block space-y-6 h-full overflow-y-auto">
                    {/* Profile Card */}
                    <Card className="rounded-2xl border-none bg-card shadow-sm overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-[#0077C0]/30 via-[#C7EEFF]/50 to-secondary" />
                        <CardContent className="relative px-6 pb-6">
                            <Avatar className="-mt-12 h-24 w-24 border-4 border-card shadow-xl">
                                <AvatarImage src="/user-profile.png" />
                                <AvatarFallback className="bg-primary text-primary-foreground text-2xl">JD</AvatarFallback>
                            </Avatar>

                            <div className="mt-4">
                                <h2 className="text-xl font-bold text-foreground">John Doe</h2>
                                <p className="text-muted-foreground">Pro Member</p>
                                <p className="mt-2 text-sm text-muted-foreground">
                                    Full-stack developer passionate about building great user experiences.
                                </p>

                                <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-4 w-4" />
                                        San Francisco, CA
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Calendar className="h-4 w-4" />
                                        Joined Jan 2024
                                    </span>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="mt-6 grid grid-cols-2 gap-3">
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
                </div>
            </div>
        </div>
    )
}
