"use client"

import { useState, useEffect, useCallback } from "react"
import { getLessonContent } from "@/app/actions/courses"
import { createClient } from "@/utils/supabase/client"
import { recordLessonCompletion } from "@/app/actions/gamification"
import { recordDailyTaskProgress } from "@/lib/daily-tasks"
import CodeMirror from "@uiw/react-codemirror"
import { python } from "@codemirror/lang-python"
import { java } from "@codemirror/lang-java"
import {
    Play,
    CheckCircle2,
    XCircle,
    ChevronRight,
    Terminal,
    Loader2,
    ShieldCheck,
    Activity,
    Award,
    BookOpen,
    RotateCcw,
    Copy,
    Check,
    Maximize2,
    Minimize2,
    Cpu,
    AlertTriangle,
    FileCode2,
    Zap,
    CornerDownLeft,
    Flame,
    Bot
} from "lucide-react"
import Link from "next/link"
import { usePython } from "@/hooks/use-python"
import { useJava } from "@/hooks/use-java"
import { CodeFlow } from "@/components/code-flow"
import { useParams } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"
import { generateCertificateAction } from "@/app/actions/certificates"
import { saveLocalCertificate } from "@/lib/certificate-store"
import { getCurriculumCourseBySlug } from "@/lib/curriculum-data"
import { AxelTutorDrawer } from "@/components/dsa/axel-tutor-drawer"

interface RunState {
    status: "idle" | "compiling" | "executing" | "completed" | "error"
    statusMessage: string
    output: string
    error: string | null
    executionMs: number
    compileMs: number
    exitCode: number
    engine: string
    testPassed: boolean | null
    runTimestamp: string | null
    hasExecuted: boolean
}

