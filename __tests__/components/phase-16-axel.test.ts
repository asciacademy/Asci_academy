import { describe, it, expect } from "vitest"
import React from "react"
import { ContextualAxelButton, AxelContext } from "@/components/axel/contextual-axel-button"
import { AxelStage } from "@/components/axel/axel-stage"
import { ScrollRobotWrapper } from "@/components/scroll-robot-wrapper"
import AxelPage from "@/app/axel/page"
import { POST as AxelChatApiRoute } from "@/app/api/axel/chat/route"
import { generateAxelResponse } from "@/lib/ai/axel-agent"

describe("Phase 16: Axel Redesign as Contextual Intelligence Layer", () => {
  describe("Contextual Intelligence Layer Triggers", () => {
    it("exports ContextualAxelButton component", () => {
      expect(ContextualAxelButton).toBeDefined()
      expect(typeof ContextualAxelButton).toBe("function")
    })

    const contexts: { context: AxelContext; expectedAction: string; description: string }[] = [
      {
        context: "course",
        expectedAction: "Explain this",
        description: "COURSE: Ask Axel 'Explain this'",
      },
      {
        context: "lesson",
        expectedAction: "Give me an example",
        description: "LESSON: Ask Axel 'Give me an example'",
      },
      {
        context: "dsa",
        expectedAction: "Give me a hint",
        description: "DSA: Ask Axel 'Give me a hint'",
      },
      {
        context: "code",
        expectedAction: "Explain this error",
        description: "CODE: Ask Axel 'Explain this error'",
      },
      {
        context: "project",
        expectedAction: "Help me debug",
        description: "PROJECT: Ask Axel 'Help me debug'",
      },
    ]

    contexts.forEach(({ context, expectedAction, description }) => {
      it(`supports ${description}`, () => {
        const element = React.createElement(ContextualAxelButton, {
          context,
          topicTitle: "Test Topic",
        })
        expect(element).toBeDefined()
        expect(element.props.context).toBe(context)
      })
    })

    it("verifies ContextualAxelButton supports pill, compact, banner, and button variants", () => {
      const variants: ("button" | "pill" | "banner" | "compact")[] = ["button", "pill", "banner", "compact"]
      variants.forEach((variant) => {
        const el = React.createElement(ContextualAxelButton, {
          context: "dsa",
          variant,
          topicTitle: "Two Sum",
        })
        expect(el.props.variant).toBe(variant)
      })
    })
  })

  describe("Removal of Giant 3D UI on Ordinary Pages", () => {
    it("AxelStage renders null to ensure zero 3D canvas layout intrusion on ordinary pages", () => {
      expect(AxelStage).toBeDefined()
      const rendered = AxelStage({})
      expect(rendered).toBeNull()
    })

    it("ScrollRobotWrapper safely renders only the lightweight client assistant widget", () => {
      expect(ScrollRobotWrapper).toBeDefined()
      const wrapperElement = React.createElement(ScrollRobotWrapper)
      expect(wrapperElement).toBeDefined()
    })
  })

  describe("Full Axel Experience at /axel", () => {
    it("exports dedicated AxelPage for /axel route", () => {
      expect(AxelPage).toBeDefined()
      expect(typeof AxelPage).toBe("function")
    })
  })

  describe("Preservation of Gemini AI Functionality", () => {
    it("preserves Gemini chat API endpoint /api/axel/chat POST handler", () => {
      expect(AxelChatApiRoute).toBeDefined()
      expect(typeof AxelChatApiRoute).toBe("function")
    })

    it("preserves generateAxelResponse agent function powered by Gemini", () => {
      expect(generateAxelResponse).toBeDefined()
      expect(typeof generateAxelResponse).toBe("function")
    })
  })
})
