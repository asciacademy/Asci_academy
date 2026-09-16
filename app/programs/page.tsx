import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Courses } from "@/components/courses"
import { Footer } from "@/components/footer"
import { AxelStage } from "@/components/axel/axel-stage"
import { TechLogo } from "@/components/tech-logo"
import { PlayCircle, ArrowRight, BookOpen, Code2 } from "lucide-react"
import { WishlistButton } from "@/components/courses/wishlist-button"

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
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="h-[72px]" />

            {/* 1. Hero Section */}
            <section id="programs-hero" className="pt-20 pb-12 px-6 border-b border-border/50 scroll-mt-24">
                <div className="mx-auto max-w-7xl">
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
                <div className="mx-auto max-w-7xl">
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
                        {CORE_COURSES.map((course) => (
                            <div
                                key={course.id}
                                className="group relative flex flex-col justify-between rounded-2xl border border-hairline dark:border-white/[0.08] bg-card/90 dark:bg-[#181715]/90 p-5 transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs"
                            >
                                <div>
                                    {/* Header with Logo and Badge */}
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-hairline bg-secondary text-primary p-2 shadow-2xs group-hover:scale-105 group-hover:border-foreground/20 transition-all duration-200">
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
                                                    href: course.playerUrl,
                                                }}
                                                variant="icon"
                                                className="h-7 w-7 bg-secondary/70 hover:bg-secondary border border-hairline hover:border-amber-400/40"
                                            />
                                            <span className="rounded-full bg-secondary px-2.5 py-1 text-[10px] font-mono text-muted-foreground border border-border/60">
                                                {course.duration}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-[10px] font-mono uppercase tracking-wider text-primary font-semibold mb-1">
                                        {course.category}
                                    </div>
                                    <h3 className="font-serif text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                                        {course.title}
                                    </h3>
                                    <p className="mt-2 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                                        {course.desc}
                                    </p>
                                </div>

                                <div className="mt-5 pt-3 border-t border-hairline/60 flex items-center gap-2">
                                    <Link
                                        href={course.playerUrl}
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
                                    >
                                        <PlayCircle className="h-3.5 w-3.5" />
                                        <span>Learn</span>
                                    </Link>
                                    <Link
                                        href={course.overviewUrl}
                                        className="inline-flex items-center justify-center gap-1 rounded-xl border border-hairline bg-secondary px-3 py-1.5 text-xs font-medium text-foreground hover:bg-card transition-all cursor-pointer"
                                    >
                                        <span>Syllabus</span>
                                        <ArrowRight className="h-3 w-3" />
                                    </Link>
                                </div>
                            </div>
                        ))}
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
