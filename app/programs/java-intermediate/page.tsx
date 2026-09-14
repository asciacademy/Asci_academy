import Link from "next/link"
import { BookOpen, ChevronRight, Terminal, Target, Zap, Clock, Server } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

import { javaIntermediateCourseCurriculum } from "@/lib/java-intermediate-course-data"

export default function JavaIntermediateCourseLanding() {
  const allLessons = javaIntermediateCourseCurriculum.flatMap(part => 
    part.chapters.flatMap(chapter => [
        ...chapter.concepts, 
        ...(chapter.missions || []), 
        ...(chapter.problems || [])
    ])
  )
  
  const conceptCount = allLessons.filter(l => l.type === 'concept').length
  const missionCount = allLessons.filter(l => l.type === 'practice').length
  const chapters = javaIntermediateCourseCurriculum[0]?.chapters || []

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="h-[72px]" />

      {/* ════════ HERO SECTION ════════ */}
      <section className="relative overflow-hidden border-b border-border py-16 lg:py-24 bg-card">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left: Editorial Text */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Intermediate Track • {allLessons.length} Lessons</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.1]">
                Java Intermediate &amp; <br className="hidden sm:inline" />
                <span className="italic font-serif text-primary">Systems</span> Engineering
              </h1>

              <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                Dive deep into Java Collections Framework, Generics, Stream API, Concurrency, and Multithreading architectures.
              </p>

              {/* CTA */}
              <div className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                <Link
                  href="/programs/java-intermediate/course"
                  className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-7 py-3 text-sm font-semibold transition-all shadow-sm"
                >
                  <Terminal className="h-4 w-4" />
                  <span>Start Learning</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
                <span className="text-xs font-mono text-muted-foreground">
                  Free Access • Production Java Best Practices
                </span>
              </div>
            </div>

            {/* Right: Clean Editorial Product Card */}
            <div className="w-full max-w-md">
              <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 shadow-sm">
                <div className="flex items-center justify-between pb-5 border-b border-border/70">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Server className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-primary uppercase tracking-wider block font-semibold">Level 2</span>
                      <h3 className="text-sm font-medium text-foreground">Java Core &amp; Collections</h3>
                    </div>
                  </div>
                  <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-xs font-mono font-medium">
                    Intermediate
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 py-5">
                  {[
                    { icon: BookOpen, label: "Concepts", value: conceptCount.toString() },
                    { icon: Target, label: "Missions", value: missionCount.toString() },
                    { icon: Zap, label: "XP Total", value: "2,800 XP" },
                    { icon: Clock, label: "Duration", value: "25 Hours" },
                  ].map((stat, i) => (
                    <div key={i} className="rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                      <stat.icon className="h-4 w-4 text-primary mb-2" />
                      <span className="block text-[11px] text-muted-foreground uppercase tracking-wider font-mono">{stat.label}</span>
                      <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-border/70">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2.5">Key Topics</span>
                  <div className="flex flex-wrap gap-1.5">
                    {["Generics", "Streams API", "Lambdas", "ExecutorService", "Synchronization", "File I/O"].map(tag => (
                      <span key={tag} className="rounded-lg border border-border/80 bg-secondary/50 px-2.5 py-1 text-xs font-mono text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ CHAPTER OVERVIEW CARDS ════════ */}
      <section className="py-20 lg:py-24 border-b border-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-3 font-semibold">Structured Curriculum</span>
            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
              {allLessons.length} Lessons across {chapters.length} Modules
            </h2>
            <p className="mt-3 text-sm text-muted-foreground">
              Level up from standard syntax to intermediate system design, functional stream pipelines, and multi-threaded synchronization.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {chapters.map((chapter, i) => (
              <Link
                href="/programs/java-intermediate/course"
                key={chapter.id}
                className="group flex flex-col justify-between rounded-2xl border border-border/80 bg-card/70 p-6 text-left transition-all hover:border-primary/50 hover:shadow-md backdrop-blur-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center font-mono text-xs font-semibold">
                      {i + 1}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">Module {i + 1}</span>
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-snug">
                    {chapter.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {chapter.concepts.length} Concepts • {chapter.problems?.length || 0} Exercises
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/70 flex items-center text-xs font-mono font-medium text-primary">
                  <span>Explore Module</span>
                  <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ BOTTOM CTA ════════ */}
      <section className="py-20 bg-card/40">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl lg:text-4xl text-foreground font-normal tracking-tight mb-4">
            Master multi-threading and modern Java APIs
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Harness the power of concurrent data structures, lambda functional interfaces, and clean generics architecture.
          </p>
          <Link
            href="/programs/java-intermediate/course"
            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-8 py-3.5 text-sm font-semibold transition-all shadow-sm"
          >
            <Terminal className="h-4 w-4" />
            <span>Launch Course Workspace</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
