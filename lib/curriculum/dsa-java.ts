import { CurriculumCourse } from "../curriculum-data"

export const DSA_JAVA_COURSES: CurriculumCourse[] = [
  // =========================================================================
  // 1. JAVA FOR BEGINNERS
  // =========================================================================
  {
    id: "java",
    slug: "java",
    title: "Java for Beginners",
    description: "Master Java fundamentals from syntax and control flow to object-oriented programming. Built according to GeeksforGeeks and W3Schools industry curriculum standards.",
    category: "Backend",
    level: "Beginner",
    weeks: "10 Weeks",
    duration_hours: 40,
    lessons: 26,
    projects: 1,
    certificate: "ASCI Engineering Certificate",
    is_premium: false,
    tools: ["Java 21", "JVM", "javac", "Maven", "OOP"],
    highlights: [
      "The JVM Architecture: Bytecode, ClassLoaders, and JIT Compilation",
      "Core Syntax, Static Typing, and Strict Memory Allocation",
      "Control Flow: Conditionals, Switch Expressions, and Loops",
      "Object-Oriented Programming: Encapsulation, Constructors & Access Modifiers",
      "Compiling and Packaging Executable JARs with Maven"
    ],
    modules: [
      {
        id: "java-beg-mod-1",
        title: "Module 1: Hello Java & The JVM Engine",
        sequence_order: 1,
        description: "Understand bytecode compilation, standard output, and the entry point method.",
        lessons: [
          {
            id: "java-1-1",
            title: "1.1 The Anatomy of a Java Program",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Understand public static void main and the standard output stream.",
            content: `### The Enterprise Foundation
Java is a statically typed, class-based language compiled into platform-independent bytecode (*.class) that runs on any Java Virtual Machine (JVM).

#### Key Components:
- \`public class Main\`: Defines the top-level container matching the filename.
- \`public static void main(String[] args)\`: The universal execution entry point.
- \`System.out.println(...)\`: Prints data to the standard output stream with a trailing newline.

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("HELLO_JAVA");
    }
}
\`\`\``,
            challenge_data: {
              initialCode: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("HELLO_JAVA");\n    }\n}\n`,
              expectedOutput: "HELLO_JAVA",
              instructions: "Execute the Java program to output 'HELLO_JAVA'."
            }
          },
          {
            id: "java-1-2",
            title: "1.2 JDK vs JRE vs JVM",
            sequence_order: 2,
            content_type: "text",
            xp_reward: 40,
            description: "Deep dive into the Java runtime hierarchy and platform independence.",
            content: `### Understanding the Hierarchy

1. **JVM (Java Virtual Machine):** The abstract computing machine that executes bytecode instructions. It handles memory allocation, garbage collection, and hardware abstraction.
2. **JRE (Java Runtime Environment):** Contains the JVM plus the core Java Class Libraries (e.g., \`java.lang\`, \`java.util\`) necessary to run compiled applications.
3. **JDK (Java Development Kit):** The full developer bundle including JRE, compiler (\`javac\`), debugger (\`jdb\`), and packaging tools (\`jar\`).

**The WORA Principle (Write Once, Run Anywhere):**
Source Code (\`.java\`) $\\xrightarrow{javac}$ Bytecode (\`.class\`) $\\xrightarrow{JVM}$ Native Machine Code.`
          }
        ]
      },
      {
        id: "java-beg-mod-2",
        title: "Module 2: Variables, Data Types & Type Casting",
        sequence_order: 2,
        description: "Master primitive types, reference types, and type conversion mechanics.",
        lessons: [
          {
            id: "java-2-1",
            title: "2.1 Primitive Data Types & Memory Sizes",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 60,
            description: "Explore 8 primitive data types in Java and their byte representations.",
            content: `### Java's 8 Primitive Types
Java strictly reserves memory sizes regardless of host operating system:
- **Integral:** \`byte\` (8-bit), \`short\` (16-bit), \`int\` (32-bit), \`long\` (64-bit)
- **Floating-point:** \`float\` (32-bit), \`double\` (64-bit)
- **Character:** \`char\` (16-bit Unicode)
- **Boolean:** \`boolean\` (true/false)

\`\`\`java
public class Main {
    public static void main(String[] args) {
        int count = 42;
        double price = 19.99;
        System.out.println("TOTAL:" + (count + (int)price));
    }
}
\`\`\``,
            challenge_data: {
              initialCode: `public class Main {\n    public static void main(String[] args) {\n        int count = 42;\n        int bonus = 8;\n        System.out.println("SUM:" + (count + bonus));\n    }\n}\n`,
              expectedOutput: "SUM:50",
              instructions: "Sum the integer variables count and bonus, then print 'SUM:50'."
            }
          },
          {
            id: "java-2-2",
            title: "2.2 Type Casting: Widening vs Narrowing",
            sequence_order: 2,
            content_type: "text",
            xp_reward: 50,
            description: "Understand implicit widening and explicit narrowing casts in Java.",
            content: `### Casting Rules in Java

- **Widening Casting (Automatic):** Smaller type to larger type size:
  \`byte\` $\\to$ \`short\` $\\to$ \`char\` $\\to$ \`int\` $\\to$ \`long\` $\\to$ \`float\` $\\to$ \`double\`. No data loss.
- **Narrowing Casting (Manual):** Larger type to smaller type size. Requires explicit cast syntax \`(type)\` and risks truncation or numeric overflow.`
          }
        ]
      },
      {
        id: "java-beg-mod-3",
        title: "Module 3: Control Flow & Decision Making",
        sequence_order: 3,
        description: "Branching with if-else, switch expressions, and loop constructs.",
        lessons: [
          {
            id: "java-3-1",
            title: "3.1 Conditionals & Enhanced Switch Expressions",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 65,
            description: "Utilize modern switch syntax with arrow labels to avoid fall-through bugs.",
            content: `### Modern Switch Expressions
Java 14+ introduced expression switches that return values and eliminate the need for verbose \`break\` statements:

\`\`\`java
int day = 3;
String type = switch (day) {
    case 1, 7 -> "WEEKEND";
    default -> "WEEKDAY";
};
\`\`\``,
            challenge_data: {
              initialCode: `public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 80) {\n            System.out.println("GRADE:A");\n        } else {\n            System.out.println("GRADE:B");\n        }\n    }\n}\n`,
              expectedOutput: "GRADE:A",
              instructions: "Evaluate the condition and output 'GRADE:A'."
            }
          },
          {
            id: "java-3-2",
            title: "3.2 Loops: For, While, and For-Each",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 70,
            description: "Iterate across collections and arrays using structured loops.",
            content: `### Loop Iteration in Java
Iterate over sequences using index-based \`for\` loops, conditional \`while\` loops, or the enhanced \`for-each\` loop:

\`\`\`java
int[] items = {10, 20, 30};
for (int item : items) {
    System.out.println(item);
}
\`\`\``,
            challenge_data: {
              initialCode: `public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) {\n            sum += i;\n        }\n        System.out.println("ACCUMULATED:" + sum);\n    }\n}\n`,
              expectedOutput: "ACCUMULATED:15",
              instructions: "Calculate the sum of numbers from 1 to 5 and print 'ACCUMULATED:15'."
            }
          }
        ]
      },
      {
        id: "java-beg-mod-4",
        title: "Module 4: Methods & Array Structures",
        sequence_order: 4,
        description: "Design modular methods with parameter passing and manage fixed-size arrays.",
        lessons: [
          {
            id: "java-4-1",
            title: "4.1 Method Signatures & Pass-by-Value",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Understand that Java is strictly Pass-by-Value for primitives and reference copies.",
            content: `### Methods & Pass-by-Value
In Java, arguments are **always passed by value**. When passing an object reference, a copy of the pointer address is passed, not the variable itself.

\`\`\`java
public class Calculator {
    public static int multiply(int a, int b) {
        return a * b;
    }
}
\`\`\``,
            challenge_data: {
              initialCode: `public class Main {\n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n    public static void main(String[] args) {\n        int res = multiply(6, 7);\n        System.out.println("PRODUCT:" + res);\n    }\n}\n`,
              expectedOutput: "PRODUCT:42",
              instructions: "Call the multiply method and output 'PRODUCT:42'."
            }
          },
          {
            id: "java-4-2",
            title: "4.2 Working with Arrays & Array Manipulation",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 75,
            description: "Declare, initialize, and traverse fixed-length arrays in memory.",
            content: `### Contiguous Arrays
Java arrays are objects stored in heap memory with fixed capacity determined at instantiation:

\`\`\`java
int[] nums = new int[]{5, 4, 3, 2, 1};
System.out.println("LENGTH:" + nums.length);
\`\`\``,
            challenge_data: {
              initialCode: `public class Main {\n    public static void main(String[] args) {\n        int[] vals = {3, 7, 2, 9};\n        int max = vals[0];\n        for (int v : vals) {\n            if (v > max) max = v;\n        }\n        System.out.println("MAX:" + max);\n    }\n}\n`,
              expectedOutput: "MAX:9",
              instructions: "Find the maximum value in the array and output 'MAX:9'."
            }
          }
        ]
      },
      {
        id: "java-beg-mod-5",
        title: "Module 5: Object-Oriented Foundations & Encapsulation",
        sequence_order: 5,
        description: "Design classes, instantiate objects, and protect state with encapsulation.",
        lessons: [
          {
            id: "java-5-1",
            title: "5.1 Classes, Constructors & Access Modifiers",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Encapsulate fields with private access and provide public getters and setters.",
            content: `### Encapsulation in OOP
Encapsulation bundles data and the methods that act on that data while restricting direct external access:

\`\`\`java
class User {
    private String username;
    
    public User(String username) {
        this.username = username;
    }
    
    public String getUsername() {
        return this.username;
    }
}
\`\`\``,
            challenge_data: {
              initialCode: `class User {\n    private String name;\n    public User(String name) { this.name = name; }\n    public String getName() { return this.name; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        User u = new User("ALEX");\n        System.out.println("USER:" + u.getName());\n    }\n}\n`,
              expectedOutput: "USER:ALEX",
              instructions: "Instantiate the encapsulated User and output 'USER:ALEX'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 2. JAVA INTERMEDIATE: CORE & COLLECTIONS
  // =========================================================================
  {
    id: "java-intermediate",
    slug: "java-intermediate",
    title: "Java Intermediate: Core & Collections",
    description: "Deep dive into Core Java architectures, Generics, Collections Framework, and algorithms. Grounded in enterprise Java engineering practices.",
    category: "Backend",
    level: "Intermediate",
    weeks: "12 Weeks",
    duration_hours: 48,
    lessons: 30,
    projects: 2,
    certificate: "ASCI Engineering Certificate",
    is_premium: false,
    tools: ["Java Collections", "Generics", "Streams API", "JUnit 5", "Lambdas"],
    highlights: [
      "Java Collections Framework: List, Set, Queue, and Map Implementations",
      "Type Erasure and Invariant vs Covariant Generics",
      "Functional Programming with Lambdas and the Streams API",
      "Robust Exception Handling and Resource Management (try-with-resources)",
      "Unit Testing and Mocking with JUnit 5 and AssertJ"
    ],
    modules: [
      {
        id: "java-int-mod-1",
        title: "Module 1: Polymorphism, Interfaces & Abstract Classes",
        sequence_order: 1,
        description: "Design scalable class hierarchies with dynamic method dispatch and interfaces.",
        lessons: [
          {
            id: "java-int-1-1",
            title: "1.1 Dynamic Method Dispatch & Overriding",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Implement runtime polymorphism where a superclass reference points to a subclass instance.",
            content: `### Runtime Polymorphism
When an overridden method is invoked through a superclass reference, Java determines which implementation to call at runtime based on the actual object type:

\`\`\`java
interface Service {
    String execute();
}
class BillingService implements Service {
    public String execute() { return "BILLING_PROCESSED"; }
}
\`\`\``,
            challenge_data: {
              initialCode: `interface Payment { String process(); }\nclass CardPayment implements Payment {\n    public String process() { return "CARD_OK"; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Payment p = new CardPayment();\n        System.out.println(p.process());\n    }\n}\n`,
              expectedOutput: "CARD_OK",
              instructions: "Execute runtime dispatch and print 'CARD_OK'."
            }
          }
        ]
      },
      {
        id: "java-int-mod-2",
        title: "Module 2: Java Collections Framework — List & Set",
        sequence_order: 2,
        description: "Compare ArrayList vs LinkedList and enforce uniqueness with HashSet.",
        lessons: [
          {
            id: "java-int-2-1",
            title: "2.1 ArrayList vs LinkedList Internal Mechanics",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Analyze array resizing amortization vs doubly-linked node pointer overhead.",
            content: `### List Tradeoffs
- **ArrayList:** Backed by a dynamic array. $O(1)$ indexed access, amortized $O(1)$ append. Slower $O(n)$ insertions at beginning.
- **LinkedList:** Backed by doubly-linked nodes. $O(1)$ prepend/append, but $O(n)$ traversal and high pointer memory overhead.

\`\`\`java
import java.util.*;
List<String> list = new ArrayList<>();
list.add("ALPHA");
list.add("BETA");
\`\`\``,
            challenge_data: {
              initialCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>();\n        items.add("NODE_A");\n        items.add("NODE_B");\n        System.out.println("SIZE:" + items.size());\n    }\n}\n`,
              expectedOutput: "SIZE:2",
              instructions: "Add elements to the ArrayList and print 'SIZE:2'."
            }
          }
        ]
      },
      {
        id: "java-int-mod-3",
        title: "Module 3: Map Architecture & Hashing",
        sequence_order: 3,
        description: "Master HashMap bucket arrays, hash collisions, and red-black tree conversion.",
        lessons: [
          {
            id: "java-int-3-1",
            title: "3.1 HashMap Internal Architecture & Load Factor",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Understand hash bucket indexing, hash collision chaining, and treeification.",
            content: `### Java's HashMap Architecture
Java's \`HashMap\` uses an array of Node buckets. The bucket index is calculated as:
\`index = (n - 1) & hash\`

When collisions exceed 8 nodes in a bucket, the chain converts to a balanced Red-Black Tree (TreeNode) keeping search bounded to $O(\\log n)$.

\`\`\`java
Map<String, Integer> map = new HashMap<>();
map.put("USERS", 1500);
System.out.println(map.get("USERS"));
\`\`\``,
            challenge_data: {
              initialCode: `import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> counts = new HashMap<>();\n        counts.put("ALPHA", 10);\n        counts.put("BETA", 25);\n        System.out.println("COUNT:" + (counts.get("ALPHA") + counts.get("BETA")));\n    }\n}\n`,
              expectedOutput: "COUNT:35",
              instructions: "Store key-value pairs in the HashMap, sum them, and print 'COUNT:35'."
            }
          }
        ]
      },
      {
        id: "java-int-mod-4",
        title: "Module 4: Generics & Type Safety",
        sequence_order: 4,
        description: "Prevent ClassCastException at runtime using compile-time generics and wildcards.",
        lessons: [
          {
            id: "java-int-4-1",
            title: "4.1 Generic Classes & Type Erasure",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Implement a generic container and observe type erasure behavior during bytecode compilation.",
            content: `### Generic Type Invariance
In Java, generics ensure type safety at compile time. At runtime, the JVM strips generic type metadata through **type erasure**, replacing unbound type parameters with \`Object\`.

\`\`\`java
class Box<T> {
    private T value;
    public Box(T value) { this.value = value; }
    public T getValue() { return value; }
}
\`\`\``,
            challenge_data: {
              initialCode: `class Box<T> {\n    private T item;\n    public Box(T item) { this.item = item; }\n    public T getItem() { return item; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box<String> box = new Box<>("PAYLOAD_OK");\n        System.out.println(box.getItem());\n    }\n}\n`,
              expectedOutput: "PAYLOAD_OK",
              instructions: "Retrieve the generic value from the Box and output 'PAYLOAD_OK'."
            }
          }
        ]
      },
      {
        id: "java-int-mod-5",
        title: "Module 5: Exception Handling & Resource Management",
        sequence_order: 5,
        description: "Handle checked vs unchecked exceptions and utilize try-with-resources for leak-proof cleanup.",
        lessons: [
          {
            id: "java-int-5-1",
            title: "5.1 Try-Catch-Finally & AutoCloseable",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Automatically close streams and connections implementing AutoCloseable.",
            content: `### Try-With-Resources
Introduced in Java 7, try-with-resources guarantees that any resource implementing \`java.lang.AutoCloseable\` is safely closed when the block exits, even if exceptions occur.

\`\`\`java
try (var stream = new ByteArrayInputStream("DATA".getBytes())) {
    System.out.println("READING");
}
\`\`\``,
            challenge_data: {
              initialCode: `public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 2;\n            System.out.println("RESULT:" + x);\n        } catch (ArithmeticException e) {\n            System.out.println("ERROR");\n        }\n    }\n}\n`,
              expectedOutput: "RESULT:5",
              instructions: "Safely execute the division inside try-catch and output 'RESULT:5'."
            }
          }
        ]
      },
      {
        id: "java-int-mod-6",
        title: "Module 6: Streams API & Lambda Expressions",
        sequence_order: 6,
        description: "Process collections declaratively with filter, map, flatMap, and reduce pipelines.",
        lessons: [
          {
            id: "java-int-6-1",
            title: "6.1 Stream Pipeline Transformations",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 95,
            description: "Transform and filter collections using functional method references.",
            content: `### Functional Java Streams
A Stream pipeline consists of a source, zero or more intermediate operations (lazy), and a terminal operation (eager).

\`\`\`java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
int sum = numbers.stream()
    .filter(n -> n % 2 == 0)
    .mapToInt(n -> n * 10)
    .sum();
System.out.println("SUM:" + sum);
\`\`\``,
            challenge_data: {
              initialCode: `import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of("alice", "bob", "alex");\n        long count = names.stream()\n            .filter(s -> s.startsWith("a"))\n            .count();\n        System.out.println("MATCHES:" + count);\n    }\n}\n`,
              expectedOutput: "MATCHES:2",
              instructions: "Filter names starting with 'a' and output 'MATCHES:2'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 3. JAVA ADVANCED: ARCHITECTURE & FRAMEWORKS
  // =========================================================================
  {
    id: "java-advanced",
    slug: "java-advanced",
    title: "Java Advanced: Architecture & Frameworks",
    description: "Design Patterns, Concurrency, JVM Internals, and Spring Boot for production-grade engineering.",
    category: "Backend",
    level: "Advanced",
    weeks: "14 Weeks",
    duration_hours: 60,
    lessons: 28,
    projects: 3,
    certificate: "ASCI Master Architect Credential",
    is_premium: true,
    tools: ["Spring Boot 3", "Java 21", "Virtual Threads", "JPA/Hibernate", "Docker", "PostgreSQL"],
    highlights: [
      "Modern Concurrency: Virtual Threads (Project Loom) & CompletableFuture",
      "JVM Tuning: Garbage Collection (ZGC, G1), JIT, and Heap Profiling",
      "Enterprise Gang-of-Four Design Patterns in Real Architectures",
      "Spring Boot 3 Core: Inversion of Control & Autowired Dependency Injection",
      "Production Database Persistence with Spring Data JPA & Hibernate Caching"
    ],
    modules: [
      {
        id: "java-adv-mod-1",
        title: "Module 1: Concurrency & Virtual Threads (Project Loom)",
        sequence_order: 1,
        description: "Scale to millions of concurrent tasks with Java 21 Virtual Threads.",
        lessons: [
          {
            id: "java-adv-1-1",
            title: "1.1 Platform Threads vs Virtual Threads",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Contrast OS-bound platform threads with user-mode virtual threads mounted on carrier threads.",
            content: `### High-Throughput Concurrency
Traditional platform threads wrap OS threads, each consuming ~1MB of memory and limited to thousands per machine. Java 21 **Virtual Threads** are lightweight user-mode threads managed directly by the JVM, enabling 1,000,000+ concurrent tasks.

\`\`\`java
Runnable task = () -> System.out.println("CONCURRENT_OK");
Thread.startVirtualThread(task);
\`\`\``,
            challenge_data: {
              initialCode: `public class Main {\n    public static void main(String[] args) {\n        Runnable r = () -> System.out.println("THREAD_EXECUTED");\n        Thread t = new Thread(r);\n        t.start();\n        try { t.join(); } catch (Exception e) {}\n    }\n}\n`,
              expectedOutput: "THREAD_EXECUTED",
              instructions: "Start the concurrent task, await completion, and print 'THREAD_EXECUTED'."
            }
          }
        ]
      },
      {
        id: "java-adv-mod-2",
        title: "Module 2: JVM Architecture & Garbage Collection Tuning",
        sequence_order: 2,
        description: "Master young/old generational memory, ZGC, G1GC, and JIT compilation.",
        lessons: [
          {
            id: "java-adv-2-1",
            title: "2.1 Generational Heap & GC Collectors",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 85,
            description: "Analyze Eden, Survivor spaces, Tenured generation, and ultra-low latency ZGC.",
            content: `### JVM Memory Layout

1. **Young Generation:** Composed of Eden and two Survivor spaces ($S_0, S_1$). Minor GC frees short-lived objects.
2. **Old (Tenured) Generation:** Objects surviving multiple GC cycles migrate here.
3. **Metaspace:** Stores class definitions and constant pools in native off-heap memory.

**Modern Garbage Collectors:**
- **G1GC:** Default general-purpose collector partitioning heap into uniform regions.
- **ZGC:** Sub-millisecond pause-time collector utilizing colored pointers and load barriers.`
          }
        ]
      },
      {
        id: "java-adv-mod-3",
        title: "Module 3: Enterprise Design Patterns",
        sequence_order: 3,
        description: "Implement Singleton, Factory, Builder, and Strategy patterns cleanly in modern Java.",
        lessons: [
          {
            id: "java-adv-3-1",
            title: "3.1 The Builder Pattern with Fluent API",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Construct complex immutable domain objects with method chaining.",
            content: `### Builder Pattern
The Builder pattern solves telescoping constructors and ensures immutability for objects with many optional attributes:

\`\`\`java
class Request {
    private final String url;
    private final int timeout;
    
    public static class Builder {
        private String url;
        private int timeout = 5000;
        public Builder url(String u) { this.url = u; return this; }
        public Request build() { return new Request(this); }
    }
}
\`\`\``,
            challenge_data: {
              initialCode: `class Config {\n    private final String host;\n    public Config(String host) { this.host = host; }\n    public String getHost() { return host; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Config c = new Config("prod.internal.asci.ai");\n        System.out.println("CONFIG_HOST:" + c.getHost());\n    }\n}\n`,
              expectedOutput: "CONFIG_HOST:prod.internal.asci.ai",
              instructions: "Instantiate the immutable Config and output 'CONFIG_HOST:prod.internal.asci.ai'."
            }
          }
        ]
      },
      {
        id: "java-adv-mod-4",
        title: "Module 4: Spring Boot 3 Core & Inversion of Control",
        sequence_order: 4,
        description: "Build reactive, cloud-native services with Spring ApplicationContext and Dependency Injection.",
        lessons: [
          {
            id: "java-adv-4-1",
            title: "4.1 Inversion of Control (IoC) & Component Scanning",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 95,
            description: "Understand Spring's IoC container, bean lifecycle, and dependency injection.",
            content: `### Inversion of Control
Instead of components manually instantiating their dependencies (\`new Service()\`), control is inverted to Spring's \`ApplicationContext\`.
- \`@Component\`, \`@Service\`, \`@Repository\`: Marks managed beans.
- Constructor Injection: Favored over field injection for testability and immutability.`
          }
        ]
      },
      {
        id: "java-adv-mod-5",
        title: "Module 5: Spring Data JPA, Hibernate & Transactions",
        sequence_order: 5,
        description: "Model relational database schemas with JPA entities and declarative @Transactional boundaries.",
        lessons: [
          {
            id: "java-adv-5-1",
            title: "5.1 Entity Relationships & N+1 Problem Prevention",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 100,
            description: "Optimize ORM queries with JOIN FETCH and understand first/second-level Hibernate caches.",
            content: `### Solving the N+1 Query Dilemma
When fetching a parent entity with lazy collection relationships, naive queries trigger 1 query for the parent plus $N$ queries for each child.
Use **JOIN FETCH** in JPQL or \`@EntityGraph\` to load associations in a single round-trip SQL statement.`
          }
        ]
      },
      {
        id: "java-adv-mod-6",
        title: "Module 6: Production REST APIs & Spring Security",
        sequence_order: 6,
        description: "Implement secure REST controllers with JWT validation and RFC 7807 problem details.",
        lessons: [
          {
            id: "java-adv-6-1",
            title: "6.1 REST Controller Endpoints & Input Validation",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 100,
            description: "Build robust REST APIs using @RestController, @Valid, and global exception advice.",
            content: `### Enterprise REST Principles
- **HTTP Semantics:** Idempotent GET, PUT, DELETE; non-idempotent POST.
- **DTO Projection:** Never expose JPA domain entities directly to API consumers.
- **Validation:** Use Jakarta Bean Validation (\`@NotNull\`, \`@Size\`, \`@Email\`).`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 4. DSA FOR BEGINNERS
  // =========================================================================
  {
    id: "dsa",
    slug: "dsa",
    title: "DSA for Beginners",
    description: "Start your DSA journey from scratch. Think algorithmically with flowcharts, patterns, and Big-O asymptotic analysis. Built on GeeksforGeeks foundational standards.",
    category: "DSA",
    level: "Beginner",
    weeks: "Self-Paced",
    duration_hours: 30,
    lessons: 24,
    projects: 1,
    certificate: "ASCI Algorithmic Badge",
    is_premium: false,
    tools: ["Python", "Java", "Big-O Notation", "Visualizer", "Pseudocode"],
    highlights: [
      "Asymptotic Analysis: Big-O, Big-Omega, and Big-Theta Notations",
      "Array Traversal, Memory Contiguity & In-Place Reversals",
      "Two-Pointer & Sliding Window Problem-Solving Patterns",
      "Recursion Mechanics: Stack Frames & Base Case Proofs",
      "Linear Search vs Binary Search Logarithmic Optimization"
    ],
    modules: [
      {
        id: "dsa-beg-mod-1",
        title: "Module 1: Algorithmic Thinking & Asymptotic Analysis",
        sequence_order: 1,
        description: "Analyze code efficiency mathematically using Big-O time and space complexity.",
        lessons: [
          {
            id: "dsa-1-1",
            title: "1.1 Introduction to Big-O Notation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Measure algorithmic growth rates from constant $O(1)$ to quadratic $O(n^2)$.",
            content: `### Understanding Computational Complexity
Big-O notation describes the upper bound on the time or memory space required by an algorithm as input size $n$ grows toward infinity:
- $O(1)$: Constant time (array lookup by index).
- $O(\\log n)$: Logarithmic time (binary search).
- $O(n)$: Linear time (single pass through array).
- $O(n \\log n)$: Linearithmic time (merge sort).
- $O(n^2)$: Quadratic time (nested comparison loops).

\`\`\`python
def find_first(arr):
    return arr[0]  # O(1)
\`\`\``,
            challenge_data: {
              initialCode: `def get_first_element(nums):\n    # Return the first element in O(1) time\n    return nums[0]\n\nprint("FIRST:", get_first_element([42, 99, 100]))\n`,
              expectedOutput: "FIRST: 42",
              instructions: "Return the first element of the list and print 'FIRST: 42'."
            }
          }
        ]
      },
      {
        id: "dsa-beg-mod-2",
        title: "Module 2: Arrays & Memory Contiguity",
        sequence_order: 2,
        description: "Explore cache locality, index arithmetic, and array reversal techniques.",
        lessons: [
          {
            id: "dsa-2-1",
            title: "2.1 In-Place Array Reversal",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 65,
            description: "Reverse an array in $O(n)$ time and $O(1)$ auxiliary space.",
            content: `### Two-Pointer In-Place Reversal
By maintaining a pointer at the start (\`left\`) and end (\`right\`), swap elements while converging toward the center:

\`\`\`python
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr
\`\`\``,
            challenge_data: {
              initialCode: `arr = [1, 2, 3, 4, 5]\n# Reverse in-place\narr.reverse()\nprint("REVERSED:", arr)\n`,
              expectedOutput: "REVERSED: [5, 4, 3, 2, 1]",
              instructions: "Reverse the array and print 'REVERSED: [5, 4, 3, 2, 1]'."
            }
          }
        ]
      },
      {
        id: "dsa-beg-mod-3",
        title: "Module 3: Strings & Two-Pointer Patterns",
        sequence_order: 3,
        description: "Apply symmetric scanning to validate palindromes and detect substrings.",
        lessons: [
          {
            id: "dsa-3-1",
            title: "3.1 Palindrome Verification Pattern",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Check if a string reads the same forwards and backwards in $O(n)$ time.",
            content: `### Palindrome Verification
Compare character characters from opposite ends of the string. If any mismatch occurs, terminate early with false:

\`\`\`python
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
\`\`\``,
            challenge_data: {
              initialCode: `def is_palindrome(word: str) -> bool:\n    return word == word[::-1]\n\nprint("RADAR:", is_palindrome("radar"))\n`,
              expectedOutput: "RADAR: True",
              instructions: "Check if 'radar' is a palindrome and output 'RADAR: True'."
            }
          }
        ]
      },
      {
        id: "dsa-beg-mod-4",
        title: "Module 4: Recursion & Mathematical Algorithms",
        sequence_order: 4,
        description: "Understand the call stack, base cases, and Euclid's Greatest Common Divisor.",
        lessons: [
          {
            id: "dsa-4-1",
            title: "4.1 Recursion Mechanics & Euclid's GCD",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Compute the Greatest Common Divisor using Euclid's recursive algorithm in $O(\\log(\\min(a, b)))$.",
            content: `### Euclidean Algorithm
The greatest common divisor of two integers $a$ and $b$ ($a > b$) equals the GCD of $b$ and $a \\pmod b$:
$$\\gcd(a, b) = \\gcd(b, a \\pmod b)$$
Base case: $\\gcd(a, 0) = a$.

\`\`\`python
def gcd(a: int, b: int) -> int:
    return a if b == 0 else gcd(b, a % b)
\`\`\``,
            challenge_data: {
              initialCode: `def gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n\nprint("GCD:", gcd(48, 18))\n`,
              expectedOutput: "GCD: 6",
              instructions: "Compute the GCD of 48 and 18 and print 'GCD: 6'."
            }
          }
        ]
      },
      {
        id: "dsa-beg-mod-5",
        title: "Module 5: Search Algorithms — Linear vs Binary Search",
        sequence_order: 5,
        description: "Transform $O(n)$ sequential search into $O(\\log n)$ divide-and-conquer binary search.",
        lessons: [
          {
            id: "dsa-5-1",
            title: "5.1 Binary Search on Sorted Arrays",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Halve the search space iteratively to find target elements in $O(\\log n)$.",
            content: `### Binary Search Principles
On an array sorted in ascending order, binary search compares the target with the middle element:
- If target == mid: return index.
- If target < mid: search left half (\`right = mid - 1\`).
- If target > mid: search right half (\`left = mid + 1\`).

\`\`\`python
def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
\`\`\``,
            challenge_data: {
              initialCode: `def binary_search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nidx = binary_search([10, 20, 30, 40, 50], 40)\nprint("INDEX:", idx)\n`,
              expectedOutput: "INDEX: 3",
              instructions: "Execute binary search to find target 40 at index 3 and print 'INDEX: 3'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 5. DSA INTERMEDIATE: CORE DATA STRUCTURES
  // =========================================================================
  {
    id: "dsa-intermediate",
    slug: "dsa-intermediate",
    title: "DSA Intermediate: Core Data Structures",
    description: "Master Trees, Graphs, Hash Tables, and Greedy algorithms that power scalable architectures. GeeksforGeeks intermediate syllabus.",
    category: "DSA",
    level: "Intermediate",
    weeks: "Self-Paced",
    duration_hours: 54,
    lessons: 32,
    projects: 2,
    certificate: "ASCI Algorithmic Badge",
    is_premium: false,
    tools: ["Linked Lists", "Binary Trees", "Graphs", "Hash Tables", "Heaps"],
    highlights: [
      "Linked List Pointer Manipulation: Cycle Detection & Inversion",
      "Stack & Queue Applications: Monotonic Stacks & BFS queues",
      "Hash Collision Resolution: Open Addressing vs Separate Chaining",
      "Binary Trees & BST Traversals: Inorder, Preorder, and Level-Order",
      "Graph Representations & Traversals: BFS Shortest Path & DFS Cycle Detection"
    ],
    modules: [
      {
        id: "dsa-int-mod-1",
        title: "Module 1: Singly & Doubly Linked Lists",
        sequence_order: 1,
        description: "Pointer manipulation, cycle detection (Floyd's Tortoise and Hare), and reversals.",
        lessons: [
          {
            id: "dsa-int-1-1",
            title: "1.1 Reversing a Singly Linked List",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Iteratively reverse node pointers in $O(n)$ time and $O(1)$ space.",
            content: `### Pointer Reversal
Keep track of three pointers: \`prev\`, \`curr\`, and \`next_temp\`. At each node, redirect \`curr.next = prev\`.

\`\`\`python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
\`\`\``,
            challenge_data: {
              initialCode: `class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\n# Create 1 -> 2 -> 3\nhead = Node(1, Node(2, Node(3)))\ncurr, prev = head, None\nwhile curr:\n    nxt = curr.next\n    curr.next = prev\n    prev = curr\n    curr = nxt\n\nprint("NEW_HEAD:", prev.val)\n`,
              expectedOutput: "NEW_HEAD: 3",
              instructions: "Reverse the 3-node list and print the new head value 'NEW_HEAD: 3'."
            }
          }
        ]
      },
      {
        id: "dsa-int-mod-2",
        title: "Module 2: Stacks & Queues",
        sequence_order: 2,
        description: "LIFO vs FIFO mechanics, valid parentheses checking, and sliding window maximum.",
        lessons: [
          {
            id: "dsa-int-2-1",
            title: "2.1 Balanced Parentheses Matching with Stack",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Validate bracket balancing using a Last-In, First-Out (LIFO) stack.",
            content: `### Stack Bracket Verification
Push opening brackets onto the stack. When a closing bracket is encountered, verify that the top element of the stack matches the expected pair.

\`\`\`python
def is_valid_brackets(s: str) -> bool:
    mapping = {")": "(", "}": "{", "]": "["}
    stack = []
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else '#'
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack
\`\`\``,
            challenge_data: {
              initialCode: `def is_valid(s):\n    pairs = {")": "(", "]": "["}\n    stack = []\n    for ch in s:\n        if ch in pairs.values():\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return len(stack) == 0\n\nprint("BALANCED:", is_valid("()[[]]"))\n`,
              expectedOutput: "BALANCED: True",
              instructions: "Check if the bracket sequence is valid and print 'BALANCED: True'."
            }
          }
        ]
      },
      {
        id: "dsa-int-mod-3",
        title: "Module 3: Hash Tables & Collision Strategies",
        sequence_order: 3,
        description: "Internal mechanics of hash functions, load factors, separate chaining, and open addressing.",
        lessons: [
          {
            id: "dsa-int-3-1",
            title: "3.1 Two-Sum via Hash Map Lookup",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Achieve $O(n)$ time complexity for Two-Sum using a complement hash table.",
            content: `### Hash Table Lookup Optimization
Instead of $O(n^2)$ nested loops, store each number's index in a hash map. For each element $x$, check if target $- x$ already exists in the table in $O(1)$ average time.

\`\`\`python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
\`\`\``,
            challenge_data: {
              initialCode: `def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen:\n            return [seen[diff], i]\n        seen[n] = i\n\nres = two_sum([2, 7, 11, 15], 9)\nprint("INDICES:", res)\n`,
              expectedOutput: "INDICES: [0, 1]",
              instructions: "Find the indices summing to target 9 and print 'INDICES: [0, 1]'."
            }
          }
        ]
      },
      {
        id: "dsa-int-mod-4",
        title: "Module 4: Binary Trees & Tree Traversals",
        sequence_order: 4,
        description: "Master Inorder, Preorder, Postorder, and Breadth-First Level-Order traversals.",
        lessons: [
          {
            id: "dsa-int-4-1",
            title: "4.1 Level-Order Traversal (BFS) using Queue",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Traverse tree nodes level by level using a FIFO queue.",
            content: `### Level-Order Traversal
Breadth-First Search (BFS) explores tree nodes row by row:
1. Enqueue the root.
2. While queue is not empty, dequeue node, visit it, and enqueue non-null left and right children.

\`\`\`python
from collections import deque
def level_order(root):
    if not root: return []
    res, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        res.append(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    return res
\`\`\``,
            challenge_data: {
              initialCode: `from collections import deque\nclass TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nroot = TreeNode(1, TreeNode(2), TreeNode(3))\nres = []\nq = deque([root])\nwhile q:\n    node = q.popleft()\n    res.append(node.val)\n    if node.left: q.append(node.left)\n    if node.right: q.append(node.right)\n\nprint("TRAVERSAL:", res)\n`,
              expectedOutput: "TRAVERSAL: [1, 2, 3]",
              instructions: "Execute BFS level order traversal and print 'TRAVERSAL: [1, 2, 3]'."
            }
          }
        ]
      },
      {
        id: "dsa-int-mod-5",
        title: "Module 5: Binary Search Trees (BST)",
        sequence_order: 5,
        description: "Search, insertion, deletion, and validation of the Binary Search Tree invariant.",
        lessons: [
          {
            id: "dsa-int-5-1",
            title: "5.1 Validate Binary Search Tree Invariant",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Ensure all left descendants are strictly less than root, and right descendants strictly greater.",
            content: `### BST Invariant
For every node $N$ with lower bound $L$ and upper bound $H$:
$$L < N.\\text{val} < H$$

\`\`\`python
def isValidBST(root, low=float('-inf'), high=float('inf')):
    if not root: return True
    if not (low < root.val < high): return False
    return isValidBST(root.left, low, root.val) and isValidBST(root.right, root.val, high)
\`\`\``,
            challenge_data: {
              initialCode: `class Node:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_valid_bst(node, low=float('-inf'), high=float('inf')):\n    if not node: return True\n    if not (low < node.val < high): return False\n    return is_valid_bst(node.left, low, node.val) and is_valid_bst(node.right, node.val, high)\n\ntree = Node(2, Node(1), Node(3))\nprint("VALID_BST:", is_valid_bst(tree))\n`,
              expectedOutput: "VALID_BST: True",
              instructions: "Validate the BST tree and print 'VALID_BST: True'."
            }
          }
        ]
      },
      {
        id: "dsa-int-mod-6",
        title: "Module 6: Heaps & Priority Queues",
        sequence_order: 6,
        description: "Binary heaps, heapify operations, and finding Top-K elements in $O(n \\log k)$.",
        lessons: [
          {
            id: "dsa-int-6-1",
            title: "6.1 Min-Heap Top-K Elements",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 95,
            description: "Maintain a min-heap of size $k$ to identify the $k$ largest elements in streaming data.",
            content: `### Min-Heap Top-K Pattern
By keeping a Min-Heap capped at capacity $k$, smaller elements are popped off the top in $O(\\log k)$, leaving the $k$ largest values:

\`\`\`python
import heapq
def findKthLargest(nums, k):
    return heapq.nlargest(k, nums)[-1]
\`\`\``,
            challenge_data: {
              initialCode: `import heapq\nnums = [3, 2, 1, 5, 6, 4]\nk = 2\nheap = []\nfor n in nums:\n    heapq.heappush(heap, n)\n    if len(heap) > k:\n        heapq.heappop(heap)\nprint("KTH_LARGEST:", heap[0])\n`,
              expectedOutput: "KTH_LARGEST: 5",
              instructions: "Find the 2nd largest element using a min-heap and output 'KTH_LARGEST: 5'."
            }
          }
        ]
      },
      {
        id: "dsa-int-mod-7",
        title: "Module 7: Graphs — Representations & Traversals",
        sequence_order: 7,
        description: "Adjacency list representations, Breadth-First Search (BFS), and Depth-First Search (DFS).",
        lessons: [
          {
            id: "dsa-int-7-1",
            title: "7.1 Graph BFS Shortest Path in Unweighted Graph",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Find the minimum number of edge hops between source and target vertices using BFS.",
            content: `### Unweighted Shortest Path with BFS
BFS explores vertices in order of increasing distance from the starting node, guaranteeing the first time target $T$ is dequeued, it is reached in minimum edges:

\`\`\`python
from collections import deque
def bfs_shortest_path(graph, start, target):
    queue = deque([(start, 0)])
    visited = {start}
    while queue:
        curr, dist = queue.popleft()
        if curr == target: return dist
        for neighbor in graph.get(curr, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1
\`\`\``,
            challenge_data: {
              initialCode: `from collections import deque\ngraph = {\n    "A": ["B", "C"],\n    "B": ["D"],\n    "C": ["D"],\n    "D": []\n}\nq = deque([("A", 0)])\nvisited = {"A"}\nfound_dist = -1\nwhile q:\n    curr, dist = q.popleft()\n    if curr == "D":\n        found_dist = dist\n        break\n    for nxt in graph[curr]:\n        if nxt not in visited:\n            visited.add(nxt)\n            q.append((nxt, dist + 1))\n\nprint("SHORTEST_DIST:", found_dist)\n`,
              expectedOutput: "SHORTEST_DIST: 2",
              instructions: "Compute the shortest path distance from A to D and print 'SHORTEST_DIST: 2'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 6. DSA ADVANCED: ALGORITHMIC PARADIGMS
  // =========================================================================
  {
    id: "dsa-advanced",
    slug: "dsa-advanced",
    title: "DSA Advanced: Algorithmic Paradigms",
    description: "Conquer Dynamic Programming, Advanced Graph theory, Trie data structures, and FAANG-caliber interview problems.",
    category: "DSA",
    level: "Advanced",
    weeks: "Self-Paced",
    duration_hours: 60,
    lessons: 30,
    projects: 3,
    certificate: "ASCI Master Algorithmic Fellow",
    is_premium: true,
    tools: ["Dynamic Programming", "Dijkstra", "Bellman-Ford", "Trie", "Segment Trees", "DSU"],
    highlights: [
      "Dynamic Programming: State Space Reduction, 1D & 2D Tabulation",
      "Shortest Paths & Spanning Trees: Dijkstra, Bellman-Ford, Kruskal, and Prim",
      "Backtracking: State Pruning on N-Queens and Constraint Satisfaction",
      "Prefix Trees (Trie) for Autocomplete and Fast String Matching",
      "Disjoint Set Union (DSU) with Path Compression and Union by Rank"
    ],
    modules: [
      {
        id: "dsa-adv-mod-1",
        title: "Module 1: Dynamic Programming — 1D & Memoization",
        sequence_order: 1,
        description: "Deconstruct overlapping subproblems and optimal substructure into memoized solutions.",
        lessons: [
          {
            id: "dsa-adv-1-1",
            title: "1.1 Coin Change Minimum Coins (Tabulation)",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Solve the unbounded coin change problem in $O(n \\times \\text{amount})$ using 1D DP tabulation.",
            content: `### 1D DP State Definition
Let $dp[i]$ denote the minimum coins needed to form amount $i$:
$$dp[i] = \\min_{c \\in coins} (dp[i - c] + 1) \\quad \\text{for } i \\ge c$$
Base case: $dp[0] = 0$.

\`\`\`python
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i >= c:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1
\`\`\``,
            challenge_data: {
              initialCode: `coins = [1, 2, 5]\namount = 11\ndp = [float('inf')] * (amount + 1)\ndp[0] = 0\nfor i in range(1, amount + 1):\n    for c in coins:\n        if i >= c:\n            dp[i] = min(dp[i], dp[i - c] + 1)\nprint("MIN_COINS:", dp[amount])\n`,
              expectedOutput: "MIN_COINS: 3",
              instructions: "Compute the minimum coins needed to make 11 and print 'MIN_COINS: 3'."
            }
          }
        ]
      },
      {
        id: "dsa-adv-mod-2",
        title: "Module 2: 2D Dynamic Programming — 0/1 Knapsack",
        sequence_order: 2,
        description: "Analyze item inclusion/exclusion state transitions in multidimensional DP.",
        lessons: [
          {
            id: "dsa-adv-2-1",
            title: "2.1 The Classic 0/1 Knapsack Problem",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 110,
            description: "Maximize value within weight constraint $W$ using state $dp[i][w]$.",
            content: `### 0/1 Knapsack Transition
At item $i$ with weight $w_i$ and value $v_i$:
$$dp[i][w] = \\max(dp[i-1][w], dp[i-1][w - w_i] + v_i)$$

\`\`\`python
def knapsack(weights, values, W):
    n = len(weights)
    dp = [0] * (W + 1)
    for i in range(n):
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[W]
\`\`\``,
            challenge_data: {
              initialCode: `weights = [2, 3, 4, 5]\nvalues = [3, 4, 5, 6]\nW = 5\ndp = [0] * (W + 1)\nfor w_i, v_i in zip(weights, values):\n    for w in range(W, w_i - 1, -1):\n        dp[w] = max(dp[w], dp[w - w_i] + v_i)\nprint("MAX_VALUE:", dp[W])\n`,
              expectedOutput: "MAX_VALUE: 7",
              instructions: "Calculate the maximum knapsack value for weight 5 and print 'MAX_VALUE: 7'."
            }
          }
        ]
      },
      {
        id: "dsa-adv-mod-3",
        title: "Module 3: Advanced Graph Algorithms — Shortest Paths & MST",
        sequence_order: 3,
        description: "Dijkstra's priority-queue shortest path, Bellman-Ford negative edge handling, and Kruskal's MST.",
        lessons: [
          {
            id: "dsa-adv-3-1",
            title: "3.1 Dijkstra's Shortest Path Algorithm",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 120,
            description: "Compute single-source shortest path on non-negative weighted graphs in $O((V + E) \\log V)$.",
            content: `### Dijkstra with Min-Priority Queue
Maintain tentative distances initialized to $\\infty$. Relax edges greedily using a binary heap:

\`\`\`python
import heapq
def dijkstra(graph, start):
    distances = {node: float('inf') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    while pq:
        dist, node = heapq.heappop(pq)
        if dist > distances[node]: continue
        for neighbor, weight in graph[node]:
            new_d = dist + weight
            if new_d < distances[neighbor]:
                distances[neighbor] = new_d
                heapq.heappush(pq, (new_d, neighbor))
    return distances
\`\`\``,
            challenge_data: {
              initialCode: `import heapq\ngraph = {\n    "A": [("B", 1), ("C", 4)],\n    "B": [("C", 2), ("D", 5)],\n    "C": [("D", 1)],\n    "D": []\n}\ndistances = {k: float('inf') for k in graph}\ndistances["A"] = 0\npq = [(0, "A")]\nwhile pq:\n    d, u = heapq.heappop(pq)\n    if d > distances[u]: continue\n    for v, w in graph[u]:\n        if d + w < distances[v]:\n            distances[v] = d + w\n            heapq.heappush(pq, (d + w, v))\nprint("DIST_A_TO_D:", distances["D"])\n`,
              expectedOutput: "DIST_A_TO_D: 4",
              instructions: "Compute Dijkstra shortest path from A to D and output 'DIST_A_TO_D: 4'."
            }
          }
        ]
      },
      {
        id: "dsa-adv-mod-4",
        title: "Module 4: Backtracking & State Space Pruning",
        sequence_order: 4,
        description: "Exhaustive exploration with pruning: N-Queens problem and Sudoku solver.",
        lessons: [
          {
            id: "dsa-adv-4-1",
            title: "4.1 N-Queens Backtracking Solver",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 110,
            description: "Place $N$ non-attacking queens on an $N \\times N$ board using column and diagonal bitmasks.",
            content: `### Backtracking Search Space
Place queens row by row. At each step, prune branches if the column, main diagonal ($r - c$), or anti-diagonal ($r + c$) is already occupied:

\`\`\`python
def solveNQueens(n):
    cols, diag1, diag2 = set(), set(), set()
    count = 0
    def backtrack(r):
        nonlocal count
        if r == n:
            count += 1
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2:
                continue
            cols.add(c); diag1.add(r - c); diag2.add(r + c)
            backtrack(r + 1)
            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
    backtrack(0)
    return count
\`\`\``,
            challenge_data: {
              initialCode: `def count_n_queens(n):\n    cols, d1, d2 = set(), set(), set()\n    ans = [0]\n    def solve(r):\n        if r == n:\n            ans[0] += 1\n            return\n        for c in range(n):\n            if c in cols or (r-c) in d1 or (r+c) in d2: continue\n            cols.add(c); d1.add(r-c); d2.add(r+c)\n            solve(r + 1)\n            cols.remove(c); d1.remove(r-c); d2.remove(r+c)\n    solve(0)\n    return ans[0]\n\nprint("4_QUEENS_SOLUTIONS:", count_n_queens(4))\n`,
              expectedOutput: "4_QUEENS_SOLUTIONS: 2",
              instructions: "Count total distinct solutions for 4-Queens and print '4_QUEENS_SOLUTIONS: 2'."
            }
          }
        ]
      },
      {
        id: "dsa-adv-mod-5",
        title: "Module 5: Trie (Prefix Tree) & Advanced String Search",
        sequence_order: 5,
        description: "Implement retrieval trees (Tries) for instant $O(L)$ prefix matching and autocomplete.",
        lessons: [
          {
            id: "dsa-adv-5-1",
            title: "5.1 Trie Insert and Prefix Search",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Build a Trie where search time depends only on word length $L$, independent of dictionary size.",
            content: `### Trie Architecture
A Trie is an $n$-ary tree where edges represent characters. Nodes maintain a flag \`is_end\` denoting word termination:

\`\`\`python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word: str):
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True
\`\`\``,
            challenge_data: {
              initialCode: `class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word):\n        curr = self.root\n        for ch in word:\n            if ch not in curr.children:\n                curr.children[ch] = TrieNode()\n            curr = curr.children[ch]\n        curr.is_end = True\n    def startsWith(self, prefix):\n        curr = self.root\n        for ch in prefix:\n            if ch not in curr.children:\n                return False\n            curr = curr.children[ch]\n        return True\n\nt = Trie()\nt.insert("apple")\nprint("PREFIX_APP:", t.startsWith("app"))\n`,
              expectedOutput: "PREFIX_APP: True",
              instructions: "Insert 'apple' into the Trie, check if prefix 'app' exists, and print 'PREFIX_APP: True'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 7: LARGE-SCALE DISTRIBUTED SYSTEM DESIGN & ARCHITECTURE 2026
  // =========================================================================
  {
    id: "system-design-distributed",
    slug: "system-design-distributed",
    title: "Large-Scale Distributed System Design & Architecture 2026",
    description: "Design high-availability systems scaling to 100M+ DAU: CAP theorem, Consistent Hashing, distributed transactions (Saga), Redis caching, and Kafka event streaming.",
    category: "Backend",
    level: "Advanced",
    weeks: "12 Weeks",
    duration_hours: 60,
    lessons: 35,
    projects: 4,
    certificate: "Principal Systems Architect Credential",
    is_premium: true,
    tools: ["System Architecture", "Redis", "Kafka", "PostgreSQL Sharding", "Envoy L7", "Zookeeper"],
    highlights: [
      "The Scalability Foundation: Latency vs Throughput, Availability (99.999%), and CAP/PACELC",
      "Consistent Hashing & Virtual Nodes for Zero-Downtime Cache & Database Cluster Scaling",
      "High-Throughput Caching Topologies: Cache-Aside, Write-Through, Write-Behind & Thundering Herd",
      "Database Partitioning: Range, Hash & List Sharding with Distributed Consensus (Raft/Paxos)",
      "Event-Driven Microservices with Apache Kafka: Partition Keys, Consumer Groups & Exactly-Once"
    ],
    modules: [
      {
        id: "sys-mod-1",
        title: "Module 1: Consistent Hashing & Ring Partitions",
        sequence_order: 1,
        description: "Distribute keys across dynamically autoscaling server clusters with minimal key remapping.",
        lessons: [
          {
            id: "sys-1-1",
            title: "1.1 Consistent Hashing with Virtual Nodes",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 95,
            description: "Map servers onto a $2^{32}-1$ integer ring. On server addition, only $\\frac{K}{N}$ keys rehash.",
            content: `### Consistent Hashing Ring
In naive mod hashing (\`hash(key) % N\`), adding 1 node forces nearly 100% of keys to move, triggering cache stampedes. Consistent hashing assigns nodes and keys to positions on a circle, moving only $\\frac{1}{N}$ of keys when nodes join or leave.`,
            challenge_data: {
              initialCode: `total_keys = 10000\nnum_nodes = 10\n# When 1 node is added, only 1/(N+1) keys rehash\nkeys_moved = int(total_keys / (num_nodes + 1))\nprint("KEYS_MOVED:", keys_moved)\n`,
              expectedOutput: "KEYS_MOVED: 909",
              instructions: "Calculate keys remapped in consistent hashing and output 'KEYS_MOVED: 909'."
            }
          }
        ]
      },
      {
        id: "sys-mod-2",
        title: "Module 2: Distributed Caching & Cache Invalidation",
        sequence_order: 2,
        description: "Cache-aside pattern, Least Recently Used (LRU) evictions, and cache stampede mitigations.",
        lessons: [
          {
            id: "sys-2-1",
            title: "2.1 Cache Hit Ratio & Latency Amortization",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Calculate effective latency: $\\text{Latency}_{eff} = (H \\times L_{cache}) + ((1-H) \\times L_{db})$.",
            content: `### Amortized Latency Equation
For a 95% cache hit ratio ($H = 0.95$), cache read latency 1ms, and database latency 50ms:
$$\\text{Latency}_{eff} = (0.95 \\times 1\\text{ms}) + (0.05 \\times 50\\text{ms}) = 3.45\\text{ms}$$`,
            challenge_data: {
              initialCode: `h = 0.95\nl_cache = 1.0\nl_db = 50.0\neff_latency = (h * l_cache) + ((1 - h) * l_db)\nprint("EFF_LATENCY_MS:", round(eff_latency, 2))\n`,
              expectedOutput: "EFF_LATENCY_MS: 3.45",
              instructions: "Compute effective latency and print 'EFF_LATENCY_MS: 3.45'."
            }
          }
        ]
      },
      {
        id: "sys-mod-3",
        title: "Module 3: Distributed Transactions & The Saga Pattern",
        sequence_order: 3,
        description: "Orchestrate multi-service financial payments across asynchronous boundaries with compensating steps.",
        lessons: [
          {
            id: "sys-3-1",
            title: "3.1 Orchestrated Saga with Compensating Transactions",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Rollback distributed state across microservices when a downstream service fails.",
            content: `### Compensating Transactions
Two-Phase Commit (2PC) blocks resources and fails at scale. Sagas execute a sequence of local transactions: if Step 3 fails, the orchestrator invokes Compensating Actions for Step 2 and Step 1 in reverse order.`,
            challenge_data: {
              initialCode: `steps = ["CHARGE_CARD", "RESERVE_INVENTORY", "DISPATCH_RIDE"]\nfailed_at = "DISPATCH_RIDE"\n# Compensate in reverse order\ncompensations = ["CANCEL_INVENTORY", "REFUND_CARD"]\nprint("COMPENSATIONS:", compensations)\n`,
              expectedOutput: "COMPENSATIONS: ['CANCEL_INVENTORY', 'REFUND_CARD']",
              instructions: "Simulate backward compensation chain and output 'COMPENSATIONS: ['CANCEL_INVENTORY', 'REFUND_CARD']'."
            }
          }
        ]
      }
    ]
  }
]

