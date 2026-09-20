"use client"

import React from "react"
import { Skeleton } from "@/components/ui/skeleton"

/**
 * Single Course Card Skeleton for Grid & Carousel Shelf views
 */
export function CourseCardSkeleton() {
  return (
    <div className="w-full h-full rounded-2xl border border-hairline bg-card overflow-hidden shadow-xs flex flex-col justify-between select-none">
      <div>
        {/* 16:9 Thumbnail Image Placeholder */}
        <div className="relative aspect-[16/9] w-full bg-secondary/80 overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
          
          {/* Top-Left Category Pill */}
          <div className="absolute left-2.5 top-2.5 z-10">
            <Skeleton className="h-4 w-20 rounded-full bg-background/80" />
          </div>

          {/* Top-Right Level Pill */}
          <div className="absolute right-2.5 top-2.5 z-10 flex items-center gap-1.5">
            <Skeleton className="h-4 w-16 rounded-full bg-background/80" />
            <Skeleton className="h-7 w-7 rounded-full bg-background/80" />
          </div>

          {/* Bottom Partner Pill */}
          <div className="absolute left-2.5 bottom-2 z-10">
            <Skeleton className="h-3.5 w-24 rounded bg-background/70" />
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-4 sm:p-5 space-y-3">
          {/* Partner & Rating Row */}
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-3 w-28 rounded" />
            <Skeleton className="h-3 w-14 rounded" />
          </div>

          {/* Course Title Lines */}
          <div className="space-y-1.5">
            <Skeleton className="h-5 w-full rounded" />
            <Skeleton className="h-5 w-3/4 rounded" />
          </div>

          {/* Credential & Duration */}
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-16 rounded" />
          </div>

          {/* Description Lines */}
          <div className="space-y-1 pt-1">
            <Skeleton className="h-3 w-full rounded bg-secondary/60" />
            <Skeleton className="h-3 w-4/5 rounded bg-secondary/60" />
          </div>

          {/* Skill Chips */}
          <div className="pt-1 flex items-center gap-1.5">
            <Skeleton className="h-5 w-16 rounded-md" />
            <Skeleton className="h-5 w-20 rounded-md" />
            <Skeleton className="h-5 w-14 rounded-md" />
          </div>
        </div>
      </div>

      {/* Card Action Footer */}
      <div className="p-3.5 pt-2.5 border-t border-hairline bg-card mt-auto flex items-center justify-between gap-2">
        <Skeleton className="h-9 flex-1 rounded-xl" />
        <Skeleton className="h-9 w-20 rounded-xl" />
      </div>
    </div>
  )
}

/**
 * Grid View Skeleton (Default 6 cards in a 3x2 responsive grid)
 */
export function CourseGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
      {Array.from({ length: count }).map((_, idx) => (
        <CourseCardSkeleton key={idx} />
      ))}
    </div>
  )
}

/**
 * Horizontal Role Pathway Shelf Skeleton
 */
export function CoursePathwayShelfSkeleton() {
  return (
    <div className="w-full py-6 sm:py-8 border-b border-hairline/60 last:border-b-0 space-y-4 select-none animate-fadeIn">
      {/* Shelf Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-1">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-36 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
          <Skeleton className="h-7 w-64 rounded-lg" />
          <Skeleton className="h-4 w-96 max-w-full rounded" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Skeleton className="h-8 w-8 rounded-xl" />
          <Skeleton className="h-8 w-8 rounded-xl" />
        </div>
      </div>

      {/* Horizontal Cards Shelf */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <div className="hidden lg:block">
          <CourseCardSkeleton />
        </div>
      </div>
    </div>
  )
}

/**
 * Complete Pathways Mode Skeleton (Multiple shelves)
 */
export function CoursePathwaySkeleton({ shelves = 3 }: { shelves?: number }) {
  return (
    <div className="space-y-8 lg:space-y-10">
      {Array.from({ length: shelves }).map((_, idx) => (
        <CoursePathwayShelfSkeleton key={idx} />
      ))}
    </div>
  )
}

/**
 * List View Skeleton (4 detailed horizontal card rows)
 */
export function CourseListSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-2xl border border-hairline bg-card p-5 sm:p-6 flex flex-col lg:flex-row items-stretch justify-between gap-6 shadow-xs"
        >
          {/* Left: 16:9 Thumbnail */}
          <div className="w-full lg:w-72 h-44 rounded-xl bg-secondary/80 overflow-hidden shrink-0">
            <Skeleton className="w-full h-full rounded-none" />
          </div>

          {/* Center: Details */}
          <div className="flex-1 space-y-3 min-w-0">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-24 rounded-full" />
              <Skeleton className="h-4 w-20 rounded-full" />
              <Skeleton className="h-4 w-16 rounded-full" />
            </div>
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-3.5 w-40 rounded" />
            <div className="space-y-1 pt-1">
              <Skeleton className="h-3 w-full rounded bg-secondary/60" />
              <Skeleton className="h-3 w-4/5 rounded bg-secondary/60" />
            </div>
            <div className="flex items-center gap-1.5 pt-2">
              <Skeleton className="h-5 w-16 rounded-md" />
              <Skeleton className="h-5 w-20 rounded-md" />
              <Skeleton className="h-5 w-24 rounded-md" />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex lg:flex-col items-center justify-between lg:justify-center gap-3 shrink-0 lg:w-44 pt-4 lg:pt-0 border-t lg:border-t-0 border-hairline">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-9 w-full rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}

/**
 * Dashboard Curriculum Enrolled Track Skeleton
 */
export function DashboardCurriculumSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-5 animate-fadeIn select-none">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="rounded-3xl border border-hairline bg-card p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xs"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 flex-1 min-w-0">
            {/* Thumbnail */}
            <div className="w-full sm:w-44 sm:h-28 h-44 rounded-2xl bg-secondary/80 overflow-hidden shrink-0">
              <Skeleton className="w-full h-full rounded-none" />
            </div>

            {/* Meta */}
            <div className="space-y-2.5 flex-1 min-w-0 w-full">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3.5 w-32 rounded" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              <Skeleton className="h-5 w-3/4 rounded" />
              <Skeleton className="h-3 w-48 rounded" />
              <div className="space-y-1 max-w-md pt-1">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-28 rounded" />
                  <Skeleton className="h-3 w-10 rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2.5 shrink-0 self-end lg:self-center">
            <Skeleton className="h-9 w-28 rounded-xl" />
            <Skeleton className="h-9 w-24 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  )
}
