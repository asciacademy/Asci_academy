import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Server, ArrowRight, Database, Shield, Cpu, Cloud, CheckCircle2 } from "lucide-react"

export default function BackendEngineeringPage() {
    const modules = [
        { title: "API Architecture & Protocols", desc: "RESTful principles, GraphQL schemas, gRPC streaming, and HTTP/2 semantics.", icon: Server },
        { title: "Relational & NoSQL Databases", desc: "PostgreSQL indexing, query optimization, Redis caching patterns, and ACID transactions.", icon: Database },
        { title: "Distributed Systems & Queues", desc: "Event-driven pipelines with Kafka, message brokering with RabbitMQ, and idempotency.", icon: Cpu },
        { title: "Cloud Deployment & Docker", desc: "Containerization, Kubernetes pods, CI/CD automation, and infrastructure resilience.", icon: Cloud },
    ]

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <div className="h-[72px]" />

            <section className="relative overflow-hidden py-20 lg:py-28 border-b border-border">
                <div className="mx-auto max-w-5xl px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-primary/20 bg-primary/10 text-primary text-xs font-mono font-medium">
                        <Server className="h-3.5 w-3.5" />
                        <span>Professional Track • 12 Weeks</span>
                    </div>

                    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-foreground leading-[1.15]">
                        Backend & Distributed Systems
                    </h1>
                    <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
                        Engineer production-grade APIs, high-throughput databases, and resilient cloud architectures from first principles.
                    </p>

                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link
                            href="/pricing"
                            className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-active text-primary-foreground px-7 py-3 text-sm font-semibold font-mono transition-colors shadow-sm cursor-pointer"
                        >
                            <span>Enroll in Cohort</span>
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                        <Link
                            href="/programs"
                            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 hover:bg-secondary/60 px-6 py-3 text-sm font-mono text-foreground transition-colors cursor-pointer"
                        >
                            <span>Explore Catalog</span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-14">
                    <span className="text-xs font-mono uppercase tracking-widest text-primary block mb-2 font-semibold">Curriculum Pillars</span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-normal text-foreground">
                        Engineered for High-Scale Production
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {modules.map((m, idx) => (
                        <div key={idx} className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-xl p-6 shadow-sm hover:border-primary/40 transition-all">
                            <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                                <m.icon className="h-5 w-5" />
                            </div>
                            <h3 className="font-serif text-xl font-normal text-foreground mb-2">{m.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </main>
    )
}

