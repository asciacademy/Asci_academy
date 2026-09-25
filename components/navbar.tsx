"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef, useCallback } from "react"
import {
  Search,
  ChevronDown,
  Bell,
  Menu,
  X,
  BookOpen,
  Compass,
  GraduationCap,
  Code2,
  Flame,
  CheckCircle2,
  FolderGit2,
  Cpu,
  Trophy,
  Award,
  Sparkles,
  Briefcase,
  Building,
  Zap,
  Users,
  ArrowRight,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ThemeToggle } from "@/components/theme-toggle"
import { AsciLogo } from "@/components/asci-logo"
import { SearchCommandDialog } from "@/components/search-command-dialog"
import { UserMenu } from "@/components/auth/user-menu"
import { useAuth } from "@/context/auth-context"
import { useUserSettings } from "@/context/user-settings-context"
import { extractFirstName, getInitials } from "@/lib/user-utils"

/**
 * 5 Primary Navigation Items
 * Specified in Phase 3:
 * Explore | Learn | Practice | Compete | Career
 */
export const PRIMARY_NAV = [
  { label: "Learn", href: "/courses", match: ["/courses", "/paths"] },
  { label: "Practice", href: "/practice", match: ["/practice", "/dsa", "/challenges"] },
  { label: "Compete", href: "/competitions", match: ["/competitions"] },
  { label: "Career", href: "/career", match: ["/career", "/jobs", "/internships"] },
]

/**
 * Explore Mega Menu Structure
 * 5 Pillars with small icons:
 * 1. LEARN (Courses, Learning Paths, Tutorials)
 * 2. PRACTICE (DSA, Challenges, Assessments)
 * 3. BUILD (Projects, Simulators)
 * 4. COMPETE (Hackathons, Competitions, Quizzes)
 * 5. CAREER (Jobs, Internships, Hiring Challenges, Mentorship)
 */
