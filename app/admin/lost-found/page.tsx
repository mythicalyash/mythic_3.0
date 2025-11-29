"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {
    Search,
    Package,
    CheckCircle,
    AlertCircle,
    MapPin,
    Calendar,
    User,
    X,
    Check,
} from "lucide-react"

interface FoundItem {
    id: string
    type: "found" | "lost"
    category: string
    itemName: string
    date: string
    location: string
    description: string
    imageUrl?: string
    reportedBy: {
        name: string
        id: string
    }
    status: "available" | "claimed" | "collected"
    reportedAt: string
    claimTickets?: ClaimTicket[]
}

interface ClaimTicket {
    id: string
    itemId: string
    claimedBy: {
        name: string
        id: string
        contact: string
    }
    proofOfOwnership: string
    additionalDetails: string
    status: "pending" | "approved" | "rejected"
    submittedAt: string
    adminNotes?: string
}

// Mock data - in production this would come from a shared state/API
const initialItems: FoundItem[] = [
    {
        id: "1",
        type: "found",
        category: "electronics",
        itemName: "Black iPhone 15 Pro",
        date: "2024-01-15",
        location: "Library Building, 2nd Floor",
        description: "Found near the study area, has a blue case",
        reportedBy: { name: "Sarah Chen", id: "u1" },
        status: "claimed",
        reportedAt: "2 hours ago",
        claimTickets: [
            {
                id: "c1",
                itemId: "1",
                claimedBy: {
                    name: "John Doe",
                    id: "u3",
                    contact: "john@example.com",
                },
                proofOfOwnership: "I can provide the IMEI number and purchase receipt",
                additionalDetails: "Lost it yesterday while studying",
                status: "pending",
                submittedAt: "2024-01-15T10:30:00Z",
            },
        ],
    },
    {
        id: "2",
        type: "found",
        category: "accessories",
        itemName: "Blue Backpack",
        date: "2024-01-14",
        location: "Cafeteria",
        description: "Blue backpack with books inside",
        reportedBy: { name: "Mike Johnson", id: "u2" },
        status: "available",
        reportedAt: "5 hours ago",
        claimTickets: [],
    },
    {
        id: "3",
        type: "lost",
        category: "electronics",
        itemName: "AirPods Pro",
        date: "2024-01-15",
        location: "Gym",
        description: "Lost my AirPods Pro in white case",
        reportedBy: { name: "John Doe", id: "u3" },
        status: "available",
        reportedAt: "1 hour ago",
        claimTickets: [],
    },
]

