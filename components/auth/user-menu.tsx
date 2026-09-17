"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Shield,
  LogOut,
  Flame,
  Settings,
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
 * UserMenu — Top-right authenticated user dropdown
 *
 * Streamlined editorial dropdown presenting only:
 * 1. My Dashboard
 * 2. Account Settings
 * (Plus Admin Console if user has admin permissions and Sign Out)
 */
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

  // XP and streak display
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
        className={`relative flex items-center gap-2.5 rounded-full border transition-all cursor-pointer shadow-2xs pl-2 pr-3.5 py-1.5 text-xs sm:text-[13px] font-medium ${
          isOpen
            ? "border-primary/50 bg-secondary text-foreground shadow-xs"
            : "border-border/80 dark:border-white/15 bg-secondary/50 hover:bg-secondary/80 text-foreground"
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Open user profile menu"
      >
        {/* Avatar */}
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-primary font-bold text-[11px] uppercase border border-primary/25 overflow-hidden shrink-0">
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 z-10">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500 border border-background" />
          </span>
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
        <span className="text-xs sm:text-[13px] font-medium text-foreground/90 max-w-[110px] truncate">
          {displayName}
        </span>
        <ChevronDown
          className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${
            isOpen ? "rotate-180 text-primary" : ""
          }`}
        />
      </button>

      {/* Hover tunnel */}
      <div className="absolute top-full right-0 w-full h-3 z-40 pointer-events-auto" />

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-full pt-2 w-[275px] z-50 pointer-events-auto"
          >
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card/98 p-2.5 shadow-xl">
              {/* User Identity Card */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/60 border border-border mb-2.5">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-primary font-bold text-xs uppercase border border-border overflow-hidden">
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
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background z-10" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-[13px] font-semibold text-foreground truncate tracking-tight">
                      {displayName}
                    </p>
                    <span
                      className={`shrink-0 text-[8.5px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full font-bold border ${
                        isAdmin
                          ? "bg-destructive/15 text-destructive border-destructive/30"
                          : "bg-secondary text-foreground border-border"
                      }`}
                    >
                      {userRoleBadge}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground truncate font-mono mt-0.5">
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              {(xp > 0 || streak > 0) && (
                <div className="flex items-center gap-2 px-1 mb-2.5">
                  {xp > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-foreground bg-secondary border border-border rounded-full px-2.5 py-0.5">
                      ✦ {xp.toLocaleString()} XP
                    </span>
                  )}
                  {streak > 0 && (
                    <span className="flex items-center gap-1 text-[10px] font-mono font-medium text-muted-foreground bg-secondary border border-border rounded-full px-2.5 py-0.5">
                      <Flame className="h-2.5 w-2.5 text-primary" />
                      {streak} day streak
                    </span>
                  )}
                </div>
              )}

              {/* Navigation Links — Dashboard & Account Settings Only */}
              <div className="flex flex-col gap-1">
                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="group flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-border hover:bg-secondary/70 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors">
                      <LayoutDashboard className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors block">
                        My Dashboard
                      </span>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">
                        Curriculum, progress & XP
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>

                <Link
                  href="/profile"
                  onClick={closeMenu}
                  className="group flex items-center justify-between p-2.5 rounded-xl border border-transparent hover:border-border hover:bg-secondary/70 transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary text-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors">
                      <Settings className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors block">
                        Account Settings
                      </span>
                      <p className="text-[10px] text-muted-foreground line-clamp-1">
                        Preferences & security
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-0.5 transition-all shrink-0" />
                </Link>

                {isAdmin && (
                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-destructive/20 bg-destructive/5 hover:bg-destructive/10 transition-all mt-0.5"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-destructive/30 bg-destructive/10 text-destructive transition-colors">
                        <Shield className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-destructive">
                            Admin Console
                          </span>
                          <span className="text-[8px] font-mono uppercase px-1 rounded bg-destructive/20 text-destructive font-bold">
                            Full Access
                          </span>
                        </div>
                        <p className="text-[10px] text-destructive/70 line-clamp-1">
                          Manage users & courses
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-destructive/60 group-hover:translate-x-0.5 transition-all shrink-0" />
                  </Link>
                )}
              </div>

              {/* Divider */}
              <div className="my-2 border-t border-border/50 dark:border-white/10" />

              {/* Sign Out */}
              <button
                type="button"
                onClick={() => {
                  closeMenu()
                  onSignOut()
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-all cursor-pointer group"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/60 group-hover:border-destructive/30 bg-secondary/50 group-hover:bg-destructive/10 text-muted-foreground group-hover:text-destructive transition-colors">
                  <LogOut className="h-3.5 w-3.5" />
                </div>
                <span>Sign Out</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
