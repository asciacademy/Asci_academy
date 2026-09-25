"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Compass, Search, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LearningPathCard } from "@/components/cards/learning-path-card"
import { EmptyState } from "@/components/ui/state-system"
import { LEARNING_PATHS } from "@/lib/learning-paths-data"

const DIFFICULTY_TABS = ["All", "Beginner", "Intermediate", "Advanced"]

export default function LearningPathsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredPaths = useMemo(() => {
    return LEARNING_PATHS.filter((path) => {
      const matchesSearch =
        path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        path.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesDifficulty =
        selectedDifficulty === "All" || path.difficulty === selectedDifficulty

      return matchesSearch && matchesDifficulty
    })
  }, [searchQuery, selectedDifficulty])

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <div className="pt-20 sm:pt-24 pb-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-semibold">Learning Paths</span>
          </nav>

          {/* Top Header & Search */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary border border-border text-[11px] font-mono font-semibold text-primary">
                <Compass className="h-3.5 w-3.5" />
                <span>FIRST-CLASS CAREER TRACKS</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
                Learning Paths
              </h1>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                Build end-to-end career competence through structured engineering tracks.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search tracks, roles, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-border bg-card text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Difficulty Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {DIFFICULTY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedDifficulty(tab)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedDifficulty === tab
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-secondary text-muted-foreground hover:text-foreground border border-border/80"
                }`}
              >
                {tab}
              </button>
            ))}
            <span className="text-xs font-mono text-muted-foreground ml-auto hidden sm:inline">
              Showing {filteredPaths.length} tracks
            </span>
          </div>

          {/* Paths Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPaths.map((path) => (
              <LearningPathCard
                key={path.id}
                slug={path.slug}
                title={path.title}
                role={path.role}
                description={path.description}
                duration={path.duration}
                coursesCount={path.coursesCount}
                projectsCount={path.projectsCount}
                challengesCount={path.challengesCount}
                brand={path.brand}
                skills={path.skills}
                badge={path.difficulty}
              />
            ))}
          </div>

          {filteredPaths.length === 0 && (
            <EmptyState
              illustration="learning"
              title="No learning paths found"
              explanation="Try adjusting your search query or difficulty filter."
              action={{
                label: "Reset Filters",
                onClick: () => {
                  setSearchQuery("")
                  setSelectedDifficulty("All")
                },
              }}
            />
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
