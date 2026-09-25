"use client"

import React, { useEffect } from "react"
import { X, Filter, RotateCcw } from "lucide-react"

interface MobileFilterBottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
  activeFilterCount?: number
  isFiltered?: boolean
  onReset?: () => void
  onApply?: () => void
}

/**
 * Phase 19: Mobile Filter Bottom Sheet
 * 
 * Replaces crammed desktop dropdown strips on mobile with an ergonomic,
 * swipeable / dismissable bottom sheet with 44px+ touch targets.
 */
export function MobileFilterBottomSheet({
  isOpen,
  onClose,
  title = "Filter & Sort",
  children,
  activeFilterCount = 0,
  isFiltered = false,
  onReset,
  onApply,
}: MobileFilterBottomSheetProps) {
  // Lock body scroll when bottom sheet is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200">
      {/* Tap backdrop to dismiss */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Sheet Content */}
      <div
        className="relative w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-border bg-card p-5 shadow-2xl flex flex-col justify-between space-y-4 animate-in slide-in-from-bottom duration-300 pb-[calc(env(safe-area-inset-bottom)+1rem)]"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Drag Handle */}
        <div className="mx-auto w-12 h-1.5 rounded-full bg-border shrink-0 -mt-1 mb-1" />

        {/* Sheet Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-primary" />
            <h3 className="font-serif text-lg font-bold text-foreground">
              {title}
            </h3>
            {(activeFilterCount > 0 || isFiltered) && (
              <span className="px-2 py-0.5 rounded-full bg-primary/15 text-primary text-[11px] font-mono font-bold">
                {activeFilterCount > 0 ? `${activeFilterCount} Active` : "Filtered"}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onReset && (
              <button
                type="button"
                onClick={onReset}
                className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer px-2 py-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sheet Filter Controls */}
        <div className="flex-1 overflow-y-auto space-y-4 py-1">
          {children}
        </div>

        {/* Sheet Apply Action */}
        <div className="pt-3 border-t border-border flex items-center gap-3">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="flex-1 h-12 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all cursor-pointer"
            >
              Clear All
            </button>
          )}
          <button
            type="button"
            onClick={() => {
              if (onApply) onApply()
              onClose()
            }}
            className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
