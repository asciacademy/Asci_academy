"use client"

import Link from "next/link"
import { ArrowRight, Play, Terminal, CheckCircle2 } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export function ContinueLearningCard() {
  const { user } = useAuth()

  // Default active course state (hydrated from user progress or featured active track)
  const activeCourse = {
    title: "Python for Developers",
    slug: "python",
    instructor: "Engineering Faculty",
    progress: 68,
    completedLessons: 34,
    totalLessons: 50,
    nextLesson: "Functions, Scope & Module Architecture",
    href: "/programs/python",
  }

  return (
    <section className="py-6 sm:py-8 border-b border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border/80 bg-card p-4 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: Thumbnail & Course Metadata */}
          <div className="flex items-start sm:items-center gap-4 flex-1">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary">
              <Terminal className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-primary font-semibold">
                  Continue Learning
                </span>
                <span className="text-muted-foreground text-xs">·</span>
                <span className="text-xs text-muted-foreground font-mono">
                  {activeCourse.completedLessons} / {activeCourse.totalLessons} lessons
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-foreground tracking-tight">
                {activeCourse.title}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground flex items-center gap-1.5">
                <Play className="w-3 h-3 text-primary shrink-0" />
                <span>Next: <strong className="text-foreground font-medium">{activeCourse.nextLesson}</strong></span>
              </p>
            </div>
          </div>

          {/* Right: Progress Meter & CTA Button */}
          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
            <div className="min-w-[140px] space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-bold text-primary">{activeCourse.progress}%</span>
              </div>
              <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: `${activeCourse.progress}%` }}
                />
              </div>
            </div>

            <Link
              href={activeCourse.href}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-active text-white px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs text-center"
            >
              <span>Continue Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
