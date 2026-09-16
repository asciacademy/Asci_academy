"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Hammer,
  Layers,
  Cpu,
  Database,
  Server,
  GitBranch,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Terminal,
  ShieldCheck,
  FileCode2,
  FolderGit2,
  Sparkles,
  Play,
  Github
} from "lucide-react"

export interface CapstoneProject {
  id: string
  title: string
  category: "Systems" | "Distributed Systems" | "AI & Neural" | "Full-Stack"
  difficulty: "Intermediate" | "Advanced" | "Production"
  estimatedHours: number
  summary: string
  brief: string
  architecture: string[]
  milestones: {
    id: string
    title: string
    description: string
    completed: boolean
  }[]
  skillsDemonstrated: string[]
  repoStarterUrl?: string
  reviewStatus: "Not Started" | "In Progress" | "Submitted" | "Passed"
  xpReward: number
}

const SAMPLE_PROJECTS: CapstoneProject[] = [
  {
    id: "lsm-storage-engine",
    title: "LSM-Tree Distributed Key-Value Store",
    category: "Systems",
    difficulty: "Production",
    estimatedHours: 48,
    summary: "Build an append-only, high-write throughput storage engine inspired by LevelDB with MemTable, WAL, SSTables, and background compaction.",
    brief: "Design and implement an in-memory Write-Ahead Log (WAL) that flushes sorted string tables (SSTables) to disk, with Bloom filters for sub-millisecond point queries.",
    architecture: [
      "Client Request -> Write Ahead Log (WAL) fsync buffer",
      "Concurrent SkipList MemTable (Lock-free CAS)",
      "Tiered Multi-level Compaction Worker Thread Pool",
      "Sparse Index with 64-bit MurmurHash3 Bloom Filters",
    ],
    milestones: [
      { id: "m1", title: "WAL & Binary Serialization Protocol", description: "Implement crash-recovery log parser with CRC32 checksums", completed: true },
      { id: "m2", title: "Lock-Free MemTable Implementation", description: "SkipList structure supporting concurrent readers and single flusher", completed: true },
      { id: "m3", title: "SSTable Block Format & Index Builder", description: "Fixed 4KB block compression with block index metadata", completed: false },
      { id: "m4", title: "Leveled Compaction Algorithm", description: "Multi-threaded merge sort to enforce size ratio invariants", completed: false },
      { id: "m5", title: "Jepsen Distributed Stress Testing", description: "Simulate network partitions and verify linearizable read consistency", completed: false },
    ],
    skillsDemonstrated: ["Memory Management", "Concurrency & Atomics", "Disk I/O & Buffering", "LSM-Tree Compaction", "Crash Recovery"],
    repoStarterUrl: "https://github.com/asciacademy/lsm-tree-starter",
    reviewStatus: "In Progress",
    xpReward: 650,
  },
  {
    id: "epoll-event-loop",
    title: "Zero-Copy High-Throughput HTTP/2 Server",
    category: "Systems",
    difficulty: "Advanced",
    estimatedHours: 36,
    summary: "Implement an asynchronous event-driven TCP networking engine using Linux epoll/kqueue with buffer ring pools and HTTP/2 framing.",
    brief: "Construct a non-blocking network reactor that sustains 120,000 requests/sec with predictable p99 tail latency under 4ms.",
    architecture: [
      "Kernel epoll_wait event dispatcher thread pool",
      "Zero-copy splice & sendfile data streaming pipelines",
      "HTTP/2 binary frame encoder & HPACK header compressor",
      "Dynamic connection keep-alive pool with timeout priority queues",
    ],
    milestones: [
      { id: "m1", title: "Non-blocking Socket Architecture", description: "Configure TCP_NODELAY, SO_REUSEPORT, and edge-triggered epoll events", completed: true },
      { id: "m2", title: "Ring Buffer Allocation Pool", description: "Eliminate malloc syscalls in the hot request path", completed: true },
      { id: "m3", title: "HPACK Compression & Huffman Decoder", description: "Dynamic table compression for HTTP/2 headers", completed: false },
      { id: "m4", title: "Benchmarking against Nginx & Envoy", description: "wrk2 latency distribution profiling under 100k persistent clients", completed: false },
    ],
    skillsDemonstrated: ["Linux epoll/kqueue", "TCP Socket Options", "Zero-Copy I/O", "HTTP/2 Binary Framing", "Tail Latency Profiling"],
    repoStarterUrl: "https://github.com/asciacademy/epoll-server-starter",
    reviewStatus: "In Progress",
    xpReward: 500,
  },
  {
    id: "agentic-neural-orchestrator",
    title: "Autonomous Multi-Agent Swarm Orchestrator",
    category: "AI & Neural",
    difficulty: "Advanced",
    estimatedHours: 40,
    summary: "Architect a fault-tolerant multi-agent planning and execution loop with hierarchical memory graphs, tool sandboxing, and self-correction.",
    brief: "Build an autonomous engineering squad of AI agents that can read an issue ticket, execute bash commands, run regression tests, and submit git PRs.",
    architecture: [
      "Task Graph DAG Planner with topological cycle resolution",
      "Sandboxed Docker execution environment for tool commands",
      "Vector + Graph Hybrid Persistent Memory Store (SQLite-VSS)",
      "Self-reflective Critique & Verification Gating loop",
    ],
    milestones: [
      { id: "m1", title: "Agent ReAct Loop & JSON Schema Parser", description: "Type-safe tool execution with strict grammar constraints", completed: false },
      { id: "m2", title: "Hierarchical Context Pruning Engine", description: "Token-lean context manager with vector memory retrieval", completed: false },
      { id: "m3", title: "Docker Execution Container Isolation", description: "Ephemeral rootless microVM sandboxes for untrusted code", completed: false },
      { id: "m4", title: "End-to-End Autonomous Bug Fix Pipeline", description: "Demonstrate agent resolving real GitHub issues on benchmark repo", completed: false },
    ],
    skillsDemonstrated: ["LLM Reasoning Loops", "Vector & Graph Memory", "Docker Container APIs", "Tool Calling Sandboxes", "DAG Orchestration"],
    repoStarterUrl: "https://github.com/asciacademy/agent-orchestrator-starter",
    reviewStatus: "Not Started",
    xpReward: 600,
  },
]

