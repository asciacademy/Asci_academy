"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import {
  Play, Pause, RotateCcw, ChevronLeft, ChevronRight,
  Activity, Layers, Search, Database, ArrowDown, Check,
  Zap, Info, BookOpen
} from "lucide-react"
import { ProblemDetail, ProblemVisualSpec, VisualStep } from "@/lib/dsa/problem-catalog"
import { cn } from "@/lib/utils"

interface ProblemVisualizerProps {
  problem: ProblemDetail
  className?: string
}

export function ProblemVisualizer({ problem, className }: ProblemVisualizerProps) {
  // Generate a robust visual spec if none explicitly defined in the data
  const visualSpec: ProblemVisualSpec = useMemo(() => {
    if (problem.visualSpec && problem.visualSpec.steps.length > 0) {
      return problem.visualSpec
    }

    // Dynamic fallback for any general problem based on its test cases and parameters
    const firstTest = problem.testCases[0] || { input: [1, 2], expected: 3 }
    const inputStr = Array.isArray(firstTest.input) ? firstTest.input.join(", ") : String(firstTest.input)
    const expectedStr = typeof firstTest.expected === "object" ? JSON.stringify(firstTest.expected) : String(firstTest.expected)

    return {
      type: "flow-diagram",
      dataLabel: "Execution Pipeline",
      elements: Array.isArray(firstTest.input[0]) ? firstTest.input[0] : [firstTest.input[0], firstTest.input[1]].filter(v => v !== undefined),
      steps: [
        {
          stepIndex: 1,
          title: "1. Receive & Unpack Inputs",
          description: `The function '${problem.functionName}' receives input values (${inputStr}).`,
          status: "active",
          auxiliaryState: { "Input": inputStr }
        },
        {
          stepIndex: 2,
          title: "2. Algorithmic State Transformation",
          description: `Evaluate condition, iterate, or compute state according to the problem logic.`,
          status: "active",
          auxiliaryState: { "Process": "Computing solution" }
        },
        {
          stepIndex: 3,
          title: "3. Verified Return Value",
          description: `Computation concludes successfully with expected outcome: ${expectedStr}.`,
          status: "match",
          auxiliaryState: { "Result": expectedStr }
        }
      ]
    }
  }, [problem])

  const [currentStepIdx, setCurrentStepIdx] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState<1 | 2>(1)

  const steps = visualSpec.steps
  const currentStep: VisualStep = steps[currentStepIdx] || steps[0]
  const totalSteps = steps.length

  // Reset step whenever problem changes
  useEffect(() => {
    setCurrentStepIdx(0)
    setIsPlaying(false)
  }, [problem.id])

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return

    const intervalTime = speed === 1 ? 2000 : 1000
    const timer = setInterval(() => {
      setCurrentStepIdx(prev => {
        if (prev >= totalSteps - 1) {
          setIsPlaying(false)
          return prev
        }
        return prev + 1
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [isPlaying, totalSteps, speed])

  const handleNext = () => {
    if (currentStepIdx < totalSteps - 1) {
      setCurrentStepIdx(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setCurrentStepIdx(prev => prev - 1)
    }
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStepIdx(0)
  }

  const togglePlay = () => {
    if (currentStepIdx >= totalSteps - 1) {
      setCurrentStepIdx(0)
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className={cn("flex flex-col rounded-2xl border border-border bg-card/60 overflow-hidden shadow-xs", className)}>
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border/80 bg-secondary/30">
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Activity className="h-3.5 w-3.5" />
          </div>
          <div>
            <span className="text-xs font-semibold text-foreground tracking-tight">
              Interactive Visual Walkthrough
            </span>
            <span className="hidden sm:inline-block ml-2 text-[11px] text-muted-foreground">
              {visualSpec.type.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Step Progress Pill & Speed */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setSpeed(s => (s === 1 ? 2 : 1))}
            className="px-2 py-0.5 rounded-md border border-border hover:bg-secondary text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors"
            title="Toggle playback speed"
          >
            {speed}x Speed
          </button>
          <div className="px-2.5 py-0.5 rounded-full bg-secondary text-[11px] font-mono text-foreground/80 border border-border">
            Step {currentStepIdx + 1} / {totalSteps}
          </div>
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="p-4 sm:p-6 flex flex-col items-center justify-center min-h-[200px] bg-background/50 relative overflow-hidden">
        {/* Subtle decorative grid background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Dynamic Renderers based on visualSpec.type */}
        {visualSpec.type === "array-pointers" || visualSpec.type === "hash-map" || visualSpec.type === "sliding-window" ? (
          <div className="w-full flex flex-col items-center gap-6 z-10">
            {/* Array Tiles Container */}
            {visualSpec.elements && visualSpec.elements.length > 0 && (
              <div className="w-full flex flex-col items-center">
                <span className="text-[11px] font-mono text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Layers className="h-3 w-3 text-primary" />
                  {visualSpec.dataLabel || "Array Indices & Values"}
                </span>

                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-full overflow-x-auto py-2 px-1">
                  {visualSpec.elements.map((elem, idx) => {
                    const isHighlighted = currentStep.highlightIndices?.includes(idx)
                    const isMatch = currentStep.status === "match" && isHighlighted
                    const isMismatch = currentStep.status === "mismatch" && isHighlighted

                    // Check if any pointer points to this index
                    const activePointers = currentStep.pointers?.filter(p => p.index === idx) || []

                    return (
                      <div key={idx} className="flex flex-col items-center relative">
                        {/* Pointer Tag Above Tile */}
                        <div className="h-6 flex items-center justify-center mb-1">
                          {activePointers.map((p, pIdx) => (
                            <span
                              key={pIdx}
                              className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold font-mono bg-primary text-primary-foreground shadow-xs animate-in zoom-in-75 duration-200"
                            >
                              {p.label}
                              <ArrowDown className="h-2.5 w-2.5" />
                            </span>
                          ))}
                        </div>

                        {/* Array Cell Tile */}
                        <div
                          className={cn(
                            "h-12 w-12 sm:h-14 sm:w-14 rounded-xl border-2 flex flex-col items-center justify-center font-mono font-bold text-sm sm:text-base transition-all duration-300 shadow-xs",
                            isMatch
                              ? "bg-primary/20 border-primary text-primary scale-105 shadow-xs"
                              : isMismatch
                              ? "bg-destructive/15 border-destructive/80 text-destructive"
                              : isHighlighted
                              ? "bg-primary/20 border-primary text-primary scale-105 shadow-xs"
                              : "bg-card border-border text-foreground hover:border-foreground/30"
                          )}
                        >
                          <span>{String(elem)}</span>
                        </div>

                        {/* Index Number Below Tile */}
                        <span className="mt-1.5 text-[10px] font-mono text-muted-foreground/70">
                          [{idx}]
                        </span>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Auxiliary State (e.g. Hash Map Notepad or Sliding Window metrics) */}
            {currentStep.auxiliaryState && Object.keys(currentStep.auxiliaryState).length > 0 && (
              <div className="w-full max-w-md rounded-xl border border-border/80 bg-secondary/20 p-3 sm:p-4 animate-in fade-in duration-200">
                <div className="flex items-center gap-1.5 mb-2.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                  <Database className="h-3.5 w-3.5 text-primary" />
                  <span>Memory Notepad / State Tracker</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  {Object.entries(currentStep.auxiliaryState).map(([k, v]) => (
                    <div key={k} className="flex items-center justify-between p-2 rounded-lg bg-card border border-border/60">
                      <span className="text-muted-foreground">{k}:</span>
                      <span className="font-semibold text-primary">{String(v)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* General Algorithmic Flow Diagram */
          <div className="w-full max-w-lg flex flex-col items-center gap-4 z-10 py-2">
            <div className="flex items-center justify-center gap-2 sm:gap-4 w-full flex-wrap">
              {currentStep.auxiliaryState && Object.entries(currentStep.auxiliaryState).map(([k, v], idx) => (
                <div key={k} className="flex items-center gap-2">
                  <div className="p-3 rounded-xl border border-border bg-card flex flex-col items-center min-w-[100px] shadow-xs">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{k}</span>
                    <span className="text-sm font-bold font-mono text-foreground mt-0.5">{String(v)}</span>
                  </div>
                  {idx < Object.keys(currentStep.auxiliaryState!).length - 1 && (
                    <ChevronRight className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Step Explanation Callout */}
      <div className="p-4 border-t border-border bg-secondary/15 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className={cn(
            "px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase tracking-wider",
            currentStep.status === "match"
              ? "bg-primary/20 text-primary border border-primary/30"
              : currentStep.status === "mismatch"
              ? "bg-destructive/20 text-destructive border border-destructive/30"
              : "bg-primary/20 text-primary border border-primary/30"
          )}>
            {currentStep.status === "match" ? "Match Found" : currentStep.status === "mismatch" ? "Mismatch" : "Evaluating"}
          </span>
          <h4 className="text-xs sm:text-sm font-semibold text-foreground">
            {currentStep.title}
          </h4>
        </div>
        <p className="text-xs text-body leading-relaxed">
          {currentStep.description}
        </p>
      </div>

      {/* Bottom Interactive Playback Controls */}
      <div className="px-4 py-3 border-t border-border/80 bg-secondary/30 flex items-center justify-between gap-3">
        {/* Step dots */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsPlaying(false)
                setCurrentStepIdx(idx)
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300 cursor-pointer",
                idx === currentStepIdx
                  ? "w-6 bg-primary"
                  : idx < currentStepIdx
                  ? "w-2 bg-primary/40"
                  : "w-2 bg-muted hover:bg-muted-foreground/40"
              )}
              title={`Jump to step ${idx + 1}: ${s.title}`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
            title="Reset to step 1"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={handlePrev}
            disabled={currentStepIdx === 0}
            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Previous Step (←)"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={togglePlay}
            className={cn(
              "px-3 py-1.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all shadow-xs",
              isPlaying
                ? "bg-secondary border border-border text-foreground hover:bg-secondary/80"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
            title={isPlaying ? "Pause visual playback" : "Play step-by-step"}
          >
            {isPlaying ? (
              <>
                <Pause className="h-3.5 w-3.5" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Play</span>
              </>
            )}
          </button>
          <button
            onClick={handleNext}
            disabled={currentStepIdx === totalSteps - 1}
            className="p-1.5 rounded-lg border border-border hover:bg-secondary text-muted-foreground hover:text-foreground disabled:opacity-30 disabled:pointer-events-none transition-colors"
            title="Next Step (→)"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}
