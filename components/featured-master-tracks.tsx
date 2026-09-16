"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  Globe,
  Terminal,
  Cpu,
  Code2,
  Layout,
  Palette,
  Zap,
  ArrowRight,
  PlayCircle,
  CheckCircle2,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react"
import { TechLogo } from "@/components/tech-logo"

interface FeaturedCourse {
  id: string
  title: string
  category: "Web Development" | "Systems & Languages"
  badge: string
  tag: string
  interactiveBadge: string
  desc: string
  icon: typeof Globe
  features: string[]
  courseUrl: string
  overviewUrl: string
}

const FEATURED_COURSES: FeaturedCourse[] = [
  {
    id: "webdev",
    title: "Web Development Master Track",
    category: "Web Development",
    badge: "Full Stack Frontend",
    tag: "HTML • CSS • JS",
    interactiveBadge: "Live Split-Pane Preview",
    desc: "The complete 3-pillar path to building modern websites. Learn HTML structure, CSS styling, and JavaScript interactivity with live in-browser preview.",
    icon: Globe,
    features: [
      "Live split-pane browser preview to see your code instantly",
      "CSS3 Box Model, Flexbox, and modern responsive Grid",
      "Modern JavaScript variables, arrow functions, and DOM events",
    ],
    courseUrl: "/programs/webdev/course",
    overviewUrl: "/programs/webdev",
  },
  {
    id: "python",
    title: "Complete Python Course",
    category: "Systems & Languages",
    badge: "Data & APIs",
    tag: "FastAPI & AI",
    interactiveBadge: "Instant Python Sandbox",
    desc: "Learn modern Python from scratch. Build web APIs, automate daily tasks, and write clean, fast code with step-by-step guidance.",
    icon: Terminal,
    features: [
      "Visual step-by-step execution diagrams for Python logic",
      "Interactive guides for lists, dictionaries, and functions",
      "Build fast web APIs with FastAPI and automated projects",
    ],
    courseUrl: "/programs/python/course",
    overviewUrl: "/programs/python",
  },
  {
    id: "c",
    title: "C Programming Masterclass",
    category: "Systems & Languages",
    badge: "Foundational Systems",
    tag: "Hardware & Memory",
    interactiveBadge: "In-Browser C Compiler",
    desc: "Understand how computers really work under the hood. Master C syntax, memory addresses, pointers, and functions with zero confusing jargon.",
    icon: Terminal,
    features: [
      "Step-by-step W3Schools-style simple syntax lessons",
      "Interactive memory address (&) and pointer (*) visualizer",
      "In-browser code runner with instant terminal output",
    ],
    courseUrl: "/programs/c/course",
    overviewUrl: "/programs/c",
  },
  {
    id: "javascript",
    title: "Modern JavaScript (ES6+)",
    category: "Web Development",
    badge: "Interactivity",
    tag: "Web Logic",
    interactiveBadge: "Live DOM Sandbox",
    desc: "Bring web pages to life with modern ES6+ JavaScript: arrow functions, array operations, DOM events, and async data fetching.",
    icon: Zap,
    features: [
      "Modern ES6+ syntax made easy for complete beginners",
      "Click events and dynamic screen updates without page reloads",
      "Array methods like map, filter, and modern async/await",
    ],
    courseUrl: "/programs/javascript/course",
    overviewUrl: "/programs/javascript",
  },
  {
    id: "react",
    title: "React 19 & Next.js",
    category: "Web Development",
    badge: "Full Stack UI",
    tag: "Components & RSC",
    interactiveBadge: "Live Component Runner",
    desc: "The industry standard for building modern web applications. Master declarative UI components, reactive hooks, and Next.js App Router.",
    icon: Globe,
    features: [
      "Declarative component architecture & JSX breakdown",
      "useState, useEffect, and custom hooks lifecycle",
      "React Server Components (RSC) vs Client Components",
    ],
    courseUrl: "/programs/react/course",
    overviewUrl: "/programs/react",
  },
  {
    id: "java",
    title: "Complete Java Course",
    category: "Systems & Languages",
    badge: "Enterprise Backend",
    tag: "Spring Boot & Cloud",
    interactiveBadge: "JVM Memory Visualizer",
    desc: "Learn Java from fundamental variables and OOP to enterprise backend microservices with Spring Boot and JVM memory management.",
    icon: Code2,
    features: [
      "Visual diagrams explaining how Java executes in the JVM",
      "Interactive memory visualizers for stack and heap variables",
      "Build real-world banking and web backend microservices",
    ],
    courseUrl: "/programs/java/course",
    overviewUrl: "/programs/java",
  },
  {
    id: "cpp",
    title: "C++ Systems & OOP",
    category: "Systems & Languages",
    badge: "High Performance",
    tag: "Games & Engines",
    interactiveBadge: "Interactive C++ Runner",
    desc: "The language powering game engines and operating systems. Master modern C++, references (&), classes, constructors, and OOP.",
    icon: Cpu,
    features: [
      "Modern C++ streams (cout & cin) and string manipulation",
      "Pass-by-reference vs pass-by-value speed comparison",
      "Object-Oriented Programming: classes, objects, inheritance",
    ],
    courseUrl: "/programs/cpp/course",
    overviewUrl: "/programs/cpp",
  },
  {
    id: "html",
    title: "HTML5 Web Structure",
    category: "Web Development",
    badge: "Web Skeleton",
    tag: "Semantic HTML",
    interactiveBadge: "Live HTML5 Preview",
    desc: "The starting point for every web developer. Master document skeletons, headings, paragraphs, links, images, tables, and accessible forms.",
    icon: Layout,
    features: [
      "W3Schools-style simple explanations of every HTML tag",
      "Accessible form design with input fields and buttons",
      "Live in-browser preview rendering without setup",
    ],
    courseUrl: "/programs/html/course",
    overviewUrl: "/programs/html",
  },
  {
    id: "css",
    title: "CSS3 Styling & Flexbox",
    category: "Web Development",
    badge: "Web Styling",
    tag: "Box Model & Layouts",
    interactiveBadge: "Live Box-Model Sandbox",
    desc: "Turn plain HTML into beautiful, modern web interfaces. Master colors, typography, the CSS Box Model, and responsive Flexbox.",
    icon: Palette,
    features: [
      "Visual Box Model breakdown: Margin, Border, Padding, Content",
      "Modern Flexbox alignment made simple",
      "Responsive styling for mobile and desktop screens",
    ],
    courseUrl: "/programs/css/course",
    overviewUrl: "/programs/css",
  },
  {
    id: "typescript",
    title: "TypeScript Architecture",
    category: "Systems & Languages",
    badge: "Static Typing",
    tag: "Type Safety",
    interactiveBadge: "Live Type-Checking Compiler",
    desc: "Master TypeScript static typing, interfaces, discriminated unions, and generic utility types. Eliminate runtime bugs in large codebases.",
    icon: Code2,
    features: [
      "Type inference, primitive types, and function contracts",
      "Discriminated unions for state machine management",
      "Reusable type-safe APIs using Generics (<T>)",
    ],
    courseUrl: "/programs/typescript/course",
    overviewUrl: "/programs/typescript",
  },
  {
    id: "sql",
    title: "SQL & Relational Databases",
    category: "Systems & Languages",
    badge: "Database Systems",
    tag: "Relational Queries",
    interactiveBadge: "Simulated SQL Terminal",
    desc: "Store and query mission-critical data. Master SELECT queries, multi-table JOINs, B-Tree indexes, and ACID transaction concurrency.",
    icon: Terminal,
    features: [
      "Intuitive query breakdowns with Venn diagram visualizations",
      "Multi-table INNER and LEFT JOIN operations",
      "B-Tree index optimization and execution plans",
    ],
    courseUrl: "/programs/sql/course",
    overviewUrl: "/programs/sql",
  },
  {
    id: "git",
    title: "Git, Docker & DevOps",
    category: "Systems & Languages",
    badge: "DevOps Infrastructure",
    tag: "Containers & CI/CD",
    interactiveBadge: "Visual Git Commit Graph",
    desc: "Master version control and cloud deployments. Learn Git commit DAGs, branching strategies, multi-stage Docker builds, and CI/CD pipelines.",
    icon: Terminal,
    features: [
      "Visual commit graph topologies and branching strategies",
      "Resolving merge conflicts and pull request reviews",
      "Lightweight multi-stage production Docker containerization",
    ],
    courseUrl: "/programs/git/course",
    overviewUrl: "/programs/git",
  },
]

