"use client"

import React from "react"
import { Skeleton, SkeletonAvatar, SkeletonBadge, SkeletonButton } from "./Skeleton"

export interface DataTableSkeletonProps {
  rows?: number
  columns?: number
  hasAvatar?: boolean
  hasActions?: boolean
  className?: string
}

export function DataTableSkeleton({
  rows = 8,
  columns = 5,
  hasAvatar = true,
  hasActions = true,
  className,
}: DataTableSkeletonProps) {
  return (
    <div
      aria-busy="true"
      aria-label="Loading data table"
      className={`rounded-2xl border border-hairline/70 bg-card overflow-hidden shadow-xs select-none ${className || ""}`}
    >
      {/* Table Toolbar / Search */}
      <div className="p-4 border-b border-hairline/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <Skeleton className="h-9 w-64 rounded-xl" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-24 rounded-xl" />
          <Skeleton className="h-9 w-20 rounded-xl" />
        </div>
      </div>

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          {/* Header Row */}
          <thead>
            <tr className="border-b border-hairline/60 bg-secondary/30">
              {Array.from({ length: columns }).map((_, colIdx) => (
                <th key={colIdx} className="p-3.5 sm:p-4 text-xs font-semibold">
                  <Skeleton className="h-3.5 w-20 rounded" />
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body Rows */}
          <tbody className="divide-y divide-hairline/40">
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-secondary/20">
                {Array.from({ length: columns }).map((_, colIdx) => {
                  if (colIdx === 0 && hasAvatar) {
                    return (
                      <td key={colIdx} className="p-3.5 sm:p-4">
                        <div className="flex items-center gap-3">
                          <SkeletonAvatar size="sm" />
                          <div className="space-y-1">
                            <Skeleton className="h-3.5 w-28 rounded" />
                            <Skeleton className="h-2.5 w-18 rounded" />
                          </div>
                        </div>
                      </td>
                    )
                  }

                  if (colIdx === columns - 1 && hasActions) {
                    return (
                      <td key={colIdx} className="p-3.5 sm:p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Skeleton className="h-8 w-8 rounded-lg" />
                          <Skeleton className="h-8 w-8 rounded-lg" />
                        </div>
                      </td>
                    )
                  }

                  if (colIdx === 2) {
                    return (
                      <td key={colIdx} className="p-3.5 sm:p-4">
                        <SkeletonBadge className="h-5 w-16" />
                      </td>
                    )
                  }

                  return (
                    <td key={colIdx} className="p-3.5 sm:p-4">
                      <Skeleton className="h-3.5 w-24 rounded" />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Bar */}
      <div className="p-4 border-t border-hairline/50 flex flex-col sm:flex-row items-center justify-between gap-3 bg-secondary/20">
        <Skeleton className="h-3.5 w-36 rounded" />
        <div className="flex items-center gap-2">
          <SkeletonButton size="sm" className="w-20 h-8" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <SkeletonButton size="sm" className="w-20 h-8" />
        </div>
      </div>
    </div>
  )
}
