import React from "react"
import { BookOpen, Star, Play, Layers, Clock, Award, ShieldCheck, CheckCircle2 } from "lucide-react"

export default function CourseLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20 selection:text-primary">
      {/* Top Navbar Clearance */}
      <div className="h-[72px]" />

      {/* Hero Header Skeleton */}
      <div className="relative border-b border-border/60 bg-gradient-to-b from-card/60 via-card/30 to-background py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Course Details Info Skeleton */}
            <div className="lg:col-span-7 space-y-6">
              {/* Breadcrumb & Category Badge Skeleton */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="h-6 w-32 rounded-full bg-primary/15 border border-primary/20 animate-pulse" />
                <div className="h-4 w-28 rounded-md bg-muted/60 animate-pulse" />
              </div>

              {/* Title Skeleton */}
              <div className="space-y-3">
                <div className="h-10 sm:h-12 w-11/12 rounded-2xl bg-muted/80 animate-pulse" />
                <div className="h-10 sm:h-12 w-7/12 rounded-2xl bg-muted/60 animate-pulse" />
              </div>

              {/* Description Paragraph Skeleton */}
              <div className="space-y-2 max-w-xl">
                <div className="h-4 w-full rounded bg-muted/50 animate-pulse" />
                <div className="h-4 w-5/6 rounded bg-muted/50 animate-pulse" />
                <div className="h-4 w-4/6 rounded bg-muted/40 animate-pulse" />
              </div>

              {/* Credential & Partner Stats Pill Skeleton */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-card/60 animate-pulse">
                  <div className="h-4 w-4 rounded-full bg-yellow-400/40" />
                  <div className="h-3 w-16 rounded bg-muted/70" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-card/60 animate-pulse">
                  <div className="h-4 w-4 rounded bg-primary/30" />
                  <div className="h-3 w-20 rounded bg-muted/70" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border/60 bg-card/60 animate-pulse">
                  <div className="h-4 w-4 rounded bg-emerald-500/30" />
                  <div className="h-3 w-14 rounded bg-muted/70" />
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <div className="h-12 w-44 rounded-full bg-primary/30 animate-pulse" />
                <div className="h-12 w-36 rounded-full border border-border/60 bg-card animate-pulse" />
              </div>
            </div>

            {/* Right: Video & Course Preview Card Skeleton */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl border border-border/80 bg-card/80 p-4 sm:p-5 shadow-lg shadow-black/5 space-y-4">
                {/* 16:9 Thumbnail / Video Skeleton */}
                <div className="relative aspect-[16/9] w-full rounded-2xl bg-muted/60 overflow-hidden flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-primary/5" />
                  <div className="h-14 w-14 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center animate-pulse">
                    <Play className="h-6 w-6 text-primary/40 ml-0.5 fill-current" />
                  </div>
                </div>

                {/* Quick Highlights Skeleton */}
                <div className="grid grid-cols-3 gap-2.5 pt-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="rounded-xl border border-border/50 bg-secondary/30 p-2.5 text-center space-y-1 animate-pulse">
                      <div className="h-3 w-12 mx-auto rounded bg-muted/70" />
                      <div className="h-4 w-16 mx-auto rounded bg-muted/90 font-medium" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus & Content Sections Skeleton */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Curriculum Body Skeleton */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="space-y-1">
                <div className="h-7 w-48 rounded-lg bg-muted/80 animate-pulse" />
                <div className="h-4 w-32 rounded bg-muted/50 animate-pulse" />
              </div>
              <div className="h-8 w-28 rounded-lg bg-muted/40 animate-pulse" />
            </div>

            {/* 4 Module Skeletons */}
            <div className="space-y-3.5">
              {[1, 2, 3, 4].map((m) => (
                <div
                  key={m}
                  className="rounded-2xl border border-border/70 bg-card p-5 space-y-3 animate-pulse"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-mono font-bold">
                        0{m}
                      </div>
                      <div className="h-5 w-44 sm:w-64 rounded bg-muted/80" />
                    </div>
                    <div className="h-4 w-20 rounded bg-muted/50" />
                  </div>
                  <div className="pl-10 space-y-2">
                    <div className="h-3 w-5/6 rounded bg-muted/40" />
                    <div className="h-3 w-3/6 rounded bg-muted/30" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Floating Meta Card Skeleton */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-border/80 bg-card p-6 space-y-4 shadow-sm animate-pulse">
              <div className="h-5 w-36 rounded bg-muted/80" />
              <div className="space-y-3 pt-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="h-4 w-4 rounded-full bg-primary/20 shrink-0" />
                    <div className="h-3 w-full rounded bg-muted/50" />
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-border/60">
                <div className="h-10 w-full rounded-xl bg-primary/25" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
