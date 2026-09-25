"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Calendar, Building2 } from "lucide-react"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"

export interface JobCardProps {
  id: string
  title: string
  company: string
  companyLogo?: string
  compensation?: string
  location?: string
  workMode?: "Hybrid" | "Remote" | "On-site" | string
  experience?: string
  batchEligibility?: string
  skills?: string[]
  closingInDays?: number
  deadline?: string
  applied?: boolean
  href?: string
  variant?: "card" | "row"
  onView?: () => void
}

/**
 * Universal JobCard
 * Strictly communicates Phase 11 structure:
 * 1. [COMPANY LOGO]
 * 2. Role Title (e.g. Software Engineer Intern)
 * 3. Company (e.g. Google)
 * 4. Location / Mode (e.g. Bangalore / Remote)
 * 5. Skills (e.g. Python · React · SQL)
 * 6. Deadline (e.g. Apply by Oct 12)
 * 7. [View Opportunity]
 */
export function JobCard({
  id,
  title,
  company,
  companyLogo,
  compensation = "₹18–26 LPA",
  location = "Bangalore",
  workMode = "Remote",
  experience = "0–2 Years",
  skills = ["Python", "React", "SQL"],
  closingInDays,
  deadline,
  applied = false,
  href = `/jobs/${id}`,
  variant = "card",
  onView,
}: JobCardProps) {
  const displayLogo = companyLogo || company
  const locationMode = `${location || "Bangalore"} / ${workMode || "Remote"}`
  const skillsLine = skills && skills.length > 0 ? skills.slice(0, 3).join(" · ") : "Python · React · SQL"
  const deadlineText = deadline
    ? `Apply by ${deadline}`
    : closingInDays
    ? `Apply in ${closingInDays} days`
    : "Apply by Oct 12"

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
              onClick={onView}
              className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors truncate block"
            >
              {title}
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap font-mono">
              <span className="font-semibold text-foreground">{company}</span>
              <span>•</span>
              <span>{locationMode}</span>
              <span>•</span>
              <span className="text-primary font-medium">{skillsLine}</span>
              <span>•</span>
              <span>{deadlineText}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <span className="text-xs font-mono font-bold text-foreground hidden sm:inline-block">
            {compensation}
          </span>
          <Link
            href={href}
            onClick={onView}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all shadow-2xs cursor-pointer"
          >
            <span>{applied ? "Applied" : "View Opportunity"}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 shadow-2xs">
      <div className="space-y-3">
        {/* 1. [COMPANY LOGO] + Work Mode Tag */}
        <div className="flex items-center justify-between gap-2">
          <div className="w-12 h-12 rounded-xl bg-secondary/80 border border-border/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <CompanyLogo company={displayLogo} size={28} />
          </div>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground font-semibold">
            {workMode}
          </span>
        </div>

        {/* 2. Role Title & 3. Company */}
        <div className="space-y-1">
          <Link
            href={href}
            onClick={onView}
            className="block group-hover:text-primary transition-colors"
          >
            <h3 className="text-base font-bold text-foreground tracking-tight leading-snug line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-xs font-semibold text-muted-foreground truncate">
            {company}
          </p>
        </div>

        {/* 4. Location / Remote */}
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
          <span className="truncate">{locationMode}</span>
        </div>

        {/* 5. Skills Line (e.g. Python · React · SQL) */}
        <div className="pt-2 border-t border-border/60">
          <p className="text-xs font-mono text-primary font-medium truncate">
            {skillsLine}
          </p>
        </div>

        {/* 6. Deadline: Apply by Oct 12 */}
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-0.5">
          <span className="flex items-center gap-1 text-[11px]">
            <Calendar className="w-3 h-3 text-muted-foreground shrink-0" />
            {deadlineText}
          </span>
          <span className="font-bold text-foreground text-xs">{compensation}</span>
        </div>
      </div>

      {/* 7. Action: [View Opportunity] */}
      <div className="mt-4 pt-3 border-t border-border/60">
        <Link
          href={href}
          onClick={onView}
          className="inline-flex items-center justify-center w-full gap-1.5 py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <span>{applied ? "Applied" : "View Opportunity"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
