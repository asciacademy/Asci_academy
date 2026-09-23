"use client"

import React from "react"
import { Skeleton, SkeletonAvatar, SkeletonBadge, SkeletonButton, SkeletonText } from "./Skeleton"

export function CourseDetailSkeleton() {
  return (
    <main
      aria-busy="true"
      aria-label="Loading course details"
      className="min-h-screen bg-background text-foreground select-none"
    >
      {/* Top Navbar Clearance */}
      <div className="h-16 sm:h-[72px]" />

      {/* Hero Header Area */}
      <div className="relative border-b border-border/60 bg-gradient-to-b from-card/60 via-card/30 to-background py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Course Details Info */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb & Category Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <SkeletonBadge className="h-6 w-32 rounded-full" />
                <Skeleton className="h-4 w-28 rounded" />
              </div>

              {/* Title (2 lines) */}
              <div className="space-y-3">
                <Skeleton className="h-10 sm:h-12 w-11/12 rounded-2xl" />
                <Skeleton className="h-10 sm:h-12 w-7/12 rounded-2xl" />
              </div>

              {/* Description Paragraph */}
              <SkeletonText lines={3} lastLineWidth="70%" lineHeight="h-4" gap="space-y-2" className="max-w-xl" />

              {/* Instructor & Rating Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <SkeletonAvatar size="sm" />
                  <Skeleton className="h-4 w-32 rounded" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-card/60">
                  <Skeleton className="h-4 w-4 rounded-full" />
                  <Skeleton className="h-3 w-16 rounded" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-card/60">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-4">
                <SkeletonButton size="lg" pill className="w-48 h-12" />
                <SkeletonButton size="lg" pill className="w-36 h-12 bg-card border border-border/60" />
              </div>
            </div>

            {/* Right: Video & Course Preview Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-border/80 bg-card/80 p-4 sm:p-5 shadow-lg space-y-4">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-[var(--skeleton-base)]">
                  <Skeleton className="w-full h-full rounded-none" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Skeleton className="h-14 w-14 rounded-full" />
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24 rounded" />
                    <Skeleton className="h-5 w-16 rounded" />
                  </div>
                  <div className="space-y-2 pt-1 border-t border-border/60">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <Skeleton className="h-3.5 w-32 rounded" />
                        <Skeleton className="h-3.5 w-16 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Navigation Tabs & Curriculum Accordion */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-3 border-b border-border/60 pb-3">
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-28 rounded-lg" />
          <Skeleton className="h-9 w-24 rounded-lg" />
        </div>

        {/* Curriculum Modules Accordion Skeletons */}
        <div className="max-w-4xl space-y-4">
          <Skeleton className="h-6 w-48 rounded-md mb-2" />
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5 rounded-md" />
                  <Skeleton className="h-5 w-64 max-w-full rounded" />
                </div>
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <Skeleton className="h-3.5 w-3/4 rounded bg-secondary/50" />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
