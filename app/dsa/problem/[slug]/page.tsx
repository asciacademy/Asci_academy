import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getProblemById, ALL_PROBLEMS } from "@/lib/dsa/problem-catalog"
import { ProblemSolver } from "@/components/dsa/problem-solver"

interface ProblemPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const paramsSet = new Set<string>()
  ALL_PROBLEMS.forEach((p) => {
    paramsSet.add(p.id)
    paramsSet.add(String(p.index + 1))
    if (p.slug) paramsSet.add(p.slug)
  })
  return Array.from(paramsSet).map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: ProblemPageProps): Promise<Metadata> {
  const { slug } = await params
  const problem = getProblemById(slug)

  if (!problem) {
    return {
      title: "Problem Not Found | ASCI A2Z DSA Solver",
    }
  }

  return {
    title: `${problem.index + 1}. ${problem.title} (${problem.difficulty}) - ASCI Problem Solver`,
    description: `Solve ${problem.title} interactive coding environment. Multi-language compiler, testcase runner, and editorial hints for ASCI A2Z DSA curriculum.`,
  }
}

export default async function ProblemPage({ params }: ProblemPageProps) {
  const { slug } = await params
  const problem = getProblemById(slug)

  if (!problem) {
    notFound()
  }

  return <ProblemSolver initialProblem={problem} />
}
