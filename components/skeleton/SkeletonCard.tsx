import * as React from "react"
import { cn } from "@/lib/utils"

export interface SkeletonCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "subtle" | "bordered" | "glass"
}

export function SkeletonCard({
  variant = "default",
  className,
  children,
  ...props
}: SkeletonCardProps) {
  const variantStyles = {
    default: "bg-card border border-border/60 shadow-sm",
    subtle: "bg-surface-2 border border-border/40",
    bordered: "bg-background border-2 border-border/80",
    glass: "bg-card/60 backdrop-blur-md border border-border/50",
  }[variant]

  return (
    <div
      aria-busy="true"
      className={cn(
        "relative rounded-xl p-5 md:p-6 overflow-hidden transition-all",
        variantStyles,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
