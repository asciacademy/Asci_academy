"use client"

import React, { useState } from "react"
import {
  Keyboard,
  Cpu,
  FileCode2,
  Terminal,
  HelpCircle,
  Sparkles,
  Command,
  ChevronUp
} from "lucide-react"
import { cn } from "@/lib/utils"

interface EditorStatusBarProps {
  language: string
  cursorPos?: { line: number; col: number }
  lineCount?: number
  charCount?: number
  onRunCode?: () => void
  onSubmitCode?: () => void
}

const RUNTIME_BADGES: Record<string, { label: string; runtime: string; color: string }> = {
  javascript: { label: "JS", runtime: "Node v20.12", color: "text-amber-400 bg-amber-500/10 border-amber-500/20" },
  typescript: { label: "TS", runtime: "TSC v5.7", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  python: { label: "PY", runtime: "Pyodide v0.26", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  java: { label: "JAVA", runtime: "OpenJDK 21", color: "text-orange-400 bg-orange-500/10 border-orange-500/20" },
  cpp: { label: "C++", runtime: "GCC 14.1", color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
}

export function EditorStatusBar({
  language,
  cursorPos = { line: 1, col: 1 },
  lineCount = 1,
  charCount = 0,
  onRunCode,
  onSubmitCode,
}: EditorStatusBarProps) {
  const [showShortcuts, setShowShortcuts] = useState(false)
  const currentBadge = RUNTIME_BADGES[language] || {
    label: language.toUpperCase(),
    runtime: "Engine Active",
    color: "text-primary bg-primary/10 border-primary/20",
  }

  const isMac = typeof window !== "undefined" && navigator.platform.toUpperCase().indexOf("MAC") >= 0
  const modKey = isMac ? "⌘" : "Ctrl"

  return (
    <div className="relative border-t border-[#2a2a2a] bg-[#141414] text-[#8e8e8e] px-3 py-1 flex items-center justify-between text-[11px] font-mono select-none shrink-0 z-10">
      {/* Left: Position & File metrics */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
          <span className="text-foreground/90 font-medium">Ln {cursorPos.line}</span>
          <span className="text-muted-foreground/60">:</span>
          <span className="text-foreground/90 font-medium">Col {cursorPos.col}</span>
        </div>

        <span className="h-3 w-px bg-[#2a2a2a]" />

        <div className="hidden sm:flex items-center gap-2 text-muted-foreground/80">
          <span>{lineCount} lines</span>
          <span className="text-muted-foreground/40">•</span>
          <span>{charCount} chars</span>
        </div>

        <span className="hidden sm:block h-3 w-px bg-[#2a2a2a]" />

        <div className="hidden md:flex items-center gap-1.5 text-muted-foreground/80">
          <span>Spaces: 2</span>
          <span className="text-muted-foreground/40">•</span>
          <span>UTF-8</span>
        </div>
      </div>

      {/* Right: Runtime info & Keyboard shortcuts tooltip */}
      <div className="flex items-center gap-2.5">
        {/* Runtime Badge */}
        <div className={cn("px-2 py-0.5 rounded text-[10px] font-semibold border flex items-center gap-1.5", currentBadge.color)}>
          <Cpu className="h-2.5 w-2.5" />
          <span>{currentBadge.label}</span>
          <span className="opacity-75 font-normal hidden lg:inline">({currentBadge.runtime})</span>
        </div>

        {/* Shortcuts Popover Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowShortcuts(prev => !prev)}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-[#252525] hover:text-foreground transition-colors text-muted-foreground"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="h-3 w-3" />
            <span className="hidden sm:inline">Shortcuts</span>
            <ChevronUp className={cn("h-2.5 w-2.5 transition-transform", showShortcuts && "rotate-180")} />
          </button>

          {/* Shortcuts Overlay Panel */}
          {showShortcuts && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowShortcuts(false)}
              />
              <div className="absolute bottom-7 right-0 z-50 w-64 rounded-lg border border-[#333] bg-[#1a1a1a] p-3 shadow-2xl shadow-black/80 text-foreground animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between pb-2 border-b border-[#2d2d2d] mb-2.5">
                  <span className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <Command className="h-3 w-3 text-primary" />
                    IDE Shortcuts
                  </span>
                  <span className="text-[10px] text-muted-foreground">Workstation</span>
                </div>

                <div className="space-y-2 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Run Testcases</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[#252525] border border-[#3a3a3a] text-foreground text-[10px] font-semibold">
                      {modKey} + Enter
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Submit Solution</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[#252525] border border-[#3a3a3a] text-foreground text-[10px] font-semibold">
                      {modKey} + Shift + Enter
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Toggle Comment</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[#252525] border border-[#3a3a3a] text-foreground text-[10px] font-semibold">
                      {modKey} + /
                    </kbd>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Format / Indent</span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[#252525] border border-[#3a3a3a] text-foreground text-[10px] font-semibold">
                      Shift + Tab
                    </kbd>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
