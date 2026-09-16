"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import {
  BookOpen, Award, PlayCircle, Zap, Flame, Compass,
  Search, Bell, Settings, LayoutDashboard, Code, Activity,
  Sliders, LogOut, ChevronRight, BarChart2, Layers, CheckCircle2,
  Bookmark, Clock, Trash2, ArrowRight, Trophy, Briefcase, Video,
  FileText, Terminal, Users, Shield, MessageSquare, LayoutGrid, Target,
  Menu, X, Hammer, User, ChevronDown
} from "lucide-react"
import { updateUserProfile } from "@/app/actions/user"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { DashboardCurriculum } from "@/components/dashboard/dashboard-curriculum"
import { DashboardVisualizers } from "@/components/dashboard/dashboard-visualizers"
import { DashboardActivity } from "@/components/dashboard/dashboard-activity"
import { DashboardHackathons } from "@/components/dashboard/dashboard-hackathons"
import { DashboardJobs } from "@/components/dashboard/dashboard-jobs"
import { DashboardAssessments } from "@/components/dashboard/dashboard-assessments"
import { DashboardMentorship } from "@/components/dashboard/dashboard-mentorship"
import { DashboardPracticeArena } from "@/components/dashboard/dashboard-practice-arena"
import { DashboardResumeAts } from "@/components/dashboard/dashboard-resume-ats"
import { DashboardAmbassador } from "@/components/dashboard/dashboard-ambassador"
import { DashboardProjects } from "@/components/dashboard/dashboard-projects"
import { DashboardCareer } from "@/components/dashboard/dashboard-career"
import { BadgesShowcase } from "@/components/gamification/badges-showcase"
import { ThemeToggle } from "@/components/theme-toggle"
import { useWishlist, useLearningHistory, removeFromWishlist } from "@/lib/user-learning-store"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { LearningHistorySection } from "@/components/courses/learning-history-section"
import { TechLogo } from "@/components/tech-logo"
import { DashboardCertificates } from "@/components/dashboard/dashboard-certificates"
import { AsciLogo } from "@/components/asci-logo"
import { extractFirstName } from "@/lib/user-utils"
import { useUserSettings } from "@/context/user-settings-context"
import { AxelStage } from "@/components/axel/axel-stage"
import { getCourseCoverImage } from "@/lib/course-images"

export type DashboardTab =
  | "overview"
  | "courses"
  | "certificates"
  | "practice"
  | "activity"
  | "badges"
  | "wishlist"
  | "history"
  | "hackathons"
  | "jobs"
  | "assessments"
  | "mentorship"
  | "practice-arena"
  | "resume-ats"
  | "ambassador"
  | "projects"
  | "career"

interface DashboardWorkspaceProps {
  initialData: {
    profile: any
    enrollments: any[]
    gamificationStats: any
    weeklyActivity: { day: string; minutes: number; solved: number }[]
    recentLogs: any[]
    activityEvents: any[]
    catalogTracks?: any[]
  }
  user: any
}

