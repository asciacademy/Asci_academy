"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  GraduationCap,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  Edit3,
  Trash2,
  Clock,
  Building2,
  Calendar,
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"

export default function AdminInternshipsPage() {
  const { jobs } = useUnstopEcosystem()
  const [search, setSearch] = useState("")
  const [selectedDuration, setSelectedDuration] = useState("All")

  // Filter internships only
  const internships = useMemo(() => {
    return jobs.filter((j) => j.roleType === "Internship")
  }, [jobs])

  const filtered = useMemo(() => {
    return internships.filter((item) => {
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesTitle = item.title.toLowerCase().includes(q)
        const matchesCompany = item.company.toLowerCase().includes(q)
        const matchesSkill = item.skills?.some((s) => s.toLowerCase().includes(q))
        if (!matchesTitle && !matchesCompany && !matchesSkill) return false
      }
      return true
    })
  }, [internships, search])

  return (
    <div className="space-y-6 pt-2 font-sans text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-bold">
            Apprenticeship Operations
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Internships &amp; Apprenticeship Registry
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Maintain paid software internships, partner monthly stipends, and student hiring pipelines.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Internship</span>
          </button>
        </div>
      </div>

      {/* Control Bar */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search internships by role, company, tech stack..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      {/* Information-Dense Table */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
          <span>Showing {filtered.length} Paid Internship Openings</span>
          <span>Verified Stipend Benchmarks</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Internship Role</th>
                <th className="py-2.5 px-3 font-semibold">Company</th>
                <th className="py-2.5 px-3 font-semibold">Monthly Stipend</th>
                <th className="py-2.5 px-3 font-semibold">Duration</th>
                <th className="py-2.5 px-3 font-semibold">Format</th>
                <th className="py-2.5 px-3 font-semibold">Skills</th>
                <th className="py-2.5 px-3 font-semibold">Deadline</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground font-mono">
                    No internship openings match your query.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-foreground truncate max-w-xs">
                        {item.title}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground truncate">
                        ID: {item.id}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-secondary flex items-center justify-center shrink-0">
                          <CompanyLogo company={item.companyLogo || item.company} size={14} />
                        </div>
                        <span className="font-medium text-foreground">{item.company}</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] font-bold text-primary">
                      {item.compensation}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                      {(item as any).duration || "3 Months"}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                        {item.workMode || "Remote"}
                      </span>
                    </td>

                    <td className="py-2.5 px-3">
                      <span className="text-[11px] font-mono text-foreground truncate max-w-[160px] block">
                        {item.skills?.slice(0, 3).join(" · ")}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-muted-foreground">
                      {item.closingInDays ? `${item.closingInDays} days` : "Apply by Oct 12"}
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/internships/${item.id}`}
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
