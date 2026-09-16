"use client"

import React, { useState } from "react"
import {
  Code, Play, CheckCircle2, XCircle, Flame, Trophy,
  HelpCircle, ChevronRight, ArrowRight, Clock,
  Terminal, ShieldCheck, Check, RefreshCw,
  Layers, Cpu, Database, BrainCircuit, Sparkles, TrendingUp, GitBranch, Zap
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardPracticeArena() {
  const { potd, solvePOTD, speedQuizzes } = useUnstopEcosystem()
  const [selectedLang, setSelectedLang] = useState<"javascript" | "python" | "java">("javascript")
  const [userCode, setUserCode] = useState(potd.userCode || potd.starterCode.javascript)
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string }[] | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<"graph" | "potd" | "quizzes" | "streak">("graph")

  // Skill Graph Competency Data
  const competencies = [
    {
      id: "data-structures",
      title: "Data Structures & Memory Layout",
      icon: Cpu,
      level: "Advanced",
      mastery: 88,
      modulesCompleted: 18,
      totalModules: 20,
      skills: ["Arrays & Slices", "Red-Black Trees", "Trie & Prefix", "Memory Locality", "Min/Max Heaps"],
    },
    {
      id: "algorithms",
      title: "Algorithms & Graph Theory",
      icon: GitBranch,
      level: "Proficient",
      mastery: 75,
      modulesCompleted: 15,
      totalModules: 20,
      skills: ["Binary Search", "Dynamic Programming", "Dijkstra & A*", "Sliding Window", "Topological Sort"],
    },
    {
      id: "concurrency",
      title: "High-Throughput Concurrency",
      icon: Zap,
      level: "Proficient",
      mastery: 70,
      modulesCompleted: 14,
      totalModules: 20,
      skills: ["Goroutines & Channels", "Thread Pools", "Atomics & CAS", "Deadlock Prevention", "Event Loops"],
    },
    {
      id: "system-design",
      title: "Distributed Architectures",
      icon: Database,
      level: "Intermediate",
      mastery: 65,
      modulesCompleted: 13,
      totalModules: 20,
      skills: ["Raft Consensus", "Consistent Hashing", "Message Queues", "Read Replicas", "Cache Aside"],
    },
    {
      id: "agentic-ai",
      title: "Agentic AI & Neural Systems",
      icon: BrainCircuit,
      level: "Intermediate",
      mastery: 60,
      modulesCompleted: 12,
      totalModules: 20,
      skills: ["Multi-Agent Swarms", "Tool Calling APIs", "Vector Indexing", "RAG Pipelines", "ReAct Loops"],
    },
  ]

  // Speed Quiz state
  const [quizIndex, setQuizIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false)
  const [quizScore, setQuizScore] = useState(0)

  const handleLangChange = (lang: "javascript" | "python" | "java") => {
    setSelectedLang(lang)
    setUserCode(potd.starterCode[lang])
  }

  const handleRunTests = () => {
    setIsRunning(true)
    setTimeout(() => {
      // Simulated sandbox validation across all test cases
      const results = potd.testCases.map((tc) => ({
        passed: true,
        output: tc.expected,
      }))
      setTestResults(results)
      setIsRunning(false)
    }, 750)
  }

  const handleSubmitPOTD = () => {
    handleRunTests()
    setTimeout(() => {
      solvePOTD(userCode)
    }, 800)
  }

  const handleQuizAnswer = (index: number) => {
    if (isAnswerSubmitted) return
    setSelectedAnswer(index)
    setIsAnswerSubmitted(true)
    if (index === speedQuizzes[quizIndex].correctIndex) {
      setQuizScore((prev) => prev + 1)
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("asci-award-xp", { detail: { amount: 50 } }))
      }
    }
  }

  const handleNextQuiz = () => {
    setSelectedAnswer(null)
    setIsAnswerSubmitted(false)
    if (quizIndex < speedQuizzes.length - 1) {
      setQuizIndex((prev) => prev + 1)
    } else {
      setQuizIndex(0)
    }
  }

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-practice-arena-section">
      {/* Header Banner */}
      <div
        className="rounded-2xl border border-hairline bg-card p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden"
        id="dashboard-practice-header"
      >
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
              <Sparkles className="w-3 h-3" />
              Algorithmic &amp; Systems Competency
            </span>
            <span className="text-xs font-mono text-muted-foreground">100-Day Engineering Cadence</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-foreground flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-amber-500" />
            <span>Skill Graph &amp; Practice Arena</span>
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Track your multi-dimensional software engineering mastery across Data Structures, Distributed Systems, Concurrency, and Agentic AI.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <AxelStage
            id="dashboard-practice-arena-robot-anchor"
            sectionId="dashboard-practice-header"
            label="Practice Arena"
            emotion={potd.solved ? "happy" : "curious"}
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* Arena Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-hairline pb-3 gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveTab("graph")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "graph"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Skill Graph Matrix</span>
          </button>
          <button
            onClick={() => setActiveTab("potd")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "potd"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Problem of the Day (POTD)</span>
            {potd.solved && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "quizzes"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CS Fundamentals Speed Quiz</span>
          </button>
          <button
            onClick={() => setActiveTab("streak")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "streak"
                ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-xs"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>100-Day Streak Grid</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>Today&apos;s XP Reward:</span>
          <span className="text-amber-600 dark:text-amber-400 font-semibold">+150 XP</span>
        </div>
      </div>

      {/* TAB 0: SKILL GRAPH COMPETENCY MATRIX */}
      {activeTab === "graph" && (
        <div className="space-y-6">
          {/* Overall Skill Summary Card */}
          <div className="rounded-2xl border border-hairline bg-card p-6 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-1 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-bold">
                  SDE-2 Benchmark: 74% Overall
                </span>
                <span className="text-xs font-mono text-muted-foreground">5 Domains Evaluated</span>
              </div>
              <h2 className="font-serif text-xl font-normal text-foreground">
                Engineering Competency Radar
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Calculated dynamically from solved problems, curriculum assessments, code submissions, and speed quizzes.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => setActiveTab("potd")}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-medium shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Solve Today&apos;s Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 5 Competency Pillars (Simple Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {competencies.map((comp) => {
              const CompIcon = comp.icon
              return (
                <div
                  key={comp.id}
                  className="rounded-2xl border border-hairline bg-card p-5 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="w-10 h-10 rounded-xl bg-secondary border border-hairline flex items-center justify-center text-amber-500">
                        <CompIcon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-medium">
                        {comp.level}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-serif text-base font-medium text-foreground">{comp.title}</h3>
                      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                        <span>Mastery</span>
                        <span className="font-mono font-bold text-foreground">{comp.mastery}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden mt-1.5">
                        <div
                          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"
                          style={{ width: `${comp.mastery}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-hairline">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                        Core Competencies ({comp.modulesCompleted}/{comp.totalModules} Mastered)
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {comp.skills.map((skill, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-hairline text-foreground"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveTab("potd")}
                    className="w-full py-2 rounded-xl bg-secondary hover:bg-secondary/80 border border-hairline text-foreground text-xs font-medium transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Practice Next Module</span>
                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                  </button>
                </div>
              )
            })}

            {/* Target Role Readiness Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-card p-5 flex flex-col justify-between shadow-2xs space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500" />
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                    Target Role Benchmark
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">82% Match</span>
                </div>
                <h3 className="font-serif text-lg font-medium text-foreground">
                  Senior Systems Engineer (L5 / SDE-2)
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your concurrency and data structures exceed the target threshold. Focus on Raft consensus protocols to reach 90%+ interview readiness.
                </p>

                <div className="p-3 rounded-xl bg-secondary/50 border border-hairline space-y-1.5 text-xs">
                  <div className="flex justify-between text-muted-foreground font-mono text-[11px]">
                    <span>Target Interview Readiness</span>
                    <span className="text-foreground font-bold">82 / 100</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: "82%" }} />
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveTab("quizzes")}
                className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-medium shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Take System Design Quiz</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: PROBLEM OF THE DAY */}
      {activeTab === "potd" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Problem Description (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl border border-hairline bg-card p-6 shadow-xs space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-hairline pb-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary">
                  {potd.date}
                </span>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                  {potd.difficulty}
                </span>
              </div>

              <div>
                <h2 className="font-serif text-xl font-normal text-foreground">
                  {potd.title}
                </h2>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {potd.tags.map((t, idx) => (
                    <span key={idx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-hairline text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted-foreground leading-relaxed space-y-3">
                <p>{potd.description}</p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-medium text-foreground block">
                  Example Scenarios:
                </span>
                {potd.examples.map((ex, i) => (
                  <div key={i} className="p-3 rounded-lg bg-secondary/70 border border-hairline text-xs font-mono space-y-1">
                    <div className="text-muted-foreground"><span className="text-foreground font-semibold">Input:</span> {ex.input}</div>
                    <div className="text-primary"><span className="text-foreground font-semibold">Output:</span> {ex.output}</div>
                    {ex.explanation && (
                      <div className="text-[11px] text-muted-foreground/80 font-sans mt-1">{ex.explanation}</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {potd.solved && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="text-xs">
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400">Challenge Completed!</div>
                  <div className="text-muted-foreground text-[11px]">You earned +150 XP and maintained your streak.</div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Code Editor & Test Runner (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-hairline bg-card p-6 shadow-xs space-y-4 flex flex-col justify-between">
            <div>
              {/* Language Toolbar */}
              <div className="flex items-center justify-between border-b border-hairline pb-3 mb-4">
                <div className="flex items-center gap-2">
                  {(["javascript", "python", "java"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLangChange(lang)}
                      className={`text-xs font-mono px-2.5 py-1 rounded transition-colors cursor-pointer ${
                        selectedLang === lang
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang === "javascript" ? "JavaScript" : lang === "python" ? "Python 3" : "Java 21"}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setUserCode(potd.starterCode[selectedLang])}
                  className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset Stub</span>
                </button>
              </div>

              {/* Code Textarea / Editor */}
              <div className="relative rounded-xl border border-hairline bg-secondary/80 overflow-hidden font-mono text-xs">
                <textarea
                  rows={14}
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full bg-transparent p-4 text-foreground focus:outline-none resize-none font-mono text-xs leading-relaxed"
                  spellCheck={false}
                />
              </div>

              {/* Test Cases Preview */}
              {testResults && (
                <div className="mt-4 p-4 rounded-xl bg-secondary/60 border border-hairline space-y-2">
                  <div className="text-xs font-mono font-medium text-foreground flex items-center justify-between">
                    <span>Test Execution Results</span>
                    <span className="text-emerald-600 dark:text-emerald-400">4 / 4 Test Cases Passed</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                    {potd.testCases.map((tc, idx) => (
                      <div key={idx} className="p-2 rounded bg-card border border-hairline flex items-center justify-between">
                        <span className="text-muted-foreground truncate">{tc.input}</span>
                        <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          <span>{tc.expected}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-hairline">
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className="px-4 py-2 rounded-lg border border-hairline bg-secondary text-xs font-medium text-foreground hover:bg-card transition-colors cursor-pointer inline-flex items-center gap-1.5"
              >
                <Play className={`w-3.5 h-3.5 ${isRunning ? "animate-spin" : ""}`} />
                <span>{isRunning ? "Running Sandbox..." : "Run Test Cases"}</span>
              </button>

              <button
                onClick={handleSubmitPOTD}
                disabled={isRunning || potd.solved}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-medium shadow-xs transition-all cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{potd.solved ? "Submitted & Verified" : "Submit & Claim 150 XP"}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SPEED QUIZZES */}
      {activeTab === "quizzes" && (
        <div className="max-w-3xl mx-auto rounded-2xl border border-hairline bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#ea580c]">
                Rapid Round {quizIndex + 1} of {speedQuizzes.length}
              </span>
              <h2 className="font-serif text-xl font-normal text-foreground mt-0.5">
                {speedQuizzes[quizIndex].category} Fundamentals
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-muted-foreground">Score:</span>
              <span className="text-xs font-mono font-semibold text-primary">{quizScore} Correct</span>
            </div>
          </div>

          <div className="text-sm font-medium text-foreground leading-relaxed">
            {speedQuizzes[quizIndex].question}
          </div>

          <div className="space-y-3">
            {speedQuizzes[quizIndex].options.map((option, optIdx) => {
              const isSelected = selectedAnswer === optIdx
              const isCorrect = optIdx === speedQuizzes[quizIndex].correctIndex

              let btnClass = "border-hairline bg-secondary/60 text-muted-foreground hover:text-foreground hover:border-primary/40"
              if (isAnswerSubmitted) {
                if (isCorrect) {
                  btnClass = "border-emerald-500 bg-emerald-500/15 text-foreground font-medium"
                } else if (isSelected) {
                  btnClass = "border-destructive bg-destructive/15 text-foreground font-medium"
                }
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleQuizAnswer(optIdx)}
                  disabled={isAnswerSubmitted}
                  className={`w-full text-left p-4 rounded-xl border text-xs transition-all cursor-pointer flex items-center justify-between gap-4 ${btnClass}`}
                >
                  <span>{option}</span>
                  {isAnswerSubmitted && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-destructive shrink-0" />
                  )}
                </button>
              )
            })}
          </div>

          {isAnswerSubmitted && (
            <div className="p-4 rounded-xl bg-secondary/80 border border-hairline text-xs space-y-2 animate-fadeIn">
              <span className="font-mono text-primary font-semibold block">Architectural Explanation:</span>
              <p className="text-muted-foreground leading-relaxed">
                {speedQuizzes[quizIndex].explanation}
              </p>
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuiz}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-medium shadow-xs transition-all cursor-pointer inline-flex items-center gap-1"
                >
                  <span>{quizIndex < speedQuizzes.length - 1 ? "Next Question" : "Restart Quiz"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: STREAK GRID */}
      {activeTab === "streak" && (
        <div className="rounded-2xl border border-hairline bg-card p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-hairline pb-4">
            <div>
              <h2 className="font-serif text-xl font-normal text-foreground flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-500" />
                <span>ASCI 100-Day Engineering Cadence</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Consistent algorithmic problem solving compounds into tier-1 tech mastery.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20 font-bold">
                Day 42 Active Streak
              </span>
            </div>
          </div>

          {/* Heatmap Grid Simulator */}
          <div className="space-y-3">
            <span className="text-xs font-mono text-muted-foreground block">
              Recent 12 Weeks Submission Activity
            </span>
            <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto p-2 rounded-xl bg-secondary/50 border border-hairline">
              {Array.from({ length: 84 }).map((_, i) => {
                const isActive = (i * 7 + 3) % 4 !== 0
                return (
                  <div
                    key={i}
                    className={`w-3.5 h-3.5 rounded-xs transition-colors ${
                      isActive
                        ? "bg-gradient-to-tr from-amber-500 to-orange-500 shadow-2xs"
                        : "bg-secondary border border-hairline/60"
                    }`}
                    title={`Day ${i + 1}: ${isActive ? "Solved POTD (+150 XP)" : "Rest day"}`}
                  />
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
