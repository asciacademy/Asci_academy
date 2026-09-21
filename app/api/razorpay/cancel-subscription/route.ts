import { NextResponse } from "next/server"

// Razorpay subscriptions removed. Use /api/subscription/cancel instead.
export async function POST(_req: Request) {
  return NextResponse.json(
    {
      error: "Razorpay payment gateway removed. Please use /api/subscription/cancel.",
      redirectTo: "/api/subscription/cancel",
    },
    { status: 410 }
  )
}
