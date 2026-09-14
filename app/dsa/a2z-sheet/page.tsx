import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AxelStage } from "@/components/axel/axel-stage"
import { A2ZSheetViewer } from "@/components/dsa/a2z-sheet-viewer"
import {
  BookOpen, Layers, Terminal, ChevronRight,
  Trophy, CheckCircle2, ShieldCheck, ArrowRight
} from "lucide-react"

export const metadata: Metadata = {
  title: "ASCI A2Z DSA Master Track - Complete 18-Step Algorithmic Roadmap | ASCI LMS",
  description: "Master Data Structures and Algorithms with 18 structured steps, 62 subtopics, and 474 problems. Interactive solving checklist, complexity analysis, and video lectures.",
}

export default function AsciA2ZSheetPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-[72px]" />

      {/* Hero Header */}
      <section id="a2z-hero" className="relative overflow-hidden border-b border-hairline bg-card py-12 sm:py-16 scroll-mt-24">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-6 font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/dsa" className="hover:text-foreground transition-colors">DSA Sheets</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-primary font-medium">ASCI A2Z Sheet</span>
          </nav>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-4 shadow-xs">
                <Terminal className="h-3.5 w-3.5" />
                <span className="font-mono uppercase tracking-widest text-[11px]">Flagship Algorithmic Curriculum</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground leading-[1.15]">
                ASCI A2Z <span className="italic text-primary">DSA Master Track</span>
              </h1>

              <p className="mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                The definitive computer science curriculum covering algorithmic patterns, dynamic programming, tree traversals, graphs, and complexity analysis. 18 systematic steps, 62 core subtopics, and 474 curated interview problems with interactive solution tracking.
              </p>

              {/* Badges / Highlights */}
              <div className="mt-6 flex flex-wrap items-center gap-3 justify-center lg:justify-start text-xs font-mono">
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-card px-3 py-1.5 text-foreground shadow-2xs">
                  <Layers className="h-3.5 w-3.5 text-primary" />
                  <span>18 Structured Steps</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-card px-3 py-1.5 text-foreground shadow-2xs">
                  <Terminal className="h-3.5 w-3.5 text-primary" />
                  <span>474 Curated Problems</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-card px-3 py-1.5 text-foreground shadow-2xs">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                  <span>Interactive Progress Persistence</span>
                </span>
              </div>
            </div>

            {/* Axel Companion Anchor */}
            <AxelStage
              id="a2z-hero-robot-anchor"
              sectionId="a2z-hero"
              label="ASCI A2Z"
              emotion="happy"
              scale={0.48}
            />
          </div>
        </div>
      </section>

      {/* Main Interactive Sheet Section */}
      <section className="py-10 sm:py-14 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <A2ZSheetViewer />
        </div>
      </section>

      <Footer />
    </main>
  )
}
