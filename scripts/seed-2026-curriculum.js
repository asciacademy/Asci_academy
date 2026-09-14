const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const coursesToSeed = [
  {
    title: "Agentic AI Full Course 2026",
    slug: "agentic-ai",
    description: "Master autonomous goal-driven agents, PRAL loop architecture, LangGraph, Pydantic AI, MCP (Model Context Protocol), and multi-agent enterprise swarms.",
    category: "AI & ML",
    difficulty: "Advanced",
    duration_hours: 42,
    is_premium: false,
    thumbnail_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop",
    modules: [
      {
        title: "Module 1: Foundations of Agentic AI",
        sequence_order: 1,
        lessons: [
          {
            title: "1.1 What is Agentic AI vs Traditional AI",
            sequence_order: 1,
            xp_reward: 50,
            description: "Understand the shift from static LLM completions to goal-driven autonomous systems.",
            content: "Welcome to Agentic AI. Traditional AI produces static text responses. Agentic AI acts autonomously within an environment to accomplish higher-order goals by continuously iterating through the PRAL Loop: Perceive, Reason, Act, and Learn.",
            challenge_data: {
              initialCode: 'agent = {"state": "PRAL_ACTIVE"}\nprint(agent["state"])\n',
              expectedOutput: "PRAL_ACTIVE",
              instructions: "Print the agent's active state 'PRAL_ACTIVE' to verify the environment."
            }
          },
          {
            title: "1.2 The Three-Layer Agent Architecture",
            sequence_order: 2,
            xp_reward: 75,
            description: "Deconstruct the Perception, Cognition, and Action layers in production agents.",
            content: "Autonomous systems isolate responsibilities into three distinct architectural tiers: Perception, Cognition, and Action.",
            challenge_data: {
              initialCode: 'layers = ["Perception", "Cognition", "Action"]\nprint(len(layers))\n',
              expectedOutput: "3",
              instructions: "Print the total count of architectural layers (3)."
            }
          }
        ]
      },
      {
        title: "Module 2: Design Patterns & MCP",
        sequence_order: 2,
        lessons: [
          {
            title: "2.1 The Planner-Executor Pattern",
            sequence_order: 1,
            xp_reward: 100,
            description: "Separate generation of the execution plan from individual step fulfillment.",
            content: "Decouple planning from execution so the agent creates an immutable plan before invoking external tools.",
            challenge_data: {
              initialCode: 'plan = ["FETCH", "PROCESS", "DEPLOY"]\nfor step in plan:\n    print(step)\n',
              expectedOutput: "FETCH\nPROCESS\nDEPLOY",
              instructions: "Iterate through the plan array and print each stage."
            }
          }
        ]
      }
    ]
  },
  {
    title: "Modern Git Academy (Complete 8-Pillar Program)",
    slug: "modern-git-academy",
    description: "The definitive 300+ lesson curriculum: from Git object DAG internals and modern worktrees to GitHub Actions CI/CD, DevSecOps supply chain security, and Copilot AI workflows.",
    category: "Git & DevOps",
    difficulty: "All Levels",
    duration_hours: 60,
    is_premium: false,
    thumbnail_url: "https://images.unsplash.com/photo-1618401471353-b98aedd04e11?q=80&w=1600&auto=format&fit=crop",
    modules: [
      {
        title: "Pillar 1: Git Fundamentals & Internal Architecture",
        sequence_order: 1,
        lessons: [
          {
            title: "1.1 How Git Actually Works (The Content-Addressable Store)",
            sequence_order: 1,
            xp_reward: 60,
            description: "Explore the .git directory: blobs, trees, commits, and SHA hashes.",
            content: "Git is not a delta store; it is a content-addressable filesystem constructed of cryptographically hashed blobs, trees, and commits.",
            challenge_data: {
              initialCode: 'print("GIT_DIR_INITIALIZED")\n',
              expectedOutput: "GIT_DIR_INITIALIZED",
              instructions: "Output the system string to initialize your internal repository knowledge."
            }
          }
        ]
      }
    ]
  },
  {
    title: "Google Data Analytics Professional Certificate",
    slug: "google-data-analytics",
    description: "The industry-standard 8-course credential: ask business questions, prepare and clean datasets, analyze trends with R and SQL, and share visual narratives.",
    category: "Data Science",
    difficulty: "Beginner",
    duration_hours: 180,
    is_premium: false,
    thumbnail_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1600&auto=format&fit=crop",
    modules: [
      {
        title: "Course 1: Foundations — Data Everywhere",
        sequence_order: 1,
        lessons: [
          {
            title: "1.1 Thinking Like an Analyst",
            sequence_order: 1,
            xp_reward: 50,
            description: "Frame problem statements, distinguish root cause from symptoms, and understand data lifecycles.",
            content: "Data analysis translates organizational ambiguity into structured, measurable questions that guide strategic decisions.",
            challenge_data: null
          }
        ]
      }
    ]
  },
  {
    title: "CS50 Introduction to Cybersecurity (HarvardX)",
    slug: "cs50-cybersecurity",
    description: "Harvard University's introduction to defending data, devices, and systems against digital threats, social engineering, cryptanalysis, and network exploits.",
    category: "Cybersecurity",
    difficulty: "Beginner",
    duration_hours: 48,
    is_premium: false,
    thumbnail_url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1600&auto=format&fit=crop",
    modules: [
      {
        title: "Module 1: Threat Landscape & Cryptography",
        sequence_order: 1,
        lessons: [
          {
            title: "1.1 Hashing vs Encryption vs Encoding",
            sequence_order: 1,
            xp_reward: 70,
            description: "Differentiate one-way hash digests (SHA-256) from two-way ciphers (AES).",
            content: "Encoding is for data transport, hashing is one-way deterministic integrity checking, and encryption protects confidentiality with secret keys.",
            challenge_data: {
              initialCode: 'print("SECURE_CIPHER_OK")\n',
              expectedOutput: "SECURE_CIPHER_OK",
              instructions: "Confirm your understanding of cipher verification."
            }
          }
        ]
      }
    ]
  },
  {
    title: "Python for Data Science, AI & Development",
    slug: "python-ai",
    description: "Master modern Python 3.12 syntax, object-oriented design, async I/O, REST APIs, and the mathematical standard libraries powering machine learning.",
    category: "Programming",
    difficulty: "Beginner",
    duration_hours: 50,
    is_premium: false,
    thumbnail_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1600&auto=format&fit=crop",
    modules: [
      {
        title: "Module 1: Language Syntax & Type System",
        sequence_order: 1,
        lessons: [
          {
            title: "1.1 Modern Python Architecture",
            sequence_order: 1,
            xp_reward: 50,
            description: "Write clean, type-hinted Python code with automated testing.",
            content: "Python is a dynamic, strongly typed language. We leverage type annotations to eliminate runtime bugs before deployment.",
            challenge_data: {
              initialCode: 'def greet(name: str) -> str:\n    return f"HELLO_{name.upper()}"\n\nprint(greet("architect"))\n',
              expectedOutput: "HELLO_ARCHITECT",
              instructions: "Return and print the formatted string 'HELLO_ARCHITECT'."
            }
          }
        ]
      }
    ]
  }
];

