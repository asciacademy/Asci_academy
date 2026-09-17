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
  pythonCourseCurriculum,
  Lesson,
  Chapter,
  Part,
  CourseLevel,
  PYTHON_BOOKS_AND_PDFS
} from "@/lib/python-course-data"
import LessonDialog from "@/components/dsa/LessonDialog"
import { VisualPythonLessonFlowchart } from "@/components/curriculum/python-visual-flowchart"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export default function PythonCourseDocsLayout() {
  const defaultLesson = pythonCourseCurriculum[0].chapters[0].concepts[0]
  const [activeLesson, setActiveLesson] = useState<Lesson>(defaultLesson)
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({
    [pythonCourseCurriculum[0].chapters[0].id]: true,
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
  const storageKey = "asci_python_completed_lessons"
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
    const mainEl = document.getElementById("python-docs-main-scroll")
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

  // All lessons flat list
  const allLessons = useMemo(() => {
    const list: { lesson: Lesson; chapter: Chapter; part: Part }[] = []
    for (const part of pythonCourseCurriculum) {
      for (const ch of part.chapters) {
        for (const concept of ch.concepts) {
          list.push({ lesson: concept, chapter: ch, part })
        }
      }
    }
    return list
  }, [])

  // Current lesson index & next/prev pointers
  const currentIndex = allLessons.findIndex((item) => item.lesson.id === activeLesson.id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson = currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  // Active chapter
  const currentChapter = useMemo(() => {
    for (const part of pythonCourseCurriculum) {
      for (const ch of part.chapters) {
        if (ch.concepts.some((c) => c.id === activeLesson.id)) {
          return ch
        }
      }
    }
    return pythonCourseCurriculum[0].chapters[0]
  }, [activeLesson.id])

  // Filtered Parts/Chapters
  const filteredParts = useMemo(() => {
    return pythonCourseCurriculum
      .map((part) => {
        if (levelFilter !== "All" && part.level !== levelFilter) {
          return null
        }
        const filteredChapters = part.chapters
          .map((ch) => {
            const matchesSearch = (c: Lesson) =>
              c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              c.description.toLowerCase().includes(searchQuery.toLowerCase())
            const filteredConcepts = searchQuery ? ch.concepts.filter(matchesSearch) : ch.concepts
            if (filteredConcepts.length === 0) return null
            return { ...ch, concepts: filteredConcepts }
          })
          .filter(Boolean) as Chapter[]

        if (filteredChapters.length === 0) return null
        return { ...part, chapters: filteredChapters }
      })
      .filter(Boolean) as Part[]
  }, [levelFilter, searchQuery])

  const copyToClipboard = () => {
    if (!activeLesson.code) return
    navigator.clipboard.writeText(activeLesson.code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const completionPercentage = Math.round((completedIds.size / (allLessons.length || 1)) * 100)

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-background text-foreground font-sans antialiased">
      {/* ─── MOBILE HEADER ─── */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-14 border-b border-border bg-card/95 backdrop-blur-xl z-50 flex items-center justify-between px-4">
        <Link
          href="/programs/python"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span className="font-serif text-sm font-semibold tracking-tight text-foreground truncate max-w-[200px]">
            Python Track
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
            href="/programs/python"
            className="group flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Python Overview</span>
          </Link>
          <span className="rounded-full bg-primary/10 border border-primary/20 px-2 py-0.5 text-[10px] font-mono font-medium text-primary">
            Python 3.12
          </span>
        </div>

        {/* Search Bar */}
        <div className="p-3 border-b border-border/60 dark:border-white/10 mt-14 lg:mt-0">
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
                  const allChapterLessons = chapter.concepts
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
              {completedIds.size} / {allLessons.length} ({completionPercentage}%)
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/70">
            <span>Python 3.12+</span>
            {completedIds.size > 0 && (
              <button
                onClick={() => {
                  if (confirm("Reset Python track progress?")) {
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

      {/* ═══════════════════════════════════════════════════════════════════════
          MAIN CONTENT READER PANEL
          ═══════════════════════════════════════════════════════════════════════ */}
      <main
        id="python-docs-main-scroll"
        className="flex-1 overflow-y-auto custom-scrollbar flex flex-col bg-background"
      >
        {/* Top Floating Action Bar */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border/80 dark:border-white/10 bg-background/85 backdrop-blur-xl px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground md:hidden cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground truncate">
              <span className="hidden sm:inline">{currentChapter.title}</span>
              <ChevronRight className="h-3 w-3 hidden sm:inline text-muted-foreground/60" />
              <span className="font-semibold text-foreground truncate">{activeLesson.title}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => toggleCompleted(activeLesson.id)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-mono border transition-all flex items-center gap-1.5 cursor-pointer",
                completedIds.has(activeLesson.id)
                  ? "border-primary/50 bg-primary/10 text-primary font-bold"
                  : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {completedIds.has(activeLesson.id) ? "Completed" : "Mark Complete"}
              </span>
            </button>

            <button
              onClick={() =>
                setSimulationLesson({
                  lesson: activeLesson,
                  color: "#2563eb"
                })
              }
              className="rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-4 py-1.5 text-xs font-semibold font-mono flex items-center gap-1.5 transition-all cursor-pointer shadow-2xs"
            >
              <MonitorPlay className="h-3.5 w-3.5" />
              <span>Interactive IDE</span>
            </button>
          </div>
        </header>

        {/* Reader Document Body */}
        <div className="mx-auto w-full max-w-4xl p-6 sm:p-10 lg:p-12 space-y-10 flex-1">
          
          {/* Document Header */}
          <div className="space-y-3 pb-6 border-b border-border">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className={cn(
                "px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase",
                activeLesson.level === "Beginner" && "text-primary border-primary/30 bg-primary/10",
                activeLesson.level === "Intermediate" && "text-primary border-primary/30 bg-primary/10",
                activeLesson.level === "Hard" && "text-rose-500 border-rose-500/30 bg-rose-500/10"
              )}>
                {activeLesson.level}
              </span>
              <span>&middot;</span>
              <span>{currentChapter.title}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              {activeLesson.title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-1">
              {activeLesson.description}
            </p>
          </div>

          {/* TL;DR Quote Card */}
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
            <VisualPythonLessonFlowchart
              lessonId={activeLesson.id}
              title={activeLesson.title}
              flowchartText={activeLesson.flowchart}
            />
          )}

          {/* Step-by-Step Program Execution & Memory State Tracing */}
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
                    className="p-4 rounded-2xl border border-border bg-card space-y-1.5 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-primary">
                        Step 0{step.step}: {step.title}
                      </span>
                      <span className="text-[10px] font-mono text-muted-foreground px-2 py-0.5 rounded bg-secondary">
                        Line {step.line}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {step.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Code Workspace Preview Card */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                <Code2 size={14} className="text-primary" />
                <span>Idiomatic Python Code Implementation</span>
              </h3>
              <button
                onClick={copyToClipboard}
                className="text-xs font-mono text-muted-foreground hover:text-foreground flex items-center gap-1 cursor-pointer"
              >
                {copiedCode ? <Check size={13} className="text-primary" /> : <Copy size={13} />}
                <span>{copiedCode ? "Copied" : "Copy Code"}</span>
              </button>
            </div>

            <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-[#181715] dark:bg-[#100f0e] overflow-hidden text-slate-100 font-mono text-xs shadow-inner">
              <div className="px-4 py-2.5 border-b border-border/80 dark:border-white/10 bg-[#141413]/80 flex items-center justify-between text-[11px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                  <span className="ml-2 font-mono text-muted-foreground">{activeLesson.slug}.py</span>
                </div>
                <span>CPython 3.12</span>
              </div>
              <pre className="p-5 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar text-slate-200">
                <code>{activeLesson.code}</code>
              </pre>
            </div>

            {activeLesson.expectedOutput && (
              <div className="rounded-2xl border border-white/10 bg-[#0c0c0e] overflow-hidden font-mono text-xs shadow-md">
                <div className="px-4 py-2.5 bg-[#141416] border-b border-white/10 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 mr-1">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                      <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <Terminal className="h-3.5 w-3.5 text-primary" />
                    <span className="text-zinc-200 font-semibold uppercase tracking-wider text-[11px]">
                      Standard Output (stdout)
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md text-[10px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    exit code: 0
                  </span>
                </div>
                <div className="p-4 space-y-2 bg-[#09090b]">
                  <div className="flex items-center gap-2 text-zinc-400 text-xs select-none">
                    <span className="text-emerald-400 font-bold">$</span>
                    <span className="text-zinc-300 font-mono">python3 {activeLesson.slug}.py</span>
                  </div>
                  <pre className="text-emerald-300 dark:text-emerald-400 font-mono text-xs sm:text-sm whitespace-pre-wrap leading-relaxed pl-3 border-l-2 border-emerald-500/40">
                    {activeLesson.expectedOutput}
                  </pre>
                </div>
              </div>
            )}
          </div>

          {/* FAANG Technical Interview Questions */}
          {activeLesson.interviewQuestions && activeLesson.interviewQuestions.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                <Award size={14} className="text-primary" />
                <span>Staff-Level &amp; FAANG Technical Interview Questions</span>
              </h3>
              <div className="space-y-3">
                {activeLesson.interviewQuestions.map((q, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl border border-border bg-card space-y-2 shadow-2xs"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-serif text-sm sm:text-base font-bold text-foreground">
                        {q.question}
                      </span>
                      {q.companyTags && (
                        <div className="flex items-center gap-1">
                          {q.companyTags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[9px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                      {q.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Knowledge Check Quiz */}
          {activeLesson.quiz && (
            <div className="rounded-3xl border border-border bg-secondary/20 p-6 sm:p-7 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">
                  Checkpoint Knowledge Verification
                </span>
                <HelpCircle className="h-4 w-4 text-primary" />
              </div>

              <h4 className="font-serif text-base sm:text-lg font-medium text-foreground">
                {activeLesson.quiz.question}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {activeLesson.quiz.options.map((option, idx) => {
                  const isSelected = selectedQuizOption === idx
                  const isCorrect = activeLesson.quiz?.correctIndex === idx
                  const showSuccess = isQuizSubmitted && isCorrect
                  const showError = isQuizSubmitted && isSelected && !isCorrect

                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!isQuizSubmitted) setSelectedQuizOption(idx)
                      }}
                      className={cn(
                        "p-3.5 rounded-2xl border text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between",
                        isSelected && !isQuizSubmitted && "border-primary bg-primary/10 ring-1 ring-primary font-bold text-primary",
                        showSuccess && "border-primary/50 bg-primary/10 text-primary font-bold",
                        showError && "border-destructive/50 bg-destructive/10 text-destructive font-bold",
                        !isSelected && !isQuizSubmitted && "border-border/80 bg-card hover:bg-secondary text-foreground"
                      )}
                    >
                      <span>{option}</span>
                      {showSuccess && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                      {showError && <HelpCircle className="h-4 w-4 text-rose-500 shrink-0" />}
                    </button>
                  )
                })}
              </div>

              <div className="flex items-center justify-between pt-2">
                {!isQuizSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => setIsQuizSubmitted(true)}
                    className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-mono font-semibold disabled:opacity-40 cursor-pointer"
                  >
                    Verify Answer
                  </button>
                ) : (
                  <div className="text-xs text-muted-foreground leading-relaxed pt-1">
                    <strong className="text-foreground">Explanation: </strong>
                    {activeLesson.quiz.explanation}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Reference Specifications and Literature */}
          {activeLesson.resources && activeLesson.resources.length > 0 && (
            <div className="space-y-3 pt-4 border-t border-border">
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                <BookOpen size={14} className="text-primary" />
                <span>Primary Specifications &amp; Official References</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeLesson.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 text-xs font-mono transition-all flex items-center justify-between group cursor-pointer"
                  >
                    <span className="text-foreground group-hover:text-primary transition-colors truncate pr-2">
                      {res.title}
                    </span>
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Pagination Next/Prev Navigation */}
          <div className="pt-8 border-t border-border flex items-center justify-between gap-4">
            {prevLesson ? (
              <button
                onClick={() => setActiveLesson(prevLesson.lesson)}
                className="flex flex-col text-left p-3 rounded-2xl border border-border bg-card hover:bg-secondary transition-all cursor-pointer max-w-[45%]"
              >
                <span className="text-[10px] font-mono text-muted-foreground">&larr; Previous Lesson</span>
                <span className="font-serif text-sm font-bold text-foreground truncate mt-0.5">
                  {prevLesson.lesson.title}
                </span>
              </button>
            ) : <div />}

            {nextLesson ? (
              <button
                onClick={() => setActiveLesson(nextLesson.lesson)}
                className="flex flex-col text-right p-3 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer max-w-[45%]"
              >
                <span className="text-[10px] font-mono text-primary">Next Lesson &rarr;</span>
                <span className="font-serif text-sm font-bold text-foreground truncate mt-0.5">
                  {nextLesson.lesson.title}
                </span>
              </button>
            ) : <div />}
          </div>

        </div>
      </main>

      {/* Interactive In-Browser Execution Dialog Modal */}
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
