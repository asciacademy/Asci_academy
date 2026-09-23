"use client"

import Link from "next/link"
import { ArrowRight, Clock, BookOpen, Layers, Terminal, Cpu, Server, Globe } from "lucide-react"

interface PreviewCourse {
  slug: string
  title: string
  category: string
  desc: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string
  lessons: number
  icon: typeof Terminal
  tag: string
}

const COURSES: PreviewCourse[] = [
  {
    slug: "python",
    title: "Python for Engineers & Automation",
    category: "Data & Systems",
    desc: "CPython internals, idiomatic data structures, asyncio event loops, and microservices.",
    level: "Beginner",
    duration: "8 Weeks",
    lessons: 48,
    icon: Terminal,
    tag: "Python 3.12",
  },
  {
    slug: "cpp",
    title: "C++ Systems Programming & Memory",
    category: "High Performance",
    desc: "Pointers, virtual memory, RAII, move semantics, and low-latency system design.",
    level: "Intermediate",
    duration: "10 Weeks",
    lessons: 54,
    icon: Cpu,
    tag: "C++20",
  },
  {
    slug: "webdev",
    title: "Modern Full-Stack Web Architecture",
    category: "Web Development",
    desc: "HTML, CSS, React 19, Next.js Server Components, PostgreSQL, and cloud deployments.",
    level: "Beginner",
    duration: "12 Weeks",
    lessons: 62,
    icon: Globe,
    tag: "Next.js 15",
  },
  {
    slug: "java",
    title: "Enterprise Java & Spring Microservices",
    category: "Backend Systems",
    desc: "JVM memory model, multithreading, Spring Boot 3, Hibernate ORM, and Kafka messaging.",
    level: "Intermediate",
    duration: "10 Weeks",
    lessons: 50,
    icon: Server,
    tag: "Spring Boot",
  },
  {
    slug: "c",
    title: "C Systems & Memory Fundamentals",
    category: "Systems Core",
    desc: "Manual memory allocation, stack vs heap, structs, pointers, and POSIX syscalls.",
    level: "Beginner",
    duration: "6 Weeks",
    lessons: 36,
    icon: Terminal,
    tag: "Core Systems",
  },
  {
    slug: "javascript",
    title: "Modern JavaScript (ES2024) In-Depth",
    category: "Web Interactivity",
    desc: "Event loop, closures, prototypes, asynchronous pipelines, and browser runtime APIs.",
    level: "Beginner",
    duration: "6 Weeks",
    lessons: 40,
    icon: Layers,
    tag: "ES2024",
  },
]

export function CourseCatalogPreview() {
  return (
    <section className="py-14 sm:py-20 border-b border-border/60 bg-secondary/20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold uppercase tracking-wider text-primary mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span>Engineering Curricula</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-foreground tracking-tight">
              Featured Courses
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-xl">
              Clean, practical courses with live sandboxes, real-world coding exercises, and zero setup friction.
            </p>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-primary hover:text-primary-active transition-colors shrink-0"
          >
            <span>Explore all courses</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {COURSES.map((course) => {
            const Icon = course.icon
            return (
              <div
                key={course.slug}
                className="group rounded-2xl border border-border/80 bg-card p-5 hover:border-primary/40 transition-all duration-200 hover:shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon, Category & Level */}
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <span className="text-[11px] font-mono font-medium text-muted-foreground">
                        {course.category}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-secondary text-muted-foreground border border-border/60">
                      {course.level}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors tracking-tight">
                    {course.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                    {course.desc}
                  </p>

                  {/* Meta Chips */}
                  <div className="flex items-center gap-3 mt-4 text-[11px] font-mono text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{course.duration}</span>
                    </div>
                    <span>·</span>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{course.lessons} lessons</span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="pt-4 mt-4 border-t border-border/60 flex items-center gap-2.5">
                  <Link
                    href={`/programs/${course.slug}`}
                    className="flex-1 py-2 px-3 rounded-xl bg-secondary hover:bg-secondary/80 border border-border/80 text-xs font-medium text-foreground text-center transition-colors cursor-pointer"
                  >
                    View Syllabus
                  </Link>
                  <Link
                    href={`/programs/${course.slug}/course`}
                    className="flex-1 py-2 px-3 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-semibold text-center transition-colors cursor-pointer shadow-2xs"
                  >
                    Start Learning
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
