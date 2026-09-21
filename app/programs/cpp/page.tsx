import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  Cpu,
  ArrowRight,
  BookOpen,
  Zap,
  CheckCircle2,
  Code2,
  Play,
  Layers,
} from "lucide-react"
import { CPP_COURSE_PARTS } from "@/lib/curriculum/cpp-course-data"

export const metadata = {
  title: "C++ Programming Course - Learn Modern C++ & OOP Simply | ASCI",
  description: "Learn modern C++ with simple explanations, interactive examples, references, and Object-Oriented Programming (OOP). Zero setup required.",
}

export default function CPPLandingPage() {
  const totalLessons = CPP_COURSE_PARTS.reduce(
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
            <Cpu className="h-3.5 w-3.5" />
            <span>High Performance Track • {totalLessons} Lessons</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15]">
            Learn C++ &amp; OOP,{" "}
            <span className="italic font-serif text-primary">the simple way</span>.
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            The language powering modern game engines, browsers, and high-speed financial systems. Master classes, objects, references, and polymorphism step-by-step.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/programs/cpp/course"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-7 py-3 text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/programs"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 hover:bg-secondary px-6 py-3 text-sm font-medium text-foreground transition-all cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span>All Courses</span>
            </Link>
          </div>

          {/* Value Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              Modern C++ Standard
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              Interactive OOP Visualizer
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-card border border-border">
              <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
              Reference vs Pointer Inspector
            </span>
          </div>
        </div>
      </section>

      {/* Syllabus Overview Section */}
      <section className="py-16 max-w-5xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2 font-semibold">
            Curriculum Roadmap
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
            What You Will Learn
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From cin and cout to full Object-Oriented Architecture.
          </p>
        </div>

        <div className="space-y-6">
          {CPP_COURSE_PARTS.map((part) => (
            <div
              key={part.id}
              className="rounded-2xl border border-border/80 bg-card/70 dark:bg-[#050505] p-6 shadow-xs"
            >
              <div className="flex items-center justify-between gap-4 mb-3">
                <h3 className="font-serif text-xl font-normal text-foreground">
                  {part.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20">
                  {part.badge}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-4">
                {part.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-border/60">
                {part.chapters.flatMap((ch) => ch.lessons).map((lesson) => (
                  <Link
                    key={lesson.id}
                    href="/programs/cpp/course"
                    className="group flex items-center justify-between p-2.5 rounded-xl border border-border/60 bg-background hover:border-primary/40 hover:bg-secondary/60 transition-all text-xs"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="h-3.5 w-3.5 text-primary" />
                      <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-muted-foreground/60 group-hover:text-primary transition-colors">
                      Learn &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Bottom Banner */}
        <div className="mt-14 p-8 rounded-3xl border border-border/80 bg-card/70 dark:bg-[#050505] text-center max-w-3xl mx-auto shadow-xs">
          <h3 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
            Master High-Performance C++
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Interactive syntax, runnable code, and clear memory concepts right in your browser.
          </p>
          <div className="mt-6">
            <Link
              href="/programs/cpp/course"
              className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-6 py-2.5 text-xs font-semibold tracking-tight shadow-sm transition-all"
            >
              <span>Launch Interactive C++ Player</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
