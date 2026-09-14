"use client"

import Link from "next/link"
import { Braces, BookOpen, Zap, ArrowRight, Target } from "lucide-react"

export function FeaturedDSACourse() {
  return (
    <section className="relative py-8 lg:py-12 bg-background">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Link
          href="/programs/dsa"
          className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-sm"
        >
          {/* Subtle gold accent bar on left */}
          <div className="hidden sm:block w-1 bg-primary shrink-0" />

          {/* Content */}
          <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-8 p-6 sm:p-8">
            {/* Icon */}
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-colors duration-200 group-hover:bg-primary/15">
              <Braces className="h-6 w-6 text-primary" />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2.5 mb-2">
                <span className="rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-mono font-semibold text-primary">
                  Featured Program
                </span>
                <span className="rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground">
                  Free Foundations
                </span>
                <span className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground font-normal">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  10 Comprehensive Lessons
                </span>
              </div>
              <h3 className="font-serif text-xl sm:text-2xl text-foreground font-normal tracking-tight group-hover:text-primary transition-colors duration-200">
                DSA for Beginners — Chapter 1: Thinking Like a Programmer
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed max-w-2xl">
                Master algorithmic intuition, write expressive pseudocode, and visualize state transitions before writing a single line of code.
              </p>
            </div>

            {/* Stats + CTA Pill */}
            <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-3 shrink-0">
              <div className="hidden lg:flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" /> 10 modules</span>
                <span className="flex items-center gap-1"><Zap className="h-3.5 w-3.5 text-primary" /> 300 XP</span>
                <span className="flex items-center gap-1"><Target className="h-3.5 w-3.5" /> Beginner</span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-5 py-2 text-xs font-semibold font-mono transition-all cursor-pointer shadow-2xs">
                Start Learning
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
