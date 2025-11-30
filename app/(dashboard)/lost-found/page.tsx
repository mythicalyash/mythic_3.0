"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Search,
  Plus,
  Package,
  CheckCircle,
  AlertCircle,
  MapPin,
  Calendar,
  User,
  Upload,
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
  status: "available" | "pending" | "collected"
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
}

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
    status: "available",
    reportedAt: "2 hours ago",
    claimTickets: [],
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

const categories = [
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "accessories", label: "Accessories" },
  { value: "books", label: "Books" },
  { value: "other", label: "Other" },
]

export default function LostFoundPage() {
  const [activeTab, setActiveTab] = useState<"found" | "lost">("found")
  const [searchQuery, setSearchQuery] = useState("")
  const [isReportOpen, setIsReportOpen] = useState(false)
  const [reportType, setReportType] = useState<"found" | "lost">("found")
  const [isClaimOpen, setIsClaimOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<FoundItem | null>(null)
  const [items, setItems] = useState<FoundItem[]>(initialItems)

  // Report form state
  const [category, setCategory] = useState("")
  const [itemName, setItemName] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  // Claim form state
  const [proofOfOwnership, setProofOfOwnership] = useState("")
  const [additionalDetails, setAdditionalDetails] = useState("")

  const handleReportItem = () => {
    const newItem: FoundItem = {
      id: `${items.length + 1}`,
      type: reportType,
      category,
      itemName,
      date,
      location,
      description,
      imageUrl: imageUrl || undefined,
      reportedBy: { name: "John Doe", id: "current-user" },
      status: "available",
      reportedAt: "Just now",
      claimTickets: [],
    }

    setItems([newItem, ...items])

    // Reset form
    setCategory("")
    setItemName("")
    setDate("")
    setLocation("")
    setDescription("")
    setImageUrl("")
    setIsReportOpen(false)
  }

  const handleClaimItem = () => {
    if (!selectedItem) return

    const claimTicket: ClaimTicket = {
      id: `c${Date.now()}`,
      itemId: selectedItem.id,
      claimedBy: {
        name: "John Doe",
        id: "current-user",
        contact: "john@example.com",
      },
      proofOfOwnership,
      additionalDetails,
      status: "pending",
      submittedAt: new Date().toISOString(),
    }

    setItems(
      items.map((item) =>
        item.id === selectedItem.id
          ? {
            ...item,
            status: "pending",
            claimTickets: [...(item.claimTickets || []), claimTicket],
          }
          : item
      )
    )

    // Reset form
    setProofOfOwnership("")
    setAdditionalDetails("")
    setIsClaimOpen(false)
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
      available: items.filter((i) => i.type === "found" && i.status === "available").length,
      pending: items.filter((i) => i.type === "found" && i.status === "pending").length,
      collected: items.filter((i) => i.type === "found" && i.status === "collected").length,
    },
    lost: {
      total: items.filter((i) => i.type === "lost").length,
    },
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-[#27C46B] text-white"
      case "pending":
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lost & Found</h1>
          <p className="text-muted-foreground">Report lost items or found items</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              setReportType("lost")
              setIsReportOpen(true)
            }}
            variant="outline"
            className="rounded-xl"
          >
            <Plus className="mr-2 h-4 w-4" />
            Report Lost Item
          </Button>
          <Button
            onClick={() => {
              setReportType("found")
              setIsReportOpen(true)
            }}
            className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            Report Found Item
          </Button>
        </div>
      </div>

      {/* Report Item Dialog */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              Report {reportType === "found" ? "Found" : "Lost"} Item
            </DialogTitle>
            <DialogDescription>
              {reportType === "found"
                ? "Help reunite items with their owners by reporting what you found."
                : "Report your lost item so others can help you find it."}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Item Name</label>
              <Input
                placeholder="e.g., Black iPhone 15 Pro"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {reportType === "found" ? "Date Found" : "Date Lost"}
              </label>
              <Input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {reportType === "found" ? "Location Found" : "Last Known Location"}
              </label>
              <Input
                placeholder="e.g., Library Building, 2nd Floor"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea
                placeholder="Additional details about the item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[100px] rounded-xl resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Image URL (Optional)
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="rounded-xl"
                />
                <Button variant="outline" className="rounded-xl">
                  <Upload className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Add an image to help identify the item
              </p>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setIsReportOpen(false)}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleReportItem}
              disabled={!category || !itemName || !date || !location || !description}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Report Item
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Claim Item Dialog */}
      <Dialog open={isClaimOpen} onOpenChange={setIsClaimOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.type === "found" ? "Claim Item" : "Report Found"}
            </DialogTitle>
            <DialogDescription>
              {selectedItem?.type === "found"
                ? `Submit a claim ticket with proof of ownership for: ${selectedItem?.itemName}`
                : `Let us know if you found this item: ${selectedItem?.itemName}`}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                {selectedItem?.type === "found" ? "Proof of Ownership" : "Details"}
              </label>
              <Textarea
                placeholder={
                  selectedItem?.type === "found"
                    ? "Describe how you can prove this item is yours..."
                    : "Describe where and when you found this item..."
                }
                value={proofOfOwnership}
                onChange={(e) => setProofOfOwnership(e.target.value)}
                className="min-h-[100px] rounded-xl resize-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Additional Details
              </label>
              <Textarea
                placeholder="Any other information that might help..."
                value={additionalDetails}
                onChange={(e) => setAdditionalDetails(e.target.value)}
                className="min-h-[100px] rounded-xl resize-none"
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setIsClaimOpen(false)
                setSelectedItem(null)
              }}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              onClick={handleClaimItem}
              disabled={!proofOfOwnership.trim()}
              className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Submit
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
          Found Items
        </Button>
        <Button
          variant={activeTab === "lost" ? "default" : "ghost"}
          className={`rounded-xl px-6 ${activeTab === "lost"
            ? "bg-primary text-primary-foreground shadow-md"
            : "bg-card hover:bg-muted text-foreground"
            }`}
          onClick={() => setActiveTab("lost")}
        >
          Lost Items
        </Button>
      </div>

      {/* Stats */}
      {activeTab === "found" ? (
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#27C46B]/10">
              <Package className="h-5 w-5 text-[#27C46B]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.found.available}</p>
              <p className="text-xs text-muted-foreground">Available</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFA146]/10">
              <AlertCircle className="h-5 w-5 text-[#FFA146]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.found.pending}</p>
              <p className="text-xs text-muted-foreground">Pending</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AAC4F5]/20">
              <CheckCircle className="h-5 w-5 text-[#AAC4F5]" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.found.collected}</p>
              <p className="text-xs text-muted-foreground">Collected</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stats.lost.total}</p>
              <p className="text-xs text-muted-foreground">Lost Items Reported</p>
            </div>
          </div>
        </div>
      )}

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

      {/* Items Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="rounded-2xl border-none bg-card shadow-sm overflow-hidden">
            {item.imageUrl && (
              <div className="h-40 w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.itemName}
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <CardContent className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-bold text-foreground line-clamp-1">{item.itemName}</h3>
                  {item.type === "found" && (
                    <Badge className={`${getStatusColor(item.status)} rounded-full text-xs`}>
                      {item.status}
                    </Badge>
                  )}
                </div>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    <span className="capitalize">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span className="line-clamp-1">{item.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>
                      {item.type === "found" ? "Found" : "Lost"} by {item.reportedBy.name}
                    </span>
                  </div>
                </div>

                {item.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                )}

                <div className="pt-2">
                  {item.type === "found" ? (
                    <>
                      {item.status === "available" && (
                        <Button
                          onClick={() => {
                            setSelectedItem(item)
                            setIsClaimOpen(true)
                          }}
                          className="w-full rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          Claim Item
                        </Button>
                      )}
                      {item.status === "pending" && (
                        <div className="text-center text-sm text-muted-foreground">
                          Claim pending review
                        </div>
                      )}
                      {item.status === "collected" && (
                        <div className="text-center text-sm text-[#AAC4F5]">Item collected</div>
                      )}
                    </>
                  ) : (
                    <Button
                      onClick={() => {
                        setSelectedItem(item)
                        setIsClaimOpen(true)
                      }}
                      className="w-full rounded-xl bg-[#27C46B] text-white hover:bg-[#27C46B]/90"
                    >
                      I Found This
                    </Button>
                  )}
                </div>
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
