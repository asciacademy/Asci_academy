"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import {
    LayoutDashboard, Users, BookOpen, MessageSquare, Settings,
    Megaphone, ChevronLeft, ChevronRight, LogOut, Shield, ExternalLink
} from "lucide-react"

const navLinks = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard, exact: true },
    { name: "Users", href: "/admin/users", icon: Users },
    { name: "Courses", href: "/admin/courses", icon: BookOpen },
    { name: "Testimonials", href: "/admin/testimonials", icon: MessageSquare },
    { name: "Announcements", href: "/admin/announcements", icon: Megaphone },
    { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminSidebar({ userName, userRole }: { userName: string; userRole: string }) {
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false)

    const isActive = (href: string, exact?: boolean) => {
        if (exact) return pathname === href
        return pathname.startsWith(href)
    }

    const handleSignOut = async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        window.location.href = "/"
    }

    return (
        <>
            {/* Mobile Top Bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#141413] border-b border-white/10 z-40 flex items-center px-4 gap-3 text-[#FDFBF7]">
                <Link href="/" className="font-serif text-lg text-[#FDFBF7]">
                    ASCI
                </Link>
                <span className="text-[10px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                    Admin
                </span>
                <div className="ml-auto flex items-center gap-1">
                    {navLinks.map(l => (
                        <Link
                            key={l.href}
                            href={l.href}
                            className={`p-2 rounded-lg transition-colors ${
                                isActive(l.href, l.exact)
                                    ? "text-primary bg-white/5"
                                    : "text-zinc-400 hover:text-[#FDFBF7]"
                            }`}
                            title={l.name}
                        >
                            <l.icon className="h-4 w-4" />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Desktop Sidebar */}
            <aside
                className={`hidden md:flex fixed top-0 left-0 h-screen flex-col bg-[#141413] border-r border-white/10 z-50 transition-all duration-300 ${
                    collapsed ? "w-[68px]" : "w-64"
                }`}
            >
                {/* Brand Header */}
                <div className="flex items-center justify-between px-4 h-16 border-b border-white/10 flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2.5 min-w-0">
                        <span className="font-serif text-xl tracking-tight text-[#FDFBF7]">
                            ASCI
                        </span>
                        {!collapsed && (
                            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30">
                                Admin
                            </span>
                        )}
                    </Link>
                    <button
                        onClick={() => setCollapsed(v => !v)}
                        className="text-zinc-400 hover:text-[#FDFBF7] transition-colors p-1.5 rounded-lg hover:bg-white/5 cursor-pointer"
                        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>

                {/* User Identity Pill */}
                {!collapsed && (
                    <div className="mx-3 mt-4 mb-2 p-3 bg-white/5 border border-white/10 rounded-xl">
                        <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                                {(userName?.[0] || "A").toUpperCase()}
                            </div>
                            <div className="min-w-0 flex-1">
                                <div className="text-xs font-medium text-[#FDFBF7] truncate">{userName}</div>
                                <div className="text-[10px] font-mono text-primary uppercase tracking-wider flex items-center gap-1">
                                    <Shield className="h-2.5 w-2.5" />
                                    {userRole}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Navigation Menu */}
                <div className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
                    {navLinks.map(link => {
                        const active = isActive(link.href, link.exact)
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                                    active
                                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                        : "text-zinc-400 hover:text-[#FDFBF7] hover:bg-white/5"
                                }`}
                                title={collapsed ? link.name : undefined}
                            >
                                <link.icon className={`h-4 w-4 shrink-0 ${active ? "text-primary-foreground" : "text-zinc-400"}`} />
                                {!collapsed && <span>{link.name}</span>}
                            </Link>
                        )
                    })}
                </div>

                {/* Footer Controls */}
                <div className="p-3 border-t border-white/10 flex flex-col gap-1">
                    <Link
                        href="/"
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-[#FDFBF7] hover:bg-white/5 transition-colors"
                        title={collapsed ? "Public Site" : undefined}
                    >
                        <ExternalLink className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>View Public Site</span>}
                    </Link>
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors w-full text-left"
                        title={collapsed ? "Sign Out" : undefined}
                    >
                        <LogOut className="h-4 w-4 shrink-0" />
                        {!collapsed && <span>Sign Out</span>}
                    </button>
                </div>
            </aside>
        </>
    )
}
