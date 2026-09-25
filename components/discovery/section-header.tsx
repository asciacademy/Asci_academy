"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

export interface SectionHeaderProps {
  title: string
  subtitle?: string
  actionHref?: string
  actionLabel?: string
  count?: number
  className?: string
  badge?: string
}

/**
 * Universal SectionHeader Pattern
 * Compact, scannable header communicating title, brief context, and optional "View All →" action.
 */
export function SectionHeader({
  title,
  subtitle,
  actionHref,
  actionLabel = "View All",
  count,
  className = "",
  badge,
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between gap-3 ${className}`}>
      <div className="space-y-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-bold text-foreground tracking-tight truncate">
            {title}
          </h2>
          {badge && (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary shrink-0">
              {badge}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground line-clamp-1">
            {subtitle}
          </p>
        )}
      </div>

      {actionHref && (
        <Link
          href={actionHref}
          className="group inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-primary-active transition-colors shrink-0 font-mono"
        >
          <span>
            {actionLabel} {count !== undefined ? `(${count})` : ""}
          </span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  )
}
