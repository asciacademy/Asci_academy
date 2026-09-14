"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { Mail, Loader2, AlertCircle, CheckCircle2, ArrowLeft, ArrowRight } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()
    const siteUrl = window.location.origin

    const { error } = await supabase.auth.resetPasswordForEmail(email.trim().toLowerCase(), {
      redirectTo: `${siteUrl}/reset-password`,
    })

    setIsLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSent(true)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-8">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="font-serif text-3xl tracking-tight text-foreground">ASCI</span>
            <span className="badge-coral text-[10px]">LMS</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground" style={{ letterSpacing: "-0.5px" }}>
            Reset your password
          </h1>
          <p className="text-xs text-body mt-1">
            Enter your registered email address and we&apos;ll send you instructions.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-hairline bg-card p-7 sm:p-9 shadow-sm">
          {sent ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-serif text-xl font-normal text-foreground">Recovery Link Sent</h2>
              <p className="text-xs text-body leading-relaxed">
                Check <span className="font-medium text-foreground">{email}</span> for a secure password reset link. It expires in 1 hour.
              </p>
              <Link
                href="/login"
                className="mt-3 text-xs text-primary hover:underline flex items-center gap-1.5 font-medium"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div className="mb-5 flex items-start gap-2.5 bg-destructive/10 border border-destructive/20 text-destructive text-xs p-3 rounded-md">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="flex-1 leading-relaxed">{error}</div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Mail className="h-4 w-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background border border-hairline rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full mt-4 py-2.5 rounded-md text-xs font-medium cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Recovery Link</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>

              <div className="text-center mt-6 pt-5 border-t border-hairline">
                <Link href="/login" className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5">
                  <ArrowLeft className="h-3.5 w-3.5" /> Back to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  )
}
