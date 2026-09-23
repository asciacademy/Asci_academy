"use client"

import { useState, useRef, useEffect } from "react"
import {
  X, Send, Bot, Lightbulb, HelpCircle,
  AlertTriangle, Play, ChevronRight, RotateCcw, Copy, Check
} from "lucide-react"
import { AsciIcon } from "@/components/icons"
import { ProblemDetail } from "@/lib/dsa/problem-catalog"
import { RunResult } from "@/lib/dsa/code-runner"
import { AxelEmotion, AxelState } from "@/types/axel"
import { cn } from "@/lib/utils"

import { SocraticHintPanel } from "@/components/axel/socratic-hint-panel"

interface ChatMessage {
  id: string
  role: "user" | "axel"
  content: string
  timestamp: number
  emotion?: AxelEmotion
  suggestions?: string[]
}

interface AxelTutorDrawerProps {
  isOpen: boolean
  onClose: () => void
  problem: ProblemDetail
  userCode: string
  runResult: RunResult | null
  activeFailureContext?: {
    input?: string
    expected?: string
    actual?: string
    errorMessage?: string
  } | null
  onOpenVisualizer?: () => void
}

export function AxelTutorDrawer({
  isOpen,
  onClose,
  problem,
  userCode,
  runResult,
  activeFailureContext,
  onOpenVisualizer,
}: AxelTutorDrawerProps) {
  const [activeTab, setActiveTab] = useState<"chat" | "socratic">(activeFailureContext ? "socratic" : "chat")
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: "initial",
      role: "axel",
      content: `Hey engineer! I'm Axel, your algorithmic mentor. I'm right here with you on **${problem.title}**. What would you like help with?`,
      timestamp: Date.now(),
      emotion: "smile",
      suggestions: [
        "Explain this problem simple as hell",
        "Give me a hint without spoiling the answer",
        "Walk me through the visualizer",
        "What is the optimal Big-O complexity?"
      ]
    }
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, isOpen])

  // Reset conversation when switching problems
  useEffect(() => {
    setMessages([
      {
        id: "initial-" + problem.id,
        role: "axel",
        content: `Hey! We've jumped to **${problem.title}** (${problem.difficulty}). Let's master this pattern together!`,
        timestamp: Date.now(),
        emotion: "wave",
        suggestions: [
          "Explain this problem simple as hell",
          "Give me a hint without spoiling the answer",
          "Walk me through the visualizer"
        ]
      }
    ])
  }, [problem.id])

  const sendMessage = async (text: string, mode?: "eli10" | "socratic-hint" | "diagnose-error" | "visual-walkthrough" | "complexity") => {
    if (!text.trim() || isLoading) return

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: text,
      timestamp: Date.now()
    }

    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    // Find failing testcase if any
    const failingCase = runResult?.testResults?.find(t => !t.passed)

    try {
      const res = await fetch("/api/axel/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: text,
          context: {
            pathname: `/dsa/problems/${problem.id}`,
            problemId: problem.id,
            problemTitle: problem.title,
            simpleMission: problem.simpleMission,
            realWorldAnalogy: problem.realWorldAnalogy,
            starterCode: problem.starterCode.javascript,
            userCode,
            mode: mode || "general",
            failingTest: failingCase ? {
              input: failingCase.inputFormatted,
              expected: failingCase.expectedFormatted,
              actual: failingCase.outputFormatted
            } : undefined
          },
          history: messages.slice(-6).map(m => ({ role: m.role, content: m.content }))
        })
      })

      if (!res.ok) throw new Error("Failed to reach Axel")
      const data = await res.json()

      const axelMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: "axel",
        content: data.message || "I'm right here with you! Let's examine this step-by-step.",
        timestamp: Date.now(),
        emotion: data.emotion || "normal",
        suggestions: data.suggestions
      }

      setMessages(prev => [...prev, axelMsg])
    } catch (err: any) {
      // Local fallback
      const fallbackMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        role: "axel",
        content: `For **${problem.title}**, remember the core pattern: ${problem.hints[0] || "Break the problem down into what you know vs what you need to find at each step."}`,
        timestamp: Date.now(),
        emotion: "smile",
        suggestions: [
          "Explain this problem simple as hell",
          "Give me a hint without spoiling the answer"
        ]
      }
      setMessages(prev => [...prev, fallbackMsg])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1500)
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[640px] h-[85vh] rounded-3xl border border-primary/20 bg-card/95 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-6 duration-300">
      {/* Header Bar */}
      <div className="px-4 py-3.5 border-b border-border bg-secondary/30 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-primary shadow-xs">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-foreground">Axel AI Tutor</h3>
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
            </div>
            <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">
              Active Problem: {problem.title}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-xl hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          title="Close Axel Tutor"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Mode Segmented Controls */}
      <div className="px-3 py-2 border-b border-border/40 bg-secondary/10 flex items-center gap-1.5 shrink-0">
        <button
          onClick={() => setActiveTab("chat")}
          className={cn(
            "flex-1 py-1 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer",
            activeTab === "chat"
              ? "bg-primary text-primary-foreground shadow-xs font-semibold"
              : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          )}
        >
          <Bot className="h-3.5 w-3.5" />
          <span>Interactive Chat</span>
        </button>
        <button
          onClick={() => setActiveTab("socratic")}
          className={cn(
            "flex-1 py-1 px-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-all cursor-pointer",
            activeTab === "socratic"
              ? "bg-primary text-primary-foreground shadow-xs font-semibold"
              : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          )}
        >
          <Lightbulb className="h-3.5 w-3.5 text-amber-300" />
          <span>Socratic Hints (3 Tiers)</span>
        </button>
      </div>

      {/* Socratic Hint Panel Tab */}
      {activeTab === "socratic" ? (
        <div className="flex-1 overflow-y-auto p-4">
          <SocraticHintPanel
            problem={problem}
            userCode={userCode}
            runResult={runResult}
            activeFailureContext={activeFailureContext}
            onAskFollowUp={prompt => {
              setActiveTab("chat")
              sendMessage(prompt)
            }}
          />
        </div>
      ) : (
        <>
          {/* Quick Action Mentorship Chips */}
          <div className="px-3 py-2 border-b border-border/60 bg-secondary/15 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none">
            <button
              onClick={() => sendMessage("Explain this problem simple as hell with a real-world analogy", "eli10")}
              className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary text-[11px] font-medium text-foreground whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <AsciIcon name="help" size="xs" tone="accent" />
              <span>Explain Simple as Hell</span>
            </button>

            <button
              onClick={() => sendMessage("Give me a Socratic hint without revealing the code solution", "socratic-hint")}
              className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary text-[11px] font-medium text-foreground whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <AsciIcon name="compass" size="xs" tone="gold" />
              <span>Socratic Hint</span>
            </button>

            {runResult && runResult.status !== "ACCEPTED" && (
              <button
                onClick={() => sendMessage("Why did my latest code execution fail? Diagnose my logic without giving the full code away.", "diagnose-error")}
                className="px-2.5 py-1 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-[11px] font-medium whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
              >
                <AsciIcon name="search" size="xs" />
                <span>Why did my code fail?</span>
              </button>
            )}

            <button
              onClick={() => {
                if (onOpenVisualizer) onOpenVisualizer()
                sendMessage("Walk me through the visualizer step by step", "visual-walkthrough")
              }}
              className="px-2.5 py-1 rounded-lg border border-border bg-card hover:bg-secondary text-[11px] font-medium text-foreground whitespace-nowrap flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
            >
              <AsciIcon name="play" size="xs" tone="accent" />
              <span>Visual Walkthrough</span>
            </button>
          </div>

          {/* Messages Conversation Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={cn(
              "flex flex-col gap-1.5 max-w-[90%]",
              msg.role === "user" ? "ml-auto items-end" : "mr-auto items-start"
            )}
          >
            {/* Sender identity */}
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground px-1">
              {msg.role === "axel" ? (
                <>
                  <Bot className="h-2.5 w-2.5 text-primary" />
                  <span className="font-semibold text-primary">Axel AI</span>
                </>
              ) : (
                <span>You</span>
              )}
            </div>

            {/* Bubble */}
            <div
              className={cn(
                "p-3 rounded-2xl text-xs leading-relaxed transition-all shadow-xs relative group",
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-tr-xs"
                  : "bg-secondary/40 border border-border/80 text-foreground rounded-tl-xs whitespace-pre-wrap"
              )}
            >
              {msg.content}

              {/* Copy button for Axel answers */}
              {msg.role === "axel" && (
                <button
                  onClick={() => handleCopy(msg.content, msg.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-secondary text-muted-foreground transition-opacity"
                  title="Copy message"
                >
                  {copiedId === msg.id ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                </button>
              )}
            </div>

            {/* Suggestions Chips from Axel */}
            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1 pt-1">
                {msg.suggestions.map((sug, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => sendMessage(sug)}
                    className="px-2 py-0.5 rounded-full border border-border bg-card/80 hover:bg-secondary text-[10px] text-muted-foreground hover:text-foreground transition-colors text-left"
                  >
                    {sug}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground mr-auto p-3 rounded-2xl bg-secondary/30 border border-border/60">
            <Bot className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span>Axel is analyzing...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Tray */}
      <form
        onSubmit={e => {
          e.preventDefault()
          sendMessage(input)
        }}
        className="p-3 border-t border-border bg-card/90 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask Axel anything about this problem..."
          className="flex-1 px-3.5 py-2 text-xs rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-hidden focus:border-primary transition-colors"
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className="p-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-40 disabled:pointer-events-none transition-colors cursor-pointer shrink-0 shadow-xs"
          title="Send message"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </form>
      </>
      )}
    </div>
  )
}
