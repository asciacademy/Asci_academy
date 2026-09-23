import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"

export interface NavbarSkeletonProps extends React.HTMLAttributes<HTMLElement> {}

export function NavbarSkeleton({ className, ...props }: NavbarSkeletonProps) {
  return (
    <header
      aria-busy="true"
      className={cn(
        "fixed left-0 right-0 top-0 z-50 border-b border-border/60 dark:border-white/10 bg-background/90 dark:bg-black/90 backdrop-blur-2xl transition-all",
        className
      )}
      {...props}
    >
      <div className="mx-auto flex h-16 sm:h-[68px] max-w-[1400px] items-center justify-between px-3.5 sm:px-6 lg:px-8">
        {/* 1. Brand Logo geometry */}
        <div className="flex items-center gap-2.5">
          <Skeleton className="h-9 w-9 sm:h-10 sm:w-10" rounded="lg" />
          <Skeleton className="h-5 w-24 sm:w-28" rounded="sm" />
        </div>

        {/* 2. Desktop Navigation Links geometry */}
        <div className="hidden lg:flex items-center gap-2">
          <Skeleton className="h-8 w-22" rounded="full" />
          <Skeleton className="h-8 w-20" rounded="full" />
          <Skeleton className="h-8 w-26" rounded="full" />
          <Skeleton className="h-8 w-20" rounded="full" />
          <Skeleton className="h-8 w-18" rounded="full" />
        </div>

        {/* 3. Right Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Search trigger */}
          <Skeleton className="h-9 w-9 sm:h-10 sm:w-10" rounded="full" />
          
          {/* Wishlist trigger */}
          <Skeleton className="hidden min-[420px]:flex sm:flex h-9 w-9 sm:h-10 sm:w-10" rounded="full" />
          
          {/* Theme toggle */}
          <Skeleton className="h-9 w-9 sm:h-10 sm:w-10" rounded="full" />
          
          {/* Divider */}
          <div className="hidden md:block h-5 w-px bg-border/80 dark:border-white/15 mx-1" />
          
          {/* Auth CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <Skeleton className="h-9 w-16" rounded="full" />
            <Skeleton className="h-9 w-28" rounded="full" />
          </div>

          {/* Mobile menu trigger */}
          <Skeleton className="flex lg:hidden h-9 w-9 sm:h-10 sm:w-10" rounded="full" />
        </div>
      </div>
    </header>
  )
}
