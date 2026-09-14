-- ==============================================================================
-- ASCI LMS: COMPLETE 2026 CURRICULUM SEED SCRIPT (17 COURSES, 96 MODULES, 107 LESSONS)
-- Run this in your Supabase SQL Editor to populate all courses and full curricula
-- ==============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- Course: Agentic AI Full Course 2026 (agentic-ai)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'agentic-ai',
  'Agentic AI Full Course 2026',
  'agentic-ai',
  'Master autonomous goal-driven agents, PRAL loop architecture, LangGraph, Pydantic AI, MCP (Model Context Protocol), and multi-agent enterprise swarms.',
  'AI & ML',
  'Advanced',
  '10 Weeks',
  42,
  32,
  4,
  'Microsoft & Simplilearn Joint Certificate',
  FALSE,
  ARRAY['Python 3.12', 'LangGraph', 'Pydantic AI', 'MCP', 'CrewAI', 'LangSmith', 'Ollama']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'agentic-mod-1',
  (SELECT id FROM courses WHERE slug = 'agentic-ai' LIMIT 1),
  'Module 1: Foundations of Agentic AI & The PRAL Loop',
  1,
  'Deconstruct the shift from passive prompt engineering to autonomous, stateful agency.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'agentic-1-1',
  'agentic-mod-1',
  '1.1 The Shift from Prompting to Agency',
  1,
  'challenge',
  50,
  'Understand single-turn LLM completions versus continuous, goal-directed reasoning loops.',
  '### Beyond Static Prompting
In traditional LLM workflows, an application sends a single prompt and receives a single completion. If the output contains errors or lacks data, the process fails.

**Agentic AI** introduces autonomous loops where the system operates as an **agent**:
1. **Perceive:** Ingest signals from environment, API responses, or user objectives.
2. **Reason:** Formulate multi-step strategies and decide which tools to summon.
3. **Act:** Invoke functions, query databases, or execute code.
4. **Learn (Evaluate):** Inspect results, catch exceptions, and self-correct until the goal state is reached.

```python
class AgentLoop:
    def __init__(self, objective: str):
        self.objective = objective
        self.state = "INITIALIZED"

    def transition(self, next_state: str):
        self.state = next_state
        return f"STATE_TRANSITION::{self.state}"

agent = AgentLoop("DATA_AUDIT")
print(agent.transition("PRAL_ACTIVE"))
```',
  '{"initialCode":"state = \"PENDING\"\n# Transition state to PRAL_ACTIVE\nstate = \"PRAL_ACTIVE\"\nprint(state)\n","expectedOutput":"PRAL_ACTIVE","instructions":"Set the variable state to ''PRAL_ACTIVE'' and print it."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'agentic-1-2',
  'agentic-mod-1',
  '1.2 The Three-Layer Agent Architecture',
  2,
  'challenge',
  75,
  'Isolate Perception, Cognition, and Action layers for modular agent engineering.',
  '### Decoupling the Agent Stack
Every production agent relies on three decoupled subsystems:
* **Perception Layer:** Context summarization, multimodal vision/audio transcription, and state representation.
* **Cognition Layer:** Planning heuristics, memory lookup (vector + episodic key-value store), and decision gating.
* **Action Layer:** Structured JSON tool schema calling, deterministic API execution, and safety validations.

```python
class Perception:
    def parse_input(self, text: str) -> dict:
        return {"intent": "SEARCH", "query": text}

p = Perception()
print(p.parse_input("quantum computing")["intent"])
```',
  '{"initialCode":"def parse_intent(query: str) -> str:\n    # Return ''SEARCH'' if ''find'' in query, else ''GENERAL''\n    return \"SEARCH\" if \"find\" in query.lower() else \"GENERAL\"\n\nprint(parse_intent(\"Find recent papers on agent swarms\"))\n","expectedOutput":"SEARCH","instructions":"Implement parse_intent to inspect queries and return ''SEARCH''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'agentic-mod-2',
  (SELECT id FROM courses WHERE slug = 'agentic-ai' LIMIT 1),
  'Module 2: Agent Design Patterns — ReAct, Planner & Reflection',
  2,
  'Master industry design patterns that prevent infinite loops and optimize token budgets.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'agentic-2-1',
  'agentic-mod-2',
  '2.1 The ReAct Pattern (Reasoning + Acting)',
  1,
  'challenge',
  80,
  'Interleave verbal reasoning traces with domain-specific tool executions.',
  '### The ReAct Pattern
In ReAct (Yao et al.), an LLM generates alternating traces of:
1. **Thought:** "I need to look up current currency conversion rates."
2. **Action:** `query_rates(pair=''USD/EUR'')`
3. **Observation:** `0.92`
4. **Final Thought:** "Now I can compute the customer price."

This transparent trajectory dramatically reduces hallucination and provides auditability.',
  '{"initialCode":"thought = \"Calculate price in EUR\"\nfx_rate = 0.92\nusd_price = 100\n# Compute eur_price\neur_price = int(usd_price * fx_rate)\nprint(f\"EUR:{eur_price}\")\n","expectedOutput":"EUR:92","instructions":"Calculate the converted price and output ''EUR:92''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'agentic-mod-3',
  (SELECT id FROM courses WHERE slug = 'agentic-ai' LIMIT 1),
  'Module 3: LangGraph, Pydantic AI & MCP Protocols',
  3,
  'Construct cyclic state graphs and standardize agent-tool interfaces via MCP.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'agentic-3-1',
  'agentic-mod-3',
  '3.1 Stateful Cyclical Workflows with LangGraph',
  1,
  'challenge',
  90,
  'Model branching agent states using Directed Acyclic Graphs (DAGs) with cyclical recursion.',
  '### Why DAGs Fall Short
Linear chains cannot handle human-in-the-loop revisions, recursive self-correction, or tool retries. **LangGraph** models the agent as a state machine where nodes are functions and edges represent conditional routing logic.

```python
state = {"messages": [], "retry_count": 0}

def should_continue(state: dict) -> str:
    if state["retry_count"] >= 3:
        return "END"
    return "CONTINUE"
```',
  '{"initialCode":"state = {\"step\": \"review\", \"approved\": True}\n\ndef route(s):\n    return \"EXECUTE\" if s.get(\"approved\") else \"REVISE\"\n\nprint(route(state))\n","expectedOutput":"EXECUTE","instructions":"Route the state machine based on approval status and print ''EXECUTE''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'agentic-3-2',
  'agentic-mod-3',
  '3.2 Model Context Protocol (MCP) Standards',
  2,
  'challenge',
  95,
  'Expose local files, APIs, and databases to agents using Anthropic''s open MCP standard.',
  '### Model Context Protocol (MCP)
MCP replaces fragmented proprietary plugins with a universal JSON-RPC 2.0 protocol. MCP defines:
1. **Resources:** Passive data feeds (files, database tables).
2. **Tools:** Executable actions with strict JSON Schema inputs.
3. **Prompts:** Pre-configured workflows exposed by the server.

```python
tool_schema = {
    "name": "fetch_weather",
    "description": "Get current temperature",
    "parameters": {"city": "str"}
}
```',
  '{"initialCode":"mcp_packet = {\n    \"jsonrpc\": \"2.0\",\n    \"method\": \"tools/call\",\n    \"params\": {\"name\": \"get_stock_price\"}\n}\nprint(\"METHOD:\", mcp_packet[\"method\"])\n","expectedOutput":"METHOD: tools/call","instructions":"Verify the MCP protocol method call and output ''METHOD: tools/call''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'agentic-mod-4',
  (SELECT id FROM courses WHERE slug = 'agentic-ai' LIMIT 1),
  'Module 4: Multi-Agent Swarms & Hierarchical Orchestration',
  4,
  'Deploy swarms of specialized subagents coordinated by an architect supervisor.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'agentic-4-1',
  'agentic-mod-4',
  '4.1 Supervisor-Worker Swarm Architecture',
  1,
  'challenge',
  90,
  'Route user requests across specialized coder, researcher, and auditor subagents.',
  '### Swarm Routing
A supervisor model parses the goal, breaks it into subtasks, and assigns each to an isolated subagent with its own specialized prompt and tools. Results are consolidated before returning to the user.',
  '{"initialCode":"workers = [\"researcher\", \"coder\", \"auditor\"]\n# Assign task to coder\ntarget = workers[1]\nprint(f\"ASSIGNED:{target.upper()}\")\n","expectedOutput":"ASSIGNED:CODER","instructions":"Assign the coding subtask and print ''ASSIGNED:CODER''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'agentic-mod-5',
  (SELECT id FROM courses WHERE slug = 'agentic-ai' LIMIT 1),
  'Module 5: Production Evals, Guardrails & Capstone',
  5,
  'Benchmark autonomous reliability using LangSmith evaluations and NeMo Guardrails.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'agentic-5-1',
  'agentic-mod-5',
  '5.1 Automated Trajectory Evaluation',
  1,
  'challenge',
  100,
  'Grade agent task success, tool-call precision, and hallucination rates.',
  '### Evaluating Autonomous Agents
Unlike classification models evaluated on accuracy, agents are evaluated on **trajectory completeness**:
- Did the agent call the correct sequence of tools?
- Did it respect token and loop limits?
- Did it produce verifiable proof-of-work?',
  '{"initialCode":"def eval_run(steps, max_steps=5):\n    return \"PASS\" if steps <= max_steps else \"FAIL_TIMEOUT\"\n\nprint(eval_run(3))\n","expectedOutput":"PASS","instructions":"Evaluate the agent run trajectory and print ''PASS''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: AI for Everyone: Master the Basics (ai-for-everyone)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'ai-for-everyone',
  'AI for Everyone: Master the Basics',
  'ai-for-everyone',
  'Understand the true capabilities, limitations, and business economics of modern AI, machine learning, and generative systems. Created with IBM curriculum standards.',
  'AI & ML',
  'Beginner',
  '4 Weeks',
  8,
  16,
  1,
  'IBM Professional Certificate',
  FALSE,
  ARRAY['AI Economics', 'Business Strategy', 'Prompt Engineering', 'Risk Management']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'ai-ev-mod-1',
  (SELECT id FROM courses WHERE slug = 'ai-for-everyone' LIMIT 1),
  'Module 1: AI, Machine Learning & Deep Learning Taxonomies',
  1,
  'Establish precise mental models for artificial intelligence, neural networks, and LLMs.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'ai-ev-1-1',
  'ai-ev-mod-1',
  '1.1 Demystifying the AI Taxonomies',
  1,
  'challenge',
  40,
  'Differentiate Artificial Intelligence, Machine Learning, and Deep Learning.',
  '### The Hierarchy of Modern AI
* **Artificial Intelligence (AI):** The overarching field of building computing systems capable of performing tasks normally requiring human intelligence.
* **Machine Learning (ML):** A mathematical subset where models learn representations from training data instead of being explicitly programmed with rule trees.
* **Deep Learning (DL):** A sub-field using multi-layer artificial neural networks inspired by biological neuroscience.

```python
taxonomy = ["AI", "Machine Learning", "Deep Learning"]
print(" -> ".join(taxonomy))
```',
  '{"initialCode":"print(\"AI -> ML -> DL\")\n","expectedOutput":"AI -> ML -> DL","instructions":"Print the progression string ''AI -> ML -> DL'' to confirm the taxonomy hierarchy."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'ai-ev-1-2',
  'ai-ev-mod-1',
  '1.2 Supervised vs Unsupervised vs Reinforcement Learning',
  2,
  'text',
  50,
  'Understand the three foundational learning paradigms.',
  '### The Three Learning Paradigms
1. **Supervised Learning:** Learning from labeled $(x, y)$ pairs (e.g. predicting house prices or classifying spam).
2. **Unsupervised Learning:** Discovering hidden patterns or clusters in unlabeled data $x$ (e.g. customer segmentation).
3. **Reinforcement Learning:** Learning via trial-and-error rewards and penalties to achieve an objective in an environment.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'ai-ev-mod-2',
  (SELECT id FROM courses WHERE slug = 'ai-for-everyone' LIMIT 1),
  'Module 2: Real-World Business Applications & ROI Economics',
  2,
  'Evaluate project feasibility using data availability, error tolerance, and ROI metrics.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'ai-ev-2-1',
  'ai-ev-mod-2',
  '2.1 What Makes a Strong AI Business Problem',
  1,
  'challenge',
  60,
  'Calculate expected ROI for an automated document triage pipeline.',
  '### Business Feasibility Formula
Not every problem needs AI. High-potential business problems possess:
1. High transaction volume where marginal cost reductions compound.
2. Moderate tolerance for probabilistic outputs with human validation fallbacks.
3. Access to proprietary internal data that competitors lack.',
  '{"initialCode":"manual_hours = 1000\nhourly_rate = 50\nautomation_pct = 0.70\n# Calculate annual savings\nsavings = int(manual_hours * hourly_rate * automation_pct)\nprint(\"SAVINGS:$\" + str(savings))\n","expectedOutput":"SAVINGS:$35000","instructions":"Calculate the net annual savings and output ''SAVINGS:$35000''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'ai-ev-mod-3',
  (SELECT id FROM courses WHERE slug = 'ai-for-everyone' LIMIT 1),
  'Module 3: What AI Can and Cannot Do (Technical Limits)',
  3,
  'Navigate hallucinations, context window bottlenecks, and reasoning fragility.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'ai-ev-3-1',
  'ai-ev-mod-3',
  '3.1 Understanding Probabilistic vs Deterministic Systems',
  1,
  'text',
  60,
  'Why LLMs struggle with multi-digit arithmetic and exact logical proofs without external tools.',
  'Large language models predict token probabilities rather than performing formal symbolic computation. For arithmetic, database queries, and cryptographic tasks, pairing models with external code sandboxes or APIs is essential.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'ai-ev-mod-4',
  (SELECT id FROM courses WHERE slug = 'ai-for-everyone' LIMIT 1),
  'Module 4: Ethics, Bias, Copyright & Governance',
  4,
  'Mitigate societal bias, ensure regulatory compliance, and deploy fair AI systems.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'ai-ev-4-1',
  'ai-ev-mod-4',
  '4.1 Responsible AI Rubrics & Auditing',
  1,
  'challenge',
  70,
  'Implement automated fairness checks on model outcome distributions.',
  '### Fairness and Demographic Parity
An AI recruitment or credit-scoring system must adhere to anti-bias regulations, ensuring acceptance rates across protected demographic classes remain statistically equitable.',
  '{"initialCode":"rate_group_a = 0.82\nrate_group_b = 0.80\ndisparity = round(abs(rate_group_a - rate_group_b), 2)\nprint(f\"DISPARITY:{disparity}\")\n","expectedOutput":"DISPARITY:0.02","instructions":"Calculate demographic disparity and print ''DISPARITY:0.02''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Artificial Intelligence (Columbia University) (columbia-ai)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'columbia-ai',
  'Artificial Intelligence (Columbia University)',
  'columbia-ai',
  'Rigorous academic study of intelligent agents, A* graph search, constraint satisfaction, adversarial minimax game trees, and neural NLP.',
  'AI & ML',
  'Advanced',
  '12 Weeks',
  108,
  48,
  6,
  'Columbia University Certificate',
  TRUE,
  ARRAY['Python', 'NumPy', 'Graph Theory', 'Optimization', 'Minimax', 'A* Search']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'col-ai-mod-1',
  (SELECT id FROM courses WHERE slug = 'columbia-ai' LIMIT 1),
  'Module 1: Informed State Space Search & A*',
  1,
  'Explore graph search algorithms and formulate admissible heuristics for shortest-path optimization.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'col-ai-1-1',
  'col-ai-mod-1',
  '1.1 The A* Search Algorithm & Admissibility',
  1,
  'challenge',
  100,
  'Calculate f(n) = g(n) + h(n) and prove heuristic admissibility.',
  '### The A* Evaluation Function
