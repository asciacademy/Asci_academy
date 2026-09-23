import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonBadge } from "../SkeletonBadge"
import { SkeletonButton } from "../SkeletonButton"
import { SkeletonParagraph } from "../SkeletonParagraph"
import { CodeEditorSkeleton } from "./CodeEditorSkeleton"

export interface DSAProblemSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DSAProblemSkeleton({ className, ...props }: DSAProblemSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "h-[calc(100vh-68px)] flex flex-col bg-background text-foreground overflow-hidden select-none",
        className
      )}
      {...props}
    >
      {/* 1. Top Problem Navigation & Run Controls Bar */}
      <div className="h-14 border-b border-border/70 bg-card/80 px-4 sm:px-6 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8" rounded="lg" />
          <Skeleton className="h-5 w-48 sm:w-64" rounded="md" />
          <SkeletonBadge size="sm" width="w-16" />
        </div>

        <div className="flex items-center gap-2">
          <SkeletonButton size="sm" className="w-20 h-9" rounded="xl" />
          <SkeletonButton size="sm" className="w-24 h-9 bg-primary/20" rounded="xl" />
        </div>
      </div>

      {/* 2. Split Pane: Left Problem Statement / Right Code Editor & Test Cases */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-border/60">
        {/* Left Panel: Problem Statement, Examples & Constraints */}
        <div className="w-full lg:w-1/2 flex flex-col overflow-hidden bg-background">
          {/* Panel Tabs */}
          <div className="h-11 border-b border-border/60 px-4 flex items-center gap-3 bg-secondary/30 shrink-0">
            <Skeleton className="h-6 w-24" rounded="md" />
            <Skeleton className="h-6 w-20" rounded="md" />
            <Skeleton className="h-6 w-28" rounded="md" />
          </div>

          <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1">
            {/* Title & Metadata tags */}
            <div className="space-y-3">
              <Skeleton className="h-7 w-3/4 max-w-md" rounded="sm" />
              <div className="flex items-center gap-2">
                <SkeletonBadge size="sm" width="w-16" />
                <SkeletonBadge size="sm" width="w-24" />
                <SkeletonBadge size="sm" width="w-20" />
              </div>
            </div>

            {/* Description */}
            <SkeletonParagraph lines={4} />

            {/* Example 1 Card */}
            <div className="rounded-xl border border-border/80 bg-card p-4 space-y-2.5">
              <Skeleton className="h-4 w-24" rounded="xs" />
              <div className="space-y-1.5 font-mono pt-1">
                <Skeleton className="h-3.5 w-56 bg-secondary/80" rounded="xs" />
                <Skeleton className="h-3.5 w-44 bg-secondary/80" rounded="xs" />
                <Skeleton className="h-3.5 w-full bg-secondary/60" rounded="xs" />
              </div>
            </div>

            {/* Constraints */}
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-28" rounded="xs" />
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-48" rounded="xs" />
                <Skeleton className="h-3 w-40" rounded="xs" />
                <Skeleton className="h-3 w-52" rounded="xs" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel: Code Editor + Test Cases Panel */}
        <div className="w-full lg:w-1/2 flex flex-col overflow-hidden bg-background">
          {/* Upper: Code Editor */}
          <div className="flex-1 overflow-hidden p-3 bg-[#0d1117]">
            <CodeEditorSkeleton lines={11} className="h-full border-none shadow-none rounded-none" />
          </div>

          {/* Lower: Test Cases Runner Drawer */}
          <div className="h-48 border-t border-border/70 bg-card p-4 flex flex-col justify-between shrink-0">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-6 w-18" rounded="md" />
                  <Skeleton className="h-6 w-18" rounded="md" />
                </div>
                <Skeleton className="h-4 w-20" rounded="xs" />
              </div>
              <div className="p-2.5 rounded-lg bg-secondary/50 font-mono space-y-1.5">
                <Skeleton className="h-3 w-44" rounded="xs" />
                <Skeleton className="h-3 w-32" rounded="xs" />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-border/40">
              <SkeletonButton size="sm" className="w-20" rounded="lg" />
              <SkeletonButton size="sm" className="w-24 bg-primary/20" rounded="lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Backwards-compatible alias
export const DSASimulatorSkeleton = DSAProblemSkeleton

