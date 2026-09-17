"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { createClient } from "@/utils/supabase/client"

interface GoogleSignInButtonProps {
  /** Visual variant */
  variant?: "filled" | "outline"
  /** Custom label override */
  label?: string
  /** Full-width button */
  fullWidth?: boolean
  /** Additional className */
  className?: string
  /** Callback on error */
  onError?: (message: string) => void
  /** Optional relative path to redirect after successful sign-in (e.g. /courses/dsa) */
  next?: string
}

const GoogleLogo = ({ className = "w-[18px] h-[18px]" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
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
)

/**
 * GoogleSignInButton
 *
 * Triggers Supabase Google OAuth with `prompt: 'select_account'`.
 * Google handles the entire account selection — no fake UI.
 *
 * Two visual variants:
 * - "filled" (default): White button with Google branding (Google-style)
 * - "outline": Transparent border button matching the site theme
 */
export function GoogleSignInButton({
  variant = "filled",
  label,
  fullWidth = false,
  className = "",
  onError,
  next,
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const supabase = createClient()
      const nextParam = next ? `?next=${encodeURIComponent(next)}` : ""
      const callbackUrl = `${window.location.origin}/auth/callback${nextParam}`
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: callbackUrl,
          queryParams: {
            prompt: "select_account",
            access_type: "offline",
          },
        },
      })

      if (error) {
        const msg = error.message?.toLowerCase() || ""
        if (msg.includes("invalid_client") || msg.includes("origin") || msg.includes("unregistered")) {
          onError?.("Google Cloud Configuration: Current origin is not registered in Google Cloud Console > Authorized JavaScript origins for this Client ID.")
        } else {
          onError?.(error.message)
        }
        setIsLoading(false)
      }
      // On success, Supabase redirects the browser — no cleanup needed
    } catch (err: any) {
      const message = err?.message || "Google sign-in failed. Please try again."
      onError?.(message)
      setIsLoading(false)
    }
  }

  const buttonLabel = label || "Sign in with Google"
  const widthClass = fullWidth ? "w-full" : ""

  if (variant === "outline") {
    return (
      <button
        type="button"
        onClick={handleSignIn}
        disabled={isLoading}
        aria-label={buttonLabel}
        className={`
          group flex items-center justify-center gap-2.5
          rounded-full border border-border/80 dark:border-white/15
          bg-secondary/30 hover:bg-secondary/70
          px-4 py-2 text-[13px] font-medium
          text-muted-foreground hover:text-foreground
          transition-all cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
          ${widthClass} ${className}
        `}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
        ) : (
          <GoogleLogo className="w-4 h-4" />
        )}
        <span>{isLoading ? "Signing in…" : buttonLabel}</span>
      </button>
    )
  }

  // Default: "filled" — Google-brand white button
  return (
    <button
      type="button"
      onClick={handleSignIn}
      disabled={isLoading}
      aria-label={buttonLabel}
      className={`
        group flex items-center justify-center gap-2.5
        rounded-full
        bg-white dark:bg-card
        hover:bg-gray-50 dark:hover:bg-secondary
        active:bg-gray-100 dark:active:bg-muted
        px-5 py-2.5 text-[13.5px] font-semibold
        text-[#1f1f1f] dark:text-foreground tracking-[-0.01em]
        transition-all cursor-pointer
        shadow-[0_1px_3px_rgba(0,0,0,0.08),0_2px_8px_rgba(0,0,0,0.04)]
        hover:shadow-[0_2px_6px_rgba(0,0,0,0.12),0_4px_12px_rgba(0,0,0,0.06)]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${widthClass} ${className}
      `}
    >
      {isLoading ? (
        <Loader2 className="w-[18px] h-[18px] animate-spin text-[#5f6368]" />
      ) : (
        <GoogleLogo />
      )}
      <span>{isLoading ? "Signing in…" : buttonLabel}</span>
    </button>
  )
}
