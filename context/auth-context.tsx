"use client"

import React, { createContext, useContext, useEffect, useState, useCallback } from "react"
import { User, Session } from "@supabase/supabase-js"
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export interface UserProfile {
  id: string
  email?: string | null
  name?: string | null
  avatar_url?: string | null
  role?: string | null
  xp?: number
  streak_count?: number
  [key: string]: any
}

export interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  session: Session | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  signInWithGoogle: (options?: { redirectTo?: string }) => Promise<void>
  signOut: () => Promise<void>
  clearError: () => void
  refreshProfile: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const CACHED_USER_KEY = "asci_auth_user"
const CACHED_PROFILE_KEY = "asci_auth_profile"

function getStoredUser(): User | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CACHED_USER_KEY) || sessionStorage.getItem(CACHED_USER_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function getStoredProfile(): UserProfile | null {
  if (typeof window === "undefined") return null
  try {
    const raw = localStorage.getItem(CACHED_PROFILE_KEY) || sessionStorage.getItem(CACHED_PROFILE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(getStoredUser)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(getStoredProfile)
  const [isLoading, setIsLoading] = useState(() => !getStoredUser())
  const [error, setError] = useState<string | null>(null)

  const saveUser = useCallback((newUser: User | null) => {
    setUser(newUser)
    if (typeof window !== "undefined") {
      try {
        if (newUser) {
          localStorage.setItem(CACHED_USER_KEY, JSON.stringify(newUser))
        } else {
          localStorage.removeItem(CACHED_USER_KEY)
        }
      } catch {}
    }
  }, [])

  const saveProfile = useCallback((newProfile: UserProfile | null) => {
    setProfile(newProfile)
    if (typeof window !== "undefined") {
      try {
        if (newProfile) {
          localStorage.setItem(CACHED_PROFILE_KEY, JSON.stringify(newProfile))
        } else {
          localStorage.removeItem(CACHED_PROFILE_KEY)
        }
      } catch {}
    }
  }, [])

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const supabase = createClient()
      const { data, error: profileErr } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle()

      if (!profileErr && data) {
        saveProfile(data)
      }
    } catch (err) {
      console.error("Error fetching user profile:", err)
    }
  }, [saveProfile])

  useEffect(() => {
    const supabase = createClient()
    let isMounted = true

    // Immediately synchronize from client storage so auth state is available synchronously
    const cachedUser = getStoredUser()
    const cachedProfile = getStoredProfile()
    if (cachedUser && isMounted) {
      setUser(cachedUser)
      if (cachedProfile) setProfile(cachedProfile)
      setIsLoading(false)
    }

    const initializeAuth = async () => {
      try {
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession()
        if (!isMounted) return

        let activeUser = initialSession?.user ?? null
        let activeSession = initialSession ?? null

        // If getSession didn't return user, do a quick fallback check with getUser()
        if (!activeUser) {
          try {
            const { data: userData, error: userErr } = await supabase.auth.getUser()
            if (!userErr && userData?.user) {
              activeUser = userData.user
            }
          } catch {}
        }

        if (activeUser) {
          setSession(activeSession)
          saveUser(activeUser)
          await fetchProfile(activeUser.id)
        } else if (sessionError) {
          const msg = sessionError.message?.toLowerCase() || ""
          if (msg.includes("invalid_grant") || msg.includes("revoked") || msg.includes("refresh_token_not_found")) {
            saveUser(null)
            setSession(null)
            saveProfile(null)
          }
        }
        // Do NOT wipe user state on null session here: keep cached state until an explicit SIGNED_OUT event
      } catch (err: any) {
        console.warn("Auth initialization error, keeping cached state:", err)
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    initializeAuth()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event: string, newSession: Session | null) => {
      if (!isMounted) return

      if (event === "SIGNED_OUT") {
        saveUser(null)
        setSession(null)
        saveProfile(null)
        setIsLoading(false)
        return
      }

      if (newSession?.user) {
        setSession(newSession)
        saveUser(newSession.user)
        await fetchProfile(newSession.user.id)
        setIsLoading(false)
      } else if (event === "USER_UPDATED" && newSession?.user) {
        setSession(newSession)
        saveUser(newSession.user)
        await fetchProfile(newSession.user.id)
      }
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [fetchProfile, saveUser, saveProfile])

  const signInWithGoogle = async (options?: { redirectTo?: string }) => {
    setError(null)
    try {
      const supabase = createClient()
      const redirectUrl = options?.redirectTo || `${window.location.origin}/auth/callback`
      
      const { error: signInErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: redirectUrl,
          queryParams: {
            prompt: "select_account",
            access_type: "offline",
          },
        },
      })

      if (signInErr) {
        setError(signInErr.message)
        throw signInErr
      }
    } catch (err: any) {
      const message = err?.message || "Failed to initiate Google sign in. Please try again."
      setError(message)
      throw err
    }
  }

  const signOut = async () => {
    setError(null)
    try {
      saveUser(null)
      setSession(null)
      saveProfile(null)
      if (typeof window !== "undefined") {
        try {
          localStorage.removeItem(CACHED_USER_KEY)
          localStorage.removeItem(CACHED_PROFILE_KEY)
          sessionStorage.clear()
          document.cookie = "demo_bypass=; path=/; max-age=0"
        } catch {}
      }
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push("/")
      router.refresh()
    } catch (err: any) {
      setError(err?.message || "Failed to sign out.")
    }
  }

  const clearError = () => setError(null)

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id)
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    session,
    isAuthenticated: !!user,
    isLoading,
    error,
    signInWithGoogle,
    signOut,
    clearError,
    refreshProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
