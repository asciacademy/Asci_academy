import * as React from "react"
import { cn } from "@/lib/utils"
import { Skeleton } from "../Skeleton"
import { SkeletonAvatar } from "../SkeletonAvatar"
import { SkeletonButton } from "../SkeletonButton"

export interface SettingsSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SettingsSkeleton({ className, ...props }: SettingsSkeletonProps) {
  return (
    <div
      aria-busy="true"
      className={cn("max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none", className)}
      {...props}
    >
      {/* 1. Settings Header */}
      <div className="space-y-1.5 pb-4 border-b border-border/60">
        <Skeleton className="h-7 w-48" rounded="sm" />
        <Skeleton className="h-4 w-72" rounded="xs" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* 2. Left Tabs / Settings Nav */}
        <div className="md:col-span-4 space-y-1.5">
          {["Profile & Account", "Learning Preferences", "Notifications", "Security & Password", "API & Integrations"].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl border border-transparent hover:bg-secondary/40"
            >
              <Skeleton className="h-4 w-4 rounded-xs" />
              <Skeleton className="h-4 w-32" rounded="xs" />
            </div>
          ))}
        </div>

        {/* 3. Right Active Tab Panel Form */}
        <div className="md:col-span-8 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Avatar Section */}
          <div className="flex items-center gap-4 pb-6 border-b border-border/60">
            <SkeletonAvatar size="xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" rounded="xs" />
              <div className="flex gap-2">
                <SkeletonButton size="sm" className="w-24" rounded="lg" />
                <SkeletonButton size="sm" className="w-20 bg-secondary/80" rounded="lg" />
              </div>
            </div>
          </div>

          {/* Form Fields Stack */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-20" rounded="xs" />
                <Skeleton className="h-10 w-full" rounded="xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-3 w-20" rounded="xs" />
                <Skeleton className="h-10 w-full" rounded="xl" />
              </div>
            </div>

            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" rounded="xs" />
              <Skeleton className="h-10 w-full" rounded="xl" />
            </div>

            <div className="space-y-1.5">
              <Skeleton className="h-3 w-12" rounded="xs" />
              <Skeleton className="h-24 w-full" rounded="xl" />
            </div>

            {/* Notification Toggles */}
            <div className="pt-2 space-y-3">
              <Skeleton className="h-4 w-36" rounded="xs" />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/30">
                  <div className="space-y-1">
                    <Skeleton className="h-3.5 w-40" rounded="xs" />
                    <Skeleton className="h-2.5 w-56" rounded="xs" />
                  </div>
                  <Skeleton className="h-5 w-9 rounded-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Save Changes Button */}
          <div className="pt-4 border-t border-border/60 flex items-center justify-end gap-3">
            <SkeletonButton size="md" className="w-28 bg-secondary/80" rounded="xl" />
            <SkeletonButton size="md" className="w-32 bg-primary/20" rounded="xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
