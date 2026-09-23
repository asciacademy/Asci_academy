import { SandboxSkeleton } from "@/components/skeleton/simulator"

export default function SandboxCallStackLoading() {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <SandboxSkeleton />
    </div>
  )
}
