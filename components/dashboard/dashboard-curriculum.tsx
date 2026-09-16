"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  BookOpen, PlayCircle, CheckCircle2, ChevronRight, ChevronDown,
  Search, Filter, Layers, Award, Clock, ArrowRight, Check, Plus
} from "lucide-react"
import { AxelStage } from "@/components/axel/axel-stage"
import { useEnrollments } from "@/lib/user-learning-store"

interface DashboardCurriculumProps {
  enrollments: any[]
  catalogTracks: any[]
  onEnrollTrack?: (track: any) => void
}

export function DashboardCurriculum({
  enrollments: initialEnrollments,
  catalogTracks,
  onEnrollTrack
}: DashboardCurriculumProps) {
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed" | "catalog">("all")
  const [search, setSearch] = useState("")
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const { enrollments: storeEnrollments, enroll: storeEnroll, isEnrolled: checkIsEnrolled } = useEnrollments()

  // Merge server initialEnrollments + client storeEnrollments
  const enrolledList = useMemo(() => {
    const map = new Map<string, any>()
    ;(initialEnrollments || []).forEach((item: any) => {
      const key = (item.slug || item.id || "").toLowerCase()
      if (key) map.set(key, item)
    })
    storeEnrollments.forEach((item) => {
      const key = (item.slug || item.id || "").toLowerCase()
      if (key) {
        const existing = map.get(key)
        map.set(key, { ...existing, ...item })
      }
    })
    return Array.from(map.values())
  }, [initialEnrollments, storeEnrollments])

  const totalEnrolledLessons = enrolledList.reduce((acc: number, c: any) => acc + (c.totalLessons ?? 0), 0)
  const totalCompletedLessons = enrolledList.reduce((acc: number, c: any) => acc + (c.completedLessons || c.lessonsCompleted || 0), 0)
  const capstoneReadiness = totalEnrolledLessons > 0 ? Math.round((totalCompletedLessons / totalEnrolledLessons) * 100) : 0

  const getCourseImage = (idOrSlug: string, fallbackImg?: string) => {
    if (fallbackImg) return fallbackImg
    const s = (idOrSlug || "").toLowerCase()
    if (s.includes("ai") || s.includes("agent")) return "/images/courses/course_agentic_ai.jpg"
    if (s.includes("java")) return "/images/courses/course_java_systems.jpg"
    if (s.includes("sys") || s.includes("design") || s.includes("scale")) return "/images/courses/course_system_design.jpg"
    if (s.includes("cloud") || s.includes("k8s") || s.includes("devops")) return "/images/courses/course_cloud_k8s.jpg"
    return "/images/courses/course_dsa_bootcamp.jpg"
  }

  const syllabusMap: Record<string, { moduleTitle: string; lessons: { title: string; completed: boolean; duration: string }[] }[]> = {
    "dsa-custom": [
      {
        moduleTitle: "Module 1: Mental Models & Asymptotic Complexity",
        lessons: [
          { title: "1.1 The Anatomy of an Algorithm & Invariants", completed: false, duration: "15m" },
          { title: "1.2 Big-O, Omega, and Theta Real-world Scaling", completed: false, duration: "25m" },
          { title: "1.3 Space Complexity: Heap vs Call Stack Limits", completed: false, duration: "20m" },
        ]
      },
      {
        moduleTitle: "Module 2: Arrays, Slices & Memory Allocation",
        lessons: [
          { title: "2.1 Contiguous Addresses & Cache Locality", completed: false, duration: "20m" },
          { title: "2.2 In-Place Shifting vs Allocation Overhead", completed: false, duration: "30m" },
          { title: "2.3 Two-Pointer Windowing & Boundary Convergence", completed: false, duration: "35m" },
        ]
      },
      {
        moduleTitle: "Module 3: Fast Searching & Divide-and-Conquer",
        lessons: [
          { title: "3.1 Linear vs Binary Search: Operations Race", completed: false, duration: "25m" },
          { title: "3.2 Search Space Reduction Invariants", completed: false, duration: "30m" },
          { title: "3.3 Binary Search on Rotated & Infinite Ranges", completed: false, duration: "40m" },
        ]
      },
      {
        moduleTitle: "Module 4: Recursion & Stack Memory Mechanics",
        lessons: [
          { title: "4.1 The Physical Call Stack & Stack Frames", completed: false, duration: "25m" },
          { title: "4.2 Divide-and-Conquer Recurrence Relations", completed: false, duration: "35m" },
          { title: "4.3 Tail Call Optimization & Iterative Unrolling", completed: false, duration: "30m" },
        ]
      }
    ],
    "java-intermediate": [
      {
        moduleTitle: "Module 1: JVM Architecture & Memory Subsystems",
        lessons: [
          { title: "1.1 ClassLoader Internals & Bytecode Verification", completed: false, duration: "30m" },
          { title: "1.2 JVM Stack, Heap, Metaspace & PC Registers", completed: false, duration: "45m" },
          { title: "1.3 Garbage Collection: Generational Mark & Sweep", completed: false, duration: "40m" },
        ]
      },
      {
        moduleTitle: "Module 2: Java Collections In-Depth Internals",
        lessons: [
          { title: "2.1 HashMap Collision Resolution (Red-Black Trees)", completed: false, duration: "35m" },
          { title: "2.2 ConcurrentHashMap & Striped Locking", completed: false, duration: "45m" },
          { title: "2.3 Memory Footprint of Boxed vs Primitive Types", completed: false, duration: "30m" },
        ]
      }
    ]
  }

  const handleEnroll = (track: any) => {
    const trackSlug = track.slug || track.id
    if (checkIsEnrolled(trackSlug) || enrolledList.some((e: any) => e.id === track.id || e.slug === track.id)) {
      setToastMessage(`You are already enrolled in "${track.title}"`)
      setTimeout(() => setToastMessage(null), 3000)
      return
    }

    storeEnroll({
      id: track.id,
      title: track.title,
      slug: trackSlug,
      category: track.category,
      difficulty: track.difficulty,
      modules: track.modules || 4,
      duration: track.duration,
      thumbnail: track.image || getCourseImage(trackSlug),
      progressPercent: 0,
      lessonsCompleted: 0,
      totalLessons: (track.modules || 4) * 3,
    })

    setToastMessage(`Successfully enrolled in "${track.title}"!`)
    setTimeout(() => setToastMessage(null), 3500)
    if (onEnrollTrack) onEnrollTrack(track)
  }

  const filteredEnrollments = enrolledList.filter((c: any) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          (c.category && c.category.toLowerCase().includes(search.toLowerCase()))
    if (!matchesSearch) return false

    if (filter === "completed") return (c.progressPercent || 0) >= 100
    if (filter === "in-progress") return (c.progressPercent || 0) < 100
    return true
  })

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 rounded-2xl border border-amber-500/40 bg-card p-4 shadow-xl flex items-center gap-3 text-xs font-mono text-foreground animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Header & Search / Filter Controls
      ══════════════════════════════════════════════ */}
      <div id="dashboard-courses-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-semibold shrink-0 leading-none">
              Academic Directory
            </span>
            <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700 hidden sm:inline-block" />
              <span>{enrolledList.length} Active Tracks</span>
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            My Engineering Curriculum
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            Structured syllabi, algorithmic problem sets, and interactive compiler challenges.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <AxelStage
            id="dashboard-courses-robot-anchor"
            sectionId="dashboard-courses-header"
            label="Curriculum Mentor"
            emotion="curious"
            scale={0.44}
            size="sm"
          />

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Tracks" },
              { id: "in-progress", label: "In Progress" },
              { id: "completed", label: "Completed" },
              { id: "catalog", label: "Explore Catalog" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  filter === f.id
                    ? "bg-card text-foreground border border-hairline shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-card/50"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by course title, language, or algorithm..."
          className="w-full bg-card border border-stone-200 dark:border-stone-800 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15 transition-all shadow-2xs"
        />
      </div>

      {/* ══════════════════════════════════════════════
          Active Enrolled Tracks List
      ══════════════════════════════════════════════ */}
      {filter !== "catalog" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-xl font-normal text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>Enrolled Curriculum Syllabi</span>
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              {filteredEnrollments.length} track{filteredEnrollments.length === 1 ? "" : "s"} shown
            </span>
          </div>

          {filteredEnrollments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-stone-300 dark:border-stone-800 bg-card/60 p-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto text-amber-600">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-normal text-foreground">
                  {search ? "No matching tracks found" : "No Tracks Enrolled Yet"}
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  {search 
                    ? "Try adjusting your search query or filter to view enrolled curriculum tracks."
                    : "You haven't enrolled in any curriculum tracks yet. Explore the course catalog below to enroll and begin your coursework."}
                </p>
              </div>
              {(filter as string) !== "catalog" && enrolledList.length === 0 && (
                <button
                  onClick={() => setFilter("catalog" as any)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <span>Explore Course Catalog</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEnrollments.map((course: any) => {
                const isExpanded = expandedCourseId === course.id || expandedCourseId === course.slug
                const syllabus = syllabusMap[course.id] || syllabusMap[course.slug] || []

                return (
                  <div
                    key={course.id}
                    className="rounded-3xl border border-stone-200/80 dark:border-stone-800/80 bg-card overflow-hidden shadow-xs hover:border-amber-500/30 transition-all"
                  >
                  {/* Course Header Bar with 3D Image */}
                  <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
                      {/* 3D Image Thumbnail */}
                      <div className="w-full sm:w-36 sm:h-24 h-44 rounded-2xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-900 border border-stone-200/60 dark:border-stone-800 relative">
                        <img
                          src={getCourseImage(course.slug || course.id)}
                          alt={course.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider">
                          {course.category || "Algorithms"}
                        </div>
                      </div>

                      <div className="space-y-2 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-mono text-muted-foreground">
                            {course.difficulty || "Foundational"}
                          </span>
                          {course.progressPercent >= 100 ? (
                            <span className="text-xs px-2.5 py-0.5 font-mono flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                              <Award className="w-3 h-3" /> Track Graduate (+500 XP)
                            </span>
                          ) : (
                            <span className="text-xs font-mono text-amber-700 dark:text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-semibold">
                              {course.progressPercent ?? 0}% Complete
                            </span>
                          )}
                        </div>

                        <h3 className="font-bold text-xl text-foreground leading-snug">
                          {course.title}
                        </h3>

                        {/* Progress Bar */}
                        <div className="space-y-1.5 max-w-md">
                          <div className="flex justify-between text-xs font-mono text-muted-foreground">
                            <span>{course.lessonsCompleted ?? course.completedLessons ?? 0} / {course.totalLessons ?? 0} Lessons</span>
                            <span className="text-amber-700 dark:text-amber-400 font-bold">{course.progressPercent ?? 0}%</span>
                          </div>
                          <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700 ease-out"
                              style={{ width: `${course.progressPercent ?? 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center gap-3 shrink-0 self-end lg:self-center">
                      <button
                        onClick={() => setExpandedCourseId(isExpanded ? null : (course.id || course.slug))}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-secondary text-xs font-medium text-foreground hover:bg-card transition-colors cursor-pointer"
                      >
                        <span>{isExpanded ? "Hide Syllabus" : "View Syllabus"}</span>
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>

                      <Link
                        href={`/programs/${course.slug || "dsa"}/course`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Continue</span>
                      </Link>
                    </div>
                  </div>

                  {/* Expandable Detailed Syllabus Tree */}
                  {isExpanded && (
                    <div className="border-t border-hairline bg-secondary/50 p-6 sm:p-7 space-y-6 animate-fadeIn">
                      <div className="flex items-center justify-between pb-3 border-b border-hairline">
                        <h4 className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                          Curriculum Chapters & Interactive Challenges
                        </h4>
                        <span className="text-xs font-mono text-muted-foreground">
                          Autosaves code assertions
                        </span>
                      </div>

                      {syllabus.length > 0 ? (
                        <div className="space-y-5">
                          {syllabus.map((mod, mi) => (
                            <div key={mi} className="rounded-xl border border-hairline bg-card p-5 space-y-3">
                              <div className="flex items-center justify-between">
                                <h5 className="font-serif text-base font-normal text-foreground">
                                  {mod.moduleTitle}
                                </h5>
                                <span className="text-[11px] font-mono text-muted-foreground">
                                  {mod.lessons.filter(l => l.completed).length} / {mod.lessons.length} Completed
                                </span>
                              </div>

                              <div className="divide-y divide-hairline/60">
                                {mod.lessons.map((lesson, li) => (
                                  <div key={li} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                                    <div className="flex items-center gap-3 min-w-0">
                                      {lesson.completed ? (
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                                      ) : (
                                        <div className="w-4 h-4 rounded-full border border-hairline bg-secondary shrink-0" />
                                      )}
                                      <span className={lesson.completed ? "text-muted-foreground line-through" : "text-foreground font-medium"}>
                                        {lesson.title}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-3 shrink-0">
                                      <span className="text-[11px] font-mono text-muted-foreground">{lesson.duration}</span>
                                      <Link
                                        href={`/programs/${course.slug || "dsa"}/course`}
                                        className="text-primary hover:underline font-medium inline-flex items-center gap-1"
                                      >
                                        <span>Launch</span>
                                        <ChevronRight className="w-3 h-3" />
                                      </Link>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-8 text-center text-xs font-mono text-muted-foreground">
                          Detailed syllabus data is synchronized with your student profile.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Catalog Exploration & One-Click Enrollment
      ══════════════════════════════════════════════ */}
      {(filter === "catalog" || filter === "all") && (
        <div className="space-y-6 pt-4 border-t border-hairline">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1 text-[10px] font-mono text-primary uppercase tracking-widest font-semibold mb-1">
                <Layers className="w-3.5 h-3.5" />
                Additional Advanced Curricula
              </div>
              <h2 className="font-serif text-2xl font-normal text-foreground">
                Available Specialization Tracks
              </h2>
            </div>
            <Link
              href="/programs"
              className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View Full Academic Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {catalogTracks.map((track) => {
              const isEnrolled = enrolledList.some((e: any) => e.id === track.id || e.slug === track.id)
              const trackImg = track.image || getCourseImage(track.id)

              return (
                <div
                  key={track.id}
                  className="rounded-3xl border border-stone-200/80 dark:border-stone-800/80 bg-card overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div>
                    {/* 3D Image Cover */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                      <img
                        src={trackImg}
                        alt={track.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs text-[10px] font-bold px-2.5 py-0.5 rounded-full text-foreground border border-stone-200/60 dark:border-stone-700/60 uppercase tracking-wider shadow-2xs">
                        {track.category}
                      </div>
                      <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-xs text-[10px] font-mono font-medium px-2 py-0.5 rounded-full text-white">
                        {track.difficulty}
                      </div>
                    </div>

                    {/* Card Details */}
                    <div className="p-5 space-y-2.5">
                      <div className="text-xs font-mono text-muted-foreground">
                        {track.modules} Modules · {track.duration}
                      </div>

                      <h3 className="font-bold text-lg text-foreground leading-snug group-hover:text-amber-600 transition-colors line-clamp-1">
                        {track.title}
                      </h3>

                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {track.desc}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between border-t border-stone-100 dark:border-stone-800 mt-2">
                    <span className="text-[11px] font-mono text-muted-foreground">ASCI Track</span>

                    {isEnrolled ? (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold">
                        <Check className="w-4 h-4 text-emerald-500" /> Enrolled
                      </span>
                    ) : (
                      <button
                        onClick={() => handleEnroll(track)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all text-xs font-semibold cursor-pointer shadow-2xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Enroll Track</span>
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Certification & Capstone Readiness Banner
      ══════════════════════════════════════════════ */}
      <div id="dashboard-courses-catalog" className="rounded-3xl border border-stone-200/80 dark:border-stone-800/80 bg-card p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-amber-700 dark:text-amber-400 font-semibold">
                ASCI Accreditation Track
              </span>
            </div>
            <h3 className="font-serif text-2xl font-normal text-foreground">
              Certified Systems Engineer (ACSE) Status
            </h3>
            <p className="text-xs sm:text-sm text-body leading-relaxed">
              Complete the foundational DSA curriculum, pass the 4 interactive visualizer assertions, and submit your distributed cache capstone project to receive your verified digital credential.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <AxelStage
              id="dashboard-courses-catalog-anchor"
              sectionId="dashboard-courses-catalog"
              label="Accreditation Advisor"
              emotion="happy"
              scale={0.44}
              size="sm"
            />
            <div className="flex flex-col sm:items-end gap-2">
              <div className="text-right">
                <span className="font-serif text-3xl font-normal text-amber-600 dark:text-amber-400">{capstoneReadiness}%</span>
                <span className="text-xs text-muted-foreground block font-mono">Capstone Readiness</span>
              </div>
              <Link
                href="/results"
                className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400 hover:underline"
              >
                <span>Inspect Credential Standards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
