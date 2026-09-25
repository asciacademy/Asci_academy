"use client"

import * as React from "react"

export interface CategoryItem {
  id: string
  label: string
  icon?: React.ComponentType<{ className?: string }>
  count?: number
}

export interface CategoryRailProps {
  categories: CategoryItem[]
  selectedId: string
  onSelect: (id: string) => void
  className?: string
}

/**
 * Universal CategoryRail Pattern
 * Horizontal scrolling category pills with icon support, selection state, and item counts.
 */
export function CategoryRail({
  categories,
  selectedId,
  onSelect,
  className = "",
}: CategoryRailProps) {
  return (
    <div
      className={`overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1.5 py-1 ${className}`}
      role="tablist"
      aria-label="Category Filters"
    >
      {categories.map((cat) => {
        const isSelected = selectedId === cat.id
        const Icon = cat.icon

        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isSelected}
            onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all select-none border shrink-0 cursor-pointer ${
              isSelected
                ? "bg-primary text-primary-foreground border-primary font-semibold shadow-2xs"
                : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground hover:border-slate-300 dark:hover:border-slate-700"
            }`}
          >
            {Icon && <Icon className="w-3.5 h-3.5 shrink-0" />}
            <span>{cat.label}</span>
            {cat.count !== undefined && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isSelected
                    ? "bg-primary-foreground/20 text-primary-foreground"
                    : "bg-secondary text-muted-foreground"
                }`}
              >
                {cat.count}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
