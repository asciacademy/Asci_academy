"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Courses } from "@/components/courses"
import { Footer } from "@/components/footer"
import { AxelStage } from "@/components/axel/axel-stage"
import { TechLogo } from "@/components/tech-logo"
import { PlayCircle, ArrowRight, BookOpen, Code2, Plus, Loader2 } from "lucide-react"
import { WishlistButton } from "@/components/courses/wishlist-button"
import { useEnrollments } from "@/lib/user-learning-store"
import { enrollInCourse } from "@/app/actions/courses"

const CORE_COURSES = [
  {
    id: "c",
    title: "C Programming",
    category: "Systems & Memory",
    tag: "Pointers & Memory",
    desc: "Syntax, variables, pointers (*), and memory addresses (&) explained simply.",
    playerUrl: "/programs/c/course",
    overviewUrl: "/programs/c",
    level: "Beginner",
    duration: "6 Weeks",
  },
  {
    id: "cpp",
    title: "C++ Systems & OOP",
    category: "High Performance",
    tag: "Games & Engines",
    desc: "Modern C++, cout/cin, references (&), classes, constructors, and inheritance.",
    playerUrl: "/programs/cpp/course",
    overviewUrl: "/programs/cpp",
    level: "Beginner",
    duration: "8 Weeks",
  },
  {
    id: "webdev",
    title: "Web Development Master Track",
    category: "Full Stack Frontend",
    tag: "HTML • CSS • JS",
    desc: "Complete 3-pillar path with live split-pane browser preview sandbox.",
    playerUrl: "/programs/webdev/course",
    overviewUrl: "/programs/webdev",
    level: "Beginner",
    duration: "12 Weeks",
  },
  {
    id: "html",
    title: "HTML5 Web Structure",
    category: "Web Fundamentals",
    tag: "Skeleton & Forms",
    desc: "W3Schools-style lessons on document skeleton, semantic tags, and forms.",
    playerUrl: "/programs/html/course",
    overviewUrl: "/programs/html",
    level: "Beginner",
    duration: "4 Weeks",
  },
  {
    id: "css",
    title: "CSS3 Styling & Flexbox",
    category: "Web Styling",
    tag: "Box Model & Grid",
    desc: "Box model, Flexbox alignment, CSS Grid, and responsive styling.",
    playerUrl: "/programs/css/course",
    overviewUrl: "/programs/css",
    level: "Beginner",
    duration: "4 Weeks",
  },
  {
    id: "javascript",
    title: "Modern JavaScript (ES6+)",
    category: "Web Interactivity",
    tag: "DOM & Events",
    desc: "const/let, arrow functions, click event listeners, and DOM updates.",
    playerUrl: "/programs/javascript/course",
    overviewUrl: "/programs/javascript",
    level: "Beginner",
    duration: "6 Weeks",
  },
  {
    id: "java",
    title: "Java for Beginners",
    category: "Enterprise Backend",
    tag: "JVM & Spring",
    desc: "Core syntax, OOP encapsulation, inheritance, Maven, and JVM architecture.",
    playerUrl: "/programs/java/course",
    overviewUrl: "/programs/java",
    level: "Beginner",
    duration: "10 Weeks",
  },
  {
    id: "python",
    title: "Complete Python Course",
    category: "Data & Automation",
    tag: "FastAPI & Scripts",
    desc: "Clean, idiomatic Python 3.12, data structures, functions, and APIs.",
    playerUrl: "/programs/python/course",
    overviewUrl: "/programs/python",
    level: "Beginner",
    duration: "10 Weeks",
  },
]

