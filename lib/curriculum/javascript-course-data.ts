import { CoursePart } from "./c-course-data"

export const JAVASCRIPT_COURSE_PARTS: CoursePart[] = [
  {
    id: "js-part-1",
    title: "Part 1: JavaScript Core Foundations & Syntax",
    badge: "Beginner",
    description: "Learn variables, data types, arrow functions, and control flow in modern ECMAScript (ES6+).",
    chapters: [
      {
        id: "js-ch-1",
        title: "Variables, Types & Functions",
        level: "Beginner",
        lessons: [
          {
            id: "js-1-1",
            title: "JavaScript Introduction & Variables (let, const)",
            slug: "js-variables",
            level: "Beginner",
            language: "javascript",
            tldr: "JavaScript is the programming language of the web that adds dynamic logic and interactivity to web pages.",
            description: "JavaScript executes inside the browser engine (such as Google V8). In modern ES6+, always declare variables with 'const' (for values that don't reassign) and 'let' (for values that change). Never use legacy 'var', which suffers from function-scope leakage and hoisting bugs.",
            code: `// Modern variable declaration
const appName = "ASCI Learning Engine";
const version = 3.5;
let activeUsers = 1250;

// Reassigning let
activeUsers += 1;

console.log(\`App: \${appName} (v\${version})\`);
console.log(\`Active Users Online: \${activeUsers}\`);`,
            output: "App: ASCI Learning Engine (v3.5)\nActive Users Online: 1251",
            visualDiagramTitle: "JavaScript Variable Declaration & Memory Binding",
            visualDiagram: `[const appName] ──Immutable Reference──> ["ASCI Learning Engine" in Heap]
[let activeUsers] ──Mutable Slot──> [1250] ──reassigned──> [1251]`,
            lineExplanations: [
              { line: "const appName = ...", explanation: "Creates a block-scoped identifier that cannot be reassigned." },
              { line: "let activeUsers = ...", explanation: "Creates a block-scoped variable that can be updated over time." },
              { line: "\`App: \${appName}\`", explanation: "ES6 Template Literal: embeds variables into strings with backticks." }
            ],
            keyPoints: [
              "Default to 'const'; only use 'let' when you know the variable needs to be reassigned.",
              "Both let and const are strictly block-scoped (respecting { } braces).",
              "Template literals using backticks (\`) support multi-line text and embedded expressions."
            ],
            quiz: {
              question: "Which keyword should be your default choice when declaring variables in modern JavaScript?",
              options: ["var", "let", "const", "def"],
              correctIndex: 2,
              explanation: "Best practice is to declare everything as const by default to prevent accidental mutations, using let only when reassignment is needed."
            }
          },
          {
            id: "js-1-2",
            title: "Modern ES6 Arrow Functions & Parameters",
            slug: "js-functions",
            level: "Beginner",
            language: "javascript",
            tldr: "Arrow functions (() => {}) provide concise syntax and inherit the 'this' value from their surrounding lexical scope.",
            description: "Functions package reusable blocks of code. ES6 arrow functions provide a compact syntax, implicit returns for single expressions, and avoid the historical confusion around the 'this' keyword binding.",
            code: `// Standard arrow function
const calculateTax = (amount, rate = 0.08) => {
  return amount * rate;
};

// Concise single-line arrow function with implicit return
const formatCurrency = (val) => \`$\${val.toFixed(2)}\`;

const subtotal = 150.00;
const tax = calculateTax(subtotal);
const total = subtotal + tax;

console.log(\`Tax: \${formatCurrency(tax)}\`);
console.log(\`Final Total: \${formatCurrency(total)}\`);`,
            output: "Tax: $12.00\nFinal Total: $162.00",
            visualDiagramTitle: "Function Invocation Stack Flow",
            visualDiagram: `[Call: calculateTax(150)] -> [Allocates Frame on Call Stack] -> [Computes 150 * 0.08] -> [Pops Frame & Returns 12.00]`,
            lineExplanations: [
              { line: "const calculateTax = (amount, rate = 0.08) =>", explanation: "Declares arrow function with default parameter rate = 0.08." },
              { line: "const formatCurrency = (val) => ...", explanation: "Single expression without braces returns the value implicitly." },
              { line: "val.toFixed(2)", explanation: "Formats number to 2 decimal places as a string." }
            ],
            keyPoints: [
              "Arrow functions do not have their own 'this', 'arguments', or 'super'.",
              "Default parameters (rate = 0.08) take effect when the argument is undefined.",
              "If an arrow function has exactly one parameter, the parentheses are optional."
            ],
            quiz: {
              question: "What happens when an arrow function body has no curly braces: const fn = x => x * 2;",
              options: ["Syntax error", "It implicitly returns the evaluated expression", "It returns undefined", "It executes asynchronously"],
              correctIndex: 1,
              explanation: "Arrow functions without curly braces automatically return the result of the single expression."
            }
          }
        ]
      }
    ]
  },
  {
    id: "js-part-2",
    title: "Part 2: Arrays, Objects, DOM & Asynchronous APIs",
    badge: "Intermediate",
    description: "Master modern functional array methods, DOM event handlers, Promises, async/await, and Fetch API.",
    chapters: [
      {
        id: "js-ch-2",
        title: "Collections, DOM & Async",
        level: "Intermediate",
        lessons: [
          {
            id: "js-2-1",
            title: "Functional Array Methods (map, filter, reduce)",
            slug: "js-array-methods",
            level: "Intermediate",
            language: "javascript",
            tldr: "map transforms elements, filter extracts matching items, and reduce accumulates data into a single value.",
            description: "Modern JavaScript avoids manual for-loops in favor of declarative, immutable array methods. These methods never modify the original array—they return brand-new transformed collections, which is essential for React and modern state management.",
            code: `const products = [
  { id: 1, name: "Wireless Mouse", price: 29.99, inStock: true },
  { id: 2, name: "Mechanical Keyboard", price: 89.99, inStock: false },
  { id: 3, name: "UltraWide Monitor", price: 349.99, inStock: true }
];

// 1. filter: Get only in-stock items
const available = products.filter(item => item.inStock);

// 2. map: Extract product names into a new string array
const names = available.map(item => item.name);

// 3. reduce: Calculate sum total of available inventory
const totalValue = available.reduce((acc, item) => acc + item.price, 0);

console.log("In Stock:", names.join(", "));
console.log(\`Total Available Value: $\${totalValue.toFixed(2)}\`);`,
            output: "In Stock: Wireless Mouse, UltraWide Monitor\nTotal Available Value: $379.98",
            visualDiagramTitle: "Functional Array Processing Pipeline",
            visualDiagram: `[Source Array: 3 items] 
    ──filter(inStock)──> [2 available items] 
    ──map(name)────────> ["Wireless Mouse", "UltraWide Monitor"]
    ──reduce(sum)──────> Total: $379.98`,
            lineExplanations: [
              { line: "products.filter(item => item.inStock)", explanation: "Returns a new array keeping only elements where predicate is true." },
              { line: "available.map(item => item.name)", explanation: "Transforms each item into its name string." },
              { line: "available.reduce((acc, item) => acc + item.price, 0)", explanation: "Accumulates prices starting from initial value 0." }
            ],
            keyPoints: [
              "Never mutate original state: map, filter, and slice are pure and safe.",
              "Methods can be chained together: items.filter(...).map(...).join(...).",
              "reduce can accumulate into numbers, objects, arrays, or grouped dictionaries."
            ],
            quiz: {
              question: "Which array method transforms every element and returns a new array of the exact same length?",
              options: ["filter", "reduce", "map", "forEach"],
              correctIndex: 2,
              explanation: "map() passes each item through a transformer function and returns a new array of identical length."
            }
          },
          {
            id: "js-2-2",
            title: "DOM Manipulation & Event Listeners",
            slug: "js-dom-events",
            level: "Intermediate",
            language: "javascript",
            tldr: "The Document Object Model (DOM) lets JavaScript dynamically read and update HTML and react to user events.",
            description: "The browser parses HTML into an interactive tree of JavaScript objects called the DOM. Using document.querySelector() and element.addEventListener(), JavaScript can alter text content, toggle CSS classes, and animate elements in response to clicks, keystrokes, and scrolls.",
            code: `// Simulating DOM element manipulation
const counter = { value: 0 };

function handleIncrement() {
  counter.value += 1;
  console.log(\`Counter state updated: \${counter.value}\`);
}

// In the browser:
// const btn = document.querySelector("#inc-btn");
// btn.addEventListener("click", handleIncrement);

handleIncrement();
handleIncrement();
console.log(\`Final Counter: \${counter.value}\`);`,
            output: "Counter state updated: 1\nCounter state updated: 2\nFinal Counter: 2",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px; color: white; text-align: center;">
  <div style="font-size: 13px; color: #94a3b8; text-transform: uppercase; margin-bottom: 4px;">Interactive DOM Sandbox</div>
  <div id="demo-count" style="font-size: 36px; font-weight: bold; color: #38bdf8; margin: 10px 0;">0</div>
  <button onclick="const el = document.getElementById('demo-count'); el.innerText = parseInt(el.innerText) + 1;" 
          style="padding: 10px 20px; background: #0284c7; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
    Click to Increment DOM Count
  </button>
</div>`,
            visualDiagramTitle: "DOM Event Delegation & Bubbling Propagation",
            visualDiagram: `[User Click on <button>] 
       │
       ▼ (Capturing Phase down tree)
[window] -> [document] -> [body] -> [div.card] -> [<button> Target]
       ▲
       └── (Bubbling Phase up tree to registered event listeners)`,
            lineExplanations: [
              { line: 'document.querySelector("#id")', explanation: "Selects the first matching element using CSS selector syntax." },
              { line: 'element.addEventListener("click", handler)', explanation: "Binds an event listener without overwriting existing handlers." },
              { line: "event.stopPropagation()", explanation: "Halts event bubbling up to parent ancestor nodes." }
            ],
            keyPoints: [
              "Event bubbling allows 'event delegation'—attaching a single listener to a parent list instead of 1,000 items.",
              "Use element.classList.toggle('active') rather than setting inline styles directly.",
              "Always remove event listeners when tearing down elements to prevent memory leaks."
            ],
            quiz: {
              question: "What is event bubbling in the browser DOM?",
              options: ["Errors crashing the page", "An event triggering on the target element and propagating up through ancestors", "Animations floating like bubbles", "A way to cancel form submission"],
              correctIndex: 1,
              explanation: "Event bubbling is the phase where an event starts at the deepest target element and bubbles upwards through parent nodes."
            }
          },
          {
            id: "js-2-3",
            title: "Asynchronous JavaScript: Promises & async/await",
            slug: "js-async-await",
            level: "Intermediate",
            language: "javascript",
            tldr: "Promises represent values that arrive in the future; async/await lets you write asynchronous code cleanly.",
            description: "Because JavaScript is single-threaded, time-consuming operations (network requests, timers, disk access) are asynchronous. Promises have three states: Pending, Fulfilled, and Rejected. The async/await syntax lets you write asynchronous logic that reads like synchronous step-by-step code.",
            code: `// Simulating an asynchronous network call
const fetchUserProfile = (userId) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, username: "dev_alex", role: "Full Stack Engineer" });
      } else {
        reject(new Error("Invalid User ID"));
      }
    }, 100);
  });
};

