"use client"

import React, { useRef, useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Clock,
  ArrowRight,
  ExternalLink,
  BrainCircuit,
  BarChart3,
  ShieldCheck,
  Code2,
  Check,
  Plus,
  PlayCircle
} from "lucide-react"
import { CareerRoleTrack, CareerRoleCourse } from "@/lib/career-roles-data"
import { WishlistButton } from "@/components/courses/wishlist-button"
import { useEnrollments } from "@/lib/user-learning-store"

interface CareerRoleShelfProps {
  track: CareerRoleTrack
  onQuickEnroll: (course: CareerRoleCourse) => void
  userTier?: string | null
}

function getRoleIcon(trackId: string) {
  switch (trackId) {
    case "machine-learning-engineer":
      return <BrainCircuit className="h-4 w-4 text-primary" />
    case "data-scientist":
      return <BarChart3 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
    case "cyber-security-specialist":
      return <ShieldCheck className="h-4 w-4 text-sky-600 dark:text-sky-400" />
    default:
      return <Code2 className="h-4 w-4 text-primary" />
  }
}

export function CareerRoleShelf({
  track,
  onQuickEnroll,
  userTier
}: CareerRoleShelfProps) {
  const shelfRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const tickingRef = useRef(false)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    if (tickingRef.current) return
    tickingRef.current = true

    window.requestAnimationFrame(() => {
      tickingRef.current = false
      const el = shelfRef.current
      if (!el) return
      const { scrollLeft, scrollWidth, clientWidth } = el

      // Only update boolean state when it actually flips
      const nextCanLeft = scrollLeft > 10
      const nextCanRight = scrollLeft + clientWidth < scrollWidth - 10
      setCanScrollLeft((prev) => (prev !== nextCanLeft ? nextCanLeft : prev))
      setCanScrollRight((prev) => (prev !== nextCanRight ? nextCanRight : prev))

      // Direct DOM update: 0 React re-renders while scrolling
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
    <div className="relative py-7 border-b border-hairline/70 last:border-b-0">
      {/* Role Shelf Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-hairline bg-secondary/80 text-foreground font-mono text-[11px]">
              {getRoleIcon(track.id)}
              <span className="font-semibold uppercase tracking-wider">{track.title}</span>
            </div>
            <span className="text-[11px] font-mono text-muted-foreground border border-hairline rounded-full px-2 py-0.5 bg-card">
              {track.badgeText}
            </span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-medium tracking-tight text-foreground">
            {track.headline}
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {track.description}
          </p>
        </div>

        {/* Carousel Navigation Arrows & Track Count */}
        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
          <Link
            href={track.goalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>{track.goalLabel}</span>
            <ExternalLink className="h-3 w-3" />
          </Link>

          <span className="text-xs font-mono text-muted-foreground">
            {track.courses.length} courses
          </span>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className="h-8 w-8 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
              aria-label="Previous courses"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className="h-8 w-8 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground flex items-center justify-center disabled:opacity-25 disabled:pointer-events-none transition-colors cursor-pointer shadow-2xs"
              aria-label="Next courses"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Carousel (Smooth Touch & Snap) */}
      <div className="relative">
        <div
          ref={shelfRef}
          className="flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar py-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 touch-pan-x overscroll-x-contain"
        >
          {track.courses.map((course) => (
            <CareerCourseCard
              key={course.id || course.slug}
              course={course}
              onQuickEnroll={() => onQuickEnroll(course)}
              userTier={userTier}
            />
          ))}
        </div>

        {/* Dynamic Hairline Progress Bar */}
        <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
          <span className="hidden sm:inline">
            Showing {track.courses.length} verified programs
          </span>
          <span className="sm:hidden">
            Swipe horizontally
          </span>
          <div className="w-20 sm:w-28 h-1 rounded-full bg-secondary overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-primary will-change-[width]"
              style={{ width: "15%" }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------
   Course Card Component (Dashboard Aesthetic & Real-Time Sync)
------------------------------------------------------------- */
function CareerCourseCard({
  course,
  onQuickEnroll,
  userTier
}: {
  course: CareerRoleCourse
  onQuickEnroll: () => void
  userTier?: string | null
}) {
  const { isEnrolled, getEnrollment, enroll } = useEnrollments()
  const courseSlug = course.slug || course.id
  const href = `/courses/${courseSlug}`
  const enrolled = isEnrolled(courseSlug) || isEnrolled(course.id)
  const enrolledData = getEnrollment(courseSlug) || getEnrollment(course.id)
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
      modules: 4,
      duration: course.duration,
      thumbnail: course.thumbnail,
      progressPercent: 0,
      lessonsCompleted: 0,
      totalLessons: 12,
    })
    onQuickEnroll()
  }

  return (
    <div className="w-[85vw] sm:w-[320px] md:w-[340px] shrink-0 snap-start flex flex-col justify-between overflow-hidden rounded-3xl border border-stone-200/80 dark:border-stone-800/80 bg-card hover:border-amber-500/40 dark:hover:border-amber-500/30 transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 shadow-xs hover:shadow-md will-change-[transform] group">
      <div>
        {/* 16:9 Thumbnail Image: Clean Dashboard Cover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 85vw, 340px"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none"
          />
          <div className="absolute inset-0 bg-black/20" />

          {/* Top-Left Category Pill (Dashboard Style) */}
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-flex items-center rounded-full bg-white/90 dark:bg-stone-900/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-bold text-foreground border border-stone-200/60 dark:border-stone-700/60 uppercase tracking-wider shadow-2xs select-none">
              {course.category}
            </span>
          </div>

          {/* Top-Right Level Pill & Wishlist Button */}
          <div className="absolute right-3 top-3 z-10 flex items-center gap-1.5">
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
                duration: course.duration,
                href: href,
                thumbnail: course.thumbnail
              }}
              variant="icon"
              className="h-6 w-6 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-amber-400 shadow-xs active:scale-95 transition-transform"
            />
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-5 space-y-2.5">
          {/* Eyebrow: Partner/Institution & Rating */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
            <span className="truncate max-w-[200px] font-semibold text-primary text-[11px] tracking-wide uppercase">
              {course.partner || course.credential}
            </span>
            <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 font-bold shrink-0">
              <Star className="h-3 w-3 fill-current" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Title */}
          <Link href={href} className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            <h4 className="font-serif text-base font-semibold tracking-tight text-foreground line-clamp-2 leading-snug">
              {course.title}
            </h4>
          </Link>

          {/* Credential & Duration */}
          <div className="text-[11px] font-mono text-muted-foreground">
            <span>{course.credential} · {course.duration}</span>
          </div>

          {/* Description */}
          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
            {course.description}
          </p>

          {/* Live Progress Bar if Enrolled */}
          {enrolled && (
            <div className="pt-2 space-y-1.5">
              <div className="flex justify-between text-[11px] font-mono text-muted-foreground">
                <span>{enrolledData?.lessonsCompleted ?? 0} / {enrolledData?.totalLessons ?? 12} Lessons</span>
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

          {/* Top 2 Skills Chips if not enrolled */}
          {!enrolled && course.skills && course.skills.length > 0 && (
            <div className="pt-1 flex items-center gap-1.5 flex-wrap">
              {course.skills.slice(0, 2).map((skill, i) => (
                <span
                  key={i}
                  className="rounded-md bg-secondary/80 border border-hairline px-2 py-0.5 text-[10px] font-medium text-foreground/80 truncate max-w-[130px]"
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
