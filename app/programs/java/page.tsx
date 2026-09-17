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
  javaCourseCurriculum,
  javaCourseInfo,
  JAVA_BOOKS_AND_PDFS,
  JAVA_ENTERPRISE_PROJECTS,
  JAVA_DIAGNOSTIC_QUIZ,
  CourseLevel,
  Part,
  Chapter
} from "@/lib/java-course-data"
import { cn } from "@/lib/utils"
import {
  JvmPipelineFlowchart,
  MemoryModelFlowchart,
  HashMapTreeifyFlowchart
} from "@/components/curriculum/visual-flowchart"

export default function JavaMasterLandingPage() {
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel | "All">("All")
  const [activeProjectTab, setActiveProjectTab] = useState(JAVA_ENTERPRISE_PROJECTS[0].id)
  
  // Placement Quiz State
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})
  const [quizSubmitted, setQuizSubmitted] = useState(false)

  // Filter parts / chapters based on level tab
  const filteredParts = selectedLevel === "All"
    ? javaCourseCurriculum
    : javaCourseCurriculum.filter(p => p.level === selectedLevel)

  const allChapters = filteredParts.flatMap(p => p.chapters)

  const handleSelectQuizOption = (questionId: string, optionIdx: number) => {
    if (quizSubmitted) return
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIdx }))
  }

  const calculateScore = () => {
    let score = 0
    JAVA_DIAGNOSTIC_QUIZ.forEach(q => {
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

  const activeProject = JAVA_ENTERPRISE_PROJECTS.find(p => p.id === activeProjectTab) || JAVA_ENTERPRISE_PROJECTS[0]

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
                <span>3-Tier Master Curriculum • Beginner to Advanced</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.1]">
                Java Software Engineering &amp; <br className="hidden sm:inline" />
                <span className="italic font-serif text-primary">Systems Architecture</span>
              </h1>

              <p className="mt-6 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                A rigorous, full-stack roadmap divided into three distinct skill tiers: from machine foundations, Stack vs. Heap memory, and OOP pillars to JVM internals, G1/ZGC collectors, distributed Spring microservices, and classical literature.
              </p>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/programs/java/course"
                  className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-8 py-3.5 text-sm font-semibold transition-all shadow-sm"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Launch Course Workspace</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <a
                  href="#placement-quiz"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-secondary text-foreground px-6 py-3.5 text-sm font-medium transition-all"
                >
                  <HelpCircle className="h-4 w-4 text-primary" />
                  <span>Diagnostic Quiz</span>
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card hover:bg-secondary text-foreground px-6 py-3.5 text-sm font-medium transition-all"
                >
                  <Server className="h-4 w-4 text-primary" />
                  <span>Enterprise Projects</span>
                </a>
              </div>

              {/* Badges */}
              <div className="mt-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start text-xs font-mono text-muted-foreground">
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  Java 21 LTS Standard
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  21 Structured Chapters
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-2.5 py-1">
                  <Award className="h-3.5 w-3.5 text-blue-500" />
                  Zero Pop-up Cards
                </span>
              </div>
            </div>

            {/* Right: Tier Breakdown Card */}
            <div className="w-full max-w-md">
              <div className="rounded-3xl border border-border bg-card p-7 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between pb-5 border-b border-border">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold block">Track Structure</span>
                    <h3 className="font-serif text-lg font-medium text-foreground">3 Progressive Skill Levels</h3>
                  </div>
                  <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-3 py-0.5 text-xs font-mono font-medium">
                    100% Free
                  </span>
                </div>

                <div className="space-y-3 py-5">
                  {[
                    {
                      name: "1. Beginner (Basics & Machine)",
                      desc: "JVM Architecture, Datatypes, Control Flow, Methods, Arrays, Strings & String Pool, Recursion.",
                      color: "border-l-primary"
                    },
                    {
                      name: "2. Intermediate (OOPs & Concurrency)",
                      desc: "4 Pillars of OOP, Exception Safety, Generics, Collections & HashMap Internals, Virtual Threads.",
                      color: "border-l-indigo-500"
                    },
                    {
                      name: "3. Hard (JVM Internals & Projects)",
                      desc: "Metaspace & ClassLoaders, G1/ZGC, Spring Boot Microservices, 3 Real Projects, Books & PDFs.",
                      color: "border-l-primary"
                    },
                  ].map((level, i) => (
                    <div key={i} className={cn("rounded-xl border border-border/80 bg-background/60 p-3.5 border-l-4", level.color)}>
                      <span className="text-xs font-semibold text-foreground block font-mono">{level.name}</span>
                      <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{level.desc}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-muted-foreground">
                  <span>75+ In-Depth Lessons</span>
                  <Link href="/programs/java/course" className="text-primary hover:underline flex items-center gap-1 font-medium">
                    <span>Open Workspace</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ════════ INTERACTIVE LEVEL SELECTOR & ROADMAP ════════ */}
      <section className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-2">Curriculum Roadmap</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
                Explore Curriculum by Experience Tier
              </h2>
            </div>

            {/* Level Switcher Tabs */}
            <div className="flex items-center gap-1.5 p-1.5 rounded-2xl border border-border bg-card shadow-xs">
              {(["All", "Beginner", "Intermediate", "Hard"] as const).map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer",
                    selectedLevel === lvl
                      ? "bg-primary text-primary-foreground shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  )}
                >
                  {lvl === "All" ? "All Levels (21 Ch)" : lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Level Info Banner */}
          {selectedLevel !== "All" && (
            <div className="mb-10 rounded-2xl border border-primary/30 bg-primary/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
                  Tier Focus: {selectedLevel}
                </span>
                <h3 className="font-serif text-xl font-normal text-foreground mt-0.5">
                  {selectedLevel === "Beginner" && "Foundational Machine Mechanics & Syntax Mastery"}
                  {selectedLevel === "Intermediate" && "Object-Oriented Architecture, Collections & Concurrency"}
                  {selectedLevel === "Hard" && "JVM Internals, Enterprise Systems & Production Projects"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
                  {selectedLevel === "Beginner" && "Ideal for programmers starting Java or engineers transitioning from Python/JS wanting an exact understanding of memory and typing."}
                  {selectedLevel === "Intermediate" && "Ideal for developers building backend applications, preparing for technical coding interviews, and mastering multithreading."}
                  {selectedLevel === "Hard" && "Targeted at Staff/Senior engineers building low-latency distributed systems, tuning garbage collection, and reading classical specs."}
                </p>
              </div>
              <Link
                href="/programs/java/course"
                className="shrink-0 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-5 py-2.5 text-xs font-semibold transition-all"
              >
                Launch {selectedLevel}
              </Link>
            </div>
          )}

          {/* Chapters Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allChapters.map((chapter, i) => {
              const levelColor = chapter.level === "Beginner" 
                ? "text-primary border-primary/30 bg-primary/10" 
                : chapter.level === "Intermediate"
                ? "text-indigo-500 border-indigo-500/30 bg-indigo-500/10"
                : "text-rose-500 border-rose-500/30 bg-rose-500/10"

              return (
                <Link
                  href="/programs/java/course"
                  key={chapter.id}
                  className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-6 text-left transition-all hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={cn("px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase font-semibold", levelColor)}>
                        {chapter.level}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {chapter.concepts.length} Concept{chapter.concepts.length > 1 ? "s" : ""}
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                      {chapter.title}
                    </h3>

                    {chapter.summary && (
                      <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {chapter.summary}
                      </p>
                    )}

                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {chapter.concepts.slice(0, 3).map(c => (
                        <span key={c.id} className="text-[10px] font-mono text-muted-foreground/80 bg-secondary/50 px-2 py-0.5 rounded-md">
                          {c.title.split(":")[0].split("&")[0]}
                        </span>
                      ))}
                      {chapter.concepts.length > 3 && (
                        <span className="text-[10px] font-mono text-muted-foreground/60 px-1 py-0.5">
                          +{chapter.concepts.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-medium text-primary">
                    <span>Study Chapter</span>
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              )
            })}
          </div>

        </div>
      </section>

      {/* ════════ VISUAL ARCHITECTURAL SCHEMATICS & FLOWCHARTS ════════ */}
      <section className="py-16 lg:py-24 border-b border-border bg-card/30">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-3">Architectural Mental Models</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Understand How Java Works Under the Hood
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              No hand-waving or magic. Visual flowcharts breaking down the compilation lifecycle, JVM memory partitions, and HashMap collision resolution.
            </p>
          </div>

          <div className="space-y-10">
            <JvmPipelineFlowchart />
            <div className="grid gap-8 lg:grid-cols-2">
              <MemoryModelFlowchart />
              <HashMapTreeifyFlowchart />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ REAL-WORLD ENTERPRISE PROJECTS SHOWCASE ════════ */}
      <section id="projects" className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-3">Hard Tier • Capstone Engineering</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Production-Grade Enterprise Projects
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Move beyond toy console apps. Architect systems capable of handling 50k+ req/sec, zero-copy network protocols, and distributed rate-limiting algorithms.
            </p>
          </div>

          {/* Project Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {JAVA_ENTERPRISE_PROJECTS.map(proj => (
              <button
                key={proj.id}
                onClick={() => setActiveProjectTab(proj.id)}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-2",
                  activeProjectTab === proj.id
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                <Server size={13} />
                <span>{proj.title.split(":")[0].split("&")[0]}</span>
              </button>
            ))}
          </div>

          {/* Active Project Card */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-lg space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-primary uppercase font-semibold mb-1">
                  <span>{activeProject.badge}</span>
                  <span>•</span>
                  <span>{activeProject.estimatedHours}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
                  {activeProject.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-xs font-mono font-medium text-primary self-start md:self-auto">
                {activeProject.domain}
              </span>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {activeProject.overview}
            </p>

            {/* Architecture Flow */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                <Binary size={14} className="text-primary" />
                <span>Distributed Architecture Flow</span>
              </h4>
              <div className="rounded-2xl border border-border bg-[#181715] p-5 font-mono text-xs text-blue-400 overflow-x-auto shadow-inner leading-relaxed">
                <pre>{activeProject.architectureFlow}</pre>
              </div>
            </div>

            {/* Core Modules Bento */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                <Layers size={14} className="text-primary" />
                <span>Core Architectural Modules</span>
              </h4>
              <div className="grid gap-4 sm:grid-cols-3">
                {activeProject.coreModules.map((mod, mIdx) => (
                  <div key={mIdx} className="rounded-2xl border border-border bg-secondary/30 p-5 space-y-2">
                    <span className="text-xs font-semibold text-foreground font-mono block">{mod.name}</span>
                    <span className="text-[10px] font-mono text-primary block">{mod.tech}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{mod.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Code Preview */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-2">
                <Code2 size={14} className="text-primary" />
                <span>Core Production Implementation Snippet</span>
              </h4>
              <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-[#181715] dark:bg-[#141413] overflow-hidden text-slate-200 font-mono text-xs shadow-md">
                <div className="px-4 py-2.5 border-b border-border/70 dark:border-white/10 bg-[#141413]/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                    <span className="ml-2 font-mono text-[11px] text-muted-foreground">production_blueprint.java</span>
                  </div>
                  <span className="text-[10px] font-mono text-primary font-semibold">Java 21 LTS</span>
                </div>
                <pre className="p-5 overflow-x-auto whitespace-pre leading-relaxed custom-scrollbar text-slate-200">
                  <code>{activeProject.codePreview}</code>
                </pre>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ════════ CURATED REFERENCE BOOKS & OFFICIAL PDF SPECIFICATIONS ════════ */}
      <section className="py-16 lg:py-24 border-b border-border bg-card/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-3">Hard Tier • Literature & Specifications</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Curated Reference Books &amp; Official PDFs
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              True software mastery requires drinking from the primary source. Curated canonical books, official Oracle JVM specifications, and architecture manuals.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {JAVA_BOOKS_AND_PDFS.map((book) => (
              <div
                key={book.id}
                className="rounded-3xl border border-border bg-card p-6 sm:p-7 flex flex-col justify-between space-y-6 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-[10px] font-mono font-semibold text-primary uppercase">
                      {book.type}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground">{book.level} Tier</span>
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-medium text-foreground leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs text-primary font-mono mt-1">{book.author}</p>
                  </div>

                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {book.description}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-border">
                    <span className="text-[11px] font-mono text-foreground font-medium block">Key Engineering Takeaways:</span>
                    <ul className="space-y-1 text-xs text-muted-foreground list-disc pl-4">
                      {book.keyTakeaways.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="leading-tight">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-[11px] font-mono text-muted-foreground/80 truncate max-w-[180px]">
                    {book.recommendedChapters}
                  </span>
                  <a
                    href={book.specUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline shrink-0"
                  >
                    <span>Read Spec</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ════════ INTERACTIVE DIAGNOSTIC & PLACEMENT QUIZ ════════ */}
      <section id="placement-quiz" className="py-16 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-primary font-semibold block mb-3">Diagnostic Placement Evaluation</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Test Your Java Mastery Level
            </h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Answer 6 multi-level questions spanning Beginner, Intermediate, and Hard concepts to diagnose your starting tier and test your retention.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-lg space-y-8">
            
            {JAVA_DIAGNOSTIC_QUIZ.map((q, qIdx) => {
              const selectedOpt = quizAnswers[q.id]
              const isAnswered = selectedOpt !== undefined

              return (
                <div key={q.id} className="space-y-3 pb-6 border-b border-border last:border-b-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                        {qIdx + 1}
                      </span>
                      <span className="text-xs font-mono text-muted-foreground uppercase font-semibold">
                        {q.level} Level
                      </span>
                    </div>
                    {quizSubmitted && (
                      <span className={cn(
                        "text-xs font-mono font-semibold",
                        selectedOpt === q.correctIndex ? "text-primary font-bold" : "text-destructive"
                      )}>
                        {selectedOpt === q.correctIndex ? "Correct (+1)" : "Incorrect"}
                      </span>
                    )}
                  </div>

                  <p className="text-sm sm:text-base font-medium text-foreground">
                    {q.question}
                  </p>

                  <div className="grid gap-2 sm:grid-cols-2 pt-1">
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedOpt === oIdx
                      const isCorrect = oIdx === q.correctIndex

                      let optClass = "border-border bg-secondary/40 hover:bg-secondary text-foreground"
                      if (quizSubmitted) {
                        if (isCorrect) {
                          optClass = "border-primary/50 bg-primary/10 text-primary font-semibold"
                        } else if (isSelected && !isCorrect) {
                          optClass = "border-destructive/50 bg-destructive/10 text-destructive font-semibold"
                        } else {
                          optClass = "border-border/40 opacity-40"
                        }
                      } else if (isSelected) {
                        optClass = "border-primary bg-primary/10 text-primary font-semibold"
                      }

                      return (
                        <button
                          key={oIdx}
                          disabled={quizSubmitted}
                          onClick={() => handleSelectQuizOption(q.id, oIdx)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl border p-3 text-left text-xs transition-all cursor-pointer",
                            optClass
                          )}
                        >
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-mono font-bold">
                            {String.fromCharCode(65 + oIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      )
                    })}
                  </div>

                  {quizSubmitted && (
                    <div className="rounded-xl border border-primary/20 bg-secondary/40 p-3 text-xs text-muted-foreground space-y-1">
                      <span className="font-semibold text-primary">Technical Analysis:</span>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              )
            })}

            {/* Quiz Submit / Results Bar */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < JAVA_DIAGNOSTIC_QUIZ.length}
                  className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-8 py-3 text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
                >
                  Evaluate Diagnostic Placement ({Object.keys(quizAnswers).length}/{JAVA_DIAGNOSTIC_QUIZ.length} Answered)
                </button>
              ) : (
                <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-serif text-lg font-bold">
                      {calculateScore()} / {JAVA_DIAGNOSTIC_QUIZ.length}
                    </div>
                    <div>
                      <span className="text-xs font-mono uppercase text-muted-foreground block">Placement Recommendation:</span>
                      <span className="font-serif text-base font-semibold text-foreground">
                        {calculateScore() <= 2 && "Beginner Tier: Start with JVM foundations & syntax"}
                        {calculateScore() >= 3 && calculateScore() <= 4 && "Intermediate Tier: Dive into OOPs, Collections & Concurrency"}
                        {calculateScore() >= 5 && "Hard Tier: You are ready for JVM Internals & Enterprise Projects!"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={resetQuiz}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                  >
                    <RefreshCw size={12} />
                    <span>Retake Quiz</span>
                  </button>
                </div>
              )}
            </div>

          </div>

        </div>
      </section>

      {/* ════════ BOTTOM LAUNCH CTA ════════ */}
      <section className="py-20 bg-card">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground font-normal tracking-tight mb-4">
            Begin Your Full Java Systems Journey
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            All 3 levels, 21 chapters, and 75+ lessons are accessible in a dedicated, full-screen documentation learning workspace with flowcharts, code copy, and instant quizzes.
          </p>
          <Link
            href="/programs/java/course"
            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-8 py-3.5 text-sm font-semibold transition-all shadow-sm"
          >
            <Terminal className="h-4 w-4" />
            <span>Launch Java Workspace</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
