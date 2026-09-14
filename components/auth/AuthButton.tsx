"use client"

import React from "react"
import { useAuth } from "@/context/auth-context"
import { GoogleSignInButton } from "./google-sign-in-button"
import { UserMenu } from "./user-menu"
import { extractFirstName, getInitials } from "@/lib/user-utils"
import { Loader2 } from "lucide-react"

export interface AuthButtonProps {
  variant?: "filled" | "outline"
  signInLabel?: string
  className?: string
  showGetStarted?: boolean
  onOpenWishlist?: () => void
  wishlistCount?: number
}

/**
 * AuthButton — Top-right header authentication control
 * Renders:
 * - When unauthenticated: Google Sign In button
 * - When authenticated: UserMenu with profile avatar, name, and dropdown
 * - When loading: Sleek skeleton/spinner placeholder
 */
export function AuthButton({
  variant = "outline",
  signInLabel = "Sign in",
  className = "",
  onOpenWishlist = () => {},
  wishlistCount = 0,
}: AuthButtonProps) {
  const { user, profile, isLoading, signOut, error, clearError } = useAuth()

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 h-9 px-3 rounded-full border border-border/60 bg-secondary/30 text-muted-foreground animate-pulse">
        <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
        <span className="text-xs">Loading…</span>
      </div>
    )
  }

  if (user) {
    const rawName = profile?.name || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Student"
    const displayName = extractFirstName(rawName)
    const userInitials = getInitials(rawName)
    const navAvatar = profile?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture || null
    const isAdmin = profile?.role === "admin" || profile?.role === "super_admin" || user.user_metadata?.role === "admin"
    const userRoleBadge = isAdmin ? "ADMIN" : (profile?.role ? profile.role.toUpperCase() : "STUDENT")

    return (
      <UserMenu
        user={user}
        userProfile={profile}
        isAdmin={isAdmin}
        displayName={displayName}
        userInitials={userInitials}
        navAvatar={navAvatar}
        userRoleBadge={userRoleBadge}
        wishlistCount={wishlistCount}
        onSignOut={signOut}
        onOpenWishlist={onOpenWishlist}
      />
    )
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <GoogleSignInButton
        variant={variant}
        label={signInLabel}
        onError={(err) => console.error("Sign in error:", err)}
      />
    </div>
  )
}

export default AuthButton
