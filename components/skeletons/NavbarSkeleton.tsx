"use client"

import React from "react"
import { Skeleton, SkeletonAvatar, SkeletonButton } from "./Skeleton"

export function NavbarSkeleton() {
  return (
    <header
      aria-busy="true"
      aria-label="Loading navigation"
      className="fixed top-0 left-0 right-0 z-50 h-16 sm:h-[68px] border-b border-border/60 bg-background/90 backdrop-blur-md px-4 sm:px-6 lg:px-8 select-none"
    >
      <div className="mx-auto max-w-[1400px] h-full flex items-center justify-between gap-4">
        {/* Left: ASCI Brand Logo */}
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-lg" />
          <Skeleton className="h-5 w-20 rounded hidden sm:block" />
        </div>

        {/* Center: Search pill & Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          <Skeleton className="h-9 w-60 rounded-full border border-hairline/60" />
          <div className="flex items-center gap-5">
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-16 rounded" />
            <Skeleton className="h-4 w-14 rounded" />
          </div>
        </div>

        {/* Right: Actions, Theme, Auth */}
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-9 rounded-full" />
          <Skeleton className="h-9 w-9 rounded-full" />
          <div className="h-5 w-px bg-border/60 mx-1 hidden sm:block" />
          <div className="hidden sm:flex items-center gap-2">
            <Skeleton className="h-9 w-18 rounded-full" />
            <SkeletonButton size="sm" pill className="w-24 h-9" />
          </div>
          {/* Mobile hamburger placeholder */}
          <Skeleton className="h-9 w-9 rounded-full lg:hidden" />
        </div>
      </div>
    </header>
  )
}
