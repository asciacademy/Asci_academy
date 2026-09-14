import { redirect } from "next/navigation"
import { createClient } from "@/utils/supabase/server"
import { getDashboardBundle } from "@/app/actions/user"
import { DashboardWorkspace } from "@/components/dashboard/dashboard-workspace"

export const dynamic = "force-dynamic"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const bundle = (await getDashboardBundle(user)) || {
    profile: {
      id: user.id,
      name: user.user_metadata?.full_name || user.email?.split("@")[0] || "Student",
      email: user.email,
      xp: 0,
      streak_count: 0,
      rank: "Recruit",
      role: "user",
    },
    enrollments: [],
    weeklyActivity: [
      { day: "Sun", minutes: 0, solved: 0 },
      { day: "Mon", minutes: 0, solved: 0 },
      { day: "Tue", minutes: 0, solved: 0 },
      { day: "Wed", minutes: 0, solved: 0 },
      { day: "Thu", minutes: 0, solved: 0 },
      { day: "Fri", minutes: 0, solved: 0 },
      { day: "Sat", minutes: 0, solved: 0 },
    ],
    recentLogs: [],
    activityEvents: [],
    gamificationStats: {
      totalXp: 0,
      streakCount: 0,
      level: 1,
      currentLevelXp: 0,
      progressPercent: 0,
      rank: "Recruit",
      unlockedBadgeIds: [],
      completedLessonsCount: 0,
    },
  }

  return <DashboardWorkspace initialData={bundle} user={user} />
}
