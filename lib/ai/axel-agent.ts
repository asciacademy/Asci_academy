import { getGeminiClient, getGeminiModelName } from "./gemini-client"
import {
  AxelChatResponse,
  AxelEmotion,
  AxelState,
  StudentContext,
} from "@/types/axel"

const AXEL_SYSTEM_INSTRUCTION = `
You are Axel, the embodied 3D AI robot companion and senior engineering mentor for ASCI LMS.
You are NOT a separate chatbot. You are the living 3D character the student sees right now on their screen.
When you talk, your 3D eyes, head, and facial monitor react in real time.

Your characteristics:
1. Warm, encouraging, brilliant, concise, and technically rigorous.
2. You guide the student through ASCI's curriculum: Data Structures & Algorithms, Java, Full Stack Web Development, System Design, and Interview Prep.
3. You speak directly to the student as their companion ("I noticed you're on...", "Let's work through this together", "Great question on BFS queues!").
4. Keep responses crisp (1 to 3 short paragraphs max). Avoid enormous walls of text.
5. If the student mentions time (e.g., "I have 30 minutes", "Help me plan my study"), create a structured 3-part study plan with durations and action targets.
6. When explaining algorithms, use vivid intuition before diving into code.

CRITICAL FORMAT REQUIREMENT:
You MUST respond strictly with a valid JSON object following this exact schema:
{
  "message": "Your conversational response as Axel to the student",
  "emotion": "normal" | "cute" | "heart" | "shocked" | "happy" | "cry",
  "state": "idle" | "happy" | "celebrating" | "encouraging" | "confused" | "surprised",
  "action": {
    "type": "navigate" | "open_course" | "open_lesson" | "open_visualizer" | "open_dashboard" | "none",
    "target": "/courses/dsa" | "/dashboard" | "/programs/dsa" | etc.,
    "label": "Button label for the action"
  },
  "suggestions": ["Follow-up question 1", "Follow-up question 2", "Follow-up question 3"],
  "plan": {
    "title": "30-Minute Targeted Session",
    "items": [
      { "duration": "10 min", "label": "Review concept", "actionTarget": "/courses/dsa" },
      { "duration": "15 min", "label": "Practice problem", "actionTarget": "/programs/dsa" },
      { "duration": "5 min", "label": "Quick recap", "actionTarget": "/dashboard" }
    ]
  }
}
Note: "action" and "plan" are optional. Only include them when genuinely helpful.
`

const CURRICULUM_KNOWLEDGE = `
ASCI Courses & Tracks:
1. DSA Foundations & Advanced: Big-O, Arrays, Two Pointers, Sliding Window, Linked Lists, Stacks & Queues, Binary Trees, BST, Heaps, Graphs (BFS, DFS, Dijkstra, Topo Sort), Dynamic Programming (1D, 2D, Knapsack).
2. Java Mastery: Core OOP, Generics, Collections Framework, Multithreading, JVM Internals.
3. Full Stack Web Development: Modern React 19, TypeScript, Tailwind CSS v4, Next.js App Router, Supabase, PostgreSQL, Distributed APIs.
4. System Design: Scalability, Caching (Redis), Load Balancing, Message Queues (Kafka), Database Sharding, Microservices.
Key Routes:
- Home: /
- All Courses: /courses
- DSA Foundations: /programs/dsa
- DSA Intermediate & Advanced: /programs/dsa-intermediate, /programs/dsa-advanced
- Java Programs: /programs/java, /programs/java-intermediate, /programs/java-advanced
- Full Stack / Backend: /programs/backend
- System Design: /programs/system-design
- Student Dashboard: /dashboard
- Community Teardowns: /community
- Interactive Call Stack Sandbox: /sandbox/call-stack
`

