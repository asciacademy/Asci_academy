import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface TrustSectionSkeletonProps extends React.HTMLAttributes<HTMLElement> {}

export function TrustSectionSkeleton({ className, ...props }: TrustSectionSkeletonProps) {
  return (
    <section
      aria-busy="true"
      className={cn(
        "relative border-y border-border/60 bg-secondary/20 py-12 overflow-hidden",
        className
      )}
      {...props}
    >
      <div className="relative mx-auto max-w-[1400px] px-5 mb-8">
        <div className="flex flex-col items-center justify-center text-center space-y-3">
          {/* Eyebrow Pill */}
          <Skeleton className="h-6 w-44" rounded="full" />
          
          {/* Section Heading */}
          <Skeleton className="h-5 sm:h-6 w-72 sm:w-96" rounded="sm" />
        </div>
      </div>

      {/* Marquee Company Logos strip */}
      <div className="flex items-center justify-center gap-12 sm:gap-16 px-8 py-3 overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-7 w-24 sm:w-28 opacity-40 shrink-0"
            rounded="sm"
          />
        ))}
      </div>
    </section>
  )
}