A* explores nodes by evaluating:
$$f(n) = g(n) + h(n)$$
* **$g(n)$:** The exact cost accumulated from the start node to current node $n$.
* **$h(n)$:** The estimated heuristic cost from node $n$ to the goal.

An admissible heuristic **never overestimates** the true cost to reach the goal ($h(n) \le h^*(n)$), guaranteeing A* finds the optimal shortest path.',
  '{"initialCode":"def a_star_f(g, h):\n    return g + h\n\nprint(\"F_COST:\", a_star_f(15, 10))\n","expectedOutput":"F_COST: 25","instructions":"Compute the A* evaluation cost and output ''F_COST: 25''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'col-ai-1-2',
  'col-ai-mod-1',
  '1.2 Manhattan Distance Heuristic in Grid Worlds',
  2,
  'challenge',
  95,
  'Compute the L1 Manhattan distance heuristic between coordinates.',
  '### Manhattan Distance
In grid environments where diagonal movements are disallowed, the Manhattan distance between $(x_1, y_1)$ and $(x_2, y_2)$ is:
$$h(n) = |x_1 - x_2| + |y_1 - y_2|$$',
  '{"initialCode":"def manhattan(p1, p2):\n    return abs(p1[0] - p2[0]) + abs(p1[1] - p2[1])\n\nprint(\"H_COST:\", manhattan((0, 0), (4, 3)))\n","expectedOutput":"H_COST: 7","instructions":"Calculate the Manhattan heuristic from (0,0) to (4,3) and output ''H_COST: 7''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'col-ai-mod-2',
  (SELECT id FROM courses WHERE slug = 'columbia-ai' LIMIT 1),
  'Module 2: Adversarial Search & Minimax',
  2,
  'Implement optimal decision strategies in two-player zero-sum games with Alpha-Beta pruning.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'col-ai-2-1',
  'col-ai-mod-2',
  '2.1 Minimax with Alpha-Beta Pruning',
  1,
  'challenge',
  110,
  'Prune branches that cannot possibly influence the final minimax decision.',
  '### Alpha-Beta Search Bounds
* **$\alpha$:** The best value that the MAX player can guarantee so far.
* **$\beta$:** The best value that the MIN player can guarantee so far.

If at any point $\alpha \ge \beta$, the remaining children of that node can be pruned without affecting the optimal move.',
  '{"initialCode":"alpha = 5\nbeta = 3\nif alpha >= beta:\n    print(\"PRUNE\")\nelse:\n    print(\"CONTINUE\")\n","expectedOutput":"PRUNE","instructions":"Evaluate the alpha-beta condition and print ''PRUNE''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'col-ai-mod-3',
  (SELECT id FROM courses WHERE slug = 'columbia-ai' LIMIT 1),
  'Module 3: Constraint Satisfaction Problems (CSP)',
  3,
  'Solve constraint graphs using Backtracking, Minimum Remaining Values (MRV), and AC-3.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'col-ai-3-1',
  'col-ai-mod-3',
  '3.1 Arc Consistency (AC-3 Algorithm)',
  1,
  'text',
  100,
  'Propagate constraints to reduce variable domain sizes prior to recursive search.',
  '### AC-3 Constraint Propagation
An arc $(X_i, X_j)$ is consistent if for every value $x$ in the domain $D_i$, there exists some value $y$ in $D_j$ that satisfies the binary constraint between $X_i$ and $X_j$. AC-3 maintains an arc queue, pruning illegal domain values in $O(c d^3)$ polynomial time.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'col-ai-mod-4',
  (SELECT id FROM courses WHERE slug = 'columbia-ai' LIMIT 1),
  'Module 4: Markov Decision Processes & Reinforcement Learning',
  4,
  'Model decision-making under uncertainty using Bellman optimality and Value Iteration.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'col-ai-4-1',
  'col-ai-mod-4',
  '4.1 The Bellman Equation & Value Iteration',
  1,
  'challenge',
  110,
  'Calculate discounted future rewards for an optimal policy: $V(s) = \max_a \sum P(s''|s, a) [R + \gamma V(s'')]$.',
  '### Bellman Value Iteration
Value iteration updates state values iteratively until convergence:
$$V_{k+1}(s) = \max_{a} \sum_{s''} T(s, a, s'') [R(s, a, s'') + \gamma V_k(s'')]$$',
  '{"initialCode":"reward = 10\ngamma = 0.9\nnext_v = 100\n# Value = reward + gamma * next_v\nv = reward + gamma * next_v\nprint(\"BELLMAN_V:\", int(v))\n","expectedOutput":"BELLMAN_V: 100","instructions":"Calculate the discounted value and print ''BELLMAN_V: 100''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'col-ai-mod-5',
  (SELECT id FROM courses WHERE slug = 'columbia-ai' LIMIT 1),
  'Module 5: Neural Networks & Gradient Descent',
  5,
  'Understand feedforward propagation, activation functions, and backpropagation.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'col-ai-5-1',
  'col-ai-mod-5',
  '5.1 Forward Propagation & ReLU Activation',
  1,
  'challenge',
  95,
  'Compute neuron activation using matrix weights, bias, and Rectified Linear Unit (ReLU).',
  '### Neuron Forward Activation
For input vector $\mathbf{x}$, weight vector $\mathbf{w}$, and bias $b$:
$$z = \mathbf{w} \cdot \mathbf{x} + b$$
$$\text{ReLU}(z) = \max(0, z)$$',
  '{"initialCode":"def relu(z):\n    return max(0, z)\n\nw = 2\nx = 3\nb = -4\nz = (w * x) + b\nprint(\"ACTIVATION:\", relu(z))\n","expectedOutput":"ACTIVATION: 2","instructions":"Calculate ReLU activation and print ''ACTIVATION: 2''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'col-ai-mod-6',
  (SELECT id FROM courses WHERE slug = 'columbia-ai' LIMIT 1),
  'Module 6: Natural Language Processing & Vector Embeddings',
  6,
  'Project words and sentences into dense semantic vector spaces using cosine similarity.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'col-ai-6-1',
  'col-ai-mod-6',
  '6.1 Cosine Similarity for Semantic Search',
  1,
  'challenge',
  100,
  'Calculate the cosine of the angle between two embedding vectors in Euclidean space.',
  '### Cosine Metric
$$\text{sim}(\mathbf{u}, \mathbf{v}) = \frac{\mathbf{u} \cdot \mathbf{v}}{\|\mathbf{u}\| \|\mathbf{v}\|}$$
Normalized vectors with cosine similarity close to $1.0$ share tight semantic relevance.',
  '{"initialCode":"u = [1, 0]\nv = [1, 0]\ndot = sum(a * b for a, b in zip(u, v))\nprint(\"SIMILARITY:\", dot)\n","expectedOutput":"SIMILARITY: 1","instructions":"Compute cosine similarity of parallel unit vectors and print ''SIMILARITY: 1''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Google Data Analytics Professional Certificate (google-data-analytics)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'google-data-analytics',
  'Google Data Analytics Professional Certificate',
  'google-data-analytics',
  'The industry-standard 8-course credential: ask business questions, prepare and clean datasets, analyze trends with R and SQL, and share visual narratives.',
  'Data Science',
  'Beginner',
  '24 Weeks',
  180,
  72,
  5,
  'Google Professional Certificate',
  FALSE,
  ARRAY['SQL (BigQuery)', 'Spreadsheets', 'Tableau', 'R Programming', 'RStudio', 'Kaggle']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gda-mod-1',
  (SELECT id FROM courses WHERE slug = 'google-data-analytics' LIMIT 1),
  'Course 1: Foundations — Data, Data, Everywhere',
  1,
  'Explore the analytical mindset, data ecosystems, and the 6 phases of data analysis.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gda-1-1',
  'gda-mod-1',
  '1.1 The Analytical Thinking Framework',
  1,
  'challenge',
  50,
  'Apply the 6 analytical phases: Ask, Prepare, Process, Analyze, Share, Act.',
  '### The 6 Phases of Analysis
Google''s data methodology structures analytical inquiries into six continuous phases:
1. **Ask:** Define the business problem and understand stakeholder expectations.
2. **Prepare:** Collect, extract, and store data securely while identifying bias.
3. **Process:** Clean dirty data, verify integrity, and check formatting errors.
4. **Analyze:** Perform calculations, group data, and identify statistical patterns.
5. **Share:** Visualize insights through charts and present findings clearly.
6. **Act:** Apply insights to resolve the initial business challenge.

```python
phases = ["ASK", "PREPARE", "PROCESS", "ANALYZE", "SHARE", "ACT"]
print(f"TOTAL_PHASES:{len(phases)}")
```',
  '{"initialCode":"phases = [\"ASK\", \"PREPARE\", \"PROCESS\", \"ANALYZE\", \"SHARE\", \"ACT\"]\nprint(len(phases))\n","expectedOutput":"6","instructions":"Print the number of Google data analysis phases (6)."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gda-mod-2',
  (SELECT id FROM courses WHERE slug = 'google-data-analytics' LIMIT 1),
  'Course 2: Ask Questions to Make Data-Driven Decisions',
  2,
  'Formulate SMART business questions and establish clear stakeholder metrics.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gda-2-1',
  'gda-mod-2',
  '2.1 The SMART Questioning Methodology',
  1,
  'text',
  45,
  'Structure questions that are Specific, Measurable, Action-oriented, Relevant, and Time-bound.',
  '### SMART Criteria
- **Specific:** Does the question address a distinct metric?
- **Measurable:** Can quantitative numbers be assigned to outcomes?
- **Action-oriented:** Will findings steer business actions?
- **Relevant:** Does it support primary organizational goals?
- **Time-bound:** What period is being measured?',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gda-mod-3',
  (SELECT id FROM courses WHERE slug = 'google-data-analytics' LIMIT 1),
  'Course 3: Prepare Data for Exploration',
  3,
  'Verify data integrity, identify sampling bias, and assess open vs proprietary data sources.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gda-3-1',
  'gda-mod-3',
  '3.1 Data Ethics & Privacy Standards',
  1,
  'text',
  50,
  'Understand Personally Identifiable Information (PII) anonymization and data governance.',
  'Data analysts must safeguard user privacy by stripping or hashing PII (names, SSNs, phone numbers) before datasets enter shared analytics warehouses.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gda-mod-4',
  (SELECT id FROM courses WHERE slug = 'google-data-analytics' LIMIT 1),
  'Course 4: Process Data from Dirty to Clean',
  4,
  'Detect duplicate rows, coerce corrupted data types, and cleanse datasets using SQL.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gda-4-1',
  'gda-mod-4',
  '4.1 SQL Data Cleaning with TRIM & COALESCE',
  1,
  'challenge',
  70,
  'Cleanse leading whitespace and replace NULL values in SQL.',
  '### Cleaning Functions in SQL
* `TRIM(string)`: Removes leading and trailing whitespaces.
* `COALESCE(val, fallback)`: Replaces NULL values with default fallbacks.
* `CAST(column AS INT64)`: Normalizes numeric representations.

```python
data = ["  alpha ", "beta", None]
cleaned = [x.strip() if x else "DEFAULT" for x in data]
print(cleaned)
```',
  '{"initialCode":"raw = [\"  apple  \", \"banana \", None]\ncleaned = [x.strip() if x else \"UNKNOWN\" for x in raw]\nprint(\"CLEANED:\", cleaned)\n","expectedOutput":"CLEANED: [''apple'', ''banana'', ''UNKNOWN'']","instructions":"Strip whitespace and replace None with ''UNKNOWN'', then print the list."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gda-mod-5',
  (SELECT id FROM courses WHERE slug = 'google-data-analytics' LIMIT 1),
  'Course 5: Analyze Data to Answer Questions',
  5,
  'Perform SQL aggregations, multi-table JOINs, subqueries, and window functions.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gda-5-1',
  'gda-mod-5',
  '5.1 SQL Grouping & Aggregations',
  1,
  'challenge',
  80,
  'Compute grouped summaries, counts, and averages across dimensional categories.',
  '### Grouped Aggregations
Aggregate rows using `GROUP BY` and filter aggregations with `HAVING`:

```python
orders = [("Tech", 120), ("Tech", 80), ("Food", 30)]
totals = {}
for cat, val in orders:
    totals[cat] = totals.get(cat, 0) + val
print(totals)
```',
  '{"initialCode":"orders = [(\"Tech\", 100), (\"Tech\", 50), (\"Office\", 40)]\ntotals = {}\nfor cat, val in orders:\n    totals[cat] = totals.get(cat, 0) + val\nprint(\"TECH_TOTAL:\", totals[\"Tech\"])\n","expectedOutput":"TECH_TOTAL: 150","instructions":"Sum values for category ''Tech'' and output ''TECH_TOTAL: 150''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gda-mod-6',
  (SELECT id FROM courses WHERE slug = 'google-data-analytics' LIMIT 1),
  'Course 6: Share Data Through the Art of Visualization',
  6,
  'Design stakeholder-ready dashboards and visual presentations using Tableau.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gda-6-1',
  'gda-mod-6',
  '6.1 Dashboard Design Principles in Tableau',
  1,
  'text',
  60,
  'Use visual hierarchy, color palette restraint, and interactive filters for executive clarity.',
  'Effective dashboards answer the user''s primary business question within 5 seconds. Use clean layouts, consistent legends, and avoid clutter.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gda-mod-7',
  (SELECT id FROM courses WHERE slug = 'google-data-analytics' LIMIT 1),
  'Course 7: Data Analysis with R Programming',
  7,
  'Master RStudio, vectors, data frames, dplyr pipelines, and ggplot2 graphics.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gda-7-1',
  'gda-mod-7',
  '7.1 Tidyverse Data Wrangling & Pipes',
  1,
  'challenge',
  85,
  'Chain transformations using R''s pipe operator (%>%) or modern native pipe (|>).',
  '### Chained Data Pipelines
In R''s Tidyverse, operations flow sequentially through pipes:
```r
library(dplyr)
cleaned_df <- raw_df %>%
  filter(sales > 100) %>%
  mutate(tax = sales * 0.08)
```',
  '{"initialCode":"sales = [50, 120, 200, 80]\n# Filter sales > 100\nfiltered = [s for s in sales if s > 100]\nprint(\"FILTERED:\", filtered)\n","expectedOutput":"FILTERED: [120, 200]","instructions":"Filter values greater than 100 and print ''FILTERED: [120, 200]''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gda-mod-8',
  (SELECT id FROM courses WHERE slug = 'google-data-analytics' LIMIT 1),
  'Course 8: Google Data Analytics Capstone',
  8,
  'Complete an end-to-end case study: ask questions, clean data, analyze trends, and present recommendations.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gda-8-1',
  'gda-mod-8',
  '8.1 Capstone Case Study Defense',
  1,
  'text',
  100,
  'Document and publish your verified analytics case study to your portfolio.',
  'The capstone project demonstrates end-to-end mastery. Learners analyze real-world datasets (such as bike-share ridership or fitness-tracker telemetry) to deliver actionable business insights.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Data Science with Python (freeCodeCamp) (data-science-python)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'data-science-python',
  'Data Science with Python (freeCodeCamp)',
  'data-science-python',
  '300 hours of hands-on data manipulation, NumPy arrays, Pandas DataFrames, Matplotlib plotting, statistical modeling, and 5 verified capstone projects.',
  'Data Science',
  'Intermediate',
  '16 Weeks',
  120,
  54,
  5,
  'freeCodeCamp Verified Certificate',
  FALSE,
  ARRAY['Python', 'NumPy', 'Pandas', 'Matplotlib', 'Seaborn', 'Jupyter', 'SciPy']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'fcc-mod-1',
  (SELECT id FROM courses WHERE slug = 'data-science-python' LIMIT 1),
  'Module 1: Python Data Foundations & Statistics',
  1,
  'Master descriptive statistics, variances, and standard deviation calculations.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'fcc-1-1',
  'fcc-mod-1',
  '1.1 Mean, Median & Variance from Scratch',
  1,
  'challenge',
  60,
  'Compute the arithmetic mean and sample variance of numeric datasets.',
  '### Mathematical Definitions
