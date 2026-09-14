"use server"

import { createClient } from "@/utils/supabase/server"

export interface ServerWishlistItem {
  id: string
  courseSlug: string
  title: string
  category?: string
  level?: string
  duration?: string
  thumbnail?: string
  addedAt: string
}

export interface ServerHistoryItem {
  id: string
  courseSlug: string
  courseTitle: string
  lessonId?: string
  lessonTitle?: string
  playerUrl: string
  lastAccessedAt: string
  progressPercent?: number
}

/**
 * Sync wishlist items for authenticated user
 */
export async function syncWishlistServer(
  items: ServerWishlistItem[]
): Promise<{ success: boolean; items: ServerWishlistItem[]; message?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: true, items, message: "Wishlist synced locally (Guest/Demo mode)." }
  }

  try {
    // Attempt to store in profile preferences or user metadata
    await supabase.auth.updateUser({
      data: { asci_wishlist: items.slice(0, 50) },
    })

    return { success: true, items, message: "Wishlist backed up to cloud." }
  } catch (err: any) {
    console.warn("Failed to sync wishlist to cloud:", err)
    return { success: true, items, message: "Saved locally." }
  }
}

/**
 * Record a course/lesson visit in learning history on server
 */
export async function recordHistoryServer(
  item: ServerHistoryItem
): Promise<{ success: boolean; message?: string }> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { success: true, message: "History recorded locally." }
  }

  try {
    const existingMeta = user.user_metadata?.asci_history || []
    const filtered = existingMeta.filter((h: any) => h.courseSlug !== item.courseSlug)
    const updated = [item, ...filtered].slice(0, 30)

    await supabase.auth.updateUser({
      data: { asci_history: updated },
    })

    return { success: true, message: "History synced." }
  } catch (err: any) {
    return { success: true, message: "History preserved locally." }
  }
}

/**
 * Fetch cloud wishlist & history
 */
export async function getUserSavedDataServer(): Promise<{
  wishlist: ServerWishlistItem[]
  history: ServerHistoryItem[]
}> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { wishlist: [], history: [] }
  }

  const wishlist = user.user_metadata?.asci_wishlist || []
  const history = user.user_metadata?.asci_history || []

  return { wishlist, history }
}
