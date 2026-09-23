"use client"

import Link from "next/link"
import { ArrowRight, Clock, FolderGit2, CheckCircle2, Terminal, ExternalLink } from "lucide-react"

interface ProjectItem {
  id: string
  title: string
  tag: string
  desc: string
  skills: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
  estimatedHours: string
  type: "Portfolio" | "Distributed System" | "AI System" | "Full-Stack"
  href: string
}

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "realtime-chat",
    title: "Real-Time Collaborative Chat & Presence",
    tag: "Full-Stack Web",
    desc: "Bi-directional WebSocket engine with distributed Redis pub/sub, message persistence, and presence tracking.",
    skills: ["React 19", "Node.js", "WebSockets", "Redis", "PostgreSQL"],
    difficulty: "Intermediate",
    estimatedHours: "12–15 hours",
    type: "Full-Stack",
    href: "/projects",
  },
  {
    id: "apex-kv",
    title: "ApexKV — Distributed Raft Consensus Engine",
    tag: "Systems Architecture",
    desc: "Fault-tolerant key-value cluster in Go implementing the Raft protocol with leader election and log replication.",
    skills: ["Go", "Raft Protocol", "gRPC", "Docker"],
    difficulty: "Advanced",
    estimatedHours: "24–30 hours",
    type: "Distributed System",
    href: "/projects",
  },
  {
    id: "spectra-query",
    title: "SpectraQuery — Hybrid Vector RAG Engine",
    tag: "AI & Search",
    desc: "Sub-15ms semantic search with pgvector, BM25 keyword re-ranking, and chunking pipelines for technical docs.",
    skills: ["Python", "FastAPI", "PostgreSQL", "Next.js"],
    difficulty: "Intermediate",
    estimatedHours: "16–20 hours",
    type: "AI System",
    href: "/projects",
  },
  {
    id: "aurafs",
    title: "AuraFS — High-Performance In-Memory File System",
    tag: "Operating Systems",
    desc: "POSIX-compliant user-space filesystem featuring LRU block caching, inode hierarchy, and concurrency locks.",
    skills: ["C++20", "POSIX", "CMake", "Linux"],
    difficulty: "Advanced",
    estimatedHours: "20–25 hours",
    type: "Portfolio",
    href: "/projects",
  },
]

export function ProjectsPreviewSection() {
  return (
    <section className="py-14 sm:py-20 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Portfolio-Grade Systems</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground tracking-tight">
              Build Real Things
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              Projects that become the centerpiece of your engineering portfolio. Architecture you can confidently explain in senior technical interviews.
            </p>
          </div>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-active transition-colors shrink-0"
          >
            <span>View all engineering projects</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {FEATURED_PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="group rounded-2xl border border-border/80 bg-card p-6 hover:border-primary/40 transition-all duration-200 hover:shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold bg-primary/10 px-2.5 py-0.5 rounded-md">
                    {proj.tag}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold ${
                      proj.difficulty === "Beginner"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                        : proj.difficulty === "Intermediate"
                        ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {proj.difficulty}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">
                  {proj.desc}
                </p>

                {/* Skills Chips */}
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {proj.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border/60 text-muted-foreground"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1.5 mt-4 text-xs font-mono text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Estimated: {proj.estimatedHours}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-5 mt-5 border-t border-border/60 flex items-center gap-3">
                <Link
                  href="/projects"
                  className="flex-1 py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-xs font-medium text-foreground text-center transition-colors cursor-pointer"
                >
                  View Blueprint
                </Link>
                <Link
                  href="/projects"
                  className="flex-1 py-2 px-3 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold text-center transition-colors cursor-pointer shadow-2xs"
                >
                  Start Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
