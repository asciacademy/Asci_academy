"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
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
} from "lucide-react"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command"
import {
  executeUniversalSearch,
  getStoredRecentSearches,
  saveRecentSearch,
  clearRecentSearches,
  TRENDING_SEARCHES,
  SEARCH_CATEGORY_CONFIGS,
  type SearchCategory,
  type SearchSortOption,
  type SearchResultItem,
} from "@/lib/search-dataset"
import { SearchResultCard } from "@/components/search/search-result-card"

interface SearchCommandDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const CATEGORY_TABS: { id: SearchCategory; label: string; icon: any; iconColor: string }[] = [
  { id: "all", label: "All", icon: Sparkles, iconColor: "text-amber-500" },
  { id: "courses", label: "Courses", icon: BookOpen, iconColor: "text-blue-500" },
  { id: "lessons", label: "Lessons", icon: FileCode, iconColor: "text-teal-500" },
  { id: "skills", label: "Skills", icon: Code2, iconColor: "text-cyan-500" },
  { id: "projects", label: "Projects", icon: FolderGit2, iconColor: "text-purple-500" },
  { id: "challenges", label: "Challenges", icon: Flame, iconColor: "text-orange-500 fill-orange-500/20" },
  { id: "competitions", label: "Competitions", icon: Trophy, iconColor: "text-amber-500" },
  { id: "jobs", label: "Jobs", icon: Briefcase, iconColor: "text-sky-500" },
  { id: "internships", label: "Internships", icon: GraduationCap, iconColor: "text-emerald-500" },
  { id: "users", label: "Users", icon: User, iconColor: "text-indigo-500" },
]

