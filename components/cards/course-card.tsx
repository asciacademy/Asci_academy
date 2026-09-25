"use client"

import Link from "next/link"
import { Bookmark, ArrowRight } from "lucide-react"
import { useWishlist } from "@/lib/user-learning-store"
import { BrandIcon } from "@/components/ui/brand-icon"

export interface CourseCardProps {
  id: string
  slug: string
  title: string
  description?: string
  category?: string
  level?: "Beginner" | "Intermediate" | "Advanced" | string
  duration?: string
  lessonsCount?: number
  projectsCount?: number
  hasCertificate?: boolean
  thumbnail?: string
  enrolled?: boolean
  progress?: number
  variant?: "card" | "row"
}

export function detectTechIcon(slugOrTitle: string, category: string = ""): string {
  const text = `${slugOrTitle} ${category}`.toLowerCase()
  if (text.includes("python")) return "python"
  if (text.includes("react")) return "react"
  if (text.includes("javascript") || text.includes("js")) return "javascript"
  if (text.includes("typescript") || text.includes("ts")) return "typescript"
  if (text.includes("node")) return "nodejs"
  if (text.includes("next")) return "nextjs"
  if (text.includes("rust")) return "rust"
  if (text.includes("go") || text.includes("golang")) return "go"
  if (text.includes("c++") || text.includes("cpp")) return "cpp"
  if (text.includes("docker") || text.includes("container")) return "docker"
  if (text.includes("aws") || text.includes("cloud")) return "aws"
  if (text.includes("sql") || text.includes("postgres") || text.includes("database")) return "postgresql"
  if (text.includes("mongo")) return "mongodb"
  if (text.includes("ai") || text.includes("llm") || text.includes("agent") || text.includes("gpt")) return "openai"
  if (text.includes("system") || text.includes("architecture")) return "system-design"
  if (text.includes("dsa") || text.includes("algorithm")) return "algorithm"
  return "asci"
}

/**
 * Universal CourseCard
 * Strictly adheres to Phase 6 Course Card Specification:
 * - [TECH LOGO]
 * - Title
 * - Short Description
 * - Important Metadata: Lessons · Level · Certificate
 * - Action: [View Course] / If enrolled: 65% Complete + [Continue]
 */
export function CourseCard({
  id,
  slug,
  title,
  description,
  category = "Engineering",
  level = "Beginner",
  duration = "6 Weeks",
  lessonsCount = 24,
  projectsCount = 3,
  hasCertificate = true,
  enrolled = false,
  progress = 0,
  variant = "card",
}: CourseCardProps) {
  const { isSaved, toggle } = useWishlist()
  const saved = isSaved(slug || id)
  const href = slug.startsWith("/programs") || slug.startsWith("/courses") ? slug : `/courses/${slug}`
  const iconName = detectTechIcon(slug || title, category)

  // Clean metadata line
  const metaLine = `${lessonsCount} Lessons · ${level} · ${hasCertificate ? "Certificate" : "Guided Project"}`

  // Row layout for dense lists
  if (variant === "row") {
    return (
      <div className="group flex items-center justify-between gap-4 p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all shadow-2xs">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-secondary/80 border border-border flex items-center justify-center shrink-0">
            <BrandIcon name={iconName} size={22} />
          </div>
          <div className="min-w-0">
            <Link
              href={href}
              className="font-semibold text-xs sm:text-sm text-foreground hover:text-primary transition-colors truncate block"
            >
              {title}
            </Link>
            <p className="text-[11px] text-muted-foreground truncate mt-0.5">{metaLine}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {enrolled && (
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="font-semibold text-primary">{progress}% Complete</span>
              <div className="w-14 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: `${progress}%` }} />
              </div>
            </div>
          )}

          <Link
            href={enrolled ? `${href}/learn` : href}
            className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shadow-xs"
          >
            <span>{enrolled ? "Continue" : "View Course"}</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    )
  }

  // Standard Compact Card Layout
  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-border bg-card p-4 transition-all duration-200 hover:border-primary/50 hover:shadow-2xs">
      <div className="space-y-2.5">
        {/* Top: Visual Logo + Bookmark */}
        <div className="flex items-start justify-between gap-2">
          <div className="w-9 h-9 rounded-lg bg-secondary/80 border border-border flex items-center justify-center shrink-0">
            <BrandIcon name={iconName} size={20} />
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggle({
                courseSlug: slug || id,
                title,
                category,
                level,
                duration,
                desc: description,
                playerUrl: href,
              })
            }}
            aria-label={saved ? "Remove from saved" : "Save course"}
            className="text-muted-foreground hover:text-primary transition-colors p-1 rounded-md cursor-pointer"
          >
            <Bookmark className={`h-4 w-4 ${saved ? "fill-primary text-primary" : ""}`} />
          </button>
        </div>

        {/* Title */}
        <Link href={href} className="block group-hover:text-primary transition-colors">
          <h3 className="font-semibold text-xs sm:text-sm text-foreground tracking-tight leading-snug line-clamp-1">
            {title}
          </h3>
        </Link>

        {/* Short Description */}
        {description && (
          <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
            {description}
          </p>
        )}

        {/* If Enrolled: Progress bar */}
        {enrolled && (
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[10px] font-mono">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">{progress}% Complete</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(5, progress)}%` }}
              />
            </div>
          </div>
        )}

        {/* Metadata Line */}
        <div className="text-[10px] font-mono text-muted-foreground pt-1.5 border-t border-border/60">
          {metaLine}
        </div>
      </div>

      {/* CTA Button */}
      <div className="mt-3 pt-2.5 border-t border-border/60">
        <Link
          href={enrolled ? `${href}/learn` : href}
          className="inline-flex items-center justify-center w-full gap-1.5 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shadow-xs active:scale-[0.98]"
        >
          <span>{enrolled ? "Continue" : "View Course"}</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
