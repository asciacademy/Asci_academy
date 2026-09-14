import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Code2,
  ArrowRight,
  BookOpen,
  Zap,
  CheckCircle2,
  Play,
  Layers,
} from "lucide-react"
import { REACT_COURSE_PARTS } from "@/lib/curriculum/react-course-data"
import { TechLogo } from "@/components/tech-logo"

export const metadata = {
  title: "React & Next.js Course - Modern Web Architecture | ASCI",
  description: "Learn React 19 and Next.js App Router with simple visual explanations, interactive component sandboxes, Server Components, and zero setup required.",
}

export default function ReactLandingPage() {
  const totalLessons = REACT_COURSE_PARTS.reduce(
    (acc, part) => acc + part.chapters.reduce((cAcc, ch) => cAcc + ch.lessons.length, 0),
    0
  )

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-[72px]" />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 border-b border-border/80 bg-card">
        <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium shadow-2xs">
            <TechLogo slug="react" className="h-4 w-4" />
            <span>Modern Web Stack • {totalLessons} Lessons</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15]">
            Learn React & Next.js,{" "}
            <span className="italic font-serif text-primary">the simple way</span>.
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Master the modern React component model, declarative state management, custom hooks, and full-stack Next.js Server Components with interactive live code execution.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/programs/react/course"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-7 py-3 text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 hover:bg-card px-6 py-3 text-sm font-medium transition-all text-muted-foreground hover:text-foreground cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>All Courses</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Curriculum Breakdown */}
      <section className="py-16 lg:py-20 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium">
            Course Curriculum
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Progress step-by-step from foundational JSX components to full-stack Next.js Server Components.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REACT_COURSE_PARTS.map((part, pIdx) => (
            <div
              key={part.id}
              className="rounded-2xl border border-border bg-card/40 p-6 flex flex-col justify-between hover:border-primary/40 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {part.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">Part 0{pIdx + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground text-base mb-2">{part.title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed mb-4">
                  {part.description}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60">
                <div className="text-xs text-muted-foreground mb-3 font-medium">
                  {part.chapters.reduce((acc, ch) => acc + ch.lessons.length, 0)} interactive lessons
                </div>
                <Link
                  href="/programs/react/course"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                >
                  <span>Explore Lessons</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
