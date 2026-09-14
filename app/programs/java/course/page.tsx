"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  MonitorPlay,
  Zap,
  Trophy,
  ArrowLeft,
  Terminal,
  Menu,
  X,
  BookOpen,
  Coffee,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  Search,
  HelpCircle,
  Code2,
  Award,
  Layers,
  FileText,
  ExternalLink,
  RotateCcw
} from "lucide-react"

import {
  javaCourseCurriculum,
  Lesson,
  Chapter,
  Part,
  CourseLevel,
  JAVA_BOOKS_AND_PDFS
} from "@/lib/java-course-data"
import LessonDialog from "@/components/dsa/LessonDialog"
import { VisualLessonFlowchart } from "@/components/curriculum/visual-flowchart"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export default function JavaCourseDocsLayout() {
  const defaultLesson = javaCourseCurriculum[0].chapters[0].concepts[0]
  const [activeLesson, setActiveLesson] = useState<Lesson>(defaultLesson)
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({
    [javaCourseCurriculum[0].chapters[0].id]: true,
  })
  const [levelFilter, setLevelFilter] = useState<CourseLevel | "All">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState(false)
  const [simulationLesson, setSimulationLesson] = useState<{ lesson: Lesson; color: string } | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Quiz state for active lesson
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null)
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)

  // Completed IDs tracked in localStorage
  const storageKey = "asci_java_completed_lessons"
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    setMounted(true)
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
  }, [])

  // Reset quiz when lesson changes
  useEffect(() => {
    setSelectedQuizOption(null)
    setIsQuizSubmitted(false)
    const mainEl = document.getElementById("java-docs-main-scroll")
    if (mainEl) mainEl.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeLesson.id])

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => ({ ...prev, [chapterId]: !prev[chapterId] }))
  }

  const toggleCompleted = (lessonId: string) => {
    setCompletedIds((prev) => {
      const next = new Set(prev)
      if (next.has(lessonId)) {
        next.delete(lessonId)
      } else {
        next.add(lessonId)
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify(Array.from(next)))
      } catch {
        // ignore
      }
      return next
    })
  }

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Filter parts by Level and Search
  const filteredParts = useMemo(() => {
    return javaCourseCurriculum
      .filter((part) => levelFilter === "All" || part.level === levelFilter)
      .map((part) => {
        const matchingChapters = part.chapters
          .map((chapter) => {
            const allLessons = [...chapter.concepts, ...(chapter.missions || []), ...(chapter.problems || [])]
            const q = searchQuery.toLowerCase().trim()
            if (!q) return chapter

            const matchedLessons = allLessons.filter(
              (l) => l.title.toLowerCase().includes(q) || chapter.title.toLowerCase().includes(q)
            )
            return {
              ...chapter,
              concepts: chapter.concepts.filter((l) => l.title.toLowerCase().includes(q) || chapter.title.toLowerCase().includes(q)),
              missions: (chapter.missions || []).filter((l) => l.title.toLowerCase().includes(q) || chapter.title.toLowerCase().includes(q)),
              problems: (chapter.problems || []).filter((l) => l.title.toLowerCase().includes(q) || chapter.title.toLowerCase().includes(q)),
            }
          })
          .filter(
            (ch) =>
              ch.concepts.length > 0 ||
              (ch.missions && ch.missions.length > 0) ||
              (ch.problems && ch.problems.length > 0)
          )

        return {
          ...part,
          chapters: matchingChapters,
        }
      })
      .filter((part) => part.chapters.length > 0)
  }, [levelFilter, searchQuery])

  // Flatten all available lessons in sequence for Prev/Next navigation
  const allFlattenedLessons = useMemo(() => {
    const list: { lesson: Lesson; chapter: Chapter; part: Part }[] = []
    javaCourseCurriculum.forEach((part) => {
      part.chapters.forEach((chapter) => {
        chapter.concepts.forEach((lesson) => {
          list.push({ lesson, chapter, part })
        })
        ;(chapter.missions || []).forEach((lesson) => {
          list.push({ lesson, chapter, part })
        })
        ;(chapter.problems || []).forEach((lesson) => {
          list.push({ lesson, chapter, part })
        })
      })
    })
    return list
  }, [])

  const currentIdx = allFlattenedLessons.findIndex((item) => item.lesson.id === activeLesson.id)
  const prevItem = currentIdx > 0 ? allFlattenedLessons[currentIdx - 1] : null
  const nextItem = currentIdx < allFlattenedLessons.length - 1 ? allFlattenedLessons[currentIdx + 1] : null

  let currentPartTitle = ""
  let currentChapterTitle = ""
  if (currentIdx !== -1) {
    currentPartTitle = allFlattenedLessons[currentIdx].part.title
    currentChapterTitle = allFlattenedLessons[currentIdx].chapter.title
  }

  const isCurrentCompleted = completedIds.has(activeLesson.id)
  const totalCompleted = completedIds.size
  const totalLessons = allFlattenedLessons.length
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* ─── MOBILE HEADER ─── */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-16 border-b border-border bg-card/95 backdrop-blur-xl z-50 flex items-center justify-between px-4">
        <Link
          href="/programs/java"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span className="font-serif text-sm font-semibold tracking-tight text-foreground truncate max-w-[200px]">
            Java Track
          </span>
        </Link>
        <button
          className="text-foreground p-2 rounded-lg hover:bg-secondary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ─── LEFT SIDEBAR NAVIGATION (Minimal & Focused) ─── */}
      <aside
        className={cn(
          "w-72 shrink-0 border-r border-border/80 dark:border-white/10 bg-card/70 dark:bg-[#141413]/95 backdrop-blur-2xl flex flex-col z-40 transition-transform duration-300 absolute lg:relative h-full",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand Header */}
        <div className="hidden lg:flex h-14 border-b border-border/70 dark:border-white/10 items-center justify-between px-4 shrink-0">
          <Link
            href="/programs/java"
            className="group flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Java Overview</span>
          </Link>
          <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono font-medium text-primary">
            Java 21
          </span>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-border/60 dark:border-white/10 mt-16 lg:mt-0">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search lessons..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border/70 dark:border-white/10 bg-secondary/50 pl-8 pr-7 py-1.5 text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary/50 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 cursor-pointer"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Level Filters (Minimal Pills) */}
        <div className="flex items-center gap-1 px-3 pt-2.5 pb-1 shrink-0">
          {(["All", "Beginner", "Intermediate", "Hard"] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={cn(
                "px-2 py-0.5 rounded-full text-[10px] font-mono transition-all cursor-pointer",
                levelFilter === lvl
                  ? "bg-primary text-primary-foreground font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
              )}
            >
              {lvl === "Intermediate" ? "Inter" : lvl}
            </button>
          ))}
        </div>

        {/* Scrollable Curriculum Tree */}
        <nav className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-3">
          {filteredParts.map((part) => (
            <div key={part.id} className="space-y-1">
              <div className="flex items-center justify-between px-2 py-0.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground/70 font-semibold">
                  {part.level} Tier
                </span>
                <span className="text-[10px] font-mono text-muted-foreground/60">
                  {part.chapters.length} Ch
                </span>
              </div>

              <div className="space-y-0.5">
                {part.chapters.map((chapter) => {
                  const isOpen = openChapters[chapter.id]
                  const allChapterLessons = [
                    ...chapter.concepts,
                    ...(chapter.missions || []),
                    ...(chapter.problems || []),
                  ]
                  const completedInChapter = allChapterLessons.filter((l) => completedIds.has(l.id)).length

                  return (
                    <div key={chapter.id} className="space-y-0.5">
                      <button
                        onClick={() => toggleChapter(chapter.id)}
                        className="w-full flex items-center justify-between gap-1.5 px-2 py-1.5 text-xs font-medium hover:text-primary transition-colors text-foreground/90 rounded-lg hover:bg-secondary/50 text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                          <ChevronRight
                            size={12}
                            className={cn(
                              "transition-transform text-muted-foreground shrink-0",
                              isOpen && "rotate-90 text-primary"
                            )}
                          />
                          <span className="truncate text-xs">{chapter.title}</span>
                        </div>
                        <span className="shrink-0 text-[10px] font-mono text-muted-foreground/60">
                          {completedInChapter}/{allChapterLessons.length}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.12 }}
                            className="overflow-hidden border-l border-border/60 dark:border-white/10 ml-3.5 pl-2 space-y-0.5"
                          >
                            {chapter.concepts.map((lesson) => {
                              const isActive = activeLesson.id === lesson.id
                              const isDone = completedIds.has(lesson.id)

                              return (
                                <div
                                  key={lesson.id}
                                  className={cn(
                                    "group/item w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors cursor-pointer",
                                    isActive
                                      ? "bg-primary/10 text-primary font-medium"
                                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                  )}
                                  onClick={() => {
                                    setActiveLesson(lesson)
                                    setIsMobileMenuOpen(false)
                                  }}
                                >
                                  <div className="flex items-center gap-2 min-w-0 flex-1">
                                    {isDone ? (
                                      <CheckCircle2 size={12} className="text-primary shrink-0" />
                                    ) : isActive ? (
                                      <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                    ) : (
                                      <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30 shrink-0" />
                                    )}
                                    <span
                                      className={cn(
                                        "truncate leading-snug",
                                        isDone && !isActive && "opacity-60"
                                      )}
                                      title={lesson.title}
                                    >
                                      {lesson.title}
                                    </span>
                                  </div>

                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      toggleCompleted(lesson.id)
                                    }}
                                    className="text-muted-foreground/40 hover:text-primary transition-colors p-0.5 shrink-0 cursor-pointer"
                                    aria-label="Toggle Complete"
                                  >
                                    {isDone ? (
                                      <Check size={11} className="text-primary" />
                                    ) : (
                                      <Circle size={11} className="opacity-40 hover:opacity-100" />
                                    )}
                                  </button>
                                </div>
                              )
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Minimal Progress Footer */}
        <div className="p-3.5 border-t border-border/70 dark:border-white/10 shrink-0 bg-secondary/15 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {totalCompleted} / {totalLessons} ({progressPercent}%)
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/70">
            <span>Java SE 21</span>
            {totalCompleted > 0 && (
              <button
                onClick={() => {
                  if (confirm("Reset Java track progress?")) {
                    setCompletedIds(new Set())
                    localStorage.removeItem(storageKey)
                  }
                }}
                className="hover:text-destructive transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw size={10} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ─── MAIN CONTENT AREA ─── */}
      <main
        id="java-docs-main-scroll"
        className="flex-1 relative z-10 flex flex-col bg-background overflow-y-auto custom-scrollbar pt-16 lg:pt-0"
      >
        {/* Sticky Desktop Top Bar */}
        <header className="hidden lg:flex h-14 border-b border-border/70 dark:border-white/10 items-center justify-between px-6 sticky top-0 bg-background/95 backdrop-blur-md z-30">
          <div className="flex items-center gap-2 text-xs text-muted-foreground truncate max-w-lg">
            <Link href="/programs/java" className="hover:text-foreground transition-colors">
              Java Track
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="truncate font-medium text-foreground">{currentChapterTitle}</span>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-primary shrink-0 font-medium">{activeLesson.title}</span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Mark Completed Toggle */}
            <button
              onClick={() => toggleCompleted(activeLesson.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                isCurrentCompleted
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-secondary text-muted-foreground border border-border hover:text-foreground"
              )}
            >
              {isCurrentCompleted ? (
                <>
                  <CheckCircle2 size={13} className="text-primary" />
                  <span>Completed</span>
                </>
              ) : (
                <>
                  <Circle size={13} />
                  <span>Mark Complete</span>
                </>
              )}
            </button>

            {/* Streak & XP Badges */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono font-semibold text-primary">
              <Trophy size={13} />
              <span>+{activeLesson.xpReward || 50} XP</span>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-mono">
              <Zap size={13} className="text-amber-500" />
              <span className="font-semibold text-foreground">4 Day Streak</span>
            </div>

            <ThemeToggle />
          </div>
        </header>

        {/* Lesson Reading Chamber */}
        <div className="max-w-4xl mx-auto w-full p-6 lg:p-12 pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLesson.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.99 }}
              transition={{ duration: 0.18 }}
              className="space-y-8"
            >
              {/* Header Info */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shrink-0 border border-primary/20 shadow-xs">
                    {activeLesson.icon ? <activeLesson.icon size={24} /> : <Coffee size={24} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-1">
                      <span>{activeLesson.level || "Beginner"} Tier</span>
                      <span>•</span>
                      <span>{activeLesson.type}</span>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-tight">
                      {activeLesson.title}
                    </h1>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="px-3 py-1 text-xs font-mono uppercase font-semibold rounded-full border border-border bg-card text-muted-foreground">
                    {activeLesson.level || "Beginner"}
                  </span>
                  <span className="px-3 py-1 text-xs font-mono font-semibold rounded-full border border-primary/30 bg-primary/10 text-primary">
                    +{activeLesson.xpReward || 50} XP
                  </span>
                  <span className="px-3 py-1 text-xs font-mono text-muted-foreground rounded-full border border-border bg-card">
                    Java 21 LTS
                  </span>
                </div>
              </div>

              {/* TL;DR Executive Quote Card */}
              {activeLesson.tldr && (
                <div className="p-5 border border-border bg-card rounded-2xl relative overflow-hidden shadow-xs">
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                  <p className="text-base sm:text-lg font-serif italic text-foreground/90 leading-relaxed pl-2">
                    &ldquo;{activeLesson.tldr}&rdquo;
                  </p>
                </div>
              )}

              {/* Architectural / Runtime Visual Flowchart */}
              {activeLesson.flowchart && (
                <VisualLessonFlowchart
                  lessonId={activeLesson.id}
                  title={activeLesson.title}
                  flowchartText={activeLesson.flowchart}
                />
              )}

              {/* Step-by-Step Program Execution Walkthrough */}
              {activeLesson.programWorking && activeLesson.programWorking.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                    <Layers size={14} className="text-primary" />
                    <span>Step-by-Step Program Execution &amp; Memory State Tracing</span>
                  </h3>
                  <div className="space-y-2.5">
                    {activeLesson.programWorking.map((step) => (
                      <div
                        key={step.step}
                        className="rounded-2xl border border-border bg-secondary/30 p-4 space-y-2 text-xs sm:text-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2 font-mono font-bold text-primary">
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs">
                              {step.step}
                            </span>
                            <span>{step.line}</span>
                          </span>
                        </div>
                        <div className="rounded-lg bg-card/80 border border-border/70 p-2.5 font-mono text-xs text-foreground/90">
                          <span className="text-muted-foreground text-[10px] block uppercase font-bold">
                            Memory State:
                          </span>
                          {step.memoryState}
                        </div>
                        <p className="text-muted-foreground text-xs leading-relaxed">
                          {step.explanation}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Theoretical Explanation */}
              <div className="text-base text-foreground/85 leading-relaxed space-y-5">
                {activeLesson.description.split("\n\n").map((para, i) => {
                  if (para.includes("\n•") || para.includes("\n- ") || para.includes("\n1. ")) {
                    const lines = para.split("\n")
                    const intro = lines[0] && !lines[0].match(/^[•\-1-9]/) ? lines[0] : null
                    const listItems = intro ? lines.slice(1) : lines

                    return (
                      <div key={i} className="space-y-3">
                        {intro && <p className="font-medium text-foreground">{intro}</p>}
                        <ul className="space-y-2 list-disc pl-5 text-muted-foreground text-sm sm:text-base">
                          {listItems.map((item, j) => {
                            const cleanItem = item.replace(/^[•\-\d\.]+\s*/, "")
                            const formattedItem = cleanItem.replace(
                              /\*\*(.*?)\*\*/g,
                              '<strong class="text-foreground">$1</strong>'
                            )
                            return <li key={j} dangerouslySetInnerHTML={{ __html: formattedItem }} />
                          })}
                        </ul>
                      </div>
                    )
                  }
                  const formattedPara = para.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="text-foreground">$1</strong>'
                  )
                  return <p key={i} dangerouslySetInnerHTML={{ __html: formattedPara }} />
                })}
              </div>

              {/* Reference Implementation Code */}
              {activeLesson.code && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Code2 size={14} className="text-primary" />
                      <span>Java 21 LTS Reference Code</span>
                    </h3>
                    <button
                      onClick={() => handleCopyCode(activeLesson.code!)}
                      className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check size={13} className="text-[#d4b872]" />
                          <span className="text-[#d4b872]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="rounded-2xl border border-border bg-[#181715] overflow-hidden text-slate-100 font-mono text-xs shadow-md">
                    <div className="px-4 py-2.5 border-b border-border bg-[#141413] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-rose-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
                        <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                          {activeLesson.id}.java
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">OpenJDK 21</span>
                    </div>
                    <pre className="p-5 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar text-slate-200">
                      <code>{activeLesson.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* Systems Engineering Interview Questions */}
              {activeLesson.interviewQuestions && activeLesson.interviewQuestions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                    <Award size={14} className="text-primary" />
                    <span>FAANG &amp; Systems Engineering Interview Questions</span>
                  </h3>
                  <div className="space-y-3">
                    {activeLesson.interviewQuestions.map((qa, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-2xs"
                      >
                        <div className="text-sm font-semibold text-foreground flex items-start gap-2">
                          <span className="text-primary font-mono font-bold">Q:</span>
                          <span>{qa.question}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6 border-l-2 border-primary/40">
                          {qa.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Concept Check / Quiz */}
              {activeLesson.quiz && (
                <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                      <HelpCircle size={15} />
                      <span>Knowledge Check &amp; Concept Evaluation</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Instant Feedback
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-medium text-foreground leading-snug">
                    {activeLesson.quiz.question}
                  </p>

                  <div className="space-y-2.5">
                    {activeLesson.quiz.options.map((opt, oIdx) => {
                      const isSelected = selectedQuizOption === oIdx
                      const isCorrect = oIdx === activeLesson.quiz!.correctIndex

                      let optionClass =
                        "border-border bg-secondary/40 hover:bg-secondary text-foreground"
                      if (isQuizSubmitted) {
                        if (isCorrect) {
                          optionClass =
                            "border-primary/50 bg-primary/10 text-primary font-semibold"
                        } else if (isSelected && !isCorrect) {
                          optionClass =
                            "border-destructive/50 bg-destructive/10 text-destructive font-semibold"
                        } else {
                          optionClass = "border-border/40 opacity-40"
                        }
                      } else if (isSelected) {
                        optionClass = "border-primary bg-primary/10 text-primary font-semibold"
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={isQuizSubmitted}
                          onClick={() => setSelectedQuizOption(oIdx)}
                          className={cn(
                            "w-full flex items-center justify-between gap-3 rounded-2xl border p-3.5 text-left text-xs sm:text-sm transition-all cursor-pointer",
                            optionClass
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-mono font-bold">
                              {String.fromCharCode(65 + oIdx)}
                            </span>
                            <span>{opt}</span>
                          </div>
                          {isQuizSubmitted && isCorrect && (
                            <CheckCircle2 size={16} className="text-primary shrink-0" />
                          )}
                          {isQuizSubmitted && isSelected && !isCorrect && (
                            <X size={16} className="text-destructive shrink-0" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {!isQuizSubmitted ? (
                    <button
                      disabled={selectedQuizOption === null}
                      onClick={() => setIsQuizSubmitted(true)}
                      className="w-full rounded-2xl bg-primary px-5 py-3 text-xs sm:text-sm font-semibold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-active transition-all cursor-pointer shadow-xs"
                    >
                      Verify Answer
                    </button>
                  ) : (
                    <div className="rounded-2xl border border-primary/20 bg-secondary/50 p-4 text-xs sm:text-sm space-y-1.5">
                      <span className="font-semibold text-primary">Technical Explanation:</span>
                      <p className="text-muted-foreground leading-relaxed">
                        {activeLesson.quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Reference Books & PDFs for this Topic */}
              {activeLesson.resources && activeLesson.resources.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                    <FileText size={14} className="text-primary" />
                    <span>Curated Book Chapters &amp; Official Specifications</span>
                  </h3>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {activeLesson.resources.map((res, rIdx) => (
                      <div
                        key={rIdx}
                        className="rounded-2xl border border-border bg-card p-4 space-y-1 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{res.title}</span>
                          <span className="text-[10px] font-mono text-primary uppercase">
                            {res.type}
                          </span>
                        </div>
                        {res.note && <p className="text-muted-foreground">{res.note}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Navigation & Sandbox CTA */}
              <div className="pt-10 mt-12 border-t border-border space-y-6">
                {/* Sandbox CTA */}
                <div className="rounded-3xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                      Interactive JVM Sandbox
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground mt-1">
                      Visual Execution Environment
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-lg">
                      Step through real-time stack frames, heap allocations, and register state transitions inside the interactive visualizer.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setSimulationLesson({
                        lesson: activeLesson,
                        color: activeLesson.color || "#D4B872",
                      })
                    }
                    className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-6 py-3 text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
                  >
                    <MonitorPlay size={16} />
                    <span>Launch Sandbox</span>
                  </button>
                </div>

                {/* Previous & Next Buttons */}
                <div className="flex items-center justify-between gap-4">
                  {prevItem ? (
                    <button
                      onClick={() => setActiveLesson(prevItem.lesson)}
                      className="flex items-center gap-2 rounded-2xl border border-border bg-card hover:bg-secondary px-5 py-3 text-xs sm:text-sm font-medium text-foreground transition-all cursor-pointer"
                    >
                      <ArrowLeft size={15} />
                      <span className="hidden sm:inline">Previous:</span>
                      <span className="truncate max-w-[180px] text-muted-foreground">
                        {prevItem.lesson.title}
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextItem && (
                    <button
                      onClick={() => {
                        toggleCompleted(activeLesson.id)
                        setActiveLesson(nextItem.lesson)
                      }}
                      className="flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary-active text-primary-foreground px-6 py-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs ml-auto"
                    >
                      <span className="hidden sm:inline">Next:</span>
                      <span className="truncate max-w-[180px]">{nextItem.lesson.title}</span>
                      <ChevronRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <AnimatePresence>
        {simulationLesson && (
          <LessonDialog
            lesson={simulationLesson.lesson}
            partColor={simulationLesson.color}
            onClose={() => setSimulationLesson(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
