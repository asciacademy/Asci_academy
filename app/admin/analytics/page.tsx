"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  BarChart3,
  Search,
  Filter,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Users,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight,
  Server,
  Zap,
  Clock,
  RefreshCw,
} from "lucide-react"

interface FunnelMetric {
  id: string
  stage: string
  volume: number
  conversionRate: string
  wowChange: string
  target: string
  status: "Exceeding" | "On Track" | "Needs Attention"
}

interface RevenueStream {
  id: string
  stream: string
  category: "Curriculum" | "Credentials" | "Live Cohorts" | "Recruiting"
  volume: number
  grossRevenue: number
  aov: number
  growth: string
  status: "Active" | "Seasonal"
}

interface SubsystemTelemetry {
  id: string
  name: string
  category: "Execution" | "Intelligence" | "Database" | "Payments" | "CDN" | "Credentials"
  p95Latency: string
  errorRate: string
  throughput: string
  uptime: string
  status: "Operational" | "Degraded" | "Investigating"
}

const FUNNEL_DATA: FunnelMetric[] = [
  { id: "f-1", stage: "Discovery & Catalog Views", volume: 142800, conversionRate: "100%", wowChange: "+14.2%", target: "120,000", status: "Exceeding" },
  { id: "f-2", stage: "Curriculum & Sandbox Engaged", volume: 68400, conversionRate: "47.9%", wowChange: "+8.1%", target: "45.0%", status: "Exceeding" },
  { id: "f-3", stage: "Active Course Enrollments", volume: 29850, conversionRate: "20.9%", wowChange: "+12.4%", target: "20.0%", status: "On Track" },
  { id: "f-4", stage: "Guided Projects Initiated", volume: 14200, conversionRate: "9.9%", wowChange: "+5.3%", target: "10.0%", status: "On Track" },
  { id: "f-5", stage: "Credential / Certificate Minted", volume: 4980, conversionRate: "3.5%", wowChange: "+19.0%", target: "3.0%", status: "Exceeding" },
  { id: "f-6", stage: "Career Opportunity Applications", volume: 8420, conversionRate: "5.9%", wowChange: "-1.2%", target: "7.0%", status: "Needs Attention" },
]

const REVENUE_STREAMS: RevenueStream[] = [
  { id: "rev-1", stream: "Masterclass Pro Subscriptions", category: "Curriculum", volume: 1420, grossRevenue: 4245800, aov: 2990, growth: "+24.5%", status: "Active" },
  { id: "rev-2", stream: "Verifiable Credential Verification", category: "Credentials", volume: 840, grossRevenue: 839160, aov: 999, growth: "+31.2%", status: "Active" },
  { id: "rev-3", stream: "Live Sprint & Class Cohort Passes", category: "Live Cohorts", volume: 390, grossRevenue: 1946100, aov: 4990, growth: "+12.8%", status: "Active" },
  { id: "rev-4", stream: "Enterprise Placement Referrals", category: "Recruiting", volume: 18, grossRevenue: 1350000, aov: 75000, growth: "+45.0%", status: "Active" },
  { id: "rev-5", stream: "Hackathon Sponsor Placement", category: "Recruiting", volume: 4, grossRevenue: 800000, aov: 200000, growth: "+5.0%", status: "Seasonal" },
]

