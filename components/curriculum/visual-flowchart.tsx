"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal, Box, Layers, PlaySquare, ArrowRight, ArrowDown, Cpu, Database,
  CheckCircle2, AlertCircle, RefreshCw, Zap, ShieldCheck, Binary, Code2,
  HelpCircle, Eye, Network, GitBranch, HardDrive
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════════════════════
   1. JVM COMPILATION & EXECUTION PIPELINE (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function JvmPipelineFlowchart() {
  const [activeStage, setActiveStage] = useState(0)

  const stages = [
    {
      id: "source",
      title: "1. Java Source Code",
      file: "Main.java",
      badge: "Human Readable",
      icon: Code2,
      color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
      description: "Developers author human-readable source code conforming to Java Language Specification (JLS).",
      details: [
        "Plain-text Unicode UTF-16 source files (.java)",
        "Strict static type declarations and class definitions",
        "Object-oriented structure and method declarations"
      ],
      codeSnippet: `public class Main {\n    public static void main(String[] args) {\n        int sum = 40 + 2;\n        System.out.println("Result: " + sum);\n    }\n}`
    },
    {
      id: "compiler",
      title: "2. javac Compiler",
      file: "Compiler Engine",
      badge: "Syntax & Type Check",
      icon: Cpu,
      color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
      description: "The javac tool validates lexical syntax, performs type checking, builds the Abstract Syntax Tree (AST), and lowers logic into bytecode.",
      details: [
        "Lexical & Grammatical analysis",
        "Constant folding (e.g. 40 + 2 is folded into 42 at compile time)",
        "Definite assignment verification (ensures variables initialized before read)",
        "Generates intermediate bytecode instructions (.class file)"
      ],
      codeSnippet: `$ javac Main.java\n# Emits Main.class containing binary classfile headers\n# Magic Number: 0xCAFEBABE`
    },
    {
      id: "bytecode",
      title: "3. Bytecode Binary",
      file: "Main.class",
      badge: "Platform Neutral",
      icon: Binary,
      color: "text-purple-500 border-purple-500/30 bg-purple-500/10",
      description: "Platform-independent intermediate representation composed of compact 1-byte opcodes and constant pool tags.",
      details: [
        "Universal execution format: runs identically on Windows, Linux, macOS",
        "Includes constant pool: string literals, method references, field signatures",
        "Stack-based machine instructions (bipush, istore, invokevirtual)"
      ],
      codeSnippet: `// Disassembled via javap -c Main.class\n0: bipush 42\n2: istore_1\n3: getstatic #7 // System.out\n6: iload_1\n7: invokevirtual #13 // println:(I)V\n10: return`
    },
    {
      id: "classloader",
      title: "4. JVM ClassLoader",
      file: "Parent Delegation",
      badge: "Memory Loading",
      icon: Layers,
      color: "text-primary border-primary/30 bg-primary/10",
      description: "Loads class bytes into Metaspace. Verifies bytecode security, prepares static variables, and resolves symbolic links.",
      details: [
        "Loading: Bootstrap Loader -> Platform Loader -> Application Loader",
        "Linking: Bytecode verification (checks stack bounds and memory safety)",
        "Preparation: Allocates and zeroes static variables",
        "Initialization: Runs static initializers (<clinit> blocks)"
      ],
      codeSnippet: `Bootstrap ClassLoader (C++ Native Core)\n    └── Platform ClassLoader (JDK Tools)\n          └── Application ClassLoader (App Classpath)`
    },
    {
      id: "execution",
      title: "5. Execution Engine",
      file: "Interpreter + JIT",
      badge: "HotSpot Tiering",
      icon: Zap,
      color: "text-rose-500 border-rose-500/30 bg-rose-500/10",
      description: "Hybrid execution: Interpreter provides instant launch, while HotSpot JIT (C1/C2) compiles frequently executed loops directly into CPU assembly.",
      details: [
        "Interpreter: Executes bytecode opcodes sequentially line-by-line",
        "Profiler: Detects 'hot spots' (methods called >10,000 times)",
        "C1 Compiler: Quick compilation with basic optimization",
        "C2 Compiler: Aggressive optimization (method inlining, escape analysis, loop unrolling)"
      ],
      codeSnippet: `HotSpot Profiling Loop:\nBytecode ──> Interpreter (Fast startup)\n                 │\n          (Hot Spot Counter > threshold)\n                 ▼\n           JIT C2 Optimization ──> Native Assembly (Zero overhead)`
    },
    {
      id: "hardware",
      title: "6. Physical CPU & OS",
      file: "Machine Execution",
      badge: "Direct Hardware",
      icon: Terminal,
      color: "text-primary border-primary/30 bg-primary/10",
      description: "Native assembly code executes directly on bare-metal registers and L1/L2 caches with near C/C++ performance.",
      details: [
        "Executes directly on x86-64, ARM64, or RISC-V silicon registers",
        "Interacts with host OS kernel via POSIX syscalls",
        "Managed by Garbage Collector concurrent worker threads"
      ],
      codeSnippet: `mov eax, 42\nmov rdi, [System.out]\ncall PrintStream.println\nret`
    }
  ]

  const current = stages[activeStage]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Visual Systems Architecture
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            The JVM Compilation &amp; Execution Pipeline
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Step {activeStage + 1} of {stages.length}
        </span>
      </div>

      {/* Visual Pipeline Node Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
        {stages.map((stage, idx) => {
          const isSelected = activeStage === idx
          const isCompleted = activeStage > idx
          const Icon = stage.icon

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(idx)}
              className={cn(
                "flex flex-col items-center p-3 rounded-2xl border text-center transition-all cursor-pointer relative group",
                isSelected
                  ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/40"
                  : isCompleted
                  ? "border-primary/40 bg-primary/5 text-foreground"
                  : "border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              )}
            >
              <div
                className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center mb-2 transition-transform group-hover:scale-105",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-2xs"
                    : isCompleted
                    ? "bg-primary/20 text-primary"
                    : "bg-secondary text-muted-foreground"
                )}
              >
                <Icon size={16} />
              </div>
              <span className="text-[11px] font-semibold leading-snug line-clamp-1">
                {stage.title.split(".")[1]?.trim() || stage.title}
              </span>
              <span className="text-[9px] font-mono text-muted-foreground/80 mt-0.5 block truncate max-w-full">
                {stage.file}
              </span>

              {/* Progress Connector Indicator */}
              {idx < stages.length - 1 && (
                <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/40">
                  <ArrowRight size={12} />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Active Stage Detailed Breakdown */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.99 }}
          transition={{ duration: 0.15 }}
          className="rounded-2xl border border-border bg-secondary/20 p-5 sm:p-6 space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
            <div className="flex items-center gap-3">
              <span className={cn("px-2.5 py-0.5 rounded-full border text-xs font-mono font-semibold", current.color)}>
                {current.badge}
              </span>
              <h4 className="font-serif text-lg font-medium text-foreground">
                {current.title}
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                disabled={activeStage === 0}
                onClick={() => setActiveStage((p) => Math.max(0, p - 1))}
                className="px-3 py-1 rounded-lg border border-border text-xs font-mono text-muted-foreground hover:text-foreground disabled:opacity-30 cursor-pointer"
              >
                Prev
              </button>
              <button
                disabled={activeStage === stages.length - 1}
                onClick={() => setActiveStage((p) => Math.min(stages.length - 1, p + 1))}
                className="px-3 py-1 rounded-lg bg-primary text-primary-foreground text-xs font-mono font-semibold disabled:opacity-30 cursor-pointer"
              >
                Next Stage
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
            {current.description}
          </p>

          <div className="grid gap-4 lg:grid-cols-2 pt-1">
            {/* Architectural Mechanics */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block">
                Internal Invariants &amp; Mechanics:
              </span>
              <ul className="space-y-1.5 text-xs text-muted-foreground list-disc pl-4">
                {current.details.map((detail, dIdx) => (
                  <li key={dIdx} className="leading-relaxed">
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Stage Code / Data Representation */}
            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold block">
                Data Representation:
              </span>
              <div className="rounded-xl border border-border bg-[#181715] p-3.5 font-mono text-xs text-blue-400 overflow-x-auto shadow-inner leading-relaxed">
                <pre>{current.codeSnippet}</pre>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. STACK VS HEAP MEMORY ARCHITECTURE (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function MemoryModelFlowchart() {
  const [highlightedPointer, setHighlightedPointer] = useState<string | null>(null)

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-blue-500 font-semibold block">
            Visual Memory Layout
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Thread Call Stack vs. Garbage-Collected Heap
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Hover pointers to trace references
        </span>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Java separates memory into fast thread-private call stacks (storing primitive values and 64-bit object references) and a shared global Heap where all objects, arrays, and string pools reside under Garbage Collection supervision.
      </p>

      {/* Visual Memory Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left: Thread Call Stack */}
        <div className="rounded-2xl border border-blue-500/30 bg-blue-500/5 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-blue-500/20">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-500" />
              <span className="font-mono text-xs font-semibold text-foreground">
                THREAD CALL STACK (LIFO)
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              Thread-Private • Ultra Fast
            </span>
          </div>

          <div className="space-y-3">
            {/* Frame 2: Top of Stack (Current Method) */}
            <div className="rounded-xl border border-blue-500/40 bg-card p-4 space-y-2.5 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
                  Stack Frame: processOrder()
                </span>
                <span className="text-[10px] font-mono bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded-md">
                  Active Frame
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/50">
                  <span className="text-muted-foreground">int quantity = 3</span>
                  <span className="text-[10px] text-primary">Primitive (4 bytes)</span>
                </div>

                <div
                  onMouseEnter={() => setHighlightedPointer("0x7FFF")}
                  onMouseLeave={() => setHighlightedPointer(null)}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer",
                    highlightedPointer === "0x7FFF"
                      ? "border-primary bg-primary/20 text-primary font-bold shadow-xs"
                      : "border-border/60 bg-secondary/30 text-foreground hover:border-primary/40"
                  )}
                >
                  <span>Order* orderRef</span>
                  <span className="text-[10px] font-mono text-primary font-semibold flex items-center gap-1">
                    <span>Address 0x7FFF</span>
                    <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>

            {/* Frame 1: Caller Frame */}
            <div className="rounded-xl border border-border/80 bg-card/60 p-4 space-y-2.5 opacity-85">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-semibold text-foreground/80">
                  Stack Frame: main()
                </span>
                <span className="text-[10px] font-mono text-muted-foreground">
                  Caller Frame
                </span>
              </div>

              <div className="space-y-1.5 text-xs font-mono">
                <div className="flex items-center justify-between p-2 rounded-lg bg-secondary/40">
                  <span className="text-muted-foreground">boolean isAuth = true</span>
                  <span className="text-[10px] text-primary">Primitive (1 bit)</span>
                </div>

                <div
                  onMouseEnter={() => setHighlightedPointer("0x12AA")}
                  onMouseLeave={() => setHighlightedPointer(null)}
                  className={cn(
                    "flex items-center justify-between p-2 rounded-lg border transition-all cursor-pointer",
                    highlightedPointer === "0x12AA"
                      ? "border-purple-500 bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold"
                      : "border-border/60 bg-secondary/30 text-foreground hover:border-purple-500/40"
                  )}
                >
                  <span>Customer* custRef</span>
                  <span className="text-[10px] font-mono text-purple-500 font-semibold flex items-center gap-1">
                    <span>Address 0x12AA</span>
                    <ArrowRight size={10} />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Shared Garbage-Collected Heap */}
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-primary/20">
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-primary" />
              <span className="font-mono text-xs font-semibold text-foreground">
                SHARED HEAP STORAGE
              </span>
            </div>
            <span className="text-[10px] font-mono text-muted-foreground">
              Garbage Collected • Global Access
            </span>
          </div>

          <div className="space-y-3">
            {/* Heap Object 1: Order */}
            <div
              className={cn(
                "rounded-xl border p-4 space-y-2.5 transition-all",
                highlightedPointer === "0x7FFF"
                  ? "border-primary bg-primary/15 shadow-md scale-[1.01]"
                  : "border-border/80 bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-foreground">
                    Order Object
                  </span>
                  <span className="text-[10px] font-mono text-primary bg-primary/10 px-2 py-0.5 rounded">
                    0x7FFF
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">24 Bytes</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-secondary/50">
                  <span className="text-[10px] text-muted-foreground block">Mark Word (64-bit)</span>
                  <span className="text-foreground">Lock State / HashCode</span>
                </div>
                <div className="p-2 rounded bg-secondary/50">
                  <span className="text-[10px] text-muted-foreground block">Klass Pointer</span>
                  <span className="text-foreground">&rarr; Order.class</span>
                </div>
                <div className="p-2 rounded bg-secondary/50 col-span-2">
                  <span className="text-[10px] text-muted-foreground block">Fields</span>
                  <span className="text-foreground">double total = 199.99;</span>
                </div>
              </div>
            </div>

            {/* Heap Object 2: Customer */}
            <div
              className={cn(
                "rounded-xl border p-4 space-y-2.5 transition-all",
                highlightedPointer === "0x12AA"
                  ? "border-purple-500 bg-purple-500/15 shadow-md scale-[1.01]"
                  : "border-border/80 bg-card"
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-foreground">
                    Customer Object
                  </span>
                  <span className="text-[10px] font-mono text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded">
                    0x12AA
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-foreground">32 Bytes</span>
              </div>

              <div className="p-2 rounded bg-secondary/50 text-xs font-mono space-y-1">
                <span className="text-[10px] text-muted-foreground block">Fields:</span>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>String name</span>
                  <span className="text-primary font-bold">&rarr; &ldquo;Alice&rdquo; (String Pool)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. HASHMAP COLLISION & TREEIFICATION (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function HashMapTreeifyFlowchart() {
  const [collisionCount, setCollisionCount] = useState(4)

  const isTreeified = collisionCount >= 8

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Data Structure Mechanics
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            HashMap Internal Bucketing &amp; Red-Black Treeification
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">Collisions in Bucket #4:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCollisionCount((c) => Math.max(1, c - 1))}
              className="w-6 h-6 rounded border border-border flex items-center justify-center text-xs font-mono hover:bg-secondary cursor-pointer"
            >
              -
            </button>
            <span className="w-6 text-center font-mono text-xs font-bold text-primary">
              {collisionCount}
            </span>
            <button
              onClick={() => setCollisionCount((c) => Math.min(12, c + 1))}
              className="w-6 h-6 rounded border border-border flex items-center justify-center text-xs font-mono hover:bg-secondary cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Java 8 introduced an algorithmic defense against HashDoS attacks: when hash collisions in a single bucket reach the <code>TREEIFY_THRESHOLD = 8</code> and table capacity $\ge 64$, the bucket's linear linked list is automatically converted into a balanced <strong>Red-Black Tree</strong>, improving lookup from $O(N)$ to $O(\log N)$.
      </p>

      {/* Visual Pipeline Stages */}
      <div className="grid gap-3 sm:grid-cols-4">
        <div className="rounded-2xl border border-border bg-secondary/30 p-3.5 space-y-1 text-center">
          <span className="text-[10px] font-mono text-muted-foreground uppercase block">Step 1</span>
          <span className="font-mono text-xs font-bold text-foreground">key.hashCode()</span>
          <span className="text-[10px] text-muted-foreground block">32-bit Integer</span>
        </div>
        <div className="rounded-2xl border border-border bg-secondary/30 p-3.5 space-y-1 text-center">
          <span className="text-[10px] font-mono text-muted-foreground uppercase block">Step 2</span>
          <span className="font-mono text-xs font-bold text-foreground">Bit Spread</span>
          <span className="text-[10px] text-primary block">h ^ (h &gt;&gt;&gt; 16)</span>
        </div>
        <div className="rounded-2xl border border-border bg-secondary/30 p-3.5 space-y-1 text-center">
          <span className="text-[10px] font-mono text-muted-foreground uppercase block">Step 3</span>
          <span className="font-mono text-xs font-bold text-foreground">Bucket Index</span>
          <span className="text-[10px] text-primary block">(capacity - 1) &amp; hash</span>
        </div>
        <div className="rounded-2xl border border-border bg-secondary/30 p-3.5 space-y-1 text-center">
          <span className="text-[10px] font-mono text-muted-foreground uppercase block">Step 4</span>
          <span className="font-mono text-xs font-bold text-foreground">Collision Check</span>
          <span className={cn("text-[10px] font-bold block", isTreeified ? "text-primary" : "text-indigo-500")}>
            {isTreeified ? "Red-Black Tree (O(log N))" : "Linked List (O(N))"}
          </span>
        </div>
      </div>

      {/* Interactive Bucket Representation */}
      <div className="rounded-2xl border border-border bg-card p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold text-foreground">
            Bucket #4 State: {isTreeified ? "TreeNode<K,V> (Treeified)" : "Node<K,V> (Separate Chaining)"}
          </span>
          <span
            className={cn(
              "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase border",
              isTreeified
                ? "bg-primary/10 text-primary border-primary/30"
                : "bg-indigo-500/10 text-indigo-500 border-indigo-500/30"
            )}
          >
            {isTreeified ? "Red-Black Tree Active" : "Linked List Active"}
          </span>
        </div>

        {!isTreeified ? (
          /* Linked List Chain */
          <div className="flex flex-wrap items-center gap-2 p-4 rounded-xl bg-secondary/30 overflow-x-auto">
            <div className="px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold">
              table[4]
            </div>
            <ArrowRight size={14} className="text-muted-foreground shrink-0" />
            {Array.from({ length: collisionCount }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 shrink-0">
                <div className="px-3 py-2 rounded-lg border border-border bg-card text-xs font-mono text-foreground flex items-center gap-1.5 shadow-2xs">
                  <span className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-[10px] text-muted-foreground">
                    {i + 1}
                  </span>
                  <span>Node_{i + 1}</span>
                </div>
                {i < collisionCount - 1 && (
                  <ArrowRight size={12} className="text-muted-foreground shrink-0" />
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Red-Black Tree Representation */
          <div className="p-6 rounded-xl bg-secondary/30 flex flex-col items-center space-y-4">
            <div className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-mono font-bold shadow-md">
              Root Node (Black)
            </div>
            <div className="flex items-center gap-8">
              <div className="flex flex-col items-center space-y-2">
                <div className="w-0.5 h-4 bg-border" />
                <div className="px-3 py-1.5 rounded-xl bg-rose-600 border border-rose-400 text-white text-xs font-mono font-bold shadow-sm">
                  Left Child (Red)
                </div>
              </div>
              <div className="flex flex-col items-center space-y-2">
                <div className="w-0.5 h-4 bg-border" />
                <div className="px-3 py-1.5 rounded-xl bg-rose-600 border border-rose-400 text-white text-xs font-mono font-bold shadow-sm">
                  Right Child (Red)
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-primary font-semibold">
              Balanced Red-Black Tree active! Worst-case traversal is strictly bounded to O(log N).
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. THREAD STATE TRANSITION MACHINE (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function ThreadStateFlowchart() {
  const [activeState, setActiveState] = useState("RUNNABLE")

  const threadStates = [
    {
      id: "NEW",
      title: "NEW",
      badge: "Initial",
      color: "border-blue-500/40 bg-blue-500/10 text-blue-500",
      description: "Thread has been instantiated (`Thread t = new Thread()`), but `t.start()` has not yet been invoked.",
      transitions: "Invoking `start()` moves thread to RUNNABLE."
    },
    {
      id: "RUNNABLE",
      title: "RUNNABLE",
      badge: "Active",
      color: "border-primary/40 bg-primary/10 text-primary",
      description: "Thread is executing in the JVM, or waiting in the OS scheduler queue ready to be allocated a CPU timeslice.",
      transitions: "Moves to BLOCKED on lock failure, WAITING on wait()/join(), or TERMINATED on completion."
    },
    {
      id: "BLOCKED",
      title: "BLOCKED",
      badge: "Monitor Lock",
      color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-500",
      description: "Thread is suspended waiting to acquire an intrinsic monitor lock before entering a `synchronized` block/method.",
      transitions: "Automatically returns to RUNNABLE once the lock holding thread exits and releases the monitor."
    },
    {
      id: "WAITING",
      title: "WAITING",
      badge: "Indefinite Wait",
      color: "border-purple-500/40 bg-purple-500/10 text-purple-500",
      description: "Thread is waiting indefinitely for another thread to perform a specific action (`Object.wait()`, `Thread.join()`, `LockSupport.park()`).",
      transitions: "Returns to RUNNABLE when another thread executes `notify()` / `notifyAll()`."
    },
    {
      id: "TIMED_WAITING",
      title: "TIMED_WAITING",
      badge: "Time-Bound Wait",
      color: "border-blue-500/40 bg-blue-500/10 text-blue-400",
      description: "Thread is waiting with a specified timeout (`Thread.sleep(millis)`, `Object.wait(timeout)`, `LockSupport.parkNanos()`).",
      transitions: "Returns to RUNNABLE when the timeout expires or an interrupt is triggered."
    },
    {
      id: "TERMINATED",
      title: "TERMINATED",
      badge: "Completed",
      color: "border-slate-500/40 bg-slate-500/10 text-slate-400",
      description: "Thread has completed execution of its `run()` method or died from an unhandled runtime exception.",
      transitions: "Terminal state. Cannot be restarted."
    }
  ]

  const current = threadStates.find((s) => s.id === activeState) || threadStates[1]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Concurrency State Machine
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Java Thread Lifecycle &amp; State Transitions
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Click state to inspect transitions
        </span>
      </div>

      {/* State Machine Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-2">
        {threadStates.map((state) => (
          <button
            key={state.id}
            onClick={() => setActiveState(state.id)}
            className={cn(
              "p-3 rounded-2xl border text-center transition-all cursor-pointer",
              activeState === state.id
                ? cn("shadow-xs ring-1 ring-primary", state.color)
                : "border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            )}
          >
            <span className="text-xs font-mono font-bold block">{state.title}</span>
            <span className="text-[10px] font-mono text-muted-foreground mt-0.5 block">
              {state.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Active State Detail Panel */}
      <div className="rounded-2xl border border-border bg-secondary/20 p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className={cn("px-2.5 py-0.5 rounded-full border text-xs font-mono font-semibold", current.color)}>
            State: {current.title}
          </span>
          <span className="text-xs font-mono text-muted-foreground">Lifecycle Phase</span>
        </div>
        <p className="text-xs sm:text-sm text-foreground leading-relaxed">
          {current.description}
        </p>
        <div className="rounded-xl border border-border/80 bg-card p-3 font-mono text-xs text-primary">
          <span className="text-muted-foreground text-[10px] uppercase font-bold block mb-0.5">
            Transition Triggers:
          </span>
          {current.transitions}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. RECURSION CALL STACK PUSH/POP (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function RecursionStackFlowchart() {
  const [step, setStep] = useState(3)

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Call Stack Mechanics
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Recursion Call Stack Push &amp; Pop Traversal
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">Simulation Step:</span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              className="px-2.5 py-1 rounded border border-border text-xs font-mono hover:bg-secondary cursor-pointer"
            >
              Prev
            </button>
            <span className="font-mono text-xs font-bold text-primary px-2">{step} / 5</span>
            <button
              onClick={() => setStep((s) => Math.min(5, s + 1))}
              className="px-2.5 py-1 rounded border border-border text-xs font-mono hover:bg-secondary cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Trace how recursive invocations allocate independent stack frames holding local parameters until hitting the base case, after which return values unwind the stack in reverse order.
      </p>

      {/* Visual Stack Frames */}
      <div className="max-w-md mx-auto space-y-2 p-5 rounded-2xl border border-border bg-secondary/30">
        <span className="text-[10px] font-mono uppercase text-muted-foreground block text-center pb-2 border-b border-border">
          Top of Stack (Thread Memory)
        </span>

        {step >= 3 && (
          <div className="p-3.5 rounded-xl border border-primary/50 bg-primary/10 text-primary dark:text-primary font-mono text-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between font-bold">
              <span>factorial(1)</span>
              <span>n = 1 (Base Case Reached!)</span>
            </div>
            <p className="text-[11px] text-muted-foreground">Returns 1 directly to caller without recursing.</p>
          </div>
        )}

        {step >= 2 && (
          <div className="p-3.5 rounded-xl border border-primary/40 bg-card font-mono text-xs shadow-xs space-y-1">
            <div className="flex items-center justify-between font-bold text-foreground">
              <span>factorial(2)</span>
              <span>n = 2</span>
            </div>
            <p className="text-[11px] text-muted-foreground">
              {step >= 4 ? "Unwinding: computes 2 * 1 = 2 and pops frame" : "Suspended: waiting for factorial(1)"}
            </p>
          </div>
        )}

        <div className="p-3.5 rounded-xl border border-border bg-card font-mono text-xs shadow-xs space-y-1">
          <div className="flex items-center justify-between font-bold text-foreground">
            <span>factorial(3)</span>
            <span>n = 3</span>
          </div>
          <p className="text-[11px] text-muted-foreground">
            {step === 5 ? "Final unwinding: computes 3 * 2 = 6, returns to main()" : "Suspended: waiting for factorial(2)"}
          </p>
        </div>

        <span className="text-[10px] font-mono uppercase text-muted-foreground block text-center pt-2 border-t border-border">
          Bottom of Stack
        </span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. OS PROCESS LIFECYCLE STATE MACHINE (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function OsProcessLifecycleFlowchart() {
  const [activeState, setActiveState] = useState<"NEW" | "READY" | "RUNNING" | "WAITING" | "TERMINATED">("RUNNING")

  const states = [
    {
      id: "NEW" as const,
      name: "New",
      badge: "Creation",
      color: "border-blue-500/40 bg-blue-500/10 text-blue-500",
      description: "Process is being created. OS allocates PCB (Process Control Block) and loads ELF headers.",
      registers: { rip: "0x00400000", rsp: "0x7FFFFFF0", rax: "0x0" },
      transition: "Admitted into Ready Queue"
    },
    {
      id: "READY" as const,
      name: "Ready",
      badge: "In Runqueue",
      color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-500",
      description: "Process is loaded in RAM and waiting in the CPU scheduler runqueue for a core time slice.",
      registers: { rip: "0x00401A20", rsp: "0x7FFFFFE0", rax: "0x1" },
      transition: "Scheduler Dispatches to CPU"
    },
    {
      id: "RUNNING" as const,
      name: "Running",
      badge: "On Core 0",
      color: "border-primary/40 bg-primary/10 text-primary",
      description: "Instructions are actively executing on physical hardware registers and ALU.",
      registers: { rip: "0x00401C54", rsp: "0x7FFFFFC8", rax: "0x42" },
      transition: "Timer Interrupt (preempt) OR I/O Request"
    },
    {
      id: "WAITING" as const,
      name: "Waiting / Blocked",
      badge: "I/O Sleep",
      color: "border-purple-500/40 bg-purple-500/10 text-purple-500",
      description: "Process voluntarily suspended waiting for I/O disk block, network packet, or mutex lock.",
      registers: { rip: "0x00402100", rsp: "0x7FFFFF80", rax: "0xFF" },
      transition: "I/O Completion Interrupt moves back to Ready"
    },
    {
      id: "TERMINATED" as const,
      name: "Terminated",
      badge: "Zombie Reaped",
      color: "border-rose-500/40 bg-rose-500/10 text-rose-500",
      description: "Process has executed exit() syscall. Resources freed, exit code held until parent waitpid().",
      registers: { rip: "0x00000000", rsp: "0x00000000", rax: "0x0 (Exit Status)" },
      transition: "Parent calls wait() to deallocate PCB"
    }
  ]

  const current = states.find((s) => s.id === activeState) || states[2]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Interactive Kernel Simulation
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Operating System 5-State Process Machine
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border">
          {states.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveState(s.id)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer",
                activeState === s.id
                  ? "bg-primary text-primary-foreground shadow-2xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Visual State Node Diagram */}
      <div className="p-6 rounded-2xl border border-border bg-secondary/20 relative overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative z-10">
          {states.map((s, idx) => {
            const isActive = activeState === s.id
            return (
              <button
                key={s.id}
                onClick={() => setActiveState(s.id)}
                className={cn(
                  "p-4 rounded-2xl border text-left transition-all cursor-pointer relative group",
                  isActive
                    ? "border-primary bg-card shadow-md ring-2 ring-primary/40 scale-102"
                    : "border-border/80 bg-card/60 hover:bg-card text-muted-foreground hover:text-foreground"
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] text-muted-foreground">0{idx + 1}</span>
                  <span className={cn("px-1.5 py-0.5 rounded text-[9px] font-mono border", s.color)}>
                    {s.badge}
                  </span>
                </div>
                <div className="font-serif font-bold text-foreground text-sm">{s.name}</div>
                <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-snug">
                  {s.description}
                </p>
              </button>
            )
          })}
        </div>

        {/* State Transition Connector Flow */}
        <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-muted-foreground">
          <span className="text-blue-500 font-bold">New</span>
          <ArrowRight size={14} />
          <span className="text-indigo-500 font-bold">Ready</span>
          <span className="flex items-center gap-1 text-primary">
            <ArrowRight size={14} /> <span>dispatch</span> <ArrowRight size={14} />
          </span>
          <span className="text-primary font-bold">Running</span>
          <span className="flex items-center gap-1 text-purple-500">
            <ArrowRight size={14} /> <span>I/O wait</span> <ArrowRight size={14} />
          </span>
          <span className="text-purple-500 font-bold">Waiting</span>
          <ArrowRight size={14} />
          <span className="text-rose-500 font-bold">Terminated</span>
        </div>
      </div>

      {/* PCB Inspection Hardware State */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase block">
            Process Control Block (PCB)
          </span>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between py-0.5 border-b border-border/50">
              <span className="text-muted-foreground">PID:</span>
              <span className="font-bold text-foreground">1042 (bash)</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-border/50">
              <span className="text-muted-foreground">Parent PPID:</span>
              <span className="text-foreground">1001 (systemd)</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">State Enum:</span>
              <span className="font-bold text-primary">{current.name.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase block">
            Hardware CPU Registers
          </span>
          <div className="space-y-1 font-mono text-xs">
            <div className="flex justify-between py-0.5 border-b border-border/50">
              <span className="text-muted-foreground">RIP (Instruction):</span>
              <span className="text-primary">{current.registers.rip}</span>
            </div>
            <div className="flex justify-between py-0.5 border-b border-border/50">
              <span className="text-muted-foreground">RSP (Stack Pointer):</span>
              <span className="text-foreground">{current.registers.rsp}</span>
            </div>
            <div className="flex justify-between py-0.5">
              <span className="text-muted-foreground">RAX (Accumulator):</span>
              <span className="text-primary">{current.registers.rax}</span>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-border bg-card space-y-2">
          <span className="text-[11px] font-mono text-muted-foreground uppercase block">
            Next State Transition
          </span>
          <p className="text-xs text-foreground/90 font-medium leading-relaxed">
            {current.transition}
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono text-primary pt-1">
            <ShieldCheck size={14} />
            <span>Context Switch Preserved in TSS</span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. VIRTUAL MEMORY & PAGING TRANSLATION (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function VirtualMemoryPagingFlowchart() {
  const [tlbHit, setTlbHit] = useState(true)
  const [activeStep, setActiveStep] = useState(0)

  const steps = [
    {
      title: "1. Virtual Address Split",
      badge: "MMU Input",
      desc: "CPU executes instruction requesting 0x0040_1A3F. Hardware MMU splits it into Virtual Page Number (VPN) and Offset.",
      data: { vpn: "0x00401 (Page 1025)", offset: "0xA3F (2623 bytes)", time: "0 ns" }
    },
    {
      title: "2. TLB Associative Cache Lookup",
      badge: tlbHit ? "TLB Hit (Fast)" : "TLB Miss (Slow)",
      desc: tlbHit
        ? "Translation Lookaside Buffer finds VPN tag instantly in high-speed hardware CAM registers."
        : "TLB miss! Hardware Page Table Walker must consult CR3 register and traverse physical memory hierarchy.",
      data: { hit: tlbHit ? "TRUE (1-2 cycles)" : "FALSE (~100 cycles)", pfn: "0x0078A", time: tlbHit ? "1 ns" : "100 ns" }
    },
    {
      title: "3. Page Table Entry (PTE) Verification",
      badge: "Permission & Valid Bit",
      desc: "Check Present Bit (P=1), Read/Write permissions (W=1), and User/Supervisor bit (U=1).",
      data: { present: "1 (Loaded in RAM)", perms: "RW-X", dirty: "0 (Clean)" }
    },
    {
      title: "4. Physical Address Assembly",
      badge: "Hardware RAM",
      desc: "Physical Frame Number (PFN 0x0078A) is concatenated with original Offset (0xA3F) to produce physical RAM address 0x0078A_A3F.",
      data: { paddr: "0x0078AA3F", dramBank: "DDR5 Channel A", latency: "Access Granted" }
    }
  ]

  const current = steps[activeStep]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Memory Management Unit (MMU)
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Virtual Memory to Physical RAM Address Translation
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setTlbHit(!tlbHit)}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-mono border transition-all cursor-pointer",
              tlbHit
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-indigo-500/50 bg-indigo-500/10 text-indigo-500"
            )}
          >
            {tlbHit ? "Simulate: TLB Hit (Fast)" : "Simulate: TLB Miss (Page Walker)"}
          </button>
        </div>
      </div>

      {/* Translation Pipeline Ribbon */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            className={cn(
              "p-4 rounded-2xl border text-left transition-all cursor-pointer",
              activeStep === idx
                ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/40"
                : "border-border/80 bg-secondary/30 hover:bg-secondary/60 text-muted-foreground"
            )}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] font-mono text-muted-foreground">Step 0{idx + 1}</span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-secondary text-foreground">
                {s.badge}
              </span>
            </div>
            <span className="font-serif font-bold text-foreground text-sm block line-clamp-1">
              {s.title.split(".")[1]?.trim() || s.title}
            </span>
          </button>
        ))}
      </div>

      {/* Graphical Bit-Slicing Address Box */}
      <div className="p-6 rounded-2xl border border-border bg-secondary/20 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[11px] font-mono text-muted-foreground uppercase">Virtual Address (32-bit/64-bit)</span>
            <div className="flex items-center gap-1 font-mono text-sm">
              <div className="px-3 py-1.5 rounded-lg border border-primary/50 bg-primary/10 text-primary font-bold">
                VPN: 0x00401
              </div>
              <div className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground">
                Offset: 0xA3F
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-primary font-mono text-xs">
            <ArrowRight size={18} />
            <span>MMU Translation ({current.data.time || "1 ns"})</span>
            <ArrowRight size={18} />
          </div>

          <div className="space-y-1 text-center sm:text-right">
            <span className="text-[11px] font-mono text-muted-foreground uppercase">Physical RAM Address</span>
            <div className="flex items-center gap-1 font-mono text-sm">
              <div className="px-3 py-1.5 rounded-lg border border-primary/50 bg-primary/10 text-primary font-bold">
                PFN: 0x0078A
              </div>
              <div className="px-3 py-1.5 rounded-lg border border-border bg-card text-foreground">
                Offset: 0xA3F
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed pt-2 border-t border-border">
          {current.desc}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. SYSTEM CALL DUAL-MODE BOUNDARY (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function SyscallBoundaryFlowchart() {
  const [activeStage, setActiveStage] = useState(2)

  const boundaryStages = [
    {
      ring: "Ring 3 (User Space)",
      title: "1. User Code Invocation",
      actor: "Application (printf / write)",
      color: "border-blue-500/40 bg-blue-500/10 text-blue-500",
      desc: "User code invokes POSIX write(fd, buf, count). Parameters placed into registers RDI, RSI, RDX."
    },
    {
      ring: "Hardware CPU Boundary",
      title: "2. syscall / sysenter Trap",
      actor: "x86-64 CPU Silicon",
      color: "border-indigo-500/40 bg-indigo-500/10 text-indigo-500",
      desc: "CPU flips CPL (Current Privilege Level) from 3 to 0. CPU swaps to Kernel Stack (RSP0 in TSS)."
    },
    {
      ring: "Ring 0 (Kernel Space)",
      title: "3. sys_call_table Dispatch",
      actor: "Linux Kernel Dispatcher",
      color: "border-primary/40 bg-primary/10 text-primary",
      desc: "Kernel indexes sys_call_table[RAX=1] -> calls sys_write(). Validates user memory pointers."
    },
    {
      ring: "Ring 0 (Device Driver)",
      title: "4. VFS & Storage Driver",
      actor: "ext4 / NVMe Device Driver",
      color: "border-purple-500/40 bg-purple-500/10 text-purple-500",
      desc: "Virtual File System routes write request to ext4 block allocation and issues DMA transfer to hardware SSD."
    },
    {
      ring: "Hardware CPU Boundary",
      title: "5. sysret Return to Ring 3",
      actor: "Hardware Return",
      color: "border-primary/40 bg-primary/10 text-primary",
      desc: "Kernel places byte count into RAX, executes sysret. CPU restores CPL=3, application resumes execution."
    }
  ]

  const current = boundaryStages[activeStage]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Hardware Protection Rings
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            User Space to Ring 0 Kernel Dual-Mode Boundary
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Stage {activeStage + 1} of 5
        </span>
      </div>

      {/* Visual Dual-Mode Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ring 3 Box */}
        <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-blue-500 uppercase">
              Ring 3 (Unprivileged User Mode)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/10 text-blue-400">
              CPL = 3
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            No direct port access. Memory restricted to user address space. Protected against crashing host system.
          </p>
          <div className="p-3 rounded-xl bg-card border border-border font-mono text-xs">
            <code>mov rax, 1       ; syscall #1 (sys_write)<br/>mov rdi, 1       ; stdout<br/>syscall          ; TRAP to Ring 0</code>
          </div>
        </div>

        {/* Ring 0 Box */}
        <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-primary uppercase">
              Ring 0 (Privileged Kernel Mode)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
              CPL = 0
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Full access to physical hardware instructions (cli, sti, mov cr3, in, out). Manages physical silicon.
          </p>
          <div className="p-3 rounded-xl bg-card border border-border font-mono text-xs text-primary">
            <code>entry_SYSCALL_64:<br/>  swapgs<br/>  mov [rsp0], rsp<br/>  call sys_call_table[rax]</code>
          </div>
        </div>
      </div>

      {/* Interactive Step Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {boundaryStages.map((stage, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStage(idx)}
            className={cn(
              "p-3 rounded-xl border text-left transition-all cursor-pointer",
              activeStage === idx
                ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/40"
                : "border-border/80 bg-secondary/30 hover:bg-secondary/60 text-muted-foreground"
            )}
          >
            <span className="text-[10px] font-mono text-muted-foreground block">Step 0{idx + 1}</span>
            <span className="font-serif font-bold text-foreground text-xs block truncate mt-0.5">
              {stage.title.split(".")[1]?.trim()}
            </span>
          </button>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-primary/20 bg-secondary/30 text-xs sm:text-sm text-foreground/90 leading-relaxed">
        <strong>{current.title}:</strong> {current.desc}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   9. CONCURRENCY MUTEX & RACE CONDITION (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function ConcurrencyMutexFlowchart() {
  const [useMutex, setUseMutex] = useState(true)
  const [step, setStep] = useState(1)

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Multi-Thread Synchronization
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Race Condition vs Mutex Mutual Exclusion
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { setUseMutex(!useMutex); setStep(1); }}
            className={cn(
              "px-3 py-1 rounded-xl text-xs font-mono border transition-all cursor-pointer",
              useMutex
                ? "border-primary/50 bg-primary/10 text-primary font-bold"
                : "border-rose-500/50 bg-rose-500/10 text-rose-500 font-bold"
            )}
          >
            {useMutex ? "Mode: Mutex Protected" : "Mode: Unsynchronized (Race!)"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Thread A Lane */}
        <div className="p-5 rounded-2xl border border-border bg-secondary/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-primary">Thread 1 (Core 0)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
              TID = 2001
            </span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-card border border-border">
              {useMutex ? "1. pthread_mutex_lock(&lock) -> ACQUIRED" : "1. read(balance) -> 100"}
            </div>
            <div className="p-2.5 rounded-lg bg-card border border-border">
              {useMutex ? "2. balance += 50 (Critical Section)" : "2. compute 100 + 50 = 150"}
            </div>
            <div className="p-2.5 rounded-lg bg-card border border-border">
              {useMutex ? "3. pthread_mutex_unlock(&lock)" : "3. write(balance, 150)"}
            </div>
          </div>
        </div>

        {/* Thread B Lane */}
        <div className="p-5 rounded-2xl border border-border bg-secondary/20 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-indigo-500">Thread 2 (Core 1)</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-500">
              TID = 2002
            </span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="p-2.5 rounded-lg bg-card border border-border">
              {useMutex ? "1. pthread_mutex_lock(&lock) -> BLOCKED (Futex Sleep)" : "1. read(balance) -> 100 (Stale!)"}
            </div>
            <div className="p-2.5 rounded-lg bg-card border border-border">
              {useMutex ? "2. Woken up after unlock -> ACQUIRES lock" : "2. compute 100 + 20 = 120"}
            </div>
            <div className="p-2.5 rounded-lg bg-card border border-border">
              {useMutex ? "3. balance += 20 -> safe final 170" : "3. write(balance, 120) -> OVERWRITTEN! (Lost Update)"}
            </div>
          </div>
        </div>
      </div>

      <div className={cn(
        "p-4 rounded-2xl border font-mono text-xs flex items-center justify-between",
        useMutex
          ? "border-primary/40 bg-primary/10 text-primary dark:text-primary"
          : "border-rose-500/40 bg-rose-500/10 text-rose-600 dark:text-rose-400"
      )}>
        <div className="flex items-center gap-2">
          {useMutex ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>
            {useMutex
              ? "Final Shared Balance: $170 (Correct deterministic ACID invariant maintained)"
              : "Final Shared Balance: $120 (FATAL: Thread 1's $50 deposit lost to race condition!)"}
          </span>
        </div>
        <span className="font-bold">{useMutex ? "THREAD SAFE" : "DATA CORRUPTION"}</span>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   10. SPRING BOOT 3-TIER ENTERPRISE PIPELINE (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function SpringBootPipelineFlowchart() {
  const [activeStage, setActiveStage] = useState(0)

  const stages = [
    {
      name: "1. HTTP Request",
      tag: "Client Ingress",
      icon: Terminal,
      color: "border-blue-500/40 text-blue-500",
      desc: "Client transmits HTTP POST /api/v1/orders with JSON payload and Authorization Bearer JWT token."
    },
    {
      name: "2. Security Filter Chain",
      tag: "Spring Security",
      icon: ShieldCheck,
      color: "border-indigo-500/40 text-indigo-500",
      desc: "JwtAuthenticationFilter validates RSA signature, extracts user claims, and sets SecurityContextHolder."
    },
    {
      name: "3. DispatcherServlet",
      tag: "Front Controller",
      icon: Layers,
      color: "border-purple-500/40 text-purple-500",
      desc: "Spring Front Controller queries HandlerMapping to route request to OrderController.createOrder()."
    },
    {
      name: "4. @Service Business Logic",
      tag: "@Transactional",
      icon: Zap,
      color: "border-primary/40 text-primary",
      desc: "OrderService verifies customer credit, deducts inventory, and begins ACID transaction boundary."
    },
    {
      name: "5. Spring Data JPA Repository",
      tag: "Hibernate ORM",
      icon: Database,
      color: "border-rose-500/40 text-rose-500",
      desc: "OrderRepository.save() manages Hibernate first-level cache, entity state transitions, and SQL generation."
    },
    {
      name: "6. PostgreSQL Database",
      tag: "HikariCP Pool",
      icon: HardDrive,
      color: "border-primary/40 text-primary",
      desc: "HikariCP connection pool issues INSERT into orders table. Commit executed, HTTP 201 Created returned."
    }
  ]

  const current = stages[activeStage]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Enterprise Architecture Flowchart
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Spring Boot 3-Tier Web Request Pipeline
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Step {activeStage + 1} of {stages.length}
        </span>
      </div>

      {/* Visual Pipeline Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {stages.map((stage, idx) => {
          const isSelected = activeStage === idx
          const Icon = stage.icon
          return (
            <button
              key={idx}
              onClick={() => setActiveStage(idx)}
              className={cn(
                "p-3 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center",
                isSelected
                  ? "border-primary bg-primary/10 shadow-xs ring-1 ring-primary/40 font-semibold"
                  : "border-border/80 bg-secondary/30 hover:bg-secondary/60 text-muted-foreground hover:text-foreground"
              )}
            >
              <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-secondary mb-1.5 text-primary">
                <Icon size={16} />
              </div>
              <span className="text-[11px] font-bold block truncate max-w-full">
                {stage.name.split(".")[1]?.trim() || stage.name}
              </span>
              <span className="text-[9px] font-mono text-muted-foreground/80 mt-0.5 block truncate">
                {stage.tag}
              </span>
            </button>
          )
        })}
      </div>

      <div className="p-5 rounded-2xl border border-border bg-secondary/20 space-y-2">
        <div className="flex items-center gap-2">
          <span className={cn("px-2 py-0.5 rounded text-xs font-mono border", current.color)}>
            {current.tag}
          </span>
          <h4 className="font-serif font-bold text-foreground">{current.name}</h4>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {current.desc}
        </p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   11. SMART VISUAL DIAGRAM RENDERER (PARSES RAW SCHEMATICS INTO GRAPH NODES)
   ═══════════════════════════════════════════════════════════════════════════ */
export function SmartVisualDiagramRenderer({
  title,
  schematicText
}: {
  title: string
  schematicText: string
}) {
  const [selectedNode, setSelectedNode] = useState<number>(0)
  const [viewMode, setViewMode] = useState<"visual" | "raw">("visual")

  // Parse lines into logical nodes
  const nodes = useMemo(() => {
    if (!schematicText) return []
    const rawLines = schematicText.split("\n")
    const parsed: Array<{
      id: number
      title: string
      badge?: string
      desc?: string
      iconType: "code" | "cpu" | "database" | "shield" | "net" | "box"
    }> = []

    // 1. Check if lines contain numbered steps e.g. "1. ..." or "Step 1: ..."
    const numberedRegex = /^(\d+)[\.\)]\s*(.+)/
    const stepLines = rawLines.filter((l) => numberedRegex.test(l.trim()))

    if (stepLines.length >= 2) {
      stepLines.forEach((line, idx) => {
        const match = line.trim().match(numberedRegex)
        if (match) {
          const text = match[2].trim()
          let iconType: "code" | "cpu" | "database" | "shield" | "net" | "box" = "box"
          if (/http|client|request|curl|browser/i.test(text)) iconType = "net"
          else if (/kernel|cpu|thread|process|schedule/i.test(text)) iconType = "cpu"
          else if (/data|db|memory|ram|heap|storage/i.test(text)) iconType = "database"
          else if (/security|auth|filter|protect|lock/i.test(text)) iconType = "shield"
          else if (/code|class|method|function/i.test(text)) iconType = "code"

          parsed.push({
            id: idx,
            title: text.split("->")[0].split("──>")[0].trim(),
            badge: `Stage 0${idx + 1}`,
            desc: text,
            iconType
          })
        }
      })
      if (parsed.length > 0) return parsed
    }

    // 2. Check for bracketed entities e.g. [Parent Process] -> [Child Process]
    const bracketMatches = schematicText.match(/\[([^\]]+)\]/g)
    if (bracketMatches && bracketMatches.length >= 2) {
      const uniqueEntities = Array.from(new Set(bracketMatches.map((b) => b.slice(1, -1).trim())))
      uniqueEntities.forEach((entity, idx) => {
        let iconType: "code" | "cpu" | "database" | "shield" | "net" | "box" = "box"
        if (/user|app|client/i.test(entity)) iconType = "code"
        else if (/kernel|cpu|os|hardware/i.test(entity)) iconType = "cpu"
        else if (/ram|disk|db|memory/i.test(entity)) iconType = "database"
        else if (/security|lock|mutex/i.test(entity)) iconType = "shield"

        parsed.push({
          id: idx,
          title: entity,
          badge: `Node 0${idx + 1}`,
          desc: `Entity state & role in architecture: ${entity}`,
          iconType
        })
      })
      if (parsed.length > 0) return parsed
    }

    // 3. Fallback: Split by arrows (-> or ──> or ===>)
    const arrowTokens = schematicText
      .split(/---+>|──+>|==+>|->/)
      .map((t) => t.replace(/[\r\n\+\-\|\_]/g, " ").trim())
      .filter((t) => t.length > 2 && t.length < 80)

    if (arrowTokens.length >= 2) {
      arrowTokens.slice(0, 8).forEach((token, idx) => {
        parsed.push({
          id: idx,
          title: token,
          badge: `Pipeline 0${idx + 1}`,
          desc: `Flow transition step: ${token}`,
          iconType: idx % 2 === 0 ? "cpu" : "database"
        })
      })
      if (parsed.length > 0) return parsed
    }

    // 4. Default chunk parser for meaningful non-empty lines
    const validLines = rawLines
      .map((l) => l.trim())
      .filter((l) => l.length > 3 && !l.startsWith("+--") && !l.startsWith("|") && !l.startsWith("---"))
      .slice(0, 6)

    validLines.forEach((l, idx) => {
      parsed.push({
        id: idx,
        title: l.length > 35 ? l.slice(0, 35) + "..." : l,
        badge: `Step 0${idx + 1}`,
        desc: l,
        iconType: "box"
      })
    })

    return parsed
  }, [schematicText])

  const activeNode = nodes[selectedNode] || nodes[0]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Visual Architecture &amp; Runtime Schematic
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border">
          <button
            onClick={() => setViewMode("visual")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer",
              viewMode === "visual"
                ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Visual Nodes
          </button>
          <button
            onClick={() => setViewMode("raw")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer",
              viewMode === "raw"
                ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Raw Schematic
          </button>
        </div>
      </div>

      {viewMode === "visual" && nodes.length > 0 ? (
        <div className="space-y-6">
          {/* Interactive Graphical Flowchart Nodes */}
          <div className="p-6 rounded-2xl border border-border bg-secondary/20 relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
              {nodes.map((node, idx) => {
                const isSelected = selectedNode === idx
                return (
                  <div key={node.id} className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedNode(idx)}
                      className={cn(
                        "p-4 rounded-2xl border text-left transition-all cursor-pointer min-w-[150px] max-w-[220px] shadow-xs group",
                        isSelected
                          ? "border-primary bg-card ring-2 ring-primary/40 scale-103 shadow-md"
                          : "border-border/80 bg-card/70 hover:bg-card text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-mono text-muted-foreground">{node.badge}</span>
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            isSelected ? "bg-primary animate-pulse" : "bg-muted-foreground/30"
                          )}
                        />
                      </div>
                      <span className="font-serif font-bold text-foreground text-xs block leading-snug line-clamp-2">
                        {node.title}
                      </span>
                    </button>

                    {/* Connecting Visual Arrow with pulsing glow */}
                    {idx < nodes.length - 1 && (
                      <div className="flex items-center justify-center text-primary/70">
                        <ArrowRight size={18} className="animate-pulse" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Detailed Inspector Panel for Selected Node */}
          {activeNode && (
            <div className="p-5 rounded-2xl border border-primary/20 bg-card space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-mono font-bold">
                    {activeNode.badge}
                  </span>
                  <h4 className="font-serif text-base font-medium text-foreground">
                    {activeNode.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    disabled={selectedNode === 0}
                    onClick={() => setSelectedNode((s) => Math.max(0, s - 1))}
                    className="px-2.5 py-1 rounded-lg border border-border text-xs font-mono disabled:opacity-40 cursor-pointer"
                  >
                    Prev
                  </button>
                  <button
                    disabled={selectedNode === nodes.length - 1}
                    onClick={() => setSelectedNode((s) => Math.min(nodes.length - 1, s + 1))}
                    className="px-2.5 py-1 rounded-lg border border-border text-xs font-mono disabled:opacity-40 cursor-pointer"
                  >
                    Next
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activeNode.desc || `Detailed state and execution context for ${activeNode.title}`}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-[#181715] p-5 font-mono text-xs text-blue-400 overflow-x-auto shadow-inner leading-relaxed">
          <pre>{schematicText || "Schematic initializing..."}</pre>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   12. UNIVERSAL COURSE FLOWCHART DISPATCHER
   ═══════════════════════════════════════════════════════════════════════════ */
export function VisualCourseFlowchart({
  slugOrId,
  title,
  schematicText
}: {
  slugOrId: string
  title: string
  schematicText?: string
}) {
  const s = slugOrId.toLowerCase()

  // 1. JVM & Java Compilations
  if (s.includes("1-1") || s.includes("1-2") || s.includes("1-3") || s.includes("jvm") || s.includes("compiler")) {
    return <JvmPipelineFlowchart />
  }

  // 2. Memory Model, Variables, Heap & Stack
  if (s.includes("2-1") || s.includes("2-2") || s.includes("4-1") || s.includes("9-1") || s.includes("memory") || s.includes("heap")) {
    return <MemoryModelFlowchart />
  }

  // 3. HashMap, Buckets & Treeification
  if (s.includes("13-1") || s.includes("hashmap") || s.includes("treeify") || s.includes("collections")) {
    return <HashMapTreeifyFlowchart />
  }

  // 4. Concurrency Mutex & Race Conditions
  if (s.includes("mutex") || s.includes("race-condition") || s.includes("deadlock") || s.includes("synchroniz")) {
    return <ConcurrencyMutexFlowchart />
  }

  // 5. Threads & Thread Lifecycle
  if (s.includes("14-1") || s.includes("15-1") || s.includes("thread") || s.includes("concurrency")) {
    return <ThreadStateFlowchart />
  }

  // 6. Recursion & Stack Frames
  if (s.includes("8-1") || s.includes("recursion") || s.includes("stack-frame")) {
    return <RecursionStackFlowchart />
  }

  // 7. OS Process States & Scheduler
  if (s.includes("process") || s.includes("scheduling") || s.includes("pcb") || s.includes("cpu-burst") || s.includes("fork")) {
    return <OsProcessLifecycleFlowchart />
  }

  // 8. Virtual Memory & Paging
  if (s.includes("paging") || s.includes("virtual-memory") || s.includes("tlb") || s.includes("segmentation") || s.includes("page-fault")) {
    return <VirtualMemoryPagingFlowchart />
  }

  // 9. System Call & Kernel Dual-Mode Trap
  if (s.includes("syscall") || s.includes("kernel") || s.includes("interrupt") || s.includes("dual-mode") || s.includes("ring-0")) {
    return <SyscallBoundaryFlowchart />
  }

  // 10. Spring Boot Enterprise Web Flow
  if (s.includes("spring") || s.includes("order-engine") || s.includes("api-gateway") || s.includes("microservice")) {
    return <SpringBootPipelineFlowchart />
  }

  // Default: Smart Graphical Node Flowchart Parser
  return (
    <SmartVisualDiagramRenderer
      title={title}
      schematicText={schematicText || "Schematic initializing..."}
    />
  )
}

// Export alias for backward compatibility with Java course reader
export const VisualLessonFlowchart = ({
  lessonId,
  title,
  flowchartText
}: {
  lessonId: string
  title: string
  flowchartText?: string
}) => {
  return (
    <VisualCourseFlowchart
      slugOrId={lessonId}
      title={title}
      schematicText={flowchartText}
    />
  )
}

