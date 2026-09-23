"use client"

import React from "react"
import { Skeleton, SkeletonBadge } from "./Skeleton"

export function AnalyticsSkeleton() {
  return (
    <div
      aria-busy="true"
      aria-label="Loading analytics"
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8 select-none"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/60 pb-5">
        <div className="space-y-1">
          <Skeleton className="h-7 w-48 rounded-lg" />
          <Skeleton className="h-4 w-64 rounded" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-28 rounded-lg" />
          <Skeleton className="h-8 w-24 rounded-lg" />
        </div>
      </div>

      {/* 4 KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="p-5 rounded-2xl border border-hairline/70 bg-card space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <Skeleton className="h-3.5 w-24 rounded" />
              <SkeletonBadge className="h-4 w-12" />
            </div>
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-2.5 w-32 rounded" />
          </div>
        ))}
      </div>

      {/* Charts Grid: Line Chart + Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity Line Chart Wireframe */}
        <div className="rounded-3xl border border-hairline/70 bg-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-5 w-40 rounded" />
              <Skeleton className="h-3 w-52 rounded" />
            </div>
            <Skeleton className="h-6 w-16 rounded" />
          </div>

          <div className="h-48 w-full flex items-end justify-between gap-3 pt-6 pb-2 border-b border-border/60 px-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <Skeleton
                  style={{ height: `${25 + ((i * 17) % 60)}%` }}
                  className="w-full max-w-[28px] rounded-t-md"
                />
                <Skeleton className="h-2.5 w-6 rounded" />
              </div>
            ))}
          </div>
        </div>

        {/* Skill Proficiency Radar / Bar Chart Wireframe */}
        <div className="rounded-3xl border border-hairline/70 bg-card p-6 space-y-5 shadow-xs">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Skeleton className="h-5 w-36 rounded" />
              <Skeleton className="h-3 w-48 rounded" />
            </div>
            <Skeleton className="h-6 w-16 rounded" />
          </div>

          <div className="space-y-3.5 pt-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <Skeleton className="h-3 w-28 rounded" />
                  <Skeleton className="h-3 w-10 rounded" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Heatmap Grid (52-week contribution squares) */}
      <div className="rounded-3xl border border-hairline/70 bg-card p-6 space-y-4 shadow-xs">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-44 rounded" />
          <Skeleton className="h-3 w-28 rounded" />
        </div>
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
            {Array.from({ length: 7 * 26 }).map((_, idx) => (
              <Skeleton
                key={idx}
                className="w-3 h-3 rounded-xs shrink-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
