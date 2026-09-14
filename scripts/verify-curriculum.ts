import { CURRICULUM_COURSES, getCurriculumCourseBySlug } from "../lib/curriculum-data"

console.log(`\n=== VERIFYING ASCI LMS COMPLETE CURRICULUM ===\n`)
console.log(`Total Courses Registered: ${CURRICULUM_COURSES.length}`)

const expectedCourses = [
  "agentic-ai",
  "ai-for-everyone",
  "columbia-ai",
  "google-data-analytics",
  "data-science-python",
  "data-science-visualization",
  "modern-git-academy",
  "ultimate-github",
  "cs50-cybersecurity",
  "python-ai",
  "cloud-productivity",
  "java",
  "java-intermediate",
  "java-advanced",
  "dsa",
  "dsa-intermediate",
  "dsa-advanced",
]

let totalModules = 0
let totalLessons = 0
let totalChallenges = 0
let allPassed = true

for (const slug of expectedCourses) {
  const course = getCurriculumCourseBySlug(slug)
  if (!course) {
    console.error(`❌ Course missing: ${slug}`)
    allPassed = false
    continue
  }

  const modCount = course.modules.length
  let lesCount = 0
  let chalCount = 0

  for (const m of course.modules) {
    lesCount += m.lessons.length
    for (const l of m.lessons) {
      if (l.content_type === "challenge") {
        chalCount++
        if (!l.challenge_data || !l.challenge_data.expectedOutput) {
          console.error(`❌ Challenge lesson ${l.id} missing challenge_data or expectedOutput in ${slug}`)
          allPassed = false
        }
      }
    }
  }

  totalModules += modCount
  totalLessons += lesCount
  totalChallenges += chalCount

  console.log(`✅ [${course.category}] ${course.title} (${course.slug}) -> ${modCount} modules, ${lesCount} lessons (${chalCount} challenges)`)
}

console.log(`\n--------------------------------------------`)
console.log(`Summary: ${CURRICULUM_COURSES.length} Courses | ${totalModules} Modules | ${totalLessons} Lessons | ${totalChallenges} Interactive Challenges`)
console.log(`Status: ${allPassed ? "ALL 17 COURSES VALIDATED PERFECTLY ✅" : "SOME VALIDATIONS FAILED ❌"}\n`)

if (!allPassed) {
  process.exit(1)
}