const DEFAULT_VISIBLE_LIMIT = 6

export function FeaturedMasterTracks() {
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Web Development" | "Systems & Languages"
  >("All")
  const [isExpanded, setIsExpanded] = useState(false)

  // Filter courses by category
  const filteredCourses = useMemo(() => {
    return selectedFilter === "All"
      ? FEATURED_COURSES
      : FEATURED_COURSES.filter((c) => c.category === selectedFilter)
  }, [selectedFilter])

  // Reset expansion state when changing category
  const handleFilterChange = (tab: "All" | "Web Development" | "Systems & Languages") => {
    setSelectedFilter(tab)
    setIsExpanded(false)
  }

  // Determine courses to display (curated 6 items by default, cut off scrolling trap)
  const displayedCourses = useMemo(() => {
    if (isExpanded || filteredCourses.length <= DEFAULT_VISIBLE_LIMIT) {
      return filteredCourses
    }
    return filteredCourses.slice(0, DEFAULT_VISIBLE_LIMIT)
  }, [filteredCourses, isExpanded])

  const hasMoreToToggle = filteredCourses.length > DEFAULT_VISIBLE_LIMIT
  const remainingCount = filteredCourses.length - DEFAULT_VISIBLE_LIMIT

  const handleCollapse = () => {
    setIsExpanded(false)
    const el = document.getElementById("interactive-courses")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      All: FEATURED_COURSES.length,
      "Web Development": FEATURED_COURSES.filter((c) => c.category === "Web Development").length,
      "Systems & Languages": FEATURED_COURSES.filter((c) => c.category === "Systems & Languages").length,
    }
  }, [])

  return (
    <section id="interactive-courses" className="relative py-12 sm:py-16 lg:py-20 border-b border-border/60 bg-background/50 scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-[11px] font-mono font-medium text-primary uppercase tracking-widest mb-3.5 backdrop-blur-xs shadow-xs">
              <Terminal className="h-3.5 w-3.5" />
              <span>Interactive Programming &amp; Web Courses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-normal tracking-tight leading-tight">
              Learn Coding &amp; Web Development, the simple way
            </h2>
            <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Step-by-step courses inspired by W3Schools' clarity. Practice with in-browser code runners, live HTML/CSS previews, and friendly quizzes.
            </p>
          </div>

          {/* Category Filter Tabs with Counts (Horizontal scrollable on mobile) */}
          <div className="flex overflow-x-auto no-scrollbar max-w-full -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="inline-flex items-center gap-1.5 rounded-2xl border border-hairline bg-secondary/80 p-1.5 backdrop-blur-md shadow-xs shrink-0 text-xs font-mono">
              {(["All", "Web Development", "Systems & Languages"] as const).map((tab) => {
                const isActive = selectedFilter === tab
                const count = categoryCounts[tab]
                return (
                  <button
                    key={tab}
                    onClick={() => handleFilterChange(tab)}
                    className={`inline-flex items-center gap-2 rounded-xl px-3.5 py-1.5 transition-all cursor-pointer ${
                      isActive
                        ? "bg-card text-foreground border border-hairline shadow-xs font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-card/40"
                    }`}
                  >
                    <span>{tab}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-mono leading-none ${
                        isActive
                          ? "bg-primary/20 text-primary font-bold"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Course Cards Grid: Uniform, Clean, Scannable */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {displayedCourses.map((course) => (
            <div
              key={course.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-hairline dark:border-white/[0.08] bg-card/95 dark:bg-[#181715]/95 p-4 sm:p-6 transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs"
            >
              <div>
                {/* Top Header: TechLogo + Badge + Tag */}
                <div className="flex items-center justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-hairline bg-secondary/80 p-1.5 shadow-xs group-hover:scale-105 group-hover:border-primary/50 transition-all duration-200">
                      <TechLogo slug={course.id} className="h-6 w-6 object-contain" />
                    </div>
                    <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-semibold text-primary uppercase tracking-wider">
                      {course.badge}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-muted-foreground border border-hairline rounded-md px-2 py-0.5 bg-secondary/60">
                    {course.tag}
                  </span>
                </div>

                {/* Title & Description */}
                <Link href={course.courseUrl} className="group-hover:text-primary transition-colors">
                  <h3 className="font-serif text-lg sm:text-xl font-medium text-foreground tracking-tight leading-snug">
                    {course.title}
                  </h3>
                </Link>
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                  {course.desc}
                </p>

                {/* Interactive Capability Pill */}
                <div className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg border border-hairline bg-secondary/60 px-2.5 py-1 text-[11px] font-mono text-foreground/85">
                  <Sparkles className="h-3 w-3 text-primary" />
                  <span>{course.interactiveBadge}</span>
                </div>

                {/* 2 Key Feature Highlights (Clean & Essential Only) */}
                <div className="mt-3.5 space-y-1.5 pt-3 border-t border-hairline/60">
                  {course.features.slice(0, 2).map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-foreground/85">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
                      <span className="leading-snug line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-3.5 border-t border-hairline/60 flex items-center justify-between gap-3">
                <Link
                  href={course.courseUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary-active transition-all cursor-pointer"
                >
                  <PlayCircle className="h-3.5 w-3.5" />
                  <span>Start Learning</span>
                </Link>
                <Link
                  href={course.overviewUrl}
                  className="inline-flex items-center justify-center gap-1 rounded-xl border border-hairline bg-secondary/50 hover:bg-secondary px-3 py-2 text-xs font-medium text-foreground transition-all cursor-pointer"
                >
                  <span>Syllabus</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Cut off Scrolling: Expand / Collapse Toggle Button */}
        {hasMoreToToggle && (
          <div className="mt-8 flex justify-center">
            {isExpanded ? (
              <button
                onClick={handleCollapse}
                className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-card hover:bg-secondary px-5 py-2.5 text-xs font-mono font-medium text-foreground transition-all cursor-pointer shadow-2xs"
              >
                <span>Show fewer courses (collapse to {DEFAULT_VISIBLE_LIMIT})</span>
                <ChevronUp className="h-3.5 w-3.5 text-primary" />
              </button>
            ) : (
              <button
                onClick={() => setIsExpanded(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-hairline bg-card hover:bg-secondary px-5 py-2.5 text-xs font-mono font-medium text-foreground transition-all cursor-pointer shadow-2xs"
              >
                <span>Show all {filteredCourses.length} interactive courses ({remainingCount} more tracks)</span>
                <ChevronDown className="h-3.5 w-3.5 text-primary" />
              </button>
            )}
          </div>
        )}

        {/* Bottom Academic Catalog Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl border border-hairline bg-card/60 dark:bg-[#181715]/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Need complete university specializations &amp; verified certificates?
              </h4>
              <p className="text-xs text-muted-foreground">
                Explore all 47 engineering tracks, DSA challenge sheets, and full academic roadmaps.
              </p>
            </div>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-background hover:bg-secondary px-5 py-2 text-xs font-medium text-foreground transition-all cursor-pointer shrink-0 shadow-2xs"
          >
            <span>Explore All Programs</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
