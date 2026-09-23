"use client"

import Link from "next/link"
import {
  Code2,
  Globe,
  Brain,
  Binary,
  Server,
  Layers,
  FolderGit2,
  Briefcase,
  ArrowRight,
} from "lucide-react"

interface GoalItem {
  title: string
  desc: string
  href: string
  icon: typeof Code2
  tag: string
}

const GOALS: GoalItem[] = [
  {
    title: "Learn to Code",
    desc: "Syntax, variables, control flow and foundational logic in Python and C.",
    href: "/courses?level=Beginner",
    icon: Code2,
    tag: "Foundations",
  },
  {
    title: "Become a Web Developer",
    desc: "HTML, CSS, modern JavaScript, React 19, and full-stack Next.js applications.",
    href: "/programs/react",
    icon: Globe,
    tag: "Frontend & Full-Stack",
  },
  {
    title: "Become an AI Engineer",
    desc: "Python, PyTorch, LLM architectures, RAG pipelines, and agent deployment.",
    href: "/programs/python",
    icon: Brain,
    tag: "AI & Data Systems",
  },
  {
    title: "Master DSA",
    desc: "474 curated problems with step-by-step visual proofs and test runner.",
    href: "/dsa",
    icon: Binary,
    tag: "474 Problems",
  },
  {
    title: "Learn Backend Engineering",
    desc: "REST APIs, microservices, PostgreSQL, Kafka event queues, and Docker.",
    href: "/programs/java",
    icon: Server,
    tag: "APIs & Databases",
  },
  {
    title: "Learn System Design",
    desc: "Distributed consensus, caching, load balancing, and high-throughput systems.",
    href: "/programs/cpp",
    icon: Layers,
    tag: "Distributed Systems",
  },
  {
    title: "Build Real Projects",
    desc: "Production-grade portfolio projects with architectures you can talk about in interviews.",
    href: "/projects",
    icon: FolderGit2,
    tag: "Portfolio Builds",
  },
  {
    title: "Prepare for Interviews",
    desc: "Mock technical interviews, ATS resume scanner, and active job/internship listings.",
    href: "/career",
    icon: Briefcase,
    tag: "Career Tools",
  },
]

export function ExploreByGoal() {
  return (
    <section className="py-14 sm:py-20 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Intent-Driven Learning</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground tracking-tight">
              Explore by Goal
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              Choose your engineering destination. Follow guided paths designed around career outcomes instead of guessing what to learn next.
            </p>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-active transition-colors shrink-0"
          >
            <span>View all career paths</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {GOALS.map((goal) => {
            const Icon = goal.icon
            return (
              <Link
                key={goal.title}
                href={goal.href}
                className="group relative rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/50 transition-all duration-200 hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-secondary border border-border/80 flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground bg-secondary px-2 py-0.5 rounded-md">
                      {goal.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {goal.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                    {goal.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                  <span>Start learning path</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