// Clean async/await consumption with try/catch error handling
async function loadDashboard() {
  try {
    console.log("Requesting user profile...");
    const user = await fetchUserProfile(42);
    console.log(\`Successfully loaded: \${user.username} (\${user.role})\`);
  } catch (error) {
    console.error("Failed to load user:", error.message);
  }
}

loadDashboard();`,
            output: "Requesting user profile...\nSuccessfully loaded: dev_alex (Full Stack Engineer)",
            visualDiagramTitle: "Promise Lifecycle & Async/Await Pause/Resume",
            visualDiagram: `[new Promise()] ──Pending State──>
      ├── On Success: resolve(data) ──> [.then() / await continues with data]
      └── On Error: reject(err)     ──> [.catch() / caught by try/catch]`,
            lineExplanations: [
              { line: "async function loadDashboard()", explanation: "Declaring a function async guarantees it always returns a Promise." },
              { line: "const user = await fetchUserProfile(42);", explanation: "Pauses execution of this function until the Promise settles." },
              { line: "try { ... } catch (error)", explanation: "Standard JavaScript exception handling catching any rejected Promises." }
            ],
            keyPoints: [
              "await can only be used inside async functions (or at top level in ES modules).",
              "Use Promise.all([p1, p2]) to fetch independent requests in parallel rather than sequentially.",
              "Promises avoid historical 'callback hell' pyramid of doom."
            ],
            quiz: {
              question: "What does an async function always return in JavaScript?",
              options: ["A callback function", "A Promise", "A boolean", "An execution thread"],
              correctIndex: 1,
              explanation: "Functions marked with async always wrap their return value in a Promise."
            }
          }
        ]
      }
    ]
  },
  {
    id: "js-part-3",
    title: "Part 3: Advanced JavaScript Internals, Closures & Architecture",
    badge: "Advanced",
    description: "Master the V8 Event Loop, microtasks vs macrotasks, lexical closures, prototypal inheritance, and memory management.",
    chapters: [
      {
        id: "js-ch-3",
        title: "Runtime Internals & Deep JS",
        level: "Advanced",
        lessons: [
          {
            id: "js-3-1",
            title: "The JavaScript Event Loop & Microtask Queue",
            slug: "js-event-loop",
            level: "Advanced",
            language: "javascript",
            tldr: "The Event Loop continuously checks if the Call Stack is empty before executing Microtasks and Macrotasks.",
            description: "JavaScript runs on a single thread with a single Call Stack. To handle asynchronous non-blocking I/O, browser runtimes use Web APIs, a Task Queue (macrotasks like setTimeout), and a Microtask Queue (Promises, queueMicrotask). Microtasks always drain completely before the next macrotask runs!",
            code: `console.log("1. Synchronous Start");

// Macrotask (Task Queue)
setTimeout(() => {
  console.log("4. setTimeout Callback (Macrotask)");
}, 0);

// Microtask (Microtask Queue)
Promise.resolve().then(() => {
  console.log("3. Promise Microtask");
});

console.log("2. Synchronous End");`,
            output: "1. Synchronous Start\n2. Synchronous End\n3. Promise Microtask\n4. setTimeout Callback (Macrotask)",
            visualDiagramTitle: "V8 Engine Event Loop Priority Architecture",
            visualDiagram: `[Call Stack (Current Executing Frame)]
       │
       ▼ (When Stack is Empty)
[Microtask Queue (Promise.then, queueMicrotask)] ──Drains completely first──>
       │
       ▼ (When Microtasks are completely drained)
[Render / Paint Opportunity]
       │
       ▼
[Task / Macrotask Queue (setTimeout, setInterval, I/O)] ──Takes ONE task──>`,
            lineExplanations: [
              { line: 'console.log("1. Synchronous Start");', explanation: "Pushed to Call Stack and executes immediately on CPU." },
              { line: "setTimeout(..., 0);", explanation: "Registered with Web API timer, enqueued into Macrotask queue." },
              { line: "Promise.resolve().then(...);", explanation: "Enqueued into high-priority Microtask queue." }
            ],
            keyPoints: [
              "Order of execution: Synchronous code -> All Microtasks -> Render check -> One Macrotask.",
              "Promise callbacks (.then) are microtasks; setTimeout/setInterval are macrotasks.",
              "An infinite microtask loop will freeze the browser window by starving the macrotask and render queues."
            ],
            quiz: {
              question: "Between a resolved Promise callback and a setTimeout(..., 0), which executes first when the call stack clears?",
              options: ["setTimeout", "Promise callback", "They execute in random order", "They execute in parallel on separate threads"],
              correctIndex: 1,
              explanation: "Promise callbacks live in the Microtask Queue, which takes strict priority and drains before Macrotasks like setTimeout."
            }
          },
          {
            id: "js-3-2",
            title: "Closures, Lexical Scope & Private Variables",
            slug: "js-closures",
            level: "Advanced",
            language: "javascript",
            tldr: "A closure is the combination of a function bundled together with references to its surrounding lexical state.",
            description: "When an inner function is returned from an outer function, it retains access to the outer function's scope variables even after the outer function has finished executing. Closures allow data encapsulation, memoization, and custom stateful factories.",
            code: `// Factory function demonstrating closure-based private state
function createSecureVault(secretKey) {
  // Private variable inaccessible from outside!
  let attempts = 0;

  return {
    unlock(key) {
      attempts++;
      if (key === secretKey) {
        return \`Access Granted! (Unlocked in \${attempts} attempt(s))\`;
      }
      return \`Access Denied! Attempt #\${attempts}\`;
    },
    getAttempts() {
      return attempts;
    }
  };
}

const vault = createSecureVault("super-secret-passphrase");
console.log(vault.unlock("wrong-pass"));
console.log(vault.unlock("super-secret-passphrase"));
// console.log(vault.secretKey); // undefined! Completely private!`,
            output: "Access Denied! Attempt #1\nAccess Granted! (Unlocked in 2 attempt(s))",
            visualDiagramTitle: "Lexical Scope & Closure Environment Retention",
            visualDiagram: `[Execution Context: createSecureVault]
       ├── [Private Scope: secretKey, attempts: 2] (Preserved in Heap Closure)
       └── [Returned Object { unlock(), getAttempts() }]
                 │
                 └── Holds [[Scopes]] pointer retaining access to private scope!`,
            lineExplanations: [
              { line: "let attempts = 0;", explanation: "Private state variable locked inside the closure boundary." },
              { line: "return { unlock() { ... } }", explanation: "Returned object methods maintain a persistent reference to attempts." }
            ],
            keyPoints: [
              "Closures are how React's useState hook retains component state between re-renders.",
              "Variables retained by active closures cannot be garbage collected while the closure is referenced.",
              "Enables the Module Pattern for clean API surfaces without leaking internal state."
            ],
            quiz: {
              question: "Why do closures retain access to outer function variables even after the outer function finishes executing?",
              options: ["They copy the variable to localStorage", "The function object maintains a reference to its lexical environment in heap memory", "JavaScript hoists all variables globally", "The compiler re-runs the outer function"],
              correctIndex: 1,
              explanation: "Functions in JavaScript keep a persistent internal reference ([[Environment]]) to the scope in which they were defined."
            }
          }
        ]
      }
    ]
  }
]
