"use client"

import React from "react"
import { Skeleton, SkeletonBadge, SkeletonButton, SkeletonText } from "./Skeleton"

export function ATSScannerSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading ATS Scanner"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-1">
          <Skeleton className="h-7 w-56 rounded-lg" />
          <Skeleton className="h-4 w-72 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonButton size="sm" className="w-28 h-9" />
          <SkeletonButton size="sm" className="w-28 h-9 bg-primary/20" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload Area & Resume Preview */}
        <div className="lg:col-span-7 space-y-6">
          {/* Upload Dropzone Box */}
          <div className="rounded-3xl border-2 border-dashed border-hairline/80 bg-card/60 p-8 flex flex-col items-center justify-center text-center space-y-3">
            <Skeleton className="h-12 w-12 rounded-2xl" />
            <Skeleton className="h-5 w-48 rounded" />
            <Skeleton className="h-3.5 w-64 max-w-full rounded" />
            <SkeletonButton size="sm" className="w-32 h-9 mt-2" />
          </div>

          {/* Resume Document Wireframe */}
          <div className="rounded-2xl border border-hairline/70 bg-card p-6 space-y-5 shadow-xs">
            <div className="flex items-center justify-between border-b border-hairline/50 pb-3">
              <Skeleton className="h-4 w-36 rounded" />
              <SkeletonBadge className="h-4 w-16" />
            </div>
            {/* Header info */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-48 rounded-md" />
              <Skeleton className="h-3.5 w-64 rounded" />
            </div>
            {/* Summary */}
            <SkeletonText lines={3} lastLineWidth="80%" lineHeight="h-3" />
            {/* Work experience blocks */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-40 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
                <SkeletonText lines={2} lastLineWidth="70%" lineHeight="h-2.5" />
              </div>
              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-36 rounded" />
                  <Skeleton className="h-3 w-20 rounded" />
                </div>
                <SkeletonText lines={2} lastLineWidth="60%" lineHeight="h-2.5" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Score Section, Keyword Match & Suggestions */}
        <div className="lg:col-span-5 space-y-6">
          {/* Circular Gauge / Score Overview Card */}
          <div className="rounded-3xl border border-hairline/70 bg-card p-6 flex flex-col items-center text-center space-y-4 shadow-xs">
            <Skeleton className="h-4 w-32 rounded" />
            {/* Gauge Circle */}
            <div className="relative w-36 h-36 rounded-full border-8 border-[var(--skeleton-base)] flex items-center justify-center">
              <div className="space-y-1 flex flex-col items-center">
                <Skeleton className="h-8 w-12 rounded-md" />
                <Skeleton className="h-2.5 w-16 rounded" />
              </div>
            </div>
            {/* 3 Sub-score Progress Bars */}
            <div className="w-full space-y-3 pt-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-24 rounded" />
                    <Skeleton className="h-3 w-8 rounded" />
                  </div>
                  <Skeleton className="h-2 w-full rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Keyword Match Breakdown */}
          <div className="rounded-2xl border border-hairline/70 bg-card p-5 space-y-3 shadow-xs">
            <Skeleton className="h-4 w-36 rounded" />
            <div className="flex flex-wrap gap-2 pt-1">
              <SkeletonBadge className="h-6 w-20" />
              <SkeletonBadge className="h-6 w-24" />
              <SkeletonBadge className="h-6 w-16" />
              <SkeletonBadge className="h-6 w-20" />
              <SkeletonBadge className="h-6 w-28" />
            </div>
          </div>

          {/* Optimization Suggestions */}
          <div className="rounded-2xl border border-hairline/70 bg-card p-5 space-y-3 shadow-xs">
            <Skeleton className="h-4 w-40 rounded" />
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-secondary/30 space-y-1.5">
                <Skeleton className="h-3.5 w-3/4 rounded" />
                <Skeleton className="h-2.5 w-full rounded" />
              </div>
              <div className="p-3 rounded-xl bg-secondary/30 space-y-1.5">
                <Skeleton className="h-3.5 w-2/3 rounded" />
                <Skeleton className="h-2.5 w-full rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
