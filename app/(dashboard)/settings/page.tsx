"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Shield, Bell, Palette, LinkIcon, Camera } from "lucide-react"

const sidebarTabs = [
  { name: "Profile", icon: User },
  { name: "Security", icon: Shield },
  { name: "Notifications", icon: Bell },
  { name: "Preferences", icon: Palette },
  { name: "Integrations", icon: LinkIcon },
]

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <nav className="flex gap-2 overflow-x-auto pb-2 lg:w-56 lg:flex-col lg:overflow-visible lg:pb-0">
          {sidebarTabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                activeTab === tab.name
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              <tab.icon className="h-4 w-4" />
              {tab.name}
            </button>
          ))}
        </nav>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "Profile" && (
            <Card className="rounded-2xl border-none bg-secondary shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Profile Settings</CardTitle>
                <CardDescription>Update your personal information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-4 border-card shadow-md">
                      <AvatarImage src="/abstract-profile.png" />
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">JD</AvatarFallback>
                    </Avatar>
                    <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-colors">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Profile Photo</p>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                      First Name
                    </Label>
                    <Input id="firstName" defaultValue="John" className="rounded-xl bg-input" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                      Last Name
                    </Label>
                    <Input id="lastName" defaultValue="Doe" className="rounded-xl bg-input" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="mb-2 block text-sm font-medium">
                    Email
                  </Label>
                  <Input id="email" type="email" defaultValue="john@example.com" className="rounded-xl bg-input" />
                </div>

                <div>
                  <Label htmlFor="bio" className="mb-2 block text-sm font-medium">
                    Bio
                  </Label>
                  <Textarea
                    id="bio"
                    defaultValue="Full-stack developer passionate about building great user experiences."
                    className="min-h-[100px] resize-none rounded-xl bg-input"
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="mb-2 block text-sm font-medium">
                    Location
                  </Label>
                  <Input id="location" defaultValue="San Francisco, CA" className="rounded-xl bg-input" />
                </div>

                <div>
                  <Label htmlFor="website" className="mb-2 block text-sm font-medium">
                    Website
                  </Label>
                  <Input id="website" defaultValue="https://johndoe.dev" className="rounded-xl bg-input" />
                </div>

                <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "Security" && (
            <Card className="rounded-2xl border-none bg-secondary shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Security Settings</CardTitle>
                <CardDescription>Manage your password and security options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label htmlFor="currentPassword" className="mb-2 block text-sm font-medium">
                    Current Password
                  </Label>
                  <Input id="currentPassword" type="password" className="rounded-xl bg-input" />
                </div>

                <div>
                  <Label htmlFor="newPassword" className="mb-2 block text-sm font-medium">
                    New Password
                  </Label>
                  <Input id="newPassword" type="password" className="rounded-xl bg-input" />
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium">
                    Confirm New Password
                  </Label>
                  <Input id="confirmPassword" type="password" className="rounded-xl bg-input" />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-card p-4">
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <Switch />
                </div>

                <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "Notifications" && (
            <Card className="rounded-2xl border-none bg-secondary shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Notification Settings</CardTitle>
                <CardDescription>Choose what notifications you receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Email Notifications", description: "Receive email updates" },
                  { title: "Push Notifications", description: "Receive push notifications" },
                  { title: "Discussion Replies", description: "When someone replies to your posts" },
                  { title: "Query Answers", description: "When someone answers your questions" },
                  { title: "New Followers", description: "When someone follows you" },
                  { title: "Mentions", description: "When someone mentions you" },
                  { title: "Weekly Digest", description: "Weekly summary of activity" },
                ].map((item) => (
                  <div key={item.title} className="flex items-center justify-between rounded-xl bg-card p-4">
                    <div>
                      <p className="font-medium text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}

                <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "Preferences" && (
            <Card className="rounded-2xl border-none bg-secondary shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Preferences</CardTitle>
                <CardDescription>Customize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="mb-2 block text-sm font-medium">Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger className="rounded-xl bg-input">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="mb-2 block text-sm font-medium">Timezone</Label>
                  <Select defaultValue="pst">
                    <SelectTrigger className="rounded-xl bg-input">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="gmt">GMT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between rounded-xl bg-card p-4">
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">Toggle dark theme</p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between rounded-xl bg-card p-4">
                  <div>
                    <p className="font-medium text-foreground">Compact Mode</p>
                    <p className="text-sm text-muted-foreground">Reduce spacing in lists</p>
                  </div>
                  <Switch />
                </div>

                <Button className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90">
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "Integrations" && (
            <Card className="rounded-2xl border-none bg-secondary shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold text-foreground">Integrations</CardTitle>
                <CardDescription>Connect with third-party services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { name: "GitHub", status: "Connected", connected: true },
                  { name: "Google", status: "Connected", connected: true },
                  { name: "Slack", status: "Not connected", connected: false },
                  { name: "Discord", status: "Not connected", connected: false },
                ].map((integration) => (
                  <div key={integration.name} className="flex items-center justify-between rounded-xl bg-card p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <LinkIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{integration.name}</p>
                        <p className={`text-sm ${integration.connected ? "text-[#16A34A]" : "text-muted-foreground"}`}>
                          {integration.status}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={integration.connected ? "outline" : "default"}
                      className={`rounded-xl ${!integration.connected ? "bg-primary text-primary-foreground hover:bg-primary/90" : ""}`}
                    >
                      {integration.connected ? "Disconnect" : "Connect"}
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