export function DashboardWorkspace({ initialData, user }: DashboardWorkspaceProps) {
  const { settings, updateSetting } = useUserSettings()
  const {
    registeredHackathonsCount,
    activeApplicationsCount,
    passedAssessmentsCount,
    confirmedBookingsCount,
    potd,
    ambassador,
  } = useUnstopEcosystem()

  const [profile, setProfile] = useState<any>(initialData?.profile || null)
  const [enrollments, setEnrollments] = useState<any[]>(initialData?.enrollments || [])
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(
    initialData?.gamificationStats?.unlockedBadgeIds || []
  )
  const [weeklyActivity, setWeeklyActivity] = useState<{ day: string; minutes: number; solved: number }[]>(
    initialData?.weeklyActivity || [
      { day: "Sun", minutes: 0, solved: 0 },
      { day: "Mon", minutes: 0, solved: 0 },
      { day: "Tue", minutes: 0, solved: 0 },
      { day: "Wed", minutes: 0, solved: 0 },
      { day: "Thu", minutes: 0, solved: 0 },
      { day: "Fri", minutes: 0, solved: 0 },
      { day: "Sat", minutes: 0, solved: 0 },
    ]
  )
  const [recentLogs, setRecentLogs] = useState<any[]>(initialData?.recentLogs || [])
  const [activityEvents, setActivityEvents] = useState<any[]>(initialData?.activityEvents || [])
  const [activeTab, setActiveTab] = useState<DashboardTab>("overview")
  const { wishlist, count: wishlistCount } = useWishlist()
  const { count: historyCount } = useLearningHistory()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)
  const notificationsRef = useRef<HTMLDivElement>(null)

  // Close dropdowns on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target as Node)
      ) {
        setProfileDropdownOpen(false)
      }
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setProfileDropdownOpen(false)
        setNotificationsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  // Switch tab and immediately inform Axel to re-anchor smoothly
  const handleSwitchTab = (tab: DashboardTab) => {
    setActiveTab(tab)
    setMobileSidebarOpen(false)
    setProfileDropdownOpen(false)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("axel-refresh-stations"))
    }
  }

  // Handle mobile sidebar Escape key and scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileSidebarOpen(false)
      }
    }
    if (mobileSidebarOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [mobileSidebarOpen])

  // Sync user and profile to client storage so client navigations maintain auth state
  useEffect(() => {
    if (user && typeof window !== "undefined") {
      try {
        localStorage.setItem("asci_auth_user", JSON.stringify(user))
        if (initialData?.profile) {
          localStorage.setItem("asci_auth_profile", JSON.stringify(initialData.profile))
        }
      } catch {}
    }
  }, [user, initialData?.profile])


  // Parse initial tab from URL query params (e.g. /dashboard?tab=hackathons)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get("tab")
      if (
        tabParam &&
        [
          "overview",
          "courses",
          "certificates",
          "practice",
          "activity",
          "badges",
          "wishlist",
          "history",
          "hackathons",
          "jobs",
          "assessments",
          "mentorship",
          "practice-arena",
          "resume-ats",
          "ambassador",
        ].includes(tabParam)
      ) {
        handleSwitchTab(tabParam as DashboardTab)
      }
    }
  }, [])

  // Real-time XP reward listener across any component on the portal
  useEffect(() => {
    const onXpAward = (e: any) => {
      if (e.detail?.amount) {
        setProfile((prev: any) => ({
          ...prev,
          xp: (prev?.xp ?? 0) + Number(e.detail.amount),
        }))
      }
    }
    window.addEventListener("asci-award-xp", onXpAward)
    return () => window.removeEventListener("asci-award-xp", onXpAward)
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    if (typeof document !== "undefined") {
      document.cookie = "demo_bypass=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
    }
    window.location.href = "/login"
  }

  const userName = extractFirstName(profile, user?.user_metadata, user?.email)
  const oauthAvatarUrl = user?.user_metadata?.avatar_url || user?.user_metadata?.picture || null
  const userAvatar = profile?.avatar_url || settings.avatar || oauthAvatarUrl || null

  const handleUpdateName = async (newName: string) => {
    setProfile((prev: any) => ({ ...prev, name: newName }))
    try {
      await updateUserProfile({ name: newName })
    } catch (e) {
      console.warn("Error updating user profile name:", e)
    }
  }

  const handleUpdateAvatar = async (newAvatarUrl: string) => {
    setProfile((prev: any) => ({ ...prev, avatar_url: newAvatarUrl }))
    updateSetting("avatar", newAvatarUrl)
    try {
      await updateUserProfile({ avatar_url: newAvatarUrl })
    } catch (e) {
      console.warn("Error updating user avatar:", e)
    }
  }

  const isMaxClearance = profile?.role === "admin" || profile?.role === "super_admin"
  const rank = profile?.rank || "Recruit"
  const totalXP = profile?.xp ?? 0
  const streak = profile?.streak_count ?? 0
  const currentLevel = Math.max(1, Math.floor(totalXP / 1000) + 1)
  const levelXP = totalXP % 1000
  const levelPercent = Math.min(100, Math.round((levelXP / 1000) * 100))

  const catalogTracks = (initialData?.catalogTracks && initialData.catalogTracks.length > 0)
    ? initialData.catalogTracks.map((track: any) => ({
        ...track,
        image: track.image || getCourseCoverImage(track.category, track.slug || track.id, track.title, track.thumbnail_url),
        enrolled: enrollments.some((e) => e.id === track.id || e.slug === track.id || e.courseId === track.id),
      }))
    : [
        {
          id: "dsa-custom",
          title: "DSA for Beginners: Foundation Track",
          category: "Algorithms",
          difficulty: "Beginner",
          modules: 10,
          duration: "Self-Paced",
          desc: "Algorithmic thinking, Big O notation, and pointer manipulation with interactive visualizers.",
          href: "/programs/dsa/course",
          image: "/images/courses/course_dsa_bootcamp.jpg",
          enrolled: enrollments.some((e) => e.id === "dsa-custom" || e.slug === "dsa-custom"),
        },
        {
          id: "java-intermediate",
          title: "Java Intermediate: Memory & Collections",
          category: "Languages",
          difficulty: "Intermediate",
          modules: 12,
          duration: "12 Weeks",
          desc: "JVM Architecture, Garbage Collection, Generics, and core data structures.",
          href: "/programs/java-intermediate/course",
          image: "/images/courses/course_java_systems.jpg",
          enrolled: enrollments.some((e) => e.id === "java-intermediate" || e.slug === "java-intermediate"),
        },
        {
          id: "agentic-ai",
          title: "Agentic AI & Neural Systems Engineering",
          category: "AI & Agents",
          difficulty: "Advanced",
          modules: 12,
          duration: "10 Weeks",
          desc: "Autonomous multi-agent swarms, tool calling, memory stores, and LLM reasoning patterns.",
          href: "/programs",
          image: "/images/courses/course_agentic_ai.jpg",
          enrolled: false,
        },
        {
          id: "java-advanced",
          title: "Java Advanced: Microservices & Frameworks",
          category: "Backend",
          difficulty: "Advanced",
          modules: 14,
          duration: "14 Weeks",
          desc: "Spring Boot, Distributed Concurrency, Reactive Streams, and High-Throughput APIs.",
          href: "/programs/java-advanced/course",
          image: "/images/courses/course_java_systems.jpg",
          enrolled: false,
        },
        {
          id: "sys-design",
          title: "System Design & Distributed Scalability",
          category: "Systems",
          difficulty: "Advanced",
          modules: 16,
          duration: "16 Weeks",
          desc: "Event sourcing, distributed locks, database sharding, and fault-tolerant architecture.",
          href: "/programs",
          image: "/images/courses/course_system_design.jpg",
          enrolled: false,
        },
        {
          id: "cloud-k8s",
          title: "Cloud Native Systems & Kubernetes Orchestration",
          category: "DevOps & Cloud",
          difficulty: "Intermediate",
          modules: 10,
          duration: "8 Weeks",
          desc: "Container runtime architecture, Helm deployment charts, GitOps CI/CD pipelines, and ingress.",
          href: "/programs",
          image: "/images/courses/course_cloud_k8s.jpg",
          enrolled: false,
        },
      ]

  const isExpanded = !sidebarCollapsed || mobileSidebarOpen

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased">
      {/* ── Mobile overlay backdrop ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 md:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ══════════════════════════════════════════════
          Dashboard Workspace Sidebar
      ══════════════════════════════════════════════ */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen z-50 md:z-40 border-r border-hairline bg-secondary flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out w-72 max-w-[85vw] ${
          sidebarCollapsed ? "md:w-20" : "md:w-64"
        } ${
          mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-16 border-b border-border/80 px-4 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-2.5 overflow-hidden"
            >
              <AsciLogo
                size={28}
                showText={isExpanded}
                showBadge={isExpanded}
                badgeText="LMS"
              />
            </Link>
            <div className="flex items-center gap-1">
              {/* Mobile Close Button */}
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="md:hidden p-1.5 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-transparent hover:border-hairline"
                aria-label="Close sidebar"
              >
                <X className="w-4 h-4" />
              </button>
              {/* Desktop Collapse Toggle */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden md:flex p-1.5 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-transparent hover:border-hairline"
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <Sliders className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Nav Items — Focotech Modern LMS Menu */}
          <div className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-280px)]">
            {isExpanded && (
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-muted-foreground/60 px-3 py-1 mb-1">
                PLATFORM
              </div>
            )}
            {[
              {
                id: "home",
                targetTab: "overview" as DashboardTab,
                label: "Home",
                icon: LayoutGrid,
                isActive: activeTab === "overview",
              },
              {
                id: "learn",
                targetTab: "courses" as DashboardTab,
                label: "Learn",
                icon: BookOpen,
                isActive: activeTab === "courses",
              },
              {
                id: "practice",
                targetTab: "practice-arena" as DashboardTab,
                label: "Practice",
                icon: Target,
                isActive: activeTab === "practice-arena" || activeTab === "practice",
              },
              {
                id: "build",
                targetTab: "projects" as DashboardTab,
                label: "Build",
                icon: Hammer,
                isActive: activeTab === "projects",
              },
              {
                id: "career",
                targetTab: "jobs" as DashboardTab,
                label: "Career",
                icon: Briefcase,
                isActive: activeTab === "jobs" || activeTab === "hackathons" || activeTab === "career" || activeTab === "resume-ats" || activeTab === "assessments",
              },
              {
                id: "achievements",
                targetTab: "certificates" as DashboardTab,
                label: "Achievements",
                icon: Award,
                isActive: activeTab === "certificates" || activeTab === "badges",
              },
              {
                id: "mentorship",
                targetTab: "mentorship" as DashboardTab,
                label: "Mentorship",
                icon: MessageSquare,
                isActive: activeTab === "mentorship",
                badge: 5,
                badgeColor: "bg-primary/20 text-primary border border-primary/30",
              },
              {
                id: "saved",
                targetTab: "wishlist" as DashboardTab,
                label: "Saved",
                icon: Bookmark,
                isActive: activeTab === "wishlist",
              },
              {
                id: "settings",
                targetTab: "overview" as DashboardTab,
                label: "Settings",
                icon: Settings,
                isActive: false,
                isExternalLink: "/profile",
              },
            ].map((item) => {
              if (item.isExternalLink) {
                return (
                  <Link
                    key={item.id}
                    href={item.isExternalLink}
                    onClick={() => setMobileSidebarOpen(false)}
                    className="w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-stone-100 dark:hover:bg-stone-800/60 transition-all group"
                  >
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-foreground shrink-0" />
                    {isExpanded && <span>{item.label}</span>}
                  </Link>
                )
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleSwitchTab(item.targetTab)}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer relative group ${
                    item.isActive
                      ? "bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-foreground border border-orange-500/25 font-bold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-stone-100 dark:hover:bg-stone-800/60"
                  }`}
                >
                  <item.icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      item.isActive ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground group-hover:text-foreground"
                    }`}
                  />
                  {isExpanded && (
                    <span className="flex-1 text-left truncate">{item.label}</span>
                  )}
                  {isExpanded && item.badge !== undefined && (
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 font-mono leading-none ${
                        item.badgeColor || "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-2xs"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Bottom Get Premium Now Banner Card */}
          {isExpanded && (
            <div className="p-3">
              <div className="rounded-3xl p-4 bg-gradient-to-b from-amber-500/10 via-orange-500/5 to-card border border-amber-500/20 shadow-xs relative overflow-hidden group">
                <div className="w-10 h-10 mb-2 flex items-center justify-center">
                  <span className="text-3xl filter drop-shadow-md select-none">🚩</span>
                </div>
                <h4 className="font-bold text-sm text-foreground">ASCI Plus Pro</h4>
                <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 mb-3">
                  Unlock national hackathons, mock interviews &amp; 1:1 mentor bookings.
                </p>
                <Link
                  href="/pricing"
                  onClick={() => setMobileSidebarOpen(false)}
                  className="w-full py-2 px-3 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1 group/btn"
                >
                  <span>Upgrade to Plus</span>
                  <span className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">↗</span>
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Footer User Info */}
        <div className="p-3 border-t border-hairline bg-secondary/80">
          <div className="p-2.5 rounded-2xl bg-card border border-hairline shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-secondary border border-amber-500/30 flex items-center justify-center text-xs font-semibold text-amber-600 dark:text-amber-400 overflow-hidden shadow-2xs">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      userName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
                </div>
                {isExpanded && (
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-foreground truncate">{userName}</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 leading-none">L{currentLevel}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground truncate">{rank}</span>
                  </div>
                )}
              </div>
              {isExpanded && (
                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-lg cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════
          Main Workspace Area
      ══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header — Focotech Modern Dashboard Header */}
        <header className="border-b border-hairline bg-background/90 backdrop-blur-md sticky top-0 z-30">
          <div className="h-16 sm:h-18 px-3.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
            {/* Page Title & Mobile Hamburger */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-2xs shrink-0"
                aria-label="Open sidebar"
                title="Open menu"
              >
                <Menu className="w-4.5 h-4.5" />
              </button>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground truncate">
                Dashboard
              </h1>
            </div>

            {/* Center / Right Toolbar */}
            <div className="flex items-center gap-1.5 sm:gap-3">
              {/* Search Bar */}
              <div className="relative hidden sm:block w-52 md:w-72 lg:w-80">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here..."
                  className="w-full bg-card border border-stone-200 dark:border-stone-800 rounded-full pl-9 pr-11 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-hairline pointer-events-none">
                  ⌘K
                </kbd>
              </div>

              {/* Chat Message Shortcut */}
              <button
                onClick={() => handleSwitchTab("mentorship")}
                className="p-2 sm:p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-2xs shrink-0"
                title="Messages & Mentorship"
              >
                <MessageSquare className="w-4 h-4" />
              </button>

              {/* Notification Bell */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => {
                    setNotificationsOpen(!notificationsOpen)
                    setProfileDropdownOpen(false)
                  }}
                  className="p-2 sm:p-2.5 rounded-full border border-stone-200 dark:border-stone-800 bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-all relative cursor-pointer shadow-2xs shrink-0"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full ring-2 ring-card" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-border bg-card shadow-lg p-3 sm:p-4 space-y-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <span className="text-xs font-bold text-foreground">Notifications</span>
                      <span className="text-[10px] font-mono text-muted-foreground">3 Unread</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-secondary/50 border border-border">
                        <div className="font-semibold text-foreground">Next Cohort Challenge</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">Two-pointer sliding window problem goes live in 4 hours.</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-secondary/50 border border-border">
                        <div className="font-semibold text-foreground">Certificate Verification</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">Complete your remaining DSA lessons to earn your Gravit Certificate.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Trigger & Dropdown Menu */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => {
                    setProfileDropdownOpen((prev) => !prev)
                    setNotificationsOpen(false)
                  }}
                  className={`flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-full sm:rounded-2xl border transition-all cursor-pointer shadow-2xs active:scale-[0.98] ${
                    profileDropdownOpen
                      ? "border-amber-500/50 bg-secondary ring-2 ring-amber-500/20"
                      : "border-stone-200 dark:border-stone-800 bg-card hover:bg-secondary hover:border-stone-300 dark:hover:border-stone-700"
                  }`}
                  aria-expanded={profileDropdownOpen}
                  aria-label="User profile menu"
                >
                  {/* Avatar with Active Online Pip */}
                  <div className="relative shrink-0">
                    <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-full overflow-hidden border border-amber-500/30 bg-amber-50 dark:bg-stone-800 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300 shadow-inner">
                      {userAvatar ? (
                        <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                      ) : (
                        userName ? userName.charAt(0).toUpperCase() : "B"
                      )}
                    </div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
                  </div>

                  {/* Desktop / Tablet User Identity */}
                  <div className="hidden sm:flex flex-col text-left min-w-0 pr-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-foreground truncate max-w-[90px] md:max-w-[120px]">
                        {userName}
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 leading-none">
                        L{currentLevel}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground truncate max-w-[110px]">
                      {rank}
                    </span>
                  </div>

                  <ChevronDown
                    className={`hidden sm:block w-3.5 h-3.5 text-muted-foreground transition-transform duration-200 ${
                      profileDropdownOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>

                {/* Responsive Profile Dropdown Card */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2.5 w-72 sm:w-80 max-w-[calc(100vw-1.5rem)] rounded-2xl border border-stone-200/90 dark:border-stone-800/90 bg-card/95 backdrop-blur-xl shadow-xl p-3 sm:p-4 space-y-3 z-50 animate-fadeIn divide-y divide-hairline">
                    {/* User Identity Header */}
                    <div className="pb-3 flex items-center gap-3">
                      <div className="relative shrink-0">
                        <div className="w-11 h-11 rounded-2xl overflow-hidden border border-amber-500/40 bg-amber-50 dark:bg-stone-800 flex items-center justify-center text-sm font-bold text-amber-700 dark:text-amber-300 shadow-xs">
                          {userAvatar ? (
                            <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                          ) : (
                            userName ? userName.charAt(0).toUpperCase() : "B"
                          )}
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-card" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-semibold text-foreground truncate">
                            {userName}
                          </h4>
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 leading-none">
                            L{currentLevel}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate font-mono mt-0.5">
                          {profile?.email || user?.email || "scholar@asci.academy"}
                        </p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-mono text-muted-foreground">
                          <span className="text-amber-600 dark:text-amber-400 font-semibold">{rank}</span>
                          <span>•</span>
                          <span>{totalXP} XP</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Profile Navigation Links */}
                    <div className="pt-2.5 pb-1 space-y-1">
                      <Link
                        href="/profile"
                        onClick={() => setProfileDropdownOpen(false)}
                        className="flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-secondary transition-colors group cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold block leading-tight">View Full Profile</span>
                            <span className="text-[10px] text-muted-foreground">Identity, Bio &amp; Preferences</span>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </Link>

                      <button
                        onClick={() => {
                          handleSwitchTab("certificates")
                          setProfileDropdownOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-secondary transition-colors group cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                            <Award className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold block leading-tight">Certificates</span>
                            <span className="text-[10px] text-muted-foreground">Verified credentials</span>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          handleSwitchTab("wishlist")
                          setProfileDropdownOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-secondary transition-colors group cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                            <Bookmark className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold block leading-tight">Saved Tracks</span>
                            <span className="text-[10px] text-muted-foreground">{wishlistCount} bookmarked</span>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          handleSwitchTab("overview")
                          setProfileDropdownOpen(false)
                        }}
                        className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium text-foreground hover:bg-secondary transition-colors group cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            <Settings className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <span className="font-semibold block leading-tight">Dashboard Overview</span>
                            <span className="text-[10px] text-muted-foreground">Streak &amp; Level stats</span>
                          </div>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>

                    {/* Sign Out Action */}
                    <div className="pt-2">
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out of ASCI</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Switcher */}
              <ThemeToggle className="!h-8 !w-8 sm:!h-9 sm:!w-9" />
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-3.5 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6 sm:space-y-8">
          {activeTab === "overview" && (
            <DashboardOverview
              userName={userName}
              avatarUrl={userAvatar}
              oauthAvatarUrl={oauthAvatarUrl}
              onUpdateName={handleUpdateName}
              onUpdateAvatar={handleUpdateAvatar}
              rank={rank}
              totalXP={totalXP}
              streak={streak}
              currentLevel={currentLevel}
              levelXP={levelXP}
              levelPercent={levelPercent}
              isMaxClearance={isMaxClearance}
              enrollments={enrollments}
              weeklyActivity={weeklyActivity}
              catalogTracks={catalogTracks}
              recentLogs={recentLogs}
              unlockedBadgeIds={unlockedBadgeIds}
              onSwitchTab={(tab) => handleSwitchTab(tab as DashboardTab)}
            />
          )}

          {activeTab === "hackathons" && <DashboardHackathons />}

          {activeTab === "jobs" && <DashboardJobs />}

          {activeTab === "assessments" && <DashboardAssessments />}

          {activeTab === "mentorship" && <DashboardMentorship />}

          {activeTab === "ambassador" && <DashboardAmbassador />}

          {activeTab === "practice-arena" && <DashboardPracticeArena />}

          {activeTab === "projects" && <DashboardProjects />}

          {activeTab === "career" && <DashboardCareer />}

          {activeTab === "resume-ats" && <DashboardResumeAts />}

          {activeTab === "courses" && (
            <DashboardCurriculum
              enrollments={enrollments}
              catalogTracks={catalogTracks}
              onEnrollTrack={(track) => {
                if (!enrollments.some((e) => e.id === track.id || e.slug === track.id)) {
                  setEnrollments((prev) => [
                    ...prev,
                    {
                      id: track.id,
                      title: track.title,
                      slug: track.id,
                      progressPercent: 0,
                      lessonsCompleted: 0,
                      totalLessons: track.modules * 3,
                      category: track.category,
                      difficulty: track.difficulty,
                    },
                  ])
                }
              }}
            />
          )}

          {activeTab === "certificates" && (
            <DashboardCertificates
              enrollments={enrollments}
              userName={userName}
              onExploreCourses={() => handleSwitchTab("courses")}
            />
          )}

          {activeTab === "practice" && <DashboardVisualizers />}

          {activeTab === "badges" && (
            <div className="space-y-6" id="dashboard-badges-section">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline" id="dashboard-badges-header">
                <div>
                  <h2 className="font-serif text-2xl font-normal text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#ea580c]" />
                    <span>Academic Honors &amp; Badges</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Collect verified badges across curriculum milestones, problem sets, and study habits.
                  </p>
                </div>
                <AxelStage
                  id="dashboard-badges-robot-anchor"
                  sectionId="dashboard-badges-header"
                  label="Academic Honors"
                  emotion="heart"
                  scale={0.44}
                  size="sm"
                />
              </div>
              <BadgesShowcase unlockedBadgeIds={unlockedBadgeIds} />
            </div>
          )}

          {activeTab === "wishlist" && (
            <div className="space-y-6" id="dashboard-wishlist-section">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline" id="dashboard-wishlist-header">
                <div>
                  <h2 className="font-serif text-2xl font-normal text-foreground flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-primary" />
                    <span>Saved Courses &amp; Wishlist</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Engineering tracks you bookmarked for future study.
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <AxelStage
                    id="dashboard-wishlist-robot-anchor"
                    sectionId="dashboard-wishlist-header"
                    label="Saved Tracks"
                    emotion="curious"
                    scale={0.44}
                    size="sm"
                  />
                  <button
                    onClick={() => handleSwitchTab("courses")}
                    className="btn-primary text-xs px-3.5 py-1.5 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Browse All Courses</span>
                  </button>
                </div>
              </div>

              {wishlist.length === 0 ? (
                <div className="rounded-2xl border border-hairline bg-card p-12 text-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-muted-foreground mx-auto">
                    <Bookmark className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-normal text-foreground">Your wishlist is empty</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                      Explore our curriculum catalog and bookmark tracks you plan to master.
                    </p>
                  </div>
                  <button
                    onClick={() => handleSwitchTab("courses")}
                    className="btn-primary text-xs px-4 py-2 cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>Explore Catalog</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wishlist.map((item) => {
                    const courseHref = item.courseSlug
                      ? `/programs/${item.courseSlug}/course`
                      : `/programs/dsa/course`

                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-hairline bg-card p-5 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all group"
                      >
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {item.courseSlug && <TechLogo slug={item.courseSlug} size={20} />}
                              <span className="text-[10px] font-mono uppercase tracking-wider text-primary">
                                {item.category || "Track"}
                              </span>
                            </div>
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-muted-foreground hover:text-destructive p-1 transition-colors cursor-pointer"
                              title="Remove from Saved"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <h3 className="font-serif text-base font-normal text-foreground group-hover:text-primary transition-colors">
                            {item.title}
                          </h3>
                          {item.desc && (
                            <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">
                              {item.desc}
                            </p>
                          )}
                          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                            <span>{item.level || "Beginner"}</span>
                            {item.duration && (
                              <>
                                <span>•</span>
                                <span>{item.duration}</span>
                              </>
                            )}
                          </div>
                        </div>

                        <div className="mt-5 pt-3 border-t border-hairline/60 flex items-center gap-2">
                          <Link
                            href={courseHref}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
                          >
                            <PlayCircle className="h-3.5 w-3.5" />
                            <span>Start Learning</span>
                          </Link>
                          <Link
                            href={`/programs/${item.courseSlug || item.id}`}
                            className="inline-flex items-center justify-center gap-1 rounded-xl border border-hairline bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-card transition-all cursor-pointer"
                          >
                            <span>Syllabus</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-6" id="dashboard-history-section">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-hairline" id="dashboard-history-header">
                <div>
                  <h2 className="font-serif text-2xl font-normal text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-primary" />
                    <span>Study History &amp; Fast Resume</span>
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Timeline of curriculum lessons and code labs you recently accessed.
                  </p>
                </div>
                <AxelStage
                  id="dashboard-history-robot-anchor"
                  sectionId="dashboard-history-header"
                  label="Study History"
                  emotion="happy"
                  scale={0.44}
                  size="sm"
                />
              </div>

              <LearningHistorySection limit={25} showClearAll={true} />
            </div>
          )}

          {activeTab === "activity" && (
            <DashboardActivity
              totalXP={totalXP}
              streak={streak}
              userName={userName}
              events={activityEvents}
            />
          )}
        </main>
      </div>
    </div>
  )
}
