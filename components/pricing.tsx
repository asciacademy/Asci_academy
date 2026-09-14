"use client"

import { Check, Terminal, Layers, Server, ArrowRight, Zap } from "lucide-react"
import { useState } from "react"

const plans = [
  {
    name: "Free Plan",
    priceMonthly: "Free",
    priceYearly: "Free",
    period: "",
    description: "Basic access to starter courses, coding practice, and the student community.",
    icon: Terminal,
    features: [
      "Access to 3 starter coding courses",
      "Student community forum access",
      "Weekly group study sessions",
      "50+ beginner coding problems",
      "Free completion certificate",
    ],
    cta: "Start for Free",
    href: "/signup",
    highlight: false,
    savingsBadge: null,
  },
  {
    name: "Pro Learner",
    priceMonthly: "₹4,999",
    priceYearly: "₹3,999",
    period: "/month",
    description: "Full access to all courses, 1-on-1 mentor guidance, and career prep.",
    icon: Layers,
    features: [
      "All programming courses & learning tracks",
      "Weekly 1-on-1 video call with an experienced mentor",
      "200+ interview coding problems with video walkthroughs",
      "Live coding sessions 5 times a week",
      "Resume and portfolio feedback",
      "Realistic mock coding interviews",
      "Job recommendations and alumni network",
    ],
    cta: "Get Started with Pro",
    href: "/pricing",
    highlight: true,
    savingsBadge: "Save 20%",
  },
  {
    name: "Team Plan",
    priceMonthly: "Custom",
    priceYearly: "Custom",
    period: "",
    description: "Tailored team training and coaching for companies and universities.",
    icon: Server,
    features: [
      "Everything included in Pro Learner",
      "Dedicated mentor assigned to your team",
      "Custom curriculum tailored to your tech stack",
      "Manager dashboard to monitor progress",
      "Discounted group team pricing",
      "Priority email and phone support",
    ],
    cta: "Talk to Us",
    href: "mailto:sales@asci.dev",
    highlight: false,
    savingsBadge: null,
  },
]

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="pricing" className="relative py-20 lg:py-28 bg-background">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        {/* Header with Dedicated Axel Stage */}
        <div className="relative mb-14 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-medium mb-3">
              <Zap className="h-3.5 w-3.5" />
              <span>Simple Pricing</span>
            </div>
            <h2
              className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              style={{ letterSpacing: "-1px" }}
            >
              Simple, Transparent Plans
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-body leading-relaxed">
              Everything you need to learn to code. No hidden fees, cancel anytime.
            </p>

            {/* Monthly / Yearly Toggle */}
            <div className="mt-6 inline-flex items-center gap-1 rounded-lg border border-hairline bg-secondary p-1">
              <button
                onClick={() => setIsYearly(false)}
                suppressHydrationWarning
                className={`rounded-md px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  !isYearly
                    ? "bg-card text-foreground shadow-xs border border-hairline"
                    : "text-muted-foreground hover:text-foreground bg-transparent"
                }`}
              >
                Monthly billing
              </button>
              <button
                onClick={() => setIsYearly(true)}
                suppressHydrationWarning
                className={`flex items-center gap-1.5 rounded-md px-4 py-1.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isYearly
                    ? "bg-card text-foreground shadow-xs border border-hairline"
                    : "text-muted-foreground hover:text-foreground bg-transparent"
                }`}
              >
                <span>Annual billing</span>
                <span className="badge-coral text-[10px] py-0 px-2">
                  -20%
                </span>
              </button>
            </div>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
          <div className="relative shrink-0 w-64 h-52 flex items-center justify-center self-center lg:self-auto">
            <div
              id="pricing-robot-anchor"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* 3-Tier Grid: Featured is Dark Navy Surface (#181715) */}
        <div className="grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = isYearly ? plan.priceYearly : plan.priceMonthly
            const isHighlighted = plan.highlight

            return (
              <div
                key={plan.name}
                className={`group relative flex flex-col rounded-xl border transition-all duration-300 ${
                  isHighlighted
                    ? "border-primary/60 bg-secondary shadow-md ring-1 ring-primary/20 md:-translate-y-2"
                    : "border-hairline bg-card text-foreground hover:border-foreground/20 hover:shadow-sm"
                }`}
              >
                {/* Savings Badge */}
                {isYearly && plan.savingsBadge && (
                  <div className="absolute -top-3 right-6">
                    <span className="badge-coral text-[10px]">
                      {plan.savingsBadge}
                    </span>
                  </div>
                )}

                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                          isHighlighted
                            ? "border-primary/30 bg-primary/10 text-primary"
                            : "border-hairline bg-secondary text-primary"
                        }`}
                      >
                        <plan.icon className="h-4 w-4" />
                      </div>
                      <h3 className="text-base font-medium text-foreground">
                        {plan.name}
                      </h3>
                    </div>

                    {isHighlighted && (
                      <span className="badge-coral text-[10px]">
                        Recommended
                      </span>
                    )}
                  </div>

                  {/* Price in Serif Display */}
                  <div className="mt-6 flex items-baseline gap-1">
                    <span
                      className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-foreground"
                      style={{ letterSpacing: "-0.5px" }}
                    >
                      {price}
                    </span>
                    {plan.period && (
                      <span className="text-xs font-normal text-muted-foreground">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-body">
                    {plan.description}
                  </p>

                  {/* Hairline divider */}
                  <div className="my-6 h-px bg-hairline" />

                  {/* Feature list */}
                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-xs text-body"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href={plan.href}
                    suppressHydrationWarning
                    className={`mt-8 flex items-center justify-center gap-2 rounded-md py-2.5 text-xs font-medium transition-all duration-200 cursor-pointer ${
                      isHighlighted
                        ? "btn-primary"
                        : "border border-hairline bg-background text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
