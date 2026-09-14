import { CoursePart } from "./c-course-data"

export const HTML_COURSE_PARTS: CoursePart[] = [
  {
    id: "html-part-1",
    title: "Part 1: HTML5 Foundations & Document Anatomy",
    badge: "Beginner",
    description: "Understand the core skeleton of every website: doctypes, elements, tags, typography, and links.",
    chapters: [
      {
        id: "html-ch-1",
        title: "HTML5 Essentials",
        level: "Beginner",
        lessons: [
          {
            id: "html-1-1",
            title: "HTML5 Document Structure & First Page",
            slug: "html-structure",
            level: "Beginner",
            language: "html",
            tldr: "HTML (HyperText Markup Language) describes the structure of web pages using tags enclosed in angle brackets.",
            description: "Every web page on the internet starts with a standard HTML5 document skeleton. The <!DOCTYPE html> declaration informs the browser that this is an HTML5 document. The <html> root tag wraps everything, <head> holds metadata and page titles, and <body> contains all visual content seen by users.",
            code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Web Page</title>
</head>
<body style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; color: #f8fafc;">
  <h1 style="color: #38bdf8;">Hello, World!</h1>
  <p>Welcome to modern web development with HTML5.</p>
</body>
</html>`,
            output: "Rendered HTML Document with title and body.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; color: #f8fafc; border-radius: 12px;">
  <h1 style="color: #38bdf8; margin-top: 0;">Hello, World!</h1>
  <p style="color: #94a3b8; font-size: 16px;">Welcome to modern web development with HTML5.</p>
  <div style="display: inline-block; padding: 8px 16px; background: #0284c7; color: white; border-radius: 6px; font-weight: 500;">
    Live HTML5 Preview
  </div>
</div>`,
            visualDiagramTitle: "HTML Document Object Model (DOM) Tree Hierarchy",
            visualDiagram: `[<!DOCTYPE html>] -> [<html> Root Element]
       ├── [<head> Metadata & Title]
       └── [<body> Visual Content Container]
             ├── [<h1> Primary Heading]
             └── [<p> Paragraph Body Text]`,
            lineExplanations: [
              { line: "<!DOCTYPE html>", explanation: "Tells modern browsers to render using HTML5 standard mode." },
              { line: '<html lang="en">', explanation: "Root element specifying English language for search engines and accessibility." },
              { line: "<head> ... </head>", explanation: "Contains page metadata, viewport configs, CSS stylesheets, and the page title." },
              { line: "<body> ... </body>", explanation: "Contains all the visible content rendered on screen." }
            ],
            keyPoints: [
              "HTML is markup, not programming—it provides structural meaning (semantics).",
              "Tags almost always come in pairs: <opening>content</closing>.",
              "Elements can contain attributes providing extra configuration like href or class."
            ],
            quiz: {
              question: "Which declaration must be the very first line of any modern HTML5 document?",
              options: ["<html>", "<!DOCTYPE html>", "<head>", "<meta charset='utf-8'>"],
              correctIndex: 1,
              explanation: "<!DOCTYPE html> is required at the very top to trigger standards compliance rendering in web browsers."
            }
          },
          {
            id: "html-1-2",
            title: "Headings, Paragraphs & Text Formatting",
            slug: "html-headings-text",
            level: "Beginner",
            language: "html",
            tldr: "Use h1-h6 for document heading outlines and p for readable text paragraphs.",
            description: "Headings structure your document hierarchy for readers and search engine crawlers (SEO). There should only be one <h1> per page representing the main topic. Use <strong> to convey strong importance (bold) and <em> to add stress emphasis (italic).",
            code: `<div style="font-family: system-ui, sans-serif;">
  <h1>Enterprise Cloud Architecture</h1>
  <h2>Core Infrastructure</h2>
  <p>
    Modern cloud systems rely on <strong>distributed microservices</strong> 
    and <em>resilient networks</em>.
  </p>
  <p>Learn more about containerized clusters below.</p>
</div>`,
            output: "Rendered structured headings and formatted text.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #1e293b; color: #f8fafc; border-radius: 8px;">
  <h1 style="color: #60a5fa; font-size: 24px; margin-bottom: 4px;">Enterprise Cloud Architecture</h1>
  <h2 style="color: #94a3b8; font-size: 18px; margin-top: 0;">Core Infrastructure</h2>
  <p style="line-height: 1.6; color: #cbd5e1;">
    Modern cloud systems rely on <strong style="color: #38bdf8;">distributed microservices</strong> 
    and <em style="color: #f472b6;">resilient networks</em>.
  </p>
</div>`,
            visualDiagramTitle: "Semantic Heading Hierarchy Scale",
            visualDiagram: `[h1: Page Main Subject (1 per page)]
    └── [h2: Major Section Block]
          ├── [h3: Subsection Topic]
          └── [h3: Subsection Topic]`,
            lineExplanations: [
              { line: "<h1> ... </h1>", explanation: "Most important heading; prime signal for Google SEO ranking." },
              { line: "<strong> ... </strong>", explanation: "Marks content with high importance and typically renders bold." },
              { line: "<em> ... </em>", explanation: "Marks content with spoken acoustic stress emphasis and renders in italics." }
            ],
            keyPoints: [
              "Never skip heading levels (e.g. going directly from h1 to h4).",
              "Use CSS for visual sizing; use HTML tags strictly for structural meaning.",
              "<p> elements automatically have block margin spacing in browser user-agent stylesheets."
            ],
            quiz: {
              question: "How many <h1> tags should typically be used on a single web page for optimal SEO?",
              options: ["As many as needed", "Exactly 1", "None", "One per paragraph"],
              correctIndex: 1,
              explanation: "Best practices and search engines recommend exactly one <h1> per page to define the primary topic."
            }
          },
          {
            id: "html-1-3",
            title: "Hyperlinks & Navigation with Anchor Tags",
            slug: "html-links",
            level: "Beginner",
            language: "html",
            tldr: "The <a> anchor tag links pages together across the World Wide Web using the href attribute.",
            description: "Hyperlinks are the core foundation of the web. The <a> element uses href (Hypertext REFerence) to link to other URLs, downloadable files, or specific section IDs on the current page (#section-id). Use target='_blank' to open links in a new browser tab safely.",
            code: `<nav style="display: flex; gap: 16px; font-family: system-ui, sans-serif;">
  <a href="https://example.com" target="_blank" rel="noopener noreferrer" style="color: #38bdf8; text-decoration: none;">
    Visit Website &rarr;
  </a>
  <a href="mailto:support@example.com" style="color: #a78bfa; text-decoration: none;">
    Email Support
  </a>
</nav>`,
            output: "Rendered interactive navigation links.",
            livePreviewHtml: `<div style="padding: 20px; background: #0f172a; border-radius: 8px; font-family: system-ui, sans-serif;">
  <p style="color: #94a3b8; margin-top: 0;">Interactive Navigation Bar:</p>
  <div style="display: flex; gap: 20px;">
    <a href="#" style="color: #38bdf8; font-weight: 600; text-decoration: none; padding: 6px 12px; background: #1e293b; border-radius: 6px;">
      Home
    </a>
    <a href="#" style="color: #38bdf8; font-weight: 600; text-decoration: none; padding: 6px 12px; background: #1e293b; border-radius: 6px;">
      Documentation &rarr;
    </a>
    <a href="#" style="color: #10b981; font-weight: 600; text-decoration: none; padding: 6px 12px; background: #1e293b; border-radius: 6px;">
      Sign In
    </a>
  </div>
</div>`,
            visualDiagramTitle: "Hyperlink Navigation Flow",
            visualDiagram: `[User Click on <a href="url">] -> [Browser Address Resolver] -> [HTTP GET Request to Server] -> [Loads & Parses Destination Document]`,
            lineExplanations: [
              { line: '<a href="https://...">', explanation: "href specifies the target web address or URI path." },
              { line: 'target="_blank"', explanation: "Directs browser to spawn a new browser tab for the destination." },
              { line: 'rel="noopener noreferrer"', explanation: "Security attribute preventing the newly opened tab from hijacking window.opener." }
            ],
            keyPoints: [
              "Always include rel='noopener noreferrer' when using target='_blank' for security.",
              "mailto: and tel: protocols trigger email clients and phone dialers respectively.",
              "Anchor links (<a href='#faq'>) jump smoothly to elements with id='faq'."
            ],
            quiz: {
              question: "Which security attribute should always accompany target='_blank' on external links?",
              options: ["rel='external'", "rel='noopener noreferrer'", "type='secure'", "safe='true'"],
              correctIndex: 1,
              explanation: "rel='noopener noreferrer' prevents reverse tab-nabbing vulnerabilities where foreign pages manipulate the origin window."
            }
          }
        ]
      }
    ]
  },
  {
    id: "html-part-2",
    title: "Part 2: Semantic Elements, Layout & Media",
    badge: "Intermediate",
    description: "Build clean, accessible document outlines using HTML5 semantic elements and embed multimedia video, audio, and SVG.",
    chapters: [
      {
        id: "html-ch-2",
        title: "Semantic Structure & Media",
        level: "Intermediate",
        lessons: [
          {
            id: "html-2-1",
            title: "HTML5 Semantic Layout Architecture",
            slug: "html-semantics",
            level: "Intermediate",
            language: "html",
            tldr: "Semantic tags clearly describe their meaning to both the browser, search engines, and screen readers.",
            description: "In older HTML, developers used generic <div class='header'> tags everywhere. HTML5 introduced semantic container tags: <header>, <nav>, <main>, <article>, <section>, <aside>, and <footer>. This makes code clean, maintainable, and naturally accessible to screen readers.",
            code: `<header style="padding: 16px; background: #1e293b; color: white;">
  <h2>DevPortal</h2>
  <nav><a href="#feed" style="color: #38bdf8;">Community Feed</a></nav>
</header>
<main style="padding: 16px; background: #0f172a; color: #f8fafc;">
  <article style="background: #1e293b; padding: 16px; border-radius: 8px;">
    <h3>Building Resilient APIs</h3>
    <p>Rate limiting, circuit breakers, and idempotency keys.</p>
  </article>
</main>
<footer style="padding: 12px; background: #020617; color: #64748b; font-size: 12px;">
  &copy; 2026 ASCI Education Inc.
</footer>`,
            output: "Rendered semantic layout structure.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; border-radius: 8px; overflow: hidden; border: 1px solid #334155;">
  <header style="padding: 12px 16px; background: #1e293b; color: #f8fafc; display: flex; justify-content: space-between; align-items: center;">
    <strong style="color: #38bdf8;">ASCI Academy</strong>
    <span style="font-size: 13px; color: #94a3b8;">&lt;header&gt; &amp; &lt;nav&gt;</span>
  </header>
  <main style="padding: 16px; background: #0f172a; color: #f8fafc;">
    <article style="background: #1e293b; padding: 12px 16px; border-radius: 6px; border-left: 4px solid #10b981;">
      <h4 style="margin: 0 0 6px 0; color: #f1f5f9;">&lt;article&gt;: Modern Web Standards</h4>
      <p style="margin: 0; font-size: 13px; color: #94a3b8;">Self-contained syndicateable content block.</p>
    </article>
  </main>
  <footer style="padding: 8px 16px; background: #020617; color: #64748b; font-size: 12px; text-align: center;">
    &lt;footer&gt; &copy; 2026 Semantic Web
  </footer>
</div>`,
            visualDiagramTitle: "Semantic Web Page Architecture Blueprint",
            visualDiagram: `[<header> Site Brand & Global Navigation]
      ├── [<nav> Primary Routing Links]
[<main> Unique Page Body Content]
      ├── [<article> Self-contained Post / News Item]
      ├── [<section> Thematic Group of Headings & Text]
      └── [<aside> Secondary Sidebar / Related Links]
[<footer> Copyright, Legal & Sitemap Links]`,
            lineExplanations: [
              { line: "<header> ... </header>", explanation: "Introductory content or navigation group." },
              { line: "<main> ... </main>", explanation: "Represents the dominant, unique content of the document. Only one allowed per page." },
              { line: "<article> ... </article>", explanation: "Self-contained composition that makes sense on its own (e.g. blog post, card)." }
            ],
            keyPoints: [
              "Screen readers jump directly to <main>, allowing visually impaired users to bypass navigation menus.",
              "<section> groups related content under a heading.",
              "<aside> contains tangentially related content like sidebars or author bios."
            ],
            quiz: {
              question: "Which HTML5 element should hold the primary, non-repeating core content of a web page?",
              options: ["<section>", "<div>", "<main>", "<article>"],
              correctIndex: 2,
              explanation: "<main> designates the central unique content of the page, excluding recurring headers and footers."
            }
          },
          {
            id: "html-2-2",
            title: "HTML5 Forms & Modern Input Validation",
            slug: "html-forms",
            level: "Intermediate",
            language: "html",
            tldr: "HTML5 forms capture user input and enforce built-in browser validation rules without JavaScript.",
            description: "Forms collect user data through <input>, <select>, and <textarea> elements. HTML5 introduced specific type attributes (email, number, tel, date, url) that automatically validate inputs, show appropriate mobile keyboards, and accept constraints like required, min, max, and regex pattern.",
            code: `<form action="/api/submit" method="POST" style="display: grid; gap: 12px; font-family: system-ui, sans-serif;">
  <label for="email" style="font-size: 14px; font-weight: 500;">Email Address:</label>
  <input type="email" id="email" name="email" required placeholder="user@company.com" 
         style="padding: 8px 12px; border: 1px solid #475569; border-radius: 6px; background: #1e293b; color: white;">

  <label for="tickets" style="font-size: 14px; font-weight: 500;">Number of Tickets (1-5):</label>
  <input type="number" id="tickets" name="tickets" min="1" max="5" value="1"
         style="padding: 8px 12px; border: 1px solid #475569; border-radius: 6px; background: #1e293b; color: white;">

  <button type="submit" style="padding: 10px; background: #0284c7; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
    Register Now
  </button>
</form>`,
            output: "Rendered validating input form.",
            livePreviewHtml: `<div style="padding: 20px; background: #0f172a; border-radius: 8px; font-family: system-ui, sans-serif; color: white; max-width: 360px;">
  <h3 style="margin-top: 0; color: #38bdf8;">Attendee Registration</h3>
  <div style="display: grid; gap: 12px;">
    <div>
      <label style="display: block; font-size: 12px; color: #94a3b8; margin-bottom: 4px;">Developer Email</label>
      <input type="email" placeholder="dev@domain.com" style="width: 100%; box-sizing: border-box; padding: 8px 12px; background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: white;">
    </div>
    <div>
      <label style="display: block; font-size: 12px; color: #94a3b8; margin-bottom: 4px;">Experience Level</label>
      <select style="width: 100%; box-sizing: border-box; padding: 8px 12px; background: #1e293b; border: 1px solid #334155; border-radius: 6px; color: white;">
        <option>Beginner (0-1 yrs)</option>
        <option>Intermediate (2-4 yrs)</option>
        <option>Senior Engineer (5+ yrs)</option>
      </select>
    </div>
    <button style="padding: 10px; background: #2563eb; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">
      Submit Application
    </button>
  </div>
</div>`,
            visualDiagramTitle: "Browser Form Validation & Submission Cycle",
            visualDiagram: `[User Submits Form] -> [Browser checks 'required', 'type', 'pattern']
        ├── If Invalid: Browser blocks submission & shows native tooltip
        └── If Valid: Encodes payload (application/x-www-form-urlencoded) -> [HTTP POST to Server]`,
            lineExplanations: [
              { line: '<input type="email" required>', explanation: "Validates for correct email formatting (@ symbol and domain) before allowing submit." },
              { line: '<label for="email">', explanation: "Binds click focus and accessibility cues to the input with matching id." },
              { line: '<button type="submit">', explanation: "Fires form submission event when clicked or on Enter key press." }
            ],
            keyPoints: [
              "Always connect <label for='id'> to <input id='id'> for accessibility.",
              "Use type='password' to mask characters and trigger password manager autocompletion.",
              "Inputs must have a 'name' attribute, otherwise their value is omitted from the submission payload."
            ],
            quiz: {
              question: "What attribute links a <label> element directly to its corresponding <input>?",
              options: ["name", "for", "connect", "target"],
              correctIndex: 1,
              explanation: "The 'for' attribute of a label must match the 'id' attribute of the input to associate them."
            }
          }
        ]
      }
    ]
  },
  {
    id: "html-part-3",
    title: "Part 3: Advanced HTML5, Web Components & ARIA",
    badge: "Advanced",
    description: "Master modern custom elements, Shadow DOM encapsulation, WAI-ARIA accessibility, and web app manifests.",
    chapters: [
      {
        id: "html-ch-3",
        title: "Web Components & Accessibility",
        level: "Advanced",
        lessons: [
          {
            id: "html-3-1",
            title: "Web Accessibility (a11y) & WAI-ARIA Roles",
            slug: "html-accessibility-aria",
            level: "Advanced",
            language: "html",
            tldr: "ARIA (Accessible Rich Internet Applications) attributes ensure interactive widgets are navigable by screen readers.",
            description: "Writing accessible HTML is a legal and ethical requirement. When native HTML elements aren't enough for custom interactive components, ARIA attributes (role, aria-label, aria-expanded, aria-hidden) announce component states, roles, and changes to assistive technologies.",
            code: `<!-- Accessible Accordion / Toggle Button -->
<button 
  type="button" 
  aria-expanded="false" 
  aria-controls="panel-1"
  aria-label="Toggle System Diagnostics Information"
  style="padding: 10px 16px; background: #0284c7; color: white; border: none; border-radius: 6px; cursor: pointer;">
  View System Metrics
</button>

<div id="panel-1" role="region" aria-labelledby="button-1" hidden style="margin-top: 8px; padding: 12px; background: #1e293b; color: #cbd5e1; border-radius: 6px;">
  <p>CPU Utilization: 12% | Memory: 4.2GB / 16GB</p>
</div>`,
            output: "Accessible interactive widget structure.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px; color: white;">
  <div style="display: flex; align-items: center; justify-content: space-between; padding: 12px; background: #1e293b; border-radius: 6px; border-left: 4px solid #0284c7;">
    <div>
      <h4 style="margin: 0; color: #f8fafc;">Server Health Status</h4>
      <span style="font-size: 12px; color: #94a3b8;" role="status">Operational (99.99% Uptime)</span>
    </div>
    <span style="padding: 4px 8px; background: #065f46; color: #34d399; font-size: 12px; border-radius: 4px; font-weight: bold;">
      WCAG AAA
    </span>
  </div>
</div>`,
            visualDiagramTitle: "Accessibility Tree Transformation Pipeline",
            visualDiagram: `[HTML DOM Tree: <button aria-expanded="false">] 
        │
        ▼ (Browser Engine Accessibility Mapper)
[Accessibility Tree: Node: Button, Name: "Toggle...", State: Collapsed] 
        │
        ▼ (OS Accessibility API: UIAutomation / AXObject)
[Screen Reader (NVDA / VoiceOver / JAWS Audio Feedback)]`,
            lineExplanations: [
              { line: 'aria-expanded="false"', explanation: "Tells assistive software whether the controlled collapsible content is open or closed." },
              { line: 'aria-controls="panel-1"', explanation: "Identifies the ID of the element whose visibility is controlled by this trigger." },
              { line: 'role="status"', explanation: "Creates a live region that screen readers automatically announce when content updates." }
            ],
            keyPoints: [
              "First rule of ARIA: Do not use ARIA if a native HTML element (<button>, <dialog>, <input>) already exists.",
              "Always ensure interactive elements are reachable via Tab key navigation.",
              "Color contrast must satisfy WCAG AA minimum of 4.5:1 for standard text."
            ],
            quiz: {
              question: "What is the golden rule regarding ARIA attributes in web development?",
              options: ["Add ARIA to every single div", "Prefer native semantic HTML elements before resorting to ARIA", "Only use ARIA on desktop sites", "ARIA replaces CSS styling"],
              correctIndex: 1,
              explanation: "The first rule of ARIA is: If you can use a native HTML element with the semantics you need, do so instead of using ARIA."
            }
          },
          {
            id: "html-3-2",
            title: "Web Components & Shadow DOM",
            slug: "html-web-components",
            level: "Advanced",
            language: "html",
            tldr: "Web Components allow creating custom, reusable, encapsulated HTML tags that work across all modern frameworks.",
            description: "Web Components are a suite of native browser features: Custom Elements, Shadow DOM, and HTML Templates. They allow you to define custom tags like <user-card> with encapsulated styles that cannot leak out and cannot be accidentally modified by global page CSS.",
            code: `<template id="user-card-template">
  <style>
    .card {
      background: #1e293b;
      color: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      font-family: system-ui, sans-serif;
      box-shadow: 0 4px 6px rgba(0,0,0,0.3);
    }
    ::slotted(span) { color: #38bdf8; font-weight: bold; }
  </style>
  <div class="card">
    <slot name="username">Default User</slot>
    <p><slot name="role">Software Engineer</slot></p>
  </div>
</template>

<!-- Usage of custom element -->
<user-card>
  <span slot="username">Ada Lovelace</span>
  <span slot="role">Computing Pioneer</span>
</user-card>`,
            output: "Rendered encapsulated Web Component.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px;">
  <div style="background: #1e293b; border-radius: 8px; padding: 16px; border: 1px solid #334155; color: white;">
    <div style="font-size: 18px; font-weight: 600; color: #38bdf8; margin-bottom: 4px;">
      &lt;user-card&gt; Web Component
    </div>
    <div style="color: #94a3b8; font-size: 14px;">
      Shadow Root Encapsulated: CSS styles are completely isolated from parent page!
    </div>
    <div style="margin-top: 12px; display: inline-block; padding: 4px 10px; background: #0284c7; color: white; border-radius: 4px; font-size: 12px;">
      Native Standard
    </div>
  </div>
</div>`,
            visualDiagramTitle: "Shadow DOM Encapsulation Boundary",
            visualDiagram: `[Main Document DOM Tree]
       └── [<custom-card> Host Element]
                 │
                 ├── [Shadow Root (Boundary Fence)]
                 │         ├── [<style> (Scoped, cannot leak out)]
                 │         └── [<div class="card">]
                 │
                 └── [<slot> Content Projection from Light DOM]`,
            lineExplanations: [
              { line: "<template id='...'>", explanation: "Holds markup that is parsed by the browser but not rendered until cloned." },
              { line: "<slot name='...'>", explanation: "Placeholder inside Shadow DOM where content from parent HTML document is projected." },
              { line: "customElements.define('tag-name', Class)", explanation: "Registers the custom HTML element tag with the browser engine." }
            ],
            keyPoints: [
              "Custom element tag names MUST contain a hyphen (e.g. user-badge, not userbadge) to avoid colliding with future HTML tags.",
              "Shadow DOM prevents CSS conflicts in large enterprise web applications and design systems.",
              "Supported natively in Chrome, Safari, Firefox, and Edge without any polyfills."
            ],
            quiz: {
              question: "Why must custom HTML element tag names always contain a hyphen (-)?",
              options: ["To conform to XML rules", "To differentiate them from standard current and future HTML tags", "Because JavaScript requires it", "For faster rendering speed"],
              correctIndex: 1,
              explanation: "The W3C specification reserves all single-word tag names for official HTML standards; hyphens ensure zero naming collisions."
            }
          }
        ]
      }
    ]
  }
]
