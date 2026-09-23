"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CURRICULUM_COURSES, CurriculumCourse } from "@/lib/curriculum-data"
import {
  Search,
  SlidersHorizontal,
  Clock,
  BookOpen,
  LayoutGrid,
  List,
  Terminal,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Server,
  Layers,
  Brain,
  Shield,
  Filter,
} from "lucide-react"

export default function CoursesMarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [priceFilter, setPriceFilter] = useState<"All" | "Free" | "Premium">("All")
  const [sortBy, setSortBy] = useState<"recommended" | "duration-asc" | "duration-desc" | "lessons">("recommended")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const categories = [
    "All",
    "Programming",
    "Web Development",
    "DSA",
    "AI & ML",
    "Backend",
    "Cloud & Infra",
    "Cybersecurity",
  ]

  const levels = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredCourses = useMemo(() => {
    return CURRICULUM_COURSES.filter((course) => {
      // Search filter
      const matchesSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tools.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      // Category filter
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory

      // Level filter
      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel

      // Pricing filter
      const matchesPrice =
        priceFilter === "All" ||
        (priceFilter === "Free" && !course.is_premium) ||
        (priceFilter === "Premium" && course.is_premium)

      return matchesSearch && matchesCategory && matchesLevel && matchesPrice
    }).sort((a, b) => {
      if (sortBy === "duration-asc") return a.duration_hours - b.duration_hours
      if (sortBy === "duration-desc") return b.duration_hours - a.duration_hours
      if (sortBy === "lessons") return b.lessons - a.lessons
      return 0 // default recommended order
    })
  }, [searchQuery, selectedCategory, selectedLevel, priceFilter, sortBy])

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary pb-16 md:pb-0">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary shadow-2xs">
              <span>COURSE DISCOVERY MARKETPLACE</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
              What do you want to learn?
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Explore accredited engineering curricula with zero-setup browser sandboxes, automated test assertions, and portfolio-grade project milestones.
            </p>
          </div>

          {/* Search Bar & Instant Actions */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Python, React, DSA, Next.js, C++, System Design..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3.5 py-3 rounded-xl bg-card border border-border/80 text-xs font-medium text-foreground focus:outline-none focus:border-primary shadow-2xs cursor-pointer"
              >
                <option value="recommended">Recommended</option>
                <option value="lessons">Most Lessons</option>
                <option value="duration-asc">Shortest Duration</option>
                <option value="duration-desc">Longest Duration</option>
              </select>

              {/* View Switcher */}
              <div className="flex items-center bg-card border border-border/80 rounded-xl p-1 shadow-2xs">
                <button
                  onClick={() => setViewMode("grid")}
                  aria-label="Grid view"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-secondary text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  aria-label="List view"
                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                    viewMode === "list"
                      ? "bg-secondary text-foreground font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Category Chips Carousel */}
          <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-white font-semibold shadow-2xs"
                    : "bg-card border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Catalog Grid & Filters */}
      <section className="py-8 sm:py-12 flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          {/* Secondary Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-border/60 mb-8">
            <div className="flex items-center gap-4 flex-wrap text-xs">
              <span className="font-mono text-muted-foreground">
                Showing <strong className="text-foreground font-semibold">{filteredCourses.length}</strong> Courses
              </span>

              {/* Level Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-muted-foreground">Level:</span>
                {levels.map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                      selectedLevel === lvl
                        ? "bg-foreground text-background font-semibold"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter Pills */}
            <div className="flex items-center gap-1 bg-secondary/80 p-1 rounded-xl text-xs font-mono">
              <button
                onClick={() => setPriceFilter("All")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  priceFilter === "All"
                    ? "bg-card text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setPriceFilter("Free")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  priceFilter === "Free"
                    ? "bg-card text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setPriceFilter("Premium")}
                className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  priceFilter === "Premium"
                    ? "bg-card text-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Fellowship
              </button>
            </div>
          </div>

          {/* Results Grid / List */}
          {filteredCourses.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center max-w-md mx-auto my-8">
              <Search className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
              <h3 className="text-base font-semibold text-foreground">No matching courses found</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Try adjusting your search query or reset the filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedCategory("All")
                  setSelectedLevel("All")
                  setPriceFilter("All")
                }}
                className="mt-4 px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-active transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span className="text-[11px] font-mono font-medium text-muted-foreground">
                        {course.category}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/60">
                        {course.level}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {course.description}
                    </p>

                    {/* Tools & Skills */}
                    <div className="flex flex-wrap gap-1 mt-3">
                      {course.tools.slice(0, 4).map((tool) => (
                        <span
                          key={tool}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border/60 text-muted-foreground"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center gap-3 mt-4 text-[11px] font-mono text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.weeks || `${course.duration_hours}h`}</span>
                      </div>
                      <span>·</span>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{course.lessons} lessons</span>
                      </div>
                      <span>·</span>
                      <span className={course.is_premium ? "text-primary font-semibold" : "text-emerald-600 dark:text-emerald-400 font-semibold"}>
                        {course.is_premium ? "Fellowship" : "Free"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-border/60 flex items-center gap-2.5">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex-1 py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-xs font-medium text-foreground text-center transition-colors cursor-pointer"
                    >
                      View Syllabus
                    </Link>
                    <Link
                      href={`/courses/${course.slug}/learn`}
                      className="flex-1 py-2 px-3 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold text-center transition-colors cursor-pointer shadow-2xs"
                    >
                      Start Learning
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group rounded-2xl border border-border/80 bg-card p-4 sm:p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-primary font-semibold">
                        {course.category}
                      </span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/60">
                        {course.level}
                      </span>
                      <span className="text-muted-foreground text-xs">·</span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {course.weeks || `${course.duration_hours}h`} · {course.lessons} lessons
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">
                      {course.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {course.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
                    <Link
                      href={`/courses/${course.slug}`}
                      className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-xs font-medium text-foreground text-center transition-colors cursor-pointer"
                    >
                      Syllabus
                    </Link>
                    <Link
                      href={`/courses/${course.slug}/learn`}
                      className="flex-1 sm:flex-initial py-2 px-4 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold text-center transition-colors cursor-pointer shadow-2xs"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer showCTA={false} />
    </main>
  )
}
