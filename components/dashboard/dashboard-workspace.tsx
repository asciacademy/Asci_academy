"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import {
  BookOpen, Award, Search, LogOut, ArrowRight,
  Target, Menu, X, Home, Briefcase, ChevronDown
} from "lucide-react"
import { updateUserProfile } from "@/app/actions/user"
import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { DashboardCurriculum } from "@/components/dashboard/dashboard-curriculum"
import { DashboardPracticeArena } from "@/components/dashboard/dashboard-practice-arena"
import { DashboardCareer } from "@/components/dashboard/dashboard-career"
import { DashboardCertificates } from "@/components/dashboard/dashboard-certificates"
import { BadgesShowcase } from "@/components/gamification/badges-showcase"
import { ThemeToggle } from "@/components/theme-toggle"
import { AsciLogo } from "@/components/asci-logo"
import { extractFirstName } from "@/lib/user-utils"
import { useUserSettings } from "@/context/user-settings-context"
import { getCourseCoverImage } from "@/lib/course-images"
import { SearchCommandDialog } from "@/components/search-command-dialog"
import { awardUserXpServer } from "@/app/actions/gamification"
import { useEnrollments } from "@/lib/user-learning-store"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"


/* ═══════════════════════════════════════════
   5 Core Tabs — Simple & Clean
═══════════════════════════════════════════ */
export type DashboardTab = "home" | "courses" | "practice" | "opportunities" | "achievements"

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

/* Legacy tab → new tab mapping */
const LEGACY_TAB_MAP: Record<string, DashboardTab> = {
  overview: "home",
  courses: "courses",
  curriculum: "courses",
  wishlist: "courses",
  history: "courses",
  practice: "practice",
  "practice-arena": "practice",
  career: "opportunities",
  jobs: "opportunities",
  hackathons: "opportunities",
  mentorship: "opportunities",
  "resume-ats": "opportunities",
  assessments: "opportunities",
  certificates: "achievements",
  badges: "achievements",
  ambassador: "home",
  activity: "home",
  projects: "home",
}

/* Legacy sub-tab extraction for DashboardCareer */
const CAREER_SUBTAB_MAP: Record<string, string> = {
  jobs: "jobs",
  hackathons: "hackathons",
  mentorship: "mentorship",
  "resume-ats": "resume",
}

