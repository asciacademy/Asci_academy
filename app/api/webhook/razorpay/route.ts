import { NextResponse } from "next/server"

// Razorpay webhook is no longer used. Payment is now handled via
// UPI QR + UTR verification through AWS DynamoDB + admin panel.
// This stub returns 200 so old webhook references don't error.
export async function POST(_req: Request) {
  return new NextResponse("Payment gateway migrated to QR-based system", {
    status: 200,
  })
}
