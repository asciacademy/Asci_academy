"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { Play, ArrowRight, BookOpen, Code2, X, ChevronUp, Sparkles, CheckCircle2 } from "lucide-react"
import { AsciIcon } from "@/components/icons"
import { cn } from "@/lib/utils"

interface ResumeLearningDockProps {
  enrollments?: any[]
  className?: string
}

export function ResumeLearningDock({ enrollments = [], className }: ResumeLearningDockProps) {
  const [isOpen, setIsOpen] = useState(true)
  const [activeCourse, setActiveCourse] = useState<{
    title: string
    lesson: string
    href: string
    percent: number
    iconName?: string
  } | null>(null)

  useEffect(() => {
    // Check if there is an active enrollment
    if (enrollments && enrollments.length > 0) {
      const first = enrollments[0]
      setActiveCourse({
        title: first.courses?.title || first.title || "Full-Stack Web Development",
        lesson: first.lastLessonTitle || "Interactive Module 2: State & Component Architecture",
        href: first.courses?.slug ? `/courses/${first.courses.slug}/learn` : "/programs/webdev/course",
        percent: first.progress_percentage || 45,
      })
      return
    }

    // Check localStorage for last visited problem or lesson
    try {
      const lastProb = localStorage.getItem("asci_last_visited_problem")
      if (lastProb) {
        const parsed = JSON.parse(lastProb)
        setActiveCourse({
          title: "A2Z DSA Master Track",
          lesson: parsed.title || "Two Sum & Two Pointers",
          href: `/dsa/problems/${parsed.id || 1}`,
          percent: 35,
        })
        return
      }
    } catch {
      // ignore
    }

    // Default recommendation if fresh student
    setActiveCourse({
      title: "Full-Stack Web Development",
      lesson: "Module 1: Foundations & React Server Components",
      href: "/programs/webdev/course",
      percent: 20,
    })
  }, [enrollments])

  if (!isOpen || !activeCourse) return null

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-primary/25 bg-gradient-to-r from-primary/10 via-card/90 to-card/95 backdrop-blur-xl p-4 shadow-xl shadow-primary/5 transition-all overflow-hidden",
        className
      )}
    >
      {/* Background Subtle Ambient Glow */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-primary/15 blur-2xl" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
        {/* Left: Course details */}
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary shrink-0 shadow-xs">
            <Play className="h-4 w-4 fill-primary text-primary ml-0.5" />
          </div>

          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-bold">
                Continue Where You Left Off
              </span>
              <span className="text-[10px] text-muted-foreground/60">•</span>
              <span className="text-[10px] font-mono text-muted-foreground">{activeCourse.percent}% Complete</span>
            </div>
            <h4 className="text-sm font-bold text-foreground tracking-tight leading-snug">
              {activeCourse.title}
            </h4>
            <p className="text-xs text-muted-foreground truncate max-w-[280px] sm:max-w-md">
              {activeCourse.lesson}
            </p>
          </div>
        </div>

        {/* Right: Action & Progress Pill */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/40">
          <div className="w-24 hidden md:block">
            <div className="h-1.5 w-full rounded-full bg-secondary/80 overflow-hidden border border-border/40">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${activeCourse.percent}%` }}
              />
            </div>
          </div>

          <Link
            href={activeCourse.href}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs shadow-xs hover:shadow-primary/25 transition-all cursor-pointer group"
          >
            <span>Resume Learning</span>
            <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary/60 transition-colors cursor-pointer"
            title="Dismiss dock"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}
