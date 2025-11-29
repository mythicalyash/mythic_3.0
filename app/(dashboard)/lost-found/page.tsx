"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ItemCard } from "@/components/lost-found/item-card"
import { ReportForm } from "@/components/lost-found/report-form"
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Search, Plus, Package, CheckCircle, AlertCircle } from "lucide-react"

const tabs = [
  { name: "Lost Items", value: "lost" },
  { name: "Found Items", value: "found" },
  { name: "Report Item", value: "report" },
]

const items = [
  {
    id: "1",
    name: "Black iPhone 15 Pro",
    image: "/placeholder.svg?key=iphone",
    location: "Library Building, 2nd Floor",
    timePosted: "2 hours ago",
    status: "lost" as const,
    description: "Lost my phone near the study area",
  },
  {
    id: "2",
    name: "Blue Backpack",
    image: "/placeholder.svg?key=backpack",
    location: "Cafeteria",
    timePosted: "5 hours ago",
    status: "found" as const,
    description: "Found a blue backpack with books inside",
  },
  {
    id: "3",
    name: "Silver MacBook Pro",
    image: "/placeholder.svg?key=macbook",
    location: "Computer Lab A",
    timePosted: "1 day ago",
    status: "returned" as const,
    description: "MacBook was returned to owner",
  },
  {
    id: "4",
    name: "Wireless Earbuds",
    image: "/placeholder.svg?key=earbuds",
    location: "Gym",
    timePosted: "1 day ago",
    status: "lost" as const,
    description: "White wireless earbuds in black case",
  },
  {
    id: "5",
    name: "Student ID Card",
    image: "/placeholder.svg?key=idcard",
    location: "Main Entrance",
    timePosted: "2 days ago",
    status: "found" as const,
    description: "Found a student ID card",
  },
  {
    id: "6",
    name: "Water Bottle",
    image: "/placeholder.svg?key=bottle",
    location: "Sports Field",
    timePosted: "2 days ago",
    status: "found" as const,
    description: "Blue metal water bottle",
  },
  {
    id: "7",
    name: "Glasses Case",
    image: "/placeholder.svg?key=glasses",
    location: "Lecture Hall B",
    timePosted: "3 days ago",
    status: "lost" as const,
    description: "Black leather glasses case",
  },
  {
    id: "8",
    name: "USB Flash Drive",
    image: "/placeholder.svg?key=usb",
    location: "Printing Room",
    timePosted: "3 days ago",
    status: "returned" as const,
    description: "32GB USB drive, returned",
  },
]

export default function LostFoundPage() {
  const [activeTab, setActiveTab] = useState("lost")
  const [searchQuery, setSearchQuery] = useState("")
  const [isReportOpen, setIsReportOpen] = useState(false)

  const filteredItems = items.filter((item) => {
    const matchesTab = activeTab === "report" || item.status === activeTab
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const stats = {
    lost: items.filter((i) => i.status === "lost").length,
    found: items.filter((i) => i.status === "found").length,
    returned: items.filter((i) => i.status === "returned").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Lost & Found</h1>
          <p className="text-muted-foreground">Help reunite items with their owners</p>
        </div>
        <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
          <DialogTrigger asChild>
            <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
              <Plus className="mr-2 h-4 w-4" />
              Report Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg p-0 border-none bg-transparent">
            <DialogHeader>
              <DialogTitle>Report Item</DialogTitle>
            </DialogHeader>
            <ReportForm onClose={() => setIsReportOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF4D4F]/10">
            <AlertCircle className="h-5 w-5 text-[#FF4D4F]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.lost}</p>
            <p className="text-xs text-muted-foreground">Lost Items</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#27C46B]/10">
            <Package className="h-5 w-5 text-[#27C46B]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.found}</p>
            <p className="text-xs text-muted-foreground">Found Items</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl bg-card p-4 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#AAC4F5]/20">
            <CheckCircle className="h-5 w-5 text-[#AAC4F5]" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{stats.returned}</p>
            <p className="text-xs text-muted-foreground">Returned</p>
          </div>
        </div>
      </div>

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

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {tabs.slice(0, 2).map((tab) => (
          <Button
            key={tab.value}
            variant={activeTab === tab.value ? "default" : "ghost"}
            className={`rounded-xl px-4 whitespace-nowrap ${activeTab === tab.value
              ? "bg-primary text-primary-foreground shadow-md"
              : "bg-card hover:bg-muted text-foreground"
              }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.name}
          </Button>
        ))}
      </div>

      {/* Items Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <ItemCard key={item.id} {...item} />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
