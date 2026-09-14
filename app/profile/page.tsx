import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { getUserGamificationStats } from "@/app/actions/gamification"
import { extractFirstName } from "@/lib/user-utils"
import { ProfileWorkspace } from "@/components/profile/profile-workspace"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Scholar Profile & Settings | ASCI",
  description: "Manage your ASCI learning identity, certifications, preferences, and account security.",
}

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Fetch profile and gamification stats concurrently on the server
  const [profileRes, gamificationStats] = await Promise.all([
    supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle(),
    getUserGamificationStats(user.id).catch(() => null),
  ])

  let profileData = profileRes?.data

  // If user has no profile record yet, auto-provision default row
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
          is_public: false,
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
        is_public: false,
      }
    }
  }

  const resolvedProfile = {
    ...profileData,
    xp: profileData.xp ?? 0,
    streak_count: profileData.streak_count ?? profileData.streak ?? 0,
    rank: profileData.rank || "Recruit",
  }

  return (
    <ProfileWorkspace
      user={user}
      initialProfile={resolvedProfile}
      initialBadges={gamificationStats?.unlockedBadgeIds || []}
    />
  )
}
