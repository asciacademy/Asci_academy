"use client"

import React, { useMemo } from "react"
import Link from "next/link"
import { Play, ArrowRight, Trophy, Briefcase, Award, FolderGit2, BookOpen, Target } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { useUnstopEcosystem } from "@/lib/unstop-store"

export interface DashboardOverviewProps {
  userName?: string
  rank?: string
  totalXP?: number
  streak?: number
  currentLevel?: number
  levelXP?: number
  levelPercent?: number
  isMaxClearance?: boolean
  enrollments?: any[]
  weeklyActivity?: any[]
  catalogTracks?: any[]
  recentLogs?: any[]
  activityEvents?: any[]
  unlockedBadgeIds?: string[]
  avatarUrl?: string | null
  oauthAvatarUrl?: string | null
  onUpdateName?: (newName: string) => Promise<boolean | void> | void
  onUpdateAvatar?: (newAvatarUrl: string) => Promise<boolean | void> | void
  onUpdateXp?: (newXp: number) => void
  onSwitchTab?: (tab: any) => void
}

/**
 * Phase 13: Action Center Dashboard
 * 
 * The dashboard is NOT a statistics dashboard.
 * It is an ACTION CENTER that answers: "What should I do next?" within 3 seconds.
 * 
 * 6 Core Modules:
 * 1. HEADER: Good morning, [Name] • Continue where you left off.
 * 2. PRIMARY CARD: [Python Logo] • Python Programming • Lesson 8 of 24 • 65% complete • [Continue Learning]
 * 3. TODAY: Today's Practice • [Challenge]
 * 4. UPCOMING: [Competition] • Registration closes tomorrow. • [View]
 * 5. RECOMMENDED: Recommended for you (Course, Project, Competition, Internship)
 * 6. YOUR PROGRESS: Courses, Projects, Challenges, Certificates (simple metrics)
 */
