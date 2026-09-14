import Link from "next/link"
import { Braces, BookOpen, ChevronRight, Terminal, Target, Zap, Clock, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AxelStage } from "@/components/axel/axel-stage"

import { chapterInfo, lessons, courseCurriculum, courseInfo } from "@/lib/dsa-course-data"

export default function DSALandingPage() {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="h-[72px]" />

            {/* ════════ 1. HERO SECTION ════════ */}
            <section id="dsa-hero" className="relative overflow-hidden border-b border-border py-16 lg:py-24 scroll-mt-24">
                <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                        {/* Left: Editorial Text */}
                        <div className="flex-1 text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium">
                                <BookOpen className="h-3.5 w-3.5" />
                                <span>Free Track • {lessons.length} Lessons</span>
                            </div>

                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.1]">
                                Data Structures & <br className="hidden sm:inline" />
                                <span className="italic font-serif text-primary">Algorithms</span> for Beginners
                            </h1>

                            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
                                {courseInfo.subtitle}
                            </p>

                            {/* CTA */}
                            <div className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
                                <Link
                                    href="/programs/dsa/course"
                                    className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-7 py-3 text-sm font-semibold transition-all shadow-sm"
                                >
                                    <Terminal className="h-4 w-4" />
                                    <span>Start Learning</span>
                                    <ChevronRight className="h-4 w-4" />
                                </Link>
                                <span className="text-xs font-mono text-muted-foreground">
                                    100% Free • Open Access • No Credit Card
                                </span>
                            </div>
                        </div>

                        {/* Dedicated Axel Stage */}
                        <AxelStage
                            id="dsa-hero-robot-anchor"
                            sectionId="dsa-hero"
                            label="DSA Track"
                            emotion="cute"
                            scale={0.46}
                        />

                        {/* Right: Clean Editorial Product Card */}
                        <div className="w-full max-w-md">
                            <div className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 shadow-sm">
                                {/* Header */}
                                <div className="flex items-center justify-between pb-5 border-b border-border/70">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                                            <Braces className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <span className="text-[11px] font-mono text-primary uppercase tracking-wider block font-semibold">Chapter 01</span>
                                            <h3 className="text-sm font-medium text-foreground">Thinking Like a Programmer</h3>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 text-xs font-mono font-medium">
                                        Free
                                    </span>
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 gap-3 py-5">
                                    {[
                                        { icon: BookOpen, label: "Lessons", value: chapterInfo.totalLessons.toString() },
                                        { icon: Target, label: "Difficulty", value: chapterInfo.difficulty },
                                        { icon: Zap, label: "XP Reward", value: `${chapterInfo.xpReward} XP` },
                                        { icon: Clock, label: "Duration", value: chapterInfo.estimatedTime },
                                    ].map((stat, i) => (
                                        <div key={i} className="rounded-xl border border-border/70 bg-secondary/30 p-3.5">
                                            <stat.icon className="h-4 w-4 text-primary mb-2" />
                                            <span className="block text-[11px] text-muted-foreground uppercase tracking-wider font-mono">{stat.label}</span>
                                            <span className="text-sm font-semibold text-foreground">{stat.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Topics preview */}
                                <div className="pt-4 border-t border-border/70">
                                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block mb-2.5">Key Concepts</span>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["Algorithms", "Pseudocode", "Flowcharts", "Constraints", "Complexity"].map(tag => (
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

            {/* ════════ 2. CHAPTER OVERVIEW CARDS ════════ */}
            <section id="dsa-curriculum" className="py-20 lg:py-24 border-b border-border scroll-mt-24">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-6 border-b border-border/50 pb-6">
                        <div className="max-w-2xl">
                            <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2 font-semibold">Structured Curriculum</span>
                            <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-normal tracking-tight">
                                {lessons.length} Lessons across {courseCurriculum[0].chapters.length} Modules
                            </h2>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Progress step-by-step through interactive concepts, code exercises, and mental models.
                            </p>
                        </div>
                        <AxelStage
                            id="dsa-curriculum-robot-anchor"
                            sectionId="dsa-curriculum"
                            label="DSA Modules"
                            emotion="happy"
                            scale={0.46}
                            size="sm"
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {courseCurriculum[0].chapters.map((chapter, i) => (
                            <Link
                                href="/programs/dsa/course"
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
                                        {chapter.concepts.length} Concepts • {chapter.problems?.length || 0} Practice Problems
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

            {/* ════════ 3. START LEARNING BOTTOM CTA ════════ */}
            <section id="dsa-cta" className="py-20 bg-card/40 scroll-mt-24">
                <div className="mx-auto max-w-4xl px-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
                        <div className="max-w-xl">
                            <h2 className="font-serif text-3xl lg:text-4xl text-foreground font-normal tracking-tight mb-4">
                                Ready to begin your algorithmic foundation?
                            </h2>
                            <p className="text-muted-foreground text-sm sm:text-base mb-8 leading-relaxed">
                                Master the core data structures and patterns with clear explanations, visual mental models, and hands-on practice.
                            </p>
                            <Link
                                href="/programs/dsa/course"
                                className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-8 py-3.5 text-sm font-semibold transition-all shadow-sm"
                            >
                                <Terminal className="h-4 w-4" />
                                <span>Launch Course Workspace</span>
                                <ChevronRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <AxelStage
                            id="dsa-cta-robot-anchor"
                            sectionId="dsa-cta"
                            label="Course Workspace"
                            emotion="heart"
                            scale={0.46}
                            size="sm"
                        />
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

