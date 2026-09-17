"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useAuth } from "@/context/auth-context"
import { generateNonce } from "@/lib/auth/nonce"
import type { GoogleCredentialResponse, PromptMomentNotification } from "@/types/google-one-tap"

interface GoogleOneTapProps {
  /** Optional custom redirect route after sign-in */
  redirectTo?: string
  /** Callback fired when One Tap cannot be shown (e.g., suppressed, opted out, third-party cookies disabled) */
  onPromptUnavailable?: (reason: string) => void
  /** Manually disable One Tap on specific pages if required */
  disabled?: boolean
}

/** Reasons that indicate a permanent configuration issue — One Tap should not retry */
const PERMANENT_FAILURE_REASONS = new Set(["unregistered_origin", "invalid_client", "missing_client_id"])

export function GoogleOneTap({
  redirectTo,
  onPromptUnavailable,
  disabled = false,
}: GoogleOneTapProps) {
  const { isAuthenticated, isLoading } = useAuth()
  const router = useRouter()
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const rawNonceRef = useRef<string | null>(null)

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
  const isEnvDisabled = process.env.NEXT_PUBLIC_DISABLE_GOOGLE_ONE_TAP === "true"
  const isDisabled = disabled || isEnvDisabled

  // Guard against FedCM / One Tap dual-path firing the credential callback twice
  const isProcessingRef = useRef(false)

  // Callback to handle returned Google credential and sign in with Supabase
  const handleCredentialResponse = useCallback(
    async (response: GoogleCredentialResponse) => {
      if (!response.credential) {
        console.warn("[Google One Tap] Empty credential received from Google.")
        return
      }

      // Prevent duplicate processing if callback fires twice (FedCM + One Tap dual-path)
      if (isProcessingRef.current) {
        console.info("[Google One Tap] Credential callback already in progress, skipping duplicate.")
        return
      }
      isProcessingRef.current = true

      console.info("[Google One Tap] Received credential token. Authenticating with Supabase...")

      // Capture nonce before any async work to avoid race conditions
      const capturedNonce = rawNonceRef.current
      rawNonceRef.current = null

      try {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: response.credential,
          nonce: capturedNonce || undefined,
        })

        if (error) {
          console.error("[Google One Tap] Supabase signInWithIdToken error:", error.message)
          return
        }

        if (data?.session) {
          console.info("[Google One Tap] Successfully signed in user:", data.user?.email)
          router.refresh()
          if (redirectTo) {
            router.push(redirectTo)
          }
        }
      } catch (err: any) {
        console.error("[Google One Tap] Authentication callback failure:", err?.message || err)
      } finally {
        isProcessingRef.current = false
      }
    },
    [redirectTo, router]
  )

  const hasPromptedRef = useRef(false)
  /** Tracks whether a permanent config error killed One Tap (should NOT retry) */
  const hasPermanentFailureRef = useRef(false)

  // Reset refs when the user signs out so One Tap can re-appear
  // without requiring a full page reload.
  // Guard: only treat it as a real sign-out if we saw a live session
  // (not just stale localStorage that Supabase invalidated on init).
  const prevAuthenticatedRef = useRef(isAuthenticated)
  const hadLiveSessionRef = useRef(false)
  useEffect(() => {
    if (isAuthenticated) {
      hadLiveSessionRef.current = true
    }
    if (prevAuthenticatedRef.current && !isAuthenticated && hadLiveSessionRef.current) {
      // User genuinely signed out — allow One Tap to re-prompt
      hasPromptedRef.current = false
      hasPermanentFailureRef.current = false
      isProcessingRef.current = false
      rawNonceRef.current = null
      hadLiveSessionRef.current = false
    }
    prevAuthenticatedRef.current = isAuthenticated
  }, [isAuthenticated])

  // Initialize and display the One Tap prompt
  const initializeAndPrompt = useCallback(async () => {
    if (isDisabled) return
    if (isLoading) return
    if (isAuthenticated) return
    if (!clientId) {
      if (!isEnvDisabled) {
        console.warn("[Google One Tap] Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID environment variable.")
      }
      return
    }
    if (!window.google?.accounts?.id) {
      return
    }
    // Prevent duplicate calls in React StrictMode or concurrent re-renders
    if (hasPromptedRef.current) {
      return
    }
    // Don't retry after a permanent config error (e.g., unregistered origin)
    if (hasPermanentFailureRef.current) {
      return
    }

    hasPromptedRef.current = true

    try {
      // 1. Generate cryptographic raw & hashed nonce for anti-replay verification
      const { rawNonce, hashedNonce } = await generateNonce()
      rawNonceRef.current = rawNonce

      // 2. Cancel any existing GIS state before re-initializing
      //    (prevents internal errors when re-initializing after sign-out)
      try {
        window.google.accounts.id.cancel()
      } catch {
        // cancel() may throw if never initialized — safe to ignore
      }

      // 3. Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredentialResponse,
        nonce: hashedNonce,
        auto_select: false,
        cancel_on_tap_outside: false,
        context: "signin",
        use_fedcm_for_prompt: true,
        itp_support: true,
      })

      // 4. Prompt user with comprehensive moment diagnostics
      window.google.accounts.id.prompt((notification: PromptMomentNotification) => {
        if (notification.isNotDisplayed()) {
          const reason = notification.getNotDisplayedReason()
          if (PERMANENT_FAILURE_REASONS.has(reason)) {
            const currentOrigin = typeof window !== "undefined" ? window.location.origin : "current origin"
            console.warn(
              `[Google One Tap] Origin '${currentOrigin}' is not registered in Google Cloud Console.\n` +
              `To enable Google One Tap locally, add '${currentOrigin}' and 'http://localhost' to Authorized JavaScript origins for Client ID: ${clientId} at https://console.cloud.google.com/apis/credentials\n` +
              `To suppress One Tap locally without console noise, set NEXT_PUBLIC_DISABLE_GOOGLE_ONE_TAP="true" in .env.local.`
            )
            // Permanent config failure — do not retry
            hasPermanentFailureRef.current = true
          } else if (reason === "suppressed_by_user") {
            console.info("[Google One Tap] Prompt suppressed because it was recently dismissed by the user. Test in Incognito or clear site cookies.")
          } else if (reason === "opt_out_or_no_session") {
            console.info("[Google One Tap] No active Google account session found or user opted out.")
          } else {
            console.info("[Google One Tap] Prompt not displayed. Reason:", reason)
          }
          onPromptUnavailable?.(reason)
        } else if (notification.isSkippedMoment()) {
          const reason = notification.getSkippedReason()
          console.info("[Google One Tap] Prompt skipped. Reason:", reason)
        } else if (notification.isDismissedMoment()) {
          const reason = notification.getDismissedReason()
          console.info("[Google One Tap] Prompt dismissed. Reason:", reason)
        } else {
          console.info("[Google One Tap] Prompt active and visible.")
        }
      })
    } catch (err) {
      console.warn("[Google One Tap] Prompt initialization skipped:", err)
      // Transient errors should allow retry on next auth state change
      // (hasPromptedRef is already true, but will be reset on sign-out cycle)
    }
  }, [
    isDisabled,
    isEnvDisabled,
    isLoading,
    isAuthenticated,
    clientId,
    handleCredentialResponse,
    onPromptUnavailable,
  ])

  const [isReadyToPrompt, setIsReadyToPrompt] = useState(false)

  // Synchronize with SplashScreen so Google One Tap only appears after the splash screen finishes
  useEffect(() => {
    let splashAlreadyDismissed = false
    try {
      splashAlreadyDismissed = sessionStorage.getItem("asci_splash_seen") === "true"
    } catch {
      // Storage access may be restricted in some iframes
    }

    if (splashAlreadyDismissed) {
      // If splash was already seen, allow a brief grace period (400ms) for layout stabilization
      const timer = setTimeout(() => setIsReadyToPrompt(true), 400)
      return () => clearTimeout(timer)
    }

    const onSplashComplete = () => {
      // Wait 350ms after splash fade-out so the page transition is silky smooth
      setTimeout(() => {
        setIsReadyToPrompt(true)
      }, 350)
    }

    window.addEventListener("asci:splash-complete", onSplashComplete)

    // Safety fallback timer: SplashScreen dismisses at max 600ms + 250ms = 850ms,
    // so 1300ms guarantees prompt triggers even if the event was already fired
    const fallbackTimer = setTimeout(() => {
      setIsReadyToPrompt(true)
    }, 1300)

    return () => {
      window.removeEventListener("asci:splash-complete", onSplashComplete)
      clearTimeout(fallbackTimer)
    }
  }, [])

  // Check on mount if script is already present
  useEffect(() => {
    if (typeof window !== "undefined" && window.google?.accounts?.id) {
      setScriptLoaded(true)
    }
  }, [])

  // Trigger initialization when GIS script is ready, auth state resolves, AND splash screen completes
  useEffect(() => {
    if (scriptLoaded && isReadyToPrompt && !isAuthenticated && !isLoading) {
      initializeAndPrompt()
    }
  }, [scriptLoaded, isReadyToPrompt, isAuthenticated, isLoading, initializeAndPrompt])

  // Cleanup: cancel GIS on unmount to prevent stale callbacks
  useEffect(() => {
    return () => {
      try {
        window.google?.accounts?.id?.cancel()
      } catch {
        // Safe to ignore — component unmounting
      }
    }
  }, [])

  // If disabled, don't render script
  if (isDisabled) return null

  return (
    <Script
      src="https://accounts.google.com/gsi/client"
      strategy="afterInteractive"
      onLoad={() => {
        console.info("[Google One Tap] Google Identity Services script loaded.")
        setScriptLoaded(true)
      }}
      onError={(err) => {
        console.warn("[Google One Tap] Failed to load Google Identity Services script:", err)
        onPromptUnavailable?.("script_load_error")
      }}
    />
  )
}
