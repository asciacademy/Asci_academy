"use client"

import React, { useState } from "react"
import {
  BrainCircuit,
  Lightbulb,
  Cpu,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Send,
  Lock,
  CheckCircle2,
  FileCode2,
  HelpCircle
} from "lucide-react"
import { ProblemDetail } from "@/lib/dsa/problem-catalog"
import { RunResult } from "@/lib/dsa/code-runner"
import { cn } from "@/lib/utils"

interface SocraticHintPanelProps {
  problem: ProblemDetail
  userCode?: string
  runResult?: RunResult | null
  activeFailureContext?: {
    input?: string
    expected?: string
    actual?: string
    errorMessage?: string
  } | null
  onAskFollowUp?: (prompt: string) => void
}

interface SocraticTier {
  tier: 1 | 2 | 3
  title: string
  subtitle: string
  icon: any
  color: string
  content: string
}

export function SocraticHintPanel({
  problem,
  userCode,
  runResult,
  activeFailureContext,
  onAskFollowUp,
}: SocraticHintPanelProps) {
  // Track unlocked tiers (Tier 1 is unlocked by default, Tier 2 & 3 unlock sequentially)
  const [unlockedTier, setUnlockedTier] = useState<number>(1)
  const [expandedTier, setExpandedTier] = useState<number | null>(1)

  // Derive contextual socratic hints based on problem details
  const hints: SocraticTier[] = [
    {
      tier: 1,
      title: "Mental Model & Intuition",
      subtitle: "Understand the core invariant without code spoilers",
      icon: Lightbulb,
      color: "text-amber-400 border-amber-500/30 bg-amber-500/5",
      content:
        problem.realWorldAnalogy ||
        problem.simpleMission ||
        `Focus on the fundamental guarantee: What property must hold true for each element? Before writing loops, imagine processing this manually on paper. Can you eliminate impossible candidates at each step rather than checking everything?`,
    },
    {
      tier: 2,
      title: "Data Structure & Complexity Target",
      subtitle: "Optimal Big-O target and choice of primitives",
      icon: Layers,
      color: "text-blue-400 border-blue-500/30 bg-blue-500/5",
      content:
        (problem.hints && problem.hints[0]) ||
        (problem.commonTraps && problem.commonTraps[0]) ||
        `Optimal target: Aim for linear O(N) or logarithmic O(log N) time rather than quadratic O(N²). Consider whether a Hash Map for instant lookups, Two Pointers (if sorted or monotonically bounded), or a Sliding Window maintains your invariant efficiently.`,
    },
    {
      tier: 3,
      title: "Algorithmic Blueprint (Scaffold)",
      subtitle: "Step-by-step logic scaffold to write your code",
      icon: BrainCircuit,
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/5",
      content:
        problem.mentalModel && problem.mentalModel.length > 0
          ? problem.mentalModel.map((step, idx) => `${idx + 1}. ${step}`).join("\n")
          : `1. Initialize base boundary check (handle empty or single-element inputs).
2. Set up your tracking variables (pointers, accumulator, or seen lookup set).
3. Loop through elements while maintaining the invariant: update state before branching.
4. Return the computed result or default fallback if no valid target was encountered.`,
    },
  ]

  const unlockNextTier = () => {
    const next = Math.min(3, unlockedTier + 1)
    setUnlockedTier(next)
    setExpandedTier(next)
  }

  return (
    <div className="space-y-3 font-sans text-xs">
      {/* Failure Diagnostic Alert if error is active */}
      {activeFailureContext && (
        <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 space-y-2">
          <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs">
            <AlertTriangle className="h-4 w-4" />
            <span>Active Failure Diagnostic</span>
          </div>

          <p className="text-foreground/90 text-[11px] leading-relaxed">
            Your code produced an unexpected result on input{" "}
            <code className="bg-background/80 px-1.5 py-0.5 rounded font-mono text-[10px] text-rose-300">
              {activeFailureContext.input || "given testcase"}
            </code>
            . Look for edge cases: off-by-one loop boundaries, duplicate elements, or unexpected null/undefined values.
          </p>

          {onAskFollowUp && (
            <button
              onClick={() =>
                onAskFollowUp(
                  `Help me debug this failing testcase for ${problem.title}. My code produced: ${activeFailureContext.actual}, but expected: ${activeFailureContext.expected}. Can you guide me to the fix socratically?`
                )
              }
              className="mt-1 flex items-center gap-1.5 text-[11px] text-rose-300 hover:text-rose-100 font-medium underline underline-offset-2 transition-colors cursor-pointer"
            >
              <Sparkles className="h-3 w-3" />
              <span>Ask Axel to diagnose this specific test failure</span>
            </button>
          )}
        </div>
      )}

      {/* Socratic Tiers List */}
      <div className="space-y-2">
        {hints.map(hint => {
          const isUnlocked = unlockedTier >= hint.tier
          const isExpanded = expandedTier === hint.tier

          return (
            <div
              key={hint.tier}
              className={cn(
                "rounded-xl border transition-all overflow-hidden",
                isUnlocked ? hint.color : "border-border/40 bg-secondary/20 opacity-60"
              )}
            >
              {/* Header */}
              <button
                onClick={() => {
                  if (isUnlocked) {
                    setExpandedTier(isExpanded ? null : hint.tier)
                  }
                }}
                disabled={!isUnlocked}
                className="w-full px-3 py-2.5 flex items-center justify-between text-left cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      "p-1.5 rounded-lg border",
                      isUnlocked
                        ? "bg-background/80 border-border/60 text-foreground"
                        : "bg-secondary border-border/20 text-muted-foreground"
                    )}
                  >
                    {isUnlocked ? <hint.icon className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground text-xs">
                        Tier {hint.tier}: {hint.title}
                      </span>
                      {isUnlocked && (
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                          Ready
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground">{hint.subtitle}</p>
                  </div>
                </div>

                <div className="text-muted-foreground">
                  {isUnlocked && (
                    isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />
                  )}
                </div>
              </button>

              {/* Collapsible Content */}
              {isUnlocked && isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-border/20 space-y-2.5 bg-background/40">
                  <p className="text-foreground/90 text-[11px] leading-relaxed whitespace-pre-line font-sans">
                    {hint.content}
                  </p>

                  {onAskFollowUp && (
                    <button
                      onClick={() =>
                        onAskFollowUp(
                          `Regarding Tier ${hint.tier} (${hint.title}) of ${problem.title}: Could you expand on this concept with an everyday analogy?`
                        )
                      }
                      className="text-[10px] text-primary hover:underline flex items-center gap-1 font-medium cursor-pointer"
                    >
                      <Sparkles className="h-2.5 w-2.5" />
                      <span>Ask Axel to elaborate on this hint</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progressive Unlock Action */}
      {unlockedTier < 3 && (
        <button
          onClick={unlockNextTier}
          className="w-full py-2 px-3 rounded-xl border border-dashed border-border hover:border-primary/50 bg-secondary/30 hover:bg-secondary/60 text-muted-foreground hover:text-foreground text-xs font-medium flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <span>Need more guidance? Unlock Tier {unlockedTier + 1} Hint</span>
        </button>
      )}
    </div>
  )
}
