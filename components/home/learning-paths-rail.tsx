"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react"
import { CategoryIllustration } from "@/components/ui/category-illustrations"

const PATHS = [
  {
    title: "AI Engineer",
    slug: "ai-engineer",
    courses: "7 courses",
    projects: "6 projects",
    illustration: "learning",
    href: "/paths/ai-engineer",
  },
  {
    title: "Full Stack Developer",
    slug: "full-stack-developer",
    courses: "8 courses",
    projects: "7 projects",
    illustration: "projects",
    href: "/paths/full-stack-web-developer",
  },
  {
    title: "Backend Engineer",
    slug: "backend-engineer",
    courses: "6 courses",
    projects: "5 projects",
    illustration: "practice",
    href: "/paths/backend-engineer",
  },
  {
    title: "Data Scientist",
    slug: "data-scientist",
    courses: "6 courses",
    projects: "5 projects",
    illustration: "learning",
    href: "/paths",
  },
  {
    title: "Frontend Engineer",
    slug: "frontend-engineer",
    courses: "5 courses",
    projects: "4 projects",
    illustration: "projects",
    href: "/paths",
  },
]

export function LearningPathsRail() {
  return (
    <section aria-labelledby="learning-paths-heading" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <h2
            id="learning-paths-heading"
            className="font-serif text-2xl sm:text-[28px] font-normal tracking-tight text-foreground"
          >
            Choose your path.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Structured career tracks designed to build competence from foundational principles to production capstones.
          </p>
        </div>
        <Link
          href="/paths"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>All Career Tracks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {PATHS.map((path) => (
          <Link
            key={path.title}
            href={path.href}
            className="group flex flex-col justify-between p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all shadow-xs"
          >
            <div className="space-y-3">
              {/* Small Illustration */}
              <div className="w-12 h-12 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <CategoryIllustration category={path.illustration as any} size={44} />
              </div>

              {/* Title & Metrics */}
              <div>
                <h3 className="font-bold text-sm font-sans text-foreground group-hover:text-primary transition-colors">
                  {path.title}
                </h3>
                <div className="mt-1 text-[11px] font-mono text-muted-foreground space-y-0.5">
                  <div>{path.courses}</div>
                  <div>{path.projects}</div>
                </div>
              </div>
            </div>

            {/* Action Link */}
            <div className="mt-3.5 pt-2.5 border-t border-border/70 flex items-center justify-between text-xs font-semibold text-primary">
              <span>Explore</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