async function seedCurriculum() {
  console.log("Seeding 2026 Curriculum Courses into Supabase...");

  for (const courseData of coursesToSeed) {
    // Check if course already exists
    const { data: existingCourse } = await supabase
      .from("courses")
      .select("id")
      .eq("slug", courseData.slug)
      .maybeSingle();

    let courseId = existingCourse ? existingCourse.id : null;

    if (!courseId) {
      const { data: newCourse, error: courseErr } = await supabase
        .from("courses")
        .insert({
          title: courseData.title,
          description: courseData.description,
          slug: courseData.slug,
          difficulty: courseData.difficulty,
          duration_hours: courseData.duration_hours,
          is_premium: courseData.is_premium,
          thumbnail_url: courseData.thumbnail_url,
          is_published: true
        })
        .select("id")
        .single();

      if (courseErr) {
        console.error("Failed inserting course:", courseData.title, courseErr);
        continue;
      }
      courseId = newCourse.id;
      console.log(`[+] Created Course: ${courseData.title} (${courseId})`);
    } else {
      console.log(`[*] Course already exists: ${courseData.title} (${courseId})`);
    }

    // Insert modules & lessons
    for (const mod of courseData.modules) {
      let { data: existingModule } = await supabase
        .from("modules")
        .select("id")
        .eq("course_id", courseId)
        .eq("title", mod.title)
        .maybeSingle();

      let moduleId = existingModule ? existingModule.id : null;

      if (!moduleId) {
        const { data: newMod, error: modErr } = await supabase
          .from("modules")
          .insert({
            course_id: courseId,
            title: mod.title,
            sequence_order: mod.sequence_order
          })
          .select("id")
          .single();

        if (modErr) {
          console.error("   [-] Failed Module:", mod.title, modErr);
          continue;
        }
        moduleId = newMod.id;
        console.log(`   [+] Created Module: ${mod.title}`);
      }

      for (const lesson of mod.lessons) {
        const { data: existingLesson } = await supabase
          .from("lessons")
          .select("id")
          .eq("module_id", moduleId)
          .eq("title", lesson.title)
          .maybeSingle();

        if (!existingLesson) {
          const { error: lessonErr } = await supabase
            .from("lessons")
            .insert({
              module_id: moduleId,
              title: lesson.title,
              sequence_order: lesson.sequence_order,
              content_type: lesson.challenge_data ? "challenge" : "text",
              xp_reward: lesson.xp_reward,
              content: lesson.content,
              challenge_data: lesson.challenge_data ? JSON.stringify(lesson.challenge_data) : null,
              description: lesson.description
            });

          if (lessonErr) {
            console.error("      [-] Failed Lesson:", lesson.title, lessonErr);
          } else {
            console.log(`      [+] Created Lesson: ${lesson.title}`);
          }
        }
      }
    }
  }

  console.log("\n2026 Curriculum Seeding complete!");
}

seedCurriculum().catch(console.error);
