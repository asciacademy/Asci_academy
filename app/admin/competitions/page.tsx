"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Trophy,
  Search,
  Plus,
  Filter,
  ArrowRight,
  ExternalLink,
  Edit3,
  Trash2,
  Globe,
  EyeOff,
  CheckCircle2,
  Calendar,
  Users,
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"

export default function AdminCompetitionsPage() {
  const { hackathons } = useUnstopEcosystem()
  const [search, setSearch] = useState("")
  const [selectedMode, setSelectedMode] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")

  const filtered = useMemo(() => {
    return hackathons.filter((comp) => {
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesTitle = comp.title?.toLowerCase().includes(q)
        const matchesHost = comp.host?.toLowerCase().includes(q)
        const matchesTag = comp.tags?.some((t) => t.toLowerCase().includes(q))
        if (!matchesTitle && !matchesHost && !matchesTag) return false
      }
      if (selectedMode !== "All" && comp.mode !== selectedMode) return false
      return true
    })
  }, [hackathons, search, selectedMode])

  return (
    <div className="space-y-6 pt-2 font-sans text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-bold">
            Sprint Administration
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Competitions &amp; Hackathon Registry
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Configure partner hackathons, prize pools, submission timelines, and registrant rosters.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Competition</span>
          </button>
        </div>
      </div>

      {/* Control Bar: Search & Filter */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search competitions by title, sponsor, skill tag..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Formats</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
              <option value="In-Person">In-Person</option>
            </select>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Live">Live Registration</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      {/* Information-Dense Competitions Table */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
          <span>Showing {filtered.length} Competitions</span>
          <span>Verified Partner Network</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Competition Title</th>
                <th className="py-2.5 px-3 font-semibold">Host / Sponsor</th>
                <th className="py-2.5 px-3 font-semibold">Prize Pool</th>
                <th className="py-2.5 px-3 font-semibold">Format</th>
                <th className="py-2.5 px-3 font-semibold">Team Size</th>
                <th className="py-2.5 px-3 font-semibold">Registrations</th>
                <th className="py-2.5 px-3 font-semibold">Deadline</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground font-mono">
                    No competitions match your query.
                  </td>
                </tr>
              ) : (
                filtered.map((comp) => (
                  <tr key={comp.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-foreground truncate max-w-xs">
                        {comp.title}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground truncate">
                        {comp.tags?.slice(0, 3).join(" · ")}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-secondary flex items-center justify-center shrink-0">
                          <CompanyLogo company={comp.host} size={14} />
                        </div>
                        <span className="font-medium text-foreground">{comp.host}</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] font-bold text-primary">
                      {comp.prizePool}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                        {comp.mode}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                      {comp.teamSize}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-foreground font-semibold">
                      {comp.registeredCount.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-muted-foreground">
                      {comp.deadline}
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/competitions/${comp.id}`}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Preview Public Listing"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors cursor-pointer"
                          title="Edit Details"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
