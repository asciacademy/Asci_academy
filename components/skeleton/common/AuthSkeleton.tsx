import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonButton } from "../SkeletonButton"

export interface AuthSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  mode?: "login" | "signup" | "otp" | "reset"
}

export function AuthSkeleton({
  mode = "login",
  className,
  ...props
}: AuthSkeletonProps) {
  return (
    <main
      aria-busy="true"
      className={cn(
        "min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-4 sm:p-8 select-none",
        className
      )}
      {...props}
    >
      {/* Top Navigation */}
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <Skeleton className="h-4 w-16" rounded="xs" />
        <Skeleton className="h-8 w-8" rounded="full" />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="flex items-center gap-2.5 mb-1">
            <Skeleton className="h-10 w-10" rounded="xl" />
            <Skeleton className="h-7 w-28" rounded="sm" />
          </div>
          <Skeleton className="h-8 w-44" rounded="md" />
          <Skeleton className="h-3.5 w-64" rounded="xs" />
        </div>

        {/* Auth Card Container */}
        <div className="rounded-2xl border border-border/80 dark:border-white/10 bg-card p-7 sm:p-9 shadow-sm space-y-5">
          {/* Method Toggle (Password / OTP) for login */}
          {mode === "login" && (
            <div className="grid grid-cols-2 p-1 rounded-xl bg-secondary/60 border border-border/60 gap-1">
              <Skeleton className="h-8 w-full" rounded="lg" />
              <Skeleton className="h-8 w-full" rounded="lg" />
            </div>
          )}

          {/* Social Google Login Button */}
          {(mode === "login" || mode === "signup") && (
            <>
              <Skeleton className="h-11 w-full" rounded="xl" />
              <div className="flex items-center gap-3 my-2">
                <div className="h-px flex-1 bg-border/60" />
                <Skeleton className="h-3 w-28" rounded="xs" />
                <div className="h-px flex-1 bg-border/60" />
              </div>
            </>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-16" rounded="xs" />
                <Skeleton className="h-10 w-full" rounded="xl" />
              </div>
            )}

            <div className="space-y-1.5">
              <Skeleton className="h-3 w-12" rounded="xs" />
              <Skeleton className="h-10 w-full" rounded="xl" />
            </div>

            {mode !== "otp" && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-3 w-16" rounded="xs" />
                  {mode === "login" && <Skeleton className="h-3 w-24" rounded="xs" />}
                </div>
                <Skeleton className="h-10 w-full" rounded="xl" />
              </div>
            )}

            {mode === "otp" && (
              <div className="pt-2 flex justify-between gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton key={i} className="h-12 w-12" rounded="xl" />
                ))}
              </div>
            )}
          </div>

          {/* Submit Action CTA */}
          <SkeletonButton size="lg" className="w-full h-11 bg-primary/20" rounded="xl" />

          {/* Bottom Redirect */}
          <div className="pt-2 text-center flex justify-center">
            <Skeleton className="h-3.5 w-48" rounded="xs" />
          </div>
        </div>
      </div>
    </main>
  )
}
