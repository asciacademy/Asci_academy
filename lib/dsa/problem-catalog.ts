/**
 * ASCI A2Z DSA Problem Catalog & Solver Registry
 * Complete algorithmic specifications, test cases, and starter code for all 474 problems.
 */

import rawData from './problem-catalog-data.json';

export type ProblemDifficulty = 'Easy' | 'Medium' | 'Hard';

export interface ProblemParameter {
  name: string;
  type: string;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ProblemTestCase {
  input: any[];
  expected: any;
  isHidden?: boolean;
}

export interface ProblemStarterCode {
  javascript: string;
  typescript: string;
  python: string;
  java: string;
  cpp: string;
}

export interface VisualStepPointer {
  label: string;
  index: number;
  color?: string;
}

export interface VisualStep {
  stepIndex: number;
  title: string;
  description: string;
  highlightIndices?: number[];
  pointers?: VisualStepPointer[];
  auxiliaryState?: Record<string, any>;
  status?: 'active' | 'match' | 'mismatch' | 'done';
}

export interface ProblemVisualSpec {
  type: 'array-pointers' | 'hash-map' | 'sliding-window' | 'stack-queue' | 'linked-list' | 'binary-tree' | 'dp-grid' | 'flow-diagram';
  dataLabel?: string;
  elements?: (number | string)[];
  steps: VisualStep[];
}

export interface ProblemDetail {
  index: number;
  id: string;
  slug: string;
  title: string;
  difficulty: ProblemDifficulty;
  stepNumber: number;
  stepTitle: string;
  subcategoryTitle: string;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  hints: string[];
  functionName: string;
  parameters: ProblemParameter[];
  returnType: string;
  starterCode: ProblemStarterCode;
  testCases: ProblemTestCase[];
  youtubeUrl: string | null;
  leetcodeUrl: string | null;

  // ASCI "Simple as Hell" & Visual representation fields
  simpleMission?: string;
  realWorldAnalogy?: string;
  mentalModel?: string[];
  commonTraps?: string[];
  visualSpec?: ProblemVisualSpec;
}

export const ALL_PROBLEMS: ProblemDetail[] = rawData as ProblemDetail[];

// Fast O(1) Lookups
const problemsById = new Map<string, ProblemDetail>();
const problemsBySlug = new Map<string, ProblemDetail>();

ALL_PROBLEMS.forEach((p) => {
  problemsById.set(p.id, p);
  problemsBySlug.set(p.slug, p);
});

export function getProblemById(idOrSlug: string): ProblemDetail | null {
  if (!idOrSlug) return null;
  const cleaned = decodeURIComponent(idOrSlug).trim().toLowerCase();
  
  // 1. Exact ID match (e.g. '425', '1211')
  const byId = problemsById.get(idOrSlug) || problemsById.get(cleaned);
  if (byId) return byId;

  // 2. Exact slug match (e.g. 'two-sum', 'input-output')
  const bySlug = problemsBySlug.get(cleaned);
  if (bySlug) return bySlug;

  // 3. 1-based curriculum problem index (e.g. '1' -> Problem #1, '2' -> Problem #2)
  const num = parseInt(cleaned, 10);
  if (!isNaN(num) && String(num) === cleaned && num >= 1 && num <= ALL_PROBLEMS.length) {
    return ALL_PROBLEMS[num - 1];
  }

  return null;
}

export function getAdjacentProblems(currentIdOrSlug: string): {
  prev: ProblemDetail | null;
  next: ProblemDetail | null;
  currentIndex: number;
  total: number;
} {
  const current = getProblemById(currentIdOrSlug);
  const total = ALL_PROBLEMS.length;
  if (!current) {
    return { prev: null, next: null, currentIndex: -1, total };
  }
  const currentIndex = current.index;
  const prev = currentIndex > 0 ? ALL_PROBLEMS[currentIndex - 1] : null;
  const next = currentIndex < total - 1 ? ALL_PROBLEMS[currentIndex + 1] : null;
  return { prev, next, currentIndex, total };
}

export function getAllProblemsSummary() {
  return ALL_PROBLEMS.map(p => ({
    id: p.id,
    slug: p.slug,
    title: p.title,
    difficulty: p.difficulty,
    stepNumber: p.stepNumber,
    stepTitle: p.stepTitle,
    subcategoryTitle: p.subcategoryTitle,
  }));
}
