"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  X,
  BookOpen,
  CheckCircle2,
  Circle,
  ChevronLeft,
  ChevronRight,
  Code2,
  HelpCircle,
  Layers,
  Terminal,
  Clock,
  Award,
  Check,
  Copy,
} from "lucide-react"
import { LessonTheoryContent, getOsLessonTheory } from "@/lib/curriculum/os-theory-data"
import { AsciLesson, AsciModule } from "@/lib/curriculum/plus-curriculum-data"
import { VisualCourseFlowchart } from "@/components/curriculum/visual-flowchart"

interface TheoryReaderDialogProps {
  isOpen: boolean
  onClose: () => void
  currentLesson: AsciLesson | null
  currentModule: AsciModule | null
  allModules: AsciModule[]
  isCompleted: boolean
  onToggleCompleted: (lessonId: string) => void
  onSelectLesson: (lesson: AsciLesson, module: AsciModule) => void
}

export function TheoryReaderDialog({
  isOpen,
  onClose,
  currentLesson,
  currentModule,
  allModules,
  isCompleted,
  onToggleCompleted,
  onSelectLesson,
}: TheoryReaderDialogProps) {
  const [copiedCode, setCopiedCode] = useState(false)
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null)
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false)

  // Reset quiz state whenever current lesson changes
  useEffect(() => {
    setSelectedQuizOption(null)
    setIsQuizSubmitted(false)
  }, [currentLesson?.id])

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "hidden"
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  if (!isOpen || !currentLesson || !currentModule) return null

  // Fetch or generate comprehensive theory content
  const theory: LessonTheoryContent = getOsLessonTheory(currentModule.id, currentLesson.slug)

  // Locate previous and next lessons
  const currentModIndex = allModules.findIndex((m) => m.id === currentModule.id)
  const currentLessonIndex = currentModule.lessons.findIndex((l) => l.id === currentLesson.id)

  let prevLesson: { lesson: AsciLesson; module: AsciModule } | null = null
  let nextLesson: { lesson: AsciLesson; module: AsciModule } | null = null

  if (currentLessonIndex > 0) {
    prevLesson = { lesson: currentModule.lessons[currentLessonIndex - 1], module: currentModule }
  } else if (currentModIndex > 0) {
    const prevMod = allModules[currentModIndex - 1]
    if (prevMod.lessons.length > 0) {
      prevLesson = { lesson: prevMod.lessons[prevMod.lessons.length - 1], module: prevMod }
    }
  }

  if (currentLessonIndex < currentModule.lessons.length - 1) {
    nextLesson = { lesson: currentModule.lessons[currentLessonIndex + 1], module: currentModule }
  } else if (currentModIndex < allModules.length - 1) {
    const nextMod = allModules[currentModIndex + 1]
    if (nextMod.lessons.length > 0) {
      nextLesson = { lesson: nextMod.lessons[0], module: nextMod }
    }
  }

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 flex flex-col w-full max-w-4xl max-h-[92vh] rounded-3xl border border-border/80 bg-card/98 shadow-[0_24px_80px_rgba(0,0,0,0.6)] overflow-hidden"
        >
          {/* Header */}
          <div className="shrink-0 border-b border-border/70 bg-secondary/40 px-6 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
                  <span>Mod {String(theory.moduleIndex).padStart(2, "0")}</span>
                  <span>•</span>
                  <span className="truncate">{currentModule.title.split("(")[0]}</span>
                </div>
                <h2 className="text-base sm:text-lg font-semibold text-foreground truncate tracking-tight">
                  {theory.title}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="hidden sm:flex items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-[11px] font-mono text-muted-foreground border border-border/60">
                  <Clock className="h-3 w-3 text-primary" />
                  {theory.readingTime}
                </span>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-mono uppercase font-semibold border ${
                    theory.difficulty === "Advanced"
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : theory.difficulty === "Intermediate"
                      ? "bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30"
                      : "bg-primary/10 text-primary border-primary/20"
                  }`}
                >
                  {theory.difficulty}
                </span>
              </div>

              <button
                onClick={onClose}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-border/70 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer"
                aria-label="Close reader"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Reading Chamber Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 space-y-6 text-foreground">
            {/* Executive Summary Card */}
            <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-1.5">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Executive Concept Summary</span>
              </div>
              <p className="text-sm leading-relaxed text-foreground/90 font-sans">
                {theory.summary}
              </p>
            </div>

            {/* Key Concepts Grid */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-3 flex items-center gap-2">
                <Layers className="h-3.5 w-3.5 text-primary" />
                <span>Foundational Takeaways</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {theory.keyConcepts.map((concept, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-xl border border-border/60 bg-secondary/30 p-3 text-xs leading-snug"
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-mono font-bold mt-0.5">
                      {idx + 1}
                    </div>
                    <span className="text-foreground/90">{concept}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Schematic Flowchart */}
            {theory.schematicDiagram && (
              <VisualCourseFlowchart
                slugOrId={currentLesson?.slug || "os"}
                title={theory.title || currentLesson?.title || "Kernel Architecture"}
                schematicText={theory.schematicDiagram}
              />
            )}

            {/* In-Depth Technical Breakdown */}
            {theory.deepDive && theory.deepDive.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-primary" />
                  <span>Technical Deep Dive</span>
                </h3>
                <div className="space-y-3">
                  {theory.deepDive.map((section, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border/70 bg-card/60 p-5 space-y-2.5"
                    >
                      <h4 className="font-serif text-base font-medium text-foreground">
                        {section.heading}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>
                      {section.points && section.points.length > 0 && (
                        <ul className="list-disc list-inside space-y-1 text-xs text-muted-foreground pt-1 pl-1">
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

            {/* Implementation Code Snippet (if available) */}
            {theory.codeSnippet && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5 text-primary" />
                    <span>{theory.codeSnippet.title}</span>
                  </h3>
                  <button
                    onClick={() => handleCopyCode(theory.codeSnippet!.code)}
                    className="flex items-center gap-1 text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-primary" />
                        <span className="text-primary">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="rounded-2xl border border-border/80 bg-[#181715] p-4 font-mono text-xs leading-relaxed text-foreground overflow-x-auto">
                  <pre className="text-slate-300">
                    <code>{theory.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* FAANG Interview Q&A (if available) */}
            {theory.interviewQuestions && theory.interviewQuestions.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 text-primary" />
                  <span>Systems Engineering Interview Questions</span>
                </h3>
                <div className="space-y-2.5">
                  {theory.interviewQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="rounded-2xl border border-border/70 bg-secondary/30 p-4 space-y-2"
                    >
                      <span className="text-xs font-semibold text-foreground flex items-start gap-2">
                        <span className="text-primary font-mono">Q:</span>
                        <span>{q.question}</span>
                      </span>
                      <p className="text-xs text-muted-foreground leading-relaxed pl-5 border-l border-primary/30">
                        {q.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interactive Concept Check / Quiz */}
            {theory.quiz && (
              <div className="rounded-2xl border border-primary/30 bg-card/80 p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-primary">
                    <HelpCircle className="h-4 w-4" />
                    <span>Knowledge Check</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    Instant Evaluation
                  </span>
                </div>

                <p className="text-sm font-medium text-foreground">{theory.quiz.question}</p>

                <div className="space-y-2">
                  {theory.quiz.options.map((opt, oIdx) => {
                    const isSelected = selectedQuizOption === oIdx
                    const isCorrect = oIdx === theory.quiz!.correctIndex

                    let optionClass =
                      "border-border/70 bg-secondary/40 hover:bg-secondary text-foreground"
                    if (isQuizSubmitted) {
                      if (isCorrect) {
                        optionClass = "border-primary/50 bg-primary/10 text-primary font-medium"
                      } else if (isSelected && !isCorrect) {
                        optionClass = "border-destructive/50 bg-destructive/10 text-destructive font-medium"
                      } else {
                        optionClass = "border-border/40 opacity-50"
                      }
                    } else if (isSelected) {
                      optionClass = "border-primary bg-primary/10 text-primary font-medium"
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={isQuizSubmitted}
                        onClick={() => setSelectedQuizOption(oIdx)}
                        className={`w-full flex items-center justify-between gap-3 rounded-xl border p-3 text-left text-xs transition-all cursor-pointer ${optionClass}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-mono font-semibold">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span>{opt}</span>
                        </div>
                        {isQuizSubmitted && isCorrect && (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        )}
                        {isQuizSubmitted && isSelected && !isCorrect && (
                          <X className="h-4 w-4 text-destructive shrink-0" />
                        )}
                      </button>
                    )
                  })}
                </div>

                {!isQuizSubmitted ? (
                  <button
                    disabled={selectedQuizOption === null}
                    onClick={() => setIsQuizSubmitted(true)}
                    className="w-full rounded-xl bg-primary px-4 py-2.5 text-xs font-semibold text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-active transition-all cursor-pointer shadow-xs"
                  >
                    Verify Answer
                  </button>
                ) : (
                  <div className="rounded-xl border border-primary/20 bg-secondary/50 p-3.5 text-xs space-y-1">
                    <span className="font-semibold text-primary">Explanation:</span>
                    <p className="text-muted-foreground leading-relaxed">{theory.quiz.explanation}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="shrink-0 border-t border-border/70 bg-secondary/40 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Completion Status Toggle */}
            <button
              onClick={() => onToggleCompleted(currentLesson.id)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                isCompleted
                  ? "bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20"
                  : "bg-secondary text-muted-foreground border border-border/80 hover:text-foreground"
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <span>Lesson Completed</span>
                </>
              ) : (
                <>
                  <Circle className="h-4 w-4" />
                  <span>Mark as Completed</span>
                </>
              )}
            </button>

            {/* Previous & Next Navigation */}
            <div className="flex items-center gap-2">
              <button
                disabled={!prevLesson}
                onClick={() => {
                  if (prevLesson) onSelectLesson(prevLesson.lesson, prevLesson.module)
                }}
                className="flex items-center gap-1.5 rounded-xl border border-border/80 bg-card hover:bg-secondary px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                disabled={!nextLesson}
                onClick={() => {
                  if (nextLesson) onSelectLesson(nextLesson.lesson, nextLesson.module)
                }}
                className="flex items-center gap-1.5 rounded-xl bg-primary hover:bg-primary-active px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs"
              >
                <span>Next Lesson</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
