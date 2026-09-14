import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { MessageSquare, Github, BookOpen, Users, Compass, ArrowUpRight, Shield, HeartHandshake } from "lucide-react"
import { AxelStage } from "@/components/axel/axel-stage"

export default function CommunityPage() {
    const channels = [
        {
            title: "Student Discord Server",
            category: "Chat & Help",
            desc: "24/7 channels for quick coding help, project feedback, and voice study rooms.",
            icon: MessageSquare,
            link: "https://discord.com",
            cta: "Join Discord Server",
            tag: "8,400+ Members",
        },
        {
            title: "GitHub Organization",
            category: "Open Source Projects",
            desc: "Contribute to shared open-source projects, beginner exercises, and coding tools.",
            icon: Github,
            link: "https://github.com",
            cta: "View GitHub Projects",
            tag: "45 Repositories",
        },
        {
            title: "Weekly Tech Study Group",
            category: "Weekly Sessions",
            desc: "Discuss interesting tech topics, how systems work, and new developer tools.",
            icon: BookOpen,
            link: "#",
            cta: "View Schedule",
            tag: "Sundays at 6 PM",
        },
        {
            title: "Peer Code Reviews",
            category: "Get Feedback",
            desc: "Share your project code and get friendly suggestions and tips from mentors and peers.",
            icon: Users,
            link: "/login",
            cta: "Join a Review Circle",
            tag: "All Timezones",
        },
    ]

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-300">
            <Navbar />
            <div className="h-[68px]" />

            {/* 1. Header */}
            <section id="community-hero" className="py-16 lg:py-24 px-6 border-b border-border scroll-mt-24">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="max-w-3xl text-center lg:text-left space-y-6">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                                Student Community
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground tracking-tight">
                                Join Our Friendly Community
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                Connect with fellow learners and mentors. Ask questions when you get stuck, collaborate on projects, and study for interviews together.
                            </p>
                        </div>

                        <AxelStage
                            id="community-hero-robot-anchor"
                            sectionId="community-hero"
                            label="Student Community"
                            emotion="cute"
                            scale={0.5}
                        />
                    </div>
                </div>
            </section>

            {/* 2. Channels Grid */}
            <section id="community-channels" className="py-20 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4 border-b border-border/50 pb-6">
                    <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-primary">Community Spaces</span>
                        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground mt-1">Ways to Connect &amp; Learn</h2>
                    </div>
                    <AxelStage
                        id="community-channels-robot-anchor"
                        sectionId="community-channels"
                        label="Community Channels"
                        emotion="happy"
                        scale={0.46}
                        size="sm"
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {channels.map((ch, idx) => (
                        <div
                            key={idx}
                            className="p-8 rounded-2xl bg-card border border-border flex flex-col justify-between transition-all hover:border-primary/40 hover:shadow-sm"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-mono text-primary uppercase tracking-wider font-semibold">
                                        {ch.category}
                                    </span>
                                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                                        {ch.tag}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 mb-3">
                                    <ch.icon className="w-5 h-5 text-foreground" />
                                    <h3 className="font-serif text-2xl font-normal text-foreground">{ch.title}</h3>
                                </div>
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-8">
                                    {ch.desc}
                                </p>
                            </div>

                            <a
                                href={ch.link}
                                target={ch.link.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-between px-5 py-3 rounded-xl bg-secondary/80 border border-border text-xs font-mono uppercase tracking-widest text-foreground font-semibold hover:border-primary hover:bg-secondary transition-colors"
                            >
                                <span>{ch.cta}</span>
                                <ArrowUpRight className="w-4 h-4 text-primary" />
                            </a>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Community Principles / Code of Conduct */}
            <section id="community-principles" className="pb-20 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
                <div className="rounded-2xl border border-border bg-card/60 p-8 sm:p-12 max-w-4xl mx-auto backdrop-blur-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-border/50 pb-4">
                        <div className="flex items-center gap-3">
                            <Shield className="w-6 h-6 text-primary" />
                            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground">
                                Principles of Scholastic Discourse
                            </h2>
                        </div>
                        <AxelStage
                            id="community-principles-robot-anchor"
                            sectionId="community-principles"
                            label="Scholastic Principles"
                            emotion="heart"
                            scale={0.46}
                            size="sm"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8 text-xs leading-relaxed text-muted-foreground">
                        <div className="space-y-2">
                            <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">1. Precision Over Hype</h4>
                            <p>
                                We measure performance with benchmarks, profilers, and mathematical proofs. Claims about runtime and scalability must be substantiated.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">2. Constructive Rigor</h4>
                            <p>
                                Code reviews are thorough and educational. We critique the architecture, memory footprints, and abstractions—never the individual.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">3. Generous Mentorship</h4>
                            <p>
                                Experienced systems engineers guide apprentices through debugging bottlenecks. Asking conceptual questions is celebrated.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">4. Anti-Plagiarism Standard</h4>
                            <p>
                                True comprehension requires grappling with problems directly. Copying solutions without internalizing invariants defeats the mission.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
