export * from "./discovery-rail"
export * from "./discovery-grid"
export * from "./opportunity-list"
export * from "./category-rail"
export * from "./filter-bar"
export * from "./search-bar"
export * from "./sort-bar"
export * from "./section-header"
export * from "./compact-card"
export * from "./featured-card"

// Re-export universal cards from components/cards for single-import discovery workflows
export {
  CourseCard,
  OpportunityCard,
  CompetitionCard,
  JobCard,
  InternshipCard,
  ProjectCard,
  ChallengeCard,
  CertificateCard,
  LearningPathCard,
} from "@/components/cards"
