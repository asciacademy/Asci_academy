# ASCI Academy — Modern Interactive Learning Platform

> A production-ready, editorial-grade engineering and computer science academy platform built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4**, **Three.js**, and **Supabase**.

---

## 📁 Project Architecture & Directory Map

```text
asci-academy/
├── app/                          # Next.js 16 App Router (routes, pages, server actions & APIs)
│   ├── actions/                  # Next.js Server Actions (user profiles, auth, bookmarks)
│   ├── admin/                    # Admin portal (courses, users, testimonials, settings)
│   ├── api/                      # RESTful & streaming API endpoints (axel/chat, razorpay, webhooks)
│   ├── auth/                     # Auth callbacks, confirmation, invitations
│   ├── community/                # Developer discussion hubs and forums
│   ├── courseraplus/             # Specializations and certified pathways
│   ├── courses/                  # Individual course pages & interactive curriculum viewer
│   ├── dashboard/                # User dashboard (progress, daily tasks, workspace, certs)
│   ├── degrees/                  # Degree-equivalent learning programs
│   ├── dsa/                      # Data Structures & Algorithms visualizer and problem arena
│   ├── experience/               # Interactive 3D campus & learning experience
│   ├── login/ & signup/          # Authentication flows
│   ├── plus/                     # ASCI+ subject paths & deep dives
│   ├── portfolio/                # Student public portfolio showcase
│   ├── pricing/                  # Membership plans and tier comparisons
│   ├── profile/                  # Account profile management
│   ├── programs/                 # Core programming tracks (C, C++, Python, Java, Web, DSA)
│   ├── globals.css               # Design system tokens, Tailwind v4 theme, CSS variables
│   └── layout.tsx                # Root layout with ThemeProvider, Navigation, and Footer
│
├── components/                   # Reusable UI & Feature Components
│   ├── admin/                    # Admin dashboards, editors, tables
│   ├── auth/                     # Login/signup forms, OAuth buttons
│   ├── axel/                     # Axel 3D interactive AI companion & dock
│   ├── certificate/              # Dynamic PDF/printable certificate generators
│   ├── courses/                  # Course grid, list cards, career role shelves, wishlist
│   ├── dashboard/                # Dashboard panels, daily tasks, stats counter, workspace
│   ├── dsa/                      # Visualizer canvas, code editor, memory visualizer
│   ├── icons/                    # Custom SVG icons & 3D book graphics
│   ├── ui/                       # Radix UI primitives, glassmorphic cards, custom buttons
│   ├── courses.tsx               # Main Course Catalog & Learning Tracks explorer
│   ├── featured-master-tracks.tsx # Flagship interactive tracks section
│   ├── hero.tsx                  # Hero banner with dynamic call-to-actions
│   ├── navbar.tsx                # Responsive navigation with search dialog & mobile drawer
│   └── footer.tsx                # Editorial site footer
│
├── context/                      # React Context Providers
│   └── auth-context.tsx          # Supabase auth session, profile, and subscription state
│
├── hooks/                        # Custom React Hooks
│   ├── use-gsap.ts               # GSAP animation primitives & timeline helpers
│   ├── use-media-query.ts        # Responsive breakpoint observer
│   └── use-toast.ts              # Sonner & Radix toast integrations
│
├── lib/                          # Business Logic, Data Stores & Helpers
│   ├── ai/                       # Axel AI streaming chat completions & context
│   ├── auth/                     # Supabase client/server session helpers
│   ├── career-roles-data.ts      # Industry role pathways (ML, Data Science, Security, Web)
│   ├── coursera-metadata.ts      # Enriched partner metadata, skills, and ratings
│   ├── curriculum-data.ts        # Comprehensive 47-course catalog specification
│   ├── daily-tasks.ts            # Daily challenges, streaks, and XP reward logic
│   ├── user-learning-store.ts    # Client persistence store for bookmarks & local progress
│   └── utils.ts                  # Utility functions (cn class merging, formatters)
│
├── public/                       # Static Assets
│   ├── images/                   # Course thumbnails, partner logos, editorial banners
│   ├── icons/                    # App icons, favicons, vector badges
│   └── partners/                 # University and tech institution partner logos
│
├── supabase/                     # Database Layer & Schema Migrations
│   ├── migrations/               # DDL migrations, RLS policies, tables, and trigger functions
│   │   ├── supabase_schema.sql   # Core schema (users, profiles, subscriptions)
│   │   ├── supabase_schema_v2.sql# Extended LMS schema (courses, modules, lessons)
│   │   ├── create_unstop_ecosystem_tables.sql
│   │   ├── add_certificates_table.sql
│   │   ├── add_gamification_and_daily_tasks.sql
│   │   └── fix_rls_recursion.sql
│   └── seeds/                    # Deterministic seed datasets
│       ├── seed_2026_curriculum.sql # 47 courses, 157 modules, and complete lesson data
│       ├── seed_3_java_courses.sql
│       ├── seed_dsa_course.sql
│       └── seed_python_course.sql
│
├── scripts/                      # Build, Migration & Database Automation
│   ├── build-dispatcher.js       # Dynamic build switcher (Vercel standard vs Cloudflare OpenNext)
│   ├── generate-full-seed-sql.ts # Full curriculum SQL generator
│   ├── generate-sql-seed.ts      # Deterministic SQL generator for local/cloud seeds
│   ├── migrate_admin_roles.ts    # Role privilege migrator
│   └── verify-curriculum.ts      # Data validation suite for courses and lesson sequence
│
├── docs/                         # Project Documentation
│   └── GOOGLE_AUTH_SETUP.md      # Google OAuth credential provisioning guide
│
└── .agent/                       # Local Agent Guidelines, Skills & Workflows
    ├── AGENTS.md                 # Project styling and architectural rules
    ├── skills/                   # Emil Kowalski design engineering skills & workflows
    └── workflows/                # Agent development lifecycle workflows
```

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (Turbopack, App Router, React Server Components) |
| **Runtime** | [React 19](https://react.dev/) + Node.js 22 LTS |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with CSS Variables & Glassmorphic tokens |
| **Motion & 3D** | [Three.js](https://threejs.org/), [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber), [GSAP](https://greensock.com/gsap/) |
| **Database & Auth** | [Supabase](https://supabase.com/) (PostgreSQL 16, Row Level Security, Auth SSR) |
| **Payments** | [Razorpay](https://razorpay.com/) Webhooks & Subscription APIs |
| **Deployment** | Dual-Target: Standard Vercel Build & Cloudflare Pages (via `@opennextjs/cloudflare`) |

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js**: `v20.x` or `v22.x`
- **Package Manager**: `npm`

### 2. Environment Configuration
Copy the environment template and populate your local keys:
```bash
cp .env.example .env.local
```

Required environment variables:
```ini
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
RAZORPAY_KEY_ID=your-razorpay-key
RAZORPAY_KEY_SECRET=your-razorpay-secret
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ⚡ Build & Deployment Scripts

| Command | Purpose |
| :--- | :--- |
| `npm run dev` | Starts local Next.js Turbopack development server |
| `npm run build` | Dispatches build based on environment (Vercel standard / OpenNext Cloudflare) |
| `npm run build:next` | Directly triggers standard `next build` |
| `npm run build:cloudflare` | Triggers OpenNext build targeting Cloudflare Workers & Pages |
| `npm run deploy:cloudflare` | Builds and deploys directly to Cloudflare Pages via Wrangler |
| `npm run start` | Starts Next.js production server locally |
| `npm run lint` | Runs ESLint over the entire project |

---

## 🗄️ Database Migrations & Seeding

All SQL files are organized under `supabase/`:

- **Execute Migrations**: Run the DDL scripts in order through the Supabase Dashboard SQL Editor or via CLI:
  1. `supabase/migrations/supabase_schema.sql`
  2. `supabase/migrations/supabase_schema_v2.sql`
  3. `supabase/migrations/create_unstop_ecosystem_tables.sql`
  4. `supabase/migrations/add_gamification_and_daily_tasks.sql`
  5. `supabase/migrations/fix_rls_recursion.sql`

- **Populate 2026 Curriculum**: Run `supabase/seeds/seed_2026_curriculum.sql` to seed all 47 interactive courses, 157 modules, and lesson challenges.

- **Regenerate Seed Scripts**:
  ```bash
  npx tsx scripts/generate-full-seed-sql.ts
  ```

---

## 🎨 Design Engineering Bar

This project strictly adheres to the **Emerald & Pearl** editorial design system and Emil Kowalski's craft engineering principles:
- **No Layout Reflows**: All interactive elements use GPU-composited transforms (`translate3d`, `scale`) rather than `transition: all`.
- **Zero Scroll Thrashing**: Carousel progress indicators offload continuous updates directly to `requestAnimationFrame` with zero React re-renders.
- **Physical Feedback**: Tactile `:active:scale-[0.98]` feedback on clickable surfaces.
- **Restraint**: High information density without visual clutter; clean 16:9 media with zero layout shift.
