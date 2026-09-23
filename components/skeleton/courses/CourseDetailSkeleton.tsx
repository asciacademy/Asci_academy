import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"
import { SkeletonParagraph } from "../SkeletonParagraph"

export interface CourseDetailSkeletonProps extends React.HTMLAttributes<HTMLElement> {}

export function CourseDetailSkeleton({ className, ...props }: CourseDetailSkeletonProps) {
  return (
    <main
      aria-busy="true"
      className={cn("min-h-screen bg-background text-foreground select-none", className)}
      {...props}
    >
      {/* Top Navbar Clearance */}
      <div className="h-16 sm:h-[68px]" />

      {/* Hero Header Area */}
      <div className="relative border-b border-border/60 bg-gradient-to-b from-card/60 via-card/30 to-background py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Course Details Info */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb & Category Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <SkeletonBadge size="sm" width="w-32" />
                <Skeleton className="h-4 w-28" rounded="xs" />
              </div>

              {/* Title (2 lines) */}
              <div className="space-y-3">
                <Skeleton className="h-10 sm:h-12 w-11/12" rounded="xl" />
                <Skeleton className="h-10 sm:h-12 w-8/12" rounded="xl" />
              </div>

              {/* Description (3 lines) */}
              <SkeletonParagraph lines={3} />

              {/* Course Meta Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" rounded="xs" />
                  <Skeleton className="h-4 w-12" rounded="xs" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" rounded="xs" />
                  <Skeleton className="h-4 w-20" rounded="xs" />
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton className="h-4 w-4" rounded="xs" />
                  <Skeleton className="h-4 w-16" rounded="xs" />
                </div>
              </div>

              {/* Instructor / Partner Attribution */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <SkeletonAvatar size="md" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" rounded="xs" />
                  <Skeleton className="h-3 w-44" rounded="xs" />
                </div>
              </div>
            </div>

            {/* Right: Interactive Enrollment Card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xl">
                {/* 16:9 Video/Image Thumbnail placeholder */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-stone-100 dark:bg-stone-900">
                  <Skeleton className="w-full h-full rounded-none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <Skeleton className="h-8 w-24" rounded="md" />
                    <Skeleton className="h-4 w-16" rounded="xs" />
                  </div>
                  <SkeletonButton size="lg" className="w-full h-12 bg-primary/20" rounded="xl" />
                  <SkeletonButton size="md" className="w-full h-10 bg-secondary/80" rounded="xl" />
                </div>

                {/* Features Checklist */}
                <div className="space-y-2.5 pt-4 border-t border-border/50">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <Skeleton className="h-4 w-4 rounded-full" />
                      <Skeleton className="h-3.5 flex-1" rounded="xs" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
