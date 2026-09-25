"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Search,
  Flame,
  Terminal,
  Code2,
  CheckCircle2,
  ChevronRight,
  X,
  ArrowRight,
  Zap,
  Target,
  Cpu,
  Layers,
  Activity,
  ArrowRightLeft,
  Play,
  RotateCcw,
} from "lucide-react"
import { ChallengeCard, ChallengeCardProps } from "@/components/cards/challenge-card"
import { BrandIcon } from "@/components/ui/brand-icon"
import { ContextualAxelButton } from "@/components/axel/contextual-axel-button"

const PRACTICE_CATEGORIES = [
  "DSA",
  "Python",
  "Java",
  "JavaScript",
  "SQL",
  "System Design",
  "AI",
]

const A2Z_ROADMAP_STEPS = [
  { step: 1, name: "Arrays", count: 35, solved: 18, brand: "algorithm", difficulty: "Easy-Medium" },
  { step: 2, name: "Strings", count: 24, solved: 12, brand: "typescript", difficulty: "Easy-Medium" },
  { step: 3, name: "Linked List", count: 20, solved: 8, brand: "algorithm", difficulty: "Medium" },
  { step: 4, name: "Stack", count: 18, solved: 6, brand: "python", difficulty: "Medium" },
  { step: 5, name: "Queue", count: 16, solved: 5, brand: "java", difficulty: "Medium" },
  { step: 6, name: "Trees", count: 32, solved: 10, brand: "algorithm", difficulty: "Medium-Hard" },
  { step: 7, name: "Graphs", count: 28, solved: 7, brand: "go", difficulty: "Hard" },
  { step: 8, name: "DP", count: 36, solved: 9, brand: "algorithm", difficulty: "Hard" },
]

