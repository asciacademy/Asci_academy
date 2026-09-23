import { Skeleton } from "@/components/skeleton/Skeleton"
import { SkeletonButton } from "@/components/skeleton/SkeletonButton"

export default function PricingLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground select-none py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <Skeleton className="h-6 w-36 mx-auto" rounded="full" />
        <Skeleton className="h-10 sm:h-12 w-3/4 mx-auto" rounded="md" />
        <Skeleton className="h-4 sm:h-5 w-4/5 mx-auto" rounded="xs" />
        <div className="flex justify-center pt-2">
          <Skeleton className="h-10 w-52" rounded="full" />
        </div>
      </div>

      {/* 3 Pricing Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-3xl border ${
              i === 1 ? "border-primary/40 shadow-xl" : "border-border/80"
            } bg-card p-6 sm:p-8 flex flex-col justify-between space-y-6`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-6 w-24" rounded="xs" />
                {i === 1 && <Skeleton className="h-5 w-20" rounded="full" />}
              </div>
              <Skeleton className="h-10 w-32" rounded="sm" />
              <Skeleton className="h-3.5 w-full" rounded="xs" />

              <div className="pt-4 border-t border-border/60 space-y-3">
                {Array.from({ length: 5 }).map((_, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5">
                    <Skeleton className="h-4 w-4 rounded-full shrink-0" />
                    <Skeleton className="h-3.5 flex-1" rounded="xs" />
                  </div>
                ))}
              </div>
            </div>

            <SkeletonButton size="lg" className="w-full" rounded="xl" />
          </div>
        ))}
      </div>
    </main>
  )
}
