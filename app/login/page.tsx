"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { login } from "@/app/actions/auth"
import { createClient } from "@/utils/supabase/client"
import {
  Lock, Mail, Loader2, AlertCircle, KeyRound,
  Eye, EyeOff, ArrowRight, CheckCircle2, ArrowLeft
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AsciLogo } from "@/components/asci-logo"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [resetSent, setResetSent] = useState(false)
  const [isSendingReset, setIsSendingReset] = useState(false)
  const [loginMode, setLoginMode] = useState<"password" | "otp">("password")
  const [otpEmail, setOtpEmail] = useState("")
  const [isSendingOtp, setIsSendingOtp] = useState(false)

  // Surface errors passed back from OAuth or email callbacks via URL parameters
  useEffect(() => {
    const urlError = searchParams.get("error_description") || searchParams.get("error")
    if (urlError) {
      const lower = urlError.toLowerCase()
      if (lower.includes("invalid_client") || lower.includes("origin") || lower.includes("unregistered")) {
        setError(
          "Google Cloud Configuration Required: 'http://localhost:3000' is not registered under Authorized JavaScript origins in Google Cloud Console. Add 'http://localhost:3000' to your credentials, or log in via Password."
        )
      } else {
        setError(urlError)
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    try {
      const result = await login(formData)
      if (result?.error) {
        setError(result.error)
        setIsLoading(false)
      }
    } catch (err: any) {
      if (err?.message?.includes("NEXT_REDIRECT")) return
      setError(err?.message || "Authentication failed. Please check your credentials or continue with Google.")
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    setError(null)
    try {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: "select_account",
            access_type: "offline",
          },
        },
      })
      if (error) {
        const msg = error.message?.toLowerCase() || ""
        if (msg.includes("invalid_client") || msg.includes("origin") || msg.includes("unregistered")) {
          setError(
            "Google Cloud Configuration Required: 'http://localhost:3000' is not registered under Authorized JavaScript origins in Google Cloud Console. Add 'http://localhost:3000' to Authorized JavaScript origins, or log in with Password / Email Code."
          )
        } else {
          setError(error.message)
        }
        setIsGoogleLoading(false)
      }
    } catch (err: any) {
      setError(err?.message || "Google Sign-In failed to initialize.")
      setIsGoogleLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    const email = (document.querySelector('input[name="email"]') as HTMLInputElement)?.value
    if (!email) {
      setError("Enter your email address above to receive a reset link.")
      return
    }
    setIsSendingReset(true)
    const supabase = createClient()
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/callback`,
    })
    setIsSendingReset(false)
    if (error) {
      const msg = error.message?.toLowerCase() || ""
      if (msg.includes("magic link") || msg.includes("sending") || (error as any).status === 500) {
        setError(
          "Supabase email service encountered an SMTP authentication error (Gmail 535 BadCredentials). Please configure a 16-character Google App Password in Supabase Dashboard → Authentication → Email Settings, or log in via 'Continue with Google'."
        )
      } else {
        setError(error.message)
      }
    } else {
      setResetSent(true)
    }
  }

  const handleSendOtp = async () => {
    if (!otpEmail) {
      setError("Please enter your email address.")
      return
    }
    setIsSendingOtp(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOtp({
      email: otpEmail,
      options: { shouldCreateUser: false },
    })
    setIsSendingOtp(false)
    if (error) {
      const msg = error.message?.toLowerCase() || ""
      if (
        msg.includes("signups not allowed") ||
        (msg.includes("otp") && msg.includes("not allowed"))
      ) {
        setError("No active account found with this email. Please create an account first.")
      } else if (msg.includes("magic link") || msg.includes("sending") || (error as any).status === 500) {
        setError(
          "Supabase SMTP error: Google rejected the Gmail credentials configured in Supabase (535 BadCredentials). In your Supabase Dashboard → Authentication → Email Settings, you must enter a 16-character Google App Password (not your normal Gmail password). In the meantime, you can log in directly using your Password or 'Continue with Google' below."
        )
      } else {
        setError(error.message)
      }
    } else {
      router.push(`/verify-otp?email=${encodeURIComponent(otpEmail)}&type=email`)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-8 relative transition-colors duration-300">
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        {/* Brand Header */}
        <section id="login-hero" className="flex flex-col items-center mb-6 text-center scroll-mt-24">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <AsciLogo size={40} showText={false} />
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl tracking-tight text-foreground">ASCI</span>
              <span className="badge-coral text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded-full">Academy</span>
            </div>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground" style={{ letterSpacing: "-0.5px" }}>
            Welcome back
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Access your courses, practice problems, and interactive visualizers.
          </p>
        </section>

        {/* Auth Card — Anthropic Cream Surface Card */}
        <div className="rounded-2xl border border-hairline bg-card p-7 sm:p-9 shadow-sm">

          {/* Method Toggle */}
          <div className="grid grid-cols-2 p-1 mb-6 rounded-lg bg-secondary border border-hairline">
            <button
              type="button"
              onClick={() => { setLoginMode("password"); setError(null) }}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-medium transition-all rounded-md cursor-pointer ${
                loginMode === "password"
                  ? "bg-card text-foreground shadow-xs border border-hairline"
                  : "text-muted-foreground hover:text-foreground bg-transparent"
              }`}
            >
              <Lock className="h-3.5 w-3.5" />
              Password
            </button>
            <button
              type="button"
              onClick={() => { setLoginMode("otp"); setError(null) }}
              className={`flex items-center justify-center gap-2 py-2 text-xs font-medium transition-all rounded-md cursor-pointer ${
                loginMode === "otp"
                  ? "bg-card text-foreground shadow-xs border border-hairline"
                  : "text-muted-foreground hover:text-foreground bg-transparent"
              }`}
            >
              <KeyRound className="h-3.5 w-3.5" />
              Email Code
            </button>
          </div>

          {/* Feedback Alerts */}
          {error && (
            <div className="mb-5 flex flex-col gap-2 bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3.5 rounded-md">
              <div className="flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="flex-1 leading-relaxed">{error}</div>
              </div>
              {error.includes("Google Cloud Configuration") && (
                <div className="mt-1 rounded border border-border/40 bg-background/80 p-2.5 text-[11px] leading-relaxed text-foreground font-sans space-y-1">
                  <div className="font-semibold text-primary">Quick Localhost Fix:</div>
                  <ol className="list-decimal list-inside space-y-0.5 text-muted-foreground">
                    <li>Open <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-primary underline hover:opacity-80">Google Cloud Credentials</a></li>
                    <li>Click your OAuth 2.0 Web Client ID</li>
                    <li>Under <strong className="text-foreground">Authorized JavaScript origins</strong>, add <code className="bg-secondary px-1 py-0.5 rounded font-mono text-[10px] text-foreground">http://localhost:3000</code> and <code className="bg-secondary px-1 py-0.5 rounded font-mono text-[10px] text-foreground">http://localhost</code></li>
                    <li>Save changes (takes 1-2 min to propagate)</li>
                  </ol>
                </div>
              )}
            </div>
          )}

          {resetSent && (
            <div className="mb-5 flex items-start gap-2.5 bg-primary/10 border border-primary/30 text-primary text-xs p-3 rounded-md">
              <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
              <div className="flex-1 leading-relaxed">
                Password recovery link sent. Check your email inbox.
              </div>
            </div>
          )}

          {/* Mode 1: Password Form */}
          {loginMode === "password" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-background border border-hairline rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-medium text-foreground">Password</label>
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    disabled={isSendingReset}
                    className="text-primary hover:underline text-xs transition-colors"
                  >
                    {isSendingReset ? "Sending..." : "Forgot password?"}
                  </button>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="h-4 w-4" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    autoComplete="current-password"
                    className="w-full bg-background border border-hairline rounded-md pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="••••••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || isGoogleLoading}
                className="btn-primary w-full mt-5 py-2.5 rounded-md text-xs font-medium cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="h-4 w-4" />
                  </div>
                  <input
                    type="email"
                    value={otpEmail}
                    onChange={(e) => { setOtpEmail(e.target.value); setError(null) }}
                    className="w-full bg-background border border-hairline rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We will send a 6-digit login code directly to your email inbox.
              </p>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={isSendingOtp || isGoogleLoading}
                className="btn-primary w-full mt-2 py-2.5 rounded-md text-xs font-medium cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSendingOtp ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Sending passcode...</span>
                  </>
                ) : (
                  <>
                    <span>Send Login Passcode</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* Hairline Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-hairline" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">or continue with</span>
            </div>
          </div>

          {/* Google SSO Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading || isGoogleLoading}
            className="w-full border border-hairline bg-background hover:bg-secondary text-foreground text-xs py-2.5 px-4 rounded-md transition-colors flex items-center justify-center gap-2.5 disabled:opacity-50 cursor-pointer font-medium"
          >
            {isGoogleLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                <span>Continue with Google</span>
              </>
            )}
          </button>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-6 text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline font-medium">
            Create an account
          </Link>
        </p>
      </div>
    </main>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center bg-background text-foreground p-4">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </main>
    }>
      <LoginForm />
    </Suspense>
  )
}
