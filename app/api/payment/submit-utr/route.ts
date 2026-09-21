import { NextResponse } from "next/server"
import { createClient } from "@/utils/supabase/server"
import { getPaymentOrder, updatePaymentOrder } from "@/lib/aws-dynamodb"

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

    const { orderId, utrNumber } = await req.json()

    if (!orderId || !utrNumber) {
      return new NextResponse("Missing orderId or utrNumber", { status: 400 })
    }

    // Validate the order belongs to this user
    const order = await getPaymentOrder(orderId)
    if (!order) {
      return new NextResponse("Order not found", { status: 404 })
    }
    if (order.userId !== user.id) {
      return new NextResponse("Forbidden", { status: 403 })
    }
    if (order.status !== "pending") {
      return new NextResponse("Order already submitted", { status: 409 })
    }

    // Update DynamoDB with UTR and move to awaiting_verification
    await updatePaymentOrder(orderId, {
      utrNumber: utrNumber.trim(),
      status: "awaiting_verification",
    })

    return NextResponse.json({ success: true, status: "awaiting_verification" })
  } catch (error: any) {
    console.error("[PAYMENT_SUBMIT_UTR_ERROR]", error)
    return new NextResponse("Internal server error", { status: 500 })
  }
}
