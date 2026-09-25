"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Briefcase, ArrowRight, Clock, CheckCircle2, XCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandIcon } from "@/components/ui/brand-icon"

type ApplicationTab = "all" | "applied" | "shortlisted" | "selected" | "closed"

interface JobApplication {
  id: string
  role: string
  company: string
  brand: string
  appliedDate: string
  location: string
  status: "Under Review" | "Shortlisted" | "Selected" | "Closed"
}

const SAMPLE_APPLICATIONS: JobApplication[] = [
  {
    id: "app-1",
    role: "Software Engineer Intern",
    company: "Google",
    brand: "google",
    appliedDate: "12 Sep 2026",
    location: "Bangalore / Remote",
    status: "Under Review",
  },
  {
    id: "app-2",
    role: "Backend Platform Engineer",
    company: "Razorpay",
    brand: "razorpay",
    appliedDate: "08 Sep 2026",
    location: "Bangalore",
    status: "Shortlisted",
  },
  {
    id: "app-3",
    role: "High-Frequency Trading Intern",
    company: "Zerodha",
    brand: "zerodha",
    appliedDate: "02 Sep 2026",
    location: "Bangalore",
    status: "Under Review",
  },
  {
    id: "app-4",
    role: "Full-Stack Developer",
    company: "Microsoft",
    brand: "microsoft",
    appliedDate: "20 Aug 2026",
    location: "Hyderabad",
    status: "Closed",
  },
]

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState<ApplicationTab>("all")

  const filteredApplications = SAMPLE_APPLICATIONS.filter((app) => {
    if (activeTab === "all") return true
    if (activeTab === "applied") return app.status === "Under Review"
    if (activeTab === "shortlisted") return app.status === "Shortlisted"
    if (activeTab === "selected") return app.status === "Selected"
    if (activeTab === "closed") return app.status === "Closed"
    return true
  })

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-serif font-normal text-foreground tracking-tight">
            Job &amp; Internship Applications
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Track status updates and interview schedules for your career opportunities.
          </p>
        </div>

        {/* Tabs: All, Applied, Shortlisted, Selected, Closed */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-secondary border border-border/80 w-fit text-xs font-semibold overflow-x-auto">
          {(["all", "applied", "shortlisted", "selected", "closed"] as ApplicationTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg capitalize transition-all cursor-pointer ${
                activeTab === tab
                  ? "bg-card text-foreground shadow-2xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List of Applications */}
        <div className="space-y-2.5">
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-xl p-6">
              <Briefcase className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <h3 className="font-semibold text-sm text-foreground">No applications in this category</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Explore open jobs, internships, and hiring challenges on the career hub.
              </p>
              <Link
                href="/career"
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
              >
                <span>Browse Opportunities</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            filteredApplications.map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-secondary border border-border/80 flex items-center justify-center shrink-0">
                    <BrandIcon name={app.brand} size={24} />
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <h3 className="font-semibold text-sm sm:text-base text-foreground truncate">
                      {app.role}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {app.company} · {app.location} · Applied: {app.appliedDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end sm:self-center">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono font-semibold ${
                      app.status === "Shortlisted"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        : app.status === "Closed"
                        ? "bg-secondary text-muted-foreground border border-border"
                        : "bg-primary/10 text-primary border border-primary/20"
                    }`}
                  >
                    {app.status === "Shortlisted" ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : app.status === "Closed" ? (
                      <XCircle className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    <span>{app.status}</span>
                  </span>

                  <Link
                    href="/career"
                    className="px-3 py-1.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold transition-all"
                  >
                    Details
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
