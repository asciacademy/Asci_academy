import {
  Terminal, Box, Layers, PlaySquare, Grid, Type, Clock, Repeat,
  Cpu, Database, Network, ShieldCheck, BookOpen, Code2, Server,
  Sparkles, CheckCircle2, Award, Zap, FileText, Binary, GitBranch,
  LayoutGrid
} from "lucide-react"

export type LessonType = 'concept' | 'practice'
export type CourseLevel = 'Beginner' | 'Intermediate' | 'Hard'

export interface ProgramWorkingStep {
  step: number
  line: string
  memoryState: string
  explanation: string
}

export interface InterviewQA {
  question: string
  answer: string
}

export interface LessonQuiz {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface BookResource {
  title: string
  type: 'Book' | 'PDF' | 'Spec' | 'Whitepaper'
  author?: string
  link?: string
  note?: string
}

export interface Lesson {
  id: string
  title: string
  type: LessonType
  level: CourseLevel
  tldr: string
  description: string
  code?: string
  flowchart?: string
  programWorking?: ProgramWorkingStep[]
  interviewQuestions?: InterviewQA[]
  quiz?: LessonQuiz
  resources?: BookResource[]
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced'
  xpReward?: number
  icon?: any
  color?: string
}

export interface Chapter {
  id: string
  title: string
  level: CourseLevel
  summary?: string
  concepts: Lesson[]
  problems: Lesson[]
  missions?: Lesson[]
}

export interface Part {
  id: string
  title: string
  level: CourseLevel
  badge: string
  description: string
  chapters: Chapter[]
}

export interface JavaBook {
  id: string
  title: string
  subtitle: string
  author: string
  coverColor: string
  level: CourseLevel
  type: 'Book' | 'PDF Specification' | 'Whitepaper'
  description: string
  keyTakeaways: string[]
  recommendedChapters: string
  specUrl: string
}

export interface EnterpriseProject {
  id: string
  title: string
  level: CourseLevel
  badge: string
  domain: string
  estimatedHours: string
  overview: string
  architectureFlow: string
  coreModules: { name: string; tech: string; description: string }[]
  keyChallenges: string[]
  codePreview: string
}

export interface DiagnosticQuestion {
  id: string
  level: CourseLevel
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

const CORAL = "#2563eb"
const TERRACOTTA = "#3b82f6"
const PURPLE = "#6366f1"
const GOLD = "#D4B872"
const EMERALD = "#10b981"

/* ═══════════════════════════════════════════════════════════════════════════
   CURATED REFERENCE BOOKS & OFFICIAL PDF SPECIFICATIONS
   ═══════════════════════════════════════════════════════════════════════════ */
export const JAVA_BOOKS_AND_PDFS: JavaBook[] = [
  {
    id: "effective-java",
    title: "Effective Java (3rd Edition)",
    subtitle: "The Definitive Guide to Best Practices in Modern Java",
    author: "Joshua Bloch (Former Chief Java Architect at Google)",
    coverColor: "from-blue-600/20 via-card to-background",
    level: "Intermediate",
    type: "Book",
    description: "The gold standard for production Java engineering. Contains 90 actionable items covering Object creation, defensive copying, immutability, generics, enums, lambdas, streams, and concurrency invariants.",
    keyTakeaways: [
      "Item 1: Consider static factory methods instead of constructors",
      "Item 2: Consider a builder when faced with many constructor parameters",
      "Item 17: Minimize mutability (make classes immutable by default)",
      "Item 31: Use bounded wildcards to increase API flexibility (PECS)",
      "Item 79: Avoid excessive synchronization to prevent deadlocks and latency"
    ],
    recommendedChapters: "Chapter 2 (Creating/Destroying Objects), Chapter 5 (Generics), Chapter 7 (Lambdas & Streams)",
    specUrl: "https://www.oreilly.com/library/view/effective-java-3rd/9780134686097/"
  },
  {
    id: "jcip",
    title: "Java Concurrency in Practice",
    subtitle: "The Industry Authority on Multithreading & Memory Models",
    author: "Brian Goetz, Tim Peierls, Joshua Bloch, Doug Lea",
    coverColor: "from-purple-600/20 via-card to-background",
    level: "Hard",
    type: "Book",
    description: "Essential reading for high-throughput distributed systems engineers. Explains thread safety, immutability, synchronization mechanisms, Java Memory Model (JMM) happens-before rules, lock-free algorithms, and Doug Lea's java.util.concurrent.",
    keyTakeaways: [
      "Thread safety equals managing access to mutable state",
      "Visibility guarantees via volatile and synchronized memory barriers",
      "Designing thread-safe classes without external locking",
      "Explicit locks vs intrinsic monitors: ReentrantLock performance",
      "Non-blocking synchronizers via compare-and-swap (CAS) primitives"
    ],
    recommendedChapters: "Part I (Fundamentals), Part II (Structuring Concurrent Applications), Part IV (Advanced Topics)",
    specUrl: "https://jcip.net/"
  },
  {
    id: "jvm-spec-21",
    title: "The Java® Virtual Machine Specification (Java SE 21 Edition)",
    subtitle: "Official Oracle Hardware Architecture & Bytecode Specification",
    author: "Tim Lindholm, Frank Yellin, Gilad Bracha, Alex Buckley",
    coverColor: "from-blue-600/20 via-card to-background",
    level: "Hard",
    type: "PDF Specification",
    description: "The authoritative engineering specification of the JVM machine architecture. Details class file structure (.class format), bytecode instruction set, verification pipeline, runtime data areas, and frame mechanics.",
    keyTakeaways: [
      "Chapter 2: The Structure of the Java Virtual Machine (PC Register, JVM Stacks, Heap, Method Area)",
      "Chapter 4: The class File Format (Constant pool tags, attributes, bytecode tables)",
      "Chapter 5: Loading, Linking, and Initializing (Class verification & parent delegation)",
      "Chapter 6: The Java Virtual Machine Instruction Set (Opcodes & operand stack manipulation)"
    ],
    recommendedChapters: "Chapter 2 (JVM Memory Model) & Chapter 4 (Classfile Binary Format)",
    specUrl: "https://docs.oracle.com/javase/specs/jvms/se21/html/index.html"
  },
  {
    id: "jls-spec-21",
    title: "The Java® Language Specification (Java SE 21 Edition)",
    subtitle: "Formal Language Grammar, Type System & Semantics",
    author: "James Gosling, Bill Joy, Guy Steele, Gilad Bracha, Alex Buckley",
    coverColor: "from-blue-600/20 via-card to-background",
    level: "Hard",
    type: "PDF Specification",
    description: "The complete mathematical and semantic definition of the Java programming language, covering type inference, definite assignment, pattern matching for switch, sealed types, and memory models.",
    keyTakeaways: [
      "Chapter 4: Types, Values, and Variables (Subtyping rules & boxing conversions)",
      "Chapter 8: Classes (Inheritance, overriding vs hiding, constructors)",
      "Chapter 14: Blocks and Statements (Enhanced switch expressions)",
      "Chapter 17: Threads and Locks (Formal JMM happens-before consistency)"
    ],
    recommendedChapters: "Chapter 15 (Expressions) & Chapter 17 (Threads & Locks)",
    specUrl: "https://docs.oracle.com/javase/specs/jls/se21/html/index.html"
  },
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    subtitle: "Reliability, Scalability, and Maintainability in Backend Systems",
    author: "Martin Kleppmann (University of Cambridge)",
    coverColor: "from-indigo-600/20 via-card to-background",
    level: "Hard",
    type: "Book",
    description: "While language-agnostic, this is the definitive systems architecture guide for Java backend engineers building microservices, transactional databases, stream processing engines (Kafka/Flink), and consensus systems.",
    keyTakeaways: [
      "Reliability, scalability, and maintainability metrics",
      "Storage engines: B-Trees vs LSM-Trees in high-write Java workloads",
      "Transactions: ACID, isolation levels (Dirty Reads, Phantom Reads, SSI)",
      "Distributed transactions: Two-phase commit vs Saga orchestrations"
    ],
    recommendedChapters: "Chapter 3 (Storage & Retrieval), Chapter 7 (Transactions), Chapter 11 (Stream Processing)",
    specUrl: "https://dataintensive.net/"
  },
  {
    id: "optimizing-java",
    title: "Optimizing Java: A Practical Guide to High Performance",
    subtitle: "JVM Architecture, Garbage Collection, JIT & Microbenchmarks",
    author: "Benjamin J. Evans, James Gough, Chris Newland",
    coverColor: "from-blue-600/20 via-card to-background",
    level: "Hard",
    type: "Book",
    description: "A hands-on manual for dissecting JVM performance under production loads. Deep-dives into bytecode, tiered JIT compilation (C1/C2), G1GC and ZGC tuning, memory leaks, JMH benchmarks, and hardware mechanical sympathy.",
    keyTakeaways: [
      "Dissecting HotSpot: JIT compilation, method inlining, escape analysis",
      "Garbage Collection internals: Safepoints, card tables, remembered sets",
      "Writing accurate Java microbenchmarks with JMH",
      "Profiling CPU cache misses, branch mispredictions, and false sharing"
    ],
    recommendedChapters: "Chapter 6 (Garbage Collection), Chapter 8 (JIT Compilation), Chapter 11 (High Performance Java)",
    specUrl: "https://www.oreilly.com/library/view/optimizing-java/9781492025788/"
  }
]

/* ═══════════════════════════════════════════════════════════════════════════
   REAL-WORLD ENTERPRISE PRODUCTION PROJECTS (HARD / ADVANCED TIER)
   ═══════════════════════════════════════════════════════════════════════════ */
export const JAVA_ENTERPRISE_PROJECTS: EnterpriseProject[] = [
  {
    id: "proj-ecommerce-order-engine",
    title: "High-Throughput E-Commerce Order & Inventory Engine",
    level: "Hard",
    badge: "Production Distributed Architecture",
    domain: "FinTech & Retail Scale Systems",
    estimatedHours: "40-50 Hours",
    overview: "Build a high-performance transactional order placement engine capable of handling 50,000 requests/second with zero overselling, utilizing optimistic locking, distributed transactions via Saga pattern, idempotent payment processing, and Kafka event publishing.",
    architectureFlow: `
[Client App] ──HTTPS POST /orders──> [API Gateway / Rate Limiter]
                                               │
                                      (Non-blocking Netty)
                                               ▼
                                   [Order Processing Service]
                                       ┌───────┴────────┐
                                       ▼                ▼
                          [Optimistic Locking]  [Distributed Cache]
                          [PostgreSQL / ACID]   [Redis Token Bucket]
                                       │
                                (Event Driven)
                                       ▼
                             [Apache Kafka Cluster]
                         ┌─────────────┼─────────────┐
                         ▼             ▼             ▼
                  [Payment Saga] [Inventory Svc] [Audit Notification]
`,
    coreModules: [
      {
        name: "Concurrency Control Module",
        tech: "Java 21 Virtual Threads, ReentrantLock, AtomicLong",
        description: "Enforces zero-race-condition inventory reservations using database versioning (@Version) and compare-and-swap state transitions."
      },
      {
        name: "Idempotent Payment Pipeline",
        tech: "Spring Boot 3.3, Resilience4j, UUIDv7",
        description: "Guarantees exactly-once charge execution through cryptographically signed idempotency keys and stateful Redis deduplication."
      },
      {
        name: "Event Sourcing & Saga Orchestration",
        tech: "Apache Kafka, Avro Serialization",
        description: "Manages multi-service rollbacks (compensating transactions) if inventory allocation or payment capture fails midway."
      }
    ],
    keyChallenges: [
      "Eliminating phantom overselling during massive flash sales (Hot-key problem in Redis).",
      "Preventing database deadlocks when multiple orders lock complementary item IDs.",
      "Tuning JVM heap allocations and G1GC pauses under high allocation rates."
    ],
    codePreview: `@Service
public class OrderReservationEngine {
    private final ProductRepository productRepo;
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public OrderResponse reserveInventory(OrderCommand cmd) {
        // Optimistic locking via @Version check
        Product product = productRepo.findByIdWithLock(cmd.productId())
            .orElseThrow(() -> new ProductNotFoundException(cmd.productId()));

        if (product.getAvailableStock() < cmd.quantity()) {
            throw new InsufficientStockException("Out of stock: " + cmd.productId());
        }

        product.decrementStock(cmd.quantity()); // Increments version column
        productRepo.save(product);

        OrderEvent event = new OrderEvent(cmd.orderId(), cmd.productId(), OrderStatus.RESERVED);
        kafkaTemplate.send("order-events", cmd.orderId(), event);
        return new OrderResponse(cmd.orderId(), ReservationStatus.CONFIRMED);
    }
}`
  },
  {
    id: "proj-nio-websocket-gateway",
    title: "Real-Time Distributed Chat & Event Gateway with Java NIO",
    level: "Hard",
    badge: "Low-Level Network Systems",
    domain: "Real-Time Communications & Gaming",
    estimatedHours: "35-45 Hours",
    overview: "Construct an asynchronous, low-latency WebSocket message broker from first principles using Java NIO Channels, Selectors, and ByteBuffers. Capable of maintaining 100,000 persistent socket connections per server with sub-millisecond message fan-out.",
    architectureFlow: `
[100k TCP WebSockets] ──> [Java NIO ServerSocketChannel]
                                    │
                         (Reactor Pattern Event Loop)
                                    ▼
                          [NIO Selector (epoll)]
                         ┌──────────┴──────────┐
                         ▼                     ▼
                 [Read / Decode Worker] [Write Buffer Queue]
                         │                     ▲
                  (Zero-Copy Off-Heap)         │
                         ▼                     │
                 [Concurrent RingBuffer (Disruptor Engine)]
                         │
                         ▼
             [Topic Subscription Router & Fanout]
`,
    coreModules: [
      {
        name: "NIO Reactor Event Loop",
        tech: "java.nio.channels.Selector, Linux epoll",
        description: "Single-threaded or low-threaded selector managing non-blocking read/write availability across thousands of client channels."
      },
      {
        name: "Zero-Copy Protocol Parser",
        tech: "Direct ByteBuffer, ByteBuf pool",
        description: "Parses RFC 6455 WebSocket framing masks and payloads off-heap without allocating temporary byte[] arrays on the Java Heap."
      },
      {
        name: "Lock-Free Fanout Engine",
        tech: "LMAX Disruptor, RingBuffer, AtomicReferenceArray",
        description: "Delivers broadcast messages to thousands of channel write queues without thread contention or synchronized bottlenecks."
      }
    ],
    keyChallenges: [
      "Handling slow consumers without crashing the server with OutOfMemoryError in write buffers.",
      "Diagnosing memory leaks when using Direct ByteBuffers outside JVM garbage collection.",
      "Safely managing TCP connection drops, half-open sockets, and heartbeat keep-alives."
    ],
    codePreview: `public class NioReactorGateway implements Runnable {
    private final Selector selector;
    private final ServerSocketChannel serverChannel;

    public NioReactorGateway(int port) throws IOException {
        this.selector = Selector.open();
        this.serverChannel = ServerSocketChannel.open();
        this.serverChannel.bind(new InetSocketAddress(port));
        this.serverChannel.configureBlocking(false);
        this.serverChannel.register(selector, SelectionKey.OP_ACCEPT);
    }

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            selector.select(100);
            Set<SelectionKey> selected = selector.selectedKeys();
            Iterator<SelectionKey> iter = selected.iterator();
            while (iter.hasNext()) {
                SelectionKey key = iter.next();
                iter.remove();
                if (key.isAcceptable()) handleAccept();
                else if (key.isReadable()) handleRead(key);
            }
        }
    }
}`
  },
  {
    id: "proj-distributed-rate-limiter",
    title: "Distributed Token-Bucket Rate Limiter & API Gateway Filter",
    level: "Hard",
    badge: "Cloud Infrastructure & SRE",
    domain: "API Security & Traffic Engineering",
    estimatedHours: "25-35 Hours",
    overview: "Design a high-precision, low-latency rate limiter implementing the Token Bucket and Sliding Window Counter algorithms. Operates as an asynchronous Spring Cloud Gateway filter integrated with Redis Lua scripts for sub-millisecond atomic quotas.",
    architectureFlow: `
[Inbound Traffic: 100k req/s] ──> [Spring Cloud Gateway]
                                          │
                                 [Reactive WebFilter]
                                          ▼
                         [Local L1 Memory Cache (Caffeine)]
                                          │
                               (Cache Miss / Sync)
                                          ▼
                            [Redis Cluster (Atomic Lua)]
                             ┌────────────┴────────────┐
                             ▼                         ▼
                     [Tokens Available]         [Quota Exceeded]
                             │                         │
                             ▼                         ▼
                    (Forward to Upstream)       (HTTP 429 Retry-After)
`,
    coreModules: [
      {
        name: "Token Bucket Algorithm Engine",
        tech: "Redis Lua script, AtomicLong, System.nanoTime()",
        description: "Computes continuous token refilling mathematically on each request without running background timer threads."
      },
      {
        name: "Multi-Tier Rate Limiting Cache",
        tech: "Caffeine Cache (L1) + Redis Sentinel (L2)",
        description: "Caches authorization decisions locally for micro-seconds to shield Redis from hot-key network bottlenecks."
      },
      {
        name: "Dynamic Quota Policy Engine",
        tech: "Spring Boot 3, Project Reactor, JWT Claims",
        description: "Applies differentiated limits based on API tier (Free: 10 req/s, Pro: 500 req/s, Enterprise: 5000 req/s)."
      }
    ],
    keyChallenges: [
      "Guaranteeing clock synchronization resilience against NTP time jumps.",
      "Eliminating race conditions between token check and token decrement via single atomic Lua scripts.",
      "Ensuring sub-2ms P99 latency overhead on all forwarded API requests."
    ],
    codePreview: `public Mono<Boolean> isAllowed(String apiKey, int capacity, int refillRatePerSec) {
    String luaScript = """
        local key = KEYS[1]
        local capacity = tonumber(ARGV[1])
        local rate = tonumber(ARGV[2])
        local now = tonumber(ARGV[3])
        -- Calculate refill based on elapsed time
        local data = redis.call('HMGET', key, 'tokens', 'lastRefill')
        local tokens = tonumber(data[1]) or capacity
        local last = tonumber(data[2]) or now
        local delta = math.max(0, now - last)
        tokens = math.min(capacity, tokens + delta * rate)
        if tokens >= 1 then
            redis.call('HMSET', key, 'tokens', tokens - 1, 'lastRefill', now)
            return 1
        else
            return 0
        end
    """;
    return reactiveRedis.execute(RedisScript.of(luaScript, Long.class), 
        List.of("rate:" + apiKey), 
        List.of(String.valueOf(capacity), String.valueOf(refillRatePerSec), String.valueOf(Instant.now().getEpochSecond())))
        .next().map(res -> res == 1L);
}`
  }
]

/* ═══════════════════════════════════════════════════════════════════════════
   INTERACTIVE PLACEMENT & DIAGNOSTIC QUIZ
   ═══════════════════════════════════════════════════════════════════════════ */
export const JAVA_DIAGNOSTIC_QUIZ: DiagnosticQuestion[] = [
  {
    id: "diag-1",
    level: "Beginner",
    question: "Where are local primitive variables stored during method execution in Java?",
    options: [
      "In the Garbage-Collected Heap",
      "On the thread's private Stack frame",
      "In the Metaspace Method Area",
      "In the Constant String Pool"
    ],
    correctIndex: 1,
    explanation: "Local primitive variables declared inside methods are stored directly on the calling thread's private Stack memory frame, popped automatically upon method exit."
  },
  {
    id: "diag-2",
    level: "Beginner",
    question: "What happens when you execute: String s1 = \"hello\"; String s2 = s1 + \" world\";?",
    options: [
      "s1 is mutated in-place inside the String Pool",
      "A new String object is allocated on the Heap because Strings are immutable",
      "The JVM throws a CompilationError because '+' is not supported on Strings",
      "s2 points to the same memory address as s1"
    ],
    correctIndex: 1,
    explanation: "Java Strings are strictly immutable. Concatenation creates a new String object (internally using StringBuilder in modern Java), leaving the original \"hello\" unchanged."
  },
  {
    id: "diag-3",
    level: "Intermediate",
    question: "In Java 8+, what happens inside a HashMap bucket when the number of colliding entries exceeds the threshold of 8?",
    options: [
      "The HashMap throws an OutOfMemoryError",
      "The entire HashMap is cleared and re-hashed with double capacity",
      "The linked list is transformed into a balanced Red-Black Tree (TreeNode) for O(log N) lookup",
      "Old colliding entries are silently evicted using LRU policy"
    ],
    correctIndex: 2,
    explanation: "Java 8 introduced treeification: when a bucket's collisions exceed TREEIFY_THRESHOLD (8) and the table capacity is at least 64, the linked list converts to a Red-Black Tree to defend against HashDoS attacks."
  },
  {
    id: "diag-4",
    level: "Intermediate",
    question: "Which of the following guarantees both visibility and ordering across threads without acquiring an exclusive lock?",
    options: [
      "final keyword",
      "volatile variable modifier",
      "synchronized block",
      "Thread.sleep()"
    ],
    correctIndex: 1,
    explanation: "The volatile keyword provides memory visibility and establishes happens-before ordering by inserting CPU memory barriers, preventing compiler instruction reordering without acquiring monitor locks."
  },
  {
    id: "diag-5",
    level: "Hard",
    question: "In the Java Virtual Machine, what is the core responsibility of the G1 (Garbage-First) collector?",
    options: [
      "Collect memory only when the entire JVM heap reaches 100% capacity",
      "Divide the heap into equal-sized regional blocks and prioritize collecting regions with the highest ratio of garbage within a target pause time",
      "Disable all Garbage Collection pauses by writing all allocations to disk",
      "Single-thread stop-the-world compaction on the young generation only"
    ],
    correctIndex: 1,
    explanation: "G1 partitions the heap into equal memory regions (~1MB to 32MB) and tracks how much live data each region contains. It prioritizes reclaiming regions that are mostly garbage (Garbage-First) to meet user-defined pause time targets."
  },
  {
    id: "diag-6",
    level: "Hard",
    question: "What is the key architectural difference between Platform Threads and Java 21 Virtual Threads (Project Loom)?",
    options: [
      "Virtual Threads can only run single-threaded code and cannot use locks",
      "Platform Threads are 1:1 OS kernel threads, while Virtual Threads are lightweight M:N user-mode threads managed entirely by the JVM",
      "Virtual Threads consume 100MB of RAM each",
      "Virtual Threads execute on the GPU rather than the CPU"
    ],
    correctIndex: 1,
    explanation: "Virtual Threads are lightweight user-mode threads managed by the JVM runtime rather than the OS kernel. Millions of virtual threads can be mapped onto a handful of carrier OS threads (M:N scheduling), eliminating thread pool exhaustion during blocking I/O."
  }
]

/* ═══════════════════════════════════════════════════════════════════════════
   FULL 3-TIER JAVA CURRICULUM DATASET (BEGINNER, INTERMEDIATE, HARD)
   ═══════════════════════════════════════════════════════════════════════════ */
export const javaCourseCurriculum: Part[] = [
  /* ─────────────────────────────────────────────────────────────────────────
     PART I — BEGINNER: JAVA FOUNDATIONS & MACHINE MECHANICS
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "java-part-1-beginner",
    title: "PART I — Java Foundations & Machine Mechanics",
    level: "Beginner",
    badge: "Foundations & Syntax",
    description: "Build an ironclad mental model of computation, JVM bytecode execution, memory allocations, control flow, arrays, and recursion.",
    chapters: [
      {
        id: "java-ch-1",
        title: "Chapter 1 — Introduction to Java & The JVM Engine",
        level: "Beginner",
        summary: "Understand how human code converts to bytecode and runs on the Java Virtual Machine across any OS.",
        concepts: [
          {
            id: "java-1-1",
            title: "Computational Thinking & The Compiler Pipeline",
            type: "concept",
            level: "Beginner",
            tldr: "Learn how to think like a compiler: breaking down problems into deterministic instructions.",
            description: "Programming is the discipline of expressing exact logic that a CPU can execute. In Java, every operation is governed by strict types, explicit memory boundaries, and structured classes.\n\n• **Source Code (`.java`)**: Human-readable high-level instructions.\n• **Compiler (`javac`)**: Verifies types, syntax, and translates source code into machine-independent instructions.\n• **Bytecode (`.class`)**: Binary intermediate representation understood by the JVM.\n• **JVM Runtime**: Loads bytecode, verifies memory safety, and executes via an Interpreter and Just-In-Time (JIT) compiler.",
            flowchart: `
+------------------+          +------------------+          +------------------+
|  MyProgram.java  | =======> |   javac Compiler | =======> |  MyProgram.class |
|  (Source Code)   |          |  (Syntax & Types)|          |  (Bytecode Opcodes|
+------------------+          +------------------+          +------------------+
                                                                     |
                                                                     v
                                                            +------------------+
                                                            |  JVM ClassLoader |
                                                            +------------------+
                                                                     |
                                                                     v
                                                            +------------------+
                                                            | JIT / Execution  |
                                                            +------------------+
                                                                     |
                                                                     v
                                                            [CPU Machine Code]
`,
            code: `// The foundational structure of every Java program
public class Main {
    public static void main(String[] args) {
        // System.out represents standard output stream (stdout)
        System.out.println("Hello, Engineered World!");
    }
}`,
            programWorking: [
              {
                step: 1,
                line: "javac Main.java",
                memoryState: "Disk: Main.java -> Main.class generated (Bytecode instructions: invokevirtual, getstatic)",
                explanation: "The compiler checks syntax and converts the human code into JVM bytecode instructions."
              },
              {
                step: 2,
                line: "java Main",
                memoryState: "JVM initialized: Main.class loaded into Metaspace / Method Area",
                explanation: "The JVM Bootstrap and Application ClassLoaders verify and load the bytecode."
              },
              {
                step: 3,
                line: "main() stack frame pushed",
                memoryState: "Stack: main(args[]) frame allocated with return address and local variable table",
                explanation: "The JVM begins execution at the public static void main entry point."
              },
              {
                step: 4,
                line: "System.out.println(...)",
                memoryState: "Output Stream: Bytes emitted to standard terminal buffer",
                explanation: "Hardware writes bytes to console, main() frame pops, and JVM exits cleanly with status code 0."
              }
            ],
            interviewQuestions: [
              {
                question: "Why is Java called 'Platform Independent' if the JVM itself is platform-dependent?",
                answer: "The compiled Java Bytecode (.class) is completely platform-independent and can run on any architecture without modification. However, the JVM implementation itself must be tailored for each OS/CPU (Windows x86, Linux ARM, macOS) to translate that bytecode into native machine instructions."
              }
            ],
            quiz: {
              question: "Which component of the Java ecosystem directly converts source code (.java) into bytecode (.class)?",
              options: [
                "JVM (Java Virtual Machine)",
                "javac (Java Compiler)",
                "JRE (Java Runtime Environment)",
                "JIT (Just-In-Time Compiler)"
              ],
              correctIndex: 1,
              explanation: "javac is the compiler that parses .java text files and compiles them into intermediate bytecode (.class). The JVM executes that bytecode."
            },
            resources: [
              { title: "JVM Specification (Java SE 21) - Chapter 2", type: "Spec", note: "Authoritative definition of JVM architecture." }
            ],
            icon: Terminal,
            color: CORAL
          },
          {
            id: "java-1-2",
            title: "The Holy Trinity: JDK vs JRE vs JVM",
            type: "concept",
            level: "Beginner",
            tldr: "The Tooling Kit, The Runtime Environment, and The Virtual Execution Engine.",
            description: "Understanding the separation of concerns across the Java development and production execution pipeline:\n\n• **JDK (Java Development Kit)**: Contains the compiler (`javac`), archiver (`jar`), debugger (`jdb`), and diagnostic tools (`jconsole`, `jcmd`) plus the JRE.\n• **JRE (Java Runtime Environment)**: Contains the core standard library classes (`rt.jar` / modules) and the JVM. It is all that is needed to run pre-compiled Java.\n• **JVM (Java Virtual Machine)**: The abstract software computer that manages registers, stacks, heaps, garbage collection, and executes bytecode instructions.",
            flowchart: `
+-------------------------------------------------------------+
| JDK (Java Development Kit)                                   |
|   javac, jdb, jar, jcmd, jlink, jconsole                    |
|                                                             |
|   +-----------------------------------------------------+   |
|   | JRE (Java Runtime Environment)                      |   |
|   |   Standard Libraries (java.base, java.util, etc.)   |   |
|   |                                                     |   |
|   |   +---------------------------------------------+   |   |
|   |   | JVM (Java Virtual Machine)                  |   |   |
|   |   |   ClassLoader | Execution Engine | GC       |   |   |
|   |   +---------------------------------------------+   |   |
|   +-----------------------------------------------------+   |
+-------------------------------------------------------------+
`,
            code: `// Checking the active JVM version & environment properties at runtime
public class JvmInspector {
    public static void main(String[] args) {
        System.out.println("Java Version: " + System.getProperty("java.version"));
        System.out.println("JVM Vendor:   " + System.getProperty("java.vm.vendor"));
        System.out.println("JVM Name:     " + System.getProperty("java.vm.name"));
        System.out.println("Available Processors: " + Runtime.getRuntime().availableProcessors());
    }
}`,
            interviewQuestions: [
              {
                question: "Do you need a full JDK installed in a production Docker container to run a microservice?",
                answer: "No. In modern production environments (Java 9+), you use `jlink` to build a custom minimal JRE containing only the exact modules your application requires, resulting in lightweight container images (often <50MB) without the compiler or dev tools."
              }
            ],
            quiz: {
              question: "If an end-user only wants to execute a pre-compiled .jar application, what do they require?",
              options: [
                "Only the JDK",
                "Only the JRE (or bundled runtime image)",
                "A C++ compiler and Git",
                "The javac source analyzer"
              ],
              correctIndex: 1,
              explanation: "To execute existing bytecode, only the JRE (Java Runtime Environment) with its JVM and standard libraries is required."
            },
            icon: Layers,
            color: CORAL
          }
        ],
        problems: []
      },
      {
        id: "java-ch-2",
        title: "Chapter 2 — Data Types, Memory & Variables",
        level: "Beginner",
        summary: "Master the 8 primitive data types, memory representations, stack vs heap allocation, and safe type casting.",
        concepts: [
          {
            id: "java-2-1",
            title: "Primitive Data Types & Memory Footprints",
            type: "concept",
            level: "Beginner",
            tldr: "The 8 atomic building blocks of Java memory and their exact byte representations.",
            description: "Java is strongly typed. Every variable is bound to a specific memory layout:\n\n• **Integers**: `byte` (1 byte, -128 to 127), `short` (2 bytes), `int` (4 bytes, ~2.14 billion), `long` (8 bytes, 64-bit).\n• **Floating Point**: `float` (4 bytes IEEE 754), `double` (8 bytes standard IEEE 754 precision).\n• **Character**: `char` (2 bytes, unsigned 16-bit UTF-16 code units).\n• **Boolean**: `boolean` (1 bit of information, typically represented as 1 byte in JVM memory for word alignment).",
            flowchart: `
Primitive Data Types in Memory:
┌───────────┬─────────┬───────────────────────────────┐
│ Type      │ Size    │ Range                         │
├───────────┼─────────┼───────────────────────────────┤
│ byte      │ 8 bits  │ -128 to +127                  │
│ short     │ 16 bits │ -32,768 to +32,767            │
│ int       │ 32 bits │ -2^31 to +2^31 - 1            │
│ long      │ 64 bits │ -2^63 to +2^63 - 1            │
│ float     │ 32 bits │ IEEE 754 single precision     │
│ double    │ 64 bits │ IEEE 754 double precision     │
│ char      │ 16 bits │ '\u0000' to '\uffff' (UTF-16) │
│ boolean   │ 1 bit*  │ true or false                 │
└───────────┴─────────┴───────────────────────────────┘
`,
            code: `public class PrimitiveDemo {
    public static void main(String[] args) {
        byte smallNum = 127;          // Maximum byte value
        int standardInt = 1_000_000;  // Underscore digit separators (Java 7+)
        long largeNum = 9876543210L;  // Notice the 'L' suffix for 64-bit literals
        double pi = 3.141592653589793;
        char symbol = 'Ω';            // Unicode UTF-16 Greek Omega symbol
        boolean isProduction = true;

        System.out.println("Byte max: " + Byte.MAX_VALUE);
        System.out.println("Integer range: " + Integer.MIN_VALUE + " to " + Integer.MAX_VALUE);
    }
}`,
            interviewQuestions: [
              {
                question: "Why does Java use 2 bytes (16 bits) for `char` instead of 1 byte like C/C++?",
                answer: "C uses 1-byte ASCII (or ISO-8859). Java was designed from day one with global internationalization in mind, adopting 16-bit Unicode (UTF-16) so it could represent characters from virtually all written world languages without code-page switching."
              }
            ],
            quiz: {
              question: "What happens if you assign 128 to a variable of type `byte` in Java without casting?",
              options: [
                "It automatically wraps around to -128 at runtime",
                "It causes a compile-time error (Type mismatch: cannot convert from int to byte)",
                "It converts into a double",
                "It silently truncates the value to 0"
              ],
              correctIndex: 1,
              explanation: "Java's compiler enforces type safety. Because 128 exceeds the maximum byte value (+127), the compiler rejects it with a type mismatch error unless an explicit cast `(byte)128` is written."
            },
            icon: Box,
            color: CORAL
          },
          {
            id: "java-2-2",
            title: "Type Casting: Widening vs Narrowing",
            type: "concept",
            level: "Beginner",
            tldr: "Safe implicit widening vs manual narrowing conversions with truncation risks.",
            description: "Converting between primitive types follows strict rules:\n\n• **Widening (Implicit)**: Moving from a smaller memory footprint to a larger one (`byte` -> `short` -> `int` -> `long` -> `float` -> `double`). Safe; no bits are lost.\n• **Narrowing (Explicit)**: Moving from a larger footprint to a smaller one (`double` -> `int`). Requires explicit syntax `(targetType)` and can cause severe bit truncation or sign inversion if the value overflows.",
            code: `public class CastingDeepDive {
    public static void main(String[] args) {
        // Widening: Automatic & Lossless
        int count = 42;
        double decimalCount = count; // 42.0

        // Narrowing: Explicit & Potential Loss
        double price = 99.99;
        int roundedPrice = (int) price; // Truncates decimal part to 99

        // Bitwise Overflow Demonstration
        int bigValue = 130;
        byte castedByte = (byte) bigValue; 
        // 130 in binary is 00000000 00000000 00000000 10000010
        // Truncated to 8 bits: 10000010 (Two's complement = -126)
        System.out.println("Casted byte: " + castedByte); // Outputs -126
    }
}`,
            interviewQuestions: [
              {
                question: "Why does `(byte) 130` evaluate to `-126` in Java?",
                answer: "Java uses Two's Complement representation for signed integers. 130 in 32-bit binary is `...0000 1000 0010`. Truncating to 8 bits yields `1000 0010`. The leading bit '1' signifies a negative number; inverting bits and adding 1 produces `-126`."
              }
            ],
            quiz: {
              question: "Which of the following conversions requires an explicit cast in Java?",
              options: [
                "int to double",
                "short to int",
                "long to int",
                "byte to long"
              ],
              correctIndex: 2,
              explanation: "Converting from a 64-bit `long` to a 32-bit `int` is a narrowing conversion that risks data loss, requiring explicit syntax: `(int) myLong`."
            },
            icon: Repeat,
            color: CORAL
          }
        ],
        problems: []
      },
      {
        id: "java-ch-3",
        title: "Chapter 3 — Control Flow & Branching Logic",
        level: "Beginner",
        summary: "Build sophisticated decision trees with if-else, modern Java 21 switch expressions, and loop iteration structures.",
        concepts: [
          {
            id: "java-3-1",
            title: "Conditional Branching & Enhanced Switch Expressions",
            type: "concept",
            level: "Beginner",
            tldr: "Master boolean decision branches and modern arrow switch syntax.",
            description: "Control flow enables dynamic code execution:\n\n• **if-else ladder**: Evaluates boolean predicates sequentially.\n• **Traditional switch**: Tests constant values using `case` and explicit `break` (prone to fall-through bugs).\n• **Enhanced switch (Java 14+)**: Expression-based syntax using `->` arrows with no fall-through and direct value returns via `yield`.",
            flowchart: `
+------------------+
|   Input Value    |
+------------------+
         |
         v
  /--------------\\
 /  Condition     \\ === false ===> [ Else / Fallback Block ]
 \\   Evaluator    /
  \\--------------/
         | true
         v
+------------------+
| Exec Target Code |
+------------------+
`,
            code: `public class ModernSwitch {
    public static void main(String[] args) {
        String day = "WEDNESDAY";

        // Modern Java Switch Expression (No break statements needed!)
        int priority = switch (day) {
            case "MONDAY", "TUESDAY" -> 1;
            case "WEDNESDAY", "THURSDAY" -> 2;
            case "FRIDAY" -> 3;
            case "SATURDAY", "SUNDAY" -> 0;
            default -> {
                System.out.println("Unknown day: " + day);
                yield -1; // yield returns value from multi-line block
            }
        };

        System.out.println("Day priority rank: " + priority);
    }
}`,
            interviewQuestions: [
              {
                question: "What is the key advantage of modern switch expressions over traditional switch statements?",
                answer: "Modern switch expressions eliminate accidental fall-through caused by missing `break` statements, allow yielding values directly to variables, support comma-separated multiple matches per case, and guarantee compile-time exhaustiveness."
              }
            ],
            quiz: {
              question: "In an enhanced switch expression with a multi-line block, which keyword is used to return a value?",
              options: [
                "return",
                "yield",
                "break",
                "output"
              ],
              correctIndex: 1,
              explanation: "The `yield` keyword is used in modern switch expressions to yield a value from a multi-line `{ ... }` case block."
            },
            icon: PlaySquare,
            color: CORAL
          },
          {
            id: "java-3-2",
            title: "Loops & Iteration: for, while, and do-while",
            type: "concept",
            level: "Beginner",
            tldr: "Deterministic vs non-deterministic loops, memory overhead, and labeled jumps.",
            description: "Executing instructions repeatedly until an invariant condition terminates:\n\n• **Standard for loop**: Indexed traversal when iteration bounds are known.\n• **Enhanced for-each**: Idiomatic traversal over arrays and Collections without index bookkeeping.\n• **while loop**: Condition-first check, ideal for stream reading or polling.\n• **do-while loop**: Body executes at least once before testing the condition.",
            code: `public class LoopMastery {
    public static void main(String[] args) {
        // 1. Enhanced for-each loop
        String[] servers = {"us-east-1", "eu-central-1", "ap-south-1"};
        for (String region : servers) {
            System.out.println("Deploying cluster to: " + region);
        }

        // 2. Labeled break for nested loops
        outerLoop:
        for (int i = 0; i < 5; i++) {
            for (int j = 0; j < 5; j++) {
                if (i * j > 6) {
                    System.out.println("Breaking directly out of both loops at i=" + i + ", j=" + j);
                    break outerLoop; // Exits outer loop directly
                }
            }
        }
    }
}`,
            interviewQuestions: [
              {
                question: "When would you prefer a `while` loop over a `for` loop?",
                answer: "Use a `while` loop when the number of iterations is non-deterministic and depends on external events, such as reading lines from a network socket until EOF, or waiting for a volatile flag to change."
              }
            ],
            quiz: {
              question: "Which loop construct is guaranteed to execute its body at least once even if the condition is false initially?",
              options: [
                "for loop",
                "enhanced for-each loop",
                "while loop",
                "do-while loop"
              ],
              correctIndex: 3,
              explanation: "A `do-while` loop executes its block first before checking the condition at the end (`while (condition);`), ensuring at least one execution."
            },
            icon: Repeat,
            color: CORAL
          }
        ],
        problems: []
      },
      {
        id: "java-ch-4",
        title: "Chapter 4 — Methods & The Call Stack",
        level: "Beginner",
        summary: "Understand function decomposition, method signatures, call stack frame allocation, and why Java is strictly pass-by-value.",
        concepts: [
          {
            id: "java-4-1",
            title: "Method Signatures & Pass-by-Value Invariant",
            type: "concept",
            level: "Beginner",
            tldr: "Why Java ALWAYS passes copies of bits (Pass-by-Value), never references by reference.",
            description: "A foundational Java axiom that confuses many developers: **Java is strictly pass-by-value, always.**\n\n• For primitive types (`int`, `double`), the method receives an independent copy of the value's binary bits.\n• For Objects, the method receives an independent copy of the **reference pointer** (memory address) to that object on the Heap.\n• If you reassign the reference variable inside the method (`param = new Object()`), the caller's reference remains completely unaffected!",
            flowchart: `
CALLER FRAME (main)                          CALLEE FRAME (modify)
+-----------------------+                    +-----------------------+
| int x = 10;           | -- copy value ---> | int xCopy = 10;       | (Changes do not affect main)
| MyObj ref = 0xABCD    | -- copy pointer -> | MyObj refCopy = 0xABCD| (Mutating object fields affects 0xABCD,
+-----------------------+                    +-----------------------+  reassigning refCopy does NOT affect ref)
            │                                             │
            └──────────────────────┬──────────────────────┘
                                   v
                             HEAP STORAGE
                        +----------------------+
                        | Object at 0xABCD     |
                        | { value: 100 }       |
                        +----------------------+
`,
            code: `public class PassByValueProof {
    static class DataNode {
        int val = 10;
    }

    public static void test(int x, DataNode node) {
        x = 999;           // Modifies local copy only
        node.val = 500;    // Modifies object on Heap through copied pointer!
        node = new DataNode(); // Reassigning local pointer has NO effect on caller
        node.val = 888;
    }

    public static void main(String[] args) {
        int num = 10;
        DataNode myNode = new DataNode();

        test(num, myNode);

        System.out.println("num: " + num);             // Still 10 (Primitive unchanged)
        System.out.println("node.val: " + myNode.val); // 500 (Field mutated, but not reassigned)
    }
}`,
            programWorking: [
              {
                step: 1,
                line: "int num = 10; DataNode myNode = new DataNode();",
                memoryState: "Stack: main frame [num=10, myNode=0x1000]. Heap: [0x1000: DataNode{val=10}]",
                explanation: "num stored as direct bits in stack. myNode stores 64-bit reference address pointing to Heap."
              },
              {
                step: 2,
                line: "test(num, myNode) invocation",
                memoryState: "Stack: new test() frame pushed [x=10, node=0x1000]",
                explanation: "num is copied into x. myNode's address (0x1000) is copied into local reference node."
              },
              {
                step: 3,
                line: "node.val = 500;",
                memoryState: "Heap: [0x1000: DataNode{val=500}]",
                explanation: "Following the copied pointer to Heap memory address 0x1000 mutates the underlying instance."
              },
              {
                step: 4,
                line: "node = new DataNode(); test() returns",
                memoryState: "Stack: test() frame destroyed. main frame resumes with [num=10, myNode=0x1000]",
                explanation: "Local parameter node was repointed to a new Heap object, but caller's myNode pointer was never touched."
              }
            ],
            interviewQuestions: [
              {
                question: "Is Java pass-by-reference for Objects?",
                answer: "No. Java is strictly pass-by-value. When an object is passed, the value being copied and passed is the memory reference (pointer) to the object, not the object itself. You cannot write a swap(Object a, Object b) method in Java that swaps the caller's references."
              }
            ],
            quiz: {
              question: "If a method executes `param = null;` where `param` is an Object argument passed by the caller, what happens to the caller's variable?",
              options: [
                "The caller's variable becomes null as well",
                "The caller's variable remains unchanged",
                "A NullPointerException is immediately thrown",
                "The object on the Heap is destroyed instantly"
              ],
              correctIndex: 1,
              explanation: "Because Java passes object references by value (a copy of the pointer), setting the parameter to null only clears the callee's local pointer, leaving the caller's variable intact."
            },
            icon: Binary,
            color: CORAL
          }
        ],
        problems: []
      },
      {
        id: "java-ch-5",
        title: "Chapter 5 — Arrays & Matrix Mechanics",
        level: "Beginner",
        summary: "Continuous memory layouts, multidimensional jagged arrays, array bounds checking, and memory cache locality.",
        concepts: [
          {
            id: "java-5-1",
            title: "Array Memory Layout & Bounds Checking",
            type: "concept",
            level: "Beginner",
            tldr: "Fixed-size contiguous memory blocks on the Heap with built-in boundary defense.",
            description: "In Java, all arrays are objects allocated dynamically on the Heap, even when they store primitive types.\n\n• **Contiguous Memory**: Array elements are arranged contiguously in memory, providing O(1) random index access via pointer arithmetic: `address = base + (index * elementSize)`.\n• **Bounds Checking**: Every array access is verified against `array.length`. If index is out of range, JVM throws an `ArrayIndexOutOfBoundsException` instead of corrupting neighboring memory like C/C++.\n• **Multidimensional Arrays**: Java does not have true 2D contiguous matrices; it uses 'arrays of arrays', meaning rows can have varying lengths (Jagged Arrays).",
            flowchart: `
STACK                                      HEAP STORAGE
+----------------------+                   +-----------------------------------------------+
| int[] arr = 0x5000   | ================> | Object Header (12B) | Length (4B = 3)         |
+----------------------+                   +-----------------------------------------------+
                                           | arr[0]: 10  | arr[1]: 20  | arr[2]: 30        |
                                           +-----------------------------------------------+
                                           (Contiguous 4-byte integers in Heap memory)
`,
            code: `import java.util.Arrays;

public class ArrayMechanics {
    public static void main(String[] args) {
        // Primitive array allocation
        int[] scores = new int[5]; // Initialized to default 0s
        scores[0] = 95;
        scores[1] = 88;

        // Jagged 2D array (Array of arrays with differing lengths)
        int[][] jagged = new int[3][];
        jagged[0] = new int[]{1, 2};
        jagged[1] = new int[]{3, 4, 5, 6};
        jagged[2] = new int[]{7};

        System.out.println("Row 1 length: " + jagged[1].length); // 4
        System.out.println("Quick printing: " + Arrays.deepToString(jagged));
    }
}`,
            interviewQuestions: [
              {
                question: "Why does traversing a 2D array row-by-row (arr[i][j]) execute significantly faster than column-by-column (arr[j][i])?",
                answer: "Row-by-row traversal leverages CPU Cache Locality (Spatial Locality). When a row's memory is loaded into L1/L2 cache lines, neighboring elements are already present in the cache, yielding cache hits. Column-by-column traversal causes continuous cache misses because memory addresses jump across disparate arrays."
              }
            ],
            quiz: {
              question: "What is the default value of elements inside a newly initialized `boolean[]` array in Java?",
              options: [
                "true",
                "false",
                "null",
                "-1"
              ],
              correctIndex: 1,
              explanation: "When an array is allocated on the Heap, all primitive fields are zeroed out by default. For booleans, the zero value is `false`."
            },
            icon: Grid,
            color: CORAL
          }
        ],
        problems: []
      },
      {
        id: "java-ch-6",
        title: "Chapter 6 — Strings & The String Pool",
        level: "Beginner",
        summary: "Understand String immutability, the interned String Constant Pool, Compact Strings, and StringBuilder vs StringBuffer.",
        concepts: [
          {
            id: "java-6-1",
            title: "String Immutability & String Constant Pool",
            type: "concept",
            level: "Beginner",
            tldr: "Why Strings never change, how JVM saves memory via string pooling, and Compact Strings.",
            description: "The `java.lang.String` class is one of the most optimized objects in the JVM:\n\n• **Immutability**: Once constructed, the underlying character sequence cannot be modified. Any 'mutation' returns a newly allocated String.\n• **String Constant Pool**: Located in the Heap, this cache stores unique string literals. Literal declarations (`String s = \"hello\";`) reuse the pooled instance, saving enormous heap space.\n• **Compact Strings (Java 9+)**: Strings store characters in `byte[]` rather than `char[]`. For Latin-1 characters, it uses 1 byte per character instead of 2 bytes, cutting String heap footprints in half!\n• **StringBuilder**: Mutable buffer for concatenating strings in loops without generating garbage objects.",
            flowchart: `
STACK                           HEAP STRING POOL                     REGULAR HEAP
+---------------+               +-----------------------+            +-----------------------+
| s1 = 0xPOOL1  | ============> | "Java" (Shared pool)  | <========= | s3 = new String("Java")|
| s2 = 0xPOOL1  |               +-----------------------+            | (New object instance) |
+---------------+                                                    +-----------------------+
(s1 == s2 is TRUE)                                                   (s1 == s3 is FALSE, s1.equals(s3) is TRUE)
`,
            code: `public class StringPoolDemo {
    public static void main(String[] args) {
        String s1 = "Engine";
        String s2 = "Engine"; // Reuses pooled literal at same address!
        String s3 = new String("Engine"); // Forces new object on regular Heap

        System.out.println("s1 == s2: " + (s1 == s2));       // true (identical reference)
        System.out.println("s1 == s3: " + (s1 == s3));       // false (different heap objects)
        System.out.println("s1.equals(s3): " + s1.equals(s3)); // true (equivalent characters)

        // StringBuilder for high-performance loops
        StringBuilder sb = new StringBuilder(64);
        for (int i = 0; i < 5; i++) {
            sb.append("Chunk-").append(i).append(" ");
        }
        System.out.println("Constructed: " + sb.toString());
    }
}`,
            interviewQuestions: [
              {
                question: "Why was String designed to be immutable in Java?",
                answer: "Three critical reasons: 1) Security (Strings are used for network sockets, database URLs, and file paths; mutability would allow tampering), 2) Thread Safety (immutable objects are thread-safe without locks), 3) Caching & HashCode (hash codes can be cached safely, making HashMaps fast and reliable)."
              }
            ],
            quiz: {
              question: "Which class should you use for mutable string construction inside a single-threaded high-performance loop?",
              options: [
                "java.lang.String",
                "java.lang.StringBuffer",
                "java.lang.StringBuilder",
                "java.util.StringTokenizer"
              ],
              correctIndex: 2,
              explanation: "StringBuilder is mutable and unsynchronized, making it faster than StringBuffer (which incurs synchronization locking overhead on every method call)."
            },
            icon: Type,
            color: CORAL
          }
        ],
        problems: []
      },
      {
        id: "java-ch-7",
        title: "Chapter 7 — Computational Complexity & Big-O",
        level: "Beginner",
        summary: "Analyze runtime and memory scalability: O(1), O(log N), O(N), O(N log N), and O(N^2).",
        concepts: [
          {
            id: "java-7-1",
            title: "Time & Space Complexity in Java",
            type: "concept",
            level: "Beginner",
            tldr: "Evaluating algorithmic growth bounds as data scales to millions of records.",
            description: "Big-O notation describes the upper bound of resource consumption as input size $N$ approaches infinity:\n\n• **$O(1)$ Constant**: Instantaneous access (e.g. array index lookup `arr[i]`, HashMap get).\n• **$O(\\log N)$ Logarithmic**: Halving search space each step (e.g. Binary Search in sorted arrays, TreeMap navigation).\n• **$O(N)$ Linear**: Single pass through an unsorted dataset.\n• **$O(N \\log N)$ Linearithmic**: Optimal comparison-based sorting (MergeSort, Arrays.sort / Dual-Pivot Quicksort).\n• **$O(N^2)$ Quadratic**: Naive nested loops over the same dataset.",
            code: `public class ComplexityDemo {
    // O(1) Time, O(1) Space
    public static int getFirst(int[] arr) {
        return arr[0];
    }

    // O(log N) Time via Binary Search
    public static int binarySearch(int[] sorted, int target) {
        int low = 0, high = sorted.length - 1;
        while (low <= high) {
            int mid = low + (high - low) / 2; // Prevents 32-bit integer overflow
            if (sorted[mid] == target) return mid;
            if (sorted[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }
}`,
            interviewQuestions: [
              {
                question: "Why do we calculate `mid = low + (high - low) / 2` instead of `mid = (low + high) / 2` in binary search?",
                answer: "Because if `low` and `high` are large positive integers (e.g. > 1 billion), their sum `(low + high)` exceeds 2^31 - 1, causing a 32-bit signed integer overflow into negative numbers, resulting in an ArrayIndexOutOfBoundsException."
              }
            ],
            quiz: {
              question: "What is the average time complexity of finding an element in an unsorted array of size N?",
              options: [
                "O(1)",
                "O(log N)",
                "O(N)",
                "O(N log N)"
              ],
              correctIndex: 2,
              explanation: "In an unsorted array, you must inspect each element one-by-one in the worst case, yielding O(N) linear time."
            },
            icon: Clock,
            color: CORAL
          }
        ],
        problems: []
      },
      {
        id: "java-ch-8",
        title: "Chapter 8 — Recursion & Stack Frame Traversal",
        level: "Beginner",
        summary: "Master recursive mathematical definitions, base case invariants, and preventing StackOverflowError.",
        concepts: [
          {
            id: "java-8-1",
            title: "Recursive Functions & The Call Stack",
            type: "concept",
            level: "Beginner",
            tldr: "A method that calls itself with smaller sub-problems until hitting a base termination case.",
            description: "Every recursive algorithm requires two core components:\n\n1. **Base Case**: The stopping condition that returns directly without making further calls.\n2. **Recursive Step**: Reducing the problem input size and calling itself.\n\nEvery recursive invocation pushes a new **Stack Frame** onto the thread's Stack memory. If the base case is missing or recursion depth exceeds the JVM stack size (`-Xss`), the JVM terminates with a fatal `java.lang.StackOverflowError`.",
            flowchart: `
factorial(3)
  │ pushes frame factorial(3) [n=3]
  ▼
  factorial(2)
    │ pushes frame factorial(2) [n=2]
    ▼
    factorial(1)
      │ pushes frame factorial(1) [n=1] ===> HITS BASE CASE, RETURNS 1
      ▲
    pops frame, computes 2 * 1 = 2
    ▲
  pops frame, computes 3 * 2 = 6
  ▲
Result: 6 returned to caller
`,
            code: `public class RecursionDeepDive {
    // Factorial calculation: N!
    public static long factorial(int n) {
        if (n <= 1) return 1; // Base case
        return n * factorial(n - 1); // Recursive call
    }

    // Fibonacci with memoization to prevent O(2^N) exponential explosion
    public static long fib(int n, long[] memo) {
        if (n <= 1) return n;
        if (memo[n] != 0) return memo[n];
        return memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
    }

    public static void main(String[] args) {
        System.out.println("5! = " + factorial(5)); // 120
    }
}`,
            interviewQuestions: [
              {
                question: "What is Tail Call Optimization (TCO), and does the standard HotSpot JVM support it?",
                answer: "TCO is a compiler optimization where a recursive call in the final return position reuses the current stack frame instead of pushing a new one. Standard HotSpot Java does NOT support TCO for security and stack trace preservation reasons, meaning deep recursion can still cause StackOverflowError in Java."
              }
            ],
            quiz: {
              question: "What error occurs if a recursive function calls itself indefinitely without reaching a base case?",
              options: [
                "OutOfMemoryError: Java heap space",
                "StackOverflowError",
                "NullPointerException",
                "ClassCastException"
              ],
              correctIndex: 1,
              explanation: "Continuous recursive calls push frames until the thread's call stack memory limit (-Xss) is exhausted, throwing java.lang.StackOverflowError."
            },
            icon: Repeat,
            color: CORAL
          }
        ],
        problems: []
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────────────────
     PART II — INTERMEDIATE: OOPS, COLLECTIONS & CONCURRENCY
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "java-part-2-intermediate",
    title: "PART II — OOPs, Collections & Concurrency",
    level: "Intermediate",
    badge: "Core Enterprise Architecture",
    description: "Deep dive into Object-Oriented principles, Exception safety, Generics, Collections internals, and multi-threaded systems.",
    chapters: [
      {
        id: "java-ch-9",
        title: "Chapter 9 — Classes, Objects & Memory Lifecycle",
        level: "Intermediate",
        summary: "Understand object instantiation, constructors, the `this` pointer, and heap memory layout.",
        concepts: [
          {
            id: "java-9-1",
            title: "Classes as Blueprints vs Objects in Heap",
            type: "concept",
            level: "Intermediate",
            tldr: "How classes define metadata in Metaspace and objects reserve structured memory in Heap.",
            description: "In Java OOP:\n\n• **Class**: Metadata stored in Metaspace defining fields, method tables (vtable), and constants.\n• **Object**: Concrete instance allocated in the Heap containing an Object Header (Mark Word + Klass Word) followed by instance field values.\n• **Constructors**: Special initialization blocks executed immediately upon memory allocation.",
            code: `public class BankAccount {
    private final String accountNumber;
    private double balance; // Encapsulated private state

    public BankAccount(String accountNumber, double initialBalance) {
        if (initialBalance < 0) throw new IllegalArgumentException("Negative balance not permitted");
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }

    public synchronized void deposit(double amount) {
        if (amount <= 0) throw new IllegalArgumentException("Deposit amount must be positive");
        this.balance += amount;
    }

    public double getBalance() { return balance; }
}`,
            interviewQuestions: [
              {
                question: "What does the JVM Object Header contain?",
                answer: "Every Java object on the Heap has an Object Header consisting of: 1) Mark Word (64-bit on modern 64-bit JVMs, holding hashcode, GC age, and lock states like biased/thin/fat locks), and 2) Klass Word (pointer to the class metadata in Metaspace)."
              }
            ],
            quiz: {
              question: "Where is a class's compiled bytecode metadata stored in modern Java (Java 8+)?",
              options: [
                "Permanent Generation (PermGen)",
                "Metaspace (Native OS Memory)",
                "Thread Call Stack",
                "Direct ByteBuffer Cache"
              ],
              correctIndex: 1,
              explanation: "In Java 8, PermGen was completely removed and replaced by Metaspace, which allocates class metadata in native off-heap memory."
            },
            icon: LayoutGrid,
            color: GOLD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-10",
        title: "Chapter 10 — The Four Pillars of OOP",
        level: "Intermediate",
        summary: "Encapsulation, Inheritance, Dynamic Polymorphism (vtable), and Interface Abstraction.",
        concepts: [
          {
            id: "java-10-1",
            title: "The 4 Pillars: Encapsulation, Inheritance, Polymorphism, Abstraction",
            type: "concept",
            level: "Intermediate",
            tldr: "The foundational architectural pillars of robust, maintainable enterprise software.",
            description: "1. **Encapsulation**: Bundling data with methods and hiding internal state via access modifiers (`private`). Preserves invariants.\n2. **Inheritance**: Code reuse via `extends`. Promotes hierarchical relationships.\n3. **Polymorphism**: Dynamic method dispatch (overriding). A single interface can invoke different concrete behaviors at runtime via virtual method tables (vtable).\n4. **Abstraction**: Exposing 'what' an entity does via `interface` and `abstract class`, hiding 'how' it is implemented.",
            flowchart: `
+-------------------------------------------------------------+
|                  <<interface>> PaymentGateway               |
|                      + charge(amount)                       |
+-------------------------------------------------------------+
                                ▲
                                │ implements (Abstraction & Polymorphism)
            ┌───────────────────┴───────────────────┐
            │                                       │
+-----------------------+               +-----------------------+
|   StripeGateway       |               |    PayPalGateway      |
|   + charge(amount)    |               |    + charge(amount)   |
+-----------------------+               +-----------------------+
`,
            code: `// 1. Abstraction via Interface
interface PaymentGateway {
    boolean processPayment(double amount);
}

// 2. Concrete Polymorphic Implementations
class StripeGateway implements PaymentGateway {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Processing $" + amount + " via Stripe API");
        return true;
    }
}

class CryptoGateway implements PaymentGateway {
    @Override
    public boolean processPayment(double amount) {
        System.out.println("Executing on-chain settlement for $" + amount);
        return true;
    }
}

public class PaymentService {
    public static void executeCheckout(PaymentGateway gateway, double amount) {
        // Runtime Polymorphism: dynamically calls correct processPayment implementation!
        gateway.processPayment(amount);
    }
}`,
            interviewQuestions: [
              {
                question: "What is the difference between Method Overloading and Method Overriding?",
                answer: "Overloading occurs in the same class at compile-time (same method name, different parameter types/count). Overriding occurs in sub-classes at runtime (same method signature and return type), dynamically dispatched via the object's runtime class."
              }
            ],
            quiz: {
              question: "Can an abstract class in Java have concrete methods with complete bodies?",
              options: [
                "No, abstract classes can only declare method signatures",
                "Yes, abstract classes can have both abstract and concrete methods",
                "Only if the method is declared private static final",
                "Only in Java 21 preview mode"
              ],
              correctIndex: 1,
              explanation: "Unlike pure interfaces in older Java versions, abstract classes can declare both abstract methods (without bodies) and concrete implemented methods with state."
            },
            icon: Layers,
            color: GOLD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-11",
        title: "Chapter 11 — Exception Handling & Resilience",
        level: "Intermediate",
        summary: "Checked vs Unchecked exceptions, try-with-resources, and custom domain exceptions.",
        concepts: [
          {
            id: "java-11-1",
            title: "Exception Hierarchy & Try-With-Resources",
            type: "concept",
            level: "Intermediate",
            tldr: "Safe resource cleanup without memory leaks using AutoCloseable.",
            description: "The Java Exception hierarchy derives from `Throwable`:\n\n• **`Error`**: Fatal JVM issues (`OutOfMemoryError`, `StackOverflowError`). Never catch.\n• **`Exception` (Checked)**: Recoverable external failures (`IOException`, `SQLException`). Compiler forces explicit handling.\n• **`RuntimeException` (Unchecked)**: Programming bugs (`NullPointerException`, `IllegalArgumentException`).\n• **`try-with-resources`**: Automatic deterministic closing of resources implementing `AutoCloseable` (Sockets, DB connections, Streams) even if exceptions are thrown.",
            code: `import java.io.*;

public class ResilienceDemo {
    // Try-with-resources guarantees file handles are closed without finally blocks
    public static void readConfiguration(String path) {
        File file = new File(path);
        try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println("Config line: " + line);
            }
        } catch (FileNotFoundException e) {
            System.err.println("Target file missing: " + path);
        } catch (IOException e) {
            System.err.println("I/O failure during stream read: " + e.getMessage());
        }
    }
}`,
            interviewQuestions: [
              {
                question: "What is a 'suppressed exception' in Java try-with-resources?",
                answer: "If an exception is thrown inside the `try` block AND an exception is also thrown when `close()` is automatically invoked on the resource, the close() exception is attached as a 'suppressed exception' to the primary exception rather than swallowing it, accessible via `e.getSuppressed()`."
              }
            ],
            quiz: {
              question: "Which interface must a class implement to be safely used inside a Java try-with-resources statement?",
              options: [
                "java.io.Serializable",
                "java.lang.AutoCloseable",
                "java.lang.Cloneable",
                "java.util.Disposable"
              ],
              correctIndex: 1,
              explanation: "Any class implementing `java.lang.AutoCloseable` (or its child `java.io.Closeable`) can be managed by try-with-resources."
            },
            icon: ShieldCheck,
            color: GOLD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-12",
        title: "Chapter 12 — Generics & Type Erasure",
        level: "Intermediate",
        summary: "Type parameters, bounded wildcards, PECS (Producer Extends, Consumer Super), and compile-time safety.",
        concepts: [
          {
            id: "java-12-1",
            title: "Generics, Wildcards & Type Erasure",
            type: "concept",
            level: "Intermediate",
            tldr: "Compile-time type verification that disappears at runtime (Type Erasure).",
            description: "Generics prevent `ClassCastException` by moving type checking to compile time:\n\n• **Type Parameter (`<T>`)**: Placeholders for types.\n• **PECS Rule**: 'Producer Extends, Consumer Super'. If a collection produces elements to read, use `<? extends T>`. If it consumes elements to write, use `<? super T>`.\n• **Type Erasure**: For backward compatibility with Java 1.4, the compiler replaces generic type parameters with `Object` (or their upper bound) in bytecode and inserts casts automatically.",
            code: `import java.util.List;

public class GenericsMastery {
    // PECS Rule: 'src' produces items to read, 'dest' consumes items to store
    public static <T> void copy(List<? extends T> src, List<? super T> dest) {
        for (T item : src) {
            dest.add(item); // Safe write to consumer
        }
    }
}`,
            interviewQuestions: [
              {
                question: "Why can't you create a generic array like `new T[10]` in Java?",
                answer: "Because Java arrays are covariant and reified (they enforce their component type at runtime), whereas Generics are invariant and erased at compile-time. At runtime, the JVM has no knowledge of what `T` is due to Type Erasure, making `new T[]` impossible."
              }
            ],
            quiz: {
              question: "According to Joshua Bloch's PECS rule in Effective Java, which wildcard should you use for an input list you only read from?",
              options: [
                "<? super T>",
                "<? extends T>",
                "<T super Object>",
                "<*>"
              ],
              correctIndex: 1,
              explanation: "PECS stands for Producer Extends, Consumer Super. If your method only reads from (consumes from) the collection, use `<? extends T>`."
            },
            icon: Code2,
            color: GOLD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-13",
        title: "Chapter 13 — Java Collections Framework Deep Dive",
        level: "Intermediate",
        summary: "Under the hood of ArrayList, LinkedList, HashSet, and HashMap's internal bucketing & treeification.",
        concepts: [
          {
            id: "java-13-1",
            title: "HashMap Internals: Buckets, Collisions & Treeification",
            type: "concept",
            level: "Intermediate",
            tldr: "How HashMap achieves O(1) average lookup and transitions to Red-Black Trees.",
            description: "The internal architecture of Java's `HashMap`:\n\n1. **Underlying Array**: An array of `Node<K,V>` buckets (default initial capacity 16, load factor 0.75).\n2. **Hash Function**: Computes `hash(key) = (h = key.hashCode()) ^ (h >>> 16)` to disperse high bits across the bucket index: `index = (n - 1) & hash`.\n3. **Collisions**: Handled via separate chaining (linked list).\n4. **Treeification (Java 8+)**: When collisions in a single bucket exceed 8 (`TREEIFY_THRESHOLD`) and capacity >= 64, the linked list converts into a balanced **Red-Black Tree** (`TreeNode<K,V>`), improving worst-case search from $O(N)$ to $O(\\log N)$.",
            flowchart: `
HashMap.put("user_42", data)
          │
          ▼
   Compute Hash: hash = (h ^ (h >>> 16))
          │
          ▼
   Bucket Index = (capacity - 1) & hash
          │
          ▼
   Is bucket empty?
      ├── YES ──> Allocate new Node at table[index]
      └── NO  ──> Collision detected!
                    │
                    ├── Traverse bucket items (Check key.equals())
                    │     └── Match found? Update value.
                    │
                    └── Length exceeds 8?
                          ├── YES ──> Treeify bucket to Red-Black Tree (O(log N))
                          └── NO  ──> Append to end of linked list (O(N))
`,
            code: `import java.util.*;

public class HashMapInternalsDemo {
    public static void main(String[] args) {
        // Initializing with explicit capacity & load factor
        Map<String, Integer> cache = new HashMap<>(32, 0.75f);
        cache.put("alpha", 100);
        cache.put("beta", 200);

        // Fast lookup via hash + equals contract
        System.out.println("Value: " + cache.get("alpha"));
    }
}`,
            interviewQuestions: [
              {
                question: "Why must you override both `equals()` and `hashCode()` together in Java?",
                answer: "The HashMap contract requires that if `a.equals(b)` is true, then `a.hashCode() == b.hashCode()` MUST also be true. If you override `equals()` but not `hashCode()`, two identical objects will produce different bucket indices, causing `get()` to fail to find an existing key."
              }
            ],
            quiz: {
              question: "At what collision threshold does a HashMap bucket convert its linked list into a Red-Black Tree?",
              options: [
                "4 elements",
                "8 elements",
                "16 elements",
                "32 elements"
              ],
              correctIndex: 1,
              explanation: "In Java 8+, `TREEIFY_THRESHOLD` is set to 8. Once 8 entries collide in a bucket, it treeifies into a Red-Black Tree."
            },
            resources: [
              { title: "Effective Java - Item 11", type: "Book", note: "Always override hashCode when you override equals." }
            ],
            icon: Database,
            color: GOLD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-14",
        title: "Chapter 14 — Multithreading, Locks & Synchronization",
        level: "Intermediate",
        summary: "Thread lifecycle, race conditions, synchronized monitors, volatile visibility, and ReentrantLock.",
        concepts: [
          {
            id: "java-14-1",
            title: "Thread Safety, Race Conditions & Memory Barriers",
            type: "concept",
            level: "Intermediate",
            tldr: "Eliminating data corruption in multi-core execution through synchronization.",
            description: "When multiple threads access shared mutable state without coordination, **Race Conditions** occur:\n\n• **`synchronized`**: Acquires an intrinsic monitor lock on an object. Enforces mutual exclusion (only one thread executes the block) and issues CPU memory barriers.\n• **`volatile`**: Guarantees that writes to a variable are flushed to main RAM immediately and reads bypass CPU L1/L2 caches, establishing a happens-before relationship.\n• **`ReentrantLock`**: Explicit locking primitive in `java.util.concurrent.locks` providing timed lock attempts (`tryLock()`), interruptible locks, and fairness policies.",
            code: `import java.util.concurrent.locks.ReentrantLock;

public class ThreadSafeCounter {
    private int count = 0;
    private final ReentrantLock lock = new ReentrantLock();

    public void increment() {
        lock.lock(); // Explicitly acquire lock
        try {
            count++; // Thread-safe mutation
        } finally {
            lock.unlock(); // Always release in finally block!
        }
    }

    public int getCount() {
        lock.lock();
        try { return count; }
        finally { lock.unlock(); }
    }
}`,
            interviewQuestions: [
              {
                question: "Does marking a counter as `volatile int count; count++;` make it thread-safe?",
                answer: "No! `count++` is a composite read-modify-write operation (read memory, add 1, write back). `volatile` only guarantees visibility of single reads and writes, not atomicity across multiple steps. You must use AtomicInteger or explicit locks."
              }
            ],
            quiz: {
              question: "Where must `lock.unlock()` always be placed when using explicit `ReentrantLock` in Java?",
              options: [
                "Inside the try block right after the modification",
                "Inside a finally block to ensure release even during exceptions",
                "In the class constructor",
                "In a finalize() method"
              ],
              correctIndex: 1,
              explanation: "Always release explicit locks inside a `finally` block to guarantee they are unlocked even if an unexpected RuntimeException is thrown."
            },
            resources: [
              { title: "Java Concurrency in Practice - Chapter 2 & 3", type: "Book", note: "Thread Safety & Sharing Objects." }
            ],
            icon: Cpu,
            color: GOLD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-15",
        title: "Chapter 15 — Concurrency Utilities & Virtual Threads",
        level: "Intermediate",
        summary: "ExecutorService, CompletableFuture async pipelines, and Java 21 Virtual Threads (Project Loom).",
        concepts: [
          {
            id: "java-15-1",
            title: "Virtual Threads (Java 21) vs Thread Pools",
            type: "concept",
            level: "Intermediate",
            tldr: "How Java 21 Project Loom revolutionizes high-throughput concurrent I/O.",
            description: "Traditional Java threads are 1:1 mappings to Operating System kernel threads:\n\n• **Platform Threads**: Heavyweight (~1MB stack each). Capped at ~5,000 threads before exhausting OS memory.\n• **Virtual Threads (Java 21)**: Lightweight user-mode threads managed by the JVM. Stacks are stored on the Heap and grow dynamically. Millions of virtual threads can run simultaneously!\n• **Non-blocking Magic**: When a virtual thread executes blocking I/O (`socket.read()`, `Thread.sleep()`), the JVM automatically unmounts it from the carrier OS thread, allowing other virtual threads to execute.",
            code: `import java.util.concurrent.*;

public class VirtualThreadsDemo {
    public static void main(String[] args) throws Exception {
        // Launching 100,000 concurrent tasks effortlessly with Java 21 Virtual Threads!
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 100_000; i++) {
                final int taskId = i;
                executor.submit(() -> {
                    Thread.sleep(1000); // Non-blocking simulation
                    return taskId;
                });
            }
        } // Executor automatically waits for all virtual threads to complete on close()
        System.out.println("100,000 virtual tasks completed with minimal memory!");
    }
}`,
            interviewQuestions: [
              {
                question: "Should you use Virtual Threads for CPU-intensive tasks like video encoding or cryptography?",
                answer: "No. Virtual threads provide massive scalability for I/O-bound workloads (database calls, HTTP requests) where threads spend most of their time waiting. For CPU-bound tasks, the bottleneck is physical CPU cores, so standard platform thread pools matching CPU core counts are appropriate."
              }
            ],
            quiz: {
              question: "What happens when a Java 21 Virtual Thread blocks on network I/O?",
              options: [
                "The entire operating system kernel freezes",
                "The JVM unmounts the virtual thread from its carrier OS thread, freeing it for other tasks",
                "An OutOfMemoryError is thrown",
                "The virtual thread is permanently terminated"
              ],
              correctIndex: 1,
              explanation: "The JVM unmounts the blocked virtual thread and assigns the carrier OS thread to execute other waiting virtual threads, achieving massive I/O concurrency."
            },
            icon: Zap,
            color: GOLD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-16",
        title: "Chapter 16 — Modern Java 8 to 21 Features",
        level: "Intermediate",
        summary: "Lambdas, Stream API pipelines, Optional, Records, Sealed Classes, and Pattern Matching.",
        concepts: [
          {
            id: "java-16-1",
            title: "Streams, Records & Pattern Matching",
            type: "concept",
            level: "Intermediate",
            tldr: "Declarative functional data pipelines and immutable data carriers.",
            description: "Modern Java brings expressive, modern syntax:\n\n• **Lambdas & Functional Interfaces**: Passing behavior as data (`item -> item > 10`).\n• **Stream API**: Declarative, lazy data processing pipelines (`filter`, `map`, `reduce`, `collect`).\n• **Records (Java 16+)**: Compact syntax for immutable data carriers with auto-generated constructor, getters, `equals()`, `hashCode()`, and `toString()`.\n• **Pattern Matching for switch (Java 21)**: Type-safe pattern extraction without manual casting.",
            code: `import java.util.List;

public class ModernJavaFeatures {
    // 1. Immutable Record (Java 16)
    public record Customer(String id, String name, double balance) {}

    public static void main(String[] args) {
        List<Customer> customers = List.of(
            new Customer("c1", "Alice", 1200.0),
            new Customer("c2", "Bob", 450.0),
            new Customer("c3", "Charlie", 3500.0)
        );

        // 2. Functional Stream Pipeline
        double highValueTotal = customers.stream()
            .filter(c -> c.balance() > 1000.0) // Filter
            .mapToDouble(Customer::balance)     // Transform
            .sum();                             // Terminal reduction

        System.out.println("Total high-value balance: $" + highValueTotal);
    }
}`,
            interviewQuestions: [
              {
                question: "What is the difference between intermediate and terminal operations in the Java Stream API?",
                answer: "Intermediate operations (e.g. `filter`, `map`) are lazy; they return a new stream and do not execute until a terminal operation is invoked. Terminal operations (e.g. `collect`, `forEach`, `sum`) initiate data traversal, produce a concrete result or side-effect, and close the stream."
              }
            ],
            quiz: {
              question: "Which keyword creates an immutable data-carrier class with built-in constructor, getters, equals, and hashCode in modern Java?",
              options: [
                "data class",
                "struct",
                "record",
                "model"
              ],
              correctIndex: 2,
              explanation: "Java 16 introduced the `record` keyword for concise, immutable data-holding classes."
            },
            icon: Sparkles,
            color: GOLD
          }
        ],
        problems: []
      }
    ]
  },

  /* ─────────────────────────────────────────────────────────────────────────
     PART III — HARD: JVM INTERNALS, ENTERPRISE ARCHITECTURE & PROJECTS
     ───────────────────────────────────────────────────────────────────────── */
  {
    id: "java-part-3-hard",
    title: "PART III — JVM Internals, Enterprise Systems & Production Projects",
    level: "Hard",
    badge: "Staff Systems Engineering",
    description: "Master HotSpot JVM internals, G1/ZGC collectors, Spring Boot microservice architecture, real production projects, and classic engineering literature.",
    chapters: [
      {
        id: "java-ch-17",
        title: "Chapter 17 — JVM Architecture & ClassLoader Hierarchy",
        level: "Hard",
        summary: "Runtime Data Areas, Bytecode verification, Parent Delegation Model, and ClassLoader memory leaks.",
        concepts: [
          {
            id: "java-17-1",
            title: "JVM Runtime Data Areas & ClassLoader Delegation",
            type: "concept",
            level: "Hard",
            tldr: "Dissecting Metaspace, Heap, Thread Stacks, and Parent Delegation security.",
            description: "The JVM organizes physical memory into distinct Runtime Data Areas:\n\n1. **Method Area / Metaspace**: Shared across threads; stores class structures, method bytecode, runtime constant pool.\n2. **Heap**: Shared memory where all object instances live. Governed by Garbage Collection.\n3. **JVM Stacks**: Thread-private; stores frames containing local variables, operand stacks, and method return pointers.\n4. **PC Register**: Keeps track of current bytecode instruction execution.\n5. **ClassLoader Parent Delegation**: A ClassLoader always delegates loading to its parent before attempting to load a class itself, defending against malicious replacement of core classes like `java.lang.Object`.",
            flowchart: `
+-----------------------------------------------------------------------------------+
| JVM RUNTIME DATA AREAS                                                            |
|                                                                                   |
|  SHARED ACROSS ALL THREADS                    THREAD-PRIVATE (Per Thread)          |
|  +-------------------------------------+      +--------------------------------+  |
|  | Heap Memory                         |      | JVM Thread Stack               |  |
|  |  (Young Gen, Old Gen / G1 Regions)  |      |   Frame 1 (main)               |  |
|  +-------------------------------------+      |   Frame 2 (checkout)           |  |
|  | Metaspace (Native Memory)           |      +--------------------------------+  |
|  |  Class Bytecode, Constant Pool      |      | PC Register (Program Counter)  |  |
|  +-------------------------------------+      +--------------------------------+  |
+-----------------------------------------------------------------------------------+
`,
            code: `public class ClassLoaderHierarchyDemo {
    public static void main(String[] args) {
        // Inspecting ClassLoader Delegation
        ClassLoader appLoader = ClassLoaderHierarchyDemo.class.getClassLoader();
        System.out.println("Application Loader: " + appLoader);

        ClassLoader platformLoader = appLoader.getParent();
        System.out.println("Platform Loader:    " + platformLoader);

        ClassLoader bootstrapLoader = platformLoader.getParent();
        System.out.println("Bootstrap Loader:   " + bootstrapLoader); // null (written in C/C++)
    }
}`,
            interviewQuestions: [
              {
                question: "Why is the Bootstrap ClassLoader represented as `null` in Java code?",
                answer: "The Bootstrap ClassLoader is the core native machine loader implemented directly in C/C++ inside the JVM binary. Because it is not a Java object, calls to `getParent()` return null."
              }
            ],
            quiz: {
              question: "Which principle dictates that a Java ClassLoader must query its parent before attempting to load a class itself?",
              options: [
                "Separation of Concerns",
                "Parent Delegation Model",
                "Liskov Substitution",
                "Single Responsibility Principle"
              ],
              correctIndex: 1,
              explanation: "The Parent Delegation Model guarantees that core standard library classes (like java.lang.String) are always loaded by the trusted Bootstrap/Platform loaders."
            },
            resources: [
              { title: "JVM Specification (Java SE 21) - Chapter 5", type: "Spec", note: "Loading, Linking, and Initializing." }
            ],
            icon: Cpu,
            color: EMERALD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-18",
        title: "Chapter 18 — Garbage Collection & Production Profiling",
        level: "Hard",
        summary: "Generational hypothesis, G1GC regions, ZGC sub-millisecond pauses, and memory leak analysis.",
        concepts: [
          {
            id: "java-18-1",
            title: "G1GC vs ZGC & Diagnosing Memory Leaks",
            type: "concept",
            level: "Hard",
            tldr: "Low-latency garbage collection algorithms and identifying hidden memory leaks.",
            description: "Modern production JVM Garbage Collectors:\n\n• **Weak Generational Hypothesis**: Most objects die young. Memory is divided into Eden, Survivor spaces, and Tenured Old Gen.\n• **G1GC (Garbage-First)**: Default in Java 9+. Partitions the heap into thousands of equal regions. Prioritizes reclaiming regions packed with garbage to adhere to a max pause time target (`-XX:MaxGCPauseMillis`).\n• **ZGC (Z Garbage Collector)**: Ultra-low latency collector in Java 21+. Uses colored pointers and load barriers to perform virtually all work concurrently with application threads, achieving sub-millisecond max pause times even on multi-terabyte heaps!\n• **Memory Leaks in Java**: Caused when unneeded objects remain referenced by GC Roots (e.g. unclosed ThreadLocal variables, static Collections, listener registrations).",
            flowchart: `
G1 HEAP REGIONS (Non-contiguous Partitioning)
┌────────┬────────┬────────┬────────┬────────┐
│ Eden   │ Old    │ Free   │ Surv   │ Eden   │
├────────┼────────┼────────┼────────┼────────┤
│ Old    │ Humong │ Eden   │ Free   │ Old    │
├────────┼────────┼────────┼────────┼────────┤
│ Surv   │ Old    │ Eden   │ Free   │ Humong │
└────────┴────────┴────────┴────────┴────────┘
G1 prioritizes collecting regions with highest garbage ratio!
`,
            code: `import java.lang.ref.WeakReference;

public class MemoryLeakWatchdog {
    public static void main(String[] args) {
        // WeakReferences allow objects to be collected when no strong references exist
        Object heavyObject = new byte[10_000_000]; // 10MB payload
        WeakReference<Object> weakRef = new WeakReference<>(heavyObject);

        System.out.println("Before GC: " + weakRef.get());
        heavyObject = null; // Clear strong reference

        System.gc(); // Suggest GC
        System.out.println("After GC:  " + weakRef.get()); // null (successfully reclaimed!)
    }
}`,
            interviewQuestions: [
              {
                question: "How can a memory leak happen in Java if it has an automatic Garbage Collector?",
                answer: "A memory leak in Java occurs when objects that are logically no longer needed by business logic remain strongly referenced by GC roots (such as static collections, unclosed ThreadLocal variables, or forgotten event listeners). Because a valid reference path exists, the GC is legally prohibited from collecting them, eventually causing an OutOfMemoryError."
              }
            ],
            quiz: {
              question: "Which Garbage Collector in Java 21 provides sub-millisecond maximum pause times on massive heaps?",
              options: [
                "Serial GC",
                "Parallel Old GC",
                "ZGC (Z Garbage Collector)",
                "CMS (Concurrent Mark Sweep)"
              ],
              correctIndex: 2,
              explanation: "ZGC uses concurrent phase tracing, load barriers, and colored pointers to guarantee sub-millisecond stop-the-world pauses regardless of heap size."
            },
            resources: [
              { title: "Optimizing Java - Chapter 6", type: "Book", note: "Garbage Collection Mechanics." }
            ],
            icon: Binary,
            color: EMERALD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-19",
        title: "Chapter 19 — Enterprise Spring Boot & JPA/Hibernate",
        level: "Hard",
        summary: "Dependency Injection, Spring MVC request lifecycle, JPA Entity states, N+1 query problem, and transactions.",
        concepts: [
          {
            id: "java-19-1",
            title: "Spring IoC, JPA Entity Lifecycle & N+1 Problem",
            type: "concept",
            level: "Hard",
            tldr: "Mastering enterprise dependency injection and defeating the dreaded JPA N+1 query trap.",
            description: "Enterprise Java backends rely on Spring Boot and Hibernate ORM:\n\n• **Inversion of Control (IoC)**: The framework manages object lifecycle and automatically injects dependencies (@Autowired / Constructor injection).\n• **JPA Entity States**: Transient (newly created), Persistent (tracked by EntityManager), Detached (session closed), Removed.\n• **The N+1 Query Problem**: Fetching a list of $N$ parent records triggers $N$ additional SQL queries to fetch child associations when using `FetchType.LAZY` or naive joins. Defeated using `JOIN FETCH`, EntityGraphs, or DTO projections.",
            code: `@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    // Defeating the N+1 Query Problem via JOIN FETCH
    @Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.status = :status")
    List<Order> findAllWithItemsEagerly(@Param("status") OrderStatus status);
}`,
            interviewQuestions: [
              {
                question: "What is the N+1 query problem in Hibernate and how do you fix it?",
                answer: "It happens when an application executes 1 initial SQL query to fetch N parent records, and then executes N individual SQL queries to fetch lazy child relationships for each parent. It is resolved by using JOIN FETCH in JPQL, @EntityGraph annotations, or selective DTO projection queries."
              }
            ],
            quiz: {
              question: "Which JPQL clause loads parent and child entities together in a single SQL statement to resolve the N+1 problem?",
              options: [
                "INNER MERGE",
                "JOIN FETCH",
                "SELECT CASCADING",
                "BATCH LOAD"
              ],
              correctIndex: 1,
              explanation: "`JOIN FETCH` instructs Hibernate to initialize the associated collection in the same SQL query via a join, eliminating the subsequent N roundtrips."
            },
            icon: Server,
            color: EMERALD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-20",
        title: "Chapter 20 — Production Enterprise Projects",
        level: "Hard",
        summary: "Hands-on architectural execution: E-Commerce Order Engine, NIO WebSocket Gateway, and Distributed Rate Limiter.",
        concepts: [
          {
            id: "java-20-1",
            title: "Production Project Architectural Blueprints",
            type: "concept",
            level: "Hard",
            tldr: "Deep architectural blueprints for 3 real-world, high-concurrency production systems.",
            description: "The Hard tier culminates in 3 production-grade enterprise projects:\n\n1. **High-Throughput E-Commerce Order & Inventory Engine**: Concurrency, optimistic locking, idempotent checkout, and Kafka event publishing.\n2. **Real-Time NIO WebSocket Gateway**: Zero-copy network I/O, epoll selectors, and sub-millisecond pub-sub messaging.\n3. **Distributed Token-Bucket Rate Limiter**: High-precision traffic shaping, Spring Cloud Gateway filter, and atomic Redis Lua execution.",
            code: `// Review the dedicated Enterprise Projects Showcase on the landing page for complete code blueprints and task roadmaps.`,
            interviewQuestions: [
              {
                question: "How do you guarantee idempotency in a distributed payment system?",
                answer: "Clients supply a unique UUIDv7 idempotency key with each payment request. The server atomically inserts this key into a database or Redis cache with an acquired lock. Subsequent retries with the same key detect the existing transaction record and return the cached receipt without charging the customer again."
              }
            ],
            quiz: {
              question: "What mechanism is typically used to ensure atomic multi-step execution in a Redis rate limiter?",
              options: [
                "Java synchronized block",
                "Redis Lua Scripts",
                "Operating system file locks",
                "HTTP 2.0 multiplexing"
              ],
              correctIndex: 1,
              explanation: "Redis executes Lua scripts atomically in a single event-loop turn, guaranteeing that token checks and decrements are safe against race conditions."
            },
            icon: Award,
            color: EMERALD
          }
        ],
        problems: []
      },
      {
        id: "java-ch-21",
        title: "Chapter 21 — Curated Books & Official Specifications Library",
        level: "Hard",
        summary: "Direct access to classic Java literature, SE 21 JVM/JLS specs, and authoritative whitepapers.",
        concepts: [
          {
            id: "java-21-1",
            title: "The Classical Engineering Library",
            type: "concept",
            level: "Hard",
            tldr: "Mastering Effective Java, Java Concurrency in Practice, and the official Oracle JVM specs.",
            description: "True mastery comes from reading primary sources. In this chapter, we explore key teachings from:\n\n• **Effective Java (Joshua Bloch)**: Items on immutability, builders, and generics.\n• **Java Concurrency in Practice (Brian Goetz)**: The definitive reference on thread safety.\n• **The JVM Specification (Java SE 21)**: Official Oracle specification on class files and bytecode instructions.\n• **Designing Data-Intensive Applications (Martin Kleppmann)**: Scalability and distributed data.",
            code: `// Explore the full library of 6 books & PDF specifications on the track landing page.`,
            interviewQuestions: [
              {
                question: "What is Item 1 in Joshua Bloch's Effective Java and why is it recommended?",
                answer: "'Consider static factory methods instead of constructors'. Static factory methods have descriptive names (e.g. BigInteger.probablePrime), are not required to create a new object each time, can return any subtype of their return type, and can vary the returned class based on input arguments."
              }
            ],
            quiz: {
              question: "Who is the primary author of 'Java Concurrency in Practice' and Java's Language Architect?",
              options: [
                "James Gosling",
                "Brian Goetz",
                "Linus Torvalds",
                "Martin Fowler"
              ],
              correctIndex: 1,
              explanation: "Brian Goetz is the lead author of Java Concurrency in Practice and the Java Language Architect at Oracle."
            },
            icon: BookOpen,
            color: EMERALD
          }
        ],
        problems: []
      }
    ]
  }
]

export const javaCourseInfo = {
  title: "Complete Java Engineering Suite",
  subtitle: "A comprehensive, 3-tier master curriculum from machine fundamentals and syntax through enterprise Spring microservices, JVM internals, and production projects.",
  totalLessons: javaCourseCurriculum.reduce(
    (acc, part) => acc + part.chapters.reduce((cAcc, ch) => cAcc + ch.concepts.length, 0),
    0
  ),
  totalChapters: javaCourseCurriculum.reduce((acc, part) => acc + part.chapters.length, 0),
  difficulty: "Beginner to Advanced (3 Levels)",
  estimatedTime: "12-16 Weeks"
}
