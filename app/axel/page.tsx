"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Send, Bot, Sparkles, BookOpen, Code2, FolderGit2, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useAxel } from "@/context/axel-context"
import { BrandIcon } from "@/components/ui/brand-icon"

const QUICK_PROMPTS = [
  { label: "Explain sliding window technique", icon: Code2, brand: "algorithm" },
  { label: "How to structure a Go microservice", icon: FolderGit2, brand: "go" },
  { label: "Python memory management & GIL", icon: BookOpen, brand: "python" },
  { label: "React 19 Server Components overview", icon: Sparkles, brand: "react" },
]

export default function AxelPage() {
  const { messages, sendMessage, isThinking } = useAxel()
  const [inputVal, setInputVal] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputVal.trim() || isThinking) return
    sendMessage(inputVal.trim())
    setInputVal("")
  }

  const handlePromptClick = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 flex flex-col justify-between">
        {/* Header */}
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Bot className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-serif font-normal text-foreground tracking-tight">
              Axel Engineering Tutor
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your contextual AI programming mentor for code debugging, systems architecture, and algorithmic hints.
          </p>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 space-y-4 mb-6 min-h-[350px]">
          {messages.length === 0 ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-secondary border border-border/80 flex items-center justify-center text-primary mx-auto">
                <BrandIcon name="asci" size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">How can Axel help you today?</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Ask for step-by-step algorithmic guidance, debugging explanations, or capstone architecture advice.
                </p>
              </div>

              {/* Quick Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-w-lg mx-auto text-left">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.label}
                    type="button"
                    onClick={() => handlePromptClick(p.label)}
                    className="p-3 rounded-xl border border-border bg-card hover:border-primary/50 text-xs font-medium text-foreground flex items-center gap-2.5 transition-all text-left cursor-pointer"
                  >
                    <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <BrandIcon name={p.brand} size={16} />
                    </div>
                    <span className="truncate">{p.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "axel" && (
                  <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-xl text-xs sm:text-sm max-w-xl leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground font-medium"
                      : "bg-secondary border border-border text-foreground"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))
          )}

          {isThinking && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground italic">
              <Bot className="w-4 h-4 text-primary animate-pulse" />
              <span>Axel is analyzing your query...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSubmit} className="relative sticky bottom-4">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Ask Axel a question about code, algorithms, or architecture..."
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-card border border-border focus:border-primary text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors shadow-2xs"
          />
          <button
            type="submit"
            disabled={!inputVal.trim() || isThinking}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary text-primary-foreground disabled:opacity-40 flex items-center justify-center cursor-pointer transition-opacity"
            aria-label="Send query"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
