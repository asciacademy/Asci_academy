import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { getPaymentOrder } from "@/lib/supabase-payments"

export const dynamic = "force-dynamic"

/**
 * GET /api/payment/status?orderId=xxx
 * Returns the current status of a payment order for the authenticated user.
 * Used by the client to poll for verification after UTR submission.
 */
export async function GET(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const url = new URL(req.url)
    const orderId = url.searchParams.get("orderId")

    if (!orderId) {
      return new NextResponse("Missing orderId", { status: 400 })
    }

    const order = await getPaymentOrder(orderId)
    if (!order) {
      return new NextResponse("Order not found", { status: 404 })
    }

    // Only allow the owner to check their own order
    if (order.userId !== user.id) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    // If the payment has been verified, also fetch the updated profile to
    // confirm the subscription was activated
    let subscriptionActive = false
    if (order.status === "verified") {
      const { data: profile } = await supabase
        .from("profiles")
        .select("subscription_tier, subscription_status")
        .eq("id", user.id)
        .single()

      subscriptionActive =
        profile?.subscription_status === "active" &&
        profile?.subscription_tier === "architect"
    }

    return NextResponse.json({
      orderId: order.orderId,
      status: order.status,
      plan: order.plan,
      billingCycle: order.billingCycle,
      amountINR: order.amountINR,
      subscriptionActive,
    })
  } catch (error: any) {
    console.error("[PAYMENT_STATUS_ERROR]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
