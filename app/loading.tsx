import { NavbarSkeleton } from "@/components/skeleton/navigation"
import { HeroSkeleton } from "@/components/skeleton/hero"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background text-foreground" aria-busy="true">
      <NavbarSkeleton />
      <HeroSkeleton />
    </div>
  )
}
