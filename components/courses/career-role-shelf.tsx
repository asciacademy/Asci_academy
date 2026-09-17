"use client"

import React, { useRef, useState, useEffect, useCallback, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  ArrowRight,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  Code2,
  Check,
  Plus,
  PlayCircle,
  ChevronDown,
  ChevronUp,
  Flame,
  Loader2
} from "lucide-react"
import { CareerRoleTrack, CareerRoleCourse } from "@/lib/career-roles-data"
import { WishlistButton } from "@/components/courses/wishlist-button"
import { useEnrollments } from "@/lib/user-learning-store"
import { enrollInCourse } from "@/app/actions/courses"

interface CareerRoleShelfProps {
  track: CareerRoleTrack
  onQuickEnroll: (course: CareerRoleCourse) => void
  userTier?: string | null
  navigatingSlug?: string | null
  onSelectCourse?: (slug: string) => void
}

function getRoleVisuals(trackId: string) {
  switch (trackId) {
    case "machine-learning-engineer":
      return {
        icon: <BrainCircuit className="h-4 w-4 text-blue-600 dark:text-blue-400" />,
        accentBorder: "hover:border-blue-500/40 dark:hover:border-blue-500/30",
        badgeBg: "bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20",
        glow: "from-blue-600/10 via-cyan-500/5 to-transparent",
        dotColor: "bg-blue-500"
      }
    case "data-scientist":
      return {
        icon: <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />,
        accentBorder: "hover:border-emerald-500/40 dark:hover:border-emerald-500/30",
        badgeBg: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20",
        glow: "from-emerald-600/10 via-teal-500/5 to-transparent",
        dotColor: "bg-emerald-500"
      }
    case "cyber-security-specialist":
      return {
        icon: <ShieldCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />,
        accentBorder: "hover:border-sky-500/40 dark:hover:border-sky-500/30",
        badgeBg: "bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20",
        glow: "from-sky-600/10 via-indigo-500/5 to-transparent",
        dotColor: "bg-sky-500"
      }
    default:
      return {
        icon: <Code2 className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />,
        accentBorder: "hover:border-indigo-500/40 dark:hover:border-indigo-500/30",
        badgeBg: "bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/20",
        glow: "from-indigo-600/10 via-violet-500/5 to-transparent",
        dotColor: "bg-indigo-500"
      }
  }
}

