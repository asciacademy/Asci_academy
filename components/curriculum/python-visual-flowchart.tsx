"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Terminal, Box, Layers, PlaySquare, ArrowRight, ArrowDown, Cpu, Database,
  CheckCircle2, AlertCircle, RefreshCw, Zap, ShieldCheck, Binary, Code2,
  HelpCircle, Eye, Network, GitBranch, HardDrive, Play, Pause, RefreshCcw
} from "lucide-react"
import { cn } from "@/lib/utils"

/* ═══════════════════════════════════════════════════════════════════════════
   1. CPYTHON EXECUTION PIPELINE (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function CPythonPipelineFlowchart() {
  const [activeStage, setActiveStage] = useState(0)

  const stages = [
    {
      id: "source",
      title: "1. Python Source Code",
      file: "main.py",
      badge: "Human Readable",
      icon: Code2,
      color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
      description: "Developers author human-readable Python script adhering to PEP 8 idioms and Python 3.12+ syntax rules.",
      details: [
        "Unicode UTF-8 plain-text source files (.py)",
        "Dynamic type hints (PEP 484) validated at development time",
        "Indentation-driven structural blocks"
      ],
      codeSnippet: `def compute_sum(a: int, b: int) -> int:\n    result = a + b\n    return result\n\nprint(compute_sum(40, 2))`
    },
    {
      id: "tokenizer",
      title: "2. Tokenizer & Lexer",
      file: "Lexical Analyzer",
      badge: "Token Stream",
      icon: Layers,
      color: "text-blue-500 border-blue-500/30 bg-blue-500/10",
      description: "Converts text stream into atomic lexical tokens (NAME, NUMBER, OP, INDENT, DEDENT, NEWLINE).",
      details: [
        "Tracks column offsets and indentation stack",
        "Converts operator characters (+, -, *, /) into token enums",
        "Strips comments and extraneous whitespace"
      ],
      codeSnippet: `NAME 'def'\nNAME 'compute_sum'\nLPAR '('\nNAME 'a'\nCOLON ':'\nNAME 'int'\n...`
    },
    {
      id: "parser",
      title: "3. PEG Parser & AST",
      file: "Python/ast.c",
      badge: "Syntax Tree",
      icon: Network,
      color: "text-purple-500 border-purple-500/30 bg-purple-500/10",
      description: "Python 3.9+ Parsing Expression Grammar (PEG) constructs a formal Abstract Syntax Tree (AST) representing program semantics.",
      details: [
        "Eliminates LL(1) grammar lookahead restrictions",
        "Validates syntax and structural pattern matching constructs",
        "Enables macro metaprogramming and AST transformations (ast module)"
      ],
      codeSnippet: `Module(\n  body=[\n    FunctionDef(\n      name='compute_sum',\n      args=arguments(args=[arg(arg='a'), arg(arg='b')]),\n      body=[Return(value=BinOp(left=Name(id='a'), op=Add(), right=Name(id='b')))])])`
    },
    {
      id: "compiler",
      title: "4. Bytecode Compiler",
      file: "__pycache__/*.pyc",
      badge: "Code Object",
      icon: Binary,
      color: "text-primary border-primary/30 bg-primary/10",
      description: "Lowers AST nodes into a PyCodeObject holding compact 16-bit bytecode instructions (opcode + argument byte) and constant tuples.",
      details: [
        "Emits cached .pyc binaries in __pycache__ with magic timestamp headers",
        "Constructs co_consts, co_varnames, and co_names lookup arrays",
        "Specializing Adaptive Interpreter optimizes dynamic hot paths (PEP 659)"
      ],
      codeSnippet: `// Disassembly via dis.dis(compute_sum)\n0: RESUME         0\n2: LOAD_FAST      0 (a)\n4: LOAD_FAST      1 (b)\n6: BINARY_OP      0 (+)\n10: STORE_FAST     2 (result)\n12: LOAD_FAST      2 (result)\n14: RETURN_VALUE`
    },
    {
      id: "vm",
      title: "5. CPython ceval.c Loop",
      file: "Virtual Machine",
      badge: "Stack Engine",
      icon: Cpu,
      color: "text-rose-500 border-rose-500/30 bg-rose-500/10",
      description: "CPython virtual machine execution loop (ceval.c) evaluates bytecode on a thread-local value stack while managing the Global Interpreter Lock.",
      details: [
        "Stack-based evaluation: pushes operands, invokes C API dispatchers",
        "Reference counting increments/decrements on PyObject pointers",
        "Periodically polls OS signals and switches active GIL threads"
      ],
      codeSnippet: `for (;;) {\n    opcode = NEXTOP();\n    switch (opcode) {\n        case BINARY_OP:\n            PyObject *right = POP();\n            PyObject *left = TOP();\n            SET_TOP(PyNumber_Add(left, right));\n            DISPATCH();\n    }\n}`
    },
    {
      id: "hardware",
      title: "6. CPU & OS Execution",
      file: "Physical Silicon",
      badge: "Host Hardware",
      icon: Terminal,
      color: "text-primary border-primary/30 bg-primary/10",
      description: "Native C runtime instructions execute on CPU silicon registers (x86-64 / ARM64) and interact with host OS syscalls.",
      details: [
        "Executes POSIX / Win32 OS syscalls (write, socket, mmap)",
        "Utilizes pymalloc arena pools for high-speed small memory chunks",
        "Interacts with C extensions and Cython accelerated modules"
      ],
      codeSnippet: `mov eax, [rbp - 8]\nadd eax, [rbp - 16]\nmov [rbp - 24], eax\nret`
    }
  ]

  const current = stages[activeStage]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            CPython Systems Architecture
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            The CPython Compilation &amp; Execution Pipeline
          </h3>
        </div>
        <span className="text-xs font-mono text-muted-foreground">
          Step {activeStage + 1} of {stages.length}
        </span>
      </div>

      {/* Pipeline Stage Buttons */}
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
            </button>
          )
        })}
      </div>

      {/* Active Stage Detailed Breakdown */}
      <div className="rounded-2xl border border-border bg-secondary/20 p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
          <div className="flex items-center gap-3">
            <span className={cn("px-2.5 py-0.5 rounded-full border text-xs font-mono font-semibold", current.color)}>
              {current.badge}
            </span>
            <h4 className="font-serif text-lg font-medium text-foreground">
              {current.title}
            </h4>
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            Target: {current.file}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
          {current.description}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-1">
          {/* Key Invariants */}
          <div className="space-y-2 p-4 rounded-xl bg-card border border-border/80">
            <span className="text-xs font-mono text-primary font-bold uppercase block">
              Architectural Invariants &amp; Rules
            </span>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              {current.details.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Code Representation */}
          <div className="space-y-2 p-4 rounded-xl bg-black border border-border text-blue-400 font-mono text-xs overflow-x-auto">
            <span className="text-[10px] text-muted-foreground/80 uppercase block pb-1 border-b border-border">
              Runtime Representation Preview
            </span>
            <pre className="leading-relaxed pt-1">
              <code>{current.codeSnippet}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   2. PYTHON MEMORY MODEL & SMALL INT CACHE (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function PythonMemoryModelFlowchart() {
  const [testNumber, setTestNumber] = useState<number>(42)
  const [highlightName, setHighlightName] = useState<string | null>(null)

  const isCached = testNumber >= -5 && testNumber <= 256

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Memory Model &amp; Pointer Binding
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Namespace Symbol Table vs. Heap PyObject Allocations
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-muted-foreground">Test Integer:</span>
          {[42, 256, 1000].map((num) => (
            <button
              key={num}
              onClick={() => setTestNumber(num)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono border transition-all cursor-pointer",
                testNumber === num
                  ? "border-primary bg-primary/10 text-primary font-bold shadow-2xs"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              n = {num}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
        Python variables are not boxes that hold values; they are name tags (pointers) pointing to dynamically allocated PyObject structures on the Heap. Observe how numbers within [-5, 256] share a static pre-allocated singleton address.
      </p>

      {/* Visual Memory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Local Symbol Table */}
        <div className="p-5 rounded-2xl border border-border bg-secondary/20 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-xs font-mono font-bold text-foreground uppercase">
              Local Symbol Table (Namespace)
            </span>
            <span className="text-[10px] font-mono text-muted-foreground">dict: locals()</span>
          </div>

          <div className="space-y-2 font-mono text-xs">
            <div
              onMouseEnter={() => setHighlightName("a")}
              onMouseLeave={() => setHighlightName(null)}
              className={cn(
                "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                highlightName === "a"
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">var 'a'</span>
                <span className="text-[10px] text-muted-foreground">Name Pointer</span>
              </div>
              <span className="text-primary font-bold">
                &rarr; {isCached ? "0x0040_STATIC" : "0x7FFF_HEAP_1"}
              </span>
            </div>

            <div
              onMouseEnter={() => setHighlightName("b")}
              onMouseLeave={() => setHighlightName(null)}
              className={cn(
                "p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all",
                highlightName === "b"
                  ? "border-primary bg-primary/10 ring-1 ring-primary"
                  : "border-border bg-card"
              )}
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-foreground">var 'b'</span>
                <span className="text-[10px] text-muted-foreground">Name Pointer</span>
              </div>
              <span className="text-primary font-bold">
                &rarr; {isCached ? "0x0040_STATIC" : "0x7FFF_HEAP_2"}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-card border border-border text-[11px] font-mono space-y-1">
            <div className="flex justify-between text-muted-foreground">
              <span>Value Equality (a == b):</span>
              <span className="text-primary font-bold">True</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Identity Check (a is b):</span>
              <span className={cn("font-bold", isCached ? "text-primary" : "text-rose-500")}>
                {isCached ? "True (Same Singleton Address!)" : "False (Distinct Heap Blocks)"}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Heap PyObject Structure */}
        <div className="p-5 rounded-2xl border border-border bg-secondary/20 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <span className="text-xs font-mono font-bold text-foreground uppercase">
              Heap Memory (PyObject Layout)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
              {isCached ? "Small Int Cache [-5..256]" : "Standard Dynamic Heap"}
            </span>
          </div>

          <div className="p-4 rounded-xl border border-primary/40 bg-card space-y-2.5 font-mono text-xs shadow-xs">
            <div className="flex items-center justify-between border-b border-border pb-2">
              <span className="font-bold text-foreground">PyLongObject</span>
              <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded">
                Address: {isCached ? "0x0040_STATIC" : "0x7FFF_HEAP_1"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="p-2 rounded bg-secondary/50">
                <span className="text-[10px] text-muted-foreground block">ob_refcnt</span>
                <span className="text-foreground font-bold">{isCached ? "200+ (System wide)" : "2 (vars a & b)"}</span>
              </div>
              <div className="p-2 rounded bg-secondary/50">
                <span className="text-[10px] text-muted-foreground block">ob_type</span>
                <span className="text-foreground">&rarr; &lt;class 'int'&gt;</span>
              </div>
              <div className="p-2 rounded bg-secondary/50 col-span-2">
                <span className="text-[10px] text-muted-foreground block">ob_ival (Payload)</span>
                <span className="text-primary font-bold text-sm">{testNumber}</span>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground leading-snug">
            {isCached
              ? "Because -5 <= n <= 256, CPython reuses an internal pre-allocated array of singletons, saving memory and eliminating allocation overhead."
              : "Because n > 256, CPython allocates a brand-new PyLongObject structure on the Heap with a distinct memory address for each literal."}
          </p>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   3. PYTHON GIL VS ASYNCIO VS MULTIPROCESSING (VISUAL DIAGRAM)
   ═══════════════════════════════════════════════════════════════════════════ */
export function PythonGilAsyncioFlowchart() {
  const [mode, setMode] = useState<"gil" | "asyncio" | "multiprocess">("asyncio")

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Concurrency &amp; Execution Model
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            The GIL vs. Asyncio Event Loop vs. Multiprocessing
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border">
          <button
            onClick={() => setMode("gil")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer",
              mode === "gil" ? "bg-primary text-primary-foreground font-semibold shadow-2xs" : "text-muted-foreground"
            )}
          >
            Threads &amp; GIL
          </button>
          <button
            onClick={() => setMode("asyncio")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer",
              mode === "asyncio" ? "bg-primary text-primary-foreground font-semibold shadow-2xs" : "text-muted-foreground"
            )}
          >
            Asyncio Reactor
          </button>
          <button
            onClick={() => setMode("multiprocess")}
            className={cn(
              "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer",
              mode === "multiprocess" ? "bg-primary text-primary-foreground font-semibold shadow-2xs" : "text-muted-foreground"
            )}
          >
            Multiprocessing
          </button>
        </div>
      </div>

      {mode === "gil" && (
        <div className="p-6 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-indigo-500 uppercase">
              CPython Multi-Threading with Global Interpreter Lock
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400">
              Shared Heap + Serialized Bytecode
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            The GIL ensures only one OS thread executes Python bytecode at any moment, serializing CPU computation. For network I/O, threads release the GIL during syscalls.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-card border border-border font-mono text-xs space-y-2">
              <span className="text-primary font-bold">Thread 1 (Core 0):</span>
              <div className="p-2 rounded bg-primary/10 text-primary">
                Holds GIL &rarr; Executing bytecode
              </div>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border font-mono text-xs space-y-2">
              <span className="text-muted-foreground font-bold">Thread 2 (Core 1):</span>
              <div className="p-2 rounded bg-rose-500/10 text-rose-500">
                Waits for GIL &rarr; Blocked (0% Core Utilization)
              </div>
            </div>
          </div>
        </div>
      )}

      {mode === "asyncio" && (
        <div className="p-6 rounded-2xl border border-primary/30 bg-primary/5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-primary uppercase">
              Asyncio Event Loop (Reactor Pattern)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
              Single Thread &middot; 50k+ Concurrent I/O
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            A single-threaded non-blocking event loop demultiplexes I/O using epoll / kqueue. When a coroutine awaits an I/O network socket, it yields control, enabling other coroutines to execute without context-switching overhead.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-card border border-border font-mono text-xs space-y-1">
              <span className="font-bold text-foreground">Task 1: Fetch User</span>
              <p className="text-[11px] text-muted-foreground">Encountered await &rarr; Yields to loop</p>
            </div>
            <div className="p-3.5 rounded-xl bg-card border border-primary/40 bg-primary/10 font-mono text-xs space-y-1">
              <span className="font-bold text-primary">Task 2: Match Order</span>
              <p className="text-[11px] text-foreground">Actively executing CPU logic</p>
            </div>
            <div className="p-3.5 rounded-xl bg-card border border-border font-mono text-xs space-y-1">
              <span className="font-bold text-foreground">Task 3: WebSocket Push</span>
              <p className="text-[11px] text-muted-foreground">Queued in ready ring buffer</p>
            </div>
          </div>
        </div>
      )}

      {mode === "multiprocess" && (
        <div className="p-6 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-purple-500 uppercase">
              ProcessPoolExecutor (Parallel CPU Execution)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400">
              Isolated Memory Spaces &middot; Multi-Core
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Spawns independent OS child processes via fork() / spawn, each possessing its own CPython interpreter and isolated GIL. Bypasses the GIL entirely for CPU-bound computations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            <div className="p-4 rounded-xl bg-card border border-border space-y-1">
              <span className="text-primary font-bold">Process 1 (PID 101, Core 0):</span>
              <p className="text-muted-foreground">100% Core 0 &middot; Isolated CPython VM</p>
            </div>
            <div className="p-4 rounded-xl bg-card border border-border space-y-1">
              <span className="text-primary font-bold">Process 2 (PID 102, Core 1):</span>
              <p className="text-muted-foreground">100% Core 1 &middot; Isolated CPython VM</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   4. REGEX STATE AUTOMATA FLOWCHART (INTERACTIVE NFA/DFA ENGINE)
   ═══════════════════════════════════════════════════════════════════════════ */
export function RegexStateAutomataFlowchart() {
  const [patternType, setPatternType] = useState<"phone" | "hashtag" | "greedy">("phone")
  const [testInput, setTestInput] = useState("415-867-5309")

  const configs = {
    phone: {
      regex: String.raw`^(\d{3})-(\d{3})-(\d{4})$`,
      description: "Captures 3-digit area code, 3-digit prefix, and 4-digit line number using numbered capture groups.",
      states: [
        { id: "s0", label: "START (^)", desc: "Anchor at string head" },
        { id: "s1", label: "Group 1: \\d{3}", desc: "Matches 3 digits" },
        { id: "s2", label: "Literal '-'", desc: "Delimiter hyphen" },
        { id: "s3", label: "Group 2: \\d{3}", desc: "Matches 3 digits" },
        { id: "s4", label: "Literal '-'", desc: "Delimiter hyphen" },
        { id: "s5", label: "Group 3: \\d{4}", desc: "Matches 4 digits" },
        { id: "s6", label: "ACCEPT ($)", desc: "Anchor at string tail" }
      ],
      defaultVal: "415-867-5309",
      validator: (val: string) => /^\d{3}-\d{3}-\d{4}$/.test(val)
    },
    hashtag: {
      regex: String.raw`#\w+`,
      description: "Extracts social media hashtags starting with '#' followed by one or more alphanumeric characters.",
      states: [
        { id: "s0", label: "SCANNING", desc: "Searches character stream" },
        { id: "s1", label: "Prefix '#'", desc: "Matches literal hash symbol" },
        { id: "s2", label: "\\w+ (1 or more)", desc: "Consumes letters, numbers, underscores" },
        { id: "s3", label: "TOKEN EMITTED", desc: "Appends to match list" }
      ],
      defaultVal: "Exploring #Python3 and #Algorithms in ASCI",
      validator: (val: string) => /#\w+/.test(val)
    },
    greedy: {
      regex: String.raw`<.*?> vs <.*>`,
      description: "Compares lazy quantifier (.*?) matching shortest tag vs greedy quantifier (.*) consuming across multiple tags.",
      states: [
        { id: "s0", label: "Literal '<'", desc: "Matches tag start" },
        { id: "s1", label: "Non-Greedy (.*?)", desc: "Stops at FIRST closing '>'" },
        { id: "s2", label: "Greedy (.*)", desc: "Backtracks until LAST closing '>'" },
        { id: "s3", label: "RESULT", desc: "Minimal match vs maximal greedy match" }
      ],
      defaultVal: "<div><span>Warm Ink & Pearl</span></div>",
      validator: (val: string) => /<.*?>/.test(val)
    }
  }

  const activeConfig = configs[patternType]
  const isMatch = activeConfig.validator(testInput)

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Regular Expression Engine (re Module)
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Finite State Automaton &amp; Backtracking Simulator
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border">
          {(["phone", "hashtag", "greedy"] as const).map((key) => (
            <button
              key={key}
              onClick={() => {
                setPatternType(key)
                setTestInput(configs[key].defaultVal)
              }}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer capitalize",
                patternType === key
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground"
              )}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-secondary/30 border border-border space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">Compiled Pattern:</span>
            <code className="text-xs font-mono bg-card px-2.5 py-1 rounded-lg border border-border text-primary font-bold">
              {activeConfig.regex}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-muted-foreground">Engine Status:</span>
            <span
              className={cn(
                "text-xs font-mono font-bold px-2.5 py-0.5 rounded-full",
                isMatch
                  ? "bg-primary/10 text-primary border border-primary/30"
                  : "bg-rose-500/10 text-rose-500 border border-rose-500/30"
              )}
            >
              {isMatch ? "MATCH ACCEPTED" : "REJECTED (NO MATCH)"}
            </span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-muted-foreground uppercase">
            Test Input Buffer:
          </label>
          <input
            type="text"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            className="w-full bg-card border border-border rounded-xl px-3.5 py-2 text-xs font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Type sample string to test pattern..."
          />
        </div>
      </div>

      {/* State Graph Nodes */}
      <div className="space-y-3">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
          NFA State Transition Pipeline
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {activeConfig.states.map((st, idx) => (
            <div
              key={st.id}
              className={cn(
                "p-3 rounded-xl border flex flex-col justify-between text-center transition-all",
                isMatch
                  ? "border-primary/30 bg-primary/5 text-primary"
                  : "border-border bg-card text-muted-foreground"
              )}
            >
              <span className="text-[10px] font-mono text-primary font-bold">q{idx}</span>
              <span className="text-xs font-mono font-bold my-1 text-foreground">{st.label}</span>
              <span className="text-[9px] text-muted-foreground leading-tight">{st.desc}</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        {activeConfig.description}
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   5. FILESYSTEM BUFFER & STREAM LIFECYCLE FLOWCHART
   ═══════════════════════════════════════════════════════════════════════════ */
export function FileSystemStreamFlowchart() {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      title: "1. Userspace: Context Manager (__enter__)",
      code: "with open('dataset.txt', 'r', encoding='utf-8') as f:",
      layer: "Python Process (Userspace)",
      detail: "Requests the operating system kernel to allocate a file descriptor (FD). Stores PyTextIOWrapper object in the local variable 'f'."
    },
    {
      title: "2. Kernel Space: VFS & Syscall open()",
      code: "sys_open(path, O_RDONLY) -> fd = 3",
      layer: "Linux/Windows Kernel Space",
      detail: "The kernel resolves path permissions via the Virtual File System (VFS), checks inode tables, and assigns lowest available file descriptor integer (e.g. fd=3)."
    },
    {
      title: "3. Buffered Stream: C-Level 8KB Page Cache",
      code: "f.read(1024) -> reads from stdio buffer",
      layer: "C Runtime Buffer (I/O Cache)",
      detail: "CPython pre-reads 8,192 bytes into an internal buffer. Subsequent small reads consume bytes from RAM without triggering expensive OS context switches."
    },
    {
      title: "4. Context Manager Exit (__exit__)",
      code: "f.close() -> flush buffers, sys_close(fd)",
      layer: "Kernel Reclamation",
      detail: "Even if an uncaught exception is raised inside the block, Python guarantees __exit__() executes, flushing pending writes and returning fd=3 to the OS kernel."
    }
  ]

  const current = steps[activeStep]

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Operating System I/O Architecture
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            Buffered Streams, Page Cache &amp; Context Managers
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border">
          {steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer",
                activeStep === idx
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground"
              )}
            >
              Step {idx + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-5 rounded-2xl border border-primary/30 bg-secondary/20 space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-border pb-2">
            <span className="text-primary font-bold">{current.layer}</span>
            <span className="text-[10px] text-muted-foreground">Step {activeStep + 1} of 4</span>
          </div>
          <div className="p-3 bg-card border border-border rounded-xl text-primary">
            <code>{current.code}</code>
          </div>
          <p className="text-xs text-muted-foreground font-sans leading-relaxed">
            {current.detail}
          </p>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-3 font-mono text-xs">
          <span className="text-xs font-bold text-foreground block">
            Kernel vs Userspace Memory Boundary
          </span>
          <div className="space-y-2">
            <div className={cn("p-2.5 rounded-xl border transition-all", activeStep === 0 || activeStep === 3 ? "border-primary bg-primary/10 text-primary font-bold" : "border-border text-muted-foreground")}>
              Userspace: Python PyTextIOWrapper (RAM)
            </div>
            <div className={cn("p-2.5 rounded-xl border transition-all", activeStep === 2 ? "border-indigo-500 bg-indigo-500/10 text-indigo-400 font-bold" : "border-border text-muted-foreground")}>
              Intermediate: 8KB stdio Buffer
            </div>
            <div className={cn("p-2.5 rounded-xl border transition-all", activeStep === 1 ? "border-purple-500 bg-purple-500/10 text-purple-400 font-bold" : "border-border text-muted-foreground")}>
              Kernel Space: OS File Descriptor Table (FD 3)
            </div>
            <div className="p-2.5 rounded-xl border border-border text-muted-foreground">
              Hardware: Storage Controller (NVMe / SSD Blocks)
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   6. SQLITE ACID & B-TREE PIPELINE FLOWCHART
   ═══════════════════════════════════════════════════════════════════════════ */
export function SqliteAcidPipelineFlowchart() {
  const [stage, setStage] = useState<"query" | "btree" | "wal" | "acid">("wal")

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Relational Persistence Architecture
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            SQLite B-Tree Indexing &amp; Write-Ahead Logging (WAL)
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-secondary/50 p-1 rounded-xl border border-border">
          {(["query", "btree", "wal", "acid"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStage(s)}
              className={cn(
                "px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer uppercase",
                stage === s
                  ? "bg-primary text-primary-foreground font-semibold shadow-2xs"
                  : "text-muted-foreground"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {stage === "query" && (
        <div className="p-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-blue-400 font-bold">
            <span>SQL Parsing &amp; Prepared Statements</span>
            <span className="text-[10px] bg-blue-500/10 px-2 py-0.5 rounded">SQL Injection Defense</span>
          </div>
          <p className="text-muted-foreground font-sans text-xs">
            Using parameter placeholders (<code className="text-primary font-bold">?</code>) compiles the SQL statement once into a byte-code VDBE (Virtual Database Engine) program. Values are bound strictly as data literals, rendering SQL injection attacks impossible.
          </p>
          <div className="p-3 bg-card border border-border rounded-xl text-foreground">
            <code>cursor.execute("SELECT * FROM users WHERE email = ?", (user_input,))</code>
          </div>
        </div>
      )}

      {stage === "btree" && (
        <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/5 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-purple-400 font-bold">
            <span>B-Tree Page Lookups &amp; Indexes</span>
            <span className="text-[10px] bg-purple-500/10 px-2 py-0.5 rounded">O(log N) Complexity</span>
          </div>
          <p className="text-muted-foreground font-sans text-xs">
            SQLite organizes tables and indexes into 4KB pages structured as balanced B-Trees. An index on a column allows point queries to locate matching rowids in logarithmic time instead of scanning every table row.
          </p>
          <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
            <div className="p-2.5 rounded-lg bg-card border border-border">Root Page (Depth 0)</div>
            <div className="p-2.5 rounded-lg bg-card border border-purple-500/40 text-purple-400 font-bold">Internal Page (Depth 1)</div>
            <div className="p-2.5 rounded-lg bg-card border border-border">Leaf Page (Data Rows)</div>
          </div>
        </div>
      )}

      {stage === "wal" && (
        <div className="p-5 rounded-2xl border border-indigo-500/30 bg-indigo-500/5 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-indigo-400 font-bold">
            <span>Write-Ahead Logging (WAL Mode)</span>
            <span className="text-[10px] bg-indigo-500/10 px-2 py-0.5 rounded">PRAGMA journal_mode = WAL</span>
          </div>
          <p className="text-muted-foreground font-sans text-xs">
            In WAL mode, writes do not alter the main database file directly. Instead, new transactions append sequentially to the <code className="text-primary">.db-wal</code> file. This allows readers to continue querying without being blocked by concurrent writers.
          </p>
          <div className="grid grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-xl bg-card border border-border space-y-1">
              <span className="font-bold text-foreground">Main File (.db)</span>
              <p className="text-muted-foreground text-[10px]">Unmodified snapshot used by readers</p>
            </div>
            <div className="p-3 rounded-xl bg-card border border-indigo-500/40 text-indigo-400 space-y-1 font-bold">
              <span>WAL File (.db-wal)</span>
              <p className="text-muted-foreground text-[10px] font-normal">New transactions appended; flushed on checkpoint</p>
            </div>
          </div>
        </div>
      )}

      {stage === "acid" && (
        <div className="p-5 rounded-2xl border border-primary/30 bg-primary/5 space-y-3 font-mono text-xs">
          <div className="flex justify-between items-center text-primary font-bold">
            <span>ACID Transaction Guarantee</span>
            <span className="text-[10px] bg-primary/10 px-2 py-0.5 rounded">conn.commit() &amp; conn.rollback()</span>
          </div>
          <p className="text-muted-foreground font-sans text-xs">
            Transactions guarantee Atomicity (all-or-nothing), Consistency (schema constraints respected), Isolation (readers see consistent snapshots), and Durability (synced to disk via fsync).
          </p>
          <div className="p-3 bg-card border border-border rounded-xl text-primary">
            <code>try: cursor.execute(...); conn.commit()<br />except Exception: conn.rollback()</code>
          </div>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   7. GUI AUTOMATION & SCREEN COORDINATES FLOWCHART
   ═══════════════════════════════════════════════════════════════════════════ */
export function GuiEventMatrixFlowchart() {
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number }>({ x: 960, y: 540 })
  const isFailsafe = cursorPos.x === 0 && cursorPos.y === 0

  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
            Human-Interface System Automation
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-normal text-foreground">
            PyAutoGUI Screen Coordinate Matrix &amp; Safety Failsafes
          </h3>
        </div>
        <button
          onClick={() => setCursorPos(isFailsafe ? { x: 960, y: 540 } : { x: 0, y: 0 })}
          className={cn(
            "px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border",
            isFailsafe
              ? "bg-rose-500 text-white border-rose-600 shadow-md"
              : "bg-secondary text-foreground border-border hover:border-primary"
          )}
        >
          {isFailsafe ? "Reset from Failsafe" : "Trigger (0,0) Failsafe"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-5 rounded-2xl border border-border bg-secondary/30 relative aspect-video flex flex-col justify-between overflow-hidden">
          <div className="flex justify-between items-start text-[11px] font-mono">
            <span className={cn("px-2 py-1 rounded transition-colors", isFailsafe ? "bg-rose-500 text-white font-bold animate-pulse" : "bg-card border border-border text-primary")}>
              Origin (0, 0) - FAILSAFE ZONE
            </span>
            <span className="bg-card px-2 py-1 rounded border border-border text-muted-foreground">
              (1920, 0)
            </span>
          </div>

          {/* Simulated Cursor Target */}
          <div
            className="absolute transition-all duration-300 pointer-events-none"
            style={{
              left: `${(cursorPos.x / 1920) * 85 + 5}%`,
              top: `${(cursorPos.y / 1080) * 75 + 10}%`
            }}
          >
            <div className="flex items-center gap-1.5 -translate-x-1/2 -translate-y-1/2">
              <div className="w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/30 shadow-lg animate-ping absolute" />
              <div className="w-3.5 h-3.5 rounded-full bg-primary relative" />
              <span className="text-[10px] font-mono font-bold bg-card border border-border px-1.5 py-0.5 rounded shadow-xs whitespace-nowrap">
                ({cursorPos.x}, {cursorPos.y})
              </span>
            </div>
          </div>

          <div className="flex justify-between items-end text-[11px] font-mono">
            <span className="bg-card px-2 py-1 rounded border border-border text-muted-foreground">
              (0, 1080)
            </span>
            <span className="bg-card px-2 py-1 rounded border border-border text-muted-foreground">
              (1920, 1080) Bottom-Right
            </span>
          </div>
        </div>

        <div className="space-y-3 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-card border border-border space-y-2">
            <span className="text-muted-foreground text-[11px] uppercase block">
              PyAutoGUI Active Position:
            </span>
            <div className="text-lg font-bold text-foreground">
              X: {cursorPos.x}px | Y: {cursorPos.y}px
            </div>
            <div className="text-[11px] text-muted-foreground">
              Screen Resolution: 1920 x 1080
            </div>
          </div>

          <div
            className={cn(
              "p-4 rounded-2xl border transition-all space-y-1.5",
              isFailsafe
                ? "border-rose-500 bg-rose-500/10 text-rose-400"
                : "border-primary/30 bg-primary/5 text-primary"
            )}
          >
            <span className="font-bold block">
              {isFailsafe ? "pyautogui.FailSafeException Raised!" : "FailSafe Active (Normal)"}
            </span>
            <p className="text-[11px] font-sans text-muted-foreground leading-snug">
              {isFailsafe
                ? "Slamming the mouse into any screen corner triggers an emergency abort, stopping rogue automation scripts immediately."
                : "pyautogui.FAILSAFE is True by default with a 0.1s pause between commands to allow user intervention."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   8. ADAPTIVE PYTHON LESSON FLOWCHART DISPATCHER
   ═══════════════════════════════════════════════════════════════════════════ */
export function VisualPythonLessonFlowchart({
  lessonId,
  title,
  flowchartText
}: {
  lessonId: string
  title: string
  flowchartText?: string
}) {
  const s = lessonId.toLowerCase()
  const t = title.toLowerCase()

  if (s.includes("cpython") || s.includes("architecture") || s.includes("1-1")) {
    return <CPythonPipelineFlowchart />
  }
  if (s.includes("variable") || s.includes("memory") || s.includes("1-2") || s.includes("2-1")) {
    return <PythonMemoryModelFlowchart />
  }
  if (s.includes("regex") || s.includes("pattern") || s.includes("9-1") || t.includes("regex") || t.includes("pattern matching")) {
    return <RegexStateAutomataFlowchart />
  }
  if (s.includes("file") || s.includes("stream") || s.includes("10-1") || t.includes("file") || t.includes("filesystem")) {
    return <FileSystemStreamFlowchart />
  }
  if (s.includes("sqlite") || s.includes("database") || s.includes("14-1") || s.includes("16-1") || t.includes("sqlite")) {
    return <SqliteAcidPipelineFlowchart />
  }
  if (s.includes("gui") || s.includes("mouse") || s.includes("keyboard") || s.includes("20-1") || s.includes("23-1") || t.includes("gui")) {
    return <GuiEventMatrixFlowchart />
  }
  if (s.includes("gil") || s.includes("asyncio") || s.includes("concurrency") || s.includes("8-1") || s.includes("23-1") || s.includes("24-1")) {
    return <PythonGilAsyncioFlowchart />
  }

  // Fallback to Smart Visual Diagram Renderer
  return (
    <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5 shadow-sm">
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-primary font-semibold block">
          Visual Python Runtime Schematic
        </span>
        <h3 className="font-serif text-xl font-medium text-foreground">
          {title}
        </h3>
      </div>
      <div className="rounded-2xl border border-primary/20 bg-secondary/20 p-5 font-mono text-xs text-primary overflow-x-auto shadow-inner leading-relaxed">
        <pre>{flowchartText || "Architectural state model initializing..."}</pre>
      </div>
    </div>
  )
}

