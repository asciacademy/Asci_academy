"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  BookOpen, PlayCircle, CheckCircle2, ChevronRight, ChevronDown, ChevronLeft,
  Search, Filter, Layers, Award, Clock, ArrowRight, Check, Plus, Edit3,
  Trash2, ShieldCheck, Star, GraduationCap, Sparkles, ExternalLink, Bookmark,
  AlertCircle, Loader2
} from "lucide-react"
import { AxelStage } from "@/components/axel/axel-stage"
import { useEnrollments, useWishlist } from "@/lib/user-learning-store"
import { getCurriculumCourseBySlug } from "@/lib/curriculum-data"
import { enrollInCourse } from "@/app/actions/courses"
import { useAdmin } from "@/context/admin-context"
import { useCoursesStore, UnifiedCourse } from "@/lib/courses-store"
import { getCourseraDataForCourse } from "@/lib/coursera-metadata"
import { CourseEditorModal } from "@/components/courses/course-editor-modal"
import { WishlistButton } from "@/components/courses/wishlist-button"
import {
  DashboardCurriculumSkeleton,
  CourseGridSkeleton,
} from "@/components/courses/courses-skeleton"

interface DashboardCurriculumProps {
  enrollments: any[]
  catalogTracks?: any[]
  onEnrollTrack?: (track: any) => void
}

