"use client"

import React from "react"
import Link from "next/link"
import { ArrowRight, Clock, Layers, Sparkles } from "lucide-react"
import { BrandIcon } from "@/components/ui/brand-icon"

const PROJECTS_DATA = [
  {
    id: "proj-job-portal",
    slug: "build-a-job-portal",
    title: "Job Portal Platform",
    category: "Full-Stack",
    difficulty: "Intermediate",
    technologies: ["react", "nodejs", "postgresql"],
    techLabels: "React · Node · PostgreSQL",
    duration: "4–6 hours",
    description: "Multi-tenant career engine with resume parsing, role filtering, and application pipelines.",
    href: "/projects/distributed-key-value-store",
  },
  {
    id: "proj-raft-kv",
    slug: "distributed-key-value-store",
    title: "Distributed Key-Value Store",
    category: "Systems",
    difficulty: "Advanced",
    technologies: ["go", "docker"],
    techLabels: "Go · Docker · Raft",
    duration: "18–20 hours",
    description: "Linearizable distributed storage engine with consensus leader election and log replication.",
    href: "/projects/distributed-key-value-store",
  },
  {
    id: "proj-ai-agent",
    slug: "autonomous-ai-code-reviewer",
    title: "Autonomous AI Code Reviewer",
    category: "AI & Tools",
    difficulty: "Intermediate",
    technologies: ["python", "openai", "github"],
    techLabels: "Python · LLM · GitHub API",
    duration: "6–8 hours",
    description: "Automated PR triage bot analyzing AST complexity, test coverage, and security vulnerabilities.",
    href: "/projects",
  },
]

export function ProjectsRail() {
  return (
    <section aria-labelledby="projects-heading" className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-border/70 pb-3">
        <div>
          <h2
            id="projects-heading"
            className="font-serif text-2xl sm:text-[28px] font-normal tracking-tight text-foreground"
          >
            Build something real.
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Turn what you learn into demonstrable proof that employers and teams want to see.
          </p>
        </div>
        <Link
          href="/projects"
          className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
        >
          <span>All 12+ Capstones</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROJECTS_DATA.map((proj) => (
          <div
            key={proj.id}
            className="group flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:bg-secondary/30 transition-all shadow-xs"
          >
            <div className="space-y-3.5">
              {/* Top Row: Tech Logos + Difficulty Pill */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center -space-x-1.5">
                  {proj.technologies.map((tech) => (
                    <div
                      key={tech}
                      className="w-8 h-8 rounded-lg bg-secondary border border-border flex items-center justify-center shadow-xs"
                    >
                      <BrandIcon name={tech} size={16} />
                    </div>
                  ))}
                </div>

                <span
                  className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    proj.difficulty === "Advanced"
                      ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                      : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
                  }`}
                >
                  {proj.difficulty}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-semibold text-base font-sans text-foreground group-hover:text-primary transition-colors">
                  {proj.title}
                </h3>
                <div className="text-xs font-mono text-primary font-semibold mt-1">
                  {proj.techLabels}
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">
                  {proj.description}
                </p>
              </div>
            </div>

            {/* Bottom Meta & CTA */}
            <div className="mt-4 pt-3 border-t border-border/70 flex items-center justify-between">
              <span className="text-xs font-mono text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                {proj.duration}
              </span>

              <Link
                href={proj.href}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-semibold transition-all shadow-xs active:scale-[0.98] cursor-pointer"
              >
                <span>Start Project</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
