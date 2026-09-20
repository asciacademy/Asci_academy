"use client"

import React from "react"
import Link from "next/link"
import {
  BookOpen, Award, Zap, Flame, ChevronRight,
  Code, Trophy, Briefcase, FileCheck, Play,
  Terminal, ArrowRight
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { getCourseCoverImage } from "@/lib/course-images"
import { AxelStage } from "@/components/axel/axel-stage"

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
  enrollments = [],
  catalogTracks = [],
  avatarUrl,
  oauthAvatarUrl,
  onSwitchTab,
}: DashboardOverviewProps) {
  const { potd } = useUnstopEcosystem()
  const effectiveAvatar = avatarUrl || oauthAvatarUrl || ""

  // Active in-progress courses from real database enrollments
  const continueLearningCourses = enrollments.map((enr: any, idx: number) => {
    const totalLessons = enr.totalLessons || enr.total_lessons || 10
    const completedLessons = enr.completedLessons || enr.lessonsCompleted || enr.completed_lessons || 0
    const progressPercent = enr.progressPercent ?? (totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0)

    return {
      id: enr.id || enr.courseId || enr.slug || `course-enr-${idx}`,
      title: enr.title || "Curriculum Track",
      category: (enr.category || "Engineering").toUpperCase(),
      progress: progressPercent,
      lessons: `${completedLessons}/${totalLessons}`,
      image: enr.thumbnail || getCourseCoverImage(enr.category, enr.slug || enr.courseId, enr.title),
      href: enr.slug ? `/courses/${enr.slug}/learn` : (enr.courseId ? `/courses/${enr.courseId}/learn` : "/courses/dsa/learn"),
    }
  })

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">

      {/* ─────────────────────────────────────
          1. Welcome Banner + Stats
      ───────────────────────────────────── */}
      <section id="dashboard-welcome-section" className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 p-5 sm:p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary via-emerald-800 to-primary text-primary-foreground flex items-center justify-center text-lg font-bold shadow-xs overflow-hidden shrink-0">
              {effectiveAvatar ? (
                <img src={effectiveAvatar} alt={userName} className="w-full h-full object-cover" />
              ) : (
                userName.charAt(0).toUpperCase()
              )}
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                Welcome back, {userName}!
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Keep up the momentum. You&apos;re doing great.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 flex-wrap sm:flex-nowrap">
            {/* Inline Stats */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20">
                <Flame className="w-4 h-4 text-primary" />
                <span>{streak} day streak</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4B872]/15 text-[#D4B872] text-sm font-semibold border border-[#D4B872]/30">
                <Zap className="w-4 h-4 text-[#D4B872]" />
                <span>Level {currentLevel}</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium border border-emerald-500/20">
                <Award className="w-4 h-4 text-emerald-500" />
                <span>{totalXP.toLocaleString()} XP</span>
              </div>
            </div>

            {/* Axel Stage */}
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
      </section>

      {/* ─────────────────────────────────────
          2. Quick Actions Grid (Unstop-style)
      ───────────────────────────────────── */}
      <section>
        <h2 className="text-base font-bold text-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { icon: BookOpen, label: "Continue Learning", desc: "Resume your enrolled courses", tab: "courses", color: "text-primary", bg: "bg-primary/10" },
            { icon: Code, label: "Practice DSA", desc: "Solve problems & build skills", tab: "practice", color: "text-emerald-500", bg: "bg-emerald-500/10" },
            { icon: Trophy, label: "Hackathons", desc: "Compete in national challenges", tab: "hackathons", color: "text-[#D4B872]", bg: "bg-[#D4B872]/10" },
            { icon: Briefcase, label: "Find Jobs", desc: "Browse engineering roles", tab: "jobs", color: "text-purple-500", bg: "bg-purple-500/10" },
            { icon: FileCheck, label: "Resume Scanner", desc: "ATS compatibility check", tab: "resume-ats", color: "text-rose-500", bg: "bg-rose-500/10" },
            { icon: Award, label: "My Certificates", desc: "View earned credentials", tab: "certificates", color: "text-primary", bg: "bg-primary/10" },
          ].map((action) => (
            <button
              key={action.tab}
              onClick={() => onSwitchTab(action.tab)}
              className="p-4 rounded-xl border border-border/60 bg-card hover:bg-secondary/50 hover:border-border transition-all cursor-pointer text-left group"
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

      {/* ─────────────────────────────────────
          3. Continue Learning
      ───────────────────────────────────── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">Continue Learning</h2>
          <Link
            href="/programs"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            Browse all <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {continueLearningCourses.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-card/60 p-8 text-center">
            <BookOpen className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-foreground">No courses enrolled yet</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
              Explore our engineering tracks and start learning today.
            </p>
            <button
              onClick={() => onSwitchTab("courses")}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-sm font-semibold shadow-xs transition-colors cursor-pointer"
            >
              Explore Courses <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {continueLearningCourses.slice(0, 2).map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-border/60 bg-card overflow-hidden hover:border-primary/40 transition-all group"
              >
                {/* Course Image */}
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

                {/* Course Info */}
                <div className="p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-1">
                    {course.title}
                  </h3>

                  {/* Progress */}
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
        )}
      </section>

      {/* ─────────────────────────────────────
          4. Problem of the Day
      ───────────────────────────────────── */}
      <section className="rounded-xl border border-border/60 bg-card p-4 sm:p-5">
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
                Solve today&apos;s challenge to maintain your streak
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

      {/* ─────────────────────────────────────
          5. Explore Tracks (if no enrollments)
      ───────────────────────────────────── */}
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
    </div>
  )
}
