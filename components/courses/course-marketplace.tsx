"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronRight, Filter, RotateCcw } from "lucide-react"
import { CourseCard } from "@/components/cards/course-card"
import { SearchBar } from "@/components/discovery/search-bar"
import { DiscoveryGrid } from "@/components/discovery/discovery-grid"
import { useEnrollments } from "@/lib/user-learning-store"
import type { CurriculumCourse } from "@/lib/curriculum-data"

interface CourseMarketplaceProps {
  initialCourses: CurriculumCourse[]
}

/**
 * Exact Horizontal Category Navigation
 * Specified in Phase 6:
 * AI | Programming | Web Development | Data | Cloud | DevOps | Cybersecurity | System Design | Career
 */
const CATALOG_CATEGORIES = [
  "All",
  "AI",
  "Programming",
  "Web Development",
  "Data",
  "Cloud",
  "DevOps",
  "Cybersecurity",
  "System Design",
  "Career",
]

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"]
const DURATIONS = ["All", "< 4 Weeks", "4–8 Weeks", "> 8 Weeks"]
const LANGUAGES = ["All", "Python", "JavaScript", "TypeScript", "Go", "Java", "C++", "Rust", "SQL"]
const TECHNOLOGIES = ["All", "React", "Next.js", "Docker", "Kubernetes", "AWS", "PostgreSQL", "Kafka", "PyTorch"]

