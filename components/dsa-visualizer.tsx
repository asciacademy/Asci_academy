"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { gsap } from "gsap"
import { useScrollReveal } from "@/hooks/use-gsap"
import { Play, RotateCcw, Braces, ArrowRight } from "lucide-react"

const algorithms = [
  { label: "Bubble Sort", id: "bubble" },
  { label: "Quick Sort", id: "quick" },
  { label: "Merge Sort", id: "merge" },
  { label: "Selection Sort", id: "selection" },
  { label: "Insertion Sort", id: "insertion" },
]

function generateArray(size: number): number[] {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 80) + 15)
}

export function DSAVisualizer() {
  const headerRef = useScrollReveal<HTMLDivElement>({ y: 30, duration: 0.7 })
  const vizRef = useRef<HTMLDivElement>(null)
  const [array, setArray] = useState(() => generateArray(24))
  const [sorting, setSorting] = useState(false)
  const [activeAlgo, setActiveAlgo] = useState("bubble")
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set())
  const [sortedIndices, setSortedIndices] = useState<Set<number>>(new Set())
  const [customInput, setCustomInput] = useState("")
  const cancelRef = useRef(false)

  const reset = useCallback(() => {
    cancelRef.current = true
    setTimeout(() => {
      cancelRef.current = false
      setSorting(false)
      setActiveIndices(new Set())
      setSortedIndices(new Set())
      setArray(generateArray(24))
      setCustomInput("")
    }, 50)
  }, [])

  const applyCustomArray = useCallback(() => {
    if (sorting) return
    const parsed = customInput
      .split(/[\s,]+/)
      .map((s) => parseInt(s.trim(), 10))
      .filter((n) => !isNaN(n) && n > 0)

    if (parsed.length > 0) {
      const max = Math.max(...parsed)
      const min = Math.min(...parsed)
      const range = max === min ? 1 : max - min

      const displayArray = parsed.map((val) =>
        Math.floor(((val - min) / range) * 80) + 15
      )

      setArray(displayArray)
      setSortedIndices(new Set())
      setActiveIndices(new Set())
    } else {
      reset()
    }
  }, [customInput, sorting, reset])

  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

  const bubbleSort = useCallback(async () => {
    const arr = [...array]
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (cancelRef.current) return
        setActiveIndices(new Set([j, j + 1]))
        await sleep(40)
        if (arr[j] > arr[j + 1]) {
          ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
        }
      }
      setSortedIndices((prev) => new Set([...prev, arr.length - 1 - i]))
    }
    setSortedIndices(new Set(arr.map((_, i) => i)))
    setActiveIndices(new Set())
  }, [array])

  const selectionSort = useCallback(async () => {
    const arr = [...array]
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i
      for (let j = i + 1; j < arr.length; j++) {
        if (cancelRef.current) return
        setActiveIndices(new Set([minIdx, j]))
        await sleep(40)
        if (arr[j] < arr[minIdx]) minIdx = j
      }
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      setArray([...arr])
      setSortedIndices((prev) => new Set([...prev, i]))
    }
    setSortedIndices(new Set(arr.map((_, i) => i)))
    setActiveIndices(new Set())
  }, [array])

  const quickSort = useCallback(async () => {
    const arr = [...array]
    const sort = async (low: number, high: number) => {
      if (low >= high || cancelRef.current) return
      const pivot = arr[high]
      let i = low - 1
      for (let j = low; j < high; j++) {
        if (cancelRef.current) return
        setActiveIndices(new Set([j, high]))
        await sleep(50)
        if (arr[j] < pivot) {
          i++
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          setArray([...arr])
        }
      }
      ;[arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]
      setArray([...arr])
      setSortedIndices((prev) => new Set([...prev, i + 1]))
      await sort(low, i)
      await sort(i + 2, high)
    }
    await sort(0, arr.length - 1)
    setSortedIndices(new Set(arr.map((_, i) => i)))
    setActiveIndices(new Set())
  }, [array])

  const mergeSort = useCallback(async () => {
    const arr = [...array]
    const sort = async (start: number, end: number) => {
      if (start >= end || cancelRef.current) return
      const mid = Math.floor((start + end) / 2)
      await sort(start, mid)
      await sort(mid + 1, end)
      const left = arr.slice(start, mid + 1)
      const right = arr.slice(mid + 1, end + 1)
      let i = 0,
        j = 0,
        k = start
      while (i < left.length && j < right.length) {
        if (cancelRef.current) return
        setActiveIndices(new Set([k]))
        await sleep(40)
        arr[k++] = left[i] <= right[j] ? left[i++] : right[j++]
        setArray([...arr])
      }
      while (i < left.length) {
        arr[k++] = left[i++]
        setArray([...arr])
      }
      while (j < right.length) {
        arr[k++] = right[j++]
        setArray([...arr])
      }
    }
    await sort(0, arr.length - 1)
    setSortedIndices(new Set(arr.map((_, i) => i)))
    setActiveIndices(new Set())
  }, [array])

  const insertionSort = useCallback(async () => {
    const arr = [...array]
    for (let i = 1; i < arr.length; i++) {
      if (cancelRef.current) return
      let key = arr[i]
      let j = i - 1

      setActiveIndices(new Set([i]))
      await sleep(40)

      while (j >= 0 && arr[j] > key) {
        if (cancelRef.current) return
        setActiveIndices(new Set([j, j + 1]))
        await sleep(40)

        arr[j + 1] = arr[j]
        j = j - 1
        setArray([...arr])
      }
      arr[j + 1] = key
      setArray([...arr])
      setSortedIndices((prev) => new Set([...prev, i]))
    }
    setSortedIndices(new Set(arr.map((_, i) => i)))
    setActiveIndices(new Set())
  }, [array])

  const runSort = useCallback(async () => {
    if (sorting) return
    setSorting(true)
    setSortedIndices(new Set())
    cancelRef.current = false

    switch (activeAlgo) {
      case "bubble":
        await bubbleSort()
        break
      case "selection":
        await selectionSort()
        break
      case "quick":
        await quickSort()
        break
      case "merge":
        await mergeSort()
        break
      case "insertion":
        await insertionSort()
        break
    }
    setSorting(false)
  }, [activeAlgo, bubbleSort, selectionSort, quickSort, mergeSort, insertionSort, sorting])

  useEffect(() => {
    if (!vizRef.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        vizRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: vizRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="dsa-visualizer" className="relative py-20 lg:py-28 bg-background">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Header */}
        {/* Header with Dedicated Axel Stage */}
        <div ref={headerRef} className="relative mb-12 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-primary font-medium mb-3">
              <Braces className="h-3.5 w-3.5" />
              <span>Interactive Tool</span>
            </div>
            <h2
              className="font-serif text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl"
              style={{ letterSpacing: "-1px" }}
            >
              Watch How Algorithms Work
            </h2>
            <p className="mt-3 max-w-xl text-sm sm:text-base text-body leading-relaxed">
              See how sorting works in real time. Choose an algorithm, enter numbers if you like, and watch how items are compared and sorted step-by-step.
            </p>
          </div>

          {/* Dedicated Axel Stage: Reserved layout space so nothing overlays */}
          <div className="hidden lg:flex relative shrink-0 w-64 h-56 items-center justify-center self-center lg:self-auto">
            <div
              id="visualizer-robot-anchor"
              className="w-full h-full relative flex items-center justify-center pointer-events-none select-none"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Product Mockup Card — Warm Cream Surface */}
        <div
          ref={vizRef}
          className="relative overflow-hidden rounded-xl border border-hairline bg-card text-foreground shadow-sm"
        >
          {/* Top Controls Bar */}
          <div
            className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline px-5 py-4 bg-secondary/70"
            suppressHydrationWarning
          >
            {/* Algorithm selection tabs */}
            <div className="flex flex-wrap gap-1.5" suppressHydrationWarning>
              {algorithms.map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => {
                    if (!sorting) setActiveAlgo(algo.id)
                  }}
                  disabled={sorting}
                  suppressHydrationWarning
                  className={`rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                    activeAlgo === algo.id
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "bg-background text-body hover:text-foreground hover:bg-card border border-hairline/60 disabled:opacity-50"
                  }`}
                >
                  {algo.label}
                </button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2" suppressHydrationWarning>
              <button
                onClick={reset}
                suppressHydrationWarning
                className="flex items-center gap-1.5 rounded-md border border-hairline bg-background px-3.5 py-1.5 text-xs font-medium text-body transition-colors hover:text-foreground hover:bg-card cursor-pointer"
                aria-label="Reset"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
              <button
                onClick={runSort}
                disabled={sorting}
                suppressHydrationWarning
                className="btn-primary inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                {sorting ? "Sorting..." : "Start Sorting"}
              </button>
            </div>
          </div>

          {/* Custom Array Input Strip */}
          <div
            className="flex items-center gap-3 border-b border-hairline bg-background px-5 py-2.5"
            suppressHydrationWarning
          >
            <span className="text-xs font-medium text-muted-foreground hidden sm:inline">Input Values:</span>
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              disabled={sorting}
              placeholder="Enter comma-separated numbers (e.g. 45, 12, 88, 32, 19, 74)"
              className="flex-1 rounded-md bg-card border border-hairline px-3.5 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary disabled:opacity-50 font-mono"
            />
            <button
              onClick={applyCustomArray}
              disabled={sorting || !customInput.trim()}
              className="rounded-md px-3 py-1.5 bg-secondary border border-hairline text-xs font-medium text-foreground hover:bg-card transition-colors disabled:opacity-40 cursor-pointer"
            >
              Apply
            </button>
          </div>

          {/* Visualization Bars Area */}
          <div
            className="flex items-end justify-center gap-1 sm:gap-1.5 px-6 py-12 bg-background border-b border-hairline/60"
            style={{ height: "280px" }}
          >
            {array.map((val, i) => {
              const isActive = activeIndices.has(i)
              const isSorted = sortedIndices.has(i)
              return (
                <div
                  key={i}
                  className={`flex-1 rounded-t-sm transition-all duration-100 ${
                    isActive
                      ? "bg-amber-600 dark:bg-amber-500"
                      : isSorted
                      ? "bg-primary"
                      : "bg-muted-foreground/25"
                  }`}
                  style={{
                    height: `${val}%`,
                  }}
                />
              )
            })}
          </div>

          {/* Footer Bar */}
          <div className="flex items-center justify-between border-t border-hairline bg-secondary/50 px-5 py-3.5 text-xs text-muted-foreground">
            <span>
              {algorithms.find((a) => a.id === activeAlgo)?.label} &bull; {array.length} numbers
            </span>
            <a
              href="#courses"
              className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-active transition-colors"
            >
              <span>Explore Coding Courses</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
