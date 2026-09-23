import { Skeleton } from "@/components/skeleton/Skeleton"
import { ListSkeleton } from "@/components/skeleton/common"

export default function CommunityLoading() {
  return (
    <main className="min-h-screen bg-background text-foreground select-none py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <div className="max-w-2xl space-y-3">
        <Skeleton className="h-6 w-32" rounded="full" />
        <Skeleton className="h-10 sm:h-12 w-3/4" rounded="md" />
        <Skeleton className="h-4 w-full" rounded="xs" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <ListSkeleton count={6} />
        </div>
        <div className="space-y-4">
          <div className="p-6 rounded-2xl border border-border/80 bg-card space-y-4">
            <Skeleton className="h-5 w-36" rounded="xs" />
            <Skeleton className="h-3.5 w-full" rounded="xs" />
            <Skeleton className="h-10 w-full" rounded="xl" />
          </div>
        </div>
      </div>
    </main>
  )
}
