import { CourseGridSkeleton, Skeleton, SkeletonBadge, SkeletonText } from "@/components/skeletons"

export default function ProgramsLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground select-none">
      <div className="h-[72px]" />

      {/* Hero Header Skeleton */}
      <section className="border-b border-hairline/60 bg-card/60 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <SkeletonBadge className="h-6 w-36 rounded-full" />
          <Skeleton className="h-9 sm:h-12 w-96 max-w-full rounded-xl" />
          <SkeletonText lines={2} lastLineWidth="65%" lineHeight="h-4" className="max-w-2xl" />

          {/* Filter Chips Bar */}
          <div className="flex flex-wrap items-center gap-2 pt-4">
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <CourseGridSkeleton count={8} columns={4} />
        </div>
      </section>
    </main>
  )
}
