"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

export default function ConfirmEmailChangePage() {
  const router = useRouter()
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const supabase = createClient()
    supabase.auth
      .getSession()
      .then(({ data, error }: any) => {
        if (error || !data?.session) {
          setErrorMsg("This confirmation link is invalid or has expired.")
          setStatus("error")
        } else {
          setStatus("success")
          setTimeout(() => router.push("/profile"), 2500)
        }
      })
      .catch(() => {
        setErrorMsg("This confirmation link is invalid or has expired.")
        setStatus("error")
      })
  }, [router])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-8">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <span className="font-serif text-3xl tracking-tight text-foreground">ASCI</span>
            <span className="badge-coral text-[10px]">LMS</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-hairline bg-card p-7 sm:p-9 shadow-sm">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary border border-hairline text-primary">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="font-serif text-2xl font-normal text-foreground">Confirming Email Update</h1>
              <p className="text-xs text-muted-foreground">Verifying your security credentials...</p>
              <Loader2 className="h-5 w-5 animate-spin text-primary mt-2" />
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 border border-primary/30">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
              <h1 className="font-serif text-2xl font-normal text-foreground">Email Confirmed</h1>
              <p className="text-xs text-body">Your registered email address has been updated. Redirecting to profile...</p>
              <Loader2 className="h-4 w-4 animate-spin text-primary mt-2" />
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4 py-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20">
                <AlertCircle className="h-6 w-6 text-destructive" />
              </div>
              <h1 className="font-serif text-2xl font-normal text-foreground">Verification Failed</h1>
              <p className="text-xs text-body">{errorMsg}</p>
              <Link href="/profile" className="btn-primary inline-flex items-center px-4 py-2 rounded-md text-xs font-medium mt-2">
                Return to Profile
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
