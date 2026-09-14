"use client"

import React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Clock,
  PlayCircle,
  ArrowRight,
  BookOpen,
  Trash2,
  CheckCircle2,
  Layers,
} from "lucide-react"
import { useLearningHistory, HistoryItem } from "@/lib/user-learning-store"

interface LearningHistorySectionProps {
  className?: string
  limit?: number
  compact?: boolean
  showClearAll?: boolean
}

function formatTimeAgo(isoDate: string): string {
  try {
    const diffMs = Date.now() - new Date(isoDate).getTime()
    const mins = Math.floor(diffMs / (1000 * 60))
    if (mins < 1) return "Just now"
    if (mins < 60) return `${mins}m ago`
    const hours = Math.floor(mins / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    if (days === 1) return "Yesterday"
    if (days < 30) return `${days}d ago`
    return new Date(isoDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })
  } catch {
    return "Recently"
  }
}

export function LearningHistorySection({
  className = "",
  limit = 6,
  compact = false,
  showClearAll = true,
}: LearningHistorySectionProps) {
  const { history, remove, clear, count } = useLearningHistory()
  const displayItems = history.slice(0, limit)

  if (count === 0) {
    return (
      <div className={`rounded-2xl border border-hairline bg-card p-6 text-center space-y-3 ${className}`}>
        <div className="h-12 w-12 rounded-xl bg-secondary mx-auto flex items-center justify-center text-muted-foreground/60 border border-hairline">
          <Clock className="h-6 w-6 stroke-[1.5]" />
        </div>
        <div>
          <h4 className="font-serif text-base font-medium text-foreground">
            No Study History Yet
          </h4>
          <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1 leading-relaxed">
            As you practice and complete curriculum modules, your recent lessons and progress will appear here for fast one-click resume.
          </p>
        </div>
        <Link
          href="/programs"
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold shadow-xs hover:bg-primary-active transition-colors"
        >
          <BookOpen className="h-3.5 w-3.5" />
          <span>Explore Syllabus</span>
        </Link>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Clock className="h-3.5 w-3.5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-normal text-foreground leading-none">
              Recent Study History
            </h3>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              Jump back into where you left off
            </p>
          </div>
        </div>

        {showClearAll && count > 0 && (
          <button
            type="button"
            onClick={clear}
            className="text-[11px] font-mono text-muted-foreground hover:text-destructive flex items-center gap-1 transition-colors cursor-pointer"
            title="Clear all recent history"
          >
            <Trash2 className="h-3 w-3" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Grid of History Cards */}
      <div
        className={`grid gap-3.5 ${
          compact
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {displayItems.map((item) => {
          return (
            <div
              key={item.id || item.courseSlug}
              className="group relative p-4 rounded-2xl border border-hairline bg-card hover:border-primary/40 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                {/* Top Metas */}
                <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1.5">
                  <span className="px-2 py-0.5 rounded-md bg-secondary text-foreground/80 border border-hairline">
                    {item.category || "Course"}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground/60" />
                    <span>{formatTimeAgo(item.lastAccessedAt)}</span>
                  </span>
                </div>

                {/* Course & Lesson Title */}
                <h4 className="font-serif text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                  {item.courseTitle}
                </h4>
                {item.lessonTitle && (
                  <p className="text-[11px] text-muted-foreground line-clamp-1 mt-1 font-mono flex items-center gap-1">
                    <span className="text-primary">•</span>
                    <span>{item.lessonTitle}</span>
                  </p>
                )}

                {/* Progress Bar if available */}
                {typeof item.progressPercent === "number" && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span className="text-primary font-semibold">{item.progressPercent}%</span>
                    </div>
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden border border-hairline">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${item.progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-3.5 pt-2.5 border-t border-hairline flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => remove(item.courseSlug)}
                  className="text-muted-foreground/50 hover:text-destructive p-1 rounded transition-colors cursor-pointer"
                  title="Remove from history"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>

                <Link
                  href={item.playerUrl}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-xs font-medium shadow-xs transition-all"
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  <span>Resume</span>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
