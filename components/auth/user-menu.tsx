"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  LayoutDashboard,
  BookOpen,
  Briefcase,
  FolderGit2,
  Bookmark,
  Award,
  Trophy,
  User,
  Settings,
  Shield,
  LogOut,
  Flame,
} from "lucide-react"

interface UserMenuProps {
  user: any
  userProfile: any
  isAdmin: boolean
  displayName: string
  userInitials: string
  navAvatar: string | null
  userRoleBadge: string
  wishlistCount?: number
  onSignOut: () => void
  onOpenWishlist?: () => void
}

/**
 * Exact 9 Profile Menu Items as specified in Phase 3:
 * 1. Dashboard
 * 2. My Learning
 * 3. Applications
 * 4. Projects
 * 5. Saved
 * 6. Certificates
 * 7. Achievements
 * 8. Profile
 * 9. Settings
 */
const PROFILE_MENU_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Learning", href: "/learning", icon: BookOpen },
  { label: "Applications", href: "/applications", icon: Briefcase },
  { label: "Projects", href: "/projects", icon: FolderGit2 },
  { label: "Saved", href: "/saved", icon: Bookmark },
  { label: "Certificates", href: "/certificates", icon: Award },
  { label: "Achievements", href: "/achievements", icon: Trophy },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
]

export function UserMenu({
  user,
  userProfile,
  isAdmin,
  displayName,
  userInitials,
  navAvatar,
  userRoleBadge,
  onSignOut,
}: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Close on click outside or escape key
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("touchstart", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("touchstart", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setIsOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 200)
  }, [])

  const closeMenu = useCallback(() => setIsOpen(false), [])

  const xp = userProfile?.xp ?? 0
  const streak = userProfile?.streak_count ?? userProfile?.streak ?? 0

  return (
    <div
      ref={menuRef}
      className="relative py-1"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`relative flex items-center gap-2 rounded-full border transition-all cursor-pointer pl-1.5 pr-2.5 py-1 text-xs font-medium ${
          isOpen
            ? "border-primary/50 bg-secondary text-foreground shadow-2xs"
            : "border-border bg-card hover:bg-secondary text-foreground"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open profile menu"
      >
        {/* Avatar */}
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-[11px] uppercase border border-primary/20 overflow-hidden shrink-0">
          {navAvatar ? (
            <img
              src={navAvatar}
              alt={displayName}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            userInitials
          )}
        </span>
        <span className="hidden sm:inline-block text-xs font-semibold text-foreground/90 max-w-[90px] truncate">
          {displayName}
        </span>
        <ChevronDown
          className={`h-3 w-3 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Hover tunnel */}
      <div className="absolute top-full right-0 w-full h-2 z-40 pointer-events-auto" />

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.98 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute right-0 top-full pt-1.5 w-[260px] z-50 pointer-events-auto"
          >
            <div className="relative overflow-hidden rounded-xl border border-border bg-card p-2 shadow-lg">
              {/* User Identity Header */}
              <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-secondary/50 border border-border mb-2">
                <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs uppercase border border-primary/20 overflow-hidden">
                  {navAvatar ? (
                    <img
                      src={navAvatar}
                      alt={displayName}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    userInitials
                  )}
                  <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-background z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {displayName}
                    </p>
                    <span
                      className={`shrink-0 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded font-bold border ${
                        isAdmin
                          ? "bg-destructive/10 text-destructive border-destructive/20"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {userRoleBadge}
                    </span>
                  </div>
                  <p className="text-[10px] text-muted-foreground truncate font-mono mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Stats Bar */}
              {(xp > 0 || streak > 0) && (
                <div className="flex items-center gap-1.5 px-1 mb-2">
                  {xp > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-foreground bg-secondary border border-border rounded-md px-2 py-0.5">
                      ✦ {xp.toLocaleString()} XP
                    </span>
                  )}
                  {streak > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-muted-foreground bg-secondary border border-border rounded-md px-2 py-0.5">
                      <Flame className="h-2.5 w-2.5 text-primary" />
                      {streak}d streak
                    </span>
                  )}
                </div>
              )}

              {/* Exact 9 Profile Navigation Links */}
              <div className="flex flex-col gap-0.5">
                {PROFILE_MENU_ITEMS.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={closeMenu}
                      className="group flex items-center justify-between px-2.5 py-1.5 rounded-md hover:bg-secondary text-xs font-medium text-foreground hover:text-primary transition-colors"
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span>{item.label}</span>
                      </div>
                    </Link>
                  )
                })}

                {/* Admin Console Link (if Admin) */}
                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    className="group flex items-center justify-between px-2.5 py-1.5 rounded-md bg-destructive/5 hover:bg-destructive/10 text-xs font-medium text-destructive transition-colors mt-1 border border-destructive/20"
                  >
                    <div className="flex items-center gap-2.5">
                      <Shield className="h-3.5 w-3.5 text-destructive" />
                      <span>Admin Console</span>
                    </div>
                    <span className="text-[8px] font-mono uppercase px-1 rounded bg-destructive/20 text-destructive font-bold">
                      Admin
                    </span>
                  </Link>
                )}
              </div>

              {/* Divider */}
              <div className="my-1.5 border-t border-border" />

              {/* Sign Out */}
              <button
                type="button"
                onClick={() => {
                  closeMenu()
                  onSignOut()
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
