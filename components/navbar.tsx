"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Menu,
  X,
  ChevronDown,
  Search,
  ArrowRight,
  User,
  Shield,
  LayoutDashboard,
  BookOpen,
  Code2,
  Layers,
  Server,
  Braces,
  Cpu,
  Network,
  Database,
  GraduationCap,
  Award,
  Users,
  Terminal,
  PlayCircle,
  ArrowUpRight,
  Compass,
  FolderGit2,
  Flame,
  LogOut,
  Bookmark,
  Clock,
} from "lucide-react"
import { createClient } from "@/utils/supabase/client"
import { ThemeToggle } from "@/components/theme-toggle"
import { AsciLogo } from "@/components/asci-logo"
import { SearchCommandDialog } from "@/components/search-command-dialog"
import { UserMenu } from "@/components/auth/user-menu"
import { WishlistDrawer } from "@/components/courses/wishlist-drawer"
import { useWishlist } from "@/lib/user-learning-store"
import { useUserSettings } from "@/context/user-settings-context"
import { useAuth } from "@/context/auth-context"
import { extractFirstName, getInitials } from "@/lib/user-utils"

interface NavSubItem {
  title: string
  desc: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  badge?: string
}

interface NavItem {
  label: string
  href: string
  hasDropdown: boolean
  dropdownWidth?: string
  alignClass?: string
  items?: NavSubItem[]
  footerLink?: { label: string; href: string }
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Courses",
    href: "/programs",
    hasDropdown: true,
    dropdownWidth: "w-[380px]",
    alignClass: "left-0",
    items: [
      {
        title: "Java & Spring Boot",
        desc: "Complete guide from basics to building enterprise web apps",
        href: "/programs/java",
        icon: Cpu,
        badge: "Popular",
      },
      {
        title: "Python for Developers",
        desc: "Learn modern Python, APIs, automation, and backend",
        href: "/programs/python",
        icon: Terminal,
        badge: "Popular",
      },
      {
        title: "Backend Development",
        desc: "Build fast web servers, databases, and microservices",
        href: "/programs/backend",
        icon: Braces,
      },
      {
        title: "Modern React & Web",
        desc: "Learn React, Next.js, and modern website design",
        href: "/programs/react",
        icon: Layers,
      },
      {
        title: "System Design Basics",
        desc: "Learn how apps like Netflix and Uber scale to millions",
        href: "/programs/system-design",
        icon: Network,
      },
      {
        title: "Practical AI & Apps",
        desc: "Build practical AI applications and tools",
        href: "/courses/agentic-ai",
        icon: Cpu,
        badge: "New",
      },
    ],
    footerLink: { label: "View All 29 Courses", href: "/programs" },
  },
  {
    label: "Practice & DSA",
    href: "/dsa",
    hasDropdown: true,
    dropdownWidth: "w-[350px]",
    alignClass: "left-[-40px]",
    items: [
      {
        title: "Complete DSA Sheet",
        desc: "474 hand-picked coding problems with visual guides",
        href: "/dsa/a2z-sheet",
        icon: Code2,
        badge: "474 Problems",
      },
      {
        title: "Top 75 Interview Questions",
        desc: "Most common questions asked in technical interviews",
        href: "/dsa",
        icon: Award,
        badge: "Essential",
      },
      {
        title: "Browse All Problems",
        desc: "Filter by topic, difficulty, and company tags",
        href: "/dsa/problems",
        icon: FolderGit2,
      },
      {
        title: "Code Editor & AI Tutor",
        desc: "Write and test code with friendly step-by-step help",
        href: "/dsa/problems/1",
        icon: Terminal,
        badge: "Interactive",
      },
    ],
    footerLink: { label: "Open Practice Workspace", href: "/dsa" },
  },
  {
    label: "Pricing",
    href: "/pricing",
    hasDropdown: false,
  },
  {
    label: "Community",
    href: "/community",
    hasDropdown: true,
    dropdownWidth: "w-[340px]",
    alignClass: "right-0",
    items: [
      {
        title: "Discord Community",
        desc: "Join thousands of learners for help and live events",
        href: "/community",
        icon: Users,
        badge: "10k+",
      },
      {
        title: "Student Success Stories",
        desc: "Real outcomes, job placements, and reviews",
        href: "/results",
        icon: Award,
        badge: "96% Placed",
      },
      {
        title: "Student Projects",
        desc: "Real web apps and projects built by our students",
        href: "/portfolio",
        icon: FolderGit2,
      },
      {
        title: "Career Paths",
        desc: "Step-by-step guides for different engineering roles",
        href: "/degrees",
        icon: GraduationCap,
      },
      {
        title: "Verify Credential",
        desc: "Validate official Gravit certificates & completion serials",
        href: "/verify",
        icon: Shield,
        badge: "Gravit",
      },
    ],
    footerLink: { label: "Join Discord Community", href: "/community" },
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { settings } = useUserSettings()
  const { user: authUser, profile: authProfile, signOut: authSignOut, error: authError, clearError: authClearError } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [wishlistDrawerOpen, setWishlistDrawerOpen] = useState(false)
  const { count: wishlistCount } = useWishlist()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Demo bypass fallback for mock demo sessions
  const demoBypassUser = typeof document !== "undefined" && !authUser ? (() => {
    const match = document.cookie.match(/(^| )demo_bypass=([^;]+)/)
    if (match) {
      const isDemoAdmin = match[2] === "admin"
      return {
        user: {
          id: "demo-user-id",
          email: isDemoAdmin ? "admin@asci.edu" : "fellow@asci.edu",
          user_metadata: { full_name: isDemoAdmin ? "ASCI Administrator" : "ASCI Fellow", avatar_url: null, picture: null },
        } as any,
        profile: {
          id: "demo-user-id",
          name: isDemoAdmin ? "ASCI Administrator" : "ASCI Fellow",
          role: isDemoAdmin ? "admin" : "fellow",
          rank: isDemoAdmin ? "Admin" : "Fellow",
          avatar_url: null,
          xp: 0,
          streak_count: 0,
        } as any,
        isAdmin: isDemoAdmin,
      }
    }
    return null
  })() : null

  // Active user and profile derived directly from AuthContext as the single source of truth
  const user: any = authUser || demoBypassUser?.user || null
  const userProfile: any = authProfile || demoBypassUser?.profile || (user ? {
    id: user.id || "guest",
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Scholar",
    role: "user",
    rank: "Engineer",
    xp: 0,
    streak_count: 0,
    avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
  } : null)

  const isAdmin = authProfile?.role === "admin" || authProfile?.role === "super_admin" || Boolean(demoBypassUser?.isAdmin)

  const handleSignOut = async () => {
    try {
      if (typeof document !== "undefined" && document.cookie.includes("demo_bypass")) {
        document.cookie = "demo_bypass=; path=/; max-age=0"
      }
      await authSignOut()
    } catch (e) {
      console.warn("SignOut error:", e)
    } finally {
      setActiveDropdown(null)
    }
  }

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 15)
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
    }, 180)
  }

  const displayName = extractFirstName(
    userProfile,
    user?.user_metadata,
    user?.email
  )

  const userInitials = getInitials(displayName)
  const oauthAvatar = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null
  const navAvatar = userProfile?.avatar_url || settings.avatar || oauthAvatar || null

  const userRoleBadge = isAdmin
    ? "Admin"
    : userProfile?.role === "fellow"
    ? "Fellow"
    : userProfile?.rank || "Engineer"

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border/80 dark:border-white/10 bg-background/95 dark:bg-[#070709]/95 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.85)]"
          : "border-b border-border/60 dark:border-white/10 bg-background/90 dark:bg-[#070709]/90 backdrop-blur-2xl"
      }`}
    >
      {/* Soft Ambient Dimmer when Mega-Menu is open to guarantee 100% legibility over any page text or markdown */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setActiveDropdown(null)}
            className="fixed inset-0 top-16 sm:top-[68px] bg-black/40 dark:bg-black/70 backdrop-blur-xs z-40 pointer-events-auto"
          />
        )}
      </AnimatePresence>

      <div className="mx-auto flex h-16 sm:h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* 1. Brand Logo (Pure & Minimalist) */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.01]"
        >
          <AsciLogo size={36} showText showBadge badgeText="Academy" useVector={false} />
        </Link>

        {/* 2. Desktop Navigation with Clean, Minimal Dropdown Flyouts */}
        <nav
          className="hidden lg:flex items-center gap-2"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((section) => {
            const isOpen = activeDropdown === section.label

            if (!section.hasDropdown) {
              return (
                <Link
                  key={section.label}
                  href={section.href}
                  className="group/navlink relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium tracking-tight text-muted-foreground hover:bg-secondary/80 hover:text-foreground transition-all duration-150"
                >
                  <span>{section.label}</span>
                </Link>
              )
            }

            return (
              <div
                key={section.label}
                className="relative py-3"
                onMouseEnter={() => handleMouseEnter(section.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={section.href}
                  className={`group/navlink relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[14px] font-medium tracking-tight transition-all duration-150 ${
                    isOpen
                      ? "bg-secondary text-foreground shadow-2xs font-semibold"
                      : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
                  }`}
                >
                  <span>{section.label}</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 opacity-40 transition-transform duration-200 group-hover/navlink:opacity-80 ${
                      isOpen ? "rotate-180 opacity-100 text-primary" : ""
                    }`}
                  />
                </Link>

                {/* Invisible Hover Tunnel to prevent mouse drop */}
                <div className="absolute top-full left-0 right-0 h-4" />

                {/* Minimal Single-Column Flyout Card */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.985 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 6, scale: 0.985 }}
                      transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                      className={`absolute top-full z-50 pt-2 ${
                        section.alignClass || "left-0"
                      } ${section.dropdownWidth || "w-[360px]"}`}
                    >
                      <div className="relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/15 bg-card/98 dark:bg-[#0e0e11]/98 p-3 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_24px_70px_rgba(0,0,0,0.9)]">
                        {/* List of items */}
                        <div className="flex flex-col gap-1">
                          {section.items?.map((item) => {
                            const Icon = item.icon
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setActiveDropdown(null)}
                                className="group/item flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-secondary/70"
                              >
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-secondary/50 text-foreground transition-all duration-150 group-hover/item:border-primary/40 group-hover/item:bg-primary group-hover/item:text-primary-foreground mt-0.5">
                                  <Icon className="h-3.5 w-3.5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between gap-1.5">
                                    <span className="text-xs font-semibold text-foreground tracking-tight group-hover/item:text-primary transition-colors truncate">
                                      {item.title}
                                    </span>
                                    {item.badge && (
                                      <span className="shrink-0 text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.2 rounded-full bg-primary/10 text-primary font-medium border border-primary/20">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-muted-foreground/80 line-clamp-1 mt-0.5 leading-snug">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            )
                          })}
                        </div>

                        {/* Dropdown Bottom Quick Action Strip */}
                        {section.footerLink && (
                          <div className="mt-2 pt-2 border-t border-border/60 dark:border-white/10 flex items-center justify-between px-2 text-[11px]">
                            <Link
                              href={section.footerLink.href}
                              onClick={() => setActiveDropdown(null)}
                              className="group/fLink flex items-center gap-1 font-medium text-primary hover:text-primary-active transition-colors"
                            >
                              <span>{section.footerLink.label}</span>
                              <ArrowUpRight className="h-3 w-3 transition-transform group-hover/fLink:translate-x-0.5 group-hover/fLink:-translate-y-0.5" />
                            </Link>
                            <span className="flex items-center gap-1 text-[10px] font-mono text-muted-foreground/70">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#ea580c]" />
                              Active
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* 3. Right Action Gateway */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Search Icon Trigger (Minimalist & Snappy) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search ASCI curriculum & problems"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 dark:border-white/15 bg-secondary/30 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:border-primary/40 dark:hover:border-primary/50 shadow-2xs cursor-pointer"
            title="Search curriculum & problems (⌘K)"
          >
            <Search className="h-4 w-4 text-foreground/80 hover:text-primary transition-colors" />
          </button>

          {/* Saved Courses Wishlist Trigger */}
          <button
            type="button"
            onClick={() => setWishlistDrawerOpen(true)}
            aria-label="View Saved Courses Wishlist"
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/80 dark:border-white/15 bg-secondary/30 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:border-[#D4B872]/50 shadow-2xs cursor-pointer group"
            title="Saved Courses & Wishlist"
          >
            <Bookmark className="h-4 w-4 text-foreground/80 group-hover:text-[#D4B872] group-hover:fill-[#D4B872]/20 transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#D4B872] px-1 text-[9px] font-mono font-bold text-black shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Theme Toggle */}
          <ThemeToggle className="!h-10 !w-10" />

          {/* Structural Hairline Divider */}
          <div className="hidden md:block h-5 w-px bg-border/80 dark:border-white/15 mx-1" />

          {/* User Auth Gateway */}
          {user ? (
            <div className="hidden md:flex items-center gap-2.5">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/10 px-3.5 py-1.5 text-xs font-semibold text-destructive transition-all hover:bg-destructive/20"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>Admin</span>
                </Link>
              )}

              <UserMenu
                user={user}
                userProfile={userProfile}
                isAdmin={isAdmin}
                displayName={displayName}
                userInitials={userInitials}
                navAvatar={navAvatar}
                userRoleBadge={userRoleBadge}
                wishlistCount={wishlistCount}
                onSignOut={handleSignOut}
                onOpenWishlist={() => setWishlistDrawerOpen(true)}
              />
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2.5">
              <Link
                href="/login"
                className="rounded-full border border-transparent hover:border-border/80 dark:hover:border-white/15 px-4 py-2 text-xs sm:text-[13.5px] font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/70 transition-all cursor-pointer"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                suppressHydrationWarning
                className="group relative flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active px-5 py-2 text-xs sm:text-[13.5px] font-semibold text-primary-foreground shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all tracking-tight"
              >
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            suppressHydrationWarning
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border/80 dark:border-white/15 bg-secondary/30 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <div
              className={`transition-all duration-300 ${
                mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              } absolute`}
            >
              <Menu className="h-4.5 w-4.5" />
            </div>
            <div
              className={`transition-all duration-300 ${
                mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              } absolute`}
            >
              <X className="h-4.5 w-4.5" />
            </div>
          </button>
        </div>
      </div>

      {/* 4. Mobile Drawer Accordion */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border/80 dark:border-white/10 bg-background/98 dark:bg-[#0c0c0e]/98 backdrop-blur-3xl lg:hidden shadow-2xl"
          >
            <nav
              className="px-5 py-5 max-h-[82vh] overflow-y-auto"
              aria-label="Mobile navigation"
            >
              {/* Mobile Search Button */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setSearchOpen(true)
                }}
                className="w-full flex items-center justify-between rounded-xl border border-border/80 bg-secondary/70 px-3.5 py-2.5 text-sm text-muted-foreground hover:text-foreground mb-4 shadow-inner cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="h-4 w-4 text-primary" />
                  <span>Search curriculum, problems...</span>
                </div>
                <kbd className="rounded border border-border/80 bg-background/90 px-1.5 py-0.5 text-[9px] font-mono font-medium text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              {/* Sections List */}
              <div className="flex flex-col gap-2.5">
                {NAV_ITEMS.map((section) => {
                  if (!section.hasDropdown) {
                    return (
                      <Link
                        key={section.label}
                        href={section.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between rounded-xl border border-border/70 dark:border-white/10 bg-card/60 dark:bg-[#121216]/60 px-4 py-3 text-xs font-semibold text-foreground hover:text-primary transition-colors"
                      >
                        <span>{section.label}</span>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    )
                  }

                  return (
                    <div
                      key={section.label}
                      className="rounded-2xl border border-border/70 dark:border-white/10 bg-card/60 dark:bg-[#121216]/60 p-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-border/50">
                        <Link
                          href={section.href}
                          onClick={() => setMobileOpen(false)}
                          className="text-xs font-semibold text-foreground hover:text-primary transition-colors"
                        >
                          {section.label}
                        </Link>
                        {section.footerLink && (
                          <Link
                            href={section.footerLink.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-[10px] font-mono text-primary uppercase font-medium hover:underline"
                          >
                            View all →
                          </Link>
                        )}
                      </div>

                      <div className="mt-2 space-y-1">
                        {section.items?.map((item) => {
                          const Icon = item.icon
                          return (
                            <Link
                              key={item.title}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center justify-between rounded-lg px-2 py-1.5 text-xs text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <Icon className="h-3.5 w-3.5 text-primary shrink-0" />
                                <span className="truncate">{item.title}</span>
                              </div>
                              {item.badge && (
                                <span className="shrink-0 text-[8px] font-mono uppercase px-1 rounded bg-secondary text-muted-foreground">
                                  {item.badge}
                                </span>
                              )}
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Mobile User Actions Footer */}
              <div className="mt-4 pt-3 border-t border-border/80 space-y-2.5">
                <div className="flex items-center justify-between px-3 py-2 text-xs font-medium text-muted-foreground rounded-lg bg-secondary/40 border border-border/60 dark:border-white/10">
                  <span>Theme Preference</span>
                  <ThemeToggle showLabel />
                </div>

                {user ? (
                  <div className="space-y-2 pt-1">
                    {/* User Identity Card on Mobile */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/60 dark:border-white/10">
                      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold text-xs uppercase border border-primary/30 shadow-inner">
                        {userInitials}
                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 border border-background" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-semibold text-foreground truncate">
                            {displayName}
                          </p>
                          <span
                            className={`shrink-0 text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full font-semibold border ${
                              isAdmin
                                ? "bg-destructive/15 text-destructive border-destructive/30"
                                : "bg-primary/10 text-primary border-primary/25"
                            }`}
                          >
                            {userRoleBadge}
                          </span>
                        </div>
                        <p className="text-[10px] text-muted-foreground truncate font-mono mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-border/80 dark:border-white/10 bg-secondary/60 hover:bg-secondary px-4 py-2.5 text-xs font-semibold text-foreground shadow-xs transition-colors"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5 text-primary" />
                      <span>My Dashboard</span>
                    </Link>

                    <Link
                      href="/profile"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-colors"
                    >
                      <User className="h-3.5 w-3.5" />
                      <span>Engineer Profile</span>
                    </Link>

                    <Link
                      href="/dsa"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-border/80 dark:border-white/10 bg-secondary/60 hover:bg-secondary px-4 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      <span>DSA Practice & Sheets</span>
                    </Link>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive"
                      >
                        <Shield className="h-3.5 w-3.5" />
                        <span>Admin Panel</span>
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false)
                        handleSignOut()
                      }}
                      className="w-full flex items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2 text-xs font-semibold text-destructive hover:bg-destructive/20 cursor-pointer transition-colors"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 pt-1">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center rounded-xl border border-border/80 dark:border-white/10 bg-secondary/60 hover:bg-secondary px-4 py-2.5 text-xs font-semibold text-foreground transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground shadow-xs w-full"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Command Dialog (Command Palette) */}
      <SearchCommandDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Auth Error Toast */}
      <AnimatePresence>
        {authError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 right-4 z-[60] max-w-sm"
          >
            <div className="flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-card dark:bg-[#0e0e11] p-3 shadow-lg text-xs text-destructive">
              <span className="flex-1">{authError}</span>
              <button
                type="button"
                onClick={authClearError}
                className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-0.5"
                aria-label="Dismiss error"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Courses Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistDrawerOpen}
        onClose={() => setWishlistDrawerOpen(false)}
      />
    </header>
  )
}
