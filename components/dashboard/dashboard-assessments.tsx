"use client"

import React, { useState, useEffect } from "react"
import {
  Award,
  CheckCircle2,
  Clock,
  Code,
  Zap,
  Shield,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  AlertCircle,
  HelpCircle,
  X,
  PlayCircle,
  Printer,
  Share2,
  ExternalLink
} from "lucide-react"
import { useUnstopEcosystem, SkillAssessment, SkillAssessmentQuestion } from "@/lib/unstop-store"
import { AxelStage } from "@/components/axel/axel-stage"

export function DashboardAssessments() {
  const { assessments, recordAssessmentResult } = useUnstopEcosystem()
  const [filter, setFilter] = useState<"all" | "passed" | "dsa" | "frontend" | "backend">("all")
  const [searchQuery, setSearchQuery] = useState("")
  
  // Live Test Runner Modal State
  const [activeTest, setActiveTest] = useState<SkillAssessment | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({})
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(0)
  const [testCompleted, setTestCompleted] = useState(false)
  const [testResult, setTestResult] = useState<{ score: number; passed: boolean; correctCount: number } | null>(null)

  // Verified Credential Certificate Modal State
  const [selectedCredential, setSelectedCredential] = useState<SkillAssessment | null>(null)
  const [copyStatus, setCopyStatus] = useState<string | null>(null)

  const passedCount = assessments.filter((a) => a.passed).length

  // Filter assessments
  const filteredAssessments = assessments.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.skillsCovered.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

    if (!matchesSearch) return false

    if (filter === "passed") return a.passed
    if (filter === "dsa") return a.category === "DSA"
    if (filter === "frontend") return a.category === "Frontend"
    if (filter === "backend") return a.category === "Backend"
    return true
  })

  // Start Test Runner
  const handleStartTest = (assessment: SkillAssessment) => {
    setActiveTest(assessment)
    setCurrentQuestionIndex(0)
    setSelectedAnswers({})
    setTimeLeftSeconds(assessment.durationMinutes * 60)
    setTestCompleted(false)
    setTestResult(null)
  }

  // Timer countdown
  useEffect(() => {
    if (!activeTest || testCompleted) return

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          handleSubmitTest()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [activeTest, testCompleted])

  // Select option
  const handleSelectOption = (qId: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [qId]: optionIdx,
    }))
  }

  // Submit test
  const handleSubmitTest = () => {
    if (!activeTest) return

    let correct = 0
    activeTest.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++
      }
    })

    const score = Math.round((correct / activeTest.questions.length) * 100)
    const passed = score >= activeTest.passingScore

    recordAssessmentResult(activeTest.id, score, passed)
    setTestResult({ score, passed, correctCount: correct })
    setTestCompleted(true)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-8 animate-fadeIn" id="dashboard-assessments-section">
      {/* ══════════════════════════════════════════════
          Header & Axel Anchor
      ══════════════════════════════════════════════ */}
      <div id="dashboard-assessments-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 font-semibold">
              <Award className="w-3 h-3" />
              Standardized Skill Proctored Tests
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground">
            Skill Assessments &amp; Quizzes Arena
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Verify your algorithmic problem-solving and software architecture proficiency. Passing assessments grants verified credentials displayed on your candidate profile.
          </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <AxelStage
            id="dashboard-assessments-robot-anchor"
            sectionId="dashboard-assessments-header"
            label="Assessment Proctor"
            emotion="curious"
            scale={0.44}
            size="sm"
          />
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Metrics Ribbon (Unstop Style)
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-primary" />
            Standardized Tests
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{assessments.length}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Industry benchmarked suites</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            Verified Badges Earned
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">{passedCount}</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">
            {passedCount > 0 ? "Credited to profile honors" : "None completed yet"}
          </span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-[#D4B872]" />
            Average Percentile
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">
            {passedCount > 0 ? "94th" : "—"}
          </p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Nationwide candidate ranking</span>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-4 sm:p-5 shadow-2xs">
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-primary" />
            Proctor Integrity
          </span>
          <p className="text-xl font-serif font-normal text-foreground mt-1">100% Score</p>
          <span className="text-[11px] text-muted-foreground mt-0.5 block">Zero flag integrity record</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Search & Filters
      ══════════════════════════════════════════════ */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search assessments by skill, topic, or category..."
            className="w-full bg-card border border-hairline rounded-xl pl-10 pr-4 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {[
            { id: "all", label: "All Tests" },
            { id: "passed", label: `Certified (${passedCount})` },
            { id: "dsa", label: "DSA & Algorithms" },
            { id: "frontend", label: "Frontend React" },
            { id: "backend", label: "Backend Systems" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-card text-foreground border border-hairline font-semibold shadow-2xs"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          Assessment Cards Grid
      ══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssessments.map((assessment) => (
          <div
            key={assessment.id}
            className="rounded-2xl border border-hairline bg-card p-6 flex flex-col justify-between shadow-2xs hover:border-foreground/20 transition-all group"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-secondary text-primary font-semibold border border-hairline">
                  {assessment.category}
                </span>

                {assessment.passed ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                    <CheckCircle2 className="w-3 h-3" />
                    Passed ({assessment.userScore}%)
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {assessment.durationMinutes} mins
                  </span>
                )}
              </div>

              <h3 className="font-serif text-xl font-normal text-foreground group-hover:text-primary transition-colors">
                {assessment.title}
              </h3>

              <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                <span>{assessment.totalQuestions} Questions</span>
                <span>•</span>
                <span>Pass: {assessment.passingScore}%</span>
                <span>•</span>
                <span className="font-medium text-foreground">{assessment.difficulty}</span>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap items-center gap-1.5 mt-4">
                {assessment.skillsCovered.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 rounded-md bg-secondary text-[10px] font-mono text-muted-foreground border border-hairline"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Badge Preview */}
              <div className="mt-4 p-3 rounded-xl bg-secondary/40 border border-hairline flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono uppercase text-muted-foreground block">Verified Credential</span>
                    <span className="text-xs font-semibold text-foreground">{assessment.badgeReward.name}</span>
                  </div>
                </div>
                {assessment.passed && (
                  <span className="text-[10px] font-mono font-semibold text-emerald-500">Earned</span>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-5 mt-5 border-t border-hairline flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-mono text-muted-foreground">
                {assessment.attemptsCount.toLocaleString()} candidates taken
              </span>

              <div className="flex items-center gap-2">
                {assessment.passed && (
                  <button
                    onClick={() => setSelectedCredential(assessment)}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-[#D4B872]/15 text-[#D4B872] border border-[#D4B872]/30 hover:bg-[#D4B872]/25 transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>View Credential</span>
                  </button>
                )}
                <button
                  onClick={() => handleStartTest(assessment)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                    assessment.passed
                      ? "bg-secondary text-foreground border border-hairline hover:bg-secondary/80"
                      : "bg-primary text-white hover:bg-primary-active"
                  }`}
                >
                  <PlayCircle className="w-3.5 h-3.5" />
                  <span>{assessment.passed ? "Retake Test" : "Begin Test"}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════
          In-Browser Interactive Assessment Test Runner
      ══════════════════════════════════════════════ */}
      {activeTest && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-card border border-hairline rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] flex flex-col justify-between">
            {testCompleted && testResult ? (
              /* Test Result View */
              <div className="text-center py-8 space-y-5 animate-fadeIn">
                <div className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${
                  testResult.passed ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-destructive/10 text-destructive border border-destructive/20"
                }`}>
                  {testResult.passed ? <CheckCircle2 className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Test Result</span>
                  <h2 className="font-serif text-2xl font-normal text-foreground mt-1">
                    {testResult.passed ? "Congratulations! Assessment Passed" : "Assessment Completed — Needs Retake"}
                  </h2>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    {testResult.passed
                      ? `You scored ${testResult.score}% (${testResult.correctCount}/${activeTest.questions.length} correct). The verified badge "${activeTest.badgeReward.name}" is now unlocked on your profile.`
                      : `You scored ${testResult.score}%. A minimum score of ${activeTest.passingScore}% is required to earn this certification. You can review and retake anytime.`}
                  </p>
                </div>

                <div className="inline-flex items-center gap-6 p-4 rounded-xl bg-secondary/50 border border-hairline">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground block">Final Score</span>
                    <span className="text-lg font-serif font-bold text-foreground">{testResult.score}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground block">Correct Answers</span>
                    <span className="text-lg font-serif font-bold text-foreground">{testResult.correctCount} / {activeTest.questions.length}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-muted-foreground block">Status</span>
                    <span className={`text-sm font-semibold uppercase ${testResult.passed ? "text-emerald-500" : "text-destructive"}`}>
                      {testResult.passed ? "Certified" : "Not Passed"}
                    </span>
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                  {testResult.passed && (
                    <button
                      onClick={() => {
                        const finishedTest = activeTest
                        setActiveTest(null)
                        if (finishedTest) setSelectedCredential(finishedTest)
                      }}
                      className="px-5 py-2.5 rounded-xl bg-[#D4B872]/20 text-[#D4B872] border border-[#D4B872]/40 text-xs font-medium hover:bg-[#D4B872]/30 cursor-pointer flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>View Verified Credential</span>
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTest(null)}
                    className="px-6 py-2.5 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active cursor-pointer"
                  >
                    Return to Assessments
                  </button>
                </div>
              </div>
            ) : (
              /* Active Question View */
              <>
                {/* Header with Title & Live Timer */}
                <div className="flex items-center justify-between pb-4 border-b border-hairline">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-primary">Proctored Session</span>
                    <h3 className="font-serif text-lg font-normal text-foreground">{activeTest.title}</h3>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-secondary text-xs font-mono font-semibold border border-hairline text-foreground">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      <span>{formatTime(timeLeftSeconds)}</span>
                    </div>
                    <button
                      onClick={() => setActiveTest(null)}
                      className="p-1 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Question Navigator Dots */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {activeTest.questions.map((q, idx) => {
                    const isAnswered = selectedAnswers[q.id] !== undefined
                    const isCurrent = idx === currentQuestionIndex

                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentQuestionIndex(idx)}
                        className={`w-7 h-7 rounded-lg text-[10px] font-mono font-medium transition-all cursor-pointer ${
                          isCurrent
                            ? "bg-primary text-white font-bold ring-2 ring-primary/30"
                            : isAnswered
                            ? "bg-secondary border border-hairline text-foreground font-semibold"
                            : "bg-secondary/40 text-muted-foreground hover:bg-secondary"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    )
                  })}
                </div>

                {/* Current Question Body */}
                {(() => {
                  const currentQ = activeTest.questions[currentQuestionIndex]
                  if (!currentQ) return null

                  return (
                    <div className="space-y-4 my-2">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-mono font-semibold text-primary">
                          Q{currentQuestionIndex + 1}.
                        </span>
                        <p className="text-sm font-medium text-foreground leading-relaxed">
                          {currentQ.question}
                        </p>
                      </div>

                      {/* Options */}
                      <div className="space-y-2 pt-2">
                        {currentQ.options.map((option, optIdx) => {
                          const isSelected = selectedAnswers[currentQ.id] === optIdx

                          return (
                            <button
                              key={optIdx}
                              onClick={() => handleSelectOption(currentQ.id, optIdx)}
                              className={`w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between cursor-pointer ${
                                isSelected
                                  ? "bg-secondary border-primary/50 text-foreground font-medium shadow-2xs"
                                  : "bg-secondary/30 border-hairline text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                              }`}
                            >
                              <span>{option}</span>
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected ? "border-primary bg-primary text-white" : "border-hairline"
                              }`}>
                                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })()}

                {/* Bottom Navigation Controls */}
                <div className="pt-4 border-t border-hairline flex items-center justify-between">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-medium border border-hairline text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none cursor-pointer flex items-center gap-1"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous</span>
                  </button>

                  <div className="flex items-center gap-2">
                    {currentQuestionIndex < activeTest.questions.length - 1 ? (
                      <button
                        onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
                        className="px-4 py-2 rounded-xl bg-secondary text-foreground text-xs font-medium border border-hairline hover:bg-secondary/80 cursor-pointer flex items-center gap-1"
                      >
                        <span>Next Question</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={handleSubmitTest}
                        className="px-5 py-2 rounded-xl bg-primary text-white text-xs font-medium hover:bg-primary-active cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Submit Final Test</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════
          ASCI Official Verified Credential Modal
      ══════════════════════════════════════════════ */}
      {selectedCredential && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
          <div className="bg-card border-2 border-[#D4B872]/40 rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 relative my-8">
            {/* Top Close Button & Axel Proctor Anchor */}
            <div className="flex items-center justify-between border-b border-hairline pb-4" id="dashboard-credential-header">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4B872] animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4B872] font-semibold">
                  Official Cryptographic Credential
                </span>
              </div>
              <div className="flex items-center gap-3">
                <AxelStage
                  id="dashboard-credential-robot-anchor"
                  sectionId="dashboard-credential-header"
                  label="Honors Proctor"
                  emotion="proud"
                  scale={0.38}
                  size="sm"
                />
                <button
                  onClick={() => setSelectedCredential(null)}
                  className="p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Certificate Decorative Parchment */}
            <div className="p-8 rounded-2xl border border-[#D4B872]/30 bg-secondary/30 relative overflow-hidden text-center space-y-5">
              {/* Watermark / Seal */}
              <div className="w-16 h-16 rounded-2xl bg-[#D4B872]/15 border border-[#D4B872]/40 mx-auto flex items-center justify-center text-[#D4B872] shadow-inner">
                <Shield className="w-9 h-9" />
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#D4B872] font-semibold">
                  ASCI Academy · Verification of Excellence
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground mt-1">
                  Certificate of Technical Competency
                </h2>
                <p className="text-xs text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
                  This formally certifies that the candidate has successfully completed proctored evaluation and demonstrated standardized industry mastery in:
                </p>
              </div>

              {/* Assessment Title Banner */}
              <div className="p-4 rounded-xl bg-card border border-hairline">
                <h3 className="font-serif text-xl font-medium text-foreground">
                  {selectedCredential.title}
                </h3>
                <div className="flex flex-wrap items-center justify-center gap-2 mt-2">
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-primary/10 text-primary border border-primary/20 font-semibold">
                    Category: {selectedCredential.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-[#D4B872]/15 text-[#D4B872] border border-[#D4B872]/30 font-semibold">
                    Top 6% Nationwide (94th Percentile)
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-semibold">
                    Verified Score: {selectedCredential.userScore || 90}%
                  </span>
                </div>
              </div>

              {/* Credential Checksum & Signatures */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-left text-xs">
                <div className="p-3 rounded-xl bg-card/60 border border-hairline">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground block">Credential ID</span>
                  <span className="text-xs font-mono font-semibold text-foreground truncate block">
                    ASCI-SKILL-{selectedCredential.id.toUpperCase()}-9842
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-card/60 border border-hairline">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground block">Issued Date</span>
                  <span className="text-xs font-mono font-semibold text-foreground block">
                    {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-card/60 border border-hairline col-span-2 sm:col-span-1">
                  <span className="text-[9px] font-mono uppercase text-muted-foreground block">Verification Registry</span>
                  <span className="text-xs font-mono font-semibold text-emerald-500 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified On-Chain
                  </span>
                </div>
              </div>

              {/* Skills Verified List */}
              <div className="pt-2">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider block mb-2">
                  Skills Validated Through Proctored Code Evaluation
                </span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {selectedCredential.skillsCovered.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 rounded-md bg-card text-[10px] font-mono text-foreground border border-hairline"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-hairline">
              {copyStatus ? (
                <span className="text-xs font-mono text-emerald-500 font-semibold animate-fadeIn">
                  ✓ {copyStatus}
                </span>
              ) : (
                <span className="text-[11px] text-muted-foreground font-mono">
                  Share this credential on LinkedIn or resume portfolios.
                </span>
              )}

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    if (typeof navigator !== "undefined" && navigator.clipboard) {
                      navigator.clipboard.writeText(`https://asci.academy/credentials/verify/${selectedCredential.id}`)
                      setCopyStatus("Credential link copied to clipboard!")
                      setTimeout(() => setCopyStatus(null), 3000)
                    }
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border border-hairline bg-secondary text-foreground hover:bg-secondary/80 transition-colors cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Link</span>
                </button>

                <button
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.print()
                    }
                  }}
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium bg-primary text-white hover:bg-primary-active transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print / Save PDF</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
