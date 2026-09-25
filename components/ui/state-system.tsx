"use client"

import React from "react"
import Link from "next/link"
import { AlertCircle, RotateCcw, CheckCircle2, X } from "lucide-react"
import { CategoryIllustration, IllustrationCategory } from "@/components/ui/category-illustrations"
import { cn } from "@/lib/utils"

export type ComponentState = "idle" | "loading" | "empty" | "error" | "success"

/* ==========================================================================
   1. EMPTY STATE
   Requirement: Small illustration, Short explanation, One CTA
   ========================================================================== */

export interface EmptyStateProps {
  illustration?: IllustrationCategory | React.ReactNode
  illustrationSize?: number
  title?: string
  explanation?: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
  }
  className?: string
}

export function EmptyState({
  illustration = "learning",
  illustrationSize = 56,
  title = "No items found",
  explanation,
  description,
  action,
  className,
}: EmptyStateProps) {
  const message = explanation || description || "There are no entries available in this category yet."

  return (
    <div
      role="region"
      aria-label={title}
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl border border-hairline/60 bg-card/60 backdrop-blur-xs select-none max-w-lg mx-auto my-6",
        className
      )}
    >
      {/* Small Illustration */}
      <div className="mb-4 flex items-center justify-center shrink-0">
        {typeof illustration === "string" ? (
          <CategoryIllustration
            category={illustration as IllustrationCategory}
            size={illustrationSize}
            className="drop-shadow-xs"
          />
        ) : (
          illustration
        )}
      </div>

      {/* Short Explanation */}
      <h3 className="text-base font-serif font-semibold text-foreground tracking-tight">
        {title}
      </h3>
      <p className="mt-1.5 text-xs text-muted-foreground max-w-xs leading-relaxed font-sans">
        {message}
      </p>

      {/* Exactly One CTA */}
      {action && (
        <div className="mt-5">
          {action.href ? (
            <Link
              href={action.href}
              className="inline-flex items-center justify-center rounded-xl bg-foreground text-background px-4 py-2 text-xs font-medium hover:bg-foreground/90 transition-colors shadow-xs"
            >
              {action.label}
            </Link>
          ) : (
            <button
              type="button"
              onClick={action.onClick}
              className="inline-flex items-center justify-center rounded-xl bg-foreground text-background px-4 py-2 text-xs font-medium hover:bg-foreground/90 transition-colors shadow-xs cursor-pointer"
            >
              {action.label}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

/* ==========================================================================
   2. ERROR STATE
   Requirement: "Something went wrong.", "Try Again."
   ========================================================================== */

export interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  title = "Something went wrong.",
  message = "We couldn't load this content right now. Please check your connection and retry.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex flex-col items-center justify-center text-center p-8 sm:p-10 rounded-2xl border border-rose-500/20 bg-rose-500/5 select-none max-w-md mx-auto my-6",
        className
      )}
    >
      <div className="h-10 w-10 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mb-3">
        <AlertCircle className="h-5 w-5" />
      </div>

      <h3 className="text-sm font-serif font-semibold text-foreground tracking-tight">
        {title}
      </h3>
      <p className="mt-1 text-xs text-muted-foreground max-w-xs leading-relaxed font-sans">
        {message}
      </p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-rose-600 text-white px-3.5 py-1.5 text-xs font-medium hover:bg-rose-700 transition-colors shadow-xs cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Try Again
        </button>
      )}
    </div>
  )
}

/* ==========================================================================
   3. SUCCESS FEEDBACK
   Requirement: Clear feedback. Do not use giant toast systems.
   ========================================================================== */

export interface SuccessFeedbackProps {
  message: string
  description?: string
  onDismiss?: () => void
  inline?: boolean
  className?: string
}

export function SuccessFeedback({
  message,
  description,
  onDismiss,
  inline = false,
  className,
}: SuccessFeedbackProps) {
  return (
    <div
      role="status"
      className={cn(
        "flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-950 dark:text-emerald-200 transition-all",
        !inline && "my-3 max-w-lg mx-auto shadow-xs",
        className
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0">
          <CheckCircle2 className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-medium text-emerald-900 dark:text-emerald-100 truncate">
            {message}
          </p>
          {description && (
            <p className="text-[11px] text-emerald-700 dark:text-emerald-300/80 truncate">
              {description}
            </p>
          )}
        </div>
      </div>

      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 rounded-lg text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/20 transition-colors cursor-pointer shrink-0"
          aria-label="Dismiss feedback"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  )
}

/* ==========================================================================
   4. UNIFIED COMPONENT STATE SYSTEM CONTAINER
   Orchestrates: loading | empty | error | success | ready
   ========================================================================== */

export interface StateSystemContainerProps {
  state: ComponentState
  skeleton?: React.ReactNode
  empty?: {
    illustration?: IllustrationCategory | React.ReactNode
    title?: string
    explanation?: string
    action?: {
      label: string
      href?: string
      onClick?: () => void
    }
  }
  error?: {
    title?: string
    message?: string
    onRetry?: () => void
  }
  success?: {
    message: string
    description?: string
  }
  children?: React.ReactNode
  className?: string
}

export function StateSystemContainer({
  state,
  skeleton,
  empty,
  error,
  success,
  children,
  className,
}: StateSystemContainerProps) {
  if (state === "loading") {
    return <div className={cn("w-full animate-in fade-in-50 duration-200", className)}>{skeleton}</div>
  }

  if (state === "error") {
    return (
      <div className={className}>
        <ErrorState
          title={error?.title || "Something went wrong."}
          message={error?.message}
          onRetry={error?.onRetry}
        />
      </div>
    )
  }

  if (state === "empty") {
    return (
      <div className={className}>
        <EmptyState
          illustration={empty?.illustration}
          title={empty?.title}
          explanation={empty?.explanation}
          action={empty?.action}
        />
      </div>
    )
  }

  return (
    <div className={className}>
      {state === "success" && success && (
        <SuccessFeedback message={success.message} description={success.description} />
      )}
      {children}
    </div>
  )
}