export function CourseMarketplace({ initialCourses }: CourseMarketplaceProps) {
  const { enrollments } = useEnrollments()

  // State
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedLevel, setSelectedLevel] = useState("All")
  const [selectedDuration, setSelectedDuration] = useState("All")
  const [selectedLanguage, setSelectedLanguage] = useState("All")
  const [selectedTech, setSelectedTech] = useState("All")
  const [onlyCertificate, setOnlyCertificate] = useState(false)

  // Map enrolled courses for instant progress lookup
  const enrollmentMap = useMemo(() => {
    const map = new Map<string, any>()
    enrollments.forEach((e) => {
      if (e.slug) map.set(e.slug.toLowerCase(), e)
      if (e.id) map.set(e.id.toLowerCase(), e)
    })
    return map
  }, [enrollments])

  // Filtered courses logic
  const filteredCourses = useMemo(() => {
    return initialCourses.filter((course) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = course.title.toLowerCase().includes(q)
        const matchDesc = course.description.toLowerCase().includes(q)
        const matchTools = course.tools.some((t) => t.toLowerCase().includes(q))
        if (!matchTitle && !matchDesc && !matchTools) return false
      }

      // 2. Category Navigation Mapping
      if (selectedCategory !== "All") {
        const cat = selectedCategory.toLowerCase()
        const cCat = course.category.toLowerCase()
        const title = course.title.toLowerCase()

        if (cat === "ai" && !cCat.includes("ai") && !cCat.includes("ml") && !title.includes("ai")) return false
        if (cat === "programming" && !cCat.includes("programming") && !title.includes("programming")) return false
        if (cat === "web development" && !cCat.includes("web") && !cCat.includes("frontend") && !cCat.includes("backend")) return false
        if (cat === "data" && !cCat.includes("data") && !cCat.includes("sql") && !title.includes("data")) return false
        if (cat === "cloud" && !cCat.includes("cloud") && !cCat.includes("infra") && !title.includes("aws")) return false
        if (cat === "devops" && !cCat.includes("devops") && !cCat.includes("git") && !title.includes("docker")) return false
        if (cat === "cybersecurity" && !cCat.includes("cybersecurity") && !title.includes("security")) return false
        if (cat === "system design" && !cCat.includes("system") && !cCat.includes("backend") && !title.includes("systems")) return false
        if (cat === "career" && !title.includes("career") && !cCat.includes("career") && !course.certificate) return false
      }

      // 3. Level
      if (selectedLevel !== "All" && course.level !== selectedLevel) {
        return false
      }

      // 4. Duration
      if (selectedDuration !== "All") {
        const weeks = parseInt(course.weeks) || 4
        if (selectedDuration === "< 4 Weeks" && weeks >= 4) return false
        if (selectedDuration === "4–8 Weeks" && (weeks < 4 || weeks > 8)) return false
        if (selectedDuration === "> 8 Weeks" && weeks <= 8) return false
      }

      // 5. Language
      if (selectedLanguage !== "All") {
        const lang = selectedLanguage.toLowerCase()
        const matchTitle = course.title.toLowerCase().includes(lang)
        const matchTools = course.tools.some((t) => t.toLowerCase().includes(lang))
        if (!matchTitle && !matchTools) return false
      }

      // 6. Technology
      if (selectedTech !== "All") {
        const tech = selectedTech.toLowerCase()
        const matchTitle = course.title.toLowerCase().includes(tech)
        const matchTools = course.tools.some((t) => t.toLowerCase().includes(tech))
        if (!matchTitle && !matchTools) return false
      }

      // 7. Certificate
      if (onlyCertificate && !course.certificate) {
        return false
      }

      return true
    })
  }, [
    initialCourses,
    searchQuery,
    selectedCategory,
    selectedLevel,
    selectedDuration,
    selectedLanguage,
    selectedTech,
    onlyCertificate,
  ])

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategory !== "All" ||
    selectedLevel !== "All" ||
    selectedDuration !== "All" ||
    selectedLanguage !== "All" ||
    selectedTech !== "All" ||
    onlyCertificate

  const resetAllFilters = () => {
    setSearchQuery("")
    setSelectedCategory("All")
    setSelectedLevel("All")
    setSelectedDuration("All")
    setSelectedLanguage("All")
    setSelectedTech("All")
    setOnlyCertificate(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top: Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Courses</span>
        </nav>

        {/* Catalog Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Courses
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Build skills through structured learning.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search courses by skill, topic, or technology..."
          />
        </div>

        {/* Horizontal Category Navigation */}
        <div className="border-b border-border pb-2">
          <div className="overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1.5 py-1">
            {CATALOG_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all select-none border shrink-0 cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground border-primary font-semibold shadow-2xs"
                      : "bg-card text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Compact Filters Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl border border-border bg-card shadow-2xs">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Level Filter */}
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-mono text-[11px]">Level:</span>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="h-8 px-2 rounded-md border border-border bg-secondary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
              >
                {LEVELS.map((lvl) => (
                  <option key={lvl} value={lvl}>{lvl}</option>
                ))}
              </select>
            </div>

            {/* Duration Filter */}
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-mono text-[11px]">Duration:</span>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="h-8 px-2 rounded-md border border-border bg-secondary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
              >
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            {/* Language Filter */}
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-mono text-[11px]">Language:</span>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="h-8 px-2 rounded-md border border-border bg-secondary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
              >
                {LANGUAGES.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground font-mono text-[11px]">Tech:</span>
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="h-8 px-2 rounded-md border border-border bg-secondary text-foreground text-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer font-medium"
              >
                {TECHNOLOGIES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            {/* Certificate Checkbox */}
            <label className="flex items-center gap-1.5 cursor-pointer ml-1 select-none">
              <input
                type="checkbox"
                checked={onlyCertificate}
                onChange={(e) => setOnlyCertificate(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-border text-primary focus:ring-primary accent-primary cursor-pointer"
              />
              <span className="text-xs text-foreground font-medium">Certificate Track</span>
            </label>
          </div>

          {/* Reset Action & Result Counter */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-muted-foreground">
              {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={resetAllFilters}
                className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Courses Discovery Grid */}
        {filteredCourses.length > 0 ? (
          <DiscoveryGrid columns={4}>
            {filteredCourses.map((course) => {
              const enrolledItem = enrollmentMap.get(course.slug.toLowerCase()) || enrollmentMap.get(course.id.toLowerCase())
              const isEnrolled = !!enrolledItem
              const progressPercent = enrolledItem?.progressPercent ?? (isEnrolled ? 65 : 0)

              return (
                <CourseCard
                  key={course.id}
                  id={course.id}
                  slug={course.slug}
                  title={course.title}
                  description={course.description}
                  category={course.category}
                  level={course.level}
                  duration={course.weeks}
                  lessonsCount={course.lessons}
                  projectsCount={course.projects}
                  hasCertificate={!!course.certificate}
                  enrolled={isEnrolled}
                  progress={progressPercent}
                />
              )
            })}
          </DiscoveryGrid>
        ) : (
          <div className="py-16 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl space-y-2 p-6">
            <p className="text-sm font-semibold text-foreground">No matching courses found</p>
            <p>Try resetting your filters or searching for different keywords.</p>
            <button
              type="button"
              onClick={resetAllFilters}
              className="mt-2 inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
