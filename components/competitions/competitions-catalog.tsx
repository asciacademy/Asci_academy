"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  Trophy,
  ChevronRight,
  X,
  Globe,
  Users,
  Flame,
  Filter,
  Sparkles,
  ArrowRight,
  Calendar,
  Layers,
  ArrowUpDown,
} from "lucide-react"
import { CompetitionCard } from "@/components/cards/competition-card"
import type { HackathonItem } from "@/lib/unstop-store"
import { SectionHeader } from "@/components/discovery/section-header"
import { MobileFilterBottomSheet } from "@/components/ui/mobile-filter-bottom-sheet"

interface CompetitionsCatalogProps {
  initialCompetitions: HackathonItem[]
}

const CATEGORY_NAV = [
  "Competitions",
  "Hackathons",
  "Quizzes",
  "Challenges",
  "Workshops",
  "Events",
]

const SKILL_OPTIONS = ["All Skills", "AI / ML", "Full-Stack", "Cloud & DevOps", "DSA & Algo", "Web3", "Cybersecurity"]
const MODE_OPTIONS = ["All Modes", "Online", "Offline", "Hybrid"]
const DEADLINE_OPTIONS = ["All Deadlines", "Ending Soon (< 7 days)", "This Month", "Upcoming"]
const TEAM_OPTIONS = ["All Team Sizes", "Solo (1)", "Teams of 2–4", "Teams of 5+"]
const ELIGIBILITY_OPTIONS = ["All Eligible", "Open to All", "College Students", "Working Professionals"]

const SORT_OPTIONS = [
  { id: "recommended", label: "Recommended" },
  { id: "newest", label: "Newest" },
  { id: "deadline", label: "Deadline" },
]

