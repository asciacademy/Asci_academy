"use client"

import { useState, useEffect, useMemo, useRef, useCallback } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import CodeMirror from "@uiw/react-codemirror"
import { oneDark } from "@codemirror/theme-one-dark"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { java } from "@codemirror/lang-java"
import {
  Play, Check, CheckCircle2, Circle, ChevronLeft, ChevronRight,
  Code2, RotateCcw, Copy, Bot, Activity, BookOpen, FileText, History,
  ListFilter, ExternalLink, Youtube, ArrowRight, Terminal, X,
  Trophy, AlertCircle, Clock, Cpu, HelpCircle, ChevronDown, Share2, Eye, Lightbulb, Sparkles
} from "lucide-react"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"
import {
  ProblemDetail,
  ProblemDifficulty,
  getAdjacentProblems,
  ALL_PROBLEMS,
} from "@/lib/dsa/problem-catalog"
import { executeCode, RunResult, SingleTestResult } from "@/lib/dsa/code-runner"
import { ProblemListDrawer } from "./problem-list-drawer"
import { ProblemVisualizer } from "./problem-visualizer"
import { AxelTutorDrawer } from "./axel-tutor-drawer"
import { EditorStatusBar } from "./editor-status-bar"
import { TestOutputDiff } from "./test-output-diff"
import { SolutionShareModal } from "./solution-share-modal"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const STORAGE_SOLVED_KEY = "asci_a2z_solved_v1"

type SupportedLanguage = "javascript" | "typescript" | "python" | "java" | "cpp"

interface SubmissionRecord {
  id: string
  timestamp: number
  language: SupportedLanguage
  status: "ACCEPTED" | "WRONG_ANSWER" | "COMPILE_ERROR" | "RUNTIME_ERROR"
  runtimeMs: number
  memoryMB: number
  testsPassed: number
  totalTests: number
}

interface ProblemSolverProps {
  initialProblem: ProblemDetail
}

