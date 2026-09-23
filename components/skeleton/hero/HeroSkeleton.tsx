import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonButton } from "../SkeletonButton"
import { SkeletonAvatar } from "../SkeletonAvatar"

export interface HeroSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function HeroSkeleton({ className, ...props }: HeroSkeletonProps) {
  return (
    <section
      aria-busy="true"
      className={cn(
        "relative min-h-[calc(100vh-68px)] flex flex-col justify-between pt-24 sm:pt-28 pb-8 overflow-hidden bg-background border-b border-border/60",
        className
      )}
      {...props}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        <div>
          {/* Main Headline & Subheadline Block */}
          <div className="max-w-3xl lg:max-w-2xl xl:max-w-3xl space-y-4">
            {/* Eyebrow */}
            <Skeleton className="h-4 w-32 sm:w-40" rounded="xs" />

            {/* Kinetic Editorial Heading */}
            <div className="space-y-2.5 pt-1">
              <Skeleton className="h-10 sm:h-13 md:h-16 w-11/12 max-w-2xl" rounded="md" />
              <Skeleton className="h-10 sm:h-13 md:h-16 w-3/5 max-w-md" rounded="md" />
            </div>

            {/* Sub-headline description */}
            <div className="pt-2 space-y-2 max-w-xl">
              <Skeleton className="h-4 sm:h-5 w-full" rounded="xs" />
              <Skeleton className="h-4 sm:h-5 w-4/5" rounded="xs" />
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <SkeletonButton size="lg" className="w-full sm:w-44" rounded="xl" />
              <SkeletonButton size="lg" className="w-full sm:w-44" rounded="xl" />
            </div>
          </div>

          {/* 4 Pillars Strip (Mentoring, Lessons, Projects, Career) */}
          <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl border border-border/70 dark:border-white/10 bg-card/60 p-4 sm:p-4.5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-8" rounded="lg" />
                  <Skeleton className="h-3 w-6" rounded="xs" />
                </div>
                <div className="space-y-1.5 pt-1">
                  <Skeleton className="h-4 w-4/5" rounded="xs" />
                  <Skeleton className="h-3 w-3/5" rounded="xs" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Social Proof Strip */}
        <div className="mt-8 pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/60 pt-4">
          {/* Avatar stack + Rating */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
            <div className="flex -space-x-2.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonAvatar key={i} size="xs" className="h-7 w-7 border-2 border-background" />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-3 w-16" rounded="xs" />
              <Skeleton className="h-3.5 w-8" rounded="xs" />
              <Skeleton className="h-3 w-28" rounded="xs" />
            </div>
          </div>

          {/* Alumni Placements */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-16" rounded="xs" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-3.5 w-12" rounded="xs" />
              <Skeleton className="h-3.5 w-10" rounded="xs" />
              <Skeleton className="h-3.5 w-12" rounded="xs" />
              <Skeleton className="h-3.5 w-14" rounded="xs" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
