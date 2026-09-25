"use client"

import React from "react"
import Link from "next/link"
import { Trophy, Clock, ArrowRight, Sparkles, Globe2, ShieldCheck } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

export function FeaturedCompetitionBanner() {
  return (
    <section aria-label="Featured Challenge" className="pt-1">
      <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-r from-card via-card to-primary/5 p-5 sm:p-6 lg:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Left Details */}
          <div className="space-y-3 max-w-xl">
            {/* Organizer Logo & Eyebrow */}
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center shrink-0">
                <BrandIcon name="google" size={18} />
              </div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                Featured Challenge
              </span>
              <span className="text-muted-foreground">•</span>
              <span className="text-[11px] font-mono text-muted-foreground">Google Cloud &amp; ASCI</span>
            </div>

            {/* Title & Tagline */}
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground tracking-tight">
                AI Innovation Challenge
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                Build something useful with AI. Deploy autonomous agents, generative systems, or intelligent developer tools.
              </p>
            </div>

            {/* Key Metadata Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs font-mono">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary border border-border text-foreground font-semibold">
                <Globe2 className="w-3.5 h-3.5 text-blue-500" />
                <span>Online</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 text-primary font-bold">
                <Trophy className="w-3.5 h-3.5" />
                <span>₹50,000 Prize</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-secondary border border-border text-muted-foreground">
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Ends in 8 days</span>
              </span>
            </div>
          </div>

          {/* Right Action & Metric */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end justify-between gap-4 shrink-0">
            <div className="text-left md:text-right">
              <div className="text-xs text-muted-foreground font-mono">Registered Participants</div>
              <div className="text-lg font-bold font-mono text-foreground mt-0.5">3,840+ Engineers</div>
            </div>

            <Link
              href="/competitions"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-primary hover:bg-[#EA5300] text-primary-foreground text-xs sm:text-sm font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
            >
              <span>View Challenge</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
