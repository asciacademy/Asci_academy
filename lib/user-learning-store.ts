"use client"

import { useState, useEffect, useCallback } from "react"

export interface WishlistItem {
  id: string
  courseSlug: string
  title: string
  category?: string
  level?: string
  duration?: string
  thumbnail?: string
  is_premium?: boolean
  desc?: string
  playerUrl?: string
  addedAt: string // ISO date
}

export interface HistoryItem {
  id: string
  courseSlug: string
  courseTitle: string
  lessonId?: string
  lessonTitle?: string
  category?: string
  level?: string
  progressPercent?: number
  playerUrl: string
  lastAccessedAt: string // ISO date
}

const WISHLIST_KEY = "asci_user_wishlist_v1"
const HISTORY_KEY = "asci_user_history_v1"

// ==========================================
// WISHLIST CORE METHODS
// ==========================================

export function getWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(WISHLIST_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch (err) {
    console.warn("Failed to load wishlist from storage:", err)
    return []
  }
}

export function isInWishlist(courseSlug: string): boolean {
  if (!courseSlug) return false
  const list = getWishlist()
  return list.some((item) => item.courseSlug === courseSlug || item.id === courseSlug)
}

export function addToWishlist(
  course: Omit<WishlistItem, "id" | "addedAt">
): { success: boolean; wishlist: WishlistItem[] } {
  if (typeof window === "undefined") return { success: false, wishlist: [] }
  try {
    const current = getWishlist()
    if (current.some((c) => c.courseSlug === course.courseSlug)) {
      return { success: true, wishlist: current }
    }

    const newItem: WishlistItem = {
      ...course,
      id: `wish_${course.courseSlug}_${Date.now()}`,
      addedAt: new Date().toISOString(),
    }

    const updated = [newItem, ...current]
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent("asci-wishlist-update", { detail: updated }))
    return { success: true, wishlist: updated }
  } catch (e) {
    console.warn("Failed to add to wishlist:", e)
    return { success: false, wishlist: getWishlist() }
  }
}

export function removeFromWishlist(courseSlug: string): { success: boolean; wishlist: WishlistItem[] } {
  if (typeof window === "undefined") return { success: false, wishlist: [] }
  try {
    const current = getWishlist()
    const updated = current.filter((c) => c.courseSlug !== courseSlug && c.id !== courseSlug)
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent("asci-wishlist-update", { detail: updated }))
    return { success: true, wishlist: updated }
  } catch (e) {
    console.warn("Failed to remove from wishlist:", e)
    return { success: false, wishlist: getWishlist() }
  }
}

export function clearWishlist(): { success: boolean; wishlist: WishlistItem[] } {
  if (typeof window === "undefined") return { success: false, wishlist: [] }
  try {
    localStorage.removeItem(WISHLIST_KEY)
    window.dispatchEvent(new CustomEvent("asci-wishlist-update", { detail: [] }))
    return { success: true, wishlist: [] }
  } catch (e) {
    console.warn("Failed to clear wishlist:", e)
    return { success: false, wishlist: [] }
  }
}

export function toggleWishlist(
  course: Omit<WishlistItem, "id" | "addedAt">
): { isSaved: boolean; wishlist: WishlistItem[] } {
  const currentlySaved = isInWishlist(course.courseSlug)
  if (currentlySaved) {
    const res = removeFromWishlist(course.courseSlug)
    return { isSaved: false, wishlist: res.wishlist }
  } else {
    const res = addToWishlist(course)
    return { isSaved: true, wishlist: res.wishlist }
  }
}

// ==========================================
// LEARNING HISTORY CORE METHODS
// ==========================================

export function getLearningHistory(): HistoryItem[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.sort(
      (a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime()
    )
  } catch (err) {
    console.warn("Failed to load history from storage:", err)
    return []
  }
}

export function recordCourseHistory(
  entry: Omit<HistoryItem, "id" | "lastAccessedAt">
): { success: boolean; history: HistoryItem[] } {
  if (typeof window === "undefined") return { success: false, history: [] }
  try {
    const current = getLearningHistory()
    // Remove previous entry for this course to bubble it to the top
    const filtered = current.filter((item) => item.courseSlug !== entry.courseSlug)

    const newItem: HistoryItem = {
      ...entry,
      id: `hist_${entry.courseSlug}_${Date.now()}`,
      lastAccessedAt: new Date().toISOString(),
    }

    // Keep up to 25 recent courses
    const updated = [newItem, ...filtered].slice(0, 25)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent("asci-history-update", { detail: updated }))
    return { success: true, history: updated }
  } catch (e) {
    console.warn("Failed to record history:", e)
    return { success: false, history: getLearningHistory() }
  }
}

export function removeHistoryItem(courseSlug: string): { success: boolean; history: HistoryItem[] } {
  if (typeof window === "undefined") return { success: false, history: [] }
  try {
    const current = getLearningHistory()
    const updated = current.filter((h) => h.courseSlug !== courseSlug && h.id !== courseSlug)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
    window.dispatchEvent(new CustomEvent("asci-history-update", { detail: updated }))
    return { success: true, history: updated }
  } catch (e) {
    console.warn("Failed to remove history item:", e)
    return { success: false, history: getLearningHistory() }
  }
}

export function clearLearningHistory(): { success: boolean; history: HistoryItem[] } {
  if (typeof window === "undefined") return { success: false, history: [] }
  try {
    localStorage.removeItem(HISTORY_KEY)
    window.dispatchEvent(new CustomEvent("asci-history-update", { detail: [] }))
    return { success: true, history: [] }
  } catch (e) {
    console.warn("Failed to clear history:", e)
    return { success: false, history: [] }
  }
}

// ==========================================
// REACT HOOKS
// ==========================================

export function useWishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const refresh = useCallback(() => {
    setWishlist(getWishlist())
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    refresh()
    const handleUpdate = (e: any) => {
      if (e.detail) setWishlist(e.detail)
      else refresh()
    }
    window.addEventListener("asci-wishlist-update", handleUpdate)
    return () => window.removeEventListener("asci-wishlist-update", handleUpdate)
  }, [refresh])

  const isSaved = useCallback(
    (courseSlug: string) => {
      return wishlist.some((item) => item.courseSlug === courseSlug || item.id === courseSlug)
    },
    [wishlist]
  )

  const toggle = useCallback((course: Omit<WishlistItem, "id" | "addedAt">) => {
    return toggleWishlist(course)
  }, [])

  const remove = useCallback((courseSlug: string) => {
    return removeFromWishlist(courseSlug)
  }, [])

  const clear = useCallback(() => {
    return clearWishlist()
  }, [])

  return {
    wishlist,
    count: wishlist.length,
    isLoaded,
    isSaved,
    toggle,
    remove,
    clear,
    refresh,
  }
}

export function useLearningHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  const refresh = useCallback(() => {
    setHistory(getLearningHistory())
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    refresh()
    const handleUpdate = (e: any) => {
      if (e.detail) setHistory(e.detail)
      else refresh()
    }
    window.addEventListener("asci-history-update", handleUpdate)
    return () => window.removeEventListener("asci-history-update", handleUpdate)
  }, [refresh])

  const record = useCallback((entry: Omit<HistoryItem, "id" | "lastAccessedAt">) => {
    return recordCourseHistory(entry)
  }, [])

  const remove = useCallback((courseSlug: string) => {
    return removeHistoryItem(courseSlug)
  }, [])

  const clear = useCallback(() => {
    return clearLearningHistory()
  }, [])

  return {
    history,
    count: history.length,
    isLoaded,
    record,
    remove,
    clear,
    refresh,
  }
}
