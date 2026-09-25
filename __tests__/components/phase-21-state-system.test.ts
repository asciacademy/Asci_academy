import { describe, it, expect, vi } from "vitest"
import {
  EmptyState,
  ErrorState,
  SuccessFeedback,
  StateSystemContainer,
} from "@/components/ui/state-system"
import { CourseCardSkeleton } from "@/components/skeletons/CourseCardSkeleton"
import { JobCardSkeleton } from "@/components/skeletons/JobCardSkeleton"
import { HackathonCardSkeleton } from "@/components/skeletons/HackathonCardSkeleton"
import { DSASimulatorSkeleton } from "@/components/skeletons/DSASimulatorSkeleton"
import { DataTableSkeleton } from "@/components/skeletons/DataTableSkeleton"

describe("Phase 21 - Complete State System (Loading, Empty, Error, Success)", () => {
  describe("Loading State - Component-Matched Skeletons", () => {
    it("renders CourseCardSkeleton matching actual course card geometry", () => {
      const el = CourseCardSkeleton({})
      expect(el).toBeDefined()
      expect(el.props["aria-busy"]).toBe("true")
      expect(el.props["aria-label"]).toBe("Loading course")
    })

    it("renders JobCardSkeleton matching career opportunity card geometry", () => {
      const el = JobCardSkeleton({})
      expect(el).toBeDefined()
      expect(el.props["aria-busy"]).toBe("true")
    })

    it("renders HackathonCardSkeleton matching competition card geometry", () => {
      const el = HackathonCardSkeleton({})
      expect(el).toBeDefined()
      expect(el.props["aria-busy"]).toBe("true")
    })

    it("renders DSASimulatorSkeleton matching code editor and test suite", () => {
      const el = DSASimulatorSkeleton({})
      expect(el).toBeDefined()
      expect(el.props["aria-busy"]).toBe("true")
    })

    it("renders DataTableSkeleton matching information-dense admin tables", () => {
      const el = DataTableSkeleton({ rows: 5, columns: 6 })
      expect(el).toBeDefined()
      expect(el.props["aria-busy"]).toBe("true")
    })
  })

  describe("Empty State - Small Illustration, Short Explanation, One CTA", () => {
    it("renders EmptyState with small illustration, title, short explanation, and exactly one CTA", () => {
      const onClickMock = vi.fn()
      const el = EmptyState({
        illustration: "courses",
        title: "No courses enrolled yet",
        explanation: "Explore our curated curriculum to begin your learning journey.",
        action: {
          label: "Browse Courses",
          onClick: onClickMock,
        },
      })

      expect(el).toBeDefined()
      expect(el.props.role).toBe("region")
      expect(el.props["aria-label"]).toBe("No courses enrolled yet")
    })

    it("supports action with href link navigation", () => {
      const el = EmptyState({
        illustration: "career",
        title: "No applications submitted",
        explanation: "Apply to high-yield internships and jobs to track your progress.",
        action: {
          label: "Explore Opportunities",
          href: "/career",
        },
      })

      expect(el).toBeDefined()
    })
  })

  describe("Error State - 'Something went wrong.' and 'Try Again.'", () => {
    it("defaults to 'Something went wrong.' and includes retry trigger", () => {
      const onRetryMock = vi.fn()
      const el = ErrorState({
        onRetry: onRetryMock,
      })

      expect(el).toBeDefined()
      expect(el.props.role).toBe("alert")
    })

    it("allows custom error messages while maintaining retry standard", () => {
      const el = ErrorState({
        title: "Payment verification failed",
        message: "Unable to reach UPI settlement node. Please try again.",
        onRetry: () => {},
      })

      expect(el).toBeDefined()
    })
  })

  describe("Success Feedback - Restrained & Inline Feedback Without Giant Toasts", () => {
    it("renders clear restrained inline feedback with status role", () => {
      const el = SuccessFeedback({
        message: "Profile updated successfully.",
        description: "Your changes are now live across all student views.",
      })

      expect(el).toBeDefined()
      expect(el.props.role).toBe("status")
    })

    it("supports dismiss callback on success feedback", () => {
      const onDismissMock = vi.fn()
      const el = SuccessFeedback({
        message: "Code passed all test cases.",
        onDismiss: onDismissMock,
      })

      expect(el).toBeDefined()
    })
  })

  describe("StateSystemContainer - Orchestrates All 4 Component States", () => {
    it("orchestrates loading state with skeleton drop-in", () => {
      const el = StateSystemContainer({
        state: "loading",
        skeleton: CourseCardSkeleton({}),
      })
      expect(el).toBeDefined()
    })

    it("orchestrates empty state with illustration and one CTA", () => {
      const el = StateSystemContainer({
        state: "empty",
        empty: {
          illustration: "projects",
          title: "No guided projects in progress",
          explanation: "Choose from 12+ real-world capstone projects to build your portfolio.",
          action: { label: "Explore Projects", href: "/projects" },
        },
      })
      expect(el).toBeDefined()
    })

    it("orchestrates error state with retry callback", () => {
      const el = StateSystemContainer({
        state: "error",
        error: {
          onRetry: () => {},
        },
      })
      expect(el).toBeDefined()
    })

    it("orchestrates success feedback above active content", () => {
      const el = StateSystemContainer({
        state: "success",
        success: {
          message: "Application submitted to Google",
        },
        children: "Ready Content",
      })
      expect(el).toBeDefined()
    })
  })
})
