"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  MessageSquare,
  Users,
  Award,
  HelpCircle,
  Bell,
  FolderGit2,
  Calendar,
  ThumbsUp,
  Clock,
  ArrowRight,
  Plus,
  Search,
  ExternalLink,
} from "lucide-react"

type CommunityFilter = "all" | "discussions" | "questions" | "groups" | "showcase"

interface DiscussionPost {
  id: string
  title: string
  snippet: string
  author: string
  handle: string
  category: "Architecture" | "DSA" | "Python" | "WebDev" | "Systems"
  type: "discussion" | "question" | "showcase"
  timeAgo: string
  replies: number
  upvotes: number
  tags: string[]
}

const DISCUSSIONS: DiscussionPost[] = [
  {
    id: "disc-1",
    title: "How to handle Raft log compaction when snapshotting in Go?",
    snippet: "I am implementing Milestone 4 of the ApexKV project and seeing edge cases during follower catch-up after a snapshot install RPC. How are you synchronizing the state machine mutex?",
    author: "Mokshagna Theja",
    handle: "@masteraccess72",
    category: "Systems",
    type: "question",
    timeAgo: "2 hours ago",
    replies: 8,
    upvotes: 14,
    tags: ["Go", "Raft", "Distributed Systems"],
  },
  {
    id: "disc-2",
    title: "Project Showcase: SpectraQuery Vector RAG benchmark results",
    snippet: "Just deployed SpectraQuery with pgvector HNSW indexing on 50k technical docs. Benchmarking reveals sub-12ms p95 latency compared to standard IVFFlat. Repo link inside.",
    author: "Sarah Chen",
    handle: "@sarahc",
    category: "Architecture",
    type: "showcase",
    timeAgo: "5 hours ago",
    replies: 12,
    upvotes: 31,
    tags: ["Python", "FastAPI", "pgvector", "RAG"],
  },
  {
    id: "disc-3",
    title: "Daily DSA Discussion: Optimal solution for Two Sum II with constant space",
    snippet: "Exploring why the two-pointer approach works strictly on sorted arrays and how it eliminates the hash map space overhead from O(N) to O(1).",
    author: "Aarav Patel",
    handle: "@aaravp",
    category: "DSA",
    type: "discussion",
    timeAgo: "1 day ago",
    replies: 19,
    upvotes: 42,
    tags: ["DSA", "Two Pointers", "Arrays"],
  },
  {
    id: "disc-4",
    title: "Next.js 15 Server Actions vs API Route Handlers in high-traffic checkout",
    snippet: "Comparing network overhead and cache invalidation when submitting credit orders through Server Actions vs REST handlers in production microservices.",
    author: "Marcus Vance",
    handle: "@marcusv",
    category: "WebDev",
    type: "discussion",
    timeAgo: "2 days ago",
    replies: 15,
    upvotes: 27,
    tags: ["Next.js", "React 19", "Architecture"],
  },
]

const STUDY_GROUPS = [
  {
    id: "sg-1",
    title: "A2Z DSA 60-Day Sprint Cohort",
    topic: "Graphs, Trees & Dynamic Programming",
    schedule: "Mon, Wed, Fri at 7 PM IST",
    members: 24,
    status: "Active",
  },
  {
    id: "sg-2",
    title: "Distributed Systems Reading Group",
    topic: "Raft, Paxos & Spanner Papers",
    schedule: "Sundays at 6 PM IST",
    members: 18,
    status: "Active",
  },
]

const LEADERBOARD = [
  { rank: 1, name: "Mokshagna T.", handle: "@masteraccess72", solved: 342, xp: 14200 },
  { rank: 2, name: "Sarah Chen", handle: "@sarahc", solved: 318, xp: 13150 },
  { rank: 3, name: "Marcus Vance", handle: "@marcusv", solved: 295, xp: 12400 },
  { rank: 4, name: "Elena Rostova", handle: "@elenar", solved: 280, xp: 11900 },
  { rank: 5, name: "Aarav Patel", handle: "@aaravp", solved: 264, xp: 10850 },
]

