import { CurriculumCourse } from "../curriculum-data"

export const PROGRAMMING_COURSES: CurriculumCourse[] = [
  // =========================================================================
  // COURSE 0: PRODUCTION PYTHON ENGINEERING MASTERCLASS
  // =========================================================================
  {
    id: "python",
    slug: "python",
    title: "Production Python Engineering",
    description: "Deep dive into CPython internals, bytecode compilation, asyncio event loops, the Global Interpreter Lock (GIL), and enterprise microservices.",
    category: "Programming",
    level: "All Levels",
    weeks: "12 Weeks",
    duration_hours: 50,
    lessons: 24,
    projects: 3,
    certificate: "ASCI Master Certificate",
    is_premium: false,
    tools: ["Python 3.12", "CPython", "Asyncio", "FastAPI", "GIL", "Pytest"],
    highlights: [
      "CPython Internals: Lexer, AST, Bytecode (*.pyc) & ceval.c Evaluation",
      "Python Memory Model: Reference Counting, Cyclic GC & Object Interning",
      "Asynchronous Concurrency: Event Loops, Tasks, Coroutines & GIL Bypasses",
      "Metaprogramming: Decorators, Descriptors, Metaclasses & Dynamic Typing",
      "Enterprise Microservices Architecture with FastAPI, Pydantic & Docker"
    ],
    modules: [
      {
        id: "py-master-mod-1",
        title: "Module 1: CPython Architecture & Runtime Execution",
        sequence_order: 1,
        description: "Explore the CPython interpreter internals from tokenization to bytecode evaluation.",
        lessons: [
          {
            id: "py-master-1-1",
            title: "1.1 CPython Compilation Pipeline",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Understand how Python source translates into bytecode instructions.",
            content: "Explore the CPython execution loop.",
            challenge_data: {
              initialCode: "def execute():\n    return 'CPYTHON_READY'\n\nprint(execute())\n",
              expectedOutput: "CPYTHON_READY",
              instructions: "Run the Python pipeline script."
            }
          }
        ]
      }
    ]
  },
  // =========================================================================
  // COURSE 1: PYTHON FOR DATA SCIENCE, AI & DEVELOPMENT
  // =========================================================================
  {
    id: "python-ai",
    slug: "python-ai",
    title: "Python for Data Science, AI & Development",
    description: "Master modern Python 3.12 syntax, object-oriented design, async I/O, REST APIs, and the mathematical standard libraries powering machine learning.",
    category: "Programming",
    level: "Beginner",
    weeks: "10 Weeks",
    duration_hours: 50,
    lessons: 40,
    projects: 4,
    certificate: "IBM Professional Certificate",
    is_premium: false,
    tools: ["Python 3.12", "FastAPI", "Requests", "Pytest", "Mypy", "Asyncio"],
    highlights: [
      "Modern Python 3.12 Features: Pattern Matching, Type Annotations & Walrus Operator",
      "Object-Oriented Architecture: Inheritance, Polymorphism & Special Dunder Methods",
      "Functional Data Pipelines: Generators, Iterators & Memory-Efficient Streaming",
      "Asynchronous Concurrency with asyncio, Event Loops & Worker Coroutines",
      "Building Production REST Microservices with FastAPI and Pydantic"
    ],
    modules: [
      {
        id: "py-ai-mod-1",
        title: "Module 1: Language Syntax, Memory Model & Type Hints",
        sequence_order: 1,
        description: "Write clean, type-annotated, idiomatic Python adhering to PEP 8 standards.",
        lessons: [
          {
            id: "py-ai-1-1",
            title: "1.1 Modern Python Type Hints & Annotations",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Eliminate runtime type bugs using Python's static typing annotations and Mypy.",
            content: `### Static Type Annotations in Python
While Python is dynamically typed at runtime, modern systems enforce static type checking during CI/CD to prevent bugs before deployment.

\`\`\`python
def calculate_tax(subtotal: float, rate: float = 0.08) -> float:
    return round(subtotal * rate, 2)

print(calculate_tax(100.0))
\`\`\``,
            challenge_data: {
              initialCode: `def greet(name: str) -> str:\n    return f"HELLO_{name.upper()}"\n\nprint(greet("architect"))\n`,
              expectedOutput: "HELLO_ARCHITECT",
              instructions: "Return and print the formatted string 'HELLO_ARCHITECT'."
            }
          },
          {
            id: "py-ai-1-2",
            title: "1.2 List Comprehensions & Generator Expressions",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 65,
            description: "Transform and filter collections with concise, memory-efficient syntax.",
            content: `### Concise Transformations
List comprehensions provide an expressive alternative to manual for-loops:

\`\`\`python
numbers = [1, 2, 3, 4, 5]
evens_squared = [n ** 2 for n in numbers if n % 2 == 0]
print(evens_squared) # [4, 16]
\`\`\``,
            challenge_data: {
              initialCode: `nums = [1, 2, 3, 4, 5, 6]\nresult = [n * 10 for n in nums if n % 2 == 0]\nprint(result)\n`,
              expectedOutput: "[20, 40, 60]",
              instructions: "Filter even numbers, multiply by 10, and print the resulting list."
            }
          }
        ]
      },
      {
        id: "py-ai-mod-2",
        title: "Module 2: Object-Oriented Architecture & Magic Methods",
        sequence_order: 2,
        description: "Design robust domain entities with encapsulation, custom __repr__, and context managers.",
        lessons: [
          {
            id: "py-ai-2-1",
            title: "2.1 Magic (Dunder) Methods",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Implement __init__, __str__, and __len__ to make custom objects behave like native types.",
            content: `### Python Data Model Protocols
Custom classes interact with built-in language operators by implementing special dunder methods:
* \`__init__\`: Object construction.
* \`__repr__\`: Diagnostic representation.
* \`__len__\`: Called when \`len(obj)\` is evaluated.

\`\`\`python
class Packet:
    def __init__(self, data: list):
        self.data = data
    def __len__(self):
        return len(self.data)
\`\`\``,
            challenge_data: {
              initialCode: `class Batch:\n    def __init__(self, items):\n        self.items = items\n    def __len__(self):\n        return len(self.items)\n\nb = Batch([10, 20, 30])\nprint("BATCH_LEN:", len(b))\n`,
              expectedOutput: "BATCH_LEN: 3",
              instructions: "Implement __len__ and output 'BATCH_LEN: 3'."
            }
          }
        ]
      },
      {
        id: "py-ai-mod-3",
        title: "Module 3: Functional Paradigms, Iterators & Generators",
        sequence_order: 3,
        description: "Stream infinite datasets without memory overflow using generator yield pipelines.",
        lessons: [
          {
            id: "py-ai-3-1",
            title: "3.1 Memory-Efficient Generators with Yield",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Produce streaming sequences on demand without loading full lists into RAM.",
            content: `### Generators vs Lists
A regular function computes all values and returns them at once. A generator uses \`yield\` to pause execution and emit items one by one, keeping memory footprint bounded to $O(1)$.

\`\`\`python
def count_up(n):
    for i in range(1, n + 1):
        yield i
\`\`\``,
            challenge_data: {
              initialCode: `def gen_evens(limit):\n    for i in range(limit):\n        if i % 2 == 0:\n            yield i\n\nprint("EVENS:", list(gen_evens(6)))\n`,
              expectedOutput: "EVENS: [0, 2, 4]",
              instructions: "Yield even numbers up to limit 6 and print 'EVENS: [0, 2, 4]'."
            }
          }
        ]
      },
      {
        id: "py-ai-mod-4",
        title: "Module 4: Asynchronous Concurrency with Asyncio",
        sequence_order: 4,
        description: "Handle high-throughput I/O bound operations concurrently using async/await and event loops.",
        lessons: [
          {
            id: "py-ai-4-1",
            title: "4.1 Coroutines and asyncio.gather",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Dispatch multiple non-blocking async network tasks concurrently.",
            content: `### Asyncio Concurrency
When code awaits an I/O operation (like an HTTP call or database query), the event loop pauses the current coroutine and executes other pending tasks instead of blocking the thread.`,
            challenge_data: {
              initialCode: `tasks = ["FETCH_USER", "FETCH_POSTS"]\ncompleted = [t + "_OK" for t in tasks]\nprint("CONCURRENT:", completed)\n`,
              expectedOutput: "CONCURRENT: ['FETCH_USER_OK', 'FETCH_POSTS_OK']",
              instructions: "Simulate concurrent task resolution and print 'CONCURRENT: ['FETCH_USER_OK', 'FETCH_POSTS_OK']'."
            }
          }
        ]
      },
      {
        id: "py-ai-mod-5",
        title: "Module 5: Production REST APIs with FastAPI & Pydantic",
        sequence_order: 5,
        description: "Build robust, high-performance web microservices with automatic OpenAPI schemas.",
        lessons: [
          {
            id: "py-ai-5-1",
            title: "5.1 Pydantic Model Validation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Enforce strict JSON schema validation for API request bodies.",
            content: `### Request Body Parsing
FastAPI uses Pydantic to parse and validate incoming JSON payloads against declarative Python dataclasses.`,
            challenge_data: {
              initialCode: `payload = {"user_id": 101, "role": "admin"}\ndef validate(p):\n    return p.get("role") == "admin"\n\nprint("IS_ADMIN:", validate(payload))\n`,
              expectedOutput: "IS_ADMIN: True",
              instructions: "Validate the payload role and print 'IS_ADMIN: True'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 2: GOOGLE CLOUD PRODUCTIVITY & ENTERPRISE WORKFLOWS
  // =========================================================================
  {
    id: "cloud-productivity",
    slug: "cloud-productivity",
    title: "Google Cloud Productivity & Enterprise Workflows",
    description: "Automate organizational collaboration: Google Sheets formulas, Apps Script automations, cloud drive architecture, and collaborative document systems.",
    category: "Cloud & Infra",
    level: "Beginner",
    weeks: "4 Weeks",
    duration_hours: 18,
    lessons: 20,
    projects: 2,
    certificate: "Google Professional Certificate",
    is_premium: false,
    tools: ["Google Sheets", "Google Apps Script", "Google Drive API", "Cloud Storage", "Forms"],
    highlights: [
      "Dynamic Formulas: QUERY, FILTER, ARRAYFORMULA, and IMPORTRANGE",
      "Automating Workflows with JavaScript-Based Google Apps Script",
      "Enterprise Cloud Drive Architecture and Least-Privilege IAM",
      "End-to-End Automated Intake Form to PDF Invoice Generator"
    ],
    modules: [
      {
        id: "cloud-prod-mod-1",
        title: "Module 1: Advanced Google Sheets & Dynamic Array Formulas",
        sequence_order: 1,
        description: "Transform spreadsheet data using SQL-like QUERY strings and ARRAYFORMULA.",
        lessons: [
          {
            id: "cloud-prod-1-1",
            title: "1.1 The QUERY Function in Google Sheets",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Run pseudocode SQL queries directly inside spreadsheet formula cells.",
            content: `### Google Visualization API Query Language
Google Sheets allows you to run SQL-like strings on cell ranges:
\`=QUERY(A1:E100, "SELECT A, B WHERE C > 500 ORDER BY B DESC", 1)\``,
            challenge_data: {
              initialCode: `rows = [["Design", 400], ["Engineering", 1200], ["Sales", 800]]\nfiltered = [r[0] for r in rows if r[1] > 500]\nprint("QUERY_RESULT:", filtered)\n`,
              expectedOutput: "QUERY_RESULT: ['Engineering', 'Sales']",
              instructions: "Filter rows where value > 500 and print 'QUERY_RESULT: ['Engineering', 'Sales']'."
            }
          }
        ]
      },
      {
        id: "cloud-prod-mod-2",
        title: "Module 2: Google Apps Script & REST Automations",
        sequence_order: 2,
        description: "Write JavaScript macros to connect Sheets, Gmail, and external webhook APIs.",
        lessons: [
          {
            id: "cloud-prod-2-1",
            title: "2.1 Time-Driven Triggers & Webhooks",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 65,
            description: "Trigger automations on spreadsheet form submit or recurring cron schedules.",
            content: `### Event-Driven Apps Script
Google Apps Script supports installable triggers:
- \`onEdit(e)\`: Triggers on cell update.
- \`onFormSubmit(e)\`: Fires when Google Forms intake is captured.
- \`timeDriven()\`: Cron triggers every hour/day.`,
            challenge_data: {
              initialCode: `trigger = "onFormSubmit"\ndef handle_event(e):\n    return f"EVENT_PROCESSED::{e}"\n\nprint(handle_event(trigger))\n`,
              expectedOutput: "EVENT_PROCESSED::onFormSubmit",
              instructions: "Process the form event and print 'EVENT_PROCESSED::onFormSubmit'."
            }
          }
        ]
      },
      {
        id: "cloud-prod-mod-3",
        title: "Module 3: Google Drive Cloud Architecture & Enterprise Access",
        sequence_order: 3,
        description: "Structure Shared Drives with least-privilege role-based access control (RBAC).",
        lessons: [
          {
            id: "cloud-prod-3-1",
            title: "3.1 Shared Drive Permissions & Inheritance",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 50,
            description: "Manager vs Content Manager vs Contributor vs Commenter vs Viewer roles.",
            content: `Enterprise security requires folder permissions to flow downward through inheritance while restricting sensitive finance and HR partitions using isolated Shared Drives.`
          }
        ]
      },
      {
        id: "cloud-prod-mod-4",
        title: "Module 4: Automated Intake Pipelines & PDF Invoicing",
        sequence_order: 4,
        description: "Generate styled PDF invoices automatically from Google Docs templates and Sheet rows.",
        lessons: [
          {
            id: "cloud-prod-4-1",
            title: "4.1 End-to-End Invoice Automation",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 70,
            description: "Combine Forms, Sheets, Docs Mail-Merge, and automated PDF emailing.",
            content: `Automate repetitive invoicing: intake customer orders via Google Forms, log line items to Google Sheets, merge data into a Google Doc template, export to PDF, and dispatch via Gmail.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 3: FULL-STACK TYPESCRIPT & NEXT.JS 15 MASTERCLASS 2026
  // =========================================================================
  {
    id: "fullstack-typescript-react",
    slug: "fullstack-typescript-react",
    title: "Full-Stack TypeScript & Next.js 15 Masterclass 2026",
    description: "Engineer modern web platforms with React 19, Next.js 15 App Router, Server Actions, TypeScript 5.5, Tailwind CSS v4, and distributed edge deployments.",
    category: "Programming",
    level: "Intermediate",
    weeks: "12 Weeks",
    duration_hours: 60,
    lessons: 36,
    projects: 4,
    certificate: "Senior Full-Stack Architect Credential",
    is_premium: false,
    tools: ["React 19", "Next.js 15", "TypeScript 5.5", "Tailwind CSS v4", "Zod", "Server Actions", "Vercel Edge"],
    highlights: [
      "Strict Type Safety: Mapped Types, Generics, and Zod Runtime Schema Validation",
      "React 19 Paradigms: Server Components (RSC), useActionState & useOptimistic",
      "Next.js 15 App Router: Parallel Routes, Intercepting Modals & Unstable Cache",
      "PostgreSQL Edge Ingestion with Drizzle ORM and Supabase Auth Flow",
      "Full-Stack Production Capstone with Real-Time WebSockets and Stripe"
    ],
    modules: [
      {
        id: "ts-mod-1",
        title: "Module 1: Advanced TypeScript Architecture",
        sequence_order: 1,
        description: "Conditional types, template literal types, and type-safe schema validation with Zod.",
        lessons: [
          {
            id: "ts-1-1",
            title: "1.1 Runtime Validation with Zod Schemas",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Parse incoming unknown API payloads safely with Zod inferred types.",
            content: `### Runtime Type Safety
TypeScript types disappear at compile time. **Zod** parses unknown JSON data at runtime, throwing structured errors or returning guaranteed types:

\`\`\`typescript
const UserSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(["admin", "member"])
})
type User = z.infer<typeof UserSchema>
\`\`\``,
            challenge_data: {
              initialCode: `def validate_role(role: str) -> bool:\n    allowed = {"admin", "architect", "engineer"}\n    return role in allowed\n\nprint("IS_VALID:", validate_role("architect"))\n`,
              expectedOutput: "IS_VALID: True",
              instructions: "Validate the role against the allowed set and print 'IS_VALID: True'."
            }
          }
        ]
      },
      {
        id: "ts-mod-2",
        title: "Module 2: React 19 & Next.js 15 Server Components",
        sequence_order: 2,
        description: "Zero-bundle-size React Server Components (RSC) and progressive enhancement Server Actions.",
        lessons: [
          {
            id: "ts-2-1",
            title: "2.1 Server Actions & Form State Transitions",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Execute asynchronous mutations directly on the server without manual REST boilerplate.",
            content: `### React Server Actions
Server Actions are asynchronous functions marked with \`'use server'\`. They run securely on the server with direct database access.`,
            challenge_data: {
              initialCode: `state = {"status": "idle", "count": 0}\ndef mutate_action(s):\n    return {"status": "success", "count": s["count"] + 1}\n\nnew_state = mutate_action(state)\nprint("ACTION_RESULT:", new_state["status"])\n`,
              expectedOutput: "ACTION_RESULT: success",
              instructions: "Execute server action state mutation and print 'ACTION_RESULT: success'."
            }
          }
        ]
      },
      {
        id: "ts-mod-3",
        title: "Module 3: Database Modeling with Drizzle ORM",
        sequence_order: 3,
        description: "Lightweight SQL-like type-safe ORM queries with zero overhead.",
        lessons: [
          {
            id: "ts-3-1",
            title: "3.1 Type-Safe SQL Queries",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Query normalized relations with auto-generated TypeScript joins.",
            content: `### Drizzle ORM Efficiency
Unlike heavy abstract ORMs, Drizzle translates directly to lean parameterized SQL statements.`,
            challenge_data: {
              initialCode: `records = [{"id": 1, "active": True}, {"id": 2, "active": False}]\nactive_count = len([r for r in records if r["active"]])\nprint("ACTIVE_RECORDS:", active_count)\n`,
              expectedOutput: "ACTIVE_RECORDS: 1",
              instructions: "Filter active records and output 'ACTIVE_RECORDS: 1'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 4: RUST FOR SYSTEMS PROGRAMMING & HIGH-PERFORMANCE CLOUD 2026
  // =========================================================================
  {
    id: "rust-systems-programming",
    slug: "rust-systems-programming",
    title: "Rust for Systems Programming & High-Performance Cloud 2026",
    description: "Build ultra-low latency, crash-proof infrastructure: Ownership, Borrowing, Lifetimes, Fearless Concurrency, and Tokio async runtimes.",
    category: "Programming",
    level: "Advanced",
    weeks: "14 Weeks",
    duration_hours: 75,
    lessons: 40,
    projects: 4,
    certificate: "ASCI Certified Systems Engineer (Rust)",
    is_premium: true,
    tools: ["Rust 1.80+", "Cargo", "Tokio", "Rayon", "Clippy", "Wasm", "GDB"],
    highlights: [
      "The Ownership & Affine Type System: Memory Safety Without Garbage Collection",
      "Borrow Checker Mechanics: Shared References (&T) vs Unique Mutable References (&mut T)",
      "Exhaustive Pattern Matching, Algebraic Enums & Custom Derive Macros",
      "Fearless Concurrency: Send and Sync Traits, Mutex, and Arc (Atomic Reference Counting)",
      "High-Throughput Asynchronous Network I/O with Tokio and WebAssembly (Wasm)"
    ],
    modules: [
      {
        id: "rust-mod-1",
        title: "Module 1: Ownership, Borrowing & Move Semantics",
        sequence_order: 1,
        description: "Eliminate null pointers, use-after-free, and data races at compile time.",
        lessons: [
          {
            id: "rust-1-1",
            title: "1.1 The Golden Rules of Ownership",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Track resource lifetimes and enforce single-owner rules.",
            content: `### The 3 Laws of Ownership
1. Each value in Rust has an **owner**.
2. There can only be **one owner at a time**.
3. When the owner goes **out of scope**, the value is dropped (\`RAII\`).`,
            challenge_data: {
              initialCode: `def simulate_ownership(data):\n    owner_a = data\n    owner_b = owner_a # Moved to owner_b\n    return f"OWNED_BY_B:{owner_b}"\n\nprint(simulate_ownership("HEAP_BUFFER"))\n`,
              expectedOutput: "OWNED_BY_B:HEAP_BUFFER",
              instructions: "Verify resource transfer and output 'OWNED_BY_B:HEAP_BUFFER'."
            }
          }
        ]
      },
      {
        id: "rust-mod-2",
        title: "Module 2: Algebraic Types & Exhaustive Matching",
        sequence_order: 2,
        description: "Model complex states with enum variants and compile-time pattern guards.",
        lessons: [
          {
            id: "rust-2-1",
            title: "2.1 The Result<T, E> Pattern for Robust Errors",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Propagate errors with the \`?\` operator and enforce exhaustive matching.",
            content: `### No Exceptions, Only Values
Rust treats errors as standard values: \`Ok(T)\` or \`Err(E)\`. The compiler refuses to build if possible failure cases are ignored.`,
            challenge_data: {
              initialCode: `def parse_port(port_str):\n    try:\n        val = int(port_str)\n        return ("OK", val)\n    except ValueError:\n        return ("ERR", "INVALID_INT")\n\nres = parse_port("8080")\nprint(f"RESULT:{res[0]}_{res[1]}")\n`,
              expectedOutput: "RESULT:OK_8080",
              instructions: "Parse port string and output 'RESULT:OK_8080'."
            }
          }
        ]
      },
      {
        id: "rust-mod-3",
        title: "Module 3: Async Systems with Tokio Runtime",
        sequence_order: 3,
        description: "Scale to millions of concurrent socket connections with zero-cost futures.",
        lessons: [
          {
            id: "rust-3-1",
            title: "3.1 Zero-Cost Futures & Epoll Multiplexing",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 95,
            description: "Rust futures are lazy state machines driven by executor polling.",
            content: `### Lazy Evaluation in Async Rust
Unlike JavaScript promises that execute immediately on declaration, Rust futures do nothing until polled by an executor like Tokio.`,
            challenge_data: {
              initialCode: `status = "POLL_PENDING"\nstatus = "POLL_READY"\nprint(f"FUTURE_STATE:{status}")\n`,
              expectedOutput: "FUTURE_STATE:POLL_READY",
              instructions: "Transition future state and print 'FUTURE_STATE:POLL_READY'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 5: GO (GOLANG) DISTRIBUTED SYSTEMS & CLOUD MICROSERVICES 2026
  // =========================================================================
  {
    id: "golang-microservices",
    slug: "golang-microservices",
    title: "Go (Golang) Distributed Systems & Cloud Microservices 2026",
    description: "Master modern Go 1.23+ engineering: goroutines, channels, gRPC Protobuf services, distributed tracing, and high-throughput cloud infrastructure.",
    category: "Programming",
    level: "Intermediate",
    weeks: "10 Weeks",
    duration_hours: 50,
    lessons: 32,
    projects: 3,
    certificate: "ASCI Cloud Systems Engineer (Go)",
    is_premium: false,
    tools: ["Go 1.23+", "gRPC", "Protocol Buffers", "Docker", "PostgreSQL", "Prometheus", "Chi Router"],
    highlights: [
      "Go Concurrency Primitives: Goroutines, Buffered Channels, and Select Multiplexing",
      "Zero-Allocation Memory Optimization and Profiling with pprof",
      "High-Performance Microservices with gRPC and Binary Protobuf Serialization",
      "Distributed Context Propagation (context.Context) with Timeouts and Cancellation",
      "Building Production Web APIs with Chi, Middleware Chains, and PostgreSQL"
    ],
    modules: [
      {
        id: "go-mod-1",
        title: "Module 1: Idiomatic Go & Type System",
        sequence_order: 1,
        description: "Struct composition, implicit interface satisfaction, and error values.",
        lessons: [
          {
            id: "go-1-1",
            title: "1.1 Implicit Interface Satisfaction",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Types implement interfaces implicitly by implementing their method signatures.",
            content: `### Duck Typing with Static Safety
In Go, a type implements an interface simply by implementing its methods. There is no explicit \`implements\` keyword.`,
            challenge_data: {
              initialCode: `class Greeter:\n    def speak(self): return "GOPHER"\n\ng = Greeter()\nprint("SPOKE:", g.speak())\n`,
              expectedOutput: "SPOKE: GOPHER",
              instructions: "Call interface method and print 'SPOKE: GOPHER'."
            }
          }
        ]
      },
      {
        id: "go-mod-2",
        title: "Module 2: Concurrency with Goroutines & Channels",
        sequence_order: 2,
        description: "CSP (Communicating Sequential Processes): Do not communicate by sharing memory; share memory by communicating.",
        lessons: [
          {
            id: "go-2-1",
            title: "2.1 Channel Producer-Consumer Coordination",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Pass data safely between concurrent threads without mutex locks.",
            content: `### Buffered Channels in Go
Buffered channels allow goroutines to send values asynchronously up to buffer capacity without blocking.`,
            challenge_data: {
              initialCode: `channel_buf = [10, 20, 30]\nreceived = [x * 2 for x in channel_buf]\nprint("RECEIVED:", received)\n`,
              expectedOutput: "RECEIVED: [20, 40, 60]",
              instructions: "Process channel items and print 'RECEIVED: [20, 40, 60]'."
            }
          }
        ]
      },
      {
        id: "go-mod-3",
        title: "Module 3: gRPC & Protocol Buffers",
        sequence_order: 3,
        description: "10x faster binary serialization over HTTP/2 with strongly typed IDL schemas.",
        lessons: [
          {
            id: "go-3-1",
            title: "3.1 gRPC Unary vs Streaming Calls",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "High-throughput inter-service communication across microservice fleets.",
            content: `### Protobuf Binary Serialization
Unlike bulky JSON text strings, Protocol Buffers pack fields into compact binary tag-length-value formats.`,
            challenge_data: {
              initialCode: `json_bytes = 180\nproto_bytes = 38\nreduction = int(((json_bytes - proto_bytes) / json_bytes) * 100)\nprint(f"PAYLOAD_REDUCTION:{reduction}%")\n`,
              expectedOutput: "PAYLOAD_REDUCTION:78%",
              instructions: "Calculate payload savings and output 'PAYLOAD_REDUCTION:78%'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 6: AWS CERTIFIED SOLUTIONS ARCHITECT & CLOUD ENGINEERING 2026
  // =========================================================================
  {
    id: "aws-cloud-solutions",
    slug: "aws-cloud-solutions",
    title: "AWS Certified Solutions Architect & Cloud Engineering",
    description: "Design multi-region, fault-tolerant cloud architectures: VPC networking, EC2 Auto-Scaling, Serverless Lambda, S3 Glacier, DynamoDB, and CloudFormation IaC.",
    category: "Cloud & Infra",
    level: "Advanced",
    weeks: "14 Weeks",
    duration_hours: 70,
    lessons: 42,
    projects: 5,
    certificate: "AWS Certified Solutions Architect Credential",
    is_premium: true,
    tools: ["AWS Console", "AWS CLI", "Terraform", "CloudFormation", "Lambda", "DynamoDB", "S3", "VPC"],
    highlights: [
      "VPC Architecture: Public/Private Subnets, NAT Gateways & Network Access Control Lists (NACLs)",
      "High-Availability Compute: Application Load Balancers (ALB) and EC2 Auto-Scaling Groups",
      "Serverless Event-Driven Architectures with AWS Lambda, SQS, and EventBridge",
      "Storage Tiering: S3 Standard, Intelligent Tiering, Glacier Flexible Retrieval & Deep Archive",
      "Well-Architected Framework: Operational Excellence, Security, Reliability & Cost Optimization"
    ],
    modules: [
      {
        id: "aws-mod-1",
        title: "Module 1: Global Infrastructure & VPC Networking",
        sequence_order: 1,
        description: "Architect secure multi-AZ Virtual Private Clouds with public/private subnet routing.",
        lessons: [
          {
            id: "aws-1-1",
            title: "1.1 CIDR Subnet Calculation & IP Allocation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Calculate usable host IPs in a /24 subnet (251 usable IPs in AWS).",
            content: `### AWS Reserved Subnet IPs
In every subnet, AWS reserves 5 IP addresses (first four and last one) for network, router, DNS, future use, and broadcast. A \`/24\` has $256 - 5 = 251$ usable host addresses.`,
            challenge_data: {
              initialCode: `total_ips = 256\naws_reserved = 5\nusable = total_ips - aws_reserved\nprint("USABLE_IPS:", usable)\n`,
              expectedOutput: "USABLE_IPS: 251",
              instructions: "Compute usable AWS subnet IPs and print 'USABLE_IPS: 251'."
            }
          }
        ]
      },
      {
        id: "aws-mod-2",
        title: "Module 2: High-Availability Compute & Auto-Scaling",
        sequence_order: 2,
        description: "Application Load Balancers (ALB), health checks, target groups, and dynamic scaling policies.",
        lessons: [
          {
            id: "aws-2-1",
            title: "2.1 Target Tracking Scaling Policies",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Maintain aggregate CPU utilization at 70% by dynamically provisioning EC2 instances.",
            content: `### Target Tracking Dynamics
When CPU utilization exceeds the 70% threshold for consecutive evaluation periods, the Auto Scaling Group mounts additional compute instances across Availability Zones.`,
            challenge_data: {
              initialCode: `current_cpu = 85\ntarget_cpu = 70\nscaling_action = "ADD_INSTANCE" if current_cpu > target_cpu else "MAINTAIN"\nprint("ASG_ACTION:", scaling_action)\n`,
              expectedOutput: "ASG_ACTION: ADD_INSTANCE",
              instructions: "Evaluate auto-scaling action and print 'ASG_ACTION: ADD_INSTANCE'."
            }
          }
        ]
      },
      {
        id: "aws-mod-3",
        title: "Module 3: S3 Storage Classes & Lifecycle Policies",
        sequence_order: 3,
        description: "Transition data from S3 Standard to Glacier and Deep Archive for 95% cost reductions.",
        lessons: [
          {
            id: "aws-3-1",
            title: "3.1 Automated Lifecycle Transition Rules",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Transition objects older than 90 days to Glacier Flexible Retrieval.",
            content: `### Storage Tiering Optimization
S3 Standard costs ~₹1.92/GB/month, while Glacier Deep Archive costs ~₹0.08/GB/month. Lifecycle rules automatically transition stale objects.`,
            challenge_data: {
              initialCode: `standard_cost = 23.00\nglacier_cost = 0.99\nsavings_pct = round(((standard_cost - glacier_cost) / standard_cost) * 100, 1)\nprint(f"TIERING_SAVINGS:{savings_pct}%")\n`,
              expectedOutput: "TIERING_SAVINGS:95.7%",
              instructions: "Calculate storage tier savings and print 'TIERING_SAVINGS:95.7%'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 7: MICROSOFT EXCEL & POWER BI: ENTERPRISE ANALYTICS
  // =========================================================================
  {
    id: "excel-bi-advanced",
    slug: "excel-bi-advanced",
    title: "Microsoft Excel & Power BI: Enterprise Analytics",
    description: "From beginner fundamentals to advanced corporate BI: XLOOKUP formulas, Power Query automated data ingestion, DAX data modeling, and interactive Power BI executive dashboards.",
    category: "Cloud & Infra",
    level: "All Levels",
    weeks: "10 Weeks",
    duration_hours: 45,
    lessons: 30,
    projects: 3,
    certificate: "Microsoft Certified Data Analyst Associate",
    is_premium: false,
    tools: ["Excel 365", "Power BI Desktop", "Power Query", "DAX", "PivotTables", "M Code"],
    highlights: [
      "Modern Formulas: XLOOKUP, INDEX/MATCH, FILTER, SORT, and Dynamic Spill Arrays",
      "Automating Repetitive Cleansing with Power Query (M Language Transformations)",
      "Star Schema Relational Modeling: Fact Tables vs Dimension Tables",
      "Advanced DAX Measures: CALCULATE, Time-Intelligence (YTD/YoY) & Filter Context",
      "Publishing Interactive Multi-Page Reports to Power BI Service with Row-Level Security"
    ],
    modules: [
      {
        id: "excel-mod-1",
        title: "Module 1: Advanced Excel Modeling & XLOOKUP",
        sequence_order: 1,
        description: "Retire legacy VLOOKUP: exact match defaults, two-way lookups, and spill arrays.",
        lessons: [
          {
            id: "excel-1-1",
            title: "1.1 The Power of XLOOKUP",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 60,
            description: "Look up values to the left or right without breaking when columns are inserted.",
            content: `### Why XLOOKUP Supersedes VLOOKUP
- Defaults to **exact match** (eliminates missing fourth argument bugs).
- Can search left or right (no column index numbers).
- Supports native fallback values if not found.`,
            challenge_data: {
              initialCode: `lookup_table = {"EMP_01": "Alice", "EMP_02": "Bob"}\ndef xlookup(id_val, default="NOT_FOUND"):\n    return lookup_table.get(id_val, default)\n\nprint("EMPLOYEE:", xlookup("EMP_01"))\n`,
              expectedOutput: "EMPLOYEE: Alice",
              instructions: "Execute XLOOKUP simulation and print 'EMPLOYEE: Alice'."
            }
          }
        ]
      },
      {
        id: "excel-mod-2",
        title: "Module 2: Power Query ETL & Data Shaping",
        sequence_order: 2,
        description: "Extract, transform, and load messy corporate CSVs and SQL tables automatically.",
        lessons: [
          {
            id: "excel-2-1",
            title: "2.1 Unpivoting Columns into Tidy Rows",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Transform matrix reports into database-ready tabular records in one click.",
            content: `### Unpivoting Data
Transforming monthly summary columns (Jan, Feb, Mar) into Attribute-Value rows enables dynamic slicer filtering in pivot tables.`,
            challenge_data: {
              initialCode: `months = ["Jan", "Feb", "Mar"]\nvalues = [100, 150, 200]\nunpivoted = [(m, v) for m, v in zip(months, values)]\nprint("UNPIVOTED_COUNT:", len(unpivoted))\n`,
              expectedOutput: "UNPIVOTED_COUNT: 3",
              instructions: "Unpivot data into records and output 'UNPIVOTED_COUNT: 3'."
            }
          }
        ]
      },
      {
        id: "excel-mod-3",
        title: "Module 3: DAX Formulas & Power BI Visualization",
        sequence_order: 3,
        description: "CALCULATE filter overrides, Year-over-Year (YoY) growth measures, and KPI cards.",
        lessons: [
          {
            id: "excel-3-1",
            title: "3.1 Year-over-Year (YoY) Percentage Growth",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Calculate percentage variation between current period and prior period.",
            content: `### DAX Time Intelligence
Calculate variance against the prior year:
$$\\text{YoY}\\% = \\frac{\\text{Current} - \\text{Prior}}{\\text{Prior}} \\times 100$$`,
            challenge_data: {
              initialCode: `current_sales = 125000\nprior_sales = 100000\nyoy_growth = round(((current_sales - prior_sales) / prior_sales) * 100, 1)\nprint(f"YOY_GROWTH:{yoy_growth}%")\n`,
              expectedOutput: "YOY_GROWTH:25.0%",
              instructions: "Calculate YoY growth percentage and print 'YOY_GROWTH:25.0%'."
            }
          }
        ]
      }
    ]
  }
]

