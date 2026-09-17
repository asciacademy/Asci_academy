import { CurriculumCourse, CurriculumModule } from "../curriculum-data"
import { C_COURSE_PARTS, CoursePart } from "./c-course-data"
import { CPP_COURSE_PARTS } from "./cpp-course-data"
import { HTML_COURSE_PARTS } from "./html-course-data"
import { CSS_COURSE_PARTS } from "./css-course-data"
import { JAVASCRIPT_COURSE_PARTS } from "./javascript-course-data"
import { TYPESCRIPT_COURSE_PARTS } from "./typescript-course-data"
import { REACT_COURSE_PARTS } from "./react-course-data"
import { SQL_COURSE_PARTS } from "./sql-course-data"
import { GIT_DEVOPS_COURSE_PARTS } from "./git-devops-course-data"

function partsToCurriculumModules(parts: CoursePart[], courseSlug: string): CurriculumModule[] {
  let moduleSeq = 1
  return parts.flatMap((part) =>
    part.chapters.map((chapter) => ({
      id: chapter.id || `${courseSlug}-mod-${moduleSeq}`,
      title: chapter.title,
      sequence_order: moduleSeq++,
      description: part.description || `${chapter.lessons.length} interactive lessons with real code`,
      lessons: chapter.lessons.map((lesson, lIdx) => ({
        id: lesson.id || `${chapter.id}-les-${lIdx + 1}`,
        title: lesson.title,
        sequence_order: lIdx + 1,
        content_type: "challenge" as const,
        xp_reward: 50,
        description: lesson.tldr || lesson.description || "",
        content: `${lesson.description}\n\n${lesson.tldr ? `> **Key Takeaway:** ${lesson.tldr}` : ""}`,
        challenge_data: {
          initialCode: lesson.code || "",
          expectedOutput: lesson.output || "",
          instructions: lesson.tldr || lesson.description || "Run and test the code snippet in the editor."
        }
      }))
    }))
  )
}

const WEBDEV_PARTS: CoursePart[] = [
  ...HTML_COURSE_PARTS,
  ...CSS_COURSE_PARTS,
  ...JAVASCRIPT_COURSE_PARTS
]

const countLessons = (parts: CoursePart[]) =>
  parts.reduce((acc, p) => acc + p.chapters.reduce((cAcc, ch) => cAcc + ch.lessons.length, 0), 0)