export function CompetitionsCatalog({ initialCompetitions }: CompetitionsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Competitions")
  const [selectedSkill, setSelectedSkill] = useState("All Skills")
  const [selectedMode, setSelectedMode] = useState("All Modes")
  const [selectedDeadline, setSelectedDeadline] = useState("All Deadlines")
  const [selectedTeam, setSelectedTeam] = useState("All Team Sizes")
  const [selectedEligibility, setSelectedEligibility] = useState("All Eligible")
  const [sortBy, setSortBy] = useState("recommended")
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false)

  // Filter & sort competitions
  const filteredCompetitions = useMemo(() => {
    let result = [...initialCompetitions]

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      result = result.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.host.toLowerCase().includes(q) ||
          c.tags?.some((t) => t.toLowerCase().includes(q))
      )
    }

    // Category navigation filter
    if (selectedCategory !== "Competitions") {
      const cat = selectedCategory.toLowerCase()
      result = result.filter((c) => {
        const titleMatch = c.title.toLowerCase().includes(cat)
        const tagMatch = c.tags?.some((t) => t.toLowerCase().includes(cat))
        const bannerMatch = c.bannerTag?.toLowerCase().includes(cat)
        return titleMatch || tagMatch || bannerMatch
      })
    }

    // Mode filter
    if (selectedMode !== "All Modes") {
      result = result.filter((c) => c.mode === selectedMode)
    }

    // Skill filter
    if (selectedSkill !== "All Skills") {
      const cleanSkill = selectedSkill.split(" ")[0].toLowerCase()
      result = result.filter((c) =>
        c.tags?.some((t) => t.toLowerCase().includes(cleanSkill))
      )
    }

    // Team Size filter
    if (selectedTeam !== "All Team Sizes") {
      if (selectedTeam.includes("Solo")) {
        result = result.filter((c) => c.teamSize.includes("1") || c.teamSize.toLowerCase().includes("solo"))
      } else if (selectedTeam.includes("2–4")) {
        result = result.filter((c) => c.teamSize.includes("2") || c.teamSize.includes("3") || c.teamSize.includes("4"))
      }
    }

    // Sorting
    if (sortBy === "deadline") {
      result.sort((a, b) => (a.daysLeft || 99) - (b.daysLeft || 99))
    } else if (sortBy === "newest") {
      result.reverse()
    }

    return result
  }, [
    initialCompetitions,
    searchQuery,
    selectedCategory,
    selectedMode,
    selectedSkill,
    selectedTeam,
    selectedDeadline,
    selectedEligibility,
    sortBy,
  ])

  // Featured Opportunities (top 3)
  const featured = useMemo(() => {
    return initialCompetitions.slice(0, 3)
  }, [initialCompetitions])

  const resetAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("Competitions")
    setSelectedSkill("All Skills")
    setSelectedMode("All Modes")
    setSelectedDeadline("All Deadlines")
    setSelectedTeam("All Team Sizes")
    setSelectedEligibility("All Eligible")
    setSortBy("recommended")
  }

  const isFiltered =
    searchQuery ||
    selectedCategory !== "Competitions" ||
    selectedSkill !== "All Skills" ||
    selectedMode !== "All Modes" ||
    selectedTeam !== "All Team Sizes"

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Competitions</span>
        </nav>

        {/* HEADER: Competitions - "Challenge yourself. Build. Compete." - Search Competitions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              Competitions
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Challenge yourself. Build. Compete.
            </p>
          </div>

          {/* Search Competitions */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Competitions..."
              className="w-full h-11 pl-10 pr-9 rounded-xl border border-border bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-2xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* CATEGORY NAVIGATION: Competitions, Hackathons, Quizzes, Challenges, Workshops, Events */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-border/60">
          {CATEGORY_NAV.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FILTER BAR: Category, Skill, Mode, Deadline, Team Size, Eligibility; Sort: Recommended, Newest, Deadline */}
        <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
          <div className="flex items-center justify-between gap-3 text-xs font-mono text-muted-foreground">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-foreground">
              <Filter className="w-3.5 h-3.5 text-primary" />
              <span>Filters &amp; Sorting</span>
            </div>
            {isFiltered && (
              <button
                onClick={resetAllFilters}
                className="text-primary hover:underline text-xs font-semibold cursor-pointer"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Mobile Filter Sheet Trigger Button */}
          <div className="sm:hidden">
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="w-full h-11 px-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 flex items-center justify-between text-xs font-semibold text-foreground cursor-pointer shadow-2xs"
            >
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-primary" />
                <span>Filters &amp; Sorting</span>
              </div>
              <span className="font-mono text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                {isFiltered ? "Active" : "All"}
              </span>
            </button>
          </div>

          {/* Desktop Compact Dropdown Strip */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {/* Skill */}
            <select
              value={selectedSkill}
              onChange={(e) => setSelectedSkill(e.target.value)}
              className="h-9 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
            >
              {SKILL_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Mode */}
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="h-9 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
            >
              {MODE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Deadline */}
            <select
              value={selectedDeadline}
              onChange={(e) => setSelectedDeadline(e.target.value)}
              className="h-9 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
            >
              {DEADLINE_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Team Size */}
            <select
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
              className="h-9 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
            >
              {TEAM_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Eligibility */}
            <select
              value={selectedEligibility}
              onChange={(e) => setSelectedEligibility(e.target.value)}
              className="h-9 px-2.5 rounded-lg border border-border bg-secondary text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
            >
              {ELIGIBILITY_OPTIONS.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full h-9 px-2.5 rounded-lg border border-primary/40 bg-primary/5 text-xs text-primary font-bold focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-mono"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    Sort: {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mobile Filter Bottom Sheet */}
          <MobileFilterBottomSheet
            isOpen={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
            onReset={resetAllFilters}
            activeFilterCount={isFiltered ? 1 : 0}
            title="Filter Competitions"
          >
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-muted-foreground font-mono mb-1 font-semibold">Skill Domain:</label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:ring-1 focus:ring-primary"
                >
                  {SKILL_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-mono mb-1 font-semibold">Mode:</label>
                <select
                  value={selectedMode}
                  onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:ring-1 focus:ring-primary"
                >
                  {MODE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-mono mb-1 font-semibold">Deadline:</label>
                <select
                  value={selectedDeadline}
                  onChange={(e) => setSelectedDeadline(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:ring-1 focus:ring-primary"
                >
                  {DEADLINE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-mono mb-1 font-semibold">Team Size:</label>
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:ring-1 focus:ring-primary"
                >
                  {TEAM_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-mono mb-1 font-semibold">Eligibility:</label>
                <select
                  value={selectedEligibility}
                  onChange={(e) => setSelectedEligibility(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-border bg-secondary text-foreground text-xs focus:ring-1 focus:ring-primary"
                >
                  {ELIGIBILITY_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-muted-foreground font-mono mb-1 font-semibold">Sort By:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-11 px-3 rounded-xl border border-primary/40 bg-primary/5 text-primary font-bold text-xs"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>Sort: {opt.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </MobileFilterBottomSheet>
        </div>

        {/* FEATURED: Featured Opportunities (Large but compact visual cards with organizer logos) */}
        {!isFiltered && featured.length > 0 && (
          <section className="space-y-4">
            <SectionHeader
              title="Featured Opportunities"
              subtitle="Premier hackathons and sprint challenges with verified cash prize pools."
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featured.map((comp) => (
                <CompetitionCard
                  key={`feat-${comp.id}`}
                  id={comp.id}
                  slug={comp.id}
                  title={comp.title}
                  organizer={comp.host}
                  prizePool={comp.prizePool}
                  teamSize={comp.teamSize}
                  mode={comp.mode}
                  deadline={comp.deadline}
                  skills={comp.tags}
                  registeredCount={comp.registeredCount}
                  daysLeft={comp.daysLeft}
                  featured={true}
                />
              ))}
            </div>
          </section>
        )}

        {/* ALL COMPETITIONS: Clean list/grid */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">
                All Competitions
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                ({filteredCompetitions.length})
              </span>
            </div>
          </div>

          {filteredCompetitions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCompetitions.map((comp) => (
                <CompetitionCard
                  key={comp.id}
                  id={comp.id}
                  slug={comp.id}
                  title={comp.title}
                  organizer={comp.host}
                  prizePool={comp.prizePool}
                  teamSize={comp.teamSize}
                  mode={comp.mode}
                  deadline={comp.deadline}
                  skills={comp.tags}
                  registeredCount={comp.registeredCount}
                  daysLeft={comp.daysLeft}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-3">
              <Trophy className="h-10 w-10 text-muted-foreground mx-auto opacity-60" />
              <h3 className="font-semibold text-foreground text-base">
                No competitions found
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No competitions match your selected filters. Try broadening your criteria.
              </p>
              <button
                type="button"
                onClick={resetAllFilters}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-[#EA5300] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
