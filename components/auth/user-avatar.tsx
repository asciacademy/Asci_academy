"use client"

import React, { useState } from "react"
import { getInitials } from "@/lib/user-utils"

export interface UserAvatarProps {
  src?: string | null
  name?: string | null
  email?: string | null
  size?: "xs" | "sm" | "md" | "lg" | "xl"
  className?: string
  showOnlineBadge?: boolean
  isOnline?: boolean
}

const sizeClasses = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-7 w-7 text-[11px]",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-sm",
  xl: "h-14 w-14 text-base",
}

const badgeSizes = {
  xs: "h-1.5 w-1.5",
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
  xl: "h-3.5 w-3.5",
}

/**
 * UserAvatar
 * Renders user profile picture from Google/OAuth with no-referrer security,
 * falling back to styled initials if image fails or is unavailable.
 */
export function UserAvatar({
  src,
  name,
  email,
  size = "md",
  className = "",
  showOnlineBadge = true,
  isOnline = true,
}: UserAvatarProps) {
  const [hasImageError, setHasImageError] = useState(false)
  const initials = getInitials(name || email?.split("@")[0] || "Student")

  const showImage = Boolean(src && !hasImageError)

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 rounded-full font-bold uppercase overflow-hidden border border-primary/25 bg-primary/15 text-primary shadow-inner select-none ${sizeClasses[size]} ${className}`}
    >
      {showImage ? (
        <img
          src={src!}
          alt={name || "User Avatar"}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
          onError={() => setHasImageError(true)}
        />
      ) : (
        <span>{initials}</span>
      )}

      {showOnlineBadge && (
        <span
          className={`absolute bottom-0 right-0 rounded-full border-2 border-background z-10 ${
            isOnline ? "bg-primary" : "bg-zinc-400"
          } ${badgeSizes[size]}`}
          aria-label={isOnline ? "Online" : "Offline"}
        />
      )}
    </div>
  )
}