$$\bar{x} = \frac{1}{n} \sum_{i=1}^n x_i$$
$$s^2 = \frac{1}{n-1} \sum_{i=1}^n (x_i - \bar{x})^2$$',
  '{"initialCode":"nums = [10, 20, 30, 40]\nmean = sum(nums) / len(nums)\nprint(\"MEAN:\", int(mean))\n","expectedOutput":"MEAN: 25","instructions":"Compute the mean and print ''MEAN: 25''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'fcc-mod-2',
  (SELECT id FROM courses WHERE slug = 'data-science-python' LIMIT 1),
  'Module 2: NumPy N-Dimensional Arrays & Vectorization',
  2,
  'Eliminate slow Python loops using vectorized C-level array broadcasting.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'fcc-2-1',
  'fcc-mod-2',
  '2.1 Array Broadcasting & Element-wise Arithmetic',
  1,
  'challenge',
  75,
  'Apply scalar broadcasting across multi-dimensional matrices.',
  '### NumPy Broadcasting
Broadcasting allows arithmetic operations between arrays of differing shapes by stretching singleton dimensions without allocating memory copies.',
  '{"initialCode":"vec = [1, 2, 3]\n# Multiply each element by scalar 10\nscaled = [x * 10 for x in vec]\nprint(\"SCALED:\", scaled)\n","expectedOutput":"SCALED: [10, 20, 30]","instructions":"Scale the vector by 10 and print ''SCALED: [10, 20, 30]''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'fcc-mod-3',
  (SELECT id FROM courses WHERE slug = 'data-science-python' LIMIT 1),
  'Module 3: Pandas DataFrames & Series',
  3,
  'Filter, group, merge, and transform tabular records with Pandas.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'fcc-3-1',
  'fcc-mod-3',
  '3.1 Boolean Indexing & Groupby Aggregations',
  1,
  'challenge',
  80,
  'Filter rows matching multiple predicates and aggregate by group.',
  '### Pandas Boolean Indexing
Filter records using vector conditions (`df[df[''age''] > 21]`) and compute group aggregations (`df.groupby(''dept'')[''salary''].mean()`).',
  '{"initialCode":"records = [\n    {\"dept\": \"Engineering\", \"salary\": 120000},\n    {\"dept\": \"Engineering\", \"salary\": 140000},\n    {\"dept\": \"Design\", \"salary\": 90000}\n]\neng_salaries = [r[\"salary\"] for r in records if r[\"dept\"] == \"Engineering\"]\navg_eng = sum(eng_salaries) / len(eng_salaries)\nprint(\"AVG_ENG_SALARY:\", int(avg_eng))\n","expectedOutput":"AVG_ENG_SALARY: 130000","instructions":"Calculate the average salary for Engineering and output ''AVG_ENG_SALARY: 130000''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'fcc-mod-4',
  (SELECT id FROM courses WHERE slug = 'data-science-python' LIMIT 1),
  'Module 4: Data Cleaning & Feature Engineering',
  4,
  'Handle missing values with imputation, encode categorical variables, and normalize scales.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'fcc-4-1',
  'fcc-mod-4',
  '4.1 Imputation & Z-Score Outlier Detection',
  1,
  'text',
  70,
  'Detect anomalies outside 3 standard deviations using Z-score normalization.',
  '$$Z = \frac{x - \mu}{\sigma}$$
Values where $|Z| > 3.0$ represent severe outliers that skew linear models and parameter estimations.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'fcc-mod-5',
  (SELECT id FROM courses WHERE slug = 'data-science-python' LIMIT 1),
  'Module 5: Visualization with Matplotlib & Seaborn',
  5,
  'Generate scatter plots, distribution histograms, and heatmaps.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'fcc-5-1',
  'fcc-mod-5',
  '5.1 Visualizing Correlation Matrices',
  1,
  'text',
  75,
  'Plot heatmaps of Pearson correlation coefficients between features.',
  'A correlation matrix quantifies linear relationships between continuous variables from $-1.0$ (perfect inverse correlation) to $+1.0$ (perfect positive correlation).',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'fcc-mod-6',
  (SELECT id FROM courses WHERE slug = 'data-science-python' LIMIT 1),
  'Module 6: Capstone Projects (5 Projects)',
  6,
  'Build the 5 required projects: Mean-Variance-Std Dev Calculator, Demographic Data Analyzer, Medical Data Visualizer, Page View Time Series Visualizer, and Sea Level Predictor.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'fcc-6-1',
  'fcc-mod-6',
  '6.1 Mean-Variance-Standard Deviation Calculator',
  1,
  'challenge',
  100,
  'Build a matrix statistics engine that calculates 3x3 array metrics along both axes.',
  '### Capstone 1: Matrix Metrics
Given a list of 9 numbers, convert into a $3 \times 3$ matrix and compute mean, variance, standard deviation, max, min, and sum along axis 0, axis 1, and flattened.',
  '{"initialCode":"matrix = [\n    [0, 1, 2],\n    [3, 4, 5],\n    [6, 7, 8]\n]\nrow_sums = [sum(row) for row in matrix]\nprint(\"ROW_SUMS:\", row_sums)\n","expectedOutput":"ROW_SUMS: [3, 12, 21]","instructions":"Calculate the sum of each row and output ''ROW_SUMS: [3, 12, 21]''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Data Science: Visualization (HarvardX) (data-science-visualization)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'data-science-visualization',
  'Data Science: Visualization (HarvardX)',
  'data-science-visualization',
  'Master exploratory data analysis and visual communication using ggplot2, principles of graphic design, color theory, and spotting visual misinformation.',
  'Data Science',
  'Beginner',
  '8 Weeks',
  36,
  24,
  2,
  'HarvardX Verified Certificate',
  FALSE,
  ARRAY['R', 'ggplot2', 'Tidyverse', 'RMarkdown', 'ColorBrewer']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'harv-vis-mod-1',
  (SELECT id FROM courses WHERE slug = 'data-science-visualization' LIMIT 1),
  'Module 1: The Grammar of Graphics & ggplot2',
  1,
  'Deconstruct Leland Wilkinson''s Grammar of Graphics framework into layered code.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'harv-vis-1-1',
  'harv-vis-mod-1',
  '1.1 Layers of the Grammar of Graphics',
  1,
  'challenge',
  60,
  'Combine Data, Aesthetics (aes), Geometries (geom), and Scales.',
  '### The Grammar Hierarchy
1. **Data:** The tidy data frame.
2. **Aesthetics (`aes`):** Mapping columns to $x$, $y$, color, size, or shape.
3. **Geometries (`geom`):** Visual shapes (points, bars, lines).
4. **Faceting:** Splitting plots across categorical subsets.',
  '{"initialCode":"layers = [\"data\", \"aes\", \"geom\", \"scales\", \"facets\"]\nprint(\"TOTAL_LAYERS:\", len(layers))\n","expectedOutput":"TOTAL_LAYERS: 5","instructions":"Output the count of core graphic grammar layers: ''TOTAL_LAYERS: 5''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'harv-vis-mod-2',
  (SELECT id FROM courses WHERE slug = 'data-science-visualization' LIMIT 1),
  'Module 2: Aesthetic Mappings & Coordinates',
  2,
  'Select effective coordinates, log scales, and colorblind-safe palettes.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'harv-vis-2-1',
  'harv-vis-mod-2',
  '2.1 Log-Scale Transformations for Skewed Data',
  1,
  'challenge',
  70,
  'Apply log transformations to visualize multiplicative and power-law distributions.',
  '### Logarithmic Scales
When visualizing data spanning multiple orders of magnitude (e.g., GDP per capita, population sizes), linear scales compress 90% of the observations into an unreadable cluster. Transforming axes with $\log_{10}$ restores visual interpretability.',
  '{"initialCode":"import math\nvals = [10, 100, 1000]\nlogs = [int(math.log10(v)) for v in vals]\nprint(\"LOGS:\", logs)\n","expectedOutput":"LOGS: [1, 2, 3]","instructions":"Compute log10 of the values and print ''LOGS: [1, 2, 3]''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'harv-vis-mod-3',
  (SELECT id FROM courses WHERE slug = 'data-science-visualization' LIMIT 1),
  'Module 3: Selecting Effective Visualizations',
  3,
  'Compare histograms, kernel density estimates, boxplots, and scatter plots.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'harv-vis-3-1',
  'harv-vis-mod-3',
  '3.1 Distributions: Boxplots vs Histograms',
  1,
  'text',
  65,
  'Understand the five-number summary: min, Q1, median, Q3, and max.',
  'Box plots highlight the interquartile range (IQR) and potential outliers ($1.5 \times \text{IQR}$), making them ideal for comparing distributions across multiple categories side-by-side.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'harv-vis-mod-4',
  (SELECT id FROM courses WHERE slug = 'data-science-visualization' LIMIT 1),
  'Module 4: Spotting Visual Misinformation & Design Ethics',
  4,
  'Detect truncated axes, dual-axis scale mismatches, and misleading 3D projections.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'harv-vis-4-1',
  'harv-vis-mod-4',
  '4.1 The Truncated Y-Axis Fallacy',
  1,
  'challenge',
  75,
  'Enforce zero-baseline rules on bar charts to preserve visual area proportions.',
  '### The Zero Baseline Rule
In bar charts, the numerical value is encoded by the **area and height** of the bar. Truncating the y-axis (e.g. starting at 95 instead of 0) visually exaggerates a 1% difference into a 500% gap.',
  '{"initialCode":"def is_valid_bar_baseline(y_min):\n    return y_min == 0\n\nprint(\"IS_VALID:\", is_valid_bar_baseline(0))\n","expectedOutput":"IS_VALID: True","instructions":"Verify zero baseline requirement and output ''IS_VALID: True''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Modern Git Academy (Complete 8-Pillar Program) (modern-git-academy)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'modern-git-academy',
  'Modern Git Academy (Complete 8-Pillar Program)',
  'modern-git-academy',
  'The definitive 300+ lesson curriculum: from Git object DAG internals and modern worktrees to GitHub Actions CI/CD, DevSecOps supply chain security, and Copilot AI workflows.',
  'Git & DevOps',
  'All Levels',
  '12 Weeks',
  60,
  85,
  6,
  'Modern Git Academy Certificate',
  FALSE,
  ARRAY['Git 2.45+', 'GitHub CLI (gh)', 'GitHub Actions', 'Docker', 'GPG', 'DevSecOps', 'Git LFS']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'git-acad-mod-1',
  (SELECT id FROM courses WHERE slug = 'modern-git-academy' LIMIT 1),
  'Pillar 1: Git Fundamentals & Internal DAG Architecture',
  1,
  'Explore the directed acyclic graph (DAG), object hashing, and index manipulation.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-1-1',
  'git-acad-mod-1',
  '1.1 How Git Actually Works: The Content-Addressable Store',
  1,
  'challenge',
  60,
  'Understand the .git object directory: blobs, trees, commits, and SHA hashes.',
  '### Git is a Content-Addressable Store
* **Blob (Binary Large Object):** Stores raw file contents without filenames or permissions.
* **Tree:** Contains directory entries mapping file paths to blob/tree SHAs.
* **Commit:** A snapshot pointing to a root tree, parent commit hash(es), author info, and message.
* **Tag / Reference:** Human-readable pointers (`refs/heads/main`) to specific commit hashes.',
  '{"initialCode":"objects = [\"blob\", \"tree\", \"commit\", \"tag\"]\nprint(\"-\".join(objects))\n","expectedOutput":"blob-tree-commit-tag","instructions":"Print the 4 core Git object types joined by dashes: ''blob-tree-commit-tag''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-1-2',
  'git-acad-mod-1',
  '1.2 The Three Trees: Working Directory, Index, and HEAD',
  2,
  'challenge',
  65,
  'Track how changes travel from the Working Tree through the Staging Area into HEAD.',
  '### The Three States
1. **Working Tree:** The local files you edit on disk.
2. **Index (Staging Area):** The exact snapshot prepared for the next commit via `git add`.
3. **HEAD:** The pointer referencing your currently checked-out commit.',
  '{"initialCode":"trees = [\"working_tree\", \"index\", \"head\"]\nprint(f\"COUNT:{len(trees)}\")\n","expectedOutput":"COUNT:3","instructions":"Print ''COUNT:3'' to confirm the three conceptual trees in Git."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'git-acad-mod-2',
  (SELECT id FROM courses WHERE slug = 'modern-git-academy' LIMIT 1),
  'Pillar 2: Modern Git Workflows & Advanced Rebasing',
  2,
  'Master interactive rebasing (`git rebase -i`), squashing, and linear commit histories.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-2-1',
  'git-acad-mod-2',
  '2.1 Merge vs Rebase: Preserving Linearity',
  1,
  'text',
  70,
  'Understand fast-forward merges, 3-way merge commits, and replay mechanics.',
  '### Rebase vs Merge
- **Merge (`git merge`):** Creates a non-destructive merge commit with two parents. Preserves complete historical context.
- **Rebase (`git rebase`):** Replays feature branch commits onto the tip of upstream base, creating a linear history without diamond merge topologies.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'git-acad-mod-3',
  (SELECT id FROM courses WHERE slug = 'modern-git-academy' LIMIT 1),
  'Pillar 3: High-Productivity Worktrees & Sparse Checkouts',
  3,
  'Work on multiple branches concurrently in separate directory checkouts without stashing.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-3-1',
  'git-acad-mod-3',
  '3.1 Git Worktrees for Instant Context Switching',
  1,
  'challenge',
  75,
  'Mount parallel checkouts linked to the same underlying .git object repository.',
  '### Why Git Worktrees?
Instead of running `git stash` or cloning multiple gigabytes, `git worktree add ../hotfix main` creates a secondary linked directory sharing the same underlying repository objects.',
  '{"initialCode":"cmd = \"git worktree add ../feature-auth feature-auth\"\nprint(\"WORKTREE_CREATED\")\n","expectedOutput":"WORKTREE_CREATED","instructions":"Verify the worktree concept and output ''WORKTREE_CREATED''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'git-acad-mod-4',
  (SELECT id FROM courses WHERE slug = 'modern-git-academy' LIMIT 1),
  'Pillar 4: GitHub Actions & Enterprise CI/CD Pipelines',
  4,
  'Build robust multi-stage pipelines with matrix testing, dependency caching, and environment secrets.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-4-1',
  'git-acad-mod-4',
  '4.1 Matrix Strategies & Pipeline Caching',
  1,
  'challenge',
  85,
  'Test multiple Node/Python versions concurrently using GitHub Actions matrix syntax.',
  '### Matrix Jobs in GitHub Actions
