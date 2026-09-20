import { describe, it, expect } from "vitest"
import { executeFallbackPython } from "@/hooks/use-python"

describe("Python Execution Sandbox - Core Syntax & Standard Library", () => {
  it("executes user prompt code: phases list and len(phases)", () => {
    const code = `phases = ["ASK", "PREPARE", "PROCESS", "ANALYZE", "SHARE", "ACT"]\nprint(len(phases))`
    const result = executeFallbackPython(code)
    expect(result.error).toBeUndefined()
    expect(result.output.trim()).toBe("6")
  })

  it("executes f-strings with len expression correctly", () => {
    const code = `phases = ["ASK", "PREPARE", "PROCESS", "ANALYZE", "SHARE", "ACT"]\nprint(f"TOTAL_PHASES:{len(phases)}")`
    const result = executeFallbackPython(code)
    expect(result.error).toBeUndefined()
    expect(result.output.trim()).toBe("TOTAL_PHASES:6")
  })

  it("executes loop and arithmetic accumulator without undeclared variable errors", () => {
    const code = `
total = 0
for i in range(5):
    total += i
print(total)
`
    const result = executeFallbackPython(code)
    expect(result.error).toBeUndefined()
    expect(result.output.trim()).toBe("10")
  })

  it("executes multiple print arguments and string concatenation", () => {
    const code = `
name = "Alex"
score = 100
print("User", name, "scored", score)
`
    const result = executeFallbackPython(code)
    expect(result.error).toBeUndefined()
    expect(result.output.trim()).toBe("User Alex scored 100")
  })

  it("supports list append and sum operations", () => {
    const code = `
nums = [10, 20, 30]
nums.append(40)
print(sum(nums))
`
    const result = executeFallbackPython(code)
    expect(result.error).toBeUndefined()
    expect(result.output.trim()).toBe("100")
  })
})
