"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Play, RotateCcw, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface MemoryCell {
  address: string;
  char: string;
  ascii: number;
  binary: string;
  revealed: boolean;
}

function toBinary(n: number): string {
  return n.toString(2).padStart(8, "0");
}

export default function RamInspector() {
  const [inputWord, setInputWord] = useState("DOG");
  const [cells, setCells] = useState<MemoryCell[]>(() => {
    return "DOG".split("").map((char, i) => ({
      address: `0x${(i + 1).toString(16).padStart(2, "0").toUpperCase()}`,
      char,
      ascii: char.charCodeAt(0),
      binary: toBinary(char.charCodeAt(0)),
      revealed: false,
    }));
  });
  const [isRunning, setIsRunning] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [phase, setPhase] = useState<"idle" | "ascii" | "binary" | "done">("idle");
  const [logs, setLogs] = useState<string[]>(["SYSTEM: RAM Byte-Inspector online."]);
  const logRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef(false);

  useEffect(() => {
    return () => {
      abortRef.current = true;
    };
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const pushLog = (msg: string) => setLogs((p) => [...p, msg]);

  const handleWordChange = (newWord: string) => {
    abortRef.current = true;
    setIsRunning(false);
    setActiveIdx(-1);
    setPhase("idle");
    const cleaned = newWord.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 8);
    setInputWord(cleaned);
    const newCells = cleaned.split("").map((char, i) => ({
      address: `0x${(i + 1).toString(16).padStart(2, "0").toUpperCase()}`,
      char,
      ascii: char.charCodeAt(0),
      binary: toBinary(char.charCodeAt(0)),
      revealed: false,
    }));
    setCells(newCells);
    setLogs([`SYSTEM: Buffer set to "${cleaned}". Click Inspect to write to RAM.`]);
  };

  const runInspection = async () => {
    if (isRunning || inputWord.length === 0) return;
    abortRef.current = false;
    setIsRunning(true);

    const word = inputWord.toUpperCase().slice(0, 8);
    const newCells: MemoryCell[] = word.split("").map((char, i) => ({
      address: `0x${(i + 1).toString(16).padStart(2, "0").toUpperCase()}`,
      char,
      ascii: char.charCodeAt(0),
      binary: toBinary(char.charCodeAt(0)),
      revealed: false,
    }));

    setCells(newCells);
    setLogs([`INIT: Processing "${word}" (${word.length} bytes)...`]);

    for (let i = 0; i < newCells.length; i++) {
      if (abortRef.current) return;
      const cell = newCells[i];

      // Phase 1: Show ASCII
      setActiveIdx(i);
      setPhase("ascii");
      pushLog(`LOOKUP: '${cell.char}' → ASCII ${cell.ascii}`);
      await new Promise((r) => setTimeout(r, 800));
      if (abortRef.current) return;

      // Phase 2: Convert to binary
      setPhase("binary");
      pushLog(`ENCODE: ${cell.ascii} → ${cell.binary}`);
      await new Promise((r) => setTimeout(r, 800));
      if (abortRef.current) return;

      // Phase 3: Store in memory
      newCells[i] = { ...newCells[i], revealed: true };
      setCells([...newCells]);
      pushLog(`STORE: ${cell.binary} → ${cell.address}`);
      await new Promise((r) => setTimeout(r, 500));
      if (abortRef.current) return;
    }

    setActiveIdx(-1);
    setPhase("done");
    pushLog(`COMPLETE: ${word.length} bytes written to RAM.`);
    setIsRunning(false);
  };

  const handleReset = () => {
    abortRef.current = true;
    const resetCells = inputWord.split("").map((char, i) => ({
      address: `0x${(i + 1).toString(16).padStart(2, "0").toUpperCase()}`,
      char,
      ascii: char.charCodeAt(0),
      binary: toBinary(char.charCodeAt(0)),
      revealed: false,
    }));
    setCells(resetCells);
    setActiveIdx(-1);
    setPhase("idle");
    setLogs(["SYSTEM: Memory cleared."]);
    setIsRunning(false);
  };

  return (
    <div className="flex-1 w-full flex flex-col bg-[#050505] text-zinc-100 font-sans overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/5 bg-[#050505]/95 backdrop-blur-xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <Cpu className="text-blue-500" size={20} />
          <h2 className="font-mono text-sm uppercase tracking-widest font-black text-zinc-100">
            RAM Byte-Inspector
          </h2>
        </div>
        <div className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
          {cells.filter((c) => c.revealed).length} / {cells.length} bytes written
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-10 gap-px bg-white/5 overflow-hidden">
        {/* VISUALIZER (70%) */}
        <div className="lg:col-span-7 bg-[#09090b]/90 flex flex-col relative">
          {/* Controls */}
          <div className="p-5 border-b border-white/5 flex flex-wrap gap-4 items-center bg-black/40 shrink-0">
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">Word:</label>
              <input
                type="text"
                value={inputWord}
                onChange={(e) => handleWordChange(e.target.value)}
                disabled={isRunning}
                maxLength={8}
                className="px-3 py-2 bg-[#111113] border border-zinc-700 font-mono text-sm text-blue-400 focus:outline-none focus:border-blue-500 w-32 uppercase"
              />
            </div>
            <div className="flex gap-1">
              {["DOG", "HELLO", "CODE", "RAM"].map((w) => (
                <button
                  key={w}
                  onClick={() => handleWordChange(w)}
                  disabled={isRunning}
                  className={cn(
                    "px-2 py-1 text-[10px] font-mono uppercase border transition-all cursor-pointer",
                    inputWord === w
                      ? "bg-blue-500/20 border-blue-500/50 text-blue-400 font-bold"
                      : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600"
                  )}
                >
                  {w}
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <div className="flex gap-2">
              <button
                onClick={runInspection}
                disabled={isRunning || inputWord.length === 0}
                className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-active border border-primary/40 text-white disabled:opacity-50 transition-all uppercase font-mono text-xs font-bold tracking-widest cursor-pointer active:scale-95"
              >
                <Play size={14} /> Inspect
              </button>
              <button
                onClick={handleReset}
                disabled={isRunning}
                className="p-2 bg-zinc-900 border border-zinc-700 text-zinc-400 hover:text-white transition-all"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Memory Grid */}
          <div className="flex-1 flex flex-col items-center justify-center p-8 gap-8 overflow-y-auto">
            {/* Active Conversion Display */}
            {activeIdx >= 0 && cells[activeIdx] && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-3"
              >
                <div className="text-6xl font-mono font-black text-blue-400">{`'${cells[activeIdx].char}'`}</div>
                {phase === "ascii" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                    <div className="text-xs font-mono text-zinc-500 uppercase">ASCII Lookup</div>
                    <div className="text-3xl font-mono font-bold text-yellow-500">{cells[activeIdx].ascii}</div>
                  </motion.div>
                )}
                {phase === "binary" && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1">
                    <div className="text-xs font-mono text-zinc-500 uppercase">8-Bit Binary</div>
                    <div className="flex gap-1 justify-center">
                      {cells[activeIdx].binary.split("").map((bit, bi) => (
                        <motion.div
                          key={bi}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: bi * 0.05 }}
                          className={cn(
                            "w-8 h-10 flex items-center justify-center font-mono text-lg font-bold border rounded",
                            bit === "1"
                              ? "bg-blue-500/20 border-blue-500 text-blue-400"
                              : "bg-zinc-900 border-zinc-700 text-zinc-500"
                          )}
                        >
                          {bit}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}

            {/* Memory Cells Grid */}
            <div className="flex gap-3 flex-wrap justify-center">
              {cells.map((cell, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className={cn(
                    "w-24 border-2 rounded-lg p-3 flex flex-col items-center gap-2 transition-all duration-300",
                    activeIdx === idx
                      ? "border-blue-500 bg-blue-500/15"
                      : cell.revealed
                      ? "border-zinc-700 bg-zinc-900/50"
                      : "border-zinc-800 bg-black/30"
                  )}
                >
                  <div className="text-[9px] font-mono text-zinc-600 uppercase">{cell.address}</div>
                  <div className="text-xl font-mono font-black text-zinc-300">{cell.char}</div>
                  {cell.revealed && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1 text-center">
                      <div className="text-[10px] font-mono text-yellow-500">{cell.ascii}</div>
                      <div className="text-[8px] font-mono text-blue-400 tracking-wider">{cell.binary}</div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {cells.length === 0 && (
              <div className="text-zinc-600 font-mono text-sm uppercase tracking-widest">
                Enter a word and click Inspect to begin
              </div>
            )}
          </div>
        </div>

        {/* TERMINAL (30%) */}
        <div className="lg:col-span-3 bg-[#09090b]/90 backdrop-blur flex flex-col relative border-l border-zinc-800">
          <div className="p-4 border-b border-white/5 bg-black/40 flex items-center gap-3">
            <Zap className="text-yellow-500" size={14} />
            <span className="font-mono text-[10px] uppercase font-black tracking-widest text-zinc-400">
              Memory Log
            </span>
          </div>
          <div className="flex-1 overflow-y-auto p-4 font-mono text-[10px] text-zinc-300 space-y-1">
            {logs.map((log, i) => {
              let color = "text-zinc-300 font-medium";
              if (log.includes("LOOKUP:")) color = "text-yellow-500";
              if (log.includes("ENCODE:")) color = "text-blue-400";
              if (log.includes("STORE:")) color = "text-indigo-400";
              if (log.includes("COMPLETE:")) color = "text-emerald-400 font-bold";
              return (
                <div key={i} className={cn("leading-relaxed break-words", color)}>
                  <span className="opacity-30 mr-1">{">"}</span> {log}
                </div>
              );
            })}
            <div ref={logRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
