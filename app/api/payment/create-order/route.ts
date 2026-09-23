import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { createPaymentOrder, type PaymentOrder } from "@/lib/supabase-payments"
import { randomUUID } from "crypto"

// Pricing matrix
const PLAN_PRICES: Record<string, Record<string, number>> = {
  pro: { monthly: 1999, annual: 1499 },
  mentorship: { monthly: 5999, annual: 4499 },
}

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

    const { plan, billing_cycle } = await req.json()

    if (!plan || !billing_cycle) {
      return new NextResponse("Missing plan or billing_cycle", { status: 400 })
    }

    const prices = PLAN_PRICES[plan as string]
    if (!prices) {
      return new NextResponse("Invalid plan", { status: 400 })
    }

    const amountINR = prices[billing_cycle as string]
    if (!amountINR) {
      return new NextResponse("Invalid billing_cycle", { status: 400 })
    }

    const orderId = randomUUID()
    const upiId = process.env.NEXT_PUBLIC_UPI_ID || "asci.academy@upi"
    const upiName = process.env.NEXT_PUBLIC_UPI_NAME || "ASCI Academy"

    // UPI deep-link / QR data string
    const upiDeepLink = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(upiName)}&am=${amountINR}&cu=INR&tn=${encodeURIComponent(`ASCI ${plan} plan - ${orderId.slice(0, 8)}`)}`

    const order: PaymentOrder = {
      orderId,
      userId: user.id,
      userEmail: user.email ?? "",
      plan: plan as "pro" | "mentorship",
      billingCycle: billing_cycle as "monthly" | "annual",
      amountINR,
      status: "pending",
      upiId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    await createPaymentOrder(order)

    return NextResponse.json({
      orderId,
      amountINR,
      upiDeepLink,
      upiId,
      upiName,
      plan,
      billingCycle: billing_cycle,
    })
  } catch (error: any) {
    console.error("[PAYMENT_CREATE_ORDER_ERROR]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
