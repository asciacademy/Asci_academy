"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { SectionHeader, type SectionHeaderProps } from "./section-header"

export interface DiscoveryRailProps extends Partial<SectionHeaderProps> {
  children: React.ReactNode
  showControls?: boolean
  className?: string
  railClassName?: string
}

/**
 * Universal DiscoveryRail Pattern
 * Smooth horizontal opportunity & content rail with compact header and optional scroll controls.
 */
export function DiscoveryRail({
  title,
  subtitle,
  actionHref,
  actionLabel,
  count,
  badge,
  children,
  showControls = true,
  className = "",
  railClassName = "",
}: DiscoveryRailProps) {
  const scrollRef = React.useRef<HTMLDivElement | null>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const checkScroll = React.useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }, [])

  React.useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (!el) return
    el.addEventListener("scroll", checkScroll, { passive: true })
    window.addEventListener("resize", checkScroll)
    return () => {
      el.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [checkScroll])

  const scrollBy = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" })
    }
  }

  return (
    <section className={`space-y-3 ${className}`}>
      {/* Header with optional scroll buttons */}
      {title && (
        <div className="flex items-center justify-between gap-3">
          <SectionHeader
            title={title}
            subtitle={subtitle}
            actionHref={actionHref}
            actionLabel={actionLabel}
            count={count}
            badge={badge}
            className="flex-1 min-w-0"
          />

          {showControls && (
            <div className="hidden sm:flex items-center gap-1 shrink-0 ml-2">
              <button
                type="button"
                onClick={() => scrollBy(-320)}
                disabled={!canScrollLeft}
                aria-label="Scroll left"
                className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(320)}
                disabled={!canScrollRight}
                aria-label="Scroll right"
                className="w-7 h-7 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className={`overflow-x-auto no-scrollbar scroll-smooth flex items-stretch gap-3 pb-1.5 snap-x snap-mandatory ${railClassName}`}
      >
        {children}
      </div>
    </section>
  )
}
