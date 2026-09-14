import { CoursePart } from "./c-course-data"

export const GIT_DEVOPS_COURSE_PARTS: CoursePart[] = [
  {
    id: "git-part-1",
    title: "Part 1: Git Version Control Foundations",
    badge: "Beginner",
    description: "Master distributed version control: repositories, commits, staging area, and commit history inspection.",
    chapters: [
      {
        id: "git-ch-1",
        title: "Repositories & Staging",
        level: "Beginner",
        lessons: [
          {
            id: "git-1-1",
            title: "Git Architecture: Working Directory, Staging & Commits",
            slug: "git-architecture-staging",
            level: "Beginner",
            language: "bash",
            tldr: "Git tracks project snapshots across three areas: Working Directory, Staging Area (Index), and Commit History.",
            description: "Unlike simple file backups, Git is a distributed version control system. When you edit code, changes exist in your Working Directory. Using 'git add' stages changes into the Index. Running 'git commit' captures a permanent cryptographic snapshot (SHA-1/SHA-256 hash) into the repository database.",
            code: `# 1. Initialize a brand-new Git repository
$ git init my-awesome-app
$ cd my-awesome-app

# 2. Check current status
$ git status
# On branch main: No commits yet

# 3. Stage changes and commit snapshot
$ echo "console.log('Hello World');" > index.js
$ git add index.js
$ git commit -m "feat: initialize project entry point"

# 4. View concise commit history log
$ git log --oneline
# 7f3a9b1 feat: initialize project entry point`,
            output: `Initialized empty Git repository in /workspace/my-awesome-app/.git/
[main (root-commit) 7f3a9b1] feat: initialize project entry point
 1 file changed, 1 insertion(+)
 create mode 100644 index.js`,
            visualDiagramTitle: "Git Three-Stage Architecture Pipeline",
            visualDiagram: `[Working Directory (Unstaged files)] ──git add──> [Staging Area (Index)] ──git commit──> [Local Repository (.git commit tree)]`,
            lineExplanations: [
              { line: "git init", explanation: "Creates a hidden .git metadata folder containing object storage." },
              { line: "git add index.js", explanation: "Moves modified file into the staging area preparing for snapshot." },
              { line: 'git commit -m "..."', explanation: "Records snapshot permanently with an explanatory commit message." }
            ],
            keyPoints: [
              "Git stores snapshots of content, not incremental line diffs.",
              "Use a .gitignore file to prevent node_modules, .env secrets, and build outputs from polluting history.",
              "Commit messages should follow conventional commits (feat:, fix:, docs:, chore:)."
            ],
            quiz: {
              question: "Which command moves modified files from the Working Directory into the Staging Area?",
              options: ["git commit", "git add", "git push", "git checkout"],
              correctIndex: 1,
              explanation: "git add stages modified files, queuing them up for the next commit snapshot."
            }
          }
        ]
      }
    ]
  },
  {
    id: "git-part-2",
    title: "Part 2: Branching, Merging & Remote GitHub Collaboration",
    badge: "Intermediate",
    description: "Collaborate seamlessly across engineering teams with Git branches, pull requests, and merge conflict resolution.",
    chapters: [
      {
        id: "git-ch-2",
        title: "Branching & Collaboration",
        level: "Intermediate",
        lessons: [
          {
            id: "git-2-1",
            title: "Git Branching, Merging & Conflict Resolution",
            slug: "git-branching-merging",
            level: "Intermediate",
            language: "bash",
            tldr: "Branches allow developing features in isolation without disrupting the stable main production branch.",
            description: "A branch in Git is simply a lightweight movable pointer to a commit. Teams create feature branches (git switch -c feat/auth), test their changes, and merge them back into main. When two branches modify the exact same line, Git flags a merge conflict for the developer to reconcile.",
            code: `# 1. Create and switch to a feature branch
$ git switch -c feat/user-auth

# 2. Make commits on the branch
$ git commit -am "feat: implement JWT token verification"

# 3. Switch back to main and merge
$ git switch main
$ git merge feat/user-auth

# 4. Push safely to remote GitHub origin
$ git push origin main`,
            output: `Switched to a new branch 'feat/user-auth'
[feat/user-auth 4b8c9d2] feat: implement JWT token verification
Switched to branch 'main'
Updating 7f3a9b1..4b8c9d2
Fast-forward
 auth.ts | 42 ++++++++++++++++++++++++++++++++++++++++++
 1 file changed, 42 insertions(+)`,
            visualDiagramTitle: "Git Branching & Fast-Forward Merge DAG",
            visualDiagram: `main:          (Commit A) ──────> (Commit B) ───────────────────────> (Commit D [Merge])
                                      │                                  ▲
feat/auth:                            └───> (Commit C: JWT Auth) ────────┘`,
            lineExplanations: [
              { line: "git switch -c branch-name", explanation: "Creates new branch and immediately checks it out." },
              { line: "git merge branch-name", explanation: "Integrates commit history from specified branch into current active branch." }
            ],
            keyPoints: [
              "Branches in Git are 41 bytes on disk (a pointer file containing a commit hash); creating branches is instantaneous.",
              "Fast-forward merge happens when the target branch hasn't diverged since branching.",
              "Never commit directly to main in enterprise production repositories."
            ],
            quiz: {
              question: "What actually is a Git branch under the hood?",
              options: ["A complete duplicate folder copy of the entire project", "A lightweight 41-byte pointer referencing a commit SHA hash", "A remote server backup", "A compressed zip archive"],
              correctIndex: 1,
              explanation: "Git branches are just movable pointer files storing the 40-character SHA hash of the latest commit on that branch."
            }
          }
        ]
      }
    ]
  },
  {
    id: "git-part-3",
    title: "Part 3: Docker Containers & CI/CD DevOps Pipelines",
    badge: "Advanced",
    description: "Package applications into lightweight, reproducible Docker containers and automate CI/CD with GitHub Actions.",
    chapters: [
      {
        id: "git-ch-3",
        title: "Docker & Automation",
        level: "Advanced",
        lessons: [
          {
            id: "git-3-1",
            title: "Docker Containerization & Multi-Stage Builds",
            slug: "docker-containerization",
            level: "Advanced",
            language: "bash",
            tldr: "Docker bundles code, runtime, and OS dependencies into lightweight containers that run identically on any machine.",
            description: "The classic 'it works on my machine' bug is solved by containerization. Docker images package an operating system userland, Node/Python/Go runtime, and dependencies into immutable layers. Multi-stage Dockerfiles compile production code in a heavy build stage, then copy only the compiled binaries into a minimal Alpine image, slashing image sizes from 1GB to 50MB.",
            code: `# Multi-stage production Dockerfile
# Stage 1: Build & compile application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Minimal production runtime runner
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000
CMD ["npm", "start"]`,
            output: `[+] Building 14.2s (13/13) FINISHED
 => [builder 1/5] FROM docker.io/library/node:20-alpine
 => [runner 1/4] COPY --from=builder /app/.next ./.next
 => naming to docker.io/my-org/asci-app:v1.0 (Size: 84.5MB)`,
            visualDiagramTitle: "Multi-Stage Docker Build Optimization Pipeline",
            visualDiagram: `[Stage 1: Heavy Builder Image (1.2GB)] 
    ├── Installs devDependencies, TypeScript compiler & build tools
    └── Emits compiled production bundle (.next / dist)
            │
            ▼ (COPY --from=builder: transfers ONLY compiled artifacts)
[Stage 2: Minimalist Alpine Runtime Runner (65MB!)] ──> [Shipped to Production Cluster]`,
            lineExplanations: [
              { line: "FROM node:20-alpine AS builder", explanation: "Uses lightweight Alpine Linux image as the compilation stage." },
              { line: "RUN npm ci", explanation: "Clean install: installs exact dependency tree from package-lock.json." },
              { line: "COPY --from=builder ...", explanation: "Copies only compiled assets into the runner stage, dropping dev tools and unneeded cache." }
            ],
            keyPoints: [
              "Containers share the host OS kernel, making them start in milliseconds compared to heavy VMs.",
              "Order Dockerfile instructions from least-frequently changed to most-frequently changed to maximize layer caching.",
              "Always run containers as a non-root user in production for security."
            ],
            quiz: {
              question: "What is the primary benefit of multi-stage Docker builds?",
              options: ["Allows running multiple operating systems simultaneously", "Dramatically reduces final production image size and enhances security by excluding build tools", "Encrypts the source code", "Eliminates the need for a Docker daemon"],
              correctIndex: 1,
              explanation: "Multi-stage builds leave compiler SDKs and build caches behind, shipping only runtime artifacts in a tiny, secure container."
            }
          }
        ]
      }
    ]
  }
]
