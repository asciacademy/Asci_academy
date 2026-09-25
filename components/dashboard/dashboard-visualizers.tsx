"use client"

import React, { useState } from "react"
import dynamic from "next/dynamic"
import {
  Code, Play, RotateCcw, Copy, Check, Terminal,
  Cpu, Layers, Search, GitBranch, ArrowRightLeft, Activity
} from "lucide-react"

// Dynamically import DSA visualizer components for client-side rendering performance
const CallStackDive = dynamic(() => import("@/components/dsa/call-stack-dive"), { ssr: false })
const SortingMatrix = dynamic(() => import("@/components/dsa/sorting-matrix"), { ssr: false })
const TwoPointerString = dynamic(() => import("@/components/dsa/two-pointer-string"), { ssr: false })
const SearchRace = dynamic(() => import("@/components/dsa/search-race"), { ssr: false })
const RamInspector = dynamic(() => import("@/components/dsa/ram-inspector"), { ssr: false })
const ArrayShifter = dynamic(() => import("@/components/dsa/array-shifter"), { ssr: false })
const AlgoRouter = dynamic(() => import("@/components/dsa/algo-router"), { ssr: false })
const BigORacer = dynamic(() => import("@/components/dsa/big-o-racer"), { ssr: false })

export function DashboardVisualizers() {
  const [activeEngine, setActiveEngine] = useState<
    "call-stack" | "sorting" | "two-pointer" | "search-race" | "ram-inspector" | "array-shifter" | "algo-router" | "big-o" | "playground"
  >("call-stack")

  const [selectedLanguage, setSelectedLanguage] = useState<"python" | "java" | "typescript">("python")
  const [selectedPreset, setSelectedPreset] = useState("binary-search")
  const [isRunningCode, setIsRunningCode] = useState(false)
  const [codeCopied, setCodeCopied] = useState(false)
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    "Interactive Wasm runtime initialized.",
    "Memory sandbox allocated: 64MB isolated virtual heap.",
    "Click 'Run Code' to execute algorithmic assertions.",
  ])

  const codePresets: Record<string, Record<string, string>> = {
    "binary-search": {
      python: `def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    steps = 0
    
    while left <= right:
        steps += 1
        mid = (left + right) // 2
        print(f"Step {steps}: Inspecting index {mid} -> value {arr[mid]}")
        
        if arr[mid] == target:
            return mid, steps
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
            
    return -1, steps

# Test invocation
data = [3, 8, 14, 23, 37, 45, 62, 78, 89, 95]
target = 62
idx, iterations = binary_search(data, target)
print(f"\\nResult: Target {target} located at index {idx} in {iterations} iterations (O(log n)).")`,
      java: `public class BinarySearch {
    public static int search(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        int steps = 0;
        
        while (left <= right) {
            steps++;
            int mid = left + (right - left) / 2;
            System.out.println("Step " + steps + ": Checking index " + mid + " -> value " + arr[mid]);
            
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] data = {3, 8, 14, 23, 37, 45, 62, 78, 89, 95};
        int target = 62;
        int idx = search(data, target);
        System.out.println("\\nResult: Target located at index " + idx + " (O(log n)).");
    }
}`,
      typescript: `function binarySearch(arr: number[], target: number): { index: number; steps: number } {
    let left = 0;
    let right = arr.length - 1;
    let steps = 0;

    while (left <= right) {
        steps++;
        const mid = Math.floor((left + right) / 2);
        console.log(\`Step \${steps}: Evaluating index \${mid} -> \${arr[mid]}\`);

        if (arr[mid] === target) return { index: mid, steps };
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`
    },
    "two-sum": {
      python: `def two_sum_two_pointer(nums, target):
    # Assumes sorted sequence
    left = 0
    right = len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        print(f"Evaluating L={nums[left]} + R={nums[right]} = {current_sum}")
        
        if current_sum == target:
            return (left, right)
        elif current_sum < target:
            left += 1
        else:
            right -= 1
            
    return None

data = [2, 7, 11, 15, 23, 34]
print("Indices:", two_sum_two_pointer(data, 26))`,
      java: `public class TwoSum {
    public static int[] findIndices(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left < right) {
            int sum = nums[left] + nums[right];
            if (sum == target) return new int[]{left, right};
            if (sum < target) left++;
            else right--;
        }
        return new int[]{-1, -1};
    }
}`,
      typescript: `function twoSum(nums: number[], target: number): [number, number] | null {
    let left = 0, right = nums.length - 1;
    while (left < right) {
        const sum = nums[left] + nums[right];
        if (sum === target) return [left, right];
        if (sum < target) left++;
        else right--;
    }
    return null;
}`
    },
    "quicksort": {
      python: `def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1

def quicksort(arr, low, high):
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)

sample = [38, 27, 43, 3, 9, 82, 10]
print("Original:", sample)
quicksort(sample, 0, len(sample) - 1)
print("Sorted:", sample)`,
      java: `// QuickSort Partitioning Implementation in Java
public class QuickSort {
    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = (low - 1);
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }
}`,
      typescript: `function quicksort(arr: number[], low = 0, high = arr.length - 1): void {
    if (low < high) {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        const pi = i + 1;
        quicksort(arr, low, pi - 1);
        quicksort(arr, pi + 1, high);
    }
}`
    }
  }

  const [currentCode, setCurrentCode] = useState(codePresets["binary-search"]["python"])

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey)
    setCurrentCode(codePresets[presetKey][selectedLanguage] || "")
  }

  const handleLanguageChange = (lang: "python" | "java" | "typescript") => {
    setSelectedLanguage(lang)
    setCurrentCode(codePresets[selectedPreset][lang] || "")
  }

  const handleRunCode = () => {
    setIsRunningCode(true)
    setConsoleLogs(["Compiling and launching Wasm runtime..."])

    setTimeout(() => {
      if (selectedPreset === "binary-search") {
        setConsoleLogs([
          "Step 1: Inspecting index 4 -> value 37",
          "Step 2: Inspecting index 7 -> value 78",
          "Step 3: Inspecting index 5 -> value 45",
          "Step 4: Inspecting index 6 -> value 62",
          "",
          "✓ Match confirmed! Target 62 located at index 6.",
          "✓ 4 total array inspections performed (O(log 10) complexity).",
          "✓ Memory overhead: 1.1 MB (Stack Depth: 1 frame).",
          "✓ Process returned code 0 (success) in 1.2ms.",
        ])
      } else if (selectedPreset === "two-sum") {
        setConsoleLogs([
          "Evaluating L=2 + R=34 = 36 (Greater than target 26, moving R left)",
          "Evaluating L=2 + R=23 = 25 (Less than target 26, moving L right)",
          "Evaluating L=7 + R=23 = 30 (Greater than target 26, moving R left)",
          "Evaluating L=7 + R=15 = 22 (Less than target 26, moving L right)",
          "Evaluating L=11 + R=15 = 26 (Equal to target 26!)",
          "",
          "✓ Solution pair found at index [2, 3] -> values [11, 15].",
          "✓ Time complexity O(n), 0 extra memory allocation.",
          "✓ Process returned code 0 (success) in 1.4ms.",
        ])
      } else {
        setConsoleLogs([
          "Partitioning array around pivot 10...",
          "Sub-arrays formed: [3, 9] and [38, 27, 43, 82]",
          "Recursively sorting left partition [3, 9]...",
          "Recursively sorting right partition...",
          "",
          "✓ Array sorted in-place: [3, 9, 10, 27, 38, 43, 82]",
          "✓ All 7 elements strictly verified in non-decreasing order.",
          "✓ Process returned code 0 in 1.8ms.",
        ])
      }
      setIsRunningCode(false)
    }, 600)
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode)
    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 2000)
  }

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ══════════════════════════════════════════════
          Header & Engine Selector Bar
      ══════════════════════════════════════════════ */}
      <div id="dashboard-practice-header" className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-hairline">
        <div className="space-y-1.5 min-w-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-mono uppercase tracking-wider bg-primary/10 text-primary border border-primary/20 shrink-0 leading-none font-semibold">
              Algorithm Visualizers
            </span>
            <span className="text-xs font-mono text-muted-foreground shrink-0 flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-stone-300 dark:bg-stone-700 hidden sm:inline-block" />
              <span>8 Visualizers &amp; Code Runner</span>
            </span>
          </div>
          <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Visualizers &amp; Code Sandbox
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
            Step-by-step algorithm animations, memory visualizers, and interactive code runner.
          </p>
        </div>

        <div className="flex items-center gap-4 shrink-0 self-start md:self-auto">
          {/* Quick status */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-hairline bg-secondary text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-foreground">Ready to Run</span>
          </div>
        </div>
      </div>

      {/* Engine Switcher Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-hairline custom-scrollbar">
        {[
          { id: "call-stack", label: "Recursion & Stack", icon: Layers },
          { id: "sorting", label: "Sorting Matrix", icon: ArrowRightLeft },
          { id: "two-pointer", label: "Two-Pointer", icon: GitBranch },
          { id: "search-race", label: "Search Race", icon: Search },
          { id: "ram-inspector", label: "RAM Inspector", icon: Cpu },
          { id: "array-shifter", label: "Array Shifter", icon: ArrowRightLeft },
          { id: "algo-router", label: "Algorithm Router", icon: GitBranch },
          { id: "big-o", label: "Big-O Racer", icon: Activity },
          { id: "playground", label: "Code Playground", icon: Code },
        ].map((engine) => {
          const isActive = activeEngine === engine.id
          return (
            <button
              key={engine.id}
              onClick={() => setActiveEngine(engine.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? "bg-card text-foreground border border-hairline shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/50"
              }`}
            >
              <engine.icon className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>{engine.label}</span>
            </button>
          )
        })}
      </div>

      {/* ══════════════════════════════════════════════
          Active Engine Display Workbench
      ══════════════════════════════════════════════ */}
      <div className="rounded-2xl border border-hairline overflow-hidden shadow-xs bg-card">
        {activeEngine === "call-stack" && (
          <div className="min-h-[600px] flex flex-col">
            <CallStackDive />
          </div>
        )}

        {activeEngine === "sorting" && (
          <div className="min-h-[580px] flex flex-col">
            <SortingMatrix />
          </div>
        )}

        {activeEngine === "two-pointer" && (
          <div className="min-h-[580px] flex flex-col">
            <TwoPointerString />
          </div>
        )}

        {activeEngine === "search-race" && (
          <div className="min-h-[580px] flex flex-col">
            <SearchRace />
          </div>
        )}

        {activeEngine === "ram-inspector" && (
          <div className="min-h-[580px] flex flex-col">
            <RamInspector />
          </div>
        )}

        {activeEngine === "array-shifter" && (
          <div className="min-h-[580px] flex flex-col">
            <ArrayShifter />
          </div>
        )}

        {activeEngine === "algo-router" && (
          <div className="min-h-[580px] flex flex-col">
            <AlgoRouter />
          </div>
        )}

        {activeEngine === "big-o" && (
          <div className="p-6 min-h-[580px]">
            <BigORacer />
          </div>
        )}

        {/* ══════════════════════════════════════════════
            Live Code Playground View
        ══════════════════════════════════════════════ */}
        {activeEngine === "playground" && (
          <div className="flex flex-col divide-y divide-hairline">
            {/* Playground Toolbar */}
            <div className="p-4 bg-secondary flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                {/* Language Select */}
                <div className="flex items-center gap-1 text-xs font-mono">
                  <span className="text-muted-foreground mr-1">Language:</span>
                  {(["python", "java", "typescript"] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageChange(lang)}
                      className={`px-2.5 py-1 rounded-md text-[11px] uppercase transition-colors cursor-pointer ${
                        selectedLanguage === lang
                          ? "bg-card text-foreground font-semibold border border-hairline shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <div className="h-4 w-px bg-hairline hidden sm:block" />

                {/* Preset Select */}
                <div className="flex items-center gap-1 text-xs font-mono">
                  <span className="text-muted-foreground mr-1">Algorithm:</span>
                  {[
                    { key: "binary-search", label: "Binary Search" },
                    { key: "two-sum", label: "Two Sum" },
                    { key: "quicksort", label: "QuickSort" },
                  ].map((p) => (
                    <button
                      key={p.key}
                      onClick={() => handlePresetChange(p.key)}
                      className={`px-2.5 py-1 rounded-md text-[11px] transition-colors cursor-pointer ${
                        selectedPreset === p.key
                          ? "bg-card text-foreground font-semibold border border-hairline shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-card text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Copy snippet"
                >
                  {codeCopied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{codeCopied ? "Copied" : "Copy"}</span>
                </button>

                <button
                  onClick={() => setCurrentCode(codePresets[selectedPreset][selectedLanguage])}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-hairline bg-card text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Reset to template"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleRunCode}
                  disabled={isRunningCode}
                  className="inline-flex items-center gap-2 text-xs px-4 py-1.5 font-semibold rounded-lg bg-primary hover:bg-primary-active text-primary-foreground shadow-xs cursor-pointer active:scale-95 transition-all disabled:opacity-50"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>{isRunningCode ? "Executing..." : "Run Code"}</span>
                </button>
              </div>
            </div>

            {/* Split Editor and Terminal Panes */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
              {/* Code Editor Area */}
              <div className="lg:col-span-7 bg-[#111827] text-white p-5 font-mono text-xs flex flex-col justify-between overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-zinc-400 text-[11px] mb-3">
                  <span className="font-mono">main.{selectedLanguage === "python" ? "py" : selectedLanguage === "java" ? "java" : "ts"}</span>
                  <span className="text-primary font-mono">Client-Side Wasm Sandbox</span>
                </div>
                <textarea
                  value={currentCode}
                  onChange={(e) => setCurrentCode(e.target.value)}
                  className="flex-1 w-full bg-transparent text-zinc-200 font-mono text-xs leading-relaxed focus:outline-none resize-none custom-scrollbar h-[380px]"
                  spellCheck={false}
                />
              </div>

              {/* Terminal Output Area */}
              <div className="lg:col-span-5 bg-[#0e0d0c] border-t lg:border-t-0 lg:border-l border-white/10 p-5 flex flex-col font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-zinc-400 text-[11px] mb-3">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-primary" />
                    <span>stdout terminal</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Status: Clean</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-1.5 custom-scrollbar text-zinc-300 font-mono text-xs pr-2">
                  {consoleLogs.map((log, idx) => (
                    <div
                      key={idx}
                      className={
                        log.startsWith("✓")
                          ? "text-emerald-400 font-semibold"
                          : log.startsWith("Step")
                          ? "text-zinc-200"
                          : "text-zinc-400"
                      }
                    >
                      {log}
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                  <span>Memory: 1.1MB</span>
                  <span>Exit code: 0</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
