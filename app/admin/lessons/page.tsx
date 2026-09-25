"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import {
  FileCode,
  Search,
  Filter,
  Plus,
  ArrowRight,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  Clock,
  Sparkles,
  Edit3,
  Trash2,
  Eye,
} from "lucide-react"
import { CURRICULUM_COURSES } from "@/lib/curriculum-data"

export default function AdminLessonsPage() {
  const [search, setSearch] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("All")
  const [selectedType, setSelectedType] = useState("All")

  // Flatten lessons from all courses
  const allLessons = useMemo(() => {
    const list: Array<{
      id: string
      title: string
      courseTitle: string
      courseSlug: string
      moduleTitle: string
      contentType: string
      xp: number
      duration: string
    }> = []

    CURRICULUM_COURSES.forEach((c: any) => {
      c.modules?.forEach((m: any) => {
        m.lessons?.forEach((l: any) => {
          list.push({
            id: l.id,
            title: l.title,
            courseTitle: c.title,
            courseSlug: c.slug,
            moduleTitle: m.title,
            contentType: l.content_type || "challenge",
            xp: l.xp_reward || 50,
            duration: "25 mins",
          })
        })
      })
    })

    return list
  }, [])

  const filteredLessons = useMemo(() => {
    return allLessons.filter((item) => {
      if (search.trim()) {
        const q = search.toLowerCase()
        const matchesTitle = item.title.toLowerCase().includes(q)
        const matchesCourse = item.courseTitle.toLowerCase().includes(q)
        const matchesModule = item.moduleTitle.toLowerCase().includes(q)
        if (!matchesTitle && !matchesCourse && !matchesModule) return false
      }
      if (selectedCourse !== "All" && item.courseTitle !== selectedCourse) {
        return false
      }
      if (selectedType !== "All" && item.contentType !== selectedType) {
        return false
      }
      return true
    })
  }, [allLessons, search, selectedCourse, selectedType])

  const courseTitles = useMemo(() => {
    return ["All", ...CURRICULUM_COURSES.map((c: any) => c.title)]
  }, [])

  return (
    <div className="space-y-6 pt-2 font-sans text-foreground">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-widest bg-primary/10 text-primary border border-primary/20 mb-2 font-bold">
            Curriculum Operations
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Lessons &amp; Problem Kata Catalog
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Manage granular lesson specifications, algorithmic drill prompts, and XP distribution rules.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-[#EA5300] text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Lesson Unit</span>
          </Link>
        </div>
      </div>

      {/* Control Bar: Search & Filters */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lessons by title, topic, or module..."
              className="w-full h-10 pl-10 pr-4 rounded-xl border border-border bg-secondary text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer max-w-[200px]"
            >
              {courseTitles.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Courses" : c}
                </option>
              ))}
            </select>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="h-10 px-3 rounded-xl border border-border bg-secondary text-xs text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="All">All Types</option>
              <option value="challenge">Code Kata / Challenge</option>
              <option value="text">Interactive Reading</option>
              <option value="project">Guided Milestone</option>
            </select>
          </div>
        </div>
      </div>

      {/* Information-Dense Lessons Table */}
      <div className="p-4 rounded-2xl border border-border bg-card shadow-2xs space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pb-1">
          <span>Showing {filteredLessons.length} Lesson Specifications</span>
          <span>Curriculum V4 Compliant</span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-border/80">
          <table className="w-full text-left text-xs">
            <thead className="bg-secondary/60 text-muted-foreground font-mono uppercase text-[10px] tracking-wider border-b border-border">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Lesson Title &amp; ID</th>
                <th className="py-2.5 px-3 font-semibold">Parent Curriculum</th>
                <th className="py-2.5 px-3 font-semibold">Module</th>
                <th className="py-2.5 px-3 font-semibold">Format</th>
                <th className="py-2.5 px-3 font-semibold">XP</th>
                <th className="py-2.5 px-3 font-semibold">Est. Time</th>
                <th className="py-2.5 px-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredLessons.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-muted-foreground font-mono">
                    No lesson specifications match your criteria.
                  </td>
                </tr>
              ) : (
                filteredLessons.map((item) => (
                  <tr key={item.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-foreground truncate max-w-sm">
                        {item.title}
                      </div>
                      <div className="text-[10px] font-mono text-muted-foreground truncate">
                        ID: {item.id}
                      </div>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <Link
                        href={`/courses/${item.courseSlug}`}
                        className="text-xs font-semibold text-foreground hover:text-primary transition-colors truncate max-w-[180px] block"
                      >
                        {item.courseTitle}
                      </Link>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-[11px] text-muted-foreground truncate max-w-[180px] block">
                        {item.moduleTitle}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary border border-border uppercase font-semibold text-foreground">
                        {item.contentType}
                      </span>
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] font-bold text-primary">
                      +{item.xp} XP
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap font-mono text-[11px] text-muted-foreground">
                      {item.duration}
                    </td>

                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1.5">
                        <Link
                          href={`/courses/${item.courseSlug}/learn`}
                          className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                          title="Preview in Player"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </Link>
                        <Link
                          href={`/admin/courses/${item.courseSlug}/edit`}
                          className="p-1 rounded-md text-muted-foreground hover:text-primary hover:bg-secondary transition-colors"
                          title="Edit in Course Builder"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </Link>
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
