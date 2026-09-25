"use client"

import React from "react"
import Link from "next/link"
import { BrandIcon } from "@/components/ui/brand-icon"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"
import { ArrowRight } from "lucide-react"
import { SearchResultItem } from "@/lib/search-dataset"

interface SearchResultCardProps {
  item: SearchResultItem
  onClick?: () => void
  compact?: boolean
}

/**
 * Phase 18: Universal Search Result Item
 *
 * Distinctive ASCI hierarchy:
 * [Logo / Brand / Company]
 * Title
 * Type Badge (Course, Project, Internship, Job, Challenge, Competition, Lesson, Skill, User)
 */
export function SearchResultCard({ item, onClick, compact = false }: SearchResultCardProps) {
  const renderVisualIcon = () => {
    if (item.iconType === "company") {
      return (
        <div className="w-9 h-9 rounded-xl bg-card border border-border/80 flex items-center justify-center shrink-0 shadow-2xs">
          <CompanyLogo company={item.iconValue} size={20} />
        </div>
      )
    }

    if (item.iconType === "avatar") {
      return (
        <div className="relative w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary font-bold text-xs shrink-0 shadow-2xs font-mono">
          {item.iconValue}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-background" />
        </div>
      )
    }

    return (
      <div className="w-9 h-9 rounded-xl bg-secondary/80 border border-border/80 flex items-center justify-center shrink-0 text-foreground shadow-2xs">
        <BrandIcon name={item.iconValue} size={20} />
      </div>
    )
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "Course":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
      case "Project":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
      case "Internship":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
      case "Job":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20"
      case "Challenge":
        return "bg-primary/10 text-primary border-primary/25"
      case "Competition":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
      case "Lesson":
        return "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20"
      case "Skill":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20"
      case "User":
        return "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20"
      default:
        return "bg-secondary text-foreground border-border"
    }
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`group flex items-center justify-between gap-4 p-3.5 sm:p-4 rounded-xl border border-border bg-card hover:bg-secondary/40 hover:border-primary/40 transition-all cursor-pointer shadow-2xs ${
        compact ? "py-2.5" : ""
      }`}
    >
      <div className="flex items-center gap-3.5 min-w-0">
        {/* [Logo] */}
        {renderVisualIcon()}

        {/* Title & Subtitle */}
        <div className="min-w-0 space-y-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="text-xs sm:text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">
              {item.title}
            </h4>
            {/* Type Badge */}
            <span
              className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold ${getTypeBadgeColor(
                item.type
              )}`}
            >
              {item.type}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-muted-foreground truncate leading-relaxed">
            {item.subtitle}
          </p>
        </div>
      </div>

      {/* Meta Badge or Arrow */}
      <div className="flex items-center gap-2 shrink-0">
        {item.metaBadge && (
          <span className="hidden sm:inline-block text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
            {item.metaBadge}
          </span>
        )}
        <div className="w-6 h-6 rounded-lg bg-secondary/60 flex items-center justify-center text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  )
}
