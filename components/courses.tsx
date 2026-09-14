"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight, Code2, Server, Layers, Globe, Cloud, Zap, Braces, Clock,
  BarChart3, BookOpen, TerminalSquare, BrainCircuit, ShieldCheck, GitBranch,
  Award, Search, Star, Filter, LayoutGrid, List, Users, CheckCircle2,
  X, ChevronDown, Check
} from "lucide-react"
import { useStaggerReveal, useScrollReveal } from "@/hooks/use-gsap"
import { useAuth } from "@/context/auth-context"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"
import { getCourseraDataForCourse, CourseraExtraData } from "@/lib/coursera-metadata"
import { EnrollModal } from "@/components/enroll-modal"
import { TechLogo } from "@/components/tech-logo"
import { WishlistButton } from "@/components/courses/wishlist-button"
import { useWishlist } from "@/lib/user-learning-store"
import { EmptyBook3DIcon } from "@/components/icons"

const categories = [
  "All",
  "Wishlist",
  "Languages & Web",
  "Web Development",
  "Programming",
  "AI & ML",
  "Data Science",
  "Git & DevOps",
  "Cybersecurity",
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"popular" | "rating" | "newest">("popular")
  const [courses, setCourses] = useState<CourseType[]>(BASE_COURSES)
  const { profile } = useAuth()
  const userTier = profile?.subscription_tier || null
  const { isSaved, count: wishlistCount } = useWishlist()

  // Enrollment modal state
  const [activeEnrollCourse, setActiveEnrollCourse] = useState<CourseType | null>(null)

  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 })
  const gridRef = useStaggerReveal<HTMLDivElement>(".course-card", { y: 40, duration: 0.6, stagger: 0.06 })

  // Filtering & Sorting
  const filtered = useMemo(() => {
    return courses.filter((course) => {
      // Category filter
      if (filter === "Wishlist") {
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
  }, [courses, filter, credentialFilter, difficultyFilter, partnerFilter, searchQuery, sortBy, isSaved])

  const categoryCounts = useMemo(() => {
    return categories.reduce((acc, cat) => {
      if (cat === "All") {
        acc[cat] = courses.length
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
  }, [courses])

  const hasActiveFilters = filter !== "All" || credentialFilter !== "All Types" || difficultyFilter !== "All Levels" || partnerFilter !== "All Partners" || searchQuery.trim() !== ""

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
          <div ref={headerRef} className="relative mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
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
                className="w-full rounded-xl border border-hairline bg-card/80 pl-10 pr-9 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary shadow-xs transition-all"
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
                  onClick={() => setViewMode("grid")}
                  title="Grid View"
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

          {/* Category Filter Tabs (Centered Segmented Capsule) */}
          <div className="flex justify-center overflow-x-auto pb-1">
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 rounded-2xl border border-hairline bg-secondary/80 p-1.5 backdrop-blur-md shadow-xs max-w-full">
              {categories.map((cat) => {
                const count = categoryCounts[cat] || 0
                const isActive = filter === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    suppressHydrationWarning
                    className={`group inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
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

          {/* Secondary Facet Filter Row (Credential, Difficulty, Partner) */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 text-xs">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-muted-foreground flex items-center gap-1 font-mono text-[11px]">
                <Filter className="h-3 w-3" />
                Filter by:
              </span>

              {/* Credential Type Facet */}
              <select
                value={credentialFilter}
                onChange={(e) => setCredentialFilter(e.target.value)}
                className="rounded-lg border border-hairline bg-card/80 px-2.5 py-1 text-xs text-foreground focus:outline-none cursor-pointer"
              >
                {credentialTypes.map((t) => (
                  <option key={t} value={t} className="bg-card text-foreground">
                    {t}
                  </option>
                ))}
              </select>

              {/* Difficulty Facet */}
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="rounded-lg border border-hairline bg-card/80 px-2.5 py-1 text-xs text-foreground focus:outline-none cursor-pointer"
              >
                {difficultyLevels.map((l) => (
                  <option key={l} value={l} className="bg-card text-foreground">
                    {l}
                  </option>
                ))}
              </select>

              {/* Partner Facet */}
              <select
                value={partnerFilter}
                onChange={(e) => setPartnerFilter(e.target.value)}
                className="rounded-lg border border-hairline bg-card/80 px-2.5 py-1 text-xs text-foreground focus:outline-none cursor-pointer"
              >
                {partnerOptions.map((p) => (
                  <option key={p} value={p} className="bg-card text-foreground">
                    {p}
                  </option>
                ))}
              </select>

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-xs text-primary underline underline-offset-4 hover:text-foreground cursor-pointer ml-1"
                >
                  Clear all filters
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
                Showing <strong className="text-foreground">{filtered.length}</strong> {filtered.length === 1 ? "track" : "tracks"}
              </span>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid vs List */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-hairline p-10 sm:p-14 text-center bg-card/40 space-y-4 max-w-xl mx-auto">
            <div className="flex justify-center">
              <EmptyBook3DIcon size="lg" className="hover:scale-105 transition-transform duration-300" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {filter === "Wishlist"
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
          /* Course Grid View */
          <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((course) => (
              <CourseGridCard
                key={course.id || course.slug}
                course={course}
                userTier={userTier}
                onQuickEnroll={() => setActiveEnrollCourse(course)}
              />
            ))}
          </div>
        ) : (
          /* Course Detailed List View */
          <div ref={gridRef} className="space-y-4">
            {filtered.map((course) => (
              <CourseListCard
                key={course.id || course.slug}
                course={course}
                userTier={userTier}
                onQuickEnroll={() => setActiveEnrollCourse(course)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Interactive Enrollment Modal */}
      {activeEnrollCourse && (
        <EnrollModal
          isOpen={!!activeEnrollCourse}
          onClose={() => setActiveEnrollCourse(null)}
          courseTitle={activeEnrollCourse.title}
          courseSlug={activeEnrollCourse.slug || activeEnrollCourse.id}
          partnerName={activeEnrollCourse.courseraData.partner}
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
   Course Grid Card Component
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
  const isPremiumLocked = course.is_premium && userTier !== "architect"
  const courseSlug = course.slug || course.id
  const href = getCourseHref(courseSlug, isPremiumLocked)

  const data = course.courseraData

  return (
    <div className="course-card group relative flex flex-col overflow-hidden rounded-2xl border border-hairline bg-card transition-all duration-300 hover:border-foreground/25 hover:shadow-lg">
      {/* 16:9 Thumbnail Image with Gradient & Overlay */}
      <div className="relative aspect-video w-full overflow-hidden bg-secondary">
        <Image
          src={data.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30" />

        {/* Partner Badge Overlay */}
        <div className="absolute left-3 top-3 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-md bg-black/70 backdrop-blur-md px-2.5 py-1 text-[10px] font-medium text-white border border-white/10 shadow-xs">
            {data.partner}
          </span>
        </div>

        {/* Credential / Pro Badge Overlay & Tech Logo & Wishlist */}
        <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
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
            className="h-7 w-7 bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-amber-400 shadow-xs"
          />
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black/80 backdrop-blur-md border border-white/20 p-1 shadow-xs">
            <TechLogo slug={courseSlug} className="h-full w-full object-contain" />
          </div>
          <span className="rounded-md bg-primary/90 backdrop-blur-md px-2.5 py-1 text-[10px] font-semibold text-primary-foreground shadow-xs">
            {data.credentialType}
          </span>
        </div>

        {/* Category & Series Count Overlay at Bottom of Image */}
        <div className="absolute bottom-2.5 left-3 right-3 z-10 flex items-center justify-between text-[11px] text-white/90">
          <span className="font-mono uppercase tracking-wider text-[10px] text-white/75">
            {course.category}
          </span>
          {data.seriesCount ? (
            <span className="text-[10px] bg-white/20 backdrop-blur-xs px-2 py-0.5 rounded text-white font-medium">
              {data.seriesCount}-course series
            </span>
          ) : null}
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start gap-2.5">
          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-hairline bg-secondary/80 p-1 group-hover:border-primary/50 group-hover:scale-105 transition-all">
            <TechLogo slug={courseSlug} className="h-full w-full object-contain" />
          </div>
          <Link href={href} className="flex-1">
            <h3 className="font-serif text-base font-medium text-foreground line-clamp-2 group-hover:text-primary transition-colors leading-snug">
              {course.title}
            </h3>
          </Link>
        </div>

        {/* Rating & Enrollment Stats */}
        <div className="mt-2.5 flex items-center gap-2 text-xs">
          <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span>{data.rating}</span>
          </div>
          <span className="text-muted-foreground/60">•</span>
          <span className="text-muted-foreground text-[11px] truncate">
            {data.ratingCount}
          </span>
        </div>

        <p className="mt-2.5 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {course.description}
        </p>

        {/* Skills Pills */}
        {data.skills && data.skills.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1">
            {data.skills.slice(0, 2).map((skill, i) => (
              <span
                key={i}
                className="rounded-md bg-secondary/80 border border-hairline px-2 py-0.5 text-[10px] font-medium text-foreground/80"
              >
                {skill}
              </span>
            ))}
            {data.skills.length > 2 && (
              <span className="rounded-md bg-secondary/40 px-1.5 py-0.5 text-[10px] text-muted-foreground">
                +{data.skills.length - 2}
              </span>
            )}
          </div>
        )}

        <div className="flex-1" />

        {/* Level & Timeline Specs */}
        <div className="mt-4 flex items-center justify-between border-t border-hairline/60 pt-3 text-[11px] text-muted-foreground font-mono">
          <span className="font-medium text-foreground/90">{course.level}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {course.weeks}
          </span>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="flex items-center justify-between border-t border-hairline/60 px-5 py-3 bg-secondary/20">
        <button
          onClick={onQuickEnroll}
          className="text-xs font-medium text-primary hover:text-foreground inline-flex items-center gap-1 transition-colors cursor-pointer"
        >
          <span>Enroll for Free</span>
        </button>

        <Link
          href={href}
          className="text-xs font-medium text-foreground/80 hover:text-primary inline-flex items-center gap-1 transition-colors"
        >
          <span>Explore</span>
          <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------
   Course Detailed List Card Component
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
  const isPremiumLocked = course.is_premium && userTier !== "architect"
  const courseSlug = course.slug || course.id
  const href = getCourseHref(courseSlug, isPremiumLocked)
  const data = course.courseraData

  return (
    <div className="course-card group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-hairline bg-card transition-all duration-300 hover:border-foreground/25 hover:shadow-md">
      {/* Left Thumbnail (Horizontal presentation) */}
      <div className="relative aspect-video sm:aspect-square sm:w-60 md:w-72 shrink-0 overflow-hidden bg-secondary">
        <Image
          src={data.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, 280px"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/30 sm:hidden" />

        <div className="absolute left-3 top-3 z-10 flex items-center gap-1.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black/80 backdrop-blur-md border border-white/20 p-1 shadow-xs">
            <TechLogo slug={courseSlug} className="h-full w-full object-contain" />
          </div>
          <span className="rounded-md bg-black/75 backdrop-blur-md px-2 py-0.5 text-[10px] font-medium text-white border border-white/10">
            {data.credentialType}
          </span>
        </div>

        <div className="absolute right-3 top-3 z-10">
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
            className="h-7 w-7 bg-black/80 backdrop-blur-md border border-white/20 text-white hover:text-amber-400 shadow-xs"
          />
        </div>
      </div>

      {/* Right Course Info Content */}
      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
        <div>
          {/* Partner & Category Eyebrow */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-primary">
              {data.partner}
            </span>
            <span className="text-[11px] font-mono text-muted-foreground uppercase">
              {course.category}
            </span>
          </div>

          {/* Title with TechLogo */}
          <div className="mt-2 flex items-start gap-2.5">
            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-hairline bg-secondary/80 p-1.5 group-hover:border-primary/50 group-hover:scale-105 transition-all">
              <TechLogo slug={courseSlug} className="h-full w-full object-contain" />
            </div>
            <Link href={href} className="flex-1">
              <h3 className="font-serif text-lg sm:text-xl font-normal text-foreground group-hover:text-primary transition-colors leading-snug">
                {course.title}
              </h3>
            </Link>
          </div>

          {/* Star Rating & Learners Count */}
          <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{data.rating}</span>
            </div>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-muted-foreground text-xs">
              {data.ratingCount}
            </span>
            <span className="text-muted-foreground/60 hidden sm:inline">•</span>
            <span className="text-muted-foreground text-xs hidden sm:inline">
              {data.enrolledCount}
            </span>
          </div>

          {/* Description */}
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {course.description}
          </p>

          {/* Skills Tags */}
          {data.skills && data.skills.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-muted-foreground font-mono mr-1">Skills:</span>
              {data.skills.slice(0, 4).map((skill, idx) => (
                <span
                  key={idx}
                  className="rounded-md bg-secondary border border-hairline px-2.5 py-0.5 text-[11px] font-medium text-foreground/80"
                >
                  {skill}
                </span>
              ))}
              {data.skills.length > 4 && (
                <span className="text-[11px] text-muted-foreground">+{data.skills.length - 4} more</span>
              )}
            </div>
          )}
        </div>

        {/* Footer Meta & Actions */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-hairline/60 pt-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground font-mono">
            <span className="font-semibold text-foreground">{course.level}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {course.weeks}
            </span>
            {course.certificate && (
              <>
                <span>•</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">Certificate Included</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2.5">
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
              variant="full"
              className="text-xs py-2 px-3"
            />
            <button
              onClick={onQuickEnroll}
              className="rounded-xl border border-hairline px-4 py-2 text-xs font-medium text-foreground hover:bg-secondary transition-colors cursor-pointer"
            >
              Enroll for Free
            </button>
            <Link
              href={href}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-xs"
            >
              <span>Explore Syllabus</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
