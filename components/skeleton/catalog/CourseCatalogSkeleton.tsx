import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { CourseGridSkeleton } from "../courses/CourseGridSkeleton"
import { PaginationSkeleton } from "./PaginationSkeleton"

export interface CourseCatalogSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  itemCount?: number
}

export function CourseCatalogSkeleton({
  itemCount = 6,
  className,
  ...props
}: CourseCatalogSkeletonProps) {
  return (
    <section
      aria-busy="true"
      className={cn("py-12 sm:py-16 bg-background relative", className)}
      {...props}
    >
      <div className="relative mx-auto max-w-[1400px] px-3.5 sm:px-6 lg:px-8 space-y-8">
        {/* 1. Academic Catalog Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-2">
          <div className="max-w-2xl space-y-3">
            <Skeleton className="h-6 w-36" rounded="full" />
            <Skeleton className="h-9 sm:h-11 w-4/5 max-w-xl" rounded="md" />
            <Skeleton className="h-4 sm:h-5 w-full max-w-lg" rounded="xs" />
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-10 w-32" rounded="full" />
            <Skeleton className="h-10 w-10" rounded="full" />
          </div>
        </div>

        {/* 2. Search & Toolbar Strip */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-2 rounded-2xl border border-border/80 dark:border-white/10 bg-card/60">
          {/* Search Box */}
          <div className="flex items-center gap-2.5 px-3 py-2 flex-1">
            <Skeleton className="h-4 w-4" rounded="xs" />
            <Skeleton className="h-4 w-60 sm:w-80" rounded="xs" />
          </div>

          {/* Filter Trigger & Sort dropdowns */}
          <div className="flex items-center gap-2 px-2">
            <Skeleton className="h-9 w-24" rounded="xl" />
            <Skeleton className="h-9 w-32" rounded="xl" />
            <Skeleton className="h-9 w-20" rounded="xl" />
          </div>
        </div>

        {/* 3. Category Filter Navigation Pills */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-1">
          {["All Programs", "AI & ML", "Data Science", "Cybersecurity", "Web & Full-Stack", "Systems", "DSA"].map((_, i) => (
            <Skeleton
              key={i}
              className="h-8 w-28 sm:w-32 shrink-0"
              rounded="full"
            />
          ))}
        </div>

        {/* 4. Course Count indicator */}
        <div className="flex items-center justify-between text-xs pb-1">
          <Skeleton className="h-3.5 w-44" rounded="xs" />
          <Skeleton className="h-3.5 w-24" rounded="xs" />
        </div>

        {/* 5. Course Cards Grid */}
        <CourseGridSkeleton count={itemCount} />

        {/* 6. Strict Numbered Pagination Bar */}
        <PaginationSkeleton />
      </div>
    </section>
  )
}
