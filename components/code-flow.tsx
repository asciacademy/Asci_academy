"use client"

import { GitBranch, GitCommit, ChevronDown, ArrowRight } from "lucide-react"

interface CodeNode {
    id: string
    label: string
    type: "start" | "condition" | "action" | "end"
    children?: string[]
}

interface CodeFlowProps {
    nodes: CodeNode[]
    activeNodeId?: string
}

export function CodeFlow({ nodes, activeNodeId }: CodeFlowProps) {
    return (
        <div className="my-10 p-6 rounded-lg border border-border bg-card/30 backdrop-blur-sm relative overflow-hidden group">


            <div className="flex items-center gap-3 mb-8">
                <GitBranch className="h-4 w-4 text-primary" />
                <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-primary">Step-by-Step Logic Flow</span>
            </div>

            <div className="flex flex-col items-center gap-4">
                {nodes.map((node, i) => (
                    <div key={node.id} className="flex flex-col items-center w-full">
                        <div
                            className={`relative px-6 py-3 rounded-lg border transition-all duration-300 ${activeNodeId === node.id
                                    ? "bg-primary/10 border-primary text-foreground font-semibold"
                                    : "bg-card border-hairline text-muted-foreground"
                                } ${node.type === 'condition' ? 'max-w-[200px] text-center rotate-45 aspect-square flex items-center justify-center p-2' : ''}`}
                            style={node.type === 'condition' ? { transform: 'rotate(45deg)' } : undefined}
                        >
                            <div className={node.type === 'condition' ? '-rotate-45' : ''}>
                                <span className="font-mono text-xs font-medium uppercase tracking-tight">
                                    {node.label}
                                </span>
                            </div>

                            {activeNodeId === node.id && (
                                <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-full" />
                            )}
                        </div>

                        {i < nodes.length - 1 && (
                            <div className="h-8 w-[1px] bg-border flex flex-col items-center justify-center">
                                <div className="h-1.5 w-1.5 rounded-full bg-border my-2" />
                                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                <GitCommit className="h-3 w-3 text-primary" />
                Logic Flow
            </div>
        </div>
    )
}
