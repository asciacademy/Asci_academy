"use client"

import { Suspense } from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { Loader2, AlertCircle, CheckCircle2, RefreshCw, ShieldCheck, ArrowRight } from "lucide-react"
import { AsciLogo } from "@/components/asci-logo"

const OTP_LENGTH = 6

function VerifyOtpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const otpType = (searchParams.get("type") || "signup") as "signup" | "email"

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""))
  const [isVerifying, setIsVerifying] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const lastAttemptedTokenRef = useRef<string>("")
  const inFlightRef = useRef<boolean>(false)

  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (resendCooldown > 0) {
      const t = setTimeout(() => setResendCooldown((c) => c - 1), 1000)
      return () => clearTimeout(t)
    }
  }, [resendCooldown])

  const handlePastedCode = (codeStr: string) => {
    const cleaned = codeStr.replace(/\D/g, "").slice(0, OTP_LENGTH)
    if (!cleaned) return
    const next = Array(OTP_LENGTH).fill("")
    cleaned.split("").forEach((c, i) => {
      next[i] = c
    })
    setOtp(next)
    setError(null)
    lastAttemptedTokenRef.current = ""
    const fi = Math.min(cleaned.length, OTP_LENGTH - 1)
    inputRefs.current[fi]?.focus()
  }

  const handleChange = (index: number, value: string) => {
    const digitsOnly = value.replace(/\D/g, "")
    if (digitsOnly.length > 1) {
      handlePastedCode(digitsOnly)
      return
    }

    const cleaned = digitsOnly.slice(-1)
    const next = [...otp]
    next[index] = cleaned
    setOtp(next)
    setError(null)
    lastAttemptedTokenRef.current = ""
    if (cleaned && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      lastAttemptedTokenRef.current = ""
      if (otp[index]) {
        const next = [...otp]
        next[index] = ""
        setOtp(next)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
    if (e.key === "ArrowLeft" && index > 0) inputRefs.current[index - 1]?.focus()
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData("text")
    handlePastedCode(pasted)
  }

  const handleVerify = useCallback(
    async (digits?: string[]) => {
      const token = (digits || otp).join("")
      if (token.length !== OTP_LENGTH) {
        setError(`Please enter all ${OTP_LENGTH} digits.`)
        return
      }

      if (inFlightRef.current) return
      inFlightRef.current = true
      lastAttemptedTokenRef.current = token
      setIsVerifying(true)
      setError(null)

      try {
        const supabase = createClient()
        let { data, error } = await supabase.auth.verifyOtp({ email, token, type: otpType })

        // If email type failed, also attempt magiclink fallback in case GoTrue registered under magiclink
        if (error && otpType === "email") {
          const fallback = await supabase.auth.verifyOtp({ email, token, type: "magiclink" as any })
          if (!fallback.error) {
            data = fallback.data
            error = null
          }
        }

        if (error) {
          const msg = error.message?.toLowerCase() || ""
          if (msg.includes("rate limit") || (error as any).status === 429) {
            setError("Too many verification attempts. Please wait 30 seconds before trying again.")
          } else if (msg.includes("expired") || msg.includes("invalid") || msg.includes("otp")) {
            setError("Passcode is invalid or expired. Check your latest email or click 'Resend Code'.")
          } else if (msg.includes("already confirmed")) {
            window.location.href = "/dashboard"
            return
          } else {
            setError(error.message)
          }
          setIsVerifying(false)
          inFlightRef.current = false
          return
        }

        const user = data?.user
        setSuccess(true)
        if (user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single()

          const dest = profile?.role === "admin" || profile?.role === "super_admin" ? "/admin" : "/dashboard"
          setTimeout(() => {
            window.location.href = dest
          }, 1000)
        } else {
          setTimeout(() => {
            window.location.href = "/dashboard"
          }, 1000)
        }
      } catch (err: any) {
        setError(err?.message || "An unexpected error occurred during verification.")
        setIsVerifying(false)
        inFlightRef.current = false
      }
    },
    [otp, email, otpType]
  )

  useEffect(() => {
    const token = otp.join("")
    if (
      token.length === OTP_LENGTH &&
      otp.every((d) => d !== "") &&
      token !== lastAttemptedTokenRef.current &&
      !inFlightRef.current &&
      !isVerifying &&
      !success
    ) {
      handleVerify(otp)
    }
  }, [otp, isVerifying, success, handleVerify])

  const handleResend = async () => {
    if (resendCooldown > 0 || isResending) return
    setIsResending(true)
    setError(null)
    lastAttemptedTokenRef.current = ""

    const supabase = createClient()
    let resendError: any = null

    if (otpType === "email") {
      const { error } = await supabase.auth.signInWithOtp({ email, options: { shouldCreateUser: false } })
      resendError = error
    } else {
      const { error } = await supabase.auth.resend({ type: "signup", email })
      resendError = error
    }

    setIsResending(false)
    if (resendError) {
      const msg = resendError.message?.toLowerCase() || ""
      if (msg.includes("magic link") || msg.includes("sending") || (resendError as any).status === 500) {
        setError("Email dispatch failed: Supabase Gmail SMTP credentials rejected (535 BadCredentials). Please set a Google App Password in Supabase Dashboard → Email Settings.")
      } else if (msg.includes("rate limit") || (resendError as any).status === 429) {
        setError("Too many requests. Please wait a minute before requesting another code.")
      } else {
        setError(resendError.message || "Failed to resend. Please wait and try again.")
      }
    } else {
      setResendCooldown(60)
      setOtp(Array(OTP_LENGTH).fill(""))
      inputRefs.current[0]?.focus()
    }
  }

  const isComplete = otp.every((d) => d !== "")
  const backHref = otpType === "email" ? "/login" : "/signup"
  const backLabel = otpType === "email" ? "Back to Sign In" : "Back to Sign Up"
  const pageTitle = otpType === "email" ? "Email Login Passcode" : "Confirm Your Email"
  const pageDesc =
    otpType === "email"
      ? "Enter the one-time passcode dispatched to:"
      : "Enter the code sent to activate your account:"

  if (!email) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <div className="text-center space-y-4 max-w-sm rounded-2xl border border-hairline bg-card p-8 shadow-sm">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
          <p className="text-sm text-body">No email address provided for verification.</p>
          <Link href={backHref} className="text-primary hover:underline text-xs font-medium inline-block">
            {backLabel}
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-8">
      <div className="w-full max-w-md">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <AsciLogo size={40} showText={false} />
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl tracking-tight text-foreground">ASCI</span>
              <span className="badge-coral text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded-full">Academy</span>
            </div>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground" style={{ letterSpacing: "-0.5px" }}>
            {pageTitle}
          </h1>
          <p className="text-xs text-muted-foreground mt-1">{pageDesc}</p>
          <p className="text-xs font-mono font-medium text-foreground mt-0.5">{email}</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-hairline bg-card p-7 sm:p-9 shadow-sm">
          {success ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-serif text-xl font-normal text-foreground">Verification Successful</h2>
              <p className="text-xs text-muted-foreground">Access confirmed. Routing to dashboard...</p>
              <Loader2 className="h-4 w-4 animate-spin text-primary mt-2" />
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 flex items-start gap-2.5 bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-md">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">{error}</div>
                </div>
              )}

              {/* Digit Inputs */}
              <div
                className="flex gap-1.5 sm:gap-2 justify-center mb-6"
                onPaste={handlePaste}
                aria-label="One-time passcode input"
              >
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => {
                      inputRefs.current[i] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    disabled={isVerifying}
                    autoComplete="one-time-code"
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    className={`
                      w-10 sm:w-11 h-12 sm:h-13 text-center text-lg font-mono font-medium rounded-md
                      bg-background border transition-colors focus:outline-none
                      ${
                        digit
                          ? "border-primary text-foreground"
                          : "border-hairline text-muted-foreground"
                      }
                      ${isVerifying ? "opacity-60 cursor-not-allowed" : ""}
                      focus:border-primary
                    `}
                  />
                ))}
              </div>

              {/* Submit button */}
              <button
                onClick={() => handleVerify()}
                disabled={isVerifying || !isComplete}
                className="btn-primary w-full py-2.5 rounded-md text-xs font-medium cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mb-4"
              >
                {isVerifying ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Code</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>

              {/* Resend */}
              <div className="text-center border-t border-hairline pt-4">
                <p className="text-xs text-muted-foreground mb-1.5">Didn&apos;t receive the code?</p>
                <button
                  onClick={handleResend}
                  disabled={isResending || resendCooldown > 0}
                  className="text-xs font-medium text-primary hover:underline inline-flex items-center gap-1.5 disabled:opacity-50 disabled:no-underline cursor-pointer"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : resendCooldown > 0 ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Resend in {resendCooldown}s</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-3.5 w-3.5" />
                      <span>Resend Code</span>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Context link */}
        <p className="text-center mt-6 text-xs text-muted-foreground">
          Wrong email?{" "}
          <Link href={backHref} className="text-primary hover:underline font-medium">
            {backLabel}
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-background p-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  )
}
