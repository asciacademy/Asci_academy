import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface CodeEditorSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  lines?: number
  fileName?: string
}

export function CodeEditorSkeleton({
  lines = 10,
  fileName = "solution.py",
  className,
  ...props
}: CodeEditorSkeletonProps) {
  // Deterministic code indentation patterns
  const linePatterns = [
    { indent: 0, segments: ["w-16", "w-28", "w-14"] },
    { indent: 1, segments: ["w-20", "w-36"] },
    { indent: 2, segments: ["w-12", "w-24", "w-32"] },
    { indent: 2, segments: ["w-28", "w-16"] },
    { indent: 1, segments: ["w-14", "w-32"] },
    { indent: 2, segments: ["w-24", "w-20", "w-16"] },
    { indent: 3, segments: ["w-20", "w-24"] },
    { indent: 2, segments: ["w-16", "w-12"] },
    { indent: 1, segments: ["w-20", "w-28"] },
    { indent: 0, segments: ["w-12", "w-16"] },
  ]

  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-[#0d1117] dark:bg-black/95 overflow-hidden shadow-lg flex flex-col font-mono",
        className
      )}
      {...props}
    >
      {/* 1. Editor Window Top Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-2.5">
          {/* Traffic lights ● ● ● */}
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
          </div>

          {/* Active File Tab */}
          <div className="flex items-center gap-1.5 pl-2 text-xs text-white/50">
            <Skeleton className="h-3 w-3 rounded-xs bg-white/20" />
            <Skeleton className="h-3 w-20 rounded-xs bg-white/20" />
          </div>
        </div>

        {/* Editor controls */}
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12 rounded bg-white/15" />
          <Skeleton className="h-4 w-4 rounded bg-white/15" />
        </div>
      </div>

      {/* 2. Code Canvas with Gutter Line Numbers */}
      <div className="p-4 sm:p-5 space-y-2.5 overflow-hidden flex-1">
        {Array.from({ length: lines }).map((_, i) => {
          const pattern = linePatterns[i % linePatterns.length]
          return (
            <div key={i} className="flex items-center gap-3">
              {/* Line Gutter (01, 02, etc.) */}
              <span className="text-[11px] text-white/25 w-5 text-right shrink-0 select-none">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Indentation */}
              {pattern.indent > 0 && (
                <div
                  className="shrink-0"
                  style={{ width: `${pattern.indent * 18}px` }}
                />
              )}

              {/* Token Segments */}
              <div className="flex items-center gap-2 flex-wrap">
                {pattern.segments.map((seg, sIdx) => (
                  <Skeleton
                    key={sIdx}
                    className={cn("h-3.5 rounded bg-white/15 dark:bg-white/10", seg)}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
