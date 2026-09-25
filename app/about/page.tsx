import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Code2, FolderGit2, Trophy, Briefcase } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandIcon } from "@/components/ui/brand-icon"

export const metadata: Metadata = {
  title: "About ASCI Academy — Craft, Rigor, and Engineering Education",
  description:
    "Learn about ASCI Academy's philosophy: developer education without marketing bloat, built on real code execution, verified capstones, and open opportunity discovery.",
}

const PRINCIPLES = [
  {
    title: "Visual Representation First",
    desc: "Technology logos, company emblems, and direct status indicators eliminate cognitive overload. You understand what something is in 2 seconds.",
    brand: "python",
  },
  {
    title: "Learn by Building",
    desc: "Every course is anchored by real compiler execution, test assertions, and production-grade architecture instead of passive video playback.",
    brand: "react",
  },
  {
    title: "Direct Opportunity Discovery",
    desc: "Hackathons, internships, and hiring challenges connect directly to hiring organizations with transparent compensations and verifiable credentials.",
    brand: "google",
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-[11px] font-mono font-semibold tracking-wider text-muted-foreground uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            ACADEMY OF SOFTWARE CRAFT &amp; INTELLIGENCE
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-foreground tracking-tight leading-tight">
            Developer education built on clarity, rigor, and simplicity.
          </h1>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl font-normal">
            ASCI Academy was built to solve a simple problem: modern developer education is bloated with excessive marketing text, complex dashboards, and decorative noise. We replaced that with structured curricula, real compilers, and transparent opportunities.
          </p>
        </div>

        {/* 3 Core Principles */}
        <section className="space-y-6 pt-4 border-t border-border/60">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground tracking-tight">
            Core Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PRINCIPLES.map((p) => (
              <div
                key={p.title}
                className="p-5 rounded-xl border border-border bg-card space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="w-10 h-10 rounded-lg bg-secondary border border-border/80 flex items-center justify-center">
                    <BrandIcon name={p.brand} size={22} />
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{p.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What We Offer */}
        <section className="space-y-4 pt-4 border-t border-border/60">
          <h2 className="text-xl sm:text-2xl font-bold font-serif text-foreground tracking-tight">
            The 5 Ecosystems
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <span className="font-bold text-foreground">1. Learn (Courses &amp; Paths)</span>
              <p className="text-muted-foreground">Python, Go, React, Rust, and distributed systems with in-browser compiler tests.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <span className="font-bold text-foreground">2. Practice (DSA Arena)</span>
              <p className="text-muted-foreground">Curated algorithmic problem sets with interactive step-through execution.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <span className="font-bold text-foreground">3. Build (Guided Projects)</span>
              <p className="text-muted-foreground">Distributed KV stores, high-throughput rate limiters, and fullstack products.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1">
              <span className="font-bold text-foreground">4. Compete (Hackathons)</span>
              <p className="text-muted-foreground">National hackathons and algorithm sprints with verified prize pools.</p>
            </div>
            <div className="p-4 rounded-xl border border-border bg-card space-y-1 sm:col-span-2">
              <span className="font-bold text-foreground">5. Career (Jobs &amp; Internships)</span>
              <p className="text-muted-foreground">Verified internships, software engineering roles, and transparent applicant tracking.</p>
            </div>
          </div>
        </section>

        {/* Call to action */}
        <section className="p-6 rounded-2xl border border-primary/20 bg-secondary/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base text-foreground">Ready to begin your engineering journey?</h3>
            <p className="text-xs text-muted-foreground">Start practicing or explore courses right now.</p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs font-semibold shadow-2xs shrink-0"
          >
            <span>Explore Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
