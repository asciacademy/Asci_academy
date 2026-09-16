"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  BookOpen, Award, PlayCircle, Zap, Flame, Compass,
  ChevronRight, BarChart2, Layers, CheckCircle2, ArrowRight,
  Code, Clock, Trophy, TrendingUp, Pencil, Check, X, Camera, Globe,
  Briefcase, Video, ShieldCheck, Target, ExternalLink,
  FileText, Terminal, Users, Calendar, ArrowUpRight, Search,
  Play, Star, PenTool, Layout, ChevronLeft, Sparkles, Cpu, Server,
  BrainCircuit, Bot, Circle
} from "lucide-react"
import { AsciIcon } from "@/components/icons"
import { useUserSettings } from "@/context/user-settings-context"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { DashboardRightPanel } from "@/components/dashboard/dashboard-right-panel"
import { getCourseCoverImage } from "@/lib/course-images"

const DEFAULT_AVATARS = [
  { src: "/avatars/hacker.png", name: "Engineer", tag: "Logic & Code" },
  { src: "/avatars/robot.png", name: "Architect", tag: "System Design" },
  { src: "/avatars/skull.png", name: "Strategist", tag: "Security & Scale" },
  { src: "/avatars/astronaut.png", name: "Explorer", tag: "Discovery" },
  { src: "/avatars/ninja.png", name: "Builder", tag: "High Speed" },
  { src: "/avatars/cat.png", name: "Fellow", tag: "Core Member" },
]

interface DashboardOverviewProps {
  userName: string
  rank: string
  totalXP: number
  streak: number
  currentLevel: number
  levelXP: number
  levelPercent: number
  isMaxClearance: boolean
  enrollments: any[]
  weeklyActivity: { day: string; minutes: number; solved: number }[]
  catalogTracks: any[]
  recentLogs: { title: string; category: string; time: string; xp: string }[]
  unlockedBadgeIds?: string[]
  avatarUrl?: string | null
  oauthAvatarUrl?: string | null
  onUpdateName?: (newName: string) => Promise<boolean | void> | void
  onUpdateAvatar?: (newAvatarUrl: string) => Promise<boolean | void> | void
  onSwitchTab: (tab: any) => void
}