export default function LessonPage() {
    const params = useParams()
    const slug = params.slug as string
    const moduleId = params.moduleId as string
    const lessonId = params.lessonId as string

    const [code, setCode] = useState("")
    const [isClient, setIsClient] = useState(false)
    const [copiedCode, setCopiedCode] = useState(false)
    const [copiedExpected, setCopiedExpected] = useState(false)
    const [activeTab, setActiveTab] = useState<"terminal" | "tests" | "diagnostics">("terminal")
    const [isConsoleExpanded, setIsConsoleExpanded] = useState(false)
    const [isAxelOpen, setIsAxelOpen] = useState(false)

    const [runState, setRunState] = useState<RunState>({
        status: "idle",
        statusMessage: "",
        output: "",
        error: null,
        executionMs: 0,
        compileMs: 0,
        exitCode: 0,
        engine: "CPython 3.11.8 (WASM)",
        testPassed: null,
        runTimestamp: null,
        hasExecuted: false
    })

    const { isReady: pythonReady, runPython, engineName: pyEngineName, isWasmLoaded } = usePython()
    const { isReady: javaReady, runJava, isLoading: javaLoading, engineName: javaEngineName } = useJava()

    const isJavaCourse = slug.startsWith("java")
    const languageReady = isJavaCourse ? javaReady : pythonReady
    const activeEngineName = isJavaCourse ? javaEngineName : pyEngineName

    const [lesson, setLesson] = useState<any>(null)
    const [moduleInfo, setModuleInfo] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [isSubmittingProgress, setIsSubmittingProgress] = useState(false)

    useEffect(() => {
        setIsClient(true)
        const fetchContent = async () => {
            setIsLoading(true)
            const data = await getLessonContent(lessonId)
            if (data) {
                setLesson(data)
                setModuleInfo(data.modules)
                if (data.challenge_data?.initialCode) {
                    setCode(data.challenge_data.initialCode)
                }
            }
            setIsLoading(false)
        }
        if (lessonId) {
            fetchContent()
        }
    }, [lessonId])

    const handleRunCode = useCallback(async () => {
        if (!lesson?.challenge_data) return

        // 1. Phase: Compilation
        setRunState(prev => ({
            ...prev,
            status: "compiling",
            statusMessage: isJavaCourse
                ? "Compiling Main.java with OpenJDK javac..."
                : "Compiling solution.py AST & Bytecode...",
            error: null
        }))

        // Allow UI to render compilation spinner state
        await new Promise(resolve => setTimeout(resolve, 200))

        // 2. Phase: Execution
        setRunState(prev => ({
            ...prev,
            status: "executing",
            statusMessage: isJavaCourse
                ? "Executing in OpenJDK 15 JVM..."
                : "Executing in CPython 3.11.8 WASM..."
        }))

        let result: any
        if (isJavaCourse) {
            result = await runJava(code)
        } else {
            result = await runPython(code)
        }

        const expectedOutput = lesson.challenge_data.expectedOutput
        const consoleOutput = (result?.output || "").trim()
        const expected = expectedOutput ? expectedOutput.trim() : null
        const isMatch = expected !== null ? consoleOutput === expected : null

        setRunState({
            status: result?.success ? "completed" : "error",
            statusMessage: result?.success
                ? "Process finished with exit code 0"
                : `Process terminated with error (exit code ${result?.exitCode ?? 1})`,
            output: result?.output || "",
            error: result?.error || null,
            executionMs: result?.executionMs || 0,
            compileMs: result?.compileMs || 0,
            exitCode: result?.exitCode ?? (result?.success ? 0 : 1),
            engine: result?.engine || activeEngineName,
            testPassed: isMatch,
            runTimestamp: new Date().toLocaleTimeString(),
            hasExecuted: true
        })

        // If test matched or mismatched, user can check the tests tab or stay in terminal
        if (isMatch) {
            setActiveTab("tests")
            recordDailyTaskProgress("challenge")
            if (typeof window !== "undefined") {
                window.dispatchEvent(
                    new CustomEvent("asci-event", {
                        detail: {
                            type: "lesson_completed",
                            payload: { lessonId: lesson?.id, title: lesson?.title },
                        },
                    })
                )
            }
        }
    }, [lesson, isJavaCourse, code, runJava, runPython, activeEngineName])

    // Keyboard shortcut: Ctrl+Enter / Cmd+Enter to compile & run
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault()
                if (languageReady && runState.status !== "compiling" && runState.status !== "executing") {
                    handleRunCode()
                }
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleRunCode, languageReady, runState.status])

    const handleResetCode = () => {
        if (lesson?.challenge_data?.initialCode) {
            setCode(lesson.challenge_data.initialCode)
        }
    }

    const handleCopyCode = async () => {
        if (navigator?.clipboard) {
            await navigator.clipboard.writeText(code)
            setCopiedCode(true)
            setTimeout(() => setCopiedCode(false), 2000)
        }
    }

    const handleCopyExpected = async () => {
        if (navigator?.clipboard && lesson?.challenge_data?.expectedOutput) {
            await navigator.clipboard.writeText(lesson.challenge_data.expectedOutput)
            setCopiedExpected(true)
            setTimeout(() => setCopiedExpected(false), 2000)
        }
    }

    const handleClearConsole = () => {
        setRunState(prev => ({
            ...prev,
            status: "idle",
            statusMessage: "",
            output: "",
            error: null,
            hasExecuted: false,
            testPassed: null
        }))
    }

    const handleComplete = async () => {
        setIsSubmittingProgress(true)
        const xpAmount = lesson?.xp_reward || 100
        let isCourseCompleted = false
        try {
            // 1. Advance daily task quest completion (lesson progress)
            recordDailyTaskProgress("lesson")
            if (runState.testPassed) {
                recordDailyTaskProgress("challenge")
            }

            // 2. Award XP, update streak, unlock badges and check course completion
            const result = await recordLessonCompletion(lesson.id, slug, xpAmount)
            isCourseCompleted = Boolean(result?.courseCompleted)

            // 3. Dispatch global celebration event for floating XP toast
            if (typeof window !== "undefined") {
                window.dispatchEvent(
                    new CustomEvent("asci-award-xp", {
                        detail: {
                            amount: xpAmount,
                            reason: `Completed: ${lesson?.title || "Curriculum Lesson"}`
                        }
                    })
                )

                if (isCourseCompleted) {
                    window.dispatchEvent(
                        new CustomEvent("asci-award-xp", {
                            detail: {
                                amount: 1000,
                                reason: "🏆 Course 100% Completed! Gravit Certificate Unlocked!"
                            }
                        })
                    )
                }
            }

            // If 100% completed, auto-generate official certificate
            let generatedCertId = ""
            if (isCourseCompleted) {
                try {
                    const currCourse = getCurriculumCourseBySlug(slug)
                    const courseTitle = moduleInfo?.course?.title || currCourse?.title || "Advanced Algorithms"
                    const certRes = await generateCertificateAction({
                        courseId: slug,
                        courseTitle: courseTitle,
                        courseSlug: slug,
                        progressPercent: 100,
                        isCompleted: true,
                    })
                    if (certRes.success && certRes.certificate) {
                        saveLocalCertificate(certRes.certificate)
                        generatedCertId = certRes.certificate.certificate_id
                    }
                } catch (certErr) {
                    console.warn("Auto-generating certificate upon completion notice:", certErr)
                }
            }

            setTimeout(() => {
                setIsSubmittingProgress(false)
                if (isCourseCompleted) {
                    const certQuery = generatedCertId ? `&certId=${encodeURIComponent(generatedCertId)}` : ""
                    window.location.href = `/dashboard?tab=certificates&completed=${slug}${certQuery}&autoOpen=true`
                } else {
                    window.location.href = `/courses/${slug}/learn`
                }
            }, 700)
        } catch (e) {
            console.warn("Could not record gamification progress:", e)
            setIsSubmittingProgress(false)
            window.location.href = `/courses/${slug}/learn`
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center p-8 text-primary text-sm bg-background">
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                <span>Loading lesson workspace & compiler environment...</span>
            </div>
        )
    }

    if (!lesson) {
        return (
            <div className="flex h-full items-center justify-center p-8 bg-background">
                <div className="text-center max-w-sm">
                    <BookOpen className="mx-auto h-10 w-10 text-muted-foreground/40 mb-3" />
                    <h2 className="font-serif text-xl font-normal text-foreground">Lesson Not Found</h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        The requested active lesson does not exist or has been archived.
                    </p>
                    <Link
                        href={`/courses/${slug}/learn`}
                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full text-xs font-medium bg-primary text-primary-foreground hover:bg-primary-active transition-colors shadow-xs"
                    >
                        <span>Return to Curriculum</span>
                    </Link>
                </div>
            </div>
        )
    }

    const isRunning = runState.status === "compiling" || runState.status === "executing"

    return (
        <div className="flex h-full flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-border bg-background">

            {/* Left Column: Editorial Curriculum & Lesson Guide */}
            <div className="flex-1 overflow-y-auto p-6 lg:p-10 order-1 lg:order-none">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary font-medium mb-2">
                            <span>{moduleInfo?.title || "Lesson Overview"}</span>
                            <span>•</span>
                            <span>Lesson {lesson.sequence_order || 1}</span>
                        </div>
                        <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground tracking-tight leading-tight mb-3">
                            {lesson.title.split(":").pop()?.trim() || lesson.title}
                        </h1>
                        <div className="h-0.5 w-12 bg-primary" />
                    </div>

                    <div
                        className="text-base text-foreground/85 leading-relaxed space-y-4 font-sans
                        [&_h3]:font-serif [&_h3]:text-xl [&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2
                        [&_strong]:text-foreground [&_strong]:font-semibold
                        [&_code]:font-mono [&_code]:text-xs [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:bg-card [&_code]:border [&_code]:border-border [&_code]:text-primary"
                        dangerouslySetInnerHTML={{
                            __html: (lesson.content || "No content provided.")
                                .replace(/\n/g, "<br/>")
                                .replace(
                                    /```python<br\/>([\s\S]*?)<br\/>```/g,
                                    '<div class="rounded-xl border border-[#222222] bg-[#0a0a0a] overflow-hidden my-6 text-[#ffffff] shadow-md"><div class="px-4 py-2 border-b border-[#222222] bg-[#000000] flex items-center justify-between text-[11px] font-mono text-[#a1a1aa]"><span>example.py</span><span class="text-[#ea580c]">Python 3.11</span></div><pre class="p-4 font-mono text-xs text-[#f4f4f5] overflow-x-auto leading-relaxed"><code>$1</code></pre></div>'
                                )
                                .replace(
                                    /```java<br\/>([\s\S]*?)<br\/>```/g,
                                    '<div class="rounded-xl border border-[#222222] bg-[#0a0a0a] overflow-hidden my-6 text-[#ffffff] shadow-md"><div class="px-4 py-2 border-b border-[#222222] bg-[#000000] flex items-center justify-between text-[11px] font-mono text-[#a1a1aa]"><span>Main.java</span><span class="text-[#ea580c]">Java 15</span></div><pre class="p-4 font-mono text-xs text-[#f4f4f5] overflow-x-auto leading-relaxed"><code>$1</code></pre></div>'
                                )
                                .replace(/`([^`]+)`/g, "<code>$1</code>")
                                .replace(/\[FLOWCHART: (.*?)\]/g, () => '<div id="flowchart-root"></div>')
                        }}
                    />

                    {lesson.title.toLowerCase().includes("hello") && (
                        <div className="mt-8">
                            <CodeFlow
                                nodes={[
                                    { id: "s1", label: "AST Parse", type: "start" },
                                    { id: "c1", label: "Bytecode Compilation", type: "condition" },
                                    { id: "a1", label: "WASM Execution", type: "action" },
                                    { id: "e1", label: "Assertion Pass", type: "end" }
                                ]}
                                activeNodeId="c1"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Right Column: High-Precision Compiler Studio & IDE */}
            <div className="flex flex-col bg-[#141413] text-[#f5f0e8] lg:w-[48%] xl:w-[52%] shrink-0 border-t lg:border-t-0 border-border order-2 lg:order-none min-h-[620px] lg:min-h-0">

                {lesson.challenge_data ? (
                    <>
                        {/* Top Studio Control Bar */}
                        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-b border-[#16271c] bg-[#0a140e]">
                            <div className="flex items-center gap-3">
                                {/* Language and Runtime indicator */}
                                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#112117] border border-[#1f3829] text-xs font-mono">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ea580c] opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ea580c]"></span>
                                    </span>
                                    <span className="text-[#f5f0e8] font-medium">
                                        {isJavaCourse ? "Java 15" : "Python 3.11"}
                                    </span>
                                </div>

                                <span className="text-[#f5f0e8]/20">•</span>

                                <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#f5f0e8]/70 font-sans">
                                    <span>Interactive Challenge</span>
                                </div>

                                {/* XP Badge */}
                                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ea580c]/15 border border-[#ea580c]/30 text-[11px] font-mono text-[#ea580c]">
                                    <Award className="h-3 w-3" />
                                    <span>+{lesson.xp_reward || 100} XP</span>
                                </div>
                            </div>

                            {/* Actions Group */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleResetCode}
                                    title="Reset editor to initial challenge template"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#222222] bg-[#0a0a0a] text-[11px] font-mono text-[#a1a1aa] hover:text-[#ffffff] hover:bg-[#141414] transition-colors"
                                >
                                    <RotateCcw className="h-3 w-3" />
                                    <span className="hidden md:inline">Reset</span>
                                </button>

                                <button
                                    onClick={handleCopyCode}
                                    title="Copy code to clipboard"
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#222222] bg-[#0a0a0a] text-[11px] font-mono text-[#a1a1aa] hover:text-[#ffffff] hover:bg-[#141414] transition-colors"
                                >
                                    {copiedCode ? <Check className="h-3 w-3 text-[#ea580c]" /> : <Copy className="h-3 w-3" />}
                                    <span className="hidden md:inline">{copiedCode ? "Copied" : "Copy"}</span>
                                </button>

                                <ThemeToggle className="h-7 w-7 border-[#222222] bg-black hover:bg-[#141414]" />

                                {/* Axel AI Engineering Mentor Trigger */}
                                <button
                                    onClick={() => setIsAxelOpen(true)}
                                    title="Open Axel AI Engineering Mentor"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-orange-500/40 bg-orange-500/10 hover:bg-orange-500/20 text-[11px] font-mono font-medium text-orange-400 hover:text-orange-300 transition-colors cursor-pointer shadow-2xs"
                                >
                                    <Bot className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">Axel AI</span>
                                </button>

                                {/* Primary Compile & Run Button */}
                                <button
                                    onClick={handleRunCode}
                                    disabled={!languageReady || isRunning}
                                    className={`inline-flex items-center gap-2 rounded-lg px-4 py-1.5 text-xs font-medium transition-all shadow-md active:scale-95 cursor-pointer ${
                                        isRunning
                                            ? "bg-[#1c1c1c] text-[#a1a1aa] cursor-not-allowed border border-[#2e2e2e]"
                                            : "bg-primary hover:bg-primary-active text-primary-foreground border border-primary/30 shadow-xs"
                                    }`}
                                >
                                    {isRunning ? (
                                        <Loader2 className="h-3.5 w-3.5 animate-spin text-primary-foreground" />
                                    ) : (
                                        <Play className="h-3.5 w-3.5 fill-current" />
                                    )}
                                    <span>
                                        {isRunning
                                            ? runState.status === "compiling" ? "Compiling..." : "Executing..."
                                            : "Compile & Run"}
                                    </span>
                                    <span className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded bg-black/40 text-white/80 border border-white/10 leading-none">
                                        Ctrl ↵
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Challenge Objective Bento Card */}
                        <div className="mx-5 mt-4 p-4 rounded-xl border border-[#222222] bg-[#0a0a0a] shadow-sm relative overflow-hidden">
                            <div className="flex items-center justify-between mb-1.5">
                                <span className="text-[11px] font-mono text-[#ea580c] uppercase tracking-wider font-medium flex items-center gap-1.5">
                                    <ShieldCheck className="h-3.5 w-3.5 text-[#ea580c]" />
                                    Challenge Objective
                                </span>
                                {lesson.challenge_data.expectedOutput && (
                                    <button
                                        onClick={handleCopyExpected}
                                        className="text-[10px] font-mono text-[#a1a1aa] hover:text-[#ffffff] flex items-center gap-1 transition-colors"
                                    >
                                        {copiedExpected ? <Check className="h-2.5 w-2.5 text-[#ea580c]" /> : <Copy className="h-2.5 w-2.5" />}
                                        <span>Target: <code className="text-[#ea580c] px-1 py-0.5 rounded bg-[#141414] border border-[#262626]">{lesson.challenge_data.expectedOutput}</code></span>
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-[#d4d4d8] leading-relaxed font-sans">
                                {lesson.challenge_data.instructions}
                            </p>
                        </div>

                        {/* CodeMirror Editor Area */}
                        <div className="flex-1 flex flex-col mx-5 mt-3 mb-3 rounded-xl border border-[#222222] bg-black overflow-hidden shadow-inner">
                            {/* Editor Tab Header */}
                            <div className="px-4 py-2 border-b border-[#1c1c1c] bg-[#0a0a0a] flex items-center justify-between text-[11px] font-mono text-[#a1a1aa]">
                                <div className="flex items-center gap-2">
                                    <FileCode2 className="h-3.5 w-3.5 text-primary" />
                                    <span className="text-white font-medium">
                                        solution.{isJavaCourse ? "java" : "py"}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-[10px] text-[#71717a]">
                                    <span className="hidden sm:inline">UTF-8</span>
                                    <span>4 Spaces</span>
                                    <span className="text-[#ea580c]/70">Auto-saved</span>
                                </div>
                            </div>

                            {/* Editor Canvas */}
                            <div className="flex-1 min-h-[180px] overflow-auto">
                                {isClient ? (
                                    <CodeMirror
                                        value={code}
                                        height="100%"
                                        theme="dark"
                                        extensions={isJavaCourse ? [java()] : [python()]}
                                        onChange={(val) => setCode(val)}
                                        className="h-full text-sm [&_.cm-editor]:h-full [&_.cm-scroller]:font-mono [&_.cm-gutters]:bg-[#0a0a0a] [&_.cm-gutters]:border-r [&_.cm-gutters]:border-[#1c1c1c] [&_.cm-gutters]:text-[#71717a] [&_.cm-content]:px-4 [&_.cm-content]:py-3"
                                        basicSetup={{
                                            lineNumbers: true,
                                            highlightActiveLineGutter: true,
                                            foldGutter: true,
                                            autocompletion: true,
                                            bracketMatching: true,
                                            closeBrackets: true
                                        }}
                                    />
                                ) : (
                                    <div className="h-full w-full bg-black animate-pulse" />
                                )}
                            </div>
                        </div>

                        {/* Interactive Compiler Studio Console */}
                        <div
                            className={`border-t border-[#222222] bg-black flex flex-col transition-all duration-200 ${
                                isConsoleExpanded ? "h-96 lg:h-[430px]" : "h-64 lg:h-72"
                            }`}
                        >
                            {/* Console Tab Navigation Bar */}
                            <div className="flex items-center justify-between px-4 py-2 border-b border-[#1c1c1c] bg-[#0a0a0a]">
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => setActiveTab("terminal")}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                                            activeTab === "terminal"
                                                ? "bg-[#1c1c1c] text-white font-medium border border-[#333333]"
                                                : "text-[#a1a1aa] hover:text-white hover:bg-[#141414]"
                                        }`}
                                    >
                                        <Terminal className="h-3 w-3" />
                                        <span>Terminal</span>
                                        {runState.hasExecuted && (
                                            <span className={`h-1.5 w-1.5 rounded-full ${
                                                runState.exitCode === 0 ? "bg-primary" : "bg-rose-400"
                                            }`} />
                                        )}
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("tests")}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                                            activeTab === "tests"
                                                ? "bg-[#1c1c1c] text-white font-medium border border-[#333333]"
                                                : "text-[#a1a1aa] hover:text-white hover:bg-[#141414]"
                                        }`}
                                    >
                                        <CheckCircle2 className="h-3 w-3" />
                                        <span>Test Verification</span>
                                        {runState.testPassed !== null && (
                                            <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-semibold leading-none ${
                                                runState.testPassed
                                                    ? "bg-primary/20 text-primary border border-primary/30"
                                                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                            }`}>
                                                {runState.testPassed ? "Pass" : "Fail"}
                                            </span>
                                        )}
                                    </button>

                                    <button
                                        onClick={() => setActiveTab("diagnostics")}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                                            activeTab === "diagnostics"
                                                ? "bg-[#1c1c1c] text-white font-medium border border-[#333333]"
                                                : "text-[#a1a1aa] hover:text-white hover:bg-[#141414]"
                                        }`}
                                    >
                                        <Cpu className="h-3 w-3" />
                                        <span className="hidden sm:inline">Compiler Diagnostics</span>
                                        <span className="sm:hidden">Info</span>
                                    </button>
                                </div>

                                <div className="flex items-center gap-2">
                                    {runState.hasExecuted && (
                                        <span className="text-[10px] font-mono text-[#71717a] hidden sm:inline">
                                            ⏱ {runState.executionMs}ms
                                        </span>
                                    )}

                                    <button
                                        onClick={handleClearConsole}
                                        title="Clear console output"
                                        className="text-[11px] font-mono text-[#a1a1aa] hover:text-white px-2 py-0.5 rounded hover:bg-[#141414] transition-colors"
                                    >
                                        Clear
                                    </button>

                                    <button
                                        onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
                                        title={isConsoleExpanded ? "Minimize console" : "Maximize console"}
                                        className="text-[#a1a1aa] hover:text-white p-1 rounded hover:bg-[#141414] transition-colors"
                                    >
                                        {isConsoleExpanded ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Tab 1: Terminal Console Body */}
                            {activeTab === "terminal" && (
                                <div className="flex-1 flex flex-col overflow-hidden font-mono text-xs">
                                    {/* Terminal Header Bar */}
                                    <div className="px-4 py-1.5 bg-[#050505] border-b border-[#1a1a1a] flex items-center justify-between text-[10px] text-[#71717a]">
                                        <div className="flex items-center gap-1.5">
                                            <span className="h-2 w-2 rounded-full bg-[#ff5f56]" />
                                            <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
                                            <span className="h-2 w-2 rounded-full bg-primary/70" />
                                            <span className="ml-2 font-mono text-[#a1a1aa]">
                                                {isJavaCourse ? "openjdk-vm:~/workspace" : "cpython3.11:~/workspace"}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-primary/70">{runState.engine}</span>
                                        </div>
                                    </div>

                                    {/* Terminal Output Scroll Area */}
                                    <div className="flex-1 overflow-y-auto p-4 space-y-2 leading-relaxed text-[#f5f0e8]/90 select-text">
                                        <div className="text-[#f5f0e8]/40 flex items-center gap-2">
                                            <span className="text-primary">$</span>
                                            <span>
                                                {isJavaCourse ? "javac Main.java && java Main" : "python3 -u solution.py"}
                                            </span>
                                        </div>

                                        {isRunning && (
                                            <div className="flex items-center gap-2 text-[#ea580c] py-2">
                                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                <span>{runState.statusMessage}</span>
                                            </div>
                                        )}

                                        {!runState.hasExecuted && !isRunning && (
                                            <div className="py-3 text-[#f5f0e8]/40 italic">
                                                Click "Compile & Run" (or press Ctrl + Enter) to compile AST, verify bytecode, and execute the solution.
                                            </div>
                                        )}

                                        {runState.hasExecuted && runState.output && (
                                            <pre className="whitespace-pre-wrap text-white font-mono text-xs leading-relaxed bg-[#0a0a0a] p-3 rounded-lg border border-[#222222]">
                                                {runState.output}
                                            </pre>
                                        )}

                                        {runState.hasExecuted && runState.error && (
                                            <div className="bg-rose-950/30 border border-rose-800/40 rounded-lg p-3 text-rose-300">
                                                <div className="flex items-center gap-1.5 font-semibold text-rose-200 mb-1 text-[11px]">
                                                    <AlertTriangle className="h-3.5 w-3.5 text-rose-400" />
                                                    <span>Compilation / Runtime Exception</span>
                                                </div>
                                                <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-rose-300">
                                                    {runState.error}
                                                </pre>
                                            </div>
                                        )}

                                        {runState.hasExecuted && !isRunning && (
                                            <div className="pt-2 text-[11px] text-[#71717a] border-t border-[#1c1c1c] flex items-center justify-between">
                                                <span>
                                                    [Program exited with code {runState.exitCode} in {runState.executionMs}ms (compilation: {runState.compileMs}ms)]
                                                </span>
                                                <span className="text-[10px]">{runState.runTimestamp}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Tab 2: Test Verification Body */}
                            {activeTab === "tests" && (
                                <div className="flex-1 overflow-y-auto p-4 space-y-4 font-mono text-xs">
                                    {!runState.hasExecuted ? (
                                        <div className="p-6 text-center text-[#71717a]">
                                            <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-[#52525b]" />
                                            <p className="text-xs">No execution results yet.</p>
                                            <p className="text-[11px] text-[#71717a] mt-1">Compile and run your solution to verify challenge output.</p>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Status Banner */}
                                            {runState.testPassed ? (
                                                <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-3">
                                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                                    <div>
                                                        <h4 className="text-primary font-semibold font-sans text-sm">
                                                            Challenge Passed! All Test Assertions Verified.
                                                        </h4>
                                                        <p className="text-foreground/80 text-xs font-sans mt-0.5">
                                                            Your program output matches the expected target string perfectly.
                                                        </p>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 flex items-start gap-3">
                                                    <XCircle className="h-5 w-5 text-rose-400 shrink-0 mt-0.5" />
                                                    <div>
                                                        <h4 className="text-rose-300 font-medium font-sans text-sm">
                                                            Output Validation Mismatch
                                                        </h4>
                                                        <p className="text-rose-400/80 text-xs font-sans mt-0.5">
                                                            Your output differed from the required test target. Check string formatting or extra characters.
                                                        </p>
                                                    </div>
                                                </div>
                                            )}

                                            {/* Side-by-side comparison */}
                                            <div className="grid sm:grid-cols-2 gap-3">
                                                <div className="p-3 rounded-lg border border-[#222222] bg-[#0a0a0a]">
                                                    <span className="text-[10px] text-[#ea580c] uppercase tracking-wider block mb-1">
                                                        Expected Target Output
                                                    </span>
                                                    <pre className="p-2.5 rounded bg-black text-[#ea580c] font-mono text-xs whitespace-pre-wrap break-all border border-[#1c1c1c]">
                                                        {lesson.challenge_data.expectedOutput || "(no expected string specified)"}
                                                    </pre>
                                                </div>

                                                <div className="p-3 rounded-lg border border-[#222222] bg-[#0a0a0a]">
                                                    <span className="text-[10px] text-[#a1a1aa] uppercase tracking-wider block mb-1">
                                                        Your Actual Console Output
                                                    </span>
                                                    <pre className={`p-2.5 rounded font-mono text-xs whitespace-pre-wrap break-all border ${
                                                        runState.testPassed
                                                            ? "bg-black text-primary border-[#1c1c1c]"
                                                            : "bg-black text-rose-300 border-[#1c1c1c]"
                                                    }`}>
                                                        {runState.output.trim() || "(no output emitted)"}
                                                    </pre>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            )}

                            {/* Tab 3: Compiler Diagnostics Body */}
                            {activeTab === "diagnostics" && (
                                <div className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-xs">
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        <div className="p-3 rounded-lg border border-[#222222] bg-[#0a0a0a]">
                                            <span className="text-[10px] text-[#ea580c] uppercase block mb-1">Runtime Engine</span>
                                            <p className="text-xs text-white font-semibold">{runState.engine}</p>
                                            <p className="text-[10px] text-[#71717a] mt-1">
                                                {isJavaCourse ? "Remote OpenJDK 15 Isolation Worker" : "In-Browser WebAssembly Virtual Machine"}
                                            </p>
                                        </div>

                                        <div className="p-3 rounded-lg border border-[#222222] bg-[#0a0a0a]">
                                            <span className="text-[10px] text-[#ea580c] uppercase block mb-1">Compilation Metrics</span>
                                            <p className="text-xs text-white">AST / Syntax Time: <span className="text-amber-400">{runState.compileMs}ms</span></p>
                                            <p className="text-xs text-white mt-0.5">Total Exec Time: <span className="text-amber-400">{runState.executionMs}ms</span></p>
                                        </div>
                                    </div>

                                    <div className="p-3 rounded-lg border border-[#222222] bg-[#0a0a0a]">
                                        <span className="text-[10px] text-[#ea580c] uppercase block mb-1">Pre-Loaded Modules & Capabilities</span>
                                        <div className="flex flex-wrap gap-1.5 mt-2">
                                            {(isJavaCourse ? ["java.util.*", "java.io.*", "java.math.*", "java.lang.*"] : ["sys", "math", "collections", "itertools", "heapq", "json", "re", "random"]).map(m => (
                                                <span key={m} className="px-2 py-0.5 rounded bg-[#141414] border border-[#262626] text-[10px] text-[#d4d4d8]">
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Challenge Passed Celebration CTA Bar */}
                            {runState.testPassed && (
                                <div className="p-3 border-t border-[#262626] bg-[#0a0a0a] flex flex-wrap items-center justify-between gap-3 shrink-0">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        <span className="text-xs font-medium text-white">
                                            Challenge Solved! Awarding +{lesson.xp_reward || 100} XP
                                        </span>
                                    </div>

                                    <button
                                        onClick={handleComplete}
                                        disabled={isSubmittingProgress}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#ea580c] hover:bg-[#c2410c] text-white px-5 py-2 text-xs font-medium transition-all shadow-md active:scale-95"
                                    >
                                        {isSubmittingProgress ? (
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                        ) : (
                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                        )}
                                        <span>Complete & Continue</span>
                                        <ChevronRight className="h-3.5 w-3.5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col h-full items-center justify-center p-8 text-center text-[#f5f0e8]/60 text-sm space-y-4">
                        <div className="p-3 rounded-full bg-primary/10 border border-primary/20 text-primary">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="max-w-xs space-y-1">
                            <p className="font-serif text-base text-white">Conceptual Study Chapter</p>
                            <p className="text-xs text-muted-foreground">
                                Review the notes on the left. When finished, mark this chapter complete to bank your XP.
                            </p>
                        </div>
                        <button
                            onClick={handleComplete}
                            disabled={isSubmittingProgress}
                            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-white px-6 py-2.5 text-xs font-medium transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                            {isSubmittingProgress ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                            ) : (
                                <CheckCircle2 className="h-3.5 w-3.5" />
                            )}
                            <span>Mark Chapter Completed (+{lesson?.xp_reward || 100} XP)</span>
                        </button>
                    </div>
                )}
            </div>

            {/* Axel AI Mentor Drawer */}
            {lesson && (
                <AxelTutorDrawer
                    isOpen={isAxelOpen}
                    onClose={() => setIsAxelOpen(false)}
                    problem={{
                        id: lesson.id || "lesson",
                        title: lesson.title || "Lesson Challenge",
                        difficulty: "Medium",
                        category: isJavaCourse ? "Java" : "Python",
                        description: lesson.challenge_data?.description || lesson.content || "",
                        starterCode: lesson.challenge_data?.initialCode || "",
                        tests: lesson.challenge_data?.tests || [],
                    } as any}
                    userCode={code}
                    runResult={runState.hasExecuted ? {
                        status: runState.testPassed ? "success" : "error",
                        output: runState.output,
                        error: runState.error,
                        executionMs: runState.executionMs,
                        compileMs: runState.compileMs,
                        testsPassed: runState.testPassed ? 1 : 0,
                        testsTotal: 1,
                    } as any : null}
                />
            )}
        </div>
    )
}
