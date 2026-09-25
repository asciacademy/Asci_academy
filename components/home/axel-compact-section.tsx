"use client"

import React from "react"
import Link from "next/link"
import { Bot, ArrowRight, BookOpen, Lightbulb, Wrench, Sparkles } from "lucide-react"

export function AxelCompactSection() {
  const capabilities = [
    {
      title: "Learn",
      desc: "Get explanations.",
      details: "Ask contextual questions on complex syntax, concurrency, or algorithms.",
      icon: BookOpen,
    },
    {
      title: "Practice",
      desc: "Get hints.",
      details: "Step-by-step guidance without spoiling full algorithmic solutions.",
      icon: Lightbulb,
    },
    {
      title: "Build",
      desc: "Debug and improve.",
      details: "Trace stack errors, optimize time complexity, and refine architecture.",
      icon: Wrench,
    },
  ]

  return (
    <section aria-labelledby="axel-heading" className="pt-2">
      <div className="p-5 sm:p-6 lg:p-7 rounded-2xl border border-border bg-card shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Introduction & Small Polished Visual */}
          <div className="flex items-start sm:items-center gap-4 max-w-md">
            {/* Small polished Axel visual (NO giant 3D robot) */}
            <div className="relative w-12 h-12 rounded-2xl bg-primary/10 border border-primary/25 flex items-center justify-center text-primary shrink-0 shadow-xs">
              <Bot className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 border-2 border-card" />
            </div>

            <div className="space-y-0.5">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                Contextual Intelligence
              </div>
              <h2
                id="axel-heading"
                className="font-serif text-xl sm:text-2xl font-normal text-foreground tracking-tight"
              >
                Meet Axel.
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Your AI engineering companion.
              </p>
            </div>
          </div>

          {/* Center: 3 Capabilities */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
            {capabilities.map((cap) => {
              const Icon = cap.icon
              return (
                <div
                  key={cap.title}
                  className="p-3 rounded-xl border border-border bg-secondary/30 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-card border border-border flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-xs font-bold text-foreground">{cap.title}</span>
                  </div>
                  <div className="text-xs font-semibold text-primary mt-1.5">{cap.desc}</div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                    {cap.details}
                  </p>
                </div>
              )
            })}
          </div>

          {/* Right: Restrained CTA */}
          <div className="shrink-0 self-start lg:self-center">
            <Link
              href="/axel"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <span>Meet Axel</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
