import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"

export const dynamic = "force-dynamic"

export async function POST(_req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Downgrade the user to free tier immediately
    await supabase
      .from("profiles")
      .update({
        subscription_status: "cancelled",
        subscription_tier: "free",
        current_period_end: new Date().toISOString(),
      })
      .eq("id", user.id)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("[SUBSCRIPTION_CANCEL_ERROR]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