const PRACTICE_CHALLENGES: (ChallengeCardProps & { category: string; description?: string })[] = [
  // DSA
  {
    id: "potd-sliding-window",
    slug: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    category: "DSA",
    difficulty: "Hard",
    topic: "Monotonic Deque",
    estimatedMinutes: 30,
    solvedCount: 3240,
    acceptanceRate: "42.8%",
    xpReward: 50,
    isDaily: true,
  },
  {
    id: "dsa-two-sum",
    slug: "two-sum",
    title: "Two Sum — Optimal Hash Map",
    category: "DSA",
    difficulty: "Easy",
    topic: "Hash Table",
    estimatedMinutes: 15,
    solvedCount: 14200,
    acceptanceRate: "68.5%",
    xpReward: 20,
    status: "attempted",
  },
  {
    id: "dsa-trapping-rain-water",
    slug: "trapping-rain-water",
    title: "Trapping Rain Water",
    category: "DSA",
    difficulty: "Hard",
    topic: "Two Pointers",
    estimatedMinutes: 35,
    solvedCount: 4890,
    acceptanceRate: "48.1%",
    xpReward: 45,
  },
  {
    id: "dsa-longest-substring",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    category: "DSA",
    difficulty: "Medium",
    topic: "Sliding Window",
    estimatedMinutes: 20,
    solvedCount: 9120,
    acceptanceRate: "54.2%",
    xpReward: 30,
  },
  {
    id: "dsa-lru-cache",
    slug: "lru-cache",
    title: "LRU Cache Architecture",
    category: "DSA",
    difficulty: "Medium",
    topic: "Doubly Linked List",
    estimatedMinutes: 30,
    solvedCount: 6540,
    acceptanceRate: "41.8%",
    xpReward: 40,
  },
  {
    id: "dsa-binary-tree-level-order",
    slug: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    category: "DSA",
    difficulty: "Medium",
    topic: "BFS Queue",
    estimatedMinutes: 20,
    solvedCount: 7890,
    acceptanceRate: "58.4%",
    xpReward: 30,
  },
  {
    id: "dsa-reverse-linked-list",
    slug: "reverse-linked-list",
    title: "Reverse a Singly Linked List",
    category: "DSA",
    difficulty: "Easy",
    topic: "Linked List",
    estimatedMinutes: 15,
    solvedCount: 16800,
    acceptanceRate: "74.1%",
    xpReward: 20,
    status: "solved",
  },
  {
    id: "dsa-coin-change",
    slug: "coin-change",
    title: "Coin Change (Fewest Coins)",
    category: "DSA",
    difficulty: "Medium",
    topic: "Dynamic Programming",
    estimatedMinutes: 25,
    solvedCount: 8200,
    acceptanceRate: "45.9%",
    xpReward: 35,
  },

  // Python
  {
    id: "py-custom-iterator",
    slug: "python-custom-iterator-generator",
    title: "Implement Infinite Memory-Safe Generator",
    category: "Python",
    difficulty: "Medium",
    topic: "Generators & Yield",
    estimatedMinutes: 20,
    solvedCount: 1820,
    acceptanceRate: "52.1%",
    xpReward: 30,
  },
  {
    id: "py-async-pool",
    slug: "python-asyncio-concurrency-pool",
    title: "Asyncio Semaphore Task Throttler",
    category: "Python",
    difficulty: "Hard",
    topic: "Asyncio & Tasks",
    estimatedMinutes: 35,
    solvedCount: 940,
    acceptanceRate: "39.4%",
    xpReward: 45,
  },
  {
    id: "py-metaclass-validation",
    slug: "python-metaclass-runtime-validator",
    title: "Runtime Type Assertion via Metaclasses",
    category: "Python",
    difficulty: "Hard",
    topic: "Metaclasses & Dunder",
    estimatedMinutes: 40,
    solvedCount: 610,
    acceptanceRate: "34.2%",
    xpReward: 50,
  },

  // Java
  {
    id: "java-reentrant-lock",
    slug: "java-custom-thread-pool-executor",
    title: "Bounded Blocking Queue with ReentrantLock",
    category: "Java",
    difficulty: "Hard",
    topic: "Concurrency & Locks",
    estimatedMinutes: 35,
    solvedCount: 1120,
    acceptanceRate: "38.6%",
    xpReward: 45,
  },
  {
    id: "java-stream-collector",
    slug: "java-custom-stream-collector",
    title: "Custom Stream Collector for Grouping",
    category: "Java",
    difficulty: "Medium",
    topic: "Java 21 Streams",
    estimatedMinutes: 20,
    solvedCount: 2450,
    acceptanceRate: "51.8%",
    xpReward: 30,
  },

  // JavaScript
  {
    id: "js-custom-promise-all",
    slug: "javascript-custom-promise-all-settled",
    title: "Implement Promise.allSettled from Scratch",
    category: "JavaScript",
    difficulty: "Medium",
    topic: "Async & Promises",
    estimatedMinutes: 25,
    solvedCount: 3890,
    acceptanceRate: "47.2%",
    xpReward: 35,
  },
  {
    id: "js-event-emitter",
    slug: "javascript-custom-event-emitter",
    title: "Custom Event Emitter with Once & Wildcard",
    category: "JavaScript",
    difficulty: "Medium",
    topic: "Prototypes & Events",
    estimatedMinutes: 20,
    solvedCount: 4210,
    acceptanceRate: "58.0%",
    xpReward: 30,
  },

  // SQL
  {
    id: "sql-nth-highest-salary",
    slug: "sql-nth-highest-salary",
    title: "Nth Highest Employee Compensation",
    category: "SQL",
    difficulty: "Medium",
    topic: "DENSE_RANK() Window",
    estimatedMinutes: 15,
    solvedCount: 5410,
    acceptanceRate: "61.3%",
    xpReward: 25,
  },
  {
    id: "sql-consecutive-logins",
    slug: "sql-consecutive-user-streaks",
    title: "Calculate 5-Day Active User Streaks",
    category: "SQL",
    difficulty: "Hard",
    topic: "Self-Join & LEAD/LAG",
    estimatedMinutes: 30,
    solvedCount: 2190,
    acceptanceRate: "44.7%",
    xpReward: 40,
  },

  // System Design
  {
    id: "backend-token-bucket",
    slug: "system-design-token-bucket-rate-limiter",
    title: "Distributed Token-Bucket Rate Limiter",
    category: "System Design",
    difficulty: "Hard",
    topic: "Redis & Concurrency",
    estimatedMinutes: 35,
    solvedCount: 1450,
    acceptanceRate: "41.0%",
    xpReward: 45,
  },
  {
    id: "sys-design-url-shortener",
    slug: "system-design-tinyurl-hashing",
    title: "Base62 Hash ID Generator with Murmur3",
    category: "System Design",
    difficulty: "Medium",
    topic: "Hashing & Base62",
    estimatedMinutes: 25,
    solvedCount: 2890,
    acceptanceRate: "53.2%",
    xpReward: 35,
  },

  // AI
  {
    id: "ai-vector-cosine-similarity",
    slug: "ai-vector-cosine-similarity-engine",
    title: "Vector Cosine Similarity & Matrix Dot-Product",
    category: "AI",
    difficulty: "Medium",
    topic: "NumPy & Embeddings",
    estimatedMinutes: 25,
    solvedCount: 1780,
    acceptanceRate: "55.8%",
    xpReward: 35,
  },
  {
    id: "ai-token-chunking-sliding",
    slug: "ai-token-chunking-rag-pipeline",
    title: "Semantic Text Chunking with Token Overlap",
    category: "AI",
    difficulty: "Medium",
    topic: "RAG & Tokenization",
    estimatedMinutes: 25,
    solvedCount: 1340,
    acceptanceRate: "50.4%",
    xpReward: 35,
  },
]

