"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function FinalCTASection() {
  return (
    <section aria-labelledby="final-cta-heading" className="py-4 sm:py-6">
      <div className="p-8 sm:p-12 rounded-3xl border border-border bg-[#FAF8F4] dark:bg-[#141413] text-center space-y-4 shadow-xs max-w-4xl mx-auto">
        <h2
          id="final-cta-heading"
          className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal tracking-tight text-foreground"
        >
          Ready to build something?
        </h2>

        <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed">
          Start learning, practicing, and building with ASCI.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary hover:bg-[#EA5300] text-primary-foreground font-semibold text-sm transition-all shadow-xs active:scale-[0.98] cursor-pointer"
          >
            <span>Explore ASCI</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/career"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-secondary text-foreground font-medium text-sm transition-colors cursor-pointer"
          >
            <span>Browse Opportunities</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
