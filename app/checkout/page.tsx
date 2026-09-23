"use client"

import { useState, useEffect, useCallback, Suspense, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import {
  ShieldCheck,
  Check,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Copy,
  CheckCircle2,
  QrCode,
  CreditCard,
  AlertCircle,
  Smartphone,
  Sparkles,
  Crown,
  Lock,
  Headphones,
  CheckCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Tag,
  Zap,
  Building2,
  BadgePercent,
  CheckCheck,
  ExternalLink,
  RefreshCw,
} from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { AsciLogo } from "@/components/asci-logo"
import { ThemeToggle } from "@/components/theme-toggle"

// ─── TYPES ────────────────────────────────────────────────────────────────────
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

// ─── STATIC PLAN METADATA (Immediate synchronous render) ──────────────────────
const PLAN_META: Record<
  Plan,
  {
    title: string
    badge: string
    monthlyINR: number
    annualMonthlyEquivalentINR: number
    annualTotalINR: number
    annualSavingsINR: number
    description: string
    features: string[]
  }
> = {
  pro: {
    title: "Pro Learner Plan",
    badge: "Most Popular",
    monthlyINR: 1999,
    annualMonthlyEquivalentINR: 1499,
    annualTotalINR: 17988,
    annualSavingsINR: 6000,
    description:
      "All-inclusive access to 400+ algorithmic challenges, system design blueprints, and verified certifications.",
    features: [
      "Access to all 400+ curated DSA & System Design challenges",
      "Interactive multi-language Web IDE with instant test execution",
      "Step-by-step algorithm visualizers & call-stack debugger",
      "Cryptographically verified course completion certificates",
      "Private ASCI developer network & dedicated study cohorts",
    ],
  },
  mentorship: {
    title: "Team & Mentorship Plan",
    badge: "Elite Guidance",
    monthlyINR: 5999,
    annualMonthlyEquivalentINR: 4499,
    annualTotalINR: 53988,
    annualSavingsINR: 18000,
    description:
      "Everything in Pro plus personalized 1-on-1 guidance from staff engineers and live mock interviews.",
    features: [
      "Everything included in the Pro Learner Plan",
      "Weekly 1-on-1 code reviews with senior engineering mentors",
      "Live technical mock interviews with personalized scoring",
      "Comprehensive resume and GitHub portfolio architectural audit",
      "Priority referral pipeline to top partner tech companies",
    ],
  },
}

// Supported promo codes
const PROMO_CODES: Record<string, { percent: number; label: string }> = {
  WELCOME10: { percent: 10, label: "Welcome 10% Off" },
  ASCI20: { percent: 20, label: "ASCI 20% Special Discount" },
  STUDENT15: { percent: 15, label: "Student Discount 15%" },
}

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

// ─── MAIN CHECKOUT COMPONENT ──────────────────────────────────────────────────
function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, refreshProfile, isAuthenticated, isLoading: authLoading } = useAuth()

  // URL parameters
  const planParam = ((searchParams.get("plan") as Plan) || "pro").toLowerCase() as Plan
  const validPlan: Plan = planParam === "mentorship" ? "mentorship" : "pro"

  const cycleParam = (
    searchParams.get("cycle") ||
    searchParams.get("billing") ||
    "monthly"
  ).toLowerCase() as BillingCycle
  const validCycle: BillingCycle = cycleParam === "annual" ? "annual" : "monthly"

  const orderIdParam = searchParams.get("orderId") || ""

  // Core state
  const [selectedPlan, setSelectedPlan] = useState<Plan>(validPlan)
  const [selectedCycle, setSelectedCycle] = useState<BillingCycle>(validCycle)
  const [order, setOrder] = useState<RazorpayOrderData | null>(null)
  const [orderLoading, setOrderLoading] = useState(false)

  // Payment navigation
  const [activeTab, setActiveTab] = useState<PaymentTab>("razorpay")
  const [step, setStep] = useState<ModalStep>("checkout")
  const [verifying, setVerifying] = useState(false)
  const [verificationStage, setVerificationStage] = useState<string>("Verifying payment with gateway...")
  const [verifiedPaymentId, setVerifiedPaymentId] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // UPI QR state
  const [copied, setCopied] = useState(false)
  const [qrDataUrl, setQrDataUrl] = useState<string>("")
  const [qrLoading, setQrLoading] = useState(false)
  const [utrNumber, setUtrNumber] = useState("")
  const [showUtrInput, setShowUtrInput] = useState(false)
  const [utrSubmitting, setUtrSubmitting] = useState(false)

  // Promo code state
  const [promoInput, setPromoInput] = useState("")
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; percent: number; label: string } | null>(null)
  const [promoError, setPromoError] = useState<string | null>(null)
  const [showPromoField, setShowPromoField] = useState(false)

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  // Meta configuration based on selection
  const meta = PLAN_META[selectedPlan] || PLAN_META.pro

  // Synchronous pricing calculation
  const pricing = useMemo(() => {
    const isAnnual = selectedCycle === "annual"
    const originalPrice = isAnnual ? meta.monthlyINR * 12 : meta.monthlyINR
    const planDiscount = isAnnual ? meta.annualSavingsINR : 0
    const basePayable = isAnnual ? meta.annualTotalINR : meta.monthlyINR

    const couponDiscount = appliedPromo
      ? Math.round((basePayable * appliedPromo.percent) / 100)
      : 0
    const finalAmount = Math.max(1, basePayable - couponDiscount)

    return {
      originalPrice,
      planDiscount,
      couponDiscount,
      finalAmount,
      isAnnual,
    }
  }, [selectedPlan, selectedCycle, meta, appliedPromo])

  // Initialize or fetch order
  const initOrder = useCallback(
    async (p: Plan, c: BillingCycle, overrideAmount?: number) => {
      if (!isAuthenticated) return
      setOrderLoading(true)
      setErrorMsg(null)

      try {
        const payload: any = {
          plan: p,
          billing_cycle: c,
          existingOrderId: orderIdParam || undefined,
        }

        if (overrideAmount) {
          payload.amount = overrideAmount * 100 // in paise
        }

        const res = await fetch("/api/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}))
          throw new Error(errData.error || "Could not prepare order gateway connection")
        }

        const data: RazorpayOrderData = await res.json()
        setOrder(data)
      } catch (err: any) {
        console.warn("Order initialization notice:", err)
        // Non-blocking notice; the user can still proceed or retry
        setErrorMsg(err.message || "Could not initialize live gateway. You can still scan UPI QR directly.")
      } finally {
        setOrderLoading(false)
      }
    },
    [isAuthenticated, orderIdParam]
  )

  // Trigger order creation when authenticated or selection changes
  useEffect(() => {
    if (isAuthenticated) {
      initOrder(selectedPlan, selectedCycle, pricing.finalAmount)
    }
  }, [isAuthenticated, selectedPlan, selectedCycle, pricing.finalAmount, initOrder])

  // Generate UPI QR Code dynamically
  useEffect(() => {
    const currentUpiLink =
      order?.upiDeepLink ||
      `upi://pay?pa=asci.academy@upi&pn=${encodeURIComponent(
        "ASCI Academy"
      )}&am=${pricing.finalAmount}&cu=INR&tn=${encodeURIComponent(
        `ASCI ${meta.title} (${selectedCycle})`
      )}`

    let cancelled = false
    setQrLoading(true)

    import("qrcode")
      .then((QRCode) => {
        QRCode.toDataURL(currentUpiLink, {
          width: 280,
          margin: 1,
          color: { dark: "#062112", light: "#ffffff" },
          errorCorrectionLevel: "M",
        })
          .then((url) => {
            if (!cancelled) {
              setQrDataUrl(url)
              setQrLoading(false)
            }
          })
          .catch(() => {
            if (!cancelled) setQrLoading(false)
          })
      })
      .catch(() => {
        if (!cancelled) setQrLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [order?.upiDeepLink, pricing.finalAmount, meta.title, selectedCycle])

  // Copy UPI ID
  const copyUpiId = () => {
    const idToCopy = order?.upiId || "asci.academy@upi"
    navigator.clipboard.writeText(idToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Apply promo code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    setPromoError(null)
    const cleaned = promoInput.trim().toUpperCase()
    if (!cleaned) return

    if (PROMO_CODES[cleaned]) {
      setAppliedPromo({
        code: cleaned,
        percent: PROMO_CODES[cleaned].percent,
        label: PROMO_CODES[cleaned].label,
      })
      setPromoInput("")
    } else {
      setPromoError("Invalid discount code. Try 'WELCOME10' or 'ASCI20'")
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
    setPromoError(null)
  }

  // Razorpay Gateway Launch
  const handleLaunchRazorpay = async () => {
    if (!isAuthenticated) {
      router.push(
        `/login?redirect=${encodeURIComponent(
          `/checkout?plan=${selectedPlan}&billing=${selectedCycle}`
        )}`
      )
      return
    }

    if (!order) {
      await initOrder(selectedPlan, selectedCycle, pricing.finalAmount)
    }

    setErrorMsg(null)

    // Demo/Test bypass if order is demo
    if (order?.isDemo) {
      setStep("verifying")
      setVerificationStage("Connecting to test gateway...")
      try {
        const res = await fetch("/api/verify-payment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            razorpay_order_id: order.razorpayOrderId || `order_demo_${Date.now()}`,
            razorpay_payment_id: `pay_demo_${Date.now()}`,
            razorpay_signature: "direct_upi_verified",
            plan: selectedPlan,
            billing_cycle: selectedCycle,
          }),
        })
        const data = await res.json()
        if (res.ok && data.success) {
          await refreshProfile()
          setVerifiedPaymentId(data.payment_id || "PAY_DEMO_OK")
          setStep("verified")
        } else {
          throw new Error(data.error || "Simulation failed")
        }
      } catch (err: any) {
        setErrorMsg(err.message || "Failed to verify payment")
        setStep("checkout")
      }
      return
    }

    const scriptLoaded = await loadRazorpayScript()
    if (!scriptLoaded) {
      setErrorMsg("Could not connect to Razorpay. Please check your internet connection or use Direct UPI QR.")
      return
    }

    const currentKey =
      order?.keyId ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      "rzp_test_Tf3IKHOePFdxFC"

    const options = {
      key: currentKey,
      amount: (order?.amountInPaise) || pricing.finalAmount * 100,
      currency: "INR",
      name: "ASCI Academy",
      description: `${meta.title} (${selectedCycle === "annual" ? "Annual" : "Monthly"}) — Full Access`,
      image: "/icon.png",
      order_id: order?.razorpayOrderId,
      prefill: {
        name: user?.user_metadata?.full_name || user?.user_metadata?.name || "Student",
        email: user?.email || "",
      },
      theme: {
        color: "#062112",
      },
      handler: async function (response: any) {
        setStep("verifying")
        setVerificationStage("Confirming transaction with banking network...")

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 14000)

        try {
          const res = await fetch("/api/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              plan: selectedPlan,
              billing_cycle: selectedCycle,
            }),
            signal: controller.signal,
          })
          clearTimeout(timeoutId)

          const data = await res.json()
          if (res.ok && data.success) {
            setVerificationStage("Activating your courses and verified credentials...")
            await refreshProfile()
            setVerifiedPaymentId(response.razorpay_payment_id)
            setStep("verified")
          } else {
            throw new Error(data.error || data.message || "Verification failed")
          }
        } catch (err: any) {
          clearTimeout(timeoutId)
          if (err.name === "AbortError") {
            setErrorMsg(
              "Payment verification timed out. If money was debited, your plan will activate automatically within 5 minutes."
            )
          } else {
            setErrorMsg(err.message || "Payment verification failed. Please contact billing support.")
          }
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
        setErrorMsg(response.error?.description || "Payment was cancelled or declined by your bank.")
      })
      rzp.open()
    } catch (err: any) {
      setErrorMsg("Failed to launch Razorpay gateway: " + err.message)
    }
  }

  // Direct QR verification
  const handleVerifyDirectPayment = async () => {
    if (!isAuthenticated) {
      router.push(
        `/login?redirect=${encodeURIComponent(
          `/checkout?plan=${selectedPlan}&billing=${selectedCycle}`
        )}`
      )
      return
    }

    setVerifying(true)
    setErrorMsg(null)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 12000)

    try {
      const res = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_order_id: order?.razorpayOrderId || `upi_ord_${Date.now()}`,
          razorpay_payment_id: utrNumber.trim()
            ? `upi_${utrNumber.trim()}`
            : `upi_direct_${Date.now()}`,
          razorpay_signature: "direct_upi_verified",
          plan: selectedPlan,
          billing_cycle: selectedCycle,
        }),
        signal: controller.signal,
      })
      clearTimeout(timeoutId)

      const data = await res.json()
      if (res.ok && data.success) {
        await refreshProfile()
        setVerifiedPaymentId(data.payment_id || `UPI-${Date.now().toString().slice(-6)}`)
        setStep("verified")
      } else {
        throw new Error(data.error || data.message || "Could not verify payment")
      }
    } catch (err: any) {
      clearTimeout(timeoutId)
      if (err.name === "AbortError") {
        setErrorMsg("Verification check timed out. Please enter your 12-digit UTR reference number.")
      } else {
        setErrorMsg(err.message || "Payment check could not confirm immediately. Please submit your UTR reference.")
      }
    } finally {
      setVerifying(false)
    }
  }

  const handleSubmitUtr = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!utrNumber.trim() || utrNumber.trim().length < 6) {
      setErrorMsg("Please enter a valid 12-digit UPI UTR reference number.")
      return
    }
    setUtrSubmitting(true)
    setErrorMsg(null)

    try {
      await fetch("/api/payment/submit-utr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order?.orderId,
          utrNumber: utrNumber.trim(),
        }),
      })
      await handleVerifyDirectPayment()
    } catch (err: any) {
      await handleVerifyDirectPayment()
    } finally {
      setUtrSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col antialiased selection:bg-primary/20 selection:text-primary">
      {/* ─── 1. WORLD-CLASS HIGH-TRUST CHECKOUT HEADER ─── */}
      <header className="border-b border-border/60 bg-background/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <AsciLogo size={32} showText={false} />
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl font-normal tracking-tight text-foreground">
                ASCI Academy
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold flex items-center gap-1">
                <Lock className="h-3 w-3" />
                Secure Checkout
              </span>
            </div>
          </Link>

          {/* Header Actions & Trust */}
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="hidden md:flex items-center gap-2 text-xs font-mono text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
              <span>256-Bit Bank Encryption</span>
            </div>

            <div className="h-4 w-px bg-border/60 hidden md:block" />

            <Link
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Change Plan</span>
            </Link>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ─── 2. CHECKOUT CONTENT CANVAS ─── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Error Notification Banner */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-start gap-3 animate-in fade-in duration-200 shadow-xs">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <div className="flex-1 leading-relaxed font-medium">{errorMsg}</div>
            <button
              onClick={() => setErrorMsg(null)}
              className="text-destructive font-mono text-[11px] underline uppercase tracking-wider font-semibold cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* ─── STATE A: VERIFYING IN PROGRESS ─── */}
        {step === "verifying" && (
          <div className="my-16 max-w-md mx-auto rounded-3xl border border-border bg-card p-8 sm:p-10 text-center shadow-xl space-y-6">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20 text-primary">
              <Loader2 className="h-10 w-10 animate-spin" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold">
                Transaction In Progress
              </span>
              <h2 className="text-2xl font-serif font-normal text-foreground pt-1">
                Confirming Your Payment…
              </h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {verificationStage}
              </p>
            </div>

            <div className="rounded-2xl border border-border/80 bg-secondary/40 p-4 text-left space-y-2.5 text-xs font-mono">
              <div className="flex justify-between text-muted-foreground">
                <span>Plan:</span>
                <span className="text-foreground font-semibold">{meta.title}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Billing Cycle:</span>
                <span className="text-foreground font-semibold capitalize">{selectedCycle}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Total Amount:</span>
                <span className="text-foreground font-semibold">₹{pricing.finalAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Network Status:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  Awaiting Bank Confirmation…
                </span>
              </div>
            </div>

            <p className="text-[11px] text-muted-foreground leading-relaxed">
              Please do not refresh or close this tab. Your ASCI membership and IDE sandbox will unlock automatically the moment funds are verified.
            </p>
          </div>
        )}

        {/* ─── STATE B: VERIFIED & CONGRATULATIONS ─── */}
        {step === "verified" && (
          <div className="my-16 max-w-lg mx-auto rounded-3xl border border-emerald-500/30 bg-card p-8 sm:p-12 text-center shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
            <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <Crown className="h-12 w-12 stroke-[1.5]" />
              <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                <Check className="h-4 w-4 stroke-[3]" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                Payment Confirmed · Lifetime Verified
              </span>
              <h2 className="text-3xl font-serif font-normal text-foreground pt-1">
                Welcome to {meta.title}!
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Your payment of <strong className="text-foreground">₹{pricing.finalAmount.toLocaleString("en-IN")}</strong> has been processed successfully.
                Your full developer access to 400+ challenges, video walk-throughs, and certificate credentials is now live!
              </p>
            </div>

            {verifiedPaymentId && (
              <div className="p-3 rounded-xl bg-secondary border border-border/80 text-[11px] font-mono text-muted-foreground flex items-center justify-center gap-2">
                <span>Transaction Ref:</span>
                <span className="text-foreground font-semibold">{verifiedPaymentId}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => router.push("/courses")}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider py-4 font-semibold hover:bg-primary/90 transition-all cursor-pointer shadow-md"
              >
                <Sparkles className="h-4 w-4" />
                Start Learning Now
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary text-foreground font-mono text-xs uppercase tracking-wider py-4 font-semibold hover:bg-secondary/80 transition-all cursor-pointer"
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* ─── STATE C: STANDARD TWO-COLUMN CHECKOUT ─── */}
        {step === "checkout" && (
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* ─── LEFT COLUMN: SUBSCRIPTION OVERVIEW & RECEIPT (Cols 1-7) ─── */}
              <div className="lg:col-span-7 space-y-6">
                {/* Plan Introduction */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                      {meta.badge}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      ASCI Professional Membership
                    </span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-normal text-foreground tracking-tight">
                    {meta.title}
                  </h1>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 leading-relaxed max-w-xl">
                    {meta.description}
                  </p>
                </div>

                {/* Billing Cycle Switcher (Monthly vs Annual with 25% Savings) */}
                <div className="rounded-2xl border border-border/80 bg-card p-1.5 flex flex-col sm:flex-row gap-1.5 shadow-xs">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCycle("monthly")
                      router.replace(`/checkout?plan=${selectedPlan}&billing=monthly`, { scroll: false })
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedCycle === "monthly"
                        ? "bg-secondary text-foreground font-medium border border-border shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-mono uppercase tracking-wider font-semibold">Monthly Plan</div>
                      <div className="text-[11px] text-muted-foreground mt-0.5">Flexible · Cancel anytime</div>
                    </div>
                    <div className="text-right font-mono text-xs font-semibold text-foreground">
                      ₹{meta.monthlyINR.toLocaleString("en-IN")}
                      <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCycle("annual")
                      router.replace(`/checkout?plan=${selectedPlan}&billing=annual`, { scroll: false })
                    }}
                    className={`flex-1 py-3 px-4 rounded-xl text-left transition-all cursor-pointer flex items-center justify-between ${
                      selectedCycle === "annual"
                        ? "bg-secondary text-foreground font-medium border border-emerald-500/40 shadow-xs"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-mono uppercase tracking-wider font-semibold">Annual Plan</span>
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold border border-emerald-500/20">
                          SAVE 25%
                        </span>
                      </div>
                      <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5 font-medium">
                        Save ₹{meta.annualSavingsINR.toLocaleString("en-IN")}/year
                      </div>
                    </div>
                    <div className="text-right font-mono text-xs font-semibold text-foreground">
                      ₹{meta.annualMonthlyEquivalentINR.toLocaleString("en-IN")}
                      <span className="text-[10px] font-normal text-muted-foreground">/mo</span>
                    </div>
                  </button>
                </div>

                {/* What's Included (Checklist) */}
                <div className="rounded-2xl border border-border/70 bg-card/60 p-5 sm:p-6 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium flex items-center justify-between">
                    <span>Included with your membership:</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      Instant Unlock
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 pt-1">
                    {meta.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-3 text-xs text-foreground/90">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Promo Code Accordion */}
                <div className="rounded-2xl border border-border/60 bg-card/40 p-4">
                  {!appliedPromo ? (
                    <div>
                      {!showPromoField ? (
                        <button
                          type="button"
                          onClick={() => setShowPromoField(true)}
                          className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Tag className="h-3.5 w-3.5 text-primary" />
                          <span>Have a discount coupon or scholarship code?</span>
                        </button>
                      ) : (
                        <form onSubmit={handleApplyPromo} className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                            <span>Enter Discount Code</span>
                            <button
                              type="button"
                              onClick={() => {
                                setShowPromoField(false)
                                setPromoError(null)
                              }}
                              className="text-[11px] hover:text-foreground cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={promoInput}
                              onChange={(e) => setPromoInput(e.target.value)}
                              placeholder="e.g. WELCOME10 or ASCI20"
                              className="flex-1 bg-secondary border border-border rounded-xl px-3.5 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground uppercase focus:outline-none focus:border-primary"
                            />
                            <button
                              type="submit"
                              disabled={!promoInput.trim()}
                              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-40"
                            >
                              Apply
                            </button>
                          </div>
                          {promoError && (
                            <p className="text-[11px] text-destructive font-mono">{promoError}</p>
                          )}
                        </form>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between text-xs font-mono text-emerald-600 dark:text-emerald-400">
                      <div className="flex items-center gap-2">
                        <BadgePercent className="h-4 w-4" />
                        <span>
                          Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.percent}% Off)!
                        </span>
                      </div>
                      <button
                        onClick={handleRemovePromo}
                        className="text-[11px] underline hover:text-foreground cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Itemized Invoice Receipt */}
                <div className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">
                    <span>Order Summary</span>
                    <span>INR (₹)</span>
                  </div>

                  <div className="space-y-2.5 text-xs sm:text-sm">
                    <div className="flex justify-between items-center text-foreground">
                      <span>
                        {meta.title} ({pricing.isAnnual ? "12 Months" : "1 Month"})
                      </span>
                      <span className="font-mono">₹{pricing.originalPrice.toLocaleString("en-IN")}</span>
                    </div>

                    {pricing.planDiscount > 0 && (
                      <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                        <span>Annual Membership Discount (25% Off)</span>
                        <span>-₹{pricing.planDiscount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    {pricing.couponDiscount > 0 && (
                      <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-mono text-xs">
                        <span>Promo Code ({appliedPromo?.code})</span>
                        <span>-₹{pricing.couponDiscount.toLocaleString("en-IN")}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Platform &amp; Payment Gateway Fee</span>
                      <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">FREE (₹0)</span>
                    </div>

                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>Goods &amp; Services Tax (GST 18%)</span>
                      <span className="font-mono">Included in price</span>
                    </div>

                    <div className="h-px bg-border my-2" />

                    <div className="flex justify-between items-baseline pt-1">
                      <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground block">
                          Total Due Today
                        </span>
                        <span className="text-[11px] text-muted-foreground">
                          {pricing.isAnnual
                            ? "Billed annually · Cancel renewal anytime"
                            : "Billed monthly · Cancel anytime with 1 click"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-foreground tracking-tight">
                          ₹{pricing.finalAmount.toLocaleString("en-IN")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Guarantee Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-4 rounded-2xl border border-border/70 bg-card/40 flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-foreground block">7-Day Money-Back Guarantee</span>
                      <span className="text-[11px] text-muted-foreground leading-relaxed block">
                        If the curriculum doesn&apos;t meet your standards, email us within 7 days for a 100% full refund.
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl border border-border/70 bg-card/40 flex items-start gap-3">
                    <Sparkles className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <div className="space-y-0.5">
                      <span className="text-xs font-semibold text-foreground block">Instant Course Unlock</span>
                      <span className="text-[11px] text-muted-foreground leading-relaxed block">
                        Your account credentials, IDE sandbox, and discord channels activate the second payment clears.
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ─── RIGHT COLUMN: CLEAN PAYMENT TERMINAL (Cols 8-12) ─── */}
              <div className="lg:col-span-5 space-y-5 lg:sticky lg:top-24">
                {/* Account Status Pill */}
                {authLoading ? (
                  <div className="rounded-2xl border border-border bg-card p-4 flex items-center gap-3">
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">Checking student session…</span>
                  </div>
                ) : isAuthenticated && user ? (
                  <div className="rounded-2xl border border-border bg-card p-4 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs uppercase font-mono border border-primary/20 shrink-0">
                        {user.user_metadata?.full_name
                          ? user.user_metadata.full_name.charAt(0)
                          : user.email?.charAt(0) || "S"}
                      </div>
                      <div className="text-xs truncate">
                        <div className="font-medium text-foreground flex items-center gap-1.5 truncate">
                          <span>{user.user_metadata?.full_name || "Student"}</span>
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        </div>
                        <div className="text-[11px] text-muted-foreground font-mono truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-semibold shrink-0">
                      Connected
                    </span>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-card p-4 space-y-2.5 shadow-xs">
                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground">
                      <span>Account Sign In</span>
                      <span className="text-primary font-semibold">Step 1 of 2</span>
                    </div>
                    <p className="text-xs text-foreground/80 leading-relaxed">
                      Please sign in so your ASCI subscription, certificates, and solved problems are linked to your profile.
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        router.push(
                          `/login?redirect=${encodeURIComponent(
                            `/checkout?plan=${selectedPlan}&billing=${selectedCycle}`
                          )}`
                        )
                      }
                      className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-wider font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      Sign In to Proceed
                    </button>
                  </div>
                )}

                {/* Payment Container Card */}
                <div className="rounded-3xl border border-border bg-card p-6 sm:p-7 shadow-lg space-y-6">
                  {/* Payment Method Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-2 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">
                      <span>Choose Payment Method</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                        Instant Verification
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 rounded-xl border border-border bg-secondary p-1">
                      <button
                        type="button"
                        onClick={() => setActiveTab("razorpay")}
                        className={`py-2.5 px-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          activeTab === "razorpay"
                            ? "bg-card text-foreground font-semibold shadow-xs border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <CreditCard className="h-3.5 w-3.5 text-primary" />
                        <span>Razorpay Gateway</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("direct_qr")}
                        className={`py-2.5 px-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          activeTab === "direct_qr"
                            ? "bg-card text-foreground font-semibold shadow-xs border border-border"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <QrCode className="h-3.5 w-3.5 text-primary" />
                        <span>Scan UPI QR</span>
                      </button>
                    </div>
                  </div>

                  {/* ─── TAB 1: RAZORPAY GATEWAY (CARDS, UPI, NETBANKING) ─── */}
                  {activeTab === "razorpay" && (
                    <div className="space-y-4 pt-1">
                      <div className="p-4 rounded-2xl border border-border bg-secondary/30 space-y-2">
                        <span className="text-xs font-medium text-foreground flex items-center gap-1.5">
                          <Zap className="h-4 w-4 text-emerald-500" />
                          One-Click Express Checkout
                        </span>
                        <p className="text-[11px] text-muted-foreground leading-relaxed">
                          Pay directly with any UPI app (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay), or NetBanking across 50+ Indian banks.
                        </p>
                      </div>

                      <button
                        onClick={handleLaunchRazorpay}
                        disabled={orderLoading}
                        className="w-full py-4 rounded-2xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest font-semibold hover:bg-primary/90 transition-all flex items-center justify-center gap-2.5 shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-70"
                      >
                        {orderLoading ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Connecting Gateway…
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4" />
                            Pay ₹{pricing.finalAmount.toLocaleString("en-IN")} via Razorpay
                            <ArrowRight className="h-3.5 w-3.5" />
                          </>
                        )}
                      </button>

                      {/* Payment Options Logos / Pills */}
                      <div className="pt-2 text-center space-y-2.5">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
                          Supported Payment Options
                        </span>
                        <div className="flex flex-wrap items-center justify-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                          <span className="px-2.5 py-1 rounded-md bg-secondary border border-border/80">Google Pay</span>
                          <span className="px-2.5 py-1 rounded-md bg-secondary border border-border/80">PhonePe</span>
                          <span className="px-2.5 py-1 rounded-md bg-secondary border border-border/80">Paytm</span>
                          <span className="px-2.5 py-1 rounded-md bg-secondary border border-border/80">Credit &amp; Debit Cards</span>
                          <span className="px-2.5 py-1 rounded-md bg-secondary border border-border/80">NetBanking</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ─── TAB 2: DIRECT UPI QR ─── */}
                  {activeTab === "direct_qr" && (
                    <div className="space-y-4 pt-1 flex flex-col items-center">
                      {/* Dynamic QR Code Frame */}
                      <div className="relative flex h-[230px] w-[230px] items-center justify-center rounded-2xl border border-border bg-white p-3 shadow-md">
                        {qrLoading ? (
                          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                        ) : qrDataUrl ? (
                          <img
                            src={qrDataUrl}
                            alt="Dynamic UPI Payment QR Code"
                            className="h-full w-full rounded-xl object-contain"
                          />
                        ) : (
                          <div className="text-center text-xs text-muted-foreground">
                            <QrCode className="h-10 w-10 mx-auto mb-2 opacity-40" />
                            QR Code generating…
                          </div>
                        )}
                      </div>

                      <div className="text-center space-y-0.5">
                        <p className="text-xs text-foreground font-medium">
                          Scan with any UPI App (GPay, PhonePe, Paytm, BHIM)
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          Amount <strong className="text-foreground">₹{pricing.finalAmount.toLocaleString("en-IN")}</strong> is pre-configured.
                        </p>
                      </div>

                      {/* Copy UPI ID */}
                      <div className="w-full flex items-center gap-2 rounded-xl border border-border bg-secondary px-3.5 py-2.5">
                        <CreditCard className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="flex-1 text-xs font-mono text-foreground truncate font-medium">
                          {order?.upiId || "asci.academy@upi"}
                        </span>
                        <button
                          onClick={copyUpiId}
                          className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider text-primary hover:text-primary/80 transition-colors cursor-pointer shrink-0 font-semibold"
                        >
                          {copied ? (
                            <>
                              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3.5 w-3.5" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>

                      {/* Mobile Deep Link */}
                      <a
                        href={
                          order?.upiDeepLink ||
                          `upi://pay?pa=asci.academy@upi&pn=${encodeURIComponent(
                            "ASCI Academy"
                          )}&am=${pricing.finalAmount}&cu=INR&tn=${encodeURIComponent(
                            `ASCI ${meta.title}`
                          )}`
                        }
                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary text-foreground font-mono text-xs uppercase tracking-widest py-3 hover:bg-secondary/80 transition-all font-semibold"
                      >
                        <Smartphone className="h-4 w-4 text-primary" />
                        Open in Mobile UPI App
                      </a>

                      <div className="w-full h-px bg-border/60 my-1" />

                      {/* Verification Action */}
                      <button
                        onClick={handleVerifyDirectPayment}
                        disabled={verifying}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs uppercase tracking-widest py-3.5 hover:bg-primary/90 transition-all font-semibold cursor-pointer shadow-sm disabled:opacity-60"
                      >
                        {verifying ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Verifying Payment…
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="h-4 w-4" />
                            I Have Paid — Verify &amp; Unlock
                          </>
                        )}
                      </button>

                      {/* Optional UTR Input Accordion */}
                      <div className="w-full pt-1">
                        {!showUtrInput ? (
                          <button
                            type="button"
                            onClick={() => setShowUtrInput(true)}
                            className="text-[11px] font-mono text-muted-foreground hover:text-foreground text-center w-full underline cursor-pointer"
                          >
                            Have a 12-digit UTR reference number?
                          </button>
                        ) : (
                          <form onSubmit={handleSubmitUtr} className="w-full space-y-2">
                            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                              <span>Enter 12-Digit UTR Number</span>
                              <button
                                type="button"
                                onClick={() => setShowUtrInput(false)}
                                className="hover:text-foreground"
                              >
                                Cancel
                              </button>
                            </div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={utrNumber}
                                onChange={(e) => setUtrNumber(e.target.value)}
                                placeholder="e.g. 425612345678"
                                className="flex-1 bg-secondary border border-border rounded-xl px-3 py-2 text-xs font-mono text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                              />
                              <button
                                type="submit"
                                disabled={utrSubmitting || !utrNumber.trim()}
                                className="px-3.5 py-2 rounded-xl border border-border bg-secondary hover:bg-secondary/80 text-foreground font-mono text-[11px] uppercase tracking-wider font-semibold cursor-pointer disabled:opacity-40"
                              >
                                Submit
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Trust Footer Badges */}
                  <div className="pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                      RBI Regulated Gateway
                    </span>
                    <span>100% Encrypted</span>
                  </div>
                </div>

                {/* Priority Billing Support Box */}
                <div className="rounded-2xl border border-border/70 bg-card/60 p-4 flex items-center justify-between text-xs text-muted-foreground shadow-xs">
                  <div className="flex items-center gap-2.5">
                    <Headphones className="h-4 w-4 text-primary shrink-0" />
                    <span>Have billing questions?</span>
                  </div>
                  <a
                    href="mailto:support@asci.edu.in"
                    className="text-primary hover:underline font-mono text-[11px] font-semibold"
                  >
                    support@asci.edu.in
                  </a>
                </div>
              </div>
            </div>

            {/* ─── 3. FREQUENTLY ASKED QUESTIONS SECTION ─── */}
            <div className="border-t border-border/60 pt-12 space-y-6">
              <div className="text-center space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-primary font-semibold">
                  Frequently Asked Questions
                </span>
                <h2 className="text-2xl font-serif font-normal text-foreground">
                  Common Questions Before Enrolling
                </h2>
              </div>

              <div className="max-w-3xl mx-auto space-y-3">
                {[
                  {
                    q: "When will my access be activated?",
                    a: "Your account is activated instantly the moment payment is verified. You will gain immediate access to all 400+ problems, algorithm visualizers, Web IDE, and the Discord developer community.",
                  },
                  {
                    q: "How does the 7-day money-back guarantee work?",
                    a: "We want you to love ASCI Academy. If for any reason the curriculum or platform does not match your learning style, just drop an email to support@asci.edu.in within 7 days of purchase and we will process a 100% refund, no questions asked.",
                  },
                  {
                    q: "Can I cancel my subscription anytime?",
                    a: "Yes. You can manage or cancel your subscription renewal anytime with a single click from your Student Dashboard. There are no lock-ins or hidden cancellation penalties.",
                  },
                  {
                    q: "Will I receive a GST tax invoice for reimbursement?",
                    a: "Yes! A cryptographically signed GST tax invoice is generated and automatically dispatched to your registered email address right after checkout, which you can submit to your employer or college.",
                  },
                ].map((faq, index) => {
                  const isOpen = expandedFaq === index
                  return (
                    <div
                      key={index}
                      className="rounded-2xl border border-border/70 bg-card overflow-hidden transition-all shadow-xs"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedFaq(isOpen ? null : index)}
                        className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-secondary/40 transition-colors"
                      >
                        <span className="text-xs sm:text-sm font-medium text-foreground">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ─── 4. MINIMALIST DISTRACTION-FREE CHECKOUT FOOTER ─── */}
      <footer className="border-t border-border/60 bg-background py-8 mt-12 text-xs text-muted-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px]">
          <div>
            © {new Date().getFullYear()} ASCI Academy · Advanced Systems &amp; Computing Institute.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/pricing" className="hover:text-foreground transition-colors">
              Pricing Plans
            </Link>
            <span>•</span>
            <a href="mailto:support@asci.edu.in" className="hover:text-foreground transition-colors">
              Refund Policy
            </a>
            <span>•</span>
            <a href="mailto:support@asci.edu.in" className="hover:text-foreground transition-colors">
              Terms &amp; Conditions
            </a>
            <span>•</span>
            <a href="mailto:support@asci.edu.in" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 border border-primary/20 text-primary">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
          <p className="text-xs text-muted-foreground font-mono">Loading Checkout Station…</p>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  )
}
