"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import {
  BookOpen, Award, PlayCircle, Zap, Flame,
  Search, Bell, Settings, LogOut, ChevronRight, Layers,
  Bookmark, Clock, Trash2, ArrowRight, Trophy, Briefcase,
  FileText, Terminal, Users, MessageSquare, LayoutGrid, Target,
  Menu, X, ChevronLeft, Sparkles, Shield, BarChart2,
  GraduationCap, Swords, UserCheck, ScrollText, Home
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

// ─── Nav config ────────────────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    label: "Learn",
    items: [
      { id: "overview", tab: "overview" as DashboardTab, label: "Overview", icon: Home },
      { id: "courses", tab: "courses" as DashboardTab, label: "Courses", icon: BookOpen },
      { id: "certificates", tab: "certificates" as DashboardTab, label: "Certificates", icon: Award },
      { id: "practice-arena", tab: "practice-arena" as DashboardTab, label: "Practice Arena", icon: Target },
      { id: "practice", tab: "practice" as DashboardTab, label: "Visualizers", icon: BarChart2 },
    ],
  },
  {
    label: "Career",
    items: [
      { id: "hackathons", tab: "hackathons" as DashboardTab, label: "Hackathons", icon: Trophy },
      { id: "jobs", tab: "jobs" as DashboardTab, label: "Jobs", icon: Briefcase },
      { id: "assessments", tab: "assessments" as DashboardTab, label: "Assessments", icon: ScrollText },
      { id: "resume-ats", tab: "resume-ats" as DashboardTab, label: "Resume ATS", icon: FileText },
    ],
  },
  {
    label: "Community",
    items: [
      { id: "mentorship", tab: "mentorship" as DashboardTab, label: "Mentorship", icon: MessageSquare, badge: 5 },
      { id: "ambassador", tab: "ambassador" as DashboardTab, label: "Ambassador", icon: Shield },
    ],
  },
  {
    label: "My Library",
    items: [
      { id: "badges", tab: "badges" as DashboardTab, label: "Badges", icon: Sparkles },
      { id: "wishlist", tab: "wishlist" as DashboardTab, label: "Saved", icon: Bookmark },
      { id: "history", tab: "history" as DashboardTab, label: "History", icon: Clock },
      { id: "activity", tab: "activity" as DashboardTab, label: "Activity", icon: Zap },
    ],
  },
]

const BOTTOM_TABS = [
  { id: "overview", tab: "overview" as DashboardTab, label: "Home", icon: Home },
  { id: "courses", tab: "courses" as DashboardTab, label: "Learn", icon: BookOpen },
  { id: "practice-arena", tab: "practice-arena" as DashboardTab, label: "Practice", icon: Target },
  { id: "mentorship", tab: "mentorship" as DashboardTab, label: "Messages", icon: MessageSquare },
  { id: "hackathons", tab: "hackathons" as DashboardTab, label: "Compete", icon: Trophy },
]

const TAB_LABELS: Record<DashboardTab, string> = {
  overview: "Dashboard",
  courses: "Courses",
  certificates: "Certificates",
  practice: "Visualizers",
  activity: "Activity",
  badges: "Badges",
  wishlist: "Saved Courses",
  history: "Study History",
  hackathons: "Hackathons",
  jobs: "Jobs Board",
  assessments: "Assessments",
  mentorship: "Mentorship",
  "practice-arena": "Practice Arena",
  "resume-ats": "Resume ATS",
  ambassador: "Ambassador",
}

