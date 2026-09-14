"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Sun, Moon, Laptop } from "lucide-react"

interface ThemeToggleProps {
  className?: string
  showLabel?: boolean
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 rounded-full border border-hairline bg-card/60 flex items-center justify-center opacity-60 ${className}`}
        aria-hidden="true"
      >
        <span className="h-4 w-4" />
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`group relative flex items-center justify-center rounded-full border border-hairline bg-card dark:bg-black dark:border-[#262626] text-foreground shadow-xs transition-all duration-300 hover:border-primary/50 hover:bg-secondary dark:hover:bg-[#141414] dark:hover:border-[#383838] cursor-pointer focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40 active:scale-95 ${
        showLabel ? "h-9 px-3.5 gap-2" : "h-9 w-9"
      } ${className}`}
      aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
      title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      <div className="relative h-4 w-4 shrink-0 flex items-center justify-center">
        {/* Sun Icon (Visible in Dark Mode) */}
        <Sun
          className={`absolute inset-0 h-4 w-4 text-[#f59e0b] dark:text-[#f59e0b] transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        {/* Moon Icon (Visible in Light Mode) */}
        <Moon
          className={`absolute inset-0 h-4 w-4 text-primary transition-all duration-300 ${
            isDark
              ? "rotate-90 scale-0 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-xs font-medium text-body group-hover:text-foreground">
          {isDark ? "Light Mode" : "Dark Mode"}
        </span>
      )}
    </button>
  )
}
