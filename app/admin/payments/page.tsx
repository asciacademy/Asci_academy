"use client"

import { useState, useEffect, useCallback } from "react"
import {
  CheckCircle2,
  XCircle,
  Clock,
  Loader2,
  RefreshCw,
  Filter,
  User,
  CreditCard,
  Calendar,
  Hash,
  ShieldCheck,
  AlertCircle,
} from "lucide-react"
import type { PaymentOrder, PaymentStatus } from "@/lib/supabase-payments"

const STATUS_LABELS: Record<PaymentStatus, { label: string; icon: any; color: string }> = {
  pending: {
    label: "Pending",
    icon: Clock,
    color: "text-warning bg-warning/10 border-warning/20",
  },
  awaiting_verification: {
    label: "Awaiting Verification",
    icon: AlertCircle,
    color: "text-info bg-info/10 border-info/20",
  },
  verified: {
    label: "Verified",
    icon: CheckCircle2,
    color: "text-success bg-success/10 border-success/20",
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    color: "text-destructive bg-destructive/10 border-destructive/20",
  },
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const cfg = STATUS_LABELS[status]
  const Icon = cfg.icon
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border ${cfg.color}`}
    >
      <Icon className="h-3 w-3" />
      {cfg.label}
    </span>
  )
}

export default function AdminPaymentsPage() {
  const [orders, setOrders] = useState<PaymentOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [filter, setFilter] = useState<PaymentStatus | "all">("awaiting_verification")

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    try {
      const params = filter !== "all" ? `?status=${filter}` : ""
      const res = await fetch(`/api/payment/verify${params}`)
      if (res.ok) {
        const data = await res.json()
        setOrders(data.orders ?? [])
      }
    } catch (err) {
      console.error("Failed to fetch payment orders", err)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const handleVerify = async (orderId: string, approved: boolean) => {
    setActionLoading(orderId)
    try {
      const res = await fetch("/api/payment/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, approved }),
      })
      if (res.ok) {
        await fetchOrders()
      } else {
        alert("Action failed. Please try again.")
      }
    } catch {
      alert("Network error. Please try again.")
    } finally {
      setActionLoading(null)
    }
  }

  const filters: Array<{ value: PaymentStatus | "all"; label: string }> = [
    { value: "all", label: "All" },
    { value: "awaiting_verification", label: "Awaiting" },
    { value: "pending", label: "Pending" },
    { value: "verified", label: "Verified" },
    { value: "rejected", label: "Rejected" },
  ]

  return (
    <div className="space-y-8 pt-2 font-sans text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2">
            Payment Verification
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-normal text-foreground tracking-tight">
            UPI Transactions &amp; Orders
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Review, verify, and approve UPI payments and UTR receipts submitted by students.
          </p>
        </div>

        <button
          onClick={fetchOrders}
          disabled={loading}
          className="flex items-center gap-2 rounded-xl border border-border bg-secondary text-foreground px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:bg-card transition-all cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 mb-6 border border-border rounded-xl bg-secondary p-1 w-fit overflow-x-auto">
          {filters.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all cursor-pointer whitespace-nowrap ${
                filter === value
                  ? "bg-card text-foreground shadow-xs border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Orders Table */}
        {loading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading payment orders…</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground border border-dashed border-border rounded-2xl">
            <CreditCard className="h-10 w-10 opacity-30" />
            <p className="text-sm">No payment orders found for this filter.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="rounded-2xl border border-border bg-card p-5 sm:p-6 transition-all hover:border-foreground/20"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: Order Info */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <StatusBadge status={order.status} />
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                        {order.plan === "pro" ? "Pro Learner" : "Team & Mentorship"} · {order.billingCycle}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-xs">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <User className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-mono truncate">{order.userEmail || order.userId.slice(0, 16) + "…"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <CreditCard className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-semibold text-foreground">
                          ₹{order.amountINR.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Hash className="h-3.5 w-3.5 shrink-0" />
                        <span className="font-mono">
                          {order.utrNumber ? (
                            <span className="text-foreground font-semibold">{order.utrNumber}</span>
                          ) : (
                            <span className="italic opacity-50">No UTR submitted yet</span>
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 shrink-0" />
                        <span>
                          {new Date(order.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </span>
                      </div>
                    </div>

                    <p className="text-[10px] font-mono text-muted-foreground/60">
                      Order: {order.orderId}
                    </p>
                  </div>

                  {/* Right: Actions */}
                  {(order.status === "pending" || order.status === "awaiting_verification") && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleVerify(order.orderId, false)}
                        disabled={actionLoading === order.orderId}
                        className="flex items-center gap-1.5 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive/10 transition-all px-3 py-2 text-xs font-mono uppercase tracking-widest cursor-pointer disabled:opacity-50"
                      >
                        {actionLoading === order.orderId ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <XCircle className="h-3.5 w-3.5" />
                        )}
                        Reject
                      </button>
                      <button
                        onClick={() => handleVerify(order.orderId, true)}
                        disabled={actionLoading === order.orderId || !order.utrNumber}
                        title={!order.utrNumber ? "UTR not submitted yet" : undefined}
                        className="flex items-center gap-1.5 rounded-xl bg-success text-white hover:bg-success/90 transition-all px-3 py-2 text-xs font-mono uppercase tracking-widest cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-xs"
                      >
                        {actionLoading === order.orderId ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        )}
                        Approve
                      </button>
                    </div>
                  )}

                  {order.status === "verified" && order.verifiedBy && (
                    <div className="text-[10px] font-mono text-success shrink-0">
                      ✓ Approved by {order.verifiedBy}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  )
}
