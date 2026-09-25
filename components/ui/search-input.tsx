"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void
  showShortcut?: boolean
  shortcutKey?: string
  containerClassName?: string
}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      containerClassName,
      placeholder = "Search courses, hackathons, jobs, problems...",
      showShortcut = true,
      shortcutKey = "⌘K",
      value,
      onChange,
      onClear,
      ...props
    },
    ref
  ) => {
    return (
      <div
        className={cn(
          "relative flex items-center w-full rounded-lg border border-border bg-card shadow-xs transition-[border-color,box-shadow] focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20",
          containerClassName
        )}
      >
        <Search className="w-4 h-4 ml-3 text-muted-foreground shrink-0 pointer-events-none" />
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            "w-full h-9 bg-transparent px-2.5 py-1.5 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none",
            className
          )}
          {...props}
        />
        {value && onClear ? (
          <button
            type="button"
            onClick={onClear}
            className="mr-2 p-0.5 rounded text-muted-foreground hover:text-foreground cursor-pointer"
            aria-label="Clear search"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : showShortcut ? (
          <div className="mr-2.5 hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 rounded border border-border bg-secondary text-[10px] font-mono font-medium text-muted-foreground shrink-0 select-none">
            {shortcutKey}
          </div>
        ) : null}
      </div>
    )
  }
)
SearchInput.displayName = "SearchInput"
