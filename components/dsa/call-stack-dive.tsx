"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, ChevronRight, ChevronLeft, Terminal, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

type FramePhase = "calling" | "waiting" | "resolving";

interface StackFrame {
  id: string;
  n: number;
  phase: FramePhase;
  returnValue?: number;
}

interface TraceStep {
  activeLine: number | null;
  stack: StackFrame[];
  logMsg: string;
}

function buildTrace(nStart: number): TraceStep[] {
  const trace: TraceStep[] = [];
  let currentStack: StackFrame[] = [];

  function logTrace(line: number | null, msg: string) {
    trace.push({
      activeLine: line,
      stack: JSON.parse(JSON.stringify(currentStack)),
      logMsg: msg,
    });
  }

  logTrace(null, `Ready. Calling factorial(${nStart})...`);

  function fact(n: number): number {
    const frameId = `fact-${n}`;
    currentStack.push({ id: frameId, n, phase: "calling" });
    logTrace(1, `Add to stack: fact(${n})`);

    logTrace(2, `Check: is n (${n}) equal to 1?`);
    if (n === 1) {
      logTrace(3, `Base case reached: fact(1) returns 1`);
      currentStack[currentStack.length - 1].phase = "resolving";
      currentStack[currentStack.length - 1].returnValue = 1;
      logTrace(3, `Done: fact(1) returned 1. Removing from stack.`);

      currentStack.pop();
      return 1;
    }

    logTrace(4, `Recursive call: fact(${n}) waits for fact(${n - 1})`);
    currentStack[currentStack.length - 1].phase = "waiting";
    logTrace(4, `Paused: fact(${n}) waiting for sub-result`);

    const childVal = fact(n - 1);

    logTrace(4, `Resume: fact(${n}) received answer = ${childVal}`);
    const myVal = n * childVal;
    
    // Find matching frame
    const frameIndex = currentStack.findIndex(f => f.id === frameId);
    if (frameIndex !== -1) {
      currentStack[frameIndex].phase = "resolving";
      currentStack[frameIndex].returnValue = myVal;
    }
    logTrace(4, `Result: ${n} * ${childVal} = ${myVal}`);

    currentStack.pop();
    logTrace(null, `Remove from stack: fact(${n})`);
    return myVal;
  }

  fact(nStart);
  logTrace(null, `Execution finished. Stack is empty.`);
  return trace;
}

const PYTHON_CODE = `def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)`;

