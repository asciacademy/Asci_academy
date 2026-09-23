import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface SandboxSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SandboxSkeleton({ className, ...props }: SandboxSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-card overflow-hidden shadow-xl flex flex-col h-[650px] w-full",
        className
      )}
      {...props}
    >
      {/* 1. Sandbox Top Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/70 bg-secondary/50">
        {/* Left: Window controls & active file tab */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-border/80" />
            <div className="h-3 w-3 rounded-full bg-border/80" />
            <div className="h-3 w-3 rounded-full bg-border/80" />
          </div>
          <div className="flex items-center gap-1 pl-2">
            <Skeleton className="h-6 w-24" rounded="md" />
            <Skeleton className="h-6 w-20" rounded="md" />
          </div>
        </div>

        {/* Right: Run & Layout controls */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-20" rounded="md" />
          <Skeleton className="h-7 w-8" rounded="md" />
          <Skeleton className="h-7 w-8" rounded="md" />
        </div>
      </div>

      {/* 2. Split-Pane Workspace: Left Code Editor + Right Preview/Console */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border/60 overflow-hidden bg-background">
        {/* Left Pane: Code Editor */}
        <div className="flex flex-col h-full bg-surface-dark/5 dark:bg-black/40 p-4 font-mono space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border/40">
            <Skeleton className="h-3 w-28" rounded="xs" />
            <Skeleton className="h-3 w-16" rounded="xs" />
          </div>

          {/* Code Lines with line numbers */}
          <div className="space-y-2.5 pt-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton className="h-3 w-4 shrink-0 opacity-40" rounded="xs" />
                <Skeleton
                  className="h-3.5"
                  style={{ width: `${35 + ((i * 19) % 55)}%` }}
                  rounded="xs"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right Pane: Live Output Preview & Terminal Console */}
        <div className="flex flex-col h-full justify-between bg-card/60">
          {/* Top: Live Output canvas */}
          <div className="p-6 space-y-4 flex-1">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
              <Skeleton className="h-3.5 w-24" rounded="xs" />
              <Skeleton className="h-3 w-12" rounded="xs" />
            </div>
            <div className="space-y-3 pt-3">
              <Skeleton className="h-6 w-3/5" rounded="sm" />
              <Skeleton className="h-4 w-4/5" rounded="xs" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-8 w-24" rounded="lg" />
                <Skeleton className="h-8 w-24" rounded="lg" />
              </div>
            </div>
          </div>

          {/* Bottom: Embedded Console Terminal */}
          <div className="h-40 border-t border-border/70 bg-black/90 p-3.5 space-y-2">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
              <Skeleton className="h-2.5 w-16" rounded="xs" />
              <Skeleton className="h-2.5 w-10" rounded="xs" />
            </div>
            <div className="space-y-1.5 font-mono pt-1">
              <Skeleton className="h-2.5 w-3/4" rounded="xs" />
              <Skeleton className="h-2.5 w-1/2" rounded="xs" />
              <Skeleton className="h-2.5 w-2/3" rounded="xs" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
