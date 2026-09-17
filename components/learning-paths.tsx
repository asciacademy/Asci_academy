"use client"

import { useRef, useEffect, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useScrollReveal } from "@/hooks/use-gsap"
import {
  Route, CheckCircle2, Clock,
  Braces, Code2, Globe, Cloud,
  Database, Server, Cpu, BrainCircuit,
  Layout, Smartphone, Blocks, Layers,
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
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.08, ease: "power2.out" }
        )
      } else {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0, opacity: 1, duration: 0.6, ease: "power2.out",
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
    <section id="learning-paths" className="relative py-20 lg:py-28 bg-background">
      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-8">
        {/* Header with Dedicated Axel Stage */}
        <div ref={headerRef} className="relative mb-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-medium mb-3">
              <Route className="h-3.5 w-3.5" />
              <span>Learning Roadmaps</span>
            </div>
            <h2 className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl" style={{ letterSpacing: "-1px" }}>
              Step-by-Step Learning Roadmaps
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-body leading-relaxed">
              {activeRoadmap.description}
            </p>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
          <div className="hidden lg:flex relative shrink-0 w-64 h-56 items-center justify-center self-center lg:self-auto">
            <div
              id="learning-paths-robot-anchor"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Tab Selector — Category tabs */}
        <div className="flex justify-center mb-16 relative z-20">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-lg border border-hairline bg-secondary p-1">
            {(Object.keys(roadmaps) as RoadmapKey[]).map((key) => {
              const roadmap = roadmaps[key]
              const isActive = activeTab === key
              return (
                <button
                  key={key}
                  onClick={() => handleTabChange(key)}
                  suppressHydrationWarning
                  className={`rounded-md px-4 py-2 text-xs font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-card text-foreground shadow-xs border border-hairline"
                      : "text-muted-foreground hover:text-foreground bg-transparent"
                  }`}
                >
                  {roadmap.name}
                </button>
              )
            })}
          </div>
        </div>

        {/* Pathway Metadata Overview Banner */}
        <div className="max-w-5xl mx-auto mb-12 p-6 rounded-2xl border border-hairline bg-card/80 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                {activeRoadmap.difficulty}
              </span>
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {activeRoadmap.effort}
              </span>
            </div>
            <div className="text-xs font-mono text-muted-foreground">
              4 Phased Progression Milestones
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-mono uppercase tracking-wider text-muted-foreground text-[10px] font-semibold block mb-1">
                Target Engineering Outcome
              </span>
              <p className="text-foreground leading-relaxed">
                {activeRoadmap.outcomes}
              </p>
            </div>
            <div>
              <span className="font-mono uppercase tracking-wider text-muted-foreground text-[10px] font-semibold block mb-1">
                Featured Capstone Projects
              </span>
              <p className="text-foreground leading-relaxed">
                {activeRoadmap.projects}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-hairline/40 flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mr-1">
              Skills:
            </span>
            {activeRoadmap.skills.map((skill) => (
              <span
                key={skill}
                className="px-2 py-0.5 rounded bg-secondary text-[11px] font-mono text-foreground border border-hairline"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mt-8 max-w-6xl mx-auto">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-hairline lg:block" aria-hidden="true" />

          <div className="flex flex-col gap-8 lg:gap-12">
            {activeRoadmap.phases.map((path, i) => {
              const isLeft = i % 2 === 0
              const IconComp = path.icon
              return (
                <div key={path.phase} className="path-card relative">
                  {/* Dot on center line */}
                  <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block z-10" aria-hidden="true">
                    <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                  </div>

                  <div className={`flex lg:w-1/2 ${isLeft ? "lg:pr-12" : "lg:ml-auto lg:pl-12"}`}>
                    <div className="group flex w-full flex-col overflow-hidden rounded-2xl border border-hairline dark:border-white/[0.08] bg-card/90 dark:bg-[#181715]/90 transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs">
                      {/* Header */}
                      <div className="flex items-center gap-3 border-b border-hairline/60 px-6 py-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-hairline bg-secondary text-primary transition-all group-hover:scale-105 group-hover:border-foreground/20">
                          <IconComp className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground truncate">
                            {path.phase}
                          </p>
                          <h3 className="font-serif text-base font-normal text-foreground truncate">
                            {path.title}
                          </h3>
                        </div>
                        <div className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground border border-hairline">
                          <Clock className="h-3 w-3 text-primary" />
                          <span>{path.weeks}</span>
                        </div>
                      </div>

                      {/* Topics */}
                      <div className="flex flex-col gap-2.5 p-6">
                        {path.topics.map((topic) => (
                          <div key={topic} className="flex items-center gap-2.5 text-xs text-body">
                            <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
