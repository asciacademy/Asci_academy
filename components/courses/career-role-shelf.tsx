"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
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
  Plus,
  PlayCircle,
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
  isAdmin?: boolean
}

function getRoleVisuals(trackId: string) {
  switch (trackId) {
    case "machine-learning-engineer":
      return {
        icon: <BrainCircuit className="h-3.5 w-3.5 text-primary" />,
        dotColor: "bg-primary"
      }
    case "data-scientist":
      return {
        icon: <BarChart3 className="h-3.5 w-3.5 text-primary" />,
        dotColor: "bg-primary"
      }
    case "cyber-security-specialist":
      return {
        icon: <ShieldCheck className="h-3.5 w-3.5 text-primary" />,
        dotColor: "bg-primary"
      }
    default:
      return {
        icon: <Code2 className="h-3.5 w-3.5 text-primary" />,
        dotColor: "bg-primary"
      }
  }
}

export function CareerRoleShelf({
  track,
  onQuickEnroll,
  userTier,
  navigatingSlug,
  onSelectCourse,
  isAdmin = false
}: CareerRoleShelfProps) {
  const shelfContainerRef = useRef<HTMLDivElement>(null)
  const shelfRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const tickingRef = useRef(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const visuals = getRoleVisuals(track.id)
  const totalCourses = track.courses.length

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
    const el = shelfRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState, { passive: true })
    return () => {
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState, track.courses.length])

  const scroll = (direction: "left" | "right") => {
    const el = shelfRef.current
    if (!el) return
    const scrollAmount = Math.max(300, el.clientWidth * 0.75)
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    })
  }

  return (
    <div
      ref={shelfContainerRef}
      id={`role-shelf-${track.id}`}
      className="relative w-full py-6 sm:py-8 border-b border-hairline/60 last:border-b-0 scroll-mt-24 space-y-4"
    >
      {/* -------------------------------------------------------------
          1. CLEAN, BORDERLESS ROLE HEADER
      ------------------------------------------------------------- */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-1">
        <div className="space-y-1.5 max-w-3xl">
          {/* Track Category & Program Count */}
          <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono mb-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md border border-hairline bg-secondary/50 dark:bg-black text-foreground font-semibold uppercase tracking-wider">
              {visuals.icon}
              <span>{track.roleCategory || track.title}</span>
            </div>

            <span className="text-muted-foreground/70">
              • {totalCourses} Courses in Track
            </span>
          </div>

          {/* Main Title & Headline */}
          <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-tight text-foreground">
            {track.title}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 leading-relaxed">
            {track.headline}
          </p>
        </div>

        {/* Action Link & Desktop Horizontal Scroll Arrow Controls */}
        <div className="flex items-center gap-3 shrink-0 self-start sm:self-end">
          <Link
            href={track.goalUrl || "/programs"}
            className="inline-flex items-center gap-1 text-xs font-mono font-medium text-primary hover:underline group"
          >
            <span>Explore Role Roadmap</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          {/* Desktop Left/Right Arrow Buttons */}
          <div className="hidden sm:flex items-center gap-1.5 ml-1">
            <button
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-full border border-hairline bg-card hover:bg-secondary text-foreground flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-full border border-hairline bg-card hover:bg-secondary text-foreground flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. SIMPLE & FLUID HORIZONTAL SCROLL COURSE SHELF
      ------------------------------------------------------------- */}
      <div className="w-full">
        <div
          ref={shelfRef}
          className="w-full flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory py-2 no-scrollbar scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
        >
          {track.courses.map((course) => {
            const cSlug = course.slug || course.id
            const isSelected = navigatingSlug === cSlug || (Boolean(navigatingSlug) && navigatingSlug === course.id)
            return (
              <div
                key={course.id || course.slug}
                className="w-[310px] sm:w-[350px] md:w-[370px] shrink-0 snap-start"
              >
                <CareerCourseCard
                  course={course}
                  onQuickEnroll={() => onQuickEnroll(course)}
                  userTier={userTier}
                  isSelected={isSelected}
                  onSelect={() => onSelectCourse?.(cSlug)}
                  isAdmin={isAdmin}
                />
              </div>
            )
          })}
        </div>

        {/* Subtle Horizontal Scroll Indicator */}
        <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground pt-1 px-0.5">
          <span className="text-muted-foreground/70">
            {totalCourses} courses • Scroll horizontally to explore
          </span>
          <div className="w-24 sm:w-32 h-1 rounded-full bg-secondary overflow-hidden">
            <div
              ref={progressBarRef}
              className={`h-full ${visuals.dotColor} transition-all duration-150`}
              style={{ width: "25%" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------
   3. CLEAN & ELEGANT COURSE CARD
------------------------------------------------------------- */
function CareerCourseCard({
  course,
  onQuickEnroll,
  userTier,
  isSelected = false,
  onSelect,
  isAdmin = false
}: {
  course: CareerRoleCourse
  onQuickEnroll: () => void
  userTier?: string | null
  isSelected?: boolean
  onSelect?: () => void
  isAdmin?: boolean
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
    <div className={`w-full h-full relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card transition-all duration-200 ease-out hover:-translate-y-1 group ${
      isSelected
        ? "border-primary ring-1 ring-primary/40"
        : "border-hairline hover:border-primary/40"
    }`}>
      {isSelected && (
        <div className="absolute inset-0 z-30 bg-background/60 dark:bg-black/60 backdrop-blur-[1.5px] flex items-center justify-center p-4 select-none">
          <div className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Launching {course.title.split(" ")[0]}...</span>
          </div>
        </div>
      )}

      <div>
        {/* 2:1 Widescreen Thumbnail Image Cover - Reduced Height */}
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-secondary">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 310px, 370px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none pointer-events-none"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          {/* Top-Left Category Pill */}
          <div className="absolute left-2.5 top-2.5 z-10">
            <span className="inline-flex items-center rounded-full bg-background/90 dark:bg-black/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-semibold text-foreground border border-hairline uppercase tracking-wider select-none">
              {course.category}
            </span>
          </div>

          {/* Top-Right Wishlist Button */}
          <div className="absolute right-2.5 top-2.5 z-10">
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
              className="h-7 w-7 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-amber-400 shadow-xs active:scale-95 transition-transform"
            />
          </div>
        </div>

        {/* Card Content Body - Streamlined Height */}
        <div className="p-3.5 sm:px-4.5 sm:py-3 space-y-1.5">
          {/* Partner Attribution */}
          <p className="text-[11px] font-mono text-muted-foreground truncate">
            Offered by <span className="font-semibold text-foreground/90">{course.partner || "ASCI Institute"}</span>
          </p>

          {/* Course Title */}
          <Link
            href={href}
            onClick={() => onSelect?.()}
            className="block group-hover:text-primary transition-colors"
          >
            <h4 className="font-serif text-base sm:text-lg font-medium tracking-tight text-foreground line-clamp-2 leading-snug">
              {course.title}
            </h4>
          </Link>

          {/* Clean Meta: Rating · Duration · Level */}
          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1 text-amber-500 font-bold shrink-0">
              <Star className="h-3.5 w-3.5 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
            <span>•</span>
            <span>{course.duration}</span>
            <span>•</span>
            <span className="text-foreground/80 font-medium">{course.level || "Beginner"}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 pt-0.5">
            {course.description}
          </p>

          {/* Progress Bar if Enrolled */}
          {enrolled && (
            <div className="pt-2 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                <span>{enrolledData?.lessonsCompleted ?? 0} / {enrolledData?.totalLessons ?? 12} Lessons</span>
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
      <div className="px-4 py-2 sm:px-4.5 flex items-center justify-between border-t border-hairline mt-auto bg-card">
        {isSelected ? (
          <div className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Launching course...</span>
          </div>
        ) : enrolled ? (
          <div className="w-full flex items-center gap-2">
            <Link
              href={lessonHref}
              onClick={() => onSelect?.()}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 transition-all active:scale-[0.98] cursor-pointer"
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
              <Link
                href={`/admin/courses/${course.id}/edit`}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-colors shrink-0"
                title="Edit Course in Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="w-full flex items-center gap-2">
            <button
              onClick={handleEnrollClick}
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-xs font-semibold cursor-pointer shadow-xs active:scale-[0.98]"
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
              <Link
                href={`/admin/courses/${course.id}/edit`}
                className="inline-flex items-center justify-center gap-1 px-2.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-colors shrink-0"
                title="Edit Course in Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
