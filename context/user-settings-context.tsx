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
    accentColor: "#2563eb",
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
    if (!color) return "#2563eb"
    const lower = color.trim().toLowerCase()
    // Migrate old orange colors to Unstop action blue
    if (
        lower.startsWith("#ea58") ||
        lower === "#c2410c" ||
        lower === "#f97316" ||
        lower.includes("orange") ||
        lower.includes("amber")
    ) {
        return "#0073E6"
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
        document.documentElement.style.setProperty("--primary-active", "#1d4ed8")
        document.documentElement.style.setProperty("--ring", activeColor)
        document.documentElement.style.setProperty("--success", "#10b981")
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