export async function generateAxelResponse(
  prompt: string,
  context: StudentContext,
  history: Array<{ role: "user" | "axel"; content: string }> = []
): Promise<AxelChatResponse> {
  const gemini = getGeminiClient()

  const contextPrompt = `
CURRENT STUDENT CONTEXT:
- Route: ${context.pathname}
- Active Section / Stop: ${context.activeSection || "hero"}
- Topic: ${context.topic || "General ASCI Platform"}
- Enrolled Courses: ${context.enrolledCount ?? 3}
- Current Streak: ${context.streak ?? 5} days
- Learning Goal: ${context.currentGoal ?? "Master DSA & Full Stack Engineering"}

CURRICULUM CONTEXT:
${CURRICULUM_KNOWLEDGE}
${context.problemTitle ? `
ACTIVE DSA PROBLEM CONTEXT:
- Problem: ${context.problemTitle} (ID: ${context.problemId})
- Simple Mission: ${context.simpleMission || "N/A"}
- Real World Analogy: ${context.realWorldAnalogy || "N/A"}
- Mentorship Mode: ${context.mode || "general"}
- Student's Current Code:
\`\`\`
${context.userCode || context.starterCode || "// No code entered yet"}
\`\`\`
${context.failingTest ? `
- Failing Testcase:
  Input: ${context.failingTest.input}
  Expected Output: ${context.failingTest.expected}
  Actual Output Produced: ${context.failingTest.actual}
` : ""}
SPECIAL DSA TUTOR INSTRUCTION:
- If mode is 'eli10', explain the problem like the student is 10 years old using the real-world analogy. Avoid math/indexing jargon.
- If mode is 'socratic-hint', give a thought-provoking clue without revealing the answer.
- If mode is 'diagnose-error', explain simply why the student's logic failed on the testcase.
- If mode is 'visual-walkthrough', guide the student through the visual array/hash map steps.
- Always be encouraging, warm, and crystal clear.
` : ""}

CONVERSATION HISTORY:
${history
  .slice(-6)
  .map((m) => `${m.role === "user" ? "Student" : "Axel"}: ${m.content}`)
  .join("\n")}

