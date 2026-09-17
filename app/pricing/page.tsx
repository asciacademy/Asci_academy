"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ShieldCheck, Check, Loader2, Zap, ArrowRight, HelpCircle } from "lucide-react"

import { AxelStage } from "@/components/axel/axel-stage"

export default function PricingPage() {
    const [loading, setLoading] = useState(false)
    const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

    const handleUpgrade = async () => {
        setLoading(true)
        try {
            const res = await fetch("/api/razorpay/create-subscription", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan_id: "plan_placeholder_replace_me" }),
            })

            const data = await res.json()
            if (!data.subscriptionId) {
                throw new Error("Failed to create subscription.")
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                subscription_id: data.subscriptionId,
                name: "ASCI LMS",
                description: "Architect Premium Subscription",
                image: "/logo.png",
                handler: function (response: any) {
                    console.log("Payment successful:", response.razorpay_payment_id)
                    window.location.href = "/profile"
                },
                prefill: {
                    name: "Architect Learner",
                    email: "",
                    contact: ""
                },
                theme: {
                    color: "#2563eb"
                }
            }

            const rzp = new (window as any).Razorpay(options)
            rzp.on('payment.failed', function (response: any) {
                console.error("Payment failed:", response.error.description)
                setLoading(false)
            });
            rzp.open()

        } catch (error) {
            console.error("Failed to checkout", error)
            setLoading(false)
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
            <Navbar />
            <div className="h-[68px]" />

            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full flex-1">
                {/* 1. Tuition Hero Section with dedicated Axel Stage */}
                <section id="pricing-hero" className="mb-16 scroll-mt-24">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4 border-b border-border/50">
                        <div className="max-w-3xl space-y-4">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                                Pricing & Plans
                            </div>
                            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground tracking-tight">
                                Simple, Clear Pricing for Everyone
                            </h1>
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                Honest, transparent pricing. Everything you need to learn coding, master data structures, and prepare for developer jobs.
                            </p>

                            {/* Cycle Toggle */}
                            <div className="pt-2 flex items-center gap-3">
                                <span className={`text-xs font-mono tracking-wider ${billingCycle === "monthly" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                                    Monthly
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setBillingCycle(b => b === "monthly" ? "annual" : "monthly")}
                                    className="relative w-12 h-6 bg-secondary border border-border rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer"
                                    aria-label="Toggle billing cycle"
                                >
                                    <div className={`w-5 h-5 bg-primary rounded-full transition-transform ${billingCycle === "annual" ? "translate-x-6" : "translate-x-0"}`} />
                                </button>
                                <span className={`text-xs font-mono tracking-wider flex items-center gap-1.5 ${billingCycle === "annual" ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                                    Annual
                                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                                        SAVE 20%
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Dedicated Axel Stage */}
                        <AxelStage
                            id="pricing-hero-robot-anchor"
                            sectionId="pricing-hero"
                            label="Pricing Overview"
                            emotion="cute"
                            scale={0.46}
                        />
                    </div>
                </section>

                {/* 2. 3-Tier Grid Section with dedicated Axel Stage */}
                <section id="pricing-plans" className="mb-20 scroll-mt-24">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-primary">Choose Your Plan</span>
                            <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground mt-1">Pick the Plan That Fits Your Goals</h2>
                        </div>
                        <AxelStage
                            id="pricing-plans-robot-anchor"
                            sectionId="pricing-plans"
                            label="Membership Plans"
                            emotion="happy"
                            scale={0.46}
                            size="sm"
                        />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Initiate Tier */}
                        <div className="p-8 rounded-2xl bg-card/90 dark:bg-[#181715]/90 border border-hairline dark:border-white/[0.08] flex flex-col justify-between transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Tier 01</div>
                            <h3 className="font-serif text-2xl font-normal text-foreground mb-2">Free Plan</h3>
                            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                                Perfect for beginners getting started with coding fundamentals.
                            </p>
                            <div className="text-4xl font-serif text-foreground mb-6">
                                ₹0
                                <span className="text-xs font-mono font-normal text-muted-foreground"> / forever</span>
                            </div>

                            <div className="h-px bg-border mb-6" />

                            <ul className="space-y-3 text-xs text-foreground/85 mb-8">
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Free access to basic coding guides and lessons</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Access to friendly student community discussion</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Dozens of beginner-friendly practice problems</span>
                                </li>
                                <li className="flex items-center gap-2.5 text-muted-foreground/60">
                                    <ShieldCheck className="h-4 w-4 shrink-0" />
                                    <span>Interactive code editor not included</span>
                                </li>
                                <li className="flex items-center gap-2.5 text-muted-foreground/60">
                                    <ShieldCheck className="h-4 w-4 shrink-0" />
                                    <span>Mentor code review not included</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            disabled
                            className="w-full py-3 rounded-xl border border-border bg-secondary/50 text-muted-foreground font-mono text-xs uppercase tracking-widest cursor-default"
                        >
                            Current Free Plan
                        </button>
                    </div>

                    {/* Architect Tier (Recommended) */}
                    <div className="p-8 rounded-2xl bg-secondary/80 dark:bg-[#1c1b18] border border-foreground/40 dark:border-white/30 relative flex flex-col justify-between md:-translate-y-2 shadow-sm transition-all duration-200">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold flex items-center gap-1 shadow-xs">
                            <Zap className="h-3 w-3" /> Recommended
                        </div>

                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2 font-semibold">Tier 02</div>
                            <h3 className="font-serif text-2xl font-normal text-foreground mb-2">Pro Learner</h3>
                            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                                Everything you need to master data structures, algorithms, and build real projects.
                            </p>
                            <div className="text-4xl font-serif text-foreground mb-6">
                                {billingCycle === "annual" ? "₹999" : "₹1,299"}
                                <span className="text-xs font-mono font-normal text-muted-foreground"> / month</span>
                            </div>

                            <div className="h-px bg-border mb-6" />

                            <ul className="space-y-3 text-xs text-foreground/90 mb-8">
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Everything in Free, plus:</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span className="font-medium">All 400+ practice problems & step-by-step solutions</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Built-in interactive code editor for Python & Java</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Visual algorithm animations and memory steps</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Course completion certificates to share on LinkedIn</span>
                                </li>
                            </ul>
                        </div>

                        <button
                            onClick={handleUpgrade}
                            disabled={loading}
                            className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary-active transition-all flex justify-center items-center gap-2 shadow-xs active:scale-[0.99] cursor-pointer"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Upgrade to Pro
                                    <ArrowRight className="h-3.5 w-3.5" />
                                </>
                            )}
                        </button>
                    </div>

                    {/* Fellowship Tier */}
                    <div className="p-8 rounded-2xl bg-card/90 dark:bg-[#181715]/90 border border-hairline dark:border-white/[0.08] flex flex-col justify-between transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs">
                        <div>
                            <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Tier 03</div>
                            <h3 className="font-serif text-2xl font-normal text-foreground mb-2">Team & Mentorship</h3>
                            <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                                Personal guidance, code reviews, and interview prep for serious career switchers.
                            </p>
                            <div className="text-4xl font-serif text-foreground mb-6">
                                {billingCycle === "annual" ? "₹2,999" : "₹3,999"}
                                <span className="text-xs font-mono font-normal text-muted-foreground"> / month</span>
                            </div>

                            <div className="h-px bg-border mb-6" />

                            <ul className="space-y-3 text-xs text-foreground/85 mb-8">
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Everything in Pro, plus:</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span className="font-medium">Weekly 1-on-1 personal code reviews with experts</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Live mock interview practice sessions</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Direct resume reviews and job referral recommendations</span>
                                </li>
                                <li className="flex items-center gap-2.5">
                                    <Check className="h-4 w-4 text-primary shrink-0" />
                                    <span>Private student and alumni chat group</span>
                                </li>
                            </ul>
                        </div>

                        <Link
                            href="/login"
                            className="w-full py-3 rounded-xl border border-primary bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest text-center hover:bg-primary-active transition-all font-semibold block"
                        >
                            Apply for Mentorship
                        </Link>
                    </div>
                </div>
            </section>

                {/* 3. FAQ & Assurance Strip with dedicated Axel Stage */}
                <section id="pricing-faq" className="scroll-mt-24">
                    <div className="border border-border rounded-2xl bg-card/60 p-8 sm:p-10 max-w-4xl mx-auto space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
                            <div className="flex items-center gap-3">
                                <HelpCircle className="h-5 w-5 text-primary" />
                                <h3 className="font-serif text-xl font-normal text-foreground">Frequently Asked Questions</h3>
                            </div>
                            <AxelStage
                                id="pricing-faq-robot-anchor"
                                sectionId="pricing-faq"
                                label="Questions & Answers"
                                emotion="normal"
                                scale={0.46}
                                size="sm"
                            />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6 text-xs leading-relaxed text-foreground/80">
                            <div className="space-y-1.5">
                                <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">Can I cancel my subscription anytime?</h4>
                                <p className="text-muted-foreground">Yes. You can manage or cancel your membership with a single click from your profile settings without penalty.</p>
                            </div>
                            <div className="space-y-1.5">
                                <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">Is there a money-back guarantee?</h4>
                                <p className="text-muted-foreground">We provide a 14-day full refund guarantee if you find the curriculum does not meet your technical expectations.</p>
                            </div>
                            <div className="space-y-1.5">
                                <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">Do certificates expire?</h4>
                                <p className="text-muted-foreground">No. All certificates are permanent and shareable on LinkedIn and your resume.</p>
                            </div>
                            <div className="space-y-1.5">
                                <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">Are enterprise teams supported?</h4>
                                <p className="text-muted-foreground">Yes, we offer team billing and progress tracking for companies and study groups.</p>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <Footer />
        </main>
    )
}
