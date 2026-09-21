import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { getPaymentOrder, updatePaymentOrder, listPaymentOrders } from "@/lib/aws-dynamodb"

export const dynamic = "force-dynamic"

// Map plan names to subscription_tier values in Supabase
const PLAN_TO_TIER: Record<string, string> = {
  pro: "architect",
  mentorship: "architect",
}

// GET — list all payment orders (admin only)
export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check admin role in Supabase
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profile?.role !== "admin") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const url = new URL(req.url)
    const statusFilter = url.searchParams.get("status") as any
    const orders = await listPaymentOrders(statusFilter || undefined)

    // Sort by createdAt descending
    orders.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ orders })
  } catch (error: any) {
    console.error("[PAYMENT_VERIFY_LIST_ERROR]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}

// POST — approve or reject a payment (admin only)
export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Check admin role
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()

    if (profile?.role !== "admin") {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const { orderId, approved } = await req.json()

    if (!orderId || approved === undefined) {
      return new NextResponse("Missing orderId or approved", { status: 400 })
    }

    const order = await getPaymentOrder(orderId)
    if (!order) {
      return new NextResponse("Order not found", { status: 404 })
    }

    const newStatus = approved ? "verified" : "rejected"

    await updatePaymentOrder(orderId, {
      status: newStatus,
      verifiedBy: user.email ?? user.id,
    })

    // If approved, upgrade the user's subscription in Supabase
    if (approved) {
      const tier = PLAN_TO_TIER[order.plan] ?? "architect"

      // Calculate period end based on billing cycle
      const now = new Date()
      const periodEnd = new Date(now)
      if (order.billingCycle === "annual") {
        periodEnd.setFullYear(periodEnd.getFullYear() + 1)
      } else {
        periodEnd.setMonth(periodEnd.getMonth() + 1)
      }

      await supabase
        .from("profiles")
        .update({
          subscription_tier: tier,
          subscription_status: "active",
          current_period_end: periodEnd.toISOString(),
        })
        .eq("id", order.userId)
    }

    return NextResponse.json({ success: true, status: newStatus })
  } catch (error: any) {
    console.error("[PAYMENT_VERIFY_ERROR]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
