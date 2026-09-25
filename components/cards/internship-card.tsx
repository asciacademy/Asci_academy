"use client"

import Link from "next/link"
import { ArrowRight, Clock, MapPin, Banknote } from "lucide-react"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"

export interface InternshipCardProps {
  id: string
  title: string
  company: string
  companyLogo?: string
  stipend?: string
  location?: string
  workMode?: "Hybrid" | "Remote" | "On-site" | string
  duration?: string
  batchEligibility?: string
  skills?: string[]
  closingInDays?: number
  deadline?: string
  applied?: boolean
  href?: string
  variant?: "card" | "row"
  onApply?: () => void
}

/**
 * Universal InternshipCard
 * Strictly communicates Phase 11 structure:
 * 1. [COMPANY LOGO]
 * 2. Role Title (e.g. AI/ML Intern)
 * 3. Company
 * 4. Location / Mode (e.g. Remote)
 * 5. Duration (e.g. 3 months)
 * 6. Stipend (e.g. ₹50,000/mo)
 * 7. [Apply]
 */
export function InternshipCard({
  id,
  title,
  company,
  companyLogo,
  stipend = "₹45,000 / month",
  location = "Remote",
  workMode = "Remote",
  duration = "3 months",
  batchEligibility = "2026 & 2027 Batches",
  skills = ["Python", "PyTorch"],
  closingInDays,
  deadline,
  applied = false,
  href = `/internships/${id}`,
  variant = "card",
  onApply,
}: InternshipCardProps) {
  const displayLogo = companyLogo || company
  const locationText = workMode === "Remote" ? "Remote" : `${location} (${workMode})`

  if (variant === "row") {
    return (
      <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all shadow-2xs">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-secondary/80 border border-border flex items-center justify-center shrink-0">
            <CompanyLogo company={displayLogo} size={24} />
          </div>
          <div className="min-w-0 space-y-0.5">
            <Link
              href={href}
              className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors truncate block"
            >
              {title}
            </Link>
            <p className="text-xs text-muted-foreground truncate font-mono">
              {company} · {locationText} · {duration} · {stipend}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="text-xs font-mono font-bold text-foreground hidden sm:inline-block">
            {stipend}
          </span>
          <Link
            href={href}
            onClick={onApply}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shadow-2xs cursor-pointer"
          >
            <span>{applied ? "Applied" : "Apply"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 shadow-2xs">
      <div className="space-y-3">
        {/* 1. [COMPANY LOGO] + Duration badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-12 h-12 rounded-xl bg-secondary/80 border border-border/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CompanyLogo company={displayLogo} size={28} />
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 font-semibold">
            {duration}
          </span>
        </div>

        {/* 2. Role Title & 3. Company */}
        <div className="space-y-1">
          <Link href={href} className="block group-hover:text-primary transition-colors">
            <h3 className="text-base font-bold text-foreground tracking-tight leading-snug line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-xs font-semibold text-muted-foreground truncate">
            {company}
          </p>
        </div>

        {/* 4. Remote / Location */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="truncate">{locationText}</span>
        </div>

        {/* 5. Duration & 6. Stipend */}
        <div className="space-y-1.5 pt-2 border-t border-border/60 text-xs font-mono">
          <div className="flex items-center justify-between text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-muted-foreground shrink-0" />
              {duration}
            </span>
            <span className="text-primary font-bold text-xs">
              {stipend}
            </span>
          </div>
        </div>
      </div>

      {/* 7. Action: [Apply] */}
      <div className="mt-4 pt-3 border-t border-border/60">
        <Link
          href={href}
          onClick={onApply}
          className="inline-flex items-center justify-center w-full gap-1.5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <span>{applied ? "Applied" : "Apply"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
