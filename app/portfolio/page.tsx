import type { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AxelStage } from "@/components/axel/axel-stage"
import {
  FolderGit2,
  ExternalLink,
  Award,
  Globe,
  Terminal,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Code2,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Student Projects & Public Portfolios | ASCI",
  description:
    "Explore verified production systems, open-source repositories, and public scholar portfolios engineered by ASCI learners.",
}

const FEATURED_PROJECTS = [
  {
    title: "ApexKV — Distributed Raft-Consensus KV Store",
    author: "Mokshagna Theja",
    handle: "masteraccess72",
    tag: "Systems Architecture",
    description:
      "A distributed key-value storage engine in Go implementing the Raft consensus protocol with leader election, log replication, and snapshotting.",
    stack: ["Go", "Raft", "gRPC", "Docker"],
    stars: "142",
    demoUrl: "/portfolio/masteraccess72",
  },
  {
    title: "SpectraQuery — Vector Search & RAG Pipeline",
    author: "Sarah Chen",
    handle: "sarahc",
    tag: "AI & Data Systems",
    description:
      "Enterprise document embedding and semantic retrieval platform using hybrid vector-keyword scoring and sub-15ms indexing.",
    stack: ["Python", "FastAPI", "Postgres (pgvector)", "Next.js"],
    stars: "98",
    demoUrl: "/portfolio/sarahc",
  },
  {
    title: "AetherPay — Resilient Event-Driven Settlement Engine",
    author: "Marcus Vance",
    handle: "marcusv",
    tag: "Fintech Microservices",
    description:
      "Idempotent transaction processing pipeline with transactional outbox, Kafka message queue, and automated reconciliation audit trails.",
    stack: ["Java", "Spring Boot", "Kafka", "PostgreSQL"],
    stars: "115",
    demoUrl: "/portfolio/marcusv",
  },
  {
    title: "AuraFS — High-Performance In-Memory File System",
    author: "Aarav Patel",
    handle: "aaravp",
    tag: "Operating Systems",
    description:
      "User-space filesystem implementation featuring LRU block caching, inode hierarchy, and POSIX-compliant file operations.",
    stack: ["C++", "POSIX", "CMake", "Linux"],
    stars: "87",
    demoUrl: "/portfolio/aaravp",
  },
  {
    title: "NexusFlow — Real-Time Collaborative Canvas",
    author: "Elena Rostova",
    handle: "elenar",
    tag: "Full-Stack Web",
    description:
      "Infinite collaborative canvas with CRDT conflict-free replication, WebSockets, and zero-lag spatial partitioning.",
    stack: ["TypeScript", "Next.js", "WebSockets", "Tailwind CSS"],
    stars: "164",
    demoUrl: "/portfolio/elenar",
  },
  {
    title: "BytePulse — Linux Kernel eBPF Network Monitor",
    author: "Devon Brooks",
    handle: "devonb",
    tag: "Cloud Native & eBPF",
    description:
      "Low-overhead packet filtering and TCP latency tracking agent utilizing Linux eBPF ring buffers and real-time Prometheus exporters.",
    stack: ["Rust", "eBPF", "Prometheus", "Grafana"],
    stars: "132",
    demoUrl: "/portfolio/devonb",
  },
]

export default function PortfolioDirectoryPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      <Navbar />
      <div className="h-[68px]" />

      {/* Hero Header */}
      <section id="portfolio-dir-hero" className="py-16 lg:py-24 px-6 border-b border-border scroll-mt-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-3xl text-center lg:text-left space-y-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                Student Engineering Showcase
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground tracking-tight">
                Real Software Built by ASCI Scholars
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                Explore production systems, distributed databases, algorithmic engines, and public scholar portfolios built during the curriculum.
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/profile"
                  className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary-active transition-all flex items-center gap-2"
                >
                  Manage Your Portfolio <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/results"
                  className="px-6 py-3 rounded-xl border border-border bg-card text-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-all flex items-center gap-2"
                >
                  View Career Outcomes
                </Link>
              </div>
            </div>

            <AxelStage
              id="portfolio-dir-hero-robot-anchor"
              sectionId="portfolio-dir-hero"
              label="Student Portfolios"
              emotion="proud"
              scale={0.5}
            />
          </div>
        </div>
      </section>

      {/* Featured Projects Bento Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 border-b border-border/50 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-primary">Featured Engineering</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">Verified Student Capstones</h2>
          </div>
          <p className="text-xs text-muted-foreground max-w-md">
            Every project undergoes rigorous mentor review, unit and integration testing, and live cloud deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURED_PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-hairline bg-card p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-md transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-secondary text-primary border border-hairline">
                    {proj.tag}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground font-mono">
                    <Award className="w-3.5 h-3.5 text-primary" />
                    <span>Top 1%</span>
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-xl font-normal text-foreground group-hover:text-primary transition-colors">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-2 line-clamp-3">
                    {proj.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {proj.stack.map((tech, tidx) => (
                    <span
                      key={tidx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-background border border-hairline text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-hairline mt-6 flex items-center justify-between">
                <div>
                  <div className="text-xs font-medium text-foreground">{proj.author}</div>
                  <div className="text-[11px] text-muted-foreground font-mono">@{proj.handle}</div>
                </div>
                <Link
                  href={proj.demoUrl}
                  className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-primary hover:underline"
                >
                  <span>View Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Callout Section */}
      <section className="px-6 py-16 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl border border-hairline bg-card p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs font-mono uppercase tracking-widest text-primary">Public Scholar Profiles</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground">
              Turn Your Code into a Verified Public Portfolio
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Every ASCI member receives an official academic portfolio handle showing completed curriculum tracks, daily problem solving streaks, and cryptographic graduation credentials.
            </p>
            <div className="pt-2">
              <Link
                href="/profile"
                className="btn-primary inline-flex items-center gap-2 text-xs font-mono px-5 py-2.5 rounded-xl"
              >
                <span>Customize Your Portfolio Handle</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
