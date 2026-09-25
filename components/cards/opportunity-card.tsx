"use client"

import Link from "next/link"
import { ArrowRight, MapPin, Banknote } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { detectOrganizerIcon } from "@/components/cards/competition-card"

export interface OpportunityCardProps {
  id: string
  title: string
  company: string
  location?: string
  workType?: "Full-Time" | "Internship" | "Contract" | string
  salary?: string
  experience?: string
  skills?: string[]
  deadline?: string
  logo?: string
  applicantsCount?: number
  href?: string
  variant?: "card" | "row"
}

export function OpportunityCard({
  id,
  title,
  company,
  location = "Bengaluru / Remote",
  workType = "Full-Time",
  salary = "₹18–24 LPA",
  skills = ["Go", "React", "PostgreSQL"],
  deadline = "15 Oct",
  href = "/career",
  variant = "card",
}: OpportunityCardProps) {
  const companyIcon = detectOrganizerIcon(company)

  if (variant === "row") {
    return (
      <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/80">
            <BrandIcon name={companyIcon} size={22} />
          </div>
          <div className="min-w-0">
            <Link href={href} className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors truncate block">
              {title}
            </Link>
            <p className="text-xs text-muted-foreground truncate">
              {company} · {location} · {salary} · Apply by {deadline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            href={href}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all"
          >
            <span>View Opportunity</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-xs">
      <div>
        {/* Prominent Company Logo Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/80">
            <BrandIcon name={companyIcon} size={24} />
          </div>
          <span className="text-[11px] font-mono text-muted-foreground">
            {workType}
          </span>
        </div>

        {/* Role Title */}
        <Link href={href} className="block group-hover:text-primary transition-colors">
          <h3 className="font-semibold text-foreground text-base tracking-tight leading-snug line-clamp-1 mb-1">
            {title}
          </h3>
        </Link>

        {/* Company & Location */}
        <div className="text-xs text-muted-foreground mb-3 font-medium flex items-center gap-1.5 truncate">
          <span className="text-foreground/90 font-semibold">{company}</span>
          <span>·</span>
          <span>{location}</span>
        </div>

        {/* Compensation & Skills */}
        <div className="space-y-2 pt-2 border-t border-border/60 text-[11px] font-mono">
          <div className="flex items-center justify-between text-foreground font-semibold">
            <span>Compensation:</span>
            <span className="text-primary">{salary}</span>
          </div>

          {skills && skills.length > 0 && (
            <div className="flex items-center gap-1 flex-wrap">
              {skills.slice(0, 3).map((skill) => (
                <span
                  key={skill}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/60"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer / CTA Row */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-3">
        <span className="text-[11px] font-mono text-muted-foreground">
          Apply by {deadline}
        </span>

        <Link
          href={href}
          className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-primary hover:bg-primary-active text-primary-foreground transition-all duration-150 shrink-0 shadow-2xs"
        >
          <span>View Opportunity</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
