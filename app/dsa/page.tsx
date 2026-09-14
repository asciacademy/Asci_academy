import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AxelStage } from "@/components/axel/axel-stage"
import { POPULAR_SHEETS } from "@/lib/dsa/sheets-index-data"

import {
  BookOpen, Layers, Terminal, ChevronRight,
  Target, ArrowRight, CheckCircle2, ShieldCheck, Flame, Cpu, Database, Network
} from "lucide-react"

export const metadata: Metadata = {
  title: "ASCI Coding Sheets & Algorithmic Roadmaps | ASCI LMS",
  description: "Browse curated algorithmic roadmaps including ASCI A2Z DSA Master Track, Blind 75 Patterns, SDE Core 191, and Core Systems tracks.",
}


export default function DSASheetsPortalPage() {
  const flagship = POPULAR_SHEETS[0]
  const otherSheets = POPULAR_SHEETS.slice(1)

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-[72px]" />

      {/* Hero Section */}
      <section id="dsa-portal-hero" className="relative overflow-hidden border-b border-hairline bg-card py-14 sm:py-20 scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-4 shadow-xs">
                <Flame className="h-3.5 w-3.5" />
                <span className="font-mono uppercase tracking-widest text-[11px]">Practice Problem Sheets</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15]">
                DSA Practice Sheets &amp; <span className="italic text-primary">Interview Guides</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                Carefully selected coding problems organized by topic to help you practice algorithms and prepare for coding interviews step-by-step.
              </p>
            </div>

            <AxelStage
              id="dsa-portal-robot-anchor"
              sectionId="dsa-portal-hero"
              label="DSA Assistant"
              emotion="curious"
              scale={0.48}
            />
          </div>
        </div>
      </section>

      {/* Flagship Card */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary block mb-1 font-semibold">Featured Problem Sheet</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">Complete A-to-Z DSA Roadmap</h2>
          </div>

          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-card/70 backdrop-blur-xl p-6 sm:p-10 shadow-sm transition-all hover:border-primary/60">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-3 py-0.5 text-xs font-mono font-semibold text-primary">
                  <span>{flagship.badge}</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-medium text-foreground">
                  {flagship.title}
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {flagship.description}
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-2">
                  {flagship.tags.map(tag => (
                    <span key={tag} className="rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
                <Link
                  href={flagship.href}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-6 py-3.5 text-sm font-semibold transition-all shadow-xs cursor-pointer text-center"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Start A-to-Z Practice</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/programs/dsa"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-border/80 bg-card/80 hover:bg-secondary px-6 py-3.5 text-sm font-medium transition-colors text-muted-foreground hover:text-foreground text-center"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Beginner DSA Course</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Grid of Other Popular Sheets */}
          <div className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-1">Practice by Topic</span>
              <h2 className="font-serif text-xl sm:text-2xl font-normal text-foreground">Specialized Practice Sheets</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherSheets.map(sheet => (
                <div
                  key={sheet.id}
                  className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card/70 p-6 shadow-xs transition-all hover:border-primary/50 hover:shadow-md backdrop-blur-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full border border-border bg-secondary/60 px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground">
                        {sheet.badge}
                      </span>
                      <span className="text-xs font-mono text-primary font-semibold">
                        {sheet.problemCount} Problems
                      </span>
                    </div>

                    <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                      {sheet.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                      {sheet.description}
                    </p>
                  </div>

                  <div className="pt-5 border-t border-border/60 mt-6 flex items-center justify-between">
                    <span className="text-xs font-mono text-muted-foreground">{sheet.difficultyRange}</span>
                    <Link
                      href={sheet.href}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-primary hover:underline transition-colors"
                    >
                      <span>Explore</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
