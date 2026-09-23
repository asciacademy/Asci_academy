"use client"

import Link from "next/link"
import { ArrowRight, CheckCircle2, Clock, Code2, FolderGit2, BookOpen } from "lucide-react"

interface PathStep {
  name: string
}

interface CareerPath {
  id: string
  title: string
  badge: string
  level: string
  desc: string
  duration: string
  skillsCount: number
  coursesCount: number
  projectsCount: number
  steps: PathStep[]
  href: string
}

const PATHS: CareerPath[] = [
  {
    id: "ai-engineer",
    title: "AI & Machine Learning Engineer",
    badge: "AI Systems",
    level: "Beginner → Advanced",
    desc: "Master mathematical foundations, PyTorch models, LLM fine-tuning, RAG retrieval architectures, and production agent deployment.",
    duration: "24 Weeks",
    skillsCount: 16,
    coursesCount: 5,
    projectsCount: 4,
    steps: [
      { name: "Python 3.12" },
      { name: "NumPy & Tensors" },
      { name: "Deep Learning" },
      { name: "Transformers" },
      { name: "Vector RAG" },
      { name: "Autonomous Agents" },
      { name: "Production Serving" },
    ],
    href: "/programs/python",
  },
  {
    id: "web-engineer",
    title: "Full-Stack Web Software Engineer",
    badge: "Full-Stack",
    level: "Beginner → Advanced",
    desc: "Build scalable web applications from semantic foundations through React 19, Next.js Server Components, PostgreSQL, and distributed caching.",
    duration: "20 Weeks",
    skillsCount: 14,
    coursesCount: 4,
    projectsCount: 5,
    steps: [
      { name: "HTML & CSS" },
      { name: "TypeScript" },
      { name: "React 19" },
      { name: "Next.js App Router" },
      { name: "PostgreSQL & Prisma" },
      { name: "WebSockets & Queues" },
      { name: "Cloud Deployment" },
    ],
    href: "/programs/react",
  },
  {
    id: "software-engineer",
    title: "Core Software & Systems Engineer",
    badge: "Systems & DSA",
    level: "Intermediate → Advanced",
    desc: "Algorithmic mastery with the 474-problem DSA sheet, low-level C++, OS kernel mechanics, database engines, and high-scale system design.",
    duration: "28 Weeks",
    skillsCount: 18,
    coursesCount: 6,
    projectsCount: 4,
    steps: [
      { name: "C / C++20" },
      { name: "DSA 474 Sheet" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "Database Internals" },
      { name: "System Design" },
      { name: "Technical Interview Prep" },
    ],
    href: "/programs/cpp",
  },
]

export function LearningPathsSection() {
  return (
    <section className="py-14 sm:py-20 border-b border-border/60 bg-background">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Structured Progression</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground tracking-tight">
              Career Learning Paths
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              End-to-end curriculums mapping exactly what to learn in order, with checkpoints, code reviews, and capstone projects.
            </p>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-active transition-colors shrink-0"
          >
            <span>View all tracks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {PATHS.map((path) => (
            <div
              key={path.id}
              className="rounded-2xl border border-border/80 bg-card p-6 flex flex-col justify-between hover:border-primary/40 transition-all duration-200 hover:shadow-sm"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-mono font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-md">
                    {path.badge}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {path.level}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-foreground tracking-tight">
                  {path.title}
                </h3>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {path.desc}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-4 my-4 border-y border-border/60 text-center font-mono text-xs">
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Duration</span>
                    <strong className="text-foreground font-semibold">{path.duration}</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Courses</span>
                    <strong className="text-foreground font-semibold">{path.coursesCount} Courses</strong>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-[10px] block">Projects</span>
                    <strong className="text-foreground font-semibold">{path.projectsCount} Builds</strong>
                  </div>
                </div>

                {/* Stepped Progression Badges */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block font-semibold">
                    Curriculum Sequence:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {path.steps.map((step, idx) => (
                      <span
                        key={step.name}
                        className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-secondary border border-border/60 text-foreground"
                      >
                        <span className="text-muted-foreground text-[9px]">{idx + 1}.</span>
                        <span>{step.name}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <Link
                href={path.href}
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold transition-all cursor-pointer text-center shadow-xs"
              >
                <span>Enroll in Pathway</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