```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest]
        node: [18, 20]
```',
  '{"initialCode":"oses = [\"ubuntu-latest\", \"macos-latest\"]\nnodes = [18, 20]\ntotal_jobs = len(oses) * len(nodes)\nprint(\"MATRIX_JOBS:\", total_jobs)\n","expectedOutput":"MATRIX_JOBS: 4","instructions":"Calculate total matrix job combinations and print ''MATRIX_JOBS: 4''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'git-acad-mod-5',
  (SELECT id FROM courses WHERE slug = 'modern-git-academy' LIMIT 1),
  'Pillar 5: Git Security & DevSecOps',
  5,
  'Secure repositories with GPG commit signatures, secret scanning, and software bills of materials (SBOMs).'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-5-1',
  'git-acad-mod-5',
  '5.1 Cryptographically Signed Commits with GPG / SSH',
  1,
  'text',
  80,
  'Prevent commit author impersonation by signing commits with public-key cryptography.',
  'Git commit author metadata (`user.name` and `user.email`) can be trivially forged by anyone. Cryptographically signing commits with GPG or SSH keys produces a verified badge on GitHub, proving authorship authenticity.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'git-acad-mod-6',
  (SELECT id FROM courses WHERE slug = 'modern-git-academy' LIMIT 1),
  'Pillar 6: GitHub Copilot & AI Engineering',
  6,
  'Leverage AI agents, workspace indexing, and automated pull request summaries.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-6-1',
  'git-acad-mod-6',
  '6.1 Copilot Workspace & AI Code Review Agents',
  1,
  'text',
  80,
  'Configure automated AI review rules and repository guidelines (.github/copilot-instructions.md).',
  'AI agents review pull request diffs, flag potential null pointer exceptions, suggest performance refactors, and ensure project architectural boundaries are honored.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'git-acad-mod-7',
  (SELECT id FROM courses WHERE slug = 'modern-git-academy' LIMIT 1),
  'Pillar 7: Infrastructure as Code & GitOps',
  7,
  'Drive cloud infrastructure changes through version control using OpenTofu and ArgoCD.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-7-1',
  'git-acad-mod-7',
  '7.1 Declarative State Reconciliation in GitOps',
  1,
  'text',
  85,
  'Use Git as the single source of truth for desired Kubernetes and cloud state.',
  'In a GitOps architecture, operations agents continuously reconcile running cluster state with the declarative manifests committed to Git, automatically triggering zero-downtime rolling updates.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'git-acad-mod-8',
  (SELECT id FROM courses WHERE slug = 'modern-git-academy' LIMIT 1),
  'Pillar 8: Git at Scale & Enterprise Monorepos',
  8,
  'Scale large repositories using Git LFS, partial clones (blobless/treeless), and organization rulesets.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'git-8-1',
  'git-acad-mod-8',
  '8.1 Git Large File Storage (LFS) Pointer Architecture',
  1,
  'challenge',
  90,
  'Replace large multi-gigabyte binary assets with lightweight text pointer files in Git.',
  '### Git LFS Architecture
Instead of storing multi-megabyte binary assets inside Git objects, Git LFS replaces the file with a tiny text pointer containing the file''s SHA-256 hash and byte size, downloading the actual asset on-demand.',
  '{"initialCode":"lfs_pointer = \"\"\"version https://git-lfs.github.com/spec/v1\noid sha256:4cac19622\nsize 145982\"\"\"\nprint(\"POINTER_PARSED\")\n","expectedOutput":"POINTER_PARSED","instructions":"Parse the LFS pointer simulation and print ''POINTER_PARSED''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Ultimate GitHub Masterclass: Zero to Professional (ultimate-github)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'ultimate-github',
  'Ultimate GitHub Masterclass: Zero to Professional',
  'ultimate-github',
  'From your first pull request to enterprise repository fleet governance, branch protection rulesets, and zero-trust CI/CD orchestration.',
  'Git & DevOps',
  'Beginner',
  '6 Weeks',
  32,
  35,
  3,
  'GitHub Completion Certificate',
  FALSE,
  ARRAY['GitHub', 'Git', 'GitHub CLI', 'Issues & Projects', 'Actions', 'Dependabot']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gh-master-mod-1',
  (SELECT id FROM courses WHERE slug = 'ultimate-github' LIMIT 1),
  'Level 1: Foundations & Remote Repositories',
  1,
  'Initialize repositories, configure remotes, and push your first commits.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gh-1-1',
  'gh-master-mod-1',
  '1.1 Tracking Remotes with git push -u origin main',
  1,
  'challenge',
  50,
  'Configure remote tracking references for seamless synchronization.',
  '### Configuring Origin
The `-u` (upstream) flag links your local branch to the remote branch on GitHub:
`git remote add origin https://github.com/user/repo.git`
`git push -u origin main`',
  '{"initialCode":"remote = \"origin\"\nbranch = \"main\"\nprint(f\"TRACKING:{remote}/{branch}\")\n","expectedOutput":"TRACKING:origin/main","instructions":"Output the tracked remote branch: ''TRACKING:origin/main''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gh-master-mod-2',
  (SELECT id FROM courses WHERE slug = 'ultimate-github' LIMIT 1),
  'Level 2: Branching Strategies & Merge Conflicts',
  2,
  'Isolate experimental features on topic branches and resolve merge conflicts cleanly.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gh-2-1',
  'gh-master-mod-2',
  '2.1 Resolving Merge Conflicts Confidently',
  1,
  'challenge',
  65,
  'Understand conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`) and clean resolutions.',
  '### Anatomical Markers
Git flags overlapping line modifications with conflict markers:
```text
<<<<<<< HEAD (Current Change)
color = "emerald"
=======
color = "forest_green"
>>>>>>> feature-theme (Incoming Change)
```',
  '{"initialCode":"chosen_color = \"emerald\"\nprint(\"RESOLVED:\", chosen_color)\n","expectedOutput":"RESOLVED: emerald","instructions":"Resolve conflict and print ''RESOLVED: emerald''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gh-master-mod-3',
  (SELECT id FROM courses WHERE slug = 'ultimate-github' LIMIT 1),
  'Level 3: Collaborative Pull Requests & Code Reviews',
  3,
  'Author detailed PR descriptions, assign CODEOWNERS, and conduct thorough peer reviews.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gh-3-1',
  'gh-master-mod-3',
  '3.1 Anatomy of an Exceptional Pull Request',
  1,
  'text',
  60,
  'Provide context, before/after screenshots, testing steps, and link related issues.',
  'Great PRs include concise summaries, reproduction steps, automated test passes, and close issue keywords (e.g. `Fixes #42`).',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gh-master-mod-4',
  (SELECT id FROM courses WHERE slug = 'ultimate-github' LIMIT 1),
  'Level 4: Agile Project Management with GitHub Projects',
  4,
  'Organize roadmaps, sprint backlogs, and issue triage with custom fields.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gh-4-1',
  'gh-master-mod-4',
  '4.1 Automating Issue Workflows in Projects',
  1,
  'text',
  55,
  'Automatically move issues from ''Todo'' to ''In Progress'' upon PR creation.',
  'GitHub Projects v2 supports automated status transitions when pull requests are linked to issues, keeping sprint boards up-to-date automatically.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gh-master-mod-5',
  (SELECT id FROM courses WHERE slug = 'ultimate-github' LIMIT 1),
  'Level 5: CI/CD Automation with GitHub Actions',
  5,
  'Trigger automated tests, linters, and preview environments on every pull request.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gh-5-1',
  'gh-master-mod-5',
  '5.1 Pull Request Status Checks',
  1,
  'challenge',
  75,
  'Block merge access until all automated status checks pass.',
  '### Required Status Checks
Branch protection can mandate that status checks (such as `test`, `lint`, `build`) pass green before the merge button becomes active.',
  '{"initialCode":"checks = {\"test\": True, \"lint\": True, \"security\": True}\ncan_merge = all(checks.values())\nprint(\"CAN_MERGE:\", can_merge)\n","expectedOutput":"CAN_MERGE: True","instructions":"Evaluate status checks and print ''CAN_MERGE: True''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gh-master-mod-6',
  (SELECT id FROM courses WHERE slug = 'ultimate-github' LIMIT 1),
  'Level 6: Repository Security & Dependabot',
  6,
  'Automate CVE dependency patching with Dependabot and scan commits for leaked tokens.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gh-6-1',
  'gh-master-mod-6',
  '6.1 Automated Dependabot Pull Requests',
  1,
  'text',
  70,
  'Keep vulnerable packages updated automatically with semver PRs.',
  'Dependabot monitors the GitHub Advisory Database. When a vulnerable dependency is detected, it automatically submits a PR updating the package lockfile with passing CI tests.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'gh-master-mod-7',
  (SELECT id FROM courses WHERE slug = 'ultimate-github' LIMIT 1),
  'Level 7: Enterprise Governance & Rulesets',
  7,
  'Enforce branch protections, merge queues, and audit logs across hundreds of repositories.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'gh-7-1',
  'gh-master-mod-7',
  '7.1 Enterprise Repository Rulesets',
  1,
  'text',
  85,
  'Apply universal compliance policies across an entire organization with GitHub Rulesets.',
  'Rulesets allow organization admins to enforce linear history, require signed commits, and mandate code reviews across all target repositories simultaneously.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: CS50 Introduction to Cybersecurity (HarvardX) (cs50-cybersecurity)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'cs50-cybersecurity',
  'CS50 Introduction to Cybersecurity (HarvardX)',
  'cs50-cybersecurity',
  'Harvard University''s introduction to defending data, devices, and systems against digital threats, social engineering, cryptanalysis, and network exploits.',
  'Cybersecurity',
  'Beginner',
  '8 Weeks',
  48,
  28,
  3,
  'HarvardX Verified Certificate',
  FALSE,
  ARRAY['Wireshark', 'Cryptography (AES/RSA)', 'Network Security', 'Ethical Hacking', 'Passkeys']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cs50-sec-mod-1',
  (SELECT id FROM courses WHERE slug = 'cs50-cybersecurity' LIMIT 1),
  'Module 1: Securing Accounts — Authentication & Hashing',
  1,
  'Explore cryptographic hashes, brute force mechanics, dictionary attacks, and passkeys.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cs50-sec-1-1',
  'cs50-sec-mod-1',
  '1.1 Encoding vs Hashing vs Encryption',
  1,
  'challenge',
  70,
  'Differentiate one-way hash digests (SHA-256) from two-way ciphers (AES).',
  '### Cryptographic Fundamentals
* **Encoding (e.g. Base64):** Transforms data into alternate character sets for reliable network transport. It provides **zero confidentiality**.
* **Hashing (e.g. SHA-256, bcrypt):** A deterministic, one-way mathematical function. Given input $x$, it produces a fixed-length digest $H(x)$. It is computationally infeasible to invert $H(x)$ back to $x$.
* **Encryption (e.g. AES-256, RSA):** A two-way transformation that secures confidentiality using secret keys.

```python
import hashlib
digest = hashlib.sha256(b"admin").hexdigest()
print(f"DIGEST_PREFIX:{digest[:8]}")
```',
  '{"initialCode":"import hashlib\nh = hashlib.sha256(b\"password\").hexdigest()\nprint(\"HASH_COMPUTED\")\n","expectedOutput":"HASH_COMPUTED","instructions":"Compute the hash digest and print ''HASH_COMPUTED''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cs50-sec-1-2',
  'cs50-sec-mod-1',
  '1.2 Salted Hashes & Rainbow Table Defense',
  2,
  'challenge',
  75,
  'Prevent precomputed dictionary lookups by appending unique random cryptographic salts.',
  '### Defeating Rainbow Tables
If two users choose the same password (''hunter2''), their unsalted SHA-256 hashes will be identical. An attacker with a precomputed lookup table (rainbow table) can crack millions of passwords instantly.

**Salting** appends a unique random string (the salt) to each password before hashing:
$$H(\text{password} + \text{salt})$$
Even identical passwords produce completely different hash strings!',
  '{"initialCode":"salt = \"s@lt_99\"\npwd = \"mysecret\"\ncombined = salt + pwd\nprint(f\"SALTED_LENGTH:{len(combined)}\")\n","expectedOutput":"SALTED_LENGTH:15","instructions":"Combine the salt and password and print ''SALTED_LENGTH:15''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cs50-sec-mod-2',
  (SELECT id FROM courses WHERE slug = 'cs50-cybersecurity' LIMIT 1),
  'Module 2: Securing Data — Symmetric & Asymmetric Cryptography',
  2,
  'Master AES secret keys, Diffie-Hellman key exchange, RSA public/private pairs, and PKI.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cs50-sec-2-1',
  'cs50-sec-mod-2',
  '2.1 Public-Key Cryptography (RSA Trapdoor Functions)',
  1,
  'challenge',
  80,
  'Encrypt with the public key; decrypt only with the matched private key.',
  '### Asymmetric Cryptography
Alice encrypts messages using Bob''s **public key**. Only Bob''s **private key** can compute the mathematical inverse of the trapdoor function to recover plaintext.

```python
# RSA modular exponentiation: c = (m ^ e) % n
def encrypt_rsa(m, e, n):
    return pow(m, e, n)
```',
  '{"initialCode":"m = 7\ne = 3\nn = 33\ncipher = pow(m, e, n)\nprint(\"CIPHERTEXT:\", cipher)\n","expectedOutput":"CIPHERTEXT: 13","instructions":"Compute the RSA modular exponentiation and print ''CIPHERTEXT: 13''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cs50-sec-mod-3',
  (SELECT id FROM courses WHERE slug = 'cs50-cybersecurity' LIMIT 1),
  'Module 3: Securing Systems — TCP/IP & Network Defense',
  3,
  'Analyze the TCP 3-way handshake, SYN flood DOS attacks, Wireshark packet capture, and firewalls.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cs50-sec-3-1',
  'cs50-sec-mod-3',
  '3.1 The TCP Three-Way Handshake',
  1,
  'challenge',
  85,
  'Trace SYN, SYN-ACK, and ACK packet sequences establishing reliable connections.',
  '### The Handshake Mechanics
1. **Client $\to$ Server:** `SYN` (Synchronize sequence number $x$).
2. **Server $\to$ Client:** `SYN-ACK` (Acknowledge $x+1$, synchronize sequence number $y$).
3. **Client $\to$ Server:** `ACK` (Acknowledge $y+1$). Connection is now ESTABLISHED.',
  '{"initialCode":"steps = [\"SYN\", \"SYN-ACK\", \"ACK\"]\nprint(\"HANDSHAKE:\", \" -> \".join(steps))\n","expectedOutput":"HANDSHAKE: SYN -> SYN-ACK -> ACK","instructions":"Output the TCP handshake sequence: ''HANDSHAKE: SYN -> SYN-ACK -> ACK''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cs50-sec-mod-4',
  (SELECT id FROM courses WHERE slug = 'cs50-cybersecurity' LIMIT 1),
  'Module 4: Securing Software — Injection & Web Vulnerabilities',
  4,
  'Mitigate OWASP Top 10 exploits including SQL Injection (SQLi) and Cross-Site Scripting (XSS).'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cs50-sec-4-1',
  'cs50-sec-mod-4',
  '4.1 SQL Injection Prevention with Parameterized Queries',
  1,
  'challenge',
  90,
  'Eliminate string concatenation in SQL queries using prepared statement placeholders.',
  '### Vulnerable Concatenation vs Prepared Statements
* **Vulnerable:** `"SELECT * FROM users WHERE name = ''" + input + "''"`
  Input `'' OR ''1''=''1` bypasses authentication entirely.