export default function CallStackDive() {
  const [nInput, setNInput] = useState<number>(4);
  const [trace, setTrace] = useState<TraceStep[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [mounted, setMounted] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setTrace(buildTrace(nInput));
    setCurrentStep(0);
  }, [nInput]);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentStep]);

  const activeState = trace[currentStep] || { activeLine: null, stack: [], logMsg: "" };
  const historyLogs = trace.slice(0, currentStep + 1);
  const reversedStack = [...activeState.stack].reverse();

  const handleNext = () => {
    if (currentStep < trace.length - 1) setCurrentStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  if (!mounted) return null;

  return (
    <div className="flex-1 w-full bg-[#181715] text-[#faf9f5] font-sans overflow-hidden flex flex-col">
      {/* Top Header Bar */}
      <div className="px-6 py-4 border-b border-white/10 bg-[#141413] flex items-center justify-between shrink-0">
         <div className="flex items-center gap-3">
            <Layers className="text-[#ea580c]" size={18} />
            <h2 className="font-mono text-xs uppercase tracking-widest font-semibold text-[#faf9f5]">
              Call Stack Visualizer
            </h2>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#ea580c]"></div>
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-wider">Step {currentStep + 1} of {trace.length}</span>
         </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-10 divide-y lg:divide-y-0 lg:divide-x divide-white/10 overflow-hidden">
        
        {/* PANEL 1: Code Viewer (30%) */}
        <div className="lg:col-span-3 bg-[#181715] p-6 flex flex-col">
          <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
            <Terminal size={14} className="text-[#ea580c]" />
            Code
          </h3>
          <div className="bg-[#100f0e] border border-white/10 rounded-xl p-4 font-mono text-xs overflow-x-auto relative">
            {PYTHON_CODE.split("\n").map((line, idx) => {
              const lineNum = idx + 1;
              const isActive = activeState.activeLine === lineNum;
              return (
                <div 
                  key={lineNum} 
                  className={cn(
                    "flex items-center px-2 py-1 transition-colors duration-200 rounded",
                    isActive ? "bg-[#ea580c]/15 text-white font-medium border-l-2 border-[#ea580c]" : "border-l-2 border-transparent text-zinc-200"
                  )}
                >
                  <span className="w-6 shrink-0 text-zinc-400 text-[11px] select-none">{lineNum}</span>
                  <span className={cn("whitespace-pre")}>{line}</span>
                  {isActive && (
                    <motion.div 
                      layoutId="active-line-indicator"
                      className="ml-auto text-[#ea580c]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <ChevronLeft size={14} />
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-[11px] font-mono text-zinc-500 leading-relaxed">
            The highlighted line shows the code line running right now.
          </div>
        </div>

        {/* PANEL 2: Vertical Call Stack (40%) */}
        <div className="lg:col-span-4 bg-[#141413] flex flex-col min-h-[460px]">
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
              Call Stack (Last In, First Out)
            </h3>
            <span className="text-[10px] font-mono text-zinc-500">
              Top = Running Now
            </span>
          </div>

          <div className="flex-1 p-6 flex flex-col gap-3 justify-end relative overflow-y-auto">
            {reversedStack.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-mono text-xs uppercase tracking-widest">
                    [ Stack Memory Empty ]
                </div>
            )}
            <AnimatePresence mode="popLayout">
              {reversedStack.map((frame, index) => {
                const isTop = index === 0;
                let borderClass = "border-white/10 bg-[#1e1d1a]";
                let textAccent = "text-zinc-200";

                if (frame.phase === "resolving") {
                    borderClass = "border-[#ea580c]/50 bg-[#ea580c]/10";
                    textAccent = "text-[#ea580c]";
                } else if (isTop) {
                    borderClass = "border-[#ea580c] bg-[#ea580c]/10";
                    textAccent = "text-[#ea580c]";
                }

                return (
                  <motion.div
                    key={`${frame.id}-${frame.phase}`}
                    layout
                    initial={{ opacity: 0, y: -20, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className={cn(
                      "flex flex-col p-4 border rounded-xl shadow-md", borderClass
                    )}
                  >
                     <div className="flex justify-between items-center mb-1">
                        <span className={cn("font-mono font-bold text-xs uppercase tracking-wider", textAccent)}>
                            factorial({frame.n})
                        </span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-black/40 text-zinc-300 border border-white/5">
                            {frame.phase}
                        </span>
                     </div>
                     
                     <div className="font-mono text-xs text-zinc-400 mt-1">
                        {frame.phase === "calling" && `Allocating local variables (n=${frame.n})...`}
                        {frame.phase === "waiting" && `Suspended awaiting factorial(${frame.n - 1})`}
                        {frame.phase === "resolving" && (
                            <div className="flex items-center gap-2">
                                <span className="text-zinc-400">Return value:</span>
                                <span className="text-[#ea580c] font-bold text-sm">{frame.returnValue}</span>
                            </div>
                        )}
                     </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* PANEL 3: Control Deck & Terminal (30%) */}
        <div className="lg:col-span-3 bg-[#181715] flex flex-col">
          {/* Controls */}
          <div className="p-6 border-b border-white/10">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-4">
              Step Controls
            </h3>
            
            <div className="flex items-center gap-3 mb-6">
                <label className="text-xs font-mono text-zinc-400">Number n:</label>
                <input 
                    type="number" 
                    min={1} 
                    max={5} 
                    value={nInput}
                    onChange={(e) => {
                        const v = parseInt(e.target.value);
                        if(v >= 1 && v <= 5) setNInput(v);
                    }}
                    className="w-16 bg-[#100f0e] border border-white/15 rounded-lg py-1.5 px-2 font-mono text-center text-[#ea580c] text-sm focus:outline-none focus:border-[#ea580c]"
                />
                <span className="text-[10px] font-mono text-zinc-500">(1 to 5)</span>
            </div>

            <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center justify-center p-2.5 bg-[#141413] border border-white/10 rounded-xl text-zinc-300 hover:text-white hover:border-white/30 disabled:opacity-40 transition-colors cursor-pointer"
                  title="Step Backward"
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={handleNext}
                  disabled={currentStep === trace.length - 1}
                  className="flex items-center justify-center gap-1.5 p-2.5 bg-[#ea580c] text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#c2410c] disabled:opacity-40 transition-all shadow-xs cursor-pointer"
                >
                  <span>Step</span>
                  <ChevronRight size={14} />
                </button>
                <button 
                  onClick={handleReset}
                  className="flex items-center justify-center p-2.5 bg-[#141413] border border-white/10 rounded-xl text-zinc-300 hover:text-white hover:border-white/30 transition-colors cursor-pointer"
                  title="Reset Simulator"
                >
                   <RotateCcw size={14} />
                </button>
            </div>
          </div>

          {/* Syslog Output */}
          <div className="flex-1 p-6 flex flex-col min-h-[220px]">
             <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 mb-3 flex items-center gap-2">
               <span className="w-1.5 h-1.5 bg-[#ea580c] rounded-full" />
               Activity Log
             </h3>
             <div className="bg-[#100f0e] border border-white/10 rounded-xl flex-1 overflow-y-auto p-4 font-mono text-[11px] text-zinc-400 space-y-1.5 shadow-inner">
                {historyLogs.map((log, i) => {
                    const isLatest = i === historyLogs.length - 1;
                    const isHighlight = log.logMsg.includes("BASE CASE") || log.logMsg.includes("RESOLVING");
                    const isReturn = log.logMsg.includes("POP");
                    
                    return (
                        <div key={i} className={cn(
                            "leading-relaxed transition-colors duration-200",
                            isLatest ? "text-emerald-400 font-semibold" : (isHighlight ? "text-[#ea580c]" : (isReturn ? "text-amber-400" : "text-zinc-300 font-normal"))
                        )}>
                            › {log.logMsg}
                        </div>
                    );
                })}
                <div ref={terminalEndRef} />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
