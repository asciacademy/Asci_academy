export type CourseLevel = "Beginner" | "Intermediate" | "Advanced"

export interface LineExplanation {
  line: string
  explanation: string
}

export interface QuizQuestion {
  question: string
  options: string[]
  correctIndex: number
  explanation: string
}

export interface CourseLesson {
  id: string
  title: string
  slug: string
  level: CourseLevel
  tldr: string
  description: string
  code: string
  output?: string
  livePreviewHtml?: string
  lineExplanations?: LineExplanation[]
  quiz: QuizQuestion
  language: "c" | "cpp" | "html" | "css" | "javascript" | string
  keyPoints?: string[]
  visualDiagram?: string
  visualDiagramTitle?: string
}

export interface CourseChapter {
  id: string
  title: string
  level: CourseLevel
  lessons: CourseLesson[]
}

export interface CoursePart {
  id: string
  title: string
  badge: string
  description: string
  chapters: CourseChapter[]
}

export const WEBDEV_COURSE_PARTS: CoursePart[] = [
  // =========================================================================
  // PART 1: HTML — THE SKELETON OF THE WEB
  // =========================================================================
  {
    id: "web-part-1",
    title: "Part 1: HTML — The Structure of Web Pages",
    badge: "HTML5",
    description: "Learn how web pages are built from the ground up using HTML tags, links, images, tables, and forms.",
    chapters: [
      {
        id: "html-ch-1",
        title: "HTML Fundamentals",
        level: "Beginner",
        lessons: [
          {
            id: "html-1-1",
            title: "HTML Introduction & Document Structure",
            slug: "html-intro",
            level: "Beginner",
            language: "html",
            tldr: "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
            description: "Every website in the world is built with HTML. HTML describes the structure of a web page using elements represented by tags like <h1>, <p>, and <a>. Most elements have an opening tag and a closing tag.",
            code: `<!DOCTYPE html>
<html>
  <head>
    <title>My First Page</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>
    <p>This is my very first paragraph written in HTML!</p>
  </body>
</html>`,
            output: "Rendered page displaying an H1 heading and paragraph text.",
            livePreviewHtml: `<div style="font-family:sans-serif;padding:16px;">
  <h1 style="color:#2563eb;margin:0 0 8px;">Welcome to My Website</h1>
  <p style="color:#555;font-size:14px;line-height:1.5;">This is my very first paragraph written in HTML!</p>
</div>`,
            lineExplanations: [
              { line: "<!DOCTYPE html>", explanation: "Declares that this document is an HTML5 document." },
              { line: "<html>", explanation: "The root element that wraps everything on the web page." },
              { line: "<head>", explanation: "Contains meta information about the page, such as the tab title." },
              { line: "<body>", explanation: "Contains the visible page content seen by visitors." },
              { line: "<h1> ... </h1>", explanation: "A top-level headline." },
              { line: "<p> ... </p>", explanation: "A paragraph of text." }
            ],
            keyPoints: [
              "Tags are wrapped in angle brackets: <tagname>content</tagname>.",
              "Closing tags include a forward slash: </tagname>.",
              "Only content inside <body> is visible in the browser window."
            ],
            quiz: {
              question: "Which HTML element contains the visible content of a web page?",
              options: ["<head>", "<title>", "<body>", "<meta>"],
              correctIndex: 2,
              explanation: "The <body> element defines the document's body and holds all visible contents."
            }
          },
          {
            id: "html-1-2",
            title: "HTML Headings & Paragraphs",
            slug: "html-headings",
            level: "Beginner",
            language: "html",
            tldr: "HTML headings range from <h1> (most important) to <h6> (least important).",
            description: "Search engines and screen readers use headings to understand the structure of your page. You should only use one <h1> per page for the main topic, and subheadings like <h2> and <h3> for sections.",
            code: `<h1>Main Heading (h1)</h1>
<h2>Section Title (h2)</h2>
<h3>Sub-section (h3)</h3>
<p>Paragraphs automatically start on a new line with vertical margin.</p>`,
            output: "Visual hierarchy of headings from largest to smallest with paragraph.",
            livePreviewHtml: `<div style="font-family:sans-serif;padding:16px;">
  <h1 style="font-size:22px;margin:0 0 6px;">Main Heading (h1)</h1>
  <h2 style="font-size:18px;color:#2563eb;margin:0 0 6px;">Section Title (h2)</h2>
  <h3 style="font-size:15px;color:#666;margin:0 0 8px;">Sub-section (h3)</h3>
  <p style="font-size:13px;color:#444;line-height:1.4;">Paragraphs automatically start on a new line with vertical margin.</p>
</div>`,
            lineExplanations: [
              { line: "<h1>", explanation: "The biggest, most important heading on the page." },
              { line: "<h6>", explanation: "The smallest heading level." }
            ],
            keyPoints: [
              "Never use headings just to make text bold or big—use CSS for styling instead.",
              "Keep heading levels properly nested (h1 -> h2 -> h3)."
            ],
            quiz: {
              question: "Which tag defines the most important heading in HTML?",
              options: ["<h6>", "<head>", "<heading>", "<h1>"],
              correctIndex: 3,
              explanation: "<h1> defines the most important heading on a page."
            }
          },
          {
            id: "html-1-3",
            title: "HTML Links & Images",
            slug: "html-links-images",
            level: "Beginner",
            language: "html",
            tldr: "<a> creates clickable hyperlinks, and <img> embeds images.",
            description: "Links are defined using the <a> tag with the href attribute. Images are defined using the <img> tag with src (source path) and alt (alternative text for accessibility).",
            code: `<a href="https://example.com" target="_blank">Visit Example Website</a>

<img 
  src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" 
  alt="Developer coding on a laptop" 
  width="300"
/>`,
            output: "Clickable link and loaded image.",
            livePreviewHtml: `<div style="font-family:sans-serif;padding:16px;">
  <p><a href="#" style="color:#2563eb;font-weight:600;text-decoration:none;">Visit Example Website &rarr;</a></p>
  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400" alt="Code laptop" style="border-radius:8px;max-width:100%;height:auto;border:1px solid #ddd;" width="280" />
</div>`,
            lineExplanations: [
              { line: 'href="https://example.com"', explanation: "The destination URL of the link." },
              { line: 'target="_blank"', explanation: "Opens the link in a new browser tab." },
              { line: 'alt="..."', explanation: "Describes the image for visually impaired users and if the image fails to load." }
            ],
            keyPoints: [
              "<img> is an empty tag: it does not have a closing tag.",
              "Always include an alt attribute on every image."
            ],
            quiz: {
              question: "Which attribute specifies the destination URL of a link?",
              options: ["src", "url", "href", "link"],
              correctIndex: 2,
              explanation: "href stands for Hypertext Reference and specifies the link target."
            }
          },
          {
            id: "html-1-4",
            title: "HTML Lists, Tables & Forms",
            slug: "html-forms",
            level: "Beginner",
            language: "html",
            tldr: "Forms collect user input like text, email, and passwords using input fields and buttons.",
            description: "HTML forms are used to gather data from users to log in, register, search, or submit feedback.",
            code: `<form>
  <label for="fname">First Name:</label><br>
  <input type="text" id="fname" placeholder="Ada"><br><br>

  <label for="email">Email Address:</label><br>
  <input type="email" id="email" placeholder="ada@example.com"><br><br>

  <button type="button">Sign Up</button>
</form>`,
            output: "Interactive form with labeled inputs and button.",
            livePreviewHtml: `<div style="font-family:sans-serif;padding:16px;">
  <form style="display:flex;flex-direction:column;gap:8px;max-width:240px;">
    <label style="font-size:12px;font-weight:600;color:#333;">First Name:</label>
    <input type="text" placeholder="Ada" style="padding:6px 10px;border:1px solid #ccc;border-radius:6px;font-size:13px;" />
    <label style="font-size:12px;font-weight:600;color:#333;">Email Address:</label>
    <input type="email" placeholder="ada@example.com" style="padding:6px 10px;border:1px solid #ccc;border-radius:6px;font-size:13px;" />
    <button type="button" style="margin-top:6px;background:#2563eb;color:#fff;border:none;padding:8px 14px;border-radius:6px;font-weight:600;cursor:pointer;">Sign Up</button>
  </form>
</div>`,
            lineExplanations: [
              { line: "<form>", explanation: "Container for input elements." },
              { line: '<input type="text">', explanation: "Single-line text box." },
              { line: '<input type="email">', explanation: "Validates that input contains a valid email address." }
            ],
            keyPoints: [
              "<label for='id'> connects text to the input field for accessibility.",
              "Types include text, email, password, number, checkbox, and radio."
            ],
            quiz: {
              question: "Which input type securely hides characters as the user types?",
              options: ["hidden", "password", "secret", "mask"],
              correctIndex: 1,
              explanation: "type='password' masks characters with dots or asterisks."
            }
          }
        ]
      }
    ]
  },
  // =========================================================================
  // PART 2: CSS — STYLING & BEAUTIFUL DESIGN
  // =========================================================================
  {
    id: "web-part-2",
    title: "Part 2: CSS — Styling & Layouts",
    badge: "CSS3",
    description: "Make websites beautiful with colors, fonts, margins, padding, Flexbox, and CSS Grid.",
    chapters: [
      {
        id: "css-ch-1",
        title: "CSS Basics & The Box Model",
        level: "Beginner",
        lessons: [
          {
            id: "css-2-1",
            title: "CSS Introduction & Selectors",
            slug: "css-intro",
            level: "Beginner",
            language: "css",
            tldr: "CSS (Cascading Style Sheets) controls the colors, fonts, spacing, and layout of HTML elements.",
            description: "CSS tells the browser how HTML elements should look. A CSS rule has a selector (which element to style) and a declaration block (property: value pairs inside curly brackets).",
            code: `/* Element Selector */
p {
  color: #333333;
  font-size: 16px;
  line-height: 1.5;
}

/* Class Selector */
.highlight {
  color: #2563eb;
  font-weight: bold;
}

/* ID Selector */
#special-header {
  border-bottom: 2px solid #2563eb;
}`,
            output: "Styled paragraph with blue highlight.",
            livePreviewHtml: `<div style="font-family:sans-serif;padding:16px;">
  <h2 style="border-bottom:2px solid #2563eb;padding-bottom:4px;color:#111;margin:0 0 10px;">#special-header</h2>
  <p style="color:#333;font-size:15px;line-height:1.5;">This is a paragraph styled with <span style="color:#2563eb;font-weight:bold;">.highlight</span> text.</p>
</div>`,
            lineExplanations: [
              { line: "p { ... }", explanation: "Element selector: styles every <p> tag on the page." },
              { line: ".highlight { ... }", explanation: "Class selector: styles any element with class='highlight'." },
              { line: "#special-header { ... }", explanation: "ID selector: styles the single unique element with id='special-header'." }
            ],
            keyPoints: [
              "Class selectors start with a dot (.className).",
              "ID selectors start with a hash (#idName).",
              "Declarations end with a semicolon (;)."
            ],
            quiz: {
              question: "What symbol selects elements by class name in CSS?",
              options: ["# (hash)", ". (dot)", "* (asterisk)", ": (colon)"],
              correctIndex: 1,
              explanation: "A period (.btn) selects elements by class name in CSS."
            }
          },
          {
            id: "css-2-2",
            title: "The CSS Box Model",
            slug: "css-box-model",
            level: "Beginner",
            language: "css",
            tldr: "Every element is a box consisting of: Content, Padding, Border, and Margin.",
            description: "Understanding the Box Model is the secret to mastering web layouts: Content is the text or image. Padding is clear space INSIDE the border. Border wraps around the padding. Margin is clear space OUTSIDE the border.",
            code: `.card {
  width: 280px;
  background-color: #fdfbf7;
  padding: 20px;          /* Space inside */
  border: 2px solid #2563eb; /* Border edge */
  margin: 15px;           /* Space outside */
  border-radius: 12px;
}`,
            output: "Card with distinct margin, border, and padding.",
            livePreviewHtml: `<div style="font-family:sans-serif;background:#eee;padding:20px;border-radius:8px;">
  <div style="background:#fff;padding:16px;border:2px solid #2563eb;border-radius:10px;box-shadow:0 2px 4px rgba(0,0,0,0.05);max-width:240px;">
    <div style="font-weight:bold;color:#2563eb;font-size:14px;">Card with Box Model</div>
    <p style="font-size:12px;color:#555;margin:8px 0 0;">Content inside &rarr; Padding inside border &rarr; Margin outside.</p>
  </div>
</div>`,
            lineExplanations: [
              { line: "padding: 20px;", explanation: "Pushes text away from the border on all 4 sides." },
              { line: "border: 2px solid #2563eb;", explanation: "Draws a 2-pixel blue border." },
              { line: "margin: 15px;", explanation: "Creates space between this card and surrounding elements." }
            ],
            keyPoints: [
              "Margin = outside space.",
              "Padding = inside space.",
              "box-sizing: border-box includes padding and border in the element's total width."
            ],
            quiz: {
              question: "Which property creates space INSIDE an element's border?",
              options: ["margin", "padding", "spacing", "outline"],
              correctIndex: 1,
              explanation: "Padding creates breathing room inside the border around the content."
            }
          },
          {
            id: "css-2-3",
            title: "CSS Flexbox Layout",
            slug: "css-flexbox",
            level: "Intermediate",
            language: "css",
            tldr: "Flexbox makes it easy to align items in rows or columns and distribute space automatically.",
            description: "Before Flexbox, aligning elements horizontally was painful. With display: flex, child elements become flexible items that automatically arrange in a row, center themselves, and adapt to screen sizes.",
            code: `.navbar {
  display: flex;
  justify-content: space-between; /* Space out items */
  align-items: center;            /* Center vertically */
  padding: 12px 20px;
  background-color: #141413;
  color: #fdfbf7;
}`,
            output: "Responsive navigation bar with logo on left and links on right.",
            livePreviewHtml: `<div style="font-family:sans-serif;display:flex;justify-content:space-between;align-items:center;background:#141413;color:#fff;padding:12px 18px;border-radius:8px;">
  <span style="font-weight:bold;color:#2563eb;font-size:14px;">ASCI Brand</span>
  <div style="display:flex;gap:12px;font-size:12px;">
    <span style="color:#aaa;cursor:pointer;">Courses</span>
    <span style="color:#aaa;cursor:pointer;">Projects</span>
    <span style="color:#2563eb;font-weight:bold;cursor:pointer;">Join</span>
  </div>
</div>`,
            lineExplanations: [
              { line: "display: flex;", explanation: "Activates flexbox layout on the container." },
              { line: "justify-content: space-between;", explanation: "Puts first item on the far left, last item on the far right." },
              { line: "align-items: center;", explanation: "Centers items vertically along the cross axis." }
            ],
            keyPoints: [
              "justify-content controls horizontal alignment.",
              "align-items controls vertical alignment.",
              "gap adds clean spacing between flex children without margin hacks."
            ],
            quiz: {
              question: "Which CSS property turns an element into a flex container?",
              options: ["flex: 1", "display: flex", "align: flex", "position: flex"],
              correctIndex: 1,
              explanation: "display: flex turns on Flexbox layout."
            }
          }
        ]
      }
    ]
  },
  // =========================================================================
  // PART 3: JAVASCRIPT — THE BRAIN OF THE WEB
  // =========================================================================
  {
    id: "web-part-3",
    title: "Part 3: JavaScript — Interactivity & Logic",
    badge: "ES6+",
    description: "Bring web pages to life with JavaScript variables, functions, events, arrays, and DOM manipulation.",
    chapters: [
      {
        id: "js-ch-1",
        title: "JavaScript Basics",
        level: "Beginner",
        lessons: [
          {
            id: "js-3-1",
            title: "JavaScript Introduction & Variables",
            slug: "js-intro",
            level: "Beginner",
            language: "javascript",
            tldr: "JavaScript is the programming language of the Web, enabling interactivity, animations, and logic.",
            description: "HTML provides structure, CSS provides style, and JavaScript makes pages interactive. In modern JavaScript, we declare variables with let (values that can change) and const (constant values that never change).",
            code: `// Modern JS Variables
const websiteName = "ASCI Learning";
let activeLearners = 2400;

// Update variable
activeLearners = activeLearners + 1;

console.log("Welcome to " + websiteName);
console.log("Total learners: " + activeLearners);`,
            output: "Welcome to ASCI Learning\nTotal learners: 2401",
            lineExplanations: [
              { line: 'const websiteName = "ASCI Learning";', explanation: "const stores values that should never be reassigned." },
              { line: "let activeLearners = 2400;", explanation: "let stores values that can change later." },
              { line: "console.log(...)", explanation: "Prints output to the browser developer console." }
            ],
            keyPoints: [
              "Always prefer const by default; use let only if you know the value will change.",
              "Avoid the older var keyword in modern projects."
            ],
            quiz: {
              question: "Which keyword should you use for a variable whose value will NOT change?",
              options: ["var", "let", "const", "fixed"],
              correctIndex: 2,
              explanation: "const creates a block-scoped constant variable that cannot be reassigned."
            }
          },
          {
            id: "js-3-2",
            title: "JavaScript Functions & Arrow Functions",
            slug: "js-functions",
            level: "Beginner",
            language: "javascript",
            tldr: "Functions are reusable blocks of code. Arrow functions (=>) are the modern syntax.",
            description: "Functions take parameters, do calculations, and return results. Arrow functions provide a shorter, cleaner syntax that is standard in modern JavaScript and React.",
            code: `// Standard function
function greet(name) {
  return "Hello, " + name + "!";
}

// Modern Arrow function
const calculateDiscount = (price, discountPercent) => {
  return price - (price * (discountPercent / 100));
};

console.log(greet("Developer"));
console.log("Discounted price: $" + calculateDiscount(100, 20));`,
            output: "Hello, Developer!\nDiscounted price: $80",
            lineExplanations: [
              { line: "function greet(name)", explanation: "Classic function definition with a name parameter." },
              { line: "const calculateDiscount = (price, discountPercent) =>", explanation: "Modern ES6 arrow function syntax." }
            ],
            keyPoints: [
              "Functions can take 0, 1, or many parameters.",
              "return sends the result back to the caller."
            ],
            quiz: {
              question: "Which symbol is used to define an arrow function in JavaScript?",
              options: ["->", "=>", "~>", ">>"],
              correctIndex: 1,
              explanation: "=> (fat arrow) is the syntax for arrow functions in ES6."
            }
          },
          {
            id: "js-3-3",
            title: "JavaScript DOM Manipulation",
            slug: "js-dom",
            level: "Intermediate",
            language: "javascript",
            tldr: "The DOM (Document Object Model) lets JavaScript find, change, add, or delete HTML elements.",
            description: "DOM manipulation is how JavaScript changes what's on the screen without reloading the page. You can change text, switch colors on button clicks, and show modals.",
            code: `// Selecting an element
const button = document.getElementById("myButton");
const message = document.getElementById("output");

// Listening for a click event
button.addEventListener("click", () => {
  message.textContent = "Button clicked! JavaScript is working.";
  message.style.color = "#2563eb";
});`,
            output: "Interactive click action updating screen text and color.",
            livePreviewHtml: `<div style="font-family:sans-serif;padding:16px;">
  <p id="preview-text" style="font-size:14px;color:#333;margin:0 0 10px;">Click the button to change this text.</p>
  <button 
    onclick="document.getElementById('preview-text').textContent = '🎉 Button Clicked! JavaScript updated the DOM!'; document.getElementById('preview-text').style.color = '#2563eb';"
    style="background:#2563eb;color:#fff;border:none;padding:8px 14px;border-radius:6px;font-weight:600;cursor:pointer;"
  >
    Test Interactive Button
  </button>
</div>`,
            lineExplanations: [
              { line: "document.getElementById('...')", explanation: "Finds an HTML element by its unique id attribute." },
              { line: "addEventListener('click', ...)", explanation: "Listens for user clicks and triggers code." },
              { line: "element.textContent = '...'", explanation: "Updates the text inside the HTML tag instantly." }
            ],
            keyPoints: [
              "document represents your web page in JavaScript.",
              "addEventListener allows handling clicks, mouse movements, key presses, and form submits.",
              "This is the foundation for all modern frontend frameworks like React!"
            ],
            quiz: {
              question: "Which method attaches an event listener (like a click) to an HTML element?",
              options: ["element.onClick()", "element.attach()", "element.addEventListener()", "element.listen()"],
              correctIndex: 2,
              explanation: "addEventListener() attaches an event handler to the element."
            }
          }
        ]
      }
    ]
  },
  {
    id: "web-part-4",
    title: "Part 4: Full-Stack Architecture, REST APIs & Production Deployment",
    badge: "Advanced",
    description: "Connect frontends to backend services using REST APIs, manage persistent client storage, and optimize for global CDN deployment.",
    chapters: [
      {
        id: "web-ch-4",
        title: "APIs & Web Architecture",
        level: "Advanced",
        lessons: [
          {
            id: "web-4-1",
            title: "REST APIs, HTTP Methods & JSON Communication",
            slug: "web-rest-apis",
            level: "Advanced",
            language: "javascript",
            tldr: "REST APIs allow web clients to read and mutate database records over HTTP using JSON payloads.",
            description: "Modern web applications communicate with servers via REST (Representational State Transfer). Frontends send HTTP requests using standardized verbs: GET (read), POST (create), PUT/PATCH (update), and DELETE (remove). Servers return status codes (200 OK, 201 Created, 400 Bad Request, 401 Unauthorized, 404 Not Found, 500 Server Error) along with JSON data.",
            code: `// Fetching data from a REST endpoint asynchronously
async function fetchCourseCatalog() {
  try {
    const response = await fetch("https://api.example.com/v1/courses", {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": "Bearer sample_token_123"
      }
    });

    if (!response.ok) {
      throw new Error(\`HTTP Error! Status: \${response.status}\`);
    }

    const data = await response.json();
    console.log(\`Retrieved \${data.length} courses from API successfully.\`);
    return data;
  } catch (err) {
    console.error("API Fetch Failed:", err.message);
  }
}`,
            output: "Retrieved 12 courses from API successfully.",
            visualDiagramTitle: "Client-Server HTTP REST API Lifecycle",
            visualDiagram: `[Browser Web Client (fetch)] ──HTTP GET /courses (Headers + Bearer Auth)──> [API Gateway / Reverse Proxy]
                                                                                │
                                                                                ▼
[Browser receives JSON] <──HTTP 200 OK Response (Content-Type: JSON)────── [Backend Application & DB]`,
            lineExplanations: [
              { line: "fetch(url, { method: 'GET' })", explanation: "Standard asynchronous browser network call returning a Promise." },
              { line: "if (!response.ok)", explanation: "Checks if HTTP status is outside the successful 200-299 range." },
              { line: "await response.json();", explanation: "Parses readable stream buffer into a native JavaScript object." }
            ],
            keyPoints: [
              "CORS (Cross-Origin Resource Sharing) headers must be permitted by the server for browser requests.",
              "GET requests should be idempotent (safe to repeat without altering server state).",
              "Always handle network failures with try/catch and user-friendly error indicators."
            ],
            quiz: {
              question: "Which HTTP status code signifies that a new database resource was created successfully?",
              options: ["200 OK", "201 Created", "204 No Content", "304 Not Modified"],
              correctIndex: 1,
              explanation: "HTTP 201 Created indicates the request succeeded and a new resource was created on the server."
            }
          },
          {
            id: "web-4-2",
            title: "Client-Side Storage: LocalStorage, SessionStorage & IndexedDB",
            slug: "web-storage",
            level: "Advanced",
            language: "javascript",
            tldr: "Persist user settings, authentication tokens, and offline cached data directly inside the browser sandbox.",
            description: "Web browsers provide several client-side storage tiers. LocalStorage stores up to ~5-10MB of key-value string data that persists indefinitely across sessions. SessionStorage clears automatically when the tab closes. IndexedDB provides a high-capacity transactional NoSQL object store for large offline data.",
            code: `// Saving structured application state to localStorage
const userPreferences = {
  theme: "dark",
  fontSize: 16,
  autoRunCode: true,
  lastVisitedCourse: "javascript"
};

// Serialize object to JSON string before saving
localStorage.setItem("user_settings", JSON.stringify(userPreferences));

// Retrieve and parse saved state
const savedRaw = localStorage.getItem("user_settings");
if (savedRaw) {
  const loadedSettings = JSON.parse(savedRaw);
  console.log("Loaded active theme:", loadedSettings.theme);
  console.log("Auto-run enabled:", loadedSettings.autoRunCode);
}`,
            output: "Loaded active theme: dark\nAuto-run enabled: true",
            visualDiagramTitle: "Browser Storage Tier Architecture Comparison",
            visualDiagram: `[Cookies (~4KB)] ──Sent with every HTTP request automatically (Session IDs)
[SessionStorage (~5MB)] ──Tab Scope: Clears when user closes tab
[LocalStorage (~5-10MB)] ──Domain Scope: Persists indefinitely across reboots
[IndexedDB (>500MB)] ──Asynchronous Indexed NoSQL database for offline PWAs`,
            lineExplanations: [
              { line: "localStorage.setItem(key, value);", explanation: "Stores key-value pair as a string in browser domain sandbox." },
              { line: "JSON.stringify(obj)", explanation: "Serializes JavaScript object into JSON text for storage." },
              { line: "JSON.parse(str)", explanation: "Deserializes stored string back into usable JavaScript object." }
            ],
            keyPoints: [
              "LocalStorage and SessionStorage are synchronous and block the main thread on large read/writes.",
              "Never store sensitive unencrypted passwords or credit cards in localStorage due to XSS vulnerability risks.",
              "Use IndexedDB with libraries like Dexie.js for gigabytes of offline client-side caching."
            ],
            quiz: {
              question: "When does data stored inside sessionStorage get cleared by the browser?",
              options: ["Never", "When the user closes the browser tab or window", "Every 24 hours", "When the computer restarts"],
              correctIndex: 1,
              explanation: "sessionStorage data is strictly scoped to the active browser tab session and cleared upon tab closure."
            }
          }
        ]
      }
    ]
  }
]

