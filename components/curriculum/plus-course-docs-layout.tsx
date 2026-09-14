"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Terminal,
  Menu,
  X,
  BookOpen,
  Cpu,
  CheckCircle2,
  Circle,
  Clock,
  Award,
  Layers,
  HelpCircle,
  Code2,
  Copy,
  Check,
  Search,
  MonitorPlay,
  RotateCcw,
  Zap,
} from "lucide-react"
import { AsciSubject, AsciModule, AsciLesson } from "@/lib/curriculum/plus-curriculum-data"
import { getOsLessonTheory, LessonTheoryContent } from "@/lib/curriculum/os-theory-data"
import { VisualCourseFlowchart } from "@/components/curriculum/visual-flowchart"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

interface PlusCourseDocsLayoutProps {
  subject: AsciSubject
}

export function PlusCourseDocsLayout({ subject }: PlusCourseDocsLayoutProps) {
  const defaultModule = subject.modules[0]
  const defaultLesson = defaultModule?.lessons[0]

  const [activeModule, setActiveModule] = useState<AsciModule>(defaultModule)
  const [activeLesson, setActiveLesson] = useState<AsciLesson>(defaultLesson)
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({
    [defaultModule?.id || ""]: true,
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null)
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)

  // Local storage completed IDs
  const storageKey = `asci_plus_completed_${subject.slug}`
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
  }, [storageKey])

  // Reset quiz state when active lesson changes
  useEffect(() => {
    setSelectedQuizOption(null)
    setIsQuizSubmitted(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [activeLesson?.id])

  const toggleModule = (modId: string) => {
    setOpenModules((prev) => ({ ...prev, [modId]: !prev[modId] }))
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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  // Filter modules and lessons by search query
  const filteredModules = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return subject.modules

    return subject.modules
      .map((mod) => {
        const matchesModTitle = mod.title.toLowerCase().includes(q)
        const matchingLessons = mod.lessons.filter(
          (l) => l.title.toLowerCase().includes(q) || matchesModTitle
        )
        return {
          ...mod,
          lessons: matchingLessons,
        }
      })
      .filter((mod) => mod.lessons.length > 0)
  }, [subject.modules, searchQuery])

  // Get active theory content
  const theory: LessonTheoryContent = useMemo(() => {
    if (!activeModule || !activeLesson) {
      return getOsLessonTheory("950", "why-do-we-need-an-operating-system")
    }
    return getOsLessonTheory(activeModule.id, activeLesson.slug)
  }, [activeModule, activeLesson])

  // Navigation: Previous and Next lessons
  const currentModIndex = subject.modules.findIndex((m) => m.id === activeModule?.id)
  const currentLessonIndex = activeModule?.lessons.findIndex((l) => l.id === activeLesson?.id) ?? -1

  let prevLesson: { lesson: AsciLesson; module: AsciModule } | null = null
  let nextLesson: { lesson: AsciLesson; module: AsciModule } | null = null

  if (activeModule && currentLessonIndex > 0) {
    prevLesson = { lesson: activeModule.lessons[currentLessonIndex - 1], module: activeModule }
  } else if (currentModIndex > 0) {
    const prevMod = subject.modules[currentModIndex - 1]
    if (prevMod.lessons.length > 0) {
      prevLesson = { lesson: prevMod.lessons[prevMod.lessons.length - 1], module: prevMod }
    }
  }

  if (activeModule && currentLessonIndex < activeModule.lessons.length - 1) {
    nextLesson = { lesson: activeModule.lessons[currentLessonIndex + 1], module: activeModule }
  } else if (currentModIndex < subject.modules.length - 1) {
    const nextMod = subject.modules[currentModIndex + 1]
    if (nextMod.lessons.length > 0) {
      nextLesson = { lesson: nextMod.lessons[0], module: nextMod }
    }
  }

  const isCurrentCompleted = activeLesson ? completedIds.has(activeLesson.id) : false
  const totalCompleted = completedIds.size
  const totalLessons = subject.totalLessons
  const progressPercent = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0

  if (!mounted) return null

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden font-sans">
      {/* ─── MOBILE HEADER ─── */}
      <div className="lg:hidden absolute top-0 left-0 right-0 h-16 border-b border-border bg-card/95 backdrop-blur-xl z-50 flex items-center justify-between px-4">
        <Link
          href="/plus/home"
          className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          <span className="font-serif text-sm font-semibold tracking-tight text-foreground truncate max-w-[200px]">
            {subject.title}
          </span>
        </Link>
        <button
          className="text-foreground p-2 rounded-lg hover:bg-secondary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ─── LEFT SIDEBAR NAVIGATION ─── */}
      <aside
        className={cn(
          "w-[320px] shrink-0 border-r border-border bg-card/70 backdrop-blur-xl flex flex-col z-40 transition-transform duration-300 absolute lg:relative h-full",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Sidebar Brand Header */}
        <div className="hidden lg:flex h-16 border-b border-border items-center justify-between px-5 shrink-0 bg-background/50">
          <Link
            href="/plus/home"
            className="group flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
            <span>Tracks</span>
          </Link>

          <span className="font-serif text-sm font-semibold tracking-tight text-foreground truncate">
            {subject.title}
          </span>

          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9px] font-mono font-semibold text-primary uppercase">
            v6.x
          </span>
        </div>

        {/* Sidebar Search Filter */}
        <div className="p-3 border-b border-border/80 mt-16 lg:mt-0 bg-background/30">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search 144 OS topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-border bg-card/80 pl-8 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Scrollable Modules Accordion Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
          {filteredModules.map((mod, modIdx) => {
            const isOpen = openModules[mod.id]
            const modSolved = mod.lessons.filter((l) => completedIds.has(l.id)).length

            return (
              <div key={mod.id} className="space-y-1">
                {/* Module Toggle Button */}
                <button
                  onClick={() => toggleModule(mod.id)}
                  className="w-full flex items-center justify-between gap-2 px-2.5 py-2 text-xs font-semibold text-foreground/90 hover:text-primary transition-colors rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.04] text-left group"
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <ChevronRight
                      size={13}
                      className={cn(
                        "transition-transform text-muted-foreground shrink-0",
                        isOpen && "rotate-90 text-primary"
                      )}
                    />
                    <span className="truncate text-xs font-medium">
                      Mod {String(modIdx + 1).padStart(2, "0")} — {mod.title.split("(")[0].trim() || mod.title}
                    </span>
                  </div>
                  <span className="shrink-0 text-[10px] font-mono text-muted-foreground/80">
                    {modSolved}/{mod.lessons.length}
                  </span>
                </button>

                {/* Sub-Lessons List */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.18 }}
                      className="overflow-hidden border-l border-border/70 ml-4 pl-2 space-y-0.5"
                    >
                      {mod.lessons.map((lesson) => {
                        const isActive = activeLesson?.id === lesson.id
                        const isDone = completedIds.has(lesson.id)
                        const isQuiz =
                          lesson.type.toLowerCase().includes("mcq") ||
                          lesson.type.toLowerCase().includes("quiz")
                        const Icon = isQuiz ? HelpCircle : lesson.hasIDE ? Terminal : BookOpen

                        return (
                          <div
                            key={lesson.id}
                            className={cn(
                              "group/item w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-lg text-xs transition-all cursor-pointer",
                              isActive
                                ? "bg-primary/10 text-primary font-semibold border-l-2 border-primary"
                                : "text-muted-foreground hover:text-foreground hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
                            )}
                            onClick={() => {
                              setActiveModule(mod)
                              setActiveLesson(lesson)
                              setIsMobileMenuOpen(false)
                            }}
                          >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                              <Icon
                                size={13}
                                className={cn(
                                  "shrink-0",
                                  isActive ? "text-primary" : "text-muted-foreground"
                                )}
                              />
                              <span
                                className={cn(
                                  "truncate leading-snug",
                                  isDone && !isActive && "line-through opacity-60"
                                )}
                                title={lesson.title}
                              >
                                {lesson.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              {/* Quick Mark Complete Checkbox */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleCompleted(lesson.id)
                                }}
                                className="text-muted-foreground/60 hover:text-primary transition-colors p-0.5"
                                aria-label={isDone ? "Mark incomplete" : "Mark complete"}
                              >
                                {isDone ? (
                                  <CheckCircle2 size={13} className="text-primary" />
                                ) : (
                                  <Circle size={13} className="opacity-40 hover:opacity-100" />
                                )}
                              </button>
                            </div>
                          </div>
                        )
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </nav>

        {/* Sidebar Footer Progress Bar */}
        <div className="p-4 border-t border-border bg-card/40 shrink-0 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-muted-foreground">Mastery</span>
            <span className="font-medium text-foreground">
              {totalCompleted} / {totalLessons} ({progressPercent}%)
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between pt-1 text-[10px] font-mono text-muted-foreground/70">
            <div className="flex items-center gap-1.5">
              <div className="h-1.5 w-1.5 rounded-full bg-[#ea580c] animate-pulse" />
              <span>POSIX.1 & Linux 6.x</span>
            </div>
            {totalCompleted > 0 && (
              <button
                onClick={resetProgress}
                className="hover:text-destructive transition-colors flex items-center gap-1"
              >
                <RotateCcw size={10} />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* ─── MAIN CONTENT AREA ─── */}
      <main className="flex-1 relative z-10 flex flex-col bg-background overflow-y-auto custom-scrollbar pt-16 lg:pt-0">
        {/* Sticky Desktop Top Bar */}
        <header className="hidden lg:flex h-16 border-b border-border items-center justify-between px-8 sticky top-0 bg-background/90 backdrop-blur-md z-30">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground truncate max-w-xl">
            <Link href="/plus/home" className="hover:text-foreground transition-colors">
              ASCI Plus
            </Link>
            <ChevronRight size={12} className="shrink-0" />
            <span className="truncate">{activeModule.title.split("(")[0].trim()}</span>
            <ChevronRight size={12} className="shrink-0" />
            <span className="text-primary shrink-0 font-medium">{activeLesson.title}</span>
          </div>

          {/* Right Action Gateway */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mark Completed Toggle */}
            <button
              onClick={() => toggleCompleted(activeLesson.id)}
              className={cn(
                "flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all cursor-pointer",
                isCurrentCompleted
                  ? "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20"
                  : "bg-secondary text-muted-foreground border border-border hover:text-foreground hover:bg-secondary/80"
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

            {/* Streak Indicator */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-mono">
              <Zap size={13} className="text-amber-500" />
              <span className="font-semibold text-foreground">5 Day Streak</span>
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </header>

        {/* Content Container */}
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
              {/* Lesson Hero Header */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary/10 text-primary shrink-0 border border-primary/20 shadow-xs">
                    <Cpu size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-semibold mb-1">
                      <span>Mod {String(theory.moduleIndex).padStart(2, "0")}</span>
                      <span>•</span>
                      <span>{activeLesson.type} Sequence</span>
                    </div>
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-tight">
                      {theory.title}
                    </h1>
                  </div>
                </div>

                {/* Meta Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-card text-xs font-mono text-muted-foreground">
                    <Clock size={12} className="text-primary" />
                    <span>{theory.readingTime}</span>
                  </span>
                  <span
                    className={cn(
                      "px-3 py-1 rounded-full border text-xs font-mono uppercase font-semibold",
                      theory.difficulty === "Advanced"
                        ? "bg-destructive/10 text-destructive border-destructive/20"
                        : theory.difficulty === "Intermediate"
                        ? "bg-[#ea580c]/15 text-[#ea580c] border-[#ea580c]/30"
                        : "bg-primary/10 text-primary border-primary/20"
                    )}
                  >
                    {theory.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary font-semibold">
                    +{activeLesson.type === "Theory" ? 50 : 100} XP
                  </span>
                  {activeLesson.hasIDE && (
                    <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono text-primary font-semibold">
                      Kernel Lab IDE
                    </span>
                  )}
                </div>
              </div>

              {/* TL;DR Executive Quote Card */}
              <div className="p-5 border border-border bg-card rounded-2xl relative overflow-hidden shadow-xs">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary" />
                <p className="text-base sm:text-lg font-serif italic text-foreground/90 leading-relaxed pl-2">
                  &ldquo;{theory.summary}&rdquo;
                </p>
              </div>

              {/* Foundational Key Takeaways */}
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <Layers size={14} className="text-primary" />
                  <span>Foundational Architectural Takeaways</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {theory.keyConcepts.map((concept, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-border/70 bg-secondary/30 p-3.5 text-xs sm:text-sm leading-relaxed"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-foreground/90">{concept}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architectural Schematic / Visual Flowchart */}
              {theory.schematicDiagram && (
                <VisualCourseFlowchart
                  slugOrId={activeLesson.slug}
                  title={theory.title || activeLesson.title}
                  schematicText={theory.schematicDiagram}
                />
              )}

              {/* Technical Deep Dive Sections */}
              {theory.deepDive && theory.deepDive.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                    <BookOpen size={14} className="text-primary" />
                    <span>Technical Deep Dive & Invariants</span>
                  </h3>
                  <div className="space-y-4">
                    {theory.deepDive.map((section, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-border bg-card p-6 space-y-3 shadow-2xs"
                      >
                        <h4 className="font-serif text-lg sm:text-xl font-medium text-foreground">
                          {section.heading}
                        </h4>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {section.content}
                        </p>
                        {section.points && section.points.length > 0 && (
                          <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-muted-foreground pt-1 pl-1">
                            {section.points.map((pt, pIdx) => (
                              <li key={pIdx}>{pt}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Implementation Reference Code */}
              {theory.codeSnippet && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                      <Code2 size={14} className="text-primary" />
                      <span>{theory.codeSnippet.title}</span>
                    </h3>
                    <button
                      onClick={() => handleCopyCode(theory.codeSnippet!.code)}
                      className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                    >
                      {copiedCode ? (
                        <>
                          <Check size={13} className="text-primary" />
                          <span className="text-primary">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                  <div className="rounded-2xl border border-border/80 bg-[#181715] overflow-hidden text-slate-100 font-mono text-xs shadow-md">
                    <div className="px-4 py-2.5 border-b border-border/80 bg-[#141413] flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                      <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                        {theory.codeSnippet.title.toLowerCase().replace(/\s+/g, "_")}.c
                      </span>
                    </div>
                    <pre className="p-5 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar text-slate-200">
                      <code>{theory.codeSnippet.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {/* FAANG Systems Engineering Interview Q&A */}
              {theory.interviewQuestions && theory.interviewQuestions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                    <Award size={14} className="text-primary" />
                    <span>Systems Engineering Interview Questions</span>
                  </h3>
                  <div className="space-y-3">
                    {theory.interviewQuestions.map((q, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-border bg-card p-5 space-y-2 shadow-2xs"
                      >
                        <div className="text-sm font-semibold text-foreground flex items-start gap-2">
                          <span className="text-primary font-mono font-bold">Q:</span>
                          <span>{q.question}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pl-6 border-l-2 border-primary/40">
                          {q.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Concept Check / Quiz */}
              {theory.quiz && (
                <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 space-y-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                      <HelpCircle size={15} />
                      <span>Knowledge Check & Evaluation</span>
                    </div>
                    <span className="text-[11px] font-mono text-muted-foreground">
                      Instant Feedback
                    </span>
                  </div>

                  <p className="text-base sm:text-lg font-medium text-foreground leading-snug">
                    {theory.quiz.question}
                  </p>

                  <div className="space-y-2.5">
                    {theory.quiz.options.map((opt, oIdx) => {
                      const isSelected = selectedQuizOption === oIdx
                      const isCorrect = oIdx === theory.quiz!.correctIndex

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
                        {theory.quiz.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Navigation & Call Stack Sandbox CTA */}
              <div className="pt-10 mt-12 border-t border-border space-y-6">
                {/* Sandbox CTA */}
                <div className="rounded-3xl border border-border bg-card p-6 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                      Interactive Systems Execution
                    </span>
                    <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground mt-1">
                      Call Stack & Memory Frame Sandbox
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-lg">
                      Step through real-time stack frames, heap allocations, and register state transitions inside the interactive visualizer.
                    </p>
                  </div>
                  <Link
                    href="/sandbox/call-stack"
                    className="shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-6 py-3 text-xs sm:text-sm font-semibold transition-all shadow-xs"
                  >
                    <MonitorPlay size={16} />
                    <span>Launch Sandbox</span>
                  </Link>
                </div>

                {/* Previous & Next Buttons */}
                <div className="flex items-center justify-between gap-4">
                  {prevLesson ? (
                    <button
                      onClick={() => {
                        setActiveModule(prevLesson!.module)
                        setActiveLesson(prevLesson!.lesson)
                      }}
                      className="flex items-center gap-2 rounded-2xl border border-border bg-card hover:bg-secondary px-5 py-3 text-xs sm:text-sm font-medium text-foreground transition-all cursor-pointer"
                    >
                      <ArrowLeft size={15} />
                      <span className="hidden sm:inline">Previous:</span>
                      <span className="truncate max-w-[180px] text-muted-foreground">
                        {prevLesson.lesson.title}
                      </span>
                    </button>
                  ) : (
                    <div />
                  )}

                  {nextLesson && (
                    <button
                      onClick={() => {
                        setActiveModule(nextLesson!.module)
                        setActiveLesson(nextLesson!.lesson)
                      }}
                      className="flex items-center gap-2 rounded-2xl bg-primary hover:bg-primary-active text-primary-foreground px-6 py-3 text-xs sm:text-sm font-semibold transition-all cursor-pointer shadow-xs ml-auto"
                    >
                      <span className="hidden sm:inline">Next:</span>
                      <span className="truncate max-w-[180px]">{nextLesson.lesson.title}</span>
                      <ChevronRight size={15} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}
