"use client"

import React, { useState } from "react"
import { useAxel } from "@/context/axel-context"
import {
  Sparkles,
  Bot,
  Brain,
  Code2,
  Zap,
  ArrowRight,
  Send,
  MessageSquareCode,
  ShieldCheck,
} from "lucide-react"

export interface AxelCardProps {
  className?: string
  currentLevel?: number
  potdTitle?: string
  curriculumCourseTitle?: string
  onSwitchTab?: (tab: string) => void
  compact?: boolean
}

export function AxelCard({
  className = "",
  currentLevel = 1,
  potdTitle,
  curriculumCourseTitle,
  onSwitchTab,
  compact = false,
}: AxelCardProps) {
  const { openFocus, sendMessage, isThinking, isSpeaking } = useAxel()
  const [quickInput, setQuickInput] = useState("")

  const quickPrompts = [
    {
      icon: Sparkles,
      label: "Explain DSA Pattern",
      prompt: "Can you explain the optimal two-pointer and sliding window pattern with a concise example?",
    },
    {
      icon: Code2,
      label: "Code Review",
      prompt: "Review my recent algorithm implementation and check for edge cases and optimal Big-O complexity.",
    },
    {
      icon: Brain,
      label: "Interview Question",
      prompt: `Ask me a technical interview question suitable for an engineer at Level ${currentLevel}.`,
    },
    {
      icon: Zap,
      label: "Daily Problem Hint",
      prompt: `Give me a Socratic hint without revealing the direct solution for "${potdTitle || "Today's Coding Problem"}".`,
    },
  ]

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!quickInput.trim()) {
      openFocus()
      return
    }
    openFocus()
    sendMessage(quickInput)
    setQuickInput("")
  }

  const handlePromptClick = (prompt: string) => {
    openFocus()
    sendMessage(prompt)
  }

  return (
    <article
      aria-label="Axel AI Copilot Card"
      className={`rounded-2xl border border-emerald-500/25 dark:border-emerald-500/30 bg-gradient-to-br from-emerald-950/30 via-card/95 to-card/95 p-4 sm:p-5 shadow-xs backdrop-blur-xl relative overflow-hidden transition-all duration-300 ${className}`}
    >
      {/* Ambient background lighting */}
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 dark:bg-emerald-400/10 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-[#D4B872]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header Row: Axel Identity + Live Status + Chat Trigger */}
      <div className="flex items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 min-w-0">
          {/* Animated Avatar */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-primary/25 via-emerald-800/30 to-[#D4B872]/20 border border-primary/35 flex items-center justify-center text-primary shadow-xs">
              <Bot className="w-5 h-5 text-primary animate-pulse" />
            </div>
            {/* Live Status Beacon */}
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
          </div>

          {/* Titles & Status */}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm sm:text-base font-bold text-foreground tracking-tight flex items-center gap-1.5">
                <span>Axel AI Copilot</span>
                <span className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {isSpeaking ? "Speaking" : isThinking ? "Thinking" : "Online"}
                </span>
              </h2>
            </div>
            <p className="text-xs text-muted-foreground truncate">
              24/7 Algorithmic & Code Mentor · Socratic Guidance
            </p>
          </div>
        </div>

        {/* Primary Ask Axel Action */}
        <button
          onClick={() => openFocus()}
          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-xs active:scale-[0.98] shrink-0"
          title="Open Axel AI Full Conversation"
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="hidden min-[420px]:inline">Ask Axel</span>
          <span className="min-[420px]:hidden">Chat</span>
        </button>
      </div>

      {/* Interactive Command Prompt Affordance */}
      <form onSubmit={handleQuickSubmit} className="mt-3.5 relative z-10">
        <div className="flex items-center gap-2 bg-background/80 dark:bg-black/40 border border-border/80 dark:border-white/10 rounded-xl p-1.5 focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/30 transition-all shadow-2xs">
          <Sparkles className="w-4 h-4 text-primary ml-2 shrink-0" />
          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder="Ask Axel anything (code hints, DSA patterns, roadmap)..."
            className="flex-1 bg-transparent border-none text-xs text-foreground placeholder:text-muted-foreground/70 focus:outline-none px-1 py-1"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 transition-all cursor-pointer shrink-0"
            title="Send query to Axel AI"
          >
            <span>Ask</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </form>

      {/* Horizontal Curated Prompt Chips */}
      {!compact && (
        <div className="mt-3 relative z-10">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 -mx-1 px-1">
            {quickPrompts.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handlePromptClick(item.prompt)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-secondary/80 hover:bg-primary/15 text-foreground hover:text-primary border border-border/70 hover:border-primary/40 transition-all cursor-pointer whitespace-nowrap shrink-0 group active:scale-[0.98]"
              >
                <item.icon className="w-3 h-3 text-primary group-hover:scale-110 transition-transform shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
