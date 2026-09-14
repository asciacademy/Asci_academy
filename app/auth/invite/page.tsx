"use client"

import { Suspense } from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Lock, User, Loader2, AlertCircle, CheckCircle2, Eye, EyeOff, ArrowRight } from "lucide-react"

function AcceptInviteForm() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [email, setEmail] = useState("")
  const [validSession, setValidSession] = useState<boolean | null>(null)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth
      .getSession()
      .then(({ data }: any) => {
        if (data?.session?.user) {
          setEmail(data.session.user.email || "")
          setValidSession(true)
        } else {
          setValidSession(false)
        }
      })
      .catch(() => {
        setValidSession(false)
      })
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)

    if (!name.trim()) {
      setError("Full name is required.")
      return
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    setIsLoading(true)
    const supabase = createClient()

    const { error } = await supabase.auth.updateUser({
      password,
      data: { full_name: name, name },
    })

    setIsLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
      setTimeout(() => router.push("/dashboard"), 2000)
    }
  }

  if (validSession === null) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    )
  }

  if (!validSession) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 text-center">
        <div className="w-full max-w-md rounded-2xl border border-hairline bg-card p-8 shadow-sm">
          <AlertCircle className="h-10 w-10 text-destructive mx-auto mb-4" />
          <h1 className="font-serif text-2xl font-normal mb-2">Invitation Expired</h1>
          <p className="text-xs text-muted-foreground mb-6">
            This invite link is invalid or has already been used.
          </p>
          <Link href="/signup" className="btn-primary inline-flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-md">
            Create an account instead
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="font-serif text-3xl tracking-tight text-foreground">ASCI</span>
            <span className="badge-coral text-[10px]">LMS</span>
          </Link>
          <h1 className="font-serif text-2xl sm:text-3xl font-normal tracking-tight text-foreground" style={{ letterSpacing: "-0.5px" }}>
            Accept Invitation
          </h1>
          <p className="text-xs text-body mt-1">Complete your profile to activate your cohort access.</p>
          {email && <p className="text-xs font-medium text-foreground mt-0.5">{email}</p>}
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-7 sm:p-9 shadow-sm">
          {success ? (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h2 className="font-serif text-xl font-normal text-foreground">Account Activated</h2>
              <p className="text-xs text-muted-foreground">Routing to your dashboard...</p>
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <User className="h-4 w-4" />
                    </div>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-background border border-hairline rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Jane Doe"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Set Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-background border border-hairline rounded-md pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Min. 6 characters"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-foreground">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                      <Lock className="h-4 w-4" />
                    </div>
                    <input
                      type={showPass ? "text" : "password"}
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="w-full bg-background border border-hairline rounded-md pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                      placeholder="Repeat password"
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
                      <span>Activating...</span>
                    </>
                  ) : (
                    <>
                      <span>Activate Account</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </main>
      }
    >
      <AcceptInviteForm />
    </Suspense>
  )
}
