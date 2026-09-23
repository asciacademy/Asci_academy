import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"
import { SkeletonBadge } from "../SkeletonBadge"

export interface DataTableSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  rows?: number
  columns?: number
  hasAvatar?: boolean
  hasActions?: boolean
}

export function DataTableSkeleton({
  rows = 8,
  columns = 5,
  hasAvatar = true,
  hasActions = true,
  className,
  ...props
}: DataTableSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn(
        "rounded-2xl border border-border/80 dark:border-white/10 bg-card overflow-hidden shadow-xs select-none",
        className
      )}
      {...props}
    >
      {/* Table Toolbar / Search */}
      <div className="p-4 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Skeleton className="h-9 w-64" rounded="xl" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24" rounded="xl" />
          <Skeleton className="h-9 w-20" rounded="xl" />
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Header Row */}
          <thead>
            <tr className="border-b border-border/60 bg-secondary/30">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <th key={colIdx} className="p-3.5 sm:p-4 text-xs font-semibold">
                  <Skeleton className="h-3.5 w-20" rounded="xs" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body Rows */}
          <tbody className="divide-y divide-border/40">
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-secondary/20">
                {Array.from({ length: columns }).map((_, colIdx) => {
                  if (colIdx === 0 && hasAvatar) {
                    return (
                      <td key={colIdx} className="p-3.5 sm:p-4">
                        <div className="flex items-center gap-3">
                          <SkeletonAvatar size="sm" />
                          <div className="space-y-1">
                            <Skeleton className="h-3.5 w-28" rounded="xs" />
                            <Skeleton className="h-2.5 w-18" rounded="xs" />
                          </div>
                        </div>
                      </td>
                    )
                  }

                  if (colIdx === columns - 1 && hasActions) {
                    return (
                      <td key={colIdx} className="p-3.5 sm:p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Skeleton className="h-8 w-8" rounded="lg" />
                          <Skeleton className="h-8 w-8" rounded="lg" />
                        </div>
                      </td>
                    )
                  }

                  if (colIdx === 2) {
                    return (
                      <td key={colIdx} className="p-3.5 sm:p-4">
                        <SkeletonBadge size="sm" width="w-16" />
                      </td>
                    )
                  }

                  return (
                    <td key={colIdx} className="p-3.5 sm:p-4">
                      <Skeleton className="h-3.5 w-24" rounded="xs" />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="p-4 border-t border-border/60 flex items-center justify-between text-xs">
        <Skeleton className="h-3.5 w-36" rounded="xs" />
        <div className="flex items-center gap-1.5">
          <Skeleton className="h-8 w-8" rounded="lg" />
          <Skeleton className="h-8 w-8" rounded="lg" />
          <Skeleton className="h-8 w-8" rounded="lg" />
        </div>
      </div>
    </div>
  )
}
