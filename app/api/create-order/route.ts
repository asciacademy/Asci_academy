import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import Razorpay from "razorpay"
import { randomUUID } from "crypto"

export const dynamic = "force-dynamic"

// Standard pricing matrix (in paise: 1 INR = 100 paise)
const PRICING_CONFIG: Record<
  string,
  Record<
    string,
    {
      amountPaise: number
      originalAmountINR: number
      discountINR: number
      planTitle: string
      description: string
    }
  >
> = {
  pro: {
    monthly: {
      amountPaise: 1999 * 100, // 199900 paise = ₹1,999
      originalAmountINR: 1999,
      discountINR: 0,
      planTitle: "Pro Learner Plan (Monthly)",
      description: "Full access to 400+ problems, code editor, algorithm animations, & certificates",
    },
    annual: {
      amountPaise: 17988 * 100, // 1798800 paise = ₹17,988 (₹1,499/mo)
      originalAmountINR: 23988,
      discountINR: 6000,
      planTitle: "Pro Learner Plan (Annual)",
      description: "Full access for 1 full year at ₹1,499/mo (Save ₹6,000)",
    },
  },
  mentorship: {
    monthly: {
      amountPaise: 5999 * 100, // 599900 paise = ₹5,999
      originalAmountINR: 5999,
      discountINR: 0,
      planTitle: "Team & Mentorship Plan (Monthly)",
      description: "Everything in Pro plus 1-on-1 code reviews, mock interviews, & resume support",
    },
    annual: {
      amountPaise: 53988 * 100, // 5398800 paise = ₹53,988 (₹4,499/mo)
      originalAmountINR: 71988,
      discountINR: 18000,
      planTitle: "Team & Mentorship Plan (Annual)",
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
      return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      })
    }

    const body = await req.json().catch(() => ({}))
    const plan = body.plan || "pro"
    const billing_cycle = body.billing_cycle || "monthly"
    const planConfig = PRICING_CONFIG[plan]?.[billing_cycle]

    let amount = body.amount
    if (!amount && planConfig) {
      amount = planConfig.amountPaise
    }

    const currency = body.currency || "INR"
    const receipt = body.receipt || `rcpt_${randomUUID().slice(0, 10)}`

    // Minimum amount validation: 100 paise (₹1.00)
    if (!amount || typeof amount !== "number" || amount < 100) {
      return new NextResponse(
        JSON.stringify({
          error: "Invalid amount. Minimum amount required is 100 paise (₹1.00).",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      )
    }

    const keyId =
      process.env.RAZORPAY_KEY_ID ||
      process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
      "rzp_test_Tf3IKHOePFdxFC"
    const keySecret =
      process.env.RAZORPAY_KEY_SECRET || "0GKs6LlMkaFp7UStuiDmpMIX"

    // Initialize Razorpay SDK
    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    })

    // Call Razorpay API: POST https://api.razorpay.com/v1/orders
    const order = await razorpay.orders.create({
      amount: Math.round(amount),
      currency,
      receipt,
      notes: {
        userId: user.id,
        userEmail: user.email || "",
        plan,
        billingCycle: billing_cycle,
      },
    })

    const amountINR = Math.round(amount / 100)
    const upiId = process.env.NEXT_PUBLIC_UPI_ID || "asci.academy@upi"
    const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "ASCI Academy"
    const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(
      upiName
    )}&am=${amountINR}&cu=INR&tn=${encodeURIComponent(
      `ASCI ${planConfig?.planTitle || plan} - ${order.id.slice(0, 8)}`
    )}`

    // Log order in payment_orders table if table exists
    try {
      await supabase.from("payment_orders").insert({
        order_id: order.id,
        user_id: user.id,
        user_email: user.email || "",
        plan,
        billing_cycle,
        amount_inr: amountINR,
        status: "pending",
        created_at: new Date().toISOString(),
      })
    } catch (dbErr) {
      console.warn("[RAZORPAY_CREATE_ORDER] DB insert skipped:", dbErr)
    }

    // Return standard response { order_id, amount, currency } along with UI metadata
    return NextResponse.json({
      order_id: order.id,
      orderId: order.id,
      razorpayOrderId: order.id,
      amount: order.amount,
      amountINR,
      amountInPaise: order.amount,
      originalAmountINR: planConfig?.originalAmountINR || amountINR,
      discountINR: planConfig?.discountINR || 0,
      currency: order.currency,
      receipt: order.receipt,
      key_id: keyId,
      keyId,
      isDemo: false,
      plan,
      planTitle: planConfig?.planTitle || "ASCI Pro Plan",
      description: planConfig?.description || "Full Access to Premium Courses",
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
    return new NextResponse(
      JSON.stringify({
        error: error.message || "Failed to create Razorpay order",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    )
  }
}
