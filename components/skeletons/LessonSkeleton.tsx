"use client"

import React from "react"
import { Skeleton, SkeletonBadge, SkeletonButton, SkeletonText } from "./Skeleton"

export function LessonSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading lesson"
      className="min-h-screen bg-background text-foreground max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none"
    >
      {/* Top Breadcrumb & Next/Prev Controls */}
      <div className="flex items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-28 rounded" />
          <span className="text-muted-foreground/40">/</span>
          <Skeleton className="h-4 w-36 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonButton size="sm" className="w-24 h-8" />
          <SkeletonButton size="sm" className="w-24 h-8" />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Content Area: Video + Explanation + Code */}
        <div className="lg:col-span-8 space-y-6">
          {/* 16:9 Video Player Box */}
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-border/70 bg-[var(--skeleton-base)] shadow-md">
            <Skeleton className="w-full h-full rounded-none" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="h-16 w-16 rounded-full bg-background/80 backdrop-blur-xs" />
            </div>
            {/* Player Controls Bar Wireframe */}
            <div className="absolute bottom-0 inset-x-0 h-12 bg-background/60 backdrop-blur-xs px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-5 w-5 rounded" />
                <Skeleton className="h-2 w-24 rounded-full" />
              </div>
              <Skeleton className="h-5 w-5 rounded" />
            </div>
          </div>

          {/* Lesson Header */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-2">
              <SkeletonBadge className="h-5 w-20" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
            <Skeleton className="h-8 sm:h-9 w-3/4 rounded-lg" />
            <SkeletonText lines={3} lastLineWidth="65%" lineHeight="h-4" gap="space-y-2" />
          </div>

          {/* Realistic Code Editor Skeleton */}
          <div className="rounded-2xl border border-hairline/80 bg-card overflow-hidden shadow-sm">
            {/* macOS Window Titlebar */}
            <div className="h-10 bg-secondary/80 border-b border-hairline/60 px-4 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-400/40" />
                <div className="h-3 w-3 rounded-full bg-amber-400/40" />
                <div className="h-3 w-3 rounded-full bg-emerald-400/40" />
              </div>
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-5 w-16 rounded" />
            </div>

            {/* Code Lines with Authentic Indentation */}
            <div className="p-4 sm:p-5 font-mono space-y-2.5 bg-background/50">
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground/40 w-4 select-none">1</span>
                <Skeleton className="h-4 w-28 rounded" />
                <Skeleton className="h-4 w-40 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground/40 w-4 select-none">2</span>
                <div className="w-6 shrink-0" />
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-4 w-20 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground/40 w-4 select-none">3</span>
                <div className="w-12 shrink-0" />
                <Skeleton className="h-4 w-48 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground/40 w-4 select-none">4</span>
                <div className="w-6 shrink-0" />
                <Skeleton className="h-4 w-24 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground/40 w-4 select-none">5</span>
                <Skeleton className="h-4 w-32 rounded" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-muted-foreground/40 w-4 select-none">6</span>
                <div className="w-6 shrink-0" />
                <Skeleton className="h-4 w-52 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Module Syllabus Navigator */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-3xl border border-border/70 bg-card p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-border/50 pb-3">
              <Skeleton className="h-5 w-32 rounded" />
              <Skeleton className="h-4 w-12 rounded" />
            </div>
            <div className="space-y-2.5">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2.5 rounded-xl border border-hairline/40 bg-secondary/30"
                >
                  <Skeleton className="h-5 w-5 rounded-full shrink-0" />
                  <div className="flex-1 space-y-1">
                    <Skeleton className="h-3.5 w-3/4 rounded" />
                    <Skeleton className="h-2.5 w-16 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
