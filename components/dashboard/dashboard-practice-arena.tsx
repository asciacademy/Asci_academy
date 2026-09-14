"use client"

import React, { useState } from "react"
import {
  Code, Play, CheckCircle2, XCircle, Flame, Trophy,
  HelpCircle, ChevronRight, ArrowRight, Clock,
  Terminal, ShieldCheck, Check, RefreshCw
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardPracticeArena() {
  const { potd, solvePOTD, speedQuizzes } = useUnstopEcosystem()
  const [selectedLang, setSelectedLang] = useState<"javascript" | "python" | "java">("javascript")
  const [userCode, setUserCode] = useState(potd.userCode || potd.starterCode.javascript)
  const [testResults, setTestResults] = useState<{ passed: boolean; output: string }[] | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [activeTab, setActiveTab] = useState<"potd" | "quizzes" | "streak">("potd")

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
            <span className="badge-coral text-[10px]">Unstop Daily Practice</span>
            <span className="text-xs font-mono text-muted-foreground">100-Day Algorithmic Streak</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal text-foreground flex items-center gap-2.5">
            <Code className="w-6 h-6 text-primary" />
            <span>Daily Problem of the Day &amp; Speed Quizzes</span>
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Sharpen algorithmic intuition, solve daily interview problems, and climb the ASCI national leaderboard.
            Every solved problem awards verified XP and reinforces high-concurrency memory layouts.
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
      <div className="flex items-center justify-between border-b border-hairline pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("potd")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "potd"
                ? "bg-primary text-primary-foreground font-semibold"
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
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "quizzes"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>CS Fundamentals Speed Quiz</span>
          </button>
          <button
            onClick={() => setActiveTab("streak")}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === "streak"
                ? "bg-primary text-primary-foreground font-semibold"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-[#ea580c]" />
            <span>100-Day Streak Grid</span>
          </button>
        </div>

        <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span>Today&apos;s XP Reward:</span>
          <span className="text-[#ea580c] font-semibold">+150 XP</span>
        </div>
      </div>

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
                className="btn-primary text-xs px-5 py-2 cursor-pointer inline-flex items-center gap-1.5 disabled:opacity-50"
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
                  className="btn-primary text-xs px-4 py-1.5 cursor-pointer inline-flex items-center gap-1"
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
                <Flame className="w-5 h-5 text-[#ea580c]" />
                <span>ASCI 100-Day Engineering Cadence</span>
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Consistent algorithmic problem solving compounds into tier-1 tech mastery.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="badge-coral text-xs">Day 42 Active Streak</span>
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
                        ? "bg-primary/80 hover:bg-primary"
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
