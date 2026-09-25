"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Clock, FolderGit2, Trophy } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

export interface LearningPathCardProps {
  slug: string
  title: string
  role?: string
  description?: string
  duration?: string
  coursesCount?: number
  projectsCount?: number
  challengesCount?: number
  brand?: string
  skills?: string[]
  badge?: string
  variant?: "card" | "row"
  progress?: number
}

/**
 * Universal LearningPathCard
 * Follows exact Phase 7 anatomy:
 * 1. VISUAL: [AI VISUAL] / Brand icon
 * 2. TITLE: Career track title
 * 3. CONTEXT: Short description ("Build the skills needed for modern AI engineering.")
 * 4. IMPORTANT METADATA: 7 Courses · 6 Projects · 12 Challenges
 * 5. ACTION: [Explore Path]
 */
export function LearningPathCard({
  slug,
  title,
  role,
  description,
  duration = "16 Weeks",
  coursesCount = 7,
  projectsCount = 6,
  challengesCount = 12,
  brand = "openai",
  skills = [],
  badge,
  variant = "card",
  progress,
}: LearningPathCardProps) {
  const href = `/paths/${slug}`
  const displayDesc = description || role || "Build real-world engineering competence through a structured path."
  const hasProgress = typeof progress === "number" && progress > 0

  if (variant === "row") {
    return (
      <div className="group flex items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all shadow-2xs">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-xl bg-secondary/80 border border-border flex items-center justify-center shrink-0">
            <BrandIcon name={brand} size={24} />
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2">
              <Link
                href={href}
                className="font-semibold text-sm text-foreground hover:text-primary transition-colors truncate"
              >
                {title}
              </Link>
              {badge && (
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {badge}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {displayDesc}
            </p>
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground pt-0.5">
              <span>{coursesCount} Courses</span>
              <span>•</span>
              <span>{projectsCount} Projects</span>
              <span>•</span>
              <span>{challengesCount} Challenges</span>
            </div>
          </div>
        </div>

        <Link
          href={href}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shrink-0 shadow-xs cursor-pointer"
        >
          <span>{hasProgress ? "Continue Path" : "Explore Path"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    )
  }

  return (
    <div className="group flex flex-col justify-between p-5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all shadow-2xs">
      <div className="space-y-4">
        {/* Visual & Top Meta */}
        <div className="flex items-center justify-between">
          <div className="w-12 h-12 rounded-xl bg-secondary/80 border border-border/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <BrandIcon name={brand} size={28} />
          </div>
          <div className="flex items-center gap-1.5">
            {badge && (
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                {badge}
              </span>
            )}
            <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground">
              {duration}
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="space-y-1.5">
          <Link href={href} className="block group-hover:text-primary transition-colors">
            <h3 className="text-base font-bold text-foreground">
              {title}
            </h3>
          </Link>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {displayDesc}
          </p>
        </div>

        {/* Important Metadata: 7 Courses • 6 Projects • 12 Challenges */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground pt-2 border-t border-border/60">
          <span className="font-semibold text-foreground">{coursesCount} Courses</span>
          <span>•</span>
          <span>{projectsCount} Projects</span>
          <span>•</span>
          <span>{challengesCount} Challenges</span>
        </div>

        {/* Progress bar if present */}
        {hasProgress && (
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-muted-foreground">
              <span>Progress</span>
              <span className="text-primary font-bold">{progress}% Complete</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Action */}
      <div className="pt-4 mt-4 border-t border-border/60">
        <Link
          href={href}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all cursor-pointer shadow-2xs"
        >
          <span>{hasProgress ? "Continue Path" : "Explore Path"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
