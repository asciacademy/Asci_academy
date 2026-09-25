"use client"

import React, { useState } from "react"
import { Bot, Lightbulb, Compass, Code2, AlertTriangle, Sparkles, HelpCircle, Terminal } from "lucide-react"
import { useAxel } from "@/context/axel-context"

export type AxelContext = "course" | "lesson" | "dsa" | "code" | "project"

export interface ContextualAxelButtonProps {
  context: AxelContext
  topicTitle?: string
  errorMessage?: string
  codeSnippet?: string
  variant?: "button" | "pill" | "banner" | "compact"
  className?: string
  labelOverride?: string
}

/**
 * Phase 16: Contextual Intelligence Layer
 * 
 * Replaces visually dominant 3D widgets with targeted, high-value contextual triggers:
 * - COURSE: Ask Axel "Explain this"
 * - LESSON: Ask Axel "Give me an example"
 * - DSA: Ask Axel "Give me a hint"
 * - CODE: Ask Axel "Explain this error"
 * - PROJECT: Ask Axel "Help me debug"
 * 
 * Integrates directly with Gemini via useAxel().
 */
export function ContextualAxelButton({
  context,
  topicTitle = "",
  errorMessage = "",
  codeSnippet = "",
  variant = "button",
  className = "",
  labelOverride,
}: ContextualAxelButtonProps) {
  const axelContext = useAxelSafe()
  const [clicked, setClicked] = useState(false)

  // Configure action verb, user prompt, and icons according to Phase 16 specs
  const config = {
    course: {
      action: "Explain this",
      subtext: "Get clear conceptual intuition",
      icon: Lightbulb,
      prompt: topicTitle
        ? `Explain this course concept: "${topicTitle}". Give me an intuitive, real-world explanation and the 3 key takeaways I should understand.`
        : "Explain the core concepts and principles taught in this course.",
    },
    lesson: {
      action: "Give me an example",
      subtext: "Practical code demonstration",
      icon: Code2,
      prompt: topicTitle
        ? `Give me a practical, idiomatic code example demonstrating "${topicTitle}". Keep it clean, well-commented, and show standard engineering practices.`
        : "Give me a practical code example illustrating the concept in this lesson.",
    },
    dsa: {
      action: "Give me a hint",
      subtext: "Socratic problem-solving nudge",
      icon: Sparkles,
      prompt: topicTitle
        ? `I am working on the algorithmic problem "${topicTitle}". Give me a subtle Socratic hint on the optimal data structure or traversal technique without spoiling the full solution or writing the complete code.`
        : "Give me a hint for this problem without spoiling the full answer.",
    },
    code: {
      action: "Explain this error",
      subtext: "Debug compiler & runtime errors",
      icon: AlertTriangle,
      prompt: errorMessage
        ? `Explain this code error: "${errorMessage}". ${codeSnippet ? `\nCode context:\n\`\`\`\n${codeSnippet}\n\`\`\`` : ""}\nWhat caused this error and what is the exact step-by-step fix?`
        : `Explain this code execution error: "${topicTitle || "Test assertion failed"}". What is the most likely cause and how do I fix it?`,
    },
    project: {
      action: "Help me debug",
      subtext: "Architecture & troubleshooting",
      icon: Compass,
      prompt: topicTitle
        ? `I'm building the project "${topicTitle}". Help me debug this milestone, verify my component architecture, and check for common concurrency, schema, or API pitfalls.`
        : "Help me debug my project architecture and troubleshoot common pitfalls in this milestone.",
    },
  }[context]

  const Icon = config.icon
  const actionLabel = labelOverride || config.action

  const handleTrigger = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 2000)

    if (axelContext?.openFocus && axelContext?.sendMessage) {
      axelContext.openFocus()
      axelContext.sendMessage(config.prompt)
    } else if (typeof window !== "undefined") {
      // Safe fallback navigation if outside provider
      window.location.href = `/axel?prompt=${encodeURIComponent(config.prompt)}`
    }
  }

  // Variant: Pill
  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={handleTrigger}
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-semibold transition-all cursor-pointer shadow-2xs ${className}`}
        title={`Ask Axel: ${actionLabel}`}
        aria-label={`Ask Axel: ${actionLabel}`}
      >
        <Bot className="w-3.5 h-3.5 shrink-0" />
        <span className="font-mono text-[11px] opacity-80">Ask Axel</span>
        <span className="text-[11px] font-bold">• {actionLabel}</span>
      </button>
    )
  }

  // Variant: Compact (Icon + Action)
  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={handleTrigger}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground hover:text-primary text-xs font-semibold transition-all cursor-pointer shadow-2xs ${className}`}
        title={`Ask Axel: "${actionLabel}"`}
        aria-label={`Ask Axel: "${actionLabel}"`}
      >
        <Bot className="w-3.5 h-3.5 text-primary shrink-0" />
        <span>{actionLabel}</span>
      </button>
    )
  }

  // Variant: Banner (Contextual Prompt Strip)
  if (variant === "banner") {
    return (
      <div
        className={`p-4 rounded-xl border border-primary/25 bg-card/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 border border-primary/20">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-mono font-bold text-primary uppercase tracking-wider">
                Axel Intelligence
              </span>
              <span className="text-xs text-muted-foreground">• {config.subtext}</span>
            </div>
            <p className="text-xs text-foreground font-medium mt-0.5">
              Need assistance with {topicTitle || "this topic"}? Ask Axel for contextual guidance.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleTrigger}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-2xs"
        >
          <Icon className="w-3.5 h-3.5" />
          <span>Ask Axel: &ldquo;{actionLabel}&rdquo;</span>
        </button>
      </div>
    )
  }

  // Default: Button
  return (
    <button
      type="button"
      onClick={handleTrigger}
      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/15 text-foreground hover:text-primary text-xs font-semibold transition-all cursor-pointer shadow-2xs ${className}`}
      title={`Ask Axel: "${actionLabel}"`}
      aria-label={`Ask Axel: "${actionLabel}"`}
    >
      <div className="w-5 h-5 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
        <Bot className="w-3.5 h-3.5" />
      </div>
      <div className="flex items-center gap-1">
        <span className="text-muted-foreground font-mono text-[11px]">Ask Axel:</span>
        <span className="font-bold text-primary">&ldquo;{actionLabel}&rdquo;</span>
      </div>
    </button>
  )
}

/**
 * Safe accessor for AxelContext that avoids crashing outside provider
 */
function useAxelSafe() {
  try {
    return useAxel()
  } catch {
    return null
  }
}
