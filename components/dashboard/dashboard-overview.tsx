"use client"

import React, { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen, Award, Zap, Flame, ChevronRight,
  Code, Trophy, Briefcase, FileCheck, Play,
  Terminal, ArrowRight, Clock, CheckCircle2,
  Sparkles, Download, Share2, GraduationCap,
  TrendingUp, BarChart3, Bug, BrainCircuit,
  ShieldCheck, Activity, MessageSquare, Check,
  Layers, ChevronDown
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { getCourseCoverImage } from "@/lib/course-images"
import { AxelStage } from "@/components/axel/axel-stage"
import { useAxel } from "@/context/axel-context"
import { DailyTasksCard } from "@/components/gamification/daily-tasks-card"
import { getCurriculumCourseBySlug, getAllCurriculumCourses } from "@/lib/curriculum-data"
import { CertificateModal } from "@/components/certificate/certificate-modal"
import { Certificate } from "@/lib/certificate-types"
import { ResumeLearningDock } from "@/components/dashboard/resume-learning-dock"
import { CardTiltWrapper } from "@/components/ui/card-tilt-wrapper"
import { StreakFreezeModal } from "@/components/gamification/streak-freeze-modal"

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

  // Interactive UI States
  const [isCertModalOpen, setIsCertModalOpen] = useState(false)
  const [isStreakModalOpen, setIsStreakModalOpen] = useState(false)
  const [downloadSuccess, setDownloadSuccess] = useState(false)
  const [velocityMetric, setVelocityMetric] = useState<"minutes" | "solved">("minutes")
  const [activeInspector, setActiveInspector] = useState<{ label: string; value: string; extra: string } | null>(null)
  const [bottomTab, setBottomTab] = useState<"tracks" | "activity">("tracks")

  // Live countdown timer until midnight POTD reset
  const [potdTimeLeft, setPotdTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 8,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date()
      const tomorrow = new Date(now)
      tomorrow.setHours(24, 0, 0, 0)
      const diff = Math.max(0, tomorrow.getTime() - now.getTime())
      const hours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setPotdTimeLeft({ hours, minutes, seconds })
    }
    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  // Time-of-day greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }, [])

  // Active courses
  const continueLearningCourses = useMemo(() => {
    return enrollments.map((enr: any, idx: number) => {
      const totalLessons = enr.totalLessons || enr.total_lessons || 12
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

  // Primary Course & Next Lesson Calculation
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
  const totalCount = primaryCourse?.totalLessons || allCurriculumLessons.length || 12
  const nextLessonObj = allCurriculumLessons[completedCount] || allCurriculumLessons[allCurriculumLessons.length - 1]
  
  const nextLessonTitle = nextLessonObj
    ? `Lesson ${nextLessonObj.moduleNumber}.${nextLessonObj.lessonNumber}: ${nextLessonObj.lesson.title}`
    : "Lesson 1.1: Foundations & Architecture"
  const nextLessonHref = nextLessonObj && curriculumCourse?.slug
    ? `/courses/${curriculumCourse.slug}/learn/${nextLessonObj.module.id}/${nextLessonObj.lesson.id}`
    : (primaryCourse?.href || `/courses/${curriculumCourse?.slug || "dsa"}/learn`)
  const heroProgress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0
  const remainingLessons = Math.max(0, totalCount - completedCount)
  const certificateTitle = curriculumCourse?.certificate || `${primaryCourse?.title || "Systems Engineering"} Certificate`

  // Certificate Modal Data
  const previewCertificate: Certificate = useMemo(() => {
    const slug = curriculumCourse?.slug || "systems"
    return {
      id: `preview-cert-${slug}`,
      certificate_id: `ASCI-${slug.toUpperCase().slice(0, 4)}-${Date.now().toString(36).toUpperCase()}`,
      recipient_name: userName || "Student",
      course_id: curriculumCourse?.id || slug,
      course_title: curriculumCourse?.title || "Data Structures & Systems Architecture",
      course_slug: slug,
      issuer_name: "ASCI Academy Verification Board",
      issued_at: new Date().toISOString(),
      verification_code: `VRF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      skills: curriculumCourse?.tools || ["Systems Architecture", "Algorithms", "Optimization"],
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

  // 7-Day Velocity Data
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const normalizedWeekly = useMemo(() => {
    return dayLabels.map((lbl) => {
      const found = weeklyActivity.find((w) => w.day?.toLowerCase().startsWith(lbl.toLowerCase()))
      return {
        day: lbl,
        minutes: found?.minutes || (lbl === "Wed" ? 45 : lbl === "Mon" ? 60 : 25),
        solved: found?.solved || (lbl === "Wed" ? 2 : lbl === "Mon" ? 3 : 1),
      }
    })
  }, [weeklyActivity])

  const maxWeeklyValue = useMemo(() => {
    if (velocityMetric === "minutes") {
      return Math.max(60, ...normalizedWeekly.map((w) => w.minutes))
    }
    return Math.max(4, ...normalizedWeekly.map((w) => w.solved))
  }, [velocityMetric, normalizedWeekly])

  const peakDayObj = normalizedWeekly.reduce((prev, curr) => (curr.minutes > prev.minutes ? curr : prev), normalizedWeekly[0])
  const totalStudyMinutesThisWeek = normalizedWeekly.reduce((acc, curr) => acc + curr.minutes, 0)
  const totalChallengesSolvedThisWeek = normalizedWeekly.reduce((acc, curr) => acc + curr.solved, 0)

  // 35-Day Heatmap Tiles
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

      const matchingEvents = (activityEvents || []).filter((e: any) => {
        if (!e.timestamp) return false
        return e.timestamp.includes(d.toLocaleDateString("en-US", { month: "short", day: "numeric" }))
      })

      const isWithinCurrentStreak = i < streak
      const rawActivity = matchingEvents.length + (isWithinCurrentStreak ? 1 : 0)
      const active = rawActivity > 0 || (isToday && streak > 0)

      let level = 0
      if (rawActivity >= 3) level = 3
      else if (rawActivity >= 2) level = 2
      else if (rawActivity >= 1 || active) level = 1

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

  // Download Transcript
  const handleDownloadTranscript = () => {
    try {
      const transcript = {
        organization: "ASCI Academy",
        document: "Verified Learning Transcript",
        student: { name: userName || "Student", rank, level: currentLevel, totalXP, streak },
        velocity: { weeklyMinutes: totalStudyMinutesThisWeek, weeklySolved: totalChallengesSolvedThisWeek },
        enrollments: continueLearningCourses.map(c => ({ title: c.title, progress: `${c.progress}%` })),
        timestamp: new Date().toISOString(),
      }
      const blob = new Blob([JSON.stringify(transcript, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `asci-transcript-${(userName || "student").toLowerCase().replace(/\s+/g, "-")}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)

      setDownloadSuccess(true)
      setTimeout(() => setDownloadSuccess(false), 2500)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn relative">

      {/* Ambient Emerald & Gold Mesh Lighting */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-b from-primary/10 via-emerald-800/5 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* ─────────────────────────────────────────────────────────────
          1. Sleek Command Header + Axel Copilot Quick Bar
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl bg-card/85 backdrop-blur-xl border border-primary/20 p-4 sm:p-5 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* User Info */}
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-primary via-emerald-800 to-[#D4B872] text-primary-foreground flex items-center justify-center text-lg font-bold shadow-xs overflow-hidden shrink-0 border border-primary/30">
              {effectiveAvatar ? (
                <img src={effectiveAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl font-bold text-foreground tracking-tight">
                  {greeting}, {userName}
                </h1>
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-primary/15 text-primary border border-primary/25">
                  Lv. {currentLevel} · {rank}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                <span className="font-mono text-primary font-semibold">{levelXP}/1000 XP</span>
                <span>·</span>
                <button
                  onClick={() => setIsStreakModalOpen(true)}
                  className="text-amber-500 hover:text-amber-400 font-medium flex items-center gap-1 px-1.5 py-0.5 rounded-md hover:bg-amber-500/10 border border-transparent hover:border-amber-500/20 transition-all cursor-pointer"
                  title="View Streak Protection & Shields"
                >
                  <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  <span>{streak} Day Streak</span>
                  <ShieldCheck className="w-3 h-3 text-emerald-400 ml-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Axel Copilot Actions */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            {/* Quick Copilot Chips */}
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 w-full sm:w-auto">
              {[
                { icon: Bug, label: "Debug Code", color: "text-rose-500", prompt: "Review and debug my latest code submission." },
                { icon: BrainCircuit, label: "Quick Quiz", color: "text-[#D4B872]", prompt: `Give me a 3-question conceptual quiz on ${curriculumCourse?.title || "DSA"}.` },
                { icon: Zap, label: "POTD Logic", color: "text-emerald-500", prompt: `Explain the optimal approach for today's challenge: "${potd?.title || "POTD"}".` },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => { openFocus(); sendMessage(chip.prompt); }}
                  className="inline-flex items-center justify-center sm:justify-start gap-1.5 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold bg-secondary/80 hover:bg-primary/15 text-foreground hover:text-primary border border-border/70 hover:border-primary/40 transition-all cursor-pointer shadow-2xs group min-h-[38px]"
                >
                  <chip.icon className={`w-3.5 h-3.5 ${chip.color} group-hover:scale-110 transition-transform shrink-0`} />
                  <span className="truncate">{chip.label}</span>
                </button>
              ))}

              <button
                onClick={() => openFocus()}
                className="inline-flex items-center justify-center sm:justify-start gap-1 px-3 py-2 sm:py-1.5 rounded-lg text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 transition-all cursor-pointer shadow-2xs min-h-[38px]"
                title="Chat with Axel"
              >
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Ask Axel</span>
              </button>
            </div>
          </div>
        </div>

        {/* Minimal XP bar */}
        <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mt-3.5 border border-border/40">
          <div
            className="h-full bg-gradient-to-r from-primary via-emerald-500 to-[#D4B872] rounded-full transition-all duration-700 ease-out"
            style={{ width: `${levelPercent}%` }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          2. Continue Learning Persistent Quick-Dock
      ───────────────────────────────────────────────────────────── */}
      <ResumeLearningDock enrollments={enrollments} />

      {/* ─────────────────────────────────────────────────────────────
          3. Dual Action Row: Jump Back In Hero + Problem of the Day
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Jump Back In Hero (lg:col-span-7) with 3D Tilt */}
        <CardTiltWrapper maxTilt={4} scale={1.01} className="lg:col-span-7">
          <div className="h-full rounded-2xl border border-primary/25 bg-gradient-to-br from-card via-card/90 to-primary/5 p-5 shadow-xs relative overflow-hidden flex flex-col justify-between group">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-primary/15 text-primary border border-primary/25">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Jump Back In
                  </span>
                  <span className="text-xs text-muted-foreground font-mono">
                    {curriculumCourse?.category}
                  </span>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-foreground truncate group-hover:text-primary transition-colors">
                  {curriculumCourse?.title}
                </h2>

                <div className="text-xs font-semibold text-foreground/90 bg-secondary/80 px-3 py-1.5 rounded-lg border border-border/60 flex items-center justify-between gap-2">
                  <span className="truncate">{nextLessonTitle}</span>
                  <span className="text-[11px] text-primary font-mono shrink-0">~12m</span>
                </div>
              </div>

              {/* Circular Progress Ring */}
              <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                  <circle cx="40" cy="40" r="32" className="stroke-secondary" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="40" cy="40" r="32"
                    className="stroke-primary transition-all duration-700"
                    strokeWidth="6"
                    strokeDasharray={201}
                    strokeDashoffset={201 - (201 * heroProgress) / 100}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-sm font-extrabold text-foreground">{heroProgress}%</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pt-4 mt-2 border-t border-border/40">
              <Link
                href={nextLessonHref}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer min-h-[44px] group/btn"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Launch IDE Sandbox</span>
                <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-0.5 transition-transform" />
              </Link>

              <button
                onClick={() => onSwitchTab("courses")}
                className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer py-1.5 text-center sm:text-right"
              >
                View Syllabus →
              </button>
            </div>
          </div>
        </CardTiltWrapper>

        {/* Problem of the Day (lg:col-span-5) with 3D Tilt */}
        <CardTiltWrapper maxTilt={4} scale={1.01} className="lg:col-span-5">
          <div className="h-full rounded-2xl border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Daily POTD</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-border/50">
                  <Clock className="w-3 h-3 text-[#D4B872]" />
                  <span>{String(potdTimeLeft.hours).padStart(2, "0")}h {String(potdTimeLeft.minutes).padStart(2, "0")}m</span>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-foreground truncate">
                    {potd?.title || "Balanced Two-Pointer Partition"}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md leading-none ${
                    (potd?.difficulty || "Medium") === "Easy" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" :
                    (potd?.difficulty || "Medium") === "Hard" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400" :
                    "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  }`}>
                    {potd?.difficulty || "Medium"}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Maintain your streak & earn <span className="font-semibold text-primary">+150 XP</span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 pt-4 mt-2 border-t border-border/40">
              <button
                onClick={() => onSwitchTab("practice")}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 border border-border text-xs font-semibold text-foreground hover:text-primary transition-all cursor-pointer shadow-2xs min-h-[44px] text-center"
              >
                Solve in Practice Arena →
              </button>
              <span className="text-[11px] text-emerald-500 font-semibold flex items-center justify-center sm:justify-start gap-1 py-1">
                <Flame className="w-3.5 h-3.5" />
                Streak Safe
              </span>
            </div>
          </div>
        </CardTiltWrapper>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          3. Bento: Daily Quests + Velocity & Heatmap
      ───────────────────────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">

        {/* Daily Quests Card (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col">
          <DailyTasksCard className="h-full border border-primary/20 shadow-xs" />
        </div>

        {/* Velocity & Heatmap (lg:col-span-6) */}
        <div className="lg:col-span-6 rounded-2xl border border-border/70 bg-card p-5 shadow-xs flex flex-col justify-between">
          
          {/* Header with Metric Switcher */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h3 className="text-sm sm:text-base font-bold text-foreground">
                Study Velocity
              </h3>
            </div>

            {/* Interactive Toggle: Minutes vs Solved */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-secondary border border-border/50 text-[11px] font-semibold">
              <button
                onClick={() => setVelocityMetric("minutes")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  velocityMetric === "minutes" ? "bg-card text-primary shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Minutes
              </button>
              <button
                onClick={() => setVelocityMetric("solved")}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  velocityMetric === "solved" ? "bg-card text-primary shadow-xs" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Solved
              </button>
            </div>
          </div>

          {/* 7-Day Bar Chart */}
          <div className="space-y-1.5 mb-4">
            <div className="grid grid-cols-7 gap-2 h-24 items-end pt-1 pb-1 border-b border-border/40">
              {normalizedWeekly.map((item) => {
                const val = velocityMetric === "minutes" ? item.minutes : item.solved
                const heightPercent = maxWeeklyValue > 0 ? Math.max(15, Math.round((val / maxWeeklyValue) * 100)) : 15
                const isPeak = item.day === peakDayObj?.day

                return (
                  <div
                    key={item.day}
                    onMouseEnter={() => setActiveInspector({
                      label: `${item.day}`,
                      value: `${item.minutes} mins studied`,
                      extra: `${item.solved} solved`,
                    })}
                    onMouseLeave={() => setActiveInspector(null)}
                    className="flex flex-col items-center gap-1 h-full justify-end group cursor-pointer"
                  >
                    <span className="text-[10px] font-mono text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      {val}{velocityMetric === "minutes" ? "m" : ""}
                    </span>
                    <div className="w-full bg-secondary rounded-t-md overflow-hidden flex items-end h-16">
                      <div
                        className={`w-full rounded-t-md transition-all duration-500 ${
                          isPeak
                            ? "bg-gradient-to-t from-primary to-[#D4B872]"
                            : "bg-primary/80 hover:bg-primary"
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                      {item.day}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* Interactive Tooltip Inspector */}
            <div className="h-6 flex items-center justify-between text-xs text-muted-foreground px-1">
              {activeInspector ? (
                <span className="text-primary font-medium">
                  {activeInspector.label}: <strong>{activeInspector.value}</strong> ({activeInspector.extra})
                </span>
              ) : (
                <>
                  <span>Total: <strong>{totalStudyMinutesThisWeek}m</strong> · {totalChallengesSolvedThisWeek} solved</span>
                  <span className="text-primary font-semibold">Peak: {peakDayObj?.day}</span>
                </>
              )}
            </div>
          </div>

          {/* 35-Day Consistency Heatmap Grid */}
          <div className="space-y-1.5 pt-2 border-t border-border/40">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
              <span className="font-semibold text-foreground">35-Day Consistency</span>
              <div className="flex items-center gap-1 text-[10px]">
                <span>Low</span>
                <span className="w-2 h-2 rounded-xs bg-secondary" />
                <span className="w-2 h-2 rounded-xs bg-emerald-500/40" />
                <span className="w-2 h-2 rounded-xs bg-emerald-500/70" />
                <span className="w-2 h-2 rounded-xs bg-emerald-400" />
                <span>High</span>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 p-2 rounded-xl bg-secondary/30 border border-border/50">
              {heatmapDays.map((tile) => (
                <div
                  key={tile.dateStr}
                  title={`${tile.dateStr}: ${tile.count} activities`}
                  className={`aspect-square rounded-md transition-all cursor-pointer flex items-center justify-center text-[9px] font-mono ${
                    tile.level === 3
                      ? "bg-emerald-400 text-emerald-950 font-bold"
                      : tile.level === 2
                      ? "bg-emerald-500/70 text-white"
                      : tile.level === 1
                      ? "bg-emerald-500/30 text-foreground"
                      : "bg-secondary hover:bg-secondary/80 text-muted-foreground"
                  } ${tile.isToday ? "ring-1.5 ring-primary" : ""}`}
                >
                  <span className="opacity-75">{tile.dayNumber}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Row: Transcript Download */}
          <div className="flex items-center justify-between gap-2 pt-3 mt-3 border-t border-border/40 text-xs">
            <span className="text-muted-foreground font-mono">
              Peak Hours: <strong className="text-foreground">8:00 PM – 11:00 PM</strong>
            </span>
            <button
              onClick={handleDownloadTranscript}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary/80 border border-border text-[11px] font-semibold text-foreground hover:text-primary transition-all cursor-pointer shadow-2xs"
            >
              <Download className="w-3 h-3 text-primary" />
              <span>{downloadSuccess ? "Saved!" : "Transcript JSON"}</span>
            </button>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          4. Engineering Skill Map (Restrained Visualizations)
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border/70 bg-card p-5 shadow-xs">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" />
            <h3 className="text-sm sm:text-base font-bold text-foreground">
              Engineering Skill Map
            </h3>
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            Verified Competency Progress
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {[
            { skill: "Python & Systems", progress: 82, level: "Advanced", desc: "CPython, Asyncio, Microservices" },
            { skill: "DSA & Algorithms", progress: 61, level: "Proficient", desc: "Trees, DP, Graphs" },
            { skill: "React & Next.js", progress: 74, level: "Advanced", desc: "RSC, Server Actions, WebSockets" },
            { skill: "System Design", progress: 31, level: "Foundational", desc: "Consensus, WAL, Sharding" },
            { skill: "AI & Vector RAG", progress: 42, level: "Intermediate", desc: "Embeddings, pgvector, Agents" },
          ].map((item) => (
            <div
              key={item.skill}
              className="p-3 rounded-xl border border-border/80 bg-secondary/30 space-y-2"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-foreground">{item.skill}</span>
                <span className="font-mono font-bold text-primary">{item.progress}%</span>
              </div>
              <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground pt-0.5">
                <span>{item.level}</span>
                <span className="truncate max-w-[90px]">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Milestone Radar Card (Slim & Actionable)
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-[#D4B872]/30 bg-gradient-to-r from-card via-[#D4B872]/5 to-card p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-[#D4B872]" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#D4B872]">
              Next Credential
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold text-foreground">
            {remainingLessons === 0 ? (
              <span>🎉 Certificate Ready: {certificateTitle}</span>
            ) : (
              <span>
                <strong>{remainingLessons} lessons away</strong> from earning your {certificateTitle}
              </span>
            )}
          </h3>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setIsCertModalOpen(true)}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-card hover:bg-secondary border border-border text-xs font-semibold text-foreground transition-all cursor-pointer shadow-2xs min-h-[42px]"
          >
            <Award className="w-3.5 h-3.5 text-[#D4B872]" />
            <span>Preview</span>
          </button>
          <button
            onClick={handleLinkedInShare}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 text-[#0A66C2] dark:text-[#70B5F9] border border-[#0A66C2]/30 text-xs font-semibold transition-all cursor-pointer shadow-2xs min-h-[42px]"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Add to LinkedIn</span>
          </button>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          5. Tactile Quick Actions with 3D Visual Icons
      ───────────────────────────────────────────────────────────── */}
      <section>
        <div className="grid grid-cols-2 min-[480px]:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
          {[
            { image: "/images/dashboard-nav/courses.svg", label: "Courses", tab: "courses" },
            { image: "/images/dashboard-nav/dsa-simulators.svg", label: "DSA Simulators", tab: "practice" },
            { image: "/images/dashboard-nav/hackathons.svg", label: "Hackathons", tab: "hackathons" },
            { image: "/images/dashboard-nav/job-board.svg", label: "Job Board", tab: "jobs" },
            { image: "/images/dashboard-nav/ats-scanner.svg", label: "ATS Scanner", tab: "resume-ats" },
            { image: "/images/dashboard-nav/certificates.svg", label: "Certificates", tab: "certificates" },
          ].map((action) => (
            <button
              key={action.tab}
              onClick={() => onSwitchTab(action.tab)}
              className="p-3 sm:p-4 rounded-2xl border border-border/70 bg-card hover:bg-secondary/60 hover:border-primary/40 transition-all duration-300 cursor-pointer text-center group shadow-2xs hover:shadow-md flex flex-col items-center justify-between gap-2 sm:gap-2.5 relative overflow-hidden backdrop-blur-xl active:scale-[0.98] min-h-[105px]"
            >
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-14 h-14 sm:w-20 sm:h-20 relative flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                <img
                  src={action.image}
                  alt={action.label}
                  className="w-full h-full object-contain filter drop-shadow-sm"
                  loading="lazy"
                />
              </div>
              <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors tracking-tight truncate w-full text-center">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          6. Interactive Segment Switcher: Tracks vs Activity Feed
      ───────────────────────────────────────────────────────────── */}
      <section className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-border/40 pb-3">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap w-full sm:w-auto">
            <button
              onClick={() => setBottomTab("tracks")}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[36px] text-center ${
                bottomTab === "tracks"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Enrolled Tracks ({continueLearningCourses.length})
            </button>
            <button
              onClick={() => setBottomTab("activity")}
              className={`flex-1 sm:flex-none px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer min-h-[36px] text-center ${
                bottomTab === "activity"
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Recent Verifications
            </button>
          </div>

          <Link
            href="/programs"
            className="text-xs font-semibold text-primary hover:underline flex items-center justify-end gap-1"
          >
            Explore Catalog <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Tab 1: Enrolled Tracks */}
        {bottomTab === "tracks" && (
          <div>
            {continueLearningCourses.length === 0 ? (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No active enrollments yet. Browse our engineering tracks to begin.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {continueLearningCourses.slice(0, 2).map((course) => (
                  <div
                    key={course.id}
                    className="p-3.5 rounded-xl bg-secondary/40 border border-border/60 hover:border-primary/30 flex items-center justify-between gap-3 transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-12 h-12 rounded-lg object-cover shrink-0 border border-border/50"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-foreground truncate">
                          {course.title}
                        </div>
                        <div className="text-[11px] text-muted-foreground">
                          {course.lessons} lessons · {course.progress}% completed
                        </div>
                      </div>
                    </div>

                    <Link
                      href={course.href}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-2xs"
                    >
                      <span>Resume</span>
                      <Play className="w-2.5 h-2.5 fill-current" />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Recent Verifications */}
        {bottomTab === "activity" && (
          <div className="space-y-2">
            {(activityEvents.length > 0 ? activityEvents.slice(0, 3) : recentLogs.slice(0, 3)).map((item: any, idx: number) => (
              <div
                key={item.id || `act-${idx}`}
                className="p-2.5 rounded-xl bg-secondary/30 border border-border/40 flex items-center justify-between gap-3 text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-semibold text-foreground truncate block">
                      {item.title || "Lab Submission"}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {item.module || item.category || "Curriculum"} · {item.timestamp || item.time || "Recently"}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-mono font-bold text-[10px]">
                  {item.xp || "+100 XP"}
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Certificate Preview Modal */}
      <CertificateModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        certificate={previewCertificate}
      />

      {/* Streak Protection & Freeze Economy Modal */}
      <StreakFreezeModal
        isOpen={isStreakModalOpen}
        onClose={() => setIsStreakModalOpen(false)}
        currentStreak={streak}
        totalXP={totalXP}
      />

    </div>
  )
}