export function SearchCommandDialog({ open, onOpenChange }: SearchCommandDialogProps) {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = React.useState<SearchCategory>("all")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [sortOption, setSortOption] = React.useState<SearchSortOption>("relevance")
  const [recentSearches, setRecentSearches] = React.useState<string[]>([])

  // Load recent searches upon open
  React.useEffect(() => {
    if (open) {
      setRecentSearches(getStoredRecentSearches())
    }
  }, [open])

  // Global ⌘K / Ctrl+K keyboard shortcut
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  // Reset state when modal closes
  React.useEffect(() => {
    if (!open) {
      setSelectedCategory("all")
      setSearchQuery("")
      setSortOption("relevance")
    }
  }, [open])

  const handleSelectResult = (item: SearchResultItem) => {
    if (searchQuery.trim()) {
      saveRecentSearch(searchQuery.trim())
    }
    onOpenChange(false)
    router.push(item.href)
  }

  const handleRecentClick = (text: string) => {
    setSearchQuery(text)
  }

  const handleClearRecent = () => {
    clearRecentSearches()
    setRecentSearches([])
  }

  // Execute search with category filter, query, and sorting
  const results = React.useMemo(() => {
    return executeUniversalSearch(searchQuery, selectedCategory, sortOption)
  }, [searchQuery, selectedCategory, sortOption])

  // Compute category counts for current query
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = { all: 0 }
    CATEGORY_TABS.forEach((t) => {
      if (t.id === "all") {
        counts.all = executeUniversalSearch(searchQuery, "all").length
      } else {
        counts[t.id] = executeUniversalSearch(searchQuery, t.id).length
      }
    })
    return counts
  }, [searchQuery])

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Search ASCI Academy"
      description="Universal search across Courses, Lessons, Skills, Projects, Challenges, Competitions, Jobs, Internships, and Users"
      className="border border-border bg-card shadow-2xl max-w-3xl overflow-hidden rounded-2xl p-0"
    >
      {/* ─────────────────────────────────────────────────────────────
          1. SEARCH INPUT HEADER
      ───────────────────────────────────────────────────────────── */}
      <div className="flex items-center border-b border-border px-4 py-1 bg-card">
        <Search className="mr-3 h-4 w-4 shrink-0 text-primary" />
        <CommandInput
          placeholder="Search courses, lessons, skills, projects, challenges, jobs, internships..."
          value={searchQuery}
          onValueChange={setSearchQuery}
          className="flex h-12 w-full rounded-md bg-transparent text-xs sm:text-sm outline-none placeholder:text-muted-foreground"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground cursor-pointer"
            title="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. CATEGORY FILTER TABS & SORT CONTROLS
      ───────────────────────────────────────────────────────────── */}
      <div className="px-3 py-2 border-b border-border bg-secondary/30 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id
            const count = categoryCounts[tab.id] ?? 0
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedCategory(tab.id)}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors shrink-0 cursor-pointer ${
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : "bg-card text-muted-foreground border border-border hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className={`w-3 h-3 ${isSelected ? "text-primary-foreground" : tab.iconColor}`} />
                <span>{tab.label}</span>
                <span className="opacity-75 font-mono text-[10px]">({count})</span>
              </button>
            )
          })}
        </div>

        {/* Sorting Dropdown / Toggle */}
        {searchQuery.trim() && (
          <div className="flex items-center gap-1 shrink-0 pl-2 border-l border-border">
            <span className="text-[10px] font-mono text-muted-foreground uppercase hidden sm:inline">Sort:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value as SearchSortOption)}
              className="bg-card text-[11px] font-mono font-medium rounded-lg border border-border px-2 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="relevance">Relevance</option>
              <option value="newest">Newest</option>
              <option value="title">Title A-Z</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
        )}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MAIN CONTENT: SEARCH OVERLAY OR RESULTS LIST
      ───────────────────────────────────────────────────────────── */}
      <CommandList className="max-h-[460px] p-3 overflow-y-auto">
        {/* If query is empty: Show SEARCH OVERLAY (Recent Searches, Trending, Categories) */}
        {!searchQuery.trim() ? (
          <div className="space-y-6 py-2">
            {/* OVERLAY SECTION 1: Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="space-y-2.5">
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
                    Clear history
                  </button>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {recentSearches.map((term, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleRecentClick(term)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-secondary/60 hover:bg-secondary text-xs text-foreground font-medium transition-colors cursor-pointer shadow-2xs"
                    >
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span>{term}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OVERLAY SECTION 2: Trending Searches */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                <TrendingUp className="w-3.5 h-3.5 text-primary" />
                <span>Trending Searches</span>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {TRENDING_SEARCHES.map((term, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleRecentClick(term)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 text-xs text-foreground font-medium transition-colors cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3 h-3 text-primary" />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* OVERLAY SECTION 3: Browse by Categories */}
            <div className="space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
                <Layers className="w-3.5 h-3.5 text-primary" />
                <span>Browse by Category</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {CATEGORY_TABS.filter((c) => c.id !== "all").map((cat) => {
                  const Icon = cat.icon
                  const count = categoryCounts[cat.id] ?? 0
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      className="p-3 rounded-xl border border-border bg-card hover:bg-secondary/40 hover:border-primary/40 flex items-center justify-between text-left transition-all cursor-pointer shadow-2xs"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-secondary flex items-center justify-center text-primary shrink-0">
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <span className="text-xs font-semibold text-foreground truncate">
                          {cat.label}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {count}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Active Results List */
          <div className="space-y-2 pt-1">
            {results.length === 0 ? (
              <CommandEmpty className="py-12 text-center text-xs text-muted-foreground space-y-2">
                <div className="w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground mx-auto">
                  <Search className="w-5 h-5" />
                </div>
                <p className="font-semibold text-foreground text-sm">No matching items found</p>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Try adjusting your keywords or switching category filters.
                </p>
              </CommandEmpty>
            ) : (
              results.map((item) => (
                <SearchResultCard
                  key={item.id}
                  item={item}
                  onClick={() => handleSelectResult(item)}
                />
              ))
            )}
          </div>
        )}
      </CommandList>

      {/* ─────────────────────────────────────────────────────────────
          4. FOOTER PRODUCT STATUS BAR
      ───────────────────────────────────────────────────────────── */}
      <div className="px-4 py-2.5 border-t border-border bg-secondary/30 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
        <div className="flex items-center gap-2">
          <span>ASCI Universal Search</span>
          <span>•</span>
          <span>9 Entities Indexed</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">
            <kbd className="px-1 py-0.5 rounded border border-border bg-card">↑</kbd> <kbd className="px-1 py-0.5 rounded border border-border bg-card">↓</kbd> to navigate
          </span>
          <span>
            <kbd className="px-1 py-0.5 rounded border border-border bg-card">Enter</kbd> to open
          </span>
          <span>
            <kbd className="px-1 py-0.5 rounded border border-border bg-card">Esc</kbd> to close
          </span>
        </div>
      </div>
    </CommandDialog>
  )
}
