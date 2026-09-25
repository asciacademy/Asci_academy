import { Navbar } from "@/components/navbar"
import { Features } from "@/components/features"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Cpu, Terminal, Layers, ArrowRight, CheckCircle2, Play, Compass, BookOpen } from "lucide-react"
import { AxelStage } from "@/components/axel/axel-stage"

export default function ExperiencePage() {
    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
            <Navbar />
            <div className="h-[68px]" />

            {/* 1. Editorial Hero */}
            <section id="experience-hero" className="py-16 lg:py-24 px-6 border-b border-border scroll-mt-24">
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        <div className="max-w-3xl space-y-6 text-center lg:text-left">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                                How You Learn
                            </div>
                            <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
                                Learn by Doing, Not Just Watching
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                                Most platforms make you watch hours of boring videos. We believe in active practice: write real code, watch algorithms execute step-by-step, and build working projects from day one.
                            </p>
                            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                                <Link
                                    href="/programs"
                                    className="px-6 py-3 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary-active transition-all flex items-center gap-2"
                                >
                                    Explore Courses <ArrowRight className="h-4 w-4" />
                                </Link>
                                <Link
                                    href="/sandbox/call-stack"
                                    className="px-6 py-3 rounded-xl border border-border bg-card text-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-secondary transition-all flex items-center gap-2"
                                >
                                    Try Visual Sandbox
                                </Link>
                            </div>
                        </div>

                        <AxelStage
                            id="experience-hero-robot-anchor"
                            sectionId="experience-hero"
                            label="Learning Method"
                            emotion="cute"
                            scale={0.5}
                        />
                    </div>
                </div>
            </section>

            {/* 2. Three Foundational Pillars */}
            <section id="experience-pillars" className="py-20 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6 border-b border-border/50 pb-6">
                    <div className="space-y-2">
                        <span className="text-xs font-mono uppercase tracking-widest text-primary">Our Learning Method</span>
                        <h2 className="font-sans text-3xl sm:text-4xl font-bold text-foreground">Three Ways We Help You Learn Faster</h2>
                    </div>
                    <AxelStage
                        id="experience-pillars-robot-anchor"
                        sectionId="experience-pillars"
                        label="Learning Pillars"
                        emotion="happy"
                        scale={0.46}
                        size="sm"
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Pillar 1 */}
                    <div className="p-8 rounded-3xl bg-card/70 backdrop-blur-xl border border-border/80 flex flex-col justify-between shadow-xs hover:border-primary/40 transition-all">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-6">
                                <Layers className="w-6 h-6" />
                            </div>
                            <h3 className="font-sans text-2xl font-bold text-foreground mb-3">Visual Memory &amp; Logic</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                Instead of guessing how recursion and memory work, watch values change, move, and stack step-by-step with interactive visual tools.
                            </p>
                        </div>
                        <div className="border-t border-border pt-4 font-mono text-[11px] text-primary flex items-center gap-2 font-medium">
                            <span>Try Visual Tools</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Pillar 2 */}
                    <div className="p-8 rounded-3xl bg-card/70 backdrop-blur-xl border border-border/80 flex flex-col justify-between shadow-xs hover:border-primary/40 transition-all">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-6">
                                <Terminal className="w-6 h-6" />
                            </div>
                            <h3 className="font-sans text-2xl font-bold text-foreground mb-3">Instant Code Execution</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                Run code right inside your web browser with zero waiting and zero setup. No complex installations needed to start practicing.
                            </p>
                        </div>
                        <div className="border-t border-border pt-4 font-mono text-[11px] text-foreground flex items-center gap-2 font-medium">
                            <span>Run Code in Browser</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>

                    {/* Pillar 3 */}
                    <div className="p-8 rounded-3xl bg-card/70 backdrop-blur-xl border border-border/80 flex flex-col justify-between shadow-xs hover:border-primary/40 transition-all">
                        <div>
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary border border-primary/20 flex items-center justify-center mb-6">
                                <Cpu className="w-6 h-6" />
                            </div>
                            <h3 className="font-sans text-2xl font-bold text-foreground mb-3">Step-by-Step Problem Solving</h3>
                            <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                                Each problem guides you through edge cases and teaches you how to think through solutions like an experienced software developer.
                            </p>
                        </div>
                        <div className="border-t border-border pt-4 font-mono text-[11px] text-primary flex items-center gap-2 font-medium">
                            <span>Practice Problems</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Dark Studio Preview Section */}
            <section id="experience-sandbox" className="py-20 px-6 bg-[#0a0a0a] dark:bg-black border-y border-border/80 text-foreground scroll-mt-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-12 gap-12 items-center">
                        <div className="lg:col-span-5 space-y-6">
                            <div className="flex items-center justify-between gap-4">
                                <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-semibold">Clean Code Editor</span>
                                <AxelStage
                                    id="experience-sandbox-robot-anchor"
                                    sectionId="experience-sandbox"
                                    label="Code Environment"
                                    emotion="shocked"
                                    scale={0.42}
                                    size="sm"
                                />
                            </div>
                            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-white">
                                Focus Without Distraction
                            </h2>
                            <p className="text-sm text-slate-300 leading-relaxed">
                                A clean, modern workspace with zero clutter. Write code, view instant output, and test your solutions with ease.
                            </p>
                            <ul className="space-y-3 text-xs text-slate-200 font-mono">
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span>No ads, banners, or annoying popups</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span>Clean syntax highlighting and keyboard shortcuts</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                                    <span>Instant automated tests check your code against real cases</span>
                                </li>
                            </ul>
                        </div>

                        {/* Visual Code Mockup */}
                        <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#0e0d0c] overflow-hidden shadow-2xl">
                            <div className="px-4 py-3 bg-[#141413] border-b border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50 inline-block" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                                    <span className="ml-3 text-slate-200">binary_search_tree.py</span>
                                </div>
                                <span className="text-[10px] text-blue-400 font-mono font-medium">Python 3.12 (Wasm)</span>
                            </div>
                            <div className="p-6 font-mono text-xs leading-relaxed space-y-2 text-slate-200 overflow-x-auto">
                                <div className="text-zinc-500"># Validating AVL balancing invariants</div>
                                <div><span className="text-blue-400 font-semibold">class</span> <span className="text-[#f5f0e8]">AVLNode</span>:</div>
                                <div className="pl-4">def __init__(self, key):</div>
                                <div className="pl-8">self.key = key</div>
                                <div className="pl-8">self.left = None</div>
                                <div className="pl-8">self.right = None</div>
                                <div className="pl-8">self.height = 1</div>
                                <div className="pt-2"><span className="text-blue-400 font-semibold">def</span> <span className="text-[#f5f0e8]">get_balance_factor</span>(node):</div>
                                <div className="pl-4">if not node: return 0</div>
                                <div className="pl-4">return get_height(node.left) - get_height(node.right)</div>
                                <div className="pt-3 p-3 rounded-xl bg-white/5 border border-white/10 text-emerald-400 text-[11px] flex items-center gap-2">
                                    <span>✓ All 12 test assertions passed in 1.4ms (O(log n) height verified)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Component integration */}
            <div className="py-12">
                <Features />
            </div>

            <Footer />
        </main>
    )
}