export default function CommunityPage() {
  const [filter, setFilter] = useState<CommunityFilter>("all")
  const [search, setSearch] = useState("")

  const filteredDiscussions = DISCUSSIONS.filter((d) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "discussions" && d.type === "discussion") ||
      (filter === "questions" && d.type === "question") ||
      (filter === "showcase" && d.type === "showcase")

    const matchesSearch =
      !search ||
      d.title.toLowerCase().includes(search.toLowerCase()) ||
      d.snippet.toLowerCase().includes(search.toLowerCase()) ||
      d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary pb-16 md:pb-0">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary shadow-2xs">
              <span>LEARNING-FOCUSED STUDENT NETWORK</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
              Engineering Community
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Collaborative technical discussions, code review circles, study cohorts, and project showcases. Built for serious engineering students.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="py-8 sm:py-12 flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Cols: Discussions Stream */}
            <div className="lg:col-span-8 space-y-6">
              {/* Controls Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-border/60">
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {[
                    { id: "all", label: "All Posts" },
                    { id: "discussions", label: "Discussions" },
                    { id: "questions", label: "Questions" },
                    { id: "showcase", label: "Showcase" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setFilter(tab.id as any)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors shrink-0 cursor-pointer ${
                        filter === tab.id
                          ? "bg-primary text-white font-semibold shadow-2xs"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Filter topics or tags..."
                    className="pl-8 pr-3 py-1.5 rounded-xl bg-card border border-border/80 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-2xs w-full sm:w-48"
                  />
                </div>
              </div>

              {/* Discussions List */}
              <div className="space-y-4">
                {filteredDiscussions.map((d) => (
                  <div
                    key={d.id}
                    className="rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-xs space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-xs font-mono font-bold text-primary">
                          {d.author.charAt(0)}
                        </div>
                        <span className="text-xs font-semibold text-foreground">{d.author}</span>
                        <span className="text-xs font-mono text-muted-foreground">{d.handle}</span>
                        <span className="text-muted-foreground text-xs">·</span>
                        <span className="text-xs text-muted-foreground">{d.timeAgo}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border/60">
                        {d.category}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground hover:text-primary transition-colors cursor-pointer tracking-tight">
                      {d.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {d.snippet}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-border/60 text-xs text-muted-foreground font-mono">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {d.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 rounded bg-secondary/80 text-muted-foreground border border-border/60"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="w-3.5 h-3.5 text-primary" />
                          <span>{d.upvotes}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{d.replies} replies</span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Study Groups & Verified Leaderboard */}
            <div className="lg:col-span-4 space-y-6">
              {/* Study Cohorts */}
              <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Active Study Cohorts</h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded">
                    Live
                  </span>
                </div>

                <div className="space-y-3">
                  {STUDY_GROUPS.map((sg) => (
                    <div
                      key={sg.id}
                      className="p-3.5 rounded-xl border border-border/80 bg-secondary/30 space-y-1.5"
                    >
                      <h4 className="text-xs font-semibold text-foreground">{sg.title}</h4>
                      <p className="text-[11px] text-muted-foreground font-mono">{sg.topic}</p>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-2">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-primary" />
                          <span>{sg.schedule}</span>
                        </span>
                        <span className="font-mono text-primary font-semibold">{sg.members} members</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Leaderboard */}
              <div className="rounded-2xl border border-border/80 bg-card p-5 space-y-4 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    <h3 className="text-sm font-semibold text-foreground">Verified Problem Solvers</h3>
                  </div>
                  <span className="text-[10px] font-mono text-muted-foreground">This Month</span>
                </div>

                <div className="divide-y divide-border/60">
                  {LEADERBOARD.map((item) => (
                    <div key={item.handle} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 text-center font-mono font-bold text-muted-foreground">
                          {item.rank}
                        </span>
                        <div>
                          <span className="font-semibold text-foreground block">{item.name}</span>
                          <span className="text-[10px] font-mono text-muted-foreground">{item.handle}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono">
                        <span className="font-bold text-primary block">{item.solved} Solved</span>
                        <span className="text-[10px] text-muted-foreground">{item.xp.toLocaleString()} XP</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer showCTA={false} />
    </main>
  )
}
