import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { CourseGridSkeleton } from "./CourseGridSkeleton"

export interface InteractiveCourseSectionSkeletonProps extends React.HTMLAttributes<HTMLElement> {}

export function InteractiveCourseSectionSkeleton({
  className,
  ...props
}: InteractiveCourseSectionSkeletonProps) {
  return (
    <section
      aria-busy="true"
      className={cn("py-16 lg:py-24 bg-background relative", className)}
      {...props}
    >
      <div className="relative mx-auto max-w-[1400px] px-3.5 sm:px-6 lg:px-8 space-y-8">
        {/* 1. Header with Badge & Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 pb-2">
          <div className="max-w-2xl space-y-3">
            <Skeleton className="h-6 w-36" rounded="full" />
            <Skeleton className="h-8 sm:h-10 w-3/4 max-w-lg" rounded="md" />
            <Skeleton className="h-4 sm:h-5 w-full max-w-md" rounded="xs" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-28" rounded="full" />
            <Skeleton className="h-9 w-24" rounded="full" />
          </div>
        </div>

        {/* 2. Interactive Category Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 py-1">
          {["All", "Web Dev", "Python", "C/C++", "DSA", "Backend", "Systems"].map((_, i) => (
            <Skeleton
              key={i}
              className="h-8 w-24 sm:w-28 shrink-0"
              rounded="full"
            />
          ))}
        </div>

        {/* 3. Course Grid Cards */}
        <CourseGridSkeleton count={6} />
      </div>
    </section>
  )
}
