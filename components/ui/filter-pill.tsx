"use client"

import * as React from "react"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface FilterPillItem {
  id: string
  label: string
  icon?: LucideIcon
  count?: number
  badge?: string
  href?: string
}

export interface FilterPillGroupProps {
  items: FilterPillItem[]
  activeId: string
  onChange?: (id: string) => void
  className?: string
  variant?: "orange" | "dark"
}

export function FilterPillGroup({
  items,
  activeId,
  onChange,
  className,
  variant = "orange",
}: FilterPillGroupProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null)

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      <div
        ref={scrollRef}
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5 scroll-smooth"
        role="tablist"
      >
        {items.map((item) => {
          const isActive = activeId === item.id
          const Icon = item.icon

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange?.(item.id)}
              className={cn(
                "inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all select-none cursor-pointer shrink-0 border",
                isActive
                  ? variant === "orange"
                    ? "bg-primary text-primary-foreground border-primary shadow-xs font-semibold"
                    : "bg-foreground text-background border-foreground font-semibold"
                  : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground hover:border-slate-300 dark:hover:border-slate-700"
              )}
            >
              {Icon && (
                <Icon
                  className={cn(
                    "w-3.5 h-3.5 shrink-0",
                    isActive ? "text-primary-foreground" : "text-muted-foreground"
                  )}
                />
              )}
              <span>{item.label}</span>
              {item.count !== undefined && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-[10px] font-mono",
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-secondary text-muted-foreground"
                  )}
                >
                  {item.count}
                </span>
              )}
              {item.badge && (
                <span
                  className={cn(
                    "px-1.5 py-0.2 rounded-full text-[9px] uppercase font-bold tracking-wider",
                    isActive
                      ? "bg-white text-primary"
                      : "bg-primary/10 text-primary"
                  )}
                >
                  {item.badge}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
