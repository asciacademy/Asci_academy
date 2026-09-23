import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { randomUUID } from "crypto"
import Razorpay from "razorpay"

export const dynamic = "force-dynamic"

export interface PlanPricingDetail {
  planTitle: string
  billedAmountINR: number
  originalAmountINR: number
  discountINR: number
  description: string
}

export const PRICING_DETAILS: Record<string, Record<string, PlanPricingDetail>> = {
  pro: {
    monthly: {
      planTitle: "Pro Learner Plan (Monthly)",
      billedAmountINR: 1999,
      originalAmountINR: 1999,
      discountINR: 0,
      description: "Full access to 400+ problems, code editor, algorithm animations, & certificates",
    },
    annual: {
      planTitle: "Pro Learner Plan (Annual)",
      billedAmountINR: 17988,
      originalAmountINR: 23988,
      discountINR: 6000,
      description: "Full access for 1 full year at ₹1,499/mo (Save ₹6,000)",
    },
  },
  mentorship: {
    monthly: {
      planTitle: "Team & Mentorship Plan (Monthly)",
      billedAmountINR: 5999,
      originalAmountINR: 5999,
      discountINR: 0,
      description: "Everything in Pro plus 1-on-1 code reviews, mock interviews, & resume support",
    },
    annual: {
      planTitle: "Team & Mentorship Plan (Annual)",
      billedAmountINR: 53988,
      originalAmountINR: 71988,
      discountINR: 18000,
      description: "Mentorship for 1 full year at ₹4,499/mo (Save ₹18,000)",
    },
  },
}

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
    const { plan, billing_cycle } = body

    if (!plan || !billing_cycle) {
      return new NextResponse("Missing plan or billing_cycle", { status: 400 })
    }

    const planData = PRICING_DETAILS[plan]?.[billing_cycle]
    if (!planData) {
      return new NextResponse("Invalid plan or billing_cycle", { status: 400 })
    }

    const amountINR = planData.billedAmountINR
    const amountInPaise = Math.round(amountINR * 100)
    const orderId = `order_${randomUUID().replace(/-/g, "").slice(0, 16)}`

    const keyId =
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      process.env.RAZORPAY_KEY_ID ||
      ""
    const keySecret = process.env.RAZORPAY_KEY_SECRET || ""

    let razorpayOrderId = ""
    let isDemo = false

    if (keyId && keySecret && !keyId.includes("your_") && keyId !== "") {
      // Real Razorpay client
      const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret,
      })

      const rzpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: orderId,
        notes: {
          userId: user.id,
          userEmail: user.email || "",
          plan,
          billing_cycle,
        },
      })
      razorpayOrderId = rzpOrder.id
    } else {
      // Graceful test/demo mode when merchant keys haven't been added to .env.local yet
      razorpayOrderId = `order_demo_${Date.now()}`
      isDemo = true
    }

    // Dynamic UPI deep link with exact amount
    const upiId = process.env.NEXT_PUBLIC_UPI_ID || "asci.academy@upi"
    const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "ASCI Academy"
    const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      upiName
    )}&am=${amountINR}&cu=INR&tn=${encodeURIComponent(
      `ASCI ${planData.planTitle} - ${orderId.slice(0, 8)}`
    )}`

    // Attempt to persist the order record in Supabase payment_orders if table exists
    try {
      await supabase.from("payment_orders").insert({
        order_id: orderId,
        user_id: user.id,
        user_email: user.email || "",
        plan,
        billing_cycle,
        amount_inr: amountINR,
        status: "pending",
        upi_id: upiId,
        created_at: new Date().toISOString(),
      })
    } catch (dbErr) {
      console.warn("[RAZORPAY_CREATE_ORDER] Supabase payment_orders write skipped:", dbErr)
    }

    return NextResponse.json({
      orderId,
      razorpayOrderId,
      keyId: isDemo ? "rzp_test_demo_mode" : keyId,
      isDemo,
      amountINR,
      amountInPaise,
      originalAmountINR: planData.originalAmountINR,
      discountINR: planData.discountINR,
      planTitle: planData.planTitle,
      description: planData.description,
      plan,
      billingCycle: billing_cycle,
      upiDeepLink,
      upiId,
      upiName,
      user: {
        name: user.user_metadata?.name || user.user_metadata?.full_name || "Student",
        email: user.email || "",
      },
    })
  } catch (error: any) {
    console.error("[RAZORPAY_CREATE_ORDER_ERROR]", error)
    return new NextResponse(error.message || "Internal server error", { status: 500 })
  }
}
