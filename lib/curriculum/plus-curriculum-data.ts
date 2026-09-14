/**
 * ASCI Plus Engineering Tracks Dataset
 * Rigorous, production-ready syllabuses: Operating Systems, Computer Networks, DBMS, Low-Level Design, OOPS, Production SQL, and Placement Aptitude.
 */

export interface AsciLesson {
  id: string;
  title: string;
  slug: string;
  type: string;
  hasIDE: boolean;
  rank: number;
}

// Backward compatibility alias
export type TUFLesson = AsciLesson;

export interface AsciModule {
  id: string;
  title: string;
  slug: string;
  rank: number;
  lessons: AsciLesson[];
}

// Backward compatibility alias
export type TUFModule = AsciModule;

export interface AsciSubject {
  slug: string;
  legacySlug: string;
  title: string;
  track: 'Core Subjects' | 'System Design' | 'Data Engineering' | 'Aptitude' | 'DSA';
  description: string;
  level: string;
  icon: string;
  badge: string;
  totalModules: number;
  totalLessons: number;
  modules: AsciModule[];
}

// Backward compatibility alias
export type TUFSubject = AsciSubject;

export interface AsciTrackGroup {
  name: string;
  description: string;
  subjects: AsciSubject[];
}

// Backward compatibility alias
export type PlusTrackGroup = AsciTrackGroup;

