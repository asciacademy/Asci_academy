"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { CompanyLogo, BrandLogo } from "@/components/ui/brand-ecosystem"

export interface FeaturedCardProps {
  id: string
  title: string
  host: string
  hostLogo: string
  categoryTag: string
  headlineHighlight: string
  description?: string
  metadataItems: string[]
  deadline?: string
  href: string
  className?: string
}

/**
 * Universal FeaturedCard Pattern
 * Highlighted priority opportunity card with visual brand, highlighted reward, and clear CTA.
 * Strictly communicates: VISUAL · TITLE · CONTEXT · IMPORTANT METADATA · ACTION
 */
export function FeaturedCard({
  title,
  host,
  hostLogo,
  categoryTag,
  headlineHighlight,
  description,
  metadataItems,
  deadline,
  href,
  className = "",
}: FeaturedCardProps) {
  return (
    <Link
      href={href}
      className={`group relative flex flex-col justify-between p-4 sm:p-5 rounded-xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 hover:border-primary transition-all shadow-sm ${className}`}
    >
      <div className="space-y-3">
        {/* Top: Host Visual + Category Badge */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-card border border-border flex items-center justify-center shrink-0 shadow-2xs">
              <CompanyLogo company={hostLogo} size={20} />
            </div>
            <div>
              <span className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors block">
                {host}
              </span>
              {deadline && (
                <span className="text-[10px] font-mono text-muted-foreground">
                  Ends {deadline}
                </span>
              )}
            </div>
          </div>

          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary">
            <Sparkles className="w-3 h-3" />
            <span>{categoryTag}</span>
          </span>
        </div>

        {/* Title & Highlight */}
        <div>
          <h3 className="text-sm sm:text-base font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
            {title}
          </h3>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2 mt-1 leading-snug">
              {description}
            </p>
          )}
        </div>

        {/* Highlight Metadata (Prize / Compensation) */}
        <div className="pt-2 border-t border-border/60">
          <span className="text-sm font-mono font-bold text-foreground">
            {headlineHighlight}
          </span>
        </div>

        {/* Metadata Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {metadataItems.map((meta, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-2 py-0.5 rounded bg-secondary border border-border text-muted-foreground"
            >
              {meta}
            </span>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-4 pt-2.5 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary">
        <span>Explore Opportunity</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  )
}
