# Unstop Design Tokens Specification

*Extracted directly from live https://unstop.com/ source stylesheet bundles, DOM layout, and computed properties.*

---

## 1. Color Palette

### Primary Brand
- **Brand Sapphire / Primary Blue**: `#1C4980` (`--primary-700`) — Primary headings, logo accents, main branding.
- **Interactive Action Blue**: `#0073E6` (`--blue-700`) — Primary CTA buttons, links, active state indicators, focus rings.
- **Hover Action Blue**: `#005CB8` (`--blue-800`) — Button hover, link hover.
- **Deep Navy Base**: `#112C4D` (`--primary-900`) — Dark banner surfaces, high-contrast dark accents.
- **Soft Light Blue Tint**: `#F2F8FE` (`--blue-50`) / `#DEEDFC` (`--blue-100`) — Hover highlights, active pill tabs, subtle alert backdrops.

### Secondary & Semantic Accents
- **Secondary Gold / Yellow**: `#FFC700` (`--secondary-700`) — Star badges, featured ribbons, coins/XP icons.
  - Light Gold Tint: `#FFFBEF` (`--secondary-50`) / `#FFF8DE` (`--secondary-100`).
- **Success / Verified Green**: `#05C165` (`--green-700`) — Free/registered badges, verified badges, live status indicator.
  - Green Tint: `#F3FBF6` (`--green-50`) / `#DEF7EB` (`--green-100`).
- **Urgency / Warning / Deadline Red**: `#D63500` (`--red-700`) — Urgency badges ("2 days left"), countdown pills, critical errors.
  - Red Tint: `#FEF9F9` (`--red-50`) / `#FDEBE5` (`--red-100`).
- **Amber / Orange Accent**: `#FA801C` (`--orange-700`) / `#FB933E` (`--orange-600`) — ASCI brand synergy accent, high-energy challenges.
  - Orange Tint: `#FEF9F5` (`--orange-50`) / `#FEEEE1` (`--orange-100`).
- **Royal Purple Accent**: `#6548EE` (`--purple-700`) — Hackathons & AI badges.
  - Purple Tint: `#F7F5FE` (`--purple-50`) / `#EBE7FD` (`--purple-100`).

### Neutrals, Text & Surfaces
- **Canvas / Page Background**: `#F6F8FA` (`--primary-50`) or `#FFFFFF` (mobile / cards).
- **Surface / Card Background**: `#FFFFFF` (`--grey-00`) — Crisp pure white surfaces.
- **Elevated Surface / Popover**: `#FFFFFF` with shadow.
- **Subtle Surface / Hover State**: `#F6F6F6` (`--grey-50`) / `#EDEDED` (`--grey-100`).
- **Border / Stroke Primary**: `#E2E2E2` (`--grey-200`) — Standard 1px card and divider hairline.
- **Border Subdued / Input**: `#EDEDED` (`--grey-100`) or `#E5E7EB`.
- **Primary Text**: `#383838` (`--grey-1100`) / `#1C1C1C` (`--grey-1250`) — High contrast readability.
- **Secondary Text**: `#727272` (`--grey-800`) — Metadata, subheadings, author/organizer details.
- **Tertiary / Muted Text**: `#AFAFAF` (`--grey-500`) / `#999999` (`--grey-600`) — Disabled states, timestamps, placeholder text.
- **White Text**: `#FFFFFF` (`--grey-00`) — For primary blue buttons and dark headers.

---

## 2. Typography

- **Primary Font Family**: `"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
  - Loaded weights: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold).
- **Monospace Font Family**: `"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace` (for code katas and compiler).

