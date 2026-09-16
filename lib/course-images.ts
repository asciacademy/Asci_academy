/**
 * Maps ASCI Academy courses to generated 3D minimalist image cards
 * based on category, technology domain, and slug keywords.
 */
export function getCourseCoverImage(category?: string, slug?: string, title?: string, fallbackUrl?: string): string {
  if (fallbackUrl && fallbackUrl !== "/placeholder.svg" && !fallbackUrl.includes("placeholder") && fallbackUrl.startsWith("/")) {
    return fallbackUrl
  }

  const text = `${category || ""} ${slug || ""} ${title || ""}`.toLowerCase()

  // 1. AI & Machine Learning
  if (
    text.includes("agent") ||
    text.includes("ai") ||
    text.includes("deepseek") ||
    text.includes("llama") ||
    text.includes("pytorch") ||
    text.includes("neural") ||
    text.includes("vertex") ||
    text.includes("bedrock") ||
    text.includes("machine learning")
  ) {
    return "/images/courses/course_agentic_ai.jpg"
  }

  // 2. Java & Object-Oriented Systems
  if (
    text.includes("java") ||
    text.includes("spring") ||
    text.includes("jvm") ||
    text.includes("c++") ||
    text.includes("c programming") ||
    text.includes("oop")
  ) {
    return "/images/courses/course_java_systems.jpg"
  }

  // 3. Distributed Systems & High-Performance Architecture
  if (
    text.includes("system design") ||
    text.includes("distributed") ||
    text.includes("scalability") ||
    text.includes("microservice") ||
    text.includes("golang") ||
    text.includes("go ") ||
    text.includes("rust") ||
    text.includes("architect")
  ) {
    return "/images/courses/course_system_design.jpg"
  }

  // 4. Cloud Native, DevOps, Git & Security
  if (
    text.includes("cloud") ||
    text.includes("k8s") ||
    text.includes("kubernetes") ||
    text.includes("docker") ||
    text.includes("git") ||
    text.includes("devops") ||
    text.includes("aws") ||
    text.includes("security") ||
    text.includes("hacking") ||
    text.includes("cybersecurity") ||
    text.includes("pentest")
  ) {
    return "/images/courses/course_cloud_k8s.jpg"
  }

  // 5. Algorithms, Data Structures & Web Development
  return "/images/courses/course_dsa_bootcamp.jpg"
}
