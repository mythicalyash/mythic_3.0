"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Code2,
    Github,
    Music,
    Trophy,
    Gamepad2,
    MapPin,
    Star,
    ExternalLink,
} from "lucide-react"
import { useState } from "react"

const categories = [
    { id: "all", name: "All", icon: MapPin },
    { id: "competitive-coding", name: "Competitive Coding Club", icon: Code2 },
    { id: "open-source", name: "Open Source", icon: Github },
    { id: "cultural", name: "Cultural Club", icon: Music },
    { id: "sports", name: "Sports", icon: Trophy },
    { id: "esports", name: "eSports", icon: Gamepad2 },
]

const clubs = [
    {
        id: 1,
        name: "Competitive Club",
        category: "compi-coding",
        description: "Master algorithms and compete in coding contests globally",
        memberCount: "250+ members",
        rating: 4.8,
        website: "https://yourcodingclub.com",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    },
    {
        id: 2,
        name: "Open Source Club",
        category: "open-source",
        description: "Contribute to open source projects and build together",
        memberCount: "180+ members",
        rating: 4.9,
        website: "https://vstopensource.netlify.app/",
        image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=300&fit=crop",
    },
    {
        id: 3,
        name: "Cultural Club",
        category: "cultural",
        description: "Celebrate diversity through music, dance, and art",
        memberCount: "320+ members",
        rating: 4.7,
        website: "https://cultural-club1.vercel.app",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    },
    {
        id: 4,
        name: "Sports Club",
        category: "sports",
        description: "Stay fit and compete in various sports activities",
        memberCount: "400+ members",
        rating: 4.6,
        website: "https://sportsclub.com",
        image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=300&fit=crop",
    },
    {
        id: 5,
        name: "eSports Club",
        category: "esports",
        description: "Join competitive gaming tournaments and events",
        memberCount: "290+ members",
        rating: 4.5,
        website: "https://esportsclub.com",
        image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    },
]

const getCategoryIcon = (category: string) => {
    const categoryData = categories.find((c) => c.id === category)
    return categoryData ? categoryData.icon : MapPin
}

const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
        "competitive-coding": "text-blue-500 bg-blue-500/10",
        "open-source": "text-green-500 bg-green-500/10",
        "cultural": "text-purple-500 bg-purple-500/10",
        "sports": "text-orange-500 bg-orange-500/10",
        "esports": "text-pink-500 bg-pink-500/10",
    }
    return colors[category] || "text-gray-500 bg-gray-500/10"
}

export default function ClubsPage() {
    const [activeCategory, setActiveCategory] = useState("all")

    const filteredClubs = activeCategory === "all"
        ? clubs
        : clubs.filter((club) => club.category === activeCategory)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground">Clubs & Community</h1>
                <p className="text-muted-foreground">
                    Discover and join active clubs across the campus
                </p>
            </div>

            {/* Category Filters */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map((category) => {
                    const Icon = category.icon
                    return (
                        <Button
                            key={category.id}
                            variant="outline"
                            className={`flex items-center gap-2 rounded-2xl px-4 whitespace-nowrap transition-all ${activeCategory === category.id
                                ? "bg-primary text-primary-foreground border-primary shadow-md"
                                : "hover:bg-muted"
                                }`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            <Icon className="h-4 w-4" />
                            {category.name}
                        </Button>
                    )
                })}
            </div>

            {/* Clubs Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredClubs.map((club) => {
                    const Icon = getCategoryIcon(club.category)
                    const categoryColor = getCategoryColor(club.category)
                    const categoryName = categories.find((c) => c.id === club.category)?.name || "Club"

                    return (
                        <Card
                            key={club.id}
                            className="overflow-hidden transition-all hover:shadow-lg border shadow-sm rounded-2xl bg-card h-[280px]"
                        >
                            <CardContent className="p-0 flex h-full">
                                {/* Left Content */}
                                <div className="flex-1 p-6 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-start gap-3 mb-3">
                                            <div
                                                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${categoryColor}`}
                                            >
                                                <Icon className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-foreground leading-tight">
                                                    {club.name}
                                                </h3>
                                                <p className="text-xs text-muted-foreground mt-1">
                                                    {categoryName}
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                                            {club.description}
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <button
                                            className="text-primary font-medium text-sm hover:underline"
                                            onClick={() => window.open(club.website, "_blank")}
                                        >
                                            Join
                                        </button>
                                    </div>
                                </div>

                                {/* Right Image */}
                                <div className="w-[45%] p-3 pl-0">
                                    <div className="h-full w-full relative">
                                        <img
                                            src={club.image}
                                            alt={club.name}
                                            className="absolute inset-0 h-full w-full object-cover rounded-xl"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Empty State */}
            {filteredClubs.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <MapPin className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No clubs found</h3>
                    <p className="text-muted-foreground">Try selecting a different category</p>
                </div>
            )}
        </div>
    )
}
