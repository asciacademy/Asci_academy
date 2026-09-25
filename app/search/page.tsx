"use client"

import React, { useState, useEffect, useMemo, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import {
  Search,
  BookOpen,
  Code2,
  Trophy,
  Briefcase,
  FolderGit2,
  GraduationCap,
  User,
  Sparkles,
  Clock,
  TrendingUp,
  X,
  Layers,
  ArrowUpDown,
  FileCode,
  Flame,
  ArrowRight,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchResultCard } from "@/components/search/search-result-card"
import {
  executeUniversalSearch,
  getStoredRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  TRENDING_SEARCHES,
  type SearchCategory,
  type SearchSortOption,
} from "@/lib/search-dataset"

const CATEGORIES: { id: SearchCategory; label: string; icon: any }[] = [
  { id: "all", label: "All Categories", icon: Sparkles },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "lessons", label: "Lessons", icon: FileCode },
  { id: "skills", label: "Skills", icon: Code2 },
  { id: "projects", label: "Projects", icon: FolderGit2 },
  { id: "challenges", label: "Challenges", icon: Flame },
  { id: "competitions", label: "Competitions", icon: Trophy },
  { id: "jobs", label: "Jobs", icon: Briefcase },
  { id: "internships", label: "Internships", icon: GraduationCap },
  { id: "users", label: "Users", icon: User },
]

function SearchPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const initialQuery = searchParams.get("q") || ""
  const initialCategory = (searchParams.get("category") as SearchCategory) || "all"
  const initialSort = (searchParams.get("sort") as SearchSortOption) || "relevance"

  const [query, setQuery] = useState(initialQuery)
  const [category, setCategory] = useState<SearchCategory>(initialCategory)
  const [sort, setSort] = useState<SearchSortOption>(initialSort)
  const [recentSearches, setRecentSearches] = useState<string[]>([])

  useEffect(() => {
    setRecentSearches(getStoredRecentSearches())
  }, [])

  // Sync state from URL
  useEffect(() => {
    if (searchParams.get("q")) setQuery(searchParams.get("q") || "")
    if (searchParams.get("category")) setCategory((searchParams.get("category") as SearchCategory) || "all")
    if (searchParams.get("sort")) setSort((searchParams.get("sort") as SearchSortOption) || "relevance")
  }, [searchParams])

  // Sync state to URL
  const updateUrl = (newQ: string, newCat: SearchCategory, newSort: SearchSortOption) => {
    const params = new URLSearchParams()
    if (newQ.trim()) params.set("q", newQ.trim())
    if (newCat !== "all") params.set("category", newCat)
    if (newSort !== "relevance") params.set("sort", newSort)
    const newUrl = params.toString() ? `/search?${params.toString()}` : "/search"
    router.replace(newUrl, { scroll: false })
  }

  const handleQueryChange = (val: string) => {
    setQuery(val)
    updateUrl(val, category, sort)
  }

  const handleCategoryChange = (cat: SearchCategory) => {
    setCategory(cat)
    updateUrl(query, cat, sort)
  }

  const handleSortChange = (newSort: SearchSortOption) => {
    setSort(newSort)
    updateUrl(query, category, newSort)
  }

  const handleSearchCommit = (term: string) => {
    setQuery(term)
    saveRecentSearch(term)
    setRecentSearches(getStoredRecentSearches())
    updateUrl(term, category, sort)
  }

  const handleClearRecent = () => {
    clearRecentSearches()
    setRecentSearches([])
  }

  const results = useMemo(() => {
    return executeUniversalSearch(query, category, sort)
  }, [query, category, sort])

  // Calculate counts across categories for current query
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: 0 }
    CATEGORIES.forEach((c) => {
      counts[c.id] = executeUniversalSearch(query, c.id).length
    })
    return counts
  }, [query])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="flex-1 max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* ─────────────────────────────────────────────────────────────
            HEADER & PRIMARY SEARCH PRODUCT BAR
        ───────────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
                Universal Search
              </span>
              <span className="text-xs text-muted-foreground">• 9 Unified Domains</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground">
              Search ASCI Academy
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Explore courses, lessons, skills, projects, challenges, competitions, jobs, internships, and scholars.
            </p>
          </div>

          {/* Large Product Search Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && query.trim()) {
                  handleSearchCommit(query.trim())
                }
              }}
              placeholder="Search across all 9 entities (e.g., Python, Sliding Window, Google SWE)..."
              className="w-full h-14 pl-12 pr-12 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary shadow-2xs transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => handleQueryChange("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FILTER BAR: CATEGORY TABS & SORT CONTROLS
        ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-border/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = category === cat.id
              const count = categoryCounts[cat.id] ?? 0
              const Icon = cat.icon
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-2xs"
                      : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/40"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span>{cat.label}</span>
                  <span className="font-mono text-[10px] opacity-75">({count})</span>
                </button>
              )
            })}
          </div>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
            <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-1">
              <ArrowUpDown className="w-3 h-3" />
              <span>Sort:</span>
            </span>
            <select
              value={sort}
              onChange={(e) => handleSortChange(e.target.value as SearchSortOption)}
              className="bg-card text-xs font-mono font-medium rounded-xl border border-border px-3 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer shadow-2xs"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest First</option>
              <option value="title">Title (A-Z)</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            MAIN TWO-COLUMN WORKSPACE:
            Left: Recent Searches & Trending Overlay
            Right: Result Stream
        ───────────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (4 cols on lg): Recent Searches & Trending */}
          <div className="lg:col-span-4 space-y-6">
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="p-5 rounded-2xl border border-border bg-card space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>Recent Searches</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearRecent}
                    className="text-[11px] font-mono text-muted-foreground hover:text-foreground hover:underline cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-col gap-1.5">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSearchCommit(term)}
                      className="p-2.5 rounded-xl border border-border/80 bg-secondary/30 hover:bg-secondary flex items-center justify-between text-left text-xs font-medium text-foreground transition-colors cursor-pointer"
                    >
                      <span className="truncate">{term}</span>
                      <ArrowRight className="w-3 h-3 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Searches */}
            <div className="p-5 rounded-2xl border border-border bg-card space-y-3 shadow-2xs">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span>Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {TRENDING_SEARCHES.map((term, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSearchCommit(term)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-xs font-medium text-foreground transition-colors cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Entity Distribution Stats */}
            <div className="p-5 rounded-2xl border border-border bg-secondary/20 space-y-2 text-xs font-mono">
              <div className="text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                Universal Knowledge Graph
              </div>
              <p className="text-muted-foreground text-[11px] leading-relaxed">
                Indexed across courses, lessons, skills, projects, challenges, competitions, jobs, internships, and verified profiles.
              </p>
            </div>
          </div>

          {/* Right Column (8 cols on lg): Live Results Stream */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-muted-foreground px-1">
              <span>
                Found <strong className="text-foreground">{results.length}</strong> matching item{results.length === 1 ? "" : "s"}
              </span>
              <span>Sorted by {sort}</span>
            </div>

            {results.length === 0 ? (
              <div className="p-12 text-center rounded-2xl border border-border bg-card space-y-3 shadow-2xs">
                <div className="w-12 h-12 rounded-2xl bg-secondary border border-border flex items-center justify-center text-muted-foreground mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-foreground">
                  No matching results found
                </h3>
                <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                  We could not find anything matching &ldquo;{query}&rdquo; in this category. Try searching for &ldquo;Python&rdquo;, &ldquo;React&rdquo;, or &ldquo;DSA&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    handleQueryChange("")
                    handleCategoryChange("all")
                  }}
                  className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary-active transition-all cursor-pointer shadow-2xs inline-block"
                >
                  Reset Search Filters
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {results.map((item) => (
                  <SearchResultCard
                    key={item.id}
                    item={item}
                    onClick={() => {
                      if (query.trim()) saveRecentSearch(query.trim())
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <SearchPageContent />
    </Suspense>
  )
}
