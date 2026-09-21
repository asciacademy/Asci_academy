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
    const timer = setTimeout(updateScrollState, 150)
    el.addEventListener("scroll", updateScrollState, { passive: true })
    window.addEventListener("resize", updateScrollState, { passive: true })
    return () => {
      clearTimeout(timer)
      el.removeEventListener("scroll", updateScrollState)
      window.removeEventListener("resize", updateScrollState)
    }
  }, [updateScrollState, track.courses.length])

  const scroll = (direction: "left" | "right") => {
    const el = shelfRef.current
    if (!el) return
    const card = el.querySelector<HTMLElement>(".career-shelf-card-wrapper")
    const step = card ? card.offsetWidth + 20 : 360
    const visibleCount = Math.max(1, Math.floor(el.clientWidth / step))
    const scrollAmount = step * visibleCount
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
            In-demand skills for <span className="text-primary">{track.title}</span> roles
          </h3>

          <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 leading-relaxed">
            {track.headline}
          </p>
        </div>
      </div>

      {/* -------------------------------------------------------------
          2. FLUID HORIZONTAL SCROLL COURSE SHELF WITH CLOUD EFFECT & SIDE ARROWS
      ------------------------------------------------------------- */}
      <div className="w-full overflow-visible space-y-2">
        {/* Shelf Viewport Wrapper with Cloud Vignettes & Floating Navigation Arrows */}
        <div className="relative group/shelf">
          {/* Left Cloud / Fog Gradient Mask */}
          <div
            className={`absolute -left-3.5 sm:left-0 top-0 bottom-0 w-10 sm:w-20 z-20 pointer-events-none transition-opacity duration-300 bg-gradient-to-r from-background via-background/60 to-transparent ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />

          {/* Right Cloud / Fog Gradient Mask */}
          <div
            className={`absolute -right-3.5 sm:right-0 top-0 bottom-0 w-10 sm:w-20 z-20 pointer-events-none transition-opacity duration-300 bg-gradient-to-l from-background via-background/60 to-transparent ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden="true"
          />

          {/* Left Side Floating Arrow Button */}
          <div
            className={`absolute left-0.5 sm:left-2 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 ${
              canScrollLeft
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-75 pointer-events-none"
            }`}
          >
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll courses left"
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-card/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-700/90 text-foreground flex items-center justify-center shadow-md hover:shadow-xl hover:scale-110 active:scale-95 hover:border-primary/50 transition-all cursor-pointer group/btn"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/85 group-hover/btn:text-primary transition-colors" />
            </button>
          </div>

          {/* Right Side Floating Arrow Button */}
          <div
            className={`absolute right-0.5 sm:right-2 top-1/2 -translate-y-1/2 z-30 transition-all duration-300 ${
              canScrollRight
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-75 pointer-events-none"
            }`}
          >
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll courses right"
              className="h-9 w-9 sm:h-11 sm:w-11 rounded-full bg-card/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/90 dark:border-stone-700/90 text-foreground flex items-center justify-center shadow-md hover:shadow-xl hover:scale-110 active:scale-95 hover:border-primary/50 transition-all cursor-pointer group/btn"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-foreground/85 group-hover/btn:text-primary transition-colors" />
            </button>
          </div>

          {/* Scrollable Shelf Track */}
          <div
            ref={shelfRef}
            className="w-[calc(100%+1.75rem)] -mx-3.5 px-3.5 sm:w-full sm:mx-0 sm:px-0 flex gap-3.5 sm:gap-5 overflow-x-auto snap-x snap-mandatory py-2.5 no-scrollbar scroll-smooth touch-pan-x"
          >
            {track.courses.map((course) => {
              const cSlug = course.slug || course.id
              const isSelected = navigatingSlug === cSlug || (Boolean(navigatingSlug) && navigatingSlug === course.id)
              return (
                <div
                  key={course.id || course.slug}
                  className="career-shelf-card-wrapper w-[76vw] sm:w-[330px] md:w-[350px] shrink-0 snap-start"
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
            {/* Explicit end spacer so last card has comfortable breathing margin */}
            <div className="w-6 sm:hidden shrink-0 pointer-events-none select-none" aria-hidden="true" />
          </div>
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
   3. AUTHENTIC COURSERA CARD (Partner Avatar, Skills, Rating & Badge)
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

  // Format comma-separated skills list like Coursera
  const skillsList =
    course.skills && course.skills.length > 0
      ? course.skills.join(", ")
      : "Probability & Statistics, Algorithms, Deep Learning, Python Programming, Model Optimization"

  return (
    <div className={`w-full h-full relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card transition-all duration-200 ease-out hover:-translate-y-1 group ${
      isSelected
        ? "border-primary ring-1 ring-primary/40 shadow-sm"
        : "border-stone-200/90 dark:border-stone-800/90 hover:border-primary/40 shadow-2xs"
    }`}>
      {isSelected && (
        <div className="absolute inset-0 z-30 bg-background/60 dark:bg-black/60 backdrop-blur-[1.5px] flex items-center justify-center p-4 select-none">
          <div className="flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-semibold shadow-xs">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Launching {course.title.split(" ")[0]}...</span>
          </div>
        </div>
      )}

      <div>
        {/* 2:1 Widescreen Cover Image with Category & Wishlist */}
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-secondary group/thumb">
          <Link
            href={href}
            onClick={() => onSelect?.()}
            className="absolute inset-0 block cursor-pointer z-0"
            aria-label={`View ${course.title} course`}
          >
            <Image
              src={course.thumbnail}
              alt={course.title}
              fill
              sizes="(max-width: 640px) 100vw, 360px"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105 select-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          </Link>

          {/* Top-Left Category Pill */}
          <div className="absolute left-2.5 top-2.5 z-10 pointer-events-none">
            <span className="inline-flex items-center rounded-full bg-background/90 dark:bg-black/90 backdrop-blur-xs px-2.5 py-0.5 text-[10px] font-mono font-semibold text-foreground border border-hairline uppercase tracking-wider select-none">
              {course.category}
            </span>
          </div>

          {/* Top-Right Wishlist Button */}
          <div
            className="absolute right-2.5 top-2.5 z-10"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
          >
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
              className="h-7 w-7 bg-black/60 backdrop-blur-xs border border-white/20 text-white hover:text-amber-400 shadow-xs active:scale-95 transition-transform cursor-pointer"
            />
          </div>
        </div>

        {/* Card Body - Coursera Structure */}
        <div className="p-3.5 sm:p-4 space-y-2">
          {/* Educator / Partner Row with avatar */}
          <div className="flex items-center gap-2 text-xs font-medium text-foreground/90">
            <div className="w-5 h-5 rounded-md bg-primary/10 border border-primary/20 flex items-center justify-center text-[9px] font-bold text-primary shrink-0 uppercase overflow-hidden">
              {course.partner?.slice(0, 2) || "AS"}
            </div>
            <span className="truncate">{course.partner || "ASCI Institute"}</span>
          </div>

          {/* Course Title */}
          <Link
            href={href}
            onClick={() => onSelect?.()}
            className="block group-hover:text-primary transition-colors"
          >
            <h4 className="font-serif text-base sm:text-[17px] font-medium tracking-tight text-foreground line-clamp-2 leading-snug">
              {course.title}
            </h4>
          </Link>

          {/* Coursera Signature: "Skills you'll gain:" */}
          <div className="text-[11px] sm:text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            <span className="font-semibold text-foreground/90">Skills you'll gain: </span>
            <span>{skillsList}</span>
          </div>

          {/* Clean Meta: Rating · Duration · Level */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap pt-0.5">
            <div className="flex items-center gap-1 text-foreground font-semibold shrink-0">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-500" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-muted-foreground font-normal">({course.reviews || "10K+"})</span>
            </div>
            <span>·</span>
            <span>{course.level || "Beginner"}</span>
            <span>·</span>
            <span className="truncate">{course.credential || "Specialization"}</span>
            {course.duration && (
              <>
                <span>·</span>
                <span className="shrink-0">{course.duration}</span>
              </>
            )}
          </div>

          {/* Coursera Status / Category Badge */}
          {course.badge && (
            <div className="pt-0.5">
              <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-mono font-semibold uppercase tracking-wider ${
                course.badge.toLowerCase().includes("top")
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : course.badge.toLowerCase().includes("bestseller")
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  : "bg-secondary text-muted-foreground border border-hairline"
              }`}>
                {course.badge}
              </span>
            </div>
          )}

          {/* Progress Bar if Enrolled */}
          {enrolled && (
            <div className="pt-1.5 space-y-1.5">
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
      <div className="px-3.5 py-2.5 sm:px-4.5 flex items-center justify-between border-t border-hairline mt-auto bg-card">
        {isSelected ? (
          <div className="w-full inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span>Launching course...</span>
          </div>
        ) : enrolled ? (
          <div className="w-full flex items-center gap-1.5 sm:gap-2">
            <Link
              href={lessonHref}
              onClick={() => onSelect?.()}
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary/90 transition-all active:scale-[0.98] cursor-pointer"
            >
              <PlayCircle className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Continue</span>
            </Link>
            <Link
              href={href}
              onClick={() => onSelect?.()}
              className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl border border-hairline bg-secondary hover:bg-card text-xs font-medium text-foreground transition-colors cursor-pointer active:scale-[0.98] shrink-0"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </Link>
            {isAdmin && (
              <Link
                href={`/admin/courses/${course.id}/edit`}
                className="inline-flex items-center justify-center gap-1 px-2 sm:px-2.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-colors shrink-0"
                title="Edit Course in Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </div>
        ) : (
          <div className="w-full flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleEnrollClick}
              className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all text-xs font-semibold cursor-pointer shadow-xs active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Enroll</span>
            </button>
            <Link
              href={href}
              onClick={() => onSelect?.()}
              className="inline-flex items-center justify-center gap-1 px-2.5 sm:px-3 py-2 rounded-xl border border-hairline bg-secondary hover:bg-card text-xs font-medium text-foreground transition-colors cursor-pointer active:scale-[0.98] shrink-0"
            >
              <span>Details</span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </Link>
            {isAdmin && (
              <Link
                href={`/admin/courses/${course.id}/edit`}
                className="inline-flex items-center justify-center gap-1 px-2 sm:px-2.5 py-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold transition-colors shrink-0"
                title="Edit Course in Admin Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Admin</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
