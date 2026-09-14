"use client"

import { useState } from "react"
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
} from "lucide-react"
import { TechLogo } from "@/components/tech-logo"
import { AsciIcon, Asci3DIcon } from "@/components/icons"

interface FeaturedCourse {
  id: string
  title: string
  category: "Web Development" | "Systems & Languages"
  badge: string
  tag: string
  desc: string
  icon: typeof Globe
  features: string[]
  courseUrl: string
  overviewUrl: string
  isFeatured?: boolean
}

const FEATURED_COURSES: FeaturedCourse[] = [
  {
    id: "webdev",
    title: "Web Development Master Track",
    category: "Web Development",
    badge: "Full Stack Frontend",
    tag: "HTML • CSS • JS",
    desc: "The complete 3-pillar path to building modern websites. Learn HTML structure, CSS styling & Flexbox, and JavaScript interactivity with live in-browser preview.",
    icon: Globe,
    isFeatured: true,
    features: [
      "Live split-pane browser preview to see your code instantly",
      "HTML5 semantic layout, forms, and accessibility rules",
      "CSS3 colors, the Box Model, Flexbox, and responsive Grid",
      "Modern JavaScript variables, arrow functions, and DOM clicks",
    ],
    courseUrl: "/programs/webdev/course",
    overviewUrl: "/programs/webdev",
  },
  {
    id: "c",
    title: "C Programming Masterclass",
    category: "Systems & Languages",
    badge: "Foundational Systems",
    tag: "Hardware & Memory",
    desc: "Understand how computers really work under the hood. Master C syntax, memory addresses, pointers, and functions with zero confusing jargon.",
    icon: Terminal,
    features: [
      "Step-by-step W3Schools-style simple syntax lessons",
      "In-browser code runner with instant terminal output",
      "Interactive memory address (&) and pointer (*) visualizer",
      "Practice quizzes with immediate answer feedback",
    ],
    courseUrl: "/programs/c/course",
    overviewUrl: "/programs/c",
  },
  {
    id: "cpp",
    title: "C++ Systems & OOP",
    category: "Systems & Languages",
    badge: "High Performance",
    tag: "Games & Engines",
    desc: "The language powering game engines and operating systems. Master modern C++, references (&), classes, constructors, and Object-Oriented Programming.",
    icon: Cpu,
    features: [
      "Modern C++ streams (cout & cin) and string manipulation",
      "Pass-by-reference vs pass-by-value speed comparison",
      "Object-Oriented Programming: classes, objects, inheritance",
      "Zero installation needed—runs directly in the browser",
    ],
    courseUrl: "/programs/cpp/course",
    overviewUrl: "/programs/cpp",
  },
  {
    id: "javascript",
    title: "Modern JavaScript (ES6+)",
    category: "Web Development",
    badge: "Interactivity",
    tag: "Web Logic",
    desc: "Bring web pages to life with JavaScript variables (let & const), arrow functions, events, arrays, and live DOM manipulation.",
    icon: Zap,
    features: [
      "Modern ES6+ syntax made easy for complete beginners",
      "Click events and dynamic screen updates without page reloads",
      "Array methods like map, filter, and array loops",
      "Live interactive button tests right inside the player",
    ],
    courseUrl: "/programs/javascript/course",
    overviewUrl: "/programs/javascript",
  },
  {
    id: "java",
    title: "Complete Java Course",
    category: "Systems & Languages",
    badge: "Enterprise Backend",
    tag: "Spring Boot & Cloud",
    desc: "Learn Java from basic variables to enterprise backend systems with Spring Boot, unit testing, and memory management.",
    icon: Code2,
    features: [
      "Visual diagrams explaining how Java runs code in the JVM",
      "Interactive memory visualizers for stack and heap variables",
      "Over 24 structured chapters and hands-on coding challenges",
      "Build real-world banking and web backend microservices",
    ],
    courseUrl: "/programs/java/course",
    overviewUrl: "/programs/java",
  },
  {
    id: "python",
    title: "Complete Python Course",
    category: "Systems & Languages",
    badge: "Data & APIs",
    tag: "FastAPI & AI",
    desc: "Learn modern Python from scratch. Build web APIs, automate daily tasks, and write clean, fast code with step-by-step guidance.",
    icon: Terminal,
    features: [
      "Visual step-by-step execution diagrams for Python logic",
      "Interactive guides for lists, dictionaries, and functions",
      "24 practice modules and placement challenge quizzes",
      "Build fast web APIs with FastAPI and automated projects",
    ],
    courseUrl: "/programs/python/course",
    overviewUrl: "/programs/python",
  },
  {
    id: "html",
    title: "HTML5 Web Structure",
    category: "Web Development",
    badge: "Web Skeleton",
    tag: "Semantic HTML",
    desc: "The starting point for every web developer. Master document skeletons, headings, paragraphs, links, images, tables, and forms.",
    icon: Layout,
    features: [
      "W3Schools-style simple explanations of every HTML tag",
      "Live in-browser preview rendering",
      "Accessible form design with input fields and buttons",
      "1-click Copy button and interactive check quizzes",
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
    desc: "Turn plain HTML into beautiful, modern web interfaces. Master colors, typography, the CSS Box Model, and responsive Flexbox.",
    icon: Palette,
    features: [
      "Visual Box Model breakdown: Margin, Border, Padding, Content",
      "Modern Flexbox alignment made simple",
      "Responsive styling for mobile and desktop screens",
      "Live styling sandbox with immediate visual preview",
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
    desc: "Master modern TypeScript static typing, interfaces, discriminated unions, and utility types. Eliminate runtime bugs in large enterprise codebases.",
    icon: Code2,
    features: [
      "Type inference, primitive types, and function contracts",
      "Discriminated unions for state machine management",
      "Reusable type-safe APIs using Generics (<T>)",
      "In-browser interactive compiler with live type-checking",
    ],
    courseUrl: "/programs/typescript/course",
    overviewUrl: "/programs/typescript",
  },
  {
    id: "react",
    title: "React 19 & Next.js",
    category: "Web Development",
    badge: "Full Stack UI",
    tag: "Components & RSC",
    desc: "The industry standard for building modern web applications. Master declarative UI components, reactive useState hooks, and Next.js App Router Server Components.",
    icon: Globe,
    isFeatured: true,
    features: [
      "Declarative component architecture & JSX breakdown",
      "useState, useEffect, and custom hooks lifecycle",
      "React Server Components (RSC) vs Client Components",
      "Interactive live component rendering right inside player",
    ],
    courseUrl: "/programs/react/course",
    overviewUrl: "/programs/react",
  },
  {
    id: "sql",
    title: "SQL & Relational Databases",
    category: "Systems & Languages",
    badge: "Database Systems",
    tag: "Relational Queries",
    desc: "Store and query mission-critical data. Master SELECT queries, multi-table JOINs, B-Tree indexes, and ACID transaction concurrency.",
    icon: Terminal,
    features: [
      "Intuitive query breakdowns with Venn diagram visualizations",
      "Multi-table INNER and LEFT JOIN operations",
      "B-Tree index optimization and execution plans",
      "Simulated interactive SQL terminal execution",
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
    desc: "Master version control and cloud deployments. Learn Git commit DAGs, branching strategies, multi-stage Docker builds, and automated CI/CD pipelines.",
    icon: Terminal,
    features: [
      "Visual commit graph topologies and branching strategies",
      "Resolving merge conflicts and pull request reviews",
      "Lightweight multi-stage production Docker containerization",
      "Automated testing and continuous delivery workflows",
    ],
    courseUrl: "/programs/git/course",
    overviewUrl: "/programs/git",
  },
]


export function FeaturedMasterTracks() {
  const [selectedFilter, setSelectedFilter] = useState<
    "All" | "Web Development" | "Systems & Languages"
  >("All")

  const filteredCourses =
    selectedFilter === "All"
      ? FEATURED_COURSES
      : FEATURED_COURSES.filter((c) => c.category === selectedFilter)

  return (
    <section className="relative py-14 sm:py-20 border-b border-border/60 bg-background/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-3 shadow-2xs">
              <Terminal className="h-3 w-3" />
              <span>Interactive Programming &amp; Web Courses</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              Learn Coding &amp; Web Development, the simple way
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              Step-by-step courses inspired by W3Schools' clarity. Practice with in-browser code runners, live HTML/CSS previews, and friendly quizzes.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="inline-flex rounded-xl border border-border/80 p-1 bg-card/80 self-start md:self-auto text-xs font-mono">
            {(["All", "Web Development", "Systems & Languages"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedFilter === tab
                    ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const IconComponent = course.icon
            return (
              <div
                key={course.id}
                className={`group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-card/70 dark:bg-[#181715] p-6 transition-all duration-300 hover:border-primary/40 shadow-xs hover:shadow-md hover:-translate-y-0.5 ${
                  course.isFeatured ? "md:col-span-2 lg:col-span-2 border-primary/30" : ""
                }`}
              >
                <div>
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-[10px] font-mono font-semibold text-primary uppercase tracking-wider">
                        {course.badge}
                      </span>
                      <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-mono text-muted-foreground border border-border/60">
                        {course.tag}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      {course.isFeatured && (
                        <div className="hidden sm:flex items-center justify-center">
                          <Asci3DIcon name="webdev" size={42} className="opacity-95" />
                        </div>
                      )}
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-border/80 bg-secondary/80 p-2 shadow-xs group-hover:scale-105 group-hover:border-primary/50 group-hover:bg-card transition-all duration-200">
                        <TechLogo slug={course.id} className="h-7 w-7 object-contain" />
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-serif text-xl sm:text-2xl font-medium text-foreground tracking-tight group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {course.desc}
                  </p>

                  {/* Features List */}
                  <div className="mt-5 space-y-2 pt-4 border-t border-border/60">
                    {course.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="flex items-start gap-2 text-xs text-foreground/90"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-3">
                  <Link
                    href={course.courseUrl}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary-active transition-all cursor-pointer"
                  >
                    <PlayCircle className="h-3.5 w-3.5" />
                    <span>Start Learning</span>
                  </Link>
                  <Link
                    href={course.overviewUrl}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-border/80 bg-secondary px-3.5 py-2 text-xs font-medium text-foreground hover:bg-card transition-all cursor-pointer"
                  >
                    <span>Syllabus</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 p-6 rounded-2xl border border-border/80 bg-card/60 dark:bg-[#181715] flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-foreground">
                Looking for more topics and data structures?
              </h4>
              <p className="text-xs text-muted-foreground">
                Explore our full catalog of over 25+ software engineering and algorithms tracks.
              </p>
            </div>
          </div>
          <Link
            href="/programs"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-background hover:bg-secondary px-5 py-2 text-xs font-medium text-foreground transition-all cursor-pointer shrink-0"
          >
            <span>Explore All 25+ Courses</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </section>
  )
}
