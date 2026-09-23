"use client"

import { useAuth } from "@/context/auth-context"

/**
 * Hook to check premium/subscription status.
 * Returns whether the user has an active premium subscription ("architect" tier).
 */
export function usePremium() {
  const { profile, isAuthenticated, isLoading } = useAuth()

  const tier = profile?.subscription_tier || "free"
  const isPremium = tier === "architect"
  const subscriptionStatus = profile?.subscription_status || "inactive"
  const isActive = subscriptionStatus === "active"
  const periodEnd = profile?.current_period_end
    ? new Date(profile.current_period_end)
    : null

  // Check if subscription has expired
  const isExpired = periodEnd ? periodEnd < new Date() : false
  const hasValidPremium = isPremium && isActive && !isExpired

  return {
    /** User has an active, non-expired premium subscription */
    isPremium: hasValidPremium,
    /** Raw subscription tier from profile */
    tier,
    /** Subscription status (active, cancelled, etc.) */
    subscriptionStatus,
    /** Whether the subscription period has expired */
    isExpired,
    /** End date of the current subscription period */
    periodEnd,
    /** Whether auth is still loading */
    isLoading,
    /** Whether the user is logged in at all */
    isAuthenticated,
  }
}
