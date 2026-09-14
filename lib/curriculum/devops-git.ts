import { CurriculumCourse } from "../curriculum-data"

export const DEVOPS_GIT_COURSES: CurriculumCourse[] = [
  // =========================================================================
  // COURSE 1: MODERN GIT ACADEMY (8 PILLARS)
  // =========================================================================
  {
    id: "modern-git-academy",
    slug: "modern-git-academy",
    title: "Modern Git Academy (Complete 8-Pillar Program)",
    description: "The definitive 300+ lesson curriculum: from Git object DAG internals and modern worktrees to GitHub Actions CI/CD, DevSecOps supply chain security, and Copilot AI workflows.",
    category: "Git & DevOps",
    level: "All Levels",
    weeks: "12 Weeks",
    duration_hours: 60,
    lessons: 85,
    projects: 6,
    certificate: "Modern Git Academy Certificate",
    is_premium: false,
    tools: ["Git 2.45+", "GitHub CLI (gh)", "GitHub Actions", "Docker", "GPG", "DevSecOps", "Git LFS"],
    highlights: [
      "Pillars 1 & 2: Git DAG Internals (Blobs, Trees, Commits) & Modern Worktrees",
      "Pillars 3 & 4: GitHub Engineering Workflows & Multi-Stage Matrix CI/CD Actions",
      "Pillars 5 & 6: DevSecOps Secrets Scanning, Signed Commits & GitHub Copilot Agents",
      "Pillars 7 & 8: Infrastructure as Code (OpenTofu) & Monorepo Fleet Scale with Git LFS"
    ],
    modules: [
      {
        id: "git-acad-mod-1",
        title: "Pillar 1: Git Fundamentals & Internal DAG Architecture",
        sequence_order: 1,
        description: "Explore the directed acyclic graph (DAG), object hashing, and index manipulation.",
        lessons: [
          {
            id: "git-1-1",
            title: "1.1 How Git Actually Works: The Content-Addressable Store",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 60,
            description: "Understand the .git object directory: blobs, trees, commits, and SHA hashes.",
            content: `### Git is a Content-Addressable Store
* **Blob (Binary Large Object):** Stores raw file contents without filenames or permissions.
* **Tree:** Contains directory entries mapping file paths to blob/tree SHAs.
* **Commit:** A snapshot pointing to a root tree, parent commit hash(es), author info, and message.
* **Tag / Reference:** Human-readable pointers (\`refs/heads/main\`) to specific commit hashes.`,
            challenge_data: {
              initialCode: `objects = ["blob", "tree", "commit", "tag"]\nprint("-".join(objects))\n`,
              expectedOutput: "blob-tree-commit-tag",
              instructions: "Print the 4 core Git object types joined by dashes: 'blob-tree-commit-tag'."
            }
          },
          {
            id: "git-1-2",
            title: "1.2 The Three Trees: Working Directory, Index, and HEAD",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 65,
            description: "Track how changes travel from the Working Tree through the Staging Area into HEAD.",
            content: `### The Three States
1. **Working Tree:** The local files you edit on disk.
2. **Index (Staging Area):** The exact snapshot prepared for the next commit via \`git add\`.
3. **HEAD:** The pointer referencing your currently checked-out commit.`,
            challenge_data: {
              initialCode: `trees = ["working_tree", "index", "head"]\nprint(f"COUNT:{len(trees)}")\n`,
              expectedOutput: "COUNT:3",
              instructions: "Print 'COUNT:3' to confirm the three conceptual trees in Git."
            }
          }
        ]
      },
      {
        id: "git-acad-mod-2",
        title: "Pillar 2: Modern Git Workflows & Advanced Rebasing",
        sequence_order: 2,
        description: "Master interactive rebasing (\`git rebase -i\`), squashing, and linear commit histories.",
        lessons: [
          {
            id: "git-2-1",
            title: "2.1 Merge vs Rebase: Preserving Linearity",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 70,
            description: "Understand fast-forward merges, 3-way merge commits, and replay mechanics.",
            content: `### Rebase vs Merge
- **Merge (\`git merge\`):** Creates a non-destructive merge commit with two parents. Preserves complete historical context.
- **Rebase (\`git rebase\`):** Replays feature branch commits onto the tip of upstream base, creating a linear history without diamond merge topologies.`
          }
        ]
      },
      {
        id: "git-acad-mod-3",
        title: "Pillar 3: High-Productivity Worktrees & Sparse Checkouts",
        sequence_order: 3,
        description: "Work on multiple branches concurrently in separate directory checkouts without stashing.",
        lessons: [
          {
            id: "git-3-1",
            title: "3.1 Git Worktrees for Instant Context Switching",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Mount parallel checkouts linked to the same underlying .git object repository.",
            content: `### Why Git Worktrees?
Instead of running \`git stash\` or cloning multiple gigabytes, \`git worktree add ../hotfix main\` creates a secondary linked directory sharing the same underlying repository objects.`,
            challenge_data: {
              initialCode: `cmd = "git worktree add ../feature-auth feature-auth"\nprint("WORKTREE_CREATED")\n`,
              expectedOutput: "WORKTREE_CREATED",
              instructions: "Verify the worktree concept and output 'WORKTREE_CREATED'."
            }
          }
        ]
      },
      {
        id: "git-acad-mod-4",
        title: "Pillar 4: GitHub Actions & Enterprise CI/CD Pipelines",
        sequence_order: 4,
        description: "Build robust multi-stage pipelines with matrix testing, dependency caching, and environment secrets.",
        lessons: [
          {
            id: "git-4-1",
            title: "4.1 Matrix Strategies & Pipeline Caching",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Test multiple Node/Python versions concurrently using GitHub Actions matrix syntax.",
            content: `### Matrix Jobs in GitHub Actions
\`\`\`yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]
        node: [18, 20]
\`\`\``,
            challenge_data: {
              initialCode: `oses = ["ubuntu-latest", "macos-latest"]\nnodes = [18, 20]\ntotal_jobs = len(oses) * len(nodes)\nprint("MATRIX_JOBS:", total_jobs)\n`,
              expectedOutput: "MATRIX_JOBS: 4",
              instructions: "Calculate total matrix job combinations and print 'MATRIX_JOBS: 4'."
            }
          }
        ]
      },
      {
        id: "git-acad-mod-5",
        title: "Pillar 5: Git Security & DevSecOps",
        sequence_order: 5,
        description: "Secure repositories with GPG commit signatures, secret scanning, and software bills of materials (SBOMs).",
        lessons: [
          {
            id: "git-5-1",
            title: "5.1 Cryptographically Signed Commits with GPG / SSH",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 80,
            description: "Prevent commit author impersonation by signing commits with public-key cryptography.",
            content: `Git commit author metadata (\`user.name\` and \`user.email\`) can be trivially forged by anyone. Cryptographically signing commits with GPG or SSH keys produces a verified badge on GitHub, proving authorship authenticity.`
          }
        ]
      },
      {
        id: "git-acad-mod-6",
        title: "Pillar 6: GitHub Copilot & AI Engineering",
        sequence_order: 6,
        description: "Leverage AI agents, workspace indexing, and automated pull request summaries.",
        lessons: [
          {
            id: "git-6-1",
            title: "6.1 Copilot Workspace & AI Code Review Agents",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 80,
            description: "Configure automated AI review rules and repository guidelines (.github/copilot-instructions.md).",
            content: `AI agents review pull request diffs, flag potential null pointer exceptions, suggest performance refactors, and ensure project architectural boundaries are honored.`
          }
        ]
      },
      {
        id: "git-acad-mod-7",
        title: "Pillar 7: Infrastructure as Code & GitOps",
        sequence_order: 7,
        description: "Drive cloud infrastructure changes through version control using OpenTofu and ArgoCD.",
        lessons: [
          {
            id: "git-7-1",
            title: "7.1 Declarative State Reconciliation in GitOps",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 85,
            description: "Use Git as the single source of truth for desired Kubernetes and cloud state.",
            content: `In a GitOps architecture, operations agents continuously reconcile running cluster state with the declarative manifests committed to Git, automatically triggering zero-downtime rolling updates.`
          }
        ]
      },
      {
        id: "git-acad-mod-8",
        title: "Pillar 8: Git at Scale & Enterprise Monorepos",
        sequence_order: 8,
        description: "Scale large repositories using Git LFS, partial clones (blobless/treeless), and organization rulesets.",
        lessons: [
          {
            id: "git-8-1",
            title: "8.1 Git Large File Storage (LFS) Pointer Architecture",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Replace large multi-gigabyte binary assets with lightweight text pointer files in Git.",
            content: `### Git LFS Architecture
Instead of storing multi-megabyte binary assets inside Git objects, Git LFS replaces the file with a tiny text pointer containing the file's SHA-256 hash and byte size, downloading the actual asset on-demand.`,
            challenge_data: {
              initialCode: `lfs_pointer = """version https://git-lfs.github.com/spec/v1\noid sha256:4cac19622\nsize 145982"""\nprint("POINTER_PARSED")\n`,
              expectedOutput: "POINTER_PARSED",
              instructions: "Parse the LFS pointer simulation and print 'POINTER_PARSED'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 2: ULTIMATE GITHUB MASTERCLASS: ZERO TO PROFESSIONAL
  // =========================================================================
  {
    id: "ultimate-github",
    slug: "ultimate-github",
    title: "Ultimate GitHub Masterclass: Zero to Professional",
    description: "From your first pull request to enterprise repository fleet governance, branch protection rulesets, and zero-trust CI/CD orchestration.",
    category: "Git & DevOps",
    level: "Beginner",
    weeks: "6 Weeks",
    duration_hours: 32,
    lessons: 35,
    projects: 3,
    certificate: "GitHub Completion Certificate",
    is_premium: false,
    tools: ["GitHub", "Git", "GitHub CLI", "Issues & Projects", "Actions", "Dependabot"],
    highlights: [
      "Level 1-3: Foundations, Conflict Resolution & Collaborative Pull Requests",
      "Level 4: Agile Project Management with GitHub Projects & Milestones",
      "Level 5: Continuous Integration & Automated Testing with GitHub Actions",
      "Level 6-7: Dependabot Security, Secret Scanning & Enterprise Rulesets"
    ],
    modules: [
      {
        id: "gh-master-mod-1",
        title: "Level 1: Foundations & Remote Repositories",
        sequence_order: 1,
        description: "Initialize repositories, configure remotes, and push your first commits.",
        lessons: [
          {
            id: "gh-1-1",
            title: "1.1 Tracking Remotes with git push -u origin main",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Configure remote tracking references for seamless synchronization.",
            content: `### Configuring Origin
The \`-u\` (upstream) flag links your local branch to the remote branch on GitHub:
\`git remote add origin https://github.com/user/repo.git\`
\`git push -u origin main\``,
            challenge_data: {
              initialCode: `remote = "origin"\nbranch = "main"\nprint(f"TRACKING:{remote}/{branch}")\n`,
              expectedOutput: "TRACKING:origin/main",
              instructions: "Output the tracked remote branch: 'TRACKING:origin/main'."
            }
          }
        ]
      },
      {
        id: "gh-master-mod-2",
        title: "Level 2: Branching Strategies & Merge Conflicts",
        sequence_order: 2,
        description: "Isolate experimental features on topic branches and resolve merge conflicts cleanly.",
        lessons: [
          {
            id: "gh-2-1",
            title: "2.1 Resolving Merge Conflicts Confidently",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 65,
            description: "Understand conflict markers (\`<<<<<<<\`, \`=======\`, \`>>>>>>>\`) and clean resolutions.",
            content: `### Anatomical Markers
Git flags overlapping line modifications with conflict markers:
\`\`\`text
<<<<<<< HEAD (Current Change)
color = "emerald"
=======
color = "forest_green"
>>>>>>> feature-theme (Incoming Change)
\`\`\``,
            challenge_data: {
              initialCode: `chosen_color = "emerald"\nprint("RESOLVED:", chosen_color)\n`,
              expectedOutput: "RESOLVED: emerald",
              instructions: "Resolve conflict and print 'RESOLVED: emerald'."
            }
          }
        ]
      },
      {
        id: "gh-master-mod-3",
        title: "Level 3: Collaborative Pull Requests & Code Reviews",
        sequence_order: 3,
        description: "Author detailed PR descriptions, assign CODEOWNERS, and conduct thorough peer reviews.",
        lessons: [
          {
            id: "gh-3-1",
            title: "3.1 Anatomy of an Exceptional Pull Request",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 60,
            description: "Provide context, before/after screenshots, testing steps, and link related issues.",
            content: `Great PRs include concise summaries, reproduction steps, automated test passes, and close issue keywords (e.g. \`Fixes #42\`).`
          }
        ]
      },
      {
        id: "gh-master-mod-4",
        title: "Level 4: Agile Project Management with GitHub Projects",
        sequence_order: 4,
        description: "Organize roadmaps, sprint backlogs, and issue triage with custom fields.",
        lessons: [
          {
            id: "gh-4-1",
            title: "4.1 Automating Issue Workflows in Projects",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 55,
            description: "Automatically move issues from 'Todo' to 'In Progress' upon PR creation.",
            content: `GitHub Projects v2 supports automated status transitions when pull requests are linked to issues, keeping sprint boards up-to-date automatically.`
          }
        ]
      },
      {
        id: "gh-master-mod-5",
        title: "Level 5: CI/CD Automation with GitHub Actions",
        sequence_order: 5,
        description: "Trigger automated tests, linters, and preview environments on every pull request.",
        lessons: [
          {
            id: "gh-5-1",
            title: "5.1 Pull Request Status Checks",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Block merge access until all automated status checks pass.",
            content: `### Required Status Checks
Branch protection can mandate that status checks (such as \`test\`, \`lint\`, \`build\`) pass green before the merge button becomes active.`,
            challenge_data: {
              initialCode: `checks = {"test": True, "lint": True, "security": True}\ncan_merge = all(checks.values())\nprint("CAN_MERGE:", can_merge)\n`,
              expectedOutput: "CAN_MERGE: True",
              instructions: "Evaluate status checks and print 'CAN_MERGE: True'."
            }
          }
        ]
      },
      {
        id: "gh-master-mod-6",
        title: "Level 6: Repository Security & Dependabot",
        sequence_order: 6,
        description: "Automate CVE dependency patching with Dependabot and scan commits for leaked tokens.",
        lessons: [
          {
            id: "gh-6-1",
            title: "6.1 Automated Dependabot Pull Requests",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 70,
            description: "Keep vulnerable packages updated automatically with semver PRs.",
            content: `Dependabot monitors the GitHub Advisory Database. When a vulnerable dependency is detected, it automatically submits a PR updating the package lockfile with passing CI tests.`
          }
        ]
      },
      {
        id: "gh-master-mod-7",
        title: "Level 7: Enterprise Governance & Rulesets",
        sequence_order: 7,
        description: "Enforce branch protections, merge queues, and audit logs across hundreds of repositories.",
        lessons: [
          {
            id: "gh-7-1",
            title: "7.1 Enterprise Repository Rulesets",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 85,
            description: "Apply universal compliance policies across an entire organization with GitHub Rulesets.",
            content: `Rulesets allow organization admins to enforce linear history, require signed commits, and mandate code reviews across all target repositories simultaneously.`
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 3: DOCKER & KUBERNETES: CLOUD-NATIVE DEVOPS 2026
  // =========================================================================
  {
    id: "docker-kubernetes-devops",
    slug: "docker-kubernetes-devops",
    title: "Docker & Kubernetes: Cloud-Native DevOps 2026",
    description: "Engineer resilient containerized microservices: Linux cgroups, multi-stage Docker builds, Kubernetes cluster scheduling, Helm 3 packages, and ArgoCD GitOps pipelines.",
    category: "Git & DevOps",
    level: "Intermediate",
    weeks: "12 Weeks",
    duration_hours: 65,
    lessons: 38,
    projects: 4,
    certificate: "CNCF Certified Kubernetes Practitioner",
    is_premium: true,
    tools: ["Docker", "Kubernetes", "k8s", "kubectl", "Helm", "ArgoCD", "Prometheus", "Minikube"],
    highlights: [
      "Container Internals: Linux Namespaces, cgroups & Copy-on-Write Storage",
      "Multi-Stage Dockerfile Optimization (Distroless & Alpine Minimal Images)",
      "Kubernetes Core Primitives: Pods, ReplicaSets, Deployments & Services",
      "ConfigMaps, Sealed Secrets & Dynamic Persistent Volume Claims (PVC)",
      "GitOps Continuous Delivery with ArgoCD & Blue/Green Canary Deployments"
    ],
    modules: [
      {
        id: "k8s-mod-1",
        title: "Module 1: Docker Internals & Multi-Stage Builds",
        sequence_order: 1,
        description: "Deconstruct container layers, caching mechanisms, and distroless minimal base images.",
        lessons: [
          {
            id: "k8s-1-1",
            title: "1.1 Multi-Stage Image Layer Optimization",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Separate compilation build tools from runtime images to reduce attack surfaces.",
            content: `### Multi-Stage Dockerfiles
By compiling code in a heavy \`builder\` stage and copying only the binary into a scratch/distroless runner stage, image sizes shrink from 800MB to 15MB.`,
            challenge_data: {
              initialCode: `builder_mb = 850\nruntime_mb = 25\nreduction_pct = int(((builder_mb - runtime_mb) / builder_mb) * 100)\nprint(f"REDUCTION:{reduction_pct}%")\n`,
              expectedOutput: "REDUCTION:97%",
              instructions: "Calculate image size reduction percentage and print 'REDUCTION:97%'."
            }
          }
        ]
      },
      {
        id: "k8s-mod-2",
        title: "Module 2: Kubernetes Control Plane & Architecture",
        sequence_order: 2,
        description: "The k8s control plane: kube-apiserver, etcd raft state, kube-scheduler, and kubelet nodes.",
        lessons: [
          {
            id: "k8s-2-1",
            title: "2.1 Declarative Desired State vs Actual State Reconciliation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Understand the Kubernetes control loop: continuous reconciliation via controllers.",
            content: `### The Reconciliation Loop
\`\`\`text
Actual State (3 Pods) <--- Kube Controller ---> Desired State (4 Pods)
Controller detects diff -> Dispatches pod creation via kube-scheduler
\`\`\``,
            challenge_data: {
              initialCode: `desired = 4\nactual = 3\ndef reconcile(d, a):\n    return "SCALE_UP" if d > a else ("SCALE_DOWN" if d < a else "STEADY")\n\nprint("ACTION:", reconcile(desired, actual))\n`,
              expectedOutput: "ACTION: SCALE_UP",
              instructions: "Execute the reconciliation check and print 'ACTION: SCALE_UP'."
            }
          }
        ]
      },
      {
        id: "k8s-mod-3",
        title: "Module 3: Networking, Services & Ingress Controllers",
        sequence_order: 3,
        description: "ClusterIP, NodePort, LoadBalancer services, and NGINX Ingress path-based routing.",
        lessons: [
          {
            id: "k8s-3-1",
            title: "3.1 Service Selector Label Matching",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Route internal traffic to healthy pods matching label selectors.",
            content: `### Label Selectors
Kubernetes Services route traffic across pods whose metadata labels match the service's \`selector\` field.`,
            challenge_data: {
              initialCode: `service_selector = {"app": "api", "env": "prod"}\npod_labels = {"app": "api", "env": "prod", "version": "v2"}\nis_match = all(pod_labels.get(k) == v for k, v in service_selector.items())\nprint("ENDPOINT_MATCH:", is_match)\n`,
              expectedOutput: "ENDPOINT_MATCH: True",
              instructions: "Verify label selector matching and print 'ENDPOINT_MATCH: True'."
            }
          }
        ]
      },
      {
        id: "k8s-mod-4",
        title: "Module 4: GitOps & Declarative Delivery with ArgoCD",
        sequence_order: 4,
        description: "Treat Git as the single source of truth for all Kubernetes infrastructure manifests.",
        lessons: [
          {
            id: "k8s-4-1",
            title: "4.1 ArgoCD Automated Out-of-Sync Self-Healing",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 90,
            description: "Detect unauthorized manual kubectl changes and automatically revert to Git state.",
            content: `ArgoCD continuously compares live cluster state against Git manifests. If an engineer manually alters a deployment on cluster, ArgoCD flags OutOfSync and automatically reverts the cluster to the committed Git commit.`
          }
        ]
      }
    ]
  }
]