const SUBSYSTEM_TELEMETRY: SubsystemTelemetry[] = [
  { id: "sub-1", name: "Monaco Code Execution Engine (Pyodide/Wasm)", category: "Execution", p95Latency: "48ms", errorRate: "0.02%", throughput: "1,420 rpm", uptime: "99.98%", status: "Operational" },
  { id: "sub-2", name: "Axel Contextual AI Gateway (Gemini 2.5)", category: "Intelligence", p95Latency: "210ms", errorRate: "0.08%", throughput: "340 rpm", uptime: "99.94%", status: "Operational" },
  { id: "sub-3", name: "PostgreSQL & Supabase Edge Pooler", category: "Database", p95Latency: "12ms", errorRate: "0.00%", throughput: "4,950 rpm", uptime: "100.0%", status: "Operational" },
  { id: "sub-4", name: "Razorpay & UPI Webhook Ingestion Pipeline", category: "Payments", p95Latency: "86ms", errorRate: "0.01%", throughput: "95 rpm", uptime: "100.0%", status: "Operational" },
  { id: "sub-5", name: "Ed25519 Cryptographic Certificate Verifier", category: "Credentials", p95Latency: "18ms", errorRate: "0.00%", throughput: "120 rpm", uptime: "100.0%", status: "Operational" },
  { id: "sub-6", name: "HLS Lesson Video Streaming & Asset CDN", category: "CDN", p95Latency: "34ms", errorRate: "0.04%", throughput: "12,400 rpm", uptime: "99.99%", status: "Operational" },
]

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d" | "ytd">("30d")
  const [telemetryFilter, setTelemetryFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredTelemetry = useMemo(() => {
    return SUBSYSTEM_TELEMETRY.filter((sub) => {
      const matchesSearch =
        sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sub.category.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesFilter =
        telemetryFilter === "all" || sub.category.toLowerCase() === telemetryFilter.toLowerCase()
      return matchesSearch && matchesFilter
    })
  }, [searchQuery, telemetryFilter])

  const totalGrossRevenue = useMemo(() => {
    return REVENUE_STREAMS.reduce((acc, curr) => acc + curr.grossRevenue, 0)
  }, [])

  return (
    <div className="space-y-6">
      {/* Dense Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-[#D4B872]">
              Executive Telemetry
            </span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono">
              Live Feed
            </span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#FDFBF7] mt-1">
            Platform Analytics & Financial Health
          </h1>
          <p className="text-xs text-zinc-400 font-mono mt-0.5">
            Operational metrics, conversion funnel velocity, gross revenue streams, and subsystem health
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Time Range Selector */}
          <div className="flex items-center rounded-lg bg-[#141413] border border-white/10 p-0.5 text-xs font-mono text-zinc-400">
            {(["24h", "7d", "30d", "ytd"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md transition-colors ${
                  timeRange === range
                    ? "bg-[#D4B872]/20 text-[#D4B872] font-semibold"
                    : "hover:text-[#FDFBF7]"
                }`}
              >
                {range.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ FUNNEL_DATA, REVENUE_STREAMS, SUBSYSTEM_TELEMETRY }, null, 2))
              const downloadAnchor = document.createElement("a")
              downloadAnchor.setAttribute("href", dataStr)
              downloadAnchor.setAttribute("download", `asci-analytics-${timeRange}.json`)
              document.body.appendChild(downloadAnchor)
              downloadAnchor.click()
              downloadAnchor.remove()
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-zinc-200 transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            Export Telemetry
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-[#141413] border border-white/10 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            Monthly Active
            <Users className="h-3.5 w-3.5 text-blue-400" />
          </div>
          <div className="text-xl font-bold font-mono text-[#FDFBF7] mt-1.5">142,800</div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +14.2% MoM
          </div>
        </div>

        <div className="bg-[#141413] border border-white/10 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            Completion Rate
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-[#FDFBF7] mt-1.5">71.4%</div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +4.8% vs benchmark
          </div>
        </div>

        <div className="bg-[#141413] border border-white/10 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            Hiring Yield
            <Zap className="h-3.5 w-3.5 text-[#D4B872]" />
          </div>
          <div className="text-xl font-bold font-mono text-[#FDFBF7] mt-1.5">28.6%</div>
          <div className="text-[10px] font-mono text-zinc-400 mt-1 flex items-center gap-1">
            Shortlist to Offer
          </div>
        </div>

        <div className="bg-[#141413] border border-white/10 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            Gross Revenue
            <DollarSign className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-[#FDFBF7] mt-1.5">
            ₹{(totalGrossRevenue / 100000).toFixed(2)}L
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +22.4% MoM
          </div>
        </div>

        <div className="bg-[#141413] border border-white/10 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            Sandbox Latency
            <Activity className="h-3.5 w-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-bold font-mono text-[#FDFBF7] mt-1.5">48ms</div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            p95 Wasm execute
          </div>
        </div>

        <div className="bg-[#141413] border border-white/10 rounded-xl p-3.5">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider flex items-center justify-between">
            System Uptime
            <Server className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-mono text-[#FDFBF7] mt-1.5">99.98%</div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
            All 6 clusters green
          </div>
        </div>
      </div>

      {/* Table 1: Conversion Funnel & Progression */}
      <div className="bg-[#141413] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold font-serif text-[#FDFBF7]">
              Ecosystem Conversion Funnel
            </h2>
            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
              Visitor step-through from initial open discovery to accredited job placement
            </p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Period: {timeRange.toUpperCase()}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-medium">Funnel Stage</th>
                <th className="py-2.5 px-4 font-medium text-right">Volume</th>
                <th className="py-2.5 px-4 font-medium text-right">Conversion Rate</th>
                <th className="py-2.5 px-4 font-medium text-right">WoW Trend</th>
                <th className="py-2.5 px-4 font-medium text-right">Target</th>
                <th className="py-2.5 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300 font-mono">
              {FUNNEL_DATA.map((stage) => (
                <tr key={stage.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-medium text-[#FDFBF7] flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#D4B872]" />
                    {stage.stage}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold">
                    {stage.volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-[#D4B872]">
                    {stage.conversionRate}
                  </td>
                  <td className={`py-3 px-4 text-right ${stage.wowChange.startsWith("+") ? "text-emerald-400" : "text-rose-400"}`}>
                    {stage.wowChange}
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-400">
                    {stage.target}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                        stage.status === "Exceeding"
                          ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                          : stage.status === "On Track"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {stage.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 2: Revenue Streams by Category */}
      <div className="bg-[#141413] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold font-serif text-[#FDFBF7]">
              Revenue Breakdown by Product Line
            </h2>
            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
              Aggregated income streams across subscriptions, credential verification, cohorts, and corporate hiring
            </p>
          </div>
          <div className="text-xs font-mono text-emerald-400 font-semibold">
            Total: ₹{totalGrossRevenue.toLocaleString()}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-medium">Revenue Stream</th>
                <th className="py-2.5 px-4 font-medium">Category</th>
                <th className="py-2.5 px-4 font-medium text-right">Transactions</th>
                <th className="py-2.5 px-4 font-medium text-right">Gross Total (₹)</th>
                <th className="py-2.5 px-4 font-medium text-right">AOV (₹)</th>
                <th className="py-2.5 px-4 font-medium text-right">MoM Growth</th>
                <th className="py-2.5 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300 font-mono">
              {REVENUE_STREAMS.map((rev) => (
                <tr key={rev.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-medium text-[#FDFBF7]">
                    {rev.stream}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                      {rev.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {rev.volume.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-emerald-400">
                    ₹{rev.grossRevenue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-400">
                    ₹{rev.aov.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400">
                    {rev.growth}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {rev.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Table 3: Subsystem Latency & Telemetry */}
      <div className="bg-[#141413] border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold font-serif text-[#FDFBF7]">
              Subsystem Performance & Service Reliability
            </h2>
            <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
              Live edge node latencies, error budgets, and execution throughput
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Search Filter */}
            <div className="relative flex-1 sm:w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter services..."
                className="w-full bg-[#1e1e1d] border border-white/10 rounded-lg pl-8 pr-3 py-1 text-xs text-[#FDFBF7] placeholder-zinc-500 focus:outline-none focus:border-[#D4B872]"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={telemetryFilter}
              onChange={(e) => setTelemetryFilter(e.target.value)}
              className="bg-[#1e1e1d] border border-white/10 rounded-lg px-2 py-1 text-xs font-mono text-zinc-300 focus:outline-none focus:border-[#D4B872]"
            >
              <option value="all">All Layers</option>
              <option value="Execution">Execution</option>
              <option value="Intelligence">Intelligence</option>
              <option value="Database">Database</option>
              <option value="Payments">Payments</option>
              <option value="CDN">CDN</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.02] text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-4 font-medium">Subsystem / Edge Service</th>
                <th className="py-2.5 px-4 font-medium">Layer</th>
                <th className="py-2.5 px-4 font-medium text-right">p95 Latency</th>
                <th className="py-2.5 px-4 font-medium text-right">Error Rate</th>
                <th className="py-2.5 px-4 font-medium text-right">Throughput</th>
                <th className="py-2.5 px-4 font-medium text-right">Availability</th>
                <th className="py-2.5 px-4 font-medium text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300 font-mono">
              {filteredTelemetry.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 px-4 font-medium text-[#FDFBF7]">
                    {sub.name}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-zinc-300">
                      {sub.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-[#D4B872]">
                    {sub.p95Latency}
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400">
                    {sub.errorRate}
                  </td>
                  <td className="py-3 px-4 text-right text-zinc-400">
                    {sub.throughput}
                  </td>
                  <td className="py-3 px-4 text-right font-semibold text-emerald-400">
                    {sub.uptime}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <CheckCircle2 className="h-3 w-3" />
                      {sub.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredTelemetry.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-zinc-500">
                    No subsystem found matching "{searchQuery}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