export const EXPLORE_MEGA_MENU = [
  {
    category: "LEARN",
    dotColor: "bg-blue-500",
    items: [
      {
        label: "Courses",
        href: "/courses",
        description: "47+ full-stack & systems courses",
        icon: BookOpen,
        iconColor: "text-blue-500 dark:text-blue-400",
        bgClass: "bg-blue-500/10 border-blue-500/20 group-hover:bg-blue-500/20 group-hover:border-blue-500/30",
      },
      {
        label: "Learning Paths",
        href: "/paths",
        description: "Structured career roadmaps",
        icon: Compass,
        iconColor: "text-indigo-500 dark:text-indigo-400",
        bgClass: "bg-indigo-500/10 border-indigo-500/20 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30",
      },
      {
        label: "Tutorials",
        href: "/courses",
        description: "Guided engineering walk-throughs",
        icon: GraduationCap,
        iconColor: "text-emerald-500 dark:text-emerald-400",
        bgClass: "bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30",
      },
    ],
  },
  {
    category: "PRACTICE",
    dotColor: "bg-orange-500",
    items: [
      {
        label: "DSA",
        href: "/practice",
        description: "Striver A2Z & 470+ problems",
        icon: Code2,
        iconColor: "text-cyan-500 dark:text-cyan-400",
        bgClass: "bg-cyan-500/10 border-cyan-500/20 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30",
      },
      {
        label: "Challenges",
        href: "/challenges",
        description: "Daily timed coding sprints",
        icon: Flame,
        iconColor: "text-orange-500 dark:text-orange-400 fill-orange-500/20",
        bgClass: "bg-orange-500/10 border-orange-500/25 group-hover:bg-orange-500/20 group-hover:border-orange-500/40",
      },
      {
        label: "Assessments",
        href: "/career?tab=assessments",
        description: "Skill benchmark certificates",
        icon: CheckCircle2,
        iconColor: "text-teal-500 dark:text-teal-400",
        bgClass: "bg-teal-500/10 border-teal-500/20 group-hover:bg-teal-500/20 group-hover:border-teal-500/30",
      },
    ],
  },
  {
    category: "BUILD",
    dotColor: "bg-purple-500",
    items: [
      {
        label: "Projects",
        href: "/projects",
        description: "Guided production codebases",
        icon: FolderGit2,
        iconColor: "text-purple-500 dark:text-purple-400",
        bgClass: "bg-purple-500/10 border-purple-500/20 group-hover:bg-purple-500/20 group-hover:border-purple-500/30",
      },
      {
        label: "Simulators",
        href: "/sandbox/call-stack",
        description: "Call-stack & memory visualizers",
        icon: Cpu,
        iconColor: "text-pink-500 dark:text-pink-400",
        bgClass: "bg-pink-500/10 border-pink-500/20 group-hover:bg-pink-500/20 group-hover:border-pink-500/30",
      },
    ],
  },
  {
    category: "COMPETE",
    dotColor: "bg-amber-500",
    items: [
      {
        label: "Hackathons",
        href: "/competitions",
        description: "Grand Prix with cash prizes",
        icon: Trophy,
        iconColor: "text-amber-500 dark:text-amber-400",
        bgClass: "bg-amber-500/10 border-amber-500/20 group-hover:bg-amber-500/20 group-hover:border-amber-500/30",
      },
      {
        label: "Competitions",
        href: "/competitions",
        description: "Algorithmic weekend contests",
        icon: Award,
        iconColor: "text-rose-500 dark:text-rose-400",
        bgClass: "bg-rose-500/10 border-rose-500/20 group-hover:bg-rose-500/20 group-hover:border-rose-500/30",
      },
      {
        label: "Quizzes",
        href: "/practice",
        description: "Speed CS aptitude & trivia",
        icon: Sparkles,
        iconColor: "text-fuchsia-500 dark:text-fuchsia-400",
        bgClass: "bg-fuchsia-500/10 border-fuchsia-500/20 group-hover:bg-fuchsia-500/20 group-hover:border-fuchsia-500/30",
      },
    ],
  },
  {
    category: "CAREER",
    dotColor: "bg-emerald-500",
    items: [
      {
        label: "Jobs",
        href: "/career?tab=jobs",
        description: "Full-time verified engineering roles",
        icon: Briefcase,
        iconColor: "text-sky-500 dark:text-sky-400",
        bgClass: "bg-sky-500/10 border-sky-500/20 group-hover:bg-sky-500/20 group-hover:border-sky-500/30",
      },
      {
        label: "Internships",
        href: "/career?tab=internships",
        description: "Summer & winter internships",
        icon: Building,
        iconColor: "text-emerald-500 dark:text-emerald-400",
        bgClass: "bg-emerald-500/10 border-emerald-500/20 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30",
      },
      {
        label: "Hiring Challenges",
        href: "/competitions",
        description: "Direct recruitment coding sprints",
        icon: Zap,
        iconColor: "text-yellow-500 dark:text-yellow-400 fill-yellow-500/20",
        bgClass: "bg-yellow-500/10 border-yellow-500/20 group-hover:bg-yellow-500/20 group-hover:border-yellow-500/30",
      },
      {
        label: "Mentorship",
        href: "/career?tab=mentors",
        description: "1-on-1 industry mentorship",
        icon: Users,
        iconColor: "text-violet-500 dark:text-violet-400",
        bgClass: "bg-violet-500/10 border-violet-500/20 group-hover:bg-violet-500/20 group-hover:border-violet-500/30",
      },
    ],
  },
]

