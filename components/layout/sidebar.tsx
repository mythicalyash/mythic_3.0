"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Sparkles, HelpCircle, FileText, Search, Trophy, Settings, BookOpen, Map as MapIcon, Compass, MessageSquare, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "Campus Map", href: "/campus-map", icon: MapIcon },
  { name: "Nearby", href: "/nearby", icon: Compass },
  { name: "AI Tools", href: "/ai-tools", icon: Sparkles },
  { name: "Query", href: "/query", icon: HelpCircle },
  { name: "Study Hub", href: "/study-hub", icon: BookOpen },
  { name: "Clubs & Community", href: "/clubs", icon: Users },
  { name: "Lost & Found", href: "/lost-found", icon: Search },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
  { name: "Feedback", href: "/feedback", icon: MessageSquare },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-sidebar border-r border-border">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-foreground">Mythics</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground",
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* Admin Switch - Temporary */}
      <div className="px-4 pb-2">
        <Link
          href="/admin"
          className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
        >
          <Sparkles className="h-4 w-4" />
          Switch to Admin
        </Link>
      </div>

      {/* User Card */}
      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-xl bg-muted p-3 shadow-sm">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src="/stylized-user-avatar.png" />
            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-semibold text-foreground">John Doe</p>
            <p className="truncate text-xs text-muted-foreground">Pro Member</p>
          </div>
          <Link href="/settings" className="rounded-lg p-2 hover:bg-sidebar-accent transition-colors">
            <Settings className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </aside>
  )
}
