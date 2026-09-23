"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScrollReveal } from "@/hooks/use-gsap"
import {
  Compass, CheckCircle2, Clock,
  Braces, Code2, Globe, Cloud,
  Database, Server, Cpu, BrainCircuit,
  Layout, Smartphone, Blocks, Layers,
  ArrowRight, Sparkles, FolderGit2, TerminalSquare
} from "lucide-react"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

const roadmaps = {
  software: {
    id: "software",
    name: "Software Engineering",
    effort: "24 Weeks · 12-15 hrs/wk",
    difficulty: "Beginner to Advanced",
    outcomes: "Design, build, test, and ship complete software systems with enterprise architecture standards.",
    projects: "Distributed Key-Value Cache, Real-Time Collaboration Canvas, Microservices API Gateway",
    skills: ["TypeScript", "Python", "Data Structures", "System Design", "CI/CD GitOps", "Testing"],
    description: "A comprehensive engineering pathway from programming foundations to enterprise system design and production deployments.",
    phases: [
      {
        phase: "Phase 1", title: "Computing Fundamentals & Clean Code", weeks: "Weeks 1-4",
        topics: ["Memory models, pointers, and memory layout", "Clean architecture & SOLID design principles", "Version control workflows, trunk-based development", "Unit testing & automated assertion suites"],
        icon: Code2
      },
      {
        phase: "Phase 2", title: "Data Structures & Algorithmic Patterns", weeks: "Weeks 5-10",
        topics: ["Asymptotic complexity & Big-O optimization", "Trees, red-black structures, and heaps", "Dynamic programming & graph traversal", "Sliding window and two-pointer paradigms"],
        icon: Braces
      },
      {
        phase: "Phase 3", title: "Full-Stack System Architecture", weeks: "Weeks 11-18",
        topics: ["High-concurrency backend services", "Relational database schema normalization", "Modern reactive UI architecture (React 19 / Next.js)", "REST & gRPC service interfaces"],
        icon: Globe
      },
      {
        phase: "Phase 4", title: "Distributed Scalability & Reliability", weeks: "Weeks 19-24",
        topics: ["Database sharding, replication, and consensus", "Cache-aside and write-through patterns with Redis", "Fault-tolerant queue processing with Kafka", "Production post-mortems and site reliability"],
        icon: Layers
      }
    ]
  },
  ai: {
    id: "ai",
    name: "AI Engineering",
    effort: "20 Weeks · 15 hrs/wk",
    difficulty: "Intermediate to Advanced",
    outcomes: "Architect autonomous agent swarms, vector retrieval systems, and fine-tuned neural models.",
    projects: "Multi-Agent Code Review Swarm, Enterprise RAG Pipeline, Vision & Audio Multimodal Assistant",
    skills: ["PyTorch", "LLM APIs", "LangChain/LangGraph", "Vector DBs", "RAG Systems", "Evaluation"],
    description: "From modern Python to building production-ready autonomous agent swarms, vector indexing, and neural reasoning pipelines.",
    phases: [
      {
        phase: "Phase 1", title: "Python for AI & Matrix Operations", weeks: "Weeks 1-4",
        topics: ["Vectorized computation with NumPy & Pandas", "Tensor manipulation and gradient graphs", "FastAPI endpoints for inference serving", "Data sanitization and embedding pipelines"],
        icon: Code2
      },
      {
        phase: "Phase 2", title: "Neural Networks & Foundation Models", weeks: "Weeks 5-10",
        topics: ["Transformer self-attention architecture", "Fine-tuning with LoRA & QLoRA", "Context window tokenization mechanics", "Embedding space clustering and cosine metrics"],
        icon: BrainCircuit
      },
      {
        phase: "Phase 3", title: "RAG & Knowledge Retrieval Systems", weeks: "Weeks 11-16",
        topics: ["Hybrid dense/sparse vector search", "Recursive chunking and semantic re-ranking", "Document ingestion & metadata filtering", "RAG evaluation with Ragas metrics"],
        icon: Cpu
      },
      {
        phase: "Phase 4", title: "Autonomous Agent Swarms & Tool Use", weeks: "Weeks 17-20",
        topics: ["ReAct loop planning and self-correction", "Tool-calling APIs with JSON schema validation", "Hierarchical multi-agent delegation swarms", "Sandboxed execution and prompt safety guardrails"],
        icon: Layers
      }
    ]
  },
  backend: {
    id: "backend",
    name: "Backend Engineering",
    effort: "22 Weeks · 12 hrs/wk",
    difficulty: "Intermediate",
    outcomes: "Construct high-throughput microservices, robust relational databases, and low-latency APIs.",
    projects: "Financial Ledger Engine, Multi-Tenant SaaS Backend, Distributed Task Scheduler",
    skills: ["Java Spring Boot", "Go", "PostgreSQL", "Kafka", "Docker", "OAuth2 / Security"],
    description: "Learn to build resilient server architectures, concurrent message pipelines, and ACID-compliant transactional backends.",
    phases: [
      {
        phase: "Phase 1", title: "Server Foundations & Concurrency", weeks: "Weeks 1-5",
        topics: ["JVM memory architecture & GC tuning", "Thread pools, locks, and atomic operations", "Go goroutines, channels, and select patterns", "TCP/HTTP connection keep-alive lifecycles"],
        icon: Server
      },
      {
        phase: "Phase 2", title: "Relational Storage & Index Tuning", weeks: "Weeks 6-11",
        topics: ["B-Tree indexing and query plan analysis (EXPLAIN ANALYZE)", "ACID transaction isolation levels (MVCC)", "Database migrations and connection pooling", "Write-heavy audit log schemas"],
        icon: Database
      },
      {
        phase: "Phase 3", title: "Distributed Microservices & Queues", weeks: "Weeks 12-17",
        topics: ["Event-driven architectures with Apache Kafka", "Saga pattern for distributed transactions", "Idempotent API endpoint design", "Circuit breakers & rate limiters with Redis"],
        icon: Blocks
      },
      {
        phase: "Phase 4", title: "Containerization, Observability & Cloud", weeks: "Weeks 18-22",
        topics: ["Docker container optimization & security hardening", "OpenTelemetry distributed tracing with Jaeger", "Prometheus metrics & Grafana alert dashboards", "Zero-downtime blue/green deployment strategies"],
        icon: Cloud
      }
    ]
  },
  systems: {
    id: "systems",
    name: "Systems Engineering",
    effort: "26 Weeks · 15 hrs/wk",
    difficulty: "Advanced",
    outcomes: "Master low-level OS interfaces, memory allocators, zero-copy networking, and kernel event loops.",
    projects: "Zero-Copy HTTP Server, User-Space Memory Allocator, LSM-Tree Storage Engine",
    skills: ["C", "C++20", "Rust", "Linux Kernel / epoll", "Assembly Basics", "Perf Profiling"],
    description: "Deep-dive systems programming covering manual memory management, POSIX syscalls, and high-performance network runtimes.",
    phases: [
      {
        phase: "Phase 1", title: "Low-Level C & Memory Internals", weeks: "Weeks 1-6",
        topics: ["Pointer arithmetic, stack vs heap layout", "Manual memory management & Valgrind profiling", "Data alignment, cache lines, and struct padding", "Bitwise protocols and binary file parsing"],
        icon: Cpu
      },
      {
        phase: "Phase 2", title: "Modern C++20 & Systems Rust", weeks: "Weeks 7-13",
        topics: ["RAII, smart pointers, and move semantics", "Rust ownership, lifetimes, and borrow checker", "Zero-cost abstractions and templates/generics", "SIMD vectorization and cache locality"],
        icon: Code2
      },
      {
        phase: "Phase 3", title: "Linux Syscalls & Asynchronous I/O", weeks: "Weeks 14-19",
        topics: ["Non-blocking sockets with epoll / io_uring", "Zero-copy splice & sendfile data transfer", "Process fork, exec, signals, and shared memory", "Virtual memory mapping with mmap"],
        icon: Server
      },
      {
        phase: "Phase 4", title: "Storage Engines & Distributed Consensus", weeks: "Weeks 20-26",
        topics: ["LSM-tree write-ahead logging (WAL)", "SSTable block indexing with Bloom filters", "Raft consensus election and log replication", "High-frequency benchmarking under contention"],
        icon: Layers
      }
    ]
  },
  frontend: {
    id: "frontend",
    name: "Frontend Engineering",
    effort: "18 Weeks · 10-12 hrs/wk",
    difficulty: "Beginner to Intermediate",
    outcomes: "Engineer fluid, accessible, and ultra-fast web user interfaces with modern React and TypeScript.",
    projects: "Component Design System, High-Density Analytics Dashboard, Markdown & Code Editor",
    skills: ["React 19", "Next.js App Router", "TypeScript", "Tailwind CSS v4", "WCAG AA", "Web Vitals"],
    description: "Master modern user interface engineering, design systems, animation mechanics, and sub-second web performance.",
    phases: [
      {
        phase: "Phase 1", title: "Semantic Web & Design Systems", weeks: "Weeks 1-4",
        topics: ["Semantic HTML5 and WCAG AA accessibility", "Tailwind CSS v4 design token architectures", "Responsive fluid layouts across mobile & desktop", "Stateful components and clean TypeScript props"],
        icon: Layout
      },
      {
        phase: "Phase 2", title: "React 19 & Server Components", weeks: "Weeks 5-9",
        topics: ["Server Components vs Client Components boundaries", "Streaming with Suspense and optimistic UI updates", "Custom hooks & performant re-render controls", "Server Actions and secure form handling"],
        icon: Code2
      },
      {
        phase: "Phase 3", title: "Motion & Micro-Interactions", weeks: "Weeks 10-14",
        topics: ["Spring-physics animations with Framer Motion", "Layout animation and gesture drag interactions", "Virtual lists for 10,000+ item performance", "Accessible keyboard navigation and focus rings"],
        icon: Smartphone
      },
      {
        phase: "Phase 4", title: "Performance Profiling & Next.js Scale", weeks: "Weeks 15-18",
        topics: ["Core Web Vitals (LCP, INP, CLS) optimization", "Bundle splitting and dynamic component imports", "Image/font optimization pipelines", "End-to-end component testing with Playwright"],
        icon: Cloud
      }
    ]
  },
  algorithms: {
    id: "algorithms",
    name: "Data & Algorithms",
    effort: "20 Weeks · 12-14 hrs/wk",
    difficulty: "Intermediate to Advanced",
    outcomes: "Solve complex computational problems with mathematical rigor and excel in technical interview rounds.",
    projects: "Graph Routing Visualizer, Compression Utility (Huffman), LeetCode Top 150 Master Suite",
    skills: ["Dynamic Programming", "Graph Algorithms", "Tree Recursion", "Bit Manipulation", "Greedy Logic"],
    description: "Master computational thinking, algorithmic efficiency, mathematical proofs, and competitive problem-solving patterns.",
    phases: [
      {
        phase: "Phase 1", title: "Linear Structures & Two Pointers", weeks: "Weeks 1-4",
        topics: ["Arrays, matrices, and amortized resizing", "Two-pointer convergence and sliding window", "Prefix sums and difference arrays", "Monotonic stacks and queues"],
        icon: Braces
      },
      {
        phase: "Phase 2", title: "Trees, Tries & Priority Queues", weeks: "Weeks 5-9",
        topics: ["Binary search trees and tree traversals", "Trie prefix indexing for autocomplete", "Binary heap construction and heap sort", "Lowest common ancestor and diameter algorithms"],
        icon: Code2
      },
      {
        phase: "Phase 3", title: "Graphs, Shortest Paths & Flows", weeks: "Weeks 10-14",
        topics: ["BFS / DFS connected components and bipartite checks", "Dijkstra, Bellman-Ford, and Floyd-Warshall", "Topological sorting and cycle detection (Tarjan)", "Minimum spanning trees (Kruskal / Prim)"],
        icon: Globe
      },
      {
        phase: "Phase 4", title: "Dynamic Programming & Advanced Paradigms", weeks: "Weeks 15-20",
        topics: ["1D & 2D memoization vs tabulation", "Knapsack variants and subset sum optimizations", "Bitmask dynamic programming and digit DP", "Segment trees with lazy propagation"],
        icon: Layers
      }
    ]
  }
}