export function DashboardOverview({
  userName = "Student",
  enrollments = [],
  unlockedBadgeIds = [],
  onSwitchTab,
}: DashboardOverviewProps) {
  const { potd, hackathons, jobs } = useUnstopEcosystem()

  // 1. Time-of-day greeting
  const greeting = useMemo(() => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }, [])

  // 2. Primary Card: Current active course
  const activeCourse = useMemo(() => {
    if (enrollments && enrollments.length > 0) {
      const enr = enrollments[0]
      const totalLessons = enr.totalLessons || enr.total_lessons || 24
      const completedLessons = enr.completedLessons || enr.lessonsCompleted || enr.completed_lessons || 8
      const progress = enr.progressPercent ?? Math.round((completedLessons / totalLessons) * 100)
      const slug = enr.slug || "python"
      return {
        title: enr.title || "Python Programming",
        slug,
        lessonInfo: `Lesson ${completedLessons} of ${totalLessons}`,
        progress: progress || 65,
        href: `/courses/${slug}/learn`,
        brand: slug.toLowerCase().includes("python") ? "python" : (enr.brand || "python"),
      }
    }
    return {
      title: "Python Programming",
      slug: "python",
      lessonInfo: "Lesson 8 of 24",
      progress: 65,
      href: "/courses/python/learn",
      brand: "python",
    }
  }, [enrollments])

  // 3. Today's Practice Challenge
  const todayChallenge = useMemo(() => {
    if (potd) {
      return {
        title: potd.title || "Sliding Window Maximum",
        difficulty: potd.difficulty || "Medium",
        category: "Arrays",
        meta: `${potd.difficulty || "Medium"} · Arrays · 15 min`,
        href: "/practice",
      }
    }
    return {
      title: "Sliding Window Maximum",
      difficulty: "Medium",
      category: "Arrays",
      meta: "Medium · Arrays · 15 min",
      href: "/practice",
    }
  }, [potd])

  // 4. Upcoming Competition
  const upcomingCompetition = useMemo(() => {
    if (hackathons && hackathons.length > 0) {
      return {
        id: hackathons[0].id,
        title: hackathons[0].title || "ASCI National Algorithm Sprint",
        host: hackathons[0].host || "Google Developer Groups",
        deadlineText: "Registration closes tomorrow.",
        href: `/competitions/${hackathons[0].id}`,
      }
    }
    return {
      id: "asci-national-algorithm-sprint",
      title: "ASCI National Algorithm Sprint",
      host: "Google Developer Groups",
      deadlineText: "Registration closes tomorrow.",
      href: "/competitions",
    }
  }, [hackathons])

  // 5. Recommended items (Course, Project, Competition, Internship)
  const recommendedItems = useMemo(() => {
    const jobItem = jobs && jobs.length > 0 ? jobs[0] : null

    return {
      course: {
        type: "Course",
        title: "Go Distributed Systems",
        brand: "go",
        meta: "Intermediate · 18 Lessons · Certificate",
        href: "/courses",
        cta: "Start Course",
      },
      project: {
        type: "Project",
        title: "Build a Job Portal",
        brand: "react",
        meta: "Intermediate · React & Node.js · 4–6 hrs",
        href: "/projects/build-a-job-portal",
        cta: "Start Project",
      },
      competition: {
        type: "Competition",
        title: "Razorpay High-Throughput Sprint",
        meta: "₹1,00,000 Prize · Online Hackathon",
        href: "/competitions",
        cta: "Register Now",
      },
      internship: {
        type: "Internship",
        title: jobItem?.title || "Software Engineer Intern",
        meta: jobItem ? `${jobItem.company} · ${jobItem.location}` : "Google · Bangalore / Remote · ₹45,000/mo",
        href: "/career",
        cta: "Apply Now",
      },
    }
  }, [jobs])

  // 6. Simple Progress Metrics
  const coursesCount = enrollments.length > 0 ? enrollments.length : 3
  const projectsCount = 2
  const challengesCount = 24
  const certificatesCount = unlockedBadgeIds.length > 0 ? unlockedBadgeIds.length : 1

  return (
    <div className="max-w-[1040px] mx-auto space-y-8 py-2">
      {/* ────────────────────────────────────────────────────────
          1. HEADER: Action Center Greeting
      ──────────────────────────────────────────────────────── */}
      <header className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-bold font-sans text-foreground tracking-tight">
          {greeting}, {userName}
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Continue where you left off.
        </p>
      </header>

      {/* ────────────────────────────────────────────────────────
          2. PRIMARY CARD: Continue Learning Hero
      ──────────────────────────────────────────────────────── */}
      <section aria-label="Primary Action Card">
        <div className="p-6 sm:p-7 rounded-2xl border border-primary/30 bg-card/95 hover:border-primary/50 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5 min-w-0">
            {/* Visual Logo */}
            <div className="w-16 h-16 rounded-2xl bg-secondary/80 border border-border/80 flex items-center justify-center shrink-0 shadow-2xs">
              <BrandIcon name={activeCourse.brand as any} size={36} />
            </div>

            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                  In Progress
                </span>
                <span className="text-xs text-muted-foreground">• {activeCourse.lessonInfo}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-foreground truncate">
                {activeCourse.title}
              </h2>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-40 sm:w-48 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${activeCourse.progress}%` }}
                  />
                </div>
                <span className="text-xs font-mono font-semibold text-foreground">
                  {activeCourse.progress}% complete
                </span>
              </div>
            </div>
          </div>

          <Link
            href={activeCourse.href}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-sm font-semibold transition-all shadow-sm shrink-0 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Continue Learning</span>
          </Link>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          3 & 4. TODAY'S PRACTICE + UPCOMING COMPETITION (2-Column Grid)
      ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* TODAY: Today's Practice */}
        <section
          aria-label="Today's Practice"
          className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between gap-5"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                Today
              </span>
              <Link
                href="/practice"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-medium"
              >
                <span>Arena</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Today&apos;s Practice
              </h3>
              <h4 className="text-lg font-bold text-foreground mt-1 truncate">
                {todayChallenge.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-0.5">
                {todayChallenge.meta}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Target className="w-4 h-4 text-primary" />
              <span>Daily Challenge</span>
            </div>
            <Link
              href={todayChallenge.href}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-foreground hover:text-primary text-xs font-semibold transition-all cursor-pointer"
            >
              Solve Challenge
            </Link>
          </div>
        </section>

        {/* UPCOMING: Competition */}
        <section
          aria-label="Upcoming Competition"
          className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card hover:border-primary/40 transition-all flex flex-col justify-between gap-5"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-500">
                Upcoming
              </span>
              <Link
                href="/competitions"
                className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 font-medium"
              >
                <span>All Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div>
              <h3 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted-foreground">
                Competition
              </h3>
              <h4 className="text-lg font-bold text-foreground mt-1 truncate">
                {upcomingCompetition.title}
              </h4>
              <p className="text-xs text-amber-500 font-semibold mt-0.5">
                {upcomingCompetition.deadlineText}
              </p>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between gap-4 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="truncate">{upcomingCompetition.host}</span>
            </div>
            <Link
              href={upcomingCompetition.href}
              className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-foreground hover:text-primary text-xs font-semibold transition-all"
            >
              View
            </Link>
          </div>
        </section>
      </div>

      {/* ────────────────────────────────────────────────────────
          5. RECOMMENDED: Recommended for you (Course, Project, Competition, Internship)
      ──────────────────────────────────────────────────────── */}
      <section aria-label="Recommended For You" className="space-y-3.5">
        <div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
            Recommended
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Recommended for you
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Course */}
          <Link
            href={recommendedItems.course.href}
            className="group p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-primary">
                  <BrandIcon name={recommendedItems.course.brand as any} size={20} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                  Course
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {recommendedItems.course.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {recommendedItems.course.meta}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-xs text-primary font-semibold flex items-center justify-between">
              <span>{recommendedItems.course.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Project */}
          <Link
            href={recommendedItems.project.href}
            className="group p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-primary">
                  <BrandIcon name={recommendedItems.project.brand as any} size={20} />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                  Project
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {recommendedItems.project.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {recommendedItems.project.meta}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-xs text-primary font-semibold flex items-center justify-between">
              <span>{recommendedItems.project.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Competition */}
          <Link
            href={recommendedItems.competition.href}
            className="group p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-amber-500">
                  <Trophy className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                  Competition
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {recommendedItems.competition.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {recommendedItems.competition.meta}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-xs text-primary font-semibold flex items-center justify-between">
              <span>{recommendedItems.competition.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>

          {/* Internship */}
          <Link
            href={recommendedItems.internship.href}
            className="group p-4 rounded-2xl border border-border/80 bg-card hover:border-primary/50 transition-all flex flex-col justify-between shadow-2xs hover:shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-9 h-9 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-primary">
                  <Briefcase className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                  Internship
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {recommendedItems.internship.title}
                </h4>
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {recommendedItems.internship.meta}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 text-xs text-primary font-semibold flex items-center justify-between">
              <span>{recommendedItems.internship.cta}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </div>
          </Link>
        </div>
      </section>

      {/* ────────────────────────────────────────────────────────
          6. YOUR PROGRESS: Simple Clean Metrics (Courses, Projects, Challenges, Certificates)
      ──────────────────────────────────────────────────────── */}
      <section aria-label="Your Progress" className="space-y-3.5">
        <div>
          <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-muted-foreground">
            Overview
          </span>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">
            Your Progress
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Courses */}
          <div className="p-4 rounded-2xl border border-border/80 bg-card/60 flex flex-col justify-between">
            <span className="text-xs font-medium text-muted-foreground">Courses</span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">{coursesCount}</span>
              <span className="text-xs text-muted-foreground">Enrolled</span>
            </div>
          </div>

          {/* Projects */}
          <div className="p-4 rounded-2xl border border-border/80 bg-card/60 flex flex-col justify-between">
            <span className="text-xs font-medium text-muted-foreground">Projects</span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">{projectsCount}</span>
              <span className="text-xs text-muted-foreground">Built</span>
            </div>
          </div>

          {/* Challenges */}
          <div className="p-4 rounded-2xl border border-border/80 bg-card/60 flex flex-col justify-between">
            <span className="text-xs font-medium text-muted-foreground">Challenges</span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">{challengesCount}</span>
              <span className="text-xs text-muted-foreground">Solved</span>
            </div>
          </div>

          {/* Certificates */}
          <div className="p-4 rounded-2xl border border-border/80 bg-card/60 flex flex-col justify-between">
            <span className="text-xs font-medium text-muted-foreground">Certificates</span>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="text-2xl sm:text-3xl font-bold font-mono text-foreground">{certificatesCount}</span>
              <span className="text-xs text-muted-foreground">Earned</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
