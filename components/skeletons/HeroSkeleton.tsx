"use client"

import React from "react"
import { Skeleton, SkeletonText, SkeletonButton, SkeletonBadge } from "./Skeleton"

export function HeroSkeleton() {
  return (
    <section
      aria-busy="true"
      aria-label="Loading hero"
      className="relative min-h-[100svh] flex flex-col justify-between bg-background pt-24 sm:pt-28 lg:pt-32 pb-6 sm:pb-8 select-none"
    >
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: Main Editorial Headline & CTA */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            {/* Eyebrow badge */}
            <div className="flex items-center gap-2">
              <SkeletonBadge className="h-6 w-40 rounded-full" />
              <SkeletonBadge className="h-6 w-28 rounded-full" />
            </div>

            {/* Massive Display Heading (2 lines) */}
            <div className="space-y-3 pt-2">
              <Skeleton className="h-12 sm:h-16 lg:h-20 w-11/12 rounded-2xl" />
              <Skeleton className="h-12 sm:h-16 lg:h-20 w-8/12 rounded-2xl" />
            </div>

            {/* Subtitle description */}
            <SkeletonText
              lines={2}
              lastLineWidth="75%"
              lineHeight="h-4 sm:h-5"
              gap="space-y-2.5"
              className="max-w-xl pt-2"
            />

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-4">
              <SkeletonButton size="lg" pill className="w-44 h-12" />
              <SkeletonButton size="lg" pill className="w-40 h-12 bg-secondary/70 border border-hairline/60" />
              <SkeletonButton size="lg" pill className="w-32 h-12 bg-secondary/50 border border-hairline/40 hidden sm:inline-block" />
            </div>

            {/* Social Proof / Trust stats */}
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-2">
                <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
                <Skeleton className="h-8 w-8 rounded-full border-2 border-background" />
              </div>
              <Skeleton className="h-4 w-48 rounded" />
            </div>
          </div>

          {/* Right: Axel Robot Stage / Interactive Lab Preview Box */}
          <div className="lg:col-span-5 xl:col-span-4 hidden lg:flex justify-center items-center">
            <div className="w-full max-w-[420px] aspect-[4/5] rounded-3xl border border-hairline/80 bg-card/60 p-6 flex flex-col justify-between shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>

              {/* Central Axel Robotic Canvas Placeholder */}
              <div className="flex-1 flex flex-col items-center justify-center my-6">
                <Skeleton className="h-36 w-36 rounded-full mb-4" />
                <Skeleton className="h-4 w-32 rounded" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-3.5 w-full rounded" />
                <Skeleton className="h-3.5 w-3/4 rounded" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom 4 Educational Pillars Row */}
        <div className="mt-12 pt-6 border-t border-hairline/60 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-4 rounded-2xl border border-hairline/40 bg-card/40 space-y-2.5">
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-12 rounded" />
                <Skeleton className="h-6 w-6 rounded-md" />
              </div>
              <Skeleton className="h-5 w-36 rounded-md" />
              <Skeleton className="h-3.5 w-full rounded" />
              <Skeleton className="h-3.5 w-4/5 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
