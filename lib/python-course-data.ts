export type CourseLevel = "Beginner" | "Intermediate" | "Hard"

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface ProgramStep {
  step: number
  line: number
  title: string
  explanation: string
  memoryState?: {
    stack?: Record<string, string>
    heap?: Record<string, string>
    refCount?: Record<string, number>
  }
}

export interface InterviewQnA {
  question: string
  answer: string
  companyTags?: string[]
}

export interface Lesson {
  id: string
  title: string
  description: string
  slug: string
  code: string
  expectedOutput: string
  exercisePrompt: string
  solutionCode: string
  level: CourseLevel
  tldr?: string
  flowchart?: string
  programWorking?: ProgramStep[]
  interviewQuestions?: InterviewQnA[]
  quiz?: QuizQuestion
  resources?: { title: string; url: string; type: "book" | "pep" | "docs" }[]
}

export interface Chapter {
  id: string
  title: string
  description: string
  level: CourseLevel
  concepts: Lesson[]
}

export interface Part {
  id: string
  partNumber: number
  title: string
  description: string
  level: CourseLevel
  chapters: Chapter[]
}

export interface EnterpriseProject {
  id: string
  title: string
  tagline: string
  difficulty: "Production Hard"
  architectureFlow: string
  techStack: string[]
  overview: string
  modules: { name: string; description: string }[]
  snippet: { filename: string; code: string }
}

export interface LiteratureItem {
  title: string
  author: string
  role: string
  description: string
  takeaways: string[]
  link: string
  type: "Classic Book" | "Official Spec" | "PEP"
}

/* ═══════════════════════════════════════════════════════════════════════════
   CLASSICAL LITERATURE & OFFICIAL PYTHON SPECIFICATIONS
   ═══════════════════════════════════════════════════════════════════════════ */
export const PYTHON_BOOKS_AND_PDFS: LiteratureItem[] = [
  {
    title: "Fluent Python (2nd Edition)",
    author: "Luciano Ramalho",
    role: "Principal Developer Advocate at Thoughtworks, Python Fellow",
    description: "The definitive masterwork on writing idiomatic, pythonic code. Covers Python's object model, data structures, functions as first-class objects, object-oriented idioms, control flow with generators/coroutines, and metaprogramming.",
    takeaways: [
      "Deep dive into the Python Data Model and Dunder (__dunder__) methods protocol",
      "Memory savings with __slots__ and sequence unpackings",
      "Generator functions, coroutines, and the evolution toward native asyncio"
    ],
    link: "https://www.oreilly.com/library/view/fluent-python-2nd/9781492056348/",
    type: "Classic Book"
  },
  {
    title: "Effective Python: 90 Specific Ways to Write Better Python",
    author: "Brett Slatkin",
    role: "Principal Software Engineer at Google",
    description: "A pragmatic guide to idiomatic Python engineering. Details 90 specific practices, rules, and guidelines for writing robust, maintainable, and high-performance Python code.",
    takeaways: [
      "Item 37: Compose classes instead of nesting many levels of built-in types",
      "Item 46: Use descriptors for reusable @property methods across attributes",
      "Item 60: Achieve highly concurrent I/O with asyncio coroutines and tasks"
    ],
    link: "https://effectivepython.com/",
    type: "Classic Book"
  },
  {
    title: "High Performance Python (2nd Edition)",
    author: "Micha Gorelick & Ian Ozsvald",
    role: "Principal Data Scientists & High-Performance Computing Engineers",
    description: "Crucial guide for scaling CPU-bound and I/O-bound Python systems. Explores Cython, Numba, zero-copy NumPy buffers, PyPy JIT compilation, and profiling tools like cProfile and memory_profiler.",
    takeaways: [
      "Understanding computer architecture: CPU caches (L1/L2/L3), memory bandwidth, and IPC",
      "Profiling memory allocations with tracemalloc and object graph inspection",
      "Bypassing the GIL through C-extensions, Cython nogil blocks, and multi-processing"
    ],
    link: "https://www.oreilly.com/library/view/high-performance-python/9781492055013/",
    type: "Classic Book"
  },
  {
    title: "Architecture Patterns with Python",
    author: "Harry Percival & Bob Gregory",
    role: "Domain-Driven Design Practitioners & Enterprise Architects",
    description: "Enabling test-driven, event-driven, and domain-driven design in Python. Demonstrates Repository pattern, Service Layer, Unit of Work, Aggregate roots, and CQRS architectures.",
    takeaways: [
      "Inversion of Control and decoupling business logic from ORM models",
      "Implementing Unit of Work pattern with transactional database contexts",
      "Event-driven microservices architecture using RabbitMQ/Redis messaging"
    ],
    link: "https://www.cosmicpython.com/",
    type: "Classic Book"
  },
  {
    title: "PEP 703 — Making the Global Interpreter Lock Optional (nogil)",
    author: "Sam Gross & Python Core Development Team",
    role: "Official Python Enhancement Proposal & Python 3.13 Specification",
    description: "Authoritative architectural specification for free-threaded CPython. Replaces the global interpreter lock with mimalloc thread-safe memory allocator, biased reference counting, and immortal objects.",
    takeaways: [
      "Biased reference counting: single-threaded updates bypass atomic CPU instructions",
      "Immortal objects (None, True, False, small ints) eliminate reference counting overhead",
      "True multi-core Python execution for parallel AI/ML workloads without multiprocessing IPC"
    ],
    link: "https://peps.python.org/pep-0703/",
    type: "PEP"
  },
  {
    title: "Python 3.12+ C API & Runtime Architecture Specification",
    author: "Python Software Foundation (PSF)",
    role: "Official Technical Documentation & Specification",
    description: "Complete formal reference on the internal architecture of CPython: PyObject header structure, garbage collection generational linked lists, dictionary key-sharing tables, and PEG parser.",
    takeaways: [
      "PyObject header structure: 64-bit ob_refcnt and ob_type pointer layout",
      "Compact dictionary layout (PEP 468) saving 30-50% memory per instance",
      "Specializing Adaptive Interpreter (PEP 659) optimizing dynamic bytecode at runtime"
    ],
    link: "https://docs.python.org/3/c-api/index.html",
    type: "Official Spec"
  }
]

