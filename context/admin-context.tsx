"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

type AdminContextType = {
    isAdmin: boolean
    isEditMode: boolean
    toggleEditMode: () => void
    isLoading: boolean
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        async function checkAdminStatus() {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession()
                const user = session?.user

                if (sessionError || !user) {
                    setIsAdmin(false)
                    setIsLoading(false)
                    return
                }

                // Check cache first for zero-latency page transitions
                const cacheKey = `asci_admin_${user.id}`
                if (typeof window !== "undefined") {
                    const cached = sessionStorage.getItem(cacheKey)
                    if (cached !== null) {
                        setIsAdmin(cached === "true")
                        setIsLoading(false)
                    }
                }

                const { data: profile } = await supabase
                    .from("profiles")
                    .select("role")
                    .eq("id", user.id)
                    .single()

                const adminVal = Boolean(profile && (profile.role === "admin" || profile.role === "super_admin"))
                setIsAdmin(adminVal)
                if (typeof window !== "undefined") {
                    try {
                        sessionStorage.setItem(cacheKey, String(adminVal))
                    } catch {}
                }
            } catch {
                setIsAdmin(false)
            } finally {
                setIsLoading(false)
            }
        }

        checkAdminStatus()

        // Listen for auth changes to update admin status
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event: any, session: any) => {
            if (event === 'SIGNED_IN' || event === 'USER_UPDATED') {
                checkAdminStatus()
            } else if (event === 'SIGNED_OUT') {
                setIsAdmin(false)
                setIsLoading(false)
                if (typeof window !== "undefined") {
                    try {
                        Object.keys(sessionStorage)
                            .filter(k => k.startsWith("asci_admin_"))
                            .forEach(k => sessionStorage.removeItem(k))
                    } catch {}
                }
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [supabase])

    const toggleEditMode = () => {
        if (isAdmin) {
            setIsEditMode((prev) => !prev)
        }
    }

    return (
        <AdminContext.Provider value={{ isAdmin, isEditMode, toggleEditMode, isLoading }}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
    const context = useContext(AdminContext)
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider")
    }
    return context
}
