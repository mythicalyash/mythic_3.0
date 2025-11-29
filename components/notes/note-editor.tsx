"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Bold, Italic, Underline, List, ListOrdered, Link, ImageIcon, Code, Save, Bell, Star } from "lucide-react"

interface NoteEditorProps {
  note?: {
    id: string
    title: string
    content: string
    category: string
  }
}

export function NoteEditor({ note }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || "")
  const [content, setContent] = useState(note?.content || "")
  const [category, setCategory] = useState(note?.category || "general")
  const [isMarkdown, setIsMarkdown] = useState(false)
  const [hasReminder, setHasReminder] = useState(false)

  const toolbarButtons = [
    { icon: Bold, label: "Bold" },
    { icon: Italic, label: "Italic" },
    { icon: Underline, label: "Underline" },
    { icon: List, label: "Bullet List" },
    { icon: ListOrdered, label: "Numbered List" },
    { icon: Link, label: "Link" },
    { icon: ImageIcon, label: "Image" },
    { icon: Code, label: "Code" },
  ]

  return (
    <Card className="h-full rounded-2xl border-none bg-card shadow-sm">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="border-none bg-transparent text-xl font-bold shadow-none focus-visible:ring-0 p-0"
          />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-lg hover:bg-muted">
              <Star className="h-4 w-4" />
            </Button>
            <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="mt-4 flex flex-wrap items-center gap-1 rounded-xl bg-muted p-2">
          {toolbarButtons.map((button) => (
            <Button
              key={button.label}
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-lg hover:bg-card"
              title={button.label}
            >
              <button.icon className="h-4 w-4" />
            </Button>
          ))}
          <div className="mx-2 h-6 w-px bg-border" />
          <div className="flex items-center gap-2">
            <Label htmlFor="markdown-toggle" className="text-xs text-muted-foreground">
              Markdown
            </Label>
            <Switch id="markdown-toggle" checked={isMarkdown} onCheckedChange={setIsMarkdown} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4 p-4">
        {/* Category & Reminder */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <Label className="mb-2 block text-sm text-muted-foreground">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="rounded-xl bg-input">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="work">Work</SelectItem>
                <SelectItem value="study">Study</SelectItem>
                <SelectItem value="ideas">Ideas</SelectItem>
                <SelectItem value="personal">Personal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <div className="flex items-center gap-2 rounded-xl bg-muted px-4 py-2">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="reminder-toggle" className="text-sm text-muted-foreground">
                Reminder
              </Label>
              <Switch id="reminder-toggle" checked={hasReminder} onCheckedChange={setHasReminder} />
            </div>
          </div>
        </div>

        {/* Editor */}
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Start writing your note..."
          className="min-h-[400px] flex-1 resize-none rounded-xl bg-input border-none shadow-sm focus-visible:ring-primary"
        />
      </CardContent>
    </Card>
  )
}
