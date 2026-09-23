"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  FolderGit2,
  Cpu,
  Terminal,
  Layers,
  Globe,
  Clock,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  ArrowRight,
  Code2,
  Github,
  Play,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react"

interface ProjectDef {
  id: string
  title: string
  category: "Start Here" | "Portfolio Projects" | "Advanced Systems" | "Capstones"
  desc: string
  tech: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedHours: string
  overview: string
  architecture: string
  requirements: string[]
  milestones: string[]
  githubUrl: string
}

const ALL_PROJECTS: ProjectDef[] = [
  {
    id: "chat-engine",
    title: "Real-Time Collaborative Chat & Presence",
    category: "Portfolio Projects",
    desc: "Bi-directional WebSocket communication engine with Redis Pub/Sub broadcasting and PostgreSQL persistence.",
    tech: ["React 19", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
    difficulty: "Intermediate",
    estimatedHours: "14 hours",
    overview: "Build an enterprise-grade real-time messaging pipeline handling high concurrency, user presence heartbeats, and room sharding.",
    architecture: "Clients connect via WebSockets to Node.js gateway instances. Messages publish to Redis channels for cluster broadcast and asynchronously write to PostgreSQL WAL.",
    requirements: [
      "Sub-50ms message latency across concurrent WebSocket connections",
      "Presence heartbeat ping every 10s with automatic disconnect garbage collection",
      "Message history pagination using cursor-based timestamps",
      "Role-based authorization for channel moderation",
    ],
    milestones: [
      "Milestone 1: WebSocket handshake & auth tokens (20%)",
      "Milestone 2: Redis Pub/Sub cluster adapter (40%)",
      "Milestone 3: PostgreSQL schema & message pagination (60%)",
      "Milestone 4: User typing & presence heartbeats (80%)",
      "Milestone 5: Production Docker compose & evaluation (100%)",
    ],
    githubUrl: "https://github.com/asci-academy/realtime-chat-starter",
  },
  {
    id: "apex-kv",
    title: "ApexKV — Distributed Raft-Consensus KV Store",
    category: "Advanced Systems",
    desc: "A fault-tolerant distributed key-value storage engine in Go implementing the Raft consensus protocol.",
    tech: ["Go", "Raft", "gRPC", "Docker", "Protobuf"],
    difficulty: "Advanced",
    estimatedHours: "28 hours",
    overview: "Construct an end-to-end consensus cluster from scratch. Handle network partitions, leader elections, and log compaction.",
    architecture: "Each node executes an event-driven Raft state machine communicating via gRPC. Key-value state is stored in an append-only log with periodic snapshotting.",
    requirements: [
      "Strict Raft leader election with randomized election timeouts",
      "Quorum-based log replication and state machine commit safety",
      "Heartbeat ping RPCs and automated follower catch-up",
      "Linearizable client read and write operations",
    ],
    milestones: [
      "Milestone 1: RPC transport & message framing (20%)",
      "Milestone 2: Leader election & term increment logic (40%)",
      "Milestone 3: AppendEntries log replication & conflict resolution (60%)",
      "Milestone 4: In-memory KV state machine & snapshotting (80%)",
      "Milestone 5: Jepsen-style partition test harness (100%)",
    ],
    githubUrl: "https://github.com/asci-academy/raft-kv-starter",
  },
  {
    id: "spectra-query",
    title: "SpectraQuery — Hybrid Vector RAG Pipeline",
    category: "Advanced Systems",
    desc: "Enterprise document semantic retrieval platform using hybrid vector-keyword scoring and sub-15ms indexing.",
    tech: ["Python 3.12", "FastAPI", "pgvector", "Next.js", "Hugging Face"],
    difficulty: "Intermediate",
    estimatedHours: "18 hours",
    overview: "Build an AI document indexing and question-answering pipeline combining dense vector embeddings with BM25 sparse keyword searches.",
    architecture: "FastAPI server ingests PDFs/Markdown, chunks text with sliding windows, computes embeddings, and executes reciprocal rank fusion (RRF) in PostgreSQL.",
    requirements: [
      "Chunking pipeline with configurable overlap and token bounds",
      "Cosine distance indexing using pgvector IVFFlat / HNSW indexes",
      "Hybrid search re-ranking combining keyword TF-IDF with vector similarity",
      "Streaming LLM response output with cited document source spans",
    ],
    milestones: [
      "Milestone 1: Document parser & text chunker (20%)",
      "Milestone 2: Embedding generator & pgvector schema (40%)",
      "Milestone 3: Reciprocal rank fusion retrieval query (60%)",
      "Milestone 4: RAG prompt synthesis & streaming endpoint (80%)",
      "Milestone 5: Benchmark evaluation on 1,000 document queries (100%)",
    ],
    githubUrl: "https://github.com/asci-academy/vector-rag-starter",
  },
  {
    id: "aurafs",
    title: "AuraFS — High-Performance In-Memory File System",
    category: "Capstones",
    desc: "User-space filesystem implementation in C++ featuring LRU block caching, inode hierarchy, and POSIX-compliant operations.",
    tech: ["C++20", "POSIX", "CMake", "Linux", "Valgrind"],
    difficulty: "Advanced",
    estimatedHours: "24 hours",
    overview: "Implement core OS storage mechanics without kernel dependencies. Manage raw memory blocks, free-lists, and directory inodes.",
    architecture: "Simulates disk blocks in virtual memory. Allocates inodes for files and directories, maintains an open file table, and supports file read/write/truncate syscalls.",
    requirements: [
      "Bitmap free-list allocator for 4KB data blocks",
      "Direct, single-indirect, and double-indirect block pointers",
      "LRU page cache with write-back flushing policies",
      "Zero memory leaks verified under Valgrind suite",
    ],
    milestones: [
      "Milestone 1: Disk block emulator & bitmap allocator (20%)",
      "Milestone 2: Inode structures & directory tree creation (40%)",
      "Milestone 3: File read, write, seek & truncate syscalls (60%)",
      "Milestone 4: In-memory LRU block cache layer (80%)",
      "Milestone 5: POSIX compliance test suite verification (100%)",
    ],
    githubUrl: "https://github.com/asci-academy/aurafs-starter",
  },
  {
    id: "weather-cli",
    title: "Weather & Terminal System Monitor CLI",
    category: "Start Here",
    desc: "Command-line tool in Go displaying live system telemetry, CPU/Memory gauges, and weather forecasts with rich TUI charts.",
    tech: ["Go", "Bubbletea", "REST APIs", "Lipgloss"],
    difficulty: "Beginner",
    estimatedHours: "6 hours",
    overview: "Perfect starter project to understand systems tooling, ANSI terminal rendering, and concurrent Goroutine background workers.",
    architecture: "Uses the Elm architecture in Bubbletea. Periodically polls Linux procfs for CPU/RAM metrics and asynchronously queries meteorological REST endpoints.",
    requirements: [
      "Clean terminal UI layout using Lipgloss styling",
      "Real-time CPU and Memory percent gauges updating every 1s",
      "Graceful SIGINT/SIGTERM cancellation",
      "Cross-platform binary compilation for Linux, macOS & Windows",
    ],
    milestones: [
      "Milestone 1: CLI flag parser & configuration loader (20%)",
      "Milestone 2: Bubbletea state model & view loop (40%)",
      "Milestone 3: Procfs CPU/RAM telemetry parser (60%)",
      "Milestone 4: Weather API client with caching (80%)",
      "Milestone 5: Binary release packaging (100%)",
    ],
    githubUrl: "https://github.com/asci-academy/tui-cli-starter",
  },
  {
    id: "ecommerce-checkout",
    title: "Resilient Idempotent Checkout Engine",
    category: "Portfolio Projects",
    desc: "Distributed payment processing service with transactional outbox, Kafka event queue, and automated reconciliation audit trails.",
    tech: ["Java", "Spring Boot", "Kafka", "PostgreSQL", "Docker"],
    difficulty: "Intermediate",
    estimatedHours: "16 hours",
    overview: "Construct an enterprise financial backend that never double-charges even under network timeouts and retry storms.",
    architecture: "Client requests provide unique idempotency keys. Transactions write order state and outbox events in a single database transaction, polled by Debezium/Kafka.",
    requirements: [
      "Idempotency key enforcement with atomic PostgreSQL upserts",
      "Transactional outbox pattern preventing dual-write inconsistencies",
      "Dead letter queue (DLQ) retry consumer for failed bank webhooks",
      "Full reconciliation report script identifying pending states",
    ],
    milestones: [
      "Milestone 1: Idempotency middleware & database schema (20%)",
      "Milestone 2: Order state machine & status transitions (40%)",
      "Milestone 3: Transactional outbox event publisher (60%)",
      "Milestone 4: Payment gateway webhook verification (80%)",
      "Milestone 5: Chaos engineering test with 50% simulated dropped packets (100%)",
    ],
    githubUrl: "https://github.com/asci-academy/checkout-engine-starter",
  },
]

export default function ProjectsHubPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")
  const [selectedProject, setSelectedProject] = useState<ProjectDef | null>(null)
  const [projectProgress, setProjectProgress] = useState<Record<string, number>>({})

  const categories = ["All", "Start Here", "Portfolio Projects", "Advanced Systems", "Capstones"]
  const difficulties = ["All", "Beginner", "Intermediate", "Advanced"]

  const filteredProjects = useMemo(() => {
    return ALL_PROJECTS.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesCat =
        selectedCategory === "All" || p.category === selectedCategory

      const matchesDiff =
        selectedDifficulty === "All" || p.difficulty === selectedDifficulty

      return matchesSearch && matchesCat && matchesDiff
    })
  }, [searchQuery, selectedCategory, selectedDifficulty])

  const handleUpdateProgress = (projectId: string, stepIdx: number) => {
    const newProgress = Math.min(100, (stepIdx + 1) * 20)
    setProjectProgress((prev) => ({
      ...prev,
      [projectId]: newProgress,
    }))
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary pb-16 md:pb-0">
      <Navbar />

      {/* Header Banner */}
      <section className="pt-24 sm:pt-28 pb-8 sm:pb-12 border-b border-border/60 bg-secondary/20">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono font-medium text-primary shadow-2xs">
              <span>PORTFOLIO &amp; PRODUCTION BUILDS</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-foreground tracking-tight">
              Engineering Projects Hub
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              Step beyond hello-world tutorials. Build production systems, distributed consensus clusters, and full-stack applications with architecture specs you can defend in technical interviews.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by technology (Go, Python, React, C++)..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-card border border-border/80 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-2xs transition-all"
              />
            </div>
          </div>

          {/* Category Tabs */}
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

      {/* Main Grid */}
      <section className="py-8 sm:py-12 flex-1">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between pb-6 border-b border-border/60 mb-8">
            <span className="text-xs font-mono text-muted-foreground">
              Showing <strong className="text-foreground font-semibold">{filteredProjects.length}</strong> Projects
            </span>

            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-muted-foreground">Difficulty:</span>
              {difficulties.map((diff) => (
                <button
                  key={diff}
                  onClick={() => setSelectedDifficulty(diff)}
                  className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
                    selectedDifficulty === diff
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {diff}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              const currentProgress = projectProgress[project.id] || 0

              return (
                <div
                  key={project.id}
                  className="rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-sm flex flex-col justify-between"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold bg-primary/10 px-2.5 py-0.5 rounded-md">
                        {project.category}
                      </span>
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                          project.difficulty === "Beginner"
                            ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                            : project.difficulty === "Intermediate"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : "bg-red-500/10 text-red-600 dark:text-red-400"
                        }`}
                      >
                        {project.difficulty}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-foreground tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {project.desc}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mt-3.5">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border/60 text-muted-foreground"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Progress & Duration */}
                    <div className="mt-4 pt-3 border-t border-border/60 space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-mono">
                        <span className="text-muted-foreground">Estimated: {project.estimatedHours}</span>
                        <span className="font-semibold text-primary">{currentProgress}%</span>
                      </div>
                      <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-primary h-full rounded-full transition-all duration-300"
                          style={{ width: `${currentProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 mt-4 border-t border-border/60 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-xs font-medium text-foreground transition-colors cursor-pointer text-center"
                    >
                      View Blueprint
                    </button>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="flex-1 py-2 px-3 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold transition-colors cursor-pointer text-center shadow-2xs"
                    >
                      Start Build
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Project Detail Modal / Blueprint Drawer */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl animate-fadeIn">
            <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold">
                  {selectedProject.category} · {selectedProject.difficulty}
                </span>
                <h2 className="text-xl font-semibold text-foreground tracking-tight mt-1">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-1.5 rounded-lg bg-secondary text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Overview & Architecture */}
            <div className="space-y-4 text-xs sm:text-sm">
              <div>
                <h4 className="font-semibold text-foreground mb-1">Project Overview</h4>
                <p className="text-muted-foreground leading-relaxed">{selectedProject.overview}</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-1">Architecture Specification</h4>
                <p className="text-muted-foreground leading-relaxed bg-secondary/50 p-3 rounded-xl border border-border/60 font-mono text-xs">
                  {selectedProject.architecture}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Key Engineering Requirements</h4>
                <ul className="space-y-1.5">
                  {selectedProject.requirements.map((req) => (
                    <li key={req} className="flex items-start gap-2 text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Milestones Progress Tracker */}
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Project Milestones ({projectProgress[selectedProject.id] || 0}% Complete)
                </h4>
                <div className="space-y-2">
                  {selectedProject.milestones.map((m, idx) => {
                    const stepDone = (projectProgress[selectedProject.id] || 0) >= (idx + 1) * 20

                    return (
                      <div
                        key={m}
                        onClick={() => handleUpdateProgress(selectedProject.id, idx)}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs font-mono cursor-pointer transition-all ${
                          stepDone
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold"
                            : "border-border/80 bg-secondary/30 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        <span>{m}</span>
                        <span>{stepDone ? "✓ Done" : "Mark Complete"}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-border/60 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto py-2.5 px-4 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-xs font-semibold text-foreground transition-colors cursor-pointer"
              >
                <Github className="w-4 h-4" />
                <span>Clone Starter Repo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => {
                  alert("Project evaluation link copied! Push your repo to GitHub and submit your verified pull request.")
                  setSelectedProject(null)
                }}
                className="inline-flex items-center justify-center gap-2 flex-1 w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Submit for Code Review</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer showCTA={false} />
    </main>
  )
}
