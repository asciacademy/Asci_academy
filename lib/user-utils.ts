/**
 * User utility helper functions
 * Handles clean display name resolution, avatar fallback initials, and formatting.
 */

interface UserMetadata {
  given_name?: string
  first_name?: string
  full_name?: string
  name?: string
  family_name?: string
  avatar_url?: string
  picture?: string
  [key: string]: any
}

interface ProfileData {
  name?: string | null
  email?: string | null
  avatar_url?: string | null
  [key: string]: any
}

/**
 * Resolves a clean, friendly display name for the user.
 * Priority:
 * 1. User's explicitly customized profile.name (e.g. "Master Access", "Mokshagna Theja", "Alex")
 * 2. OAuth metadata full_name or name (e.g. from Google account)
 * 3. OAuth metadata given_name + family_name
 * 4. Clean formatted name from email prefix (e.g. "master.access72@gmail.com" -> "Master Access", "masteraccess72" -> "Master Access")
 */
export function resolveDisplayName(
  profile?: ProfileData | null,
  metadata?: UserMetadata | null,
  fallbackEmail?: string | null
): string {
  const email = (fallbackEmail || profile?.email || "")?.toLowerCase()
  const emailPrefix = email ? email.split("@")[0] : ""

  // 1. Check customized profile name
  const rawProfileName = profile?.name?.trim()
  if (rawProfileName && !rawProfileName.includes("@")) {
    const profileLower = rawProfileName.toLowerCase()
    // If it's NOT just the raw unformatted email handle
    if (profileLower !== emailPrefix) {
      return rawProfileName
    }
  }

  // 2. Check OAuth metadata (Google full name or name)
  const metaFullName = metadata?.full_name?.trim() || metadata?.name?.trim()
  if (metaFullName && !metaFullName.includes("@")) {
    return metaFullName
  }

  // 3. Check OAuth given_name and family_name
  const given = metadata?.given_name?.trim() || metadata?.first_name?.trim()
  const family = metadata?.family_name?.trim()
  if (given && family) {
    return `${capitalize(given)} ${capitalize(family)}`
  }
  if (given) {
    return capitalize(given)
  }

  // 4. If profile name exists and was not an email, format it nicely
  if (rawProfileName && !rawProfileName.includes("@")) {
    return cleanHandleToDisplayName(rawProfileName)
  }

  // 5. Fallback to cleaning the email handle
  if (emailPrefix) {
    return cleanHandleToDisplayName(emailPrefix)
  }

  return "Scholar"
}

/**
 * Backward compatibility alias for extractFirstName
 */
export const extractFirstName = resolveDisplayName

/**
 * Clean an email prefix or handle into a properly capitalized display name
 * Examples:
 * - "masteraccess72" -> "Master Access"
 * - "master.access72" -> "Master Access"
 * - "alex.turner" -> "Alex Turner"
 * - "john_doe" -> "John Doe"
 */
export function cleanHandleToDisplayName(rawHandle: string): string {
  if (!rawHandle) return "Scholar"

  // Remove email domain if present
  let clean = rawHandle.includes("@") ? rawHandle.split("@")[0] : rawHandle

  // Replace separators (dots, underscores, hyphens) with spaces
  clean = clean.replace(/[._-]+/g, " ").trim()

  // Split into words
  const words = clean.split(/\s+/).filter(Boolean)

  if (words.length === 0) return "Scholar"

  // Clean trailing digits from each word
  const formattedWords = words.map((w) => {
    const stripped = w.replace(/\d+$/, "")
    const effective = stripped.length >= 2 ? stripped : w
    return capitalize(effective)
  })

  // If there was only 1 word, check if it's compound like "masteraccess" -> "Master Access"
  if (formattedWords.length === 1) {
    const single = formattedWords[0]
    // Check camelCase "johnDoe" -> "John Doe"
    const splitCompound = single.replace(/([a-z])([A-Z])/g, "$1 $2")
    if (splitCompound !== single) {
      return splitCompound
    }
    // Check known patterns like "masteraccess" -> "Master Access"
    if (single.toLowerCase().startsWith("master") && single.length > 6) {
      const rest = single.slice(6)
      return `Master ${capitalize(rest)}`
    }
    return single
  }

  return formattedWords.join(" ")
}

/**
 * Capitalize first letter of a string
 */
function capitalize(str: string): string {
  if (!str) return ""
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Get 1-2 letter uppercase initials for avatars
 */
export function getInitials(name?: string | null): string {
  if (!name || typeof name !== "string") return "U"
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return "U"
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[1][0]).toUpperCase()
}
