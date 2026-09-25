"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, Flame, Award } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { detectTechIcon } from "@/components/cards/course-card"

export interface ChallengeCardProps {
  id: string
  slug: string
  title: string
  difficulty?: "Easy" | "Medium" | "Hard" | string
  topic?: string
  estimatedMinutes?: number
  solvedCount?: number
  acceptanceRate?: string
  xpReward?: number
  status?: "solved" | "attempted" | "unsolved"
  isDaily?: boolean
  variant?: "card" | "row"
}

export function ChallengeCard({
  id,
  slug,
  title,
  difficulty = "Medium",
  topic = "Arrays",
  estimatedMinutes = 15,
  solvedCount,
  acceptanceRate,
  xpReward = 30,
  status = "unsolved",
  isDaily = false,
  variant = "card",
}: ChallengeCardProps) {
  const href = slug.startsWith("/dsa") ? slug : `/dsa/problem/${slug || id}`
  const topicIcon = detectTechIcon(topic)

  const difficultyColor =
    difficulty === "Easy"
      ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
      : difficulty === "Hard"
      ? "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20"
      : "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"

  if (variant === "row") {
    return (
      <div className="group flex items-center justify-between gap-4 p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all shadow-2xs">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/80">
            <BrandIcon name={topicIcon} size={20} />
          </div>
          <div className="min-w-0 space-y-0.5">
            <div className="flex items-center gap-2">
              <Link href={href} className="font-semibold text-xs sm:text-sm text-foreground hover:text-primary transition-colors truncate block">
                {title}
              </Link>
              {isDaily && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold shrink-0">
                  POTD
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
              <span className={`px-1.5 py-0.2 rounded border font-semibold ${difficultyColor}`}>
                {difficulty}
              </span>
              <span>•</span>
              <span className="truncate">{topic}</span>
              {acceptanceRate && (
                <>
                  <span>•</span>
                  <span>{acceptanceRate}</span>
                </>
              )}
              {xpReward && (
                <>
                  <span>•</span>
                  <span className="text-primary font-bold">+{xpReward} XP</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {status === "solved" ? (
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
              <CheckCircle2 className="h-4 w-4" /> Solved
            </span>
          ) : (
            <Link
              href={href}
              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shadow-2xs cursor-pointer"
            >
              <span>Solve Problem</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 shadow-2xs">
      <div className="space-y-3">
        {/* Top: Topic Visual + Badges */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary/80 border border-border/80 group-hover:scale-105 transition-transform">
            <BrandIcon name={topicIcon} size={22} />
          </div>
          <div className="flex items-center gap-1.5">
            {isDaily && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-bold flex items-center gap-1">
                <Flame className="w-3 h-3 fill-current" />
                POTD
              </span>
            )}
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-semibold ${difficultyColor}`}>
              {difficulty}
            </span>
          </div>
        </div>

        {/* Title */}
        <Link href={href} className="block group-hover:text-primary transition-colors">
          <h3 className="font-bold text-foreground text-sm tracking-tight leading-snug line-clamp-1">
            {title}
          </h3>
        </Link>

        {/* Topic Context & Metadata */}
        <div className="space-y-1.5 pt-1 border-t border-border/60 text-xs font-mono text-muted-foreground">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground truncate">{topic}</span>
            <span className="text-foreground font-semibold">~{estimatedMinutes} min</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span>{solvedCount ? `${solvedCount.toLocaleString()} solved` : "Popular"}</span>
            <span className="text-primary font-bold">+{xpReward} XP</span>
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="mt-4 pt-3 border-t border-border/60">
        <Link
          href={href}
          className="inline-flex items-center justify-center w-full gap-1.5 py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground text-xs font-semibold transition-all shadow-2xs cursor-pointer"
        >
          <span>Solve Problem</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  )
}
