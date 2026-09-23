"use client"

import React from "react"
import { Skeleton, SkeletonAvatar, SkeletonBadge, SkeletonButton, SkeletonText } from "./Skeleton"
import { CourseCardSkeleton } from "./CourseCardSkeleton"
import { SidebarSkeleton } from "./SidebarSkeleton"

export function DashboardSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading dashboard"
      className="min-h-screen bg-background text-foreground flex flex-col md:flex-row antialiased select-none"
    >
      {/* Fixed/Sticky Sidebar Skeleton */}
      <div className="hidden md:block">
        <SidebarSkeleton />
      </div>

      {/* Main Content Workspace Skeleton */}
      <main className="flex-1 min-w-0 flex flex-col">
        {/* Mobile Header Bar Skeleton */}
        <div className="md:hidden h-16 border-b border-border/60 bg-card px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1400px] w-full mx-auto">
          {/* Welcome Scholar Banner */}
          <div className="rounded-3xl border border-hairline/60 bg-card/70 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs">
            <div className="flex items-center gap-4 sm:gap-5">
              <SkeletonAvatar size="lg" />
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <Skeleton className="h-6 sm:h-7 w-48 rounded-md" />
                  <SkeletonBadge className="h-5 w-20" />
                </div>
                <Skeleton className="h-3.5 w-64 max-w-full rounded" />
              </div>
            </div>
            {/* Quick Copilot Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <Skeleton className="h-8 w-28 rounded-full" />
              <Skeleton className="h-8 w-32 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
          </div>

          {/* 4 Primary Stats Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="p-4 sm:p-5 rounded-2xl border border-hairline/60 bg-card space-y-3 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3.5 w-24 rounded" />
                  <Skeleton className="h-7 w-7 rounded-xl" />
                </div>
                <Skeleton className="h-7 w-16 rounded-md" />
                <Skeleton className="h-2.5 w-32 rounded" />
              </div>
            ))}
          </div>

          {/* Bento Split: Jump Back In Card + POTD Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Jump Back In Card (2 Cols) */}
            <div className="lg:col-span-2 rounded-3xl border border-hairline/60 bg-card p-6 space-y-5 shadow-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-5 w-36 rounded-md" />
                </div>
                <SkeletonBadge className="h-5 w-20" />
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Skeleton className="w-full sm:w-44 aspect-video rounded-xl shrink-0" />
                <div className="space-y-2 flex-1 w-full">
                  <Skeleton className="h-5 w-3/4 rounded-md" />
                  <Skeleton className="h-3 w-1/2 rounded" />
                  <div className="space-y-1 pt-2 max-w-sm">
                    <div className="flex justify-between">
                      <Skeleton className="h-2 w-20 rounded" />
                      <Skeleton className="h-2 w-8 rounded" />
                    </div>
                    <Skeleton className="h-2 w-full rounded-full" />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-hairline/40">
                <Skeleton className="h-3 w-32 rounded" />
                <SkeletonButton size="sm" className="w-32 h-9" />
              </div>
            </div>

            {/* Problem of the Day Card (1 Col) */}
            <div className="rounded-3xl border border-hairline/60 bg-card p-6 space-y-4 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Skeleton className="h-5 w-28 rounded-md" />
                  <SkeletonBadge className="h-5 w-14" />
                </div>
                <Skeleton className="h-5 w-full rounded-md mb-2" />
                <SkeletonText lines={2} lastLineWidth="60%" lineHeight="h-3" />
              </div>
              <div className="pt-3 border-t border-hairline/40 flex items-center justify-between">
                <Skeleton className="h-3 w-20 rounded" />
                <SkeletonButton size="sm" className="w-24 h-9" />
              </div>
            </div>
          </div>

          {/* Progress Chart Placeholder (Container + Axes + Mock Bar/Line geometry without fake data) */}
          <div className="rounded-3xl border border-hairline/60 bg-card p-6 sm:p-7 space-y-6 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-5 w-40 rounded-md" />
                <Skeleton className="h-3 w-56 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <Skeleton className="h-7 w-20 rounded-lg" />
                <Skeleton className="h-7 w-20 rounded-lg" />
              </div>
            </div>

            {/* Chart Area Wireframe */}
            <div className="h-56 w-full flex items-end justify-between gap-3 sm:gap-6 pt-8 pb-2 px-2 border-b border-border/60">
              {Array.from({ length: 7 }).map((_, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <Skeleton
                    style={{ height: `${20 + (idx * 13) % 65}%` }}
                    className="w-full max-w-[42px] rounded-t-lg"
                  />
                  <Skeleton className="h-2.5 w-6 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Curriculum Courses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Skeleton className="h-5 w-44 rounded-md" />
                <Skeleton className="h-3 w-64 rounded" />
              </div>
              <Skeleton className="h-4 w-20 rounded" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <CourseCardSkeleton />
              <CourseCardSkeleton />
              <CourseCardSkeleton />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
