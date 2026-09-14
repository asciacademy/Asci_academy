import { CoursePart } from "./c-course-data"

export const CSS_COURSE_PARTS: CoursePart[] = [
  {
    id: "css-part-1",
    title: "Part 1: CSS3 Foundations & The Box Model",
    badge: "Beginner",
    description: "Master CSS syntax, the cascading specificity rules, colors, typography, and the foundational box model.",
    chapters: [
      {
        id: "css-ch-1",
        title: "Selectors & Box Model",
        level: "Beginner",
        lessons: [
          {
            id: "css-1-1",
            title: "CSS Syntax, Selectors & Specificity",
            slug: "css-selectors-cascade",
            level: "Beginner",
            language: "css",
            tldr: "CSS (Cascading Style Sheets) applies styling rules to HTML elements using selectors, properties, and values.",
            description: "CSS rules consist of a selector (what to style) and a declaration block (how to style it). The browser resolves conflicting styles using the Cascade: specificity scores determine whether an element selector (1 pt), class selector (10 pts), or ID selector (100 pts) wins.",
            code: `/* Element Selector (Score: 1) */
p {
  color: #94a3b8;
  line-height: 1.6;
}

/* Class Selector (Score: 10) - Recommended for components */
.feature-badge {
  background-color: #0284c7;
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 9999px;
  font-weight: 600;
  display: inline-block;
}

/* Pseudo-class hover state */
.feature-badge:hover {
  background-color: #0369a1;
}`,
            output: "Rendered styled badge with hover reaction.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 24px; background: #0f172a; border-radius: 12px;">
  <p style="color: #94a3b8; margin-top: 0;">Component Preview:</p>
  <div style="display: flex; gap: 12px; align-items: center;">
    <span style="background: #0284c7; color: white; padding: 6px 14px; border-radius: 9999px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(2, 132, 199, 0.4);">
      .feature-badge
    </span>
    <span style="background: #10b981; color: white; padding: 6px 14px; border-radius: 9999px; font-weight: 600; font-size: 14px;">
      .status-active
    </span>
  </div>
</div>`,
            visualDiagramTitle: "CSS Specificity Weight Scale Hierarchy",
            visualDiagram: `[!important Override] -> [Inline Styles (style="...")] -> [ID Selectors (#hero)] -> [Class & Pseudo Selectors (.card:hover)] -> [Element Selectors (p, div)]`,
            lineExplanations: [
              { line: ".feature-badge", explanation: "Target all elements with class='feature-badge' in HTML." },
              { line: "border-radius: 9999px;", explanation: "Pill shape: renders perfectly rounded capsule borders." },
              { line: ".feature-badge:hover", explanation: "Applies alternate styles when user cursor hovers over element." }
            ],
            keyPoints: [
              "Always prefer classes over IDs for reusability and manageable specificity.",
              "Avoid !important whenever possible; solve specificity through clean class naming like BEM.",
              "Later rules in the stylesheet override earlier rules of equal specificity."
            ],
            quiz: {
              question: "Which CSS selector has the highest specificity score?",
              options: ["p", ".hero-title", "#main-nav", "div.card"],
              correctIndex: 2,
              explanation: "ID selectors (#) have a specificity weight of 100, outranking class selectors (10) and element selectors (1)."
            }
          },
          {
            id: "css-1-2",
            title: "The CSS Box Model & box-sizing: border-box",
            slug: "css-box-model",
            level: "Beginner",
            language: "css",
            tldr: "Every HTML element is a box composed of Content, Padding, Border, and Margin.",
            description: "Understanding the Box Model is the most critical foundation in CSS. In the default 'content-box', adding padding or borders expands the element beyond its defined width! Setting 'box-sizing: border-box' ensures padding and borders stay inside the allocated width, making sizing intuitive.",
            code: `* {
  /* Universal reset: ensures widths stay predictable */
  box-sizing: border-box;
}

.pricing-card {
  width: 300px;
  background: #1e293b;
  color: #f8fafc;
  padding: 24px;         /* Inside the border */
  border: 2px solid #38bdf8; /* The perimeter */
  margin: 16px auto;      /* Outside the border */
  border-radius: 12px;
}`,
            output: "Rendered card conforming to border-box dimensions.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px;">
  <div style="box-sizing: border-box; width: 280px; margin: 0 auto; background: #1e293b; color: white; padding: 20px; border: 2px solid #38bdf8; border-radius: 10px; text-align: center;">
    <div style="font-size: 12px; text-transform: uppercase; color: #38bdf8; font-weight: bold; letter-spacing: 1px;">Box Model</div>
    <h3 style="margin: 8px 0; color: #f8fafc;">Pro Tier</h3>
    <div style="background: #0f172a; padding: 10px; border-radius: 6px; font-size: 13px; color: #94a3b8;">
      Content + Padding + Border
    </div>
  </div>
</div>`,
            visualDiagramTitle: "CSS Box Model Concentric Layer Architecture",
            visualDiagram: `[Margin (Transparent outer spacing)] 
    └── [Border (Configurable line)] 
          └── [Padding (Internal clearance)] 
                └── [Content (Text, images, child nodes)]`,
            lineExplanations: [
              { line: "box-sizing: border-box;", explanation: "Total element width = content + padding + border." },
              { line: "padding: 24px;", explanation: "Creates breathable clearance between content and inner edge of border." },
              { line: "margin: 16px auto;", explanation: "Centers block elements horizontally by distributing remaining space equally." }
            ],
            keyPoints: [
              "Content: The actual text, image, or nested children.",
              "Padding: Space between content and the border (clears background color).",
              "Border: Line enclosing padding and content.",
              "Margin: Space separating this box from surrounding neighboring elements."
            ],
            quiz: {
              question: "What CSS property ensures padding and borders are included inside an element's declared width?",
              options: ["display: flex", "box-sizing: border-box", "overflow: hidden", "margin: auto"],
              correctIndex: 1,
              explanation: "box-sizing: border-box forces the browser to calculate width from border-to-border rather than just content."
            }
          }
        ]
      }
    ]
  },
  {
    id: "css-part-2",
    title: "Part 2: Modern Layout Systems: Flexbox & CSS Grid",
    badge: "Intermediate",
    description: "Construct modern responsive interfaces with one-dimensional Flexbox and two-dimensional CSS Grid.",
    chapters: [
      {
        id: "css-ch-2",
        title: "Flexbox & Grid Mastery",
        level: "Intermediate",
        lessons: [
          {
            id: "css-2-1",
            title: "CSS Flexbox Complete Guide",
            slug: "css-flexbox",
            level: "Intermediate",
            language: "css",
            tldr: "Flexbox provides 1-dimensional alignment along a main axis (row or column) with flexible item distribution.",
            description: "Before Flexbox, centering elements in CSS was notorious. With display: flex on a container, you gain full control: justify-content controls main-axis alignment (horizontal in rows), align-items controls cross-axis alignment (vertical in rows), and gap provides spacing without margin hacks.",
            code: `.nav-container {
  display: flex;
  justify-content: space-between; /* Pushes items to opposite edges */
  align-items: center;            /* Perfect vertical centering */
  gap: 16px;
  background: #1e293b;
  padding: 12px 24px;
  border-radius: 8px;
}

.nav-links {
  display: flex;
  gap: 20px;
}`,
            output: "Rendered responsive navigation bar using Flexbox.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px;">
  <div style="display: flex; justify-content: space-between; align-items: center; background: #1e293b; padding: 14px 20px; border-radius: 8px;">
    <div style="font-weight: bold; color: #38bdf8; display: flex; align-items: center; gap: 8px;">
      <span style="width: 10px; height: 10px; background: #38bdf8; border-radius: 50%;"></span>
      ASCI Cloud
    </div>
    <div style="display: flex; gap: 16px; font-size: 14px;">
      <span style="color: #cbd5e1; cursor: pointer;">Docs</span>
      <span style="color: #cbd5e1; cursor: pointer;">Pricing</span>
      <span style="color: #10b981; font-weight: 600; cursor: pointer;">Dashboard</span>
    </div>
  </div>
</div>`,
            visualDiagramTitle: "Flexbox Main Axis & Cross Axis Orientation",
            visualDiagram: `[Flex Container: display: flex] 
    Main Axis (justify-content): ───Start ──── Center ──── End ──── Space-Between───>
    Cross Axis (align-items):    │ Start
                                 │ Center (Vertical Centering)
                                 ▼ End`,
            lineExplanations: [
              { line: "display: flex;", explanation: "Transforms direct children into flexible flex-items." },
              { line: "justify-content: space-between;", explanation: "First item on start edge, last item on end edge, equal spacing between." },
              { line: "align-items: center;", explanation: "Centers all items along cross-axis effortlessly." }
            ],
            keyPoints: [
              "Flexbox is ideal for 1D components: navbars, button groups, search bars, and card rows.",
              "flex: 1 on a child makes it grow to occupy all available remaining space.",
              "flex-wrap: wrap allows flex items to wrap onto new lines on mobile viewports."
            ],
            quiz: {
              question: "Which Flexbox property aligns items along the primary main axis?",
              options: ["align-items", "justify-content", "flex-direction", "align-content"],
              correctIndex: 1,
              explanation: "justify-content aligns children along the main axis (horizontal by default in row layout)."
            }
          },
          {
            id: "css-2-2",
            title: "CSS Grid Complete Guide",
            slug: "css-grid",
            level: "Intermediate",
            language: "css",
            tldr: "CSS Grid is a 2-dimensional layout system that handles rows and columns simultaneously.",
            description: "While Flexbox excels at 1D rows or columns, CSS Grid is built for 2D macro layouts. Using grid-template-columns with the fractional fr unit and repeat(auto-fit, minmax(250px, 1fr)), you can create responsive multi-column card dashboards without writing a single media query!",
            code: `.dashboard-grid {
  display: grid;
  /* Auto-responsive columns: expands or wraps smoothly */
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: #1e293b;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #334155;
}`,
            output: "Rendered multi-column responsive grid layout.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 12px;">
    <div style="background: #1e293b; padding: 14px; border-radius: 8px; border-left: 3px solid #38bdf8;">
      <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">Active Nodes</div>
      <div style="font-size: 20px; font-weight: bold; color: white; margin-top: 4px;">1,428</div>
    </div>
    <div style="background: #1e293b; padding: 14px; border-radius: 8px; border-left: 3px solid #10b981;">
      <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">API Latency</div>
      <div style="font-size: 20px; font-weight: bold; color: white; margin-top: 4px;">14ms</div>
    </div>
    <div style="background: #1e293b; padding: 14px; border-radius: 8px; border-left: 3px solid #f59e0b;">
      <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">Throughput</div>
      <div style="font-size: 20px; font-weight: bold; color: white; margin-top: 4px;">48.2k/s</div>
    </div>
  </div>
</div>`,
            visualDiagramTitle: "2D CSS Grid Matrix Template",
            visualDiagram: `[Grid Container: display: grid]
   Column 1 (1fr)        Column 2 (1fr)        Column 3 (1fr)
 ┌─────────────────────┬─────────────────────┬─────────────────────┐
 │ Row 1, Col 1        │ Row 1, Col 2        │ Row 1, Col 3        │
 ├─────────────────────┼─────────────────────┼─────────────────────┤
 │ Row 2, Col 1        │ Row 2, Col 2        │ Row 2, Col 3        │
 └─────────────────────┴─────────────────────┴─────────────────────┘`,
            lineExplanations: [
              { line: "grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));", explanation: "Creates as many 200px+ columns as will fit, distributing extra space evenly." },
              { line: "gap: 16px;", explanation: "Uniform gutters between grid cells without edge margins." }
            ],
            keyPoints: [
              "1fr represents 1 fractional share of the remaining available free space.",
              "grid-template-areas allows naming visual layout zones (header, main, sidebar, footer).",
              "CSS Grid handles both horizontal columns and vertical rows simultaneously."
            ],
            quiz: {
              question: "What unit in CSS Grid represents a fraction of the remaining container space?",
              options: ["px", "%", "fr", "rem"],
              correctIndex: 2,
              explanation: "The fr (fractional) unit dynamically distributes remaining free container space amongst tracks."
            }
          }
        ]
      }
    ]
  },
  {
    id: "css-part-3",
    title: "Part 3: Advanced CSS3: Animations, Variables & Architecture",
    badge: "Advanced",
    description: "Elevate your web UI with hardware-accelerated transforms, keyframe animations, CSS custom properties, and container queries.",
    chapters: [
      {
        id: "css-ch-3",
        title: "Animations & Modern Features",
        level: "Advanced",
        lessons: [
          {
            id: "css-3-1",
            title: "CSS Keyframe Animations & GPU Transforms",
            slug: "css-animations-transforms",
            level: "Advanced",
            language: "css",
            tldr: "Use @keyframes and transform/opacity for silky 60fps animations accelerated directly by the GPU.",
            description: "Animating layout properties like width, height, or top causes browser layout recalculations and repaint penalties. Animating transform (translate, rotate, scale) and opacity offloads processing directly to the GPU compositor layer, maintaining a stable 60 to 120 frames per second.",
            code: `@keyframes pulseGlow {
  0% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 20px 8px rgba(56, 189, 248, 0.3);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 0 0 0 rgba(56, 189, 248, 0);
  }
}

.pulsing-button {
  background: #0284c7;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  animation: pulseGlow 2s infinite ease-in-out;
}`,
            output: "Rendered hardware-accelerated animated button.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 30px; background: #0f172a; border-radius: 8px; text-align: center;">
  <style>
    @keyframes liveGlow {
      0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.7); }
      50% { transform: scale(1.04); box-shadow: 0 0 16px 4px rgba(56, 189, 248, 0.4); }
      100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0); }
    }
  </style>
  <button style="background: #0284c7; color: white; padding: 12px 28px; border-radius: 8px; border: none; font-weight: 600; font-size: 15px; cursor: pointer; animation: liveGlow 2s infinite ease-in-out;">
    Launch Cloud Instance
  </button>
</div>`,
            visualDiagramTitle: "Browser Rendering Engine Pipeline (Jank vs 60fps)",
            visualDiagram: `Animating top/left/width: [JavaScript] -> [Layout (Recalculate Bounds)] -> [Paint (Rasterize Pixels)] -> [Composite] (Heavy Jank!)
Animating transform/opacity: [JavaScript] ────────────────────────── Direct to GPU Compositor ────────────> [Composite Layer] (Smooth 60-120fps!)`,
            lineExplanations: [
              { line: "@keyframes pulseGlow", explanation: "Defines animation progression from 0% start to 100% completion." },
              { line: "transform: scale(1.05);", explanation: "Scales element by 5% without shifting surrounding layout flow." },
              { line: "animation: pulseGlow 2s infinite ease-in-out;", explanation: "Triggers animation name, duration, infinite repetitions, and acceleration curve." }
            ],
            keyPoints: [
              "Only animate transform and opacity for peak rendering performance.",
              "will-change: transform hints the browser engine to promote the element to its own GPU compositor layer.",
              "cubic-bezier() curves allow creating custom bouncy physics-like springs."
            ],
            quiz: {
              question: "Which properties can the browser animate on the GPU compositor without triggering layout or paint?",
              options: ["width and height", "margin and padding", "transform and opacity", "top and left"],
              correctIndex: 2,
              explanation: "transform and opacity bypass the layout and paint stages completely, running smoothly on the GPU."
            }
          },
          {
            id: "css-3-2",
            title: "CSS Custom Properties (Variables) & Dark Mode",
            slug: "css-variables-dark-mode",
            level: "Advanced",
            language: "css",
            tldr: "CSS Variables (:root { --token: ... }) enable dynamic design system tokens and instant dark mode theming.",
            description: "CSS Custom Properties are reactive cascading variables defined with a double-hyphen prefix (--brand-color). Unlike Sass/SCSS compile-time variables, native CSS variables live in the browser DOM and can be changed in real time via media queries (@media (prefers-color-scheme: dark)) or JavaScript.",
            code: `:root {
  --bg-primary: #ffffff;
  --text-primary: #0f172a;
  --accent-color: #0284c7;
}

/* Automatic Dark Mode detection from user OS preference */
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #0f172a;
    --text-primary: #f8fafc;
    --accent-color: #38bdf8;
  }
}

.themed-container {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border: 1px solid var(--accent-color);
  padding: 20px;
  border-radius: 8px;
}`,
            output: "Rendered theme-reactive container.",
            livePreviewHtml: `<div style="font-family: system-ui, sans-serif; padding: 20px; background: #0f172a; border-radius: 8px;">
  <div style="background: #1e293b; color: #f8fafc; border: 1px solid #38bdf8; padding: 20px; border-radius: 8px;">
    <div style="color: #38bdf8; font-weight: bold; font-size: 13px; text-transform: uppercase;">Design Token System</div>
    <h3 style="margin: 6px 0;">--accent-color: #38bdf8</h3>
    <p style="margin: 0; color: #94a3b8; font-size: 14px;">
      Variables cascade through the DOM tree and dynamically inherit down to all children!
    </p>
  </div>
</div>`,
            visualDiagramTitle: "CSS Variable Scoping & Inheritance Cascade",
            visualDiagram: `[:root (Global Theme Tokens: --bg, --text, --accent)]
        │
        ├── [.component (Inherits --accent, overrides locally if needed)]
        └── [@media (prefers-color-scheme: dark) -> Swaps :root values in 1 line]`,
            lineExplanations: [
              { line: ":root { --accent-color: #0284c7; }", explanation: "Declares global design token accessible to all DOM elements." },
              { line: "var(--accent-color, #000)", explanation: "Reads variable value with optional fallback if undefined." },
              { line: "@media (prefers-color-scheme: dark)", explanation: "Native media query querying user OS dark mode switch." }
            ],
            keyPoints: [
              "CSS variables are fully accessible and mutable from JavaScript via element.style.setProperty().",
              "You can scope variables to specific components (.card { --padding: 12px; }).",
              "Enables instant theme toggling without duplicating stylesheet code."
            ],
            quiz: {
              question: "How do you access a CSS custom property named --brand-color in your styles?",
              options: ["$brand-color", "var(--brand-color)", "@brand-color", "get(--brand-color)"],
              correctIndex: 1,
              explanation: "Native CSS variables are accessed using the var() functional notation: var(--brand-color)."
            }
          }
        ]
      }
    ]
  }
]
