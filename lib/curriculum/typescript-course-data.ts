import { CoursePart } from "./c-course-data"

export const TYPESCRIPT_COURSE_PARTS: CoursePart[] = [
  {
    id: "ts-part-1",
    title: "Part 1: TypeScript Fundamentals & Type Annotations",
    badge: "Beginner",
    description: "Learn why TypeScript is the industry standard: static types, type inference, primitives, and function signatures.",
    chapters: [
      {
        id: "ts-ch-1",
        title: "Introduction & Basic Types",
        level: "Beginner",
        lessons: [
          {
            id: "ts-1-1",
            title: "TypeScript Introduction & Static Typing",
            slug: "ts-intro",
            level: "Beginner",
            language: "typescript",
            tldr: "TypeScript is a strongly typed superset of JavaScript that catches errors at compile time before running code in production.",
            description: "JavaScript is dynamically typed—variables can change from numbers to strings at runtime, causing bugs. TypeScript adds an optional type system on top of JavaScript. The TypeScript compiler (tsc) validates your code during development and strips away the types, emitting clean, standard JavaScript that runs everywhere.",
            code: `// Explicit type annotations in TypeScript
let studentName: string = "Ada Lovelace";
let age: number = 24;
let isEnrolled: boolean = true;

// Type inference: TypeScript knows 'score' is a number!
let score = 98.5;

function calculateGrade(points: number): string {
  if (points >= 90) return "Grade: A (Distinction)";
  return "Grade: Pass";
}

console.log(\`Student: \${studentName}\`);
console.log(calculateGrade(score));`,
            output: "Student: Ada Lovelace\nGrade: A (Distinction)",
            visualDiagramTitle: "TypeScript Compilation & Type-Checking Pipeline",
            visualDiagram: `[TypeScript Code (.ts)] ──tsc Compiler Type Checker──> [Type Errors Flagged in Editor]
                                     │
                             (Types Stripped Clean)
                                     ▼
                        [Pure JavaScript Output (.js)] ──> [Node.js / Browser Runtime]`,
            lineExplanations: [
              { line: "let studentName: string", explanation: "Type annotation explicitly restricting studentName to text strings." },
              { line: "function calculateGrade(points: number): string", explanation: "Guarantees parameter must be a number and return value must be a string." },
              { line: "let score = 98.5;", explanation: "Type inference automatically assigns the number type without manual annotation." }
            ],
            keyPoints: [
              "TypeScript types exist only during compile time; they have zero runtime overhead.",
              "Type inference means you do not need to annotate every single trivial variable.",
              "Catches typos, missing properties, and null pointer exceptions before deploying."
            ],
            quiz: {
              question: "What happens to TypeScript type annotations when code is compiled to JavaScript?",
              options: ["They are converted to runtime typeof checks", "They are completely erased (stripped)", "They are stored in cookies", "They run on a separate thread"],
              correctIndex: 1,
              explanation: "TypeScript uses type erasure: all type annotations are stripped away during compilation, emitting pure standard JavaScript."
            }
          },
          {
            id: "ts-1-2",
            title: "Arrays, Tuples & Function Signatures",
            slug: "ts-arrays-tuples",
            level: "Beginner",
            language: "typescript",
            tldr: "Define typed collections with Array<T> and fixed-length, heterogeneously typed sequences with Tuples.",
            description: "Arrays in TypeScript can be typed as number[] or string[]. Tuples take this further by specifying exact fixed lengths and distinct types for each index position, perfect for coordinates [x, y] or key-value pairs.",
            code: `// Typed Arrays
const techStack: string[] = ["TypeScript", "Next.js", "TailwindCSS"];

// Tuple: Exactly 2 elements [latitude, longitude]
let coordinates: [number, number] = [37.7749, -122.4194];

// Typed Object with optional property (?)
interface Developer {
  id: number;
  name: string;
  githubHandle?: string; // Optional!
}

const leadDev: Developer = {
  id: 101,
  name: "Grace Hopper"
};

console.log("Primary Language:", techStack[0]);
console.log(\`Lat: \${coordinates[0]}, Lng: \${coordinates[1]}\`);
console.log("Lead Dev:", leadDev.name);`,
            output: "Primary Language: TypeScript\nLat: 37.7749, Lng: -122.4194\nLead Dev: Grace Hopper",
            visualDiagramTitle: "Array vs Tuple Memory Specification",
            visualDiagram: `[string[] Array] ──Variable Length──> ["TypeScript", "Next.js", "TailwindCSS", ...]
[[number, number] Tuple] ──Strict Length: 2──> [Index 0: number, Index 1: number]`,
            lineExplanations: [
              { line: "techStack: string[]", explanation: "Array strictly restricted to string elements only." },
              { line: "coordinates: [number, number]", explanation: "Tuple enforcing exactly two numerical elements in fixed order." },
              { line: "githubHandle?: string;", explanation: "Optional property indicated by question mark (?); can be undefined." }
            ],
            keyPoints: [
              "Tuples are used heavily in React hooks like [state, setState] = useState().",
              "ReadonlyArray<T> prevents accidental array mutations like push() or pop().",
              "Optional properties (? ) prevent runtime undefined access errors."
            ],
            quiz: {
              question: "What is the key difference between a standard array (number[]) and a tuple ([number, string])?",
              options: ["Tuples only work in backend code", "Tuples have fixed lengths and predetermined types at each position", "Arrays cannot contain numbers", "There is no difference"],
              correctIndex: 1,
              explanation: "Tuples enforce a strict, fixed number of elements with specific types assigned to each index."
            }
          }
        ]
      }
    ]
  },
  {
    id: "ts-part-2",
    title: "Part 2: Interfaces, Unions & Generic Programming",
    badge: "Intermediate",
    description: "Shape complex data contracts with interfaces, discriminated unions, and reusable type-safe Generics.",
    chapters: [
      {
        id: "ts-ch-2",
        title: "Advanced Types & Generics",
        level: "Intermediate",
        lessons: [
          {
            id: "ts-2-1",
            title: "Interfaces vs Type Aliases & Union Narrowing",
            slug: "ts-interfaces-unions",
            level: "Intermediate",
            language: "typescript",
            tldr: "Interfaces define object contracts; Discriminated Unions model state machines with compile-time exhaustiveness.",
            description: "TypeScript allows defining contracts with both 'interface' and 'type'. Interfaces support declaration merging and OOP inheritance (extends). Discriminated unions combine multiple types using a shared literal discriminant field (like type: 'success' | 'error'), allowing automatic type narrowing inside switch blocks.",
            code: `// Discriminated Union representing network state
type ApiResponse = 
  | { status: "loading" }
  | { status: "success"; data: { username: string; email: string } }
  | { status: "error"; message: string };

function renderResponse(res: ApiResponse): string {
  switch (res.status) {
    case "loading":
      return "Loading spinner active...";
    case "success":
      // TypeScript automatically narrows res to the success object!
      return \`Welcome back, \${res.data.username} (\${res.data.email})\`;
    case "error":
      return \`Error encountered: \${res.message}\`;
  }
}

const testResponse: ApiResponse = {
  status: "success",
  data: { username: "alan_turing", email: "alan@bletchley.org" }
};

console.log(renderResponse(testResponse));`,
            output: "Welcome back, alan_turing (alan@bletchley.org)",
            visualDiagramTitle: "Discriminated Union Type Narrowing Flowchart",
            visualDiagram: `[ApiResponse Variable] ──switch(res.status)──>
      ├── Case "loading" ──> Narrowed to { status: "loading" }
      ├── Case "success" ──> Narrowed to { status: "success", data: {...} }
      └── Case "error"   ──> Narrowed to { status: "error", message: string }`,
            lineExplanations: [
              { line: "type ApiResponse = | ...", explanation: "Union of mutually exclusive object shapes." },
              { line: 'case "success":', explanation: "TypeScript control-flow analysis automatically narrows type inside this branch." },
              { line: "res.data.username", explanation: "Safely accessed without optional chaining because TypeScript proved status is 'success'." }
            ],
            keyPoints: [
              "Discriminated unions eliminate impossible state combinations in web applications.",
              "Use interfaces for public object APIs that users might extend.",
              "Use 'never' type in default case to enforce compile-time exhaustiveness checking."
            ],
            quiz: {
              question: "What is the common property in a Discriminated Union used to distinguish between shapes called?",
              options: ["Primary key", "Discriminant (tag)", "Inheritance flag", "Namespace"],
              correctIndex: 1,
              explanation: "The discriminant (or tag) is a common literal property present across all union variants used for type narrowing."
            }
          },
          {
            id: "ts-2-2",
            title: "TypeScript Generics (<T>)",
            slug: "ts-generics",
            level: "Intermediate",
            language: "typescript",
            tldr: "Generics allow authoring reusable functions and classes that work with any type while preserving strict type safety.",
            description: "Instead of writing separate functions for numbers, strings, and custom objects, or resorting to the dangerous 'any' type, Generics introduce type variables like <T>. The caller specifies or lets TypeScript infer the type, retaining full autocompletion and compiler safety.",
            code: `// Generic ApiResponse wrapper working with ANY payload type T
interface ResultEnvelope<T> {
  success: boolean;
  timestamp: string;
  payload: T;
}

// Generic function with constraint (T must have an id number)
function extractId<T extends { id: number }>(item: T): number {
  return item.id;
}

const userEnvelope: ResultEnvelope<{ id: number; name: string }> = {
  success: true,
  timestamp: "2026-09-12T00:00:00Z",
  payload: { id: 404, name: "System Kernel" }
};

console.log("Success status:", userEnvelope.success);
console.log("Extracted Entity ID:", extractId(userEnvelope.payload));`,
            output: "Success status: true\nExtracted Entity ID: 404",
            visualDiagramTitle: "Generic Type Parameter Propagation Pipeline",
            visualDiagram: `[ResultEnvelope<T>] ──Passed <User> Type──> [Enforces payload: User] ──> [Returns strictly typed User object]`,
            lineExplanations: [
              { line: "interface ResultEnvelope<T>", explanation: "Defines generic container parameterized by type T." },
              { line: "function extractId<T extends { id: number }>", explanation: "Generic constraint ensuring type T contains at least an id number property." }
            ],
            keyPoints: [
              "Generics avoid type-casting and eliminate the unsafe 'any' keyword.",
              "Multiple type parameters can be specified: <T, U, V>.",
              "Generic constraints (<T extends Shape>) prevent passing invalid structures."
            ],
            quiz: {
              question: "Why should you use Generics instead of the 'any' type in TypeScript?",
              options: ["Generics make code compile to C++", "Generics retain strict type checking and autocompletion while remaining reusable", "any is faster to execute", "Generics remove all types"],
              correctIndex: 1,
              explanation: "Generics provide flexible reusability without losing type safety, autocompletion, or compiler guarantees."
            }
          }
        ]
      }
    ]
  },
  {
    id: "ts-part-3",
    title: "Part 3: Advanced TypeScript: Utility Types & Conditional Types",
    badge: "Advanced",
    description: "Master industry-grade type gymnastics: Partial, Pick, Omit, Mapped types, conditional types, and the infer keyword.",
    chapters: [
      {
        id: "ts-ch-3",
        title: "Metaprogramming & Type Gymnastics",
        level: "Advanced",
        lessons: [
          {
            id: "ts-3-1",
            title: "TypeScript Utility Types (Partial, Pick, Omit, Record)",
            slug: "ts-utility-types",
            level: "Advanced",
            language: "typescript",
            tldr: "Built-in utility types transform existing types, enabling clean API patch requests and dictionary maps.",
            description: "Rather than duplicating types when building update forms or lookup tables, TypeScript provides built-in type transformers: Partial<T> (all properties optional), Required<T> (all properties required), Pick<T, K> (extracts subset of keys), Omit<T, K> (drops specific keys), and Record<K, V> (creates typed dictionary).",
            code: `interface DatabaseUser {
  id: string;
  email: string;
  displayName: string;
  passwordHash: string;
  createdAt: Date;
}

// 1. Omit passwordHash and createdAt when returning user to frontend
type PublicUserProfile = Omit<DatabaseUser, "passwordHash" | "createdAt">;

// 2. Partial for PATCH update endpoint: all fields optional
type UpdateUserDto = Partial<PublicUserProfile>;

// 3. Record: Dictionary mapping roles to permissions
type RolePermissions = Record<"admin" | "editor" | "viewer", string[]>;

const permissions: RolePermissions = {
  admin: ["create", "read", "update", "delete"],
  editor: ["create", "read", "update"],
  viewer: ["read"]
};

console.log("Admin permissions:", permissions.admin.join(", "));`,
            output: "Admin permissions: create, read, update, delete",
            visualDiagramTitle: "Utility Type Transformation Mapping",
            visualDiagram: `[DatabaseUser: 5 fields] ──Omit<"passwordHash">──> [PublicUserProfile: 4 fields] ──Partial<...>──> [All fields optional (?)]`,
            lineExplanations: [
              { line: 'Omit<DatabaseUser, "passwordHash">', explanation: "Constructs new type with all keys except passwordHash." },
              { line: "Partial<PublicUserProfile>", explanation: "Applies optional (?) modifier to every property in the type." },
              { line: 'Record<"admin" | "editor", string[]>', explanation: "Ensures object has exactly those keys with string array values." }
            ],
            keyPoints: [
              "Utility types keep data models DRY (Don't Repeat Yourself).",
              "ReturnType<typeof fn> extracts the return type of any existing function.",
              "Readonly<T> freezes properties from being mutated."
            ],
            quiz: {
              question: "Which utility type takes an existing type T and makes every single property optional?",
              options: ["Optional<T>", "Partial<T>", "Nullable<T>", "Flexible<T>"],
              correctIndex: 1,
              explanation: "Partial<T> transforms all properties of type T into optional fields."
            }
          },
          {
            id: "ts-3-2",
            title: "Conditional Types & The infer Keyword",
            slug: "ts-conditional-infer",
            level: "Advanced",
            language: "typescript",
            tldr: "Conditional types (T extends U ? X : Y) allow writing dynamic type logic that inspects and extracts inner types.",
            description: "Conditional types allow types to act like functions that make decisions at compile time. By combining conditional types with the 'infer' keyword, you can unpack inner types from Promises, arrays, or function return values dynamically.",
            code: `// Custom utility: Unwraps Promise to get resolved type T
type AwaitedType<T> = T extends Promise<infer U> ? U : T;

// Testing the conditional type
type StrPromise = Promise<string>;
type ResolvedStr = AwaitedType<StrPromise>; // ResolvedStr is string!

type NumArray = number[];
type ElementOf<T> = T extends (infer E)[] ? E : never;
type Num = ElementOf<NumArray>; // Num is number!

console.log("Conditional types resolved successfully at compile time!");`,
            output: "Conditional types resolved successfully at compile time!",
            visualDiagramTitle: "Conditional Type Extraction Branching",
            visualDiagram: `[Input Type: Promise<string>] 
       │
       ▼ (Evaluates: T extends Promise<infer U>)
[Match Found! Compiler extracts U = string] ──> Returns type: string`,
            lineExplanations: [
              { line: "T extends Promise<infer U> ? U : T", explanation: "Ternary type check: if T is a Promise, infer and return the inner type U." },
              { line: "infer U", explanation: "Declares a type variable to be automatically deduced by the TypeScript compiler." }
            ],
            keyPoints: [
              "Conditional types enable advanced libraries like Prisma, Zod, and TRPC to achieve end-to-end type safety.",
              "Template literal types (\`get\${Capitalize<string>}\`) allow typing string patterns dynamically.",
              "The 'never' type in conditional branching filters out unwanted union members."
            ],
            quiz: {
              question: "What keyword is used inside conditional type checks to deduce and extract an inner type variable?",
              options: ["extract", "infer", "deduce", "match"],
              correctIndex: 1,
              explanation: "The 'infer' keyword introduces a type variable within a conditional type to be deduced by the compiler."
            }
          }
        ]
      }
    ]
  }
]
