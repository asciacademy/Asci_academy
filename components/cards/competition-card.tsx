"use client"

import Link from "next/link"
import { ArrowRight, Trophy, Users, Calendar, Globe, Sparkles } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

export interface CompetitionCardProps {
  id: string
  slug: string
  title: string
  organizer: string
  prizePool?: string
  teamSize?: string
  mode?: "Online" | "Offline" | "Hybrid" | string
  deadline?: string
  daysLeft?: number
  skills?: string[]
  registeredCount?: number
  status?: "Open" | "Live" | "Upcoming" | "Closed" | string
  category?: "Hackathon" | "Coding Challenge" | "AI Challenge" | "Quiz" | string
  variant?: "card" | "row"
  featured?: boolean
}

export function detectOrganizerIcon(organizer: string): string {
  const o = (organizer || "").toLowerCase()
  if (o.includes("google")) return "google"
  if (o.includes("microsoft")) return "microsoft"
  if (o.includes("amazon") || o.includes("aws")) return "aws"
  if (o.includes("meta")) return "meta"
  if (o.includes("apple")) return "apple"
  if (o.includes("adobe")) return "adobe"
  if (o.includes("tcs")) return "tcs"
  if (o.includes("infosys")) return "infosys"
  if (o.includes("zerodha")) return "zerodha"
  if (o.includes("razorpay")) return "razorpay"
  if (o.includes("openai")) return "openai"
  if (o.includes("asci")) return "asci"
  return "asci"
}

/**
 * Universal CompetitionCard
 * Communicates:
 * 1. [ORGANIZER LOGO]
 * 2. Competition name
 * 3. Organizer
 * 4. Online / Offline (Mode)
 * 5. Team size
 * 6. Skill
 * 7. Deadline
 * 8. Prize
 * 9. [View Details]
 */
export function CompetitionCard({
  id,
  slug,
  title,
  organizer,
  prizePool = "₹50,000",
  teamSize = "Team of 2–4",
  mode = "Online",
  deadline = "Nov 15",
  skills = ["Full-Stack", "DSA"],
  daysLeft = 4,
  variant = "card",
  featured = false,
}: CompetitionCardProps) {
  const href = `/competitions/${slug || id}`
  const orgIcon = detectOrganizerIcon(organizer)
  const primarySkill = skills?.[0] || "Engineering"

  if (variant === "row") {
    return (
      <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all shadow-2xs">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/80">
            <BrandIcon name={orgIcon} size={24} />
          </div>
          <div className="min-w-0 space-y-0.5">
            <Link
              href={href}
              className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors truncate block"
            >
              {title}
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap font-mono">
              <span className="font-semibold text-foreground">{organizer}</span>
              <span>•</span>
              <span>{mode}</span>
              <span>•</span>
              <span>{teamSize}</span>
              <span>•</span>
              <span>{primarySkill}</span>
              <span>•</span>
              <span>Ends {deadline}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <div className="text-right hidden sm:block">
            <div className="text-[10px] font-mono uppercase text-muted-foreground">Prize Pool</div>
            <div className="font-mono text-sm font-bold text-primary">{prizePool}</div>
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all shadow-2xs cursor-pointer"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`group relative flex flex-col justify-between rounded-2xl border bg-card p-5 transition-all duration-200 hover:border-primary/50 shadow-2xs ${
        featured ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
      }`}
    >
      <div className="space-y-3.5">
        {/* Top: [ORGANIZER LOGO] + Mode Badge */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/80 group-hover:scale-105 transition-transform">
            <BrandIcon name={orgIcon} size={28} />
          </div>
          <div className="flex items-center gap-1.5">
            {featured && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Featured
              </span>
            )}
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground font-semibold">
              {mode}
            </span>
          </div>
        </div>

        {/* Competition Name & Organizer */}
        <div className="space-y-1">
          <Link href={href} className="block group-hover:text-primary transition-colors">
            <h3 className="font-bold text-foreground text-base tracking-tight leading-snug line-clamp-1">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground font-medium truncate">
            by {organizer}
          </p>
        </div>

        {/* Essential Info Grid: Team Size, Skill, Deadline, Prize */}
        <div className="space-y-1.5 pt-2 border-t border-border/60 text-xs font-mono text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1 truncate max-w-[140px]">
              <Users className="w-3 h-3 text-muted-foreground shrink-0" />
              {teamSize}
            </span>
            <span className="px-1.5 py-0.2 rounded bg-secondary text-[10px] text-foreground font-semibold truncate">
              {primarySkill}
            </span>
          </div>

          <div className="flex items-center justify-between pt-0.5">
            <span className="flex items-center gap-1 text-[11px]">
              <Calendar className="w-3 h-3 text-muted-foreground shrink-0" />
              Ends {deadline}
            </span>
            <span className="text-primary font-bold flex items-center gap-1 text-xs">
              <Trophy className="h-3 w-3 shrink-0" />
              {prizePool}
            </span>
          </div>
        </div>
      </div>

      {/* Action: [View Details] */}
      <div className="mt-4 pt-3 border-t border-border/60">
        <Link
          href={href}
          className="inline-flex items-center justify-center w-full gap-1.5 py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
