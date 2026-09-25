"use client"

import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { detectTechIcon } from "@/components/cards/course-card"

export interface ProjectCardProps {
  id: string
  slug: string
  title: string
  description?: string
  category?: string
  difficulty?: "Beginner" | "Intermediate" | "Advanced" | string
  estimatedHours?: string
  technologies?: string[]
  milestonesCount?: number
  enrolledStudents?: number
  variant?: "card" | "row"
}

/**
 * Universal ProjectCard
 * Fulfills Phase 12 visual rule:
 * 1. WHAT TECHNOLOGY WILL I USE? -> [React Logo] [Node Logo]
 * 2. WHAT AM I BUILDING? -> Title (e.g. Build a Job Portal)
 * 3. HOW HARD IS IT? -> Difficulty badge (e.g. Intermediate)
 * 4. Tech stack text: React • Node.js • PostgreSQL
 * 5. Estimated build time: 4–6 hours
 * 6. Action: [Start Project]
 */
export function ProjectCard({
  id,
  slug,
  title,
  category = "Frontend",
  difficulty = "Intermediate",
  estimatedHours = "4–6 hours",
  technologies = ["React", "Node.js", "PostgreSQL"],
  variant = "card",
}: ProjectCardProps) {
  const href = `/projects/${slug || id}`

  const difficultyColor =
    difficulty === "Beginner"
      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : difficulty === "Advanced"
      ? "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20"
      : "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"

  if (variant === "row") {
    return (
      <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all shadow-2xs">
        <div className="flex items-center gap-3.5 min-w-0">
          {/* Tech Logos */}
          <div className="flex items-center -space-x-1.5 shrink-0">
            {technologies.slice(0, 2).map((tech, idx) => (
              <div
                key={idx}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/90 border border-border/80 shadow-2xs"
                title={tech}
              >
                <BrandIcon name={detectTechIcon(tech)} size={22} />
              </div>
            ))}
          </div>

          <div className="min-w-0 space-y-0.5">
            <Link
              href={href}
              className="font-semibold text-sm sm:text-base text-foreground hover:text-primary transition-colors truncate block"
            >
              {title}
            </Link>
            <div className="flex items-center gap-2 text-xs text-muted-foreground flex-wrap font-mono">
              <span className={`px-2 py-0.2 rounded-full border font-semibold text-[10px] ${difficultyColor}`}>
                {difficulty}
              </span>
              <span>•</span>
              <span className="text-foreground">{technologies.join(" · ")}</span>
              <span>•</span>
              <span>{estimatedHours}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <Link
            href={href}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shadow-2xs cursor-pointer"
          >
            <span>Start Project</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 shadow-2xs">
      <div className="space-y-3.5">
        {/* Top: [React Logo] [Node Logo] + Difficulty badge */}
        <div className="flex items-center justify-between gap-2">
          {/* WHAT TECHNOLOGY WILL I USE? */}
          <div className="flex items-center -space-x-1.5">
            {technologies.slice(0, 2).map((tech, idx) => (
              <div
                key={idx}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/90 border border-border/80 shadow-2xs group-hover:scale-105 transition-transform"
                title={tech}
              >
                <BrandIcon name={detectTechIcon(tech)} size={24} />
              </div>
            ))}
          </div>

          {/* HOW HARD IS IT? */}
          <span className={`text-[11px] font-mono px-2.5 py-0.5 rounded-full border font-semibold ${difficultyColor}`}>
            {difficulty}
          </span>
        </div>

        {/* WHAT AM I BUILDING? -> Title */}
        <div className="space-y-1">
          <Link href={href} className="block group-hover:text-primary transition-colors">
            <h3 className="font-bold text-foreground text-base tracking-tight leading-snug line-clamp-1">
              {title}
            </h3>
          </Link>
          {/* Technologies list */}
          <p className="text-xs text-muted-foreground font-mono truncate">
            {technologies.join(" · ")}
          </p>
        </div>

        {/* Build time */}
        <div className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground pt-2 border-t border-border/60">
          <Clock className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
          <span>{estimatedHours} build time</span>
        </div>
      </div>

      {/* Action: [Start Project] */}
      <div className="mt-4 pt-3 border-t border-border/60">
        <Link
          href={href}
          className="inline-flex items-center justify-center w-full gap-1.5 py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <span>Start Project</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
