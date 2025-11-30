"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Upload, X } from "lucide-react"

interface ReportFormProps {
  onClose?: () => void
}

export function ReportForm({ onClose }: ReportFormProps) {
  const [images, setImages] = useState<string[]>([])
  const [itemType, setItemType] = useState<string>("")

  const handleImageUpload = () => {
    // Simulate image upload
    setImages((prev) => [...prev, `/placeholder.svg?key=${Math.random()}`])
  }

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <Card className="rounded-2xl border-none bg-card shadow-lg">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">Report Item</CardTitle>
            <CardDescription>Fill in the details about the lost or found item</CardDescription>
          </div>
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-lg">
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Image Upload */}
        <div>
          <Label className="mb-2 block text-sm font-medium">Images</Label>
          <div className="flex flex-wrap gap-3">
            {images.map((img, index) => (
              <div key={index} className="group relative h-24 w-24 overflow-hidden rounded-xl bg-muted">
                <img src={img || "/placeholder.svg"} alt="Uploaded" className="h-full w-full object-cover" />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button
              onClick={handleImageUpload}
              className="flex h-24 w-24 flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border bg-muted text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Upload className="h-6 w-6" />
              <span className="text-xs">Upload</span>
            </button>
          </div>
        </div>

        {/* Item Type */}
        <div>
          <Label htmlFor="itemType" className="mb-2 block text-sm font-medium">
            Item Type
          </Label>
          <Select value={itemType} onValueChange={setItemType}>
            <SelectTrigger className="rounded-xl bg-input">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="lost">Lost Item</SelectItem>
              <SelectItem value="found">Found Item</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div>
          <Label htmlFor="title" className="mb-2 block text-sm font-medium">
            Item Name
          </Label>
          <Input id="title" placeholder="e.g., Black iPhone 15 Pro" className="rounded-xl bg-input" />
        </div>

        {/* Location */}
        <div>
          <Label htmlFor="location" className="mb-2 block text-sm font-medium">
            Location
          </Label>
          <Input id="location" placeholder="e.g., Library Building, 2nd Floor" className="rounded-xl bg-input" />
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </Label>
          <Textarea
            id="description"
            placeholder="Provide additional details about the item..."
            className="min-h-[100px] resize-none rounded-xl bg-input"
          />
        </div>

        {/* Contact Info */}
        <div>
          <Label htmlFor="contact" className="mb-2 block text-sm font-medium">
            Contact Information
          </Label>
          <Input id="contact" placeholder="Email or phone number" className="rounded-xl bg-input" />
        </div>

        {/* Submit Button */}
        <div className="flex gap-3 pt-2">
          {onClose && (
            <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl bg-transparent">
              Cancel
            </Button>
          )}
          <Button className="flex-1 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
            Submit Report
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
