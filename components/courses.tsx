"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, Code2, Server, Layers, Globe, Cloud, Zap, Braces, Clock,
  BarChart3, BookOpen, TerminalSquare, BrainCircuit, ShieldCheck, GitBranch,
  Award, Search, Star, Filter, LayoutGrid, List, Users, CheckCircle2,
  X, ChevronDown, Check, ChevronLeft, ChevronRight, Rows3, Plus, PlayCircle
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"
import { getCourseraDataForCourse, CourseraExtraData } from "@/lib/coursera-metadata"
import { EnrollModal } from "@/components/enroll-modal"
import { TechLogo } from "@/components/tech-logo"
import { WishlistButton } from "@/components/courses/wishlist-button"
import { useWishlist, useEnrollments } from "@/lib/user-learning-store"
import { EmptyBook3DIcon } from "@/components/icons"
import { CareerRoleShelf } from "@/components/courses/career-role-shelf"
import { CAREER_ROLE_TRACKS, CareerRoleTrack } from "@/lib/career-roles-data"

const categories = [
  "All",
  "Enrolled",
  "Wishlist",
  "AI & ML",
  "Data Science",
  "Cybersecurity",
  "Languages & Web",
  "Web Development",
  "Programming",
  "Git & DevOps",
  "Cloud & Infra",
  "DSA",
  "Backend"
]

const credentialTypes = ["All Types", "Specialization", "Professional Certificate", "Course"]
const difficultyLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
const partnerOptions = [
  "All Partners",
  "Google",
  "DeepLearning.AI",
  "IBM",
  "Microsoft",
  "HarvardX",
  "Linux Foundation",
  "Vercel",
  "ASCI Institute"
]

interface CourseType {
  id: string
  title: string
  description: string
  is_premium?: boolean
  category?: string
  level?: string
  weeks?: string
  lessons?: number
  modules?: number
  projects?: number
  certificate?: string
  slug?: string
  tools?: string[]
  icon?: React.ComponentType<{ className?: string }>
  courseraData: CourseraExtraData
}

function getCategoryIcon(category?: string) {
  switch (category) {
    case "Web Development":
      return Globe
    case "AI & ML":
      return BrainCircuit
    case "Data Science":
      return BarChart3
    case "Git & DevOps":
      return GitBranch
    case "Cybersecurity":
      return ShieldCheck
    case "Cloud & Infra":
      return Cloud
    case "DSA":
      return Braces
    case "Backend":
      return Server
    default:
      return TerminalSquare
  }
}

const BASE_COURSES: CourseType[] = CURRICULUM_COURSES.map(c => ({
  id: c.id,
  title: c.title,
  description: c.description,
  category: c.category,
  level: c.level,
  weeks: c.weeks,
  lessons: c.lessons,
  modules: Math.max(3, Math.ceil(c.lessons / 4)),
  projects: c.projects,
  certificate: c.certificate,
  is_premium: c.is_premium,
  slug: c.slug,
  tools: c.tools,
  icon: getCategoryIcon(c.category),
  courseraData: getCourseraDataForCourse(c.slug, c.title, c.category)
}))

interface CoursesProps {
  hideHeader?: boolean
  className?: string
}

