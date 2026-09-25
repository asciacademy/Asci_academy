import { describe, it, expect } from "vitest"
import { BrandIcon } from "@/components/ui/brand-icon"

describe("BrandIcon Component", () => {
  it("exports BrandIcon as a valid React component function", () => {
    expect(typeof BrandIcon).toBe("function")
  })

  it("handles known and unknown icon names without crashing", () => {
    const knownNames = [
      "python", "javascript", "typescript", "react", "nodejs",
      "docker", "aws", "google", "microsoft", "asci", "algorithm",
      "zerodha", "razorpay", "go", "rust", "cpp"
    ]

    for (const name of knownNames) {
      const element = BrandIcon({ name, size: 24 })
      expect(element).toBeDefined()
      expect(element.type).toBe("svg")
      expect(element.props.width).toBe(24)
      expect(element.props.height).toBe(24)
    }

    // Fallback for unknown brand
    const fallback = BrandIcon({ name: "unknown-stack" as any, size: 20 })
    expect(fallback).toBeDefined()
    expect(fallback.type).toBe("svg")
  })
})
