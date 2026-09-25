"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Play, CheckCircle2, Bookmark, BookOpen, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandIcon } from "@/components/ui/brand-icon"
import { useEnrollments, useWishlist, type WishlistItem } from "@/lib/user-learning-store"

type LearningTab = "in-progress" | "completed" | "saved"

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState<LearningTab>("in-progress")
  const { enrollments } = useEnrollments()
  const { wishlist: savedItems } = useWishlist()

  // In-progress courses (demo fallback if empty)
  const inProgressList = enrollments.length > 0 ? enrollments : [
    {
      id: "course-python",
      slug: "python",
      title: "Python Programming",
      lessonsCompleted: 8,
      totalLessons: 24,
      progressPercent: 65,
      brand: "python",
    },
    {
      id: "course-dsa",
      slug: "dsa",
      title: "Data Structures & Algorithms",
      lessonsCompleted: 14,
      totalLessons: 32,
      progressPercent: 44,
      brand: "algorithm",
    },
  ]

  const completedList = [
    {
      id: "course-sql",
      slug: "sql",
      title: "SQL & Relational Database Design",
      completedDate: "12 Sep 2026",
      brand: "sql",
      certificateId: "ASCI-SQL-2026-881",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-foreground tracking-tight">
            My Learning
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Track your ongoing courses, completed modules, and saved curricula.
          </p>
        </div>

        {/* Tabs: In Progress, Completed, Saved */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary border border-border/80 w-fit text-xs font-semibold">
          <button
            onClick={() => setActiveTab("in-progress")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "in-progress"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            In Progress ({inProgressList.length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "completed"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Completed ({completedList.length})
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`px-4 py-2 rounded-lg transition-all cursor-pointer ${
              activeTab === "saved"
                ? "bg-card text-foreground shadow-2xs font-bold"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Saved ({savedItems.length})
          </button>
        </div>

        {/* Tab 1: In Progress */}
        {activeTab === "in-progress" && (
          <div className="space-y-2.5">
            {inProgressList.map((course: any) => {
              const brand = course.brand || (course.slug?.includes("python") ? "python" : course.slug?.includes("react") ? "react" : "algorithm")
              const progress = course.progressPercent ?? 65
              return (
                <div
                  key={course.id || course.slug}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shrink-0">
                      <BrandIcon name={brand} size={24} />
                    </div>
                    <div className="min-w-0">
                      <Link
                        href={`/courses/${course.slug}/learn`}
                        className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors block truncate"
                      >
                        {course.title}
                      </Link>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mt-0.5">
                        <span>{progress}% complete</span>
                        <span>•</span>
                        <span>Lesson {course.lessonsCompleted || 8} of {course.totalLessons || 24}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                    <div className="w-24 h-1.5 rounded-full bg-secondary overflow-hidden hidden sm:block">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <Link
                      href={`/courses/${course.slug}/learn`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all shadow-2xs cursor-pointer"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Continue</span>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Tab 2: Completed */}
        {activeTab === "completed" && (
          <div className="space-y-2.5">
            {completedList.map((course) => (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-11 h-11 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <BrandIcon name={course.brand} size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Completed on {course.completedDate} · ID: {course.certificateId}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <Link
                    href={`/verify/${course.certificateId}`}
                    className="px-3.5 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all"
                  >
                    View Certificate
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Saved */}
        {activeTab === "saved" && (
          <div className="space-y-2.5">
            {savedItems.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-border rounded-xl p-6">
                <Bookmark className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-semibold text-sm text-foreground">No saved courses yet</h3>
                <p className="text-xs text-muted-foreground mt-1 max-w-sm mx-auto">
                  Bookmark courses and learning paths to access them quickly here.
                </p>
                <Link
                  href="/courses"
                  className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              savedItems.map((item: WishlistItem) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-secondary border border-border flex items-center justify-center text-primary shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm text-foreground truncate">{item.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                    </div>
                  </div>
                  <Link
                    href={`/courses/${item.courseSlug || item.id}`}
                    className="px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
                  >
                    Start
                  </Link>
                </div>
              ))
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
