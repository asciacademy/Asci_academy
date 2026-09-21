"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import {
  ShieldCheck,
  Check,
  Loader2,
  Zap,
  ArrowRight,
  HelpCircle,
  X,
  Copy,
  CheckCircle2,
  Clock,
  QrCode,
  CreditCard,
  AlertCircle,
} from "lucide-react"
import { AxelStage } from "@/components/axel/axel-stage"

// ─── Types ────────────────────────────────────────────────────────────────────
type Plan = "pro" | "mentorship"
type BillingCycle = "monthly" | "annual"
type ModalStep = "qr" | "utr" | "submitted"

interface PaymentOrderResponse {
  orderId: string
  amountINR: number
  upiDeepLink: string
  upiId: string
  upiName: string
  plan: Plan
  billingCycle: BillingCycle
}

// ─── QR Modal Component ───────────────────────────────────────────────────────
function QRPaymentModal({
  order,
  onClose,
}: {
  order: PaymentOrderResponse
  onClose: () => void
}) {
  const [step, setStep] = useState<ModalStep>("qr")
  const [utrNumber, setUtrNumber] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string>("")
  const [qrLoading, setQrLoading] = useState(true)

  // Generate QR code client-side using the qrcode package
  useEffect(() => {
    let cancelled = false
    import("qrcode").then((QRCode) => {
      QRCode.toDataURL(order.upiDeepLink, {
        width: 240,
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
        errorCorrectionLevel: "M",
      }).then((url) => {
        if (!cancelled) {
          setQrDataUrl(url)
          setQrLoading(false)
        }
      })
    })
    return () => { cancelled = true }
  }, [order.upiDeepLink])

  const copyUpiId = () => {
    navigator.clipboard.writeText(order.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmitUTR = async () => {
    if (!utrNumber.trim()) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/payment/submit-utr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: order.orderId, utrNumber }),
      })
      if (res.ok) {
        setStep("submitted")
      } else {
        alert("Failed to submit UTR. Please try again.")
      }
    } catch {
      alert("Network error. Please check your connection and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card text-foreground shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary border border-primary/20">
              <QrCode className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Complete Payment</h3>
              <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                UPI · ₹{order.amountINR.toLocaleString("en-IN")} / {order.billingCycle === "annual" ? "yr" : "mo"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5">
          {step === "qr" && (
            <>
              {/* Amount badge */}
              <div className="mb-4 flex items-center justify-between rounded-xl bg-primary/5 border border-primary/15 px-4 py-3">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                    {order.plan === "pro" ? "Pro Learner" : "Team & Mentorship"} — {order.billingCycle}
                  </p>
                  <p className="text-xl font-serif font-normal text-foreground">
                    ₹{order.amountINR.toLocaleString("en-IN")}
                  </p>
                </div>
                <Zap className="h-5 w-5 text-primary" />
              </div>

              {/* QR Code */}
              <div className="flex flex-col items-center gap-3 mb-4">
                <div className="flex h-[200px] w-[200px] items-center justify-center rounded-xl border border-border bg-white p-2">
                  {qrLoading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  ) : qrDataUrl ? (
                    <img
                      src={qrDataUrl}
                      alt="UPI QR Code"
                      className="h-full w-full rounded-lg"
                    />
                  ) : (
                    <div className="text-center text-xs text-muted-foreground">
                      <QrCode className="h-10 w-10 mx-auto mb-2 opacity-40" />
                      QR unavailable
                    </div>
                  )}
                </div>
                <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
                  Scan with any UPI app — PhonePe, GPay, Paytm, BHIM
                </p>
              </div>

              {/* UPI ID copy */}
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2.5 mb-4">
                <CreditCard className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                <span className="flex-1 text-xs font-mono text-foreground truncate">{order.upiId}</span>
                <button
                  onClick={copyUpiId}
                  className="flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <><CheckCircle2 className="h-3.5 w-3.5" />Copied</>
                  ) : (
                    <><Copy className="h-3.5 w-3.5" />Copy</>
                  )}
                </button>
              </div>

              <button
                onClick={() => setStep("utr")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest py-3 hover:bg-primary/90 transition-all font-semibold cursor-pointer"
              >
                I&apos;ve Paid — Enter UTR Number
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </>
          )}

          {step === "utr" && (
            <>
              <div className="mb-4 flex items-start gap-3 rounded-xl bg-amber-500/10 border border-amber-500/20 px-4 py-3">
                <AlertCircle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Find your UTR number</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-relaxed">
                    Open your UPI app → Transaction history → Find this payment → Copy the 12-digit UTR / Reference ID
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <label className="block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  UTR / Reference Number
                </label>
                <input
                  type="text"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  placeholder="e.g. 123456789012"
                  maxLength={22}
                  className="w-full rounded-xl border border-border bg-secondary text-foreground px-4 py-3 text-sm font-mono placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
                />
                <p className="text-[10px] text-muted-foreground">
                  Order ID: <span className="font-mono text-foreground/70">{order.orderId.slice(0, 8)}…</span>
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep("qr")}
                  className="flex-1 rounded-xl border border-border bg-transparent text-foreground font-mono text-xs uppercase tracking-widest py-3 hover:bg-secondary transition-all cursor-pointer"
                >
                  ← Back
                </button>
                <button
                  onClick={handleSubmitUTR}
                  disabled={submitting || utrNumber.trim().length < 8}
                  className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest py-3 hover:bg-primary/90 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {submitting ? (
                    <><Loader2 className="h-4 w-4 animate-spin" />Submitting…</>
                  ) : (
                    <>Submit UTR</>
                  )}
                </button>
              </div>
            </>
          )}

          {step === "submitted" && (
            <div className="flex flex-col items-center text-center py-4 gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                <CheckCircle2 className="h-8 w-8 text-emerald-500" />
              </div>
              <div>
                <h4 className="text-base font-serif font-normal text-foreground">Payment Submitted!</h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-xs mx-auto">
                  Our team will verify your payment within 24 hours. You&apos;ll receive access once verified.
                </p>
              </div>
              <div className="flex items-center gap-2 rounded-lg bg-secondary border border-border px-4 py-2.5 text-xs text-muted-foreground">
                <Clock className="h-3.5 w-3.5 shrink-0" />
                Verification usually takes 1–4 hours during business hours
              </div>
              <button
                onClick={onClose}
                className="w-full rounded-xl border border-border bg-transparent text-foreground font-mono text-xs uppercase tracking-widest py-3 hover:bg-secondary transition-all cursor-pointer"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const [loading, setLoading] = useState<Plan | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const [activeOrder, setActiveOrder] = useState<PaymentOrderResponse | null>(null)

  const handleUpgrade = useCallback(async (plan: Plan) => {
    setLoading(plan)
    try {
      const res = await fetch("/api/payment/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing_cycle: billingCycle }),
      })

      if (res.status === 401) {
        window.location.href = `/login?redirect=/pricing`
        return
      }

      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Failed to create payment order")
      }

      const data: PaymentOrderResponse = await res.json()
      setActiveOrder(data)
    } catch (error) {
      console.error("Failed to initiate payment", error)
      alert("Could not initiate payment. Please try again or contact support.")
    } finally {
      setLoading(null)
    }
  }, [billingCycle])

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col font-sans transition-colors duration-200">
      <Navbar />
      <div className="h-[68px]" />

      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full flex-1">
        {/* 1. Hero */}
        <section id="pricing-hero" className="mb-16 scroll-mt-24">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-4 border-b border-border/50">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                Pricing &amp; Plans
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal text-foreground tracking-tight">
                Simple, Clear Pricing for Everyone
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Honest, transparent pricing. Pay via UPI — no card required. Verification within 24 hours.
              </p>

              {/* Cycle Toggle */}
              <div className="pt-2 flex items-center gap-3">
                <span
                  className={`text-xs font-mono tracking-wider ${billingCycle === "monthly" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                >
                  Monthly
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setBillingCycle((b) => (b === "monthly" ? "annual" : "monthly"))
                  }
                  className="relative w-12 h-6 bg-secondary border border-border rounded-full p-0.5 transition-colors focus:outline-none cursor-pointer"
                  aria-label="Toggle billing cycle"
                >
                  <div
                    className={`w-5 h-5 bg-primary rounded-full transition-transform ${billingCycle === "annual" ? "translate-x-6" : "translate-x-0"}`}
                  />
                </button>
                <span
                  className={`text-xs font-mono tracking-wider flex items-center gap-1.5 ${billingCycle === "annual" ? "text-foreground font-semibold" : "text-muted-foreground"}`}
                >
                  Annual
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-primary/10 text-primary font-bold">
                    SAVE 25%
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

        {/* 2. Plans Grid */}
        <section id="pricing-plans" className="mb-20 scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-primary">
                Choose Your Plan
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-normal text-foreground mt-1">
                Pick the Plan That Fits Your Goals
              </h2>
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
            {/* Free Tier */}
            <div className="p-8 rounded-2xl bg-card/90 dark:bg-[#050505]/90 border border-hairline dark:border-white/[0.08] flex flex-col justify-between transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Tier 01
                </div>
                <h3 className="font-serif text-2xl font-normal text-foreground mb-2">
                  Free Plan
                </h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  Perfect for beginners getting started with coding fundamentals.
                </p>
                <div className="text-4xl font-serif text-foreground mb-6">
                  ₹0
                  <span className="text-xs font-mono font-normal text-muted-foreground">
                    {" "}
                    / forever
                  </span>
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

            {/* Pro Learner (Recommended) */}
            <div className="p-8 rounded-2xl bg-secondary/80 dark:bg-black/90 border border-foreground/40 dark:border-white/30 relative flex flex-col justify-between md:-translate-y-2 shadow-sm transition-all duration-200">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold flex items-center gap-1 shadow-xs">
                <Zap className="h-3 w-3" /> Recommended
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-primary mb-2 font-semibold">
                  Tier 02
                </div>
                <h3 className="font-serif text-2xl font-normal text-foreground mb-2">
                  Pro Learner
                </h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  Everything you need to master data structures, algorithms, and build real projects.
                </p>
                <div className="text-4xl font-serif text-foreground mb-1">
                  {billingCycle === "annual" ? "₹1,499" : "₹1,999"}
                  <span className="text-xs font-mono font-normal text-muted-foreground">
                    {" "}
                    / month
                  </span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-[10px] text-primary font-mono mb-6">
                    Billed ₹17,988 / year — save ₹6,000
                  </p>
                )}
                {billingCycle === "monthly" && <div className="mb-6" />}

                <div className="h-px bg-border mb-6" />

                <ul className="space-y-3 text-xs text-foreground/90 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Everything in Free, plus:</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium">
                      All 400+ practice problems &amp; step-by-step solutions
                    </span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Built-in interactive code editor for Python &amp; Java</span>
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
                onClick={() => handleUpgrade("pro")}
                disabled={loading !== null}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary/90 transition-all flex justify-center items-center gap-2 shadow-xs active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading === "pro" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Preparing QR…
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4" />
                    Pay via UPI — Upgrade to Pro
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>

            {/* Team & Mentorship */}
            <div className="p-8 rounded-2xl bg-card/90 dark:bg-[#050505]/90 border border-hairline dark:border-white/[0.08] flex flex-col justify-between transition-all duration-200 hover:border-foreground/30 dark:hover:border-white/25 hover:-translate-y-0.5 shadow-2xs">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">
                  Tier 03
                </div>
                <h3 className="font-serif text-2xl font-normal text-foreground mb-2">
                  Team &amp; Mentorship
                </h3>
                <p className="text-xs text-muted-foreground mb-6 leading-relaxed">
                  Personal guidance, code reviews, and interview prep for serious career switchers.
                </p>
                <div className="text-4xl font-serif text-foreground mb-1">
                  {billingCycle === "annual" ? "₹4,499" : "₹5,999"}
                  <span className="text-xs font-mono font-normal text-muted-foreground">
                    {" "}
                    / month
                  </span>
                </div>
                {billingCycle === "annual" && (
                  <p className="text-[10px] text-primary font-mono mb-6">
                    Billed ₹53,988 / year — save ₹17,988
                  </p>
                )}
                {billingCycle === "monthly" && <div className="mb-6" />}

                <div className="h-px bg-border mb-6" />

                <ul className="space-y-3 text-xs text-foreground/85 mb-8">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span>Everything in Pro, plus:</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    <span className="font-medium">
                      Weekly 1-on-1 personal code reviews with experts
                    </span>
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

              <button
                onClick={() => handleUpgrade("mentorship")}
                disabled={loading !== null}
                className="w-full py-3 rounded-xl border border-primary bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest text-center hover:bg-primary/90 transition-all font-semibold flex justify-center items-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading === "mentorship" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Preparing QR…
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4" />
                    Pay via UPI — Get Mentorship
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 3. FAQ */}
        <section id="pricing-faq" className="scroll-mt-24">
          <div className="border border-border rounded-2xl bg-card/60 p-8 sm:p-10 max-w-4xl mx-auto space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/50 pb-4">
              <div className="flex items-center gap-3">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h3 className="font-serif text-xl font-normal text-foreground">
                  Frequently Asked Questions
                </h3>
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
                <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">
                  How does UPI payment work?
                </h4>
                <p className="text-muted-foreground">
                  Scan the QR code or copy the UPI ID, make the payment in any UPI app, then submit your 12-digit UTR reference number. We&apos;ll verify and activate your plan within 24 hours.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">
                  Is there a money-back guarantee?
                </h4>
                <p className="text-muted-foreground">
                  We provide a 14-day full refund guarantee if you find the curriculum does not meet your technical expectations.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">
                  Do certificates expire?
                </h4>
                <p className="text-muted-foreground">
                  No. All certificates are permanent and shareable on LinkedIn and your resume.
                </p>
              </div>
              <div className="space-y-1.5">
                <h4 className="font-mono uppercase tracking-wider font-semibold text-foreground">
                  Can I cancel my plan?
                </h4>
                <p className="text-muted-foreground">
                  Yes. You can cancel your membership from your profile settings at any time. No questions asked.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* QR Payment Modal */}
      {activeOrder && (
        <QRPaymentModal
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}
    </main>
  )
}