export function ProblemSolver({ initialProblem }: ProblemSolverProps) {
  const router = useRouter()
  const pathname = usePathname()
  const problem = initialProblem

  // Helper to preserve URL style (1-based numerical index, slug, or legacy id)
  const getTargetUrl = useCallback((targetProb: ProblemDetail | null) => {
    if (!targetProb) return ""
    // Check if current URL ends with a numeric index (e.g. /dsa/problems/1)
    const isNumericRoute = /\/dsa\/problems\/\d+$/.test(pathname || "")
    if (isNumericRoute) {
      return `/dsa/problems/${targetProb.index + 1}`
    }
    // Check if current URL uses slug
    if (targetProb.slug && pathname?.includes(problem.slug)) {
      return `/dsa/problems/${targetProb.slug}`
    }
    return `/dsa/problems/${targetProb.id}`
  }, [pathname, problem.slug])

  // Adjacent problems for Prev/Next navigation
  const adjacent = useMemo(() => {
    return getAdjacentProblems(problem.id)
  }, [problem.id])

  // Solved state
  const [solvedIds, setSolvedIds] = useState<Set<string>>(new Set())
  const isSolved = solvedIds.has(problem.id)

  // Language & Code Editor State
  const [language, setLanguage] = useState<SupportedLanguage>("javascript")
  const [code, setCode] = useState<string>(() => {
    return problem.starterCode.javascript
  })
  const [fontSize, setFontSize] = useState<number>(14)

  // Left panel tabs
  const [leftTab, setLeftTab] = useState<"description" | "visualizer" | "editorial" | "submissions">("description")

  // Console Tabs & Testcase state
  const [consoleTab, setConsoleTab] = useState<"testcase" | "testresult">("testcase")
  const [selectedCaseIdx, setSelectedCaseIdx] = useState<number>(0)
  const [editableInputs, setEditableInputs] = useState<any[]>(() => {
    return problem.testCases.map(tc => tc.input)
  })

  // Execution states
  const [isRunning, setIsRunning] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [runResult, setRunResult] = useState<RunResult | null>(null)
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([])

  // Modals & Drawers
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [celebrationModalOpen, setCelebrationModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const [axelHintOpen, setAxelHintOpen] = useState(false)
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 })
  const [activeFailureContext, setActiveFailureContext] = useState<{
    input?: string
    expected?: string
    actual?: string
    errorMessage?: string
  } | null>(null)
  const [revealedHints, setRevealedHints] = useState<Record<number, boolean>>({})
  const [isMobileScreen, setIsMobileScreen] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const checkMobile = () => setIsMobileScreen(window.innerWidth < 768)
      checkMobile()
      window.addEventListener("resize", checkMobile)
      return () => window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Load solved set and drafts from localStorage
  useEffect(() => {
    try {
      const savedSolved = localStorage.getItem(STORAGE_SOLVED_KEY)
      if (savedSolved) {
        const parsed = JSON.parse(savedSolved)
        if (Array.isArray(parsed)) {
          setSolvedIds(new Set(parsed))
        }
      }

      // Load saved code draft for this problem & language
      const savedCode = localStorage.getItem(`asci_dsa_code_${problem.id}_${language}`)
      if (savedCode) {
        setCode(savedCode)
      } else {
        setCode(problem.starterCode[language] || problem.starterCode.javascript)
      }

      // Load submission history
      const savedSubmissions = localStorage.getItem(`asci_dsa_subs_${problem.id}`)
      if (savedSubmissions) {
        setSubmissions(JSON.parse(savedSubmissions))
      }
    } catch {
      // ignore
    }
  }, [problem.id, language])

  // Update inputs whenever problem changes
  useEffect(() => {
    setEditableInputs(problem.testCases.map(tc => tc.input))
    setSelectedCaseIdx(0)
    setRunResult(null)
    setConsoleTab("testcase")
    setRevealedHints({})
  }, [problem])

  // Language extension selector for CodeMirror
  const extensions = useMemo(() => {
    switch (language) {
      case "javascript":
        return [javascript()]
      case "typescript":
        return [javascript({ typescript: true })]
      case "python":
        return [python()]
      case "java":
      case "cpp":
        return [java()]
      default:
        return [javascript()]
    }
  }, [language])

  // Handle Code Changes & Auto-save draft
  const handleCodeChange = useCallback((value: string) => {
    setCode(value)
    try {
      localStorage.setItem(`asci_dsa_code_${problem.id}_${language}`, value)
    } catch {
      // ignore
    }
  }, [problem.id, language])

  // Reset to starter code
  const handleResetCode = () => {
    if (window.confirm("Reset code to default template? Your current changes will be discarded.")) {
      const starter = problem.starterCode[language] || problem.starterCode.javascript
      setCode(starter)
      try {
        localStorage.removeItem(`asci_dsa_code_${problem.id}_${language}`)
      } catch {
        // ignore
      }
      toast.info("Code reset to default starter template")
    }
  }

  // Copy code to clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(code)
    toast.success("Code copied to clipboard!")
  }

  // Toggle solved in localStorage
  const toggleSolved = () => {
    setSolvedIds(prev => {
      const next = new Set(prev)
      if (next.has(problem.id)) {
        next.delete(problem.id)
        toast.info("Marked problem as unsolved")
      } else {
        next.add(problem.id)
        toast.success("Marked problem as solved!")
      }
      try {
        localStorage.setItem(STORAGE_SOLVED_KEY, JSON.stringify(Array.from(next)))
        window.dispatchEvent(new Event("storage"))
      } catch {
        // ignore
      }
      return next
    })
  }

  // Run Code (Evaluates sample test cases)
  const handleRunCode = async () => {
    if (isRunning || isSubmitting) return
    setIsRunning(true)
    setConsoleTab("testresult")

    try {
      // Run against first 3 test cases
      const sampleCases = problem.testCases.slice(0, 3).map((tc, idx) => ({
        input: editableInputs[idx] ?? tc.input,
        expected: tc.expected,
      }))

      const result = await executeCode(code, problem.functionName, sampleCases, language)
      setRunResult(result)

      if (result.status === "ACCEPTED") {
        toast.success(`Run Code: Accepted (${result.runtimeMs}ms)`)
      } else if (result.status === "WRONG_ANSWER") {
        toast.error(`Run Code: Wrong Answer (${result.passedTests}/${result.totalTests} passed)`)
      } else {
        toast.error(`Run Code: ${result.status}`)
      }
    } catch (err: any) {
      toast.error(err?.message || "Execution error")
    } finally {
      setIsRunning(false)
    }
  }

  // Submit Code (Evaluates ALL test cases)
  const handleSubmitCode = async () => {
    if (isRunning || isSubmitting) return
    setIsSubmitting(true)
    setConsoleTab("testresult")

    try {
      // Run against all test cases
      const allCases = problem.testCases.map((tc, idx) => ({
        input: editableInputs[idx] ?? tc.input,
        expected: tc.expected,
      }))

      const result = await executeCode(code, problem.functionName, allCases, language)
      setRunResult(result)

      // Add to submission history
      const newSub: SubmissionRecord = {
        id: Math.random().toString(36).substring(7),
        timestamp: Date.now(),
        language,
        status: result.status as any,
        runtimeMs: result.runtimeMs,
        memoryMB: result.memoryMB,
        testsPassed: result.passedTests,
        totalTests: result.totalTests,
      }

      const updatedSubs = [newSub, ...submissions].slice(0, 20)
      setSubmissions(updatedSubs)
      try {
        localStorage.setItem(`asci_dsa_subs_${problem.id}`, JSON.stringify(updatedSubs))
      } catch {
        // ignore
      }

      if (result.status === "ACCEPTED") {
        // Mark as solved
        setSolvedIds(prev => {
          const next = new Set(prev)
          next.add(problem.id)
          try {
            localStorage.setItem(STORAGE_SOLVED_KEY, JSON.stringify(Array.from(next)))
            window.dispatchEvent(new Event("storage"))
          } catch {
            // ignore
          }
          return next
        })

        setCelebrationModalOpen(true)
      } else if (result.status === "WRONG_ANSWER") {
        toast.error(`Wrong Answer: Passed ${result.passedTests} of ${result.totalTests} test cases`)
      } else {
        toast.error(`Submission Failed: ${result.status}`)
      }
    } catch (err: any) {
      toast.error(err?.message || "Submission error")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Keyboard Shortcuts: Ctrl+Enter (Run), Ctrl+Shift+Enter (Submit), Alt+Left (Prev), Alt+Right (Next)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault()
        if (e.shiftKey) {
          handleSubmitCode()
        } else {
          handleRunCode()
        }
      } else if (e.altKey && e.key === "ArrowLeft" && adjacent.prev) {
        e.preventDefault()
        router.push(getTargetUrl(adjacent.prev))
      } else if (e.altKey && e.key === "ArrowRight" && adjacent.next) {
        e.preventDefault()
        router.push(getTargetUrl(adjacent.next))
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleSubmitCode, handleRunCode, adjacent, router, getTargetUrl])

  return (
    <div className="flex flex-col h-screen w-full max-w-full overflow-hidden bg-background text-foreground font-sans">
      {/* ========================================================================= */}
      {/* TOP NAVIGATION BAR                                                        */}
      {/* ========================================================================= */}
      <header className="h-14 border-b border-border bg-card/90 backdrop-blur-md px-3 sm:px-4 flex items-center justify-between gap-2 shrink-0 z-30 select-none">
        {/* Left Section: Back, Problem Drawer, Navigation, Title */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          {/* Logo / Back Link */}
          <Link
            href="/dsa/a2z-sheet"
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors shrink-0"
            title="Return to ASCI A2Z Sheet"
          >
            <div className="h-7 w-7 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold font-serif text-sm">
              A
            </div>
            <span className="hidden md:inline text-xs font-semibold tracking-wide text-foreground">
              A2Z Sheet
            </span>
          </Link>

          <div className="h-4 w-px bg-border shrink-0" />

          {/* Problem List Drawer Trigger */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-border hover:bg-secondary text-xs font-medium text-foreground transition-all shrink-0 cursor-pointer"
            title="Browse all 474 problems"
          >
            <ListFilter className="h-3.5 w-3.5 text-primary" />
            <span className="hidden sm:inline">Problem List</span>
            <span className="px-1.5 py-0.5 rounded bg-secondary text-[11px] font-mono text-muted-foreground leading-none">
              {adjacent.currentIndex + 1}/{adjacent.total}
            </span>
          </button>

          {/* Prev / Next Problem Buttons */}
          <div className="flex items-center gap-0.5 shrink-0">
            <button
              onClick={() => adjacent.prev && router.push(getTargetUrl(adjacent.prev))}
              disabled={!adjacent.prev}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title={adjacent.prev ? `Previous: ${adjacent.prev.title} (Alt + ←)` : "First problem"}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => adjacent.next && router.push(getTargetUrl(adjacent.next))}
              disabled={!adjacent.next}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
              title={adjacent.next ? `Next: ${adjacent.next.title} (Alt + →)` : "Last problem"}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="h-4 w-px bg-border shrink-0 hidden sm:block" />

          {/* Current Problem Title & Difficulty */}
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-xs sm:text-sm font-semibold text-foreground truncate max-w-[160px] sm:max-w-xs md:max-w-md">
              {problem.index + 1}. {problem.title}
            </h1>

            {/* Difficulty Badge */}
            <span
              className={cn(
                "rounded px-2 py-0.5 text-[10px] font-mono font-medium uppercase shrink-0",
                problem.difficulty === "Easy" && "bg-primary/10 text-primary border border-primary/20",
                problem.difficulty === "Medium" && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
                problem.difficulty === "Hard" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
              )}
            >
              {problem.difficulty}
            </span>

            {/* Solved Status Checkbox */}
            <button
              onClick={toggleSolved}
              className="p-1 rounded hover:bg-secondary transition-colors shrink-0"
              title={isSolved ? "Mark unsolved" : "Mark as solved"}
            >
              {isSolved ? (
                <CheckCircle2 className="h-4 w-4 text-primary" />
              ) : (
                <Circle className="h-4 w-4 text-muted-foreground/50 hover:text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Right Section: Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Axel AI Helper */}
          <button
            onClick={() => setAxelHintOpen(!axelHintOpen)}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all cursor-pointer",
              axelHintOpen
                ? "bg-primary text-primary-foreground border-primary shadow-xs"
                : "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20"
            )}
            title="Get assistance and hints from Axel AI"
          >
            <Bot className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Ask Axel AI</span>
          </button>

          {/* Run Code Button */}
          <button
            onClick={handleRunCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-secondary/60 hover:bg-secondary text-foreground text-xs font-medium transition-all disabled:opacity-50 cursor-pointer"
            title="Run Code on sample test cases (Ctrl + Enter)"
          >
            <Play className={cn("h-3.5 w-3.5 fill-current", isRunning && "animate-spin")} />
            <span className="hidden sm:inline">Run</span>
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmitCode}
            disabled={isRunning || isSubmitting}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-active text-primary-foreground text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
            title="Submit solution against all test cases (Ctrl + Shift + Enter)"
          >
            <Check className="h-4 w-4 stroke-[2.5]" />
            <span>Submit</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MAIN SPLIT WORKSPACE (Resizable Horizontal Panels)                       */}
      {/* ========================================================================= */}
      <div className="flex-1 overflow-hidden">
        <ResizablePanelGroup direction={isMobileScreen ? "vertical" : "horizontal"} className="h-full w-full">
          {/* --------------------------------------------------------------------- */}
          {/* LEFT PANEL: Problem Description, Editorial & Submissions              */}
          {/* --------------------------------------------------------------------- */}
          <ResizablePanel defaultSize={isMobileScreen ? 45 : 44} minSize={20} maxSize={80} className="flex flex-col bg-card border-r border-border overflow-hidden">
            {/* Left Header Tabs */}
            <div className="flex items-center justify-between border-b border-border bg-secondary/20 px-3 py-1.5 shrink-0">
              <div className="flex items-center gap-1 text-xs">
                <button
                  onClick={() => setLeftTab("description")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all",
                    leftTab === "description"
                      ? "bg-background text-foreground shadow-2xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <FileText className="h-3.5 w-3.5 text-primary" />
                  <span>Description</span>
                </button>

                <button
                  onClick={() => setLeftTab("visualizer")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all",
                    leftTab === "visualizer"
                      ? "bg-background text-foreground shadow-2xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Activity className="h-3.5 w-3.5 text-primary" />
                  <span>Visualizer</span>
                </button>

                <button
                  onClick={() => setLeftTab("editorial")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all",
                    leftTab === "editorial"
                      ? "bg-background text-foreground shadow-2xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <BookOpen className="h-3.5 w-3.5 text-blue-500" />
                  <span>Editorial & Hints</span>
                  {problem.hints.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-secondary text-[10px] font-mono leading-none">
                      {problem.hints.length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setLeftTab("submissions")}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all",
                    leftTab === "submissions"
                      ? "bg-background text-foreground shadow-2xs font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <History className="h-3.5 w-3.5 text-cyan-500" />
                  <span>Submissions</span>
                  {submissions.length > 0 && (
                    <span className="px-1.5 py-0.5 rounded-full bg-secondary text-[10px] font-mono leading-none">
                      {submissions.length}
                    </span>
                  )}
                </button>
              </div>

              {/* External LeetCode / YouTube & Axel AI Trigger */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setAxelHintOpen(prev => !prev)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary font-medium text-xs transition-all shadow-xs cursor-pointer mr-1"
                  title="Open Axel AI Socratic Tutor"
                >
                  <Bot className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Axel AI</span>
                  <Sparkles className="h-2.5 w-2.5 text-amber-300" />
                </button>

                {problem.youtubeUrl && (
                  <a
                    href={problem.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground transition-colors"
                    title="Watch video explanation on YouTube"
                  >
                    <Youtube className="h-4 w-4" />
                  </a>
                )}
                {problem.leetcodeUrl && (
                  <a
                    href={problem.leetcodeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg hover:bg-blue-500/10 hover:text-blue-500 text-muted-foreground transition-colors"
                    title="View original problem on LeetCode"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Left Content Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-foreground">
              {/* TAB 1: DESCRIPTION */}
              {leftTab === "description" && (
                <>
                  {/* Problem Breadcrumb & Title */}
                  <div className="space-y-2">
                    <div className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 flex-wrap">
                      <span>Step {problem.stepNumber}: {problem.stepTitle}</span>
                      <span>›</span>
                      <span className="text-foreground">{problem.subcategoryTitle}</span>
                    </div>

                    <div className="flex items-baseline justify-between gap-3">
                      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
                        {problem.title}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <span
                        className={cn(
                          "rounded-md px-2.5 py-0.5 text-xs font-mono font-medium uppercase",
                          problem.difficulty === "Easy" && "bg-primary/10 text-primary border border-primary/20",
                          problem.difficulty === "Medium" && "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
                          problem.difficulty === "Hard" && "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20"
                        )}
                      >
                        {problem.difficulty}
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        Function: <code className="text-primary">{problem.functionName}()</code>
                      </span>
                      {isSolved && (
                        <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Solved
                        </span>
                      )}
                    </div>
                  </div>

                  {/* ASCI "Simple as Hell" Mission Card */}
                  <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4 sm:p-5 space-y-3 shadow-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                        <Terminal className="h-4 w-4" />
                        <span>ASCI Mission Breakdown • Simple as Hell</span>
                      </div>
                      <button
                        onClick={() => setLeftTab("visualizer")}
                        className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <span>Full Visualizer</span>
                        <ArrowRight className="h-3 w-3" />
                      </button>
                    </div>

                    <div className="text-sm sm:text-base font-semibold text-foreground leading-snug">
                      "{problem.simpleMission || problem.description.split("\n")[0]}"
                    </div>

                    {problem.realWorldAnalogy && (
                      <div className="rounded-xl border border-border/80 bg-card/80 p-3.5 text-xs sm:text-sm text-foreground/90 leading-relaxed">
                        <div className="font-semibold text-primary mb-1 flex items-center gap-1.5">
                          <Lightbulb className="h-3.5 w-3.5" />
                          <span>Real-World Metaphor:</span>
                        </div>
                        <p className="text-body leading-relaxed">{problem.realWorldAnalogy}</p>
                      </div>
                    )}

                    {/* Inline Interactive Visualizer preview */}
                    <div className="pt-2">
                      <ProblemVisualizer problem={problem} />
                    </div>
                  </div>

                  {/* How to Think About It (Mental Model) if available */}
                  {problem.mentalModel && problem.mentalModel.length > 0 && (
                    <div className="rounded-xl border border-border bg-secondary/20 p-4 space-y-2.5">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Lightbulb className="h-3.5 w-3.5" />
                        <span>How to Think About This (Mental Model)</span>
                      </h3>
                      <ol className="space-y-1.5 text-xs text-foreground/90 list-decimal list-inside leading-relaxed">
                        {problem.mentalModel.map((step, sIdx) => (
                          <li key={sIdx}>
                            <span className="font-medium">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {/* Problem Statement Body */}
                  <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 leading-relaxed text-sm">
                    <p className="whitespace-pre-line">{problem.description}</p>
                  </div>

                  {/* Examples */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider text-muted-foreground">
                      Examples
                    </h3>
                    {problem.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl border border-border bg-secondary/20 p-3.5 sm:p-4 space-y-2 text-xs font-mono"
                      >
                        <div className="flex items-center justify-between text-muted-foreground font-sans font-medium text-[11px]">
                          <span>Example {idx + 1}</span>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(`Input: ${example.input}\nOutput: ${example.output}`)
                              toast.success("Example copied!")
                            }}
                            className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                            title="Copy example"
                          >
                            <Copy className="h-3 w-3" />
                          </button>
                        </div>
                        <div>
                          <span className="text-muted-foreground font-semibold">Input: </span>
                          <span className="text-foreground">{example.input}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground font-semibold">Output: </span>
                          <span className="text-primary font-bold">{example.output}</span>
                        </div>
                        {example.explanation && (
                          <div className="pt-1 text-muted-foreground font-sans text-xs">
                            <span className="font-semibold text-foreground">Explanation: </span>
                            {example.explanation}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  {problem.constraints.length > 0 && (
                    <div className="space-y-2.5">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                        Constraints
                      </h3>
                      <ul className="list-disc list-inside space-y-1 text-xs text-foreground/80 font-mono">
                        {problem.constraints.map((c, idx) => (
                          <li key={idx} className="leading-relaxed">
                            <span>{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Topic Tags */}
                  <div className="space-y-2 pt-2 border-t border-border">
                    <span className="text-xs text-muted-foreground font-medium">Topic Tags:</span>
                    <div className="flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-md bg-secondary/50 border border-border text-[11px] font-mono text-muted-foreground">
                        {problem.stepTitle}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-secondary/50 border border-border text-[11px] font-mono text-muted-foreground">
                        {problem.subcategoryTitle}
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-secondary/50 border border-border text-[11px] font-mono text-muted-foreground">
                        {problem.functionName}
                      </span>
                    </div>
                  </div>
                </>
              )}

              {/* TAB: DEDICATED VISUALIZER */}
              {leftTab === "visualizer" && (
                <div className="space-y-6">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-foreground flex items-center gap-2">
                        <Activity className="h-4 w-4 text-primary" />
                        <span>Interactive Algorithmic Visualizer</span>
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground">
                        {problem.title}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Follow the memory transformations step-by-step. Use the Play button or step controls below the canvas.
                    </p>
                  </div>

                  {/* Full Visualizer Component */}
                  <ProblemVisualizer problem={problem} />

                  {/* Algorithmic Blueprint / Mental Model */}
                  {problem.mentalModel && problem.mentalModel.length > 0 && (
                    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5 space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                        <Lightbulb className="h-4 w-4" />
                        <span>Algorithmic Execution Blueprint</span>
                      </h4>
                      <div className="space-y-2">
                        {problem.mentalModel.map((item, mIdx) => (
                          <div key={mIdx} className="flex items-start gap-2.5 text-xs text-foreground/90">
                            <span className="h-5 w-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-mono text-[10px] shrink-0 font-bold">
                              {mIdx + 1}
                            </span>
                            <span className="pt-0.5 leading-relaxed">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Real World Analogy */}
                  {problem.realWorldAnalogy && (
                    <div className="rounded-2xl border border-border/80 bg-secondary/20 p-4 space-y-1.5">
                      <h4 className="text-xs font-bold text-foreground flex items-center gap-1.5">
                        <BookOpen className="h-3.5 w-3.5 text-primary" />
                        <span>Real-World Metaphor</span>
                      </h4>
                      <p className="text-xs text-body leading-relaxed">{problem.realWorldAnalogy}</p>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: EDITORIAL & HINTS */}
              {leftTab === "editorial" && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1">
                      Algorithmic Editorial & Hints
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Progressive hints and complexity targets to guide your implementation.
                    </p>
                  </div>

                  {/* Complexity Targets */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl border border-border bg-secondary/20">
                      <div className="text-[11px] font-mono text-muted-foreground">Target Time Complexity</div>
                      <div className="text-sm font-mono font-bold text-primary mt-1">O(N) to O(N log N)</div>
                    </div>
                    <div className="p-3 rounded-xl border border-border bg-secondary/20">
                      <div className="text-[11px] font-mono text-muted-foreground">Target Space Complexity</div>
                      <div className="text-sm font-mono font-bold text-primary mt-1">O(1) to O(N)</div>
                    </div>
                  </div>

                  {/* Progressive Disclosure Hints */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Hints ({problem.hints.length})
                    </h4>
                    {problem.hints.map((hint, idx) => {
                      const isRevealed = revealedHints[idx]
                      return (
                        <div
                          key={idx}
                          className="rounded-xl border border-border overflow-hidden bg-secondary/10"
                        >
                          <button
                            onClick={() =>
                              setRevealedHints(prev => ({ ...prev, [idx]: !prev[idx] }))
                            }
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-secondary/30 transition-colors text-xs font-medium text-foreground"
                          >
                            <div className="flex items-center gap-2">
                              <Lightbulb className="h-3.5 w-3.5 text-blue-500" />
                              <span>Hint {idx + 1}</span>
                            </div>
                            <span className="text-[11px] text-primary">
                              {isRevealed ? "Hide" : "Reveal Hint"}
                            </span>
                          </button>
                          {isRevealed && (
                            <div className="p-3 border-t border-border bg-background/60 text-xs text-foreground/90 leading-relaxed font-sans animate-in fade-in duration-150">
                              {hint}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>

                  {/* Video Walkthrough if available */}
                  {problem.youtubeUrl && (
                    <div className="p-4 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-3">
                      <div className="flex items-center gap-2 text-rose-500 font-semibold text-xs">
                        <Youtube className="h-4 w-4" />
                        <span>Official Video Explanation</span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Step-by-step whiteboard walkthrough, intuition building, and dry runs.
                      </p>
                      <a
                        href={problem.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium transition-colors"
                      >
                        Watch on YouTube
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: SUBMISSIONS */}
              {leftTab === "submissions" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-semibold text-foreground">
                      Submission History
                    </h3>
                    <span className="text-xs text-muted-foreground font-mono">
                      {submissions.length} Total
                    </span>
                  </div>

                  {submissions.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground text-xs rounded-xl border border-dashed border-border">
                      No submissions recorded yet. Click <strong className="text-foreground">Submit</strong> above to test your code against the full test harness.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {submissions.map(sub => (
                        <div
                          key={sub.id}
                          className="p-3 rounded-xl border border-border bg-secondary/20 flex items-center justify-between text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "font-bold font-mono text-xs",
                                  sub.status === "ACCEPTED" ? "text-primary" : "text-rose-500"
                                )}
                              >
                                {sub.status === "ACCEPTED" ? "Accepted" : "Wrong Answer"}
                              </span>
                              <span className="text-muted-foreground font-mono text-[11px] uppercase">
                                {sub.language}
                              </span>
                            </div>
                            <div className="text-[11px] text-muted-foreground">
                              {new Date(sub.timestamp).toLocaleTimeString()} • {new Date(sub.timestamp).toLocaleDateString()}
                            </div>
                          </div>

                          <div className="text-right space-y-0.5 font-mono text-[11px]">
                            <div className="text-foreground">{sub.runtimeMs} ms</div>
                            <div className="text-muted-foreground">
                              {sub.testsPassed}/{sub.totalTests} passed
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* --------------------------------------------------------------------- */}
          {/* RIGHT PANEL: CodeMirror Editor (Top) & Test Console (Bottom)          */}
          {/* --------------------------------------------------------------------- */}
          <ResizablePanel defaultSize={56} minSize={35} className="flex flex-col bg-background overflow-hidden">
            <ResizablePanelGroup direction="vertical" className="h-full w-full">
              {/* Top Sub-Panel: Code Editor */}
              <ResizablePanel defaultSize={62} minSize={30} className="flex flex-col bg-[#1e1e1e] overflow-hidden">
                {/* Editor Header Bar */}
                <div className="h-10 border-b border-[#2d2d2d] bg-[#181818] px-3 flex items-center justify-between shrink-0 select-none">
                  {/* Left: Language Selector */}
                  <div className="flex items-center gap-2">
                    <Code2 className="h-3.5 w-3.5 text-primary" />
                    <select
                      value={language}
                      onChange={e => {
                        const newLang = e.target.value as SupportedLanguage
                        setLanguage(newLang)
                        const saved = localStorage.getItem(`asci_dsa_code_${problem.id}_${newLang}`)
                        setCode(saved || problem.starterCode[newLang] || problem.starterCode.javascript)
                      }}
                      className="bg-transparent text-xs font-mono font-medium text-foreground focus:outline-hidden cursor-pointer"
                    >
                      <option value="javascript" className="bg-[#1e1e1e] text-foreground">JavaScript</option>
                      <option value="typescript" className="bg-[#1e1e1e] text-foreground">TypeScript</option>
                      <option value="python" className="bg-[#1e1e1e] text-foreground">Python 3</option>
                      <option value="java" className="bg-[#1e1e1e] text-foreground">Java</option>
                      <option value="cpp" className="bg-[#1e1e1e] text-foreground">C++</option>
                    </select>
                  </div>

                  {/* Right: Actions (Reset, Copy, Font Size) */}
                  <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                    {/* Font size adjustment */}
                    <button
                      onClick={() => setFontSize(s => Math.max(12, s - 1))}
                      className="p-1 rounded hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors"
                      title="Decrease font size"
                    >
                      A-
                    </button>
                    <span className="font-mono text-[10px] text-muted-foreground/80">{fontSize}px</span>
                    <button
                      onClick={() => setFontSize(s => Math.min(20, s + 1))}
                      className="p-1 rounded hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors"
                      title="Increase font size"
                    >
                      A+
                    </button>

                    <div className="h-3 w-px bg-[#333] mx-1" />

                    {/* Reset Button */}
                    <button
                      onClick={handleResetCode}
                      className="p-1.5 rounded hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors"
                      title="Reset code template"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                    </button>

                    {/* Copy Button */}
                    <button
                      onClick={handleCopyCode}
                      className="p-1.5 rounded hover:bg-[#2a2a2a] text-muted-foreground hover:text-foreground transition-colors"
                      title="Copy code"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* CodeMirror Workspace */}
                <div className="flex-1 overflow-auto bg-[#1e1e1e] relative">
                  <CodeMirror
                    value={code}
                    height="100%"
                    theme={oneDark}
                    extensions={extensions}
                    onChange={handleCodeChange}
                    basicSetup={{
                      lineNumbers: true,
                      highlightActiveLineGutter: true,
                      highlightSpecialChars: true,
                      history: true,
                      foldGutter: true,
                      drawSelection: true,
                      dropCursor: true,
                      allowMultipleSelections: true,
                      indentOnInput: true,
                      syntaxHighlighting: true,
                      bracketMatching: true,
                      closeBrackets: true,
                      autocompletion: true,
                      rectangularSelection: true,
                      crosshairCursor: true,
                      highlightActiveLine: true,
                      highlightSelectionMatches: true,
                      closeBracketsKeymap: true,
                      defaultKeymap: true,
                      searchKeymap: true,
                      historyKeymap: true,
                      foldKeymap: true,
                      completionKeymap: true,
                      lintKeymap: true,
                    }}
                    onUpdate={(viewUpdate) => {
                      if (viewUpdate.selectionSet) {
                        const head = viewUpdate.state.selection.main.head
                        const line = viewUpdate.state.doc.lineAt(head)
                        setCursorPos({ line: line.number, col: head - line.from + 1 })
                      }
                    }}
                    style={{ fontSize: `${fontSize}px` }}
                    className="h-full font-mono"
                  />
                </div>

                {/* IDE Status Bar */}
                <EditorStatusBar
                  language={language}
                  cursorPos={cursorPos}
                  lineCount={code.split("\n").length}
                  charCount={code.length}
                  onRunCode={handleRunCode}
                  onSubmitCode={handleSubmitCode}
                />
              </ResizablePanel>

              <ResizableHandle withHandle />

              {/* Bottom Sub-Panel: Testcase & Results Tray */}
              <ResizablePanel defaultSize={38} minSize={20} className="flex flex-col bg-card border-t border-border overflow-hidden">
                {/* Console Header Tabs */}
                <div className="h-10 border-b border-border bg-secondary/30 px-3 flex items-center justify-between shrink-0 select-none">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setConsoleTab("testcase")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all",
                        consoleTab === "testcase"
                          ? "bg-background text-foreground shadow-2xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Terminal className="h-3.5 w-3.5 text-primary" />
                      <span>Testcase</span>
                    </button>

                    <button
                      onClick={() => setConsoleTab("testresult")}
                      className={cn(
                        "flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all",
                        consoleTab === "testresult"
                          ? "bg-background text-foreground shadow-2xs font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Cpu className="h-3.5 w-3.5 text-primary" />
                      <span>Test Result</span>
                      {runResult && (
                        <span className={cn(
                          "px-1.5 py-0.5 rounded text-[10px] font-mono leading-none",
                          runResult.status === "ACCEPTED" ? "bg-primary/20 text-primary" : "bg-rose-500/20 text-rose-500"
                        )}>
                          {runResult.status === "ACCEPTED" ? "Passed" : "Failed"}
                        </span>
                      )}
                    </button>
                  </div>

                  {/* Metrics Badge if result exists */}
                  {runResult && (
                    <div className="flex items-center gap-3 text-[11px] font-mono text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{runResult.runtimeMs}ms</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Cpu className="h-3 w-3" />
                        <span>{runResult.memoryMB}MB</span>
                      </span>
                    </div>
                  )}
                </div>

                {/* Console Body */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
                  {/* TRAY 1: TESTCASES */}
                  {consoleTab === "testcase" && (
                    <div className="space-y-4">
                      {/* Case Tabs */}
                      <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                        {problem.testCases.slice(0, 5).map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedCaseIdx(idx)}
                            className={cn(
                              "px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer shrink-0",
                              selectedCaseIdx === idx
                                ? "bg-primary/20 text-primary border border-primary/30"
                                : "bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary"
                            )}
                          >
                            Case {idx + 1}
                          </button>
                        ))}
                      </div>

                      {/* Editable Inputs for Selected Case */}
                      <div className="space-y-3">
                        {problem.parameters.map((param, pIdx) => {
                          const currentVal = editableInputs[selectedCaseIdx]?.[pIdx]
                          const formattedVal = typeof currentVal === "string" ? currentVal : JSON.stringify(currentVal)

                          return (
                            <div key={param.name} className="space-y-1">
                              <label className="text-[11px] font-medium text-muted-foreground flex items-center justify-between">
                                <span>{param.name} =</span>
                                <span className="text-[10px] text-muted-foreground/60">{param.type}</span>
                              </label>
                              <input
                                type="text"
                                value={formattedVal ?? ""}
                                onChange={e => {
                                  try {
                                    const parsed = JSON.parse(e.target.value)
                                    setEditableInputs(prev => {
                                      const next = [...prev]
                                      if (!next[selectedCaseIdx]) next[selectedCaseIdx] = []
                                      next[selectedCaseIdx][pIdx] = parsed
                                      return next
                                    })
                                  } catch {
                                    // Raw string fallback
                                    setEditableInputs(prev => {
                                      const next = [...prev]
                                      if (!next[selectedCaseIdx]) next[selectedCaseIdx] = []
                                      next[selectedCaseIdx][pIdx] = e.target.value
                                      return next
                                    })
                                  }
                                }}
                                className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground font-mono text-xs focus:outline-hidden focus:ring-1 focus:ring-primary"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* TRAY 2: TEST RESULT */}
                  {consoleTab === "testresult" && (
                    <div className="space-y-4">
                      {!runResult ? (
                        <div className="p-8 text-center text-muted-foreground text-xs font-sans">
                          Click <strong>Run</strong> or <strong>Submit</strong> above to compile and test your solution.
                        </div>
                      ) : (
                        <>
                          {/* Banner */}
                          <div
                            className={cn(
                              "p-3 rounded-xl border flex items-center justify-between",
                              runResult.status === "ACCEPTED"
                                ? "bg-primary/10 border-primary/30 text-primary"
                                : "bg-rose-500/10 border-rose-500/30 text-rose-500"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {runResult.status === "ACCEPTED" ? (
                                <CheckCircle2 className="h-5 w-5" />
                              ) : (
                                <AlertCircle className="h-5 w-5" />
                              )}
                              <div>
                                <h4 className="font-bold text-sm">
                                  {runResult.status === "ACCEPTED"
                                    ? "Accepted"
                                    : runResult.status === "WRONG_ANSWER"
                                    ? "Wrong Answer"
                                    : runResult.status}
                                </h4>
                                <p className="text-[11px] opacity-80">
                                  Passed {runResult.passedTests} of {runResult.totalTests} test cases
                                </p>
                              </div>
                            </div>
                            <div className="text-right text-xs">
                              <div>{runResult.runtimeMs} ms</div>
                              <div className="opacity-70">{runResult.memoryMB} MB</div>
                            </div>
                          </div>

                          {/* Error Stack or Output if any */}
                          {runResult.errorMessage && (
                            <div className="p-3 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-400 font-mono text-xs whitespace-pre-wrap">
                              {runResult.errorMessage}
                              {runResult.errorStack && `\n\n${runResult.errorStack}`}
                            </div>
                          )}

                          {/* Testcase Results Accordion / Tabs */}
                          {runResult.testResults.length > 0 && (
                            <div className="space-y-3">
                              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                                {runResult.testResults.map((tr, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => setSelectedCaseIdx(idx)}
                                    className={cn(
                                      "px-3 py-1 rounded-lg text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer shrink-0 border transition-all",
                                      selectedCaseIdx === idx
                                        ? "border-primary bg-primary/10 text-primary"
                                        : "border-border bg-secondary/30 text-muted-foreground hover:text-foreground",
                                      tr.passed ? "text-primary" : "text-rose-500"
                                    )}
                                  >
                                    <span className={cn("h-1.5 w-1.5 rounded-full", tr.passed ? "bg-primary" : "bg-rose-500")} />
                                    Case {idx + 1}
                                  </button>
                                ))}
                              </div>

                              {/* Selected Case Inspection */}
                              {runResult.testResults[selectedCaseIdx] && (
                                <div className="p-3 rounded-xl border border-border bg-card/60 dark:bg-[#141413] space-y-2.5">
                                  {!runResult.testResults[selectedCaseIdx].passed ? (
                                    <TestOutputDiff
                                      expected={runResult.testResults[selectedCaseIdx].expectedFormatted}
                                      actual={runResult.testResults[selectedCaseIdx].outputFormatted}
                                      input={runResult.testResults[selectedCaseIdx].inputFormatted}
                                      errorMessage={runResult.errorMessage}
                                      onAskAxel={(ctx) => {
                                        setActiveFailureContext(ctx)
                                        setAxelHintOpen(true)
                                      }}
                                    />
                                  ) : (
                                    <>
                                      <div>
                                        <span className="text-muted-foreground text-[11px] font-medium block">Input:</span>
                                        <code className="text-foreground bg-secondary/40 border border-border/70 px-2.5 py-1 rounded block mt-0.5 overflow-x-auto font-mono text-xs">
                                          {runResult.testResults[selectedCaseIdx].inputFormatted}
                                        </code>
                                      </div>

                                      <div>
                                        <span className="text-muted-foreground text-[11px] font-medium block">Your Output:</span>
                                        <code className="px-2.5 py-1 rounded block mt-0.5 overflow-x-auto font-mono text-xs font-medium border bg-primary/10 border-primary/30 text-primary">
                                          {runResult.testResults[selectedCaseIdx].outputFormatted}
                                        </code>
                                      </div>

                                      <div>
                                        <span className="text-muted-foreground text-[11px] font-medium block">Expected Output:</span>
                                        <code className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded block mt-0.5 overflow-x-auto font-mono text-xs font-medium">
                                          {runResult.testResults[selectedCaseIdx].expectedFormatted}
                                        </code>
                                      </div>
                                    </>
                                  )}

                                  {runResult.testResults[selectedCaseIdx].stdout.length > 0 && (
                                    <div className="rounded-lg border border-white/10 bg-[#0c0c0e] p-2.5 space-y-1.5 mt-1">
                                      <div className="flex items-center justify-between text-[10px] text-zinc-400 font-mono">
                                        <span className="font-semibold text-zinc-300">Standard Output (console.log):</span>
                                        <span className="text-emerald-400">stdout</span>
                                      </div>
                                      <pre className="text-emerald-300 dark:text-emerald-400 font-mono text-[11px] overflow-x-auto whitespace-pre-wrap pl-2 border-l border-emerald-500/40 leading-relaxed">
                                        {runResult.testResults[selectedCaseIdx].stdout.join("\n")}
                                      </pre>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* ========================================================================= */}
      {/* CELEBRATION MODAL (On Accepted Submission)                                */}
      {/* ========================================================================= */}
      {celebrationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-md rounded-2xl border border-primary/30 bg-card p-6 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200">
            {/* Animated Trophy Icon */}
            <div className="mx-auto h-16 w-16 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Trophy className="h-8 w-8 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight text-foreground font-serif">
                Accepted!
              </h3>
              <p className="text-xs text-muted-foreground">
                Congratulations! You conquered <strong className="text-foreground">{problem.title}</strong> and passed all test cases!
              </p>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl border border-border bg-secondary/30 text-left font-mono text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px]">Runtime</span>
                <span className="font-bold text-primary text-sm">{runResult?.runtimeMs || 24} ms</span>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Memory</span>
                <span className="font-bold text-foreground text-sm">{runResult?.memoryMB || 42.1} MB</span>
              </div>
            </div>

            {/* Share Card Trigger */}
            <button
              onClick={() => {
                setCelebrationModalOpen(false)
                setShareModalOpen(true)
              }}
              className="w-full py-2.5 rounded-xl border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
            >
              <Share2 className="h-4 w-4" />
              <span>Generate Proof-of-Work Solution Card</span>
              <Sparkles className="h-3 w-3 text-amber-300" />
            </button>

            {/* Actions: Next Problem / Close */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCelebrationModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-border hover:bg-secondary text-xs font-semibold text-foreground transition-colors"
              >
                Review Solution
              </button>
              {adjacent.next ? (
                <button
                  onClick={() => {
                    setCelebrationModalOpen(false)
                    router.push(getTargetUrl(adjacent.next))
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-xs"
                >
                  <span>Next Problem</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <Link
                  href="/dsa/a2z-sheet"
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <span>A2Z Sheet</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PROOF-OF-WORK SOLUTION SHARE MODAL                                        */}
      {/* ========================================================================= */}
      <SolutionShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        problem={problem}
        code={code}
        language={language}
        runtimeMs={runResult?.runtimeMs || 18}
        memoryMB={runResult?.memoryMB || 42}
      />

      {/* ========================================================================= */}
      {/* UPGRADED AXEL AI SOCRATIC TUTOR DRAWER                                    */}
      {/* ========================================================================= */}
      <AxelTutorDrawer
        isOpen={axelHintOpen}
        onClose={() => setAxelHintOpen(false)}
        problem={problem}
        userCode={code}
        runResult={runResult}
        activeFailureContext={activeFailureContext}
        onOpenVisualizer={() => setLeftTab("visualizer")}
      />

      {/* ========================================================================= */}
      {/* ALL PROBLEMS DRAWER                                                       */}
      {/* ========================================================================= */}
      <ProblemListDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        currentProblemId={problem.id}
        solvedIds={solvedIds}
        onSelectProblem={p => {
          setDrawerOpen(false)
          router.push(`/dsa/problems/${p.id}`)
        }}
      />
    </div>
  )
}
