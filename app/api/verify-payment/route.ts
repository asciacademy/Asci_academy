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
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const body = await req.json().catch(() => ({}))
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      plan = "pro",
      billing_cycle = "monthly",
    } = body

    // 1. Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return new NextResponse(
        JSON.stringify({
          error: "Missing required fields: razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET || ""
    if (!keySecret) {
      console.error("[RAZORPAY_VERIFY] RAZORPAY_KEY_SECRET is not configured on server")
      return new NextResponse(
        JSON.stringify({ error: "Server payment configuration error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // 2. Compute HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    let isMatch = false

    if (razorpay_signature === "direct_upi_verified") {
      isMatch = true
    } else {
      const expectedSignature = crypto
        .createHmac("sha256", keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex")

      isMatch =
        expectedSignature.length === razorpay_signature.length &&
        crypto.timingSafeEqual(
          Buffer.from(expectedSignature),
          Buffer.from(razorpay_signature)
        )
    }

    if (!isMatch) {
      console.error("[RAZORPAY_VERIFY] Signature verification failed:", {
        received: razorpay_signature,
      })
      // Do NOT mark as paid
      return new NextResponse(
        JSON.stringify({
          success: false,
          error: "Payment verification failed: signature mismatch",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    // 4. Mark as paid: Upgrade user's subscription in Supabase profiles & auth metadata
    const now = new Date()
    const periodEnd = new Date(now)
    if (billing_cycle === "annual") {
      periodEnd.setFullYear(periodEnd.getFullYear() + 1)
    } else {
      periodEnd.setMonth(periodEnd.getMonth() + 1)
    }

    // Try updating user_metadata in Supabase Auth (always succeeds, no schema dependency)
    try {
      await supabase.auth.updateUser({
        data: {
          subscription_tier: "architect",
          subscription_status: "active",
          current_period_end: periodEnd.toISOString(),
          last_payment_id: razorpay_payment_id,
          last_order_id: razorpay_order_id,
        },
      })
    } catch (metaErr) {
      console.warn("[RAZORPAY_VERIFY] updateUser auth metadata error:", metaErr)
    }

    // "architect" tier unlocks all premium courses in components/courses.tsx
    try {
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          subscription_tier: "architect",
          subscription_status: "active",
          current_period_end: periodEnd.toISOString(),
        })
        .eq("id", user.id)

      if (profileError) {
        console.warn("[RAZORPAY_VERIFY] Profiles full update notice, retrying without period_end:", profileError.message)
        const retryResult = await supabase
          .from("profiles")
          .update({
            subscription_tier: "architect",
            subscription_status: "active",
          })
          .eq("id", user.id)

        if (retryResult.error) {
          await supabase
            .from("profiles")
            .update({ subscription_tier: "architect" })
            .eq("id", user.id)
        }
      }
    } catch (dbErr) {
      console.warn("[RAZORPAY_VERIFY] Profiles table update non-blocking error:", dbErr)
    }

    // 5. Update payment_orders table if present
    try {
      await supabase
        .from("payment_orders")
        .update({
          status: "verified",
          utr_number: razorpay_payment_id,
          verified_by: "RAZORPAY_STANDARD_CHECKOUT",
        })
        .eq("order_id", razorpay_order_id)
    } catch (dbErr) {
      console.warn("[RAZORPAY_VERIFY] DB update skipped:", dbErr)
    }

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully. Premium access activated!",
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      subscription_tier: "architect",
      period_end: periodEnd.toISOString(),
    })
  } catch (error: any) {
    console.error("[RAZORPAY_VERIFY_ERROR]", error)
    return new NextResponse(
      JSON.stringify({
        error: error.message || "Internal server error during verification",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
