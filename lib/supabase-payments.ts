import { createClient } from "@/utils/supabase/server"

// ──────────────────────────────────────────────
//  Types
// ──────────────────────────────────────────────
export type PaymentStatus =
  | "pending"
  | "awaiting_verification"
  | "verified"
  | "rejected"

export interface PaymentOrder {
  orderId: string            // uuid
  userId: string             // Supabase user id
  userEmail: string
  plan: "pro" | "mentorship"
  billingCycle: "monthly" | "annual"
  amountINR: number
  status: PaymentStatus
  upiId: string
  utrNumber?: string
  createdAt: string          // ISO-8601
  updatedAt: string
  verifiedBy?: string        // admin email
}

// ──────────────────────────────────────────────
//  Row ↔ Domain mapping
// ──────────────────────────────────────────────
interface PaymentOrderRow {
  id: string
  order_id: string
  user_id: string
  user_email: string
  plan: string
  billing_cycle: string
  amount_inr: number
  status: string
  upi_id: string
  utr_number: string | null
  verified_by: string | null
  created_at: string
  updated_at: string
}

function rowToDomain(row: PaymentOrderRow): PaymentOrder {
  return {
    orderId: row.order_id,
    userId: row.user_id,
    userEmail: row.user_email,
    plan: row.plan as PaymentOrder["plan"],
    billingCycle: row.billing_cycle as PaymentOrder["billingCycle"],
    amountINR: row.amount_inr,
    status: row.status as PaymentStatus,
    upiId: row.upi_id,
    utrNumber: row.utr_number ?? undefined,
    verifiedBy: row.verified_by ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

// ──────────────────────────────────────────────
//  CRUD Helpers
// ──────────────────────────────────────────────

export async function createPaymentOrder(
  order: Omit<PaymentOrder, "updatedAt">
): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.from("payment_orders").insert({
    order_id: order.orderId,
    user_id: order.userId,
    user_email: order.userEmail,
    plan: order.plan,
    billing_cycle: order.billingCycle,
    amount_inr: order.amountINR,
    status: order.status,
    upi_id: order.upiId,
    utr_number: order.utrNumber ?? null,
    created_at: order.createdAt,
  })

  if (error) {
    console.error("[PAYMENT_STORE] createPaymentOrder error:", error)
    throw new Error(`Failed to create payment order: ${error.message}`)
  }
}

export async function getPaymentOrder(
  orderId: string
): Promise<PaymentOrder | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("payment_orders")
    .select("*")
    .eq("order_id", orderId)
    .maybeSingle()

  if (error) {
    console.error("[PAYMENT_STORE] getPaymentOrder error:", error)
    throw new Error(`Failed to get payment order: ${error.message}`)
  }

  return data ? rowToDomain(data as PaymentOrderRow) : null
}

export async function updatePaymentOrder(
  orderId: string,
  updates: Partial<PaymentOrder>
): Promise<void> {
  const supabase = await createClient()

  // Map domain fields to DB columns
  const dbUpdates: Record<string, any> = {}
  if (updates.status !== undefined) dbUpdates.status = updates.status
  if (updates.utrNumber !== undefined) dbUpdates.utr_number = updates.utrNumber
  if (updates.verifiedBy !== undefined) dbUpdates.verified_by = updates.verifiedBy
  if (updates.upiId !== undefined) dbUpdates.upi_id = updates.upiId
  // updated_at is handled by the DB trigger

  const { error } = await supabase
    .from("payment_orders")
    .update(dbUpdates)
    .eq("order_id", orderId)

  if (error) {
    console.error("[PAYMENT_STORE] updatePaymentOrder error:", error)
    throw new Error(`Failed to update payment order: ${error.message}`)
  }
}

export async function listPaymentOrders(
  status?: PaymentStatus
): Promise<PaymentOrder[]> {
  const supabase = await createClient()

  let query = supabase.from("payment_orders").select("*")

  if (status) {
    query = query.eq("status", status)
  }

  const { data, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("[PAYMENT_STORE] listPaymentOrders error:", error)
    throw new Error(`Failed to list payment orders: ${error.message}`)
  }

  return (data as PaymentOrderRow[]).map(rowToDomain)
}