export const PLUS_SUBJECTS: AsciSubject[] = [
  {
    "slug": "operating-systems",
    "legacySlug": "operating-system",
    "title": "Operating Systems & Kernel Architecture",
    "track": "Core Subjects",
    "description": "Comprehensive systems engineering: process lifecycles, kernel space transitions, preemptive CPU scheduling, lock-free synchronization, deadlocks, and virtual memory page translation.",
    "level": "Foundational Systems",
    "icon": "Cpu",
    "badge": "Core Systems",
    "totalModules": 11,
    "totalLessons": 144,
    "modules": [
      {
        "id": "950",
        "title": "Module-1 (Operating System Basics and OS Introduction)",
        "slug": "module-1-operating-system-basics-and-os-introduction",
        "rank": 0,
        "lessons": [
          {
            "id": "14316",
            "title": "Why Do We Need an Operating System?",
            "slug": "why-do-we-need-an-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "14317",
            "title": "Operating System as a Manager",
            "slug": "operating-system-as-a-manager",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "14318",
            "title": "What Happens When We Open an App?",
            "slug": "what-happens-when-we-open-an-app",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "16428",
            "title": "Quiz - Introduction to Operating Systems",
            "slug": "quiz-introduction-to-operating-systems",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "14319",
            "title": "How Many Apps Run at the Same Time?",
            "slug": "how-many-apps-run-at-the-same-time",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "14320",
            "title": "OS and Protection",
            "slug": "os-and-protection",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "16429",
            "title": "Quiz - Apps and OS Safety",
            "slug": "quiz-apps-and-os-safety",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 6
          }
        ]
      },
      {
        "id": "951",
        "title": "Module-2 (Process Management in Operating System)",
        "slug": "module-2-process-management-in-operating-system",
        "rank": 1,
        "lessons": [
          {
            "id": "14321",
            "title": "Process Basics",
            "slug": "process-basics",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "14322",
            "title": "Program vs. Process vs. Thread",
            "slug": "program-vs-process-vs-thread",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "14323",
            "title": "Process States and Process Control Block",
            "slug": "process-states-and-process-control-block",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "14324",
            "title": "Process Creation and Termination",
            "slug": "process-creation-and-termination",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "16430",
            "title": "Quiz - Processes and Threads",
            "slug": "quiz-processes-and-threads",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          }
        ]
      },
      {
        "id": "952",
        "title": "Module-3 (CPU Scheduling Algorithms in Operating System))",
        "slug": "module-3-cpu-scheduling-algorithms-in-operating-system",
        "rank": 2,
        "lessons": [
          {
            "id": "14632",
            "title": "Scheduling Queues and Schedulers",
            "slug": "scheduling-queues-and-schedulers",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "14633",
            "title": "Context Switching in OS",
            "slug": "context-switching-in-os",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "14634",
            "title": "CPU Scheduling Basics",
            "slug": "cpu-scheduling-basics",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "16431",
            "title": "Quiz - CPU Scheduling Basics",
            "slug": "quiz-cpu-scheduling-basics",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "14635",
            "title": "First Come First Serve (FCFS) Scheduling",
            "slug": "first-come-first-serve-fcfs-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "14636",
            "title": "Shortest Job First (SJF) Scheduling",
            "slug": "shortest-job-first-sjf-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "14637",
            "title": "Shortest Remaining Time First (SRTF) Scheduling",
            "slug": "shortest-remaining-time-first-srtf-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "16432",
            "title": "Quiz - Basic CPU Scheduling Algorithms",
            "slug": "quiz-basic-cpu-scheduling-algorithms",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "14638",
            "title": "Highest Response Ratio Next (HRRN) Scheduling",
            "slug": "highest-response-ratio-next-hrrn-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "14639",
            "title": "Round Robin (RR) Scheduling",
            "slug": "round-robin-rr-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "14640",
            "title": "Priority Scheduling",
            "slug": "priority-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "14641",
            "title": "Multilevel Queue (MLQ) Scheduling",
            "slug": "multilevel-queue-mlq-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "14642",
            "title": "Multilevel Feedback Queue (MLFQ) Scheduling",
            "slug": "multilevel-feedback-queue-mlfq-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "16433",
            "title": "Quiz - Advanced CPU Scheduling Algorithms",
            "slug": "quiz-advanced-cpu-scheduling-algorithms",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 13
          }
        ]
      },
      {
        "id": "953",
        "title": "Module-4 (Kernel, OS Structures, and Advanced Scheduling)",
        "slug": "module-4-kernel-os-structures-and-advanced-scheduling",
        "rank": 3,
        "lessons": [
          {
            "id": "14625",
            "title": "Kernel in OS",
            "slug": "kernel-in-os",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "14626",
            "title": "Types of Operating Systems",
            "slug": "types-of-operating-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "14627",
            "title": "Types of Kernel Structures",
            "slug": "types-of-kernel-structures",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "14628",
            "title": "Why OS Schedulers Can't Implement Textbook Scheduling Algorithms",
            "slug": "why-os-schedulers-cant-implement-textbook-scheduling-algorithms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "16434",
            "title": "Quiz - OS Kernels and Scheduling",
            "slug": "quiz-os-kernels-and-scheduling",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "14629",
            "title": "Multicore Scheduling",
            "slug": "multicore-scheduling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "14630",
            "title": "Load Balancing in OS",
            "slug": "load-balancing-in-os",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "14631",
            "title": "CPU Affinity, Cache Locality, and NUMA",
            "slug": "cpu-affinity-cache-locality-and-numa",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "16435",
            "title": "Quiz - Multicore Scheduling and Load Balancing",
            "slug": "quiz-multicore-scheduling-and-load-balancing",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          }
        ]
      },
      {
        "id": "954",
        "title": "Module-5 (Threads and Multithreading in Operating System)",
        "slug": "module-5-threads-and-multithreading-in-operating-system",
        "rank": 4,
        "lessons": [
          {
            "id": "14843",
            "title": "Threads in Operating System",
            "slug": "threads-in-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "14844",
            "title": "Threads vs Processes",
            "slug": "threads-vs-processes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "14845",
            "title": "What Memory Is Shared Between Threads?",
            "slug": "what-memory-is-shared-between-threads",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "16436",
            "title": "Quiz - Threads in Operating System",
            "slug": "quiz-threads-in-operating-system",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "14846",
            "title": "User-Level Threads vs Kernel-Level Threads",
            "slug": "user-level-threads-vs-kernel-level-threads",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "14847",
            "title": "Multithreading Models in OS",
            "slug": "multithreading-models-in-os",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "14848",
            "title": "POSIX Threads",
            "slug": "posix-threads",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "16437",
            "title": "Quiz - Threads and Multithreading Models",
            "slug": "quiz-threads-and-multithreading-models",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "14849",
            "title": "Thread Pools",
            "slug": "thread-pools",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "14850",
            "title": "Concurrency vs Parallelism",
            "slug": "concurrency-vs-parallelism",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "14851",
            "title": "Multiprogramming vs Multitasking vs Multiprocessing vs Multithreading",
            "slug": "multiprogramming-vs-multitasking-vs-multiprocessing-vs-multithreading",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "14852",
            "title": "Thread Safety, Reentrancy, and Race Condition",
            "slug": "thread-safety-reentrancy-and-race-condition",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "16438",
            "title": "Quiz - Concurrency and Thread Safety",
            "slug": "quiz-concurrency-and-thread-safety",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 12
          }
        ]
      },
      {
        "id": "955",
        "title": "Module-6 (Process Synchronization and Concurrency Control)",
        "slug": "module-6-process-synchronization-and-concurrency-control",
        "rank": 5,
        "lessons": [
          {
            "id": "15353",
            "title": "Race Conditions in Operating Systems",
            "slug": "race-conditions-in-operating-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "15354",
            "title": "Critical Section Problem and Mutual Exclusion",
            "slug": "critical-section-problem-and-mutual-exclusion",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "16440",
            "title": "Quiz - Race Conditions and Critical Sections",
            "slug": "quiz-race-conditions-and-critical-sections",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "15355",
            "title": "Dekker’s Algorithm",
            "slug": "dekkers-algorithm",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "15356",
            "title": "Peterson’s Algorithm",
            "slug": "petersons-algorithm",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "15357",
            "title": "Bakery Algorithm",
            "slug": "bakery-algorithm",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "16441",
            "title": "Quiz - Classical Mutual Exclusion Algorithms",
            "slug": "quiz-classical-mutual-exclusion-algorithms",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "15358",
            "title": "Hardware Synchronization Principles",
            "slug": "hardware-synchronization-principles",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "15359",
            "title": "Test-and-Set",
            "slug": "test-and-set",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "15360",
            "title": "Compare-and-Swap",
            "slug": "compare-and-swap",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "16442",
            "title": "Quiz - Hardware Synchronization Basics",
            "slug": "quiz-hardware-synchronization-basics",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "15361",
            "title": "Locks, Mutexes, and Types of Locks",
            "slug": "locks-mutexes-and-types-of-locks",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "15462",
            "title": "Semaphores",
            "slug": "semaphores",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "15463",
            "title": "Mutex vs Semaphores",
            "slug": "mutex-vs-semaphores",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "16443",
            "title": "Quiz - Locks and Semaphores",
            "slug": "quiz-locks-and-semaphores",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "15464",
            "title": "Producer-Consumer Problem",
            "slug": "producer-consumer-problem-pre",
            "type": "Theory",
            "hasIDE": false,
            "rank": 15
          },
          {
            "id": "15465",
            "title": "Condition Variables in OS",
            "slug": "condition-variables-in-os",
            "type": "Theory",
            "hasIDE": false,
            "rank": 16
          },
          {
            "id": "15466",
            "title": "Monitoring in OS",
            "slug": "monitoring-in-os",
            "type": "Theory",
            "hasIDE": false,
            "rank": 17
          },
          {
            "id": "16444",
            "title": "Quiz - Process Synchronization Problems",
            "slug": "quiz-process-synchronization-problems",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 18
          },
          {
            "id": "15467",
            "title": "Readers-Writers Problem",
            "slug": "readers-writers-problem",
            "type": "Theory",
            "hasIDE": false,
            "rank": 19
          },
          {
            "id": "15468",
            "title": "Sleeping Barber Problem",
            "slug": "sleeping-barber-problem",
            "type": "Theory",
            "hasIDE": false,
            "rank": 20
          },
          {
            "id": "15469",
            "title": "Dining Philosophers Problem",
            "slug": "dining-philosophers-problem",
            "type": "Theory",
            "hasIDE": false,
            "rank": 21
          },
          {
            "id": "16445",
            "title": "Quiz - Classical Synchronization Problems",
            "slug": "quiz-classical-synchronization-problems",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 22
          }
        ]
      },
      {
        "id": "1910",
        "title": "Module-7 (Deadlock, Starvation, and Concurrency Bugs)",
        "slug": "module-7-deadlock-starvation-and-concurrency-bugs",
        "rank": 6,
        "lessons": [
          {
            "id": "15570",
            "title": "Deadlock in Operating Systems",
            "slug": "deadlock-in-operating-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "15571",
            "title": "Conditions for Deadlock",
            "slug": "conditions-for-deadlock",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "15572",
            "title": "Resource Allocation Graph",
            "slug": "resource-allocation-graph",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "15573",
            "title": "Wait-for Graph, Safe State, and Unsafe State",
            "slug": "wait-for-graph-safe-state-and-unsafe-state",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "16958",
            "title": "Quiz - Deadlocks in Operating Systems",
            "slug": "quiz-deadlocks-in-operating-systems",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "15574",
            "title": "Deadlock Prevention",
            "slug": "deadlock-prevention",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "15575",
            "title": "Deadlock Avoidance",
            "slug": "deadlock-avoidance",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "15576",
            "title": "Banker’s Algorithm",
            "slug": "bankers-algorithm-pre",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "15577",
            "title": "Deadlock Detection",
            "slug": "deadlock-detection",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "16959",
            "title": "Quiz - Deadlock Handling in Operating Systems",
            "slug": "quiz-deadlock-handling-in-operating-systems",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "15578",
            "title": "Deadlock Recovery",
            "slug": "deadlock-recovery",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "15579",
            "title": "Starvation vs Deadlock vs Livelock",
            "slug": "starvation-vs-deadlock-vs-livelock",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "15580",
            "title": "Priority Inversion",
            "slug": "priority-inversion-pre",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "15581",
            "title": "Debugging Concurrency Bugs",
            "slug": "debugging-concurrency-bugs",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "16960",
            "title": "Quiz - Deadlock Recovery and Concurrency Issues",
            "slug": "quiz-deadlock-recovery-and-concurrency-issues",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 14
          }
        ]
      },
      {
        "id": "1911",
        "title": "Module-8 (System Calls and Inter-Process Communication)",
        "slug": "module-8-system-calls-and-inter-process-communication",
        "rank": 7,
        "lessons": [
          {
            "id": "15582",
            "title": "System Calls in Operating System",
            "slug": "system-calls-in-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "15583",
            "title": "Types of System Calls",
            "slug": "types-of-system-calls",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "15584",
            "title": "Traps, Interrupts, and Exceptions",
            "slug": "traps-interrupts-and-exceptions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "16961",
            "title": "Quiz - System Calls and Interrupts",
            "slug": "quiz-system-calls-and-interrupts",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "15585",
            "title": "fork, exec, wait, and exit",
            "slug": "fork-exec-wait-and-exit",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "15586",
            "title": "Program Loading, Linking, and Dynamic Libraries",
            "slug": "program-loading-linking-and-dynamic-libraries",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "15587",
            "title": "Zombie and Orphan Processes",
            "slug": "zombie-and-orphan-processes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "16962",
            "title": "Quiz - Process System Calls and Program Loading",
            "slug": "quiz-process-system-calls-and-program-loading",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "15588",
            "title": "Daemon Processes",
            "slug": "daemon-processes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "15589",
            "title": "Inter-Process Communication (IPC)",
            "slug": "inter-process-communication-ipc",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "15590",
            "title": "Pipes and Named Pipes",
            "slug": "pipes-and-named-pipes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "16963",
            "title": "Quiz - Daemons and IPC Basics",
            "slug": "quiz-daemons-and-ipc-basics",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "15591",
            "title": "Message Queues",
            "slug": "message-queues",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "15592",
            "title": "Shared Memory",
            "slug": "shared-memory",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "15593",
            "title": "Memory-Mapped Files and mmap",
            "slug": "memory-mapped-files-and-mmap",
            "type": "Theory",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "16964",
            "title": "Quiz - IPC Memory and Message Passing",
            "slug": "quiz-ipc-memory-and-message-passing",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 15
          },
          {
            "id": "15594",
            "title": "Signals in Operating Systems",
            "slug": "signals-in-operating-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 16
          },
          {
            "id": "15595",
            "title": "Sockets in Operating Systems",
            "slug": "sockets-in-operating-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 17
          },
          {
            "id": "15596",
            "title": "IPC Decision Guide",
            "slug": "ipc-decision-guide",
            "type": "Theory",
            "hasIDE": false,
            "rank": 18
          },
          {
            "id": "16965",
            "title": "Quiz - Signals, Sockets, and IPC Choices",
            "slug": "quiz-signals-sockets-and-ipc-choices",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 19
          }
        ]
      },
      {
        "id": "1989",
        "title": "Module-9 (Memory Management in Operating System)",
        "slug": "module-9-memory-management-in-operating-system",
        "rank": 8,
        "lessons": [
          {
            "id": "16417",
            "title": "Address Space in Operating System",
            "slug": "address-space-in-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "16418",
            "title": "Stack, Heap, Code, and Data Segments",
            "slug": "stack-heap-code-and-data-segments",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "16419",
            "title": "Memory Allocation APIs: malloc, free, brk, and mmap",
            "slug": "memory-allocation-apis-malloc-free-brk-and-mmap",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "16966",
            "title": "Quiz - Process Memory Basics",
            "slug": "quiz-process-memory-basics",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "16420",
            "title": "Logical Address vs. Physical Address and MMU",
            "slug": "logical-address-vs-physical-address-and-mmu",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "16421",
            "title": "Swapping in Operating System",
            "slug": "swapping-in-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "16422",
            "title": "Contiguous Memory Allocation",
            "slug": "contiguous-memory-allocation",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "16423",
            "title": "Fixed vs. Variable Partitioning",
            "slug": "fixed-vs-variable-partitioning",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "16967",
            "title": "Quiz - Memory Allocation and Address Translation",
            "slug": "quiz-memory-allocation-and-address-translation",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "16424",
            "title": "First Fit, Best Fit, Worst Fit, and Next Fit",
            "slug": "first-fit-best-fit-worst-fit-and-next-fit",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "16425",
            "title": "Internal vs. External Fragmentation",
            "slug": "internal-vs-external-fragmentation",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "16426",
            "title": "Compaction and Buddy System",
            "slug": "compaction-and-buddy-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "16968",
            "title": "Quiz - Memory Allocation Strategies",
            "slug": "quiz-memory-allocation-strategies",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 12
          }
        ]
      },
      {
        "id": "1990",
        "title": "Module-10 (Paging and Virtual Memory in Operating System)",
        "slug": "module-10-paging-and-virtual-memory-in-operating-system",
        "rank": 9,
        "lessons": [
          {
            "id": "16946",
            "title": "Paging in Operating System",
            "slug": "paging-in-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "16947",
            "title": "Paging vs Segmentation",
            "slug": "paging-vs-segmentation",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "16948",
            "title": "Pages, Frames, Page Tables, and PTEs",
            "slug": "pages-frames-page-tables-and-ptes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "16949",
            "title": "PTE Numerical",
            "slug": "pte-numerical",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "17079",
            "title": "Quiz - Paging and Segmentation",
            "slug": "quiz-paging-and-segmentation",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "16950",
            "title": "Multilevel Paging",
            "slug": "multilevel-paging",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "16951",
            "title": "Inverted Page Table",
            "slug": "inverted-page-table",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "16952",
            "title": "TLB in Operating System",
            "slug": "tlb-in-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "17080",
            "title": "Quiz - Page Tables and TLB",
            "slug": "quiz-page-tables-and-tlb",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "16953",
            "title": "Effective Access Time with TLB",
            "slug": "effective-access-time-with-tlb",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "16954",
            "title": "Virtual Memory in Operating System",
            "slug": "virtual-memory-in-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "16955",
            "title": "Demand Paging",
            "slug": "demand-paging",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "17081",
            "title": "Quiz - TLB and Virtual Memory",
            "slug": "quiz-tlb-and-virtual-memory",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "16956",
            "title": "Page Fault in Operating System",
            "slug": "page-fault-in-operating-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "16957",
            "title": "Copy-on-Write and Lazy Allocation",
            "slug": "copy-on-write-and-lazy-allocation",
            "type": "Theory",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "17082",
            "title": "Quiz - Page Faults and Lazy Allocation",
            "slug": "quiz-page-faults-and-lazy-allocation",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 15
          }
        ]
      },
      {
        "id": "1991",
        "title": "Module-11 (Page Replacement Algorithms and Thrashing)",
        "slug": "module-11-page-replacement-algorithms-and-thrashing",
        "rank": 10,
        "lessons": [
          {
            "id": "17070",
            "title": "Page Replacement Algorithms",
            "slug": "page-replacement-algorithms-pre",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "17071",
            "title": "FIFO Page Replacement",
            "slug": "fifo-page-replacement",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "17072",
            "title": "Optimal Page Replacement",
            "slug": "optimal-page-replacement",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "17073",
            "title": "LRU Page Replacement",
            "slug": "lru-page-replacement",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "17074",
            "title": "LFU and MFU Page Replacement",
            "slug": "lfu-and-mfu-page-replacement",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "17075",
            "title": "Second-Chance and Clock Page Replacement",
            "slug": "second-chance-and-clock-page-replacement",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "17076",
            "title": "Belady's Anomaly",
            "slug": "beladys-anomaly-pre",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "17077",
            "title": "Thrashing and Working Set Model",
            "slug": "thrashing-and-working-set-model",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "17078",
            "title": "Frame Allocation Strategies",
            "slug": "frame-allocation-strategies",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          }
        ]
      }
    ]
  },
  {
    "slug": "computer-networks",
    "legacySlug": "computer-network",
    "title": "Computer Networks & Distributed Protocols",
    "track": "Core Subjects",
    "description": "Complete networking stack: physical signals, framing, CIDR subnetting, BGP/OSPF routing, TCP flow and congestion control, DNS, HTTP/3, and cryptographic handshakes.",
    "level": "Infrastructure & Protocols",
    "icon": "Network",
    "badge": "Core Systems",
    "totalModules": 15,
    "totalLessons": 184,
    "modules": [
      {
        "id": "934",
        "title": "Module-1 (CN Foundations)",
        "slug": "module-1-cn-foundations",
        "rank": 0,
        "lessons": [
          {
            "id": "3480",
            "title": "Why Networks exists",
            "slug": "why-networks-exists",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3481",
            "title": "Network Types",
            "slug": "network-types",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "10279",
            "title": "Quiz - Network Basics",
            "slug": "quiz-network-basics",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3482",
            "title": "Internet and Backbone Networks",
            "slug": "internet-and-backbone-networks",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3483",
            "title": "Clients, Servers and Peers",
            "slug": "clients-servers-and-peers",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3651",
            "title": "How data moves in packets",
            "slug": "how-data-moves-in-packets",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "10280",
            "title": "Quiz Internet Fundamentals",
            "slug": "quiz-internet-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 6
          }
        ]
      },
      {
        "id": "935",
        "title": "Module-2 (Network Models)",
        "slug": "module-2-network-models",
        "rank": 1,
        "lessons": [
          {
            "id": "3486",
            "title": "Why do we need layered Architecture",
            "slug": "why-do-we-need-layered-architecture",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3487",
            "title": "OSI Model",
            "slug": "osi-model",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "8352",
            "title": "How Data Travels Up the OSI Model",
            "slug": "how-data-travels-up-the-osi-model",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "10281",
            "title": "Quiz OSI Fundamentals",
            "slug": "quiz-osi-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3488",
            "title": "TCP/IP Model",
            "slug": "tcpip-model",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3489",
            "title": "OSI vs TCP/IP",
            "slug": "osi-vs-tcpip",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3490",
            "title": "Encapsulation and Decapsulation",
            "slug": "encapsulation-and-decapsulation",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "10282",
            "title": "Quiz TCP/IP & Encapsulation",
            "slug": "quiz-tcpip-encapsulation",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 7
          }
        ]
      },
      {
        "id": "936",
        "title": "Module-3 (Physical and Data Link Layer)",
        "slug": "module-3-physical-and-data-link-layer",
        "rank": 2,
        "lessons": [
          {
            "id": "3533",
            "title": "Physical Layer",
            "slug": "physical-layer",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3534",
            "title": "Transmission Media",
            "slug": "transmission-media",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3652",
            "title": "Twisted Pair Cable",
            "slug": "twisted-pair-cable",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3653",
            "title": "Fiber Optic Cable",
            "slug": "fiber-optic-cable",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3654",
            "title": "Coaxial Cable",
            "slug": "coaxial-cable",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "10283",
            "title": "Quiz Physical Layer & Media",
            "slug": "quiz-physical-layer-media",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3535",
            "title": "Full duplex vs Half duplex",
            "slug": "full-duplex-vs-half-duplex",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3536",
            "title": "Network Device",
            "slug": "network-device",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "3537",
            "title": "Mac address",
            "slug": "mac-address-",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "10284",
            "title": "Quiz Network Devices & MAC",
            "slug": "quiz-network-devices-mac",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "3539",
            "title": "Error Detection",
            "slug": "error-detection",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "8353",
            "title": "Medium Access and CSMA",
            "slug": "medium-access-and-csma",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "3541",
            "title": "Address Resolution Protocol",
            "slug": "address-resolution-protocol",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "3542",
            "title": "Network Access Control",
            "slug": "network-access-control",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "10285",
            "title": "Quiz Network Communication",
            "slug": "quiz-network-communication",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "9677",
            "title": "Why do we need STP?",
            "slug": "why-do-we-need-stp",
            "type": "Theory",
            "hasIDE": false,
            "rank": 15
          },
          {
            "id": "9678",
            "title": "Spanning Tree Protocol (STP)",
            "slug": "spanning-tree-protocol-stp",
            "type": "Theory",
            "hasIDE": false,
            "rank": 16
          }
        ]
      },
      {
        "id": "937",
        "title": "Module-4 (Network Topologies and VLANs)",
        "slug": "module-4-network-topologies-and-vlans",
        "rank": 3,
        "lessons": [
          {
            "id": "3549",
            "title": "Network Topologies and VLANs Introduction",
            "slug": "network-topologies-and-vlans-introduction",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3550",
            "title": "Physical Topologies",
            "slug": "physical-topologies",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3551",
            "title": "Hybrid Topology",
            "slug": "hybrid-topology",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3552",
            "title": "Logical Topologies",
            "slug": "logical-topologies",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "10286",
            "title": "Quiz Network Topologies",
            "slug": "quiz-network-topologies",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3553",
            "title": "Ethernet Switching",
            "slug": "ethernet-switching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3554",
            "title": "Virtual LANs",
            "slug": "virtual-lans",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3555",
            "title": "Switching vs Routing",
            "slug": "switching-vs-routing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "10287",
            "title": "Quiz Switching & VLAN",
            "slug": "quiz-switching-vlan",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          }
        ]
      },
      {
        "id": "939",
        "title": "Module-5 (Network Layer: IP Addressing)",
        "slug": "module-5-network-layer-ip-addressing",
        "rank": 4,
        "lessons": [
          {
            "id": "3556",
            "title": "Introduction to Network Layer",
            "slug": "introduction-to-network-layer",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3557",
            "title": "IPv4 Introduction",
            "slug": "ipv4-introduction",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3558",
            "title": "IPv4 Datagram",
            "slug": "ipv4-datagram",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "10288",
            "title": "Quiz Network Layer Fundamentals",
            "slug": "quiz-network-layer-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3559",
            "title": "IP Addressing Modes",
            "slug": "ip-addressing-modes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3560",
            "title": "Private vs Public IP",
            "slug": "private-vs-public-ip",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3561",
            "title": "Classful Addressing",
            "slug": "classful-addressing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3562",
            "title": "Subnetting",
            "slug": "subnetting",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "10289",
            "title": "Quiz Network Addressing",
            "slug": "quiz-network-addressing",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "3563",
            "title": "Common Interview Questions",
            "slug": "common-interview-questions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "3572",
            "title": "CIDR - Classless Addressing",
            "slug": "cidr-classless-addressing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "10290",
            "title": "Quiz CIDR",
            "slug": "quiz-cidr",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "3574",
            "title": "IPv6 Introduction",
            "slug": "ipv6-introduction",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "3578",
            "title": "IPv6 Datagram",
            "slug": "ipv6-datagram",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "3579",
            "title": "IPv6 over IPv4",
            "slug": "ipv6-over-ipv4",
            "type": "Theory",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "10291",
            "title": "Quiz IPv6",
            "slug": "quiz-ipv6",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 15
          }
        ]
      },
      {
        "id": "940",
        "title": "Module-6 (Network Layer: Routing)",
        "slug": "module-6-network-layer-routing",
        "rank": 5,
        "lessons": [
          {
            "id": "3581",
            "title": "Router vs Forwarding",
            "slug": "router-vs-forwarding",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3583",
            "title": "Routing Tables Basics",
            "slug": "routing-tables-basics",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3584",
            "title": "Static Routing",
            "slug": "static-routing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3585",
            "title": "Dynamic Routing",
            "slug": "dynamic-routing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "10292",
            "title": "Quiz Routing Fundamentals",
            "slug": "quiz-routing-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3586",
            "title": "Distance Vector Routing and RIP",
            "slug": "distance-vector-routing-and-rip",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3587",
            "title": "Routing Loop and Prevention",
            "slug": "routing-loop-and-prevention",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3588",
            "title": "Link State Routing and OSPF",
            "slug": "link-state-routing-and-ospf",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "3589",
            "title": "Hybrid Routing and EIGRP",
            "slug": "hybrid-routing-and-eigrp",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "3590",
            "title": "Border Gateway Protocol",
            "slug": "border-gateway-protocol",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "10293",
            "title": "Quiz Routing Protocols",
            "slug": "quiz-routing-protocols",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 10
          }
        ]
      },
      {
        "id": "941",
        "title": "Module-7 (Transport Layer)",
        "slug": "module-7-transport-layer",
        "rank": 6,
        "lessons": [
          {
            "id": "3592",
            "title": "Transport Layer Introduction",
            "slug": "transport-layer-introduction",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3594",
            "title": "Port and Sockets",
            "slug": "port-and-sockets",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "10294",
            "title": "Quiz Transport Layer Fundamentals",
            "slug": "quiz-transport-layer-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3597",
            "title": "UDP",
            "slug": "udp",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3598",
            "title": "TCP-I: Connection Setup and Numbering",
            "slug": "tcp-i-connection-setup-and-numbering",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "10295",
            "title": "Quiz TCP & UDP Fundamentals",
            "slug": "quiz-tcp-udp-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3602",
            "title": "TCP-II: Reliability, Flow Control and Sliding Window",
            "slug": "tcp-ii-reliability-flow-control-and-sliding-window",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3603",
            "title": "TCP-III: Congestion Control and Connection Closing",
            "slug": "tcp-iii-congestion-control-and-connection-closing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "3609",
            "title": "When to choose TCP/UDP",
            "slug": "when-to-choose-tcpudp",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "10296",
            "title": "Quiz TCP Advanced",
            "slug": "quiz-tcp-advanced",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 9
          }
        ]
      },
      {
        "id": "943",
        "title": "Module-8 (Application Layer)",
        "slug": "module-8-application-layer",
        "rank": 7,
        "lessons": [
          {
            "id": "3611",
            "title": "Application Layer Introduction",
            "slug": "application-layer-introduction",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3612",
            "title": "HTTP-Request Response Model",
            "slug": "http-request-response-model",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3613",
            "title": "HTTP methods and status codes",
            "slug": "http-methods-and-status-codes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3614",
            "title": "HTTP Versions",
            "slug": "http-versions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3616",
            "title": "HTTP/3 and QUIC",
            "slug": "http3-and-quic",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3617",
            "title": "HTTPS and TLS",
            "slug": "https-and-tls",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "10297",
            "title": "Quiz Application Layer & HTTP Fundamentals",
            "slug": "quiz-application-layer-http-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3618",
            "title": "Cookies, Sessions, and tokens",
            "slug": "cookies-sessions-and-tokens",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "3619",
            "title": "Rest API’s",
            "slug": "rest-apis",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "3620",
            "title": "WebSockets",
            "slug": "websockets",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "3621",
            "title": "File Transfer Protocol",
            "slug": "file-transfer-protocol",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "3622",
            "title": "Email Protocols",
            "slug": "email-protocols",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "10298",
            "title": "Quiz Web Authentication, APIs & Application Layer Protocols",
            "slug": "quiz-web-authentication-apis-application-layer-protocols-",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 12
          }
        ]
      },
      {
        "id": "942",
        "title": "Module-9 (NAT and Internet Edge Networking)",
        "slug": "module-9-nat-and-internet-edge-networking",
        "rank": 8,
        "lessons": [
          {
            "id": "3623",
            "title": "NAT and Why do we need it?",
            "slug": "nat-and-why-we-need-it",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3626",
            "title": "NAT Packet Flow",
            "slug": "nat-packet-flow",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3625",
            "title": "Types of NAT",
            "slug": "types-of-nat",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3630",
            "title": "SNAT, DNAT and Port Forwarding",
            "slug": "snat-dnat-and-port-forwarding",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3632",
            "title": "NAT Limitations",
            "slug": "nat-limitations",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "10299",
            "title": "Quiz Network Address Translation (NAT) Fundamentals",
            "slug": "quiz-network-address-translation-nat-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3634",
            "title": "DNS",
            "slug": "dns",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3635",
            "title": "DNS Record Types",
            "slug": "dns-record-types",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "3636",
            "title": "DNS Security",
            "slug": "dns-security",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "3637",
            "title": "DNSSEC",
            "slug": "dnssec",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "3638",
            "title": "Dynamic Host Configuration Protocol (DHCP)",
            "slug": "dynamic-host-configuration-protocol-dhcp",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "10300",
            "title": "Quiz Domain Name System (DNS) & DHCP",
            "slug": "quiz-domain-name-system-dns-dhcp",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 11
          }
        ]
      },
      {
        "id": "944",
        "title": "Module-10 (Switching Techniques)",
        "slug": "module-10-switching-techniques",
        "rank": 9,
        "lessons": [
          {
            "id": "3640",
            "title": "What is Switching and Why?",
            "slug": "what-is-switching-and-why",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3641",
            "title": "Fundamental Switching Techniques",
            "slug": "fundamental-switching-techniques",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3642",
            "title": "Circuit Switching",
            "slug": "circuit-switching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3643",
            "title": "Packet Switching",
            "slug": "packet-switching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3644",
            "title": "Datagram Packet Switching",
            "slug": "datagram-packet-switching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3645",
            "title": "Virtual Circuit Packet Switching",
            "slug": "virtual-circuit-packet-switching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "7608",
            "title": "MPLS",
            "slug": "mpls",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3646",
            "title": "Circuit Switching vs. Virtual Packet Switching",
            "slug": "circuit-switching-vs-virtual-packet-switching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "10301",
            "title": "Quiz Circuit Switching, Packet Switching & MPLS",
            "slug": "quiz-circuit-switching-packet-switching-mpls",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "3647",
            "title": "Message Switching",
            "slug": "message-switching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "3648",
            "title": "Why Packet Switching became backbone of Internet",
            "slug": "why-packet-switching-became-backbone-of-internet",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "3649",
            "title": "Comparisons between all 3",
            "slug": "comparisons-between-all-3",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "3650",
            "title": "FAQs - Switching",
            "slug": "faqs-switching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "10302",
            "title": "Quiz Message Switching and Comparison",
            "slug": "quiz-message-switching-and-comparison",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 13
          }
        ]
      },
      {
        "id": "945",
        "title": "Module-11 (Network Security)",
        "slug": "module-11-network-security",
        "rank": 10,
        "lessons": [
          {
            "id": "7909",
            "title": "Why Network Security?",
            "slug": "why-network-security",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "7910",
            "title": "CIA Triad",
            "slug": "cia-triad",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "7911",
            "title": "AAA Framework",
            "slug": "aaa-framework",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "7912",
            "title": "Common Network Security Threats",
            "slug": "common-network-security-threats",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "10303",
            "title": "Quiz Network Security Fundamentals",
            "slug": "quiz-network-security-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "7913",
            "title": "Firewalls and Types",
            "slug": "firewalls-and-types",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "7914",
            "title": "Firewall Type Comparison - L3, L4, and L7",
            "slug": "firewall-type-comparison-l3-l4-and-l7",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "7915",
            "title": "IDPS",
            "slug": "idps",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "7916",
            "title": "VPNs",
            "slug": "vpns",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "7917",
            "title": "Zero Trust Architecture",
            "slug": "zero-trust-architecture",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "10304",
            "title": "Quiz Network Perimeter Security & Zero Trust",
            "slug": "quiz-network-perimeter-security-zero-trust",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 10
          }
        ]
      },
      {
        "id": "946",
        "title": "Module-12 (Cryptography and Secure Protocols)",
        "slug": "module-12-cryptography-and-secure-protocols",
        "rank": 11,
        "lessons": [
          {
            "id": "8219",
            "title": "Introduction of Cryptography",
            "slug": "introduction-of-cryptography",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "8220",
            "title": "Security Goals of Cryptography",
            "slug": "security-goals-of-cryptography",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "8221",
            "title": "Basic Cryptography Terms",
            "slug": "basic-cryptography-terms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "10305",
            "title": "Quiz Introduction to Cryptography",
            "slug": "quiz-introduction-to-cryptography",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "8222",
            "title": "Symmetric Encryption",
            "slug": "symmetric-encryption",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "8223",
            "title": "Asymmetric Cryptography",
            "slug": "asymmetric-cryptography",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "8224",
            "title": "Diffie Hellman Key Exchange Method",
            "slug": "diffie-hellman-key-exchange-method",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "8225",
            "title": "Hybrid Encryption",
            "slug": "hybrid-encryption",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "10306",
            "title": "Quiz Encryption Techniques",
            "slug": "quiz-encryption-techniques",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "2476",
            "title": "Hash Functions",
            "slug": "hash-functions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "8226",
            "title": "MAC and HMAC",
            "slug": "mac-and-hmac",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "2454",
            "title": "Digital Signatures",
            "slug": "digital-signatures",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "10307",
            "title": "Quiz  Hashing & Digital Signatures",
            "slug": "quiz-hashing-digital-signatures",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "8227",
            "title": "Certificate Authority and Chain of Trust",
            "slug": "certificate-authority-and-chain-of-trust",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "8228",
            "title": "Public Key Infrastructure",
            "slug": "public-key-infrastructure",
            "type": "Theory",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "8229",
            "title": "Certificate Pinning",
            "slug": "certificate-pinning",
            "type": "Theory",
            "hasIDE": false,
            "rank": 15
          },
          {
            "id": "10308",
            "title": "Quiz Digital Certificates & Trust",
            "slug": "-quiz-digital-certificates-trust",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 16
          },
          {
            "id": "8230",
            "title": "TLS and SSL",
            "slug": "tls-and-ssl",
            "type": "Theory",
            "hasIDE": false,
            "rank": 17
          },
          {
            "id": "8231",
            "title": "TLS Handshake and Forward Secrecy",
            "slug": "tls-handshake-and-forward-secrecy",
            "type": "Theory",
            "hasIDE": false,
            "rank": 18
          },
          {
            "id": "10310",
            "title": "Quiz TLS Fundamentals",
            "slug": "quiz-tls-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 19
          }
        ]
      },
      {
        "id": "947",
        "title": "Module-13: (Wireless Networking)",
        "slug": "module-13-wireless-networking",
        "rank": 12,
        "lessons": [
          {
            "id": "8242",
            "title": "Wireless Networking Introduction",
            "slug": "wireless-networking-introduction",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "8243",
            "title": "Basics of Wireless Networking",
            "slug": "basics-of-wireless-networking",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "8244",
            "title": "Wi-Fi Joining Flow",
            "slug": "wi-fi-joining-flow",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "8245",
            "title": "WPA and WPA/WPA-2/WPA-3 Security Handshake",
            "slug": "wpa-and-wpawpa-2wpa-3-security-handshake",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "8246",
            "title": "IEEE 802.11 and Wi-Fi Generations",
            "slug": "ieee-80211-and-wi-fi-generations",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "10311",
            "title": "Quiz Wi-Fi Fundamentals",
            "slug": "quiz-wi-fi-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "8247",
            "title": "Why Wi-Fi speed drops in Real Life",
            "slug": "why-wi-fi-speed-drops-in-real-life",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "8248",
            "title": "How Wi-Fi avoids Collisions",
            "slug": "how-wi-fi-avoids-collisions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "8249",
            "title": "Wi-Fi Frame Types",
            "slug": "wi-fi-frame-types",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "8250",
            "title": "Wi-Fi Security",
            "slug": "wi-fi-security",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "8251",
            "title": "Packet Flow: Opening a website over Wi-Fi",
            "slug": "packet-flow-opening-a-website-over-wi-fi",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "10312",
            "title": "Quiz Advanced Wi-Fi Concepts",
            "slug": "quiz-advanced-wi-fi-concepts",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 11
          }
        ]
      },
      {
        "id": "948",
        "title": "Module-14 (Network Performance)",
        "slug": "module-14-network-performance",
        "rank": 13,
        "lessons": [
          {
            "id": "9356",
            "title": "Introduction to Network Performance",
            "slug": "introduction-to-network-performance",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "9357",
            "title": "Metrics Deep Dive",
            "slug": "metrics-deep-dive",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "9358",
            "title": "Data Transfer and Bottlenecks, BDP",
            "slug": "data-transfer-and-bottlenecks-bdp",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "9359",
            "title": "Latency Sources, Delay, and TTFB",
            "slug": "latency-sources-delay-and-ttfb",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "9360",
            "title": "Congestion, Bufferbloat, and Congestion Collapse Loop",
            "slug": "congestion-bufferbloat-and-congestion-collapse-loop",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "9461",
            "title": "QoS, Traffic Shaping, and Policing",
            "slug": "qos-traffic-shaping-and-policing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "10313",
            "title": "Quiz Network Performance Fundamentals",
            "slug": "quiz-network-performance-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "9566",
            "title": "Rate Limiting",
            "slug": "rate-limiting",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "9567",
            "title": "Fixed Window Counter - Rate Limiting Algo",
            "slug": "fixed-window-counter-rate-limiting-algo",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "9568",
            "title": "Sliding Window Log - Rate Limiting Algo",
            "slug": "sliding-window-log-rate-limiting-algo",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "9569",
            "title": "Sliding Window Counter - Rate Limiting Algo",
            "slug": "sliding-window-counter-rate-limiting-algo",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "9570",
            "title": "Token Bucket - Rate Limiting Algo",
            "slug": "token-bucket-rate-limiting-algo",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "9571",
            "title": "Leaky Bucket - Rate Limiting Algo",
            "slug": "leaky-bucket-rate-limiting-algo",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "9572",
            "title": "Concurrency Limiter - Rate Limiting Algo",
            "slug": "concurrency-limiter-rate-limiting-algo",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "10314",
            "title": "Quiz Rate Limiting",
            "slug": "quiz-rate-limiting",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "9573",
            "title": "Load Balancing Fundamentals",
            "slug": "load-balancing-fundamentals",
            "type": "Theory",
            "hasIDE": false,
            "rank": 15
          },
          {
            "id": "9574",
            "title": "L4 vs L7 Load Balancers",
            "slug": "l4-vs-l7-load-balancers",
            "type": "Theory",
            "hasIDE": false,
            "rank": 16
          },
          {
            "id": "9676",
            "title": "Load Balancing Algorithms",
            "slug": "load-balancing-algorithms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 17
          },
          {
            "id": "9575",
            "title": "CDN Caching and Lifestyle",
            "slug": "cdn-caching-and-lifestyle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 18
          },
          {
            "id": "10315",
            "title": "Quiz Load Balancing and Caching",
            "slug": "quiz-load-balancing-and-caching",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 19
          }
        ]
      },
      {
        "id": "949",
        "title": "Module-15 (Situation Based Explanations)",
        "slug": "module-15-situation-based-explanations",
        "rank": 14,
        "lessons": [
          {
            "id": "9562",
            "title": "What happens when you type google.com",
            "slug": "what-happens-when-you-type-googlecom",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "9563",
            "title": "What happens when DNS fails?",
            "slug": "what-happens-when-dns-fails",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "9564",
            "title": "What happens when you connect to public Wi-Fi?",
            "slug": "what-happens-when-you-connect-to-public-wi-fi",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "9565",
            "title": "How does a CDN serve an image/video?",
            "slug": "how-does-a-cdn-serve-an-imagevideo",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "dbms",
    "legacySlug": "dbms",
    "title": "Database Management Systems & Storage Engines",
    "track": "Core Subjects",
    "description": "Relational data modeling, formal normalization (1NF through BCNF), transaction atomicity, MVCC concurrency, write-ahead logging (WAL), B+Tree indexing, and query optimization.",
    "level": "Data Architecture",
    "icon": "Database",
    "badge": "Core Systems",
    "totalModules": 14,
    "totalLessons": 108,
    "modules": [
      {
        "id": "129",
        "title": "Introduction to DBMS",
        "slug": "introduction-to-dbms",
        "rank": 0,
        "lessons": [
          {
            "id": "1323",
            "title": "Data, Information & Database",
            "slug": "data-information-database",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1575",
            "title": "Types of Databases",
            "slug": "types-of-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1330",
            "title": "Database Management System",
            "slug": "database-management-system",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1433",
            "title": "Need, Advantages and Disadvantages of DBMS",
            "slug": "need-advantages-and-disadvantages-of-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1313",
            "title": "Data Abstraction in DBMS",
            "slug": "data-abstraction-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1340",
            "title": "DBMS Architecture",
            "slug": "dbms-architecture",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1337",
            "title": "Database Users and Interactions",
            "slug": "database-users-and-interactions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1672",
            "title": "Quiz Introduction to DBMS",
            "slug": "quiz-1-introduction-to-dbms",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 7
          }
        ]
      },
      {
        "id": "38",
        "title": "Data Models and ER Models",
        "slug": "data-models-and-er-models",
        "rank": 1,
        "lessons": [
          {
            "id": "1341",
            "title": "DBMS Interfaces",
            "slug": "dbms-interfaces",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1318",
            "title": "Data Models and Their Types",
            "slug": "data-models-and-their-types",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1361",
            "title": "ER Model and its Components",
            "slug": "er-model-and-its-components",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1583",
            "title": "Types of Relationships in DBMS",
            "slug": "types-of-relationships-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1368",
            "title": "Extended ER Features",
            "slug": "extended-er-features",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1577",
            "title": "Types of Inheritance",
            "slug": "types-of-inheritance",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1359",
            "title": "Entity-Relationship Diagram",
            "slug": "entity-relationship-diagram",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1310",
            "title": "Create ER Diagram",
            "slug": "create-er-diagram",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1489",
            "title": "Relationships in ER Diagram",
            "slug": "relationships-in-er-diagram",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1488",
            "title": "Relational Models",
            "slug": "relational-models",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "1679",
            "title": "Quiz Data Models and ER Models",
            "slug": "quiz-2-data-models-and-er-models",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 10
          }
        ]
      },
      {
        "id": "186",
        "title": "Relational Model and Normalization",
        "slug": "relational-model-and-normalization",
        "rank": 2,
        "lessons": [
          {
            "id": "1406",
            "title": "Intension and Extension",
            "slug": "intension-and-extension",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1419",
            "title": "Keys in DBMS",
            "slug": "keys-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1319",
            "title": "Data Normalization",
            "slug": "data-normalization",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1387",
            "title": "Functional Dependency",
            "slug": "functional-dependency",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1281",
            "title": "Armstrong's Axioms",
            "slug": "armstrongs-axioms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1403",
            "title": "Inference Rules",
            "slug": "inference-rules",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1300",
            "title": "Closure in Functional Dependencies",
            "slug": "closure-in-functional-dependencies",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1345",
            "title": "Denormalisation",
            "slug": "denormalisation",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1683",
            "title": "Quiz Relational Model and Normalization",
            "slug": "quiz-3-relational-model-and-normalization",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          }
        ]
      },
      {
        "id": "200",
        "title": "SQL and Query Optimization",
        "slug": "sql-and-query-optimization",
        "rank": 3,
        "lessons": [
          {
            "id": "1328",
            "title": "Database Languages",
            "slug": "database-languages",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1511",
            "title": "SQL Operators",
            "slug": "sql-operators",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1273",
            "title": "Aggregates in SQL",
            "slug": "aggregates-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1505",
            "title": "SQL Clauses",
            "slug": "sql-clauses",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1509",
            "title": "SQL Joins",
            "slug": "sql-joins",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1510",
            "title": "SQL Joins (Advanced)",
            "slug": "sql-joins-advanced",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1587",
            "title": "Unions in SQL",
            "slug": "unions-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1594",
            "title": "Views in SQL",
            "slug": "views-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1272",
            "title": "Advanced Views in SQL",
            "slug": "advanced-views-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1400",
            "title": "Indexed Views (Materialised Views)",
            "slug": "indexed-views-materialised-views",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "1529",
            "title": "SQL Subqueries",
            "slug": "sql-subqueries",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "1584",
            "title": "Types of SQL Subqueries",
            "slug": "types-of-sql-subqueries",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "1479",
            "title": "Query Processing",
            "slug": "query-processing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "1478",
            "title": "Query Optimization",
            "slug": "query-optimization",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "1270",
            "title": "Advanced Query Optimization",
            "slug": "advanced-query-optimization",
            "type": "Theory",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "1687",
            "title": "Quiz SQL and Query Optimization",
            "slug": "quiz-4-sql-and-query-optimization",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 15
          }
        ]
      },
      {
        "id": "161",
        "title": "NoSQL Databases",
        "slug": "nosql-databases",
        "rank": 4,
        "lessons": [
          {
            "id": "1452",
            "title": "NoSQL Databases",
            "slug": "nosql-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1286",
            "title": "BASE Properties",
            "slug": "base-properties",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1453",
            "title": "NoSQL Languages",
            "slug": "nosql-languages",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1391",
            "title": "Graph Databases",
            "slug": "graph-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1399",
            "title": "In-Memory Databases",
            "slug": "in-memory-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1461",
            "title": "Partitioning in Databases",
            "slug": "partitioning-in-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1582",
            "title": "Types of Partitioning",
            "slug": "types-of-partitioning",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1499",
            "title": "Sharding in DBMS",
            "slug": "sharding-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1690",
            "title": "Quiz NoSQL Databases",
            "slug": "quiz-5-nosql-databases",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 8
          }
        ]
      },
      {
        "id": "100",
        "title": "Distributed Database Systems",
        "slug": "distributed-database-systems",
        "rank": 5,
        "lessons": [
          {
            "id": "1329",
            "title": "Database Lifecycle",
            "slug": "database-lifecycle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1351",
            "title": "Distributed Database Systems",
            "slug": "distributed-database-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1280",
            "title": "Architecture of Distributed Database Systems",
            "slug": "architecture-of-distributed-database-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1314",
            "title": "Data Distribution Methods",
            "slug": "data-distribution-methods",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1375",
            "title": "Fault Tolerance in Distributed Databases",
            "slug": "fault-tolerance-in-distributed-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1422",
            "title": "Load Balancing in Distributed Databases",
            "slug": "load-balancing-in-distributed-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1320",
            "title": "Data Replication Techniques",
            "slug": "data-replication-techniques",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1692",
            "title": "Quiz Distributed Database Systems",
            "slug": "quiz-6-distributed-database-systems",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 7
          }
        ]
      },
      {
        "id": "216",
        "title": "Transactions and Concurrency",
        "slug": "transactions-and-concurrency",
        "rank": 6,
        "lessons": [
          {
            "id": "1562",
            "title": "Thomas' Rules",
            "slug": "thomas-rules",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1268",
            "title": "ACID Properties",
            "slug": "acid-properties",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1294",
            "title": "CAP Theorem",
            "slug": "cap-theorem",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1336",
            "title": "Database Transactions",
            "slug": "database-transactions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1304",
            "title": "Concurrency Control in Databases",
            "slug": "concurrency-control-in-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1425",
            "title": "Locking Protocol (Shared Locks, Exclusive Locks)",
            "slug": "locking-protocol-shared-locks-exclusive-locks",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1566",
            "title": "Timestamp Ordering Protocols in DBMS",
            "slug": "timestamp-ordering-protocols-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1532",
            "title": "Starvation in DBMS",
            "slug": "starvation-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1342",
            "title": "Deadlock in DBMS",
            "slug": "deadlock-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1305",
            "title": "Concurrency Control in Distributed Databases",
            "slug": "concurrency-control-in-distributed-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "1498",
            "title": "Serialization in Databases",
            "slug": "serialization-in-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "1494",
            "title": "Scheduling in Databases",
            "slug": "scheduling-in-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          },
          {
            "id": "1497",
            "title": "Serialization Graphs in Databases",
            "slug": "serialization-graphs-in-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 12
          },
          {
            "id": "1415",
            "title": "Isolation Levels",
            "slug": "isolation-levels",
            "type": "Theory",
            "hasIDE": false,
            "rank": 13
          },
          {
            "id": "1427",
            "title": "Managing Transaction Consistency and Concurrency",
            "slug": "managing-transaction-consistency-and-concurrency",
            "type": "Theory",
            "hasIDE": false,
            "rank": 14
          },
          {
            "id": "1696",
            "title": "Quiz Transactions and Concurrency",
            "slug": "quiz-7-transactions-and-concurrency",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 15
          }
        ]
      },
      {
        "id": "220",
        "title": "Triggers and Procedural Features",
        "slug": "triggers-and-procedural-features",
        "rank": 7,
        "lessons": [
          {
            "id": "1571",
            "title": "Triggers in Databases",
            "slug": "triggers-in-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1538",
            "title": "Stored Procedures in Databases",
            "slug": "stored-procedures-in-databases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1699",
            "title": "Quiz Triggers and Procedural Features",
            "slug": "quiz-8-triggers-and-procedural-features",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 2
          }
        ]
      },
      {
        "id": "182",
        "title": "Recovery and Backup",
        "slug": "recovery-and-backup",
        "rank": 8,
        "lessons": [
          {
            "id": "1333",
            "title": "Database Recovery Management",
            "slug": "database-recovery-management",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1324",
            "title": "Database Backups",
            "slug": "database-backups",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1702",
            "title": "Quiz Recovery and Backup",
            "slug": "quiz-9-recovery-and-backup",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 2
          }
        ]
      },
      {
        "id": "123",
        "title": "Indexing and Performance Tuning",
        "slug": "indexing-and-performance-tuning",
        "rank": 9,
        "lessons": [
          {
            "id": "1327",
            "title": "Database Indexing",
            "slug": "database-indexing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1574",
            "title": "Types of Database Indexing",
            "slug": "types-of-database-indexing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1402",
            "title": "Indexing Techniques",
            "slug": "indexing-techniques",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1284",
            "title": "B- and B+ Trees",
            "slug": "b-minus-and-b-plus-trees",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1674",
            "title": "Quiz Indexing and Performance Tuning",
            "slug": "quiz-10-indexing-and-performance-tuning",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          }
        ]
      },
      {
        "id": "43",
        "title": "Database Monitoring and Caching",
        "slug": "database-monitoring-and-caching",
        "rank": 10,
        "lessons": [
          {
            "id": "1332",
            "title": "Database Monitoring",
            "slug": "database-monitoring",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1463",
            "title": "Performance Tuning",
            "slug": "performance-tuning",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1325",
            "title": "Database Caching",
            "slug": "database-caching",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1326",
            "title": "Database Caching Strategies",
            "slug": "database-caching-strategies",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1675",
            "title": "Quiz Database Monitoring and Caching",
            "slug": "quiz-11-database-monitoring-and-caching",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          }
        ]
      },
      {
        "id": "192",
        "title": "Security and Access Control",
        "slug": "security-and-access-control",
        "rank": 11,
        "lessons": [
          {
            "id": "1335",
            "title": "Database Security",
            "slug": "database-security",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1315",
            "title": "Data Encryption in DBMS",
            "slug": "data-encryption-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1357",
            "title": "Encryption Techniques in DBMS",
            "slug": "encryption-techniques-in-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1317",
            "title": "Data Masking Techniques",
            "slug": "data-masking-techniques",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1484",
            "title": "RBAC (Role-Based Access Control)",
            "slug": "role-based-access-control",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1485",
            "title": "RBAC Models",
            "slug": "rbac-models",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1676",
            "title": "Quiz Security and Access Control",
            "slug": "quiz-12-security-and-access-control",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 6
          }
        ]
      },
      {
        "id": "190",
        "title": "Scalability and Big Data",
        "slug": "scalability-and-big-data",
        "rank": 12,
        "lessons": [
          {
            "id": "1334",
            "title": "Database Scaling",
            "slug": "database-scaling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1289",
            "title": "Big Data and DBMS",
            "slug": "big-data-and-dbms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1339",
            "title": "DBaas (Database as a Service)",
            "slug": "database-as-a-service",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1677",
            "title": "Quiz Scalability and Big Data",
            "slug": "quiz-13-scalability-and-big-data",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          }
        ]
      },
      {
        "id": "39",
        "title": "Data Warehousing and Migration",
        "slug": "data-warehousing-and-migration",
        "rank": 13,
        "lessons": [
          {
            "id": "1331",
            "title": "Database Migration",
            "slug": "database-migration",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1322",
            "title": "Data Warehousing",
            "slug": "data-warehousing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1365",
            "title": "Event-Driven Architecture",
            "slug": "event-driven-architecture",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1678",
            "title": "Quiz Data Warehousing and Migration",
            "slug": "quiz-14-data-warehousing-and-migration",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "low-level-design",
    "legacySlug": "low-level-design",
    "title": "Low-Level System Design & Architecture",
    "track": "System Design",
    "description": "Enterprise object-oriented design patterns (Creational, Structural, Behavioral), UML state and sequence diagrams, thread safety, and production case studies: Parking, Splitwise, and Real-Time Systems.",
    "level": "Senior Architecture",
    "icon": "Layers",
    "badge": "Architecture Flagship",
    "totalModules": 13,
    "totalLessons": 71,
    "modules": [
      {
        "id": "131",
        "title": "Introduction to LLD",
        "slug": "introduction-to-lld",
        "rank": 0,
        "lessons": [
          {
            "id": "1229",
            "title": "Introduction to Low Level Design",
            "slug": "introduction-to-low-level-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1255",
            "title": "Software Design Principles",
            "slug": "software-design-principles",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          }
        ]
      },
      {
        "id": "197",
        "title": "Solid Principles",
        "slug": "solid-principles",
        "rank": 1,
        "lessons": [
          {
            "id": "1252",
            "title": "Single Responsibility Principle (SRP)",
            "slug": "single-responsibility-principle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1247",
            "title": "Open Closed Principle (OCP)",
            "slug": "open-closed-principle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1238",
            "title": "Liskov Substitution Principle (LSP)",
            "slug": "liskov-substitution-principle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1226",
            "title": "Interface Segregation Principle (ISP)",
            "slug": "interface-segregation-principle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1166",
            "title": "Dependency Inversion Principle (DIP)",
            "slug": "dependency-inversion-principle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          }
        ]
      },
      {
        "id": "222",
        "title": "UML",
        "slug": "uml",
        "rank": 2,
        "lessons": [
          {
            "id": "1265",
            "title": "Unified Modeling Language (UML)",
            "slug": "unified-modeling-language",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1159",
            "title": "Class UML diagrams",
            "slug": "class-uml-diagrams",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          }
        ]
      },
      {
        "id": "35",
        "title": "Creational Design Patterns",
        "slug": "creational-design-patterns",
        "rank": 3,
        "lessons": [
          {
            "id": "1228",
            "title": "Introduction to Design Patterns",
            "slug": "introduction-to-design-patterns",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1253",
            "title": "Singleton Design Pattern",
            "slug": "singleton-design-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1207",
            "title": "Factory Method",
            "slug": "factory-method",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1157",
            "title": "Builder Pattern",
            "slug": "builder-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1147",
            "title": "Abstract Factory",
            "slug": "abstract-factory",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1249",
            "title": "Prototype Pattern",
            "slug": "prototype-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          }
        ]
      },
      {
        "id": "209",
        "title": "Structural Design Patterns",
        "slug": "structural-design-patterns",
        "rank": 4,
        "lessons": [
          {
            "id": "1150",
            "title": "Adapter Pattern",
            "slug": "adapter-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1165",
            "title": "Decorator Pattern",
            "slug": "decorator-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1206",
            "title": "Facade Pattern",
            "slug": "facade-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1162",
            "title": "Composite Pattern",
            "slug": "composite-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1250",
            "title": "Proxy Pattern",
            "slug": "proxy-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1156",
            "title": "Bridge Pattern",
            "slug": "bridge-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1209",
            "title": "Flyweight Pattern",
            "slug": "flyweight-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          }
        ]
      },
      {
        "id": "17",
        "title": "Behavioural Design Patterns",
        "slug": "behavioural-design-patterns",
        "rank": 5,
        "lessons": [
          {
            "id": "1230",
            "title": "Iterator Pattern",
            "slug": "iterator-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1246",
            "title": "Observer Pattern",
            "slug": "observer-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1259",
            "title": "Strategy Pattern",
            "slug": "strategy-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1161",
            "title": "Command Pattern",
            "slug": "command-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1260",
            "title": "Template Method",
            "slug": "template-method",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1257",
            "title": "State Pattern",
            "slug": "state-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1158",
            "title": "Chain of Responsibility",
            "slug": "chain-of-responsibility",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1266",
            "title": "Visitor Pattern",
            "slug": "visitor-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1240",
            "title": "Mediator Pattern",
            "slug": "mediator-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1241",
            "title": "Memento Pattern",
            "slug": "memento-pattern",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          }
        ]
      },
      {
        "id": "149",
        "title": "Multithreading and Concurrency",
        "slug": "multithreading-and-concurrency",
        "rank": 6,
        "lessons": [
          {
            "id": "1243",
            "title": "Multithreading and Concurrency",
            "slug": "multithreading-and-concurrency",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1164",
            "title": "Creating and Managing Threads",
            "slug": "creating-and-managing-threads",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1262",
            "title": "Thread Pools and Executors",
            "slug": "thread-pools-and-executors",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1263",
            "title": "Thread Safety and Synchronization",
            "slug": "thread-safety-and-synchronization",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1239",
            "title": "Locks and Synchronization Mechanism",
            "slug": "locks-and-synchronization-mechanism",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3027",
            "title": "Deadlock and Prevention Techniques",
            "slug": "deadlock-and-prevention-techniques",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1473",
            "title": "Producer Consumer Problem",
            "slug": "producer-consumer-problem",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          }
        ]
      },
      {
        "id": "97",
        "title": "Dependency Injection",
        "slug": "dependency-injection",
        "rank": 7,
        "lessons": [
          {
            "id": "3021",
            "title": "Dependency Injection",
            "slug": "dependency-injection",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          }
        ]
      },
      {
        "id": "106",
        "title": "Exceptions and Error Handling",
        "slug": "exceptions-and-error-handling",
        "rank": 8,
        "lessons": [
          {
            "id": "3022",
            "title": "Exception Handling (LLD)",
            "slug": "exception-handling-lld",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3026",
            "title": "Building Resilient Systems",
            "slug": "building-resilient-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          }
        ]
      },
      {
        "id": "18",
        "title": "Best practices in LLD",
        "slug": "best-practices-in-lld",
        "rank": 9,
        "lessons": [
          {
            "id": "3025",
            "title": "All About API's",
            "slug": "all-about-api-s",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3024",
            "title": "Database Design and Integration",
            "slug": "database-design-and-integration",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3023",
            "title": "How to approach a LLD Interview",
            "slug": "how-to-approach-a-lld-interview",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          }
        ]
      },
      {
        "id": "125",
        "title": "Interview Problems (Part-1)",
        "slug": "interview-problems-part-1",
        "rank": 10,
        "lessons": [
          {
            "id": "3028",
            "title": "Parking Lot (Design)",
            "slug": "parking-lot-lld-part-1",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3029",
            "title": "Parking Lot (Code)",
            "slug": "parking-lot-lld-part-2",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3030",
            "title": "Logging Framework (Design)",
            "slug": "designing-logging-framework-part-1",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1168",
            "title": "Logging Framework (Code)",
            "slug": "designing-logging-framework-part-2",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3031",
            "title": "Traffic Signal System (Design)",
            "slug": "traffic-signal-system-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3032",
            "title": "Traffic Signal System (Code)",
            "slug": "traffic-signal-system-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1169",
            "title": "Vending Machine Design",
            "slug": "vending-machine-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1170",
            "title": "Vending Machine Code",
            "slug": "vending-machine-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1171",
            "title": "Task Management System Design",
            "slug": "task-management-system-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1172",
            "title": "Task Management System Code",
            "slug": "task-management-system-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          }
        ]
      },
      {
        "id": "126",
        "title": "Interview Problems (Part-2)",
        "slug": "interview-problems-part-2",
        "rank": 11,
        "lessons": [
          {
            "id": "1173",
            "title": "PubSub System Design",
            "slug": "pubsub-system-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1174",
            "title": "PubSub System Code",
            "slug": "pubsub-system-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1175",
            "title": "ATM Machine Design",
            "slug": "atm-machine-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1176",
            "title": "ATM Machine Code",
            "slug": "atm-machine-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1179",
            "title": "Hotel Management System Design",
            "slug": "hotel-management-system-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1180",
            "title": "Hotel Management System Code",
            "slug": "hotel-management-system-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          }
        ]
      },
      {
        "id": "127",
        "title": "Interview Problems (Part-3)",
        "slug": "interview-problems-part-3",
        "rank": 12,
        "lessons": [
          {
            "id": "1177",
            "title": "Elevator System Design",
            "slug": "elevator-system-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1178",
            "title": "Elevator System Code",
            "slug": "elevator-system-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1181",
            "title": "Digital Wallet Design",
            "slug": "digital-wallet-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1183",
            "title": "Types of Locking Mechanism",
            "slug": "types-of-locking-mechanism",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1182",
            "title": "Digital Wallet Code",
            "slug": "digital-wallet-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1184",
            "title": "Ride Booking App Design",
            "slug": "ride-booking-app-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1185",
            "title": "Ride Booking App Code",
            "slug": "ride-booking-app-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1186",
            "title": "Music Streaming Platform Design",
            "slug": "music-streaming-platform-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "1188",
            "title": "Streaming Protocols",
            "slug": "streaming-protocols",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "1187",
            "title": "Music Streaming Platform Code",
            "slug": "music-streaming-platform-code",
            "type": "Theory",
            "hasIDE": false,
            "rank": 11
          }
        ]
      }
    ]
  },
  {
    "slug": "oops",
    "legacySlug": "oops",
    "title": "Object-Oriented Programming & Enterprise Modeling",
    "track": "System Design",
    "description": "Deep dive into encapsulation, abstraction, inheritance hierarchies, runtime polymorphism, decoupling, and high-cohesion software lifecycle architecture.",
    "level": "Object Modeling",
    "icon": "Code2",
    "badge": "Software Craftsmanship",
    "totalModules": 6,
    "totalLessons": 51,
    "modules": [
      {
        "id": "132",
        "title": "Introduction to OOPS",
        "slug": "introduction-to-oops",
        "rank": 0,
        "lessons": [
          {
            "id": "1212",
            "title": "Java Basics",
            "slug": "java-basics",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1267",
            "title": "What is OOPS",
            "slug": "what-is-oops",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1160",
            "title": "Classes and Objects",
            "slug": "classes-and-objects",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1707",
            "title": "Quiz Classes and Objects",
            "slug": "quiz-classes-and-objects",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "831",
            "title": "Practice (Classes and Objects)",
            "slug": "practice-classes-and-objects",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1152",
            "title": "Attributes and Methods",
            "slug": "attributes-and-methods",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1706",
            "title": "Quiz Attributes and Methods",
            "slug": "quiz-attributes-and-methods",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "830",
            "title": "Practice (Attributes and Methods)",
            "slug": "practice-attributes-and-methods",
            "type": "Practice",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1163",
            "title": "Constructors",
            "slug": "constructors",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1708",
            "title": "Quiz Constructors",
            "slug": "quiz-constructors",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "833",
            "title": "Practice (Constructors)",
            "slug": "practice-constructors",
            "type": "Practice",
            "hasIDE": false,
            "rank": 10
          }
        ]
      },
      {
        "id": "34",
        "title": "Core Principles of OOPS",
        "slug": "core-principles-of-oops",
        "rank": 1,
        "lessons": [
          {
            "id": "1196",
            "title": "Encapsulation",
            "slug": "encapsulation",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1713",
            "title": "Quiz Encapsulation",
            "slug": "quiz-encapsulation",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "835",
            "title": "Practice (Encapsulation)",
            "slug": "practice-encapsulation",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1149",
            "title": "Access Modifiers",
            "slug": "access-modifiers",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1704",
            "title": "Quiz Access Modifiers",
            "slug": "quiz-access-modifiers",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "829",
            "title": "Practice (Access Modifiers)",
            "slug": "practice-access-modifiers",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1224",
            "title": "Inheritance",
            "slug": "inheritance",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1717",
            "title": "Quiz Inheritance",
            "slug": "quiz-inheritance",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "839",
            "title": "Practice (Inheritance)",
            "slug": "practice-inheritance",
            "type": "Practice",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1248",
            "title": "Polymorphism",
            "slug": "polymorphism",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "1726",
            "title": "Quiz Polymorphism",
            "slug": "quiz-polymorphism",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "845",
            "title": "Practice (Polymorphism)",
            "slug": "practice-polymorphism",
            "type": "Practice",
            "hasIDE": false,
            "rank": 11
          }
        ]
      },
      {
        "id": "2",
        "title": "Advance OOPS features",
        "slug": "advance-oops-features",
        "rank": 2,
        "lessons": [
          {
            "id": "1148",
            "title": "Abstraction",
            "slug": "abstraction",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1703",
            "title": "Quiz Abstraction",
            "slug": "quiz-abstraction",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "828",
            "title": "Practice (Abstraction)",
            "slug": "practice-abstraction",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1227",
            "title": "Interfaces",
            "slug": "interfaces",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1719",
            "title": "Quiz Interfaces",
            "slug": "quiz-interfaces",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "841",
            "title": "Practice (Interfaces)",
            "slug": "practice-interfaces",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1258",
            "title": "Static Keyword",
            "slug": "static-keyword",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1730",
            "title": "Quiz Static Keyword",
            "slug": "quiz-static-keyword",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "847",
            "title": "Practice (Static Keyword)",
            "slug": "practice-static-keyword",
            "type": "Practice",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1225",
            "title": "Inner classes ",
            "slug": "inner-classes-",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "1718",
            "title": "Quiz Inner classes",
            "slug": "quiz-inner-classes",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 10
          },
          {
            "id": "840",
            "title": "Practice (Inner classes)",
            "slug": "practice-inner-classes",
            "type": "Practice",
            "hasIDE": false,
            "rank": 11
          }
        ]
      },
      {
        "id": "188",
        "title": "Relationships and Object Behaviour",
        "slug": "relationships-and-object-behaviour",
        "rank": 3,
        "lessons": [
          {
            "id": "1151",
            "title": "Association, Aggregation, and Composition",
            "slug": "association-aggregation-and-composition",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1705",
            "title": "Quiz Association, Aggregation, and Composition",
            "slug": "quiz-association-aggregation-and-composition",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "832",
            "title": "Practice (Composition)",
            "slug": "practice-composition",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1244",
            "title": "Object Cloning",
            "slug": "object-cloning",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1724",
            "title": "Quiz Object Cloning",
            "slug": "quiz-object-cloning",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "843",
            "title": "Practice (Object Cloning)",
            "slug": "practice-object-cloning",
            "type": "Practice",
            "hasIDE": false,
            "rank": 6
          }
        ]
      },
      {
        "id": "3",
        "title": "Advance Programming in OOPS",
        "slug": "advance-programming-in-oops",
        "rank": 4,
        "lessons": [
          {
            "id": "1197",
            "title": "Exception Handling",
            "slug": "exception-handling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1714",
            "title": "Quiz Exception Handling",
            "slug": "quiz-exception-handling",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1220",
            "title": "Generics",
            "slug": "generics",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1716",
            "title": "Quiz Generics",
            "slug": "quiz-generics",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1208",
            "title": "File Handling",
            "slug": "file-handling",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1715",
            "title": "Quiz File Handling",
            "slug": "quiz-file-handling",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 5
          }
        ]
      },
      {
        "id": "164",
        "title": "OOP Design and Lifecycle Management",
        "slug": "oop-design-and-lifecycle-management",
        "rank": 5,
        "lessons": [
          {
            "id": "1167",
            "title": "Design Principles",
            "slug": "design-principles",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1712",
            "title": "Quiz Design Principles",
            "slug": "quiz-design-principles",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1245",
            "title": "Object Lifecycle",
            "slug": "object-lifecycle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1725",
            "title": "Quiz Object Lifecycle",
            "slug": "quiz-object-lifecycle",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 3
          }
        ]
      }
    ]
  },
  {
    "slug": "sql-data-engineering",
    "legacySlug": "sql-data-engineering-foundations",
    "title": "Production SQL & Data Engineering Systems",
    "track": "Data Engineering",
    "description": "Industrial SQL querying: multi-table joins, analytical window functions, recursive CTEs, schema migration, partitioning, and distributed execution plan tuning.",
    "level": "Production Analytics",
    "icon": "Terminal",
    "badge": "Data Engineering",
    "totalModules": 21,
    "totalLessons": 258,
    "modules": [
      {
        "id": "441",
        "title": "Getting Started",
        "slug": "getting-started",
        "rank": 0,
        "lessons": [
          {
            "id": "2034",
            "title": "Introduction to SQL",
            "slug": "introduction-to-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2624",
            "title": "Quiz Introduction to SQL",
            "slug": "quiz-introduction-to-sql",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2877",
            "title": "Why SQL Exists",
            "slug": "why-sql-exists",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2879",
            "title": "How Databases Work",
            "slug": "how-databases-work",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2880",
            "title": "Database Systems",
            "slug": "database-systems",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2699",
            "title": "Installation and Tools",
            "slug": "installation-and-tools",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          }
        ]
      },
      {
        "id": "442",
        "title": "Core Foundations",
        "slug": "core-foundations",
        "rank": 1,
        "lessons": [
          {
            "id": "2011",
            "title": "Database & Table Basics",
            "slug": "database-table-basics",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2618",
            "title": "Quiz Database table basics",
            "slug": "quiz-database-table-basics",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2896",
            "title": "SQL Basics and Commands",
            "slug": "sql-basics-and-commands",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2882",
            "title": "Working with Databases in SQL",
            "slug": "working-with-databases-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2883",
            "title": "SQL Data Types",
            "slug": "sql-data-types",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2897",
            "title": "Creating and Managing Tables in SQL",
            "slug": "creating-and-managing-tables-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "2885",
            "title": "Primary Key",
            "slug": "primary-key",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "2886",
            "title": "Foreign Key",
            "slug": "foreign-key",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "2888",
            "title": "Constraints in SQL",
            "slug": "constraints-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3018",
            "title": "NULL vs 0 vs Empty String",
            "slug": "null-vs-0-vs-empty-string",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "3019",
            "title": "DDL vs DML",
            "slug": "ddl-vs-dml",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "3020",
            "title": "Query Lifecycle",
            "slug": "query-lifecycle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "2889",
            "title": "Indexing in SQL",
            "slug": "indexing-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 10
          }
        ]
      },
      {
        "id": "443",
        "title": "Querying Essentials",
        "slug": "querying-essentials",
        "rank": 2,
        "lessons": [
          {
            "id": "2059",
            "title": "Query Fundamentals",
            "slug": "query-fundamentals",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2629",
            "title": "Quiz Query Fundamentals",
            "slug": "quiz-query-fundamentals",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2874",
            "title": "SELECT AND FROM",
            "slug": "select-and-from",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2890",
            "title": "WHERE",
            "slug": "where",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2891",
            "title": "Comparison Operators",
            "slug": "comparison-operators",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2892",
            "title": "Logical Operators",
            "slug": "logical-operators",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3048",
            "title": "Arithmetic Operators",
            "slug": "arithmetic-operators",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "2893",
            "title": "ORDER BY and LIMIT",
            "slug": "order-by-and-limit",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "2895",
            "title": "DISTINCT and AS (Aliases)",
            "slug": "distinct-and-as-aliases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1103",
            "title": "Big Countries",
            "slug": "big-countries",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1119",
            "title": "Profitable Customers in 2021",
            "slug": "profitable-customers-in-2021",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1115",
            "title": "Odd Non-Boring Movies",
            "slug": "odd-non-boring-movies",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2020",
            "title": "Filtering Essentials",
            "slug": "filtering-essentials",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2623",
            "title": "Quiz Filtering Essentials",
            "slug": "quiz-filtering-essentials",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2900",
            "title": "IS NULL vs. IS NOT NULL, IN, and NOT IN",
            "slug": "is-null-vs-is-not-null-in-and-not-in",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2901",
            "title": "BETWEEN and NOT BETWEEN",
            "slug": "between-and-not-between",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2902",
            "title": "LIKE and NOT LIKE",
            "slug": "like-and-not-like",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1076",
            "title": "Filter Records Excluding a Specific Pattern",
            "slug": "filter-records-excluding-a-specific-pattern",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1081",
            "title": "Find Records Excluding a Given Set of Values",
            "slug": "find-records-excluding-a-given-set-of-values",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1082",
            "title": "Find Salaries Outside the Expected Range",
            "slug": "find-salaries-outside-the-expected-range",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1114",
            "title": "Non-Referred Customers",
            "slug": "non-referred-customers",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          }
        ]
      },
      {
        "id": "444",
        "title": "Aggregation and Analysis",
        "slug": "aggregation-and-analysis",
        "rank": 3,
        "lessons": [
          {
            "id": "2010",
            "title": "Data Summarization",
            "slug": "data-summarization",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2617",
            "title": "Quiz Data Summarization",
            "slug": "quiz-data-summarization",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2903",
            "title": "Fundamentals of GROUP BY",
            "slug": "fundamentals-of-group-by",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2904",
            "title": "Basic Aggregate Functions (MIN, MAX, SUM, AVG)",
            "slug": "basic-aggregate-functions-min-max-sum-avg",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2905",
            "title": "COUNT Functions",
            "slug": "count-functions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2906",
            "title": "HAVING Clause (Basics, HAVING with COUNT)",
            "slug": "having-clause-basics-having-with-count",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1088",
            "title": "First Login Analysis",
            "slug": "first-login-analysis",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1068",
            "title": "Employee Work Time Summary",
            "slug": "employee-work-time-summary",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1140",
            "title": "Unique Subjects per Teacher",
            "slug": "unique-subjects-per-teacher",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1142",
            "title": "User Follower Count",
            "slug": "user-follower-count",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1063",
            "title": "CRM Automotive Sales Analysis",
            "slug": "crm-automotive-sales-analysis",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1095",
            "title": "Highest Order Placing Customer",
            "slug": "highest-order-placing-customer",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1091",
            "title": "Frequent Actor-Director Duos",
            "slug": "frequent-actor-director-duos",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1102",
            "title": "Large Classes",
            "slug": "large-classes",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1065",
            "title": "Email Duplicates",
            "slug": "email-duplicates",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          }
        ]
      },
      {
        "id": "445",
        "title": "Functions (Math and Conditional)",
        "slug": "functions-math-and-conditional",
        "rank": 4,
        "lessons": [
          {
            "id": "2049",
            "title": "Numeric and NULL Functions",
            "slug": "numeric-and-null-functions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2627",
            "title": "Quiz Numeric and NULL Functions",
            "slug": "quiz-numeric-and-null-functions",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2907",
            "title": "ROUND() and ABS()",
            "slug": "round-and-abs",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2908",
            "title": "GREATEST(), LEAST(), and IF NULL()",
            "slug": "greatest-least-and-if-null",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2909",
            "title": "NULL Handling in SQL: IS NULL, IS NOT NULL, IF NULL(), and COALESCE()",
            "slug": "null-handling-in-sql-is-null-is-not-null-if-null-and-coalesce",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1059",
            "title": "Call Count Between Pairs",
            "slug": "call-count-between-pairs",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2873",
            "title": "Case Conditional Logic",
            "slug": "case-conditional-logic",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2875",
            "title": "Quiz Case Conditional Logic",
            "slug": "quiz-case-conditional-logic",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2949",
            "title": "CASE Basics",
            "slug": "case-basics",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2950",
            "title": "CASE Practical Examples",
            "slug": "case-practical-examples",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2951",
            "title": "Advanced CASE Usage",
            "slug": "advanced-case-usage",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1143",
            "title": "Valid Triangle Check",
            "slug": "valid-triangle-check",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1100",
            "title": "Instant Food Delivery",
            "slug": "instant-food-delivery",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1126",
            "title": "Special Bonus Calculation",
            "slug": "special-bonus-calculation",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1113",
            "title": "Node Classification",
            "slug": "node-classification",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1055",
            "title": "Apples vs Oranges",
            "slug": "apples-vs-oranges",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1120",
            "title": "Query Quality Analysis",
            "slug": "query-quality-analysis",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "2876",
            "title": "String Functions",
            "slug": "string-functions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1731",
            "title": "Quiz String Functions",
            "slug": "quiz-string-functions",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2910",
            "title": "CONCAT() vs. CONCAT_WS()",
            "slug": "concat-vs-concat_ws",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2911",
            "title": "LOWER() / UPPER()",
            "slug": "lower-upper",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2912",
            "title": "TRIM() / LTRIM() / RTRIM()",
            "slug": "trim-ltrim-rtrim",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2913",
            "title": "LENGTH() vs CHAR_LENGTH()",
            "slug": "length-vs-char_length",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "2914",
            "title": "LEFT() / RIGHT() / SUBSTRING()",
            "slug": "left-right-substring",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "2915",
            "title": "LOCATE() / INSTR()",
            "slug": "locate-instr",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "2916",
            "title": "REPLACE()",
            "slug": "replace",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "2917",
            "title": "Pattern Matching with LIKE",
            "slug": "pattern-matching-with-like",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1075",
            "title": "Exceeding Tweet Length",
            "slug": "exceeding-tweet-length",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          }
        ]
      },
      {
        "id": "446",
        "title": "Data Modification and Schema Evolution",
        "slug": "data-modification-and-schema-evolution",
        "rank": 5,
        "lessons": [
          {
            "id": "2696",
            "title": "Editing Data and Tables",
            "slug": "editing-data-and-tables",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2620",
            "title": "Quiz Editing Data and Tables",
            "slug": "quiz-editing-data-and-tables",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2918",
            "title": "INSERT",
            "slug": "insert",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2919",
            "title": "UPSERT",
            "slug": "upsert",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2920",
            "title": "UPDATE",
            "slug": "update",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2924",
            "title": "DELETE",
            "slug": "delete",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "2921",
            "title": "ALTER",
            "slug": "alter",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "2922",
            "title": "TRUNCATE",
            "slug": "truncate",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "2923",
            "title": "DELETE vs. TRUNCATE vs. DROP",
            "slug": "delete-vs-truncate-vs-drop",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1132",
            "title": "System Settings",
            "slug": "system-settings",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1067",
            "title": "Employee Salary",
            "slug": "employee-salary",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          }
        ]
      },
      {
        "id": "447",
        "title": "Set Operations",
        "slug": "set-operations",
        "rank": 6,
        "lessons": [
          {
            "id": "2044",
            "title": "Merging Query Results",
            "slug": "merging-query-results",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2626",
            "title": "Quiz Merging Query Results",
            "slug": "quiz-merging-query-results",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2925",
            "title": "UNION",
            "slug": "union",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2926",
            "title": "UNION ALL",
            "slug": "union-all",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2927",
            "title": "Difference Between UNION and UNION ALL",
            "slug": "difference-between-union-and-union-all",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2928",
            "title": "Intersection",
            "slug": "intersection",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1060",
            "title": "Combine Active and Archived Users",
            "slug": "combine-active-and-archived-users",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1107",
            "title": "Merge Recent Orders from Multiple Sources",
            "slug": "merge-recent-orders-from-multiple-sources",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1061",
            "title": "Combine Sales Records Without Deduplication",
            "slug": "combine-sales-records-without-deduplication",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1121",
            "title": "Reshape Products Data",
            "slug": "reshape-products-data",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          }
        ]
      },
      {
        "id": "453",
        "title": "SQL Joins",
        "slug": "sql-joins",
        "rank": 7,
        "lessons": [
          {
            "id": "2700",
            "title": "Joins Deep Dive",
            "slug": "joins-deep-dive",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2625",
            "title": "Quiz Joins Deep Dive",
            "slug": "quiz-joins-deep-dive",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2940",
            "title": "RIGHT JOIN",
            "slug": "right-join",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2941",
            "title": "ON vs. WHERE",
            "slug": "on-vs-where",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2942",
            "title": "LEFT JOIN",
            "slug": "left-join",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2943",
            "title": "INNER JOIN",
            "slug": "inner-join",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "2944",
            "title": "FULL OUTER JOIN",
            "slug": "full-outer-join",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "2945",
            "title": "CROSS JOIN",
            "slug": "cross-join",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "2946",
            "title": "IMPLICIT JOIN",
            "slug": "implicit-join",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "2947",
            "title": "SELF JOIN",
            "slug": "self-join",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "2948",
            "title": "NATURAL JOIN",
            "slug": "natural-join",
            "type": "Theory",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1069",
            "title": "Employees and Their Departments",
            "slug": "employees-and-their-departments",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1064",
            "title": "Customer Orders Overview",
            "slug": "customer-orders-overview",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1072",
            "title": "Employees With Confirmed Salary Records",
            "slug": "employees-with-confirmed-salary-records",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1092",
            "title": "Generate All Possible User-Category Pairs",
            "slug": "generate-all-possible-user-category-pairs",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1073",
            "title": "Employees With or Without Salary Records",
            "slug": "employees-with-or-without-salary-records",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1106",
            "title": "Match Employees With Their Salaries",
            "slug": "match-employees-with-their-salaries",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1070",
            "title": "Employees Earning More Than Their Manager",
            "slug": "employees-earning-more-than-their-manager",
            "type": "Practice",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1127",
            "title": "Students Enrolled in Courses",
            "slug": "students-enrolled-in-courses",
            "type": "Practice",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1124",
            "title": "Sales Analysis",
            "slug": "sales-analysis",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1108",
            "title": "Minimum Distance Between Points",
            "slug": "minimum-distance-between-points",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1130",
            "title": "Suspended Accounts",
            "slug": "suspended-accounts",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1083",
            "title": "Find Team Size for Each Employee",
            "slug": "find-team-size-for-each-employee",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1057",
            "title": "Average Experience by Project",
            "slug": "average-experience-by-project",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1145",
            "title": "Warehouse Stock Manager",
            "slug": "warehouse-stock-manager",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1133",
            "title": "Table Join Operation",
            "slug": "table-join-operation",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1097",
            "title": "Inactive Customers",
            "slug": "inactive-customers",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1128",
            "title": "Students Enrolled in Non-Existent Departments",
            "slug": "students-enrolled-in-non-existent-departments",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1105",
            "title": "Low Bonus Employees",
            "slug": "low-bonus-employees",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1056",
            "title": "Available Seat Streaks",
            "slug": "available-seat-streaks",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1144",
            "title": "Visitors Without Transactions",
            "slug": "visitors-without-transactions",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1053",
            "title": "A & B Buyers Without C",
            "slug": "a-b-buyers-without-c",
            "type": "Practice",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1118",
            "title": "Product Selling Price Report",
            "slug": "product-selling-price-report",
            "type": "Practice",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1141",
            "title": "Updated Bank Balances",
            "slug": "updated-bank-balances",
            "type": "Practice",
            "hasIDE": false,
            "rank": 8
          },
          {
            "id": "1110",
            "title": "Most Frequent Travellers",
            "slug": "most-frequent-travellers",
            "type": "Practice",
            "hasIDE": false,
            "rank": 9
          },
          {
            "id": "1129",
            "title": "Suggested Pages",
            "slug": "suggested-pages",
            "type": "Practice",
            "hasIDE": false,
            "rank": 10
          }
        ]
      },
      {
        "id": "448",
        "title": "Transactions and Access Control",
        "slug": "transactions-and-access-control",
        "rank": 8,
        "lessons": [
          {
            "id": "2702",
            "title": "Permissions and Transactions Part-1",
            "slug": "permissions-and-transactions-part-1",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2963",
            "title": "Quiz Permissions and Transactions Part-1",
            "slug": "quiz-permissions-and-transactions-part-1",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2952",
            "title": "Privileges and Roles",
            "slug": "privileges-and-roles",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2953",
            "title": "GRANTS",
            "slug": "grants",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2957",
            "title": "GRANT ALL and WITH GRANT OPTION",
            "slug": "grant-all-and-with-grant-option",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2955",
            "title": "ALTER USER",
            "slug": "alter-user",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "2956",
            "title": "REVOKE",
            "slug": "revoke",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "2703",
            "title": "Permissions and Transactions Part-2",
            "slug": "permissions-and-transactions-part-2",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2964",
            "title": "Quiz Permissions and Transactions Part-2",
            "slug": "quiz-permissions-and-transactions-part-2",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3051",
            "title": "Connection, Connection Pool and Commit",
            "slug": "connection-connection-pool-and-commit",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3052",
            "title": "Rollback",
            "slug": "rollback",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2960",
            "title": "Savepoint",
            "slug": "savepoint",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2961",
            "title": "Internal Working of Transactions, Timeout and Deadlock",
            "slug": "internal-working-of-transactions-timeout-and-deadlock",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          }
        ]
      },
      {
        "id": "449",
        "title": "Subqueries",
        "slug": "subqueries",
        "rank": 9,
        "lessons": [
          {
            "id": "2697",
            "title": "Everything about Subqueries",
            "slug": "everything-about-subqueries",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2621",
            "title": "Quiz Everything about Subqueries",
            "slug": "quiz-everything-about-subqueries",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2937",
            "title": "Introduction to Subqueries (IN)",
            "slug": "introduction-to-subqueries-in",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2938",
            "title": "EXISTS and NOT EXISTS",
            "slug": "exists-and-not-exists",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2939",
            "title": "Correlated Subqueries",
            "slug": "correlated-subqueries",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1062",
            "title": "Contest Participation Rate",
            "slug": "contest-participation-rate",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1093",
            "title": "High-Report Managers",
            "slug": "high-report-managers",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1054",
            "title": "All-Product Buyers",
            "slug": "all-product-buyers",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1094",
            "title": "Highest Non-Repeating Number",
            "slug": "highest-non-repeating-number",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1084",
            "title": "Find the First Device Logged In by Each Player",
            "slug": "find-the-first-device-logged-in-by-each-player",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1125",
            "title": "Salespersons Without RED Orders",
            "slug": "salespersons-without-red-orders",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1074",
            "title": "Employees with the Highest Salary in Each Department",
            "slug": "employees-with-the-highest-salary-in-each-department",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1086",
            "title": "Find the Most Recent Order for Each Product",
            "slug": "find-the-most-recent-order-for-each-product",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1087",
            "title": "Find Transactions with Maximum Amount Per Day",
            "slug": "find-transactions-with-maximum-amount-per-day",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1099",
            "title": "Incomplete Employee Records",
            "slug": "incomplete-employee-records",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1080",
            "title": "Find Quiet Students in All Exams",
            "slug": "find-quiet-students-in-all-exams",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1137",
            "title": "Top Grade per Student",
            "slug": "top-grade-per-student",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1131",
            "title": "Swap Consecutive Seats",
            "slug": "swap-consecutive-seats",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1123",
            "title": "Safe Investment Countries",
            "slug": "safe-investment-countries",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1134",
            "title": "Tennis Grand Slam Winners",
            "slug": "tennis-grand-slam-winners",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1090",
            "title": "Football Team Scores",
            "slug": "football-team-scores",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1116",
            "title": "Order Count per Customer",
            "slug": "order-count-per-customer",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1058",
            "title": "Boolean Expression Evaluator",
            "slug": "boolean-expression-evaluator",
            "type": "Practice",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "1096",
            "title": "Immediate First Orders Percentage",
            "slug": "immediate-first-orders-percentage",
            "type": "Practice",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "1077",
            "title": "Find All Employees Reporting to the Head of the Company",
            "slug": "find-all-employees-reporting-to-the-head-of-the-company",
            "type": "Practice",
            "hasIDE": false,
            "rank": 7
          },
          {
            "id": "1117",
            "title": "Orphan Employees",
            "slug": "orphan-employees",
            "type": "Practice",
            "hasIDE": false,
            "rank": 8
          }
        ]
      },
      {
        "id": "450",
        "title": "CTEs and Temp Structures",
        "slug": "ctes-and-temp-structures",
        "rank": 10,
        "lessons": [
          {
            "id": "2694",
            "title": "CTEs and Temporary Tables",
            "slug": "ctes-and-temporary-tables",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2616",
            "title": "Quiz CTEs and Temporary Tables",
            "slug": "quiz-ctes-and-temporary-tables",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2934",
            "title": "WITH and AS (CTEs)",
            "slug": "with-and-as-ctes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2935",
            "title": "Non-Recursive CTEs",
            "slug": "non-recursive-ctes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2936",
            "title": "Recursive CTEs for Hierarchies",
            "slug": "recursive-ctes-for-hierarchies",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1111",
            "title": "Most Frequently Ordered Product(s) for Each Customer",
            "slug": "most-frequently-ordered-product(s)-for-each-customer",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1079",
            "title": "Find Missing Subtasks for Each Task",
            "slug": "find-missing-subtasks-for-each-task",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          }
        ]
      },
      {
        "id": "451",
        "title": "Dates and Time",
        "slug": "dates-and-time",
        "rank": 11,
        "lessons": [
          {
            "id": "2695",
            "title": "Dates: Functions and Filtering",
            "slug": "dates-functions-and-filtering",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1711",
            "title": "Quiz Date and Time Function",
            "slug": "quiz-date-and-time-function",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2930",
            "title": "Date and Time Part Extraction Using YEAR(), MONTH(), DAY(), HOUR(), MINUTE(), and SECOND()",
            "slug": "date-and-time-part-extraction-using-year-month-day-hour-minute-and-second",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2931",
            "title": "Filtering with Date Ranges",
            "slug": "filtering-with-date-ranges",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2932",
            "title": "Finding First and Latest Events",
            "slug": "finding-first-and-latest-events",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2933",
            "title": "Calculating Date Differences (DATEDIFF, TIMESTAMPDIFF)",
            "slug": "calculating-date-differences-datediff-timestampdiff",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "2929",
            "title": "Current Date and Time",
            "slug": "current-date-and-time",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "1104",
            "title": "Latest 2020 Login",
            "slug": "latest-2020-login",
            "type": "Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "1101",
            "title": "Kid-Friendly Movies in Last Month",
            "slug": "kid-friendly-movies-in-last-month",
            "type": "Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "1146",
            "title": "Warmer Days",
            "slug": "warmer-days",
            "type": "Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "1122",
            "title": "Restaurant Payment Trends",
            "slug": "restaurant-payment-trends",
            "type": "Practice",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "1098",
            "title": "Inactive Sellers",
            "slug": "inactive-sellers",
            "type": "Practice",
            "hasIDE": false,
            "rank": 4
          }
        ]
      },
      {
        "id": "452",
        "title": "Window Functions",
        "slug": "window-functions",
        "rank": 12,
        "lessons": [
          {
            "id": "2698",
            "title": "Everything about Window Functions",
            "slug": "everything-about-window-functions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2622",
            "title": "Quiz Everything about Window Functions",
            "slug": "quiz-everything-about-window-functions",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3114",
            "title": "Core Mental Model (OVER, PARTITION BY, ORDER BY)",
            "slug": "core-mental-model-over-partition-by-order-by",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3107",
            "title": "Ranking Functions",
            "slug": "ranking-functions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3108",
            "title": "Offset Functions",
            "slug": "offset-functions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3109",
            "title": "Window Frames",
            "slug": "window-frames",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3110",
            "title": "Value Window Functions",
            "slug": "value-window-functions",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3111",
            "title": "Distribution Helpers",
            "slug": "distribution-helpers",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3112",
            "title": "Named Windows",
            "slug": "named-windows",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3113",
            "title": "Real-Life Use Cases",
            "slug": "real-life-use-cases",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          }
        ]
      },
      {
        "id": "752",
        "title": "JSON",
        "slug": "json",
        "rank": 13,
        "lessons": [
          {
            "id": "2980",
            "title": "JSON in SQL",
            "slug": "json-in-sql",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3193",
            "title": "Dummy Data Setup",
            "slug": "dummy-data-setup",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3194",
            "title": "JSON Insertion + Data Loading",
            "slug": "json-insertion-data-loading",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3195",
            "title": "JSON Read / Query Commands",
            "slug": "json-read-query-commands",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3196",
            "title": "JSON Arrays and Search",
            "slug": "json-arrays-and-search",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3197",
            "title": "JSON Updates",
            "slug": "json-updates",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3198",
            "title": "JSON Output Builders",
            "slug": "json-output-builders",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3199",
            "title": "Performance and Indexing",
            "slug": "performance-and-indexing",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3200",
            "title": "Upsert Power Features",
            "slug": "upsert-power-features",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          }
        ]
      },
      {
        "id": "856",
        "title": "Database Design",
        "slug": "database-design",
        "rank": 14,
        "lessons": [
          {
            "id": "3086",
            "title": "Database Design Fundamentals",
            "slug": "database-design-fundamentals",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3078",
            "title": "Importance, Raw Data and Pain",
            "slug": "importance-raw-data-and-pain",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3079",
            "title": "Core Concepts (Overview)",
            "slug": "core-concepts-overview",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3080",
            "title": "Mental Model (First Principle)",
            "slug": "mental-model-first-principle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3081",
            "title": "Schema Design",
            "slug": "schema-design",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3082",
            "title": "Entity and Attributes",
            "slug": "entity-and-attributes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "3083",
            "title": "Relationships, Cardinality and Optionality",
            "slug": "relationships-cardinality-and-optionality",
            "type": "Theory",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "3084",
            "title": "Everything About Keys",
            "slug": "everything-about-keys",
            "type": "Theory",
            "hasIDE": false,
            "rank": 6
          },
          {
            "id": "3085",
            "title": "Normalisation and their Forms",
            "slug": "normalisation-and-their-forms",
            "type": "Theory",
            "hasIDE": false,
            "rank": 7
          }
        ]
      },
      {
        "id": "753",
        "title": "Query Performance",
        "slug": "query-performance",
        "rank": 15,
        "lessons": [
          {
            "id": "3149",
            "title": "Performance & Debugging",
            "slug": "performance-debugging",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3153",
            "title": "Quiz Performance & Debugging",
            "slug": "quiz-performance-debugging",
            "type": "MCQ",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2981",
            "title": "Raw Data Setup and Stored Procedures",
            "slug": "raw-data-setup-and-stored-procedures",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2982",
            "title": "Debugging Queries with EXPLAIN",
            "slug": "debugging-queries-with-explain",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2983",
            "title": "Query Performance",
            "slug": "query-performance",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2984",
            "title": "Debugging Correctness",
            "slug": "debugging-correctness",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          }
        ]
      },
      {
        "id": "755",
        "title": "Data Storage, Keys, and Query Optimization",
        "slug": "data-storage-keys-and-query-optimization",
        "rank": 16,
        "lessons": [
          {
            "id": "3265",
            "title": "Storage, Keys and Query Performance",
            "slug": "storage-keys-and-query-performance",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3262",
            "title": "Where Rows Actually Live",
            "slug": "where-rows-actually-live",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3263",
            "title": "How a B+ Tree Is Built with Data",
            "slug": "how-a-b-tree-is-built-with-data",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3264",
            "title": "Why the Wrong Primary Key Can Quietly Destroy You",
            "slug": "why-the-wrong-primary-key-can-quietly-destroy-you",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2991",
            "title": "Index Strategy at Scale",
            "slug": "index-strategy-at-scale",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          }
        ]
      },
      {
        "id": "756",
        "title": "Database Scaling and Production Systems",
        "slug": "database-scaling-and-production-systems",
        "rank": 17,
        "lessons": [
          {
            "id": "3269",
            "title": "Scaling And Production Operations",
            "slug": "scaling-and-production-operations",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2993",
            "title": "Scaling Reads",
            "slug": "scaling-reads",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "2535",
            "title": "Sharding",
            "slug": "sharding",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "2994",
            "title": "Distributed IDs",
            "slug": "distributed-ids",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "2995",
            "title": "Zero-Downtime Schema Changes",
            "slug": "zero-downtime-schema-changes",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "2996",
            "title": "Partitioning & Data Lifecycle",
            "slug": "partitioning-data-lifecycle",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          }
        ]
      },
      {
        "id": "764",
        "title": "Interview Situational Questions (Easy)",
        "slug": "interview-situational-questions-easy",
        "rank": 18,
        "lessons": [
          {
            "id": "3003",
            "title": "Situation-1",
            "slug": "situation-1",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3004",
            "title": "Situation-2",
            "slug": "situation-2",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3005",
            "title": "Situation-3",
            "slug": "situation-3",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3006",
            "title": "Situation-4",
            "slug": "situation-4",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3007",
            "title": "Situation-5",
            "slug": "situation-5",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          }
        ]
      },
      {
        "id": "765",
        "title": "Interview Situational Questions (Medium)",
        "slug": "interview-situational-questions-medium",
        "rank": 19,
        "lessons": [
          {
            "id": "3008",
            "title": "Situation-6",
            "slug": "situation-6",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3009",
            "title": "Situation-7",
            "slug": "situation-7",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3010",
            "title": "Situation-8",
            "slug": "situation-8",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3011",
            "title": "Situation-9",
            "slug": "situation-9",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3012",
            "title": "Situation-10",
            "slug": "situation-10",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          }
        ]
      },
      {
        "id": "766",
        "title": "Interview Situational Questions (Hard)",
        "slug": "interview-situational-questions-hard",
        "rank": 20,
        "lessons": [
          {
            "id": "3013",
            "title": "Situation-11",
            "slug": "situation-11",
            "type": "Theory",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "3014",
            "title": "Situation-12",
            "slug": "situation-12",
            "type": "Theory",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "3015",
            "title": "Situation-13",
            "slug": "situation-13",
            "type": "Theory",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "3016",
            "title": "Situation-14",
            "slug": "situation-14",
            "type": "Theory",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "3017",
            "title": "Situation-15",
            "slug": "situation-15",
            "type": "Theory",
            "hasIDE": false,
            "rank": 4
          }
        ]
      }
    ]
  },
  {
    "slug": "aptitude",
    "legacySlug": "aptitude",
    "title": "Technical Aptitude & Placement Analytics",
    "track": "Aptitude",
    "description": "Rigorous cognitive screening training: numerical deduction, probability distributions, data sufficiency, abstract spatial logic, and speed-round interview mocks.",
    "level": "Placement Evaluation",
    "icon": "Compass",
    "badge": "Screening Round Focus",
    "totalModules": 4,
    "totalLessons": 80,
    "modules": [
      {
        "id": "apt_1",
        "title": "Quantitative & Numerical Reasoning",
        "slug": "quantitative-reasoning",
        "rank": 0,
        "lessons": [
          {
            "id": "q1",
            "title": "Percentages, Profit Metrics & Risk Margins",
            "slug": "percentages-profit",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "q2",
            "title": "Ratios, Proportional Scaling & Mixtures",
            "slug": "ratios-proportions",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "q3",
            "title": "Kinematics: Velocity, Relative Motion & Queuing",
            "slug": "kinematics-speed-distance",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "q4",
            "title": "Work Invariance, Multi-Agent Rate & Throughput",
            "slug": "work-rate-throughput",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "q5",
            "title": "Combinatorics, Permutations & Discrete Probability",
            "slug": "combinatorics-probability",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "q6",
            "title": "Modular Arithmetic & Prime Theory Foundations",
            "slug": "number-theory-modular",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 5
          },
          {
            "id": "q7",
            "title": "Compound Growth, Annuities & Financial Models",
            "slug": "compound-growth-models",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 6
          }
        ]
      },
      {
        "id": "apt_2",
        "title": "Logical Deduction & Abstract Problem Solving",
        "slug": "logical-deduction",
        "rank": 1,
        "lessons": [
          {
            "id": "lr1",
            "title": "Cryptarithmetic & Algorithmic Encoding Sequences",
            "slug": "cryptarithmetic-sequences",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "lr2",
            "title": "Relational Graph Traversal & Directed Trees",
            "slug": "relational-trees",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "lr3",
            "title": "Spatial Geometry & Coordinate System Navigation",
            "slug": "spatial-navigation",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "lr4",
            "title": "Linear & Matrix Constraint Arrangements",
            "slug": "matrix-arrangements",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 3
          },
          {
            "id": "lr5",
            "title": "Boolean Logic Networks & Propositional Calculus",
            "slug": "boolean-deductive-logic",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 4
          },
          {
            "id": "lr6",
            "title": "Chronological Cycles & Periodic Interval Systems",
            "slug": "chronological-cycles",
            "type": "Theory & Problems",
            "hasIDE": false,
            "rank": 5
          }
        ]
      },
      {
        "id": "apt_3",
        "title": "Critical Verbal Synthesis & Analytical Reading",
        "slug": "critical-verbal-synthesis",
        "rank": 2,
        "lessons": [
          {
            "id": "va1",
            "title": "Technical Passage Analysis & Logical Inferences",
            "slug": "passage-inferences",
            "type": "Theory & Practice",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "va2",
            "title": "Syntax Discrepancy & Grammatical Consistency",
            "slug": "syntax-discrepancy",
            "type": "Theory & Practice",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "va3",
            "title": "Lexical Precision & Semantic Nuance",
            "slug": "lexical-precision",
            "type": "Theory & Practice",
            "hasIDE": false,
            "rank": 2
          },
          {
            "id": "va4",
            "title": "Discourse Structuring & Textual Cohesion",
            "slug": "discourse-cohesion",
            "type": "Theory & Practice",
            "hasIDE": false,
            "rank": 3
          }
        ]
      },
      {
        "id": "apt_4",
        "title": "Benchmark Interview Assessment Mocks",
        "slug": "benchmark-mocks",
        "rank": 3,
        "lessons": [
          {
            "id": "mk1",
            "title": "Full-Scale Diagnostic Engineering Aptitude Exam",
            "slug": "diagnostic-exam",
            "type": "Mock Assessment",
            "hasIDE": false,
            "rank": 0
          },
          {
            "id": "mk2",
            "title": "Tier-1 High-Velocity Technical Screening Round",
            "slug": "velocity-screening-round",
            "type": "Mock Assessment",
            "hasIDE": false,
            "rank": 1
          },
          {
            "id": "mk3",
            "title": "Cognitive Agility & Algorithmic Problem Solving Assessment",
            "slug": "cognitive-agility-round",
            "type": "Mock Assessment",
            "hasIDE": false,
            "rank": 2
          }
        ]
      }
    ]
  }
];

export function getSubjectBySlug(slug: string): AsciSubject | undefined {
  return PLUS_SUBJECTS.find(s => s.slug === slug || s.legacySlug === slug);
}

export const PLUS_TRACKS: AsciTrackGroup[] = [
  {
    name: 'Core Subjects',
    description: 'Foundational computer systems and architecture critical for engineering interviews and high-scale systems.',
    subjects: PLUS_SUBJECTS.filter(s => s.track === 'Core Subjects')
  },
  {
    name: 'System Design & Architecture',
    description: 'Architect decoupled, highly maintainable object-oriented software with standard enterprise patterns and real-world system case studies.',
    subjects: PLUS_SUBJECTS.filter(s => s.track === 'System Design')
  },
  {
    name: 'Data Engineering',
    description: 'Master analytical SQL queries, B+Tree indexing, window functions, CTEs, and production data pipelines.',
    subjects: PLUS_SUBJECTS.filter(s => s.track === 'Data Engineering')
  },
  {
    name: 'Aptitude & Readiness',
    description: 'Ace preliminary cognitive screening tests, numerical speed rounds, and placement analytics for tier-1 firms.',
    subjects: PLUS_SUBJECTS.filter(s => s.track === 'Aptitude')
  }
];
