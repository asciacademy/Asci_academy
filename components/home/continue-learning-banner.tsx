"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Play, ArrowRight, Sparkles, BookOpen, Clock, Award } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { useAuth } from "@/context/auth-context"
import { useEnrollments } from "@/lib/user-learning-store"

const POPULAR_STARTER_COURSES = [
  {
    id: "course-python",
    slug: "python",
    title: "Python for Production & Systems",
    level: "Beginner",
    lessons: 24,
    brand: "python",
    tag: "Most Popular",
  },
  {
    id: "course-dsa",
    slug: "dsa",
    title: "Striver A2Z Algorithms Masterclass",
    level: "All Levels",
    lessons: 474,
    brand: "algorithm",
    tag: "Essential",
  },
  {
    id: "course-react",
    slug: "react",
    title: "Full-Stack React 19 & Architecture",
    level: "Intermediate",
    lessons: 32,
    brand: "react",
    tag: "High Demand",
  },
  {
    id: "course-go",
    slug: "go",
    title: "Distributed Systems & Services in Go",
    level: "Advanced",
    lessons: 28,
    brand: "go",
    tag: "Systems",
  },
]

export function ContinueLearningBanner() {
  const { user: authUser } = useAuth()
  const { enrollments } = useEnrollments()
  const [mounted, setMounted] = useState(false)
  const [isDemoUser, setIsDemoUser] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (typeof document !== "undefined" && document.cookie.includes("demo_bypass")) {
      setIsDemoUser(true)
    }
  }, [])

  const isLoggedIn = mounted && Boolean(authUser || isDemoUser)

  // Active in-progress course for logged in user
  const activeCourse =
    enrollments.length > 0
      ? enrollments[0]
      : {
          id: "course-python",
          slug: "python",
          title: "Python Programming",
          subtitle: "Control Flow, Functions & Data Structures",
          progressPercent: 65,
          lessonsCompleted: 8,
          totalLessons: 24,
          brand: "python",
        }

  if (isLoggedIn) {
    return (
      <section aria-label="Continue Learning" className="pt-2">
        <div className="p-4 sm:p-5 rounded-2xl border border-primary/30 bg-primary/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          {/* Course Logo & Details */}
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 shadow-xs">
              <BrandIcon name={activeCourse.brand || "python"} size={26} />
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-primary">
                  Continue Learning
                </span>
                <span className="text-xs text-muted-foreground font-mono">
                  • Lesson {activeCourse.lessonsCompleted} of {activeCourse.totalLessons}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-foreground truncate">
                {activeCourse.title}
              </h3>

              {/* Progress Bar */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <div className="w-36 sm:w-48 h-2 rounded-full bg-secondary overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${activeCourse.progressPercent}%` }}
                  />
                </div>
                <span className="text-xs font-mono text-primary font-bold">
                  {activeCourse.progressPercent}% complete
                </span>
              </div>
            </div>
          </div>

          {/* Continue Action */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
            <Link
              href={`/courses/${activeCourse.slug}/learn`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-[#EA5300] text-primary-foreground text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <Play className="h-3.5 w-3.5 fill-current" />
              <span>Continue</span>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  // Logged-out Users: "Start your learning journey." with 3-4 popular courses
  return (
    <section aria-labelledby="start-learning-heading" className="space-y-3.5 pt-2">
      <div className="flex items-center justify-between border-b border-border/70 pb-2">
        <div>
          <h2
            id="start-learning-heading"
            className="font-serif text-lg sm:text-xl font-normal tracking-tight text-foreground"
          >
            Start your learning journey.
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Join thousands of scholars mastering systems engineering, algorithms, and full-stack craft.
          </p>
        </div>
        <Link
          href="/courses"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>All 47+ Courses</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {POPULAR_STARTER_COURSES.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.slug}`}
            className="group flex flex-col justify-between p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all shadow-2xs"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2">
                <div className="w-9 h-9 rounded-lg bg-secondary/80 border border-border flex items-center justify-center shrink-0">
                  <BrandIcon name={course.brand} size={20} />
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
                  {course.tag}
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                  {course.title}
                </h3>
                <div className="text-[11px] font-mono text-muted-foreground mt-1 flex items-center gap-2">
                  <span>{course.level}</span>
                  <span>•</span>
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Start Course</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
