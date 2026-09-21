import { NextResponse } from "next/server"

// Razorpay subscriptions removed. Use /api/payment/create-order instead.
export async function POST(_req: Request) {
  return NextResponse.json(
    {
      error: "Razorpay payment gateway removed. Please use QR-based payment at /pricing.",
      redirectTo: "/pricing",
    },
    { status: 410 }
  )
}
