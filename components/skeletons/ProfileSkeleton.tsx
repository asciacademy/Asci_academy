"use client"

import React from "react"
import { Skeleton, SkeletonAvatar, SkeletonBadge, SkeletonButton, SkeletonText } from "./Skeleton"

export function ProfileSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading scholar profile"
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 select-none"
    >
      {/* Profile Header Card */}
      <div className="rounded-3xl border border-hairline/70 bg-card overflow-hidden shadow-xs">
        {/* Cover Banner */}
        <div className="h-32 sm:h-44 w-full bg-[var(--skeleton-base)] overflow-hidden">
          <Skeleton className="w-full h-full rounded-none" />
        </div>

        {/* Profile Info Row */}
        <div className="p-6 sm:p-8 pt-0 relative flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-12 sm:-mt-16">
            <div className="relative">
              <SkeletonAvatar size="xl" className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-card" />
              <div className="absolute bottom-1 right-1">
                <Skeleton className="h-7 w-7 rounded-full border-2 border-card" />
              </div>
            </div>
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center gap-2.5">
                <Skeleton className="h-7 w-48 rounded-md" />
                <SkeletonBadge className="h-5 w-20" />
              </div>
              <Skeleton className="h-4 w-32 rounded" />
              <Skeleton className="h-3.5 w-64 max-w-full rounded" />
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <SkeletonButton size="md" className="flex-1 sm:flex-none w-32" />
            <SkeletonButton size="md" className="w-10 bg-secondary/80" />
          </div>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="p-4 sm:p-5 rounded-2xl border border-hairline/60 bg-card space-y-2">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-7 w-16 rounded-md" />
            <Skeleton className="h-2 w-full rounded-full" />
          </div>
        ))}
      </div>

      {/* Two Column Split: Skills & Bio vs Enrolled Progress & Certificates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Bio & Skills */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-hairline/60 bg-card p-5 space-y-3">
            <Skeleton className="h-4 w-20 rounded" />
            <SkeletonText lines={3} lastLineWidth="80%" lineHeight="h-3.5" gap="space-y-2" />
          </div>

          <div className="rounded-2xl border border-hairline/60 bg-card p-5 space-y-3">
            <Skeleton className="h-4 w-28 rounded" />
            <div className="flex flex-wrap gap-2 pt-1">
              <SkeletonBadge className="h-6 w-20" />
              <SkeletonBadge className="h-6 w-24" />
              <SkeletonBadge className="h-6 w-16" />
              <SkeletonBadge className="h-6 w-28" />
              <SkeletonBadge className="h-6 w-20" />
            </div>
          </div>
        </div>

        {/* Right: Certifications & Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-2xl border border-hairline/60 bg-card p-5 sm:p-6 space-y-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-4 w-16 rounded" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="p-4 rounded-xl border border-hairline/50 bg-secondary/30 space-y-2.5">
                <Skeleton className="h-4 w-32 rounded" />
                <Skeleton className="h-3 w-20 rounded" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
              <div className="p-4 rounded-xl border border-hairline/50 bg-secondary/30 space-y-2.5">
                <Skeleton className="h-4 w-36 rounded" />
                <Skeleton className="h-3 w-24 rounded" />
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