export function DashboardCurriculum({
  enrollments: initialEnrollments,
  catalogTracks: initialCatalogTracks = [],
  onEnrollTrack
}: DashboardCurriculumProps) {
  const { isAdmin } = useAdmin()
  const { courses: storeCourses, isLoaded, addCourse, updateCourse, deleteCourse } = useCoursesStore()
  const [filter, setFilter] = useState<"all" | "in-progress" | "completed" | "catalog">("all")
  const [search, setSearch] = useState("")
  const [catalogCategory, setCatalogCategory] = useState("All")
  const [catalogPage, setCatalogPage] = useState(1)
  const catalogItemsPerPage = 9 // Exactly 3 rows of 3 columns
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const { enrollments: storeEnrollments, enroll: storeEnroll, isEnrolled: checkIsEnrolled, unenroll } = useEnrollments()

  // In-place Admin Course Editor State
  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<UnifiedCourse | null>(null)
  const [deleteConfirmCourse, setDeleteConfirmCourse] = useState<{ id: string; title: string } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

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
    if (s.includes("ai") || s.includes("agent") || s.includes("rag")) return "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80"
    if (s.includes("data") || s.includes("analytics")) return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    if (s.includes("java")) return "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80"
    if (s.includes("sys") || s.includes("design") || s.includes("scale")) return "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"
    if (s.includes("cloud") || s.includes("k8s") || s.includes("devops") || s.includes("docker")) return "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&q=80"
    if (s.includes("hack") || s.includes("cyber") || s.includes("security")) return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"
    return "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80"
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
    const trackSlug = (track.slug || track.id || "").toLowerCase()
    const isAlreadyEnrolled = checkIsEnrolled(trackSlug) || enrolledList.some((e: any) => {
      const eSlug = (e.slug || "").toLowerCase()
      const eId = (e.id || "").toLowerCase()
      const tId = (track.id || "").toLowerCase()
      return (eSlug && (eSlug === trackSlug || eSlug === tId)) || (eId && (eId === trackSlug || eId === tId))
    })

    if (isAlreadyEnrolled) {
      showToast(`You are already enrolled in "${track.title}"`)
      return
    }

    storeEnroll({
      id: track.id,
      title: track.title,
      slug: trackSlug,
      category: track.category,
      difficulty: track.level || track.difficulty,
      modules: track.modules || 4,
      duration: track.weeks || track.duration || "40h",
      thumbnail: track.thumbnail_url || track.courseraData?.thumbnail || track.image || getCourseImage(trackSlug),
      progressPercent: 0,
      lessonsCompleted: 0,
      totalLessons: (track.modules || 4) * 3,
    })

    enrollInCourse(trackSlug).catch(() => {})
    showToast(`Successfully enrolled in "${track.title}"!`)
    if (onEnrollTrack) onEnrollTrack(track)
  }

  const handleUnenroll = (courseIdOrSlug: string, title: string) => {
    unenroll(courseIdOrSlug)
    showToast(`Removed "${title}" from your active curriculum.`)
  }

  // Active Catalog Tracks combined with live storeCourses
  const activeCatalogTracks = useMemo(() => {
    if (storeCourses && storeCourses.length > 0) {
      return storeCourses.map((c) => ({
        id: c.id,
        slug: c.slug || c.id,
        title: c.title,
        category: c.category,
        difficulty: c.level,
        level: c.level,
        modules: c.modules || 4,
        duration: c.weeks || `${c.duration_hours}h`,
        duration_hours: c.duration_hours,
        desc: c.description,
        description: c.description,
        href: `/courses/${c.slug || c.id}/learn`,
        exploreHref: `/courses/${c.slug || c.id}`,
        image: c.thumbnail_url || c.courseraData?.thumbnail || getCourseImage(c.slug || c.id),
        thumbnail_url: c.thumbnail_url || c.courseraData?.thumbnail,
        is_premium: c.is_premium,
        courseraData: c.courseraData || getCourseraDataForCourse(c.slug || c.id, c.title, c.category),
        tools: c.tools || c.courseraData?.skills || [],
        isCustom: c.isCustom,
      }))
    }

    return (initialCatalogTracks || []).map((t) => ({
      ...t,
      courseraData: getCourseraDataForCourse(t.slug || t.id, t.title, t.category),
    }))
  }, [storeCourses, initialCatalogTracks])

  const filteredEnrollments = enrolledList.filter((c: any) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          (c.category && c.category.toLowerCase().includes(search.toLowerCase()))
    if (!matchesSearch) return false

    if (filter === "completed") return (c.progressPercent || 0) >= 100
    if (filter === "in-progress") return (c.progressPercent || 0) < 100
    return true
  })

  // Catalog filtering & pagination (3 rows of 3 columns = 9 items per page)
  const filteredCatalogTracks = useMemo(() => {
    return activeCatalogTracks.filter((track: any) => {
      // Category filter
      if (catalogCategory !== "All") {
        if (catalogCategory === "Languages & Web") {
          const s = (track.slug || track.id || "").toLowerCase()
          const isLangOrWeb =
            s === "c" || s === "cpp" || s === "webdev" || s === "html" || s === "css" ||
            s === "javascript" || s === "java" || s === "python" || s === "typescript" ||
            s === "react" || s === "sql" || s === "git" ||
            track.category === "Web Development" || track.category === "Programming"
          if (!isLangOrWeb) return false
        } else if (track.category !== catalogCategory) {
          return false
        }
      }

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase().trim()
        const tSlug = (track.slug || track.id || "").toLowerCase()
        const tTitle = (track.title || "").toLowerCase()
        const tDesc = (track.desc || track.description || "").toLowerCase()
        const tCat = (track.category || "").toLowerCase()
        const tPartner = (track.courseraData?.partner || "").toLowerCase()
        const tSkills = (track.courseraData?.skills || []).join(" ").toLowerCase()
        if (
          !tSlug.includes(q) &&
          !tTitle.includes(q) &&
          !tDesc.includes(q) &&
          !tCat.includes(q) &&
          !tPartner.includes(q) &&
          !tSkills.includes(q)
        ) {
          return false
        }
      }

      return true
    })
  }, [activeCatalogTracks, catalogCategory, search])

  const totalCatalogPages = Math.max(1, Math.ceil(filteredCatalogTracks.length / catalogItemsPerPage))

  // Auto-reset catalog page on category/search change
  React.useEffect(() => {
    setCatalogPage(1)
  }, [catalogCategory, search])

  const paginatedCatalogTracks = useMemo(() => {
    const start = (catalogPage - 1) * catalogItemsPerPage
    return filteredCatalogTracks.slice(start, start + catalogItemsPerPage)
  }, [filteredCatalogTracks, catalogPage, catalogItemsPerPage])

  const catalogPageNumbers = useMemo(() => {
    if (totalCatalogPages <= 5) {
      return Array.from({ length: totalCatalogPages }, (_, i) => i + 1)
    }
    if (catalogPage <= 3) {
      return [1, 2, 3, 4, "...", totalCatalogPages]
    }
    if (catalogPage >= totalCatalogPages - 2) {
      return [1, "...", totalCatalogPages - 3, totalCatalogPages - 2, totalCatalogPages - 1, totalCatalogPages]
    }
    return [1, "...", catalogPage - 1, catalogPage, catalogPage + 1, "...", totalCatalogPages]
  }, [catalogPage, totalCatalogPages])

  const handleCatalogPageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalCatalogPages) return
    setCatalogPage(newPage)
    const el = document.getElementById("available-catalog-tracks")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Admin Actions Handlers
  const handleOpenCreateCourse = () => {
    setEditingCourse(null)
    setIsEditorModalOpen(true)
  }

  const handleOpenEditCourse = (course: any) => {
    const slug = course.slug || course.id
    const meta = course.courseraData || getCourseraDataForCourse(slug, course.title, course.category)

    const fullCourse: UnifiedCourse = {
      id: course.id || slug,
      title: course.title,
      slug,
      description: course.description || course.desc || "",
      category: course.category || "AI & ML",
      level: course.level || course.difficulty || "Intermediate",
      weeks: course.weeks || course.duration || "6 Weeks",
      duration_hours: course.duration_hours || 40,
      lessons: course.lessons || course.totalLessons || (course.modules ? course.modules * 3 : 12),
      modules: course.modules || 4,
      projects: course.projects || 2,
      certificate: course.certificate || "Professional Certificate",
      is_premium: Boolean(course.is_premium),
      is_published: course.is_published ?? true,
      thumbnail_url: course.thumbnail_url || course.image || meta.thumbnail,
      tools: course.tools || meta.skills || [],
      courseraData: meta,
      isCustom: Boolean(course.isCustom),
    }

    setEditingCourse(fullCourse)
    setIsEditorModalOpen(true)
  }

  const handleSaveCourse = async ({ isNew, course }: { isNew: boolean; course: any }) => {
    if (isNew) {
      await addCourse(course)
      showToast(`Program "${course.title}" published to academic catalog!`)
    } else {
      const targetKey = editingCourse?.id || editingCourse?.slug || course.slug
      await updateCourse(targetKey, course)
      showToast(`Program "${course.title}" updated successfully!`)
    }
  }

  const handleDeleteCourse = async () => {
    if (!deleteConfirmCourse) return
    setIsDeleting(true)
    try {
      await deleteCourse(deleteConfirmCourse.id)
      showToast(`Program "${deleteConfirmCourse.title}" removed from catalog.`)
      setDeleteConfirmCourse(null)
    } catch (err: any) {
      showToast(err.message || "Failed to delete course.")
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 rounded-2xl border border-primary/30 bg-card p-4 shadow-xl flex items-center gap-3 text-xs font-mono text-foreground animate-fadeIn">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Header & Search / Filter Controls
      ══════════════════════════════════════════════ */}
      <div id="dashboard-courses-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold shrink-0 leading-none">
              My Courses
            </span>
            <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700 hidden sm:inline-block" />
              <span>{enrolledList.length} Enrolled</span>
              <span className="text-muted-foreground/60">·</span>
              <span>{activeCatalogTracks.length} Courses Available</span>
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            My Courses &amp; Learning Tracks
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            Track your enrolled courses, continue learning where you left off, or explore new topics.
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
              { id: "all", label: "All Courses" },
              { id: "in-progress", label: "In Progress" },
              { id: "completed", label: "Completed" },
              { id: "catalog", label: "Browse Catalog" },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  filter === f.id
                    ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          ADMIN CONTROLS RIBBON (Active for Admins)
      ══════════════════════════════════════════════ */}
      {isAdmin && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 text-amber-600 dark:text-amber-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">Admin Mode Active</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300 font-medium">
                  Academic Catalog &amp; Courses Manager
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                You have master access to add courses, edit partner metadata, adjust syllabi, and manage curriculum offerings across the academy.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleOpenCreateCourse}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-medium transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New Course</span>
            </button>
            <Link
              href="/admin/courses"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-card border border-hairline text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
              <span>Curriculum Builder</span>
            </Link>
          </div>
        </div>
      )}

      {/* Search Input Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by title, partner (Google, HarvardX), skill or language..."
          className="w-full bg-card border border-hairline rounded-2xl pl-10 pr-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all shadow-2xs"
        />
      </div>

      {/* ══════════════════════════════════════════════
          Active Enrolled Tracks List ("My Engineering Curriculum")
      ══════════════════════════════════════════════ */}
      {filter !== "catalog" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-sans text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary" />
              <span>Enrolled Courses</span>
            </h2>
            <span className="text-xs font-mono text-muted-foreground">
              {filteredEnrollments.length} course{filteredEnrollments.length === 1 ? "" : "s"}
            </span>
          </div>

          {!isLoaded ? (
            <DashboardCurriculumSkeleton count={3} />
          ) : filteredEnrollments.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-hairline bg-card/60 p-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto text-primary">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="font-sans text-base sm:text-lg font-semibold text-foreground">
                  {search ? "No courses found" : "No Enrolled Courses Yet"}
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                  {search 
                    ? "Try searching for a different keyword or browse all available courses below."
                    : "You haven't enrolled in any courses yet. Browse the course catalog below to start learning."}
                </p>
              </div>
              {(filter as string) !== "catalog" && enrolledList.length === 0 && (
                <button
                  onClick={() => setFilter("catalog" as any)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <span>Explore Courses</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredEnrollments.map((course: any) => {
                const isExpanded = expandedCourseId === course.id || expandedCourseId === course.slug
                const currCourse = getCurriculumCourseBySlug(course.slug || course.id)
                const fallbackSyllabus = currCourse?.modules?.map((m: any) => ({
                  moduleTitle: m.title,
                  lessons: m.lessons?.map((l: any) => ({
                    title: l.title,
                    completed: false,
                    duration: "25m",
                    id: l.id
                  })) || []
                })) || []
                const syllabus = (syllabusMap[course.id] && syllabusMap[course.id].length > 0)
                  ? syllabusMap[course.id]
                  : (syllabusMap[course.slug] && syllabusMap[course.slug].length > 0)
                  ? syllabusMap[course.slug]
                  : fallbackSyllabus

                // Hydrate with rich Coursera metadata
                const courseraMeta = getCourseraDataForCourse(course.slug || course.id, course.title, course.category)

                return (
                  <div
                    key={course.id}
                    className="rounded-3xl border border-hairline bg-card overflow-hidden shadow-xs hover:border-primary/40 transition-all"
                  >
                    {/* Course Header Bar with Cover Thumbnail & Partner Meta */}
                    <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
                        {/* 16:9 Thumbnail with Credential Ribbon */}
                        <div className="w-full sm:w-44 sm:h-28 h-48 rounded-2xl overflow-hidden shrink-0 bg-stone-100 dark:bg-stone-900 border border-hairline relative">
                          <img
                            src={course.thumbnail || courseraMeta.thumbnail || getCourseImage(course.slug || course.id)}
                            alt={course.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
                          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider">
                            {course.category || "Engineering"}
                          </div>
                          <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[10px] font-mono text-white/95 truncate max-w-[90%]">
                            <GraduationCap className="w-3 h-3 text-amber-400 shrink-0" />
                            <span className="truncate">{courseraMeta.credentialType}</span>
                          </div>
                        </div>

                        <div className="space-y-2 flex-1 min-w-0">
                          {/* Partner Attribution & Difficulty */}
                          <div className="flex items-center justify-between gap-2 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap text-xs">
                              <span className="font-semibold text-primary font-sans">
                                Offered by {courseraMeta.partner}
                              </span>
                              <span className="text-muted-foreground/60">•</span>
                              <span className="text-[10px] font-mono text-muted-foreground uppercase">
                                {courseraMeta.partnerType}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md border border-hairline">
                                {course.difficulty || "Intermediate"}
                              </span>
                              {course.progressPercent >= 100 ? (
                                <span className="text-xs px-2.5 py-0.5 font-mono flex items-center gap-1.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                                  <Award className="w-3 h-3" /> Graduate (+500 XP)
                                </span>
                              ) : (
                                <span className="text-xs font-mono text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20 font-semibold">
                                  {course.progressPercent ?? 0}% Complete
                                </span>
                              )}
                            </div>
                          </div>

                          <Link
                            href={`/courses/${course.slug || course.id}`}
                            className="block font-sans text-base sm:text-lg font-bold text-foreground leading-snug hover:text-primary transition-colors"
                          >
                            {course.title}
                          </Link>

                          {/* Social Proof + Duration */}
                          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono text-muted-foreground">
                            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold shrink-0">
                              <Star className="h-3.5 w-3.5 fill-current" />
                              <span>{courseraMeta.rating.toFixed(1)}</span>
                            </div>
                            <span>•</span>
                            <span className="text-[11px]">{courseraMeta.ratingCount}</span>
                            <span>•</span>
                            <span className="text-[11px] flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{course.duration || "Self-Paced"}</span>
                            </span>
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-1.5 max-w-md pt-1">
                            <div className="flex justify-between text-xs font-mono text-muted-foreground">
                              <span>{course.lessonsCompleted ?? course.completedLessons ?? 0} / {course.totalLessons ?? 12} Lessons Completed</span>
                              <span className="text-primary font-bold">{course.progressPercent ?? 0}%</span>
                            </div>
                            <div className="w-full h-2 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-primary via-emerald-600 to-teal-500 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${course.progressPercent ?? 0}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Controls */}
                      <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center flex-wrap">
                        <button
                          onClick={() => setExpandedCourseId(isExpanded ? null : (course.id || course.slug))}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-hairline bg-secondary text-xs font-medium text-foreground hover:bg-card transition-colors cursor-pointer"
                        >
                          <span>{isExpanded ? "Hide Syllabus" : "View Syllabus"}</span>
                          {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                        </button>

                        <Link
                          href={`/courses/${course.slug || course.id || "dsa"}/learn`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all cursor-pointer active:scale-95"
                        >
                          <PlayCircle className="w-4 h-4" />
                          <span>Continue</span>
                        </Link>

                        {/* Admin Inline Edit on Enrolled Course */}
                        {isAdmin && (
                          <button
                            onClick={() => handleOpenEditCourse(course)}
                            className="inline-flex items-center gap-1 p-2 rounded-xl border border-hairline bg-secondary hover:bg-card text-foreground text-xs transition-colors cursor-pointer"
                            title="Edit Course Details (Admin)"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-primary" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Expandable Detailed Syllabus Tree */}
                    {isExpanded && (
                      <div className="border-t border-hairline bg-secondary/50 p-6 sm:p-7 space-y-6 animate-fadeIn">
                        <div className="flex items-center justify-between pb-3 border-b border-hairline">
                          <h4 className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
                            Course Modules &amp; Lessons
                          </h4>
                          <span className="text-xs font-mono text-muted-foreground">
                            Auto-saves your progress
                          </span>
                        </div>

                        {syllabus.length > 0 ? (
                          <div className="space-y-5">
                            {syllabus.map((mod: any, mi: number) => (
                              <div key={mi} className="rounded-xl border border-hairline bg-card p-5 space-y-3">
                                <div className="flex items-center justify-between">
                                  <h5 className="font-sans text-sm sm:text-base font-semibold text-foreground">
                                    {mod.moduleTitle}
                                  </h5>
                                  <span className="text-[11px] font-mono text-muted-foreground">
                                    {mod.lessons.filter((l: any) => l.completed).length} / {mod.lessons.length} Completed
                                  </span>
                                </div>

                                <div className="divide-y divide-hairline/60">
                                  {mod.lessons.map((lesson: any, li: number) => (
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
                                          href={`/courses/${course.slug || course.id || "dsa"}/learn`}
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
          Catalog Exploration & Specialization Tracks (Identical to Home Page)
      ══════════════════════════════════════════════ */}
      {(filter === "catalog" || filter === "all") && (
        <div id="available-catalog-tracks" className="space-y-6 pt-6 border-t border-hairline scroll-mt-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-primary uppercase tracking-widest font-semibold mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Course Catalog</span>
              </div>
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
                Explore Courses &amp; Tracks
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Showing {filteredCatalogTracks.length === 0 ? 0 : (catalogPage - 1) * catalogItemsPerPage + 1}–{Math.min(catalogPage * catalogItemsPerPage, filteredCatalogTracks.length)} of {filteredCatalogTracks.length} courses
              </p>
            </div>
            <div className="flex items-center gap-3">
              {isAdmin && (
                <button
                  onClick={handleOpenCreateCourse}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-primary text-primary-foreground text-xs font-medium hover:bg-primary-active transition-all cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Course</span>
                </button>
              )}
              <Link
                href="/programs"
                className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Catalog Category Pills */}
          <div className="flex overflow-x-auto no-scrollbar gap-1.5 pb-1 -mx-2 px-2">
            {[
              "All",
              "AI & ML",
              "Data Science",
              "Cybersecurity",
              "Languages & Web",
              "Programming",
              "Web Development",
              "Git & DevOps",
              "Cloud & Infra",
              "DSA",
              "Backend",
            ].map((cat) => {
              const isActive = catalogCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setCatalogCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                      : "bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 border border-hairline"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {!isLoaded ? (
            <CourseGridSkeleton count={catalogItemsPerPage} />
          ) : paginatedCatalogTracks.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-hairline bg-card/60 p-10 text-center space-y-2">
              <h3 className="font-sans text-base sm:text-lg font-semibold text-foreground">No courses match your filter</h3>
              <p className="text-xs text-muted-foreground">Try selecting a different category or clearing your search.</p>
              <button
                onClick={() => { setCatalogCategory("All"); setSearch(""); }}
                className="mt-2 text-xs font-semibold text-primary hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            /* ══════════════════════════════════════════════
               Authentic Coursera-Style Card Grid (Home Page Consistency)
            ══════════════════════════════════════════════ */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedCatalogTracks.map((track) => {
                const trackSlug = track.slug || track.id
                const isEnrolled = enrolledList.some(
                  (e: any) => e.id === track.id || e.slug === track.id || e.slug === trackSlug || e.id === trackSlug
                )
                const data = track.courseraData || getCourseraDataForCourse(trackSlug, track.title, track.category)
                const trackImg = track.thumbnail_url || data.thumbnail || getCourseImage(trackSlug)

                return (
                  <div
                    key={track.id || trackSlug}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-hairline bg-card transition-all duration-300 ease-out hover:-translate-y-1.5 shadow-xs hover:shadow-xl hover:border-primary/40"
                  >
                    <div>
                      {/* 16:9 Cover Thumbnail */}
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
                        <img
                          src={trackImg}
                          alt={track.title}
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent pointer-events-none" />

                        {/* Top-Left Category Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <span className="inline-flex items-center rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-bold text-foreground border border-hairline uppercase tracking-wider shadow-2xs">
                            {track.category}
                          </span>
                        </div>

                        {/* Top-Right Difficulty & Wishlist */}
                        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
                          <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-medium text-white shadow-xs">
                            {track.difficulty || track.level || "Intermediate"}
                          </span>
                          <WishlistButton
                            course={{
                              id: track.id,
                              slug: trackSlug,
                              title: track.title,
                              category: track.category,
                              level: track.level || track.difficulty,
                              duration: track.duration || track.weeks,
                              href: `/courses/${trackSlug}`,
                              thumbnail: trackImg,
                            }}
                            variant="icon"
                            className="h-7 w-7 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-amber-400 shadow-xs"
                          />
                        </div>

                        {/* Bottom Floating Credential Ribbon */}
                        <div className="absolute left-3 bottom-2.5 z-10 flex items-center gap-1.5 text-[11px] font-mono font-semibold text-white/95 drop-shadow-sm truncate max-w-[90%]">
                          <GraduationCap className="h-3.5 w-3.5 text-amber-400 shrink-0" />
                          <span className="truncate">{data.credentialType} · {track.modules || 4} Modules</span>
                        </div>
                      </div>

                      {/* Card Body */}
                      <div className="p-5 space-y-3">
                        {/* Partner Attribution Line */}
                        <div className="flex items-center justify-between gap-2 text-xs">
                          <span className="font-semibold text-primary truncate max-w-[210px] font-sans">
                            Offered by {data.partner}
                          </span>
                          <span className="text-[10px] font-mono text-muted-foreground uppercase shrink-0">
                            {data.partnerType}
                          </span>
                        </div>

                        {/* Title */}
                        <Link
                          href={`/courses/${trackSlug}`}
                          className="block group-hover:text-primary transition-colors"
                        >
                          <h3 className="font-sans text-base font-semibold text-foreground line-clamp-1 leading-snug">
                            {track.title}
                          </h3>
                        </Link>

                        {/* Rating & Learners */}
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                          <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold shrink-0">
                            <Star className="h-3.5 w-3.5 fill-current" />
                            <span>{data.rating.toFixed(1)}</span>
                          </div>
                          <span>•</span>
                          <span className="text-[11px]">{data.ratingCount}</span>
                          <span>•</span>
                          <span className="text-[11px] text-foreground/80 font-medium">{data.enrolledCount}</span>
                        </div>

                        {/* Duration */}
                        <div className="text-[11px] font-mono text-muted-foreground flex items-center gap-1.5">
                          <Clock className="h-3 w-3 text-muted-foreground/70" />
                          <span>{track.duration || track.weeks || "6 Weeks"} · Self-Paced</span>
                        </div>

                        {/* Description */}
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {track.desc || track.description}
                        </p>

                        {/* Skills Chips */}
                        {data.skills && data.skills.length > 0 && (
                          <div className="pt-1 flex flex-wrap items-center gap-1.5">
                            {data.skills.slice(0, 3).map((skill: string, sIdx: number) => (
                              <span
                                key={sIdx}
                                className="rounded-md bg-secondary/80 border border-hairline px-2 py-0.5 text-[10px] font-mono text-foreground/80 truncate max-w-[130px]"
                              >
                                {skill}
                              </span>
                            ))}
                            {data.skills.length > 3 && (
                              <span className="text-[10px] font-mono text-muted-foreground">
                                +{data.skills.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Action Footer */}
                    <div className="p-4 pt-3 flex items-center justify-between border-t border-hairline mt-auto bg-secondary/30">
                      {isEnrolled ? (
                        <div className="w-full flex items-center gap-2">
                          <Link
                            href={`/courses/${trackSlug}/learn`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                          >
                            <PlayCircle className="w-3.5 h-3.5" />
                            <span>Continue</span>
                          </Link>
                          <Link
                            href={`/courses/${trackSlug}`}
                            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-xs font-medium text-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
                          >
                            <span>Syllabus</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          {isAdmin && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEditCourse(track)}
                                className="p-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground text-xs transition-colors cursor-pointer"
                                title="Edit Course (Admin)"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-primary" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmCourse({ id: track.id || trackSlug, title: track.title })}
                                className="p-2 rounded-xl border border-hairline bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs transition-colors cursor-pointer"
                                title="Delete Course (Admin)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="w-full flex items-center gap-2">
                          <button
                            onClick={() => handleEnroll(track)}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground transition-all text-xs font-semibold cursor-pointer shadow-xs active:scale-[0.98]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Enroll Track</span>
                          </button>
                          <Link
                            href={`/courses/${trackSlug}`}
                            className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-xs font-medium text-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
                          >
                            <span>Explore</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                          {isAdmin && (
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => handleOpenEditCourse(track)}
                                className="p-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground text-xs transition-colors cursor-pointer"
                                title="Edit Course (Admin)"
                              >
                                <Edit3 className="w-3.5 h-3.5 text-primary" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirmCourse({ id: track.id || trackSlug, title: track.title })}
                                className="p-2 rounded-xl border border-hairline bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs transition-colors cursor-pointer"
                                title="Delete Course (Admin)"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Catalog Pagination Controls (3 rows of 3 columns = 9 items per page) */}
          {isLoaded && totalCatalogPages > 1 && (
            <div className="pt-6 pb-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-hairline">
              <div className="text-xs font-mono text-muted-foreground">
                Page {catalogPage} of {totalCatalogPages} ({filteredCatalogTracks.length} total tracks)
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleCatalogPageChange(catalogPage - 1)}
                  disabled={catalogPage <= 1}
                  className={`inline-flex items-center justify-center p-2 rounded-xl border border-hairline text-xs font-medium transition-all ${
                    catalogPage <= 1
                      ? "opacity-30 cursor-not-allowed text-muted-foreground"
                      : "hover:bg-secondary text-foreground cursor-pointer shadow-2xs"
                  }`}
                  aria-label="Previous catalog page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                {catalogPageNumbers.map((page, idx) => {
                  if (typeof page === "string") {
                    return (
                      <span key={`ellipsis-${idx}`} className="px-2 text-xs font-mono text-muted-foreground">
                        {page}
                      </span>
                    )
                  }
                  const isCurrent = page === catalogPage
                  return (
                    <button
                      key={`page-${page}`}
                      onClick={() => handleCatalogPageChange(page)}
                      className={`min-w-9 h-9 px-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                        isCurrent
                          ? "bg-primary text-primary-foreground font-bold shadow-xs"
                          : "border border-hairline hover:bg-secondary text-foreground"
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}

                <button
                  onClick={() => handleCatalogPageChange(catalogPage + 1)}
                  disabled={catalogPage >= totalCatalogPages}
                  className={`inline-flex items-center justify-center p-2 rounded-xl border border-hairline text-xs font-medium transition-all ${
                    catalogPage >= totalCatalogPages
                      ? "opacity-30 cursor-not-allowed text-muted-foreground"
                      : "hover:bg-secondary text-foreground cursor-pointer shadow-2xs"
                  }`}
                  aria-label="Next catalog page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════════════
          Certification & Capstone Readiness Banner
      ══════════════════════════════════════════════ */}
      <div id="dashboard-courses-catalog" className="rounded-3xl border border-hairline bg-card p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4B872]" />
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold">
                Certification Track
              </span>
            </div>
            <h3 className="font-sans text-xl sm:text-2xl font-bold text-foreground">
              Systems Engineer Certification Progress
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Complete your DSA coursework, pass the interactive visualizer challenges, and submit your capstone project to earn your verified certificate.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <AxelStage
              id="dashboard-courses-catalog-anchor"
              sectionId="dashboard-courses-catalog"
              label="Learning Advisor"
              emotion="happy"
              scale={0.44}
              size="sm"
            />
            <div className="flex flex-col sm:items-end gap-2">
              <div className="text-right">
                <span className="font-sans text-3xl font-bold text-primary">{capstoneReadiness}%</span>
                <span className="text-xs text-muted-foreground block font-mono">Certificate Progress</span>
              </div>
              <Link
                href="/results"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <span>View Requirements</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          In-Place Admin Course Editor Modal
      ══════════════════════════════════════════════ */}
      <CourseEditorModal
        isOpen={isEditorModalOpen}
        onClose={() => {
          setIsEditorModalOpen(false)
          setEditingCourse(null)
        }}
        course={editingCourse}
        onSave={handleSaveCourse}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirmCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl border border-hairline bg-card p-6 space-y-4 shadow-2xl text-foreground">
            <div className="w-12 h-12 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-sans text-lg font-semibold text-foreground">
                Delete Course?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Are you sure you want to remove <strong className="text-foreground">{deleteConfirmCourse.title}</strong> from the course catalog? Students will no longer see this course.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmCourse(null)}
                className="px-4 py-2 rounded-xl border border-hairline bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteCourse}
                disabled={isDeleting}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 transition-all cursor-pointer shadow-xs disabled:opacity-50"
              >
                {isDeleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                <span>Delete Course</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
