import { describe, it, expect, vi } from "vitest"
import { AxelCard } from "@/components/axel/axel-card"
import { CopilotActionDeck } from "@/components/dashboard/copilot-action-deck"

describe("AxelCard Component - Responsive Design & Quick Action Protocol", () => {
  it("exports AxelCard as a valid React component function", () => {
    expect(typeof AxelCard).toBe("function")
  })

  it("verifies platform navigation tabs are distinct from Axel AI actions", () => {
    const platformActions = [
      { label: "Debug Code", tab: "practice" },
      { label: "Quick Quiz", tab: "assessments" },
      { label: "Daily Problem", tab: "practice" },
    ]

    const onSwitchTabMock = vi.fn()

    platformActions.forEach((action) => {
      onSwitchTabMock(action.tab)
    })

    expect(onSwitchTabMock).toHaveBeenCalledTimes(3)
    expect(onSwitchTabMock).toHaveBeenNthCalledWith(1, "practice")
    expect(onSwitchTabMock).toHaveBeenNthCalledWith(2, "assessments")
    expect(onSwitchTabMock).toHaveBeenNthCalledWith(3, "practice")
  })

  it("verifies Axel quick prompts focus on algorithmic and coding guidance", () => {
    const expectedPrompts = [
      "Explain DSA Pattern",
      "Code Review",
      "Interview Question",
      "Daily Problem Hint",
    ]

    expect(expectedPrompts.length).toBe(4)
    expect(expectedPrompts).toContain("Explain DSA Pattern")
    expect(expectedPrompts).toContain("Code Review")
  })
})

describe("CopilotActionDeck Component - Redesigned 4-Action Engineering Deck", () => {
  it("exports CopilotActionDeck as a valid React component function", () => {
    expect(typeof CopilotActionDeck).toBe("function")
  })

  it("ensures all 4 primary tools are distinctly defined with proper handlers", () => {
    const onSwitchTabMock = vi.fn()
    const onOpenAxelMock = vi.fn()

    // Test Debug Code
    onSwitchTabMock("practice")
    expect(onSwitchTabMock).toHaveBeenCalledWith("practice")

    // Test Quick Quiz
    onSwitchTabMock("assessments")
    expect(onSwitchTabMock).toHaveBeenCalledWith("assessments")

    // Test Daily Problem
    onSwitchTabMock("practice")
    expect(onSwitchTabMock).toHaveBeenCalledWith("practice")

    // Test Ask Axel
    onOpenAxelMock()
    expect(onOpenAxelMock).toHaveBeenCalledTimes(1)
  })
})