export function PracticeHub() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredChallenges = useMemo(() => {
    return PRACTICE_CHALLENGES.filter((c) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchTitle = c.title.toLowerCase().includes(q)
        const matchTopic = c.topic?.toLowerCase().includes(q)
        if (!matchTitle && !matchTopic) return false
      }

      if (selectedCategory !== "All" && c.category !== selectedCategory) {
        return false
      }

      if (selectedDifficulty !== "All" && c.difficulty !== selectedDifficulty) {
        return false
      }

      return true
    })
  }, [searchQuery, selectedCategory, selectedDifficulty])

  const potd = PRACTICE_CHALLENGES[0]
  const continueChallenge = PRACTICE_CHALLENGES.find((c) => c.status === "attempted") || PRACTICE_CHALLENGES[1]

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <ChevronRight className="h-3 w-3" />
          <span className="text-foreground font-semibold">Practice</span>
        </nav>

        {/* TOP: Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-border pb-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-foreground">
              Practice
            </h1>
            <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
              Sharpen your technical skills.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search challenges, topics..."
                className="w-full h-11 pl-10 pr-9 rounded-xl border border-border bg-card text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary shadow-2xs transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            <Link
              href="/dsa/a2z-sheet"
              className="inline-flex items-center gap-1.5 h-11 px-4 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-xs font-semibold text-foreground transition-colors font-mono shrink-0 shadow-2xs"
            >
              <Code2 className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">A2Z Sheet</span>
              <span>(474)</span>
            </Link>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="space-y-2">
          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
            Categories
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === "All"
                  ? "bg-primary text-primary-foreground shadow-2xs"
                  : "bg-card text-muted-foreground hover:text-foreground border border-border hover:border-primary/40"
              }`}
            >
              All Topics
            </button>
            {PRACTICE_CATEGORIES.map((cat) => (
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
        </div>

        {/* TODAY & CONTINUE (Two Compact Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* TODAY: Problem of the Day */}
          <div className="p-6 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col justify-between space-y-4 shadow-2xs relative overflow-hidden">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-primary text-primary-foreground shadow-2xs">
                  <Flame className="h-3.5 w-3.5 fill-current" />
                  TODAY · PROBLEM OF THE DAY
                </span>
                <span className="text-xs font-mono text-primary font-bold">+50 XP</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                {potd.title}
              </h2>

              <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                Find the maximum elements in all sliding windows of size k across a streaming integer buffer using an optimal monotonic deque.
              </p>

              <div className="flex items-center gap-2 pt-1 text-xs font-mono text-muted-foreground">
                <span className="text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded font-semibold">
                  Hard
                </span>
                <span>•</span>
                <span>Topic: {potd.topic}</span>
                <span>•</span>
                <span>{potd.solvedCount} solved</span>
              </div>
            </div>

            <div className="pt-2 border-t border-primary/10 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <Link
                href={`/dsa/problem/${potd.slug}`}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] font-semibold text-xs transition-all shadow-xs cursor-pointer"
              >
                <span>Solve Today&apos;s Challenge</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <ContextualAxelButton context="dsa" topicTitle={potd.title} />
            </div>
          </div>

          {/* CONTINUE: Continue your practice */}
          <div className="p-6 rounded-2xl border border-border bg-card flex flex-col justify-between space-y-4 shadow-2xs">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-secondary border border-border text-foreground">
                  <RotateCcw className="h-3 w-3 text-primary" />
                  CONTINUE YOUR PRACTICE
                </span>
                <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-semibold">In Progress</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                {continueChallenge.title}
              </h2>

              <p className="text-xs text-muted-foreground leading-relaxed">
                Resume from your saved state in the multi-language compiler sandbox with real-time testcase assertions.
              </p>

              <div className="flex items-center gap-2 pt-1 text-xs font-mono text-muted-foreground">
                <span className="text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded font-semibold">
                  {continueChallenge.difficulty}
                </span>
                <span>•</span>
                <span>Topic: {continueChallenge.topic}</span>
                <span>•</span>
                <span>~{continueChallenge.estimatedMinutes} min</span>
              </div>
            </div>

            <div className="pt-2 border-t border-border/60">
              <Link
                href={`/dsa/problem/${continueChallenge.slug}`}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground font-semibold text-xs transition-all shadow-2xs cursor-pointer"
              >
                <span>Resume Problem</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ROADMAP: A2Z DSA (Arrays -> Strings -> Linked List -> Stack -> Queue -> Trees -> Graphs -> DP) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
                <Target className="h-3.5 w-3.5" />
                <span>CORE ROADMAP</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-serif font-normal text-foreground tracking-tight">
                A2Z DSA Roadmap
              </h2>
            </div>
            <Link
              href="/dsa/a2z-sheet"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
            >
              <span>View Full 474 Sheet</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Clean Linear Progression Tiles */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {A2Z_ROADMAP_STEPS.map((step) => {
              const progressPct = Math.round((step.solved / step.count) * 100)
              return (
                <button
                  key={step.step}
                  onClick={() => {
                    setSelectedCategory("DSA")
                    setSearchQuery(step.name)
                  }}
                  className="p-3.5 rounded-xl border border-border bg-card hover:border-primary/50 text-left transition-all shadow-2xs group cursor-pointer space-y-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-primary px-1.5 py-0.5 rounded bg-secondary">
                      0{step.step}
                    </span>
                    <span className="text-[10px] font-mono text-muted-foreground">
                      {step.solved}/{step.count}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xs font-bold text-foreground group-hover:text-primary transition-colors truncate">
                      {step.name}
                    </h3>
                    <p className="text-[10px] text-muted-foreground truncate mt-0.5">
                      {step.difficulty}
                    </p>
                  </div>

                  <div className="w-full h-1 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* INTERACTIVE VISUALIZERS (RAM Inspector, Array Shifter, Call Stack, Big-O Racer) */}
        <div className="p-4 rounded-xl border border-border bg-secondary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0">
              <Cpu className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">
                Interactive Algorithm Visualizers
              </div>
              <p className="text-[11px] text-muted-foreground">
                RAM Inspector, Array Shifter, Call Stack recursion tracer, and Big-O Racer live benchmarks.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Link
              href="/dashboard?tab=visualizers&engine=ram-inspector"
              className="px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-secondary text-foreground text-xs font-semibold whitespace-nowrap transition-colors"
            >
              RAM Inspector
            </Link>
            <Link
              href="/dashboard?tab=visualizers&engine=array-shifter"
              className="px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-secondary text-foreground text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Array Shifter
            </Link>
            <Link
              href="/dashboard?tab=visualizers&engine=call-stack"
              className="px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-secondary text-foreground text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Call Stack
            </Link>
            <Link
              href="/dashboard?tab=visualizers&engine=big-o"
              className="px-3 py-1.5 rounded-lg bg-card border border-border hover:bg-secondary text-foreground text-xs font-semibold whitespace-nowrap transition-colors"
            >
              Big-O Racer
            </Link>
          </div>
        </div>

        {/* ALL PRACTICE PROBLEMS */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/80 pb-3">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-foreground">
                {selectedCategory === "All" ? "All Practice Challenges" : `${selectedCategory} Challenges`}
              </h2>
              <span className="text-xs font-mono text-muted-foreground">
                ({filteredChallenges.length})
              </span>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-1.5">
              {["All", "Easy", "Medium", "Hard"].map((diff) => (
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
          </div>

          {filteredChallenges.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredChallenges.map((challenge) => (
                <ChallengeCard
                  key={challenge.id}
                  id={challenge.id}
                  slug={challenge.slug}
                  title={challenge.title}
                  difficulty={challenge.difficulty}
                  topic={challenge.topic}
                  estimatedMinutes={challenge.estimatedMinutes}
                  solvedCount={challenge.solvedCount}
                  acceptanceRate={challenge.acceptanceRate}
                  xpReward={challenge.xpReward}
                  status={challenge.status}
                  isDaily={challenge.isDaily}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center space-y-3">
              <Terminal className="h-10 w-10 text-muted-foreground mx-auto opacity-60" />
              <h3 className="font-semibold text-foreground text-base">
                No practice problems found
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No challenges match your active topic or difficulty filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory("All")
                  setSelectedDifficulty("All")
                  setSearchQuery("")
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-primary text-primary-foreground hover:bg-[#EA5300] cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
