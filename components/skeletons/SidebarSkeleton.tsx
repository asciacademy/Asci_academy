"use client"

import React from "react"
import { Skeleton, SkeletonAvatar } from "./Skeleton"

export interface SidebarSkeletonProps {
  className?: string
}

export function SidebarSkeleton({ className }: SidebarSkeletonProps) {
  return (
    <aside
      aria-busy="true"
      aria-label="Loading sidebar"
      className={`fixed md:sticky top-0 left-0 h-screen z-40 border-r border-border/60 bg-card flex flex-col justify-between shrink-0 w-64 max-w-[80vw] select-none ${className || ""}`}
    >
      <div>
        {/* Logo Header */}
        <div className="h-16 border-b border-border/40 px-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="h-7 w-7 rounded-lg" />
            <Skeleton className="h-5 w-24 rounded" />
          </div>
        </div>

        {/* Navigation Items (5 Core Tabs) */}
        <div className="p-3 space-y-1.5 pt-4">
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent"
            >
              <Skeleton className="h-5 w-5 rounded-md shrink-0" />
              <Skeleton className="h-4 w-28 rounded" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Profile & Status Area */}
      <div className="p-4 border-t border-border/40 space-y-3">
        <div className="flex items-center gap-3">
          <SkeletonAvatar size="sm" />
          <div className="space-y-1 flex-1 min-w-0">
            <Skeleton className="h-3.5 w-24 rounded" />
            <Skeleton className="h-2.5 w-16 rounded" />
          </div>
        </div>
        <div className="space-y-1 pt-1">
          <div className="flex justify-between">
            <Skeleton className="h-2 w-12 rounded" />
            <Skeleton className="h-2 w-8 rounded" />
          </div>
          <Skeleton className="h-1.5 w-full rounded-full" />
        </div>
      </div>
    </aside>
  )
}
