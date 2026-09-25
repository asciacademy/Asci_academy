"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"

export interface CompactCardProps {
  id: string
  title: string
  subtitle: string
  href: string
  iconType?: "brand" | "company" | "lucide"
  iconValue?: string
  metaBadge?: string
  actionLabel?: string
  className?: string
}

/**
 * Universal CompactCard Pattern
 * Ultra-dense discovery card for sidebars, search lists, and quick preview docks.
 * Strictly communicates: VISUAL · TITLE · CONTEXT · IMPORTANT METADATA · ACTION
 */
export function CompactCard({
  title,
  subtitle,
  href,
  iconType = "brand",
  iconValue = "asci",
  metaBadge,
  actionLabel = "View",
  className = "",
}: CompactCardProps) {
  return (
    <Link
      href={href}
      className={`group flex items-center justify-between gap-3 p-2.5 rounded-lg border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all shadow-2xs ${className}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {/* Visual */}
        <div className="w-8 h-8 rounded-lg bg-secondary/80 border border-border flex items-center justify-center shrink-0">
          {iconType === "company" ? (
            <CompanyLogo company={iconValue} size={16} />
          ) : (
            <BrandIcon name={iconValue} size={16} />
          )}
        </div>

        {/* Title & Context */}
        <div className="min-w-0">
          <h4 className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {title}
          </h4>
          <p className="text-[11px] text-muted-foreground truncate">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Metadata & Action */}
      <div className="flex items-center gap-2 shrink-0">
        {metaBadge && (
          <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
            {metaBadge}
          </span>
        )}
        <span className="text-xs text-primary font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-mono">
          <span>{actionLabel}</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  )
}
