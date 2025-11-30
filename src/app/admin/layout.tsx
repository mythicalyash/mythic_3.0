"use client"

import { AdminSidebar, MobileAdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <div className="flex-1 flex flex-col lg:ml-64 transition-all duration-300">
                <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6 lg:hidden">
                    <MobileAdminSidebar />
                    <span className="font-semibold">Admin Panel</span>
                </header>
                <main className="flex-1 p-4 lg:p-8">{children}</main>
            </div>
        </div>
    )
}
