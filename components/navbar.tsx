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
  Briefcase,
  Trophy,
  Hammer,
  Sparkles,
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
  icon: any
  badge?: string
}

interface NavItem {
  label: string
  href: string
  hasDropdown: boolean
  icon?: any
  desc?: string
  dropdownWidth?: string
  alignClass?: string
  items?: NavSubItem[]
  footerLink?: { label: string; href: string }
}

const NAV_ITEMS: NavItem[] = [
  {
    label: "Programs",
    href: "/programs",
    hasDropdown: true,
    icon: BookOpen,
    desc: "Curricula & Engineering Tracks",
    dropdownWidth: "w-[360px]",
    alignClass: "left-0",
    items: [
      {
        title: "Systems Engineering",
        desc: "Low-level C, C++20, and memory model fundamentals",
        href: "/programs/cpp",
        icon: Cpu,
        badge: "Core",
      },
      {
        title: "Enterprise Backend & Java",
        desc: "Spring Boot, Concurrency, and Microservices",
        href: "/programs/java",
        icon: Server,
        badge: "Popular",
      },
      {
        title: "Full-Stack Web & TypeScript",
        desc: "React 19, Next.js, and distributed UI architecture",
        href: "/programs/react",
        icon: Layers,
      },
      {
        title: "Python for Engineers",
        desc: "High-throughput APIs, algorithms, and data systems",
        href: "/programs/python",
        icon: Terminal,
      },
    ],
    footerLink: { label: "Explore All Tracks & Curricula →", href: "/programs" },
  },
  {
    label: "Practice DSA",
    href: "/dsa",
    hasDropdown: true,
    icon: Code2,
    desc: "Algorithmic Sheets & Visualizers",
    dropdownWidth: "w-[360px]",
    alignClass: "left-[-20px]",
    items: [
      {
        title: "Complete DSA Sheet",
        desc: "474 hand-picked algorithmic problems with visual proofs",
        href: "/dsa/a2z-sheet",
        icon: Code2,
        badge: "474 Problems",
      },
      {
        title: "Interactive Visualizers",
        desc: "Step-through visual animations for trees, graphs, and pointers",
        href: "/dsa",
        icon: PlayCircle,
      },
      {
        title: "Algorithmic Problem Arena",
        desc: "Search, filter, and practice coding challenges with test runner",
        href: "/dsa",
        icon: Flame,
      },
    ],
    footerLink: { label: "Open Algorithmic Arena →", href: "/dsa" },
  },
  {
    label: "Degrees & Careers",
    href: "/degrees",
    hasDropdown: true,
    icon: Briefcase,
    desc: "Industry Roles, Capstones & Verified Repos",
    dropdownWidth: "w-[350px]",
    alignClass: "left-[-40px]",
    items: [
      {
        title: "Career Pathways & Degrees",
        desc: "Structured paths for AI, DevOps, Backend & Full-Stack roles",
        href: "/degrees",
        icon: GraduationCap,
        badge: "Industry",
      },
      {
        title: "Student Capstone Showcase",
        desc: "Verified student open-source repositories and production builds",
        href: "/portfolio",
        icon: FolderGit2,
      },
      {
        title: "Mentorship & Placement",
        desc: "Code reviews, mock technical interviews, and career guidance",
        href: "/pricing",
        icon: Users,
      },
    ],
    footerLink: { label: "Explore Career Pathways →", href: "/degrees" },
  },
  {
    label: "Pricing",
    href: "/pricing",
    hasDropdown: false,
    icon: Sparkles,
    desc: "Fellowship & Membership Plans",
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
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null)
  const { count: wishlistCount } = useWishlist()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const [mounted, setMounted] = useState(false)
  const [demoBypassUser, setDemoBypassUser] = useState<any>(null)

  // Hydrate demo bypass safely on client mount to avoid SSR hydration mismatch
  useEffect(() => {
    setMounted(true)
    if (!authUser && typeof document !== "undefined") {
      const match = document.cookie.match(/(^| )demo_bypass=([^;]+)/)
      if (match) {
        const isDemoAdmin = match[2] === "admin"
        setDemoBypassUser({
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
        })
      }
    }
  }, [authUser])

  // Active user and profile derived directly from AuthContext as the single source of truth (mounted-guarded for zero SSR mismatch)
  const user: any = mounted ? (authUser || demoBypassUser?.user || null) : null
  const userProfile: any = mounted ? (authProfile || demoBypassUser?.profile || (user ? {
    id: user.id || "guest",
    name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Scholar",
    role: "user",
    rank: "Engineer",
    xp: 0,
    streak_count: 0,
    avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
  } : null)) : null

  const isAdmin = Boolean(mounted && (authProfile?.role === "admin" || authProfile?.role === "super_admin" || demoBypassUser?.isAdmin))

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

  // Close mobile navigation drawer and flyouts on route change
  useEffect(() => {
    setMobileOpen(false)
    setActiveDropdown(null)
    setMobileExpandedSection(null)
  }, [pathname])

  // Lock body scroll when mobile menu is open to prevent background scroll jank
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null)
        setMobileOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolled = window.scrollY > 15
          setScrolled((prev) => (prev !== isScrolled ? isScrolled : prev))
          ticking = false
        })
        ticking = true
      }
    }
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
          ? "border-b border-border/80 dark:border-white/10 bg-background/95 dark:bg-black/95 backdrop-blur-2xl shadow-xs"
          : "border-b border-border/60 dark:border-white/10 bg-background/90 dark:bg-black/90 backdrop-blur-2xl"
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

      <div className="mx-auto flex h-16 sm:h-[68px] max-w-[1400px] items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* 1. Brand Logo (Pure & Minimalist) */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.01]"
        >
          <AsciLogo size={46} showText showBadge={false} useVector={false} />
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
                      <div className="relative overflow-hidden rounded-2xl border border-border/80 dark:border-white/15 bg-card/98 dark:bg-black/98 p-3 backdrop-blur-2xl shadow-xl">
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
                                      <span className="shrink-0 text-[8px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20 leading-none">
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
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search Trigger (Clean Icon Button) */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label="Search curriculum, 474 problems (⌘K)"
            className="relative flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border/80 dark:border-white/15 bg-secondary/30 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:border-primary/50 shadow-2xs cursor-pointer group"
            title="Search curriculum, 474 problems... (⌘K)"
          >
            <Search className="h-4 w-4 text-foreground/80 group-hover:text-primary transition-colors" />
            <span className="sr-only">Search curriculum, 474 problems... (⌘K)</span>
          </button>

          {/* Saved Courses Wishlist Trigger (Hidden on < 420px screens to prevent header wrapping; accessible in mobile menu) */}
          <button
            type="button"
            onClick={() => setWishlistDrawerOpen(true)}
            aria-label="View Saved Courses Wishlist"
            className="relative hidden min-[420px]:flex sm:flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border/80 dark:border-white/15 bg-secondary/30 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground hover:border-[#D4B872]/50 shadow-2xs cursor-pointer group"
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
          <ThemeToggle className="!h-9 !w-9 sm:!h-10 sm:!w-10" />

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
                className="group relative flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active px-5 py-2 text-xs sm:text-[13.5px] font-semibold text-primary-foreground hover:scale-[1.02] active:scale-[0.98] transition-all tracking-tight"
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
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-border/80 dark:border-white/15 bg-secondary/30 text-muted-foreground transition-all hover:bg-secondary hover:text-foreground lg:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            <div
              className={`transition-all duration-300 ${
                mobileOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
              } absolute`}
            >
              <Menu className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
            <div
              className={`transition-all duration-300 ${
                mobileOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
              } absolute`}
            >
              <X className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
            </div>
          </button>
        </div>
      </div>

      {/* 4. Mobile Drawer Overlay Backdrop (tap outside to close) */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 top-16 sm:top-[68px] bg-black/60 backdrop-blur-xs z-40 lg:hidden"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 5. Mobile Drawer Content */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 overflow-hidden border-t border-border/80 dark:border-white/10 bg-background/98 dark:bg-black/98 backdrop-blur-2xl lg:hidden shadow-lg"
          >
            <nav
              className="px-4 py-4 max-h-[85vh] overflow-y-auto space-y-3.5 selection:bg-accent/20"
              aria-label="Mobile navigation"
            >
              {/* 1. Profile Header at TOP with Logo/Avatar & Instant Dashboard Action */}
              {user ? (
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-secondary/50 dark:bg-[#0a0a0a] p-3.5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between gap-3">
                    {/* User Avatar / Logo + Active Status */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary font-bold text-sm uppercase border border-primary/20 overflow-hidden shadow-xs">
                        {navAvatar ? (
                          <img
                            src={navAvatar}
                            alt={displayName}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span className="font-mono">{userInitials}</span>
                        )}
                        <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background z-10" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <p className="text-xs sm:text-sm font-bold text-foreground truncate tracking-tight">
                            {displayName}
                          </p>
                          <span
                            className={`shrink-0 text-[8.5px] font-mono uppercase px-1.5 py-0.5 rounded-md font-bold leading-none border ${
                              isAdmin
                                ? "bg-destructive/15 text-destructive border-destructive/30"
                                : "bg-primary/10 text-primary border-primary/20"
                            }`}
                          >
                            {userRoleBadge}
                          </span>
                        </div>
                        <p className="text-[11px] text-muted-foreground truncate font-mono mt-0.5">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    {/* Official ASCI Academy Logo Mark Badge */}
                    <div
                      className="shrink-0 flex items-center justify-center p-2 rounded-xl bg-background/90 dark:bg-black/50 border border-stone-200/80 dark:border-stone-800 shadow-2xs"
                      title="ASCI Academy"
                    >
                      <AsciLogo size={22} showText={false} useVector />
                    </div>
                  </div>

                  {/* Primary 1-Tap Dashboard CTA */}
                  <Link
                    href="/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="w-full flex items-center justify-between rounded-xl bg-primary hover:bg-primary-active text-primary-foreground px-3.5 py-2.5 text-xs font-bold transition-all group"
                  >
                    <div className="flex items-center gap-2">
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      <span>Open Engineering Dashboard</span>
                    </div>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              ) : (
                /* Guest Brand & Auth Card with Clean Stacked Layout to Prevent Overlapping */
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-secondary/50 dark:bg-[#0a0a0a] p-4 space-y-3 shadow-2xs">
                  <div className="flex items-center gap-2.5">
                    <AsciLogo size={38} showText showBadge={false} useVector={false} />
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Interactive engineering curriculum, algorithmic sandboxes &amp; verified career credentials.
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-0.5">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center rounded-xl border border-stone-200 dark:border-stone-800 bg-card hover:bg-secondary px-3 py-2 text-xs font-semibold text-foreground transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-1.5 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground px-3 py-2 text-xs font-semibold transition-all"
                    >
                      <span>Get Started</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              )}

              {/* 2. Quick Search Trigger */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  setSearchOpen(true)
                }}
                className="w-full flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-secondary/60 px-3.5 py-2.5 text-xs text-muted-foreground hover:text-foreground shadow-2xs cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Search className="h-4 w-4 text-primary" />
                  <span>Search curriculum, code labs...</span>
                </div>
                <kbd className="rounded border border-stone-200 dark:border-stone-700 bg-background px-1.5 py-0.5 text-[9px] font-mono font-medium text-muted-foreground">
                  ⌘K
                </kbd>
              </button>

              {/* 3. Compact Problem of the Day Banner */}
              <Link
                href="/dashboard?tab=practice-arena"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between p-3 rounded-xl border border-border/80 dark:border-white/10 bg-card hover:bg-secondary/60 shadow-2xs transition-colors group"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <Flame className="w-4 h-4 fill-current" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-primary">
                      Problem of the Day
                    </div>
                    <div className="text-xs font-bold text-foreground truncate">
                      Sliding Window Maximum
                    </div>
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-mono font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  +50 XP →
                </span>
              </Link>

              {/* 4. Primary Navigation Accordion Rows (Clean, Glanceable, Tap-Friendly) */}
              <div className="space-y-1.5 pt-0.5">
                {NAV_ITEMS.map((section) => {
                  const Icon = section.icon || BookOpen
                  const isExpanded = mobileExpandedSection === section.label

                  if (!section.hasDropdown) {
                    return (
                      <Link
                        key={section.label}
                        href={section.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center justify-between p-3 rounded-xl border border-stone-200 dark:border-stone-800 bg-card hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-foreground">{section.label}</div>
                            <div className="text-[11px] text-muted-foreground">{section.desc}</div>
                          </div>
                        </div>
                        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                      </Link>
                    )
                  }

                  return (
                    <div
                      key={section.label}
                      className="rounded-xl border border-stone-200 dark:border-stone-800 bg-card overflow-hidden transition-all"
                    >
                      {/* Accordion Trigger Header */}
                      <button
                        type="button"
                        onClick={() => setMobileExpandedSection(isExpanded ? null : section.label)}
                        className="w-full flex items-center justify-between p-3 text-left hover:bg-secondary/60 transition-colors cursor-pointer"
                        aria-expanded={isExpanded}
                      >
                        <div className="flex items-center gap-3 min-w-0 flex-1 pr-2">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground">{section.label}</span>
                              {section.items && (
                                <span className="text-[9px] font-mono font-semibold px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-muted-foreground leading-none">
                                  {section.items.length}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-muted-foreground line-clamp-1 leading-normal mt-0.5">
                              {section.desc}
                            </div>
                          </div>
                        </div>

                        <div className={`p-1.5 rounded-lg transition-transform duration-200 text-muted-foreground shrink-0 ${isExpanded ? "rotate-180 text-foreground bg-secondary" : ""}`}>
                          <ChevronDown className="h-4 w-4" />
                        </div>
                      </button>

                      {/* Accordion Drawer Content */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-stone-100 dark:border-stone-800/80 bg-secondary/30 px-2.5 py-2 space-y-0.5"
                          >
                            {section.items?.map((item) => {
                              const SubIcon = item.icon
                              return (
                                <Link
                                  key={item.title}
                                  href={item.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center justify-between gap-2 p-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                                >
                                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                    <SubIcon className="w-3.5 h-3.5 text-primary shrink-0" />
                                    <span className="truncate font-medium">{item.title}</span>
                                  </div>
                                  {item.badge && (
                                    <span className="shrink-0 text-[8px] font-mono uppercase px-1.5 py-0.5 rounded bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-bold leading-none">
                                      {item.badge}
                                    </span>
                                  )}
                                </Link>
                              )
                            })}

                            <div className="pt-1 border-t border-stone-200/60 dark:border-stone-800/60 mt-1">
                              <Link
                                href={section.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center justify-between px-2 py-1.5 text-xs font-semibold text-primary hover:text-primary-active"
                              >
                                <span>Explore all {section.label}</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>

              {/* 5. Saved Wishlist Strip (if any items) */}
              {wishlistCount > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false)
                    setWishlistDrawerOpen(true)
                  }}
                  className="w-full flex items-center justify-between rounded-xl border border-stone-200 dark:border-stone-800 bg-secondary/50 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-secondary cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Bookmark className="h-3.5 w-3.5 text-[#D4B872]" />
                    <span>Saved Tracks</span>
                  </div>
                  <span className="rounded-full bg-[#D4B872]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#D4B872]">
                    {wishlistCount} saved
                  </span>
                </button>
              )}

              {/* 6. Mobile Utility Footer: Appearance & Sign Out */}
              <div className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
                {user ? (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center justify-center px-2 py-1 rounded-xl bg-secondary/60 border border-stone-200 dark:border-stone-800">
                        <ThemeToggle showLabel />
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setMobileOpen(false)
                          handleSignOut()
                        }}
                        className="flex items-center justify-center gap-1.5 rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-semibold text-destructive hover:bg-destructive/20 cursor-pointer transition-colors"
                      >
                        <LogOut className="h-3.5 w-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin"
                        onClick={() => setMobileOpen(false)}
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-secondary/60 hover:bg-secondary px-3 py-2 text-xs font-medium text-foreground transition-colors"
                      >
                        <Shield className="h-3.5 w-3.5 text-primary" />
                        <span>Admin Command Center</span>
                      </Link>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-secondary/40 text-xs text-muted-foreground border border-stone-200 dark:border-stone-800">
                    <span>Appearance</span>
                    <ThemeToggle showLabel />
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
            <div className="flex items-center gap-2.5 rounded-xl border border-destructive/30 bg-card dark:bg-black p-3 shadow-md text-xs text-destructive">
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