export function CareerRoleShelf({
  track,
  onQuickEnroll,
  userTier,
  navigatingSlug,
  onSelectCourse
}: CareerRoleShelfProps) {
  const shelfContainerRef = useRef<HTMLDivElement>(null)
  const shelfRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const tickingRef = useRef(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "carousel">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const visuals = getRoleVisuals(track.id)
  const totalCourses = track.courses.length

  // 2 rows x 3 columns on desktop = 6 courses per page (max 2 rows; if exceeded, add to next page by numbers)
  const COURSES_PER_PAGE = 6
  const totalPages = Math.max(1, Math.ceil(totalCourses / COURSES_PER_PAGE))

  // Reset to page 1 whenever track changes
  useEffect(() => {
    setCurrentPage(1)
  }, [track.id])

  const startIndex = (currentPage - 1) * COURSES_PER_PAGE
  const endIndex = Math.min(startIndex + COURSES_PER_PAGE, totalCourses)

  const displayedCourses = viewMode === "grid"
    ? track.courses.slice(startIndex, endIndex)
    : track.courses

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return
    setCurrentPage(newPage)
    if (shelfContainerRef.current) {
      const el = shelfContainerRef.current
      const yOffset = -90 // account for sticky navbar
      const y = el.getBoundingClientRect().top + window.scrollY + yOffset
      window.scrollTo({ top: y, behavior: "smooth" })
    }
  }

  const pageNumbers = useMemo(() => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }
    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages]
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    }
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages]
  }, [totalPages, currentPage])

  const updateScrollState = useCallback(() => {
    if (tickingRef.current) return
    tickingRef.current = true

    window.requestAnimationFrame(() => {
      tickingRef.current = false
      const el = shelfRef.current
      if (!el) return
      const { scrollLeft, scrollWidth, clientWidth } = el

      const nextCanLeft = scrollLeft > 10
      const nextCanRight = scrollLeft + clientWidth < scrollWidth - 10
      setCanScrollLeft((prev) => (prev !== nextCanLeft ? nextCanLeft : prev))
      setCanScrollRight((prev) => (prev !== nextCanRight ? nextCanRight : prev))

      if (progressBarRef.current) {
        const maxScroll = Math.max(1, scrollWidth - clientWidth)
        const pct = Math.min(100, Math.max(15, (scrollLeft / maxScroll) * 100))
        progressBarRef.current.style.width = `${pct}%`
      }
    })
  }, [])

  useEffect(() => {
    if (viewMode !== "carousel") return
    const el = shelfRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState, { passive: true })
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState, viewMode, track.courses.length])

  const scroll = (direction: "left" | "right") => {
    const el = shelfRef.current
    if (!el) return
    const scrollAmount = Math.max(320, el.clientWidth * 0.8)
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <div
      ref={shelfContainerRef}
      id={`role-shelf-${track.id}`}
      className={`relative w-full rounded-3xl border border-stone-200/90 dark:border-stone-800/90 bg-card/70 dark:bg-card/40 backdrop-blur-md p-5 sm:p-6 lg:p-8 shadow-xs transition-all duration-300 ${visuals.accentBorder} overflow-hidden scroll-mt-24`}
    >
      {/* Decorative Ambient Top Glow */}
      <div
        className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${visuals.glow} pointer-events-none -z-10`}
      />

      {/* -------------------------------------------------------------
          1. REDESIGNED ROLE HEADER: STATELY, HIERARCHICAL & CLEAR
      ------------------------------------------------------------- */}
      <div className="space-y-4">
        {/* Top Badges Row */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Role Category Tag */}
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-mono font-semibold tracking-wide uppercase ${visuals.badgeBg}`}>
              {visuals.icon}
              <span>{track.roleCategory || track.title}</span>
            </div>

            {/* High Demand & Compensation Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300 text-xs font-mono font-medium">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
              <span>{track.badgeText}</span>
            </div>
          </div>

          {/* Controls: Program Count & View Mode Toggle */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-2.5 py-1 rounded-lg bg-secondary/80 text-foreground border border-hairline">
              <span className={`w-2 h-2 rounded-full ${visuals.dotColor} animate-pulse`} />
              {totalCourses} Verified Programs
            </span>

            {/* View Mode Toggle: Grid vs Carousel (only if > 2 courses) */}
            {totalCourses > 2 && (
              <div className="inline-flex items-center rounded-xl border border-hairline bg-secondary/60 p-0.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-card text-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Grid view"
                >
                  Grid
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("carousel")}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    viewMode === "carousel"
                      ? "bg-card text-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  aria-label="Carousel view"
                >
                  Carousel
                </button>
              </div>
            )}

            {/* Carousel Arrow Controls (Active when in Carousel View) */}
            {viewMode === "carousel" && (
              <div className="flex items-center gap-1 ml-1">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  className="h-8 w-8 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
                  aria-label="Previous courses"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  className="h-8 w-8 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
                  aria-label="Next courses"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Main Role Title & Tagline */}
        <div className="space-y-1.5 max-w-4xl">
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground">
            {track.title}
          </h3>

          <p className="text-sm sm:text-base font-medium text-primary dark:text-blue-400 leading-snug">
            {track.headline}
          </p>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-0.5">
            {track.description}
          </p>
        </div>

        {/* In-Demand Skills Pill Bar & Roadmap Action */}
        <div className="pt-2 flex flex-col md:flex-row md:items-center justify-between gap-3 border-t border-hairline/60">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mr-1 shrink-0 font-medium">
              In-Demand Skills:
            </span>
            {track.inDemandSkills && track.inDemandSkills.slice(0, 6).map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center rounded-md bg-secondary/80 hover:bg-secondary border border-hairline px-2 py-0.5 text-[11px] font-mono text-foreground/85 transition-colors select-none"
              >
                {skill}
              </span>
            ))}
            {track.inDemandSkills && track.inDemandSkills.length > 6 && (
              <span className="text-[11px] font-mono text-muted-foreground px-1">
                +{track.inDemandSkills.length - 6} more
              </span>
            )}
          </div>

          <Link
            href={track.goalUrl || "/programs"}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:text-blue-600 dark:hover:text-blue-400 hover:underline shrink-0 self-start md:self-auto"
          >
            <span>{track.goalLabel || "Explore Role Roadmap"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. CARDS SECTION: DIRECTLY UNDER THE HEADINGS (PERFECT ALIGNMENT)
      ------------------------------------------------------------- */}
      <div className="mt-8 w-full">
        {viewMode === "grid" ? (
          /* RESPONSIVE GRID LAYOUT: Strict container bounds, 100% aligned under heading */
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 w-full">
              {displayedCourses.map((course) => {
                const cSlug = course.slug || course.id
                const isSelected = navigatingSlug === cSlug || (Boolean(navigatingSlug) && navigatingSlug === course.id)
                return (
                  <CareerCourseCard
                    key={course.id || course.slug}
                    course={course}
                    onQuickEnroll={() => onQuickEnroll(course)}
                    userTier={userTier}
                    isSelected={isSelected}
                    onSelect={() => onSelectCourse?.(cSlug)}
                  />
                )
              })}
            </div>

            {/* Numbered Pagination when courses exceed 2 rows (> 6 courses) */}
            {totalPages > 1 && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-hairline/80">
                {/* Page Indicator & Range */}
                <div className="text-xs font-mono text-muted-foreground flex items-center gap-2">
                  <span>
                    Showing <strong className="text-foreground">{startIndex + 1}–{endIndex}</strong> of{" "}
                    <strong className="text-foreground">{totalCourses}</strong> programs
                  </span>
                  <span className="text-muted-foreground/40">•</span>
                  <span>
                    Page <strong className="text-foreground">{currentPage}</strong> of{" "}
                    <strong className="text-foreground">{totalPages}</strong>
                  </span>
                </div>

                {/* Page Numbers to Change Page */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="h-9 px-3 rounded-xl border border-hairline bg-card hover:bg-secondary text-xs font-mono font-medium text-foreground flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  {pageNumbers.map((pageNum, idx) => {
                    if (pageNum === "...") {
                      return (
                        <span key={`dots-${idx}`} className="px-1 text-xs font-mono text-muted-foreground select-none">
                          ...
                        </span>
                      )
                    }
                    const isCurrent = pageNum === currentPage
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => handlePageChange(pageNum as number)}
                        className={`h-9 w-9 rounded-xl border text-xs font-mono font-semibold flex items-center justify-center transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-primary text-primary-foreground border-primary shadow-xs scale-105"
                            : "border-hairline bg-card hover:bg-secondary text-muted-foreground hover:text-foreground"
                        }`}
                        aria-label={`Page ${pageNum}`}
                        aria-current={isCurrent ? "page" : undefined}
                      >
                        {pageNum}
                      </button>
                    )
                  })}

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="h-9 px-3 rounded-xl border border-hairline bg-card hover:bg-secondary text-xs font-mono font-medium text-foreground flex items-center gap-1 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
                    aria-label="Next page"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* CAROUSEL LAYOUT: Strictly contained within width, 0px left offset */
          <div className="space-y-4">
            <div
              ref={shelfRef}
              className="w-full flex gap-5 overflow-x-auto snap-x snap-proximity scroll-smooth py-1 no-scrollbar touch-auto"
            >
              {track.courses.map((course) => {
                const cSlug = course.slug || course.id
                const isSelected = navigatingSlug === cSlug || (Boolean(navigatingSlug) && navigatingSlug === course.id)
                return (
                  <div key={course.id || course.slug} className="w-full sm:w-[320px] md:w-[340px] shrink-0 snap-start">
                    <CareerCourseCard
                      course={course}
                      onQuickEnroll={() => onQuickEnroll(course)}
                      userTier={userTier}
                      isSelected={isSelected}
                      onSelect={() => onSelectCourse?.(cSlug)}
                    />
                  </div>
                )
              })}
            </div>

            {/* Carousel Progress & Indicator */}
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1">
              <span>Showing {totalCourses} verified programs · Scroll horizontally</span>
              <div className="w-24 sm:w-32 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  ref={progressBarRef}
                  className={`h-full ${visuals.dotColor} will-change-[width]`}
                  style={{ width: "20%" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* -------------------------------------------------------------
   3. REDESIGNED COURSE CARD: HIGH IMPACT, DASHBOARD-GRADE & CRISP
------------------------------------------------------------- */
function CareerCourseCard({
  course,
  onQuickEnroll,
  userTier,
  isSelected = false,
  onSelect
}: {
  course: CareerRoleCourse
  onQuickEnroll: () => void
  userTier?: string | null
  isSelected?: boolean
  onSelect?: () => void
}) {
  const { isEnrolled, getEnrollment, enroll } = useEnrollments()
  const courseSlug = course.slug || course.id
  const href = `/courses/${courseSlug}`
  const enrolled = isEnrolled(courseSlug) || isEnrolled(course.id)
  const enrolledData = getEnrollment(courseSlug) || getEnrollment(course.id)
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
      modules: 4,
      duration: course.duration,
      thumbnail: course.thumbnail,
      progressPercent: 0,
      lessonsCompleted: 0,
      totalLessons: 12,
    })
    enrollInCourse(courseSlug).catch(() => {})
    onQuickEnroll()
  }

  return (
    <div className={`w-full h-full relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card transition-all duration-200 ease-out hover:-translate-y-1 shadow-xs hover:shadow-md group ${
      isSelected
        ? "border-primary ring-2 ring-primary/40 shadow-lg shadow-primary/10"
        : "border-stone-200/80 dark:border-stone-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/30"
    }`}>
      {isSelected && (
        <div className="absolute inset-0 z-30 bg-background/60 dark:bg-black/60 backdrop-blur-[1.5px] flex items-center justify-center p-4 select-none">
          <div className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-lg shadow-primary/25 animate-pulse">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Launching {course.title.split(" ")[0]}...</span>
          </div>
        </div>
      )}
      <div>
        {/* 16:9 Thumbnail Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

          {/* Top-Left Partner / Category Pill */}
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-white/95 dark:bg-stone-900/95 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-bold text-foreground border border-stone-200/60 dark:border-stone-700/60 uppercase tracking-wider shadow-2xs select-none">
              {course.category}
            </span>
          </div>

          {/* Top-Right Level Pill & Wishlist Button */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
            <span className="inline-flex items-center rounded-full bg-black/60 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-medium text-white shadow-xs select-none">
              {course.level}
            </span>
            <WishlistButton
              course={{
                id: course.id,
                slug: courseSlug,
                title: course.title,
                category: course.category,
                level: course.level,
                duration: course.duration,
                href: href,
                thumbnail: course.thumbnail
              }}
              variant="icon"
              className="h-7 w-7 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-blue-400 shadow-xs active:scale-95 transition-transform"
            />
          </div>

          {/* Bottom Overlay Info on Thumbnail */}
          <div className="absolute left-3 bottom-2.5 z-10 text-[11px] font-mono font-semibold text-white/90 drop-shadow-sm truncate max-w-[85%]">
            {course.partner || course.credential}
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-2.5">
          {/* Rating and Credential Metadata */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span className="text-[11px] truncate max-w-[200px] text-muted-foreground font-medium">
              {course.credential}
            </span>
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold shrink-0">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
              {course.reviews && (
                <span className="text-[10px] text-muted-foreground font-normal">
                  ({course.reviews})
                </span>
              )}
            </div>
          </div>

          {/* Course Title */}
          <Link
            href={href}
            onClick={() => onSelect?.()}
            className="block group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
          >
            <h4 className="font-serif text-base sm:text-lg font-semibold tracking-tight text-foreground line-clamp-2 leading-snug">
              {course.title}
            </h4>
          </Link>

          {/* Duration & Estimated Effort */}
          <div className="text-[11px] font-mono text-muted-foreground">
            <span>Duration: {course.duration}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {course.description}
          </p>

          {/* Progress Bar if Enrolled */}
          {enrolled && (
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>{enrolledData?.lessonsCompleted ?? 0} / {enrolledData?.totalLessons ?? 12} Lessons</span>
                <span className="text-blue-600 dark:text-blue-400 font-bold">{enrolledData?.progressPercent ?? 0}%</span>
              </div>
              <div className="w-full h-1.5 bg-stone-100 dark:bg-stone-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${enrolledData?.progressPercent ?? 0}%` }}
                />
              </div>
            </div>
          )}

          {/* Skill Chips */}
          {!enrolled && course.skills && course.skills.length > 0 && (
            <div className="pt-1 flex items-center gap-1.5 flex-wrap">
              {course.skills.slice(0, 2).map((skill, i) => (
                <span
                  key={i}
                  className="rounded-md bg-secondary/80 border border-hairline px-2 py-0.5 text-[10px] font-mono text-foreground/80 truncate max-w-[130px]"
                >
                  {skill}
                </span>
              ))}
              {course.skills.length > 2 && (
                <span className="text-[10px] text-muted-foreground font-mono">
                  +{course.skills.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-4 pt-3 flex items-center justify-between border-t border-stone-100 dark:border-stone-800/80 mt-auto bg-stone-50/40 dark:bg-stone-900/20">
        {isSelected ? (
          <div className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-white text-xs font-semibold shadow-xs">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span>Launching course...</span>
          </div>
        ) : enrolled ? (
          <div className="w-full flex items-center gap-2">
            <Link
              href={lessonHref}
              onClick={() => onSelect?.()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-600 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all active:scale-[0.98] cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5" />
              <span>Continue</span>
            </Link>
            <Link
              href={href}
              onClick={() => onSelect?.()}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-card hover:bg-secondary text-xs font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer active:scale-[0.98] shrink-0"
            >
              <span>Explore</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        ) : (
          <div className="w-full flex items-center gap-2">
            <button
              onClick={handleEnrollClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-600 text-white transition-all text-xs font-semibold cursor-pointer shadow-md shadow-blue-500/20 active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Enroll Track</span>
            </button>
            <Link
              href={href}
              onClick={() => onSelect?.()}
              className="inline-flex items-center justify-center gap-1 px-3 py-2 rounded-xl border border-stone-200 dark:border-stone-800 bg-card hover:bg-secondary text-xs font-medium text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer active:scale-[0.98] shrink-0"
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
