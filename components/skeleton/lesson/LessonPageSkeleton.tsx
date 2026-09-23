import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"
import { SkeletonImage } from "../SkeletonImage"
import { SkeletonParagraph } from "../SkeletonParagraph"
import { CodeEditorSkeleton } from "../dsa/CodeEditorSkeleton"
import { LessonSidebarSkeleton } from "./LessonSidebarSkeleton"

export interface LessonPageSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LessonPageSkeleton({ className, ...props }: LessonPageSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "min-h-screen bg-background text-foreground max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 select-none",
        className
      )}
      {...props}
    >
      {/* 1. Top Breadcrumbs, Course Title & Next/Prev Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <Skeleton className="h-4 w-24" rounded="xs" />
          <span className="text-muted-foreground/40">/</span>
          <Skeleton className="h-4 w-32" rounded="xs" />
          <span className="text-muted-foreground/40">/</span>
          <Skeleton className="h-4 w-40" rounded="xs" />
        </div>

        <div className="flex items-center gap-2.5">
          <SkeletonButton size="sm" className="w-24" rounded="xl" />
          <SkeletonButton size="sm" className="w-24" rounded="xl" />
        </div>
      </div>

      {/* 2. Main Lesson Grid: Content Area (8 cols) + Curriculum Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Video, Title, Content, Code Block, Exercises */}
        <div className="lg:col-span-8 space-y-6">
          {/* 16:9 Video Player Box */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/70 bg-card shadow-md">
            <SkeletonImage aspectRatio="video" showIcon />
            {/* Player Controls Bar Wireframe */}
            <div className="absolute bottom-0 inset-x-0 h-11 bg-background/80 backdrop-blur-xs px-4 flex items-center justify-between border-t border-border/40">
              <div className="flex items-center gap-3">
                <Skeleton className="h-4 w-4" rounded="xs" />
                <Skeleton className="h-2 w-28" rounded="full" />
              </div>
              <Skeleton className="h-4 w-4" rounded="xs" />
            </div>
          </div>

          {/* Lesson Header & Progress */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <SkeletonBadge size="sm" width="w-20" />
                <Skeleton className="h-4 w-28" rounded="xs" />
              </div>
              <Skeleton className="h-4 w-20" rounded="xs" />
            </div>

            <Skeleton className="h-8 sm:h-9 w-4/5 max-w-xl" rounded="sm" />
            <SkeletonParagraph lines={3} />
          </div>

          {/* Embedded Code Example Block */}
          <div className="space-y-2 pt-2">
            <Skeleton className="h-4 w-32" rounded="xs" />
            <CodeEditorSkeleton lines={7} />
          </div>

          {/* Interactive Exercise Card */}
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-40" rounded="xs" />
            </div>
            <Skeleton className="h-3.5 w-5/6" rounded="xs" />
            <div className="pt-2 flex items-center gap-2">
              <SkeletonButton size="sm" className="w-28" rounded="lg" />
            </div>
          </div>
        </div>

        {/* Right Column: Module Syllabus Curriculum Sidebar */}
        <div className="lg:col-span-4">
          <LessonSidebarSkeleton itemCount={7} />
        </div>
      </div>
    </div>
  )
}

// Backwards-compatible alias
export const LessonSkeleton = LessonPageSkeleton

