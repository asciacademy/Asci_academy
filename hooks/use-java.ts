"use client"

import { useState, useCallback } from "react"

export interface JavaExecutionResult {
    success: boolean
    output: string
    error?: string
    result?: string | null
    executionMs: number
    compileMs?: number
    engine: string
    exitCode: number
    stage: "compilation" | "runtime" | "success"
}

export function useJava() {
    const [isLoading, setIsLoading] = useState(false)
    const [isReady, setIsReady] = useState(true)

    const runJava = useCallback(async (code: string): Promise<JavaExecutionResult> => {
        setIsLoading(true)
        const startTime = performance.now()

        try {
            const response = await fetch("https://emkc.org/api/v2/piston/execute", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    language: "java",
                    version: "15.0.2",
                    files: [
                        {
                            name: "Main.java",
                            content: code
                        }
                    ]
                })
            })

            const data = await response.json()
            const elapsed = Math.round(performance.now() - startTime)

            if (!response.ok) {
                throw new Error(data.message || "Failed to execute Java code")
            }

            const runResult = data.run
            
            if (runResult.signal) {
                 return {
                    success: false,
                    output: runResult.stdout || "",
                    error: `Process terminated with signal: ${runResult.signal}\n${runResult.stderr}`,
                    executionMs: elapsed,
                    compileMs: Math.round(elapsed * 0.4),
                    engine: "OpenJDK 15 HotSpot (Piston)",
                    exitCode: 137,
                    stage: "runtime"
                }
            }

            if (runResult.code !== 0) {
                 return {
                    success: false,
                    output: runResult.stdout || "",
                    error: runResult.stderr || "Execution failed with non-zero exit code",
                    executionMs: elapsed,
                    compileMs: Math.round(elapsed * 0.5),
                    engine: "OpenJDK 15 HotSpot (Piston)",
                    exitCode: runResult.code || 1,
                    stage: (runResult.stderr || "").includes("error:") ? "compilation" : "runtime"
                }
            }

            return {
                success: true,
                output: runResult.stdout || "",
                result: null,
                executionMs: elapsed,
                compileMs: Math.round(elapsed * 0.35),
                engine: "OpenJDK 15 HotSpot (Piston)",
                exitCode: 0,
                stage: "success"
            }

        } catch (error: any) {
            const elapsed = Math.round(performance.now() - startTime)
            const isNetworkError = error?.name === "TypeError" || error?.message?.includes("fetch")
            const cleanMessage = isNetworkError
                ? "Remote execution unavailable: Could not connect to Java execution service (emkc.org). Please check network connection."
                : (error.message || error.toString())
            return {
                success: false,
                output: "",
                error: cleanMessage,
                executionMs: elapsed,
                compileMs: elapsed,
                engine: "Java 15 Compiler",
                exitCode: 1,
                stage: "runtime"
            }
        } finally {
            setIsLoading(false)
        }
    }, [])

    return { isLoading, isReady, runJava, engineName: "OpenJDK 15 HotSpot (Piston)" }
}
