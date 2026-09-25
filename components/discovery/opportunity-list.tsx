import * as React from "react"

export interface OpportunityListProps {
  children: React.ReactNode
  className?: string
  emptyMessage?: string
  hasItems?: boolean
}

/**
 * Universal OpportunityList Pattern
 * Dense vertical stacked opportunity list for jobs, competitions, challenges, and search results.
 */
export function OpportunityList({
  children,
  className = "",
  emptyMessage = "No opportunities found matching your criteria.",
  hasItems = true,
}: OpportunityListProps) {
  if (!hasItems) {
    return (
      <div className="py-12 text-center text-xs text-muted-foreground border border-dashed border-border rounded-xl p-6">
        <p className="font-semibold text-foreground mb-1">No items found</p>
        <p>{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-2.5 sm:gap-3 ${className}`}>
      {children}
    </div>
  )
}
