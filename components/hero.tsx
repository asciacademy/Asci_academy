"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Code2, FolderGit2, Trophy, Briefcase } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

const CATEGORIES = [
  {
    title: "Courses",
    desc: "Structured engineering curricula from foundations to advanced.",
    icon: BookOpen,
    brand: "python",
    href: "/courses",
  },
  {
    title: "Practice",
    desc: "474 DSA problems, daily POTD, and compiler workbench.",
    icon: Code2,
    brand: "algorithm",
    href: "/practice",
  },
  {
    title: "Projects",
    desc: "Build and deploy production systems and capstones.",
    icon: FolderGit2,
    brand: "react",
    href: "/projects",
  },
  {
    title: "Competitions",
    desc: "National hackathons, coding challenges, and prize bounties.",
    icon: Trophy,
    brand: "asci",
    href: "/competitions",
  },
  {
    title: "Career",
    desc: "Direct hiring openings, summer internships, and ATS resume tools.",
    icon: Briefcase,
    brand: "google",
    href: "/career",
  },
]

export function Hero() {
  return (
    <section className="bg-background pt-24 sm:pt-28 pb-6 border-b border-border/60">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* 1. Hero Block */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-[11px] font-mono font-semibold tracking-wider text-muted-foreground uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            ACADEMY OF SOFTWARE CRAFT &amp; INTELLIGENCE
          </div>

          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            Learn. Practice. Build. Compete. Grow.
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-xl font-normal leading-relaxed">
            The developer learning, practice, and career platform.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary-active text-xs sm:text-sm font-semibold transition-all shadow-2xs"
            >
              <span>Explore ASCI</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/career"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card hover:bg-secondary text-foreground text-xs sm:text-sm font-medium transition-all"
            >
              <span>View Opportunities</span>
            </Link>
          </div>
        </div>

        {/* 2. Explore ASCI Visual Categories */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Explore ASCI
            </span>
            <span className="text-xs font-mono text-muted-foreground">5 Primary Ecosystems</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="group flex flex-col justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/20 transition-all shadow-2xs"
              >
                <div className="space-y-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/80 border border-border/80 group-hover:scale-105 transition-transform">
                    <BrandIcon name={cat.brand} size={22} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-snug">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
