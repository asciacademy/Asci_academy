"use client"

import { useState } from "react"
import Link from "next/link"
import { signup } from "@/app/actions/auth"
import { createClient } from "@/utils/supabase/client"
import {
  Lock, Mail, User, Loader2, AlertCircle,
  Eye, EyeOff, ArrowRight, ArrowLeft
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { AsciLogo } from "@/components/asci-logo"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Calculate password strength
  const getStrength = (pass: string) => {
    if (!pass) return { score: 0, label: "Required", color: "text-muted-foreground" }
    let score = 0
    if (pass.length >= 6) score += 1
    if (pass.length >= 10) score += 1
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1
    if (/[^A-Za-z0-9]/.test(pass)) score += 1

    if (score <= 1) return { score: 1, label: "Weak (min 6 characters)", color: "text-rose-500" }
    if (score === 2) return { score: 2, label: "Medium", color: "text-blue-500" }
    if (score >= 3) return { score: 3, label: "Strong", color: "text-primary font-semibold" }
    return { score: 0, label: "Required", color: "text-muted-foreground" }
  }

  const strength = getStrength(password)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = (await signup(formData)) as { error?: string | object; redirectUrl?: string } | undefined

      if (result?.error) {
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : JSON.stringify(result.error) !== "{}"
            ? JSON.stringify(result.error)
            : "An unexpected error occurred during registration."

        setError(errorMessage)
        setIsLoading(false)
        return
      }

      if (result?.redirectUrl) {
        window.location.href = result.redirectUrl
      }
    } catch (e: any) {
      setError(e.message || "Something went wrong.")
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    const supabase = createClient()
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          prompt: "select_account",
          access_type: "offline",
        },
      },
    })
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
        <section id="signup-hero" className="flex flex-col items-center mb-6 text-center scroll-mt-24">
          <Link href="/" className="inline-flex items-center gap-2.5 mb-3 group">
            <AsciLogo size={40} showText={false} />
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl tracking-tight text-foreground">ASCI</span>
              <span className="badge-coral text-[10px] font-mono tracking-wider font-semibold uppercase px-2 py-0.5 rounded-full">Academy</span>
            </div>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground" style={{ letterSpacing: "-0.5px" }}>
            Create your account
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Sign up to start practicing coding problems and tracking your progress.
          </p>
        </section>

        {/* Card — Anthropic Cream Surface Card */}
        <div className="rounded-2xl border border-hairline bg-card p-7 sm:p-9 shadow-sm">
          {/* Error Message */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-md">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">{error}</div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-foreground">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <User className="h-4 w-4" />
                </div>
                <input
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className="w-full bg-background border border-hairline rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  placeholder="Jane Doe"
                />
              </div>
            </div>

            {/* Email */}
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
                  placeholder="jane@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-medium text-foreground">Password</label>
                <span className={`text-[11px] font-medium ${strength.color}`}>
                  {strength.label}
                </span>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
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

              {/* Password Segmented Indicator */}
              <div className="grid grid-cols-3 gap-1 pt-1">
                <div
                  className={`h-1 rounded-full transition-all ${
                    strength.score >= 1 ? "bg-rose-500" : "bg-hairline"
                  }`}
                />
                <div
                  className={`h-1 rounded-full transition-all ${
                    strength.score >= 2 ? "bg-blue-500" : "bg-hairline"
                  }`}
                />
                <div
                  className={`h-1 rounded-full transition-all ${
                    strength.score >= 3 ? "bg-primary" : "bg-hairline"
                  }`}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isGoogleLoading}
              className="btn-primary w-full mt-6 py-2.5 rounded-md text-xs font-medium cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Hairline Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-hairline" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-card px-3 text-muted-foreground">or continue with</span>
            </div>
          </div>

          {/* Google SSO */}
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
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  )
}
