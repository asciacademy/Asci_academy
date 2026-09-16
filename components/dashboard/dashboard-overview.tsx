"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  BookOpen, Award, PlayCircle, Zap, Flame, ChevronRight,
  CheckCircle2, ArrowRight, Code, Clock, Trophy, TrendingUp,
  Pencil, Check, X, Camera,
  FileText, Terminal, Users, Search,
  Play, Star, ChevronLeft, Sparkles
} from "lucide-react"
import { AsciIcon } from "@/components/icons"
import { AxelStage } from "@/components/axel/axel-stage"
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

  // Inline name editing state
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(userName)
  const [isSavingName, setIsSavingName] = useState(false)

  // Avatar picker dialog state
  const [showAvatarPicker, setShowAvatarPicker] = useState(false)
  const [customAvatarInput, setCustomAvatarInput] = useState("")
  const [avatarError, setAvatarError] = useState("")

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
      if (onUpdateName) await onUpdateName(trimmed)
      setIsEditingName(false)
    } catch (err) {
      console.error("Failed to update name:", err)
    } finally {
      setIsSavingName(false)
    }
  }

  const handleSelectAvatar = async (url: string) => {
    updateSetting("avatar", url)
    if (onUpdateAvatar) await onUpdateAvatar(url)
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

  // Courses in progress
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
      lessons: `${completedLessons}/${totalLessons}`,
      timeLeft: `${Math.max(1, Math.ceil((totalLessons - completedLessons) * 0.5))}h left`,
      image: coverImage,
      href: enr.slug ? `/programs/${enr.slug}/course` : (enr.courseId ? `/programs/${enr.courseId}/course` : "/programs/dsa/course"),
    }
  })

  // Recommended courses pagination
  const [recommendedPage, setRecommendedPage] = useState(0)
  const coursesPerPage = 4
  const realCatalog = catalogTracks && catalogTracks.length > 0 ? catalogTracks : []
  const maxPages = Math.max(1, Math.ceil(realCatalog.length / coursesPerPage))
  const displayedRecommended = realCatalog.slice(
    recommendedPage * coursesPerPage,
    (recommendedPage + 1) * coursesPerPage
  )

  // Stats
  const coursesInProgress = enrollments.filter((e: any) => e.status !== "completed" && (e.progressPercent || 0) < 100).length
  const coursesCompleted = enrollments.filter((e: any) => e.status === "completed" || (e.progressPercent || 0) >= 100).length
  const greeting = (() => {
    const h = new Date().getHours()
    if (h < 12) return "Good morning"
    if (h < 17) return "Good afternoon"
    return "Good evening"
  })()

  return (
    <div className="space-y-8 animate-fadeIn pb-8">

      {/* ══════════════════════════════════════════════
          PROFILE HERO STRIP
      ══════════════════════════════════════════════ */}
      <div className="relative rounded-3xl overflow-hidden bg-[#062112] text-white p-6 sm:p-8">
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 31px,rgba(255,255,255,1) 31px,rgba(255,255,255,1) 32px),repeating-linear-gradient(90deg,transparent,transparent 31px,rgba(255,255,255,1) 31px,rgba(255,255,255,1) 32px)" }}
        />
        {/* Gold glow top-right */}
        <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#D4B872]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-48 h-48 rounded-full bg-emerald-500/5 blur-2xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">

          {/* Avatar */}
          <div className="relative shrink-0">
            <div
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-[#D4B872]/20 border-2 border-[#D4B872]/30 flex items-center justify-center text-2xl font-bold text-[#D4B872] cursor-pointer group"
              onClick={() => setShowAvatarPicker(true)}
              title="Change avatar"
            >
              {effectiveAvatar ? (
                <img src={effectiveAvatar} alt={userName} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            {/* Online indicator */}
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full ring-2 ring-[#062112] shadow" />
          </div>

          {/* Name + rank + meta */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              {/* Name edit inline */}
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="bg-white/10 border border-white/20 rounded-xl px-3 py-1 text-base font-bold text-white focus:outline-none focus:border-[#D4B872] w-44 sm:w-56"
                    onKeyDown={(e) => e.key === "Escape" && setIsEditingName(false)}
                  />
                  <button type="submit" disabled={isSavingName} className="p-1.5 rounded-lg bg-[#D4B872]/20 text-[#D4B872] hover:bg-[#D4B872]/30 transition-colors cursor-pointer">
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button type="button" onClick={() => setIsEditingName(false)} className="p-1.5 rounded-lg text-white/40 hover:text-white/70 cursor-pointer">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2">
                  <p className="text-sm text-white/50">{greeting},</p>
                  <h2 className="text-lg sm:text-xl font-bold text-white truncate">{userName}</h2>
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="p-1 rounded-lg text-white/30 hover:text-white/60 transition-colors cursor-pointer"
                    title="Edit name"
                  >
                    <Pencil className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {/* Rank + admin badge */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#D4B872]/15 text-[#D4B872] border border-[#D4B872]/25">
                ⚔ {rank}
              </span>
              {isMaxClearance && (
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/25">
                  ◆ Max Clearance
                </span>
              )}
              <span className="text-[11px] font-mono text-white/35">
                Level {currentLevel}
              </span>
            </div>

            {/* XP Progress bar */}
            <div className="space-y-1.5 max-w-xs">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-white/40">XP Progress</span>
                <span className="text-[#D4B872] font-bold">{levelXP.toLocaleString()} / 1,000</span>
              </div>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#D4B872] to-amber-400 shadow-[0_0_8px_#D4B87250] transition-all duration-700"
                  style={{ width: `${levelPercent}%` }}
                />
              </div>
            </div>
          </div>

          {/* Quick stats (right side on sm+) */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{totalXP.toLocaleString()}</div>
              <div className="text-[11px] text-white/35 font-mono">Total XP</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400 flex items-center gap-1">
                <Flame className="w-5 h-5" />
                {streak}
              </div>
              <div className="text-[11px] text-white/35 font-mono">Day Streak</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-300">{enrollments.length}</div>
              <div className="text-[11px] text-white/35 font-mono">Enrolled</div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BENTO STAT CARDS ROW
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* XP Card */}
        <div className="rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/20 p-4 sm:p-5 space-y-3 hover:border-amber-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
              <Zap className="w-4 h-4 text-amber-500" />
            </div>
            <TrendingUp className="w-3.5 h-3.5 text-amber-500/50 group-hover:text-amber-500 transition-colors" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground tabular-nums">{totalXP.toLocaleString()}</div>
            <div className="text-xs text-muted-foreground font-medium mt-0.5">Total XP Earned</div>
          </div>
        </div>

        {/* Streak Card */}
        <div className="rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 p-4 sm:p-5 space-y-3 hover:border-orange-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
              <Flame className="w-4 h-4 text-orange-500" />
            </div>
            {streak > 0 && (
              <span className="text-[10px] font-bold text-orange-600 dark:text-orange-400 bg-orange-500/10 px-1.5 py-0.5 rounded-full border border-orange-500/20">
                🔥 Active
              </span>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground tabular-nums">{streak}</div>
            <div className="text-xs text-muted-foreground font-medium mt-0.5">Day Streak</div>
          </div>
        </div>

        {/* Level Card */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-emerald-500/20 p-4 sm:p-5 space-y-3 hover:border-emerald-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center">
              <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 font-mono">
              {levelPercent}%
            </span>
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground tabular-nums">L{currentLevel}</div>
            <div className="text-xs text-muted-foreground font-medium mt-0.5">Current Level</div>
          </div>
        </div>

        {/* Courses Card */}
        <div className="rounded-2xl bg-gradient-to-br from-sky-500/10 to-blue-500/5 border border-sky-500/20 p-4 sm:p-5 space-y-3 hover:border-sky-500/40 transition-all group">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-xl bg-sky-500/15 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            </div>
            {coursesCompleted > 0 && (
              <span className="text-[10px] font-bold text-sky-600 dark:text-sky-400 bg-sky-500/10 px-1.5 py-0.5 rounded-full border border-sky-500/20">
                {coursesCompleted} done
              </span>
            )}
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground tabular-nums">{enrollments.length}</div>
            <div className="text-xs text-muted-foreground font-medium mt-0.5">Enrolled Tracks</div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MAIN TWO-COLUMN LAYOUT (Feed + Right Panel)
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col xl:flex-row items-start gap-6">

        {/* ── Left / Center Feed ── */}
        <div className="flex-1 w-full min-w-0 space-y-8">

          {/* ─────────────────────────────────────────────
              1. Continue Learning
          ───────────────────────────────────────────── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold text-foreground">Continue Learning</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-semibold">
                  {continueLearningCourses.length} Active
                </span>
              </div>
              <Link
                href="/programs"
                className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:text-amber-600 flex items-center gap-1 group"
              >
                <span>All tracks</span>
                <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {continueLearningCourses.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-stone-300 dark:border-stone-700/60 bg-stone-50 dark:bg-stone-900/40 p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div className="space-y-1 max-w-md mx-auto">
                  <h3 className="font-bold text-sm text-foreground">No active enrolled tracks yet</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Choose from our verified engineering curricula. Enroll in any track to begin your lessons and log weekly study progress.
                  </p>
                </div>
                <button
                  onClick={() => onSwitchTab("courses")}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold shadow-sm transition-all cursor-pointer"
                >
                  <span>Explore {realCatalog.length || 47} Tracks</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {continueLearningCourses.map((course) => (
                  <div
                    key={course.id}
                    className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-300/50 dark:hover:border-amber-700/40 transition-all group flex flex-col"
                  >
                    {/* Cover */}
                    <div className="relative aspect-[16/8] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full text-foreground border border-stone-200/60 dark:border-stone-700/60 uppercase tracking-wider shadow-sm">
                        {course.category}
                      </div>
                    </div>

                    {/* Body */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-foreground leading-snug group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                          {course.title}
                        </h3>
                        {/* Progress */}
                        <div className="mt-3 space-y-1.5">
                          <div className="flex items-center justify-between text-[11px] font-medium text-muted-foreground">
                            <span>{course.lessons} Lessons</span>
                            <span className="text-amber-700 dark:text-amber-400 font-bold">{course.progress}%</span>
                          </div>
                          <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-100 dark:border-stone-800">
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="w-3 h-3 text-amber-500" />
                          {course.timeLeft}
                        </span>
                        <Link
                          href={course.href}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 to-orange-500/15 border border-orange-500/25 text-amber-800 dark:text-amber-300 text-xs font-bold hover:from-amber-500 hover:to-orange-500 hover:text-white transition-all shadow-xs"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Resume</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* ─────────────────────────────────────────────
              2. Recommended Courses
          ───────────────────────────────────────────── */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="text-base font-bold text-foreground">Recommended For You</h2>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-semibold">
                    {realCatalog.length} Curricula
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Production engineering curricula with interactive assertions and capstones.
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-mono text-muted-foreground hidden sm:block">
                  {recommendedPage + 1}/{maxPages}
                </span>
                <button
                  onClick={() => setRecommendedPage((p) => Math.max(0, p - 1))}
                  disabled={recommendedPage === 0}
                  className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setRecommendedPage((p) => Math.min(maxPages - 1, p + 1))}
                  disabled={recommendedPage >= maxPages - 1}
                  className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {displayedRecommended.map((course: any) => {
                const courseImg = course.image || getCourseCoverImage(course.category, course.slug || course.id, course.title, course.thumbnail_url)
                const courseHref = `/programs/${course.slug || course.id}/course`
                return (
                  <div
                    key={course.id || course.slug}
                    className="rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white dark:bg-stone-900/60 overflow-hidden shadow-xs hover:shadow-md hover:border-amber-300/50 dark:hover:border-amber-700/40 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-[16/8] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                        <img
                          src={courseImg}
                          alt={course.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full text-foreground border border-stone-200/60 dark:border-stone-700/60 uppercase tracking-wider shadow-sm">
                          {course.difficulty || "Advanced"}
                        </div>
                        {course.enrolled && (
                          <div className="absolute top-3 right-3 bg-gradient-to-r from-amber-500/90 to-orange-500/90 backdrop-blur-sm text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white shadow-sm">
                            Enrolled
                          </div>
                        )}
                        {/* Play hover overlay */}
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </div>
                        </div>
                      </div>

                      <div className="p-4 space-y-2">
                        <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          {course.category || "Engineering"}
                        </div>
                        <h3 className="font-bold text-sm text-foreground leading-snug line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {course.title}
                        </h3>
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {course.desc || `${course.modules || 6} Modules · ${course.duration || "Self-Paced"}`}
                        </p>
                      </div>
                    </div>

                    <div className="px-4 pb-4 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 pt-3">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span className="font-medium text-foreground">{course.duration || "Self-Paced"}</span>
                        <span>·</span>
                        <span>{course.modules || 6} Modules</span>
                      </div>
                      <Link
                        href={courseHref}
                        className="text-xs font-bold text-amber-700 dark:text-amber-400 hover:text-amber-600 transition-colors flex items-center gap-1"
                      >
                        <span>{course.enrolled ? "Continue" : "Explore"}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ─────────────────────────────────────────────
              3. Daily Practice & Hackathons
          ───────────────────────────────────────────── */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-foreground">Daily Practice & Hackathons</h2>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#4ade80] animate-pulse" />
              </div>
              <button
                onClick={() => onSwitchTab("practice-arena")}
                className="text-xs font-semibold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer flex items-center gap-1"
              >
                <span>Open Practice Arena</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Problem of the day */}
              <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between gap-3 hover:border-amber-300/50 dark:hover:border-amber-700/40 transition-all shadow-xs">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <Terminal className="w-3.5 h-3.5 text-amber-600" />
                    </div>
                    <span className="text-xs font-bold text-foreground truncate">{potd?.title || "Sliding Window Maximum"}</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground pl-9">
                    Earn +50 XP · <span className="text-amber-600 dark:text-amber-400 font-semibold">{potd?.difficulty || "Medium"}</span>
                  </p>
                </div>
                <button
                  onClick={() => onSwitchTab("practice-arena")}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold transition-all shrink-0 cursor-pointer shadow-xs"
                >
                  Solve →
                </button>
              </div>

              {/* Hackathons quick card */}
              <div className="p-4 rounded-2xl bg-white dark:bg-stone-900/60 border border-stone-200/80 dark:border-stone-800/80 flex items-center justify-between gap-3 hover:border-amber-300/50 dark:hover:border-amber-700/40 transition-all shadow-xs">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                      <Trophy className="w-3.5 h-3.5 text-orange-500" />
                    </div>
                    <span className="text-xs font-bold text-foreground truncate">National Hackathon Series</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground pl-9">
                    {registeredHackathonsCount > 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{registeredHackathonsCount} Registered</span>
                    ) : (
                      "₹5,00,000 Prize Pool"
                    )}
                  </p>
                </div>
                <button
                  onClick={() => onSwitchTab("hackathons")}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-100 dark:bg-stone-800 text-foreground text-xs font-bold hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors shrink-0 cursor-pointer border border-stone-200 dark:border-stone-700"
                >
                  Compete
                </button>
              </div>
            </div>
          </section>

        </div>

        {/* ── Right: Weekly Stats Panel ── */}
        <div className="w-full xl:w-72 shrink-0">
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
            onClosePanel={undefined}
            showCloseButton={false}
          />
        </div>

      </div>

      {/* ══════════════════════════════════════════════
          Avatar Selection Dialog
      ══════════════════════════════════════════════ */}
      {showAvatarPicker && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-stone-100 dark:border-stone-800 pb-3">
              <h3 className="font-bold text-base text-foreground">Choose Profile Avatar</h3>
              <button
                type="button"
                onClick={() => setShowAvatarPicker(false)}
                className="p-1.5 text-muted-foreground hover:text-foreground rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer transition-colors"
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
                  className="p-3 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/60 hover:border-amber-500 hover:bg-amber-50/20 dark:hover:bg-amber-500/10 transition-all flex flex-col items-center gap-1.5 cursor-pointer group"
                >
                  <img src={av.src} alt={av.name} className="w-12 h-12 object-cover rounded-xl group-hover:scale-105 transition-transform" />
                  <span className="text-[11px] font-medium text-foreground">{av.name}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleApplyCustomAvatar} className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
              <label className="text-xs text-muted-foreground block">Or paste custom image URL:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customAvatarInput}
                  onChange={(e) => setCustomAvatarInput(e.target.value)}
                  placeholder="https://example.com/avatar.png"
                  className="flex-1 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl px-3 py-1.5 text-xs text-foreground focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Apply
                </button>
              </div>
              {avatarError && <p className="text-[11px] text-red-500">{avatarError}</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