* **Secure (Parameterized):** `"SELECT * FROM users WHERE name = ?"`
  The database engine treats the input strictly as literal string data, never as executable code.',
  '{"initialCode":"def sanitize_input(val):\n    # Replace single quote with escaped quote to illustrate literal handling\n    return val.replace(\"''\", \"''''\")\n\nprint(\"SANITIZED:\", sanitize_input(\"admin'' OR ''1''=''1\"))\n","expectedOutput":"SANITIZED: admin'''' OR ''''1''''=''''1","instructions":"Sanitize SQL quotes and print ''SANITIZED: admin'''' OR ''''1''''=''''1''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cs50-sec-mod-5',
  (SELECT id FROM courses WHERE slug = 'cs50-cybersecurity' LIMIT 1),
  'Module 5: Preserving Privacy — Tor & Defense-in-Depth',
  5,
  'Explore metadata tracking, multi-hop onion routing, and zero-trust perimeter defenses.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cs50-sec-5-1',
  'cs50-sec-mod-5',
  '5.1 Onion Routing & Layered Decryption',
  1,
  'text',
  85,
  'Understand guard, middle, and exit relays in the Tor network.',
  'In onion routing, network packets are wrapped in multiple layers of encryption like an onion. Each relay strips off only its layer to discover the next hop, ensuring no single node knows both the origin IP and destination URL.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Python for Data Science, AI & Development (python-ai)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'python-ai',
  'Python for Data Science, AI & Development',
  'python-ai',
  'Master modern Python 3.12 syntax, object-oriented design, async I/O, REST APIs, and the mathematical standard libraries powering machine learning.',
  'Programming',
  'Beginner',
  '10 Weeks',
  50,
  40,
  4,
  'Coursera & IBM Certificate',
  FALSE,
  ARRAY['Python 3.12', 'FastAPI', 'Requests', 'Pytest', 'Mypy', 'Asyncio']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'py-ai-mod-1',
  (SELECT id FROM courses WHERE slug = 'python-ai' LIMIT 1),
  'Module 1: Language Syntax, Memory Model & Type Hints',
  1,
  'Write clean, type-annotated, idiomatic Python adhering to PEP 8 standards.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'py-ai-1-1',
  'py-ai-mod-1',
  '1.1 Modern Python Type Hints & Annotations',
  1,
  'challenge',
  50,
  'Eliminate runtime type bugs using Python''s static typing annotations and Mypy.',
  '### Static Type Annotations in Python
While Python is dynamically typed at runtime, modern systems enforce static type checking during CI/CD to prevent bugs before deployment.

```python
def calculate_tax(subtotal: float, rate: float = 0.08) -> float:
    return round(subtotal * rate, 2)

print(calculate_tax(100.0))
```',
  '{"initialCode":"def greet(name: str) -> str:\n    return f\"HELLO_{name.upper()}\"\n\nprint(greet(\"architect\"))\n","expectedOutput":"HELLO_ARCHITECT","instructions":"Return and print the formatted string ''HELLO_ARCHITECT''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'py-ai-1-2',
  'py-ai-mod-1',
  '1.2 List Comprehensions & Generator Expressions',
  2,
  'challenge',
  65,
  'Transform and filter collections with concise, memory-efficient syntax.',
  '### Concise Transformations
List comprehensions provide an expressive alternative to manual for-loops:

```python
numbers = [1, 2, 3, 4, 5]
evens_squared = [n ** 2 for n in numbers if n % 2 == 0]
print(evens_squared) # [4, 16]
```',
  '{"initialCode":"nums = [1, 2, 3, 4, 5, 6]\nresult = [n * 10 for n in nums if n % 2 == 0]\nprint(result)\n","expectedOutput":"[20, 40, 60]","instructions":"Filter even numbers, multiply by 10, and print the resulting list."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'py-ai-mod-2',
  (SELECT id FROM courses WHERE slug = 'python-ai' LIMIT 1),
  'Module 2: Object-Oriented Architecture & Magic Methods',
  2,
  'Design robust domain entities with encapsulation, custom __repr__, and context managers.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'py-ai-2-1',
  'py-ai-mod-2',
  '2.1 Magic (Dunder) Methods',
  1,
  'challenge',
  80,
  'Implement __init__, __str__, and __len__ to make custom objects behave like native types.',
  '### Python Data Model Protocols
Custom classes interact with built-in language operators by implementing special dunder methods:
* `__init__`: Object construction.
* `__repr__`: Diagnostic representation.
* `__len__`: Called when `len(obj)` is evaluated.

```python
class Packet:
    def __init__(self, data: list):
        self.data = data
    def __len__(self):
        return len(self.data)
```',
  '{"initialCode":"class Batch:\n    def __init__(self, items):\n        self.items = items\n    def __len__(self):\n        return len(self.items)\n\nb = Batch([10, 20, 30])\nprint(\"BATCH_LEN:\", len(b))\n","expectedOutput":"BATCH_LEN: 3","instructions":"Implement __len__ and output ''BATCH_LEN: 3''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'py-ai-mod-3',
  (SELECT id FROM courses WHERE slug = 'python-ai' LIMIT 1),
  'Module 3: Functional Paradigms, Iterators & Generators',
  3,
  'Stream infinite datasets without memory overflow using generator yield pipelines.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'py-ai-3-1',
  'py-ai-mod-3',
  '3.1 Memory-Efficient Generators with Yield',
  1,
  'challenge',
  75,
  'Produce streaming sequences on demand without loading full lists into RAM.',
  '### Generators vs Lists
A regular function computes all values and returns them at once. A generator uses `yield` to pause execution and emit items one by one, keeping memory footprint bounded to $O(1)$.

```python
def count_up(n):
    for i in range(1, n + 1):
        yield i
```',
  '{"initialCode":"def gen_evens(limit):\n    for i in range(limit):\n        if i % 2 == 0:\n            yield i\n\nprint(\"EVENS:\", list(gen_evens(6)))\n","expectedOutput":"EVENS: [0, 2, 4]","instructions":"Yield even numbers up to limit 6 and print ''EVENS: [0, 2, 4]''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'py-ai-mod-4',
  (SELECT id FROM courses WHERE slug = 'python-ai' LIMIT 1),
  'Module 4: Asynchronous Concurrency with Asyncio',
  4,
  'Handle high-throughput I/O bound operations concurrently using async/await and event loops.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'py-ai-4-1',
  'py-ai-mod-4',
  '4.1 Coroutines and asyncio.gather',
  1,
  'challenge',
  85,
  'Dispatch multiple non-blocking async network tasks concurrently.',
  '### Asyncio Concurrency
When code awaits an I/O operation (like an HTTP call or database query), the event loop pauses the current coroutine and executes other pending tasks instead of blocking the thread.',
  '{"initialCode":"tasks = [\"FETCH_USER\", \"FETCH_POSTS\"]\ncompleted = [t + \"_OK\" for t in tasks]\nprint(\"CONCURRENT:\", completed)\n","expectedOutput":"CONCURRENT: [''FETCH_USER_OK'', ''FETCH_POSTS_OK'']","instructions":"Simulate concurrent task resolution and print ''CONCURRENT: [''FETCH_USER_OK'', ''FETCH_POSTS_OK'']''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'py-ai-mod-5',
  (SELECT id FROM courses WHERE slug = 'python-ai' LIMIT 1),
  'Module 5: Production REST APIs with FastAPI & Pydantic',
  5,
  'Build robust, high-performance web microservices with automatic OpenAPI schemas.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'py-ai-5-1',
  'py-ai-mod-5',
  '5.1 Pydantic Model Validation',
  1,
  'challenge',
  90,
  'Enforce strict JSON schema validation for API request bodies.',
  '### Request Body Parsing
FastAPI uses Pydantic to parse and validate incoming JSON payloads against declarative Python dataclasses.',
  '{"initialCode":"payload = {\"user_id\": 101, \"role\": \"admin\"}\ndef validate(p):\n    return p.get(\"role\") == \"admin\"\n\nprint(\"IS_ADMIN:\", validate(payload))\n","expectedOutput":"IS_ADMIN: True","instructions":"Validate the payload role and print ''IS_ADMIN: True''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Google Cloud Productivity & Enterprise Workflows (cloud-productivity)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'cloud-productivity',
  'Google Cloud Productivity & Enterprise Workflows',
  'cloud-productivity',
  'Automate organizational collaboration: Google Sheets formulas, Apps Script automations, cloud drive architecture, and collaborative document systems.',
  'Cloud & Infra',
  'Beginner',
  '4 Weeks',
  18,
  20,
  2,
  'Google Professional Certificate',
  FALSE,
  ARRAY['Google Sheets', 'Google Apps Script', 'Google Drive API', 'Cloud Storage', 'Forms']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cloud-prod-mod-1',
  (SELECT id FROM courses WHERE slug = 'cloud-productivity' LIMIT 1),
  'Module 1: Advanced Google Sheets & Dynamic Array Formulas',
  1,
  'Transform spreadsheet data using SQL-like QUERY strings and ARRAYFORMULA.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cloud-prod-1-1',
  'cloud-prod-mod-1',
  '1.1 The QUERY Function in Google Sheets',
  1,
  'challenge',
  50,
  'Run pseudocode SQL queries directly inside spreadsheet formula cells.',
  '### Google Visualization API Query Language
Google Sheets allows you to run SQL-like strings on cell ranges:
`=QUERY(A1:E100, "SELECT A, B WHERE C > 500 ORDER BY B DESC", 1)`',
  '{"initialCode":"rows = [[\"Design\", 400], [\"Engineering\", 1200], [\"Sales\", 800]]\nfiltered = [r[0] for r in rows if r[1] > 500]\nprint(\"QUERY_RESULT:\", filtered)\n","expectedOutput":"QUERY_RESULT: [''Engineering'', ''Sales'']","instructions":"Filter rows where value > 500 and print ''QUERY_RESULT: [''Engineering'', ''Sales'']''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cloud-prod-mod-2',
  (SELECT id FROM courses WHERE slug = 'cloud-productivity' LIMIT 1),
  'Module 2: Google Apps Script & REST Automations',
  2,
  'Write JavaScript macros to connect Sheets, Gmail, and external webhook APIs.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cloud-prod-2-1',
  'cloud-prod-mod-2',
  '2.1 Time-Driven Triggers & Webhooks',
  1,
  'challenge',
  65,
  'Trigger automations on spreadsheet form submit or recurring cron schedules.',
  '### Event-Driven Apps Script
Google Apps Script supports installable triggers:
- `onEdit(e)`: Triggers on cell update.
- `onFormSubmit(e)`: Fires when Google Forms intake is captured.
- `timeDriven()`: Cron triggers every hour/day.',
  '{"initialCode":"trigger = \"onFormSubmit\"\ndef handle_event(e):\n    return f\"EVENT_PROCESSED::{e}\"\n\nprint(handle_event(trigger))\n","expectedOutput":"EVENT_PROCESSED::onFormSubmit","instructions":"Process the form event and print ''EVENT_PROCESSED::onFormSubmit''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cloud-prod-mod-3',
  (SELECT id FROM courses WHERE slug = 'cloud-productivity' LIMIT 1),
  'Module 3: Google Drive Cloud Architecture & Enterprise Access',
  3,
  'Structure Shared Drives with least-privilege role-based access control (RBAC).'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cloud-prod-3-1',
  'cloud-prod-mod-3',
  '3.1 Shared Drive Permissions & Inheritance',
  1,
  'text',
  50,
  'Manager vs Content Manager vs Contributor vs Commenter vs Viewer roles.',
  'Enterprise security requires folder permissions to flow downward through inheritance while restricting sensitive finance and HR partitions using isolated Shared Drives.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'cloud-prod-mod-4',
  (SELECT id FROM courses WHERE slug = 'cloud-productivity' LIMIT 1),
  'Module 4: Automated Intake Pipelines & PDF Invoicing',
  4,
  'Generate styled PDF invoices automatically from Google Docs templates and Sheet rows.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'cloud-prod-4-1',
  'cloud-prod-mod-4',
  '4.1 End-to-End Invoice Automation',
  1,
  'text',
  70,
  'Combine Forms, Sheets, Docs Mail-Merge, and automated PDF emailing.',
  'Automate repetitive invoicing: intake customer orders via Google Forms, log line items to Google Sheets, merge data into a Google Doc template, export to PDF, and dispatch via Gmail.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Java for Beginners (java)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'java',
  'Java for Beginners',
  'java',
  'Master Java fundamentals from syntax and control flow to object-oriented programming. Built according to GeeksforGeeks and W3Schools industry curriculum standards.',
  'Backend',
  'Beginner',
  '10 Weeks',
  40,
  26,
  1,
  'ASCI Engineering Certificate',
  FALSE,
  ARRAY['Java 21', 'JVM', 'javac', 'Maven', 'OOP']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-beg-mod-1',
  (SELECT id FROM courses WHERE slug = 'java' LIMIT 1),
  'Module 1: Hello Java & The JVM Engine',
  1,
  'Understand bytecode compilation, standard output, and the entry point method.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-1-1',
  'java-beg-mod-1',
  '1.1 The Anatomy of a Java Program',
  1,
  'challenge',
  50,
  'Understand public static void main and the standard output stream.',
  '### The Enterprise Foundation
Java is a statically typed, class-based language compiled into platform-independent bytecode (*.class) that runs on any Java Virtual Machine (JVM).

#### Key Components:
- `public class Main`: Defines the top-level container matching the filename.
- `public static void main(String[] args)`: The universal execution entry point.
- `System.out.println(...)`: Prints data to the standard output stream with a trailing newline.

```java
public class Main {
    public static void main(String[] args) {
        System.out.println("HELLO_JAVA");
    }
}
```',
  '{"initialCode":"public class Main {\n    public static void main(String[] args) {\n        System.out.println(\"HELLO_JAVA\");\n    }\n}\n","expectedOutput":"HELLO_JAVA","instructions":"Execute the Java program to output ''HELLO_JAVA''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-1-2',
  'java-beg-mod-1',
  '1.2 JDK vs JRE vs JVM',
  2,
  'text',
  40,
  'Deep dive into the Java runtime hierarchy and platform independence.',
  '### Understanding the Hierarchy

1. **JVM (Java Virtual Machine):** The abstract computing machine that executes bytecode instructions. It handles memory allocation, garbage collection, and hardware abstraction.
2. **JRE (Java Runtime Environment):** Contains the JVM plus the core Java Class Libraries (e.g., `java.lang`, `java.util`) necessary to run compiled applications.
3. **JDK (Java Development Kit):** The full developer bundle including JRE, compiler (`javac`), debugger (`jdb`), and packaging tools (`jar`).

**The WORA Principle (Write Once, Run Anywhere):**
Source Code (`.java`) $\xrightarrow{javac}$ Bytecode (`.class`) $\xrightarrow{JVM}$ Native Machine Code.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-beg-mod-2',
  (SELECT id FROM courses WHERE slug = 'java' LIMIT 1),
  'Module 2: Variables, Data Types & Type Casting',
  2,
  'Master primitive types, reference types, and type conversion mechanics.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-2-1',
  'java-beg-mod-2',
  '2.1 Primitive Data Types & Memory Sizes',
  1,
  'challenge',
  60,
  'Explore 8 primitive data types in Java and their byte representations.',
  '### Java''s 8 Primitive Types
Java strictly reserves memory sizes regardless of host operating system:
- **Integral:** `byte` (8-bit), `short` (16-bit), `int` (32-bit), `long` (64-bit)
- **Floating-point:** `float` (32-bit), `double` (64-bit)
- **Character:** `char` (16-bit Unicode)
- **Boolean:** `boolean` (true/false)

```java
public class Main {
    public static void main(String[] args) {
        int count = 42;
        double price = 19.99;
        System.out.println("TOTAL:" + (count + (int)price));
    }
}
```',
  '{"initialCode":"public class Main {\n    public static void main(String[] args) {\n        int count = 42;\n        int bonus = 8;\n        System.out.println(\"SUM:\" + (count + bonus));\n    }\n}\n","expectedOutput":"SUM:50","instructions":"Sum the integer variables count and bonus, then print ''SUM:50''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-2-2',
  'java-beg-mod-2',
  '2.2 Type Casting: Widening vs Narrowing',
  2,
  'text',
  50,
  'Understand implicit widening and explicit narrowing casts in Java.',
  '### Casting Rules in Java

- **Widening Casting (Automatic):** Smaller type to larger type size:
  `byte` $\to$ `short` $\to$ `char` $\to$ `int` $\to$ `long` $\to$ `float` $\to$ `double`. No data loss.
- **Narrowing Casting (Manual):** Larger type to smaller type size. Requires explicit cast syntax `(type)` and risks truncation or numeric overflow.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-beg-mod-3',
  (SELECT id FROM courses WHERE slug = 'java' LIMIT 1),
  'Module 3: Control Flow & Decision Making',
  3,
  'Branching with if-else, switch expressions, and loop constructs.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-3-1',
  'java-beg-mod-3',
  '3.1 Conditionals & Enhanced Switch Expressions',
  1,
  'challenge',
  65,
  'Utilize modern switch syntax with arrow labels to avoid fall-through bugs.',
  '### Modern Switch Expressions
Java 14+ introduced expression switches that return values and eliminate the need for verbose `break` statements:

```java
int day = 3;
String type = switch (day) {
    case 1, 7 -> "WEEKEND";
    default -> "WEEKDAY";
};
```',
  '{"initialCode":"public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        if (score >= 80) {\n            System.out.println(\"GRADE:A\");\n        } else {\n            System.out.println(\"GRADE:B\");\n        }\n    }\n}\n","expectedOutput":"GRADE:A","instructions":"Evaluate the condition and output ''GRADE:A''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-3-2',
  'java-beg-mod-3',
  '3.2 Loops: For, While, and For-Each',
  2,
  'challenge',
  70,
  'Iterate across collections and arrays using structured loops.',
  '### Loop Iteration in Java
Iterate over sequences using index-based `for` loops, conditional `while` loops, or the enhanced `for-each` loop:

```java
int[] items = {10, 20, 30};
for (int item : items) {
    System.out.println(item);
}
```',
  '{"initialCode":"public class Main {\n    public static void main(String[] args) {\n        int sum = 0;\n        for (int i = 1; i <= 5; i++) {\n            sum += i;\n        }\n        System.out.println(\"ACCUMULATED:\" + sum);\n    }\n}\n","expectedOutput":"ACCUMULATED:15","instructions":"Calculate the sum of numbers from 1 to 5 and print ''ACCUMULATED:15''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-beg-mod-4',
  (SELECT id FROM courses WHERE slug = 'java' LIMIT 1),
  'Module 4: Methods & Array Structures',
  4,
  'Design modular methods with parameter passing and manage fixed-size arrays.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-4-1',
  'java-beg-mod-4',
  '4.1 Method Signatures & Pass-by-Value',
  1,
  'challenge',
  70,
  'Understand that Java is strictly Pass-by-Value for primitives and reference copies.',
  '### Methods & Pass-by-Value
In Java, arguments are **always passed by value**. When passing an object reference, a copy of the pointer address is passed, not the variable itself.

```java
public class Calculator {
    public static int multiply(int a, int b) {
        return a * b;
    }
}
```',
  '{"initialCode":"public class Main {\n    public static int multiply(int a, int b) {\n        return a * b;\n    }\n    public static void main(String[] args) {\n        int res = multiply(6, 7);\n        System.out.println(\"PRODUCT:\" + res);\n    }\n}\n","expectedOutput":"PRODUCT:42","instructions":"Call the multiply method and output ''PRODUCT:42''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-4-2',
  'java-beg-mod-4',
  '4.2 Working with Arrays & Array Manipulation',
  2,
  'challenge',
  75,
  'Declare, initialize, and traverse fixed-length arrays in memory.',
  '### Contiguous Arrays
Java arrays are objects stored in heap memory with fixed capacity determined at instantiation:

```java
int[] nums = new int[]{5, 4, 3, 2, 1};
System.out.println("LENGTH:" + nums.length);
```',
  '{"initialCode":"public class Main {\n    public static void main(String[] args) {\n        int[] vals = {3, 7, 2, 9};\n        int max = vals[0];\n        for (int v : vals) {\n            if (v > max) max = v;\n        }\n        System.out.println(\"MAX:\" + max);\n    }\n}\n","expectedOutput":"MAX:9","instructions":"Find the maximum value in the array and output ''MAX:9''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-beg-mod-5',
  (SELECT id FROM courses WHERE slug = 'java' LIMIT 1),
  'Module 5: Object-Oriented Foundations & Encapsulation',
  5,
  'Design classes, instantiate objects, and protect state with encapsulation.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-5-1',
  'java-beg-mod-5',
  '5.1 Classes, Constructors & Access Modifiers',
  1,
  'challenge',
  80,
  'Encapsulate fields with private access and provide public getters and setters.',
  '### Encapsulation in OOP
Encapsulation bundles data and the methods that act on that data while restricting direct external access:

```java
class User {
    private String username;
    
    public User(String username) {
        this.username = username;
    }
    
    public String getUsername() {
        return this.username;
    }
}
```',
  '{"initialCode":"class User {\n    private String name;\n    public User(String name) { this.name = name; }\n    public String getName() { return this.name; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        User u = new User(\"ALEX\");\n        System.out.println(\"USER:\" + u.getName());\n    }\n}\n","expectedOutput":"USER:ALEX","instructions":"Instantiate the encapsulated User and output ''USER:ALEX''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Java Intermediate: Core & Collections (java-intermediate)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'java-intermediate',
  'Java Intermediate: Core & Collections',
  'java-intermediate',
  'Deep dive into Core Java architectures, Generics, Collections Framework, and algorithms. Grounded in enterprise Java engineering practices.',
  'Backend',
  'Intermediate',
  '12 Weeks',
  48,
  30,
  2,
  'ASCI Engineering Certificate',
  FALSE,
  ARRAY['Java Collections', 'Generics', 'Streams API', 'JUnit 5', 'Lambdas']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-int-mod-1',
  (SELECT id FROM courses WHERE slug = 'java-intermediate' LIMIT 1),
  'Module 1: Polymorphism, Interfaces & Abstract Classes',
  1,
  'Design scalable class hierarchies with dynamic method dispatch and interfaces.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-int-1-1',
  'java-int-mod-1',
  '1.1 Dynamic Method Dispatch & Overriding',
  1,
  'challenge',
  80,
  'Implement runtime polymorphism where a superclass reference points to a subclass instance.',
  '### Runtime Polymorphism
When an overridden method is invoked through a superclass reference, Java determines which implementation to call at runtime based on the actual object type:

```java
interface Service {
    String execute();
}
class BillingService implements Service {
    public String execute() { return "BILLING_PROCESSED"; }
}
```',
  '{"initialCode":"interface Payment { String process(); }\nclass CardPayment implements Payment {\n    public String process() { return \"CARD_OK\"; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Payment p = new CardPayment();\n        System.out.println(p.process());\n    }\n}\n","expectedOutput":"CARD_OK","instructions":"Execute runtime dispatch and print ''CARD_OK''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-int-mod-2',
  (SELECT id FROM courses WHERE slug = 'java-intermediate' LIMIT 1),
  'Module 2: Java Collections Framework — List & Set',
  2,
  'Compare ArrayList vs LinkedList and enforce uniqueness with HashSet.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-int-2-1',
  'java-int-mod-2',
  '2.1 ArrayList vs LinkedList Internal Mechanics',
  1,
  'challenge',
  85,
  'Analyze array resizing amortization vs doubly-linked node pointer overhead.',
  '### List Tradeoffs
- **ArrayList:** Backed by a dynamic array. $O(1)$ indexed access, amortized $O(1)$ append. Slower $O(n)$ insertions at beginning.
- **LinkedList:** Backed by doubly-linked nodes. $O(1)$ prepend/append, but $O(n)$ traversal and high pointer memory overhead.

```java
import java.util.*;
List<String> list = new ArrayList<>();
list.add("ALPHA");
list.add("BETA");
```',
  '{"initialCode":"import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> items = new ArrayList<>();\n        items.add(\"NODE_A\");\n        items.add(\"NODE_B\");\n        System.out.println(\"SIZE:\" + items.size());\n    }\n}\n","expectedOutput":"SIZE:2","instructions":"Add elements to the ArrayList and print ''SIZE:2''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-int-mod-3',
  (SELECT id FROM courses WHERE slug = 'java-intermediate' LIMIT 1),
  'Module 3: Map Architecture & Hashing',
  3,
  'Master HashMap bucket arrays, hash collisions, and red-black tree conversion.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-int-3-1',
  'java-int-mod-3',
  '3.1 HashMap Internal Architecture & Load Factor',
  1,
  'challenge',
  90,
  'Understand hash bucket indexing, hash collision chaining, and treeification.',
  '### Java''s HashMap Architecture
Java''s `HashMap` uses an array of Node buckets. The bucket index is calculated as:
`index = (n - 1) & hash`

When collisions exceed 8 nodes in a bucket, the chain converts to a balanced Red-Black Tree (TreeNode) keeping search bounded to $O(\log n)$.

```java
Map<String, Integer> map = new HashMap<>();
map.put("USERS", 1500);
System.out.println(map.get("USERS"));
```',
  '{"initialCode":"import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> counts = new HashMap<>();\n        counts.put(\"ALPHA\", 10);\n        counts.put(\"BETA\", 25);\n        System.out.println(\"COUNT:\" + (counts.get(\"ALPHA\") + counts.get(\"BETA\")));\n    }\n}\n","expectedOutput":"COUNT:35","instructions":"Store key-value pairs in the HashMap, sum them, and print ''COUNT:35''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-int-mod-4',
  (SELECT id FROM courses WHERE slug = 'java-intermediate' LIMIT 1),
  'Module 4: Generics & Type Safety',
  4,
  'Prevent ClassCastException at runtime using compile-time generics and wildcards.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-int-4-1',
  'java-int-mod-4',
  '4.1 Generic Classes & Type Erasure',
  1,
  'challenge',
  85,
  'Implement a generic container and observe type erasure behavior during bytecode compilation.',
  '### Generic Type Invariance
In Java, generics ensure type safety at compile time. At runtime, the JVM strips generic type metadata through **type erasure**, replacing unbound type parameters with `Object`.

```java
class Box<T> {
    private T value;
    public Box(T value) { this.value = value; }
    public T getValue() { return value; }
}
```',
  '{"initialCode":"class Box<T> {\n    private T item;\n    public Box(T item) { this.item = item; }\n    public T getItem() { return item; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Box<String> box = new Box<>(\"PAYLOAD_OK\");\n        System.out.println(box.getItem());\n    }\n}\n","expectedOutput":"PAYLOAD_OK","instructions":"Retrieve the generic value from the Box and output ''PAYLOAD_OK''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-int-mod-5',
  (SELECT id FROM courses WHERE slug = 'java-intermediate' LIMIT 1),
  'Module 5: Exception Handling & Resource Management',
  5,
  'Handle checked vs unchecked exceptions and utilize try-with-resources for leak-proof cleanup.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-int-5-1',
  'java-int-mod-5',
  '5.1 Try-Catch-Finally & AutoCloseable',
  1,
  'challenge',
  80,
  'Automatically close streams and connections implementing AutoCloseable.',
  '### Try-With-Resources
Introduced in Java 7, try-with-resources guarantees that any resource implementing `java.lang.AutoCloseable` is safely closed when the block exits, even if exceptions occur.

```java
try (var stream = new ByteArrayInputStream("DATA".getBytes())) {
    System.out.println("READING");
}
```',
  '{"initialCode":"public class Main {\n    public static void main(String[] args) {\n        try {\n            int x = 10 / 2;\n            System.out.println(\"RESULT:\" + x);\n        } catch (ArithmeticException e) {\n            System.out.println(\"ERROR\");\n        }\n    }\n}\n","expectedOutput":"RESULT:5","instructions":"Safely execute the division inside try-catch and output ''RESULT:5''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-int-mod-6',
  (SELECT id FROM courses WHERE slug = 'java-intermediate' LIMIT 1),
  'Module 6: Streams API & Lambda Expressions',
  6,
  'Process collections declaratively with filter, map, flatMap, and reduce pipelines.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-int-6-1',
  'java-int-mod-6',
  '6.1 Stream Pipeline Transformations',
  1,
  'challenge',
  95,
  'Transform and filter collections using functional method references.',
  '### Functional Java Streams
A Stream pipeline consists of a source, zero or more intermediate operations (lazy), and a terminal operation (eager).

```java
List<Integer> numbers = List.of(1, 2, 3, 4, 5, 6);
int sum = numbers.stream()
    .filter(n -> n % 2 == 0)
    .mapToInt(n -> n * 10)
    .sum();
System.out.println("SUM:" + sum);
```',
  '{"initialCode":"import java.util.*;\nimport java.util.stream.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<String> names = List.of(\"alice\", \"bob\", \"alex\");\n        long count = names.stream()\n            .filter(s -> s.startsWith(\"a\"))\n            .count();\n        System.out.println(\"MATCHES:\" + count);\n    }\n}\n","expectedOutput":"MATCHES:2","instructions":"Filter names starting with ''a'' and output ''MATCHES:2''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: Java Advanced: Architecture & Frameworks (java-advanced)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'java-advanced',
  'Java Advanced: Architecture & Frameworks',
  'java-advanced',
  'Design Patterns, Concurrency, JVM Internals, and Spring Boot for production-grade engineering.',
  'Backend',
  'Advanced',
  '14 Weeks',
  60,
  28,
  3,
  'ASCI Master Architect Credential',
  TRUE,
  ARRAY['Spring Boot 3', 'Java 21', 'Virtual Threads', 'JPA/Hibernate', 'Docker', 'PostgreSQL']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-adv-mod-1',
  (SELECT id FROM courses WHERE slug = 'java-advanced' LIMIT 1),
  'Module 1: Concurrency & Virtual Threads (Project Loom)',
  1,
  'Scale to millions of concurrent tasks with Java 21 Virtual Threads.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-adv-1-1',
  'java-adv-mod-1',
  '1.1 Platform Threads vs Virtual Threads',
  1,
  'challenge',
  90,
  'Contrast OS-bound platform threads with user-mode virtual threads mounted on carrier threads.',
  '### High-Throughput Concurrency
Traditional platform threads wrap OS threads, each consuming ~1MB of memory and limited to thousands per machine. Java 21 **Virtual Threads** are lightweight user-mode threads managed directly by the JVM, enabling 1,000,000+ concurrent tasks.

```java
Runnable task = () -> System.out.println("CONCURRENT_OK");
Thread.startVirtualThread(task);
```',
  '{"initialCode":"public class Main {\n    public static void main(String[] args) {\n        Runnable r = () -> System.out.println(\"THREAD_EXECUTED\");\n        Thread t = new Thread(r);\n        t.start();\n        try { t.join(); } catch (Exception e) {}\n    }\n}\n","expectedOutput":"THREAD_EXECUTED","instructions":"Start the concurrent task, await completion, and print ''THREAD_EXECUTED''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-adv-mod-2',
  (SELECT id FROM courses WHERE slug = 'java-advanced' LIMIT 1),
  'Module 2: JVM Architecture & Garbage Collection Tuning',
  2,
  'Master young/old generational memory, ZGC, G1GC, and JIT compilation.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-adv-2-1',
  'java-adv-mod-2',
  '2.1 Generational Heap & GC Collectors',
  1,
  'text',
  85,
  'Analyze Eden, Survivor spaces, Tenured generation, and ultra-low latency ZGC.',
  '### JVM Memory Layout

1. **Young Generation:** Composed of Eden and two Survivor spaces ($S_0, S_1$). Minor GC frees short-lived objects.
2. **Old (Tenured) Generation:** Objects surviving multiple GC cycles migrate here.
3. **Metaspace:** Stores class definitions and constant pools in native off-heap memory.

**Modern Garbage Collectors:**
- **G1GC:** Default general-purpose collector partitioning heap into uniform regions.
- **ZGC:** Sub-millisecond pause-time collector utilizing colored pointers and load barriers.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-adv-mod-3',
  (SELECT id FROM courses WHERE slug = 'java-advanced' LIMIT 1),
  'Module 3: Enterprise Design Patterns',
  3,
  'Implement Singleton, Factory, Builder, and Strategy patterns cleanly in modern Java.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-adv-3-1',
  'java-adv-mod-3',
  '3.1 The Builder Pattern with Fluent API',
  1,
  'challenge',
  90,
  'Construct complex immutable domain objects with method chaining.',
  '### Builder Pattern
The Builder pattern solves telescoping constructors and ensures immutability for objects with many optional attributes:

```java
class Request {
    private final String url;
    private final int timeout;
    
    public static class Builder {
        private String url;
        private int timeout = 5000;
        public Builder url(String u) { this.url = u; return this; }
        public Request build() { return new Request(this); }
    }
}
```',
  '{"initialCode":"class Config {\n    private final String host;\n    public Config(String host) { this.host = host; }\n    public String getHost() { return host; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Config c = new Config(\"prod.internal.asci.ai\");\n        System.out.println(\"CONFIG_HOST:\" + c.getHost());\n    }\n}\n","expectedOutput":"CONFIG_HOST:prod.internal.asci.ai","instructions":"Instantiate the immutable Config and output ''CONFIG_HOST:prod.internal.asci.ai''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-adv-mod-4',
  (SELECT id FROM courses WHERE slug = 'java-advanced' LIMIT 1),
  'Module 4: Spring Boot 3 Core & Inversion of Control',
  4,
  'Build reactive, cloud-native services with Spring ApplicationContext and Dependency Injection.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-adv-4-1',
  'java-adv-mod-4',
  '4.1 Inversion of Control (IoC) & Component Scanning',
  1,
  'text',
  95,
  'Understand Spring''s IoC container, bean lifecycle, and dependency injection.',
  '### Inversion of Control
Instead of components manually instantiating their dependencies (`new Service()`), control is inverted to Spring''s `ApplicationContext`.
- `@Component`, `@Service`, `@Repository`: Marks managed beans.
- Constructor Injection: Favored over field injection for testability and immutability.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-adv-mod-5',
  (SELECT id FROM courses WHERE slug = 'java-advanced' LIMIT 1),
  'Module 5: Spring Data JPA, Hibernate & Transactions',
  5,
  'Model relational database schemas with JPA entities and declarative @Transactional boundaries.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-adv-5-1',
  'java-adv-mod-5',
  '5.1 Entity Relationships & N+1 Problem Prevention',
  1,
  'text',
  100,
  'Optimize ORM queries with JOIN FETCH and understand first/second-level Hibernate caches.',
  '### Solving the N+1 Query Dilemma
When fetching a parent entity with lazy collection relationships, naive queries trigger 1 query for the parent plus $N$ queries for each child.
Use **JOIN FETCH** in JPQL or `@EntityGraph` to load associations in a single round-trip SQL statement.',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'java-adv-mod-6',
  (SELECT id FROM courses WHERE slug = 'java-advanced' LIMIT 1),
  'Module 6: Production REST APIs & Spring Security',
  6,
  'Implement secure REST controllers with JWT validation and RFC 7807 problem details.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'java-adv-6-1',
  'java-adv-mod-6',
  '6.1 REST Controller Endpoints & Input Validation',
  1,
  'text',
  100,
  'Build robust REST APIs using @RestController, @Valid, and global exception advice.',
  '### Enterprise REST Principles
- **HTTP Semantics:** Idempotent GET, PUT, DELETE; non-idempotent POST.
- **DTO Projection:** Never expose JPA domain entities directly to API consumers.
- **Validation:** Use Jakarta Bean Validation (`@NotNull`, `@Size`, `@Email`).',
  NULL
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: DSA for Beginners (dsa)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'dsa',
  'DSA for Beginners',
  'dsa',
  'Start your DSA journey from scratch. Think algorithmically with flowcharts, patterns, and Big-O asymptotic analysis. Built on GeeksforGeeks foundational standards.',
  'DSA',
  'Beginner',
  'Self-Paced',
  30,
  24,
  1,
  'ASCI Algorithmic Badge',
  FALSE,
  ARRAY['Python', 'Java', 'Big-O Notation', 'Visualizer', 'Pseudocode']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-beg-mod-1',
  (SELECT id FROM courses WHERE slug = 'dsa' LIMIT 1),
  'Module 1: Algorithmic Thinking & Asymptotic Analysis',
  1,
  'Analyze code efficiency mathematically using Big-O time and space complexity.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-1-1',
  'dsa-beg-mod-1',
  '1.1 Introduction to Big-O Notation',
  1,
  'challenge',
  50,
  'Measure algorithmic growth rates from constant $O(1)$ to quadratic $O(n^2)$.',
  '### Understanding Computational Complexity
Big-O notation describes the upper bound on the time or memory space required by an algorithm as input size $n$ grows toward infinity:
- $O(1)$: Constant time (array lookup by index).
- $O(\log n)$: Logarithmic time (binary search).
- $O(n)$: Linear time (single pass through array).
- $O(n \log n)$: Linearithmic time (merge sort).
- $O(n^2)$: Quadratic time (nested comparison loops).

```python
def find_first(arr):
    return arr[0]  # O(1)
```',
  '{"initialCode":"def get_first_element(nums):\n    # Return the first element in O(1) time\n    return nums[0]\n\nprint(\"FIRST:\", get_first_element([42, 99, 100]))\n","expectedOutput":"FIRST: 42","instructions":"Return the first element of the list and print ''FIRST: 42''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-beg-mod-2',
  (SELECT id FROM courses WHERE slug = 'dsa' LIMIT 1),
  'Module 2: Arrays & Memory Contiguity',
  2,
  'Explore cache locality, index arithmetic, and array reversal techniques.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-2-1',
  'dsa-beg-mod-2',
  '2.1 In-Place Array Reversal',
  1,
  'challenge',
  65,
  'Reverse an array in $O(n)$ time and $O(1)$ auxiliary space.',
  '### Two-Pointer In-Place Reversal
By maintaining a pointer at the start (`left`) and end (`right`), swap elements while converging toward the center:

```python
def reverse_array(arr):
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1
    return arr
```',
  '{"initialCode":"arr = [1, 2, 3, 4, 5]\n# Reverse in-place\narr.reverse()\nprint(\"REVERSED:\", arr)\n","expectedOutput":"REVERSED: [5, 4, 3, 2, 1]","instructions":"Reverse the array and print ''REVERSED: [5, 4, 3, 2, 1]''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-beg-mod-3',
  (SELECT id FROM courses WHERE slug = 'dsa' LIMIT 1),
  'Module 3: Strings & Two-Pointer Patterns',
  3,
  'Apply symmetric scanning to validate palindromes and detect substrings.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-3-1',
  'dsa-beg-mod-3',
  '3.1 Palindrome Verification Pattern',
  1,
  'challenge',
  70,
  'Check if a string reads the same forwards and backwards in $O(n)$ time.',
  '### Palindrome Verification
Compare character characters from opposite ends of the string. If any mismatch occurs, terminate early with false:

```python
def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True
```',
  '{"initialCode":"def is_palindrome(word: str) -> bool:\n    return word == word[::-1]\n\nprint(\"RADAR:\", is_palindrome(\"radar\"))\n","expectedOutput":"RADAR: True","instructions":"Check if ''radar'' is a palindrome and output ''RADAR: True''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-beg-mod-4',
  (SELECT id FROM courses WHERE slug = 'dsa' LIMIT 1),
  'Module 4: Recursion & Mathematical Algorithms',
  4,
  'Understand the call stack, base cases, and Euclid''s Greatest Common Divisor.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-4-1',
  'dsa-beg-mod-4',
  '4.1 Recursion Mechanics & Euclid''s GCD',
  1,
  'challenge',
  75,
  'Compute the Greatest Common Divisor using Euclid''s recursive algorithm in $O(\log(\min(a, b)))$.',
  '### Euclidean Algorithm
The greatest common divisor of two integers $a$ and $b$ ($a > b$) equals the GCD of $b$ and $a \pmod b$:
$$\gcd(a, b) = \gcd(b, a \pmod b)$$
Base case: $\gcd(a, 0) = a$.

```python
def gcd(a: int, b: int) -> int:
    return a if b == 0 else gcd(b, a % b)
```',
  '{"initialCode":"def gcd(a, b):\n    while b != 0:\n        a, b = b, a % b\n    return a\n\nprint(\"GCD:\", gcd(48, 18))\n","expectedOutput":"GCD: 6","instructions":"Compute the GCD of 48 and 18 and print ''GCD: 6''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-beg-mod-5',
  (SELECT id FROM courses WHERE slug = 'dsa' LIMIT 1),
  'Module 5: Search Algorithms — Linear vs Binary Search',
  5,
  'Transform $O(n)$ sequential search into $O(\log n)$ divide-and-conquer binary search.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-5-1',
  'dsa-beg-mod-5',
  '5.1 Binary Search on Sorted Arrays',
  1,
  'challenge',
  80,
  'Halve the search space iteratively to find target elements in $O(\log n)$.',
  '### Binary Search Principles
On an array sorted in ascending order, binary search compares the target with the middle element:
- If target == mid: return index.
- If target < mid: search left half (`right = mid - 1`).
- If target > mid: search right half (`left = mid + 1`).

```python
def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
```',
  '{"initialCode":"def binary_search(nums, target):\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1\n\nidx = binary_search([10, 20, 30, 40, 50], 40)\nprint(\"INDEX:\", idx)\n","expectedOutput":"INDEX: 3","instructions":"Execute binary search to find target 40 at index 3 and print ''INDEX: 3''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: DSA Intermediate: Core Data Structures (dsa-intermediate)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'dsa-intermediate',
  'DSA Intermediate: Core Data Structures',
  'dsa-intermediate',
  'Master Trees, Graphs, Hash Tables, and Greedy algorithms that power scalable architectures. GeeksforGeeks intermediate syllabus.',
  'DSA',
  'Intermediate',
  'Self-Paced',
  54,
  32,
  2,
  'ASCI Algorithmic Badge',
  FALSE,
  ARRAY['Linked Lists', 'Binary Trees', 'Graphs', 'Hash Tables', 'Heaps']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-int-mod-1',
  (SELECT id FROM courses WHERE slug = 'dsa-intermediate' LIMIT 1),
  'Module 1: Singly & Doubly Linked Lists',
  1,
  'Pointer manipulation, cycle detection (Floyd''s Tortoise and Hare), and reversals.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-int-1-1',
  'dsa-int-mod-1',
  '1.1 Reversing a Singly Linked List',
  1,
  'challenge',
  85,
  'Iteratively reverse node pointers in $O(n)$ time and $O(1)$ space.',
  '### Pointer Reversal
Keep track of three pointers: `prev`, `curr`, and `next_temp`. At each node, redirect `curr.next = prev`.

```python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
```',
  '{"initialCode":"class Node:\n    def __init__(self, val, next=None):\n        self.val = val\n        self.next = next\n\n# Create 1 -> 2 -> 3\nhead = Node(1, Node(2, Node(3)))\ncurr, prev = head, None\nwhile curr:\n    nxt = curr.next\n    curr.next = prev\n    prev = curr\n    curr = nxt\n\nprint(\"NEW_HEAD:\", prev.val)\n","expectedOutput":"NEW_HEAD: 3","instructions":"Reverse the 3-node list and print the new head value ''NEW_HEAD: 3''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-int-mod-2',
  (SELECT id FROM courses WHERE slug = 'dsa-intermediate' LIMIT 1),
  'Module 2: Stacks & Queues',
  2,
  'LIFO vs FIFO mechanics, valid parentheses checking, and sliding window maximum.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-int-2-1',
  'dsa-int-mod-2',
  '2.1 Balanced Parentheses Matching with Stack',
  1,
  'challenge',
  80,
  'Validate bracket balancing using a Last-In, First-Out (LIFO) stack.',
  '### Stack Bracket Verification
Push opening brackets onto the stack. When a closing bracket is encountered, verify that the top element of the stack matches the expected pair.

```python
def is_valid_brackets(s: str) -> bool:
    mapping = {")": "(", "}": "{", "]": "["}
    stack = []
    for char in s:
        if char in mapping:
            top = stack.pop() if stack else ''#''
            if mapping[char] != top:
                return False
        else:
            stack.append(char)
    return not stack
```',
  '{"initialCode":"def is_valid(s):\n    pairs = {\")\": \"(\", \"]\": \"[\"}\n    stack = []\n    for ch in s:\n        if ch in pairs.values():\n            stack.append(ch)\n        elif ch in pairs:\n            if not stack or stack.pop() != pairs[ch]:\n                return False\n    return len(stack) == 0\n\nprint(\"BALANCED:\", is_valid(\"()[[]]\"))\n","expectedOutput":"BALANCED: True","instructions":"Check if the bracket sequence is valid and print ''BALANCED: True''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-int-mod-3',
  (SELECT id FROM courses WHERE slug = 'dsa-intermediate' LIMIT 1),
  'Module 3: Hash Tables & Collision Strategies',
  3,
  'Internal mechanics of hash functions, load factors, separate chaining, and open addressing.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-int-3-1',
  'dsa-int-mod-3',
  '3.1 Two-Sum via Hash Map Lookup',
  1,
  'challenge',
  85,
  'Achieve $O(n)$ time complexity for Two-Sum using a complement hash table.',
  '### Hash Table Lookup Optimization
Instead of $O(n^2)$ nested loops, store each number''s index in a hash map. For each element $x$, check if target $- x$ already exists in the table in $O(1)$ average time.

```python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
```',
  '{"initialCode":"def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        diff = target - n\n        if diff in seen:\n            return [seen[diff], i]\n        seen[n] = i\n\nres = two_sum([2, 7, 11, 15], 9)\nprint(\"INDICES:\", res)\n","expectedOutput":"INDICES: [0, 1]","instructions":"Find the indices summing to target 9 and print ''INDICES: [0, 1]''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-int-mod-4',
  (SELECT id FROM courses WHERE slug = 'dsa-intermediate' LIMIT 1),
  'Module 4: Binary Trees & Tree Traversals',
  4,
  'Master Inorder, Preorder, Postorder, and Breadth-First Level-Order traversals.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-int-4-1',
  'dsa-int-mod-4',
  '4.1 Level-Order Traversal (BFS) using Queue',
  1,
  'challenge',
  90,
  'Traverse tree nodes level by level using a FIFO queue.',
  '### Level-Order Traversal
Breadth-First Search (BFS) explores tree nodes row by row:
1. Enqueue the root.
2. While queue is not empty, dequeue node, visit it, and enqueue non-null left and right children.

```python
from collections import deque
def level_order(root):
    if not root: return []
    res, queue = [], deque([root])
    while queue:
        node = queue.popleft()
        res.append(node.val)
        if node.left: queue.append(node.left)
        if node.right: queue.append(node.right)
    return res
```',
  '{"initialCode":"from collections import deque\nclass TreeNode:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\nroot = TreeNode(1, TreeNode(2), TreeNode(3))\nres = []\nq = deque([root])\nwhile q:\n    node = q.popleft()\n    res.append(node.val)\n    if node.left: q.append(node.left)\n    if node.right: q.append(node.right)\n\nprint(\"TRAVERSAL:\", res)\n","expectedOutput":"TRAVERSAL: [1, 2, 3]","instructions":"Execute BFS level order traversal and print ''TRAVERSAL: [1, 2, 3]''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-int-mod-5',
  (SELECT id FROM courses WHERE slug = 'dsa-intermediate' LIMIT 1),
  'Module 5: Binary Search Trees (BST)',
  5,
  'Search, insertion, deletion, and validation of the Binary Search Tree invariant.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-int-5-1',
  'dsa-int-mod-5',
  '5.1 Validate Binary Search Tree Invariant',
  1,
  'challenge',
  90,
  'Ensure all left descendants are strictly less than root, and right descendants strictly greater.',
  '### BST Invariant
For every node $N$ with lower bound $L$ and upper bound $H$:
$$L < N.\text{val} < H$$

```python
def isValidBST(root, low=float(''-inf''), high=float(''inf'')):
    if not root: return True
    if not (low < root.val < high): return False
    return isValidBST(root.left, low, root.val) and isValidBST(root.right, root.val, high)
```',
  '{"initialCode":"class Node:\n    def __init__(self, val, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef is_valid_bst(node, low=float(''-inf''), high=float(''inf'')):\n    if not node: return True\n    if not (low < node.val < high): return False\n    return is_valid_bst(node.left, low, node.val) and is_valid_bst(node.right, node.val, high)\n\ntree = Node(2, Node(1), Node(3))\nprint(\"VALID_BST:\", is_valid_bst(tree))\n","expectedOutput":"VALID_BST: True","instructions":"Validate the BST tree and print ''VALID_BST: True''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-int-mod-6',
  (SELECT id FROM courses WHERE slug = 'dsa-intermediate' LIMIT 1),
  'Module 6: Heaps & Priority Queues',
  6,
  'Binary heaps, heapify operations, and finding Top-K elements in $O(n \log k)$.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-int-6-1',
  'dsa-int-mod-6',
  '6.1 Min-Heap Top-K Elements',
  1,
  'challenge',
  95,
  'Maintain a min-heap of size $k$ to identify the $k$ largest elements in streaming data.',
  '### Min-Heap Top-K Pattern
By keeping a Min-Heap capped at capacity $k$, smaller elements are popped off the top in $O(\log k)$, leaving the $k$ largest values:

```python
import heapq
def findKthLargest(nums, k):
    return heapq.nlargest(k, nums)[-1]
```',
  '{"initialCode":"import heapq\nnums = [3, 2, 1, 5, 6, 4]\nk = 2\nheap = []\nfor n in nums:\n    heapq.heappush(heap, n)\n    if len(heap) > k:\n        heapq.heappop(heap)\nprint(\"KTH_LARGEST:\", heap[0])\n","expectedOutput":"KTH_LARGEST: 5","instructions":"Find the 2nd largest element using a min-heap and output ''KTH_LARGEST: 5''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-int-mod-7',
  (SELECT id FROM courses WHERE slug = 'dsa-intermediate' LIMIT 1),
  'Module 7: Graphs — Representations & Traversals',
  7,
  'Adjacency list representations, Breadth-First Search (BFS), and Depth-First Search (DFS).'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-int-7-1',
  'dsa-int-mod-7',
  '7.1 Graph BFS Shortest Path in Unweighted Graph',
  1,
  'challenge',
  100,
  'Find the minimum number of edge hops between source and target vertices using BFS.',
  '### Unweighted Shortest Path with BFS
BFS explores vertices in order of increasing distance from the starting node, guaranteeing the first time target $T$ is dequeued, it is reached in minimum edges:

```python
from collections import deque
def bfs_shortest_path(graph, start, target):
    queue = deque([(start, 0)])
    visited = {start}
    while queue:
        curr, dist = queue.popleft()
        if curr == target: return dist
        for neighbor in graph.get(curr, []):
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append((neighbor, dist + 1))
    return -1
```',
  '{"initialCode":"from collections import deque\ngraph = {\n    \"A\": [\"B\", \"C\"],\n    \"B\": [\"D\"],\n    \"C\": [\"D\"],\n    \"D\": []\n}\nq = deque([(\"A\", 0)])\nvisited = {\"A\"}\nfound_dist = -1\nwhile q:\n    curr, dist = q.popleft()\n    if curr == \"D\":\n        found_dist = dist\n        break\n    for nxt in graph[curr]:\n        if nxt not in visited:\n            visited.add(nxt)\n            q.append((nxt, dist + 1))\n\nprint(\"SHORTEST_DIST:\", found_dist)\n","expectedOutput":"SHORTEST_DIST: 2","instructions":"Compute the shortest path distance from A to D and print ''SHORTEST_DIST: 2''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

-- ----------------------------------------------------------------------------
-- Course: DSA Advanced: Algorithmic Paradigms (dsa-advanced)
-- ----------------------------------------------------------------------------
INSERT INTO courses (id, title, slug, description, category, level, weeks, duration_hours, lessons, projects, certificate, is_premium, tools)
VALUES (
  'dsa-advanced',
  'DSA Advanced: Algorithmic Paradigms',
  'dsa-advanced',
  'Conquer Dynamic Programming, Advanced Graph theory, Trie data structures, and FAANG-caliber interview problems.',
  'DSA',
  'Advanced',
  'Self-Paced',
  60,
  30,
  3,
  'ASCI Master Algorithmic Fellow',
  TRUE,
  ARRAY['Dynamic Programming', 'Dijkstra', 'Bellman-Ford', 'Trie', 'Segment Trees', 'DSU']::TEXT[]
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  level = EXCLUDED.level,
  weeks = EXCLUDED.weeks,
  duration_hours = EXCLUDED.duration_hours,
  lessons = EXCLUDED.lessons,
  projects = EXCLUDED.projects,
  certificate = EXCLUDED.certificate,
  is_premium = EXCLUDED.is_premium,
  tools = EXCLUDED.tools;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-adv-mod-1',
  (SELECT id FROM courses WHERE slug = 'dsa-advanced' LIMIT 1),
  'Module 1: Dynamic Programming — 1D & Memoization',
  1,
  'Deconstruct overlapping subproblems and optimal substructure into memoized solutions.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-adv-1-1',
  'dsa-adv-mod-1',
  '1.1 Coin Change Minimum Coins (Tabulation)',
  1,
  'challenge',
  100,
  'Solve the unbounded coin change problem in $O(n \times \text{amount})$ using 1D DP tabulation.',
  '### 1D DP State Definition
Let $dp[i]$ denote the minimum coins needed to form amount $i$:
$$dp[i] = \min_{c \in coins} (dp[i - c] + 1) \quad \text{for } i \ge c$$
Base case: $dp[0] = 0$.

```python
def coinChange(coins, amount):
    dp = [float(''inf'')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for c in coins:
            if i >= c:
                dp[i] = min(dp[i], dp[i - c] + 1)
    return dp[amount] if dp[amount] != float(''inf'') else -1
```',
  '{"initialCode":"coins = [1, 2, 5]\namount = 11\ndp = [float(''inf'')] * (amount + 1)\ndp[0] = 0\nfor i in range(1, amount + 1):\n    for c in coins:\n        if i >= c:\n            dp[i] = min(dp[i], dp[i - c] + 1)\nprint(\"MIN_COINS:\", dp[amount])\n","expectedOutput":"MIN_COINS: 3","instructions":"Compute the minimum coins needed to make 11 and print ''MIN_COINS: 3''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-adv-mod-2',
  (SELECT id FROM courses WHERE slug = 'dsa-advanced' LIMIT 1),
  'Module 2: 2D Dynamic Programming — 0/1 Knapsack',
  2,
  'Analyze item inclusion/exclusion state transitions in multidimensional DP.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-adv-2-1',
  'dsa-adv-mod-2',
  '2.1 The Classic 0/1 Knapsack Problem',
  1,
  'challenge',
  110,
  'Maximize value within weight constraint $W$ using state $dp[i][w]$.',
  '### 0/1 Knapsack Transition
At item $i$ with weight $w_i$ and value $v_i$:
$$dp[i][w] = \max(dp[i-1][w], dp[i-1][w - w_i] + v_i)$$

```python
def knapsack(weights, values, W):
    n = len(weights)
    dp = [0] * (W + 1)
    for i in range(n):
        for w in range(W, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    return dp[W]
```',
  '{"initialCode":"weights = [2, 3, 4, 5]\nvalues = [3, 4, 5, 6]\nW = 5\ndp = [0] * (W + 1)\nfor w_i, v_i in zip(weights, values):\n    for w in range(W, w_i - 1, -1):\n        dp[w] = max(dp[w], dp[w - w_i] + v_i)\nprint(\"MAX_VALUE:\", dp[W])\n","expectedOutput":"MAX_VALUE: 7","instructions":"Calculate the maximum knapsack value for weight 5 and print ''MAX_VALUE: 7''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-adv-mod-3',
  (SELECT id FROM courses WHERE slug = 'dsa-advanced' LIMIT 1),
  'Module 3: Advanced Graph Algorithms — Shortest Paths & MST',
  3,
  'Dijkstra''s priority-queue shortest path, Bellman-Ford negative edge handling, and Kruskal''s MST.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-adv-3-1',
  'dsa-adv-mod-3',
  '3.1 Dijkstra''s Shortest Path Algorithm',
  1,
  'challenge',
  120,
  'Compute single-source shortest path on non-negative weighted graphs in $O((V + E) \log V)$.',
  '### Dijkstra with Min-Priority Queue
Maintain tentative distances initialized to $\infty$. Relax edges greedily using a binary heap:

```python
import heapq
def dijkstra(graph, start):
    distances = {node: float(''inf'') for node in graph}
    distances[start] = 0
    pq = [(0, start)]
    while pq:
        dist, node = heapq.heappop(pq)
        if dist > distances[node]: continue
        for neighbor, weight in graph[node]:
            new_d = dist + weight
            if new_d < distances[neighbor]:
                distances[neighbor] = new_d
                heapq.heappush(pq, (new_d, neighbor))
    return distances
```',
  '{"initialCode":"import heapq\ngraph = {\n    \"A\": [(\"B\", 1), (\"C\", 4)],\n    \"B\": [(\"C\", 2), (\"D\", 5)],\n    \"C\": [(\"D\", 1)],\n    \"D\": []\n}\ndistances = {k: float(''inf'') for k in graph}\ndistances[\"A\"] = 0\npq = [(0, \"A\")]\nwhile pq:\n    d, u = heapq.heappop(pq)\n    if d > distances[u]: continue\n    for v, w in graph[u]:\n        if d + w < distances[v]:\n            distances[v] = d + w\n            heapq.heappush(pq, (d + w, v))\nprint(\"DIST_A_TO_D:\", distances[\"D\"])\n","expectedOutput":"DIST_A_TO_D: 4","instructions":"Compute Dijkstra shortest path from A to D and output ''DIST_A_TO_D: 4''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-adv-mod-4',
  (SELECT id FROM courses WHERE slug = 'dsa-advanced' LIMIT 1),
  'Module 4: Backtracking & State Space Pruning',
  4,
  'Exhaustive exploration with pruning: N-Queens problem and Sudoku solver.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-adv-4-1',
  'dsa-adv-mod-4',
  '4.1 N-Queens Backtracking Solver',
  1,
  'challenge',
  110,
  'Place $N$ non-attacking queens on an $N \times N$ board using column and diagonal bitmasks.',
  '### Backtracking Search Space
Place queens row by row. At each step, prune branches if the column, main diagonal ($r - c$), or anti-diagonal ($r + c$) is already occupied:

```python
def solveNQueens(n):
    cols, diag1, diag2 = set(), set(), set()
    count = 0
    def backtrack(r):
        nonlocal count
        if r == n:
            count += 1
            return
        for c in range(n):
            if c in cols or (r - c) in diag1 or (r + c) in diag2:
                continue
            cols.add(c); diag1.add(r - c); diag2.add(r + c)
            backtrack(r + 1)
            cols.remove(c); diag1.remove(r - c); diag2.remove(r + c)
    backtrack(0)
    return count
```',
  '{"initialCode":"def count_n_queens(n):\n    cols, d1, d2 = set(), set(), set()\n    ans = [0]\n    def solve(r):\n        if r == n:\n            ans[0] += 1\n            return\n        for c in range(n):\n            if c in cols or (r-c) in d1 or (r+c) in d2: continue\n            cols.add(c); d1.add(r-c); d2.add(r+c)\n            solve(r + 1)\n            cols.remove(c); d1.remove(r-c); d2.remove(r+c)\n    solve(0)\n    return ans[0]\n\nprint(\"4_QUEENS_SOLUTIONS:\", count_n_queens(4))\n","expectedOutput":"4_QUEENS_SOLUTIONS: 2","instructions":"Count total distinct solutions for 4-Queens and print ''4_QUEENS_SOLUTIONS: 2''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

INSERT INTO modules (id, course_id, title, sequence_order, description)
VALUES (
  'dsa-adv-mod-5',
  (SELECT id FROM courses WHERE slug = 'dsa-advanced' LIMIT 1),
  'Module 5: Trie (Prefix Tree) & Advanced String Search',
  5,
  'Implement retrieval trees (Tries) for instant $O(L)$ prefix matching and autocomplete.'
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  description = EXCLUDED.description;

INSERT INTO lessons (id, module_id, title, sequence_order, content_type, xp_reward, description, content, challenge_data)
VALUES (
  'dsa-adv-5-1',
  'dsa-adv-mod-5',
  '5.1 Trie Insert and Prefix Search',
  1,
  'challenge',
  100,
  'Build a Trie where search time depends only on word length $L$, independent of dictionary size.',
  '### Trie Architecture
A Trie is an $n$-ary tree where edges represent characters. Nodes maintain a flag `is_end` denoting word termination:

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word: str):
        curr = self.root
        for ch in word:
            if ch not in curr.children:
                curr.children[ch] = TrieNode()
            curr = curr.children[ch]
        curr.is_end = True
```',
  '{"initialCode":"class TrieNode:\n    def __init__(self):\n        self.children = {}\n        self.is_end = False\n\nclass Trie:\n    def __init__(self):\n        self.root = TrieNode()\n    def insert(self, word):\n        curr = self.root\n        for ch in word:\n            if ch not in curr.children:\n                curr.children[ch] = TrieNode()\n            curr = curr.children[ch]\n        curr.is_end = True\n    def startsWith(self, prefix):\n        curr = self.root\n        for ch in prefix:\n            if ch not in curr.children:\n                return False\n            curr = curr.children[ch]\n        return True\n\nt = Trie()\nt.insert(\"apple\")\nprint(\"PREFIX_APP:\", t.startsWith(\"app\"))\n","expectedOutput":"PREFIX_APP: True","instructions":"Insert ''apple'' into the Trie, check if prefix ''app'' exists, and print ''PREFIX_APP: True''."}'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  sequence_order = EXCLUDED.sequence_order,
  content_type = EXCLUDED.content_type,
  xp_reward = EXCLUDED.xp_reward,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  challenge_data = EXCLUDED.challenge_data;

COMMIT;