export function Navbar() {
  const pathname = usePathname()
  const { settings } = useUserSettings()
  const { user: authUser, profile: authProfile, signOut: authSignOut } = useAuth()

  const [exploreOpen, setExploreOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [demoBypassUser, setDemoBypassUser] = useState<any>(null)

  const exploreRef = useRef<HTMLDivElement | null>(null)
  const exploreTimerRef = useRef<NodeJS.Timeout | null>(null)

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
            user_metadata: { full_name: isDemoAdmin ? "ASCI Administrator" : "ASCI Fellow" },
          },
          profile: {
            id: "demo-user-id",
            name: isDemoAdmin ? "ASCI Administrator" : "ASCI Fellow",
            role: isDemoAdmin ? "admin" : "fellow",
            rank: isDemoAdmin ? "Admin" : "Fellow",
            xp: 1420,
            streak_count: 5,
          },
          isAdmin: isDemoAdmin,
        })
      }
    }
  }, [authUser])

  // Listen for mobile bottom nav "Explore" tap
  useEffect(() => {
    const handleOpenExplore = () => {
      setMobileOpen(true)
    }
    window.addEventListener("asci:open-explore-drawer", handleOpenExplore)
    return () => window.removeEventListener("asci:open-explore-drawer", handleOpenExplore)
  }, [])

  // Close menus on route change
  useEffect(() => {
    setExploreOpen(false)
    setMobileOpen(false)
  }, [pathname])

  // Click outside to close explore menu
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleExploreEnter = useCallback(() => {
    if (exploreTimerRef.current) clearTimeout(exploreTimerRef.current)
    setExploreOpen(true)
  }, [])

  const handleExploreLeave = useCallback(() => {
    exploreTimerRef.current = setTimeout(() => {
      setExploreOpen(false)
    }, 180)
  }, [])

  const user: any = mounted ? (authUser || demoBypassUser?.user || null) : null
  const userProfile: any = mounted
    ? authProfile ||
      demoBypassUser?.profile ||
      (user
        ? {
            id: user.id || "guest",
            name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Scholar",
            role: "user",
            rank: "Engineer",
            xp: 0,
            streak_count: 0,
            avatar_url: user.user_metadata?.avatar_url || null,
          }
        : null)
    : null

  const isAdmin = Boolean(
    mounted &&
      (authProfile?.role === "admin" || authProfile?.role === "super_admin" || demoBypassUser?.isAdmin)
  )

  const handleSignOut = async () => {
    try {
      if (typeof document !== "undefined" && document.cookie.includes("demo_bypass")) {
        document.cookie = "demo_bypass=; path=/; max-age=0"
      }
      await authSignOut()
    } catch (e) {
      console.warn("SignOut error:", e)
    }
  }

  const displayName = extractFirstName(userProfile, user?.user_metadata, user?.email)
  const userInitials = getInitials(displayName)
  const navAvatar = userProfile?.avatar_url || settings.avatar || user?.user_metadata?.avatar_url || null
  const userRoleBadge = isAdmin ? "Admin" : userProfile?.role === "fellow" ? "Fellow" : userProfile?.rank || "Engineer"

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-2xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-3">
        {/* ==============================================================
            LEFT: ASCI Logo
        ============================================================== */}
        <div className="flex items-center gap-3 shrink-0">
          <Link href="/" className="inline-flex items-center transition-transform hover:opacity-95">
            <AsciLogo size={28} showBadge={true} badgeText="Academy" />
          </Link>
        </div>

        {/* ==============================================================
            CENTER/LEFT: Primary Navigation (Explore, Learn, Practice, Compete, Career)
        ============================================================== */}
        <nav className="hidden lg:flex items-center gap-0.5 shrink-0" aria-label="Main Navigation">
          {/* Explore Mega Menu Button */}
          <div
            ref={exploreRef}
            className="relative"
            onMouseEnter={handleExploreEnter}
            onMouseLeave={handleExploreLeave}
          >
            <button
              type="button"
              onClick={() => setExploreOpen((prev) => !prev)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                exploreOpen
                  ? "text-primary font-semibold bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              aria-expanded={exploreOpen}
              aria-haspopup="true"
            >
              <span>Explore</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  exploreOpen ? "rotate-180 text-primary" : ""
                }`}
              />
            </button>

            {/* Hover tunnel bridge */}
            <div className="absolute top-full left-0 w-full h-2 z-40" />

            {/* Explore Mega Menu Flyout */}
            <AnimatePresence>
              {exploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.99 }}
                  transition={{ duration: 0.14, ease: "easeOut" }}
                  className="fixed left-1/2 -translate-x-1/2 top-14 w-[94vw] max-w-[1180px] z-50 pointer-events-auto"
                >
                  <div className="relative overflow-hidden rounded-xl border border-border bg-card shadow-2xl p-5">
                    {/* 5 Distinct Pillar Columns */}
                    <div className="grid grid-cols-5 gap-4">
                      {EXPLORE_MEGA_MENU.map((pillar) => (
                        <div key={pillar.category} className="space-y-2.5">
                          {/* Column Header */}
                          <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider text-muted-foreground uppercase pb-1.5 border-b border-border/70">
                            <span className={`w-1.5 h-1.5 rounded-full ${pillar.dotColor || "bg-primary"}`} />
                            <span>{pillar.category}</span>
                          </div>

                          {/* Column Items */}
                          <div className="space-y-1">
                            {pillar.items.map((item) => {
                              const Icon = item.icon
                              return (
                                <Link
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setExploreOpen(false)}
                                  className="group flex items-start gap-2.5 p-2 rounded-lg hover:bg-secondary transition-colors"
                                >
                                  <div
                                    className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 mt-0.5 shadow-2xs ${
                                      item.bgClass || "bg-secondary border-border/80"
                                    }`}
                                  >
                                    <Icon
                                      className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 ${
                                        item.iconColor || "text-primary"
                                      }`}
                                    />
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                                      {item.label}
                                    </span>
                                    <span className="text-[10px] text-muted-foreground line-clamp-1 leading-snug">
                                      {item.description}
                                    </span>
                                  </div>
                                </Link>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Quick Bar */}
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                        <span>Engineering Ecosystem · 30+ Integrated Capabilities</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setExploreOpen(false)
                          setSearchOpen(true)
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-medium cursor-pointer"
                      >
                        <span>Looking for something specific? Search catalog</span>
                        <kbd className="px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-mono text-muted-foreground">⌘K</kbd>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Core Primary Navigation Links */}
          {PRIMARY_NAV.map((nav) => {
            const isActive = nav.match.some((m) => pathname.startsWith(m))
            return (
              <Link
                key={nav.label}
                href={nav.href}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "text-primary font-semibold bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {nav.label}
              </Link>
            )
          })}
        </nav>

        {/* ==============================================================
            CENTER: Large Global Search
        ============================================================== */}
        <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md xl:max-w-lg items-center mx-2 lg:mx-4">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between h-9 px-3 rounded-lg border border-border bg-secondary/40 hover:bg-secondary text-left transition-[border-color,background] hover:border-slate-300 dark:hover:border-slate-700 cursor-pointer group shadow-2xs"
            aria-label="Open global search"
          >
            <div className="flex items-center gap-2 text-muted-foreground text-xs sm:text-sm min-w-0">
              <Search className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
              <span className="truncate text-xs sm:text-[13px]">
                Search courses, skills, jobs, competitions...
              </span>
            </div>
            <kbd className="hidden xl:inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-card text-[10px] font-mono text-muted-foreground shrink-0 select-none">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* ==============================================================
            RIGHT: Notifications & Profile
        ============================================================== */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* Mobile Search Button */}
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4.5 h-4.5" />
          </button>

          {/* Notifications Bell */}
          <Link
            href="/notifications"
            className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            title="Notifications"
            aria-label="View notifications"
          >
            <Bell className="w-4.5 h-4.5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-card" />
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Profile Menu / Guest Buttons */}
          {user ? (
            <UserMenu
              user={user}
              userProfile={userProfile}
              isAdmin={isAdmin}
              displayName={displayName}
              userInitials={userInitials}
              navAvatar={navAvatar}
              userRoleBadge={userRoleBadge}
              onSignOut={handleSignOut}
            />
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
              <Link
                href="/login"
                className="px-3 py-1.5 rounded-lg border border-border text-foreground hover:bg-secondary text-xs font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-3 py-1.5 rounded-lg bg-primary hover:bg-[#EA5300] text-primary-foreground text-xs font-semibold transition-all shadow-xs active:scale-[0.98]"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary cursor-pointer"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* ==============================================================
          MOBILE DRAWER (Structured 5-Pillar Explore Directory)
      ============================================================== */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 top-14 z-50 bg-card border-t border-border overflow-y-auto p-4 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Quick auth on mobile if guest */}
            {!user && (
              <div className="grid grid-cols-2 gap-2 pb-4 border-b border-border">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center py-2 rounded-lg border border-border text-foreground font-medium text-xs text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center py-2 rounded-lg bg-primary text-primary-foreground font-semibold text-xs text-center shadow-xs"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* 5-Pillar Explore Directory on Mobile */}
            {EXPLORE_MEGA_MENU.map((pillar) => (
              <div key={pillar.category} className="space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] font-mono font-bold tracking-wider text-muted-foreground uppercase px-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${pillar.dotColor || "bg-primary"}`} />
                  <span>{pillar.category}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {pillar.items.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="p-2.5 rounded-lg border border-border bg-secondary/30 hover:bg-secondary text-foreground text-xs font-medium flex items-center justify-between group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-7 h-7 rounded-md border flex items-center justify-center shrink-0 shadow-2xs ${
                              item.bgClass || "bg-secondary border-border"
                            }`}
                          >
                            <Icon className={`w-3.5 h-3.5 ${item.iconColor || "text-primary"}`} />
                          </div>
                          <span className="group-hover:text-primary transition-colors font-medium">{item.label}</span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-border mt-6 text-center text-xs text-muted-foreground">
            ASCI Academy · Engineering &amp; Talent Platform
          </div>
        </div>
      )}

      {/* Global Command Search Dialog */}
      <SearchCommandDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
