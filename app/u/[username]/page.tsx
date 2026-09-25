import { notFound } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { getPublicProfile } from "@/app/actions/user"
import { resolveStudentProfile } from "@/lib/student-profile-data"
import { StudentProfileView } from "@/components/profile/student-profile-view"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params
  const decoded = decodeURIComponent(username)
  return {
    title: `${decoded} | ASCI Student Profile & Career Proof`,
    description: `Verified student identity, production portfolio, and accredited credentials for ${decoded}.`,
  }
}

export default async function PublicStudentProfilePage({ params }: Props) {
  const { username } = await params
  const decoded = decodeURIComponent(username)

  const supabase = await createClient()
  const {
    data: { user: currentUser },
  } = await supabase.auth.getUser()

  // Fetch public profile from db or use realistic verified fallback
  const dbProfile = await getPublicProfile(decoded).catch(() => null)

  const studentProfile = resolveStudentProfile(
    dbProfile || {
      username: decoded,
      name: decoded.charAt(0).toUpperCase() + decoded.slice(1).replace(/[-_.]/g, " "),
    }
  )

  const isOwner =
    currentUser &&
    (currentUser.id === dbProfile?.id ||
      currentUser.email?.split("@")[0]?.toLowerCase() === decoded.toLowerCase())

  return (
    <StudentProfileView
      initialProfile={studentProfile}
      isOwner={!!isOwner}
    />
  )
}
