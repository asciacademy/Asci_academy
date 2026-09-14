"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal, BookOpen, ChevronRight, Target, Zap, Clock, Server,
  Layers, Cpu, Database, Award, CheckCircle2, FileText, ArrowRight,
  HelpCircle, Code2, ShieldCheck, Binary, ChevronDown, ExternalLink, RefreshCw
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  pythonCourseCurriculum,
  PYTHON_BOOKS_AND_PDFS,
  PYTHON_ENTERPRISE_PROJECTS,
  PYTHON_DIAGNOSTIC_QUIZ,
  CourseLevel,
  Part,
  Chapter
} from "@/lib/python-course-data"
import { cn } from "@/lib/utils"
import {
  CPythonPipelineFlowchart,
  PythonMemoryModelFlowchart,
  PythonGilAsyncioFlowchart
} from "@/components/curriculum/python-visual-flowchart"

export default function PythonMasterLandingPage() {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "All">("All")
  const [activeProjectTab, setActiveProjectTab] = useState(PYTHON_ENTERPRISE_PROJECTS[0].id)
  
  // Placement Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Filter parts / chapters based on level tab
  const filteredParts = selectedLevel === "All"
    ? pythonCourseCurriculum
    : pythonCourseCurriculum.filter(p => p.level === selectedLevel)

  const allChapters = filteredParts.flatMap(p => p.chapters)

  const handleSelectQuizOption = (questionId: number, optionIdx: number) => {
    if (quizSubmitted) return
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }))
  }

  const calculateScore = () => {
    let score = 0
    PYTHON_DIAGNOSTIC_QUIZ.forEach(q => {
      if (quizAnswers[q.id] === q.correctIndex) {
        score++
      }
    })
    return score
  }

  const resetQuiz = () => {
    setQuizAnswers({})
    setQuizSubmitted(false)
  }

  const activeProject = PYTHON_ENTERPRISE_PROJECTS.find(p => p.id === activeProjectTab) || PYTHON_ENTERPRISE_PROJECTS[0]

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary/20">
      <Navbar />
      <div className="h-[72px]" />

      {/* ════════ HERO SECTION ════════ */}
      <section className="relative overflow-hidden border-b border-border py-16 lg:py-24 bg-card">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left: Editorial Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono uppercase tracking-wider font-semibold">
                <Layers className="h-3.5 w-3.5" />
                <span>3-Tier Master Curriculum &middot; Beginner to Advanced</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.1]">
                Python Software Engineering &amp; <br className="hidden sm:inline" />
                <span className="italic font-serif text-primary">Systems Architecture</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                A rigorous, full-stack roadmap divided into three distinct skill tiers: from dynamic name binding, small integer caching, and Dunder data models to CPython internals, GIL concurrency, asynchronous event loops, and high-scale production systems.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/programs/python/course"
                  className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-8 py-3.5 text-sm font-semibold transition-all shadow-sm"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Launch Course Workspace</span>
                </Link>

                <a
                  href="#placement-quiz"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-secondary text-foreground px-6 py-3.5 text-sm font-medium transition-all"
                >
                  <Target className="h-4 w-4 text-primary" />
                  <span>Take Placement Quiz</span>
                </a>
              </div>

              {/* Metadata Badges */}
              <div className="mt-10 pt-8 border-t border-border/80 flex flex-wrap items-center justify-center lg:justify-start gap-8 font-mono text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span>{allChapters.length} Chapters &middot; 3 Tiers</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="h-4 w-4 text-primary" />
                  <span>3 Production Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-primary" />
                  <span>Python 3.12+ / CPython</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Architectural Showcase Card */}
            <div className="w-full lg:w-[480px] shrink-0">
              <div className="relative rounded-3xl border border-border bg-card/80 p-7 shadow-lg backdrop-blur-xl">
                <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-[#ea580c]/80" />
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      cpython_runtime.spec
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-[11px] font-semibold">
                    v3.12+ C-API
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
                    <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block">
                      Tier 1: Beginner Foundations
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Bytecode compilation, PyObject pointers, Small Int Cache [-5..256], and PEP 634 match/case.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
                    <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block">
                      Tier 2: Intermediate Mastery
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Dunder protocol, C3 Linearization (MRO), parametric decorators, and memory-efficient generators.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/40 border border-border/80 space-y-2">
                    <span className="text-[11px] font-mono text-primary font-bold uppercase tracking-wider block">
                      Tier 3: Hard / Systems Engineering
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Reference counting, cyclic generational GC, GIL contention, Asyncio single-thread reactor, and FastAPI microservices.
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-mono text-muted-foreground">Interactive IDE Ready</span>
                  <Link
                    href="/programs/python/course"
                    className="text-xs font-mono text-primary hover:underline font-semibold flex items-center gap-1"
                  >
                    <span>Start Level 1</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════ INTERACTIVE VISUAL FLOWCHARTS SECTION ════════ */}
      <section className="py-20 border-b border-border bg-card/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-2">
              Visual Architecture &amp; Mechanics
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Understand Python From First Principles
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
              No hand-waving or magic. Visual, understandable flowcharts breaking down the CPython compilation pipeline, pointer reference binding, and GIL concurrency.
            </p>
          </div>

          <div className="space-y-10">
            {/* 1. CPython Pipeline */}
            <CPythonPipelineFlowchart />

            {/* 2. Memory Model & Pointer Binding */}
            <PythonMemoryModelFlowchart />

            {/* 3. GIL vs Asyncio vs Multiprocessing */}
            <PythonGilAsyncioFlowchart />
          </div>
        </div>
      </section>

      {/* ════════ CURRICULUM BROWSER SECTION ════════ */}
      <section id="curriculum" className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-8">
          
          {/* Section Header & Tier Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-2">
                Structured Syllabus
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
                The 3-Tier Curriculum Tracks
              </h2>
              <p className="mt-2 text-muted-foreground text-sm sm:text-base">
                Select your skill tier to explore specialized chapters, from machine foundations to advanced runtime internals.
              </p>
            </div>

            {/* Level Filter Tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-secondary/50 border border-border self-start md:self-auto">
              {(["All", "Beginner", "Intermediate", "Hard"] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer",
                    selectedLevel === lvl
                      ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Curriculum Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all shadow-xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border",
                      chapter.level === "Beginner" && "text-blue-500 border-blue-500/30 bg-blue-500/10",
                      chapter.level === "Intermediate" && "text-amber-500 border-amber-500/30 bg-amber-500/10",
                      chapter.level === "Hard" && "text-rose-500 border-rose-500/30 bg-rose-500/10"
                    )}>
                      {chapter.level}
                    </span>
                    <span className="font-mono text-xs text-muted-foreground">
                      {chapter.concepts.length} Concept{chapter.concepts.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {chapter.title}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                    {chapter.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/60 space-y-1.5">
                    {chapter.concepts.map(concept => (
                      <div key={concept.id} className="flex items-center gap-2 text-xs text-foreground/80 font-mono">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                        <span className="truncate">{concept.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted-foreground">Interactive Workspace</span>
                  <Link
                    href="/programs/python/course"
                    className="inline-flex items-center gap-1 text-xs font-mono text-primary font-semibold group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>Study Chapter</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ ENTERPRISE PRODUCTION PROJECTS SECTION ════════ */}
      <section className="py-20 border-b border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-2">
              Capstone Engineering
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Production Enterprise Projects
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
              Move beyond basic scripting. Architect systems capable of handling 25k+ WebSocket req/sec, distributed background task queues, and dynamic GPU tensor batching.
            </p>
          </div>

          {/* Project Tabs */}
          <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
            {PYTHON_ENTERPRISE_PROJECTS.map(proj => (
              <button
                key={proj.id}
                onClick={() => setActiveProjectTab(proj.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer",
                  activeProjectTab === proj.id
                    ? "bg-primary text-primary-foreground font-bold shadow-xs"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                {proj.title}
              </button>
            ))}
          </div>

          {/* Active Project Deep Dive Card */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 lg:p-10 space-y-8 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border pb-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full border border-rose-500/40 bg-rose-500/10 text-rose-500 font-mono text-xs font-bold uppercase">
                    {activeProject.difficulty}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground">Full Architecture Blueprint</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
                  {activeProject.title}
                </h3>
                <p className="text-sm font-mono text-primary mt-1">
                  {activeProject.tagline}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 max-w-md">
                {activeProject.techStack.map(tech => (
                  <span key={tech} className="px-2.5 py-1 rounded-lg border border-border bg-secondary/50 text-[11px] font-mono text-foreground">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-sm sm:text-base text-foreground/90 leading-relaxed max-w-4xl">
              {activeProject.overview}
            </p>

            {/* Architecture Flow Diagram Box */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-semibold">
                Distributed Architecture Flow
              </span>
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-[#181715] dark:bg-[#141413] p-5 font-mono text-xs text-[#ea580c] overflow-x-auto shadow-inner leading-relaxed">
                <pre>{activeProject.architectureFlow}</pre>
              </div>
            </div>

            {/* Architectural Modules */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {activeProject.modules.map((mod, i) => (
                <div key={i} className="p-5 rounded-2xl border border-border/80 bg-secondary/20 space-y-2">
                  <span className="font-mono text-xs font-bold text-primary block">
                    Module 0{i + 1}: {mod.name}
                  </span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {mod.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Code Implementation Preview */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider block font-semibold">
                  Core Production Implementation Snippet ({activeProject.snippet.filename})
                </span>
                <span className="text-[11px] font-mono text-primary font-bold">Python 3.12+</span>
              </div>
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-[#181715] dark:bg-[#141413] p-5 font-mono text-xs text-[#ea580c] overflow-x-auto shadow-inner leading-relaxed">
                <pre><code>{activeProject.snippet.code}</code></pre>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ════════ CURATED BOOKS & OFFICIAL SPECS SECTION ════════ */}
      <section className="py-20 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block mb-2">
              Authoritative Reference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Curated Books &amp; Official PEP Specifications
            </h2>
            <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
              True software mastery requires drinking from the primary source. Curated canonical books, official Python PEP specifications, and architecture manuals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PYTHON_BOOKS_AND_PDFS.map((book, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/40 transition-all shadow-xs space-y-6 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary font-bold">
                      {book.type}
                    </span>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs font-mono text-primary mt-0.5">
                      {book.author} &middot; <span className="text-muted-foreground">{book.role}</span>
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-border/60">
                    <span className="text-[10px] font-mono uppercase text-muted-foreground font-semibold block">
                      Core Engineering Invariants:
                    </span>
                    {book.takeaways.map((takeaway, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-foreground/80">
                        <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                        <span>{takeaway}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href={book.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-between pt-3 border-t border-border text-xs font-mono text-primary hover:underline font-semibold"
                >
                  <span>Read Specification</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ DIAGNOSTIC PLACEMENT QUIZ SECTION ════════ */}
      <section id="placement-quiz" className="py-20 border-b border-border bg-secondary/10">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
              Skill Calibration
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Diagnostic Placement Quiz
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Answer these 6 core conceptual questions to calibrate your knowledge and identify your optimal starting tier (Beginner, Intermediate, or Hard).
            </p>
          </div>

          <div className="space-y-6">
            {PYTHON_DIAGNOSTIC_QUIZ.map((q, idx) => (
              <div key={q.id} className="rounded-3xl border border-border bg-card p-6 sm:p-7 space-y-4 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-primary font-bold">
                    Question 0{idx + 1} of 0{PYTHON_DIAGNOSTIC_QUIZ.length}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-border bg-secondary text-muted-foreground">
                    Target: {q.level}
                  </span>
                </div>

                <h4 className="font-serif text-base sm:text-lg font-medium text-foreground">
                  {q.question}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = quizAnswers[q.id] === optIdx
                    const isCorrect = q.correctIndex === optIdx
                    const showSuccess = quizSubmitted && isCorrect
                    const showError = quizSubmitted && isSelected && !isCorrect

                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectQuizOption(q.id, optIdx)}
                        className={cn(
                          "p-3.5 rounded-2xl border text-left text-xs font-mono transition-all cursor-pointer flex items-center justify-between",
                          isSelected && !quizSubmitted && "border-primary bg-primary/10 ring-1 ring-primary font-bold",
                          showSuccess && "border-primary bg-primary/15 text-primary font-bold",
                          showError && "border-rose-500 bg-rose-500/15 text-rose-600 dark:text-rose-400 font-bold",
                          !isSelected && !quizSubmitted && "border-border/80 bg-secondary/30 hover:bg-secondary/70 text-foreground"
                        )}
                      >
                        <span>{opt}</span>
                        {showSuccess && <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />}
                        {showError && <HelpCircle className="h-4 w-4 text-rose-500 shrink-0" />}
                      </button>
                    )
                  })}
                </div>

                {quizSubmitted && (
                  <div className="p-3.5 rounded-xl bg-secondary/50 border border-border text-xs text-muted-foreground leading-relaxed pt-2">
                    <strong className="text-foreground">Formal Explanation: </strong>
                    {q.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Quiz Action Bar & Result */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
            {!quizSubmitted ? (
              <>
                <div>
                  <span className="font-serif text-lg font-medium text-foreground block">
                    Ready to Evaluate Your Standing?
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {Object.keys(quizAnswers).length} of {PYTHON_DIAGNOSTIC_QUIZ.length} questions answered
                  </span>
                </div>
                <button
                  disabled={Object.keys(quizAnswers).length < PYTHON_DIAGNOSTIC_QUIZ.length}
                  onClick={() => setQuizSubmitted(true)}
                  className="rounded-full bg-primary hover:bg-primary-active disabled:opacity-50 text-primary-foreground px-8 py-3 text-sm font-semibold transition-all cursor-pointer shadow-xs"
                >
                  Submit for Evaluation
                </button>
              </>
            ) : (
              <>
                <div className="space-y-1 text-center sm:text-left">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    <span className="font-serif text-xl font-medium text-foreground">
                      Your Score: {calculateScore()} / {PYTHON_DIAGNOSTIC_QUIZ.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {calculateScore() <= 2 && "Recommendation: Start with Tier 1 (Beginner Foundations). Build solid mechanics on dynamic typing and pointer models."}
                    {calculateScore() >= 3 && calculateScore() <= 4 && "Recommendation: Start with Tier 2 (Intermediate Mastery). Master OOP dunder protocols, MRO, and custom decorators."}
                    {calculateScore() >= 5 && "Recommendation: Jump directly into Tier 3 (Hard / Systems Engineering). Dive into CPython internals, cyclic GC, and high-concurrency Asyncio."}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={resetQuiz}
                    className="p-3 rounded-full border border-border hover:bg-secondary text-foreground text-xs font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    <span>Retake</span>
                  </button>
                  <Link
                    href="/programs/python/course"
                    className="rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-6 py-3 text-sm font-semibold transition-all shadow-xs"
                  >
                    Enter Workspace
                  </Link>
                </div>
              </>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  )
}
