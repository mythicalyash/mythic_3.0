"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    UtensilsCrossed,
    Coffee,
    CreditCard,
    Hospital,
    ShoppingBag,
    Pill,
    Star,
    Navigation2,
    MapPin,
    TreePine,
    Hotel,
    Printer,
} from "lucide-react"
import { useState } from "react"

const categories = [
    { id: "all", name: "All", icon: MapPin },
    { id: "restaurants", name: "Restaurants", icon: UtensilsCrossed },
    { id: "cafes", name: "Cafes", icon: Coffee },
    { id: "parks", name: "Parks", icon: TreePine },
    { id: "pg-hotels", name: "PG & Hotels", icon: Hotel },
    { id: "stationery", name: "Xerox & Stationery", icon: Printer },
    { id: "atms", name: "ATMs", icon: CreditCard },
    { id: "hospitals", name: "Hospitals", icon: Hospital },
    { id: "pharmacies", name: "Pharmacies", icon: Pill },
    { id: "shopping", name: "Shopping", icon: ShoppingBag },
]

const nearbyPlaces = [
    {
        id: 1,
        name: "The Food Court",
        category: "restaurants",
        distance: "0.5 km",
        rating: 4.5,
        address: "Near Main Gate",
        type: "Multi-cuisine",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop",
    },
    {
        id: 2,
        name: "Cafe Coffee Day",
        category: "cafes",
        distance: "0.8 km",
        rating: 4.2,
        address: "Opposite Campus",
        type: "Coffee Shop",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400&h=300&fit=crop",
    },
    {
        id: 3,
        name: "HDFC Bank ATM",
        category: "atms",
        distance: "0.3 km",
        rating: 4.0,
        address: "Campus Main Road",
        type: "24/7 ATM",
        image: "https://images.unsplash.com/photo-1565372195458-9de0b320ef04?w=400&h=300&fit=crop",
    },
    {
        id: 4,
        name: "City Hospital",
        category: "hospitals",
        distance: "2.1 km",
        rating: 4.6,
        address: "Main City Road",
        type: "Multi-specialty",
        image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
    },
    {
        id: 5,
        name: "Apollo Pharmacy",
        category: "pharmacies",
        distance: "0.6 km",
        rating: 4.3,
        address: "Near Bus Stop",
        type: "24/7 Pharmacy",
        image: "https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400&h=300&fit=crop",
    },
    {
        id: 6,
        name: "D-Mart",
        category: "shopping",
        distance: "1.5 km",
        rating: 4.4,
        address: "Shopping Complex",
        type: "Supermarket",
        image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&h=300&fit=crop",
    },
    {
        id: 7,
        name: "Domino's Pizza",
        category: "restaurants",
        distance: "1.0 km",
        rating: 4.1,
        address: "Food Street",
        type: "Pizza",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop",
    },
    {
        id: 8,
        name: "Starbucks",
        category: "cafes",
        distance: "1.2 km",
        rating: 4.7,
        address: "City Center",
        type: "Coffee Shop",
        image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=300&fit=crop",
    },
    {
        id: 9,
        name: "Central Park",
        category: "parks",
        distance: "0.9 km",
        rating: 4.5,
        address: "Near Lake View",
        type: "Public Park",
        image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=400&h=300&fit=crop",
    },
    {
        id: 10,
        name: "Green Valley Park",
        category: "parks",
        distance: "1.8 km",
        rating: 4.6,
        address: "Valley Road",
        type: "Jogging Track",
        image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
    },
    {
        id: 11,
        name: "Student PG",
        category: "pg-hotels",
        distance: "0.4 km",
        rating: 4.3,
        address: "Near Campus Gate 2",
        type: "Boys PG",
        image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=400&h=300&fit=crop",
    },
    {
        id: 12,
        name: "Hotel Grand",
        category: "pg-hotels",
        distance: "1.3 km",
        rating: 4.5,
        address: "Main Road",
        type: "Budget Hotel",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    },
    {
        id: 13,
        name: "Quick Xerox",
        category: "stationery",
        distance: "0.2 km",
        rating: 4.4,
        address: "Campus Main Gate",
        type: "Xerox & Printing",
        image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=300&fit=crop",
    },
    {
        id: 14,
        name: "Student Stationery",
        category: "stationery",
        distance: "0.5 km",
        rating: 4.2,
        address: "Near Library",
        type: "Books & Supplies",
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop",
    },
]