export default function AdminLostFoundPage() {
    const [activeTab, setActiveTab] = useState<"found" | "lost">("found")
    const [searchQuery, setSearchQuery] = useState("")
    const [items, setItems] = useState<FoundItem[]>(initialItems)
    const [selectedItem, setSelectedItem] = useState<FoundItem | null>(null)
    const [selectedClaim, setSelectedClaim] = useState<ClaimTicket | null>(null)
    const [isClaimReviewOpen, setIsClaimReviewOpen] = useState(false)
    const [adminNotes, setAdminNotes] = useState("")

    const handleMarkCollected = (itemId: string) => {
        setItems(
            items.map((item) =>
                item.id === itemId ? { ...item, status: "collected" } : item
            )
        )
    }

    const handleApproveClaim = () => {
        if (!selectedItem || !selectedClaim) return

        setItems(
            items.map((item) =>
                item.id === selectedItem.id
                    ? {
                        ...item,
                        claimTickets: item.claimTickets?.map((ticket) =>
                            ticket.id === selectedClaim.id
                                ? { ...ticket, status: "approved" as const, adminNotes }
                                : ticket
                        ),
                    }
                    : item
            )
        )

        setAdminNotes("")
        setIsClaimReviewOpen(false)
        setSelectedClaim(null)
        setSelectedItem(null)
    }

    const handleRejectClaim = () => {
        if (!selectedItem || !selectedClaim) return

        setItems(
            items.map((item) =>
                item.id === selectedItem.id
                    ? {
                        ...item,
                        status: "available",
                        claimTickets: item.claimTickets?.map((ticket) =>
                            ticket.id === selectedClaim.id
                                ? { ...ticket, status: "rejected" as const, adminNotes }
                                : ticket
                        ),
                    }
                    : item
            )
        )

        setAdminNotes("")
        setIsClaimReviewOpen(false)
        setSelectedClaim(null)
        setSelectedItem(null)
    }

    const filteredItems = items.filter(
        (item) =>
            item.type === activeTab &&
            (item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.location.toLowerCase().includes(searchQuery.toLowerCase()))
    )

    const stats = {
        found: {
            total: items.filter((i) => i.type === "found").length,
            available: items.filter((i) => i.type === "found" && i.status === "available").length,
            claimed: items.filter((i) => i.type === "found" && i.status === "claimed").length,
            collected: items.filter((i) => i.type === "found" && i.status === "collected").length,
        },
        lost: {
            total: items.filter((i) => i.type === "lost").length,
        },
        pendingClaims: items.reduce(
            (acc, item) =>
                acc + (item.claimTickets?.filter((t) => t.status === "pending").length || 0),
            0
        ),
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "available":
                return "bg-[#27C46B] text-white"
            case "claimed":
                return "bg-[#FFA146] text-white"
            case "collected":
                return "bg-[#AAC4F5] text-white"
            default:
                return "bg-gray-500 text-white"
        }
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-foreground">Lost & Found Management</h1>
                <p className="text-muted-foreground">Manage lost and found items and review claims</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
                <Button
                    variant={activeTab === "found" ? "default" : "ghost"}
                    className={`rounded-xl px-6 ${activeTab === "found"
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-card hover:bg-muted text-foreground"
                        }`}
                    onClick={() => setActiveTab("found")}
                >
                    Found Items ({stats.found.total})
                </Button>
                <Button
                    variant={activeTab === "lost" ? "default" : "ghost"}
                    className={`rounded-xl px-6 ${activeTab === "lost"
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "bg-card hover:bg-muted text-foreground"
                        }`}
                    onClick={() => setActiveTab("lost")}
                >
                    Lost Items ({stats.lost.total})
                </Button>
            </div>

            {/* Stats */}
            {activeTab === "found" ? (
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <Card className="rounded-2xl border-none bg-card shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                                    <Package className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-foreground">{stats.found.total}</p>
                                    <p className="text-xs text-muted-foreground">Total Found</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl border-none bg-card shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#27C46B]/10">
                                    <Package className="h-5 w-5 text-[#27C46B]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-foreground">{stats.found.available}</p>
                                    <p className="text-xs text-muted-foreground">Available</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl border-none bg-card shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFA146]/10">
                                    <AlertCircle className="h-5 w-5 text-[#FFA146]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-foreground">{stats.found.claimed}</p>
                                    <p className="text-xs text-muted-foreground">Claimed</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl border-none bg-card shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AAC4F5]/20">
                                    <CheckCircle className="h-5 w-5 text-[#AAC4F5]" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-foreground">{stats.found.collected}</p>
                                    <p className="text-xs text-muted-foreground">Collected</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="rounded-2xl border-none bg-card shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-foreground">{stats.pendingClaims}</p>
                                    <p className="text-xs text-muted-foreground">Pending Claims</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    <Card className="rounded-2xl border-none bg-card shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                                    <AlertCircle className="h-5 w-5 text-red-500" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-foreground">{stats.lost.total}</p>
                                    <p className="text-xs text-muted-foreground">Lost Items Reported</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Claim Review Dialog */}
            <Dialog open={isClaimReviewOpen} onOpenChange={setIsClaimReviewOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Review Claim</DialogTitle>
                        <DialogDescription>
                            Review the {selectedItem?.type === "found" ? "claim" : "found report"} for:{" "}
                            {selectedItem?.itemName}
                        </DialogDescription>
                    </DialogHeader>
                    {selectedClaim && (
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <h4 className="font-medium text-foreground">User Information</h4>
                                <div className="rounded-xl bg-muted p-3 space-y-1 text-sm">
                                    <p>
                                        <span className="font-medium">Name:</span> {selectedClaim.claimedBy.name}
                                    </p>
                                    <p>
                                        <span className="font-medium">Contact:</span> {selectedClaim.claimedBy.contact}
                                    </p>
                                    <p>
                                        <span className="font-medium">Submitted:</span>{" "}
                                        {new Date(selectedClaim.submittedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-foreground">
                                    {selectedItem?.type === "found" ? "Proof of Ownership" : "Found Details"}
                                </h4>
                                <p className="text-sm text-muted-foreground rounded-xl bg-muted p-3">
                                    {selectedClaim.proofOfOwnership}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-medium text-foreground">Additional Details</h4>
                                <p className="text-sm text-muted-foreground rounded-xl bg-muted p-3">
                                    {selectedClaim.additionalDetails}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-foreground">Admin Notes</label>
                                <Textarea
                                    placeholder="Add notes about this review..."
                                    value={adminNotes}
                                    onChange={(e) => setAdminNotes(e.target.value)}
                                    className="min-h-[100px] rounded-xl resize-none"
                                />
                            </div>
                        </div>
                    )}
                    <div className="flex justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={() => {
                                setIsClaimReviewOpen(false)
                                setSelectedClaim(null)
                                setAdminNotes("")
                            }}
                            className="rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleRejectClaim}
                            className="rounded-xl border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                            <X className="mr-2 h-4 w-4" />
                            Reject
                        </Button>
                        <Button
                            onClick={handleApproveClaim}
                            className="rounded-xl bg-[#27C46B] text-white hover:bg-[#27C46B]/90"
                        >
                            <Check className="mr-2 h-4 w-4" />
                            Approve & Notify
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search items..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border-none bg-card pl-11 py-5 shadow-sm focus-visible:ring-primary"
                />
            </div>

            {/* Items List */}
            <div className="space-y-4">
                {filteredItems.map((item) => (
                    <Card key={item.id} className="rounded-2xl border-none bg-card shadow-sm">
                        <CardHeader className="pb-3">
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle className="text-lg">{item.itemName}</CardTitle>
                                    <p className="text-sm text-muted-foreground capitalize">
                                        {item.category} • {item.type === "found" ? "Found Item" : "Lost Item"}
                                    </p>
                                </div>
                                {item.type === "found" && (
                                    <Badge className={`${getStatusColor(item.status)} rounded-full`}>
                                        {item.status}
                                    </Badge>
                                )}
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {item.imageUrl && (
                                <div className="h-40 w-full overflow-hidden rounded-xl">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.itemName}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" />
                                    <span>{item.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="h-4 w-4" />
                                    <span>{item.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>
                                        {item.type === "found" ? "Found" : "Lost"} by {item.reportedBy.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Package className="h-4 w-4" />
                                    <span>{item.reportedAt}</span>
                                </div>
                            </div>

                            {item.description && (
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            )}

                            {/* Claim Tickets */}
                            {item.claimTickets && item.claimTickets.length > 0 && (
                                <div className="space-y-2">
                                    <h4 className="text-sm font-medium text-foreground">
                                        {item.type === "found" ? "Claims" : "Found Reports"} ({item.claimTickets.length})
                                    </h4>
                                    <div className="space-y-2">
                                        {item.claimTickets.map((ticket) => (
                                            <div
                                                key={ticket.id}
                                                className="flex items-center justify-between rounded-xl bg-muted p-3"
                                            >
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-foreground">
                                                        {ticket.claimedBy.name}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {ticket.claimedBy.contact}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge
                                                        className={`rounded-full text-xs ${ticket.status === "pending"
                                                                ? "bg-[#FFA146] text-white"
                                                                : ticket.status === "approved"
                                                                    ? "bg-[#27C46B] text-white"
                                                                    : "bg-red-500 text-white"
                                                            }`}
                                                    >
                                                        {ticket.status}
                                                    </Badge>
                                                    {ticket.status === "pending" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => {
                                                                setSelectedItem(item)
                                                                setSelectedClaim(ticket)
                                                                setIsClaimReviewOpen(true)
                                                            }}
                                                            className="rounded-lg"
                                                        >
                                                            Review
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-2">
                                {item.type === "found" && item.status !== "collected" && (
                                    <Button
                                        onClick={() => handleMarkCollected(item.id)}
                                        className="rounded-xl bg-[#AAC4F5] text-white hover:bg-[#AAC4F5]/90"
                                    >
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Mark as Collected
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                        <Package className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">No items found</h3>
                    <p className="text-muted-foreground">Try adjusting your search</p>
                </div>
            )}
        </div>
    )
}
