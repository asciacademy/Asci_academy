"use client"

import { useState, useEffect, useMemo } from "react"
import {
  CheckCircle2,
  Circle,
  Search,
  ChevronDown,
  ChevronRight,
  BookOpen,
  Terminal,
  RotateCcw,
  ExternalLink,
  HelpCircle,
  Layers,
  ArrowRight,
} from "lucide-react"
import { AsciSubject, AsciModule, AsciLesson } from "@/lib/curriculum/plus-curriculum-data"
import { OS_MODULES_THEORY } from "@/lib/curriculum/os-theory-data"
import { TheoryReaderDialog } from "@/components/curriculum/theory-reader-dialog"
import { cn } from "@/lib/utils"

interface Props {
  subject: AsciSubject
}

export function SubjectCurriculumViewer({ subject }: Props) {
  const storageKey = `asci_plus_completed_${subject.slug}`
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "theory" | "quiz" | "completed">("all")
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    [subject.modules[0]?.id || ""]: true,
  })
  const [isClient, setIsClient] = useState(false)

  // Reader Modal State
  const [activeLesson, setActiveLesson] = useState<AsciLesson | null>(null)
  const [activeModule, setActiveModule] = useState<AsciModule | null>(null)
  const [readerOpen, setReaderOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
    try {
      const saved = localStorage.getItem(storageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setCompletedIds(new Set(parsed))
        }
      }
    } catch {
      // ignore
    }
  }, [storageKey])

  const toggleCompleted = (id: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)))
      } catch {
        // ignore
      }
      return next
    })
  }

  const resetProgress = () => {
    if (window.confirm(`Reset your progress for ${subject.title}?`)) {
      setCompletedIds(new Set())
      try {
        localStorage.removeItem(storageKey)
      } catch {
        // ignore
      }
    }
  }

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }))
  }

  const expandAll = () => {
    const all: Record<string, boolean> = {}
    subject.modules.forEach((m) => {
      all[m.id] = true
    })
    setExpandedModules(all)
  }

  const collapseAll = () => {
    setExpandedModules({})
  }

  const openLessonReader = (lesson: AsciLesson, module: AsciModule) => {
    setActiveLesson(lesson)
    setActiveModule(module)
    setReaderOpen(true)
  }

  // Filter modules and lessons by search query and type filter
  const filteredModules = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()

    return subject.modules
      .map((mod) => {
        const matchesModTitle = mod.title.toLowerCase().includes(q)

        const matchingLessons = mod.lessons.filter((l) => {
          // Search query check
          const matchesSearch = !q || l.title.toLowerCase().includes(q) || matchesModTitle

          // Filter type check
          let matchesFilter = true
          if (filterType === "theory") {
            matchesFilter = l.type.toLowerCase().includes("theory")
          } else if (filterType === "quiz") {
            matchesFilter = l.type.toLowerCase().includes("mcq") || l.type.toLowerCase().includes("quiz")
          } else if (filterType === "completed") {
            matchesFilter = completedIds.has(l.id)
          }

          return matchesSearch && matchesFilter
        })

        return {
          ...mod,
          lessons: matchingLessons,
        }
      })
      .filter((mod) => mod.lessons.length > 0)
  }, [subject.modules, searchQuery, filterType, completedIds])

  const totalCompleted = completedIds.size
  const totalLessons = subject.totalLessons
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  return (
    <div className="w-full space-y-8">
      {/* Subject Progress Card */}
      <div className="rounded-3xl border border-hairline bg-card/75 p-6 sm:p-8 backdrop-blur-2xl shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-0.5 text-[11px] font-mono text-primary font-semibold mb-2">
              <BookOpen className="h-3 w-3" />
              <span>Syllabus Mastery & Progress</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
              {subject.title}
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">
              {totalCompleted} of {totalLessons} topics completed ({progressPercent}%) • Full theory available for all 11 modules
            </p>
          </div>

          <div className="flex items-center gap-3">
            {totalCompleted > 0 && (
              <button
                onClick={resetProgress}
                className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-card hover:bg-secondary px-3.5 py-2 text-xs font-medium text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
            )}
            <button
              onClick={() => {
                if (subject.modules[0]?.lessons[0]) {
                  openLessonReader(subject.modules[0].lessons[0], subject.modules[0])
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-active px-4 py-2 text-xs font-semibold text-primary-foreground transition-all cursor-pointer shadow-xs"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Start Reading Theory</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 space-y-1.5">
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary/80">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 rounded-2xl border border-hairline bg-card/60 p-4 shadow-xs">
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={`Search all 144 ${subject.title} topics, modules, algorithms...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-hairline bg-background/90 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {(
            [
              { id: "all", label: "All Topics" },
              { id: "theory", label: "Theory Only" },
              { id: "quiz", label: "Quizzes" },
              { id: "completed", label: "Completed" },
            ] as const
          ).map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                filterType === f.id
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "bg-secondary/60 text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Accordion Expand/Collapse */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={expandAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl border border-hairline bg-card hover:bg-secondary cursor-pointer"
          >
            Expand All
          </button>
          <button
            onClick={collapseAll}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-xl border border-hairline bg-card hover:bg-secondary cursor-pointer"
          >
            Collapse All
          </button>
        </div>
      </div>

      {/* Modules List */}
      <div className="space-y-5">
        {filteredModules.length === 0 ? (
          <div className="rounded-3xl border border-hairline bg-card/40 p-12 text-center">
            <Search className="mx-auto h-8 w-8 text-muted-foreground mb-3 opacity-50" />
            <h3 className="text-base font-medium text-foreground">No matching lessons found</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try adjusting your search terms or filter to explore the full curriculum.
            </p>
          </div>
        ) : (
          filteredModules.map((mod, modIdx) => {
            const isExpanded = expandedModules[mod.id]
            const modSolved = mod.lessons.filter((l) => completedIds.has(l.id)).length
            const modPercent =
              mod.lessons.length > 0 ? Math.round((modSolved / mod.lessons.length) * 100) : 0
            const masterTheory = OS_MODULES_THEORY[mod.id]

            return (
              <div
                key={mod.id}
                className="rounded-3xl border border-hairline bg-card overflow-hidden shadow-xs transition-all hover:border-hairline/80"
              >
                {/* Module Header Bar */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left transition-colors hover:bg-secondary/30 cursor-pointer"
                >
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0 pr-4">
                    <span className="flex h-8 sm:h-9 px-2.5 items-center justify-center rounded-xl bg-primary/10 border border-primary/25 text-primary font-mono text-xs font-bold shrink-0">
                      Mod {String(modIdx + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-serif text-base sm:text-lg font-medium text-foreground truncate">
                          {mod.title}
                        </h3>
                        {masterTheory && (
                          <span className="hidden md:inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.2 text-[9px] font-mono text-primary font-semibold border border-primary/20">
                            Theory Ready
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                        <span>{mod.lessons.length} Topics</span>
                        <span>•</span>
                        <span>
                          {modSolved}/{mod.lessons.length} Completed ({modPercent}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0">
                    <div className="hidden sm:flex items-center gap-2">
                      <div className="w-24 h-2 rounded-full bg-secondary overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all duration-300"
                          style={{ width: `${modPercent}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono text-muted-foreground w-8 text-right">
                        {modPercent}%
                      </span>
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline bg-background text-muted-foreground">
                      {isExpanded ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </div>
                  </div>
                </button>

                {/* Module Lessons Accordion Interior */}
                {isExpanded && (
                  <div className="border-t border-hairline bg-background/50 p-4 sm:p-6 space-y-3">
                    {/* Module Architectural Theory Banner */}
                    {masterTheory && (
                      <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-2">
                        <div className="space-y-1.5 max-w-2xl">
                          <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase text-primary">
                            <Layers className="h-3.5 w-3.5" />
                            <span>Module Master Overview</span>
                          </div>
                          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                            {masterTheory.description}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {masterTheory.corePillars.map((pillar, pIdx) => (
                              <span
                                key={pIdx}
                                className="rounded-md border border-border/80 bg-background/80 px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
                              >
                                {pillar}
                              </span>
                            ))}
                          </div>
                        </div>

                        <button
                          onClick={() => {
                            if (mod.lessons.length > 0) {
                              openLessonReader(mod.lessons[0], mod)
                            }
                          }}
                          className="shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-active px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-all cursor-pointer shadow-xs"
                        >
                          <BookOpen className="h-3.5 w-3.5" />
                          <span>Explore Module Theory</span>
                          <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    )}

                    {/* Individual Lesson Cards */}
                    <div className="space-y-2">
                      {mod.lessons.map((lesson) => {
                        const isCompleted = completedIds.has(lesson.id)
                        const isQuiz =
                          lesson.type.toLowerCase().includes("mcq") ||
                          lesson.type.toLowerCase().includes("quiz")

                        return (
                          <div
                            key={lesson.id}
                            className={cn(
                              "group flex items-center justify-between gap-3 p-3.5 rounded-2xl border transition-all duration-150",
                              isCompleted
                                ? "border-primary/20 bg-primary/5 text-foreground"
                                : "border-hairline bg-card hover:bg-secondary/40 text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              {/* Quick Mark Completed Toggle */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleCompleted(lesson.id)
                                }}
                                className="text-muted-foreground hover:text-primary transition-colors cursor-pointer shrink-0"
                                aria-label={isCompleted ? "Mark incomplete" : "Mark completed"}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 className="h-5 w-5 text-primary" />
                                ) : (
                                  <Circle className="h-5 w-5 text-muted-foreground/50 hover:text-primary" />
                                )}
                              </button>

                              {/* Lesson Title (Clickable to open theory) */}
                              <button
                                onClick={() => openLessonReader(lesson, mod)}
                                className="text-left font-medium text-xs sm:text-sm text-foreground hover:text-primary transition-colors truncate cursor-pointer flex-1"
                              >
                                <span className={cn(isCompleted && "text-muted-foreground line-through")}>
                                  {lesson.title}
                                </span>
                              </button>
                            </div>

                            {/* Badges & Direct Action Button */}
                            <div className="flex items-center gap-2 shrink-0">
                              <span
                                className={cn(
                                  "rounded-lg border px-2 py-0.5 text-[10px] font-mono",
                                  isQuiz
                                    ? "border-amber-500/30 bg-amber-500/10 text-amber-500 font-medium"
                                    : "border-hairline bg-secondary text-muted-foreground"
                                )}
                              >
                                {lesson.type}
                              </span>

                              {lesson.hasIDE && (
                                <span className="hidden sm:inline-block rounded-lg border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-mono text-primary font-medium">
                                  IDE
                                </span>
                              )}

                              <button
                                onClick={() => openLessonReader(lesson, mod)}
                                className="inline-flex items-center gap-1 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary hover:text-primary-foreground px-2.5 py-1 text-[11px] font-medium text-primary transition-all cursor-pointer"
                              >
                                {isQuiz ? (
                                  <>
                                    <HelpCircle className="h-3 w-3" />
                                    <span className="hidden sm:inline">Quiz</span>
                                  </>
                                ) : (
                                  <>
                                    <BookOpen className="h-3 w-3" />
                                    <span className="hidden sm:inline">Read</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Comprehensive Full Theory Reader Modal */}
      <TheoryReaderDialog
        isOpen={readerOpen}
        onClose={() => setReaderOpen(false)}
        currentLesson={activeLesson}
        currentModule={activeModule}
        allModules={subject.modules}
        isCompleted={activeLesson ? completedIds.has(activeLesson.id) : false}
        onToggleCompleted={toggleCompleted}
        onSelectLesson={(lesson, module) => {
          setActiveLesson(lesson)
          setActiveModule(module)
        }}
      />
    </div>
  )
}
