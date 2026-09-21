"use client"

import { useState, useEffect, useMemo, useTransition } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, Code2, Server, Layers, Globe, Cloud, Zap, Braces, Clock,
  BarChart3, BookOpen, TerminalSquare, BrainCircuit, ShieldCheck, GitBranch,
  Award, Search, Star, Filter, LayoutGrid, List, Users, CheckCircle2,
  X, ChevronDown, Check, ChevronLeft, ChevronRight, Rows3, Plus, PlayCircle, Loader2,
  Sparkles, GraduationCap, Briefcase, ExternalLink, Bookmark, Edit3, Trash2
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { useAdmin } from "@/context/admin-context"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"
import { getCourseraDataForCourse, CourseraExtraData, COURSERA_PARTNERS } from "@/lib/coursera-metadata"
import { EnrollModal } from "@/components/enroll-modal"
import { WishlistButton } from "@/components/courses/wishlist-button"
import { useWishlist, useEnrollments } from "@/lib/user-learning-store"
import { enrollInCourse } from "@/app/actions/courses"
import { EmptyBook3DIcon } from "@/components/icons"
import { CareerRoleShelf } from "@/components/courses/career-role-shelf"
import { CAREER_ROLE_TRACKS, CareerRoleTrack } from "@/lib/career-roles-data"
import { useCoursesStore, UnifiedCourse } from "@/lib/courses-store"
import { CourseEditorModal } from "@/components/courses/course-editor-modal"
import {
  CourseCardSkeleton,
  CourseGridSkeleton,
  CoursePathwaySkeleton,
  CourseListSkeleton,
} from "@/components/courses/courses-skeleton"

const categories = [
  "All",
  "AI & ML",
  "Data Science",
  "Cybersecurity",
  "Web & Full-Stack",
  "Systems & Languages",
  "DSA",
  "Enrolled",
  "Wishlist",
]

