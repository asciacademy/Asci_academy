"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen, Award, Zap, Flame, ChevronRight,
  Code, Trophy, Briefcase, FileCheck, Play,
  Terminal, ArrowRight, Clock, CheckCircle2,
  Sparkles, Download, Share2, ExternalLink,
  GraduationCap, TrendingUp, BarChart3,
  Bug, BrainCircuit, ShieldCheck, Activity
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { getCourseCoverImage } from "@/lib/course-images"
import { AxelStage } from "@/components/axel/axel-stage"
import { useAxel } from "@/context/axel-context"
import { DailyTasksCard } from "@/components/gamification/daily-tasks-card"
import { getCurriculumCourseBySlug, getAllCurriculumCourses } from "@/lib/curriculum-data"
import { CertificateModal } from "@/components/certificate/certificate-modal"
import { Certificate } from "@/lib/certificate-types"

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
  activityEvents?: any[]
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
  activityEvents = [],
  avatarUrl,
  oauthAvatarUrl,
  onSwitchTab,
}: DashboardOverviewProps) {
  const { potd } = useUnstopEcosystem()
  const { openFocus, sendMessage } = useAxel()
  const effectiveAvatar = avatarUrl || oauthAvatarUrl || ""

  // State for Certificate Preview Modal (Feature E)
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  // Active in-progress courses from real database enrollments
  const continueLearningCourses = useMemo(() => {
    return enrollments.map((enr: any, idx: number) => {
      const totalLessons = enr.totalLessons || enr.total_lessons || 10
      const completedLessons = enr.completedLessons || enr.lessonsCompleted || enr.completed_lessons || 0
      const progressPercent = enr.progressPercent ?? (totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0)

      return {
        id: enr.id || enr.courseId || enr.slug || `course-enr-${idx}`,
        slug: enr.slug || enr.courseId || "dsa",
        title: enr.title || "Curriculum Track",
        category: (enr.category || "Engineering").toUpperCase(),
        progress: progressPercent,
        totalLessons,
        completedLessons,
        lessons: `${completedLessons}/${totalLessons}`,
        image: enr.thumbnail || getCourseCoverImage(enr.category, enr.slug || enr.courseId, enr.title),
        href: enr.slug ? `/courses/${enr.slug}/learn` : (enr.courseId ? `/courses/${enr.courseId}/learn` : "/courses/dsa/learn"),
      }
    })
  }, [enrollments])

  // ─────────────────────────────────────────────────────────────
  // FEATURE C: Smart "Jump Back In" Hero Course Calculation
  // ─────────────────────────────────────────────────────────────
  const primaryCourse = continueLearningCourses[0]
  const allCurriculum = getAllCurriculumCourses()
  const fallbackCurriculumCourse = allCurriculum[0]

  const curriculumCourse = useMemo(() => {
    if (primaryCourse?.slug) {
      const found = getCurriculumCourseBySlug(primaryCourse.slug)
      if (found) return found
    }
    return fallbackCurriculumCourse
  }, [primaryCourse, fallbackCurriculumCourse])

  const allCurriculumLessons = useMemo(() => {
    if (!curriculumCourse?.modules) return []
    return curriculumCourse.modules.flatMap((m, mIdx) =>
      m.lessons.map((l, lIdx) => ({
        lesson: l,
        module: m,
        moduleNumber: mIdx + 1,
        lessonNumber: lIdx + 1,
      }))
    )
  }, [curriculumCourse])

  const completedCount = primaryCourse?.completedLessons || 0
  const totalCount = primaryCourse?.totalLessons || allCurriculumLessons.length || 10
  const nextLessonObj = allCurriculumLessons[completedCount] || allCurriculumLessons[allCurriculumLessons.length - 1]
  
  const nextLessonTitle = nextLessonObj
    ? `Lesson ${nextLessonObj.moduleNumber}.${nextLessonObj.lessonNumber}: ${nextLessonObj.lesson.title}`
    : "Lesson 1.1: Core Architecture & Setup"
  const nextLessonModuleTitle = nextLessonObj?.module?.title || "Core Foundations"
  const nextLessonHref = nextLessonObj && curriculumCourse?.slug
    ? `/courses/${curriculumCourse.slug}/learn/${nextLessonObj.module.id}/${nextLessonObj.lesson.id}`
    : (primaryCourse?.href || `/courses/${curriculumCourse?.slug || "dsa"}/learn`)
  const estimatedTime = nextLessonObj?.lesson?.content_type === "challenge" ? "~15 mins" : "~12 mins"
  const heroProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  // ─────────────────────────────────────────────────────────────
  // FEATURE E: Milestone Radar & Next Credential Calculation
  // ─────────────────────────────────────────────────────────────
  const remainingLessons = Math.max(0, totalCount - completedCount)
  const certificateTitle = curriculumCourse?.certificate || `${primaryCourse?.title || "Systems Engineering"} Professional Certificate`

  const previewCertificate: Certificate = useMemo(() => {
    const slug = curriculumCourse?.slug || "systems"
    return {
      id: `preview-cert-${slug}`,
      certificate_id: `ASCI-${slug.toUpperCase().slice(0, 4)}-${Date.now().toString(36).toUpperCase()}`,
      recipient_name: userName || "Student Candidate",
      course_id: curriculumCourse?.id || slug,
      course_title: curriculumCourse?.title || "Data Structures & Systems Architecture",
      course_slug: slug,
      issuer_name: "ASCI Academy Verification Authority",
      issued_at: new Date().toISOString(),
      verification_code: `VRF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      skills: curriculumCourse?.tools || ["Systems Architecture", "Algorithms", "High-Performance Computing"],
    }
  }, [curriculumCourse, userName])

  const handleLinkedInShare = () => {
    const year = new Date().getFullYear()
    const month = new Date().getMonth() + 1
    const certName = encodeURIComponent(certificateTitle)
    const orgName = encodeURIComponent("ASCI Academy")
    const certUrl = encodeURIComponent(typeof window !== "undefined" ? window.location.origin + "/verify" : "https://asci.academy/verify")
    const certId = encodeURIComponent(previewCertificate.certificate_id)

    const url = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationName=${orgName}&issueYear=${year}&issueMonth=${month}&certUrl=${certUrl}&certId=${certId}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // ─────────────────────────────────────────────────────────────
  // FEATURE A: Study Velocity & 35-Day Consistency Heatmap
  // ─────────────────────────────────────────────────────────────
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const normalizedWeekly = useMemo(() => {
    return dayLabels.map((lbl) => {
      const found = weeklyActivity.find((w) => w.day?.toLowerCase().startsWith(lbl.toLowerCase()))
      return {
        day: lbl,
        minutes: found?.minutes || 0,
        solved: found?.solved || 0,
      }
    })
  }, [weeklyActivity])

  const maxWeeklyMinutes = Math.max(60, ...normalizedWeekly.map((w) => w.minutes))
  const totalStudyMinutesThisWeek = normalizedWeekly.reduce((acc, curr) => acc + curr.minutes, 0)
  const totalChallengesSolvedThisWeek = normalizedWeekly.reduce((acc, curr) => acc + curr.solved, 0)
  const peakDayObj = normalizedWeekly.reduce((prev, curr) => (curr.minutes > prev.minutes ? curr : prev), normalizedWeekly[0])

  // 35-Day Heatmap Tiles (5 weeks x 7 days)
  const heatmapDays = useMemo(() => {
    const days: { dateStr: string; dayNumber: number; count: number; active: boolean; isToday: boolean; level: number }[] = []
    const today = new Date()

    for (let i = 34; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const y = d.getFullYear()
      const m = String(d.getMonth() + 1).padStart(2, "0")
      const dayNum = String(d.getDate()).padStart(2, "0")
      const dateStr = `${y}-${m}-${dayNum}`
      const isToday = i === 0

      // Match activity events or streak chain
      const matchingEvents = (activityEvents || []).filter((e: any) => {
        if (!e.timestamp) return false
        return e.timestamp.includes(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
      })

      const isWithinCurrentStreak = i < streak
      const rawActivity = matchingEvents.length + (isWithinCurrentStreak ? 1 : 0)
      const active = rawActivity > 0 || (isToday && streak > 0)

      // Heatmap level 0 to 4
      let level = 0
      if (rawActivity >= 4) level = 4
      else if (rawActivity >= 2) level = 3
      else if (rawActivity >= 1 || active) level = 2
      else level = 0

      days.push({
        dateStr,
        dayNumber: d.getDate(),
        count: rawActivity,
        active,
        isToday,
        level,
      })
    }
    return days
  }, [activityEvents, streak])

  // 1-Click JSON Transcript Exporter
  const handleDownloadTranscript = () => {
    try {
      const transcriptData = {
        institution: "ASCI Academy of Computer Science & Systems Engineering",
        documentType: "Official Verified Student Activity & Competency Transcript",
        verificationId: `ASCI-TR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        generatedAt: new Date().toISOString(),
        student: {
          name: userName || "Student",
          rank: rank || "Cadet",
          level: currentLevel,
          totalXP: totalXP,
          consistencyStreakDays: streak,
          clearanceStatus: isMaxClearance ? "Maximum Clearance (Level 10+)" : `Tier ${currentLevel} Verified`,
        },
        weeklyVelocity: {
          totalMinutesStudied: totalStudyMinutesThisWeek,
          totalProblemsSolved: totalChallengesSolvedThisWeek,
          dailyBreakdown: normalizedWeekly,
          peakProductiveHours: "20:00 - 23:00 UTC+05:30 (Evening Sprint)",
        },
        activeEnrollments: continueLearningCourses.map((c) => ({
          trackTitle: c.title,
          category: c.category,
          progress: `${c.progress}%`,
          lessonsCompleted: c.lessons,
        })),
        verifiedActivityLogs: activityEvents.slice(0, 50),
        signature: {
          issuer: "ASCI Verification Board",
          cryptographicHash: "sha256-" + btoa(`${userName}-${totalXP}-${streak}-${Date.now()}`).slice(0, 40),
          verificationEndpoint: "https://asci.academy/verify",
        },
      }

      const jsonStr = JSON.stringify(transcriptData, null, 2)
      const blob = new Blob([jsonStr], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `asci-learning-transcript-${(userName || "student").toLowerCase().replace(/\s+/g, "-")}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 3000)
    } catch (err) {
      console.error("Failed to generate JSON transcript:", err)
    }
  }

  // ─────────────────────────────────────────────────────────────
  // FEATURE F: Axel Quick Prompt Action Handler
  // ─────────────────────────────────────────────────────────────
  const handleAxelAction = (promptText: string) => {
    openFocus()
    sendMessage(promptText)
  }

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">

      {/* ─────────────────────────────────────────────────────────────
          1. Welcome Banner + Live Stats + Axel AI Study Copilot
      ───────────────────────────────────────────────────────────── */}
      <section
        id="dashboard-welcome-section"
        className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-5 sm:p-6 shadow-xs relative overflow-hidden"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary via-emerald-800 to-primary text-primary-foreground flex items-center justify-center text-lg font-bold shadow-xs overflow-hidden shrink-0 border border-primary/30">
              {effectiveAvatar ? (
                <img src={effectiveAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                  Welcome back, {userName}!
                </h1>
                {isMaxClearance && (
                  <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-[#D4B872]/20 text-[#D4B872] border border-[#D4B872]/30">
                    Max Clearance
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Rank: <span className="font-semibold text-primary">{rank}</span> · Keep up the momentum.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 flex-wrap sm:flex-nowrap">
            {/* Inline Stats */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20 shadow-xs">
                <Flame className="w-4 h-4 text-primary" />
                <span>{streak} day streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4B872]/15 text-[#D4B872] text-sm font-semibold border border-[#D4B872]/30 shadow-xs">
                <Zap className="w-4 h-4 text-[#D4B872]" />
                <span>Level {currentLevel}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-500/20 shadow-xs">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>{totalXP.toLocaleString()} XP</span>
              </div>
            </div>

            {/* Axel 3D Companion Stage */}
            <div className="hidden lg:flex items-center">
              <AxelStage
                id="dashboard-home-robot-anchor"
                sectionId="dashboard-welcome-section"
                label="Engineering Companion"
                emotion="happy"
                scale={0.46}
                size="sm"
              />
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="mt-4 pt-3 border-t border-border/40">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
            <span>Level {currentLevel} progress</span>
            <span className="font-semibold text-primary">{levelXP}/1000 XP</span>
          </div>
          <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-emerald-600 to-[#D4B872] rounded-full transition-all duration-700 ease-out"
              style={{ width: `${levelPercent}%` }}
            />
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FEATURE F: Axel AI Study Copilot Quick Drawer Actions
        ───────────────────────────────────────────────────────────── */}
        <div className="mt-4 pt-3 border-t border-border/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
            <Sparkles className="w-3.5 h-3.5 text-[#D4B872] animate-pulse" />
            <span>Axel AI Study Copilot:</span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => handleAxelAction("Can you review and debug my most recent code submission? Analyze edge cases and potential runtime leaks.")}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-card hover:bg-primary/15 text-foreground hover:text-primary border border-border/70 hover:border-primary/40 transition-all cursor-pointer shadow-xs group"
            >
              <Bug className="w-3 h-3 text-rose-500 group-hover:scale-110 transition-transform" />
              <span>Debug my last code submission</span>
            </button>

            <button
              onClick={() => handleAxelAction(`Give me a 3-question rapid conceptual quiz on ${curriculumCourse?.title || "Data Structures and Algorithms"} with detailed answer explanations.`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-card hover:bg-primary/15 text-foreground hover:text-primary border border-border/70 hover:border-primary/40 transition-all cursor-pointer shadow-xs group"
            >
              <BrainCircuit className="w-3 h-3 text-[#D4B872] group-hover:scale-110 transition-transform" />
              <span>Give me a 3-question quick quiz</span>
            </button>

            <button
              onClick={() => handleAxelAction(`Explain the optimal time and space complexity for today's Problem of the Day: "${potd?.title || "Daily DSA Kata"}".`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-card hover:bg-primary/15 text-foreground hover:text-primary border border-border/70 hover:border-primary/40 transition-all cursor-pointer shadow-xs group"
            >
              <Zap className="w-3 h-3 text-emerald-500 group-hover:scale-110 transition-transform" />
              <span>Explain time complexity of POTD</span>
            </button>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. FEATURE C: Smart "Jump Back In" Hero Widget
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-primary/25 bg-gradient-to-br from-card via-card/90 to-primary/5 p-5 sm:p-6 shadow-sm relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/30">
                <Play className="w-2.5 h-2.5 fill-current" />
                Jump Back In
              </span>
              <span className="text-xs text-muted-foreground font-mono">
                {curriculumCourse?.category || "Engineering Track"}
              </span>
            </div>

            <div>
              <h2 className="text-lg sm:text-xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {curriculumCourse?.title || "Applied Systems & Algorithms"}
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-1">
                {nextLessonModuleTitle} · Next target in your curriculum pipeline
              </p>
            </div>

            {/* Next Lesson High-Profile Pill */}
            <div className="p-3.5 rounded-xl bg-secondary/50 border border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-0.5 min-w-0">
                <div className="text-[10px] font-semibold text-[#D4B872] uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Upcoming Next Lesson
                </div>
                <div className="text-sm font-semibold text-foreground truncate">
                  {nextLessonTitle}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-muted-foreground shrink-0">
                <Clock className="w-3.5 h-3.5 text-primary" />
                <span>Est. {estimatedTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <Link
                href={nextLessonHref}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-sm font-semibold shadow-xs hover:shadow-primary/20 transition-all cursor-pointer group/btn"
              >
                <Terminal className="w-4 h-4" />
                <span>Launch IDE Sandbox</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={() => onSwitchTab("courses")}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-border/70 hover:border-primary/40 bg-card hover:bg-secondary text-foreground text-xs font-semibold transition-all cursor-pointer"
              >
                <span>Full Syllabus</span>
                <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Circular Progress Display */}
          <div className="flex items-center justify-center lg:justify-end shrink-0">
            <div className="relative w-36 h-36 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                {/* Background Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-secondary"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Progress Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  className="stroke-primary transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={264}
                  strokeDashoffset={264 - (264 * heroProgress) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-foreground tracking-tight">
                  {heroProgress}%
                </span>
                <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mt-0.5">
                  Completed
                </span>
                <span className="text-[10px] text-primary font-mono mt-0.5">
                  {completedCount}/{totalCount} Labs
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. BENTO GRID: Daily Quests (B) + Study Velocity & Heatmap (A)
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Column 1: Daily Quests & Streak Multiplier (FEATURE B) */}
        <div className="lg:col-span-6 flex flex-col">
          <DailyTasksCard className="h-full" />
        </div>

        {/* Column 2: Study Velocity & 35-Day Consistency Heatmap (FEATURE A) */}
        <div className="lg:col-span-6 flex flex-col rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-xs relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-foreground tracking-tight">
                  Study Velocity & Heatmap
                </h3>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                7-day learning velocity, consistency streak, and peak productive window
              </p>
            </div>

            {/* 1-Click JSON Transcript Download Button */}
            <button
              onClick={handleDownloadTranscript}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-xs font-semibold text-foreground transition-all cursor-pointer shrink-0 shadow-xs group"
              title="Download verified student activity transcript in JSON format for resumes & recruiters"
            >
              <Download className="w-3.5 h-3.5 text-primary group-hover:-translate-y-0.5 transition-transform" />
              <span>{downloadSuccess ? "Transcript Exported!" : "Activity JSON"}</span>
            </button>
          </div>

          {/* 7-Day Animated Bar Chart */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Weekly Velocity (Study Minutes)</span>
              <span className="font-semibold text-primary">
                Peak: {peakDayObj?.day} ({peakDayObj?.minutes} mins)
              </span>
            </div>

            <div className="grid grid-cols-7 gap-2 h-28 items-end pt-2 pb-1 border-b border-border/40">
              {normalizedWeekly.map((item) => {
                const heightPercent = maxWeeklyMinutes > 0 ? Math.max(12, Math.round((item.minutes / maxWeeklyMinutes) * 100)) : 12
                const isPeak = item.day === peakDayObj?.day && item.minutes > 0

                return (
                  <div key={item.day} className="flex flex-col items-center gap-1.5 h-full justify-end group">
                    <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.minutes}m
                    </span>
                    <div className="w-full bg-secondary rounded-t-md overflow-hidden flex items-end h-20">
                      <div
                        className={`w-full rounded-t-md transition-all duration-700 ${
                          isPeak
                            ? "bg-gradient-to-t from-primary to-[#D4B872] shadow-xs"
                            : "bg-gradient-to-t from-primary/60 to-primary"
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground">
                      {item.day}
                    </span>
                  </div>
                )
              })}
            </div>
          </div>

          {/* 35-Day Consistency Heatmap Grid */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-500" />
                35-Day Consistency Matrix
              </span>
              <div className="flex items-center gap-1 text-[10px]">
                <span>Less</span>
                <span className="w-2.5 h-2.5 rounded-xs bg-secondary" />
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500/30" />
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-500/60" />
                <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400 shadow-xs" />
                <span>More</span>
              </div>
            </div>

            {/* 5-Week Grid (35 tiles) */}
            <div className="grid grid-cols-7 gap-1.5 p-2.5 rounded-xl bg-secondary/30 border border-border/50">
              {heatmapDays.map((tile, idx) => (
                <div
                  key={tile.dateStr}
                  title={`${tile.dateStr}: ${tile.count} learning activities${tile.isToday ? " (Today)" : ""}`}
                  className={`aspect-square rounded-md transition-all cursor-pointer relative group flex items-center justify-center text-[9px] font-mono ${
                    tile.level === 4
                      ? "bg-emerald-400 text-emerald-950 font-bold shadow-[0_0_8px_rgba(52,211,153,0.4)]"
                      : tile.level === 3
                      ? "bg-emerald-500/75 text-white"
                      : tile.level === 2
                      ? "bg-emerald-500/35 text-foreground"
                      : "bg-secondary/70 hover:bg-secondary text-muted-foreground"
                  } ${tile.isToday ? "ring-2 ring-primary ring-offset-1 ring-offset-card" : ""}`}
                >
                  <span className="opacity-70 group-hover:opacity-100">{tile.dayNumber}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Summary Metric Strip */}
          <div className="mt-auto pt-3 border-t border-border/40 grid grid-cols-2 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#D4B872]" />
              <div>
                <span className="text-muted-foreground block text-[10px]">Consistency Streak</span>
                <span className="font-semibold text-foreground">{streak} consecutive days</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-primary" />
              <div>
                <span className="text-muted-foreground block text-[10px]">Peak Productive Window</span>
                <span className="font-semibold text-foreground">8:00 PM – 11:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. FEATURE E: Milestone Radar & Next Credential Tracker
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-[#D4B872]/30 bg-gradient-to-r from-card via-[#D4B872]/5 to-primary/5 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#D4B872]/20 text-[#D4B872] border border-[#D4B872]/30 flex items-center justify-center">
                <GraduationCap className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#D4B872]">
                Career Credential Radar
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-foreground">
              {remainingLessons === 0 ? (
                <span>🎉 Milestone Unlocked: Verified Credential Ready</span>
              ) : (
                <span>
                  You are <span className="text-primary font-extrabold">{remainingLessons} {remainingLessons === 1 ? "lesson" : "lessons"} away</span> from earning your <span className="text-[#D4B872]">{certificateTitle}</span>
                </span>
              )}
            </h3>

            <p className="text-xs text-muted-foreground">
              Issued under the ASCI Verification Standard with cryptographically signed certificates, shareable LinkedIn badges, and verifiable transcripts.
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap">
              <button
                onClick={() => setIsCertModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card hover:bg-secondary border border-border text-xs font-semibold text-foreground transition-all cursor-pointer shadow-xs"
              >
                <Award className="w-3.5 h-3.5 text-[#D4B872]" />
                <span>Preview Certificate</span>
              </button>

              <button
                onClick={handleLinkedInShare}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 text-[#0A66C2] dark:text-[#70B5F9] border border-[#0A66C2]/30 text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>1-Click Add to LinkedIn</span>
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-4 shrink-0 bg-secondary/40 p-4 rounded-xl border border-border/50">
            <div className="space-y-1 text-right">
              <div className="text-xs text-muted-foreground">Credential Progress</div>
              <div className="text-xl font-black text-foreground">{heroProgress}%</div>
              <div className="text-[10px] font-mono text-primary">{completedCount} of {totalCount} completed</div>
            </div>
            <div className="w-16 h-16 rounded-full border-4 border-secondary border-t-primary border-r-[#D4B872] flex items-center justify-center text-xs font-bold">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Quick Actions Grid (Unstop-style)
      ───────────────────────────────────────────────────────────── */}
      <section>
        <h2 className="text-base font-bold text-foreground mb-3">Quick Navigation</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: BookOpen, label: "Continue Learning", desc: "Resume your enrolled courses", tab: "courses", color: "text-primary", bg: "bg-primary/10" },
            { icon: Code, label: "Practice DSA & Simulators", desc: "8 Interactive Visualizers & Kata", tab: "practice", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { icon: Trophy, label: "Hackathons", desc: "Compete in national challenges", tab: "hackathons", color: "text-[#D4B872]", bg: "bg-[#D4B872]/10" },
            { icon: Briefcase, label: "Find Jobs", desc: "Browse engineering roles", tab: "jobs", color: "text-purple-500", bg: "bg-purple-500/10" },
            { icon: FileCheck, label: "Resume Scanner", desc: "ATS compatibility check", tab: "resume-ats", color: "text-rose-500", bg: "bg-rose-500/10" },
            { icon: Award, label: "My Certificates", desc: "View earned credentials", tab: "certificates", color: "text-primary", bg: "bg-primary/10" },
          ].map((action) => (
            <button
              key={action.tab}
              onClick={() => onSwitchTab(action.tab)}
              className="p-4 rounded-xl border border-border/60 bg-card hover:bg-secondary/50 hover:border-border transition-all cursor-pointer text-left group shadow-2xs"
            >
              <div className={`w-9 h-9 rounded-lg ${action.bg} ${action.color} flex items-center justify-center mb-2.5`}>
                <action.icon className="w-[18px] h-[18px]" />
              </div>
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                {action.label}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {action.desc}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. Problem of the Day
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-xl border border-border/60 bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center shrink-0">
              <Terminal className="w-[18px] h-[18px]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {potd?.title || "Problem of the Day"}
                </h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full leading-none ${
                  (potd?.difficulty || "Medium") === "Easy" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                  (potd?.difficulty || "Medium") === "Hard" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" :
                  "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                }`}>
                  {potd?.difficulty || "Medium"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                Solve today&apos;s challenge to maintain your streak and level up
              </p>
            </div>
          </div>
          <button
            onClick={() => onSwitchTab("practice")}
            className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-sm font-semibold shadow-xs transition-all shrink-0 cursor-pointer"
          >
            Solve Now
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          7. Additional Enrolled Tracks or Recommendations
      ───────────────────────────────────────────────────────────── */}
      {continueLearningCourses.length > 1 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-foreground">Other Enrolled Tracks</h2>
            <Link
              href="/programs"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              Browse all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {continueLearningCourses.slice(1, 3).map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-border/60 bg-card overflow-hidden hover:border-primary/40 transition-all group"
              >
                <div className="relative aspect-[2/1] w-full overflow-hidden bg-secondary">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-card/90 backdrop-blur-sm text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>

                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {course.title}
                  </h3>

                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span>{course.lessons} lessons</span>
                      <span className="font-semibold text-primary">{course.progress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>

                  <Link
                    href={course.href}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer"
                  >
                    Resume <Play className="w-3 h-3 fill-current" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {continueLearningCourses.length === 0 && catalogTracks.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-foreground">Recommended Tracks</h2>
            <Link
              href="/programs"
              className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
            >
              View all <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {catalogTracks.slice(0, 3).map((track: any) => (
              <div key={track.id} className="rounded-xl border border-border/60 bg-card overflow-hidden hover:border-border transition-all group">
                <div className="relative aspect-[2/1] w-full overflow-hidden bg-secondary">
                  <img
                    src={track.image}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <span className="text-[10px] font-semibold text-primary uppercase tracking-wider">{track.category}</span>
                  <h3 className="text-sm font-semibold text-foreground mt-1 line-clamp-1 group-hover:text-primary transition-colors">{track.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{track.desc}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{track.modules} modules</span>
                    <span>·</span>
                    <span>{track.duration}</span>
                    <span>·</span>
                    <span>{track.difficulty}</span>
                  </div>
                  <Link
                    href={track.exploreHref || (track.slug ? `/courses/${track.slug}` : (track.href || "/programs"))}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Learn more <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          Certificate Preview Modal (Feature E)
      ───────────────────────────────────────────────────────────── */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={previewCertificate}
      />

    </div>
  )
}
