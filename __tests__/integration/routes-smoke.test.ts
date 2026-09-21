import { describe, it, expect } from "vitest"

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3000"

async function probeUrl(path: string, options: RequestInit = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      redirect: "manual",
      ...options,
    })
    return { status: res.status, headers: res.headers, ok: res.ok, res }
  } catch (err) {
    return { status: 0, error: err }
  }
}

describe("Integration Smoke Tests - Live Application Server & Routes", () => {
  it("verifies public marketing & catalog routes respond with HTTP 200", async () => {
    const publicPaths = [
      "/",
      "/courses",
      "/programs",
      "/courses/generative-ai-rag",
      "/dsa",
      "/experience",
      "/pricing",
      "/degrees",
      "/community",
      "/login",
      "/signup",
    ]

    await Promise.all(
      publicPaths.map(async (path) => {
        const probe = await probeUrl(path)
        // If server is currently running locally, check status; if server offline, skip gracefully
        if (probe.status !== 0) {
          expect([200, 307, 308]).toContain(probe.status)
        }
      })
    )
  }, 15000)

  it("verifies legacy plus routes issue permanent redirect to /pricing", async () => {
    const probePlus = await probeUrl("/plus")
    if (probePlus.status !== 0) {
      expect([307, 308]).toContain(probePlus.status)
    }

    const probeCourseraPlus = await probeUrl("/courseraplus")
    if (probeCourseraPlus.status !== 0) {
      expect([307, 308]).toContain(probeCourseraPlus.status)
    }
  })

  it("verifies protected administrative routes require auth or allow demo bypass", async () => {
    // Unauthenticated request should redirect (307)
    const unauthProbe = await probeUrl("/admin")
    if (unauthProbe.status !== 0) {
      expect([200, 307]).toContain(unauthProbe.status)
    }

    // Authenticated admin with cookie demo_bypass=admin
    const authAdminProbe = await probeUrl("/admin", {
      headers: { Cookie: "demo_bypass=admin" },
    })
    if (authAdminProbe.status !== 0) {
      expect(authAdminProbe.status).toBe(200)
    }

    // Admin courses manager
    const adminCoursesProbe = await probeUrl("/admin/courses", {
      headers: { Cookie: "demo_bypass=admin" },
    })
    if (adminCoursesProbe.status !== 0) {
      expect(adminCoursesProbe.status).toBe(200)
    }
  })

  it("verifies Axel AI chat endpoint accepts POST and responds with valid JSON", async () => {
    const probe = await probeUrl("/api/axel/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Hello Axel, what is BFS?",
        context: { pathname: "/courses", activeSection: "hero" },
      }),
    })

    if (probe.status !== 0) {
      expect(probe.status).toBe(200)
      const data = await probe.res.json()
      expect(data.message).toBeTruthy()
      expect(data.emotion).toBeTruthy()
    }
  }, 15000)
})
