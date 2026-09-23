"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
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
  QrCode,
  CreditCard,
  AlertCircle,
  Smartphone,
  Sparkles,
  Crown,
} from "lucide-react"
import { AxelStage } from "@/components/axel/axel-stage"
import { useAuth } from "@/context/auth-context"

// ─── Types ────────────────────────────────────────────────────────────────────
type Plan = "pro" | "mentorship"
type BillingCycle = "monthly" | "annual"
type ModalStep = "checkout" | "verifying" | "verified"
type PaymentTab = "razorpay" | "direct_qr"

interface RazorpayOrderData {
  orderId: string
  razorpayOrderId: string
  keyId: string
  isDemo: boolean
  amountINR: number
  amountInPaise: number
  originalAmountINR: number
  discountINR: number
  planTitle: string
  description: string
  plan: Plan
  billingCycle: BillingCycle
  upiDeepLink: string
  upiId: string
  upiName: string
  user: {
    name: string
    email: string
  }
}

// Helper to load Razorpay checkout script dynamically
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") return resolve(false)
    if ((window as any).Razorpay) return resolve(true)
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

// ─── Razorpay Payment Gateway Modal ──────────────────────────────────────────
function PaymentGatewayModal({
  order,
  onClose,
}: {
  order: RazorpayOrderData
  onClose: () => void
}) {
  const router = useRouter()
  const { refreshProfile } = useAuth()
  const [step, setStep] = useState<ModalStep>("checkout")
  const [activeTab, setActiveTab] = useState<PaymentTab>("razorpay")
  const [qrDataUrl, setQrDataUrl] = useState<string>("")
  const [qrLoading, setQrLoading] = useState(true)
  const [copied, setCopied] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [verifiedPaymentId, setVerifiedPaymentId] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // Generate dynamic QR code client-side using the qrcode package
  useEffect(() => {
    let cancelled = false
    import("qrcode").then((QRCode) => {
      QRCode.toDataURL(order.upiDeepLink, {
        width: 240,
        margin: 2,
        color: { dark: "#062112", light: "#ffffff" },
        errorCorrectionLevel: "M",
      }).then((url) => {
        if (!cancelled) {
          setQrDataUrl(url)
          setQrLoading(false)
        }
      })
    })
    return () => {
      cancelled = true
    }
  }, [order.upiDeepLink])

  const copyUpiId = () => {
    navigator.clipboard.writeText(order.upiId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Launch Razorpay Checkout with built-in UPI QR Code
  const handleLaunchRazorpay = async () => {
    setErrorMsg(null)

    if (order.isDemo) {
      // In demo mode when API keys are pending, run simulated verification
      setStep("verifying")
      try {
        const res = await fetch("/api/payment/razorpay/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: order.orderId,
            razorpayOrderId: order.razorpayOrderId,
            razorpayPaymentId: `pay_demo_${Date.now()}`,
            isDemo: true,
            plan: order.plan,
            billingCycle: order.billingCycle,
          }),
        })
        const data = await res.json()
        if (res.ok && data.success) {
          await refreshProfile()
          setVerifiedPaymentId(data.paymentId || "PAY_DEMO_OK")
          setStep("verified")
        } else {
          throw new Error(data.message || "Verification failed")
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to verify payment")
        setStep("checkout")
      }
      return
    }

    const loaded = await loadRazorpayScript()
    if (!loaded) {
      setErrorMsg("Could not load Razorpay gateway script. Please check your internet connection.")
      return
    }

    const options = {
      key: order.keyId,
      amount: order.amountInPaise,
      currency: "INR",
      name: "ASCI Academy",
      description: `${order.planTitle} - Premium Access`,
      image: "/images/asci-logo.png",
      order_id: order.razorpayOrderId,
      prefill: {
        name: order.user?.name || "Student",
        email: order.user?.email || "",
      },
      theme: {
        color: "#10b981",
      },
      handler: async function (response: any) {
        setStep("verifying")
        try {
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: order.plan,
              billing_cycle: order.billingCycle,
            }),
          })
          const data = await res.json()
          if (res.ok && data.success) {
            await refreshProfile()
            setVerifiedPaymentId(response.razorpay_payment_id)
            setStep("verified")
          } else {
            throw new Error(data.error || data.message || "Verification failed")
          }
        } catch (err: any) {
          setErrorMsg(err.message || "Payment verification failed. Please contact support.")
          setStep("checkout")
        }
      },
      modal: {
        ondismiss: function () {
          console.log("Razorpay checkout modal dismissed")
        },
      },
    }

    try {
      const rzp = new (window as any).Razorpay(options)
      rzp.on("payment.failed", function (response: any) {
        setErrorMsg(response.error?.description || "Payment failed at gateway. Please try again.")
      })
      rzp.open()
    } catch (err: any) {
      setErrorMsg("Could not open Razorpay checkout: " + err.message)
    }
  }

  // Handle direct QR verification
  const handleVerifyDirectPayment = async () => {
    setVerifying(true)
    setErrorMsg(null)
    try {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: order.razorpayOrderId,
          razorpay_payment_id: `upi_direct_${Date.now()}`,
          razorpay_signature: "direct_upi_verified",
          plan: order.plan,
          billing_cycle: order.billingCycle,
        }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        await refreshProfile()
        setVerifiedPaymentId(data.payment_id || "UPI_CONFIRMED")
        setStep("verified")
      } else {
        throw new Error(data.error || data.message || "Could not verify payment")
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Payment verification check failed. Please try again.")
    } finally {
      setVerifying(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-card text-foreground shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border bg-card/90">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
              <CreditCard className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-foreground">Razorpay Payment Gateway</h3>
                {order.isDemo && (
                  <span className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider rounded-md bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    Test Mode
                  </span>
                )}
              </div>
              <p className="text-[10px] text-muted-foreground font-mono">
                Order ID: {order.orderId}
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

        {/* Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          {errorMsg && (
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1">{errorMsg}</div>
            </div>
          )}

          {step === "checkout" && (
            <>
              {/* 1. Itemized Amount Details Breakdown */}
              <div className="rounded-xl border border-border bg-secondary/40 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                    Order Summary &amp; Amount Details
                  </span>
                  <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded-full border border-primary/20">
                    {order.billingCycle === "annual" ? "Annual Plan" : "Monthly Plan"}
                  </span>
                </div>

                <div className="h-px bg-border/60" />

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center text-foreground">
                    <span className="font-medium">{order.planTitle}</span>
                    <span className="font-mono">
                      ₹{order.originalAmountINR.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {order.discountINR > 0 && (
                    <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                      <span>Annual Savings Discount</span>
                      <span>-₹{order.discountINR.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center text-muted-foreground text-[11px]">
                    <span>Platform &amp; Payment Gateway Fee</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">FREE (₹0)</span>
                  </div>

                  <div className="flex justify-between items-center text-muted-foreground text-[11px]">
                    <span>GST / Taxes</span>
                    <span>Included</span>
                  </div>
                </div>

                <div className="h-px bg-border/60" />

                <div className="flex justify-between items-center pt-1">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                      Total Payable Amount
                    </p>
                    <p className="text-2xl font-serif font-bold text-foreground">
                      ₹{order.amountINR.toLocaleString("en-IN")}
                    </p>
                  </div>
                  <div className="text-right text-[10px] text-muted-foreground font-mono">
                    256-Bit SSL Encrypted
                  </div>
                </div>
              </div>

              {/* 2. Payment Method Tabs */}
              <div className="flex items-center gap-1 rounded-lg border border-border bg-secondary p-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("razorpay")}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === "razorpay"
                      ? "bg-card text-foreground shadow-xs border border-border font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <CreditCard className="h-3 w-3 text-primary" />
                  Razorpay Checkout (UPI QR / Cards)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("direct_qr")}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-md px-3 py-2 text-[10px] font-mono uppercase tracking-widest transition-all cursor-pointer ${
                    activeTab === "direct_qr"
                      ? "bg-card text-foreground shadow-xs border border-border font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <QrCode className="h-3 w-3 text-primary" />
                  Scan UPI QR Direct
                </button>
              </div>

              {/* Tab 1: Razorpay Checkout with UPI QR */}
              {activeTab === "razorpay" && (
                <div className="space-y-4 pt-1">
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs text-foreground/90 space-y-2">
                    <div className="flex items-center gap-2 font-medium text-foreground">
                      <Sparkles className="h-4 w-4 text-primary" />
                      Instant Online Verification via Razorpay
                    </div>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      Click the button below to launch the Razorpay Payment Gateway. You can choose{" "}
                      <strong className="text-foreground">UPI QR Code</strong>, Google Pay, PhonePe, Paytm, or Credit/Debit Cards.
                      Your premium courses will be unlocked automatically the moment payment is verified.
                    </p>
                  </div>

                  <button
                    onClick={handleLaunchRazorpay}
                    className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary/90 transition-all flex justify-center items-center gap-2.5 shadow-md active:scale-[0.99] cursor-pointer"
                  >
                    <QrCode className="h-4 w-4" />
                    Pay ₹{order.amountINR.toLocaleString("en-IN")} via Razorpay
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[10px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="h-3.5 w-3.5 text-primary" />
                      Razorpay Verified Gateway
                    </span>
                    <span>•</span>
                    <span>Instant Course Unlock</span>
                  </div>
                </div>
              )}

              {/* Tab 2: Direct Scannable UPI QR */}
              {activeTab === "direct_qr" && (
                <div className="space-y-4 pt-1 flex flex-col items-center">
                  <div className="flex h-[210px] w-[210px] items-center justify-center rounded-xl border border-border bg-white p-3 shadow-xs">
                    {qrLoading ? (
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    ) : qrDataUrl ? (
                      <img
                        src={qrDataUrl}
                        alt="Dynamic UPI QR Code"
                        className="h-full w-full rounded-lg"
                      />
                    ) : (
                      <div className="text-center text-xs text-muted-foreground">
                        <QrCode className="h-10 w-10 mx-auto mb-2 opacity-40" />
                        QR Code unavailable
                      </div>
                    )}
                  </div>

                  <p className="text-[11px] text-muted-foreground text-center">
                    Scan using any UPI app (GPay, PhonePe, Paytm, BHIM).
                    <br />
                    Amount <strong className="text-foreground">₹{order.amountINR.toLocaleString("en-IN")}</strong> is pre-configured.
                  </p>

                  {/* UPI ID copy */}
                  <div className="w-full flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2.5">
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

                  {/* Mobile Deep Link */}
                  <a
                    href={order.upiDeepLink}
                    className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary text-foreground font-mono text-xs uppercase tracking-widest py-3 hover:bg-secondary/80 transition-all font-semibold"
                  >
                    <Smartphone className="h-3.5 w-3.5 text-primary" />
                    Open in Mobile UPI App
                  </a>

                  {/* Instant Verification Trigger */}
                  <button
                    onClick={handleVerifyDirectPayment}
                    disabled={verifying}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest py-3.5 hover:bg-primary/90 transition-all font-semibold cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    {verifying ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Verifying Payment…
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-4 w-4" />
                        I Have Paid — Verify &amp; Unlock Premium
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          {/* Step: Verifying */}
          {step === "verifying" && (
            <div className="flex flex-col items-center text-center py-10 gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-serif font-normal text-foreground">
                  Verifying Payment with Gateway…
                </h4>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto leading-relaxed">
                  Checking payment confirmation and activating your premium courses subscription in real time.
                </p>
              </div>
            </div>
          )}

          {/* Step: Verified & Success */}
          {step === "verified" && (
            <div className="flex flex-col items-center text-center py-6 gap-5">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-primary/20 border border-emerald-500/30 shadow-lg shadow-emerald-500/10">
                  <Crown className="h-10 w-10 text-emerald-500" />
                </div>
                <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
                  <Check className="h-3.5 w-3.5 stroke-[3]" />
                </div>
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                  <Sparkles className="h-3 w-3" />
                  Payment Verified
                </div>
                <h4 className="text-xl font-serif font-normal text-foreground">
                  Welcome to {order.planTitle}!
                </h4>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed max-w-xs mx-auto">
                  Your payment of <strong>₹{order.amountINR.toLocaleString("en-IN")}</strong> has been confirmed.
                  All 400+ problems, algorithm animations, and premium courses are now fully unlocked!
                </p>
                {verifiedPaymentId && (
                  <p className="text-[10px] text-muted-foreground/80 font-mono mt-2">
                    Payment ID: {verifiedPaymentId}
                  </p>
                )}
              </div>

              <div className="w-full flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    onClose()
                    router.push("/courses")
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest py-3.5 hover:bg-primary/90 transition-all font-semibold cursor-pointer shadow-xs"
                >
                  <Sparkles className="h-4 w-4" />
                  Explore Premium Courses
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => {
                    onClose()
                    router.push("/dashboard")
                  }}
                  className="w-full rounded-xl border border-border bg-secondary text-foreground font-mono text-xs uppercase tracking-widest py-3 hover:bg-secondary/80 transition-all cursor-pointer"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PricingPage() {
  const router = useRouter()
  const [loading, setLoading] = useState<Plan | null>(null)
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly")
  const [activeOrder, setActiveOrder] = useState<RazorpayOrderData | null>(null)

  const handleUpgrade = useCallback((plan: Plan) => {
    router.push(`/checkout?plan=${plan}&billing=${billingCycle}`)
  }, [billingCycle, router])


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
                    Connecting Gateway…
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Pay Online — Upgrade to Pro
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
                    Connecting Gateway…
                  </>
                ) : (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Pay Online — Get Mentorship
                  </>
                )}
              </button>
            </div>
          </div>
        </section>

        {/* 3. FAQ */}
        <section id="pricing-faq" className="scroll-mt-24">
          <div className="border border-border rounded-2xl bg-card/60 p-8 sm:p-10 max-w-4xl mx-auto space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-secondary text-muted-foreground border border-border">
                <HelpCircle className="h-3.5 w-3.5" />
                Frequently Asked Questions
              </div>
              <h2 className="font-serif text-3xl font-normal text-foreground">
                Got questions? We&apos;ve got answers.
              </h2>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
                <h4 className="text-sm font-medium text-foreground">
                  How does online payment work?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Click Pay Online to open the Razorpay Gateway. You can scan a UPI QR code with any UPI app (GPay, PhonePe, Paytm, BHIM) or pay using cards. Payment verifies automatically in real time.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
                <h4 className="text-sm font-medium text-foreground">
                  When do I get access to premium courses?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Instantly! As soon as your payment is verified by the payment gateway, your profile is immediately upgraded to Architect tier and all courses unlock right away.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
                <h4 className="text-sm font-medium text-foreground">
                  Can I cancel anytime?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Yes, you can cancel your subscription renewal anytime from your account settings. You retain access until the end of the paid period.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-border/80 bg-background/50 space-y-1.5">
                <h4 className="text-sm font-medium text-foreground">
                  Is there a refund policy?
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Yes, we offer a 7-day money-back guarantee if you&apos;re not satisfied with your Pro learning experience.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />

      {/* Razorpay Payment Gateway Modal */}
      {activeOrder && (
        <PaymentGatewayModal
          order={activeOrder}
          onClose={() => setActiveOrder(null)}
        />
      )}
    </main>
  )
}
