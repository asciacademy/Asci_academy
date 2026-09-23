import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonImage } from "../SkeletonImage"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"

export type CourseCardSkeletonVariant = "grid" | "horizontal" | "compact" | "featured"

export interface CourseCardSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CourseCardSkeletonVariant
}

export function CourseCardSkeleton({
  variant = "grid",
  className,
  ...props
}: CourseCardSkeletonProps) {
  // 1. Compact Variant
  if (variant === "compact") {
    return (
      <div
        aria-busy="true"
        className={cn(
          "flex items-center gap-3.5 p-3 rounded-xl border border-border/80 dark:border-white/10 bg-card/80",
          className
        )}
        {...props}
      >
        <Skeleton className="h-14 w-14 rounded-lg shrink-0" />
        <div className="flex-1 min-w-0 space-y-1.5">
          <Skeleton className="h-4 w-3/4" rounded="xs" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16" rounded="xs" />
            <Skeleton className="h-3 w-12" rounded="xs" />
          </div>
        </div>
        <Skeleton className="h-8 w-16 rounded-lg shrink-0" />
      </div>
    )
  }

  // 2. Horizontal / Syllabus List Variant
  if (variant === "horizontal") {
    return (
      <div
        aria-busy="true"
        className={cn(
          "rounded-2xl border border-border/80 dark:border-white/10 bg-card overflow-hidden shadow-xs flex flex-col md:flex-row justify-between",
          className
        )}
        {...props}
      >
        <div className="relative w-full md:w-64 h-40 md:h-auto shrink-0 bg-stone-100 dark:bg-stone-900">
          <Skeleton className="w-full h-full rounded-none" />
          <div className="absolute top-2.5 left-2.5">
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
        </div>

        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5 rounded-md" />
                <Skeleton className="h-3 w-28" rounded="xs" />
              </div>
              <Skeleton className="h-4 w-16" rounded="full" />
            </div>

            <Skeleton className="h-5 w-4/5" rounded="sm" />
            <Skeleton className="h-3.5 w-full max-w-xl" rounded="xs" />
            <Skeleton className="h-3.5 w-3/4 max-w-md" rounded="xs" />
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-border/60">
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-20" rounded="xs" />
              <Skeleton className="h-3 w-16" rounded="xs" />
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  // 3. Featured Variant
  if (variant === "featured") {
    return (
      <div
        aria-busy="true"
        className={cn(
          "rounded-3xl border-2 border-primary/20 bg-card/90 overflow-hidden shadow-md p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center",
          className
        )}
        {...props}
      >
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center gap-2">
            <SkeletonBadge size="md" width="w-28" />
            <SkeletonBadge size="md" width="w-20" />
          </div>
          <Skeleton className="h-8 sm:h-10 w-4/5" rounded="md" />
          <div className="space-y-2 max-w-xl">
            <Skeleton className="h-4 w-full" rounded="xs" />
            <Skeleton className="h-4 w-5/6" rounded="xs" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Skeleton className="h-4 w-28" rounded="xs" />
            <Skeleton className="h-4 w-20" rounded="xs" />
            <Skeleton className="h-4 w-24" rounded="xs" />
          </div>
          <div className="flex items-center gap-3 pt-2">
            <SkeletonButton size="lg" className="w-36" rounded="xl" />
            <SkeletonButton size="lg" className="w-32" rounded="xl" />
          </div>
        </div>

        <div className="lg:col-span-5 aspect-[16/10] w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900">
          <Skeleton className="w-full h-full rounded-2xl" />
        </div>
      </div>
    )
  }

  // 4. Grid Variant (Default - Exact Match with Real CourseGridCard)
  return (
    <div
      aria-busy="true"
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-stone-200/90 dark:border-stone-800/90 bg-card shadow-xs transition-all",
        className
      )}
      {...props}
    >
      <div>
        {/* 2:1 Widescreen Cover Thumbnail Placeholder */}
        <div className="relative aspect-[2/1] w-full overflow-hidden bg-stone-100 dark:bg-stone-900">
          <Skeleton className="w-full h-full rounded-none" />

          {/* Top-Left Category Badge */}
          <div className="absolute top-2.5 left-2.5 z-10">
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>

          {/* Top-Right Bookmark Button */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <Skeleton className="h-7 w-7 rounded-full" />
          </div>
        </div>

        {/* Card Body */}
        <div className="p-3.5 sm:p-4 space-y-2.5">
          {/* Educator / Partner Row */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-5 rounded-md shrink-0" />
            <Skeleton className="h-3.5 w-28" rounded="xs" />
          </div>

          {/* Course Title (2 lines) */}
          <div className="space-y-1.5 pt-0.5">
            <Skeleton className="h-5 w-full" rounded="xs" />
            <Skeleton className="h-5 w-3/4" rounded="xs" />
          </div>

          {/* Skills You'll Gain: */}
          <div className="space-y-1 pt-0.5">
            <Skeleton className="h-3 w-5/6" rounded="xs" />
            <Skeleton className="h-3 w-2/3" rounded="xs" />
          </div>

          {/* Meta Line: Rating · Level · Type · Duration */}
          <div className="flex items-center gap-2 pt-1 flex-wrap">
            <Skeleton className="h-3.5 w-14" rounded="xs" />
            <Skeleton className="h-3.5 w-16" rounded="xs" />
            <Skeleton className="h-3.5 w-20" rounded="xs" />
          </div>

          {/* Status Badge */}
          <div className="pt-0.5">
            <Skeleton className="h-5 w-24 rounded-md" />
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-3.5 pt-2 border-t border-border/60 bg-card mt-auto flex items-center justify-between gap-2">
        <SkeletonButton size="sm" className="flex-1 h-9" rounded="xl" />
        <Skeleton className="h-9 w-20 rounded-xl" />
      </div>
    </div>
  )
}