export default function ProgramsPage() {
    const { isEnrolled, enroll } = useEnrollments()
    const [navigatingId, setNavigatingId] = useState<string | null>(null)

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="h-[72px]" />

            {/* 1. Hero Section */}
            <section id="programs-hero" className="pt-20 pb-12 px-6 border-b border-border/50 scroll-mt-24">
                <div className="mx-auto max-w-[1400px]">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="max-w-3xl text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1 text-xs font-medium text-primary mb-6">
                                <Code2 className="h-3.5 w-3.5" />
                                <span>All Courses &amp; Roadmaps</span>
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-foreground tracking-tight leading-[1.15]">
                                Courses &amp; Learning Roadmaps
                            </h1>
                            <p className="mt-5 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
                                Practical, easy-to-follow coding courses designed to help you build real software, master algorithms, and start your career as a developer.
                            </p>
                        </div>

                        <AxelStage
                            id="programs-hero-robot-anchor"
                            sectionId="programs-hero"
                            label="Course Guide"
                            emotion="cute"
                            scale={0.5}
                        />
                    </div>
                </div>
            </section>

            {/* 2. Quick Access: Programming Languages & Web Development */}
            <section id="core-languages" className="py-12 px-6 border-b border-border/50 bg-secondary/20">
                <div className="mx-auto max-w-[1400px]">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                        <div>
                            <div className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-0.5 text-xs font-mono font-medium text-primary mb-3">
                                <Code2 className="h-3 w-3" />
                                <span>W3Schools-Style Simple Courses</span>
                            </div>
                            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground tracking-tight">
                                Core Programming &amp; Web Development
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                                Step-by-step interactive courses with simple definitions, live in-browser code editors, line-by-line syntax breakdowns, and instant quizzes.
                            </p>
                        </div>
                        <span className="text-xs font-mono text-muted-foreground">
                            8 Foundational Languages &amp; Stacks
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {CORE_COURSES.map((course) => {
                            const enrolled = isEnrolled(course.id)
                            const playerUrl = course.playerUrl || `/courses/${course.id}/learn`
                            const overviewUrl = course.overviewUrl || `/courses/${course.id}`
                            const isSelected = navigatingId === course.id


                            const handleEnroll = (e: React.MouseEvent) => {
                                e.preventDefault()
                                enroll({
                                    id: course.id,
                                    slug: course.id,
                                    title: course.title,
                                    category: course.category,
                                    difficulty: course.level,
                                    modules: 4,
                                    duration: course.duration,
                                    thumbnail: `/images/courses/course_${course.id}.jpg`,
                                    progressPercent: 0,
                                    lessonsCompleted: 0,
                                    totalLessons: 12,
                                })
                                enrollInCourse(course.id).catch(() => {})
                            }

                            return (
                                <div
                                    key={course.id}
                                    className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-200 hover:-translate-y-0.5 p-5 ${
                                        isSelected
                                            ? "border-primary/60 ring-1 ring-primary/40 bg-card dark:bg-[#050505]"
                                            : "border-hairline dark:border-white/[0.08] bg-card/90 dark:bg-[#050505]/90 hover:border-foreground/30 dark:hover:border-white/25"
                                    }`}
                                >
                                    {/* Selection Launching Badge */}
                                    {isSelected && (
                                        <div className="absolute inset-x-0 -top-2.5 flex justify-center z-10 animate-in fade-in zoom-in-95 duration-150">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-[10px] font-mono font-medium">
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                Launching Course...
                                            </span>
                                        </div>
                                    )}

                                    <div>
                                        {/* Header with Logo and Badge */}
                                        <div className="flex items-center justify-between gap-2 mb-4">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-secondary text-primary p-2 group-hover:scale-105 group-hover:border-foreground/20 transition-all duration-200">
                                                <TechLogo slug={course.id} className="h-7 w-7 object-contain" />
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <WishlistButton
                                                    course={{
                                                        id: course.id,
                                                        slug: course.id,
                                                        title: course.title,
                                                        category: course.category,
                                                        level: course.level,
                                                        duration: course.duration,
                                                        href: overviewUrl,
                                                    }}
                                                    variant="icon"
                                                    className="h-7 w-7 bg-secondary/70 hover:bg-secondary border border-hairline hover:border-amber-400/40"
                                                />
                                                {enrolled ? (
                                                    <span className="rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 text-[10px] font-mono border border-emerald-500/20 font-semibold">
                                                        Enrolled
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-mono text-muted-foreground border border-border/60">
                                                        {course.duration}
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        <div className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold mb-1">
                                            {course.category}
                                        </div>
                                        <Link
                                            href={overviewUrl}
                                            onClick={() => setNavigatingId(course.id)}
                                            className="group-hover:text-primary transition-colors block"
                                        >
                                            <h3 className="font-serif text-lg font-medium text-foreground leading-snug">
                                                {course.title}
                                            </h3>
                                        </Link>
                                        <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                            {course.desc}
                                        </p>
                                    </div>

                                    <div className="mt-5 pt-3 border-t border-hairline/60 flex items-center gap-2">
                                        {enrolled ? (
                                            <Link
                                                href={playerUrl}
                                                onClick={() => setNavigatingId(course.id)}
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary hover:bg-primary-active text-white px-3 py-1.5 text-xs font-semibold transition-all cursor-pointer"
                                            >
                                                {isSelected ? (
                                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                                ) : (
                                                    <PlayCircle className="h-3.5 w-3.5" />
                                                )}
                                                <span>{isSelected ? "Loading..." : "Continue"}</span>
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={handleEnroll}
                                                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer"
                                            >
                                                <Plus className="h-3.5 w-3.5" />
                                                <span>Enroll Track</span>
                                            </button>
                                        )}
                                        <Link
                                            href={overviewUrl}
                                            onClick={() => setNavigatingId(course.id)}
                                            className="inline-flex items-center justify-center gap-1 rounded-xl border border-hairline bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-card transition-all cursor-pointer"
                                        >
                                            <span>Syllabus</span>
                                            {isSelected ? (
                                                <Loader2 className="h-3 w-3 animate-spin text-primary" />
                                            ) : (
                                                <ArrowRight className="h-3 w-3" />
                                            )}
                                        </Link>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* 3. Catalog Section */}
            <section id="programs-catalog" className="scroll-mt-24">
                <Courses hideHeader />
            </section>

            <Footer />
        </main>
    )
}