export function DashboardWorkspace({ initialData, user }: DashboardWorkspaceProps) {
  const { settings, updateSetting } = useUserSettings()
  const { enrollments: storeEnrollments } = useEnrollments()

  const [profile, setProfile] = useState<any>(initialData?.profile || null)
  const [enrollments, setEnrollments] = useState<any[]>(initialData?.enrollments || [])

  // Unified enrollments across server state and client learning store
  const mergedEnrollments = useMemo(() => {
    const map = new Map<string, any>()
    const addOrMerge = (item: any) => {
      const slug = (item.slug || item.course?.slug || "").toLowerCase()
      const id = (item.id || item.courseId || item.course?.id || "").toLowerCase()
      let matchedKey: string | null = null
      if (slug && map.has(slug)) matchedKey = slug
      else if (id && map.has(id)) matchedKey = id
      else if (slug || id) {
        for (const [k, v] of map.entries()) {
          const vSlug = (v.slug || v.course?.slug || "").toLowerCase()
          const vId = (v.id || v.courseId || v.course?.id || "").toLowerCase()
          if ((slug && (slug === vSlug || slug === vId)) || (id && (id === vSlug || id === vId))) {
            matchedKey = k
            break
          }
        }
      }
      const primaryKey = slug || id
      if (!primaryKey) return
      if (matchedKey) {
        map.set(matchedKey, { ...map.get(matchedKey), ...item })
      } else {
        map.set(primaryKey, item)
      }
    }

    ;(initialData?.enrollments || []).forEach(addOrMerge)
    ;(enrollments || []).forEach(addOrMerge)
    storeEnrollments.forEach(addOrMerge)
    return Array.from(map.values())
  }, [initialData?.enrollments, enrollments, storeEnrollments])

  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>(
    initialData?.gamificationStats?.unlockedBadgeIds || []
  )
  const [weeklyActivity] = useState<{ day: string; minutes: number; solved: number }[]>(
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
  const [activeTab, setActiveTab] = useState<DashboardTab>("home")
  const [careerInitialSubTab, setCareerInitialSubTab] = useState<string | undefined>(undefined)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)
  const profileDropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click or Escape
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false)
      }
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setProfileDropdownOpen(false)
    }
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleSwitchTab = (tab: DashboardTab, subTab?: string) => {
    setActiveTab(tab)
    setMobileSidebarOpen(false)
    setProfileDropdownOpen(false)
    if (tab === "opportunities" && subTab) {
      setCareerInitialSubTab(subTab)
    } else if (tab !== "opportunities") {
      setCareerInitialSubTab(undefined)
    }
  }

  // Mobile sidebar: Escape key + scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileSidebarOpen(false)
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

  // Sync user/profile to localStorage for client navigations
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

  // Parse initial tab from URL query params (legacy compat)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get("tab")
      if (tabParam) {
        const mapped = LEGACY_TAB_MAP[tabParam]
        if (mapped) {
          const careerSub = CAREER_SUBTAB_MAP[tabParam]
          handleSwitchTab(mapped, careerSub)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Real-time XP reward listener
  useEffect(() => {
    const onXpAward = (e: any) => {
      const amount = Number(e.detail?.amount)
      if (amount > 0) {
        setProfile((prev: any) => {
          const updated = { ...prev, xp: (prev?.xp ?? 0) + amount }
          try { localStorage.setItem("asci_auth_profile", JSON.stringify(updated)) } catch {}
          return updated
        })
        // Only call awardUserXpServer if requested (server actions like recordLessonCompletion, claimDailyTask, solvePOTDAction already persist to DB)
        if (e.detail?.syncServer) {
          awardUserXpServer(amount, e.detail?.reason || "Dashboard Activity").catch((err) =>
            console.warn("Error persisting XP:", err)
          )
        }
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
    try { await updateUserProfile({ name: newName }) } catch (e) { console.warn("Error updating name:", e) }
  }

  const handleUpdateAvatar = async (newAvatarUrl: string) => {
    setProfile((prev: any) => ({ ...prev, avatar_url: newAvatarUrl }))
    updateSetting("avatar", newAvatarUrl)
    try { await updateUserProfile({ avatar_url: newAvatarUrl }) } catch (e) { console.warn("Error updating avatar:", e) }
  }

  const isMaxClearance = profile?.role === "admin" || profile?.role === "super_admin"
  const rank = profile?.rank || "Recruit"
  const totalXP = profile?.xp ?? 0
  const streak = profile?.streak_count ?? 0
  const currentLevel = Math.max(1, Math.floor(totalXP / 1000) + 1)
  const levelXP = totalXP % 1000
  const levelPercent = Math.min(100, Math.round((levelXP / 1000) * 100))

  const allCurriculumTracksFallback = useMemo(() => {
    return CURRICULUM_COURSES.map((c) => ({
      id: c.slug || c.id,
      slug: c.slug || c.id,
      title: c.title,
      category: c.category,
      difficulty: c.level,
      modules: c.modules?.length || 4,
      duration: c.duration_hours ? `${c.duration_hours}h` : (c.weeks || "Self-Paced"),
      duration_hours: c.duration_hours,
      desc: c.description,
      href: `/courses/${c.slug || c.id}/learn`,
      exploreHref: `/courses/${c.slug || c.id}`,
      image: getCourseCoverImage(c.category, c.slug || c.id, c.title, c.thumbnail_url),
      is_premium: c.is_premium,
      thumbnail_url: c.thumbnail_url,
    }))
  }, [])

  const catalogTracks = useMemo(() => {
    const rawList = (initialData?.catalogTracks && initialData.catalogTracks.length > 0)
      ? initialData.catalogTracks
      : allCurriculumTracksFallback

    return rawList.map((track: any) => {
      const trackSlug = (track.slug || track.id || "").toLowerCase()
      const isEnrolled = mergedEnrollments.some((e: any) => {
        const eSlug = (e.slug || "").toLowerCase()
        const eId = (e.id || "").toLowerCase()
        const eCourseId = (e.courseId || "").toLowerCase()
        return eSlug === trackSlug || eId === trackSlug || eCourseId === trackSlug
      })

      return {
        ...track,
        href: `/courses/${track.slug || track.id}/learn`,
        exploreHref: `/courses/${track.slug || track.id}`,
        image: track.image || getCourseCoverImage(track.category, track.slug || track.id, track.title, track.thumbnail_url),
        enrolled: isEnrolled,
      }
    })
  }, [initialData?.catalogTracks, allCurriculumTracksFallback, mergedEnrollments])

  /* ═══════════════════════════════════════════
     5 Sidebar Navigation Items
  ═══════════════════════════════════════════ */
  const NAV_ITEMS: { id: DashboardTab; label: string; icon: typeof Home }[] = [
    { id: "home", label: "Home", icon: Home },
    { id: "courses", label: "My Courses", icon: BookOpen },
    { id: "practice", label: "Practice", icon: Target },
    { id: "opportunities", label: "Opportunities", icon: Briefcase },
    { id: "achievements", label: "Achievements", icon: Award },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased">
      {/* Mobile overlay backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 md:hidden transition-opacity duration-300"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ══════════════════════════════════════
          Sidebar — Clean & Minimal
      ══════════════════════════════════════ */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen z-50 md:z-40 border-r border-border/60 bg-card flex flex-col justify-between shrink-0 transition-all duration-300 ease-in-out w-64 max-w-[80vw] ${
          mobileSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          {/* Logo Header */}
          <div className="h-16 border-b border-border/40 px-5 flex items-center justify-between">
            <Link
              href="/"
              onClick={() => setMobileSidebarOpen(false)}
              className="flex items-center gap-2.5"
            >
              <AsciLogo size={28} showText={true} showBadge={false} />
            </Link>
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              aria-label="Close sidebar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-0.5">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSwitchTab(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === item.id
                    ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 text-white font-semibold shadow-md shadow-blue-500/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                <item.icon className={`w-[18px] h-[18px] shrink-0 ${activeTab === item.id ? "text-white" : ""}`} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer — Simple User Info */}
        <div className="p-3 border-t border-border/40">
          <div className="flex items-center justify-between px-2 py-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary overflow-hidden shrink-0">
                {userAvatar ? (
                  <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                ) : (
                  userName.charAt(0).toUpperCase()
                )}
              </div>
              <span className="text-sm font-medium text-foreground truncate">{userName}</span>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded-lg cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════════════
          Main Workspace Area
      ══════════════════════════════════════ */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header — Clean & Simple */}
        <header className="border-b border-border/40 bg-background/95 backdrop-blur-sm sticky top-0 z-30">
          <div className="h-14 sm:h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-3">
            {/* Left: Hamburger + Page Title */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg border border-border/60 bg-card hover:bg-secondary text-muted-foreground hover:text-foreground transition-all cursor-pointer shrink-0"
                aria-label="Open sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground truncate">
                {NAV_ITEMS.find(n => n.id === activeTab)?.label || "Dashboard"}
              </h1>
            </div>

            {/* Right: Search + Profile + Theme */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Bar */}
              <div
                className="relative hidden sm:block w-48 md:w-64 lg:w-72 cursor-pointer"
                onClick={() => setSearchDialogOpen(true)}
              >
                <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  readOnly
                  placeholder="Search courses, problems..."
                  className="w-full bg-secondary/50 border border-border/60 rounded-lg pl-9 pr-10 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none cursor-pointer transition-all hover:border-border"
                  onClick={() => setSearchDialogOpen(true)}
                  onFocus={() => setSearchDialogOpen(true)}
                />
                <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border/60 pointer-events-none">
                  ⌘K
                </kbd>
              </div>

              {/* Mobile Search */}
              <button
                onClick={() => setSearchDialogOpen(true)}
                className="sm:hidden p-2 rounded-lg border border-border/60 bg-card text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileDropdownRef}>
                <button
                  onClick={() => setProfileDropdownOpen((prev) => !prev)}
                  className={`flex items-center gap-2 p-1 sm:px-2.5 sm:py-1.5 rounded-lg border transition-all cursor-pointer ${
                    profileDropdownOpen
                      ? "border-primary/40 bg-primary/5"
                      : "border-border/60 bg-card hover:bg-secondary"
                  }`}
                  aria-expanded={profileDropdownOpen}
                  aria-label="User menu"
                >
                  <div className="w-7 h-7 rounded-full overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-semibold text-primary">
                    {userAvatar ? (
                      <img src={userAvatar} alt={userName} className="w-full h-full object-cover" />
                    ) : (
                      userName ? userName.charAt(0).toUpperCase() : "U"
                    )}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-foreground truncate max-w-[100px]">
                    {userName}
                  </span>
                  <ChevronDown className={`hidden sm:block w-3.5 h-3.5 text-muted-foreground transition-transform ${profileDropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown */}
                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-border bg-card shadow-lg p-1.5 z-50 animate-fadeIn">
                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors"
                    >
                      Profile & Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleSwitchTab("achievements")
                        setProfileDropdownOpen(false)
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-foreground hover:bg-secondary transition-colors text-left cursor-pointer"
                    >
                      Certificates & Badges
                    </button>
                    <div className="my-1 border-t border-border/60" />
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle className="!h-8 !w-8" />
            </div>
          </div>
        </header>

        {/* Workspace Body */}
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl w-full mx-auto space-y-6">
          {activeTab === "home" && (
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
              enrollments={mergedEnrollments}
              weeklyActivity={weeklyActivity}
              catalogTracks={catalogTracks}
              recentLogs={initialData?.recentLogs || []}
              unlockedBadgeIds={unlockedBadgeIds}
              onSwitchTab={(tab) => {
                const mapped = LEGACY_TAB_MAP[tab] || (tab as DashboardTab)
                const careerSub = CAREER_SUBTAB_MAP[tab]
                handleSwitchTab(mapped, careerSub)
              }}
            />
          )}

          {activeTab === "courses" && (
            <DashboardCurriculum
              enrollments={mergedEnrollments}
              catalogTracks={catalogTracks}
              onEnrollTrack={(track) => {
                const trackSlug = track.slug || track.id
                if (!enrollments.some((e) => e.id === track.id || e.slug === trackSlug)) {
                  setEnrollments((prev) => [
                    ...prev,
                    {
                      id: track.id,
                      title: track.title,
                      slug: trackSlug,
                      progressPercent: 0,
                      lessonsCompleted: 0,
                      totalLessons: (track.modules || 4) * 3,
                      category: track.category,
                      difficulty: track.difficulty,
                    },
                  ])
                }
              }}
            />
          )}

          {activeTab === "practice" && <DashboardPracticeArena />}

          {activeTab === "opportunities" && (
            <DashboardCareer initialSubTab={careerInitialSubTab as any} />
          )}

          {activeTab === "achievements" && (
            <div className="space-y-8">
              <DashboardCertificates
                enrollments={mergedEnrollments}
                userName={userName}
                onExploreCourses={() => handleSwitchTab("courses")}
              />
              <div className="space-y-4">
                <h2 className="text-lg font-bold text-foreground">Badges & Honors</h2>
                <BadgesShowcase unlockedBadgeIds={unlockedBadgeIds} />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Search Command Palette */}
      <SearchCommandDialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen} />
    </div>
  )
}
