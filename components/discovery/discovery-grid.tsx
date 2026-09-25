import * as React from "react"

export interface DiscoveryGridProps {
  children: React.ReactNode
  columns?: 2 | 3 | 4 | 5
  className?: string
}

/**
 * Universal DiscoveryGrid Pattern
 * Consistent responsive grid layout for discovery cards across all verticals.
 */
export function DiscoveryGrid({
  children,
  columns = 4,
  className = "",
}: DiscoveryGridProps) {
  const getColClasses = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
      case 5:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    }
  }

  return (
    <div className={`grid ${getColClasses()} gap-3 sm:gap-3.5 ${className}`}>
      {children}
    </div>
  )
}