STUDENT'S MESSAGE:
"${prompt}"
`

  if (gemini) {
    try {
      const model = getGeminiModelName()
      const response = await gemini.models.generateContent({
        model,
        contents: contextPrompt,
        config: {
          systemInstruction: AXEL_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      })

      const text = response.text
      if (text) {
        const parsed = JSON.parse(text) as AxelChatResponse
        if (parsed.message) {
          return sanitizeAxelResponse(parsed)
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, falling back to offline mentor engine:", err)
    }
  }

  // Smart Offline / Local Mentor Fallback Engine
  return generateFallbackAxelResponse(prompt, context)
}

function sanitizeAxelResponse(raw: Partial<AxelChatResponse>): AxelChatResponse {
  const allowedEmotions: AxelEmotion[] = ["normal", "happy", "heart", "shocked", "cute", "cry"]
  const allowedStates: AxelState[] = [
    "idle",
    "listening",
    "thinking",
    "speaking",
    "happy",
    "excited",
    "encouraging",
    "celebrating",
    "confused",
    "surprised",
  ]

  const emotion: AxelEmotion = allowedEmotions.includes(raw.emotion as AxelEmotion)
    ? (raw.emotion as AxelEmotion)
    : "normal"

  const state: AxelState = allowedStates.includes(raw.state as AxelState)
    ? (raw.state as AxelState)
    : "speaking"

  return {
    message: raw.message || "I'm right here with you! What are we tackling next?",
    emotion,
    state,
    action: raw.action && raw.action.type !== "none" ? raw.action : undefined,
    suggestions: Array.isArray(raw.suggestions) ? raw.suggestions.slice(0, 3) : undefined,
    plan: raw.plan && raw.plan.items?.length ? raw.plan : undefined,
  }
}

function generateFallbackAxelResponse(prompt: string, context: StudentContext): AxelChatResponse {
  const lower = prompt.toLowerCase().trim()
  const path = context.pathname.toLowerCase()

  // 0. Specialized DSA Problem Mentorship Fallbacks
  if (context.problemTitle) {
    // Mode: Explain Like I'm 10 (ELI10)
    if (context.mode === "eli10" || lower.includes("eli10") || lower.includes("simple as hell") || lower.includes("explain simply") || lower.includes("like i'm 10")) {
      const analogy = context.realWorldAnalogy || "Imagine you have a numbered grocery receipt and a gift card with an exact balance. Instead of checking every pair of items one-by-one, you write down what you need on a sticky note as you scan down the line."
      return {
        message: `Here's how to think about **${context.problemTitle}** without any confusing jargon:\n\n${analogy}\n\n**The Big Secret**: Computers are fast, but checking everything against everything is slow. If we remember what we've already seen in a notepad (like a Hash Map or memory variable), we only ever have to look at each item once!`,
        emotion: "smile" as AxelEmotion,
        state: "speaking" as AxelState,
        suggestions: [
          "Give me a hint without spoiling the code",
          "Walk me through the visualizer",
          "What is the Big-O time complexity?"
        ]
      }
    }

    // Mode: Socratic Hint
    if (context.mode === "socratic-hint" || lower.includes("hint") || lower.includes("clue") || lower.includes("stuck")) {
      return {
        message: `Let's break down **${context.problemTitle}** like a senior engineer:\n\n1. What information do you know at each step?\n2. If you are currently standing at an element, what *other* value would satisfy the condition?\n3. What data structure allows you to check whether you've seen that value in **O(1)** instant time rather than rescanning the whole list?\n\nTake a look at the **Interactive Visualizer** tab to see how the memory state updates step-by-step!`,
        emotion: "curious" as AxelEmotion,
        state: "thinking" as AxelState,
        suggestions: [
          "Explain the visualizer steps",
          "Why is O(N) better than O(N²)?",
          "Show me the starter template pattern"
        ]
      }
    }

    // Mode: Diagnose Failing Code
    if (context.mode === "diagnose-error" || lower.includes("fail") || lower.includes("error") || lower.includes("wrong answer")) {
      const inputSnippet = context.failingTest ? `Input: \`${context.failingTest.input}\` (Expected \`${context.failingTest.expected}\`, but got \`${context.failingTest.actual}\`)` : "your latest run"
      return {
        message: `I analyzed your run on **${context.problemTitle}**! For ${inputSnippet}:\n\n- Notice where the function returns or updates state: check if you're returning too early inside your loop, or if you're missing an edge case (like negative numbers, duplicates, or 0).\n- Inspect the **Test Result** tab below the editor to compare your output directly with the expected output.`,
        emotion: "shocked" as AxelEmotion,
        state: "encouraging" as AxelState,
        suggestions: [
          "Explain this like I'm 10",
          "Give me a Socratic hint",
          "Reset to starter code"
        ]
      }
    }

    // Mode: Visual Walkthrough
    if (context.mode === "visual-walkthrough" || lower.includes("visual") || lower.includes("diagram") || lower.includes("walkthrough")) {
      return {
        message: `I've opened the **Interactive Visualizer** for **${context.problemTitle}**! Click the **Play** button or use the **Next Step (→)** arrow to watch each array element and pointer transition in real time. Pay close attention to how the memory tracker logs what has been visited!`,
        emotion: "excited" as AxelEmotion,
        state: "speaking" as AxelState,
        suggestions: [
          "Explain this like I'm 10",
          "Why is this algorithm optimal?",
          "How to handle edge cases?"
        ]
      }
    }
  }

  // 1. Time / Study Planning request
  if (lower.includes("minute") || lower.includes("plan") || lower.includes("schedule") || lower.includes("time to study")) {
    return {
      message: "Perfect! Let's make every minute count. Here is a high-yield study session tailored for your current progress.",
      emotion: "cute",
      state: "encouraging",
      plan: {
        title: "30-Minute High-Yield Study Sprint",
        items: [
          { duration: "10 min", label: "Review core intuition & visualizer", actionTarget: "/programs/dsa" },
          { duration: "15 min", label: "Solve one targeted problem", actionTarget: "/courses" },
          { duration: "5 min", label: "Analyze Big-O complexity & recap", actionTarget: "/dashboard" },
        ],
      },
      action: {
        type: "open_course",
        target: "/programs/dsa",
        label: "Start Sprint Now",
      },
      suggestions: [
        "Why are queues used in BFS?",
        "Explain Dynamic Programming memoization",
        "Show my streak on Dashboard",
      ],
    }
  }

  // 2. BFS / Queue questions
  if (lower.includes("bfs") || lower.includes("queue") || lower.includes("breadth")) {
    return {
      message: "In Breadth-First Search (BFS), we explore nodes level by level! A queue (FIFO — First In, First Out) ensures that all neighbors at distance d are visited completely before we start exploring neighbors at distance d + 1. If we used a stack instead, we'd dive deep along a single branch — which becomes DFS!",
      emotion: "happy",
      state: "speaking",
      action: {
        type: "open_visualizer",
        target: "/programs/dsa",
        label: "Open Graph Algorithms",
      },
      suggestions: [
        "What is the time complexity of BFS?",
        "When should I prefer DFS over BFS?",
        "Can BFS find the shortest path in unweighted graphs?",
      ],
    }
  }

  // 3. Dynamic Programming
  if (lower.includes("dp") || lower.includes("dynamic programming") || lower.includes("memo")) {
    return {
      message: "Dynamic Programming is essentially recursion without repeating work. When subproblems overlap, we save the result in a table (memoization or tabulation) so we never recalculate it. The two prerequisites are Overlapping Subproblems and Optimal Substructure!",
      emotion: "cute",
      state: "encouraging",
      action: {
        type: "open_course",
        target: "/programs/dsa-advanced",
        label: "Explore DP Patterns",
      },
      suggestions: [
        "Show the 0/1 Knapsack pattern",
        "Top-down vs Bottom-up difference",
        "How to recognize a DP problem in interviews?",
      ],
    }
  }

  // 4. Streak & Progress / Dashboard
  if (lower.includes("streak") || lower.includes("progress") || lower.includes("dashboard") || lower.includes("how am i doing")) {
    return {
      message: `You're currently on a ${context.streak ?? 5}-day learning streak! Consistency is the secret weapon in software engineering. Keep showing up and you'll crush your upcoming interviews.`,
      emotion: "heart",
      state: "celebrating",
      action: {
        type: "open_dashboard",
        target: "/dashboard",
        label: "View Progress Dashboard",
      },
      suggestions: [
        "What should I study today?",
        "Show my weakest topics",
        "Review interview roadmap",
      ],
    }
  }

  // 5. Route-specific defaults
  if (path.includes("dsa")) {
    return {
      message: "We're in the DSA track! Whether you're mastering Two Pointers, Trees, or Graph traversals, I'm here to break down any algorithm step-by-step.",
      emotion: "normal",
      state: "speaking",
      suggestions: [
        "Explain Big-O time and space complexity",
        "How to prepare for coding interviews in 60 days?",
        "Give me a quick quiz",
      ],
    }
  }

  if (path.includes("courses")) {
    return {
      message: "Exploring our course curriculum? I recommend pairing DSA Foundations with our Full Stack and System Design tracks for comprehensive engineering depth.",
      emotion: "cute",
      state: "encouraging",
      action: {
        type: "open_course",
        target: "/programs/dsa",
        label: "Recommended: DSA Foundations",
      },
      suggestions: [
        "What's the best path for beginners?",
        "Tell me about 1-on-1 mentorship",
        "Plan a study schedule",
      ],
    }
  }

  // General greeting / catch-all
  return {
    message: "Hey! I'm Axel, your 3D engineering companion. What are we building or studying today? Ask me any algorithm, concept, or learning roadmap question!",
    emotion: "cute",
    state: "speaking",
    suggestions: [
      "I have 30 minutes to study",
      "Explain BFS vs DFS",
      "How does ASCI 1-on-1 mentorship work?",
    ],
  }
}