export function DashboardProjects() {
  const [selectedProject, setSelectedProject] = useState<CapstoneProject>(SAMPLE_PROJECTS[0])
  const [submissionUrl, setSubmissionUrl] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionSuccess, setSubmissionSuccess] = useState(false)

  const handleMilestoneToggle = (milestoneId: string) => {
    setSelectedProject((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === milestoneId ? { ...m, completed: !m.completed } : m
      ),
    }))
  }

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!submissionUrl.trim()) return
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmissionSuccess(true)
      setSelectedProject((prev) => ({ ...prev, reviewStatus: "Submitted" }))
    }, 900)
  }

  const completedCount = selectedProject.milestones.filter((m) => m.completed).length
  const progressPercent = Math.round((completedCount / selectedProject.milestones.length) * 100)

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              Capstone Engineering Labs
            </span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="text-xs font-mono text-muted-foreground">Proof of Mastery</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground mt-1">
            Build Portfolio-Grade Systems
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 max-w-2xl leading-relaxed">
            Move beyond tutorial exercises. Implement distributed consensus engines, network reactors, and AI agent architectures with automated rubric reviews and code verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl border border-hairline bg-card flex items-center gap-2 text-xs font-mono">
            <Hammer className="w-3.5 h-3.5 text-primary" />
            <span className="text-foreground font-semibold">3 Tracks Available</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Project Catalog Selector */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground px-1 mb-2">
            Selected Projects
          </div>
          {SAMPLE_PROJECTS.map((proj) => {
            const isSelected = proj.id === selectedProject.id
            const pCount = proj.milestones.filter((m) => m.completed).length
            const pct = Math.round((pCount / proj.milestones.length) * 100)

            return (
              <button
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? "border-primary/40 bg-card shadow-xs"
                    : "border-hairline bg-card/50 hover:bg-card hover:border-foreground/20"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-primary font-semibold uppercase">
                    {proj.category}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    +{proj.xpReward} XP
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-foreground line-clamp-1">
                  {proj.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                  {proj.summary}
                </p>

                {/* Progress bar */}
                <div className="mt-3 space-y-1">
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                    <span>Milestones</span>
                    <span>{pCount}/{proj.milestones.length} ({pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Right Column: Active Project Studio */}
        <div className="lg:col-span-8 rounded-2xl border border-hairline bg-card p-5 sm:p-6 space-y-6">
          {/* Project Title & Badges */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {selectedProject.difficulty}
              </span>
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                ~{selectedProject.estimatedHours} Hours
              </span>
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                +{selectedProject.xpReward} XP
              </span>
              <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ml-auto ${
                selectedProject.reviewStatus === "Passed"
                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                  : selectedProject.reviewStatus === "Submitted"
                  ? "bg-blue-500/10 text-blue-600 border border-blue-500/20"
                  : "bg-secondary text-muted-foreground"
              }`}>
                Status: {selectedProject.reviewStatus}
              </span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
              {selectedProject.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {selectedProject.brief}
            </p>
          </div>

          {/* Architecture Blueprint Section */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span>Target System Architecture</span>
            </div>
            <div className="p-4 rounded-xl bg-background border border-hairline font-mono text-xs text-muted-foreground space-y-2">
              {selectedProject.architecture.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <span className="text-primary font-bold">{idx + 1}.</span>
                  <span className="text-foreground/90">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Milestone Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-foreground font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>Execution Milestones ({completedCount}/{selectedProject.milestones.length})</span>
              </div>
              <span className="text-xs font-mono text-primary font-semibold">{progressPercent}% Completed</span>
            </div>

            <div className="space-y-2">
              {selectedProject.milestones.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleMilestoneToggle(m.id)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                    m.completed
                      ? "border-emerald-500/30 bg-emerald-500/5 text-foreground"
                      : "border-hairline bg-background hover:border-foreground/20 text-muted-foreground"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={m.completed}
                    onChange={() => {}}
                    className="mt-1 h-4 w-4 rounded accent-primary cursor-pointer"
                  />
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs font-semibold ${m.completed ? "text-foreground line-through opacity-80" : "text-foreground"}`}>
                      {m.title}
                    </div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {m.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Demonstrated Matrix */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
              Demonstrated Competencies
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedProject.skillsDemonstrated.map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 rounded-md bg-secondary text-[11px] font-mono text-foreground font-medium border border-hairline"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Submission / Git Repository Action */}
          <div className="pt-4 border-t border-hairline space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {selectedProject.repoStarterUrl && (
                <a
                  href={selectedProject.repoStarterUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>Clone Starter Template Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <form onSubmit={handleProjectSubmit} className="space-y-3">
              <label className="block text-xs font-medium text-foreground">
                Submit GitHub Repository URL for Code Review:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="url"
                  placeholder="https://github.com/username/project-repo"
                  value={submissionUrl}
                  onChange={(e) => setSubmissionUrl(e.target.value)}
                  className="flex-1 bg-background border border-hairline rounded-lg px-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !submissionUrl}
                  className="px-5 py-2 rounded-lg bg-primary hover:bg-primary-hover text-primary-foreground text-xs font-semibold transition-all disabled:opacity-50 cursor-pointer shrink-0"
                >
                  {isSubmitting ? "Submitting..." : "Submit for Verification"}
                </button>
              </div>
              {submissionSuccess && (
                <p className="text-xs text-emerald-600 font-mono mt-1">
                  ✓ Repository submitted! Automated unit assertions and mentor rubric review are running.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
