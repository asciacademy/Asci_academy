"use client"

import * as React from "react"
import { Search, X } from "lucide-react"

export interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

/**
 * Universal SearchBar Pattern
 * Compact, fast search input with clean icon, clear trigger, and keyboard accessibility.
 */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search opportunities, skills, tags...",
  className = "",
  autoFocus = false,
}: SearchBarProps) {
  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const handleClear = () => {
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <Search className="absolute left-3 w-4 h-4 text-muted-foreground pointer-events-none" />
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className="w-full h-9 pl-9 pr-8 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all shadow-2xs"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-2.5 p-0.5 rounded text-muted-foreground hover:text-foreground cursor-pointer"
          aria-label="Clear search query"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  )
}
