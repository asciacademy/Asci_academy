import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Layers, ArrowRight, Network, Server, HardDrive, ShieldCheck } from "lucide-react"

export default function SystemDesignPage() {
    const modules = [
        { title: "High-Availability Architecture", desc: "Load balancing, reverse proxies, rate limiting, and failover topologies for 99.999% uptime.", icon: Network },
        { title: "Distributed Data & Partitioning", desc: "Sharding, consistent hashing, replication lag, CAP theorem trade-offs, and consensus protocols.", icon: HardDrive },
        { title: "Caching & CDN Strategies", desc: "Write-through vs write-back caching, cache stampede prevention, eviction policies, and edge caching.", icon: Server },
        { title: "Resilience & Fault Tolerance", desc: "Circuit breakers, bulkhead patterns, distributed tracing, and chaos engineering testing.", icon: ShieldCheck },
    ]

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="h-[72px]" />

            <section className="relative overflow-hidden py-20 lg:py-28 border-b border-border bg-card">
                <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-medium">
                        <Layers className="h-3.5 w-3.5" />
                        <span>Staff Engineer Track • 8 Weeks</span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15]">
                        System Design &amp; <span className="italic font-serif text-primary">Distributed Architecture</span>
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                        Design systems capable of scaling to hundreds of millions of requests. Master trade-offs in consistency, latency, and operational cost.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-7 py-3 text-sm font-semibold transition-all shadow-sm"
                        >
                            <span>Join Next Cohort</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/programs"
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 hover:bg-secondary px-6 py-3 text-sm font-medium text-foreground transition-all"
                        >
                            <span>Browse All Tracks</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2 font-semibold">Architectural Pillars</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
                        From Monolith to Planetary Scale
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules.map((m, idx) => (
                        <div key={idx} className="rounded-3xl border border-border/80 bg-card/70 backdrop-blur-xl p-7 shadow-xs hover:border-primary/50 transition-all">
                            <div className="h-11 w-11 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-5">
                                <m.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-serif text-xl font-medium text-foreground mb-2">{m.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}