// ─── Main component ─────────────────────────────────────────────────────────

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

  const handleSwitchTab = (tab: DashboardTab) => {
    setActiveTab(tab)
    setMobileSidebarOpen(false)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("axel-refresh-stations"))
    }
  }

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get("tab")
      const validTabs: DashboardTab[] = [
        "overview", "courses", "certificates", "practice", "activity",
        "badges", "wishlist", "history", "hackathons", "jobs",
        "assessments", "mentorship", "practice-arena", "resume-ats", "ambassador",
      ]
      if (tabParam && validTabs.includes(tabParam as DashboardTab)) {
        handleSwitchTab(tabParam as DashboardTab)
      }
    }
  }, [])

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

  // Close notifications on outside click
  useEffect(() => {
    if (!notificationsOpen) return
    const close = () => setNotificationsOpen(false)
    setTimeout(() => document.addEventListener("click", close), 0)
    return () => document.removeEventListener("click", close)
  }, [notificationsOpen])

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
        { id: "dsa-custom", title: "DSA for Beginners: Foundation Track", category: "Algorithms", difficulty: "Beginner", modules: 10, duration: "Self-Paced", desc: "Algorithmic thinking, Big O notation, and pointer manipulation with interactive visualizers.", href: "/programs/dsa/course", image: "/images/courses/course_dsa_bootcamp.jpg", enrolled: enrollments.some((e) => e.id === "dsa-custom" || e.slug === "dsa-custom") },
        { id: "java-intermediate", title: "Java Intermediate: Memory & Collections", category: "Languages", difficulty: "Intermediate", modules: 12, duration: "12 Weeks", desc: "JVM Architecture, Garbage Collection, Generics, and core data structures.", href: "/programs/java-intermediate/course", image: "/images/courses/course_java_systems.jpg", enrolled: enrollments.some((e) => e.id === "java-intermediate" || e.slug === "java-intermediate") },
        { id: "agentic-ai", title: "Agentic AI & Neural Systems Engineering", category: "AI & Agents", difficulty: "Advanced", modules: 12, duration: "10 Weeks", desc: "Autonomous multi-agent swarms, tool calling, memory stores, and LLM reasoning patterns.", href: "/programs", image: "/images/courses/course_agentic_ai.jpg", enrolled: false },
        { id: "java-advanced", title: "Java Advanced: Microservices & Frameworks", category: "Backend", difficulty: "Advanced", modules: 14, duration: "14 Weeks", desc: "Spring Boot, Distributed Concurrency, Reactive Streams, and High-Throughput APIs.", href: "/programs/java-advanced/course", image: "/images/courses/course_java_systems.jpg", enrolled: false },
        { id: "sys-design", title: "System Design & Distributed Scalability", category: "Systems", difficulty: "Advanced", modules: 16, duration: "16 Weeks", desc: "Event sourcing, distributed locks, database sharding, and fault-tolerant architecture.", href: "/programs", image: "/images/courses/course_system_design.jpg", enrolled: false },
        { id: "cloud-k8s", title: "Cloud Native Systems & Kubernetes Orchestration", category: "DevOps & Cloud", difficulty: "Intermediate", modules: 10, duration: "8 Weeks", desc: "Container runtime architecture, Helm deployment charts, GitOps CI/CD pipelines, and ingress.", href: "/programs", image: "/images/courses/course_cloud_k8s.jpg", enrolled: false },
      ]

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <div className="min-h-svh bg-background text-foreground flex antialiased">

      {/* ── Mobile overlay backdrop ── */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ══════════════════════════════════════════════
          SIDEBAR NAVIGATION (Fixed / Sticky)
      ══════════════════════════════════════════════ */}
      <aside
        className={`
          fixed md:sticky top-0 left-0 h-svh z-50
          flex flex-col shrink-0
          bg-secondary/95 dark:bg-[#181715]/95 backdrop-blur-xl
          border-r border-border
          text-foreground
          transition-all duration-300 ease-in-out
          ${sidebarCollapsed ? "w-[68px]" : "w-[260px]"}
          ${mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* ── Logo / Header ── */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-border shrink-0">
          <Link href="/" className="flex items-center gap-2.5 overflow-hidden min-w-0">
            <div className="shrink-0">
              <AsciLogo
                size={28}
                showText={!sidebarCollapsed}
                showBadge={!sidebarCollapsed}
                badgeText="LMS"
              />
            </div>
          </Link>
          <div className="flex items-center gap-1 shrink-0">
            {/* Mobile close */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
            {/* Desktop collapse */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-card transition-colors cursor-pointer"
              title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              <ChevronLeft
                className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* ── Nav Groups ── */}
        <div className="flex-1 overflow-y-auto py-4 px-2.5 space-y-5 scrollbar-none">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="space-y-0.5">
              {/* Group label */}
              {!sidebarCollapsed && (
                <div className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/70 px-3 pb-1.5 font-mono">
                  {group.label}
                </div>
              )}
              {sidebarCollapsed && (
                <div className="h-px bg-border mx-1 my-1" />
              )}

              {group.items.map((item) => {
                const isActive = activeTab === item.tab
                return (
                  <button
                    key={item.id}
                    onClick={() => handleSwitchTab(item.tab)}
                    title={sidebarCollapsed ? item.label : undefined}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                      text-[13px] font-medium transition-all duration-150 cursor-pointer relative group
                      ${isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/70"
                      }
                      ${sidebarCollapsed ? "justify-center" : ""}
                    `}
                  >
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-primary-foreground/40" />
                    )}

                    <item.icon
                      className={`shrink-0 transition-colors ${
                        sidebarCollapsed ? "w-5 h-5" : "w-4 h-4"
                      } ${isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"}`}
                    />

                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left truncate">{item.label}</span>
                        {"badge" in item && item.badge !== undefined && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shrink-0 ${
                            isActive
                              ? "bg-primary-foreground/20 text-primary-foreground"
                              : "bg-primary/10 text-primary border border-primary/20"
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Collapsed tooltip */}
                    {sidebarCollapsed && (
                      <div className="absolute left-full ml-3 px-2.5 py-1.5 rounded-lg bg-popover text-popover-foreground text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-xl border border-border">
                        {item.label}
                        {"badge" in item && item.badge !== undefined && (
                          <span className="ml-1.5 text-[10px] font-bold px-1 rounded-full bg-primary text-primary-foreground">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        {/* ── Upgrade Banner (expanded only) ── */}
        {!sidebarCollapsed && (
          <div className="px-3 pb-3 shrink-0">
            <div className="rounded-2xl p-4 bg-card border border-border relative overflow-hidden shadow-2xs">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-bold text-sm text-foreground">ASCI Plus Pro</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5 mb-3">
                Unlock hackathons, mock interviews & 1:1 mentor bookings.
              </p>
              <Link
                href="/pricing"
                className="w-full py-2 px-3 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5"
              >
                <span>Upgrade to Plus</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
        )}

        {/* ── User Card ── */}
        <div className="p-3 border-t border-border bg-secondary/60 shrink-0">
          <div
            className={`flex items-center gap-2.5 p-2 rounded-xl bg-card border border-border shadow-2xs ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
          >
            {/* Avatar */}
            <div className="relative shrink-0">
              <div className="w-8 h-8 rounded-xl bg-secondary border border-border flex items-center justify-center text-xs font-bold text-primary overflow-hidden">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  userName.charAt(0).toUpperCase()
                )}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
            </div>

            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-semibold text-foreground truncate">{userName}</span>
                  <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                    L{currentLevel}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground truncate block">{rank}</span>
              </div>
            )}

            {!sidebarCollapsed && (
              <button
                onClick={handleSignOut}
                className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-lg cursor-pointer shrink-0"
                title="Sign Out"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════
          MAIN WORKSPACE AREA
      ══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0 min-h-svh">

        {/* ── Top Header ── */}
        <header className="sticky top-0 z-30 h-16 bg-background/90 backdrop-blur-xl border-b border-border shrink-0">
          <div className="h-full px-4 sm:px-6 flex items-center justify-between gap-4">

            {/* Left: mobile hamburger + title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800/60 text-foreground transition-colors cursor-pointer shrink-0"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-base font-bold text-foreground truncate">
                  {TAB_LABELS[activeTab]}
                </h1>
                {activeTab !== "overview" && (
                  <button
                    onClick={() => handleSwitchTab("overview")}
                    className="text-[11px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Dashboard</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-foreground">{TAB_LABELS[activeTab]}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right: search + actions */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Search — hidden on mobile */}
              <div className="relative hidden sm:block">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-48 lg:w-64 bg-stone-100 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 rounded-full pl-8 pr-10 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground/60 pointer-events-none">
                  ⌘K
                </kbd>
              </div>

              {/* Messages shortcut */}
              <button
                onClick={() => handleSwitchTab("mentorship")}
                className="p-2 rounded-xl border border-stone-200 dark:border-stone-700/60 bg-white dark:bg-stone-800/40 hover:bg-stone-50 dark:hover:bg-stone-700/60 text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs relative"
                title="Messages & Mentorship"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={(e) => { e.stopPropagation(); setNotificationsOpen(!notificationsOpen) }}
                  className="p-2 rounded-xl border border-stone-200 dark:border-stone-700/60 bg-white dark:bg-stone-800/40 hover:bg-stone-50 dark:hover:bg-stone-700/60 text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-xs relative"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                </button>

                {notificationsOpen && (
                  <div
                    className="absolute right-0 mt-2 w-80 rounded-2xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 shadow-xl p-4 space-y-3 z-50 animate-fadeIn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-2.5">
                      <span className="text-sm font-bold text-foreground">Notifications</span>
                      <span className="text-[10px] font-mono text-muted-foreground bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full">3 new</span>
                    </div>
                    <div className="space-y-2">
                      {[
                        { title: "Next Cohort Challenge", body: "Two-pointer sliding window problem goes live in 4 hours." },
                        { title: "Certificate Verification", body: "Complete your remaining DSA lessons to earn your Gravit Certificate." },
                        { title: "New Mentor Available", body: "A Senior SDE at Google has joined the mentorship pool." },
                      ].map((n, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-100 dark:border-stone-700/60">
                          <div className="text-xs font-semibold text-foreground">{n.title}</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{n.body}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme toggle */}
              <ThemeToggle />

              {/* User avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-amber-500/30 bg-amber-50 dark:bg-stone-800 flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300 shadow-xs shrink-0 cursor-pointer">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  userName ? userName.charAt(0).toUpperCase() : "?"
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ── Workspace Content ── */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-10 max-w-[1400px] w-full mx-auto">

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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800" id="dashboard-badges-header">
                <div>
                  <h2 className="font-bold text-xl text-foreground flex items-center gap-2">
                    <Award className="w-5 h-5 text-amber-500" />
                    Academic Honors & Badges
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800" id="dashboard-wishlist-header">
                <div>
                  <h2 className="font-bold text-xl text-foreground flex items-center gap-2">
                    <Bookmark className="w-5 h-5 text-amber-500" />
                    Saved Courses & Wishlist
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Engineering tracks you bookmarked for future study.
                  </p>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <AxelStage id="dashboard-wishlist-robot-anchor" sectionId="dashboard-wishlist-header" label="Saved Tracks" emotion="curious" scale={0.44} size="sm" />
                  <button onClick={() => handleSwitchTab("courses")} className="btn-primary text-xs px-3.5 py-1.5 cursor-pointer inline-flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Browse All</span>
                  </button>
                </div>
              </div>

              {wishlist.length === 0 ? (
                <div className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-900/60 p-12 text-center space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800 text-muted-foreground mx-auto">
                    <Bookmark className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground">Your wishlist is empty</h3>
                    <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                      Explore our curriculum catalog and bookmark tracks you plan to master.
                    </p>
                  </div>
                  <button onClick={() => handleSwitchTab("courses")} className="btn-primary text-xs px-4 py-2 cursor-pointer inline-flex items-center gap-1.5">
                    <span>Explore Catalog</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {wishlist.map((item) => {
                    const courseHref = item.courseSlug ? `/programs/${item.courseSlug}/course` : `/programs/dsa/course`
                    return (
                      <div key={item.id} className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900/60 p-5 flex flex-col justify-between shadow-xs hover:border-amber-300 dark:hover:border-amber-700/50 transition-all group">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              {item.courseSlug && <TechLogo slug={item.courseSlug} size={20} />}
                              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400">{item.category || "Track"}</span>
                            </div>
                            <button onClick={() => removeFromWishlist(item.id)} className="text-muted-foreground hover:text-red-500 p-1 transition-colors cursor-pointer" title="Remove">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <h3 className="font-bold text-sm text-foreground group-hover:text-amber-600 transition-colors">{item.title}</h3>
                          {item.desc && <p className="text-xs text-muted-foreground line-clamp-2 mt-1.5 leading-relaxed">{item.desc}</p>}
                          <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                            <span>{item.level || "Beginner"}</span>
                            {item.duration && <><span>•</span><span>{item.duration}</span></>}
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2">
                          <Link href={courseHref} className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-all cursor-pointer">
                            <PlayCircle className="h-3.5 w-3.5" />
                            <span>Start</span>
                          </Link>
                          <Link href={`/programs/${item.courseSlug || item.id}`} className="inline-flex items-center justify-center gap-1 rounded-xl border border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-800 px-3 py-1.5 text-xs font-medium text-foreground hover:bg-stone-100 dark:hover:bg-stone-700 transition-all cursor-pointer">
                            <span>Info</span>
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200 dark:border-stone-800" id="dashboard-history-header">
                <div>
                  <h2 className="font-bold text-xl text-foreground flex items-center gap-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    Study History & Fast Resume
                  </h2>
                  <p className="text-xs text-muted-foreground mt-1">
                    Timeline of curriculum lessons and code labs you recently accessed.
                  </p>
                </div>
                <AxelStage id="dashboard-history-robot-anchor" sectionId="dashboard-history-header" label="Study History" emotion="happy" scale={0.44} size="sm" />
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

        {/* ══════════════════════════════════════════════
            MOBILE BOTTOM TAB BAR
        ══════════════════════════════════════════════ */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border safe-area-inset-bottom">
          <div className="flex items-center justify-around px-1 pt-2 pb-3">
            {BOTTOM_TABS.map((tab) => {
              const isActive = activeTab === tab.tab
              return (
                <button
                  key={tab.id}
                  onClick={() => handleSwitchTab(tab.tab)}
                  className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all cursor-pointer min-w-0 ${
                    isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <tab.icon
                    className={`w-5 h-5 transition-all ${
                      isActive ? "text-primary scale-110" : ""
                    }`}
                  />
                  <span className={`text-[10px] font-semibold truncate ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}>
                    {tab.label}
                  </span>
                  {isActive && (
                    <span className="w-1 h-1 rounded-full bg-primary" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
