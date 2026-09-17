import { Navbar } from "@/components/navbar"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Award, TrendingUp, Users, Building, ArrowRight, Star } from "lucide-react"
import { AxelStage } from "@/components/axel/axel-stage"

export default function ResultsPage() {
    const metrics = [
        { label: "Interview Success Rate", value: "94%", detail: "Students reporting positive interview outcomes" },
        { label: "Average Salary Increase", value: "+48%", detail: "After completing career tracks" },
        { label: "Students Enrolled", value: "1,400+", detail: "Learners across 34 countries" },
        { label: "Student Rating", value: "4.9/5", detail: "Verified reviews and ratings" },
    ]

    const alumniStories = [
        {
            name: "Sarah Chen",
            role: "Backend Engineer at Datadog",
            previous: "Frontend Developer (2 yrs exp)",
            quote: "ASCI taught me how to actually understand distributed systems instead of just memorizing answers. In interviews, I was able to explain real system architecture with complete confidence.",
            cohort: "Batch 2024",
        },
        {
            name: "Marcus Vance",
            role: "Backend Engineer at Stripe",
            previous: "Junior Java Developer",
            quote: "The step-by-step visual lessons on memory and data structures completely changed how I write code. It gave me the confidence to pass senior technical interviews.",
            cohort: "Batch 2024",
        },
        {
            name: "Aarav Patel",
            role: "Software Engineer at Microsoft",
            previous: "Self-taught Developer",
            quote: "I didn't have a computer science degree. ASCI filled every single knowledge gap in data structures, algorithms, and web development. Best learning investment I have ever made.",
            cohort: "Batch 2025",
        },
    ]

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
            <Navbar />
            <div className="h-[68px]" />

            {/* 1. Editorial Hero */}
            <section id="results-hero" className="py-16 lg:py-24 px-6 border-b border-border scroll-mt-24">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="max-w-3xl text-center lg:text-left space-y-6">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                                Student Results
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground tracking-tight">
                                Student Outcomes &amp; Career Results
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                See how our students built practical coding skills, created working real-world projects, and landed great software developer jobs.
                            </p>
                        </div>

                        <AxelStage
                            id="results-hero-robot-anchor"
                            sectionId="results-hero"
                            label="Student Results"
                            emotion="cute"
                            scale={0.5}
                        />
                    </div>
                </div>
            </section>

            {/* 2. Metric Counters Grid */}
            <section id="results-metrics" className="py-16 px-6 max-w-7xl mx-auto w-full border-b border-border scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-primary">Our Impact</span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground mt-1">Measured Career Growth</h2>
                    </div>
                    <AxelStage
                        id="results-metrics-robot-anchor"
                        sectionId="results-metrics"
                        label="Platform Stats"
                        emotion="happy"
                        scale={0.46}
                        size="sm"
                    />
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {metrics.map((m, idx) => (
                        <div key={idx} className="p-6 rounded-2xl bg-card border border-border flex flex-col justify-between shadow-xs">
                            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif font-normal text-foreground mb-2">
                                {m.value}
                            </div>
                            <div>
                                <div className="text-xs font-mono font-semibold uppercase tracking-wider text-foreground mb-1">
                                    {m.label}
                                </div>
                                <div className="text-[11px] text-muted-foreground font-mono">
                                    {m.detail}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Alumni Deep Dives */}
            <section id="results-stories" className="py-20 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 border-b border-border/50 pb-6">
                    <div className="max-w-2xl space-y-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-primary">Graduate Stories</span>
                        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">Real Stories from Graduates</h2>
                    </div>
                    <AxelStage
                        id="results-stories-robot-anchor"
                        sectionId="results-stories"
                        label="Alumni Case Studies"
                        emotion="heart"
                        scale={0.46}
                        size="sm"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {alumniStories.map((story, i) => (
                        <div key={i} className="p-8 rounded-2xl bg-card border border-border flex flex-col justify-between shadow-sm">
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary uppercase font-semibold">
                                        {story.cohort}
                                    </span>
                                    <div className="flex text-yellow-400 gap-0.5">
                                        {[...Array(5)].map((_, starI) => (
                                            <Star key={starI} className="w-3.5 h-3.5 fill-current" />
                                        ))}
                                    </div>
                                </div>
                                <p className="font-serif text-base text-foreground italic mb-6 leading-relaxed">
                                    "{story.quote}"
                                </p>
                            </div>

                            <div className="border-t border-border pt-4">
                                <div className="font-serif text-lg font-normal text-foreground">{story.name}</div>
                                <div className="text-xs font-mono text-primary font-semibold mt-0.5">{story.role}</div>
                                <div className="text-[11px] font-mono text-muted-foreground mt-1">Previous: {story.previous}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Testimonials section */}
            <div className="py-12 border-t border-border">
                <Testimonials />
            </div>

            {/* Pre-footer Action */}
            <section className="py-20 px-6 bg-secondary/50 border-t border-border text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
                        Ready to Begin Your Technical Leap?
                    </h2>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
                        Explore our foundational and advanced tracks, or test your recursion intuition inside our live sandboxes.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                        <Link
                            href="/programs"
                            className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary-active transition-all flex items-center gap-2 shadow-sm"
                        >
                            View All Programs <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/pricing"
                            className="px-6 py-3.5 rounded-xl border border-border bg-card text-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-all"
                        >
                            Compare Memberships
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
