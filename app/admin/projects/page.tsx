"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  FolderGit2,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  Edit3,
  Trash2,
  Clock,
  Layers,
  CheckCircle2,
} from "lucide-react"
import { GUIDED_PROJECTS } from "@/lib/projects-data"

export default function AdminProjectsPage() {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedDifficulty, setSelectedDifficulty] = useState("All")

  const categories = useMemo(() => {
    const set = new Set<string>()
    GUIDED_PROJECTS.forEach((p: any) => set.add(p.category))
    return ["All", ...Array.from(set)]
  }, [])

  const filtered = useMemo(() => {
    return GUIDED_PROJECTS.filter((p: any) => {
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesTitle = p.title.toLowerCase().includes(q)
        const matchesTech = p.technologies?.some((t: any) => t.toLowerCase().includes(q))
        if (!matchesTitle && !matchesTech) return false
      }
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false
      if (selectedDifficulty !== "All" && p.difficulty !== selectedDifficulty) return false
      return true
    })
  }, [search, selectedCategory, selectedDifficulty])

  return (
    <div className="space-y-6 pt-2 font-sans text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-bold">
            Project Engineering
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Guided Capstone Projects Directory
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Maintain production-grade capstone specifications, milestone rubrics, and automated verification suites.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Capstone Project</span>
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
              placeholder="Search projects by title, stack, keyword..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      {/* Information-Dense Table */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
          <span>Showing {filtered.length} Capstone Specifications</span>
          <span>Verified Rubrics</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Project Title</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Difficulty</th>
                <th className="py-2.5 px-3 font-semibold">Tech Stack</th>
                <th className="py-2.5 px-3 font-semibold">Milestones</th>
                <th className="py-2.5 px-3 font-semibold">Est. Time</th>
                <th className="py-2.5 px-3 font-semibold">Scholars</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-muted-foreground font-mono">
                    No project specifications match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((proj: any) => (
                  <tr key={proj.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-foreground truncate max-w-xs">
                        {proj.title}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground truncate">
                        ID: {proj.slug}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border text-foreground">
                        {proj.category}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {proj.difficulty}
                      </span>
                    </td>

                    <td className="py-2.5 px-3">
                      <span className="text-[11px] font-mono text-foreground truncate max-w-[180px] block">
                        {proj.technologies.slice(0, 3).join(" · ")}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-primary font-semibold">
                      {proj.milestones.length} milestones
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                      {proj.estimatedHours}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-foreground font-bold">
                      {proj.enrolledStudents.toLocaleString()}
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/projects/${proj.slug}`}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Preview Public Spec"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          type="button"
                          className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors cursor-pointer"
                          title="Edit Rubric"
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