/* ═══════════════════════════════════════════════════════════════════════════
   PRODUCTION ENTERPRISE PROJECTS
   ═══════════════════════════════════════════════════════════════════════════ */
export const PYTHON_ENTERPRISE_PROJECTS: EnterpriseProject[] = [
  {
    id: "trading-gateway",
    title: "High-Throughput Real-Time Trading API Gateway",
    tagline: "Sub-5ms WebSocket Order Execution Engine with FastAPI & Redis Pub/Sub",
    difficulty: "Production Hard",
    architectureFlow: `[Trading Clients] ──WebSocket /ws/stream──> [FastAPI ASGI Engine (uvicorn)]
                                                │
                                    (Non-blocking Event Loop)
                                                ▼
                                    [Order Matching Engine]
                                                │
                          ┌─────────────────────┴─────────────────────┐
                          ▼                                           ▼
             [In-Memory Order Book]                      [Redis Streams Pub/Sub]
             (Custom Red-Black Tree)                     (Broadcast Market Data)
                          │                                           │
                          ▼                                           ▼
             [PostgreSQL / TimescaleDB]                  [Distributed Audit Logger]
             (ACID Financial Settlement)                 (Kafka / QuestDB Timeseries)`,
    techStack: ["Python 3.12+", "FastAPI", "Uvicorn", "Asyncio", "Redis Streams", "asyncpg", "TimescaleDB", "Docker"],
    overview: "Build a mission-critical financial trading gateway capable of processing 25,000 WebSocket order placements per second. Features atomic in-memory order matching, ring buffer event processing, asynchronous database connection pooling with asyncpg, and zero-allocation JSON serialization via orjson.",
    modules: [
      {
        name: "Non-Blocking ASGI WebSocket Multiplexer",
        description: "Manages 10,000+ persistent WebSocket connections using asyncio queues, heartbeat ping/pong frames, and client connection pools."
      },
      {
        name: "In-Memory Price-Time Priority Matching Engine",
        description: "Implements high-speed order matching with bisect-driven price ladders and dual doubly-linked queues for bids and asks."
      },
      {
        name: "Asynchronous Database Settlement via asyncpg",
        description: "Executes ACID order fills in PostgreSQL using prepared binary statements, optimistic transaction isolation, and connection pooling."
      }
    ],
    snippet: {
      filename: "gateway/order_engine.py",
      code: `import asyncio
from typing import Dict, Any
import orjson
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import asyncpg
import redis.asyncio as aioredis

app = FastAPI(title="Apex Trading Gateway")
redis_client = aioredis.from_url("redis://localhost:6379", decode_responses=False)
db_pool: asyncpg.Pool

@app.on_event("startup")
async def setup_pools():
    global db_pool
    db_pool = await asyncpg.create_pool(
        dsn="postgresql://trader:secret@localhost:5432/orders_db",
        min_size=10,
        max_size=50
    )

@app.websocket("/ws/orders/{account_id}")
async def order_stream(websocket: WebSocket, account_id: str):
    await websocket.accept()
    try:
        while True:
            raw_data = await websocket.receive_bytes()
            order = orjson.loads(raw_data)
            
            # Execute matching inside non-blocking async context
            async with db_pool.acquire() as conn:
                async with conn.transaction(isolation="serializable"):
                    result = await conn.fetchrow(
                        """
                        INSERT INTO orders (account_id, symbol, side, price, qty, status)
                        VALUES ($1, $2, $3, $4, $5, 'MATCHED')
                        RETURNING id, created_at
                        """,
                        account_id, order["symbol"], order["side"], order["price"], order["qty"]
                    )
            
            # Broadcast fill event via Redis Stream
            payload = orjson.dumps({
                "order_id": str(result["id"]),
                "account_id": account_id,
                "symbol": order["symbol"],
                "status": "FILLED"
            })
            await redis_client.xadd(f"trades:{order['symbol']}", {"data": payload})
            await websocket.send_bytes(payload)
    except WebSocketDisconnect:
        pass`
    }
  },
  {
    id: "task-orchestrator",
    title: "Distributed Asynchronous Task & Workflow Engine",
    tagline: "Resilient Distributed Job Pipeline with Celery, Redis & Heartbeat Monitoring",
    difficulty: "Production Hard",
    architectureFlow: `[Web Clients / Crons] ──POST /jobs──> [FastAPI Producer]
                                             │
                                  (Job Enqueue via Redis)
                                             ▼
                                    [Redis Broker Queues]
                                ┌────────────┼────────────┐
                                ▼            ▼            ▼
                         [High-Pri]     [Standard]    [Dead Letter Queue]
                                │            │            │
                                └────────────┼────────────┘
                                             ▼
                                  [Celery Worker Cluster]
                           (Prefetch, Exponential Backoff, Rate Limits)
                                             │
                                             ▼
                               [PostgreSQL Task State Store]
                               (State Machine: PENDING -> RUNNING -> SUCCESS)`,
    techStack: ["Python 3.12+", "Celery", "Redis", "Flower", "SQLAlchemy 2.0", "PostgreSQL", "Pydantic v2"],
    overview: "Architect an enterprise background task scheduler capable of resiliently processing millions of workflows daily. Incorporates distributed task locks with Redis Redlock, automatic exponential retry backoffs with jitter, dead-letter queues, and live cluster health monitoring.",
    modules: [
      {
        name: "Distributed Redlock Mutual Exclusion",
        description: "Guarantees single execution for idempotent billing and payout workflows across multi-node worker clusters."
      },
      {
        name: "Exponential Backoff & Dead-Letter Escalation",
        description: "Catches third-party API rate limits and transient network errors, rescheduling retries with randomized jitter."
      },
      {
        name: "Granular Worker Prefetch & Memory Limiting",
        description: "Configures worker concurrency, prefetch multipliers, and max tasks per child to prevent memory bloat during heavy batch jobs."
      }
    ],
    snippet: {
      filename: "workers/workflow_tasks.py",
      code: `import time
from celery import Celery
from celery.exceptions import MaxRetriesExceededError
import structlog

logger = structlog.get_logger()
celery_app = Celery(
    "tasks",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1"
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    worker_prefetch_multiplier=1,
    worker_max_tasks_per_child=1000
)

@celery_app.task(
    bind=True,
    autoretry_for=(Exception,),
    retry_kwargs={"max_retries": 5},
    retry_backoff=True,
    retry_backoff_max=600,
    retry_jitter=True
)
def process_settlement_batch(self, batch_id: str, payload: dict):
    logger.info("Executing settlement task", batch_id=batch_id, attempt=self.request.retries)
    try:
        # Simulation of enterprise batch processing
        time.sleep(0.5)
        return {"status": "COMPLETED", "batch_id": batch_id, "processed_items": len(payload.get("items", []))}
    except Exception as exc:
        logger.error("Settlement failure, scheduling retry", batch_id=batch_id, error=str(exc))
        raise self.retry(exc=exc)`
    }
  },
  {
    id: "ml-serving",
    title: "Low-Latency Production ML Model Inference Server",
    tagline: "Dynamic Batching & Zero-Copy Tensor Inference Engine with ONNX Runtime & FastAPI",
    difficulty: "Production Hard",
    architectureFlow: `[Client Requests] ──HTTP/2 POST /predict──> [FastAPI ASGI Frontend]
                                                    │
                                     (Queue into Micro-Batch Buffer)
                                                    ▼
                                      [Dynamic Batching Engine]
                                      (Collects 32 requests in 5ms)
                                                    │
                                                    ▼
                                      [Zero-Copy Shared Memory]
                                      (NumPy Contiguous Tensor Array)
                                                    │
                                                    ▼
                                       [ONNX Runtime C++ Engine]
                                       (CUDA / TensorRT GPU Inference)
                                                    │
                                                    ▼
                                      [Demux Batch & Return JSON]`,
    techStack: ["Python 3.12+", "ONNX Runtime", "NumPy", "FastAPI", "Uvicorn", "CUDA / TensorRT", "Prometheus"],
    overview: "Construct a high-performance deep learning inference service serving transformer and vision models. Features dynamic micro-batching to saturate GPU compute, shared-memory zero-copy tensor buffers, and real-time P99 latency instrumentation with Prometheus metrics.",
    modules: [
      {
        name: "Async Dynamic Micro-Batching Queue",
        description: "Aggregates concurrent single-item inference requests into compact matrix batches within a 5ms latency SLA window."
      },
      {
        name: "Zero-Copy Tensor Serialization with NumPy",
        description: "Eliminates Python memory allocations by reusing pre-allocated contiguous memory pools for input/output vectors."
      },
      {
        name: "Prometheus P95/P99 Latency Telemetry",
        description: "Instruments inference timings, queue wait durations, and GPU memory saturation metrics for Grafana observability."
      }
    ],
    snippet: {
      filename: "serving/inference_engine.py",
      code: `import asyncio
import numpy as np
import onnxruntime as ort
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI(title="Vector Inference Server")

class InferenceRequest(BaseModel):
    features: list[float]

class InferenceEngine:
    def __init__(self, model_path: str):
        opts = ort.SessionOptions()
        opts.intra_op_num_threads = 4
        opts.execution_mode = ort.ExecutionMode.ORT_SEQUENTIAL
        opts.graph_optimization_level = ort.GraphOptimizationLevel.ORT_ENABLE_ALL
        self.session = ort.InferenceSession(model_path, opts, providers=["CPUExecutionProvider"])
        self.input_name = self.session.get_inputs()[0].name
        self.queue = asyncio.Queue()
        asyncio.create_task(self._batch_processor())

    async def _batch_processor(self):
        while True:
            batch = []
            timeout = 0.005 # 5ms dynamic batch window
            try:
                item = await self.queue.get()
                batch.append(item)
                start_time = asyncio.get_event_loop().time()
                while len(batch) < 32:
                    remaining = timeout - (asyncio.get_event_loop().time() - start_time)
                    if remaining <= 0:
                        break
                    try:
                        item = await asyncio.wait_for(self.queue.get(), timeout=remaining)
                        batch.append(item)
                    except asyncio.TimeoutError:
                        break
            except Exception:
                continue

            # Assemble batch tensor
            tensors = [b[0] for b in batch]
            futures = [b[1] for b in batch]
            input_tensor = np.stack(tensors, axis=0).astype(np.float32)
            
            # Execute C++ ONNX model inference
            outputs = self.session.run(None, {self.input_name: input_tensor})[0]
            for idx, fut in enumerate(futures):
                fut.set_result(outputs[idx].tolist())

engine = InferenceEngine("models/classifier.onnx")

@app.post("/predict")
async def predict(req: InferenceRequest):
    if len(req.features) != 128:
        raise HTTPException(status_code=400, detail="Feature vector must be exactly 128 dimensions")
    fut = asyncio.get_event_loop().create_future()
    await engine.queue.put((np.array(req.features, dtype=np.float32), fut))
    result = await fut
    return {"prediction": result}`
    }
  }
]

