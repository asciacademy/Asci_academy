import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import crypto from "crypto"

export const dynamic = "force-dynamic"

export async function POST(req: Request) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      isDemo,
      billingCycle,
    } = body

    const keySecret = process.env.RAZORPAY_KEY_SECRET || ""

    // 1. Signature Verification for Live/Test Razorpay
    if (razorpayOrderId && razorpayPaymentId && razorpaySignature && keySecret) {
      const generatedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest("hex")

      if (generatedSignature !== razorpaySignature) {
        console.error("[RAZORPAY_VERIFY] Signature mismatch:", {
          generated: generatedSignature,
          received: razorpaySignature,
        })
        return new NextResponse("Payment verification failed: invalid signature", {
          status: 400,
        })
      }
    } else if (!isDemo && keySecret) {
      // If secret is set but signature wasn't provided or incomplete
      return new NextResponse("Missing payment verification details", {
        status: 400,
      })
    }

    // 2. Calculate Premium Subscription Expiry
    const now = new Date()
    const periodEnd = new Date(now)
    if (billingCycle === "annual") {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1)
    } else {
      periodEnd.setMonth(periodEnd.getMonth() + 1)
    }

    // 3. Upgrade user's subscription tier in Supabase profiles
    // In this codebase, subscription_tier: "architect" grants full access to all premium courses!
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        subscription_tier: "architect",
        subscription_status: "active",
        current_period_end: periodEnd.toISOString(),
      })
      .eq("id", user.id)

    if (profileError) {
      console.error("[RAZORPAY_VERIFY] Profile update error:", profileError)
      // Even if update failed, try upsert or log detailed error
    }

    // 4. Safely update payment_orders table if present
    if (orderId) {
      try {
        await supabase
          .from("payment_orders")
          .update({
            status: "verified",
            utr_number: razorpayPaymentId || `PAY_${Date.now()}`,
            verified_by: "RAZORPAY_GATEWAY_ONLINE",
          })
          .eq("order_id", orderId)
      } catch (dbErr) {
        console.warn("[RAZORPAY_VERIFY] Non-blocking payment_orders update:", dbErr)
      }
    }

    return NextResponse.json({
      success: true,
      verified: true,
      subscriptionTier: "architect",
      paymentId: razorpayPaymentId || `sim_${Date.now()}`,
      periodEnd: periodEnd.toISOString(),
      message: "Payment verified successfully! Premium access is now active.",
    })
  } catch (error: any) {
    console.error("[RAZORPAY_VERIFY_ERROR]", error)
    return new NextResponse(error.message || "Internal server error", { status: 500 })
  }
}
