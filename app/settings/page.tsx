import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"

export default function SettingsPage() {
  // Directly redirect to profile settings workspace
  redirect("/profile")
}
