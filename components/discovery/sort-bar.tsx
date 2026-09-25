"use client"

import * as React from "react"
import { ArrowUpDown } from "lucide-react"

export interface SortOption {
  id: string
  label: string
}

export interface SortBarProps {
  options: SortOption[]
  selectedId: string
  onSelect: (id: string) => void
  label?: string
  className?: string
}

/**
 * Universal SortBar Pattern
 * Compact sort selector supporting quick ranking (Most Popular, Newest, Closing Soon, etc.).
 */
export function SortBar({
  options,
  selectedId,
  onSelect,
  label = "Sort by:",
  className = "",
}: SortBarProps) {
  return (
    <div className={`flex items-center gap-1.5 text-xs ${className}`}>
      <span className="text-muted-foreground flex items-center gap-1 font-mono text-[11px] shrink-0">
        <ArrowUpDown className="w-3 h-3" />
        <span>{label}</span>
      </span>

      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onSelect(opt.id)}
              className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                isSelected
                  ? "bg-secondary text-foreground font-semibold border border-border"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              }`}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