### Type Scale (Font Size / Line Height / Weight)
| Token | Font Size | Line Height | Weight | Typical Usage |
|---|---|---|---|---|
| `display-1` | 36px (2.25rem) | 44px (1.22) | 700 | Major Hero Banner Headings |
| `display-2` | 28px (1.75rem) | 36px (1.28) | 700 | Section Headers (Explore, Competitions) |
| `heading-lg`| 24px (1.5rem)  | 32px (1.33) | 600 | Page Titles, Rail Headers |
| `heading-md`| 20px (1.25rem) | 28px (1.40) | 600 | Modal Titles, Detail Section Headers |
| `heading-sm`| 16px (1rem)    | 24px (1.50) | 600 | Card Titles (2-line clamp) |
| `body-md`   | 14px (0.875rem)| 20px (1.43) | 400 | Standard Body Text, Unstop description |
| `body-sm`   | 13px (0.8125rem)| 18px (1.38)| 400/500 | Card Metadata, Organizer name |
| `caption`   | 12px (0.75rem) | 16px (1.33) | 500/600 | Tag Badges, Chips, Timers |
| `micro`     | 11px (0.6875rem)| 14px (1.27)| 600 | Uppercase pill labels, stats |

---

## 3. Spacing System

- **Base Grid Unit**: `4px`
- **Scale**:
  - `space-1`: 4px
  - `space-2`: 8px
  - `space-3`: 12px
  - `space-4`: 16px
  - `space-5`: 20px
  - `space-6`: 24px
  - `space-8`: 32px
  - `space-10`: 40px
  - `space-12`: 48px
  - `space-16`: 64px
- **Layout Measurements**:
  - Desktop Header Height: `64px`
  - Mobile Header Height: `56px`
  - Mobile Bottom Nav Height: `56px`
  - Card Inner Padding: `16px` (compact) to `20px` (featured)
  - Desktop Max Width: `1280px` (`max-w-7xl` or `max-w-[1280px]`)
  - Filter Sidebar Width: `280px` (desktop sticky), `100%` (mobile bottom sheet)

---

## 4. Radius & Elevation

### Border Radius
- `radius-sm`: `6px` (Small tags, micro badges)
- `radius-md`: `8px` (Standard buttons, inputs, dropdown items)
- `radius-lg`: `12px` (Cards, popovers, banners)
- `radius-xl`: `16px` (Modals, feature hero containers, large cards)
- `radius-pill`: `9999px` (Category filters, pill tags, rounded CTA buttons)

### Elevation & Shadows
- `shadow-xs`: `0 1px 2px rgba(0, 0, 0, 0.05)` (Subtle borders)
- `shadow-card`: `0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04)` (Unstop standard card)
- `shadow-card-hover`: `0 6px 16px rgba(0, 0, 0, 0.08), 0 2px 4px rgba(0, 0, 0, 0.04)` (Card lift on hover)
- `shadow-dropdown`: `0 4px 16px rgba(0, 0, 0, 0.10)` (Nav dropdowns, menus)
- `shadow-modal`: `0 12px 32px rgba(0, 0, 0, 0.16)` (Dialogs, modals)

---

## 5. Component Anatomy Specifications

### 1. Header / Navigation
- **Height**: 64px
- **Layout**:
  - Left: ASCI Logo + Search input bar with search icon and shortcut key (`Ctrl+K`)
  - Center: Nav links (`Explore`, `Learn`, `Practice`, `Build`, `Grow`)
  - Right: Quick Action, Host/Teach button, User Avatar / Login & Sign Up CTA buttons
- **Surface**: White `#FFFFFF` with bottom border `#E2E2E2`, backdrop-blur on sticky scroll.

### 2. Opportunity / Course Card Anatomy
- **Dimensions**: Desktop width `280px–320px` in a 4-column responsive grid.
- **Top Row**: Organizer/Company Logo (`44x44px` with rounded-lg border `#E2E2E2`) + Category Pill Badge.
- **Title**: 15–16px Font-Weight 600, 2-line clamped (`line-clamp-2`), color `#1C1C1C`.
- **Sub-label**: 13px organizer/company name, color `#727272`.
- **Divider / Metadata Row**:
  - Eligibility or Level pill (`Beginner`, `Open to All`)
  - Days left / Deadline with calendar icon (`14d left`, `#D63500` if urgent)
  - Prize or Price / Certificate indicator
- **Footer CTA**: Clean full-width or right-aligned action button (`Register` or `View Details`).

### 3. Filter Sidebar
- **Width**: 280px
- **Sections**: Accordion groups for Category, Domain, Level, Eligibility, Status (`Live`, `Upcoming`), Price (`Free`, `Paid`).
- **Interactive**: Checkbox list, search within filter, and quick "Clear All" link.

---
