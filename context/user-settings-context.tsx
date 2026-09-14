"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export type UserSettings = {
    accentColor: string
    compactMode: boolean
    emailNotifs: boolean
    courseUpdates: boolean
    weeklyDigest: boolean
    achievementAlerts: boolean
    avatar: string
}

const DEFAULT_SETTINGS: UserSettings = {
    accentColor: "#ea580c",
    compactMode: false,
    emailNotifs: true,
    courseUpdates: true,
    weeklyDigest: false,
    achievementAlerts: true,
    avatar: "",
}

type UserSettingsContextType = {
    settings: UserSettings
    updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void
    resetSettings: () => void
}

const UserSettingsContext = createContext<UserSettingsContextType | undefined>(undefined)

const STORAGE_KEY = "asci-user-settings"

function sanitizeAccentColor(color?: string): string {
    if (!color) return "#ea580c"
    const lower = color.trim().toLowerCase()
    if (
        lower.includes("green") ||
        lower.includes("emerald") ||
        lower.includes("lime") ||
        lower.includes("teal") ||
        lower.includes("39ff14") ||
        lower.includes("062112") ||
        lower.includes("10b981") ||
        lower.includes("22c55e") ||
        lower.includes("16a34a") ||
        lower.includes("15803d") ||
        lower.includes("059669") ||
        lower.includes("047857") ||
        lower.includes("5db8") ||
        lower.includes("cc785c") ||
        lower.includes("d4b872") ||
        lower.includes("gold") ||
        lower.includes("blue") ||
        lower.includes("cyan")
    ) {
        return "#ea580c"
    }
    if (lower.startsWith("#")) {
        const hex = lower.replace("#", "")
        if (hex.length === 3 || hex.length === 6) {
            const r = parseInt(hex.length === 3 ? hex[0] + hex[0] : hex.slice(0, 2), 16)
            const g = parseInt(hex.length === 3 ? hex[1] + hex[1] : hex.slice(2, 4), 16)
            const b = parseInt(hex.length === 3 ? hex[2] + hex[2] : hex.slice(4, 6), 16)
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                if (g > r && g > 80) return "#ea580c"
            }
        }
    }
    return color
}

export function UserSettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS)
    const [loaded, setLoaded] = useState(false)

    // Load settings from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY)
            if (stored) {
                const parsed = JSON.parse(stored)
                const sanitizedAccent = sanitizeAccentColor(parsed.accentColor)
                const sanitized = { ...DEFAULT_SETTINGS, ...parsed, accentColor: sanitizedAccent }
                setSettings(sanitized)
                try {
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized))
                } catch { }
            }
        } catch { }
        setLoaded(true)
    }, [])

    // Apply accent color to CSS custom properties whenever it changes
    useEffect(() => {
        if (!loaded) return
        const activeColor = sanitizeAccentColor(settings.accentColor)
        document.documentElement.style.setProperty("--accent", activeColor)
        document.documentElement.style.setProperty("--primary", activeColor)
        document.documentElement.style.setProperty("--primary-active", "#c2410c")
        document.documentElement.style.setProperty("--ring", activeColor)
        document.documentElement.style.setProperty("--success", "#ea580c")
    }, [settings.accentColor, loaded])

    // Apply compact mode
    useEffect(() => {
        if (!loaded) return
        if (settings.compactMode) {
            document.documentElement.classList.add("compact")
        } else {
            document.documentElement.classList.remove("compact")
        }
    }, [settings.compactMode, loaded])

    // Persist to localStorage on change
    useEffect(() => {
        if (!loaded) return
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
        } catch { }
    }, [settings, loaded])

    const updateSetting = useCallback(<K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }, [])

    const resetSettings = useCallback(() => {
        setSettings(DEFAULT_SETTINGS)
        try { localStorage.removeItem(STORAGE_KEY) } catch { }
    }, [])

    return (
        <UserSettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
            {children}
        </UserSettingsContext.Provider>
    )
}

export function useUserSettings() {
    const context = useContext(UserSettingsContext)
    if (context === undefined) {
        throw new Error("useUserSettings must be used within a UserSettingsProvider")
    }
    return context
}
