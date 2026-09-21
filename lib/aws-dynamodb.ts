import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  PutCommand,
  GetCommand,
  UpdateCommand,
  ScanCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb"

// ──────────────────────────────────────────────
//  Client singleton
// ──────────────────────────────────────────────
const region = process.env.AWS_REGION || "ap-south-1"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID || ""
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY || ""

const baseClient = new DynamoDBClient({
  region,
  credentials:
    accessKeyId && secretAccessKey
      ? { accessKeyId, secretAccessKey }
      : undefined, // falls back to IAM role / EC2 instance profile
})

export const dynamo = DynamoDBDocumentClient.from(baseClient, {
  marshallOptions: { removeUndefinedValues: true },
})

export const PAYMENT_TABLE =
  process.env.AWS_DYNAMODB_TABLE || "asci-payment-orders"

// ──────────────────────────────────────────────
//  Types
// ──────────────────────────────────────────────
export type PaymentStatus =
  | "pending"
  | "awaiting_verification"
  | "verified"
  | "rejected"

export interface PaymentOrder {
  orderId: string            // PK (uuid)
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
//  Helpers
// ──────────────────────────────────────────────

export async function createPaymentOrder(
  order: Omit<PaymentOrder, "updatedAt">
): Promise<void> {
  await dynamo.send(
    new PutCommand({
      TableName: PAYMENT_TABLE,
      Item: { ...order, updatedAt: order.createdAt },
    })
  )
}

export async function getPaymentOrder(
  orderId: string
): Promise<PaymentOrder | null> {
  const res = await dynamo.send(
    new GetCommand({ TableName: PAYMENT_TABLE, Key: { orderId } })
  )
  return (res.Item as PaymentOrder) ?? null
}

export async function updatePaymentOrder(
  orderId: string,
  updates: Partial<PaymentOrder>
): Promise<void> {
  const entries = Object.entries({ ...updates, updatedAt: new Date().toISOString() })
  const expressionParts = entries.map(([k], i) => `#k${i} = :v${i}`)
  const names = Object.fromEntries(entries.map(([k], i) => [`#k${i}`, k]))
  const values = Object.fromEntries(entries.map(([, v], i) => [`:v${i}`, v]))

  await dynamo.send(
    new UpdateCommand({
      TableName: PAYMENT_TABLE,
      Key: { orderId },
      UpdateExpression: `SET ${expressionParts.join(", ")}`,
      ExpressionAttributeNames: names,
      ExpressionAttributeValues: values,
    })
  )
}

export async function listPaymentOrders(
  status?: PaymentStatus
): Promise<PaymentOrder[]> {
  if (status) {
    const res = await dynamo.send(
      new ScanCommand({
        TableName: PAYMENT_TABLE,
        FilterExpression: "#s = :s",
        ExpressionAttributeNames: { "#s": "status" },
        ExpressionAttributeValues: { ":s": status },
      })
    )
    return (res.Items as PaymentOrder[]) ?? []
  }

  const res = await dynamo.send(new ScanCommand({ TableName: PAYMENT_TABLE }))
  return (res.Items as PaymentOrder[]) ?? []
}
