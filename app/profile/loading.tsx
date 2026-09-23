import { ProfileSkeleton } from "@/components/skeletons"

export default function ProfileLoading() {
  return (
    <main className="min-h-screen bg-background">
      <ProfileSkeleton />
    </main>
  )
}
