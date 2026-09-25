import type { Metadata } from "next"
import { notFound, redirect } from "next/navigation"
import { getProblemById, ALL_PROBLEMS } from "@/lib/dsa/problem-catalog"
import { ProblemSolver } from "@/components/dsa/problem-solver"

interface PracticeSlugProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PracticeSlugProps): Promise<Metadata> {
  const { slug } = await params
  const problem = getProblemById(slug)

  if (!problem) {
    return {
      title: "Practice Challenge | ASCI Academy",
      description: "Practice coding challenges across DSA, Python, and Systems Architecture.",
    }
  }

  return {
    title: `${problem.title} (${problem.difficulty}) | ASCI Practice`,
    description: `Solve ${problem.title} with multi-language compiler and real-time assertions.`,
  }
}

export default async function PracticeChallengePage({ params }: PracticeSlugProps) {
  const { slug } = await params
  const problem = getProblemById(slug)

  if (!problem) {
    // If not directly found in catalog, fallback to first problem or 404
    if (ALL_PROBLEMS.length > 0) {
      return <ProblemSolver initialProblem={ALL_PROBLEMS[0]} />
    }
    notFound()
  }

  return <ProblemSolver initialProblem={problem} />
}
