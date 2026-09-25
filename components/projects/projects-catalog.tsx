"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, FolderGit2, ChevronRight, X, Sparkles, Filter, Code2 } from "lucide-react"
import { ProjectCard } from "@/components/cards/project-card"
import type { GuidedProject, ProjectCategory } from "@/lib/projects-data"

interface ProjectsCatalogProps {
  initialProjects: GuidedProject[]
}

const CATEGORIES = [
  "All",
  "Frontend",
  "Backend",
  "AI",
  "ML",
  "Data",
  "Mobile",
  "Cloud",
  "DevOps",
]

const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"]

export function ProjectsCatalog({ initialProjects }: ProjectsCatalogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = p.title.toLowerCase().includes(q)
        const matchTagline = p.tagline.toLowerCase().includes(q)
        const matchTech = p.technologies.some((t) => t.toLowerCase().includes(q))
        const matchSkills = p.skills.some((s) => s.toLowerCase().includes(q))
        if (!matchTitle && !matchTagline && !matchTech && !matchSkills) return false
      }

      // Category
      if (selectedCategory !== "All" && p.category !== selectedCategory) {
        return false
      }

      // Difficulty
      if (selectedDifficulty !== "All" && p.difficulty !== selectedDifficulty) {
        return false
      }

      return true
    })
  }, [initialProjects, searchQuery, selectedCategory, selectedDifficulty])

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedDifficulty("All")
  }

  const isFiltered = searchQuery || selectedCategory !== "All" || selectedDifficulty !== "All"

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Projects</span>
        </nav>

        {/* ═══════════════════════════════════════════════════════════════
            HEADER:
            Build Real Projects
            "Turn what you learn into something you can show."
        ═══════════════════════════════════════════════════════════════ */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              Build Real Projects
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              &ldquo;Turn what you learn into something you can show.&rdquo;
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects, technologies..."
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

        {/* ═══════════════════════════════════════════════════════════════
            CATEGORIES:
            Frontend · Backend · AI · ML · Data · Mobile · Cloud · DevOps
        ═══════════════════════════════════════════════════════════════ */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
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

          {/* Sub-strip: Difficulty Filters */}
          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase text-foreground mr-1">Difficulty:</span>
              {DIFFICULTIES.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    selectedDifficulty === diff
                      ? "bg-secondary text-foreground font-bold border border-primary/40"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>

            <span>Showing {filteredProjects.length} guided capstones</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            PROJECTS GRID
            Uses ProjectCard fulfilling:
            - WHAT AM I BUILDING?
            - WHAT TECHNOLOGY WILL I USE?
            - HOW HARD IS IT?
        ═══════════════════════════════════════════════════════════════ */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                slug={project.slug}
                title={project.title}
                category={project.category}
                difficulty={project.difficulty}
                estimatedHours={project.estimatedHours}
                technologies={project.technologies}
                milestonesCount={project.milestones.length}
                enrolledStudents={project.enrolledStudents}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-3">
            <FolderGit2 className="h-10 w-10 text-muted-foreground mx-auto opacity-60" />
            <h3 className="font-semibold text-foreground text-base">No projects found</h3>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto">
              No capstone projects match your current category or difficulty selection.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-[#EA5300] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