/* ═══════════════════════════════════════════════════════════════════════════
   DIAGNOSTIC PLACEMENT QUIZ
   ═══════════════════════════════════════════════════════════════════════════ */
export const PYTHON_DIAGNOSTIC_QUIZ = [
  {
    id: 1,
    question: "What is the exact output of: a = [1, 2, 3]; b = a; b.append(4); print(len(a))?",
    options: ["3", "4", "Raises TypeError", "Undefined"],
    correctIndex: 1,
    explanation: "In Python, variable assignment does not copy the underlying object; both 'a' and 'b' bind to the exact same list instance in Heap memory (shared reference).",
    level: "Beginner"
  },
  {
    id: 2,
    question: "Why does 'a = 256; b = 256; a is b' evaluate to True, but 'a = 1000; b = 1000; a is b' evaluate to False in interactive CPython?",
    options: [
      "Integers > 256 are automatically stored as floating-point IEEE-754 numbers",
      "CPython pre-allocates and caches an internal array of small integers from -5 to 256",
      "The 'is' operator performs value equality for numbers below 500",
      "Python 64-bit architecture only supports 8-bit pointer tagging"
    ],
    correctIndex: 1,
    explanation: "CPython maintains a static internal cache for small integers in the range [-5, 256]. Any reference to these numbers reuses the identical PyLongObject instance in memory.",
    level: "Beginner"
  },
  {
    id: 3,
    question: "In Python method resolution order (MRO), which algorithm resolves diamond inheritance hierarchies?",
    options: [
      "Depth-First Search (DFS) with left-to-right backtracking",
      "Breadth-First Search (BFS) with priority queues",
      "C3 Superconformation Linearization Algorithm",
      "Dijkstra Shortest Path Traversal"
    ],
    correctIndex: 2,
    explanation: "Python uses the C3 Linearization algorithm (introduced in Python 2.3) to establish a deterministic, monotonic Method Resolution Order that respects local precedence and monotonicity.",
    level: "Intermediate"
  },
  {
    id: 4,
    question: "What occurs under the hood when a generator function encounters a 'yield' statement?",
    options: [
      "The function terminates and its call frame is permanently deallocated from memory",
      "A new thread is spawned by the OS kernel to hold return values",
      "The CPython interpreter pauses execution, preserves local frame registers, and transfers control back to the caller",
      "The generator writes its return value to a temporary disk buffer"
    ],
    correctIndex: 2,
    explanation: "Generators preserve their entire PyFrameObject state (local variables, instruction pointer f_lasti, evaluation stack) on the heap when yielding, resuming instantaneously on next().",
    level: "Intermediate"
  },
  {
    id: 5,
    question: "How does CPython detect and deallocate circular references (e.g. object A references B, and B references A)?",
    options: [
      "Pure reference counting alone automatically decrements circular pointers to 0",
      "A generational cyclic Garbage Collector (Gen 0, Gen 1, Gen 2) tracks doubly-linked lists of container objects and detects unreachable reference graphs",
      "CPython relies solely on operating system memory page reclamation when processes exit",
      "The Global Interpreter Lock (GIL) periodically resets all heap references"
    ],
    correctIndex: 1,
    explanation: "While reference counting handles 99% of deallocations instantly, circular references are resolved by CPython's generational cyclic garbage collector traversing doubly linked lists of PyGC_Head container structures.",
    level: "Hard"
  },
  {
    id: 6,
    question: "What is the primary architectural mechanism of Python's 'asyncio' event loop?",
    options: [
      "It spawns an isolated OS kernel thread for each individual coroutine",
      "A single-threaded cooperative multitasking loop multiplexing I/O file descriptors via non-blocking OS primitives (epoll/kqueue/IOCP)",
      "It compiles Python bytecode into CUDA GPU kernels",
      "It bypasses the CPython GIL by running code in sub-interpreters"
    ],
    correctIndex: 1,
    explanation: "Asyncio uses a single-threaded reactor pattern powered by OS non-blocking I/O event demultiplexers (epoll on Linux, kqueue on macOS, IOCP on Windows), cooperatively pausing coroutines at 'await' points.",
    level: "Hard"
  }
]

/* ═══════════════════════════════════════════════════════════════════════════
   FULL 24-CHAPTER ASCI PYTHON MASTER CURRICULUM
   ═══════════════════════════════════════════════════════════════════════════ */
import { pythonCurriculumPart1 } from "./python-curriculum-part1"
import { pythonCurriculumPart2 } from "./python-curriculum-part2"
import { pythonCurriculumPart3 } from "./python-curriculum-part3"

export const pythonCourseCurriculum: Part[] = [
  pythonCurriculumPart1,
  pythonCurriculumPart2,
  pythonCurriculumPart3
]

