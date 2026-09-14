import { CurriculumCourse } from "../curriculum-data"

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
    lessons: 10,
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
    modules: [
      {
        id: "c-mod-1",
        title: "Module 1: C Basics & Syntax",
        sequence_order: 1,
        description: "Variables, format specifiers, and basic math operations.",
        lessons: [
          {
            id: "c-les-1",
            title: "1.1 Hello World & First C Program",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Understand the structure of a C program.",
            content: "Write and execute your first C program.",
            challenge_data: {
              initialCode: '#include <stdio.h>\n\nint main() {\n    printf("HELLO_C\\n");\n    return 0;\n}\n',
              expectedOutput: "HELLO_C",
              instructions: "Output 'HELLO_C'."
            }
          }
        ]
      }
    ]
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
    lessons: 10,
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
    modules: [
      {
        id: "cpp-mod-1",
        title: "Module 1: Modern C++ Essentials",
        sequence_order: 1,
        description: "Standard I/O, strings, and references.",
        lessons: [
          {
            id: "cpp-les-1",
            title: "1.1 C++ Streams & First Program",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Output data using cout and streams.",
            content: "Write your first modern C++ program.",
            challenge_data: {
              initialCode: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "HELLO_CPP" << endl;\n    return 0;\n}\n',
              expectedOutput: "HELLO_CPP",
              instructions: "Output 'HELLO_CPP'."
            }
          }
        ]
      }
    ]
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
    lessons: 10,
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
    modules: [
      {
        id: "webdev-mod-1",
        title: "Module 1: HTML5 & Web Structure",
        sequence_order: 1,
        description: "Learn tags, headings, paragraphs, and links.",
        lessons: [
          {
            id: "webdev-les-1",
            title: "1.1 The HTML Document Skeleton",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Build a valid HTML5 page.",
            content: "Structure a web page with headings and text.",
            challenge_data: {
              initialCode: 'console.log("HTML_READY");\n',
              expectedOutput: "HTML_READY",
              instructions: "Output 'HTML_READY'."
            }
          }
        ]
      }
    ]
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
    lessons: 6,
    projects: 2,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["HTML5", "Semantic Elements", "Forms", "Accessibility"],
    highlights: [
      "W3Schools-style simple explanations",
      "Live in-browser preview rendering",
      "Interactive quizzes on every tag"
    ],
    modules: [
      {
        id: "html-mod-1",
        title: "Module 1: HTML Basics",
        sequence_order: 1,
        description: "Headings, paragraphs, links, and forms.",
        lessons: [
          {
            id: "html-les-1",
            title: "1.1 HTML Document Structure",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Understand HTML tags.",
            content: "Create your first HTML element.",
            challenge_data: {
              initialCode: 'console.log("HTML5");\n',
              expectedOutput: "HTML5",
              instructions: "Output 'HTML5'."
            }
          }
        ]
      }
    ]
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
    lessons: 6,
    projects: 2,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["CSS3", "Flexbox", "Box Model", "Grid", "Responsive"],
    highlights: [
      "Box Model visualizer (Margin, Border, Padding, Content)",
      "Modern Flexbox alignment made simple",
      "Live styling sandbox"
    ],
    modules: [
      {
        id: "css-mod-1",
        title: "Module 1: CSS Basics & Box Model",
        sequence_order: 1,
        description: "Selectors, colors, and the box model.",
        lessons: [
          {
            id: "css-les-1",
            title: "1.1 CSS Selectors & Colors",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Style an element using CSS.",
            content: "Apply CSS rules.",
            challenge_data: {
              initialCode: 'console.log("CSS3");\n',
              expectedOutput: "CSS3",
              instructions: "Output 'CSS3'."
            }
          }
        ]
      }
    ]
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
    lessons: 8,
    projects: 3,
    certificate: "ASCI Certificate of Completion",
    is_premium: false,
    tools: ["JavaScript", "ES6+", "DOM Manipulation", "Arrow Functions", "Events"],
    highlights: [
      "Modern const and let variables",
      "Interactive DOM events and button clicks",
      "Direct live console preview in browser"
    ],
    modules: [
      {
        id: "js-mod-1",
        title: "Module 1: JavaScript Fundamentals",
        sequence_order: 1,
        description: "Variables, functions, and DOM manipulation.",
        lessons: [
          {
            id: "js-les-1",
            title: "1.1 Variables & Output",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Print output using console.log.",
            content: "Execute your first JavaScript line.",
            challenge_data: {
              initialCode: 'console.log("JS_ES6");\n',
              expectedOutput: "JS_ES6",
              instructions: "Output 'JS_ES6'."
            }
          }
        ]
      }
    ]
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
    lessons: 12,
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
    modules: [
      {
        id: "ts-mod-1",
        title: "Module 1: TypeScript Foundations",
        sequence_order: 1,
        description: "Primitive types, inference, and interface contracts.",
        lessons: [
          {
            id: "ts-les-1",
            title: "1.1 Static Types & Functions",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Declare typed variables and function signatures.",
            content: "Write and execute your first typed function.",
            challenge_data: {
              initialCode: 'const greeting: string = "HELLO_TS";\nconsole.log(greeting);\n',
              expectedOutput: "HELLO_TS",
              instructions: "Output 'HELLO_TS'."
            }
          }
        ]
      }
    ]
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
    lessons: 14,
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
    modules: [
      {
        id: "react-mod-1",
        title: "Module 1: React Component Essentials",
        sequence_order: 1,
        description: "JSX, props, and useState reactive hooks.",
        lessons: [
          {
            id: "react-les-1",
            title: "1.1 First React Component",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Render a reactive component.",
            content: "Create your first component.",
            challenge_data: {
              initialCode: 'console.log("REACT_19");\n',
              expectedOutput: "REACT_19",
              instructions: "Output 'REACT_19'."
            }
          }
        ]
      }
    ]
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
    lessons: 12,
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
    modules: [
      {
        id: "sql-mod-1",
        title: "Module 1: SQL Foundations",
        sequence_order: 1,
        description: "SELECT, WHERE, and sorting relational records.",
        lessons: [
          {
            id: "sql-les-1",
            title: "1.1 Basic SELECT Query",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Query rows with column projections.",
            content: "Write your first SQL SELECT statement.",
            challenge_data: {
              initialCode: 'SELECT "HELLO_SQL";\n',
              expectedOutput: "HELLO_SQL",
              instructions: "Output 'HELLO_SQL'."
            }
          }
        ]
      }
    ]
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
    lessons: 12,
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
    modules: [
      {
        id: "git-mod-1",
        title: "Module 1: Version Control Basics",
        sequence_order: 1,
        description: "Repositories, commits, and staging area.",
        lessons: [
          {
            id: "git-les-1",
            title: "1.1 Initializing Repositories",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Initialize a repository and stage changes.",
            content: "Run your first git commands.",
            challenge_data: {
              initialCode: 'echo "GIT_DEVOPS"\n',
              expectedOutput: "GIT_DEVOPS",
              instructions: "Output 'GIT_DEVOPS'."
            }
          }
        ]
      }
    ]
  }
]