export const WEBDEV_AND_LANGUAGES_COURSES: CurriculumCourse[] = [
  // =========================================================================
  // COURSE: C PROGRAMMING MASTERCLASS
  // =========================================================================
  {
    id: "c",
    slug: "c",
    title: "C Programming Masterclass",
    description: "Learn C from scratch the simple way: syntax, data types, control flow, functions, memory addresses, and pointers with zero confusing jargon.",
    category: "Programming",
    level: "Beginner",
    weeks: "6 Weeks",
    duration_hours: 30,
    lessons: countLessons(C_COURSE_PARTS),
    projects: 3,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["C99", "GCC", "Clang", "Pointers", "Memory", "GDB"],
    highlights: [
      "W3Schools-style beginner friendly lessons & syntax",
      "Interactive in-browser code runner & memory address inspector",
      "Understanding stack memory, pointers, and memory layout",
      "Diagnostic quizzes with instant feedback on each topic"
    ],
    modules: partsToCurriculumModules(C_COURSE_PARTS, "c")
  },

  // =========================================================================
  // COURSE: C++ SYSTEMS & OOP MASTERCLASS
  // =========================================================================
  {
    id: "cpp",
    slug: "cpp",
    title: "C++ Systems & OOP Masterclass",
    description: "Master modern C++ with simple explanations: streams, strings, memory references, classes, constructors, encapsulation, and inheritance.",
    category: "Programming",
    level: "Beginner",
    weeks: "8 Weeks",
    duration_hours: 40,
    lessons: countLessons(CPP_COURSE_PARTS),
    projects: 3,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["C++20", "std::string", "References", "OOP", "Classes", "Polymorphism"],
    highlights: [
      "Modern C++ standard with clear everyday analogies",
      "Interactive Object-Oriented Programming (OOP) visualizer",
      "Pass-by-reference vs pass-by-value deep dive",
      "Class inheritance and method overriding explained simply"
    ],
    modules: partsToCurriculumModules(CPP_COURSE_PARTS, "cpp")
  },

  // =========================================================================
  // COURSE: WEB DEVELOPMENT MASTER TRACK (HTML, CSS, JAVASCRIPT)
  // =========================================================================
  {
    id: "webdev",
    slug: "webdev",
    title: "Web Development Master Track (HTML, CSS, JS)",
    description: "The complete 3-pillar path to becoming a web developer: HTML structure, CSS styling, and JavaScript interactivity with live split-pane browser preview.",
    category: "Web Development",
    level: "Beginner",
    weeks: "12 Weeks",
    duration_hours: 60,
    lessons: countLessons(WEBDEV_PARTS),
    projects: 5,
    certificate: "ASCI Full-Stack Frontend Certificate",
    is_premium: false,
    tools: ["HTML5", "CSS3", "JavaScript ES6+", "Flexbox", "DOM", "Responsive Design"],
    highlights: [
      "Live split-pane browser preview sandbox for all code",
      "Complete HTML document structure, tags, and accessible forms",
      "Modern CSS Flexbox, Grid, Box Model, and typography",
      "JavaScript arrow functions, events, arrays, and DOM manipulation"
    ],
    modules: partsToCurriculumModules(WEBDEV_PARTS, "webdev")
  },

  // =========================================================================
  // COURSE: HTML5 FUNDAMENTALS
  // =========================================================================
  {
    id: "html",
    slug: "html",
    title: "HTML5 Web Structure",
    description: "Learn HTML from scratch with simple explanations, live browser preview sandbox, and real elements. Zero setup required.",
    category: "Web Development",
    level: "Beginner",
    weeks: "4 Weeks",
    duration_hours: 20,
    lessons: countLessons(HTML_COURSE_PARTS),
    projects: 2,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["HTML5", "Semantic Elements", "Forms", "Accessibility"],
    highlights: [
      "W3Schools-style simple explanations",
      "Live in-browser preview rendering",
      "Interactive quizzes on every tag"
    ],
    modules: partsToCurriculumModules(HTML_COURSE_PARTS, "html")
  },

  // =========================================================================
  // COURSE: CSS3 STYLING & LAYOUTS
  // =========================================================================
  {
    id: "css",
    slug: "css",
    title: "CSS3 Styling & Layouts",
    description: "Make websites beautiful with colors, fonts, margins, padding, Flexbox, and CSS Grid. Interactive live preview included.",
    category: "Web Development",
    level: "Beginner",
    weeks: "4 Weeks",
    duration_hours: 25,
    lessons: countLessons(CSS_COURSE_PARTS),
    projects: 2,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["CSS3", "Flexbox", "Box Model", "Grid", "Responsive"],
    highlights: [
      "Box Model visualizer (Margin, Border, Padding, Content)",
      "Modern Flexbox alignment made simple",
      "Live styling sandbox"
    ],
    modules: partsToCurriculumModules(CSS_COURSE_PARTS, "css")
  },

  // =========================================================================
  // COURSE: MODERN JAVASCRIPT (ES6+)
  // =========================================================================
  {
    id: "javascript",
    slug: "javascript",
    title: "Modern JavaScript (ES6+)",
    description: "Bring web pages to life with JavaScript variables, arrow functions, click events, arrays, and DOM manipulation.",
    category: "Web Development",
    level: "Beginner",
    weeks: "6 Weeks",
    duration_hours: 35,
    lessons: countLessons(JAVASCRIPT_COURSE_PARTS),
    projects: 3,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["JavaScript", "ES6+", "DOM Manipulation", "Arrow Functions", "Events"],
    highlights: [
      "Modern const and let variables",
      "Interactive DOM events and button clicks",
      "Direct live console preview in browser"
    ],
    modules: partsToCurriculumModules(JAVASCRIPT_COURSE_PARTS, "javascript")
  },

  // =========================================================================
  // COURSE: TYPESCRIPT ARCHITECTURE MASTERCLASS
  // =========================================================================
  {
    id: "typescript",
    slug: "typescript",
    title: "TypeScript Architecture Masterclass",
    description: "Master static types, interfaces, discriminated unions, and generics. Ship bulletproof web applications without runtime type bugs.",
    category: "Programming",
    level: "Intermediate",
    weeks: "6 Weeks",
    duration_hours: 32,
    lessons: countLessons(TYPESCRIPT_COURSE_PARTS),
    projects: 3,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["TypeScript 5.x", "Interfaces", "Generics", "Type Narrowing", "Utility Types", "TSConfig"],
    highlights: [
      "Static typing made simple with visual compiler explanations",
      "Discriminated unions & exhaustive type-checking patterns",
      "Interactive code sandbox with real-time type inference preview",
      "Advanced utility types and generics mastery"
    ],
    modules: partsToCurriculumModules(TYPESCRIPT_COURSE_PARTS, "typescript")
  },

  // =========================================================================
  // COURSE: REACT 19 & NEXT.JS MASTERCLASS
  // =========================================================================
  {
    id: "react",
    slug: "react",
    title: "React 19 & Next.js Masterclass",
    description: "Build modern web apps with React 19, custom hooks, declarative state, and Next.js App Router Server Components.",
    category: "Web Development",
    level: "Intermediate",
    weeks: "8 Weeks",
    duration_hours: 45,
    lessons: countLessons(REACT_COURSE_PARTS),
    projects: 4,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["React 19", "Next.js", "Server Components", "useState", "useEffect", "TailwindCSS"],
    highlights: [
      "Declarative component architecture & JSX breakdown",
      "Interactive component sandbox with live visual output",
      "React Server Components (RSC) vs Client Components",
      "Building production full-stack web applications"
    ],
    modules: partsToCurriculumModules(REACT_COURSE_PARTS, "react")
  },

  // =========================================================================
  // COURSE: SQL & RELATIONAL DATABASES MASTERCLASS
  // =========================================================================
  {
    id: "sql",
    slug: "sql",
    title: "SQL & Relational Databases Masterclass",
    description: "Master relational queries, multi-table JOINs, aggregations, B-Tree indexes, and ACID transaction isolation.",
    category: "Programming",
    level: "Beginner",
    weeks: "6 Weeks",
    duration_hours: 30,
    lessons: countLessons(SQL_COURSE_PARTS),
    projects: 3,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["PostgreSQL", "SQL", "JOINs", "Indexing", "ACID", "EXPLAIN"],
    highlights: [
      "Intuitive query breakdowns with Venn diagram visualizations",
      "Interactive SQL query runner with simulated table outputs",
      "B-Tree index optimization & EXPLAIN ANALYZE execution plans",
      "Atomic transactions & concurrency isolation levels"
    ],
    modules: partsToCurriculumModules(SQL_COURSE_PARTS, "sql")
  },

  // =========================================================================
  // COURSE: GIT, DOCKER & DEVOPS ENGINEERING
  // =========================================================================
  {
    id: "git",
    slug: "git",
    title: "Git, Docker & Modern DevOps",
    description: "Master distributed version control, branch workflows, merge conflict resolution, Docker containerization, and CI/CD pipelines.",
    category: "Programming",
    level: "Beginner",
    weeks: "6 Weeks",
    duration_hours: 32,
    lessons: countLessons(GIT_DEVOPS_COURSE_PARTS),
    projects: 3,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["Git", "GitHub", "Docker", "Docker Compose", "CI/CD", "Linux"],
    highlights: [
      "Visual commit graph topologies and branching strategies",
      "Interactive terminal simulations for Git commands",
      "Multi-stage Docker builds for minimal production images",
      "Automating deployment with GitHub Actions"
    ],
    modules: partsToCurriculumModules(GIT_DEVOPS_COURSE_PARTS, "git")
  }
]
