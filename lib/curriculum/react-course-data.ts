import { CoursePart } from "./c-course-data"

export const REACT_COURSE_PARTS: CoursePart[] = [
  {
    id: "react-part-1",
    title: "Part 1: React Fundamentals, JSX & State",
    badge: "Beginner",
    description: "Understand the component-driven mental model: JSX, props, useState, and reactive rendering.",
    chapters: [
      {
        id: "react-ch-1",
        title: "Components & State",
        level: "Beginner",
        lessons: [
          {
            id: "react-1-1",
            title: "The React Mental Model & JSX Syntax",
            slug: "react-intro-jsx",
            level: "Beginner",
            language: "javascript",
            tldr: "React is a declarative library for building user interfaces by breaking screens into reusable components.",
            description: "Instead of manually mutating the DOM with imperative commands (document.getElementById), React lets you declare what the UI should look like for a given state. JSX allows writing HTML-like markup directly inside JavaScript, which the compiler compiles into React.createElement() calls.",
            code: `// A standard functional React component
function FeatureCard({ title, description, badge }) {
  return (
    <div className="card" style={{ padding: "16px", background: "#1e293b", borderRadius: "8px", color: "white" }}>
      <span style={{ background: "#0284c7", padding: "4px 8px", borderRadius: "4px", fontSize: "12px" }}>
        {badge}
      </span>
      <h3 style={{ margin: "8px 0", color: "#38bdf8" }}>{title}</h3>
      <p style={{ margin: 0, color: "#94a3b8" }}>{description}</p>
    </div>
  );
}

// App renders component with custom props
export default function App() {
  return <FeatureCard badge="Fast" title="Server Components" description="Zero bundle size on client!" />;
}`,
            output: "Rendered FeatureCard React Component.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px;">
  <div style="padding: 16px; background: #1e293b; border-radius: 8px; border: 1px solid #334155; color: white;">
    <span style="background: #0284c7; color: white; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; text-transform: uppercase;">
      Next-Gen
    </span>
    <h3 style="margin: 8px 0 4px 0; color: #38bdf8;">Declarative UI</h3>
    <p style="margin: 0; font-size: 13px; color: #94a3b8;">
      React synchronizes DOM nodes with component state automatically!
    </p>
  </div>
</div>`,
            visualDiagramTitle: "React Declarative Rendering Loop",
            visualDiagram: `[Component State / Props] ──Triggers──> [Virtual DOM Diffing (Reconciliation)] ──Batches──> [Minimal DOM Mutations on Screen]`,
            lineExplanations: [
              { line: "function FeatureCard({ title, ... })", explanation: "Functional component destructuring incoming props." },
              { line: "className='card'", explanation: "JSX uses className instead of class because class is a reserved word in JS." },
              { line: "{badge}", explanation: "Curly braces allow embedding any JavaScript expression directly into the markup." }
            ],
            keyPoints: [
              "React components must be capitalized (FeatureCard, not featureCard).",
              "Components must return a single root element (or a React Fragment <> ... </>).",
              "Props are strictly read-only; never mutate props directly."
            ],
            quiz: {
              question: "Why does JSX use className instead of the standard HTML class attribute?",
              options: ["For backwards compatibility with CSS1", "Because 'class' is a reserved keyword in JavaScript", "Because React invented CSS classes", "There is no difference"],
              correctIndex: 1,
              explanation: "In JavaScript, 'class' is a reserved language keyword, so JSX uses className to avoid syntax collisions."
            }
          },
          {
            id: "react-1-2",
            title: "Component State with useState",
            slug: "react-usestate",
            level: "Beginner",
            language: "javascript",
            tldr: "useState preserves values between re-renders and instructs React to update the screen when state changes.",
            description: "Regular local variables reset every time a component renders. The useState hook declares a state variable that React preserves in memory across renders. When you call the setter function (setCount), React schedules a re-render to update the display.",
            code: `import { useState } from "react";

function InteractiveCounter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    // Functional updater ensures latest state value
    setCount(prev => prev + 1);
  };

  return (
    <div>
      <p>Current Count: {count}</p>
      <button onClick={increment}>Increment (+1)</button>
    </div>
  );
}`,
            output: "Interactive counter state management.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px; text-align: center; color: white;">
  <div style="font-size: 13px; color: #94a3b8; text-transform: uppercase;">useState Hook Demo</div>
  <div id="react-counter" style="font-size: 32px; font-weight: bold; color: #38bdf8; margin: 8px 0;">0</div>
  <button onclick="const c = document.getElementById('react-counter'); c.innerText = parseInt(c.innerText) + 1;"
          style="background: #2563eb; color: white; border: none; padding: 8px 18px; border-radius: 6px; font-weight: 600; cursor: pointer;">
    setCount(prev + 1)
  </button>
</div>`,
            visualDiagramTitle: "React useState Re-render Cycle",
            visualDiagram: `[User Clicks Button] -> [setCount(prev => prev + 1)] -> [React schedules Re-render] -> [Component re-executes with new count] -> [Screen Updated]`,
            lineExplanations: [
              { line: "const [count, setCount] = useState(0);", explanation: "Destructures state value and setter function, initializing with 0." },
              { line: "setCount(prev => prev + 1);", explanation: "Passes a callback to safely update based on latest previous state." }
            ],
            keyPoints: [
              "Never modify state directly (count = count + 1 won't trigger re-render!).",
              "React batches multiple state updates together for optimal rendering performance.",
              "Hooks can only be called at the top level of React function components."
            ],
            quiz: {
              question: "What happens if you mutate state directly like count = 5 instead of calling setCount(5)?",
              options: ["It works normally", "React will not trigger a re-render, so the screen remains unchanged", "The browser crashes", "It triggers an infinite loop"],
              correctIndex: 1,
              explanation: "React only detects state changes and triggers DOM updates when setter functions from useState are invoked."
            }
          }
        ]
      }
    ]
  },
  {
    id: "react-part-2",
    title: "Part 2: Lifecycle, Side Effects & Custom Hooks",
    badge: "Intermediate",
    description: "Coordinate API calls and subscriptions with useEffect, manage global state with Context, and craft custom hooks.",
    chapters: [
      {
        id: "react-ch-2",
        title: "Effects & Context",
        level: "Intermediate",
        lessons: [
          {
            id: "react-2-1",
            title: "Side Effects with useEffect",
            slug: "react-useeffect",
            level: "Intermediate",
            language: "javascript",
            tldr: "useEffect synchronizes your component with external systems like APIs, timers, and the browser DOM.",
            description: "Operations that interact with systems outside of React's pure rendering loop are called side effects. useEffect runs after the DOM renders. By passing a dependency array, you control whether the effect runs on every render, only once on mount ([]), or when specific variables change.",
            code: `import { useState, useEffect } from "react";

function SystemMonitor({ clusterId }) {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    let isMounted = true;
    console.log(\`Subscribing to cluster telemetry: \${clusterId}\`);

    // Cleanup function when component unmounts or clusterId changes
    return () => {
      isMounted = false;
      console.log(\`Tearing down telemetry for: \${clusterId}\`);
    };
  }, [clusterId]); // Re-runs only when clusterId changes!

  return <div>Cluster Monitor Active</div>;
}`,
            output: "Telemetry subscription lifecycle established.",
            visualDiagramTitle: "useEffect Lifecycle & Cleanup Sequence",
            visualDiagram: `[Component Mounts] ──> [Initial Render] ──> [Run Effect Callback]
                                                  │
                                                  ▼ (On Re-render / Unmount)
                                        [Run Cleanup Function] ──> [Re-run Effect with new dependencies]`,
            lineExplanations: [
              { line: "useEffect(() => { ... }, [clusterId]);", explanation: "Runs effect when clusterId changes." },
              { line: "return () => { ... };", explanation: "Cleanup function invoked before re-running effect or when unmounting to prevent memory leaks." }
            ],
            keyPoints: [
              "Empty array [] runs effect once on initial mount and cleanup on final unmount.",
              "Omitting the dependency array causes the effect to run after every single render.",
              "Always clean up event listeners, intervals, and WebSocket subscriptions."
            ],
            quiz: {
              question: "When does the cleanup function returned from useEffect execute?",
              options: ["Before the component mounts", "Before running the next effect and when the component unmounts", "Only when an error occurs", "Never"],
              correctIndex: 1,
              explanation: "React executes the cleanup function before applying the next effect iteration and right before unmounting."
            }
          }
        ]
      }
    ]
  },
  {
    id: "react-part-3",
    title: "Part 3: Next.js App Router & Server Components",
    badge: "Advanced",
    description: "Architect production Next.js applications using React Server Components (RSC), Suspense streaming, and Server Actions.",
    chapters: [
      {
        id: "react-ch-3",
        title: "Server Components & Architecture",
        level: "Advanced",
        lessons: [
          {
            id: "react-3-1",
            title: "React Server Components (RSC) vs Client Components",
            slug: "react-server-components",
            level: "Advanced",
            language: "javascript",
            tldr: "Server Components render exclusively on the server with zero client bundle weight, accessing databases directly.",
            description: "In modern Next.js (App Router), components are Server Components by default. They can query databases, read disk files, and keep heavy npm packages off the client bundle completely. Only add the 'use client' directive when a component needs interactive state (useState), effects (useEffect), or DOM event listeners.",
            code: `// Next.js Server Component (app/dashboard/page.js)
// Runs ONLY on server! Zero bytes of JS added to client browser!

async function getMetrics() {
  // Direct DB or microservice fetch without exposing secrets
  return { activeNodes: 48, throughput: "1.2 GB/s" };
}

export default async function DashboardPage() {
  const metrics = await getMetrics();

  return (
    <section>
      <h1>Enterprise Server Dashboard</h1>
      <p>Active Cluster Nodes: {metrics.activeNodes}</p>
      <p>Network Throughput: {metrics.throughput}</p>
    </section>
  );
}`,
            output: "Rendered Server Component with direct server-side data fetching.",
            visualDiagramTitle: "React Server Components (RSC) Hybrid Architecture",
            visualDiagram: `[Client Request: /dashboard] 
       │
       ▼
[Next.js Node Server] ──Direct DB Query──> [Renders RSC into JSON Tree]
       │
       ▼ (HTML + RSC Payload streamed over network)
[Browser Client] ──Hydrates only interactive 'use client' islands──> [Fast, Interactive Page]`,
            lineExplanations: [
              { line: "export default async function DashboardPage()", explanation: "Async component natively awaiting backend data directly." },
              { line: "'use client'", explanation: "Boundary directive marking components that require client-side hydration and hooks." }
            ],
            keyPoints: [
              "Server Components drastically reduce client JavaScript payload sizes.",
              "API keys and database credentials never leak to the client browser.",
              "Use Suspense boundaries around async components for instant streaming SSR."
            ],
            quiz: {
              question: "What directive must be placed at the very top of a Next.js file to enable useState and event handlers?",
              options: ["'use server'", "'use client'", "'use react'", "'client-only'"],
              correctIndex: 1,
              explanation: "'use client' establishes a boundary declaring that the module and its children must be hydrated on the browser client."
            }
          }
        ]
      }
    ]
  }
]