const getCategoryIcon = (category: string) => {
    const icons: Record<string, any> = {
        restaurants: UtensilsCrossed,
        cafes: Coffee,
        parks: TreePine,
        "pg-hotels": Hotel,
        stationery: Printer,
        atms: CreditCard,
        hospitals: Hospital,
        pharmacies: Pill,
        shopping: ShoppingBag,
    }
    return icons[category] || MapPin
}

const getCategoryColor = (category: string) => {
    const colors: Record<string, { text: string; bg: string }> = {
        restaurants: { text: "text-orange-500", bg: "bg-orange-500/10" },
        cafes: { text: "text-amber-600", bg: "bg-amber-600/10" },
        parks: { text: "text-emerald-500", bg: "bg-emerald-500/10" },
        "pg-hotels": { text: "text-indigo-500", bg: "bg-indigo-500/10" },
        stationery: { text: "text-cyan-500", bg: "bg-cyan-500/10" },
        atms: { text: "text-blue-500", bg: "bg-blue-500/10" },
        hospitals: { text: "text-red-500", bg: "bg-red-500/10" },
        pharmacies: { text: "text-green-500", bg: "bg-green-500/10" },
        shopping: { text: "text-purple-500", bg: "bg-purple-500/10" },
    }
    return colors[category] || { text: "text-gray-500", bg: "bg-gray-500/10" }
}

export default function NearbyPage() {
    const [selectedCategory, setSelectedCategory] = useState("all")

    const filteredPlaces =
        selectedCategory === "all"
            ? nearbyPlaces
            : nearbyPlaces.filter((place) => place.category === selectedCategory)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground">Nearby Places</h1>
                <p className="text-muted-foreground">Discover places around the campus</p>
            </div>

            {/* Category Filters */}
            <Card className="rounded-2xl border-none bg-card shadow-sm">
                <CardContent className="p-4">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category.id}
                                variant={selectedCategory === category.id ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedCategory(category.id)}
                                className={`rounded-xl ${selectedCategory === category.id
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                                    }`}
                            >
                                <category.icon className="mr-2 h-4 w-4" />
                                {category.name}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Places Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredPlaces.map((place) => {
                    const Icon = getCategoryIcon(place.category)
                    const colors = getCategoryColor(place.category)

                    return (
                        <Card
                            key={place.id}
                            className="group rounded-2xl border border-border bg-card shadow-md transition-all hover:shadow-lg cursor-pointer overflow-hidden"
                        >
                            <CardContent className="p-0">
                                <div className="flex">
                                    {/* Left Content */}
                                    <div className="flex-1 p-5">
                                        <div className="flex items-start gap-4">
                                            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${colors.bg}`}>
                                                <Icon className={`h-6 w-6 ${colors.text}`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {place.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">{place.type}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                <Navigation2 className="h-4 w-4" />
                                                <span>{place.distance}</span>
                                                <span>•</span>
                                                <span>{place.address}</span>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                                                <span className="text-sm font-medium text-foreground">{place.rating}</span>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="rounded-lg text-primary hover:bg-primary/10 w-full justify-center mt-2"
                                                onClick={() =>
                                                    window.open(
                                                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.name)}+near+Ajeenkya+DY+Patil+University`,
                                                        "_blank"
                                                    )
                                                }
                                            >
                                                Get Directions
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Right Image */}
                                    <div className="w-48 shrink-0 p-3">
                                        <img
                                            src={place.image}
                                            alt={place.name}
                                            className="h-full w-full object-cover rounded-xl"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {filteredPlaces.length === 0 && (
                <Card className="rounded-2xl border-none bg-card shadow-sm">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                        <MapPin className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground">No places found in this category</p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
