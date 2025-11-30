import type React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
    Home,
    MessageSquare,
    Megaphone,
    BookOpen,
    MessageCircle,
    Trophy,
    Settings,
    Sparkles,
    Search,
    Menu,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"

const navigation = [
    { name: "Admin Home", href: "/admin", icon: Home },
    { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { name: "Admin Study Hub", href: "/admin/study-hub", icon: BookOpen },
    { name: "Lost & Found", href: "/admin/lost-found", icon: Search },
    { name: "Feedback Review", href: "/admin/feedback", icon: MessageCircle },
    { name: "Leaderboard", href: "/admin/leaderboard", icon: Trophy },
]

function SidebarContent() {
    const pathname = usePathname()

    return (
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex h-16 items-center justify-between px-6">
                <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-md">
                        <Sparkles className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="text-xl font-bold text-foreground">Admin Panel</span>
                </div>
                <ThemeToggle />
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
                                    : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
                            )}
                        >
                            <item.icon className="h-5 w-5" />
                            {item.name}
                        </Link>
                    )
                })}
            </nav>

            {/* Student Switch - Temporary */}
            <div className="px-4 pb-2">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 rounded-xl bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
                >
                    <Home className="h-4 w-4" />
                    Switch to Student
                </Link>
            </div>

            {/* User Card */}
            <div className="border-t border-border p-4">
                <div className="flex items-center gap-3 rounded-xl bg-muted p-3 shadow-sm">
                    <Avatar className="h-10 w-10 border-2 border-primary">
                        <AvatarImage src="/admin-avatar.png" />
                        <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-semibold text-foreground">Admin User</p>
                        <p className="truncate text-xs text-muted-foreground">Administrator</p>
                    </div>
                    <Link href="/settings" className="rounded-lg p-2 hover:bg-sidebar-accent transition-colors">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export function AdminSidebar() {
    return (
        <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-sidebar border-r border-border">
            <SidebarContent />
        </aside>
    )
}

export function MobileAdminSidebar() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle sidebar</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0 bg-sidebar border-r border-border">
                <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                <SidebarContent />
            </SheetContent>
        </Sheet>
    )
}
