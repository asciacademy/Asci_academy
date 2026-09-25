import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { getUserGamificationStats } from "@/app/actions/gamification"
import { getUserEnrollmentsWithProgress } from "@/app/actions/user"
import { extractFirstName } from "@/lib/user-utils"
import { StudentProfileView } from "@/components/profile/student-profile-view"
import { resolveStudentProfile } from "@/lib/student-profile-data"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Student Profile & Career Proof | ASCI",
  description: "Verified student identity, production portfolio, learning record, and accredited credentials.",
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch profile, gamification stats, and enrollments concurrently
  const [profileRes, gamificationStats, enrollments] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle(),
    getUserGamificationStats(user.id).catch(() => null),
    getUserEnrollmentsWithProgress().catch(() => []),
  ])

  let profileData = profileRes?.data

  if (!profileData) {
    const meta = user.user_metadata || {}
    const defaultName = extractFirstName(null, meta, user.email)
    const avatarUrl = meta.avatar_url || meta.picture || null
    const usernameSlug = user.email?.split("@")[0]?.toLowerCase().replace(/[^a-z0-9_]/g, "") || "scholar"

    try {
      const { data: createdProfile } = await supabase
        .from("profiles")
        .insert({
          id: user.id,
          email: user.email,
          name: defaultName,
          avatar_url: avatarUrl,
          role: "user",
          xp: 0,
          streak_count: 0,
          rank: "Recruit",
          bio: "",
          username: usernameSlug,
          is_public: true,
        })
        .select()
        .maybeSingle()

      profileData = createdProfile
    } catch (e) {
      console.warn("Could not insert profile row, using fallback profile object:", e)
    }

    if (!profileData) {
      profileData = {
        id: user.id,
        email: user.email,
        name: defaultName,
        avatar_url: avatarUrl,
        role: "user",
        xp: 0,
        streak_count: 0,
        rank: "Recruit",
        bio: "",
        username: usernameSlug,
        is_public: true,
      }
    }
  }

  const resolvedProfile = {
    ...profileData,
    xp: profileData.xp ?? 0,
    streak_count: profileData.streak_count ?? profileData.streak ?? 0,
    rank: profileData.rank || "Scholar",
  }

  const studentProfile = resolveStudentProfile(resolvedProfile, user, gamificationStats, enrollments || [])

  return (
    <StudentProfileView
      initialProfile={studentProfile}
      isOwner={true}
    />
  )
}
