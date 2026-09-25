"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Code2, FolderGit2, Trophy, Briefcase } from "lucide-react"
import { CategoryIllustration } from "@/components/ui/category-illustrations"

interface CategoryPillar {
  title: string
  items: string
  desc: string
  href: string
  category: "learning" | "practice" | "projects" | "competitions" | "career"
  icon: React.ComponentType<{ className?: string }>
  iconColor?: string
  bgClass?: string
}

const PILLARS: CategoryPillar[] = [
  {
    title: "LEARN",
    items: "Courses · Learning Paths",
    desc: "47+ systems & full-stack curriculums with in-browser REPLs.",
    href: "/courses",
    category: "learning",
    icon: BookOpen,
    iconColor: "text-blue-500 dark:text-blue-400",
    bgClass: "bg-blue-500/10 text-blue-500 dark:text-blue-400 border-blue-500/20",
  },
  {
    title: "PRACTICE",
    items: "DSA · Challenges",
    desc: "474 algorithm problems, Striver A2Z sheet & interactive test suites.",
    href: "/practice",
    category: "practice",
    icon: Code2,
    iconColor: "text-orange-500 dark:text-orange-400",
    bgClass: "bg-orange-500/10 text-orange-500 dark:text-orange-400 border-orange-500/25",
  },
  {
    title: "BUILD",
    items: "Projects · Simulators",
    desc: "12+ end-to-end guided capstones to turn code into proof.",
    href: "/projects",
    category: "projects",
    icon: FolderGit2,
    iconColor: "text-purple-500 dark:text-purple-400",
    bgClass: "bg-purple-500/10 text-purple-500 dark:text-purple-400 border-purple-500/20",
  },
  {
    title: "COMPETE",
    items: "Hackathons · Competitions",
    desc: "Algorithm sprints, sponsored hackathons & cash prize pools.",
    href: "/competitions",
    category: "competitions",
    icon: Trophy,
    iconColor: "text-amber-500 dark:text-amber-400",
    bgClass: "bg-amber-500/10 text-amber-500 dark:text-amber-400 border-amber-500/20",
  },
  {
    title: "CAREER",
    items: "Jobs · Internships",
    desc: "Direct applications, vetted internships & verified merit hiring.",
    href: "/career",
    category: "career",
    icon: Briefcase,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    bgClass: "bg-emerald-500/10 text-emerald-500 dark:text-emerald-400 border-emerald-500/20",
  },
]

export function PrimaryDiscovery() {
  return (
    <section aria-labelledby="primary-discovery-heading" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <h2
            id="primary-discovery-heading"
            className="font-serif text-2xl sm:text-[28px] font-normal tracking-tight text-foreground"
          >
            Everything you need to grow.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Five core pillars engineered to take you from foundational knowledge to verified hire.
          </p>
        </div>
        <span className="text-xs font-mono text-muted-foreground">5 Core Pillars</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {PILLARS.map((pillar) => {
          const Icon = pillar.icon
          return (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group flex flex-col justify-between p-4 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all shadow-xs"
            >
              <div className="space-y-3">
                {/* Top Row: Small Illustration + Pillar Icon */}
                <div className="flex items-center justify-between gap-2">
                  <div className="w-12 h-12 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <CategoryIllustration category={pillar.category} size={48} />
                  </div>
                  <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 shadow-2xs ${pillar.bgClass || "bg-primary/10 text-primary border-primary/20"}`}>
                    <Icon className={`w-3.5 h-3.5 ${pillar.iconColor || "text-primary"}`} />
                  </div>
                </div>

                {/* Title & Items */}
                <div>
                  <h3 className="font-bold text-sm font-sans text-foreground group-hover:text-primary transition-colors tracking-tight">
                    {pillar.title}
                  </h3>
                  <div className="text-[11px] font-mono text-primary font-semibold mt-0.5">
                    {pillar.items}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-snug line-clamp-2">
                    {pillar.desc}
                  </p>
                </div>
              </div>

              {/* Action Link */}
              <div className="mt-3.5 pt-2.5 border-t border-border/70 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Explore {pillar.title.charAt(0) + pillar.title.slice(1).toLowerCase()}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
