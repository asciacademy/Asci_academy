import type { Part } from "./python-course-data"

/* ═══════════════════════════════════════════════════════════════════════════
   ASCI PYTHON CURRICULUM — PART I: BEGINNER FOUNDATIONS (CHAPTERS 1 - 8)
   ═══════════════════════════════════════════════════════════════════════════ */

export const pythonCurriculumPart1: Part = {
  id: "part-1",
  partNumber: 1,
  title: "Part I: Python Foundations & Core Mechanics",
  description: "Build an exact, foundational understanding of Python syntax, the CPython compilation pipeline, dynamic typing, and memory binding.",
  level: "Beginner",
  chapters: [
    {
      id: "ch-1",
      title: "Chapter 1 — Introduction to Python & The CPython Architecture",
      description: "Understand the CPython runtime, Bytecode compilation, interpreter execution loops, and the Python Zen.",
      level: "Beginner",
      concepts: [
        {
          id: "py-1-1",
          title: "CPython Execution Architecture & Bytecode Compilation",
          slug: "cpython-architecture",
          level: "Beginner",
          description: "How Python source code (.py) is tokenized, parsed into an Abstract Syntax Tree (AST), compiled into bytecode (.pyc), and executed by the CPython virtual evaluation loop.",
          tldr: "Python is an interpreted, bytecode-compiled language. CPython tokenizes source, constructs an AST, compiles bytecode, and executes opcodes sequentially in ceval.c.",
          flowchart: `[Python Source (.py)] ──Tokenize──> [Tokens] ──PEG Parser──> [AST (Abstract Syntax Tree)]
                                                                │
                                                       (Compile Bytecode)
                                                                ▼
                                                        [Bytecode (.pyc)]
                                                                │
                                                      (ceval.c Eval Loop)
                                                                ▼
                                                  [CPython Virtual Machine]
                                                                │
                                                                ▼
                                                     [Host Operating System]`,
          code: `# Exploring Python Bytecode via the standard 'dis' disassembler module
import dis

def compute_square(n: int) -> int:
    result = n * n
    return result

print("=== Python Function Disassembly ===")
dis.dis(compute_square)`,
          expectedOutput: `=== Python Function Disassembly ===
  5           0 RESUME                   0

  6           2 LOAD_FAST                0 (n)
              4 LOAD_FAST                0 (n)
              6 BINARY_OP                5 (*)
             10 STORE_FAST               1 (result)

  7          12 LOAD_FAST                1 (result)
             14 RETURN_VALUE`,
          exercisePrompt: "Inspect the bytecode generated for a function that adds two numbers, checking the LOAD_FAST and BINARY_OP opcodes.",
          solutionCode: `import dis\ndef add(a, b):\n    return a + b\ndis.dis(add)`,
          programWorking: [
            {
              step: 1,
              line: 5,
              title: "Function Definition & Code Object Generation",
              explanation: "The compiler constructs a PyCodeObject containing bytecode instructions, constant tuples (co_consts), and local variable names (co_varnames)."
            },
            {
              step: 2,
              line: 6,
              title: "Operand Push to Evaluation Stack",
              explanation: "LOAD_FAST pushes local variable 'n' onto the CPython execution frame's value stack twice."
            },
            {
              step: 3,
              line: 6,
              title: "Binary Operation Execution",
              explanation: "BINARY_OP pops the top two values, multiplies them via the PyNumber_Multiply C API, and pushes the product."
            },
            {
              step: 4,
              line: 7,
              title: "Frame Unwinding & Return",
              explanation: "RETURN_VALUE pops the product from the stack and hands it back to the caller frame."
            }
          ],
          interviewQuestions: [
            {
              question: "Is Python an interpreted or compiled language?",
              answer: "Python is both. Source code is first compiled into intermediate bytecode (.pyc), which is then interpreted by the CPython virtual machine execution loop (ceval.c). Implementations like PyPy use JIT (Just-In-Time) compilation to emit native machine code at runtime.",
              companyTags: ["Google", "Meta", "Amazon"]
            },
            {
              question: "What is the role of the PEG parser introduced in Python 3.9?",
              answer: "Python 3.9 replaced the legacy LL(1) parser with a Parsing Expression Grammar (PEG) parser. PEG allows arbitrary lookahead, eliminating grammatical ambiguities and enabling modern syntax features like structural pattern matching (match/case).",
              companyTags: ["Netflix", "Apple"]
            }
          ],
          quiz: {
            question: "What does the CPython compiler emit before running code through the evaluation loop?",
            options: [
              "x86-64 native assembly instructions",
              "Intermediate Bytecode stored in a code object",
              "Java Virtual Machine .class binaries",
              "Unparsed raw ASCII character streams"
            ],
            correctIndex: 1,
            explanation: "CPython compiles source code into platform-neutral bytecode opcodes executed sequentially by its virtual machine loop."
          },
          resources: [
            { title: "Python 3 dis Module Documentation", url: "https://docs.python.org/3/library/dis.html", type: "docs" },
            { title: "PEP 617 — New PEG Parser for CPython", url: "https://peps.python.org/pep-0617/", type: "pep" }
          ]
        },
        {
          id: "py-1-2",
          title: "Variables as Name Bindings & Reference Pointers",
          slug: "variables-name-binding",
          level: "Beginner",
          description: "Understand that Python variables are not memory boxes that hold values; they are name tags (labels) pointing to dynamically allocated PyObject instances on the Heap.",
          tldr: "Variables in Python are pointers (references). Assignment 'a = b' does not copy memory; it binds two labels to the exact same Heap object.",
          flowchart: `[Label: x] ───references───┐
                            ▼
                    [PyObject (int)]
                    ├── ob_refcnt: 2
                    ├── ob_type: <class 'int'>
                    └── ob_ival: 42
                            ▲
[Label: y] ───references───┘`,
          code: `# Demonstrating Reference Binding and Identity via id()
a = [10, 20, 30]
b = a  # 'b' points to the exact same list instance in memory

print(f"ID of a: {id(a)}")
print(f"ID of b: {id(b)}")
print(f"Do a and b reference the exact same object? {a is b}")

# Mutating 'b' mutates 'a'
b.append(40)
print(f"Contents of a after mutating b: {a}")`,
          expectedOutput: `ID of a: 140293847291200
ID of b: 140293847291200
Do a and b reference the exact same object? True
Contents of a after mutating b: [10, 20, 30, 40]`,
          exercisePrompt: "Create a shallow copy of a list using list slicing ([:]) or .copy() and demonstrate that 'is' evaluates to False while '==' evaluates to True.",
          solutionCode: `orig = [1, 2, 3]\ncopy_list = orig.copy()\nprint("Identity (is):", copy_list is orig)\nprint("Equality (==):", copy_list == orig)`,
          programWorking: [
            {
              step: 1,
              line: 2,
              title: "Heap Object Allocation",
              explanation: "CPython allocates a PyListObject on the Heap containing 3 integers, sets ob_refcnt = 1, and binds the name 'a' in the local symbol table."
            },
            {
              step: 2,
              line: 3,
              title: "Pointer Aliasing",
              explanation: "Assignment 'b = a' copies the 64-bit pointer address into 'b', incrementing the list's ob_refcnt to 2."
            },
            {
              step: 3,
              line: 11,
              title: "In-Place Heap Mutation",
              explanation: "b.append(40) modifies the underlying list buffer. Because 'a' references this exact same memory block, accessing 'a' reveals the newly appended element."
            }
          ],
          interviewQuestions: [
            {
              question: "Explain the difference between '==' and 'is' in Python.",
              answer: "'==' checks for value equality by invoking the object's __eq__() method. 'is' checks for reference identity, verifying whether both operands share the exact same memory address (id(a) == id(b)).",
              companyTags: ["Uber", "Microsoft", "Stripe"]
            }
          ],
          quiz: {
            question: "If 'x = [1, 2]' and 'y = [1, 2]', what is the result of 'x is y' and 'x == y'?",
            options: [
              "x is y: True, x == y: True",
              "x is y: False, x == y: True",
              "x is y: False, x == y: False",
              "Raises MemoryError"
            ],
            correctIndex: 1,
            explanation: "Two separate list literals create two distinct list instances in Heap memory. They have identical values (== True) but distinct memory addresses (is False)."
          }
        }
      ]
    },
    {
      id: "ch-2",
      title: "Chapter 2 — Primitive Data Types, Memory Layout & Mutability",
      description: "Small integer caching, string interning, IEEE-754 floating point arithmetic, and mutability contracts.",
      level: "Beginner",
      concepts: [
        {
          id: "py-2-1",
          title: "Small Integer Cache & String Interning Mechanics",
          slug: "integer-cache-string-interning",
          level: "Beginner",
          description: "How CPython pre-allocates an array of small integers [-5, 256] at startup, and automatically interns identifier strings to optimize memory and speed up dictionary lookups.",
          tldr: "CPython pre-allocates integer objects from -5 to 256. Code referencing 100 shares a single global singleton, whereas integers > 256 create distinct heap allocations.",
          flowchart: `Integer Request: n = 42
         │
  [-5 <= n <= 256]?
  ├── YES ──> Return static singleton from small_ints cache (Zero allocation)
  └── NO  ──> Allocate new PyLongObject on Heap via PyObject_Malloc()`,
          code: `# Demonstrating CPython Small Integer Caching
x = 250
y = 250
print(f"250 is 250: {x is y}")  # True (Cached)

large_a = 5000
large_b = 5000
print(f"5000 is 5000: {large_a is large_b}")  # False (Distinct heap allocations)

# String Interning
import sys
str1 = sys.intern("high_frequency_keyword")
str2 = sys.intern("high_frequency_keyword")
print(f"Interned Strings 'is': {str1 is str2}")  # True`,
          expectedOutput: `250 is 250: True
5000 is 5000: False
Interned Strings 'is': True`,
          exercisePrompt: "Verify that -5 is cached while -6 allocates a new object in Python.",
          solutionCode: `a = -5\nb = -5\nprint("-5 is cached:", a is b)\nc = -6\nd = -6\nprint("-6 is cached:", c is d)`,
          quiz: {
            question: "What is the range of pre-allocated small integers in standard CPython?",
            options: [
              "[0, 255]",
              "[-5, 256]",
              "[-128, 127]",
              "[-1024, 1024]"
            ],
            correctIndex: 1,
            explanation: "CPython pre-allocates integers between -5 and 256 inclusive to avoid repeated memory allocations for common index and loop variables."
          }
        },
        {
          id: "py-2-2",
          title: "Mutable vs. Immutable Types & Defensive Copying",
          slug: "mutability-and-defensive-copying",
          level: "Beginner",
          description: "Why immutability (tuples, frozensets, strings) prevents subtle bugs, and why mutable default arguments in functions are a dangerous anti-pattern.",
          tldr: "Never use mutable default arguments like 'def func(items=[])'. Default arguments are evaluated once when the function is defined, causing state contamination across calls.",
          code: `# The Mutable Default Argument Trap vs Clean Idiomatic Pattern
def dangerous_append(val, target_list=[]):
    target_list.append(val)
    return target_list

print(dangerous_append(1))  # [1]
print(dangerous_append(2))  # [1, 2] - State leaked!

# Correct Idiomatic Pattern
def safe_append(val, target_list=None):
    if target_list is None:
        target_list = []
    target_list.append(val)
    return target_list

print(safe_append(10))  # [10]
print(safe_append(20))  # [20] - Safe and isolated!`,
          expectedOutput: `[1]
[1, 2]
[10]
[20]`,
          exercisePrompt: "Write a function that accepts a dictionary with a safe None default parameter, initializing it lazily.",
          solutionCode: `def register_user(username, metadata=None):\n    if metadata is None:\n        metadata = {}\n    metadata['username'] = username\n    return metadata`,
          interviewQuestions: [
            {
              question: "Why are default parameter values in Python evaluated at definition time?",
              answer: "In Python, 'def' is an executable statement. When the module loads, the interpreter executes 'def', evaluates default argument expressions, and stores them in the function object's '__defaults__' tuple attribute permanently.",
              companyTags: ["Amazon", "Google", "Databricks"]
            }
          ],
          quiz: {
            question: "Where does Python store default parameter values for a function?",
            options: [
              "Inside the operating system register cache",
              "Inside the function's '__defaults__' attribute tuple at definition time",
              "Inside thread-local storage newly created upon each call",
              "Inside the global variables dictionary permanently"
            ],
            correctIndex: 1,
            explanation: "Default parameter values are evaluated once when the function definition is executed and stored in the function's '__defaults__' attribute."
          }
        }
      ]
    },
    {
      id: "ch-3",
      title: "Chapter 3 — Flow Control, Predicates & Structural Pattern Matching",
      description: "Modern structural pattern matching (match/case), Boolean short-circuiting, truth tables, and predicates.",
      level: "Beginner",
      concepts: [
        {
          id: "py-3-1",
          title: "Structural Pattern Matching (PEP 634 match/case)",
          slug: "structural-pattern-matching",
          level: "Beginner",
          description: "Harness Python 3.10+ match/case expressions with sequence unpacking, guard clauses, and class pattern matching.",
          tldr: "Structural pattern matching provides expressive, type-safe destructuring and dispatching, far surpassing traditional if-elif chains.",
          code: `def process_command(command):
    match command:
        case ["QUIT" | "EXIT"]:
            return "Terminating session..."
        case ["LOAD", str(filename)]:
            return f"Loading file: {filename}"
        case ["MOVE", int(x), int(y)] if x >= 0 and y >= 0:
            return f"Moving to positive quadrant coordinates ({x}, {y})"
        case _:
            return "Unknown command syntax"

print(process_command(["LOAD", "data.csv"]))
print(process_command(["MOVE", 10, 25]))
print(process_command(["QUIT"]))`,
          expectedOutput: `Loading file: data.csv
Moving to positive quadrant coordinates (10, 25)
Terminating session...`,
          exercisePrompt: "Write a match/case handler that destructures a dictionary with keys 'status' and 'payload'.",
          solutionCode: `def handle_response(res):\n    match res:\n        case {"status": 200, "payload": data}:\n            return f"Success: {data}"\n        case {"status": 404}:\n            return "Not Found"\n        case _:\n            return "Error"`,
          quiz: {
            question: "What is the wildcard pattern in Python 3.10 match/case syntax?",
            options: ["*", "_", "default:", "any"],
            correctIndex: 1,
            explanation: "The underscore '_' acts as the wildcard catch-all pattern in structural pattern matching."
          }
        },
        {
          id: "py-3-2",
          title: "Boolean Truthiness & Short-Circuit Evaluation",
          slug: "boolean-truthiness-short-circuit",
          level: "Beginner",
          description: "Deconstruct how Python evaluates 'and' / 'or' operators not as simple Booleans, but as short-circuiting operand emitters.",
          tldr: "In Python, 'x and y' returns x if x is false, else y. 'x or y' returns x if x is true, else y. Neither forces a strict bool conversion.",
          code: `# Demonstrating Python Short-Circuit Evaluation and Truthy Fallbacks
default_host = "localhost"
custom_host = ""
active_host = custom_host or default_host
print(f"Active Host: {active_host}")

# Short-circuit guards prevent ZeroDivisionError
denom = 0
result = (denom != 0) and (100 / denom)
print(f"Guarded Result: {result}")`,
          expectedOutput: `Active Host: localhost
Guarded Result: False`,
          exercisePrompt: "Use 'or' short-circuiting to provide a fallback list when an input list is empty.",
          solutionCode: `items = []\nfinal_items = items or ["default_item"]\nprint(final_items)`,
          quiz: {
            question: "What does the expression '[] or 42 or None' evaluate to?",
            options: ["True", "[]", "42", "None"],
            correctIndex: 2,
            explanation: "[] is falsy, so evaluation continues to 42. Since 42 is truthy, the 'or' expression short-circuits and immediately returns 42."
          }
        }
      ]
    },
    {
      id: "ch-4",
      title: "Chapter 4 — Iteration Mechanics, While/For Loops & Comprehensions",
      description: "While loops, loop control with break and continue, the for-else pattern, and memory-efficient range generators.",
      level: "Beginner",
      concepts: [
        {
          id: "py-4-1",
          title: "Loop Control Flow, break, continue & for-else Semantics",
          slug: "loop-control-break-continue-else",
          level: "Beginner",
          description: "Master loop flow control and Python's unique 'else' block attached to loops, which executes only if the loop terminates without encountering 'break'.",
          tldr: "A loop 'else' block executes when the loop condition finishes naturally without a break statement. It eliminates boolean flag variables in search loops.",
          flowchart: `[For Loop Iteration]
         │
   [Item matches condition]?
   ├── YES ──> [break] ──> Exits loop immediately (else skipped!)
   └── NO  ──> Next item
         │
   (All items exhausted naturally)
         ▼
   [else block executes!]`,
          code: `# Search loop using the Pythonic 'for-else' construct
def find_prime_factor(n: int) -> None:
    for i in range(2, int(n ** 0.5) + 1):
        if n % i == 0:
            print(f"Found factor: {i} divides {n}")
            break
    else:
        print(f"{n} is a prime number (no factors found)!")

find_prime_factor(100)
find_prime_factor(97)`,
          expectedOutput: `Found factor: 2 divides 100
97 is a prime number (no factors found)!`,
          exercisePrompt: "Write a for-else loop that checks whether a list contains an invalid transaction and alerts if all transactions are clean.",
          solutionCode: `txs = [10, 25, 40]\nfor t in txs:\n    if t < 0: print("Fraud detected"); break\nelse: print("All transactions verified clean")`,
          quiz: {
            question: "When does the 'else' block of a Python 'for' loop execute?",
            options: [
              "Every single iteration of the loop",
              "Only when the loop encounters a 'break' statement",
              "Only when the loop exhausts its iterable naturally without hitting a 'break'",
              "Whenever an exception is caught"
            ],
            correctIndex: 2,
            explanation: "The loop 'else' clause executes only if the loop completed all iterations naturally without being interrupted by a 'break' statement."
          }
        },
        {
          id: "py-4-2",
          title: "Range Protocol & List/Dict Comprehensions",
          slug: "range-protocol-comprehensions",
          level: "Beginner",
          description: "How range objects generate values on demand with O(1) memory complexity, and how comprehensions provide expressive, C-accelerated array transformations.",
          tldr: "range() produces an immutable sequence object that computes elements mathematically on demand. Comprehensions execute at C speed inside the bytecode loop.",
          code: `import sys

# range() uses constant 48 bytes regardless of span
r_small = range(10)
r_huge = range(10_000_000)
print(f"Size of range(10): {sys.getsizeof(r_small)} bytes")
print(f"Size of range(10M): {sys.getsizeof(r_huge)} bytes")

# Dict and set comprehensions
squares = {x: x * x for x in range(1, 6)}
print("Squares Dict:", squares)

even_squares = [x * x for x in range(10) if x % 2 == 0]
print("Even Squares List:", even_squares)`,
          expectedOutput: `Size of range(10): 48 bytes
Size of range(10M): 48 bytes
Squares Dict: {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}
Even Squares List: [0, 4, 16, 36, 64]`,
          exercisePrompt: "Write a dictionary comprehension that inverts a dictionary mapping keys to values into values to keys.",
          solutionCode: `orig = {"a": 1, "b": 2, "c": 3}\ninverted = {v: k for k, v in orig.items()}\nprint(inverted)`,
          quiz: {
            question: "Why is range(1_000_000_000) virtually instantaneous and lightweight in Python 3?",
            options: [
              "It stores numbers on GPU VRAM",
              "It does not pre-allocate elements; it computes numbers on-the-fly via arithmetic indexing",
              "CPython optimizes it out entirely at compile-time",
              "It uses virtual memory paging from the OS swap"
            ],
            correctIndex: 1,
            explanation: "In Python 3, range is a lazy sequence type that computes indices on demand using start, stop, and step attributes in O(1) constant memory."
          }
        }
      ]
    },
    {
      id: "ch-5",
      title: "Chapter 5 — Functions, Call Stacks, Scope & Defensive Exception Handling",
      description: "Function call frames, LEGB scope resolution, parameter unpacking, and robust try-except-else-finally blocks.",
      level: "Beginner",
      concepts: [
        {
          id: "py-5-1",
          title: "Stack Frames, LEGB Scope & First-Class Functions",
          slug: "stack-frames-legb-scope",
          level: "Beginner",
          description: "Explore the CPython call stack frame lifecycle (PyFrameObject), LEGB name lookup order (Local, Enclosing, Global, Built-in), and functions as first-class objects.",
          tldr: "Python resolves variable names following LEGB: Local first, then Enclosing closures, Global module symbols, and finally Built-in primitives.",
          code: `# Demonstrating LEGB Scope and Closure Encapsulation
global_rate = 0.08  # Global Scope

def make_tax_calculator(regional_rate: float):
    # Enclosing Scope
    def calculate(amount: float) -> float:
        # Local Scope accesses Enclosing and Global
        total_tax = amount * (global_rate + regional_rate)
        return total_tax
    return calculate

california_calc = make_tax_calculator(0.025)
print(f"California Tax on $1000: USD {california_calc(1000):.2f}")
print("Closure freevars:", california_calc.__code__.co_freevars)`,
          expectedOutput: `California Tax on $1000: USD 105.00
Closure freevars: ('regional_rate',)`,
          exercisePrompt: "Write a closure counter function that increments and returns its state on each invocation without using global variables.",
          solutionCode: `def make_counter():\n    count = 0\n    def step():\n        nonlocal count\n        count += 1\n        return count\n    return step\nc = make_counter(); print(c(), c())`,
          quiz: {
            question: "What keyword is required to rebind a variable in an enclosing outer function's scope?",
            options: ["global", "nonlocal", "outer", "closure"],
            correctIndex: 1,
            explanation: "The 'nonlocal' keyword instructs Python to bind an identifier to the nearest enclosing function's scope rather than creating a local variable."
          }
        },
        {
          id: "py-5-2",
          title: "Defensive Exception Handling & Custom Exceptions",
          slug: "defensive-exception-handling",
          level: "Beginner",
          description: "Building production-grade fault-tolerant pipelines with try-except-else-finally blocks, exception chaining (raise from), and domain-specific exception hierarchies.",
          tldr: "The 'else' block runs only when no exception occurs. The 'finally' block runs unconditionally. Always subclass Exception (never BaseException) for custom errors.",
          code: `class InsufficientFundsError(Exception):
    """Raised when account balance cannot cover transfer amount."""
    def __init__(self, current: float, required: float):
        self.shortfall = required - current
        super().__init__(f"Shortfall of USD {self.shortfall:.2f} (Balance: USD {current:.2f}, Required: USD {required:.2f})")

def process_withdrawal(balance: float, amount: float) -> float:
    try:
        if amount > balance:
            raise InsufficientFundsError(balance, amount)
        new_balance = balance - amount
    except InsufficientFundsError as err:
        print(f"Transaction Aborted: {err}")
        raise
    else:
        print("Transaction Approved & Settlement Scheduled")
        return new_balance
    finally:
        print("Audit Log Entry Written to Secure Ledger")

try:
    process_withdrawal(50.0, 120.0)
except InsufficientFundsError:
    pass`,
          expectedOutput: `Transaction Aborted: Shortfall of $70.00 (Balance: $50.00, Required: $120.00)
Audit Log Entry Written to Secure Ledger`,
          exercisePrompt: "Create a custom ValidationError subclass and raise it when an email address does not contain an '@' symbol.",
          solutionCode: `class ValidationError(Exception): pass\ndef validate_email(e):\n    if '@' not in e: raise ValidationError("Missing @")\n    return True`,
          quiz: {
            question: "When does the 'else' clause of a try-except statement execute?",
            options: [
              "When any exception is caught and handled",
              "Only when NO exception is raised within the try block",
              "Unconditionally right before the finally block",
              "Only when an unhandled exception propagates"
            ],
            correctIndex: 1,
            explanation: "The 'else' clause in a try block runs only if the code inside the 'try' executed cleanly without raising any exceptions."
          }
        }
      ]
    },
    {
      id: "ch-6",
      title: "Chapter 6 — Diagnostic Debugging, Tracebacks & Structured Logging",
      description: "Traceback inspection, assertions vs. business logic exceptions, and configuring the standard logging module.",
      level: "Beginner",
      concepts: [
        {
          id: "py-6-1",
          title: "Traceback Introspection & Defensive Assertions",
          slug: "tracebacks-and-assertions",
          level: "Beginner",
          description: "Understanding traceback frame stacks with traceback.print_exc(), and why 'assert' must strictly be reserved for sanity checks and developer invariants.",
          tldr: "Assertions can be completely disabled in production via 'python -O' (optimize flag). Never use assert for security checks or input validation.",
          code: `import traceback

def risky_subsystem(val: int):
    # Invariant check for developers (NOT input validation!)
    assert val != 0, "Internal invariant violated: val must not be zero"
    return 100 // val

try:
    risky_subsystem(0)
except AssertionError:
    print("=== Caught Assertion Failure Traceback ===")
    traceback.print_exc(limit=2)`,
          expectedOutput: `=== Caught Assertion Failure Traceback ===
Traceback (most recent call last):
  File "main.py", line 9, in <module>
    risky_subsystem(0)
  File "main.py", line 5, in risky_subsystem
    assert val != 0, "Internal invariant violated: val must not be zero"
AssertionError: Internal invariant violated: val must not be zero`,
          exercisePrompt: "Write an assertion verifying that a sorted list's first element is less than or equal to its last element.",
          solutionCode: `lst = [1, 5, 9]\nassert lst[0] <= lst[-1], "List not sorted in ascending order"`,
          quiz: {
            question: "Why is it dangerous to use 'assert' for user authorization checks in production Python?",
            options: [
              "Assertions are 10x slower than if-else statements",
              "Running Python with the -O (optimize) flag strips all assert statements from bytecode",
              "Assertions leak memory pages to other processes",
              "Assertions can only check boolean constants"
            ],
            correctIndex: 1,
            explanation: "When Python runs with the -O flag, all assert statements are compiled away into no-ops, bypassing any validation logic written with assert."
          }
        },
        {
          id: "py-6-2",
          title: "Production Logging Architecture (logging module)",
          slug: "production-logging-architecture",
          level: "Beginner",
          description: "Configure modular hierarchical loggers, severity levels (DEBUG, INFO, WARNING, ERROR, CRITICAL), stream handlers, and structured JSON formatters.",
          tldr: "Never use print() in production services. The logging module provides thread-safe, leveled, configurable output routing to stdout, files, and aggregation pipelines.",
          code: `import logging
import sys

# Configure root logger with structured formatting
logger = logging.getLogger("ASCI.IngestionEngine")
logger.setLevel(logging.DEBUG)

handler = logging.StreamHandler(sys.stdout)
formatter = logging.Formatter(
    fmt="%(asctime)s [%(levelname)s] [%(name)s]: %(message)s",
    datefmt="%H:%M:%S"
)
handler.setFormatter(formatter)
logger.addHandler(handler)

logger.info("Initializing high-throughput ingestion pipeline...")
logger.warning("Queue threshold reached 85% capacity")
logger.error("Failed to connect to primary replica; falling back to read-pool")`,
          expectedOutput: `12:00:01 [INFO] [ASCI.IngestionEngine]: Initializing high-throughput ingestion pipeline...
12:00:01 [WARNING] [ASCI.IngestionEngine]: Queue threshold reached 85% capacity
12:00:01 [ERROR] [ASCI.IngestionEngine]: Failed to connect to primary replica; falling back to read-pool`,
          exercisePrompt: "Configure a logger that ignores DEBUG messages and only outputs WARNING and above.",
          solutionCode: `import logging\nl = logging.getLogger("test")\nl.setLevel(logging.WARNING)`,
          quiz: {
            question: "Which logging level has the lowest numerical priority in standard Python?",
            options: ["INFO", "DEBUG", "NOTSET", "WARNING"],
            correctIndex: 2,
            explanation: "NOTSET (0) is lowest, followed by DEBUG (10), INFO (20), WARNING (30), ERROR (40), and CRITICAL (50)."
          }
        }
      ]
    },
    {
      id: "ch-7",
      title: "Chapter 7 — Sequences & List Buffer Mechanics",
      description: "CPython PyListObject dynamic over-allocation, slicing memory mechanics, shallow vs. deep copies, and Timsort.",
      level: "Beginner",
      concepts: [
        {
          id: "py-7-1",
          title: "PyListObject Contiguous Memory Allocation & Slicing",
          slug: "pylist-memory-and-slicing",
          level: "Beginner",
          description: "How Python lists are implemented as dynamic arrays of pointers, why appending is amortized O(1), and why slicing produces a brand new list allocation.",
          tldr: "A Python list is a contiguous array of 64-bit PyObject pointers. Appending uses geometric over-allocation. Slicing 'a[1:4]' creates a new list copying pointer addresses.",
          code: `import sys

# Demonstrating PyListObject dynamic buffer growth
items = []
print(f"Empty list allocated size: {sys.getsizeof(items)} bytes")

last_size = sys.getsizeof(items)
for i in range(10):
    items.append(i)
    current_size = sys.getsizeof(items)
    if current_size != last_size:
        print(f"Length {len(items)}: Buffer resized to {current_size} bytes")
        last_size = current_size`,
          expectedOutput: `Empty list allocated size: 56 bytes
Length 1: Buffer resized to 88 bytes
Length 5: Buffer resized to 120 bytes
Length 9: Buffer resized to 184 bytes`,
          exercisePrompt: "Demonstrate that negative slice lst[::-1] creates a new list with reversed elements without modifying the original.",
          solutionCode: `orig = [1, 2, 3]\nrev = orig[::-1]\nprint("Reversed:", rev, "Original intact:", orig)`,
          quiz: {
            question: "What is the time complexity of inserting an item at the beginning of a Python list (lst.insert(0, val))?",
            options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
            correctIndex: 2,
            explanation: "Inserting at index 0 requires shifting every existing pointer in the contiguous array one position to the right, taking O(N) linear time."
          }
        },
        {
          id: "py-7-2",
          title: "In-Place Mutations, Sorting Protocols (Timsort) & Deep Copies",
          slug: "list-mutations-timsort-deepcopy",
          level: "Beginner",
          description: "Master the difference between list.sort() (in-place Timsort) and sorted() (new list), and prevent reference leakage via copy.deepcopy.",
          tldr: "list.sort() mutates the list in place and returns None. sorted(list) returns a brand new list. Nested structures require copy.deepcopy() to isolate nested pointers.",
          code: `import copy

# Shallow copy aliasing problem with nested lists
matrix = [[1, 2], [3, 4]]
shallow = matrix.copy()
deep = copy.deepcopy(matrix)

# Mutate inner element
matrix[0][0] = 999

print(f"Original Matrix: {matrix}")
print(f"Shallow Copy (affected!): {shallow}")
print(f"Deep Copy (isolated!): {deep}")`,
          expectedOutput: `Original Matrix: [[999, 2], [3, 4]]
Shallow Copy (affected!): [[999, 2], [3, 4]]
Deep Copy (isolated!): [[1, 2], [3, 4]]`,
          exercisePrompt: "Sort a list of tuples by their second element in descending order using the 'key' argument in sorted().",
          solutionCode: `pairs = [("a", 10), ("b", 30), ("c", 20)]\nprint(sorted(pairs, key=lambda x: x[1], reverse=True))`,
          quiz: {
            question: "What sorting algorithm is utilized by Python's built-in list.sort() and sorted()?",
            options: ["QuickSort", "HeapSort", "Timsort (Adaptive Merge/Insertion Sort)", "RadixSort"],
            correctIndex: 2,
            explanation: "Python uses Timsort, a hybrid adaptive stable sorting algorithm derived from merge sort and insertion sort, running in O(N) on pre-sorted data."
          }
        }
      ]
    },
    {
      id: "ch-8",
      title: "Chapter 8 — Hash Tables, Dictionaries & Data Structuring",
      description: "CPython compact dictionary architecture (PEP 468), hash collision resolution, dict views, and set algebra.",
      level: "Beginner",
      concepts: [
        {
          id: "py-8-1",
          title: "PyDictObject Compact Hash Tables & Collision Resolution",
          slug: "pydict-hash-tables-collisions",
          level: "Beginner",
          description: "How Python 3.6+ compact dictionaries split storage into a sparse indices array and a dense entries table, preserving insertion order while maintaining O(1) lookups.",
          tldr: "Dictionaries use open addressing with pseudo-random perturbation for collisions. Since Python 3.6, compact dicts preserve insertion order while reducing RAM usage by ~35%.",
          flowchart: `Key: "username" ──hash()──> 0x5F2A ──modulo indices size──> Index 2
                                                                  │
                                                          [Indices Array]
                                                          [ -1, -1, 0, -1 ]
                                                                    │
                                                                    ▼
                                                            [Dense Entries Array]
                                                            Index 0: {hash, key, value}`,
          code: `# Exploring Hashability and Dictionary Lookups
class UserRecord:
    def __init__(self, user_id: int, name: str):
        self.user_id = user_id
        self.name = name

    def __hash__(self):
        return hash(self.user_id)

    def __eq__(self, other):
        return isinstance(other, UserRecord) and self.user_id == other.user_id

# Safe dictionary setdefault and get patterns
db = {}
u1 = UserRecord(101, "Alice")
db[u1] = {"role": "Admin", "tier": "Enterprise"}

print("Lookup by equivalent user object:", db[UserRecord(101, "Ghost")])
# setdefault ensures atomic initialization
stats = db.setdefault(u1, {})
stats["last_login"] = "2026-09-12"
print("Updated record:", db[u1])`,
          expectedOutput: `Lookup by equivalent user object: {'role': 'Admin', 'tier': 'Enterprise'}
Updated record: {'role': 'Admin', 'tier': 'Enterprise', 'last_login': '2026-09-12'}`,
          exercisePrompt: "Explain why unhashable types like lists cannot be used as dictionary keys in Python.",
          solutionCode: `try:\n    d = {[1, 2]: "val"}\nexcept TypeError as e:\n    print("Caught:", e)`,
          quiz: {
            question: "Why can a Python list NOT be used as a dictionary key?",
            options: [
              "Lists exceed the 64-bit integer pointer width",
              "Lists are mutable and therefore do not implement a stable __hash__() method",
              "CPython only permits ASCII strings as dictionary keys",
              "Lists cannot be compared for equality"
            ],
            correctIndex: 1,
            explanation: "Dictionary keys must be hashable and immutable so their hash value remains invariant throughout their lifecycle."
          }
        },
        {
          id: "py-8-2",
          title: "Dictionary Views, Merging (| operator) & Set Algebra",
          slug: "dict-views-merging-set-algebra",
          level: "Beginner",
          description: "Harness PEP 584 dictionary merge (|) and update (|=) operators, dynamic dictionary views (.keys(), .values(), .items()), and high-speed set union/intersection.",
          tldr: "Python 3.9 introduced the union '|' operator for dictionaries. Sets provide O(1) membership testing and mathematical set operations (union, intersection, difference).",
          code: `# Dictionary Union (PEP 584) & Set Algebra
base_config = {"env": "prod", "workers": 4, "timeout": 30}
override_config = {"workers": 8, "debug": False}

# Merge with precedence to right operand
merged = base_config | override_config
print("Merged Configuration:", merged)

# Set Theory Operations
required_permissions = {"read", "write", "execute", "admin"}
user_permissions = {"read", "write"}

missing = required_permissions - user_permissions
print("Missing Permissions:", missing)
print("Has full access?", required_permissions.issubset(user_permissions))`,
          expectedOutput: `Merged Configuration: {'env': 'prod', 'workers': 8, 'timeout': 30, 'debug': False}
Missing Permissions: {'execute', 'admin'}
Has full access? False`,
          exercisePrompt: "Find common elements between two lists using set intersection (&).",
          solutionCode: `a = [1, 2, 3, 4]\nb = [3, 4, 5, 6]\ncommon = list(set(a) & set(b))\nprint("Common:", sorted(common))`,
          quiz: {
            question: "What is the result of '{1: 'a', 2: 'b'} | {2: 'c', 3: 'd'}' in Python 3.9+?",
            options: [
              "{1: 'a', 2: 'b', 3: 'd'}",
              "{1: 'a', 2: 'c', 3: 'd'}",
              "Raises TypeError",
              "{2: 'c'}"
            ],
            correctIndex: 1,
            explanation: "The dictionary merge operator (|) gives right-hand operands precedence when duplicate keys are encountered, so key 2 becomes 'c'."
          }
        }
      ]
    }
  ]
}
