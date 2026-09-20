import { NextResponse } from "next/server"
import { generateAxelResponse } from "@/lib/ai/axel-agent"
import { createClient } from "@/utils/supabase/server"
import { StudentContext } from "@/types/axel"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prompt, message, context = {}, history = [] } = body
    const userPrompt = (prompt || message || "").trim()

    if (!userPrompt || typeof userPrompt !== "string") {
      return NextResponse.json(
        { error: "Prompt or message is required" },
        { status: 400 }
      )
    }

    // Try to safely fetch authenticated user context from Supabase cookies
    let userEmail: string | undefined
    try {
      const supabase = await createClient()
      const { data } = await supabase.auth.getUser()
      if (data?.user?.email) {
        userEmail = data.user.email
      }
    } catch {
      // Non-blocking fallback for unauthenticated / guest visits
    }

    const studentContext: StudentContext = {
      pathname: context.pathname || "/",
      courseSlug: context.courseSlug,
      lessonId: context.lessonId,
      topic: context.topic,
      streak: context.streak ?? 5,
      enrolledCount: context.enrolledCount ?? 3,
      currentGoal: context.currentGoal || (userEmail ? `Learner (${userEmail})` : "Master Engineering & DSA"),
      problemId: context.problemId,
      problemTitle: context.problemTitle,
      simpleMission: context.simpleMission,
      realWorldAnalogy: context.realWorldAnalogy,
      starterCode: context.starterCode,
      userCode: context.userCode,
      mode: context.mode,
      failingTest: context.failingTest,
    }

    const response = await generateAxelResponse(userPrompt, studentContext, history)
    return NextResponse.json(response)
  } catch (error: any) {
    console.error("Error in /api/axel/chat route:", error)
    return NextResponse.json(
      {
        message: "I ran into a temporary hiccup in my neural circuit, but I'm right here! Let's try that again.",
        emotion: "shocked",
        state: "confused",
        suggestions: ["Explain BFS vs DFS", "Plan a 30-minute session", "Review course roadmap"],
      },
      { status: 200 }
    )
  }
}