export function Courses({ hideHeader = false, className = "" }: CoursesProps = {}) {
  const [filter, setFilter] = useState("All")
  const [credentialFilter, setCredentialFilter] = useState("All Types")
  const [difficultyFilter, setDifficultyFilter] = useState("All Levels")
  const [partnerFilter, setPartnerFilter] = useState("All Partners")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"pathways" | "grid" | "list">("pathways")
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "newest">("popular")
  const [courses, setCourses] = useState<CourseType[]>(BASE_COURSES)
  const { profile } = useAuth()
  const userTier = profile?.subscription_tier || null
  const { isSaved, count: wishlistCount } = useWishlist()
  const { isEnrolled, getEnrollment, enroll, count: enrolledCount } = useEnrollments()

  // Enrollment modal state
  const [activeEnrollCourse, setActiveEnrollCourse] = useState<{
    title: string
    slug: string
    partner: string
  } | null>(null)

  // Filtering & Sorting
  const filtered = useMemo(() => {
    return courses.filter((course) => {
      // Category filter
      if (filter === "Enrolled") {
        const s = course.slug || course.id
        if (!isEnrolled(s)) return false
      } else if (filter === "Wishlist") {
        const s = course.slug || course.id
        if (!isSaved(s)) return false
      } else if (filter === "Languages & Web") {
        const s = (course.slug || course.id).toLowerCase()
        const isLangOrWeb =
          s === "c" ||
          s === "cpp" ||
          s === "webdev" ||
          s === "html" ||
          s === "css" ||
          s === "javascript" ||
          s === "java" ||
          s === "python" ||
          s === "typescript" ||
          s === "react" ||
          s === "sql" ||
          s === "git" ||
          course.category === "Web Development" ||
          course.category === "Programming"
        if (!isLangOrWeb) return false
      } else if (filter !== "All" && course.category !== filter) {
        return false
      }

      // Credential type filter
      if (credentialFilter !== "All Types") {
        if (course.courseraData.credentialType !== credentialFilter) return false
      }

      // Difficulty level filter
      if (difficultyFilter !== "All Levels") {
        if (course.level !== difficultyFilter) return false
      }

      // Partner filter
      if (partnerFilter !== "All Partners") {
        if (!course.courseraData.partner.toLowerCase().includes(partnerFilter.toLowerCase())) return false
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim()
        const slug = (course.slug || course.id).toLowerCase()
        const slugMatch = slug === query || slug.includes(query)
        const titleMatch = course.title.toLowerCase().includes(query)
        const descMatch = course.description.toLowerCase().includes(query)
        const partnerMatch = course.courseraData.partner.toLowerCase().includes(query)
        const skillMatch = course.courseraData.skills.some(s => s.toLowerCase().includes(query))
        const toolMatch = course.tools?.some(t => t.toLowerCase().includes(query))
        if (!slugMatch && !titleMatch && !descMatch && !partnerMatch && !skillMatch && !toolMatch) return false
      }

      return true
    }).sort((a, b) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const aExact = (a.slug || a.id).toLowerCase() === q || a.title.toLowerCase().startsWith(q)
        const bExact = (b.slug || b.id).toLowerCase() === q || b.title.toLowerCase().startsWith(q)
        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1
      }
      if (sortBy === "rating") {
        return b.courseraData.rating - a.courseraData.rating
      }
      return 0
    })
  }, [courses, filter, credentialFilter, difficultyFilter, partnerFilter, searchQuery, sortBy, isSaved, isEnrolled])

  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, cat) => {
      if (cat === "All") {
        acc[cat] = courses.length
      } else if (cat === "Enrolled") {
        acc[cat] = enrolledCount
      } else if (cat === "Wishlist") {
        acc[cat] = wishlistCount
      } else if (cat === "Languages & Web") {
        acc[cat] = courses.filter((c) => {
          const s = (c.slug || c.id).toLowerCase()
          return (
            s === "c" ||
            s === "cpp" ||
            s === "webdev" ||
            s === "html" ||
            s === "css" ||
            s === "javascript" ||
            s === "java" ||
            s === "python" ||
            s === "typescript" ||
            s === "react" ||
            s === "sql" ||
            s === "git" ||
            c.category === "Web Development" ||
            c.category === "Programming"
          )
        }).length
      } else {
        acc[cat] = courses.filter((c) => c.category === cat).length
      }
      return acc
    }, {} as Record<string, number>)
  }, [courses, enrolledCount, wishlistCount])

  // Filter Career Role Tracks for horizontal shelf view
  const filteredTracks = useMemo(() => {
    return CAREER_ROLE_TRACKS.map((track) => {
      // Role category match
      if (filter === "AI & ML" && track.roleCategory !== "AI & ML") return null
      if (filter === "Data Science" && track.roleCategory !== "Data Science") return null
      if (filter === "Cybersecurity" && track.roleCategory !== "Cybersecurity") return null
      if (
        (filter === "Web Development" || filter === "Languages & Web" || filter === "Programming") &&
        track.roleCategory !== "Web Development"
      ) {
        return null
      }
      if (filter === "DSA" && track.id !== "full-stack-web-architect") return null
      if (filter === "Enrolled") {
        const enrolledCourses = track.courses.filter((course) => isEnrolled(course.slug || course.id))
        if (enrolledCourses.length === 0) return null
        return { ...track, courses: enrolledCourses }
      }
      if (filter === "Wishlist") {
        const wishlistCourses = track.courses.filter((course) => isSaved(course.slug || course.id))
        if (wishlistCourses.length === 0) return null
        return { ...track, courses: wishlistCourses }
      }

      // Filter courses within this track
      const matchingCourses = track.courses.filter((course) => {
        if (credentialFilter !== "All Types") {
          if (!course.credential.toLowerCase().includes(credentialFilter.toLowerCase())) return false
        }
        if (difficultyFilter !== "All Levels") {
          if (course.level !== difficultyFilter) return false
        }
        if (partnerFilter !== "All Partners") {
          if (!course.partner.toLowerCase().includes(partnerFilter.toLowerCase())) return false
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim()
          const titleMatch = course.title.toLowerCase().includes(q)
          const partnerMatch = course.partner.toLowerCase().includes(q)
          const descMatch = course.description.toLowerCase().includes(q)
          const skillMatch = course.skills.some((s) => s.toLowerCase().includes(q))
          if (!titleMatch && !partnerMatch && !descMatch && !skillMatch) return false
        }
        return true
      })

      if (matchingCourses.length === 0) return null

      return {
        ...track,
        courses: matchingCourses
      }
    }).filter((t): t is CareerRoleTrack => t !== null)
  }, [filter, credentialFilter, difficultyFilter, partnerFilter, searchQuery, isSaved, isEnrolled])

  const hasActiveFilters = filter !== "All" || credentialFilter !== "All Types" || difficultyFilter !== "All Levels" || partnerFilter !== "All Partners" || searchQuery.trim() !== ""

  // Finite pagination & batch browsing (eliminates infinite scroll fatigue)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAll, setShowAll] = useState(false)
  const itemsPerPage = hideHeader ? (viewMode === "grid" ? 12 : 8) : (viewMode === "grid" ? 8 : 6)

  // Reset pagination whenever filters, category tabs, or view modes change
  useEffect(() => {
    setCurrentPage(1)
    setShowAll(false)
  }, [filter, credentialFilter, difficultyFilter, partnerFilter, searchQuery, sortBy, viewMode])

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = Math.min(startIndex + itemsPerPage, filtered.length)

  const paginatedCourses = useMemo(() => {
    if (showAll) return filtered
    return filtered.slice(startIndex, endIndex)
  }, [filtered, startIndex, endIndex, showAll])

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
    const el = document.getElementById("courses-grid-anchor") || document.getElementById("courses")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages]
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }, [currentPage, totalPages])

  const resetAllFilters = () => {
    setFilter("All")
    setCredentialFilter("All Types")
    setDifficultyFilter("All Levels")
    setPartnerFilter("All Partners")
    setSearchQuery("")
  }

  return (
    <section id="courses" className={`relative ${hideHeader ? "py-6 lg:py-10" : "py-16 lg:py-24"} bg-background ${className}`}>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {/* Section Header with Dedicated Axel Stage */}
        {!hideHeader && (
          <div className="relative mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-4 backdrop-blur-xs shadow-xs">
                <BookOpen className="h-3.5 w-3.5" />
                <span className="tracking-widest uppercase font-mono text-[11px]">Course Catalog</span>
              </div>
              <h2
                className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ letterSpacing: "-1.2px" }}
              >
                All Courses &amp; Learning Tracks
              </h2>
              <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Explore <span className="font-semibold text-foreground">{courses.length} practical courses</span> designed to teach you coding, databases, web development, and algorithms step-by-step.
              </p>
            </div>

            {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
            <div className="relative shrink-0 w-64 h-56 flex items-center justify-center self-center lg:self-auto">
              <div
                id="courses-robot-anchor"
                data-axel-anchor="true"
                data-section-id="courses"
                data-emotion="happy"
                data-scale="0.46"
                data-label="Curriculum Catalog"
                className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {hideHeader && (
          <div className="flex items-center justify-between pt-4 pb-2 border-b border-border/40 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Course Catalog</span>
              <h2 className="font-serif text-2xl font-normal text-foreground mt-1">Specializations & Certificates</h2>
            </div>
            <div className="relative shrink-0 w-52 h-40 flex items-center justify-center">
              <div
                id="courses-robot-anchor"
                data-axel-anchor="true"
                data-section-id="courses"
                data-emotion="happy"
                data-scale="0.44"
                data-label="Course Catalog"
                className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {/* Coursera Search & Discovery Control Bar */}
        <div className="mb-6 space-y-4">
          {/* Top Search & View Mode Switcher */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to learn? (e.g., Deep Learning, Python, Kubernetes...)"
                className="w-full rounded-xl border border-hairline bg-card/80 pl-10 pr-9 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-xs transition-[border-color,box-shadow] duration-150"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* View Mode & Sort Switcher */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 rounded-xl border border-hairline bg-card/60 px-3 py-1.5 text-xs text-muted-foreground">
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-foreground font-medium focus:outline-none cursor-pointer"
                >
                  <option value="popular" className="bg-card text-foreground">Most Popular</option>
                  <option value="rating" className="bg-card text-foreground">Highest Rated</option>
                  <option value="newest" className="bg-card text-foreground">Newest (2026)</option>
                </select>
              </div>

              {/* View Toggle */}
              <div className="inline-flex items-center rounded-xl border border-hairline bg-card/60 p-1">
                <button
                  onClick={() => setViewMode("pathways")}
                  title="Career Role Pathways (Horizontal Shelves)"
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                    viewMode === "pathways"
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Rows3 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Pathways</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  title="Curated Grid View"
                  className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                    viewMode === "grid" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="Detailed List View"
                  className={`rounded-lg p-1.5 transition-colors cursor-pointer ${
                    viewMode === "list" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Filter Tabs (Segmented Capsule with Horizontal Scroll on Mobile) */}
          <div className="flex sm:justify-center overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex flex-nowrap sm:flex-wrap items-center gap-1.5 rounded-2xl border border-hairline bg-secondary/80 p-1.5 backdrop-blur-md shadow-xs shrink-0 sm:shrink">
              {categories.map((cat) => {
                const count = categoryCounts[cat] || 0
                const isActive = filter === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    suppressHydrationWarning
                    className={`group inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-[color,background-color,border-color,box-shadow] duration-150 active:scale-[0.98] cursor-pointer ${
                      isActive
                        ? "bg-card text-foreground border border-hairline shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                    }`}
                  >
                    <span>{cat}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono leading-none transition-colors ${
                        isActive
                          ? "bg-primary/20 text-primary font-bold"
                          : "bg-muted text-muted-foreground group-hover:text-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Secondary Level Filters & Live Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground font-mono text-[11px]">Level:</span>
              <div className="inline-flex items-center gap-1 rounded-xl border border-hairline bg-card/60 p-1">
                {difficultyLevels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setDifficultyFilter(lvl)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                      difficultyFilter === lvl
                        ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-primary underline underline-offset-4 hover:text-foreground cursor-pointer ml-1 font-mono"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Metric Status indicator */}
            <div className="flex items-center gap-2 text-muted-foreground font-mono text-[11px]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ea580c]"></span>
              </span>
              <span>
                {viewMode === "pathways" ? (
                  <>
                    Showing <strong className="text-foreground">{filteredTracks.length}</strong> career {filteredTracks.length === 1 ? "pathway" : "pathways"} ({filteredTracks.reduce((acc, t) => acc + t.courses.length, 0)} courses)
                  </>
                ) : filtered.length > itemsPerPage && !showAll ? (
                  <>
                    Showing <strong className="text-foreground">{startIndex + 1}–{endIndex}</strong> of{" "}
                    <strong className="text-foreground">{filtered.length}</strong> {filtered.length === 1 ? "track" : "tracks"}
                  </>
                ) : (
                  <>
                    Showing <strong className="text-foreground">{filtered.length}</strong> {filtered.length === 1 ? "track" : "tracks"}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Anchor for smooth page jumping */}
        <div id="courses-grid-anchor" className="scroll-mt-28" />

        {/* Feature Cards Grid vs List vs Pathways */}
        {viewMode === "pathways" ? (
          filteredTracks.length === 0 ? (
            <div className="rounded-2xl border border-hairline p-10 sm:p-14 text-center bg-card/40 space-y-4 max-w-xl mx-auto">
              <div className="flex justify-center">
                <EmptyBook3DIcon size="lg" className="hover:scale-105 transition-transform duration-300" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {filter === "Enrolled"
                  ? "You haven't enrolled in any tracks yet. Click 'Enroll Track' on any course card to start learning and track progress."
                  : filter === "Wishlist"
                  ? "Your course wishlist is currently empty. Click the bookmark icon on any course to save it here."
                  : "No career pathway tracks matched your search and filter criteria."}
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-2 inline-flex items-center text-xs text-primary font-medium hover:underline cursor-pointer"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTracks.map((track) => (
                <CareerRoleShelf
                  key={track.id}
                  track={track}
                  userTier={userTier}
                  onQuickEnroll={(course) =>
                    setActiveEnrollCourse({
                      title: course.title,
                      slug: course.slug,
                      partner: course.partner
                    })
                  }
                />
              ))}
            </div>
          )
        ) : filtered.length === 0 ? (
          <div className="rounded-2xl border border-hairline p-10 sm:p-14 text-center bg-card/40 space-y-4 max-w-xl mx-auto">
            <div className="flex justify-center">
              <EmptyBook3DIcon size="lg" className="hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {filter === "Enrolled"
                ? "You haven't enrolled in any tracks yet. Click 'Enroll Track' on any course card to start learning and track progress."
                : filter === "Wishlist"
                ? "Your course wishlist is currently empty. Click the bookmark icon on any course to save it here."
                : "No tracks matched your search and filter criteria."}
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-2 inline-flex items-center text-xs text-primary font-medium hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Course Grid View (Finite Paginated Batch) */
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {paginatedCourses.map((course) => (
              <CourseGridCard
                key={course.id || course.slug}
                course={course}
                userTier={userTier}
                onQuickEnroll={() =>
                  setActiveEnrollCourse({
                    title: course.title,
                    slug: course.slug || course.id,
                    partner: course.courseraData.partner
                  })
                }
              />
            ))}
          </div>
        ) : (
          /* Course Detailed List View (Finite Paginated Batch) */
          <div className="space-y-4">
            {paginatedCourses.map((course) => (
              <CourseListCard
                key={course.id || course.slug}
                course={course}
                userTier={userTier}
                onQuickEnroll={() =>
                  setActiveEnrollCourse({
                    title: course.title,
                    slug: course.slug || course.id,
                    partner: course.courseraData.partner
                  })
                }
              />
            ))}
          </div>
        )}

        {/* Pagination Bar (finite browsing with smooth page flip - only for Grid/List views) */}
        {viewMode !== "pathways" && filtered.length > itemsPerPage && !showAll && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-hairline pt-6">
            {/* Range Indicator & Progress */}
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <span>
                Page <strong className="text-foreground">{currentPage}</strong> of{" "}
                <strong className="text-foreground">{totalPages}</strong> ({filtered.length} total)
              </span>
              <div className="hidden sm:block w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-[width] duration-300 will-change-[width]"
                  style={{ width: `${(endIndex / filtered.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center gap-1.5 flex-wrap justify-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-hairline bg-card hover:bg-secondary text-xs font-medium text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              {pageNumbers.map((p, idx) => {
                if (p === "...") {
                  return (
                    <span key={`dots-${idx}`} className="px-1.5 text-xs text-muted-foreground font-mono">
                      ...
                    </span>
                  )
                }
                const isCurrent = p === currentPage
                return (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p as number)}
                    className={`h-8 w-8 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer ${
                      isCurrent
                        ? "bg-primary text-primary-foreground font-bold shadow-2xs"
                        : "border border-hairline bg-card hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                    aria-label={`Go to page ${p}`}
                    aria-current={isCurrent ? "page" : undefined}
                  >
                    {p}
                  </button>
                )
              })}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-hairline bg-card hover:bg-secondary text-xs font-medium text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                aria-label="Next page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              {/* Show All Toggle Button */}
              <button
                onClick={() => setShowAll(true)}
                className="ml-2 text-xs font-mono text-primary hover:underline cursor-pointer"
              >
                View all ({filtered.length})
              </button>
            </div>
          </div>
        )}

        {/* If user toggled View All, allow collapsing back to paginated */}
        {viewMode !== "pathways" && showAll && filtered.length > itemsPerPage && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => {
                setShowAll(false)
                setCurrentPage(1)
                const el = document.getElementById("courses-grid-anchor") || document.getElementById("courses")
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-xs font-medium text-foreground transition-colors cursor-pointer shadow-2xs"
            >
              <span>Collapse to Paginated View ({itemsPerPage} per page)</span>
            </button>
          </div>
        )}

        {/* Institutional Curriculum Directory Discovery Card (Homepage Only) */}
        {!hideHeader && (
          <div className="mt-10 rounded-2xl border border-hairline bg-secondary/60 dark:bg-[#181715]/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold">
                Complete Academic Directory
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground">
                Looking for a specific technology or specialization?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl leading-relaxed">
                Browse all {courses.length} verified engineering tracks, interactive web primers, and DSA visual challenge modules in our full catalog.
              </p>
            </div>
            <Link
              href="/programs"
              className="shrink-0 inline-flex items-center gap-2 rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground px-6 py-3 text-xs font-semibold tracking-tight transition-all duration-200 shadow-xs cursor-pointer"
            >
              <span>Explore All {courses.length} Programs</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Interactive Enrollment Modal */}
      {activeEnrollCourse && (
        <EnrollModal
          isOpen={!!activeEnrollCourse}
          onClose={() => setActiveEnrollCourse(null)}
          courseTitle={activeEnrollCourse.title}
          courseSlug={activeEnrollCourse.slug}
          partnerName={activeEnrollCourse.partner}
          firstLessonHref={
            activeEnrollCourse.slug
              ? `/courses/${activeEnrollCourse.slug}/learn`
              : "/courses"
          }
        />
      )}
    </section>
  )
}

function getCourseHref(courseSlug: string, isPremiumLocked?: boolean): string {
  if (Boolean(isPremiumLocked)) return "/pricing"
  if (courseSlug === "java") return "/programs/java"
  if (courseSlug === "java-intermediate") return "/programs/java-intermediate"
  if (courseSlug === "java-advanced") return "/programs/java-advanced"
  if (courseSlug === "python" || courseSlug === "python-master") return "/programs/python"
  if (courseSlug === "c") return "/programs/c"
  if (courseSlug === "cpp") return "/programs/cpp"
  if (courseSlug === "webdev") return "/programs/webdev"
  if (courseSlug === "html") return "/programs/html"
  if (courseSlug === "css") return "/programs/css"
  if (courseSlug === "javascript") return "/programs/javascript"
  if (courseSlug === "dsa-custom") return "/programs/dsa"
  if (courseSlug === "dsa-intermediate") return "/programs/dsa-intermediate"
  if (courseSlug === "dsa-advanced") return "/programs/dsa-advanced"
  return `/courses/${courseSlug}`
}

/* -------------------------------------------------------------
   Course Grid Card Component (Dashboard 3D-Card Design & Connected)
------------------------------------------------------------- */
function CourseGridCard({
  course,
  userTier,
  onQuickEnroll
}: {
  course: CourseType
  userTier: string | null
  onQuickEnroll: () => void
}) {
  const { isEnrolled, getEnrollment, enroll } = useEnrollments()
  const isPremiumLocked = course.is_premium && userTier !== "architect"
  const courseSlug = course.slug || course.id
  const href = getCourseHref(courseSlug, isPremiumLocked)
  const data = course.courseraData
  const enrolled = isEnrolled(courseSlug)
  const enrolledData = getEnrollment(courseSlug)
  const lessonHref = `/programs/${courseSlug}/course`

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    enroll({
      id: course.id,
      slug: courseSlug,
      title: course.title,
      category: course.category,
      difficulty: course.level,
      modules: course.modules || 4,
      duration: course.weeks || "6 Weeks",
      thumbnail: data.thumbnail,
      progressPercent: 0,
      lessonsCompleted: 0,
      totalLessons: (course.modules || 4) * 3,
    })
    onQuickEnroll()
  }

  return (
    <div className="course-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200/80 dark:border-stone-800/80 bg-card hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 shadow-xs hover:shadow-md will-change-[transform]">
      <div>
        {/* 16:9 Thumbnail Image Cover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
          <Image
            src={data.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          {/* Top-Left Category Pill (Dashboard Style) */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-foreground border border-stone-200/60 dark:border-stone-700/60 uppercase tracking-wider shadow-2xs select-none">
              {course.category}
            </span>
          </div>

          {/* Top-Right Level Badge & Wishlist Bookmark */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono font-medium text-white shadow-xs select-none">
              {course.level}
            </span>
            <WishlistButton
              course={{
                id: course.id,
                slug: courseSlug,
                title: course.title,
                category: course.category,
                level: course.level,
                duration: course.weeks,
                href: href,
                thumbnail: data.thumbnail
              }}
              variant="icon"
              className="h-6 w-6 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-amber-400 shadow-xs active:scale-95 transition-transform"
            />
          </div>
        </div>

        {/* Card Details Body (Dashboard Style) */}
        <div className="p-5 space-y-2.5">
          {/* Eyebrow: Partner/Modules & Rating */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span className="truncate max-w-[200px] font-semibold text-primary text-[11px] tracking-wide uppercase">
              {data.partner || `${course.modules || 4} Modules`}
            </span>
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold shrink-0">
              <Star className="h-3 w-3 fill-current" />
              <span>{data.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={href} className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            <h3 className="font-serif text-lg font-medium text-foreground line-clamp-2 leading-snug">
              {course.title}
            </h3>
          </Link>

          {/* Modules & Duration */}
          <div className="text-[11px] font-mono text-muted-foreground">
            <span>{course.modules || 4} Modules · {course.weeks || "6 Weeks"}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {course.description}
          </p>

          {/* Live Progress Bar if Enrolled */}
          {enrolled && (
            <div className="pt-2 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{enrolledData?.lessonsCompleted ?? 0} / {enrolledData?.totalLessons ?? ((course.modules || 4) * 3)} Lessons</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">{enrolledData?.progressPercent ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${enrolledData?.progressPercent ?? 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer: Only Action Button and Explore */}
      <div className="p-4 pt-3 flex items-center justify-between border-t border-stone-100 dark:border-stone-800/80 mt-auto">
        {enrolled ? (
          <div className="w-full flex items-center gap-2">
            <Link
              href={lessonHref}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-semibold shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Continue</span>
            </Link>
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-secondary/50 hover:bg-secondary text-xs font-medium text-foreground hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer active:scale-[0.98] shrink-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="w-full flex items-center gap-2">
            <button
              onClick={handleEnrollClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all text-xs font-semibold cursor-pointer shadow-2xs active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll Track</span>
            </button>
            <Link
              href={href}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-secondary/50 hover:bg-secondary text-xs font-medium text-foreground hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer active:scale-[0.98] shrink-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------
   Course Detailed List Card Component (Dashboard 3D-Card Design & Connected)
------------------------------------------------------------- */
function CourseListCard({
  course,
  userTier,
  onQuickEnroll
}: {
  course: CourseType
  userTier: string | null
  onQuickEnroll: () => void
}) {
  const { isEnrolled, getEnrollment, enroll } = useEnrollments()
  const isPremiumLocked = course.is_premium && userTier !== "architect"
  const courseSlug = course.slug || course.id
  const href = getCourseHref(courseSlug, isPremiumLocked)
  const data = course.courseraData
  const enrolled = isEnrolled(courseSlug)
  const enrolledData = getEnrollment(courseSlug)
  const lessonHref = `/programs/${courseSlug}/course`

  const handleEnrollClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    enroll({
      id: course.id,
      slug: courseSlug,
      title: course.title,
      category: course.category,
      difficulty: course.level,
      modules: course.modules || 4,
      duration: course.weeks || "6 Weeks",
      thumbnail: data.thumbnail,
      progressPercent: 0,
      lessonsCompleted: 0,
      totalLessons: (course.modules || 4) * 3,
    })
    onQuickEnroll()
  }

  return (
    <div className="course-card group relative flex flex-col sm:flex-row overflow-hidden rounded-3xl border border-stone-200/80 dark:border-stone-800/80 bg-card hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 shadow-xs hover:shadow-md will-change-[transform]">
      {/* Left Thumbnail Cover */}
      <div className="relative aspect-video sm:aspect-square sm:w-60 md:w-64 shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-900">
        <Image
          src={data.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, 256px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-foreground border border-stone-200/60 dark:border-stone-700/60 uppercase tracking-wider shadow-2xs select-none">
            {course.category}
          </span>
        </div>

        {/* Level Badge & Wishlist Button */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono font-medium text-white shadow-xs select-none">
            {course.level}
          </span>
          <WishlistButton
            course={{
              id: course.id,
              slug: courseSlug,
              title: course.title,
              category: course.category,
              level: course.level,
              duration: course.weeks,
              href: href,
              thumbnail: data.thumbnail
            }}
            variant="icon"
            className="h-6 w-6 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-amber-400 shadow-xs active:scale-95 transition-transform"
          />
        </div>
      </div>

      {/* Right Course Content */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Eyebrow: Partner & Credential Type */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1.5">
            <span className="font-semibold text-primary">
              {data.partner}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground uppercase">
              {course.category} · {data.credentialType}
            </span>
          </div>

          {/* Title */}
          <Link href={href} className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-foreground leading-snug">
              {course.title}
            </h3>
          </Link>

          {/* Decision Stats: Modules · Duration · Rating */}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground font-mono">
            <span>{course.modules || 4} Modules</span>
            <span>•</span>
            <span>{course.weeks || "6 Weeks"}</span>
            <span>•</span>
            <div className="flex items-center gap-0.5 text-amber-500 dark:text-amber-400 font-bold">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{data.rating.toFixed(1)}</span>
            </div>
            {course.certificate && (
              <>
                <span>•</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Certificate Included</span>
              </>
            )}
          </div>

          {/* Description */}
          <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {course.description}
          </p>

          {/* Live Progress Bar if Enrolled */}
          {enrolled && (
            <div className="mt-3.5 space-y-1.5 max-w-md">
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{enrolledData?.lessonsCompleted ?? 0} / {enrolledData?.totalLessons ?? ((course.modules || 4) * 3)} Lessons</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">{enrolledData?.progressPercent ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${enrolledData?.progressPercent ?? 0}%` }}
                />
              </div>
            </div>
          )}

          {/* Skills Chips */}
          {data.skills && data.skills.length > 0 && !enrolled && (
            <div className="mt-3.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-mono mr-1">Skills:</span>
              {data.skills.slice(0, 3).map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-secondary border border-hairline px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
                >
                  {skill}
                </span>
              ))}
              {data.skills.length > 3 && (
                <span className="text-[11px] text-muted-foreground font-mono">
                  +{data.skills.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>

        {/* Footer Meta & Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 dark:border-stone-800/80 pt-3.5">
          <div className="text-xs font-mono text-muted-foreground">
            100% Online · Verified Syllabus
          </div>

          <div className="flex items-center gap-2.5">
            {enrolled ? (
              <>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold">
                  <Check className="w-3.5 h-3.5 text-emerald-500" /> Enrolled
                </span>
                <Link
                  href={lessonHref}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Continue Lesson</span>
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleEnrollClick}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 px-4 py-2 text-xs font-semibold text-white shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enroll Track</span>
                </button>
                <Link
                  href={href}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-card hover:bg-secondary px-4 py-2 text-xs font-medium text-foreground transition-colors shadow-2xs active:scale-[0.98]"
                >
                  <span>Explore Syllabus</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
