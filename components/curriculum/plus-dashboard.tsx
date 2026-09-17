"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BookOpen, Layers, Terminal, ChevronRight,
  Cpu, Network, Database, Code2, Compass, CheckCircle2,
  ArrowRight, ShieldCheck, Flame, Star, Zap
} from "lucide-react"
import { PLUS_SUBJECTS, PLUS_TRACKS, AsciSubject } from "@/lib/curriculum/plus-curriculum-data"
import { cn } from "@/lib/utils"


const TRACK_TABS = [
  "Featured",
  "DSA",
  "System Design",
  "Core Subjects",
  "Data Engineering",
  "Aptitude"
] as const

type TrackTab = typeof TRACK_TABS[number]

export function PlusDashboard() {
  const [activeTab, setActiveTab] = useState<TrackTab>("Featured")

  // Filter subjects based on active tab
  const displayedSubjects = () => {
    switch (activeTab) {
      case "Featured":
        return [
          PLUS_SUBJECTS.find(s => s.slug === "low-level-design")!,
          PLUS_SUBJECTS.find(s => s.slug === "operating-systems")!,
          PLUS_SUBJECTS.find(s => s.slug === "sql-data-engineering")!,
          PLUS_SUBJECTS.find(s => s.slug === "computer-networks")!
        ].filter(Boolean)
      case "DSA":
        // Special display for DSA track referencing A2Z Sheet and courses
        return []
      case "System Design":
        return PLUS_SUBJECTS.filter(s => s.track === "System Design")
      case "Core Subjects":
        return PLUS_SUBJECTS.filter(s => s.track === "Core Subjects")
      case "Data Engineering":
        return PLUS_SUBJECTS.filter(s => s.track === "Data Engineering")
      case "Aptitude":
        return PLUS_SUBJECTS.filter(s => s.track === "Aptitude")
      default:
        return PLUS_SUBJECTS
    }
  }

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case "Cpu":
        return <Cpu className="h-5 w-5 text-primary" />
      case "Network":
        return <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      case "Database":
        return <Database className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
      case "Layers":
        return <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
      case "Code2":
        return <Code2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
      case "Terminal":
        return <Terminal className="h-5 w-5 text-rose-600 dark:text-rose-400" />
      case "Compass":
        return <Compass className="h-5 w-5 text-primary" />
      default:
        return <BookOpen className="h-5 w-5 text-primary" />
    }
  }

  const subjects = displayedSubjects()

  return (
    <div className="w-full space-y-8">
      {/* Track Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto border-b border-hairline pb-3 scrollbar-none">
        {TRACK_TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "rounded-xl px-4 py-2 text-xs sm:text-sm font-medium transition-all whitespace-nowrap cursor-pointer",
              activeTab === tab
                ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                : "border border-hairline bg-card hover:bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Special Content for DSA Tab */}
      {activeTab === "DSA" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border-2 border-primary/40 bg-card p-6 sm:p-8 space-y-4 shadow-md">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/15 px-3 py-0.5 text-xs font-mono font-semibold text-primary">
              Flagship Algorithmic Curriculum
            </div>
            <h3 className="font-serif text-2xl font-medium text-foreground">
              ASCI A2Z DSA Master Track
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              474 problems across 18 comprehensive steps, from language syntax and basic math to advanced Dynamic Programming and Graph algorithms.
            </p>
            <div className="pt-2">
              <Link
                href="/dsa/a2z-sheet"
                className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 text-xs font-medium transition-colors shadow-xs"
              >
                <span>Launch ASCI A2Z Master Track</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

            </div>
          </div>


          <div className="rounded-2xl border border-hairline bg-card p-6 sm:p-8 space-y-4 shadow-xs">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-0.5 text-xs font-mono text-muted-foreground">
              Beginner Interactive Program
            </div>
            <h3 className="font-serif text-2xl font-medium text-foreground">
              DSA for Beginners Course
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Step-by-step interactive documentation with code execution, quizzes, and animated algorithm visualizations.
            </p>
            <div className="pt-2">
              <Link
                href="/programs/dsa/course"
                className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-card hover:bg-secondary text-foreground px-5 py-2.5 text-xs font-medium transition-colors"
              >
                <span>Open Beginner Interactive Course</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Subject Cards */}
      {subjects.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map(subject => (
            <div
              key={subject.slug}
              className="group flex flex-col justify-between rounded-2xl border border-hairline bg-card p-6 shadow-xs transition-all hover:border-primary/50 hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Header with icon & badge */}
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-hairline bg-background shadow-2xs">
                    {getSubjectIcon(subject.icon)}
                  </div>
                  <span className="rounded-md border border-hairline bg-secondary px-2 py-0.5 text-[10px] font-mono text-muted-foreground">
                    {subject.badge}
                  </span>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-primary block">
                    {subject.track}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors mt-0.5">
                    {subject.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {subject.description}
                </p>

                {/* Modules & Lessons Count Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="rounded-md border border-hairline/80 bg-background/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                    {subject.totalModules} Modules
                  </span>
                  <span className="rounded-md border border-hairline/80 bg-background/60 px-2 py-0.5 text-[11px] font-mono text-primary font-medium">
                    {subject.totalLessons} Lessons
                  </span>
                  <span className="rounded-md border border-hairline/80 bg-background/60 px-2 py-0.5 text-[11px] font-mono text-muted-foreground">
                    {subject.level}
                  </span>
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-5 border-t border-hairline/60 mt-6 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-mono">Full Syllabus</span>
                <Link
                  href={`/plus/${subject.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  <span>Explore Curriculum</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
