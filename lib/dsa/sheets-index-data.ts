/**
 * ASCI Curated Coding Sheets Directory
 */

export interface AsciSheetInfo {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  problemCount: number;
  difficultyRange: string;
  badge: string;
  href: string;
  description: string;
  tags: string[];
}

// Backward compatibility alias
export type TUFSheetInfo = AsciSheetInfo;

export const POPULAR_SHEETS: AsciSheetInfo[] = [
  {
    id: 'a2z',
    slug: 'a2z-sheet',
    title: "ASCI A2Z DSA Master Track",
    subtitle: 'From algorithmic fundamentals to advanced Dynamic Programming & Graphs',
    problemCount: 474,
    difficultyRange: 'Beginner to Advanced',
    badge: 'Master Track',
    href: '/dsa/a2z-sheet',
    description: 'The complete algorithmic roadmap structured into 18 systematic steps, covering language constructs, sorting, arrays, binary search, linked lists, trees, graphs, and dynamic programming.',
    tags: ['A2Z Track', 'Comprehensive', '474 Problems', 'Video Explanations']
  },
  {
    id: 'sde',
    slug: 'sde-core-191',
    title: "ASCI SDE Core 191 Sheet",
    subtitle: 'Top 191 Interview Problems for Tier-1 Tech Firms',
    problemCount: 191,
    difficultyRange: 'Medium to Hard',
    badge: 'Interview Classic',
    href: '/dsa/a2z-sheet?filter=sde',
    description: 'Curated collection of 191 problems frequently encountered in technical interviews at Google, Meta, Microsoft, and high-growth unicorns.',
    tags: ['SDE Track', 'Tier-1 Companies', 'High Frequency']
  },
  {
    id: 'blind75',
    slug: 'blind-75-patterns',
    title: 'ASCI Algorithmic Patterns (Blind 75)',
    subtitle: '75 Core Algorithmic Design Patterns',
    problemCount: 75,
    difficultyRange: 'Easy to Hard',
    badge: 'Pattern Synthesis',
    href: '/dsa/a2z-sheet?filter=blind75',
    description: '75 essential problems covering core patterns: Sliding Window, Two Pointers, Fast & Slow Pointers, In-Place Reversal, Monotonic Stack, and Memoization.',
    tags: ['Blind 75', 'Core Patterns', 'Rapid Synthesis']
  },
  {
    id: 'asci79',
    slug: 'asci-79-sprint',
    title: 'ASCI 79 High-Yield Interview Sprint',
    subtitle: 'Accelerated 3-Week Interview Revision Track',
    problemCount: 79,
    difficultyRange: 'Medium',
    badge: 'Rapid Revision',
    href: '/dsa/a2z-sheet?filter=asci79',

    description: 'A focused 79-problem syllabus designed for software engineers with upcoming technical screening and on-site loops.',
    tags: ['3-Week Sprint', 'High Yield', 'Revision']
  },
  {
    id: 'core-cs',
    slug: 'core-cs-systems',
    title: 'ASCI Core Systems Engineering Track',
    subtitle: 'Operating Systems, Computer Networks & Database Internals',
    problemCount: 436,
    difficultyRange: 'Systems Engineering',
    badge: 'Systems Track',
    href: '/plus/home',
    description: 'Deep conceptual and practical preparation for core engineering interviews: OS concurrency, TCP/IP protocols, and DBMS ACID transactions.',
    tags: ['Operating Systems', 'Networking', 'DBMS', 'Systems']
  },
  {
    id: 'lld-system-design',
    slug: 'low-level-design-sheet',
    title: 'ASCI Low-Level System Design & Architecture',
    subtitle: 'Enterprise Design Patterns & Real-World System Case Studies',
    problemCount: 122,
    difficultyRange: 'Mid to Senior SDE',
    badge: 'Architecture Special',
    href: '/plus/low-level-design',
    description: 'Hands-on object-oriented architecture covering SOLID principles, GoF design patterns, concurrency safety, and real-world system modeling.',
    tags: ['LLD', 'Design Patterns', 'System Design', 'UML']
  }
];
