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
  CheckCircle2,
  Circle,
  Clock,
  Award,
  HelpCircle,
  Code2,
  Copy,
  Check,
  Search,
  Play,
  RotateCcw,
  ArrowRight,
  Globe,
  Eye,
} from "lucide-react"
import { CoursePart, CourseLesson } from "@/lib/curriculum/c-course-data"
import { SmartVisualDiagramRenderer } from "@/components/curriculum/visual-flowchart"
import { ThemeToggle } from "@/components/theme-toggle"
import { recordLessonCompletion } from "@/app/actions/gamification"
import { recordDailyTaskProgress } from "@/lib/daily-tasks"
import { recordCourseHistory } from "@/lib/user-learning-store"
import { WishlistButton } from "@/components/courses/wishlist-button"

interface UnifiedCoursePlayerProps {
  courseTitle: string
  courseSlug: string
  trackBadge: string
  parts: CoursePart[]
  backUrl?: string
}

export function UnifiedCoursePlayer({
  courseTitle,
  courseSlug,
  trackBadge,
  parts,
  backUrl = "/programs",
}: UnifiedCoursePlayerProps) {
  // Collect all lessons in a flat array for easy next/prev navigation
  const allLessons = useMemo(() => {
    return parts.flatMap((p) => p.chapters.flatMap((c) => c.lessons))
  }, [parts])

  const [activeLesson, setActiveLesson] = useState<CourseLesson>(
    allLessons[0] || ({} as CourseLesson)
  )
  const [openChapters, setOpenChapters] = useState<Record<string, boolean>>({
    [parts[0]?.chapters[0]?.id || ""]: true,
  })
  const [levelFilter, setLevelFilter] = useState<"All" | "Beginner" | "Intermediate" | "Advanced">("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [copiedCode, setCopiedCode] = useState(false)
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code")

  // Interactive Code Sandbox Execution State
  const [isRunning, setIsRunning] = useState(false)
  const [simulatedOutput, setSimulatedOutput] = useState<string | null>(null)

  // Quiz state
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null)
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)

  // Completed lessons stored in localStorage
  const storageKey = `asci_completed_${courseSlug}`
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())

  useEffect(() => {
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

  const toggleComplete = (lessonId: string) => {
    const updated = new Set(completedIds)
    const isNowCompleted = !updated.has(lessonId)
    if (updated.has(lessonId)) {
      updated.delete(lessonId)
    } else {
      updated.add(lessonId)
    }
    setCompletedIds(updated)
    try {
      localStorage.setItem(storageKey, JSON.stringify(Array.from(updated)))
    } catch {
      // ignore
    }

    if (isNowCompleted) {
      // 1. Advance daily quest progress
      recordDailyTaskProgress("lesson")

      // 2. Award XP via server action or demo fallback
      recordLessonCompletion(lessonId, courseSlug, 100).catch(console.warn)

      // 3. Check if all course lessons are now completed
      const isCourseFinished = updated.size >= allLessons.length && allLessons.length > 0
      if (isCourseFinished) {
        window.dispatchEvent(
          new CustomEvent("asci-award-xp", {
            detail: {
              amount: 500,
              reason: `Graduated Track: ${courseTitle} Complete! (+500 XP Course Bonus)`,
            },
          })
        )
      } else {
        window.dispatchEvent(
          new CustomEvent("asci-award-xp", {
            detail: {
              amount: 100,
              reason: `Completed: ${activeLesson.title} (+100 XP)`,
            },
          })
        )
      }
    }
  }

  // Reset quiz, code runner, and log study history when active lesson changes
  useEffect(() => {
    setSelectedQuizOption(null)
    setIsQuizSubmitted(false)
    setSimulatedOutput(null)
    setActiveTab(activeLesson.livePreviewHtml ? "preview" : "code")
    window.scrollTo({ top: 0, behavior: "smooth" })

    if (activeLesson?.id && courseSlug) {
      const pct = allLessons.length > 0 ? Math.round((completedIds.size / allLessons.length) * 100) : 0
      recordCourseHistory({
        courseSlug: courseSlug,
        courseTitle: courseTitle,
        lessonId: activeLesson.id,
        lessonTitle: activeLesson.title,
        category: trackBadge,
        level: activeLesson.level || "Beginner",
        progressPercent: pct,
        playerUrl: `/programs/${courseSlug}/course`,
      })
    }
  }, [activeLesson?.id, courseSlug, courseTitle, trackBadge, allLessons.length, completedIds.size])

  const toggleChapter = (chapterId: string) => {
    setOpenChapters((prev) => ({
      ...prev,
      [chapterId]: !prev[chapterId],
    }))
  }

  const handleCopy = () => {
    if (!activeLesson.code) return
    navigator.clipboard.writeText(activeLesson.code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  const handleRunCode = () => {
    setIsRunning(true)
    setSimulatedOutput(null)
    recordDailyTaskProgress("challenge")
    setTimeout(() => {
      setSimulatedOutput(activeLesson.output || "Execution completed with code 0.")
      setIsRunning(false)
    }, 450)
  }

  // Filter lessons based on level filter and search query
  const filteredParts = useMemo(() => {
    let result = parts
    if (levelFilter !== "All") {
      result = result
        .map((part) => ({
          ...part,
          chapters: part.chapters
            .map((ch) => ({
              ...ch,
              lessons: ch.lessons.filter((l) => l.level === levelFilter),
            }))
            .filter((ch) => ch.lessons.length > 0),
        }))
        .filter((part) => part.chapters.length > 0)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result
        .map((part) => ({
          ...part,
          chapters: part.chapters
            .map((ch) => ({
              ...ch,
              lessons: ch.lessons.filter(
                (l) =>
                  l.title.toLowerCase().includes(q) ||
                  l.tldr.toLowerCase().includes(q) ||
                  l.description.toLowerCase().includes(q)
              ),
            }))
            .filter((ch) => ch.lessons.length > 0),
        }))
        .filter((part) => part.chapters.length > 0)
    }
    return result
  }, [parts, searchQuery, levelFilter])

  // Navigation indices
  const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id)
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null
  const nextLesson =
    currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
      {/* 1. TOP UTILITY HEADER */}
      <header className="sticky top-0 z-40 h-16 border-b border-border/80 bg-background/95 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <Link
            href={backUrl}
            className="flex items-center gap-1.5 text-xs font-mono font-medium text-muted-foreground hover:text-primary transition-colors py-1.5 px-2.5 rounded-lg hover:bg-card border border-border/60"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to Courses</span>
          </Link>

          <div className="h-4 w-px bg-border/80 hidden sm:block" />

          <div className="flex items-center gap-2">
            <span className="font-serif text-sm sm:text-base font-medium text-foreground tracking-tight line-clamp-1">
              {courseTitle}
            </span>
            <span className="hidden md:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
              {trackBadge}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Progress Indicator */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <span>
              {completedIds.size} / {allLessons.length} done
            </span>
            <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 rounded-full"
                style={{
                  width: `${(completedIds.size / Math.max(allLessons.length, 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          <WishlistButton
            course={{
              id: courseSlug,
              slug: courseSlug,
              title: courseTitle,
              category: trackBadge,
              href: `/programs/${courseSlug}/course`,
            }}
            variant="full"
            className="text-xs py-1.5 px-3 hidden md:inline-flex"
          />

          <ThemeToggle />

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-border text-foreground hover:bg-secondary cursor-pointer"
            aria-label="Toggle navigation drawer"
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>

      {/* 2. BODY CONTAINER */}
      <div className="flex-1 flex w-full max-w-[1700px] mx-auto">
        {/* 2A. LEFT SIDEBAR NAVIGATION */}
        <aside
          className={`
            fixed lg:sticky top-16 z-30 h-[calc(100vh-4rem)] w-72 sm:w-80 shrink-0
            border-r border-border/80 bg-card/60 dark:bg-[#141413] backdrop-blur-xl
            flex flex-col transition-transform duration-200
            ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Search & Level Filter */}
          <div className="p-3 border-b border-border/60 space-y-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-background border border-border/80 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-sans"
              />
            </div>

            {/* Level Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-secondary/80 border border-border/60 text-[10px] font-mono">
              {(["All", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`py-1 rounded-lg text-center transition-all cursor-pointer truncate px-1 ${
                    levelFilter === lvl
                      ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                  }`}
                  title={lvl}
                >
                  {lvl === "Intermediate" ? "Inter" : lvl === "Advanced" ? "Hard" : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Syllabus Tree */}
          <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs font-sans">
            {filteredParts.map((part) => (
              <div key={part.id} className="space-y-1">
                <div className="px-2 py-1 flex items-center justify-between text-[11px] font-mono text-muted-foreground/80 uppercase tracking-wider font-semibold">
                  <span className="line-clamp-1">{part.title}</span>
                  <span className="text-[9px] text-primary">{part.badge}</span>
                </div>

                {part.chapters.map((ch) => {
                  const isOpen = openChapters[ch.id] !== false
                  return (
                    <div key={ch.id} className="rounded-xl overflow-hidden">
                      <button
                        onClick={() => toggleChapter(ch.id)}
                        className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left font-medium text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                      >
                        <span className="line-clamp-1">{ch.title}</span>
                        {isOpen ? (
                          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="pl-3 pt-1 space-y-0.5 border-l border-border/60 ml-3">
                          {ch.lessons.map((lesson) => {
                            const isCurrent = lesson.id === activeLesson.id
                            const isDone = completedIds.has(lesson.id)
                            return (
                              <button
                                key={lesson.id}
                                onClick={() => {
                                  setActiveLesson(lesson)
                                  setIsMobileMenuOpen(false)
                                }}
                                className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left transition-all cursor-pointer ${
                                  isCurrent
                                    ? "bg-primary/10 text-primary font-semibold border border-primary/20 shadow-2xs"
                                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                }`}
                              >
                                {isDone ? (
                                  <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                                ) : (
                                  <Circle className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
                                )}
                                <span className="line-clamp-1 flex-1 text-[11.5px]">
                                  {lesson.title}
                                </span>
                              </button>
                            )
                          })}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </aside>

        {/* 2B. MAIN LESSON VIEWER */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-10 max-w-4xl mx-auto space-y-8">
          {/* Track Progress & Course Completion Banner */}
          {completedIds.size >= allLessons.length && allLessons.length > 0 ? (
            <div className="p-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 text-foreground flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <div className="font-serif text-lg text-white font-medium">
                    Curriculum Mastered: Track Complete!
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    You have finished all {allLessons.length} lessons in {courseTitle}. Track Graduate Honor &amp; +500 XP Course Bonus awarded!
                  </div>
                </div>
              </div>
              <span className="badge-gold text-xs px-3 py-1 font-mono shrink-0 self-start sm:self-auto">
                100% COMPLETE
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl border border-border/80 bg-card/60 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  <span className="text-foreground font-medium">{courseTitle} Track Progress</span>
                </div>
                <span className="text-primary font-semibold">
                  {completedIds.size} / {allLessons.length} Lessons ({allLessons.length > 0 ? Math.round((completedIds.size / allLessons.length) * 100) : 0}%)
                </span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-secondary overflow-hidden border border-border/80">
                <div
                  className="h-full bg-primary transition-all duration-500 rounded-full"
                  style={{ width: `${allLessons.length > 0 ? Math.round((completedIds.size / allLessons.length) * 100) : 0}%` }}
                />
              </div>
            </div>
          )}

          {/* Breadcrumb & Meta */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground mb-3 flex-wrap">
              <span>{courseTitle}</span>
              <span>/</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border ${
                  activeLesson.level === "Advanced"
                    ? "bg-purple-500/15 text-purple-600 dark:text-purple-400 border-purple-500/30"
                    : activeLesson.level === "Intermediate"
                    ? "bg-sky-500/15 text-sky-600 dark:text-sky-400 border-sky-500/30"
                    : "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                }`}
              >
                {activeLesson.level}
              </span>
              <span>/</span>
              <span className="text-foreground">{activeLesson.title}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground tracking-tight leading-tight">
              {activeLesson.title}
            </h1>

            {/* TLDR Pill */}
            <div className="mt-4 p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs sm:text-sm text-foreground flex items-start gap-2.5">
              <Terminal className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-primary font-mono text-xs uppercase tracking-wider block sm:inline sm:mr-2">
                  Key Takeaway:
                </span>
                {activeLesson.tldr}
              </div>
            </div>
          </div>

          {/* Simple Explanation (W3Schools style) */}
          <div className="space-y-4 text-sm sm:text-base text-foreground leading-relaxed font-normal">
            <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground pt-2">
              What Is It &amp; Why Use It?
            </h2>
            <p className="text-muted-foreground">{activeLesson.description}</p>
          </div>

          {/* Visual Architecture & Flowchart Representation */}
          {activeLesson.visualDiagram && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  {activeLesson.visualDiagramTitle || "Visual Flowchart & Architecture"}
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                  Interactive Diagram
                </span>
              </div>
              <div className="rounded-2xl border border-border/80 bg-card/60 p-4 sm:p-5 shadow-xs">
                <SmartVisualDiagramRenderer
                  title={activeLesson.visualDiagramTitle || activeLesson.title}
                  schematicText={activeLesson.visualDiagram}
                />
              </div>
            </div>
          )}

          {/* Code Example & Interactive Sandbox */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                  Example Code
                </h2>
                {activeLesson.livePreviewHtml && (
                  <div className="inline-flex rounded-lg border border-border p-0.5 bg-secondary/80 text-xs font-mono">
                    <button
                      onClick={() => setActiveTab("code")}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        activeTab === "code"
                          ? "bg-card text-foreground font-semibold shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Code2 className="h-3 w-3 inline mr-1" />
                      Code
                    </button>
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        activeTab === "preview"
                          ? "bg-card text-foreground font-semibold shadow-2xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <Eye className="h-3 w-3 inline mr-1" />
                      Live Preview
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
              >
                {copiedCode ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Code Block / Live Preview Card */}
            <div className="rounded-2xl border border-border/80 bg-card/80 dark:bg-[#141413] overflow-hidden shadow-xs">
              {activeTab === "code" ? (
                <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-x-auto text-foreground leading-relaxed">
                  <pre>{activeLesson.code}</pre>
                </div>
              ) : (
                <div className="p-4 sm:p-5 bg-background border-b border-border/60">
                  <div className="text-[11px] font-mono text-muted-foreground mb-2 flex items-center gap-1.5">
                    <Globe className="h-3.5 w-3.5 text-primary" />
                    <span>Live Browser Rendering:</span>
                  </div>
                  <div
                    className="p-4 rounded-xl border border-border/80 bg-card/60"
                    dangerouslySetInnerHTML={{
                      __html: activeLesson.livePreviewHtml || "",
                    }}
                  />
                </div>
              )}

              {/* Sandbox Runner Controls */}
              <div className="px-4 py-3 border-t border-border/60 bg-secondary/30 flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold transition-all shadow-2xs cursor-pointer disabled:opacity-60"
                >
                  <Play className="h-3 w-3 fill-current" />
                  <span>{isRunning ? "Running..." : "Try It Yourself"}</span>
                </button>

                <span className="text-[11px] font-mono text-muted-foreground">
                  Language: <span className="uppercase text-primary">{activeLesson.language}</span>
                </span>
              </div>

              {/* Terminal Output */}
              {simulatedOutput && (
                <div className="border-t border-border/60 bg-[#0c0c0e] text-zinc-100 font-mono text-xs overflow-hidden">
                  {/* Terminal Header Bar */}
                  <div className="px-4 py-2.5 bg-[#141416] border-b border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 mr-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                      </div>
                      <Terminal className="h-3.5 w-3.5 text-primary" />
                      <span className="text-[11px] font-semibold text-zinc-200 uppercase tracking-wider">
                        Program Output
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[10px]">
                      <span className="inline-flex items-center gap-1 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-mono">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        exit code: 0
                      </span>
                      <span className="text-zinc-400 uppercase hidden sm:inline-block">
                        {activeLesson.language} stdout
                      </span>
                      <button
                        onClick={() => setSimulatedOutput(null)}
                        className="text-zinc-400 hover:text-zinc-200 transition-colors px-1.5 py-0.5 rounded hover:bg-white/10 text-[10px] uppercase font-mono cursor-pointer ml-1"
                        title="Clear output"
                      >
                        Clear
                      </button>
                    </div>
                  </div>

                  {/* Terminal Body */}
                  <div className="p-4 sm:p-5 space-y-2 bg-[#09090b]">
                    <div className="flex items-center gap-2 text-zinc-400 text-xs select-none">
                      <span className="text-emerald-400 font-bold">$</span>
                      <span className="text-zinc-300 font-mono">./run_{activeLesson.language || "code"}</span>
                    </div>
                    <pre className="whitespace-pre-wrap leading-relaxed font-mono text-xs sm:text-sm text-emerald-300 dark:text-emerald-400 font-medium selection:bg-primary/30 pl-3 border-l-2 border-emerald-500/40">
                      {simulatedOutput}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Line-by-Line Breakdown Table */}
          {activeLesson.lineExplanations && activeLesson.lineExplanations.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Code Line-by-Line Breakdown
              </h2>
              <div className="overflow-hidden rounded-2xl border border-border/80 bg-card/60 divide-y divide-border/60 text-xs">
                {activeLesson.lineExplanations.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-6"
                  >
                    <code className="font-mono text-primary font-semibold shrink-0 bg-primary/10 px-2 py-1 rounded">
                      {item.line}
                    </code>
                    <p className="text-muted-foreground sm:text-right font-normal">
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Points Checklist */}
          {activeLesson.keyPoints && activeLesson.keyPoints.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
                Remember These Rules
              </h2>
              <div className="space-y-2">
                {activeLesson.keyPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-xs sm:text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Check Quiz */}
          <div className="p-5 sm:p-6 rounded-2xl border border-border/80 bg-card/70 dark:bg-[#181715] space-y-4 shadow-xs">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 font-semibold">
                Quick Test
              </span>
              <h3 className="text-sm sm:text-base font-semibold text-foreground">
                {activeLesson.quiz.question}
              </h3>
            </div>

            <div className="space-y-2">
              {activeLesson.quiz.options.map((opt, optIdx) => {
                const isSelected = selectedQuizOption === optIdx
                return (
                  <button
                    key={optIdx}
                    onClick={() => {
                      if (!isQuizSubmitted) setSelectedQuizOption(optIdx)
                    }}
                    className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm font-sans transition-all cursor-pointer ${
                      isSelected
                        ? "border-primary bg-primary/10 text-foreground font-medium"
                        : "border-border/80 bg-background hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-primary">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      <span>{opt}</span>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              {!isQuizSubmitted ? (
                <button
                  onClick={() => {
                    setIsQuizSubmitted(true)
                    if (selectedQuizOption === activeLesson.quiz.correctIndex) {
                      recordDailyTaskProgress("challenge")
                      window.dispatchEvent(
                        new CustomEvent("asci-award-xp", {
                          detail: {
                            amount: 50,
                            reason: `Concept Check Solved: ${activeLesson.title} (+50 XP)`,
                          },
                        })
                      )
                    }
                  }}
                  disabled={selectedQuizOption === null}
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold transition-all disabled:opacity-50 cursor-pointer shadow-2xs"
                >
                  Check Answer (+50 XP)
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIsQuizSubmitted(false)
                    setSelectedQuizOption(null)
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" /> Retry
                </button>
              )}

              {isQuizSubmitted && (
                <div className="text-xs font-mono text-right">
                  {selectedQuizOption === activeLesson.quiz.correctIndex ? (
                    <span className="text-primary font-semibold">
                      ✓ Correct! {activeLesson.quiz.explanation}
                    </span>
                  ) : (
                    <span className="text-destructive font-semibold">
                      ✕ Not quite. {activeLesson.quiz.explanation}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* 2C. BOTTOM NAVIGATION CONTROLS */}
          <div className="pt-6 border-t border-border/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              {prevLesson ? (
                <button
                  onClick={() => setActiveLesson(prevLesson)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card text-xs font-mono text-muted-foreground hover:text-foreground hover:bg-secondary transition-all cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </button>
              ) : (
                <div />
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleComplete(activeLesson.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium border transition-all cursor-pointer ${
                  completedIds.has(activeLesson.id)
                    ? "bg-primary/10 border-primary/40 text-primary"
                    : "border-border bg-card hover:bg-secondary text-muted-foreground"
                }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                <span>
                  {completedIds.has(activeLesson.id) ? "Completed" : "Mark as Completed"}
                </span>
              </button>

              {nextLesson && (
                <button
                  onClick={() => setActiveLesson(nextLesson)}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-primary hover:bg-primary-active text-primary-foreground text-xs font-mono font-semibold transition-all shadow-2xs cursor-pointer"
                >
                  <span>Next Lesson</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