type RoadmapKey = keyof typeof roadmaps

function getTrackIcon(key: RoadmapKey) {
  switch (key) {
    case "software":
      return Code2
    case "ai":
      return BrainCircuit
    case "backend":
      return Server
    case "systems":
      return Cpu
    case "frontend":
      return Layout
    case "algorithms":
      return Braces
    default:
      return TerminalSquare
  }
}

export function LearningPaths() {
  const [activeTab, setActiveTab] = useState<RoadmapKey>("software")
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 })
  const timelineRef = useRef<HTMLDivElement>(null)

  const activeRoadmap = roadmaps[activeTab]
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (!timelineRef.current) return
    const cards = timelineRef.current.querySelectorAll(".path-card")

    const ctx = gsap.context(() => {
      if (hasAnimated) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.06, ease: "power2.out" }
        )
      } else {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.5, ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 85%", toggleActions: "play none none none" },
            }
          )
        })
        setHasAnimated(true)
      }
    }, timelineRef)

    return () => ctx.revert()
  }, [activeTab, hasAnimated])

  const handleTabChange = (key: RoadmapKey) => {
    if (key === activeTab) return
    setActiveTab(key)
  }

  return (
    <section id="learning-paths" className="relative py-20 lg:py-28 bg-background overflow-hidden">
      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        {/* Header with Dedicated Axel Stage */}
        <div ref={headerRef} className="relative mb-10 sm:mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-4 backdrop-blur-xs shadow-xs">
              <Compass className="h-3.5 w-3.5" />
              <span className="tracking-widest uppercase font-mono text-[11px]">Engineering Curriculum Roadmaps</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-foreground leading-[1.1]">
              Step-by-Step Learning Roadmaps
            </h2>
            <p className="mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {activeRoadmap.description}
            </p>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
          <div className="hidden lg:flex relative shrink-0 w-64 h-48 items-center justify-center self-center lg:self-auto">
            <div
              id="learning-paths-robot-anchor"
              data-axel-anchor="true"
              data-section-id="learning-paths"
              data-emotion="thinking"
              data-scale="0.95"
              data-label="Engineering Roadmaps"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Track Switcher Bar — Sleek segmented pill container */}
        <div className="flex sm:justify-center mb-10 overflow-x-auto no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-hairline bg-card/80 dark:bg-card/40 backdrop-blur-md p-1.5 shadow-2xs pr-4 sm:pr-1.5">
            {(Object.keys(roadmaps) as RoadmapKey[]).map((key) => {
              const roadmap = roadmaps[key]
              const isActive = activeTab === key
              const Icon = getTrackIcon(key)
              return (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  suppressHydrationWarning
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap ${
                    isActive
                      ? "bg-foreground text-background font-semibold shadow-xs"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-background" : "text-primary"}`} />
                  <span>{roadmap.name}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Executive Blueprint Overview Bento */}
        <div className="relative mb-12 rounded-3xl border border-hairline dark:border-white/10 bg-card/80 dark:bg-black/80 backdrop-blur-xl p-6 sm:p-8 lg:p-10 shadow-xs">
          {/* Top Metadata Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-hairline/80">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-3 py-1 text-xs font-mono font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                {activeRoadmap.difficulty}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary border border-hairline px-3 py-1 text-xs font-mono text-muted-foreground">
                <Clock className="h-3 w-3 text-primary" />
                {activeRoadmap.effort}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>4 Phased Progression Milestones • 100% Hands-On Capstones</span>
            </div>
          </div>

          {/* Middle 2-Column Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
            {/* Left Column: Target Outcome & Capstones */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-primary font-semibold block mb-2">
                  Target Engineering Outcome
                </span>
                <p className="text-base sm:text-lg font-serif text-foreground leading-snug">
                  &ldquo;{activeRoadmap.outcomes}&rdquo;
                </p>
              </div>

              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold block mb-2.5 flex items-center gap-1.5">
                  <FolderGit2 className="h-3.5 w-3.5 text-primary" />
                  Featured Capstone Projects
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeRoadmap.projects.split(", ").map((proj) => (
                    <span
                      key={proj}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-secondary/80 px-3 py-1.5 text-xs text-foreground font-medium"
                    >
                      <Code2 className="h-3 w-3 text-muted-foreground" />
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Skills & Direct Action */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:border-l lg:border-hairline/80 lg:pl-8">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-muted-foreground font-semibold block mb-2.5">
                  Core Technologies &amp; Standards
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeRoadmap.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-lg border border-hairline bg-secondary/60 hover:bg-secondary px-2.5 py-1 text-xs font-mono text-foreground transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Direct Action Buttons */}
              <div className="pt-4 border-t border-hairline/60 flex flex-wrap items-center gap-3">
                <Link
                  href="/programs"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs sm:text-sm font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all cursor-pointer group"
                >
                  <span>Explore Track Roadmaps</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-hairline bg-secondary/80 hover:bg-secondary px-4 py-2.5 text-xs sm:text-sm font-medium text-foreground transition-all cursor-pointer"
                >
                  <span>Browse Syllabus</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Progressive Milestone Cards */}
        <div ref={timelineRef} className="relative">
          {/* Connecting Track Line for wide viewports */}
          <div
            className="hidden lg:block absolute top-12 left-8 right-8 h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 pointer-events-none -z-0"
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 relative z-10">
            {activeRoadmap.phases.map((path, i) => {
              const IconComp = path.icon
              return (
                <div
                  key={path.phase}
                  className="path-card group relative flex flex-col justify-between rounded-3xl border border-hairline dark:border-white/10 bg-card/90 dark:bg-black/90 p-6 transition-all duration-300 hover:border-primary/40 hover:-translate-y-1 shadow-xs"
                >
                  {/* Top: Phase Number & Duration Pill */}
                  <div>
                    <div className="flex items-center justify-between gap-2 pb-4 mb-4 border-b border-hairline/60">
                      <div className="inline-flex items-center gap-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 font-mono text-xs font-bold text-primary">
                          0{i + 1}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-semibold">
                          {path.phase}
                        </span>
                      </div>
                      <div className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-mono text-muted-foreground border border-hairline">
                        <Clock className="h-3 w-3 text-primary" />
                        <span>{path.weeks}</span>
                      </div>
                    </div>

                    {/* Phase Title & Domain Icon */}
                    <div className="flex items-start gap-3 mb-5">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-hairline bg-secondary/80 text-primary transition-all group-hover:scale-105 group-hover:bg-primary/10 group-hover:border-primary/30">
                        <IconComp className="h-5 w-5" />
                      </div>
                      <h3 className="font-serif text-base sm:text-lg font-medium text-foreground leading-snug">
                        {path.title}
                      </h3>
                    </div>

                    {/* Topics Checklist */}
                    <div className="space-y-2.5">
                      {path.topics.map((topic) => (
                        <div
                          key={topic}
                          className="flex items-start gap-2.5 text-xs text-muted-foreground group-hover:text-foreground/90 transition-colors"
                        >
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                          <span className="leading-relaxed">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom: Milestone Indicator */}
                  <div className="mt-6 pt-4 border-t border-hairline/60 flex items-center justify-between text-[11px] font-mono text-muted-foreground">
                    <span className="text-primary font-medium">Milestone 0{i + 1}</span>
                    <span className="text-muted-foreground/80">Verified Outcome</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
