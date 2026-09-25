"use client"

import React from "react"
import { useAxel } from "@/context/axel-context"
import {
  Bug,
  BrainCircuit,
  Zap,
  Bot,
  Sparkles,
  ArrowRight,
  Terminal,
  CheckCircle2,
  Code2,
} from "lucide-react"

export interface CopilotActionDeckProps {
  className?: string
  potd?: {
    id?: string
    title: string
    difficulty: string
    category?: string
    solved?: boolean
    xpReward?: number
  } | null
  curriculumCourse?: {
    id?: string
    title: string
    slug?: string
  } | null
  currentLevel?: number
  onSwitchTab: (tab: string) => void
  onOpenAxel?: () => void
}

export function CopilotActionDeck({
  className = "",
  potd,
  curriculumCourse,
  currentLevel = 1,
  onSwitchTab,
  onOpenAxel,
}: CopilotActionDeckProps) {
  const { openFocus, isThinking, isSpeaking } = useAxel()

  const handleOpenAxel = () => {
    if (onOpenAxel) {
      onOpenAxel()
    } else {
      openFocus()
    }
  }

  return (
    <section
      aria-label="Core Engineering Actions & AI Copilot"
      className={`rounded-2xl border border-primary/20 bg-gradient-to-br from-emerald-950/20 via-card/95 to-card/95 p-4 sm:p-5 shadow-xs backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Ambient background glow */}
      <div className="absolute -top-12 left-1/4 w-72 h-36 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 right-10 w-48 h-28 bg-[#D4B872]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header bar with Live Status */}
      <div className="flex items-center justify-between gap-3 mb-3.5 relative z-10">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary" />
          <h2 className="text-xs sm:text-sm font-bold text-foreground tracking-tight uppercase font-mono flex items-center gap-2">
            <span>Engineering Hub</span>
            <span className="text-[10px] font-normal text-muted-foreground font-sans lowercase hidden sm:inline">
              · compiler, daily challenges & AI mentor
            </span>
          </h2>
        </div>

        {/* Live Axel status badge */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] font-mono font-semibold text-emerald-400">
            {isSpeaking ? "Axel Speaking" : isThinking ? "Axel Thinking" : "Axel Ready"}
          </span>
        </div>
      </div>

      {/* 4-Tile Responsive Bento Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 relative z-10">
        {/* ─────────────────────────────────────────────────────────────
            1. Debug Code
        ───────────────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => onSwitchTab("practice")}
          className="p-3.5 sm:p-4 rounded-xl border border-border/80 bg-card/70 hover:bg-card hover:border-rose-500/40 transition-all duration-300 cursor-pointer text-left group shadow-2xs hover:shadow-md flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md active:scale-[0.98] min-h-[120px] sm:min-h-[135px]"
          title="Open Practice Arena Compiler & Debugger"
        >
          {/* Subtle hover accent light */}
          <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center justify-between gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform shrink-0">
              <Bug className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground group-hover:text-rose-400 group-hover:bg-rose-500/10 transition-colors">
              IDE
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-rose-400 transition-colors tracking-tight truncate">
                Debug Code
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-rose-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 hidden sm:block" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
              Live practice compiler & sandbox
            </p>
          </div>
        </button>

        {/* ─────────────────────────────────────────────────────────────
            2. Quick Quiz
        ───────────────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => onSwitchTab("assessments")}
          className="p-3.5 sm:p-4 rounded-xl border border-border/80 bg-card/70 hover:bg-card hover:border-[#D4B872]/40 transition-all duration-300 cursor-pointer text-left group shadow-2xs hover:shadow-md flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md active:scale-[0.98] min-h-[120px] sm:min-h-[135px]"
          title="Open Knowledge Quizzes & Assessments"
        >
          {/* Subtle hover accent light */}
          <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4B872]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center justify-between gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#D4B872]/10 border border-[#D4B872]/25 flex items-center justify-center text-[#D4B872] group-hover:scale-110 transition-transform shrink-0">
              <BrainCircuit className="w-4 h-4" />
            </div>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-secondary text-muted-foreground group-hover:text-[#D4B872] group-hover:bg-[#D4B872]/10 transition-colors">
              +25 XP
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-[#D4B872] transition-colors tracking-tight truncate">
                Quick Quiz
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-[#D4B872] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 hidden sm:block" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
              {curriculumCourse?.title || "Core DSA & Architecture"}
            </p>
          </div>
        </button>

        {/* ─────────────────────────────────────────────────────────────
            3. Daily Problem
        ───────────────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => onSwitchTab("practice")}
          className="p-3.5 sm:p-4 rounded-xl border border-border/80 bg-card/70 hover:bg-card hover:border-emerald-500/40 transition-all duration-300 cursor-pointer text-left group shadow-2xs hover:shadow-md flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md active:scale-[0.98] min-h-[120px] sm:min-h-[135px]"
          title="Solve Today's Problem of the Day"
        >
          {/* Subtle hover accent light */}
          <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="flex items-center justify-between gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <span
              className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded transition-colors ${
                potd?.solved
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : "bg-secondary text-muted-foreground group-hover:text-emerald-400 group-hover:bg-emerald-500/10"
              }`}
            >
              {potd?.solved ? "✓ Solved" : "+50 XP"}
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-emerald-400 transition-colors tracking-tight truncate">
                Daily Problem
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-emerald-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 hidden sm:block" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
              {potd?.title || "Daily Coding Challenge"}
            </p>
          </div>
        </button>

        {/* ─────────────────────────────────────────────────────────────
            4. Ask Axel (Featured AI Copilot Card)
        ───────────────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={handleOpenAxel}
          className="p-3.5 sm:p-4 rounded-xl border border-primary/35 bg-gradient-to-br from-primary/20 via-card/80 to-card hover:border-primary transition-all duration-300 cursor-pointer text-left group shadow-xs hover:shadow-md flex flex-col justify-between gap-3 relative overflow-hidden backdrop-blur-md active:scale-[0.98] min-h-[120px] sm:min-h-[135px]"
          title="Chat with Axel AI Mentor"
        >
          {/* Constant luminous top accent */}
          <div className="absolute top-0 right-0 left-0 h-0.5 bg-gradient-to-r from-primary via-emerald-400 to-[#D4B872] opacity-100" />

          <div className="flex items-center justify-between gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-primary/20 border border-primary/35 flex items-center justify-center text-primary group-hover:scale-110 transition-transform shrink-0 relative">
              <Bot className="w-4 h-4" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
            </div>
            <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              <span>AI</span>
            </span>
          </div>

          <div>
            <div className="flex items-center justify-between gap-1">
              <span className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors tracking-tight truncate">
                Ask Axel
              </span>
              <Sparkles className="w-3.5 h-3.5 text-primary opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all shrink-0 hidden sm:block" />
            </div>
            <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
              Socratic hints & instant code help
            </p>
          </div>
        </button>
      </div>
    </section>
  )
}