const credentialTypes = ["All Types", "Professional Certificate", "Specialization", "Course"]
const difficultyLevels = ["All Levels", "Beginner", "Intermediate", "Advanced"]
const partnerOptions = [
  "All Partners",
  "Google",
  "DeepLearning.AI",
  "IBM",
  "Microsoft",
  "HarvardX",
  "Anthropic",
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
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"pathways" | "grid" | "list">("pathways")
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "newest">("popular")
  const { courses: storeCourses, isLoaded, addCourse, updateCourse, deleteCourse } = useCoursesStore()
  const [isPending, startTransition] = useTransition()

  const courses = useMemo<CourseType[]>(() => {
    const source = storeCourses && storeCourses.length > 0 ? storeCourses : BASE_COURSES
    return source.map((c) => ({
      ...c,
      icon: getCategoryIcon(c.category),
    })) as CourseType[]
  }, [storeCourses])

  const [isEditorModalOpen, setIsEditorModalOpen] = useState(false)
  const [editingCourse, setEditingCourse] = useState<UnifiedCourse | null>(null)
  const [deleteConfirmCourse, setDeleteConfirmCourse] = useState<{ id: string; title: string } | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleOpenCreateCourse = () => {
    setEditingCourse(null)
    setIsEditorModalOpen(true)
  }

  const handleOpenEditCourse = (course: CourseType) => {
    setEditingCourse(course as unknown as UnifiedCourse)
    setIsEditorModalOpen(true)
  }

  const handleSaveCourse = async ({ isNew, course }: { isNew: boolean; course: any }) => {
    if (isNew) {
      await addCourse(course)
    } else {
      const targetKey = editingCourse?.id || editingCourse?.slug || course.slug
      await updateCourse(targetKey, course)
    }
  }

  const handleDeleteCourse = async () => {
    if (!deleteConfirmCourse) return
    setIsDeleting(true)
    try {
      await deleteCourse(deleteConfirmCourse.id)
      setDeleteConfirmCourse(null)
    } catch (err) {
      console.warn("Error deleting course:", err)
    } finally {
      setIsDeleting(false)
    }
  }

  const [navigatingSlug, setNavigatingSlug] = useState<string | null>(null)
  const { profile } = useAuth()
  const { isAdmin } = useAdmin()
  const userTier = profile?.subscription_tier || null
  const { isSaved, count: wishlistCount } = useWishlist()
  const { isEnrolled, getEnrollment, enroll, count: enrolledCount } = useEnrollments()

  const activeFilterCount =
    (credentialFilter !== "All Types" ? 1 : 0) +
    (difficultyFilter !== "All Levels" ? 1 : 0) +
    (partnerFilter !== "All Partners" ? 1 : 0)

  const handleFilterSelect = (cat: string) => {
    if (filter === cat) return
    startTransition(() => {
      setFilter(cat)
    })
  }

  const handleCredentialSelect = (val: string) => {
    startTransition(() => {
      setCredentialFilter(val)
    })
  }

  const handleDifficultySelect = (val: string) => {
    startTransition(() => {
      setDifficultyFilter(val)
    })
  }

  const handlePartnerSelect = (val: string) => {
    startTransition(() => {
      setPartnerFilter(val)
    })
  }

  const handleSortSelect = (val: any) => {
    startTransition(() => {
      setSortBy(val)
    })
  }

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
      } else if (filter === "Web & Full-Stack") {
        const s = (course.slug || course.id).toLowerCase()
        const isWeb =
          s === "webdev" || s === "html" || s === "css" || s === "javascript" ||
          s === "react" || course.category === "Web Development"
        if (!isWeb) return false
      } else if (filter === "Systems & Languages") {
        const s = (course.slug || course.id).toLowerCase()
        const isSys =
          s === "c" || s === "cpp" || s === "python" || s === "java" ||
          s === "typescript" || s === "sql" || course.category === "Programming" || course.category === "Backend"
        if (!isSys) return false
      } else if (filter === "DSA") {
        const s = (course.slug || course.id).toLowerCase()
        if (course.category !== "DSA" && !s.includes("dsa") && !s.includes("algorithm")) return false
      } else if (filter === "Cybersecurity") {
        if (course.category !== "Cybersecurity" && course.category !== "Cloud & Infra" && course.category !== "Git & DevOps") return false
      } else if (filter !== "All") {
        if (course.category !== filter) return false
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
      } else if (cat === "Web & Full-Stack") {
        acc[cat] = courses.filter((c) => {
          const s = (c.slug || c.id).toLowerCase()
          return s === "webdev" || s === "html" || s === "css" || s === "javascript" || s === "react" || c.category === "Web Development"
        }).length
      } else if (cat === "Systems & Languages") {
        acc[cat] = courses.filter((c) => {
          const s = (c.slug || c.id).toLowerCase()
          return s === "c" || s === "cpp" || s === "python" || s === "java" || s === "typescript" || s === "sql" || c.category === "Programming" || c.category === "Backend"
        }).length
      } else if (cat === "DSA") {
        acc[cat] = courses.filter((c) => c.category === "DSA" || (c.slug || "").includes("dsa")).length
      } else if (cat === "Cybersecurity") {
        acc[cat] = courses.filter((c) => c.category === "Cybersecurity" || c.category === "Cloud & Infra" || c.category === "Git & DevOps").length
      } else {
        acc[cat] = courses.filter((c) => c.category === cat).length
      }
      return acc
    }, {} as Record<string, number>)
  }, [courses, enrolledCount, wishlistCount])

  // Filter Career Role Tracks for horizontal shelf view
  const filteredTracks = useMemo(() => {
    return CAREER_ROLE_TRACKS.map((track) => {
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

      const matchingCourses = track.courses.filter((course) => {
        if (filter !== "All") {
          if (filter === "Web & Full-Stack" && course.category !== "Web Development") return false
          if (filter === "Systems & Languages" && course.category !== "Programming" && course.category !== "Backend") return false
          if (filter === "Cybersecurity" && course.category !== "Cybersecurity" && course.category !== "Cloud & Infra") return false
          if (filter === "AI & ML" && course.category !== "AI & ML") return false
          if (filter === "Data Science" && course.category !== "Data Science") return false
          if (filter === "DSA" && course.category !== "DSA") return false
        }

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

  // Finite pagination & batch browsing (strictly 2 rows x 3 cols = 6 items per page in grid view)
  const [currentPage, setCurrentPage] = useState(1)
  const [showAll, setShowAll] = useState(false)
  const itemsPerPage = viewMode === "grid" ? 6 : 4

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
    startTransition(() => {
      setFilter("All")
      setCredentialFilter("All Types")
      setDifficultyFilter("All Levels")
      setPartnerFilter("All Partners")
      setSearchQuery("")
    })
  }

  return (
    <section id="courses" className={`relative ${hideHeader ? "py-8" : "py-16 lg:py-24"} bg-background ${className}`}>
      <div className="relative mx-auto max-w-[1400px] px-3.5 sm:px-6 lg:px-8">
        {/* ══════════════════════════════════════════════════════════
            1. COURSERA-STYLE ACADEMIC & INSTITUTIONAL HEADER
        ══════════════════════════════════════════════════════════ */}
        {!hideHeader && (
          <div className="relative mb-8 sm:mb-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-3 backdrop-blur-xs shadow-xs">
                <GraduationCap className="h-3.5 w-3.5" />
                <span className="tracking-widest uppercase font-mono text-[11px]">Curriculum Catalog</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.12]">
                Explore Courses &amp; Specializations
              </h2>
              <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
                Hands-on programs in software engineering, AI, systems, and algorithms designed to build real skills.
              </p>
            </div>

            {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
            <div className="hidden lg:flex relative shrink-0 w-64 h-48 items-center justify-center self-center lg:self-auto">
              <div
                id="courses-robot-anchor"
                data-axel-anchor="true"
                data-section-id="courses"
                data-emotion="happy"
                data-scale="0.95"
                data-label="Curriculum Catalog"
                className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {hideHeader && (
          <div className="flex items-center justify-between pt-2 pb-2 border-b border-border/40 mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary">Academic Catalog</span>
              <h2 className="font-serif text-2xl font-normal text-foreground mt-1">Specializations &amp; Certificates</h2>
            </div>
            <div className="hidden lg:flex relative shrink-0 w-56 h-48 items-center justify-center">
              <div
                id="courses-robot-anchor"
                data-axel-anchor="true"
                data-section-id="courses"
                data-emotion="happy"
                data-scale="0.92"
                data-label="Course Catalog"
                className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
                aria-hidden="true"
              />
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            2. COURSERA SEARCH & DISCOVERY CONTROL BAR
        ══════════════════════════════════════════════════════════ */}
        {/* ══════════════════════════════════════════════════════════
            ADMIN CONTROLS RIBBON (Visible to Administrators)
        ══════════════════════════════════════════════════════════ */}
        {isAdmin && (
          <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-teal-950/40 backdrop-blur-md p-4 sm:p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-inner">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                    Admin Mode Active
                  </span>
                  <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                    Full Catalog Control
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Create new specializations, customize module contents, adjust pricing locks, or publish live lessons.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-wrap shrink-0">
              <button
                type="button"
                onClick={handleOpenCreateCourse}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Add New Course</span>
              </button>
              <Link
                href="/admin/courses"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground text-xs font-medium transition-all"
              >
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                <span>Curriculum Manager</span>
              </Link>
            </div>
          </div>
        )}

        <div className="mb-8 space-y-3.5">
          {/* Main Control Row: Search + Filter Toggle + Sort + View */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What do you want to learn? (e.g., Deep Learning, Python, Next.js)..."
                className="w-full rounded-full border border-hairline bg-card/80 dark:bg-card/40 backdrop-blur-md pl-10 pr-9 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* Actions Cluster: Filter Toggle, Sort, View Switcher */}
            <div className="flex items-center gap-1.5 sm:gap-2 justify-between sm:justify-end shrink-0 flex-wrap sm:flex-nowrap">
              {/* Filter Button with Active Badge */}
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className={`inline-flex items-center gap-1.5 rounded-full border px-3 sm:px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                  showFilters || activeFilterCount > 0
                    ? "bg-primary/10 border-primary/40 text-primary font-semibold"
                    : "border-hairline bg-card/80 hover:bg-secondary text-muted-foreground hover:text-foreground"
                }`}
              >
                <Filter className="h-3.5 w-3.5" />
                <span>Filters</span>
                {activeFilterCount > 0 && (
                  <span className="rounded-full bg-primary text-primary-foreground px-1.5 py-0.2 text-[10px] font-mono font-bold leading-tight">
                    {activeFilterCount}
                  </span>
                )}
                <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${showFilters ? "rotate-180" : ""}`} />
              </button>

              {/* Sort Selector */}
              <div className="flex items-center gap-1 sm:gap-1.5 rounded-full border border-hairline bg-card/80 px-2.5 sm:px-3 py-2 text-xs text-muted-foreground">
                <span className="font-mono text-[11px] hidden md:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortSelect(e.target.value)}
                  className="bg-transparent text-foreground font-medium focus:outline-none cursor-pointer text-xs"
                >
                  <option value="popular" className="bg-card text-foreground">Most Popular</option>
                  <option value="rating" className="bg-card text-foreground">Highest Rated</option>
                  <option value="newest" className="bg-card text-foreground">Newest</option>
                </select>
              </div>

              {/* View Mode Toggle: Pathways vs Grid vs List */}
              <div className="inline-flex items-center rounded-full border border-hairline bg-card/80 p-0.5">
                <button
                  onClick={() => setViewMode("pathways")}
                  title="Career Role Pathways"
                  className={`rounded-full px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewMode === "pathways"
                      ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Rows3 className="h-3.5 w-3.5" />
                  <span className="hidden md:inline">Pathways</span>
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  title="Curated Grid"
                  className={`rounded-full p-1.5 transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  title="Detailed List"
                  className={`rounded-full p-1.5 transition-all cursor-pointer ${
                    viewMode === "list"
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Clean Category Navigation Pills */}
          <div className="flex overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0 py-0.5 overscroll-x-contain">
            <div className="inline-flex items-center gap-1.5 shrink-0 pr-4 sm:pr-0">
              {categories.map((cat) => {
                const count = categoryCounts[cat] || 0
                const isActive = filter === cat
                if (count === 0 && !isActive) return null

                return (
                  <button
                    key={cat}
                    onClick={() => handleFilterSelect(cat)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap ${
                      isActive
                        ? "bg-foreground text-background font-semibold shadow-xs"
                        : "border border-hairline bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {cat === "Enrolled" && <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />}
                    {cat === "Wishlist" && <Bookmark className="h-3 w-3 text-amber-500" />}
                    <span>{cat === "All" ? "All Programs" : cat}</span>
                    <span className={`text-[10px] font-mono ${isActive ? "opacity-75" : "text-muted-foreground/70"}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Expandable Filter Drawer (Type, Level, Partner) */}
          {showFilters && (
            <div className="rounded-2xl border border-hairline bg-card/95 p-4 space-y-3.5 shadow-xs transition-all animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex flex-wrap items-start gap-5 text-xs">
                {/* Credential Type */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-muted-foreground font-medium">Type:</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {credentialTypes.map((t) => (
                      <button
                        key={t}
                        onClick={() => handleCredentialSelect(t)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                          credentialFilter === t
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Level */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-muted-foreground font-medium">Level:</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {difficultyLevels.map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleDifficultySelect(lvl)}
                        className={`rounded-lg px-2.5 py-1 text-[11px] transition-colors cursor-pointer ${
                          difficultyFilter === lvl
                            ? "bg-primary text-primary-foreground font-semibold"
                            : "bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Partner Selector */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-muted-foreground font-medium">Partner:</span>
                  <div>
                    <select
                      value={partnerFilter}
                      onChange={(e) => handlePartnerSelect(e.target.value)}
                      className="rounded-lg border border-hairline bg-secondary px-2.5 py-1 text-[11px] text-foreground font-medium focus:outline-none cursor-pointer"
                    >
                      {partnerOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-card text-foreground">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Reset link inside drawer if filters active */}
              {hasActiveFilters && (
                <div className="pt-2.5 border-t border-hairline flex items-center justify-between">
                  <span className="text-[11px] text-muted-foreground font-mono">
                    {activeFilterCount} custom {activeFilterCount === 1 ? "filter" : "filters"} applied
                  </span>
                  <button
                    onClick={resetAllFilters}
                    className="text-xs text-primary underline underline-offset-2 hover:text-foreground cursor-pointer font-medium"
                  >
                    Reset all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Clean Live Status Line */}
          <div className="flex items-center justify-between pt-1 text-xs text-muted-foreground font-mono text-[11px]">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>
                {viewMode === "pathways" ? (
                  <>
                    Showing <strong className="text-foreground">{filteredTracks.length}</strong> career {filteredTracks.length === 1 ? "pathway" : "pathways"} ({filteredTracks.reduce((acc, t) => acc + t.courses.length, 0)} courses)
                  </>
                ) : filtered.length > itemsPerPage && !showAll ? (
                  <>
                    Showing <strong className="text-foreground">{startIndex + 1}–{endIndex}</strong> of{" "}
                    <strong className="text-foreground">{filtered.length}</strong> courses
                  </>
                ) : (
                  <>
                    Showing <strong className="text-foreground">{filtered.length}</strong> courses
                  </>
                )}
              </span>
            </div>

            {hasActiveFilters && !showFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-primary underline underline-offset-2 hover:text-foreground cursor-pointer font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Anchor for smooth page jumping */}
        <div id="courses-grid-anchor" className="scroll-mt-24" />

        {/* ══════════════════════════════════════════════════════════
            3. MAIN CATALOG PRESENTATION MODES
        ══════════════════════════════════════════════════════════ */}
        {!isLoaded || isPending ? (
          viewMode === "pathways" ? (
            <CoursePathwaySkeleton shelves={2} />
          ) : viewMode === "grid" ? (
            <CourseGridSkeleton count={itemsPerPage} />
          ) : (
            <CourseListSkeleton count={4} />
          )
        ) : viewMode === "pathways" ? (
          filteredTracks.length === 0 ? (
            <div className="rounded-3xl border border-hairline p-10 sm:p-14 text-center bg-card/60 space-y-4 max-w-xl mx-auto">
              <div className="flex justify-center">
                <EmptyBook3DIcon size="lg" className="hover:scale-105 transition-transform duration-300" />
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {filter === "Enrolled"
                  ? "You haven't enrolled in any tracks yet. Click 'Enroll Course' on any card to begin your journey."
                  : filter === "Wishlist"
                  ? "Your wishlist is empty. Click the bookmark icon on any course to save it here."
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
            <div className="space-y-8 lg:space-y-10">
              {filteredTracks.map((track) => (
                <CareerRoleShelf
                  key={track.id}
                  track={track}
                  userTier={userTier}
                  navigatingSlug={navigatingSlug}
                  isAdmin={isAdmin}
                  onSelectCourse={(slug) => setNavigatingSlug(slug)}
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
          <div className="rounded-3xl border border-hairline p-10 sm:p-14 text-center bg-card/60 space-y-4 max-w-xl mx-auto">
            <div className="flex justify-center">
              <EmptyBook3DIcon size="lg" className="hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {filter === "Enrolled"
                ? "You haven't enrolled in any tracks yet. Click 'Enroll Course' on any card to begin."
                : filter === "Wishlist"
                ? "Your course wishlist is empty. Click the bookmark icon on any course to save it here."
                : "No courses matched your search and filter criteria."}
            </p>
            <button
              onClick={resetAllFilters}
              className="mt-2 inline-flex items-center text-xs text-primary font-medium hover:underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          /* Coursera 3-Column Card Grid (Strictly 2 rows x 3 cols = 6 items per page) */
          <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 transition-opacity duration-200 ${isPending ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
            {paginatedCourses.map((course) => {
              const cSlug = course.slug || course.id
              return (
                <CourseGridCard
                  key={course.id || course.slug}
                  course={course}
                  userTier={userTier}
                  isSelected={navigatingSlug === cSlug}
                  isAdmin={isAdmin}
                  onSelect={() => setNavigatingSlug(cSlug)}
                  onEditCourse={handleOpenEditCourse}
                  onDeleteCourse={(c) => setDeleteConfirmCourse({ id: c.id, title: c.title })}
                  onQuickEnroll={() =>
                    setActiveEnrollCourse({
                      title: course.title,
                      slug: cSlug,
                      partner: course.courseraData.partner
                    })
                  }
                />
              )
            })}
          </div>
        ) : (
          /* Detailed Coursera Syllabus List View */
          <div className={`space-y-5 transition-opacity duration-200 ${isPending ? "opacity-60 pointer-events-none" : "opacity-100"}`}>
            {paginatedCourses.map((course) => {
              const cSlug = course.slug || course.id
              return (
                <CourseListCard
                  key={course.id || course.slug}
                  course={course}
                  userTier={userTier}
                  isSelected={navigatingSlug === cSlug}
                  isAdmin={isAdmin}
                  onSelect={() => setNavigatingSlug(cSlug)}
                  onEditCourse={handleOpenEditCourse}
                  onDeleteCourse={(c) => setDeleteConfirmCourse({ id: c.id, title: c.title })}
                  onQuickEnroll={() =>
                    setActiveEnrollCourse({
                      title: course.title,
                      slug: cSlug,
                      partner: course.courseraData.partner
                    })
                  }
                />
              )
            })}
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════
            4. STRICT NUMBERED PAGINATION BAR (NO INFINITE SCROLL FATIGUE)
        ══════════════════════════════════════════════════════════ */}
        {viewMode !== "pathways" && filtered.length > itemsPerPage && !showAll && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-hairline pt-6">
            <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
              <span>
                Page <strong className="text-foreground">{currentPage}</strong> of{" "}
                <strong className="text-foreground">{totalPages}</strong> ({filtered.length} total programs)
              </span>
              <div className="hidden sm:block w-24 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full bg-primary transition-[width] duration-300 will-change-[width]"
                  style={{ width: `${(endIndex / filtered.length) * 100}%` }}
                />
              </div>
            </div>

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

              <button
                onClick={() => setShowAll(true)}
                className="ml-2 text-xs font-mono text-primary hover:underline cursor-pointer"
              >
                View all ({filtered.length})
              </button>
            </div>
          </div>
        )}

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

        {/* ══════════════════════════════════════════════════════════
            5. COURSERA PLUS / ASCI ALL-ACCESS MEMBERSHIP BANNER
        ══════════════════════════════════════════════════════════ */}
        <div className="mt-12 rounded-2xl border border-stone-200/90 dark:border-stone-800/90 bg-card/60 backdrop-blur-md p-6 sm:p-8 shadow-xs relative overflow-hidden">
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl text-left">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 px-3 py-0.5 text-[11px] font-mono font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="h-3 w-3 text-amber-500" />
                <span>All-Access Membership</span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground tracking-tight">
                Unlock All 100+ Courses &amp; Sandboxes
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                One simple plan for unlimited courses, interactive coding sandboxes, and mentor feedback.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all active:scale-[0.98] w-full sm:w-auto text-center shadow-xs"
              >
                <span>View Plans &amp; Pricing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
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

      {/* In-Place Admin Course Editor Modal */}
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
              <h3 className="font-serif text-lg font-semibold text-foreground">
                Delete Academic Program?
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Are you sure you want to remove <strong className="text-foreground">{deleteConfirmCourse.title}</strong> from the academic catalog? This will remove it from both the Home Page and the Student Dashboard.
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
                <span>Delete Program</span>
              </button>
            </div>
          </div>
        </div>
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

/* ═════════════════════════════════════════════════════════════════
   6. AUTHENTIC COURSERA GRID CARD (High-Resolution Cover, Partner Attribution & Meta)
═════════════════════════════════════════════════════════════════ */
function CourseGridCard({
  course,
  userTier,
  onQuickEnroll,
  isSelected = false,
  onSelect,
  isAdmin = false,
  onEditCourse,
  onDeleteCourse,
}: {
  course: CourseType
  userTier: string | null
  onQuickEnroll: () => void
  isSelected?: boolean
  onSelect?: () => void
  isAdmin?: boolean
  onEditCourse?: (course: CourseType) => void
  onDeleteCourse?: (course: CourseType) => void
}) {
  const { isEnrolled, getEnrollment, enroll } = useEnrollments()
  const isPremiumLocked = course.is_premium && userTier !== "architect"
  const courseSlug = course.slug || course.id
  const href = getCourseHref(courseSlug, isPremiumLocked)
  const data = course.courseraData
  const enrolled = isEnrolled(courseSlug)
  const enrolledData = getEnrollment(courseSlug)
  const lessonHref = `/courses/${courseSlug}/learn`

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
    enrollInCourse(courseSlug).catch(() => {})
    onQuickEnroll()
  }

  return (
    <div className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card transition-all duration-200 ease-out hover:-translate-y-1 shadow-xs ${
      isSelected
        ? "border-primary ring-1 ring-primary"
        : "border-stone-200/90 dark:border-stone-800/90 hover:border-foreground/30 dark:hover:border-white/30"
    }`}>
      {isSelected && (
        <div className="absolute inset-0 z-30 bg-background/60 dark:bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 select-none">
          <div className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-xs">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Launching {course.title.split(" ")[0]}...</span>
          </div>
        </div>
      )}

      <div>
        {/* 2:1 Widescreen Cover - Reduced Height */}
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
          <Image
            src={data.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Top-Left Category Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="inline-flex items-center rounded-full bg-background/90 dark:bg-black/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-semibold text-foreground border border-hairline uppercase tracking-wider select-none">
              {course.category}
            </span>
          </div>

          {/* Top-Right Wishlist Button */}
          <div className="absolute top-2.5 right-2.5 z-10">
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
              className="h-7 w-7 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-amber-400 shadow-xs active:scale-95 transition-transform"
            />
          </div>
        </div>

        {/* Card Body - Coursera Structure */}
        <div className="p-3.5 sm:p-4 space-y-2">
          {/* Educator / Partner Row with avatar */}
          <div className="flex items-center gap-2 text-xs font-medium text-foreground/90">
            <div className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-[9px] font-bold text-primary shrink-0 uppercase overflow-hidden">
              {data.partner?.slice(0, 2) || "AS"}
            </div>
            <span className="truncate">{data.partner || "ASCI Institute"}</span>
          </div>

          {/* Course Title */}
          <Link
            href={href}
            onClick={() => onSelect?.()}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="font-serif text-base sm:text-[17px] font-medium tracking-tight text-foreground line-clamp-2 leading-snug">
              {course.title}
            </h3>
          </Link>

          {/* Coursera Signature: "Skills you'll gain:" */}
          <div className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            <span className="font-semibold text-foreground/90">Skills you'll gain: </span>
            <span>{data.skills?.join(", ") || course.description}</span>
          </div>

          {/* Coursera Meta Line: Rating · Duration · Level */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap pt-0.5">
            <div className="flex items-center gap-1 text-foreground font-semibold shrink-0">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              <span>{data.rating.toFixed(1)}</span>
              <span className="text-muted-foreground font-normal">({data.ratingCount || "10K+"})</span>
            </div>
            <span>·</span>
            <span>{course.level || "Beginner"}</span>
            <span>·</span>
            <span className="truncate">{data.credentialType || "Specialization"}</span>
            {course.weeks && (
              <>
                <span>·</span>
                <span className="shrink-0">{course.weeks}</span>
              </>
            )}
          </div>

          {/* Coursera Status / Category Badge */}
          {course.is_premium ? (
            <div className="pt-0.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                Top AI program
              </span>
            </div>
          ) : (
            <div className="pt-0.5">
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider bg-secondary text-muted-foreground border border-hairline">
                Top recommendation
              </span>
            </div>
          )}

          {/* Progress Bar if Enrolled */}
          {enrolled && (
            <div className="pt-1.5 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{enrolledData?.lessonsCompleted ?? 0} / {enrolledData?.totalLessons ?? ((course.modules || 4) * 3)} Lessons</span>
                <span className="text-primary font-bold">{enrolledData?.progressPercent ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${enrolledData?.progressPercent ?? 0}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="px-4 py-2 sm:px-5 flex items-center justify-between border-t border-hairline mt-auto bg-card">
        {isSelected ? (
          <div className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Launching course...</span>
          </div>
        ) : enrolled ? (
          <div className="w-full flex items-center gap-2">
            <Link
              href={lessonHref}
              onClick={() => onSelect?.()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold shadow-xs transition-all active:scale-[0.98] cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Continue</span>
            </Link>
            <Link
              href={href}
              onClick={() => onSelect?.()}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-hairline bg-secondary hover:bg-card text-xs font-medium text-foreground transition-colors cursor-pointer active:scale-[0.98] shrink-0"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            {isAdmin && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onEditCourse?.(course)
                  }}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground text-xs transition-colors cursor-pointer"
                  title="Edit Program (Admin)"
                >
                  <Edit3 className="w-3.5 h-3.5 text-primary" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDeleteCourse?.(course)
                  }}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-hairline bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs transition-colors cursor-pointer"
                  title="Delete Program (Admin)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full flex items-center gap-2">
            <button
              onClick={handleEnrollClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground transition-all text-xs font-semibold cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll</span>
            </button>
            <Link
              href={href}
              onClick={() => onSelect?.()}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-hairline bg-secondary hover:bg-card text-xs font-medium text-foreground transition-colors cursor-pointer active:scale-[0.98] shrink-0"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
            {isAdmin && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onEditCourse?.(course)
                  }}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground text-xs transition-colors cursor-pointer"
                  title="Edit Program (Admin)"
                >
                  <Edit3 className="w-3.5 h-3.5 text-primary" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDeleteCourse?.(course)
                  }}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-hairline bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs transition-colors cursor-pointer"
                  title="Delete Program (Admin)"
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
}

/* ═════════════════════════════════════════════════════════════════
   7. CLEAN COURSERA LIST CARD (Streamlined Syllabus View)
═════════════════════════════════════════════════════════════════ */
function CourseListCard({
  course,
  userTier,
  onQuickEnroll,
  isSelected = false,
  onSelect,
  isAdmin = false,
  onEditCourse,
  onDeleteCourse,
}: {
  course: CourseType
  userTier: string | null
  onQuickEnroll: () => void
  isSelected?: boolean
  onSelect?: () => void
  isAdmin?: boolean
  onEditCourse?: (course: CourseType) => void
  onDeleteCourse?: (course: CourseType) => void
}) {
  const { isEnrolled, getEnrollment, enroll } = useEnrollments()
  const isPremiumLocked = course.is_premium && userTier !== "architect"
  const courseSlug = course.slug || course.id
  const href = getCourseHref(courseSlug, isPremiumLocked)
  const data = course.courseraData
  const enrolled = isEnrolled(courseSlug)
  const enrolledData = getEnrollment(courseSlug)
  const lessonHref = `/courses/${courseSlug}/learn`

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
    enrollInCourse(courseSlug).catch(() => {})
    onQuickEnroll()
  }

  return (
    <div className={`group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border bg-card transition-all duration-200 ease-out hover:-translate-y-0.5 shadow-xs ${
      isSelected
        ? "border-primary ring-1 ring-primary"
        : "border-stone-200/90 dark:border-stone-800/90 hover:border-foreground/30 dark:hover:border-white/30"
    }`}>
      {isSelected && (
        <div className="absolute inset-0 z-30 bg-background/60 dark:bg-black/60 backdrop-blur-[2px] flex items-center justify-center p-4 select-none">
          <div className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-xs">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Launching {course.title.split(" ")[0]}...</span>
          </div>
        </div>
      )}

      {/* Left Thumbnail Cover - Widescreen & Sleeker */}
      <div className="relative aspect-video sm:aspect-[16/10] sm:w-60 md:w-68 shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-900">
        <Image
          src={data.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, 280px"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-2.5 left-2.5 z-10">
          <span className="inline-flex items-center rounded-full bg-background/90 dark:bg-black/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-semibold text-foreground border border-hairline uppercase tracking-wider select-none">
            {course.category}
          </span>
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-2.5 right-2.5 z-10">
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
            className="h-7 w-7 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-amber-400 shadow-xs active:scale-95 transition-transform"
          />
        </div>
      </div>

      {/* Right Course Details */}
      <div className="flex flex-1 flex-col justify-between p-3.5 sm:px-5 sm:py-3.5">
        <div className="space-y-2">
          {/* Partner Attribution */}
          <p className="text-[11px] font-mono text-muted-foreground truncate">
            Offered by <span className="font-semibold text-foreground/90">{data.partner}</span>
          </p>

          {/* Title */}
          <Link
            href={href}
            onClick={() => onSelect?.()}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground leading-snug">
              {course.title}
            </h3>
          </Link>

          {/* Clean Meta: Rating · Duration · Level */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{data.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{course.weeks || "6 Weeks"}</span>
            <span>•</span>
            <span className="text-foreground/80 font-medium">{course.level || "Beginner"}</span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {course.description}
          </p>

          {/* Progress Bar if Enrolled */}
          {enrolled && (
            <div className="mt-2 space-y-1.5 max-w-md">
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{enrolledData?.lessonsCompleted ?? 0} / {enrolledData?.totalLessons ?? ((course.modules || 4) * 3)} Lessons</span>
                <span className="text-primary font-bold">{enrolledData?.progressPercent ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${enrolledData?.progressPercent ?? 0}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-3">
          <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
            <span>Verified Certificate Included</span>
          </div>

          <div className="flex items-center gap-2">
            {isSelected ? (
              <div className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3.5 py-1.5 text-xs font-semibold text-white shadow-xs">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Launching...</span>
              </div>
            ) : enrolled ? (
              <>
                <Link
                  href={lessonHref}
                  onClick={() => onSelect?.()}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-active px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all active:scale-[0.98] cursor-pointer"
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>Continue</span>
                </Link>
                <Link
                  href={href}
                  onClick={() => onSelect?.()}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-hairline bg-secondary hover:bg-card text-xs font-medium text-foreground transition-colors cursor-pointer active:scale-[0.98]"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </>
            ) : (
              <>
                <button
                  onClick={handleEnrollClick}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-active px-3.5 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs transition-all cursor-pointer active:scale-[0.98]"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Enroll</span>
                </button>
                <Link
                  href={href}
                  onClick={() => onSelect?.()}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-hairline bg-secondary hover:bg-card text-xs font-medium text-foreground transition-colors shadow-2xs active:scale-[0.98]"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </>
            )}
            {isAdmin && (
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onEditCourse?.(course)
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-hairline bg-card hover:bg-secondary px-2.5 py-1.5 text-xs font-semibold text-primary transition-colors cursor-pointer"
                  title="Edit Program (Admin)"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDeleteCourse?.(course)
                  }}
                  className="inline-flex items-center justify-center p-1.5 rounded-xl border border-hairline bg-card hover:bg-destructive/10 text-muted-foreground hover:text-destructive text-xs transition-colors cursor-pointer"
                  title="Delete Program (Admin)"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
