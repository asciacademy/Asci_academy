import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AxelStage } from "@/components/axel/axel-stage"
import { PlusDashboard } from "@/components/curriculum/plus-dashboard"
import {
  BookOpen, Layers, Terminal, ChevronRight,
  Trophy, CheckCircle2, ShieldCheck, ArrowRight, Zap, Code2
} from "lucide-react"

export const metadata: Metadata = {
  title: "ASCI Plus Engineering Suite - Production Systems & Curricula | ASCI LMS",
  description: "Explore industry-standard learning tracks: Operating Systems, Computer Networks, DBMS, System Design (LLD/OOPS), SQL Data Engineering, and Placement Aptitude.",
}

export default function AsciPlusHomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-[72px]" />

      {/* Hero Header */}
      <section id="plus-hub-hero" className="relative overflow-hidden border-b border-hairline bg-card py-12 sm:py-16 scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-4 shadow-xs">
                <Layers className="h-3.5 w-3.5" />
                <span className="font-mono uppercase tracking-widest text-[11px]">ASCI Plus Engineering Suite</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15]">
                Engineering Tracks & <span className="italic text-primary">Core Systems Curricula</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                Comprehensive, production-ready courses curated by industry systems engineers. Master Operating Systems, Computer Networks, Database Architecture, Low-Level Design, SQL Engineering, and Technical Aptitude.
              </p>

              {/* Quick Stat Chips */}
              <div className="mt-6 flex flex-wrap items-center gap-3 justify-center lg:justify-start text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-card px-3 py-1.5 text-foreground shadow-2xs">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  <span>6 Comprehensive Tracks</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-card px-3 py-1.5 text-foreground shadow-2xs">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span>900+ Structured Lessons</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-card px-3 py-1.5 text-foreground shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span>Theory & Coding Lab IDEs</span>
                </span>
              </div>
            </div>

            {/* Axel Companion Anchor */}
            <AxelStage
              id="plus-hub-robot-anchor"
              sectionId="plus-hub-hero"
              label="ASCI Plus"
              emotion="excited"
              scale={0.48}
            />
          </div>
        </div>
      </section>

      {/* Main Dashboard Tracks Section */}
      <section className="py-12 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-primary block mb-1">Interactive Syllabus</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">Explore by Specialization</h2>
          </div>

          <PlusDashboard />

          {/* ASCI A2Z Sheet Spotlight Banner */}
          <div className="rounded-3xl border border-primary/30 bg-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">Flagship Companion</span>
              <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground">
                Looking for the ASCI A2Z DSA Master Track?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl">
                Track your solving progress across all 474 problems with interactive checkboxes, video lectures, and algorithmic complexity notes.
              </p>
            </div>
            <Link
              href="/dsa/a2z-sheet"
              className="inline-flex items-center gap-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 text-xs sm:text-sm font-medium transition-colors shadow-sm shrink-0"
            >
              <span>Open ASCI A2Z Track</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