export function DashboardOverview({
  userName,
  rank,
  totalXP,
  streak,
  currentLevel,
  levelXP,
  levelPercent,
  isMaxClearance,
  enrollments = [],
  weeklyActivity = [],
  catalogTracks = [],
  recentLogs = [],
  unlockedBadgeIds,
  avatarUrl,
  oauthAvatarUrl,
  onUpdateName,
  onUpdateAvatar,
  onSwitchTab,
}: DashboardOverviewProps) {
  const { settings, updateSetting } = useUserSettings()
  const {
    registeredHackathonsCount,
    activeApplicationsCount,
    confirmedBookingsCount,
    potd,
    hackathons,
    jobs,
    mentors,
  } = useUnstopEcosystem()

  const effectiveAvatar = avatarUrl || settings.avatar || oauthAvatarUrl || ""

  // Right Details panel visibility toggle
  const [showRightPanel, setShowRightPanel] = useState(true)

  // Inline name editing state
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(userName)
  const [isSavingName, setIsSavingName] = useState(false)

  // Avatar picker dialog state
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [customAvatarInput, setCustomAvatarInput] = useState("")
  const [avatarError, setAvatarError] = useState("")

  // Daily Mission Checklist State
  const [missionState, setMissionState] = useState({
    lesson: true,
    problems: false,
    project: false,
  })

  React.useEffect(() => {
    setEditedName(userName)
  }, [userName])

  const handleSaveName = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    const trimmed = editedName.trim()
    if (!trimmed || trimmed === userName) {
      setIsEditingName(false)
      return
    }

    setIsSavingName(true)
    try {
      if (onUpdateName) {
        await onUpdateName(trimmed)
      }
      setIsEditingName(false)
    } catch (err) {
      console.error("Failed to update name:", err)
    } finally {
      setIsSavingName(false)
    }
  }

  const handleSelectAvatar = async (url: string) => {
    updateSetting("avatar", url)
    if (onUpdateAvatar) {
      await onUpdateAvatar(url)
    }
    setShowAvatarPicker(false)
    setAvatarError("")
  }

  const handleApplyCustomAvatar = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customAvatarInput.trim()) return
    const url = customAvatarInput.trim()
    if (!url.startsWith("http://") && !url.startsWith("https://") && !url.startsWith("/")) {
      setAvatarError("Please enter a valid image URL")
      return
    }
    await handleSelectAvatar(url)
    setCustomAvatarInput("")
  }

  // Active in-progress courses from real database enrollments (focused on 1-2 items)
  const continueLearningCourses = enrollments.map((enr: any, idx: number) => {
    const totalLessons = enr.totalLessons || enr.total_lessons || 10
    const completedLessons = enr.completedLessons || enr.lessonsCompleted || enr.completed_lessons || 0
    const progressPercent = enr.progressPercent ?? (totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0)
    const coverImage = enr.thumbnail || getCourseCoverImage(enr.category, enr.slug || enr.courseId, enr.title)

    return {
      id: enr.id || enr.courseId || enr.slug || `course-enr-${idx}`,
      title: enr.title || "Curriculum Track",
      category: (enr.category || "ENGINEERING").toUpperCase(),
      progress: progressPercent,
      lessons: `${completedLessons}/${totalLessons} Lessons`,
      timeLeft: `${Math.max(1, Math.ceil((totalLessons - completedLessons) * 0.5))}h left`,
      image: coverImage,
      href: enr.slug ? `/programs/${enr.slug}/course` : (enr.courseId ? `/programs/${enr.courseId}/course` : "/programs/dsa/course"),
    }
  })

  // Recommended Courses from real database catalog tracks with pagination
  const [recommendedPage, setRecommendedPage] = useState(0)
  const coursesPerPage = 2
  const realCatalog = catalogTracks && catalogTracks.length > 0 ? catalogTracks : []
  const maxPages = Math.max(1, Math.ceil(realCatalog.length / coursesPerPage))
  const displayedRecommended = realCatalog.slice(
    recommendedPage * coursesPerPage,
    (recommendedPage + 1) * coursesPerPage
  )

  const completedMissionsCount = Object.values(missionState).filter(Boolean).length

  return (
    <div className="animate-fadeIn pb-12">
      {/* ── Main Layout: Center Stream + Right Detail Column ── */}
      <div className="flex flex-col xl:flex-row items-start gap-6 sm:gap-8">
        
        {/* ══════════════════════════════════════════════
            Student Metrics & Cadence Column (Profile, Streak, Study Time)
            - Mobile & Tablet (< xl): Rendered at the TOP of the dashboard
            - Desktop (>= xl): Rendered on the RIGHT side
        ══════════════════════════════════════════════ */}
        {showRightPanel && (
          <div className="w-full xl:w-[350px] 2xl:w-[380px] shrink-0 order-1 xl:order-2">
            <DashboardRightPanel
              userName={userName}
              effectiveAvatar={effectiveAvatar}
              rank={rank}
              totalXP={totalXP}
              streak={streak}
              currentLevel={currentLevel}
              weeklyActivity={weeklyActivity}
              coursesInProgressCount={enrollments.filter((e: any) => e.status !== "completed" && (e.progressPercent || 0) < 100).length}
              coursesCompletedCount={enrollments.filter((e: any) => e.status === "completed" || (e.progressPercent || 0) >= 100).length}
              isEditingName={isEditingName}
              setIsEditingName={setIsEditingName}
              editedName={editedName}
              setEditedName={setEditedName}
              handleSaveName={handleSaveName}
              isSavingName={isSavingName}
              setShowAvatarPicker={setShowAvatarPicker}
              onClosePanel={() => setShowRightPanel(false)}
              showCloseButton={true}
            />
          </div>
        )}

        {/* ══════════════════════════════════════════════
            Center Primary Stream
            - Mobile & Tablet (< xl): Rendered below the profile overview
            - Desktop (>= xl): Rendered on the LEFT (main stream)
        ══════════════════════════════════════════════ */}
        <div className="flex-1 w-full min-w-0 space-y-6 sm:space-y-8 order-2 xl:order-1">
          
          {/* Top details toggle banner if right panel is hidden */}
          {!showRightPanel && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-500/5 dark:bg-stone-900 border border-amber-500/20">
              <span className="text-xs text-muted-foreground font-medium">Student metrics and analytics panel is minimized.</span>
              <button
                onClick={() => setShowRightPanel(true)}
                className="text-xs font-semibold text-accent hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Show Profile &amp; Metrics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ─────────────────────────────────────────────
              1. TODAY'S MISSION (Primary Decision Engine)
          ───────────────────────────────────────────── */}
          <section className="rounded-xl border border-stone-200 dark:border-stone-800 bg-card p-5 sm:p-6 shadow-xs relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
              <div className="flex items-start sm:items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 dark:bg-orange-500/20 text-accent flex items-center justify-center border border-orange-500/20 shrink-0 mt-0.5 sm:mt-0">
                  <Target className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-base font-bold tracking-tight text-foreground">
                      Today&apos;s Engineering Mission
                    </h2>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold border border-stone-200 dark:border-stone-700 leading-none">
                      {completedMissionsCount}/3 Done
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    Execute high-impact deliberate practice to compound engineering mastery.
                  </p>
                </div>
              </div>
              <div className="shrink-0 self-start sm:self-auto">
                <span className="inline-flex items-center text-xs font-mono font-bold text-accent px-2.5 py-1 rounded-md bg-orange-500/10 border border-orange-500/25">
                  +180 XP Available
                </span>
              </div>
            </div>

            {/* Mission Checklist Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-4">
              {/* Item 1: Lesson */}
              <div
                onClick={() => setMissionState(s => ({ ...s, lesson: !s.lesson }))}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  missionState.lesson
                    ? "bg-stone-50/80 dark:bg-stone-900/60 border-stone-300 dark:border-stone-700"
                    : "bg-background border-stone-200 dark:border-stone-800 hover:border-accent/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">01 · Lesson</span>
                  </div>
                  {missionState.lesson ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-300 dark:text-stone-700" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground line-clamp-1">Complete Active Module</div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Sliding Window &amp; Two Pointers</p>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-100 dark:border-stone-800/80">
                  <span className="font-mono text-muted-foreground">+60 XP</span>
                  <span className="text-accent font-semibold flex items-center gap-0.5 text-[11px]">
                    Resume <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

              {/* Item 2: Practice Problems */}
              <div
                onClick={() => setMissionState(s => ({ ...s, problems: !s.problems }))}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  missionState.problems
                    ? "bg-stone-50/80 dark:bg-stone-900/60 border-stone-300 dark:border-stone-700"
                    : "bg-background border-stone-200 dark:border-stone-800 hover:border-accent/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">02 · Practice</span>
                  </div>
                  {missionState.problems ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-300 dark:text-stone-700" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground line-clamp-1">Solve 2 Problems</div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Memory &amp; Queue Invariants</p>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-100 dark:border-stone-800/80">
                  <span className="font-mono text-muted-foreground">+70 XP</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSwitchTab("practice-arena")
                    }}
                    className="text-accent font-semibold flex items-center gap-0.5 text-[11px]"
                  >
                    Solve <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Item 3: Project Milestone */}
              <div
                onClick={() => setMissionState(s => ({ ...s, project: !s.project }))}
                className={`p-3.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  missionState.project
                    ? "bg-stone-50/80 dark:bg-stone-900/60 border-stone-300 dark:border-stone-700"
                    : "bg-background border-stone-200 dark:border-stone-800 hover:border-accent/40"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-muted-foreground uppercase tracking-wider">03 · Build</span>
                  </div>
                  {missionState.project ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4 text-stone-300 dark:text-stone-700" />
                  )}
                </div>
                <div>
                  <div className="text-xs font-bold text-foreground line-clamp-1">01 Project Milestone</div>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Implement Token Bucket Rate Limiter</p>
                </div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-stone-100 dark:border-stone-800/80">
                  <span className="font-mono text-muted-foreground">+50 XP</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onSwitchTab("projects")
                    }}
                    className="text-accent font-semibold flex items-center gap-0.5 text-[11px]"
                  >
                    Build <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────
              2. CONTINUE LEARNING (1-2 Focused Active Items)
          ───────────────────────────────────────────── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                  Continue Learning
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700 font-semibold">
                  In Progress
                </span>
              </div>
              <Link
                href="/programs"
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 group"
              >
                <span>Browse all tracks</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {continueLearningCourses.length === 0 ? (
              <div className="rounded-xl border border-dashed border-stone-300 dark:border-stone-800 bg-card/60 p-8 text-center space-y-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-accent flex items-center justify-center mx-auto">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="font-bold text-sm text-foreground">
                    No active enrolled tracks yet
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Choose from verified engineering curricula. Enroll in any track to begin your lessons and automatically log your weekly study progress.
                  </p>
                </div>
                <button
                  onClick={() => onSwitchTab("courses")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <span>Explore Engineering Tracks</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {continueLearningCourses.slice(0, 2).map((course) => (
                  <div
                    key={course.id}
                    className="rounded-xl border border-stone-200 dark:border-stone-800 bg-card overflow-hidden shadow-xs hover:border-accent/40 transition-all group flex flex-col justify-between"
                  >
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5 bg-card/90 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-md text-foreground border border-stone-200 dark:border-stone-700 uppercase tracking-wider">
                        {course.category}
                      </div>
                    </div>

                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-sm sm:text-base text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-1">
                          {course.title}
                        </h3>

                        <div className="mt-3 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                            <span>Syllabus Completion</span>
                            <span className="text-accent font-bold">{course.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-accent rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                          <span>{course.lessons}</span>
                          <span>·</span>
                          <span>{course.timeLeft}</span>
                        </div>

                        <Link
                          href={course.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-white text-xs font-bold hover:bg-orange-700 transition-colors shadow-2xs"
                        >
                          <span>Resume</span>
                          <Play className="w-3 h-3 fill-current" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ─────────────────────────────────────────────
              3. SKILL COMPETENCY PROGRESS (Engineering Mastery)
          ───────────────────────────────────────────── */}
          <section className="rounded-xl border border-stone-200 dark:border-stone-800 bg-card p-5 sm:p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground tracking-tight">
                  Skill Competency Matrix
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Live verification of core engineering domains based on code execution and milestone assessments.
                </p>
              </div>
              <button
                onClick={() => onSwitchTab("skill-tree")}
                className="text-xs font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Open Skill Graph</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-4 gap-3.5 pt-2">
              {[
                { name: "Algorithms & Complexity", score: 78, level: "Advanced", icon: Terminal, color: "text-amber-500" },
                { name: "Distributed Systems", score: 62, level: "Proficient", icon: Server, color: "text-blue-500" },
                { name: "Concurrency & Memory", score: 84, level: "Mastered", icon: Cpu, color: "text-emerald-500" },
                { name: "AI Swarms & RAG", score: 45, level: "Learning", icon: BrainCircuit, color: "text-purple-500" },
              ].map((skill, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-stone-200 dark:border-stone-800 bg-background/50 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <skill.icon className={`w-4 h-4 ${skill.color} shrink-0`} />
                      <span className="text-xs font-bold text-foreground truncate">{skill.name}</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-muted-foreground font-semibold shrink-0 leading-none">
                      {skill.level}
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground">
                      <span>Index</span>
                      <span className="font-bold text-foreground">{skill.score}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${skill.score}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ─────────────────────────────────────────────
              4. AXEL TECHNICAL INSIGHT (Contextual Mentorship)
          ───────────────────────────────────────────── */}
          <section className="rounded-xl border border-stone-200 dark:border-stone-800 bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900/60 dark:to-stone-950 p-5 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-orange-500/10 text-accent flex items-center justify-center shrink-0 border border-orange-500/20 mt-0.5">
                <Bot className="w-5 h-5" />
              </div>
              <div className="space-y-2 flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-accent">
                    Axel · Senior Architectural Intelligence
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground shrink-0">Today · 09:40 UTC</span>
                </div>
                <p className="text-xs text-foreground/90 leading-relaxed">
                  &ldquo;In your recent Sliding Window Maximum implementation, space complexity was <span className="font-mono text-accent">O(k)</span> using a priority queue. By refactoring to a monotonic double-ended deque, you can drop time complexity from <span className="font-mono text-accent">O(n log k)</span> to strictly <span className="font-mono text-accent">O(n)</span>.&rdquo;
                </p>
                <div className="pt-1 flex items-center gap-3 flex-wrap">
                  <button
                    onClick={() => onSwitchTab("axel")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-white text-xs font-semibold hover:bg-orange-700 transition-colors shadow-2xs"
                  >
                    <span>Discuss with Axel</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onSwitchTab("practice-arena")}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Review Benchmark
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* ─────────────────────────────────────────────
              5. UPCOMING EVENTS & PRACTICE HIGHLIGHTS
          ───────────────────────────────────────────── */}
          <section className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-foreground">Upcoming Deadlines &amp; Hackathons</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-semibold leading-none">
                  Live Registration
                </span>
              </div>
              <button
                onClick={() => onSwitchTab("career")}
                className="text-xs font-semibold text-accent hover:underline cursor-pointer shrink-0 self-start sm:self-auto"
              >
                View Career Calendar →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Problem of the Day Quick Card */}
              <div className="p-4 rounded-xl bg-card border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-accent" />
                    <span className="text-xs font-bold text-foreground truncate">{potd?.title || "Sliding Window Maximum"}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    POTD · +50 XP · {potd?.difficulty || "Medium"}
                  </p>
                </div>
                <button
                  onClick={() => onSwitchTab("practice-arena")}
                  className="px-3 py-1.5 rounded-md bg-accent hover:bg-orange-700 text-white text-xs font-semibold transition-colors shrink-0 cursor-pointer shadow-2xs"
                >
                  Solve
                </button>
              </div>

              {/* Hackathons Quick Card */}
              <div className="p-4 rounded-xl bg-card border border-stone-200 dark:border-stone-800 flex items-center justify-between">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span className="text-xs font-bold text-foreground truncate">National Distributed Systems Hackathon</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono">
                    {registeredHackathonsCount > 0 ? `${registeredHackathonsCount} Registered` : "₹5,00,000 Prize Pool · In 4 Days"}
                  </p>
                </div>
                <button
                  onClick={() => onSwitchTab("hackathons")}
                  className="px-3 py-1.5 rounded-md bg-secondary text-foreground text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors shrink-0 cursor-pointer"
                >
                  Compete
                </button>
              </div>
            </div>
          </section>

        </div>

      </div>

      {/* ══════════════════════════════════════════════
          Avatar Selection Dialog
      ══════════════════════════════════════════════ */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-stone-200 dark:border-stone-800 rounded-xl max-w-md w-full p-6 shadow-xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-base text-foreground">
                Select Engineering Persona Avatar
              </h3>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(false)}
                className="p-1 text-muted-foreground hover:text-foreground rounded-md cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {DEFAULT_AVATARS.map((av) => (
                <button
                  key={av.src}
                  type="button"
                  onClick={() => handleSelectAvatar(av.src)}
                  className="p-3 rounded-lg border border-stone-200 dark:border-stone-800 bg-secondary/50 hover:border-accent transition-all flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <img src={av.src} alt={av.name} className="w-12 h-12 object-cover rounded-md group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-medium text-foreground">{av.name}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleApplyCustomAvatar} className="pt-2 border-t border-stone-200 dark:border-stone-800 space-y-2">
              <label className="text-xs text-muted-foreground block font-medium">Or enter custom image URL:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAvatarInput}
                  onChange={(e) => setCustomAvatarInput(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="flex-1 bg-secondary border border-stone-200 dark:border-stone-800 rounded-md px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-accent"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-accent hover:bg-orange-700 text-white text-xs font-semibold cursor-pointer shadow-2xs"
                >
                  Apply
                </button>
              </div>
              {avatarError && <p className="text-[11px] text-destructive">{avatarError}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
