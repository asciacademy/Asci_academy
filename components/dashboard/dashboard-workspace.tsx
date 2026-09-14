"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import {
  BookOpen, Award, PlayCircle, Zap, Flame, Compass,
  Search, Bell, Settings, LayoutDashboard, Code, Activity,
  Sliders, LogOut, ChevronRight, BarChart2, Layers, CheckCircle2,
  Bookmark, Clock, Trash2, ArrowRight, Trophy, Briefcase, Video,
  FileText, Terminal, Users, Shield
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
  const [searchQuery, setSearchQuery] = useState("")
  const [notificationsOpen, setNotificationsOpen] = useState(false)

  // Switch tab and immediately inform Axel to re-anchor smoothly
  const handleSwitchTab = (tab: DashboardTab) => {
    setActiveTab(tab)
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("axel-refresh-stations"))
    }
  }

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
          enrolled: enrollments.some((e) => e.id === "java-intermediate" || e.slug === "java-intermediate"),
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
          enrolled: false,
        },
      ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased">
      {/* ══════════════════════════════════════════════
          Anthropic Clean Workspace Sidebar
      ══════════════════════════════════════════════ */}
      <aside
        className={`border-r border-hairline bg-secondary flex flex-col justify-between shrink-0 transition-all duration-300 z-40 md:sticky md:top-0 md:h-screen ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div>
          {/* Header */}
          <div className="h-16 border-b border-border/80 px-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5 overflow-hidden">
              <AsciLogo
                size={28}
                showText={!sidebarCollapsed}
                showBadge={!sidebarCollapsed}
                badgeText="LMS"
              />
            </Link>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg hover:bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer border border-transparent hover:border-hairline"
              title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>

          {/* Nav Items */}
          {/* Unstop Clean Navigation Hubs */}
          <div className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-140px)]">
            {!sidebarCollapsed && (
              <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground px-3 py-1 font-semibold flex items-center gap-1.5 mb-1">
                <span>Explore &amp; Learn</span>
              </div>
            )}
            {[
              {
                id: "overview",
                targetTab: "overview" as DashboardTab,
                label: "Home",
                desc: "Dashboard & Highlights",
                icon: LayoutDashboard,
                isActive: activeTab === "overview",
              },
              {
                id: "courses",
                targetTab: "courses" as DashboardTab,
                label: "Learn",
                desc: "Courses & Certificates",
                icon: BookOpen,
                isActive: activeTab === "courses" || activeTab === "certificates" || activeTab === "wishlist" || activeTab === "history",
                badge: enrollments.length > 0 ? enrollments.length : undefined,
              },
              {
                id: "practice",
                targetTab: "practice-arena" as DashboardTab,
                label: "Practice",
                desc: "POTD, DSA & Sandboxes",
                icon: Terminal,
                isActive: activeTab === "practice-arena" || activeTab === "practice",
                badge: potd.solved ? undefined : "POTD",
              },
              {
                id: "hackathons",
                targetTab: "hackathons" as DashboardTab,
                label: "Compete",
                desc: "Hackathons & Sprints",
                icon: Trophy,
                isActive: activeTab === "hackathons",
                badge: registeredHackathonsCount > 0 ? registeredHackathonsCount : undefined,
              },
              {
                id: "jobs",
                targetTab: "jobs" as DashboardTab,
                label: "Jobs",
                desc: "Internships & Full-Time",
                icon: Briefcase,
                isActive: activeTab === "jobs",
                badge: activeApplicationsCount > 0 ? activeApplicationsCount : undefined,
              },
              {
                id: "mentorship",
                targetTab: "mentorship" as DashboardTab,
                label: "Mentorship & Prep",
                desc: "1:1 Calls & Resume ATS",
                icon: Video,
                isActive: activeTab === "mentorship" || activeTab === "resume-ats" || activeTab === "assessments",
                badge: confirmedBookingsCount > 0 ? confirmedBookingsCount : undefined,
              },
            ].map((item) => {
              return (
                <button
                  key={item.id}
                  onClick={() => handleSwitchTab(item.targetTab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer relative group ${
                    item.isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/70 border border-transparent"
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-transform ${
                    item.isActive ? "bg-primary-foreground/15 text-primary-foreground" : "bg-secondary text-foreground group-hover:bg-primary/10 group-hover:text-primary"
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  {!sidebarCollapsed && (
                    <div className="flex flex-col text-left min-w-0 flex-1">
                      <span className="text-xs font-semibold truncate">{item.label}</span>
                      <span className={`text-[10px] truncate ${item.isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                        {item.desc}
                      </span>
                    </div>
                  )}
                  {!sidebarCollapsed && item.badge !== undefined && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold shrink-0 ${
                      item.isActive
                        ? "bg-primary-foreground/25 text-primary-foreground"
                        : "bg-primary/15 text-primary border border-primary/30"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}

            <div className="pt-4 border-t border-border/60 mt-3 space-y-1">
              <Link
                href="/programs"
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-card/70 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-secondary text-muted-foreground group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                  <Compass className="w-4 h-4" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex flex-col text-left min-w-0">
                    <span className="text-xs font-medium">Browse All Courses</span>
                    <span className="text-[10px] text-muted-foreground">Full Catalog</span>
                  </div>
                )}
              </Link>

              {isMaxClearance && (
                <Link
                  href="/admin"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs text-muted-foreground hover:text-foreground hover:bg-card/70 transition-colors group"
                >
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-secondary text-muted-foreground group-hover:text-primary transition-colors">
                    <Shield className="w-4 h-4" />
                  </div>
                  {!sidebarCollapsed && <span>Admin Command</span>}
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Footer User Info — with XP mini progress & level badge */}
        <div className="p-3 border-t border-hairline bg-secondary/80">
          <div className="p-2.5 rounded-xl bg-card border border-hairline shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-secondary border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary overflow-hidden shadow-2xs">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      userName.charAt(0).toUpperCase()
                    )}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-card" />
                </div>
                {!sidebarCollapsed && (
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-foreground truncate">{userName}</span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">L{currentLevel}</span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground truncate">{rank}</span>
                  </div>
                )}
              </div>
              {!sidebarCollapsed && (
                <button
                  onClick={handleSignOut}
                  className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors rounded-lg cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
            {!sidebarCollapsed && (
              <div className="pt-1 border-t border-hairline/60">
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
                  <span>XP Progress</span>
                  <span className="text-primary font-semibold">{levelXP}/1k</span>
                </div>
                <div className="w-full h-1 bg-hairline rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${levelPercent}%`,
                      background: "linear-gradient(90deg, #ea580c 0%, #D4B872 100%)",
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════════════
          Main Workspace Area
      ══════════════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header — with signature ASCI emerald & gold gradient underline */}
        <header className="border-b border-hairline bg-background/90 backdrop-blur-md sticky top-0 z-30 relative">
          <div className="h-16 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                <span className="text-muted-foreground">Dashboard</span>
                <span>/</span>
                <span className="text-foreground font-medium px-2 py-0.5 rounded-md bg-secondary border border-hairline">
                  {activeTab === "courses"
                    ? "My Curriculum"
                    : activeTab === "hackathons"
                    ? "Compete & Hackathons"
                    : activeTab === "jobs"
                    ? "Jobs & Internships"
                    : activeTab === "assessments"
                    ? "Skill Assessments"
                    : activeTab === "mentorship"
                    ? "1-on-1 Mentorship"
                    : activeTab === "ambassador"
                    ? "Campus Ambassador"
                    : activeTab === "practice-arena"
                    ? "Daily POTD & Practice Arena"
                    : activeTab === "resume-ats"
                    ? "ATS Resume Architect"
                    : activeTab === "certificates"
                    ? "Certificates"
                    : activeTab === "wishlist"
                    ? "Saved Courses"
                    : activeTab === "history"
                    ? "Study History"
                    : activeTab === "practice"
                    ? "Visualizers & Code"
                    : activeTab === "badges"
                    ? "Honors & Badges"
                    : activeTab === "activity"
                    ? "Activity & Logs"
                    : "Overview"}
                </span>
              </div>

              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search syllabi, algorithms, problem sets..."
                  className="w-full bg-card border border-hairline rounded-xl pl-9 pr-14 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all"
                />
                <kbd className="hidden sm:inline-block absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground bg-secondary px-1.5 py-0.5 rounded border border-hairline pointer-events-none">
                  ⌘K
                </kbd>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Clean Unstop-style Status Pill */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold text-foreground">Lvl {currentLevel}</span>
                <span className="text-border">·</span>
                <span className="text-primary font-bold">{totalXP.toLocaleString()} XP</span>
                {streak > 0 && (
                  <>
                    <span className="text-border">·</span>
                    <span className="text-amber-500 font-semibold flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 fill-amber-500/20" />
                      <span>{streak}d</span>
                    </span>
                  </>
                )}
              </div>

              {/* Notifications Menu Trigger */}
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-all relative cursor-pointer shadow-2xs hover:border-primary/30"
                  title="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
                </button>

                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 rounded-xl border border-hairline bg-card shadow-lg p-4 space-y-3 z-50 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-hairline pb-2">
                      <span className="text-xs font-semibold font-serif text-foreground">Notifications</span>
                      <span className="text-[10px] font-mono text-muted-foreground">3 Unread</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-lg bg-secondary/50 border border-hairline">
                        <div className="font-medium text-foreground">Next Cohort Challenge</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">Two-pointer sliding window problem goes live in 4 hours.</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-secondary/50 border border-hairline">
                        <div className="font-medium text-foreground">Certificate Verification</div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">Complete your remaining DSA lessons to earn your Gravit Certificate.</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Switcher */}
              <ThemeToggle />
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-6 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
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
