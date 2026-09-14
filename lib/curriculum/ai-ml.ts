import { CurriculumCourse } from "../curriculum-data"

export const AI_ML_COURSES: CurriculumCourse[] = [
  // =========================================================================
  // COURSE 1: AGENTIC AI FULL COURSE 2026
  // =========================================================================
  {
    id: "agentic-ai",
    slug: "agentic-ai",
    title: "Agentic AI Full Course 2026",
    description: "Master autonomous goal-driven agents, PRAL loop architecture, LangGraph, Pydantic AI, MCP (Model Context Protocol), and multi-agent enterprise swarms.",
    category: "AI & ML",
    level: "Advanced",
    weeks: "10 Weeks",
    duration_hours: 42,
    lessons: 32,
    projects: 4,
    certificate: "Microsoft & Simplilearn Joint Certificate",
    is_premium: false,
    tools: ["Python 3.12", "LangGraph", "Pydantic AI", "MCP", "CrewAI", "LangSmith", "Ollama"],
    highlights: [
      "The PRAL Loop: Perceive, Reason, Act, and Learn",
      "ReAct and Planner-Executor Agent Architectures",
      "Cyclical Workflow Orchestration with LangGraph State Machines",
      "Model Context Protocol (MCP) Client and Server Integration",
      "Human-in-the-Loop Checkpoints, Guardrails & Evals with LangSmith"
    ],
    modules: [
      {
        id: "agentic-mod-1",
        title: "Module 1: Foundations of Agentic AI & The PRAL Loop",
        sequence_order: 1,
        description: "Deconstruct the shift from passive prompt engineering to autonomous, stateful agency.",
        lessons: [
          {
            id: "agentic-1-1",
            title: "1.1 The Shift from Prompting to Agency",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Understand single-turn LLM completions versus continuous, goal-directed reasoning loops.",
            content: `### Beyond Static Prompting
In traditional LLM workflows, an application sends a single prompt and receives a single completion. If the output contains errors or lacks data, the process fails.

**Agentic AI** introduces autonomous loops where the system operates as an **agent**:
1. **Perceive:** Ingest signals from environment, API responses, or user objectives.
2. **Reason:** Formulate multi-step strategies and decide which tools to summon.
3. **Act:** Invoke functions, query databases, or execute code.
4. **Learn (Evaluate):** Inspect results, catch exceptions, and self-correct until the goal state is reached.

\`\`\`python
class AgentLoop:
    def __init__(self, objective: str):
        self.objective = objective
        self.state = "INITIALIZED"

    def transition(self, next_state: str):
        self.state = next_state
        return f"STATE_TRANSITION::{self.state}"

agent = AgentLoop("DATA_AUDIT")
print(agent.transition("PRAL_ACTIVE"))
\`\`\``,
            challenge_data: {
              initialCode: `state = "PENDING"\n# Transition state to PRAL_ACTIVE\nstate = "PRAL_ACTIVE"\nprint(state)\n`,
              expectedOutput: "PRAL_ACTIVE",
              instructions: "Set the variable state to 'PRAL_ACTIVE' and print it."
            }
          },
          {
            id: "agentic-1-2",
            title: "1.2 The Three-Layer Agent Architecture",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 75,
            description: "Isolate Perception, Cognition, and Action layers for modular agent engineering.",
            content: `### Decoupling the Agent Stack
Every production agent relies on three decoupled subsystems:
* **Perception Layer:** Context summarization, multimodal vision/audio transcription, and state representation.
* **Cognition Layer:** Planning heuristics, memory lookup (vector + episodic key-value store), and decision gating.
* **Action Layer:** Structured JSON tool schema calling, deterministic API execution, and safety validations.

\`\`\`python
class Perception:
    def parse_input(self, text: str) -> dict:
        return {"intent": "SEARCH", "query": text}

p = Perception()
print(p.parse_input("quantum computing")["intent"])
\`\`\``,
            challenge_data: {
              initialCode: `def parse_intent(query: str) -> str:\n    # Return 'SEARCH' if 'find' in query, else 'GENERAL'\n    return "SEARCH" if "find" in query.lower() else "GENERAL"\n\nprint(parse_intent("Find recent papers on agent swarms"))\n`,
              expectedOutput: "SEARCH",
              instructions: "Implement parse_intent to inspect queries and return 'SEARCH'."
            }
          }
        ]
      },
      {
        id: "agentic-mod-2",
        title: "Module 2: Agent Design Patterns — ReAct, Planner & Reflection",
        sequence_order: 2,
        description: "Master industry design patterns that prevent infinite loops and optimize token budgets.",
        lessons: [
          {
            id: "agentic-2-1",
            title: "2.1 The ReAct Pattern (Reasoning + Acting)",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 80,
            description: "Interleave verbal reasoning traces with domain-specific tool executions.",
            content: `### The ReAct Pattern
In ReAct (Yao et al.), an LLM generates alternating traces of:
1. **Thought:** "I need to look up current currency conversion rates."
2. **Action:** \`query_rates(pair='USD/EUR')\`
3. **Observation:** \`0.92\`
4. **Final Thought:** "Now I can compute the customer price."

This transparent trajectory dramatically reduces hallucination and provides auditability.`,
            challenge_data: {
              initialCode: `thought = "Calculate price in EUR"\nfx_rate = 0.92\nusd_price = 100\n# Compute eur_price\neur_price = int(usd_price * fx_rate)\nprint(f"EUR:{eur_price}")\n`,
              expectedOutput: "EUR:92",
              instructions: "Calculate the converted price and output 'EUR:92'."
            }
          }
        ]
      },
      {
        id: "agentic-mod-3",
        title: "Module 3: LangGraph, Pydantic AI & MCP Protocols",
        sequence_order: 3,
        description: "Construct cyclic state graphs and standardize agent-tool interfaces via MCP.",
        lessons: [
          {
            id: "agentic-3-1",
            title: "3.1 Stateful Cyclical Workflows with LangGraph",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Model branching agent states using Directed Acyclic Graphs (DAGs) with cyclical recursion.",
            content: `### Why DAGs Fall Short
Linear chains cannot handle human-in-the-loop revisions, recursive self-correction, or tool retries. **LangGraph** models the agent as a state machine where nodes are functions and edges represent conditional routing logic.

\`\`\`python
state = {"messages": [], "retry_count": 0}

def should_continue(state: dict) -> str:
    if state["retry_count"] >= 3:
        return "END"
    return "CONTINUE"
\`\`\``,
            challenge_data: {
              initialCode: `state = {"step": "review", "approved": True}\n\ndef route(s):\n    return "EXECUTE" if s.get("approved") else "REVISE"\n\nprint(route(state))\n`,
              expectedOutput: "EXECUTE",
              instructions: "Route the state machine based on approval status and print 'EXECUTE'."
            }
          },
          {
            id: "agentic-3-2",
            title: "3.2 Model Context Protocol (MCP) Standards",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 95,
            description: "Expose local files, APIs, and databases to agents using Anthropic's open MCP standard.",
            content: `### Model Context Protocol (MCP)
MCP replaces fragmented proprietary plugins with a universal JSON-RPC 2.0 protocol. MCP defines:
1. **Resources:** Passive data feeds (files, database tables).
2. **Tools:** Executable actions with strict JSON Schema inputs.
3. **Prompts:** Pre-configured workflows exposed by the server.

\`\`\`python
tool_schema = {
    "name": "fetch_weather",
    "description": "Get current temperature",
    "parameters": {"city": "str"}
}
\`\`\``,
            challenge_data: {
              initialCode: `mcp_packet = {\n    "jsonrpc": "2.0",\n    "method": "tools/call",\n    "params": {"name": "get_stock_price"}\n}\nprint("METHOD:", mcp_packet["method"])\n`,
              expectedOutput: "METHOD: tools/call",
              instructions: "Verify the MCP protocol method call and output 'METHOD: tools/call'."
            }
          }
        ]
      },
      {
        id: "agentic-mod-4",
        title: "Module 4: Multi-Agent Swarms & Hierarchical Orchestration",
        sequence_order: 4,
        description: "Deploy swarms of specialized subagents coordinated by an architect supervisor.",
        lessons: [
          {
            id: "agentic-4-1",
            title: "4.1 Supervisor-Worker Swarm Architecture",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Route user requests across specialized coder, researcher, and auditor subagents.",
            content: `### Swarm Routing
A supervisor model parses the goal, breaks it into subtasks, and assigns each to an isolated subagent with its own specialized prompt and tools. Results are consolidated before returning to the user.`,
            challenge_data: {
              initialCode: `workers = ["researcher", "coder", "auditor"]\n# Assign task to coder\ntarget = workers[1]\nprint(f"ASSIGNED:{target.upper()}")\n`,
              expectedOutput: "ASSIGNED:CODER",
              instructions: "Assign the coding subtask and print 'ASSIGNED:CODER'."
            }
          }
        ]
      },
      {
        id: "agentic-mod-5",
        title: "Module 5: Production Evals, Guardrails & Capstone",
        sequence_order: 5,
        description: "Benchmark autonomous reliability using LangSmith evaluations and NeMo Guardrails.",
        lessons: [
          {
            id: "agentic-5-1",
            title: "5.1 Automated Trajectory Evaluation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Grade agent task success, tool-call precision, and hallucination rates.",
            content: `### Evaluating Autonomous Agents
Unlike classification models evaluated on accuracy, agents are evaluated on **trajectory completeness**:
- Did the agent call the correct sequence of tools?
- Did it respect token and loop limits?
- Did it produce verifiable proof-of-work?`,
            challenge_data: {
              initialCode: `def eval_run(steps, max_steps=5):\n    return "PASS" if steps <= max_steps else "FAIL_TIMEOUT"\n\nprint(eval_run(3))\n`,
              expectedOutput: "PASS",
              instructions: "Evaluate the agent run trajectory and print 'PASS'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 2: AI FOR EVERYONE: MASTER THE BASICS (IBM)
  // =========================================================================
  {
    id: "ai-for-everyone",
    slug: "ai-for-everyone",
    title: "AI for Everyone: Master the Basics",
    description: "Understand the true capabilities, limitations, and business economics of modern AI, machine learning, and generative systems. Created with IBM curriculum standards.",
    category: "AI & ML",
    level: "Beginner",
    weeks: "4 Weeks",
    duration_hours: 8,
    lessons: 16,
    projects: 1,
    certificate: "IBM Professional Certificate",
    is_premium: false,
    tools: ["AI Economics", "Business Strategy", "Prompt Engineering", "Risk Management"],
    highlights: [
      "The exact boundary between Narrow AI, Machine Learning, and AGI",
      "Identifying high-ROI enterprise use cases vs marketing hype",
      "Managing hallucinations, context limits, and data privacy risks",
      "Building responsible AI audit rubrics for teams"
    ],
    modules: [
      {
        id: "ai-ev-mod-1",
        title: "Module 1: AI, Machine Learning & Deep Learning Taxonomies",
        sequence_order: 1,
        description: "Establish precise mental models for artificial intelligence, neural networks, and LLMs.",
        lessons: [
          {
            id: "ai-ev-1-1",
            title: "1.1 Demystifying the AI Taxonomies",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 40,
            description: "Differentiate Artificial Intelligence, Machine Learning, and Deep Learning.",
            content: `### The Hierarchy of Modern AI
* **Artificial Intelligence (AI):** The overarching field of building computing systems capable of performing tasks normally requiring human intelligence.
* **Machine Learning (ML):** A mathematical subset where models learn representations from training data instead of being explicitly programmed with rule trees.
* **Deep Learning (DL):** A sub-field using multi-layer artificial neural networks inspired by biological neuroscience.

\`\`\`python
taxonomy = ["AI", "Machine Learning", "Deep Learning"]
print(" -> ".join(taxonomy))
\`\`\``,
            challenge_data: {
              initialCode: `print("AI -> ML -> DL")\n`,
              expectedOutput: "AI -> ML -> DL",
              instructions: "Print the progression string 'AI -> ML -> DL' to confirm the taxonomy hierarchy."
            }
          },
          {
            id: "ai-ev-1-2",
            title: "1.2 Supervised vs Unsupervised vs Reinforcement Learning",
            sequence_order: 2,
            content_type: "text",
            xp_reward: 50,
            description: "Understand the three foundational learning paradigms.",
            content: `### The Three Learning Paradigms
1. **Supervised Learning:** Learning from labeled $(x, y)$ pairs (e.g. predicting house prices or classifying spam).
2. **Unsupervised Learning:** Discovering hidden patterns or clusters in unlabeled data $x$ (e.g. customer segmentation).
3. **Reinforcement Learning:** Learning via trial-and-error rewards and penalties to achieve an objective in an environment.`
          }
        ]
      },
      {
        id: "ai-ev-mod-2",
        title: "Module 2: Real-World Business Applications & ROI Economics",
        sequence_order: 2,
        description: "Evaluate project feasibility using data availability, error tolerance, and ROI metrics.",
        lessons: [
          {
            id: "ai-ev-2-1",
            title: "2.1 What Makes a Strong AI Business Problem",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 60,
            description: "Calculate expected ROI for an automated document triage pipeline.",
            content: `### Business Feasibility Formula
Not every problem needs AI. High-potential business problems possess:
1. High transaction volume where marginal cost reductions compound.
2. Moderate tolerance for probabilistic outputs with human validation fallbacks.
3. Access to proprietary internal data that competitors lack.`,
            challenge_data: {
              initialCode: `manual_hours = 1000\nhourly_rate = 50\nautomation_pct = 0.70\n# Calculate annual savings\nsavings = int(manual_hours * hourly_rate * automation_pct)\nprint("SAVINGS:₹" + str(savings))\n`,
              expectedOutput: "SAVINGS:₹35000",
              instructions: "Calculate the net annual savings and output 'SAVINGS:₹35000'."
            }
          }
        ]
      },
      {
        id: "ai-ev-mod-3",
        title: "Module 3: What AI Can and Cannot Do (Technical Limits)",
        sequence_order: 3,
        description: "Navigate hallucinations, context window bottlenecks, and reasoning fragility.",
        lessons: [
          {
            id: "ai-ev-3-1",
            title: "3.1 Understanding Probabilistic vs Deterministic Systems",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 60,
            description: "Why LLMs struggle with multi-digit arithmetic and exact logical proofs without external tools.",
            content: `Large language models predict token probabilities rather than performing formal symbolic computation. For arithmetic, database queries, and cryptographic tasks, pairing models with external code sandboxes or APIs is essential.`
          }
        ]
      },
      {
        id: "ai-ev-mod-4",
        title: "Module 4: Ethics, Bias, Copyright & Governance",
        sequence_order: 4,
        description: "Mitigate societal bias, ensure regulatory compliance, and deploy fair AI systems.",
        lessons: [
          {
            id: "ai-ev-4-1",
            title: "4.1 Responsible AI Rubrics & Auditing",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Implement automated fairness checks on model outcome distributions.",
            content: `### Fairness and Demographic Parity
An AI recruitment or credit-scoring system must adhere to anti-bias regulations, ensuring acceptance rates across protected demographic classes remain statistically equitable.`,
            challenge_data: {
              initialCode: `rate_group_a = 0.82\nrate_group_b = 0.80\ndisparity = round(abs(rate_group_a - rate_group_b), 2)\nprint(f"DISPARITY:{disparity}")\n`,
              expectedOutput: "DISPARITY:0.02",
              instructions: "Calculate demographic disparity and print 'DISPARITY:0.02'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 3: ARTIFICIAL INTELLIGENCE (COLUMBIA UNIVERSITY)
  // =========================================================================
  {
    id: "columbia-ai",
    slug: "columbia-ai",
    title: "Artificial Intelligence (Columbia University)",
    description: "Rigorous academic study of intelligent agents, A* graph search, constraint satisfaction, adversarial minimax game trees, and neural NLP.",
    category: "AI & ML",
    level: "Advanced",
    weeks: "12 Weeks",
    duration_hours: 108,
    lessons: 48,
    projects: 6,
    certificate: "Columbia University Certificate",
    is_premium: true,
    tools: ["Python", "NumPy", "Graph Theory", "Optimization", "Minimax", "A* Search"],
    highlights: [
      "State Space Search: BFS, DFS, Dijkstra, and A* with Admissible Heuristics",
      "Adversarial Decision Trees: Minimax with Alpha-Beta Pruning",
      "Constraint Satisfaction Problems: Arc Consistency (AC-3) & MRV",
      "Markov Decision Processes & Bellman Equation Value Iteration",
      "Feedforward Neural Networks & Backpropagation Gradient Descent"
    ],
    modules: [
      {
        id: "col-ai-mod-1",
        title: "Module 1: Informed State Space Search & A*",
        sequence_order: 1,
        description: "Explore graph search algorithms and formulate admissible heuristics for shortest-path optimization.",
        lessons: [
          {
            id: "col-ai-1-1",
            title: "1.1 The A* Search Algorithm & Admissibility",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Calculate f(n) = g(n) + h(n) and prove heuristic admissibility.",
            content: `### The A* Evaluation Function
A* explores nodes by evaluating:
$$f(n) = g(n) + h(n)$$
* **$g(n)$:** The exact cost accumulated from the start node to current node $n$.
* **$h(n)$:** The estimated heuristic cost from node $n$ to the goal.

An admissible heuristic **never overestimates** the true cost to reach the goal ($h(n) \\le h^*(n)$), guaranteeing A* finds the optimal shortest path.`,
            challenge_data: {
              initialCode: `def a_star_f(g, h):\n    return g + h\n\nprint("F_COST:", a_star_f(15, 10))\n`,
              expectedOutput: "F_COST: 25",
              instructions: "Compute the A* evaluation cost and output 'F_COST: 25'."
            }
          },
          {
            id: "col-ai-1-2",
            title: "1.2 Manhattan Distance Heuristic in Grid Worlds",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 95,
            description: "Compute the L1 Manhattan distance heuristic between coordinates.",
            content: `### Manhattan Distance
In grid environments where diagonal movements are disallowed, the Manhattan distance between $(x_1, y_1)$ and $(x_2, y_2)$ is:
$$h(n) = |x_1 - x_2| + |y_1 - y_2|$$`,
            challenge_data: {
              initialCode: `def manhattan(p1, p2):\n    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])\n\nprint("H_COST:", manhattan((0, 0), (4, 3)))\n`,
              expectedOutput: "H_COST: 7",
              instructions: "Calculate the Manhattan heuristic from (0,0) to (4,3) and output 'H_COST: 7'."
            }
          }
        ]
      },
      {
        id: "col-ai-mod-2",
        title: "Module 2: Adversarial Search & Minimax",
        sequence_order: 2,
        description: "Implement optimal decision strategies in two-player zero-sum games with Alpha-Beta pruning.",
        lessons: [
          {
            id: "col-ai-2-1",
            title: "2.1 Minimax with Alpha-Beta Pruning",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 110,
            description: "Prune branches that cannot possibly influence the final minimax decision.",
            content: `### Alpha-Beta Search Bounds
* **$\\alpha$:** The best value that the MAX player can guarantee so far.
* **$\\beta$:** The best value that the MIN player can guarantee so far.

If at any point $\\alpha \\ge \\beta$, the remaining children of that node can be pruned without affecting the optimal move.`,
            challenge_data: {
              initialCode: `alpha = 5\nbeta = 3\nif alpha >= beta:\n    print("PRUNE")\nelse:\n    print("CONTINUE")\n`,
              expectedOutput: "PRUNE",
              instructions: "Evaluate the alpha-beta condition and print 'PRUNE'."
            }
          }
        ]
      },
      {
        id: "col-ai-mod-3",
        title: "Module 3: Constraint Satisfaction Problems (CSP)",
        sequence_order: 3,
        description: "Solve constraint graphs using Backtracking, Minimum Remaining Values (MRV), and AC-3.",
        lessons: [
          {
            id: "col-ai-3-1",
            title: "3.1 Arc Consistency (AC-3 Algorithm)",
            sequence_order: 1,
            content_type: "text",
            xp_reward: 100,
            description: "Propagate constraints to reduce variable domain sizes prior to recursive search.",
            content: `### AC-3 Constraint Propagation
An arc $(X_i, X_j)$ is consistent if for every value $x$ in the domain $D_i$, there exists some value $y$ in $D_j$ that satisfies the binary constraint between $X_i$ and $X_j$. AC-3 maintains an arc queue, pruning illegal domain values in $O(c d^3)$ polynomial time.`
          }
        ]
      },
      {
        id: "col-ai-mod-4",
        title: "Module 4: Markov Decision Processes & Reinforcement Learning",
        sequence_order: 4,
        description: "Model decision-making under uncertainty using Bellman optimality and Value Iteration.",
        lessons: [
          {
            id: "col-ai-4-1",
            title: "4.1 The Bellman Equation & Value Iteration",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 110,
            description: "Calculate discounted future rewards for an optimal policy: $V(s) = \\max_a \\sum P(s'|s, a) [R + \\gamma V(s')]$.",
            content: `### Bellman Value Iteration
Value iteration updates state values iteratively until convergence:
$$V_{k+1}(s) = \\max_{a} \\sum_{s'} T(s, a, s') [R(s, a, s') + \\gamma V_k(s')]$$`,
            challenge_data: {
              initialCode: `reward = 10\ngamma = 0.9\nnext_v = 100\n# Value = reward + gamma * next_v\nv = reward + gamma * next_v\nprint("BELLMAN_V:", int(v))\n`,
              expectedOutput: "BELLMAN_V: 100",
              instructions: "Calculate the discounted value and print 'BELLMAN_V: 100'."
            }
          }
        ]
      },
      {
        id: "col-ai-mod-5",
        title: "Module 5: Neural Networks & Gradient Descent",
        sequence_order: 5,
        description: "Understand feedforward propagation, activation functions, and backpropagation.",
        lessons: [
          {
            id: "col-ai-5-1",
            title: "5.1 Forward Propagation & ReLU Activation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 95,
            description: "Compute neuron activation using matrix weights, bias, and Rectified Linear Unit (ReLU).",
            content: `### Neuron Forward Activation
For input vector $\\mathbf{x}$, weight vector $\\mathbf{w}$, and bias $b$:
$$z = \\mathbf{w} \\cdot \\mathbf{x} + b$$
$$\\text{ReLU}(z) = \\max(0, z)$$`,
            challenge_data: {
              initialCode: `def relu(z):\n    return max(0, z)\n\nw = 2\nx = 3\nb = -4\nz = (w * x) + b\nprint("ACTIVATION:", relu(z))\n`,
              expectedOutput: "ACTIVATION: 2",
              instructions: "Calculate ReLU activation and print 'ACTIVATION: 2'."
            }
          }
        ]
      },
      {
        id: "col-ai-mod-6",
        title: "Module 6: Natural Language Processing & Vector Embeddings",
        sequence_order: 6,
        description: "Project words and sentences into dense semantic vector spaces using cosine similarity.",
        lessons: [
          {
            id: "col-ai-6-1",
            title: "6.1 Cosine Similarity for Semantic Search",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Calculate the cosine of the angle between two embedding vectors in Euclidean space.",
            content: `### Cosine Metric
$$\\text{sim}(\\mathbf{u}, \\mathbf{v}) = \\frac{\\mathbf{u} \\cdot \\mathbf{v}}{\\|\\mathbf{u}\\| \\|\\mathbf{v}\\|}$$
Normalized vectors with cosine similarity close to $1.0$ share tight semantic relevance.`,
            challenge_data: {
              initialCode: `u = [1, 0]\nv = [1, 0]\ndot = sum(a * b for a, b in zip(u, v))\nprint("SIMILARITY:", dot)\n`,
              expectedOutput: "SIMILARITY: 1",
              instructions: "Compute cosine similarity of parallel unit vectors and print 'SIMILARITY: 1'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 4: DEEP LEARNING & NEURAL NETWORKS SPECIALIZATION (ANDREW NG)
  // =========================================================================
  {
    id: "deep-learning-specialization",
    slug: "deep-learning-specialization",
    title: "Deep Learning & Neural Networks Specialization",
    description: "Master modern deep learning foundations from multi-layer perceptrons, backpropagation, and Adam optimization to CNN computer vision and Transformer self-attention.",
    category: "AI & ML",
    level: "Advanced",
    weeks: "16 Weeks",
    duration_hours: 80,
    lessons: 45,
    projects: 5,
    certificate: "DeepLearning.AI Verified Specialization",
    is_premium: false,
    tools: ["Python 3.12", "PyTorch", "NumPy", "TensorFlow", "Transformers", "CUDA"],
    highlights: [
      "Vectorized Forward & Backward Propagation without External Frameworks",
      "Advanced Optimization: Adam, RMSprop, Momentum, and Learning Rate Decay",
      "Computer Vision Architectures: ResNet Residual Blocks and YOLO Object Detection",
      "Natural Language Modeling: Recurrent Memory, LSTMs & Scaled Dot-Product Attention",
      "Multi-GPU Distributed Training Strategies & Mixed Precision (FP16/BF16)"
    ],
    modules: [
      {
        id: "dl-mod-1",
        title: "Module 1: Deep Neural Network Foundations & Backprop",
        sequence_order: 1,
        description: "Derive gradient descent, matrix calculus, and backpropagation for L-layer deep nets.",
        lessons: [
          {
            id: "dl-1-1",
            title: "1.1 Vectorized Logistic Regression for Binary Classification",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 70,
            description: "Compute sigmoid activations: $\\sigma(z) = \\frac{1}{1 + e^{-z}}$.",
            content: `### Vectorized Sigmoid Activation
The sigmoid function maps any real scalar into the interval $(0, 1)$ representing probability:
$$\\sigma(z) = \\frac{1}{1 + e^{-z}}$$

\`\`\`python
import math
def sigmoid(z):
    return 1 / (1 + math.exp(-z))
print(round(sigmoid(0), 2)) # 0.5
\`\`\``,
            challenge_data: {
              initialCode: `import math\ndef sigmoid(z):\n    return 1 / (1 + math.exp(-z))\n\nprint("SIGMOID_ZERO:", round(sigmoid(0), 1))\n`,
              expectedOutput: "SIGMOID_ZERO: 0.5",
              instructions: "Evaluate sigmoid at z=0 and print 'SIGMOID_ZERO: 0.5'."
            }
          },
          {
            id: "dl-1-2",
            title: "1.2 Computing Binary Cross-Entropy Loss",
            sequence_order: 2,
            content_type: "challenge",
            xp_reward: 80,
            description: "Calculate cost function: $L(y, \\hat{y}) = -[y \\log(\\hat{y}) + (1-y)\\log(1-\\hat{y})]$.",
            content: `### Cross-Entropy Cost
Cross-entropy penalizes confident wrong predictions asymptotically toward infinity.`,
            challenge_data: {
              initialCode: `import math\ny = 1\ny_hat = 0.9\nloss = -(y * math.log(y_hat))\nprint("LOSS:", round(loss, 2))\n`,
              expectedOutput: "LOSS: 0.11",
              instructions: "Compute cross-entropy loss for y=1, y_hat=0.9 and output 'LOSS: 0.11'."
            }
          }
        ]
      },
      {
        id: "dl-mod-2",
        title: "Module 2: Hyperparameter Tuning, Regularization & Adam",
        sequence_order: 2,
        description: "Prevent overfitting with L2 weight decay, Dropout, Batch Normalization, and Adam.",
        lessons: [
          {
            id: "dl-2-1",
            title: "2.1 L2 Regularization (Weight Decay)",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Penalize large weights: $J_{reg} = J + \\frac{\\lambda}{2m} \\sum ||W||^2$.",
            content: `### Weight Decay Mechanics
By adding the Frobenius norm of weight matrices to the cost function, large weights shrink toward zero, suppressing high-frequency noise fitting.`,
            challenge_data: {
              initialCode: `weights = [1.5, -2.0, 0.5]\nl2_penalty = sum(w ** 2 for w in weights)\nprint("L2_PENALTY:", round(l2_penalty, 2))\n`,
              expectedOutput: "L2_PENALTY: 6.5",
              instructions: "Sum the squared weights and print 'L2_PENALTY: 6.5'."
            }
          }
        ]
      },
      {
        id: "dl-mod-3",
        title: "Module 3: Convolutional Neural Networks (CNNs)",
        sequence_order: 3,
        description: "Filter kernels, padding, striding, Max-Pooling, and ResNet skip connections.",
        lessons: [
          {
            id: "dl-3-1",
            title: "3.1 Feature Map Output Spatial Dimensions",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Calculate output dimension: $\\lfloor \\frac{n + 2p - f}{s} \\rfloor + 1$.",
            content: `### Convolution Dimension Formula
For input dimension $n$, padding $p$, filter size $f$, and stride $s$:
$$\\text{dim}_{out} = \\left\\lfloor \\frac{n + 2p - f}{s} \\right\\rfloor + 1$$`,
            challenge_data: {
              initialCode: `n = 32\np = 1\nf = 3\ns = 1\nout_dim = ((n + 2*p - f) // s) + 1\nprint("OUT_DIM:", out_dim)\n`,
              expectedOutput: "OUT_DIM: 32",
              instructions: "Compute the output dimension for same-padding convolution and output 'OUT_DIM: 32'."
            }
          }
        ]
      },
      {
        id: "dl-mod-4",
        title: "Module 4: Transformers & Scaled Dot-Product Attention",
        sequence_order: 4,
        description: "Self-attention mechanism: $\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V$.",
        lessons: [
          {
            id: "dl-4-1",
            title: "4.1 Scaled Dot-Product Attention Score",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Scale inner product by $\\frac{1}{\\sqrt{d_k}}$ to prevent vanishing gradients in softmax.",
            content: `### Attention Scaling Factor
When vector dimensionality $d_k$ is large, dot products grow large in magnitude, pushing softmax into regions with near-zero gradients. Scaling by $\\sqrt{d_k}$ stabilizes learning.`,
            challenge_data: {
              initialCode: `import math\nd_k = 64\nscale = 1 / math.sqrt(d_k)\nprint("SCALE_FACTOR:", scale)\n`,
              expectedOutput: "SCALE_FACTOR: 0.125",
              instructions: "Compute the attention scaling factor for d_k=64 and print 'SCALE_FACTOR: 0.125'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 5: GENERATIVE AI & ENTERPRISE RAG SYSTEMS 2026
  // =========================================================================
  {
    id: "generative-ai-rag",
    slug: "generative-ai-rag",
    title: "Generative AI & Enterprise RAG Systems 2026",
    description: "Architect production retrieval-augmented generation: semantic vector indexing, hybrid BM25 search, context re-ranking, and self-correcting RAG loops.",
    category: "AI & ML",
    level: "Advanced",
    weeks: "10 Weeks",
    duration_hours: 45,
    lessons: 30,
    projects: 4,
    certificate: "Enterprise GenAI Practitioner Credential",
    is_premium: true,
    tools: ["Pinecone", "Weaviate", "LlamaIndex", "LangChain", "Cohere Rerank", "Ollama", "Unstructured.io"],
    highlights: [
      "Chunking Protocols: Recursive Character, Markdown Header & Semantic Splitting",
      "Hybrid Retrieval: Dense Vector Embeddings combined with Sparse BM25 Keywords",
      "Cross-Encoder Reranking for Precision Filtering (Cohere, BGE-Reranker)",
      "The RAG Triad: Groundedness, Context Relevance, and Answer Quality Evals",
      "Corrective RAG (CRAG) & Self-RAG Agentic Fallback Pipelines"
    ],
    modules: [
      {
        id: "rag-mod-1",
        title: "Module 1: Document Ingestion, Chunking & Embeddings",
        sequence_order: 1,
        description: "Parse PDFs, code repositories, and markdown tables into semantically coherent chunk vectors.",
        lessons: [
          {
            id: "rag-1-1",
            title: "1.1 Chunk Overlap & Token Budget Preservation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Configure sliding window text chunking with 15% token overlap to preserve cross-boundary semantics.",
            content: `### Sliding Window Chunking
Fixed-size chunking without overlap splits compound sentences and technical code blocks across chunk edges. A 10-20% overlap guarantees boundary continuity.`,
            challenge_data: {
              initialCode: `chunk_size = 500\noverlap_pct = 0.20\noverlap = int(chunk_size * overlap_pct)\nstride = chunk_size - overlap\nprint(f"STRIDE:{stride}_OVERLAP:{overlap}")\n`,
              expectedOutput: "STRIDE:400_OVERLAP:100",
              instructions: "Compute the stride and overlap for 500-token chunking and print 'STRIDE:400_OVERLAP:100'."
            }
          }
        ]
      },
      {
        id: "rag-mod-2",
        title: "Module 2: Hybrid Retrieval (Dense Vector + BM25)",
        sequence_order: 2,
        description: "Combine vector semantic search with sparse keyword matching using Reciprocal Rank Fusion (RRF).",
        lessons: [
          {
            id: "rag-2-1",
            title: "2.1 Reciprocal Rank Fusion (RRF) Ranking",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 90,
            description: "Merge disjoint candidate lists from vector and keyword search: $\\text{RRF}(d) = \\sum \\frac{1}{k + r_i(d)}$.",
            content: `### Reciprocal Rank Fusion
RRF merges ranked lists without requiring score normalization across differing distance metrics.`,
            challenge_data: {
              initialCode: `k = 60\nrank_dense = 1\nrank_sparse = 3\nscore = (1 / (k + rank_dense)) + (1 / (k + rank_sparse))\nprint("RRF_SCORE:", round(score, 4))\n`,
              expectedOutput: "RRF_SCORE: 0.0323",
              instructions: "Compute RRF score for candidate and output 'RRF_SCORE: 0.0323'."
            }
          }
        ]
      },
      {
        id: "rag-mod-3",
        title: "Module 3: Cross-Encoder Reranking & Context Compression",
        sequence_order: 3,
        description: "Filter top 50 retrieved chunks down to top 5 high-signal chunks using deep cross-encoders.",
        lessons: [
          {
            id: "rag-3-1",
            title: "3.1 Context Window Compression Ratio",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 85,
            description: "Calculate token compression efficiency to prevent 'Lost in the Middle' attention degradation.",
            content: `### Defeating Lost-in-the-Middle
Feeding 50 documents into an LLM causes severe reasoning degradation. Rerankers extract the top 3-5 crucial passages.`,
            challenge_data: {
              initialCode: `raw_tokens = 8000\nreranked_tokens = 1200\nsavings = round(((raw_tokens - reranked_tokens) / raw_tokens) * 100, 1)\nprint(f"COMPRESSION:{savings}%")\n`,
              expectedOutput: "COMPRESSION:85.0%",
              instructions: "Calculate token savings percentage and print 'COMPRESSION:85.0%'."
            }
          }
        ]
      },
      {
        id: "rag-mod-4",
        title: "Module 4: RAG Triad Evals & Self-Corrective CRAG",
        sequence_order: 4,
        description: "Automate groundedness checks and trigger web search fallbacks when confidence drops.",
        lessons: [
          {
            id: "rag-4-1",
            title: "4.1 Groundedness Confidence Gating",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Implement confidence routing: PASS to generation, or REQUERY to fallback.",
            content: `### Corrective RAG (CRAG) Gating
If context relevance falls below threshold 0.70, route the query to an external search agent.`,
            challenge_data: {
              initialCode: `def route_rag(score):\n    return "GENERATE" if score >= 0.70 else "WEB_FALLBACK"\n\nprint("ROUTE:", route_rag(0.85))\n`,
              expectedOutput: "ROUTE: GENERATE",
              instructions: "Test the CRAG routing gate and print 'ROUTE: GENERATE'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 6: ANTHROPIC CLAUDE PROMPT ENGINEERING & AGENT SYSTEMS
  // =========================================================================
  {
    id: "anthropic-claude-prompt-engineering",
    slug: "anthropic-claude-prompt-engineering",
    title: "Anthropic Claude: Interactive Prompt Engineering & Agent Systems",
    description: "Official curriculum from Anthropic Claude Academy. Master structural XML tagging, multi-turn reasoning, tool calling, and Model Context Protocol (MCP).",
    category: "AI & ML",
    level: "All Levels",
    weeks: "4 Weeks",
    duration_hours: 24,
    lessons: 16,
    projects: 2,
    certificate: "Anthropic Claude Certified Prompt & Agent Engineer",
    is_premium: false,
    tools: ["Claude 3.5 Sonnet", "Model Context Protocol", "Python", "XML Prompting", "FastAPI"],
    highlights: [
      "Anthropic Official XML structural tag architecture (<context>, <instructions>, <input>)",
      "Chain-of-Thought (CoT) reasoning for complex analytical and mathematical workflows",
      "Model Context Protocol (MCP) server integration for local databases and tools",
      "Building autonomous multi-agent loops with automated evaluation benchmarks"
    ],
    modules: [
      {
        id: "claude-mod-1",
        title: "Module 1: Structural XML Tagging & Prompt Architecture",
        sequence_order: 1,
        description: "Deconstruct how Claude parses distinct semantic tags for context, directives, and ground-truth data.",
        lessons: [
          {
            id: "claude-1-1",
            title: "1.1 XML Tag Separation & Prompt Formatting",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Implement structural XML prompt packaging conforming to Anthropic guidelines.",
            content: `### Anthropic Structural XML Guidelines
Anthropic models excel when instructions, reference context, and user inputs are strictly separated by XML tags.

\`\`\`python
def format_claude_prompt(instruction, context, user_query):
    return (
        f"<instructions>{instruction}</instructions>\\n"
        f"<context>{context}</context>\\n"
        f"<user_query>{user_query}</user_query>"
    )
\`\`\``,
            challenge_data: {
              initialCode: `def build_prompt(instr, ctx):\n    return f"<instructions>{instr}</instructions>\\n<context>{ctx}</context>"\n\nprint(build_prompt("Extract key entities", "Anthropic Claude 3.5 Sonnet launched in 2024."))\n`,
              expectedOutput: "<instructions>Extract key entities</instructions>\n<context>Anthropic Claude 3.5 Sonnet launched in 2024.</context>",
              instructions: "Build the structural XML prompt for Claude and print the formatted prompt."
            }
          }
        ]
      },
      {
        id: "claude-mod-2",
        title: "Module 2: Model Context Protocol (MCP) Tool Schemas",
        sequence_order: 2,
        description: "Connect Claude to external databases, filesystems, and execution sandboxes.",
        lessons: [
          {
            id: "claude-2-1",
            title: "2.1 Defining Type-Safe MCP Tool Schemas",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Define JSON schema definitions for Claude tool invocation.",
            content: `### Model Context Protocol (MCP)
MCP standardizes how LLMs interact with local and remote resources. Tools declare input schemas using JSON Schema specification.`,
            challenge_data: {
              initialCode: `import json\n\ndef make_tool_schema(name, prop_name):\n    return {"name": name, "parameters": {"type": "object", "properties": {prop_name: {"type": "string"}}, "required": [prop_name]}}\n\ntool = make_tool_schema("get_weather", "location")\nprint("TOOL:", tool["name"], "PARAM:", list(tool["parameters"]["properties"].keys())[0])\n`,
              expectedOutput: "TOOL: get_weather PARAM: location",
              instructions: "Generate the MCP tool specification and print the tool name and parameter key."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 7: NVIDIA DLI FUNDAMENTALS OF DEEP LEARNING & ACCELERATION
  // =========================================================================
  {
    id: "nvidia-dli-deep-learning",
    slug: "nvidia-dli-deep-learning",
    title: "NVIDIA DLI: Fundamentals of Deep Learning & GPU Acceleration",
    description: "Official curriculum from NVIDIA Deep Learning Institute. Master GPU microarchitecture, CUDA Tensor Cores, TensorRT inference compilation, and PyTorch 2.0 acceleration.",
    category: "AI & ML",
    level: "Intermediate",
    weeks: "6 Weeks",
    duration_hours: 36,
    lessons: 20,
    projects: 3,
    certificate: "NVIDIA Deep Learning Institute (DLI) Certificate",
    is_premium: false,
    tools: ["CUDA", "TensorRT", "PyTorch", "vLLM", "FlashAttention", "Triton"],
    highlights: [
      "GPU Microarchitecture: Streaming Multiprocessors, Warps & Tensor Cores",
      "Accelerating PyTorch with CUDA Graph execution and mixed precision (FP16/BF16/FP8)",
      "High-throughput model serving with NVIDIA TensorRT-LLM and Triton Inference Server",
      "FlashAttention-3 kernel mechanics and memory-bandwidth bound optimization"
    ],
    modules: [
      {
        id: "nv-mod-1",
        title: "Module 1: CUDA Architecture & Memory Hierarchy",
        sequence_order: 1,
        description: "Analyze the GPU execution model, thread blocks, grid dimensions, and high-bandwidth memory (HBM3).",
        lessons: [
          {
            id: "nv-1-1",
            title: "1.1 CUDA Global Thread Index Calculation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Calculate unique global thread identifiers across 1D CUDA grids and blocks.",
            content: `### CUDA 1D Thread Indexing
In CUDA, threads execute in blocks. To map each thread to an element in an array, compute the global index:

\`\`\`c
int idx = blockIdx.x * blockDim.x + threadIdx.x;
\`\`\``,
            challenge_data: {
              initialCode: `def get_global_cuda_idx(block_idx, block_dim, thread_idx):\n    return block_idx * block_dim + thread_idx\n\nidx = get_global_cuda_idx(block_idx=3, block_dim=256, thread_idx=42)\nprint("CUDA_GLOBAL_IDX:", idx)\n`,
              expectedOutput: "CUDA_GLOBAL_IDX: 810",
              instructions: "Compute the global CUDA thread index for block 3, blockDim 256, thread 42."
            }
          }
        ]
      },
      {
        id: "nv-mod-2",
        title: "Module 2: TensorRT Quantization & FP8 Scaling",
        sequence_order: 2,
        description: "Compile and quantize neural network layers for maximum FLOPS on modern GPU Tensor Cores.",
        lessons: [
          {
            id: "nv-2-1",
            title: "2.1 Dynamic Tensor Scaling for Quantization",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Compute dynamic scale factors for symmetric float8 quantization.",
            content: `### Symmetric Tensor Scaling
To map high-precision float values to FP8 range [-448, 448], compute the maximum absolute value and calculate the scaling factor:
\`scale = max_fp8_value / max_abs(tensor)\``,
            challenge_data: {
              initialCode: `def compute_scale_factor(max_val, fp8_limit=448.0):\n    return round(fp8_limit / max_val, 2)\n\nprint("FP8_SCALE:", compute_scale_factor(112.0))\n`,
              expectedOutput: "FP8_SCALE: 4.0",
              instructions: "Calculate the dynamic scale factor for a tensor with max value 112.0 and print 'FP8_SCALE: 4.0'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 8: DEEPSEEK-R1 REASONING MODELS & GRPO
  // =========================================================================
  {
    id: "deepseek-r1-reasoning-models",
    slug: "deepseek-r1-reasoning-models",
    title: "DeepSeek-R1: Open-Source Reasoning Models & GRPO Reinforcement Learning",
    description: "Deconstruct the DeepSeek-R1 open-weights architecture. Master Multi-Head Latent Attention (MLA), DeepSeekMoE, Group Relative Policy Optimization (GRPO), and cold-start self-reflection.",
    category: "AI & ML",
    level: "Advanced",
    weeks: "6 Weeks",
    duration_hours: 40,
    lessons: 22,
    projects: 3,
    certificate: "DeepSeek Open-Source AI Research & Distillation Certificate",
    is_premium: false,
    tools: ["DeepSeek-R1", "GRPO", "PyTorch", "vLLM", "Hugging Face", "CoT"],
    highlights: [
      "Multi-Head Latent Attention (MLA) low-rank KV compression for extreme context scaling",
      "DeepSeekMoE: Fine-grained expert segmentation and shared isolated experts",
      "Group Relative Policy Optimization (GRPO): Eliminating the critic network in RL",
      "Distilling R1 reasoning capabilities into small models (1.5B, 7B, 14B, 32B)"
    ],
    modules: [
      {
        id: "ds-mod-1",
        title: "Module 1: Multi-Head Latent Attention (MLA) Architecture",
        sequence_order: 1,
        description: "Study how low-rank joint key-value compression dramatically slashes KV cache memory overhead during inference.",
        lessons: [
          {
            id: "ds-1-1",
            title: "1.1 MLA KV Cache Compression Ratio",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 75,
            description: "Compute memory savings of Multi-Head Latent Attention over traditional Multi-Head Attention (MHA).",
            content: `### MLA Compression Ratio
Traditional MHA requires storing $2 \\times n_{heads} \\times d_{head}$ parameters per token. MLA compresses keys and values into a single latent vector of dimension $d_c$:

\`compression = (2 * n_heads * d_head) / d_c\``,
            challenge_data: {
              initialCode: `def calc_mla_ratio(n_heads, d_head, d_latent):\n    mha_dim = 2 * n_heads * d_head\n    return round(mha_dim / d_latent, 1)\n\nprint("MLA_RATIO:", calc_mla_ratio(128, 128, 512))\n`,
              expectedOutput: "MLA_RATIO: 64.0",
              instructions: "Compute the MLA compression ratio for 128 heads of dim 128 versus latent dim 512 and print 'MLA_RATIO: 64.0'."
            }
          }
        ]
      },
      {
        id: "ds-mod-2",
        title: "Module 2: Group Relative Policy Optimization (GRPO)",
        sequence_order: 2,
        description: "Implement the reinforcement learning objective used by DeepSeek-R1 without a value critic network.",
        lessons: [
          {
            id: "ds-2-1",
            title: "2.1 Group Relative Advantage Calculation",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 100,
            description: "Normalize rewards across sampled outputs to compute relative advantage estimates.",
            content: `### GRPO Advantage Normalization
For a group of $G$ sampled outputs for prompt $q$ with rewards $\{r_1, r_2, \\dots, r_G\}$:

$$A_i = \\frac{r_i - \\text{mean}(r)}{\\text{std}(r)}$$`,
            challenge_data: {
              initialCode: `import math\n\ndef grpo_advantages(rewards):\n    mean_r = sum(rewards) / len(rewards)\n    variance = sum((r - mean_r) ** 2 for r in rewards) / len(rewards)\n    std_r = math.sqrt(variance) if variance > 0 else 1.0\n    return [round((r - mean_r) / std_r, 2) for r in rewards]\n\nadvs = grpo_advantages([1.0, 0.0, 1.0, 0.0])\nprint("GRPO_ADV:", advs[0])\n`,
              expectedOutput: "GRPO_ADV: 1.0",
              instructions: "Compute the normalized GRPO relative advantage for the first reward and print 'GRPO_ADV: 1.0'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 9: AWS SKILL BUILDER GENERATIVE AI & BEDROCK
  // =========================================================================
  {
    id: "aws-skillbuilder-generative-ai",
    slug: "aws-skillbuilder-generative-ai",
    title: "AWS Skill Builder: Generative AI on AWS & Bedrock Architecture",
    description: "Official curriculum aligned with AWS Skill Builder. Build serverless generative AI architectures with Amazon Bedrock, Titan, SageMaker, and OpenSearch Serverless.",
    category: "Cloud & Infra",
    level: "Intermediate",
    weeks: "6 Weeks",
    duration_hours: 30,
    lessons: 18,
    projects: 3,
    certificate: "AWS Skill Builder Official Generative AI Accreditation",
    is_premium: false,
    tools: ["Amazon Bedrock", "AWS Lambda", "OpenSearch Serverless", "Python", "IAM", "Titan"],
    highlights: [
      "Unified API invocation for Claude, Llama 3, and Amazon Titan via Amazon Bedrock",
      "Enterprise Bedrock Guardrails: Content filtering, PII redaction, and hallucination blocks",
      "Serverless RAG pipelines with Amazon Bedrock Knowledge Bases and OpenSearch",
      "Model deployment and custom fine-tuning with AWS SageMaker JumpStart"
    ],
    modules: [
      {
        id: "aws-b-mod-1",
        title: "Module 1: Amazon Bedrock Converse API & Payloads",
        sequence_order: 1,
        description: "Formulate unified multi-turn conversation payloads across foundation models.",
        lessons: [
          {
            id: "aws-b-1-1",
            title: "1.1 Formulating Amazon Bedrock Converse Payloads",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Format message dictionaries for the Amazon Bedrock Converse API.",
            content: `### Bedrock Converse API Format
Amazon Bedrock provides a unified message schema across Anthropic, Meta, and Amazon Titan models:

\`\`\`python
message = {
    "role": "user",
    "content": [{"text": "Summarize AWS CloudWatch architecture."}]
}
\`\`\``,
            challenge_data: {
              initialCode: `def make_bedrock_msg(role, text):\n    return {"role": role, "content": [{"text": text}]}\n\nmsg = make_bedrock_msg("user", "Hello AWS Bedrock")\nprint("ROLE:", msg["role"], "TEXT:", msg["content"][0]["text"])\n`,
              expectedOutput: "ROLE: user TEXT: Hello AWS Bedrock",
              instructions: "Format the Bedrock Converse message and print 'ROLE: user TEXT: Hello AWS Bedrock'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 10: GOOGLE CLOUD SKILLS BOOST GENERATIVE AI & VERTEX AI
  // =========================================================================
  {
    id: "google-cloud-generative-ai",
    slug: "google-cloud-generative-ai",
    title: "Google Cloud Skills Boost: Generative AI for Developers & Vertex AI",
    description: "Official curriculum from Google Cloud. Master Gemini 1.5 Pro multimodal processing, Vertex AI Studio, Search Grounding, and low-latency Vector Search.",
    category: "AI & ML",
    level: "All Levels",
    weeks: "5 Weeks",
    duration_hours: 28,
    lessons: 18,
    projects: 2,
    certificate: "Google Cloud Skills Boost Official Generative AI Badge",
    is_premium: false,
    tools: ["Google Vertex AI", "Gemini 1.5 Pro", "Python", "Google Cloud Storage", "Vector Search"],
    highlights: [
      "Gemini 1.5 Pro multimodal architecture with 2-million-token context windows",
      "Vertex AI Studio: System instructions, safety settings, and parameter tuning",
      "Grounding with Google Search for real-time verification and zero hallucinations",
      "High-scale vector indexes with Google Cloud Vertex AI Vector Search"
    ],
    modules: [
      {
        id: "gcp-ai-mod-1",
        title: "Module 1: Gemini Multimodal Schema & System Instructions",
        sequence_order: 1,
        description: "Structure multimodal text, image, and video content parts using Google GenAI SDK.",
        lessons: [
          {
            id: "gcp-ai-1-1",
            title: "1.1 Packaging Gemini Content Parts",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Format multimodal content arrays for Gemini 1.5 Pro API calls.",
            content: `### Google GenAI Multimodal Structure
Gemini accepts a list of content parts containing text strings or media byte objects:

\`\`\`python
contents = [
    {"parts": [{"text": "Analyze the attached log entry."}]}
]
\`\`\``,
            challenge_data: {
              initialCode: `def make_gemini_part(text):\n    return {"parts": [{"text": text}]}\n\npart = make_gemini_part("Google Cloud Vertex AI 2026")\nprint("PART:", part["parts"][0]["text"])\n`,
              expectedOutput: "PART: Google Cloud Vertex AI 2026",
              instructions: "Format the Gemini multimodal content part and print 'PART: Google Cloud Vertex AI 2026'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 11: META AI PYTORCH FOUNDATIONS & LLAMA 3
  // =========================================================================
  {
    id: "meta-pytorch-llama3",
    slug: "meta-pytorch-llama3",
    title: "Meta AI: PyTorch Foundations & Llama 3 Open-Source Ecosystem",
    description: "Official curriculum from Meta Open Source AI. Master PyTorch 2.0 tensor operations, autograd, torch.compile, and fine-tune Meta Llama 3 models with LoRA/QLoRA.",
    category: "AI & ML",
    level: "Intermediate",
    weeks: "8 Weeks",
    duration_hours: 38,
    lessons: 24,
    projects: 3,
    certificate: "Meta Certified Open Source AI & PyTorch Engineer",
    is_premium: false,
    tools: ["PyTorch 2.0", "Meta Llama 3", "LoRA", "torch.compile", "vLLM", "PEFT"],
    highlights: [
      "PyTorch 2.x tensor mechanics, autograd computational graphs, and GPU profiling",
      "Accelerating training and inference with PyTorch 2.0 torch.compile and Inductor",
      "Parameter-Efficient Fine-Tuning (PEFT / LoRA / QLoRA) on Meta Llama 3 8B/70B",
      "Distributed scaling with Fully Sharded Data Parallel (FSDP) on multi-GPU clusters"
    ],
    modules: [
      {
        id: "meta-mod-1",
        title: "Module 1: PyTorch Autograd & Computational Graph",
        sequence_order: 1,
        description: "Examine forward tensors, dynamic DAGs, and gradient accumulation through backpropagation.",
        lessons: [
          {
            id: "meta-1-1",
            title: "1.1 Forward Pass & Gradient Computation in Python",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Simulate a forward pass and analytical derivative calculation for a linear neuron.",
            content: `### Analytical Gradient Calculation
For a linear prediction $\\hat{y} = w \\cdot x + b$ and MSE loss $L = (\\hat{y} - y)^2$:

$$\\frac{\\partial L}{\\partial w} = 2 \\cdot (\\hat{y} - y) \\cdot x$$`,
            challenge_data: {
              initialCode: `def compute_loss_and_grad(x, w, b, y_true):\n    y_pred = w * x + b\n    loss = (y_pred - y_true) ** 2\n    grad_w = 2 * (y_pred - y_true) * x\n    return loss, grad_w\n\nloss, grad = compute_loss_and_grad(x=2.0, w=3.0, b=1.0, y_true=5.0)\nprint(f"LOSS: {loss:.1f}, GRAD_W: {grad:.1f}")\n`,
              expectedOutput: "LOSS: 4.0, GRAD_W: 8.0",
              instructions: "Compute the linear loss and weight gradient and print 'LOSS: 4.0, GRAD_W: 8.0'."
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // COURSE 12: IBM WATSONX GENERATIVE AI & FOUNDATION MODELS
  // =========================================================================
  {
    id: "ibm-watsonx-generative-ai",
    slug: "ibm-watsonx-generative-ai",
    title: "IBM watsonx: Generative AI & Enterprise Foundation Models",
    description: "Official curriculum from IBM Skills Network & Cognitive Class. Master enterprise foundation models, watsonx.ai, open Granite models, and AI trust governance.",
    category: "AI & ML",
    level: "All Levels",
    weeks: "4 Weeks",
    duration_hours: 22,
    lessons: 16,
    projects: 2,
    certificate: "IBM SkillsBuild & Cognitive Class Official Credential",
    is_premium: false,
    tools: ["IBM watsonx.ai", "watsonx.governance", "Granite Models", "Python", "Jupyter"],
    highlights: [
      "Enterprise foundation model lifecycles: pre-training, tuning, and governance",
      "Deploying open-source IBM Granite models for enterprise language and code automation",
      "watsonx.governance: Automated drift detection, bias mitigation, and compliance auditing",
      "Regulatory compliance architecture aligned with the EU AI Act"
    ],
    modules: [
      {
        id: "ibm-w-mod-1",
        title: "Module 1: Enterprise AI Governance & Trust Metrics",
        sequence_order: 1,
        description: "Quantify model fairness, factual ground truth, and toxic output thresholds.",
        lessons: [
          {
            id: "ibm-w-1-1",
            title: "1.1 Factuality Drift Scoring Algorithm",
            sequence_order: 1,
            content_type: "challenge",
            xp_reward: 50,
            description: "Calculate percentage drift between baseline evaluation scores and live production telemetry.",
            content: `### Monitoring Model Drift
In enterprise AI deployments, drift measures performance degradation over time:

\`drift_percentage = ((baseline - current) / baseline) * 100\``,
            challenge_data: {
              initialCode: `def calc_drift(baseline, current):\n    drift = ((baseline - current) / baseline) * 100\n    return round(drift, 1)\n\nprint("DRIFT_PCT:", calc_drift(0.95, 0.88))\n`,
              expectedOutput: "DRIFT_PCT: 7.4",
              instructions: "Compute the percentage performance drift and print 'DRIFT_PCT: 7.4'."
            }
          }
        ]
      }
    ]
  }
]

