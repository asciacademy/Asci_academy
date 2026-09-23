"use client"

import React, { useState } from "react"
import { Check, Copy, AlertCircle, Bot, Sparkles, SplitSquareVertical } from "lucide-react"
import { cn } from "@/lib/utils"

interface TestOutputDiffProps {
  expected: string
  actual: string
  input?: string
  errorMessage?: string
  onAskAxel?: (context: { expected: string; actual: string; input?: string; errorMessage?: string }) => void
}

export function TestOutputDiff({
  expected,
  actual,
  input,
  errorMessage,
  onAskAxel,
}: TestOutputDiffProps) {
  const [copiedExpected, setCopiedExpected] = useState(false)
  const [copiedActual, setCopiedActual] = useState(false)

  const copyToClipboard = (text: string, isExpected: boolean) => {
    navigator.clipboard.writeText(text)
    if (isExpected) {
      setCopiedExpected(true)
      setTimeout(() => setCopiedExpected(false), 1500)
    } else {
      setCopiedActual(true)
      setTimeout(() => setCopiedActual(false), 1500)
    }
  }

  // Token-level mismatch highlighting
  const expTokens = expected.trim().split(/(\s+|[,\(\)\[\]\{\}])/).filter(Boolean)
  const actTokens = actual.trim().split(/(\s+|[,\(\)\[\]\{\}])/).filter(Boolean)

  return (
    <div className="rounded-lg border border-red-500/20 bg-red-500/[0.03] overflow-hidden my-2.5 font-mono text-xs">
      {/* Diff Header */}
      <div className="px-3 py-2 bg-red-500/10 border-b border-red-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-red-400 font-semibold text-xs">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span className="truncate">Output Discrepancy Detected</span>
        </div>

        {onAskAxel && (
          <button
            onClick={() => onAskAxel({ expected, actual, input, errorMessage })}
            className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium text-xs transition-all shadow-xs hover:shadow-primary/25 cursor-pointer w-full sm:w-auto"
          >
            <Bot className="h-3.5 w-3.5" />
            <span>Explain with Axel AI</span>
            <Sparkles className="h-3 w-3 text-amber-300" />
          </button>
        )}
      </div>

      {/* Input Context if provided */}
      {input && (
        <div className="px-3 py-2 border-b border-border/40 bg-secondary/20">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Testcase Input:</span>
          <pre className="mt-1 text-foreground/90 whitespace-pre-wrap break-all font-mono text-[11px] bg-background/50 p-1.5 rounded border border-border/30">
            {input}
          </pre>
        </div>
      )}

      {/* Side-by-side or Stacked Diff */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/40">
        {/* Your Output */}
        <div className="p-3 bg-red-950/10">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] uppercase tracking-wider text-red-400 font-semibold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
              Your Output
            </span>
            <button
              onClick={() => copyToClipboard(actual, false)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Copy your output"
            >
              {copiedActual ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <div className="p-2 rounded bg-background/80 border border-red-500/20 text-red-200 overflow-x-auto min-h-[48px] whitespace-pre-wrap break-all">
            {actual || <span className="italic text-muted-foreground/60">&lt;empty output&gt;</span>}
          </div>
        </div>

        {/* Expected Output */}
        <div className="p-3 bg-emerald-950/10">
          <div className="flex items-center justify-between pb-1.5">
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Expected Output
            </span>
            <button
              onClick={() => copyToClipboard(expected, true)}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              title="Copy expected output"
            >
              {copiedExpected ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
            </button>
          </div>
          <div className="p-2 rounded bg-background/80 border border-emerald-500/20 text-emerald-200 overflow-x-auto min-h-[48px] whitespace-pre-wrap break-all">
            {expected}
          </div>
        </div>
      </div>

      {/* Runtime Exception Trace if present */}
      {errorMessage && (
        <div className="p-3 border-t border-red-500/20 bg-red-950/20 text-red-300">
          <span className="text-[10px] uppercase tracking-wider font-semibold text-red-400">Runtime Diagnostics:</span>
          <pre className="mt-1 font-mono text-[11px] whitespace-pre-wrap break-all">{errorMessage}</pre>
        </div>
      )}
    </div>
  )
}
