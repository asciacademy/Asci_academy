"use client"

import * as React from "react"
import { Filter, X, RotateCcw } from "lucide-react"

export interface ActiveFilter {
  id: string
  label: string
  group?: string
}

export interface FilterBarProps {
  totalResults?: number
  activeFilters: ActiveFilter[]
  onRemoveFilter: (id: string) => void
  onClearAll: () => void
  children?: React.ReactNode
  className?: string
}

/**
 * Universal FilterBar Pattern
 * Clean filter status line with active badge tags, result count, and instant clear trigger.
 */
export function FilterBar({
  totalResults,
  activeFilters,
  onRemoveFilter,
  onClearAll,
  children,
  className = "",
}: FilterBarProps) {
  const hasActiveFilters = activeFilters.length > 0

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Top filter row: filters / controls */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono shrink-0">
            <Filter className="w-3.5 h-3.5" />
            {totalResults !== undefined && (
              <span className="font-semibold text-foreground">
                {totalResults.toLocaleString()} {totalResults === 1 ? "result" : "results"}
              </span>
            )}
          </div>
          {children}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onClearAll}
            className="inline-flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Active Filter Tags */}
      {hasActiveFilters && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          {activeFilters.map((filter) => (
            <span
              key={filter.id}
              className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-secondary border border-border text-[11px] font-mono text-foreground"
            >
              {filter.group && <span className="text-muted-foreground">{filter.group}:</span>}
              <span className="font-semibold">{filter.label}</span>
              <button
                type="button"
                onClick={() => onRemoveFilter(filter.id)}
                className="p-0.5 rounded hover:bg-card text-muted-foreground hover:text-foreground cursor-pointer"
                aria-label={`Remove filter ${filter.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
