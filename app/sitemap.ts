import type { MetadataRoute } from "next"
import { ALL_PROBLEMS } from "@/lib/dsa/problem-catalog"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://asci-academy.pages.dev"
  const now = new Date()

  // 1. Core high-priority pages
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/programs`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/dsa`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/dsa/a2z-sheet`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dsa/strivers-a2z-sheet-learn-dsa-a-to-z`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/degrees`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/courses`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/community`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/experience`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sandbox/call-stack`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  // 2. Curated Curriculum Tracks and Courses
  const programTracks = [
    "python",
    "python/course",
    "java",
    "java/course",
    "java-intermediate",
    "java-intermediate/course",
    "java-advanced",
    "java-advanced/course",
    "cpp",
    "cpp/course",
    "c",
    "c/course",
    "react",
    "react/course",
    "typescript",
    "typescript/course",
    "javascript",
    "javascript/course",
    "html",
    "html/course",
    "css",
    "css/course",
    "webdev",
    "webdev/course",
    "backend",
    "system-design",
    "sql",
    "sql/course",
    "git",
    "git/course",
    "dsa",
    "dsa/course",
    "dsa-intermediate",
    "dsa-intermediate/course",
    "dsa-advanced",
    "dsa-advanced/course",
  ]

  const programRoutes: MetadataRoute.Sitemap = programTracks.map((path) => ({
    url: `${baseUrl}/programs/${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  // 3. Algorithmic Practice Arena Problems (474 problems)
  const problemRoutes: MetadataRoute.Sitemap = ALL_PROBLEMS.map((problem) => ({
    url: `${baseUrl}/dsa/problems/${problem.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }))

  return [...coreRoutes, ...programRoutes, ...problemRoutes]
}
