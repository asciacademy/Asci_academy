"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Search,
  BookOpen,
  Code2,
  FolderGit2,
  Trophy,
  Briefcase,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Flame,
  ChevronRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandIcon } from "@/components/ui/brand-icon"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"

const LARGE_CATEGORY_SHORTCUTS = [
  {
    id: "courses",
    title: "Courses",
    subtitle: "47+ Full-Stack & Systems Tracks",
    href: "/courses",
    icon: BookOpen,
    accent: "from-blue-500/20 to-blue-500/5 border-blue-500/30 text-blue-600 dark:text-blue-400",
    tags: ["Python", "React", "Go", "Java"],
  },
  {
    id: "practice",
    title: "DSA Practice",
    subtitle: "A2Z Sheet & Problem of the Day",
    href: "/practice",
    icon: Code2,
    accent: "from-emerald-500/20 to-emerald-500/5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400",
    tags: ["Arrays", "Sliding Window", "Trees", "DP"],
  },
  {
    id: "projects",
    title: "Guided Projects",
    subtitle: "Production Capstones with Verification",
    href: "/projects",
    icon: FolderGit2,
    accent: "from-amber-500/20 to-amber-500/5 border-amber-500/30 text-amber-600 dark:text-amber-400",
    tags: ["Job Portal", "Raft KV", "AI Agents"],
  },
  {
    id: "competitions",
    title: "Competitions",
    subtitle: "Hackathons & ₹10L+ Prize Pools",
    href: "/competitions",
    icon: Trophy,
    accent: "from-rose-500/20 to-rose-500/5 border-rose-500/30 text-rose-600 dark:text-rose-400",
    tags: ["Zerodha Grand Prix", "Google Hackathon"],
  },
  {
    id: "career",
    title: "Career & Jobs",
    subtitle: "Verified Tech Jobs & Internships",
    href: "/career",
    icon: Briefcase,
    accent: "from-purple-500/20 to-purple-500/5 border-purple-500/30 text-purple-600 dark:text-purple-400",
    tags: ["₹1.15L/mo Internships", "₹28 LPA Jobs"],
  },
  {
    id: "certificates",
    title: "Certificates",
    subtitle: "Verifiable Cryptographic Proofs",
    href: "/certificates",
    icon: GraduationCap,
    accent: "from-teal-500/20 to-teal-500/5 border-teal-500/30 text-teal-600 dark:text-teal-400",
    tags: ["ASCI Verified", "Share to LinkedIn"],
  },
]

const HORIZONTAL_COURSES = [
  { slug: "python", title: "Python Programming", brand: "python", level: "Beginner", lessons: "24 Lessons" },
  { slug: "dsa", title: "DSA Masterclass", brand: "algorithm", level: "Medium", lessons: "474 Problems" },
  { slug: "react", title: "React 19 & Next.js", brand: "react", level: "Advanced", lessons: "18 Lessons" },
  { slug: "golang", title: "Distributed Go", brand: "go", level: "Advanced", lessons: "16 Lessons" },
]

const HORIZONTAL_OPPORTUNITIES = [
  { id: "g-swe", title: "Software Engineer Intern", company: "google", stipend: "₹1,15,000/mo", href: "/career" },
  { id: "z-swe", title: "Core Infrastructure SWE", company: "zerodha", stipend: "₹20-28 LPA", href: "/career" },
  { id: "r-swe", title: "Backend Platform Engineer", company: "razorpay", stipend: "₹18-26 LPA", href: "/career" },
]

export default function ExplorePage() {
  const router = useRouter()
  const [searchVal, setSearchVal] = useState("")

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchVal.trim()) return
    router.push(`/search?q=${encodeURIComponent(searchVal.trim())}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between overflow-x-hidden pb-20 md:pb-0">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-7">
        {/* ─────────────────────────────────────────────────────────────
            1. FULL-WIDTH SEARCH
        ───────────────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-foreground">
              Explore ASCI Ecosystem
            </h1>
            <p className="text-xs text-muted-foreground">
              Discover courses, algorithmic practice, capstone projects, and hiring opportunities.
            </p>
          </div>

          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <input
              type="text"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search across all courses, projects, challenges, and jobs..."
              className="w-full h-12 sm:h-14 pl-11 pr-24 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-2xs"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 sm:h-10 px-3 sm:px-4 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold cursor-pointer shadow-xs flex items-center gap-1"
            >
              <span>Search</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            2. EXPLORE: LARGE CATEGORY SHORTCUTS
        ───────────────────────────────────────────────────────────── */}
        <section aria-label="Large Category Shortcuts" className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Featured Categories
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
            {LARGE_CATEGORY_SHORTCUTS.map((cat) => {
              const Icon = cat.icon
              return (
                <Link
                  key={cat.id}
                  href={cat.href}
                  className={`p-4 sm:p-5 rounded-2xl border bg-card hover:bg-secondary/40 transition-all flex flex-col justify-between space-y-3 shadow-2xs cursor-pointer group min-h-[130px] sm:min-h-[150px]`}
                >
                  <div className="flex items-start justify-between">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${cat.accent} border flex items-center justify-center shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-sm sm:text-base font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                      {cat.title}
                    </h2>
                    <p className="text-[11px] text-muted-foreground line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-1.5 flex-wrap pt-1">
                    {cat.tags.slice(0, 2).map((t) => (
                      <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ─────────────────────────────────────────────────────────────
            3. DISCOVERY: HORIZONTAL RAILS
        ───────────────────────────────────────────────────────────── */}
        {/* Horizontal Rail: Courses */}
        <section aria-label="Trending Courses Horizontal Rail" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <h2 className="text-sm sm:text-base font-serif font-bold text-foreground">
                Trending Curriculums
              </h2>
            </div>
            <Link href="/courses" className="text-xs font-mono text-primary hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {HORIZONTAL_COURSES.map((c) => (
              <Link
                key={c.slug}
                href={`/courses/${c.slug}`}
                className="w-64 sm:w-72 shrink-0 p-4 rounded-2xl border border-border bg-card hover:bg-secondary/30 transition-all flex items-center gap-3.5 shadow-2xs snap-start group"
              >
                <div className="w-11 h-11 rounded-xl bg-secondary border border-border flex items-center justify-center shrink-0">
                  <BrandIcon name={c.brand} size={24} />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {c.title}
                  </div>
                  <div className="text-[11px] font-mono text-muted-foreground">
                    {c.level} · {c.lessons}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Horizontal Rail: Opportunities */}
        <section aria-label="Career Opportunities Horizontal Rail" className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <h2 className="text-sm sm:text-base font-serif font-bold text-foreground">
                Verified Opportunities
              </h2>
            </div>
            <Link href="/career" className="text-xs font-mono text-primary hover:underline flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x -mx-4 px-4 sm:mx-0 sm:px-0">
            {HORIZONTAL_OPPORTUNITIES.map((opp) => (
              <Link
                key={opp.id}
                href={opp.href}
                className="w-64 sm:w-72 shrink-0 p-4 rounded-2xl border border-border bg-card hover:bg-secondary/30 transition-all flex items-center gap-3.5 shadow-2xs snap-start group"
              >
                <div className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 shadow-2xs">
                  <CompanyLogo company={opp.company} size={22} />
                </div>
                <div className="min-w-0 space-y-0.5">
                  <div className="text-xs font-bold text-foreground truncate group-hover:text-primary transition-colors">
                    {opp.title}
                  </div>
                  <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                    {opp.stipend}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
