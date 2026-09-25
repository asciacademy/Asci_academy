"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  Briefcase,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  Edit3,
  Trash2,
  MapPin,
  Building2,
  Calendar,
  Users,
} from "lucide-react"
import { useUnstopEcosystem } from "@/lib/unstop-store"
import { CompanyLogo } from "@/components/ui/brand-ecosystem"

export default function AdminJobsPage() {
  const { jobs } = useUnstopEcosystem()
  const [search, setSearch] = useState("")
  const [selectedMode, setSelectedMode] = useState("All")

  // Filter full-time jobs
  const fullTimeJobs = useMemo(() => {
    return jobs.filter((j) => j.roleType !== "Internship")
  }, [jobs])

  const filtered = useMemo(() => {
    return fullTimeJobs.filter((job) => {
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesTitle = job.title.toLowerCase().includes(q)
        const matchesCompany = job.company.toLowerCase().includes(q)
        const matchesSkill = job.skills?.some((s) => s.toLowerCase().includes(q))
        if (!matchesTitle && !matchesCompany && !matchesSkill) return false
      }
      if (selectedMode !== "All" && job.workMode !== selectedMode) return false
      return true
    })
  }, [fullTimeJobs, search, selectedMode])

  return (
    <div className="space-y-6 pt-2 font-sans text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-bold">
            Talent Placement
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Full-Time Engineering Opportunities
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Maintain verified full-time job openings, partner compensation benchmarks, and referral applicant queues.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Post Job Listing</span>
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
              placeholder="Search jobs by role title, company name, required skill..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Work Modes</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="On-site">On-site</option>
            </select>
          </div>
        </div>
      </div>

      {/* Information-Dense Table */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
          <span>Showing {filtered.length} Verified Full-Time Openings</span>
          <span>Direct Referral Verified</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Role Title</th>
                <th className="py-2.5 px-3 font-semibold">Company</th>
                <th className="py-2.5 px-3 font-semibold">Compensation</th>
                <th className="py-2.5 px-3 font-semibold">Location / Mode</th>
                <th className="py-2.5 px-3 font-semibold">Experience</th>
                <th className="py-2.5 px-3 font-semibold">Skills Required</th>
                <th className="py-2.5 px-3 font-semibold">Deadline</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground font-mono">
                    No full-time job openings match your query.
                  </td>
                </tr>
              ) : (
                filtered.map((job) => (
                  <tr key={job.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-foreground truncate max-w-xs">
                        {job.title}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground truncate">
                        ID: {job.id}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded bg-secondary flex items-center justify-center shrink-0">
                          <CompanyLogo company={job.companyLogo || job.company} size={14} />
                        </div>
                        <span className="font-medium text-foreground">{job.company}</span>
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] font-bold text-primary">
                      {job.compensation}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                      {job.location} · {job.workMode}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-muted-foreground">
                      {job.experience || "0–2 Years"}
                    </td>

                    <td className="py-2.5 px-3">
                      <span className="text-[11px] font-mono text-foreground truncate max-w-[160px] block">
                        {job.skills?.slice(0, 3).join(" · ")}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[10px] text-muted-foreground">
                      {job.closingInDays ? `${job.closingInDays} days` : "Apply by Oct 12"}
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/jobs/${job.id}`}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Preview Public Listing"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors cursor-pointer"
                          title="Edit Job"
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
