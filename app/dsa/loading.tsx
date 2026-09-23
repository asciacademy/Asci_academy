import { Skeleton, SkeletonBadge, SkeletonButton, SkeletonText } from "@/components/skeletons"

export default function DSALoading() {
  return (
    <main className="min-h-screen bg-background text-foreground select-none">
      <div className="h-[72px]" />

      {/* Hero Header Skeleton */}
      <section className="border-b border-hairline/60 bg-card/60 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-4">
            <SkeletonBadge className="h-6 w-44 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-10 sm:h-12 w-11/12 rounded-xl" />
              <Skeleton className="h-10 sm:h-12 w-8/12 rounded-xl" />
            </div>
            <SkeletonText lines={2} lastLineWidth="70%" lineHeight="h-4" />
          </div>
        </div>
      </section>

      {/* Flagship Sheet & Grid Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Flagship Large Bento Card */}
          <div className="rounded-3xl border border-hairline/70 bg-card p-6 sm:p-8 space-y-6 shadow-md">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <SkeletonBadge className="h-5 w-28" />
                <Skeleton className="h-8 w-72 max-w-full rounded-lg" />
              </div>
              <SkeletonButton size="lg" className="w-36 h-11" />
            </div>
            <SkeletonText lines={2} lastLineWidth="80%" lineHeight="h-3.5" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-3 rounded-xl bg-secondary/30 space-y-1">
                  <Skeleton className="h-3 w-16 rounded" />
                  <Skeleton className="h-5 w-12 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Other Coding Sheets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-hairline/60 bg-card p-6 space-y-4 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <Skeleton className="h-8 w-8 rounded-lg" />
                  <SkeletonBadge className="h-5 w-16" />
                </div>
                <Skeleton className="h-6 w-3/4 rounded-md" />
                <SkeletonText lines={2} lastLineWidth="65%" lineHeight="h-3" />
                <div className="pt-2 border-t border-hairline/40 flex items-center justify-between">
                  <Skeleton className="h-3 w-20 rounded" />
                  <Skeleton className="h-4 w-16 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
