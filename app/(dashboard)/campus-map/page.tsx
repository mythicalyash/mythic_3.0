"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Navigation, Building2, Coffee, Library, Dumbbell, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const locations = [
    {
        id: "main-building",
        name: "Main Building",
        description: "Administrative offices and classrooms",
        icon: Building2,
        color: "text-blue-500",
        bg: "bg-blue-500/10",
        images: [
            "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
        ],
    },
    {
        id: "library",
        name: "Central Library",
        description: "Study areas and resource center",
        icon: Library,
        color: "text-amber-500",
        bg: "bg-amber-500/10",
        images: [
            "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&h=600&fit=crop",
        ],
    },
    {
        id: "cafeteria",
        name: "Cafeteria",
        description: "Food court and student lounge",
        icon: Coffee,
        color: "text-orange-500",
        bg: "bg-orange-500/10",
        images: [
            "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
        ],
    },
    {
        id: "sports",
        name: "Sports Complex",
        description: "Gym, indoor games, and courts",
        icon: Dumbbell,
        color: "text-green-500",
        bg: "bg-green-500/10",
        images: [
            "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
            "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800&h=600&fit=crop",
        ],
    },
]

export default function CampusMapPage() {
    const [expandedLocation, setExpandedLocation] = useState<string | null>(null)

    const toggleLocation = (locationId: string) => {
        setExpandedLocation(expandedLocation === locationId ? null : locationId)
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold text-foreground">Campus Map</h1>
                <p className="text-muted-foreground">Navigate through the university campus</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
                {/* Map Section */}
                <Card className="lg:col-span-2 overflow-hidden rounded-2xl border-none bg-card shadow-sm">
                    <CardHeader className="pb-0">
                        <CardTitle className="flex items-center gap-2 text-lg font-bold">
                            <MapPin className="h-5 w-5 text-primary" />
                            Interactive Map
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="overflow-hidden rounded-xl border border-border bg-muted">
                            <div style={{ width: "100%" }}>
                                <iframe
                                    width="100%"
                                    height="600"
                                    frameBorder="0"
                                    scrolling="no"
                                    marginHeight={0}
                                    marginWidth={0}
                                    src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Ajeenkya%20dy%20patil%20+(My%20Business%20Name)&t=k&z=17&ie=UTF8&iwloc=B&output=embed"
                                    title="Campus Map"
                                    className="w-full h-[500px] lg:h-[600px]"
                                >
                                    <a href="https://www.mapsdirections.info/de/evolkerung-auf-einer-karte-berechnen/">
                                        Kartentool Bevölkerung
                                    </a>
                                </iframe>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation Options */}
                <div className="space-y-6">
                    <Card className="rounded-2xl border-none bg-card shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg font-bold">
                                <Navigation className="h-5 w-5 text-primary" />
                                Key Locations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {locations.map((location) => (
                                <div key={location.id} className="space-y-3">
                                    <div
                                        onClick={() => toggleLocation(location.id)}
                                        className="group flex items-start gap-4 rounded-xl border border-transparent p-3 transition-all hover:bg-muted hover:border-border cursor-pointer"
                                    >
                                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${location.bg}`}>
                                            <location.icon className={`h-5 w-5 ${location.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                {location.name}
                                            </h3>
                                            <p className="text-sm text-muted-foreground">{location.description}</p>
                                        </div>
                                        <ChevronDown
                                            className={`h-5 w-5 text-muted-foreground transition-transform ${expandedLocation === location.id ? "rotate-180" : ""
                                                }`}
                                        />
                                    </div>

                                    {/* Dropdown Image Gallery */}
                                    {expandedLocation === location.id && (
                                        <div className="grid grid-cols-2 gap-2 px-3 pb-2 animate-in slide-in-from-top-2 duration-200">
                                            {location.images.map((image, idx) => (
                                                <div key={idx} className="overflow-hidden rounded-lg border border-border">
                                                    <img
                                                        src={image}
                                                        alt={`${location.name} ${idx + 1}`}
                                                        className="h-32 w-full object-cover transition-transform hover:scale-105"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="rounded-2xl border-none bg-[#0077C0] text-white shadow-sm">
                        <CardContent className="p-6">
                            <h3 className="mb-2 text-lg font-bold">Need Directions?</h3>
                            <p className="mb-4 text-blue-100 text-sm">
                                Get turn-by-turn navigation to any building on campus using Google Maps.
                            </p>
                            <Button
                                variant="secondary"
                                className="w-full bg-white text-[#0077C0] hover:bg-white/90"
                                onClick={() =>
                                    window.open(
                                        "https://www.google.com/maps/search/?api=1&query=Ajeenkya+dy+patil+university",
                                        "_blank"
                                    )
                                }
                            >
                                Open in Google Maps
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
