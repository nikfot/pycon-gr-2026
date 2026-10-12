---
theme: default
title: "Sophia Means Wisdom: A Multi-Tenant AI Engineering Assistant Using Elasticsearch as RAG"
titleTemplate: "%s · PyCon Greece"
info: |
  A practical story about RAG, context engineering, Elasticsearch,
  Pydantic AI, MCP, and bounded agent workflows.
author: Nikos Fotiou
colorSchema: light
transition: slide-left
mdc: true
lineNumbers: false
routerMode: hash
drawings:
  persist: false
---

<div class="eyebrow">PyCon Greece</div>
<img class="hero-logo" src="/sophia-logo.jpg" alt="Sophia owl logo">

# Sophia Means Wisdom

## A Multi-Tenant AI Engineering Assistant<br>Using Elasticsearch as RAG

<div style="margin-top: 1.7rem">
  <span class="pill active">15:20–15:50</span>
  <span class="pill">Auditorium “Miltiadis Evert”</span>
  <span class="pill">30 min</span>
</div>

<div class="footer-link">Nikos Fotiou · github.com/nikfot</div>

---

<StageMark label="The problem" detail="one window, many sources" />

# Your knowledge lives everywhere.

<SourceCloud />

<div class="callout">
The model can only read so much. So <strong>what does it get to see?</strong>
</div>

---

<StageMark label="The promise" detail="what you can reuse" />

# Four things to take home

<div class="grid-4">
  <div class="card" v-click>
    <span class="number">01</span>
    <h3>Unify knowledge</h3>
    <p>Make scattered sources retrievable without pasting everything into a prompt.</p>
  </div>
  <div class="card" v-click>
    <span class="number">02</span>
    <h3>Better context</h3>
    <p>Give the LLM the right data through retrieval, and its answers get better: grounded, cited, honest about gaps.</p>
  </div>
  <div class="card" v-click>
    <span class="number">03</span>
    <h3>Bound workflows</h3>
    <p>Control tools, order, evidence, and finalisation.</p>
  </div>
  <div class="card" v-click>
    <span class="number">04</span>
    <h3>Elastic + Python</h3>
    <p>Python combined with Elastic Stack can get you started in building agents in no time.</p>
  </div>
</div>

---

<StageMark label="Who am I?" detail="and why Sophia exists" />

<div class="profile-grid" style="margin-top: 7rem">
  <img class="speaker-photo" src="/nikos-fotiou.jpg" alt="Nikos Fotiou">
  <div class="card">
    <h3>Nikos Fotiou</h3>
    <p>Senior Software Engineer at Elastic, Platform Networking.</p>
    <p style="margin-top: 0.8rem"><strong>My first PyCon talk, and my first time speaking at any conference.<br>And it is my birthday today. 🎂</strong></p>
    <p style="margin-top: 1rem">
      <span class="pill active">github.com/nikfot</span>
      <span class="pill active">linkedin.com/in/nikosfotiou</span>
    </p>
  </div>
</div>

<p class="tiny muted center">Also: brewing beer and discussing outer space.</p>

---

<StageMark label="Meet Sophia" detail="wisdom grounded in evidence" />

# Why “Sophia”?

<div class="sophia-intro">
  <img class="story-logo" src="/sophia-logo.jpg" alt="Sophia owl logo">
  <div>
    <p class="quote" style="margin-top: 0">Sophia means <strong>wisdom</strong> in Greek.</p>
    <div class="card" style="margin-top: 1rem">
      <h3>What it is</h3>
      <p>A productivity experiment, internal to Elastic, that grew from a Slack assistant into a multi-tenant knowledge and workflow platform.</p>
    </div>
    <div class="grid-3" style="margin-top: 1rem">
      <div class="card">
        <h3>Faster operations</h3>
        <p>Speed up day-to-day operations and troubleshooting.</p>
      </div>
      <div class="card">
        <h3>Meaningful actions</h3>
        <p>Help workflows take actions that matter, not just produce text.</p>
      </div>
      <div class="card">
        <h3>Better collaboration</h3>
        <p>Improve the quality of how teams work together.</p>
      </div>
    </div>
  </div>
</div>

<div class="callout">
Sophia is a multi-tenant engineering assistant you reach through Slack, a REST API, a CLI, and a local MCP server for your editor.
</div>

---

<StageMark label="The journey" detail="experiments → production constraints" />

# The vocabulary changed. The problem did not.

<div class="timeline">
  <div class="timeline-step">
    <strong>Prompt stuffing</strong><br>
    <small>“Just give the model the docs.”</small>
  </div>
  <div class="timeline-step">
    <strong>RAG</strong><br>
    <small>Retrieve only what matters.</small>
  </div>
  <div class="timeline-step">
    <strong>Bounded agents</strong><br>
    <small>Require order and evidence.</small>
  </div>
  <div class="timeline-step">
    <strong>Context engineering</strong><br>
    <small>Orchestrate the whole path.</small>
  </div>
</div>

<div class="callout">
Each step began when the previous one hit a ceiling.
</div>

---
layout: section
---

<div class="eyebrow">Stage 1 · about 18 months ago</div>

# Where the LLM<br><span class="gradient-text">hit the ceiling</span>

<p class="dek">The first prototype worked—while the context was small, curated, and supplied by a human.</p>

---

<StageMark label="The first idea" detail="a Python Slack app" />

<p class="speaker">Boss</p>
<p class="quote">How could we use LLMs in our day-to-day work?</p>

<div v-click>
  <p class="speaker" style="margin-top: 2rem">Me</p>
  <p class="quote" style="margin-top: .5rem">What if Slack could answer from our docs, GitHub, and past conversations?</p>
  <p class="muted" style="margin-top: .7rem; font-size: 1.05rem">An idea that existed before it even had a name. “Sophia” came later.</p>
</div>

<div class="callout" v-click>
<strong>HotW (Host of the Week):</strong> the engineer on rotation for a week. They answer internal teams' questions, curate and troubleshoot alerts before they become incidents, and, depending on the team, take on deeper investigations. The first prototype was built to help them.
</div>

---

<StageMark label="Version 1" detail="the first architecture" />

# An LLM, a Slack app,<br>and a folder of docs.

<FirstIdeaGraph />

<div class="callout">
A human chose which files went into the prompt. That is the part that would not scale.
</div>

---

<StageMark label="The ceiling" detail="more context ≠ better context" />

# What was enough yesterday<br>is not enough today.

<div class="grid-3">
  <div class="card" v-click>
    <h3>It stops fitting</h3>
    <p>A prompt holds only so many documents. Add more and something gets cut.</p>
  </div>
  <div class="card" v-click>
    <h3>Relevance expires</h3>
    <p>Docs we hand-picked went stale, and each new question needed different ones.</p>
  </div>
  <div class="card" v-click>
    <h3>No sources</h3>
    <p>The answer sounds confident, but you cannot see where it came from or check it.</p>
  </div>
</div>

<p class="quote" v-click>We did not need a bigger prompt. We needed to choose the context at the moment of each question.</p>

---
layout: section
---

<div class="eyebrow">Stage 2 · hack week</div>

# This is where<br><span class="gradient-text">RAG kicks in</span>

<p class="dek">Retrieve first. Generate second. Keep the evidence attached.</p>

---

<StageMark label="RAG in one slide" detail="Retrieval-Augmented Generation" />
<img class="corner-logo" src="/elastic-logo.svg" alt="Elastic logo">

# Give the model evidence<br>at the moment it answers.

<div class="flow">
  <div class="flow-box">Question<br><span class="muted tiny">“How do we roll back?”</span></div>
  <span class="arrow">→</span>
  <div class="flow-box highlight">Retrieve<br><span class="muted tiny">find relevant chunks</span></div>
  <span class="arrow">→</span>
  <div class="flow-box">Augment<br><span class="muted tiny">attach evidence to the prompt</span></div>
  <span class="arrow">→</span>
  <div class="flow-box">Generate<br><span class="muted tiny">answer with citations</span></div>
</div>

<div class="grid-3" style="margin-top: 1.5rem">
  <div class="card">
    <span class="number">R</span>
    <h3>Retrieval</h3>
    <p>Select the best evidence for this question.</p>
  </div>
  <div class="card">
    <span class="number">A</span>
    <h3>Augmented</h3>
    <p>Add that evidence to the model's working context.</p>
  </div>
  <div class="card">
    <span class="number">G</span>
    <h3>Generation</h3>
    <p>Synthesize an answer without retraining the model.</p>
  </div>
</div>

<div class="callout">
RAG does not teach the model your documents. It supplies relevant documents at inference time.
</div>

---

<StageMark label="Version 2" detail="add retrieval" />

# Many sources in.<br>One retrieval layer out.

<RagGraph />

<div class="callout">
Same question, but now the system chooses the context: ingest once, retrieve per question.
</div>

---

<StageMark label="The split" detail="Python microservices on Kubernetes" />

# One app became four layers.

<div class="flow">
  <div class="flow-box">Sources<br><span class="muted tiny">GitHub · Slack · Confluence</span></div>
  <span class="arrow">→</span>
  <div class="flow-box">Ingesters<br><span class="muted tiny">chunk · embed · checksum</span></div>
  <span class="arrow">→</span>
  <div class="flow-box highlight"><img class="flow-logo" src="/elastic-logo.svg" alt="">Elasticsearch<br><span class="muted tiny">retrieve · rank · isolate</span></div>
  <span class="arrow">→</span>
  <div class="flow-box">Agents<br><span class="muted tiny">route · use tools · answer</span></div>
  <span class="arrow">→</span>
  <div class="flow-box">Interfaces<br><span class="muted tiny">Slack · FastAPI · CLI</span></div>
</div>

<div class="grid-3" style="margin-top: 1.5rem">
  <div class="card"><h3>FastAPI</h3><p>A stable boundary for new consumers.</p></div>
  <div class="card"><h3>Pydantic AI</h3><p>Typed agents and explicit tools.</p></div>
  <div class="card"><h3>Kubernetes</h3><p>Independent ingesters and services that scale separately.</p></div>
</div>

---

<StageMark label="Ingestion" detail="structure before embeddings" />

# Good retrieval—and isolation—start before search.

<div class="grid-2">
  <div>

```text
Document: Operations handbook
Section: Deployments › Rollback

If health checks fail after promotion…
```

  </div>
  <div>
    <div class="card">
      <h3>Context-aware chunks</h3>
      <p>Titles and breadcrumbs survive the split.</p>
    </div>
    <div class="card" style="margin-top: .8rem">
      <h3>Embeddings</h3>
      <p>Meaning becomes searchable even when wording differs.</p>
    </div>
    <div class="card" style="margin-top: .8rem">
      <h3>Checksums</h3>
      <p>Unchanged documents are skipped; changed chunks are replaced.</p>
    </div>
  </div>
</div>

<div class="callout">
One index per tenant and source: <code>sophia-{org}-{source}-v1</code>. Search is hybrid (BM25 + vectors), with the tenant filter inside the query.
</div>

---

<StageMark label="Typed agents" detail="Pydantic AI · what we did, what we got" />

# Typed agents gave us answers other code can trust.

<div class="grid-2" style="grid-template-columns: 1.1fr 1fr; align-items: start">
  <div>

```python {1-7|9-13|15-18}
from pydantic import BaseModel
from pydantic_ai import Agent, RunContext

class SophiaResponse(BaseModel):
    summary: str
    sources: list[Source]
    confidence: Literal["high", "medium", "low", "none"]

knowledge_agent = Agent(
    model=gemini_model,
    output_type=SophiaResponse,
    deps_type=KnowledgeAgentDeps,
)

@knowledge_agent.tool
async def search_knowledge_base(
    ctx: RunContext[KnowledgeAgentDeps], query: str,
) -> str: ...
```

  </div>
  <div>
    <div class="card" style="padding: .8rem 1.1rem">
      <h3>The answer is a type</h3>
      <p><strong>We</strong> made the model return a <code>SophiaResponse</code> (Pydantic AI <code>output_type</code>).<br><strong>So</strong> every answer has sources and a confidence, and “none” is allowed.</p>
    </div>
    <div class="card" style="margin-top: .6rem; padding: .8rem 1.1rem">
      <h3>Scope is injected</h3>
      <p><strong>We</strong> keep org and limits in <code>deps</code>, away from the model.<br><strong>So</strong> isolation does not depend on the prompt.</p>
    </div>
    <div class="card" style="margin-top: .6rem; padding: .8rem 1.1rem">
      <h3>One way in</h3>
      <p><strong>We</strong> gave the agent one tool, not an ES client.<br><strong>So</strong> retrieval is bounded and auditable.</p>
    </div>
  </div>
</div>

---

<StageMark label="The result" detail="useful enough for workflows" />

# RAG made answers something we could build on.

<div class="grid-3">
  <div class="card" v-click>
    <h3>Grounded</h3>
    <p>Every answer cites its sources.</p>
    <p class="muted tiny"><strong>How:</strong> retrieval over our own docs, and <code>sources</code> is required in the response type.</p>
  </div>
  <div class="card" v-click>
    <h3>Reusable</h3>
    <p>Slack, the API and the CLI use the same agents.</p>
    <p class="muted tiny"><strong>How:</strong> we split ingestion, agents and interfaces into layers.</p>
  </div>
  <div class="card" v-click>
    <h3>Automatable</h3>
    <p>Reports and suggested next actions become possible.</p>
    <p class="muted tiny"><strong>How:</strong> every answer is a <code>SophiaResponse</code> with <code>sources</code> and <code>confidence</code> fields. Reports and Slack read the fields instead of parsing text.</p>
  </div>
</div>

<p class="quote" v-click>Then we gave the agent tools—and discovered the next ceiling.</p>

---
layout: section
---

<div class="eyebrow">Stage 3 · tools meet production</div>

# Bounded agents:<br><span class="gradient-text">freedom with proof</span>

<p class="dek">We like agents because they adapt. We operate systems because they are predictable.</p>

---

<StageMark label="The missing layer" detail="skills + MCP are not enough" />

# Two standards—and one unanswered question.

<div class="grid-3">
  <div class="card">
    <span class="number">Skill</span>
    <h3>What to do</h3>
    <p>Instructions, heuristics, and domain knowledge.</p>
  </div>
  <div class="card">
    <span class="number">MCP</span>
    <h3>How to call</h3>
    <p>A common wire protocol for tools and context.</p>
  </div>
  <div class="card" style="border-color: rgba(243,111,33,.62)">
    <span class="number accent">?</span>
    <h3>When may it finish?</h3>
    <p>Allowed tools, order, required evidence, finalisation.</p>
  </div>
</div>

<div class="callout">
An open-ended investigation is useful. An unbounded production workflow is not.
</div>

---

<StageMark label="Skill Contracts Protocol" detail="policy beside instructions" />

# Put the workflow contract in the skill.

<div style="display: flex; gap: .6rem; flex-wrap: wrap; margin: .2rem 0 .8rem">
  <span class="pill">A protocol: a spec that extends the SKILL.md format</span>
  <span class="pill">A Python library: <code>from scp import load_skill</code></span>
</div>

```yaml {1-5|6-10|11-17}
scp: "1.0"
name: sre-investigation
constraints:
  tool_ids: [investigation_setup, runner_search]
  plan:
    - tool: investigation_setup
    - tool: runner_search
      requires_evidence: [investigation_ready]
  evidence:
    required:
      - { id: investigation_ready, description: Setup succeeded }
      - { id: telemetry_collected, description: Telemetry retrieved }
    detection:
      - { evidence_id: investigation_ready,
          tool_pattern: "^investigation_setup$",
          result_pattern: '"ok": true' }
  finalization: { require_all_evidence: true, min_iterations: 2 }
```

---

<StageMark label="Skill Contracts Protocol" detail="who runs a skill, and how" />

# From a Slack question<br>to a cited answer.

<SkillRunGraph />

<div class="callout">
The LLM never picks the tools. It fills in the inputs and writes the answer. The contract decides what runs.
</div>

---

<StageMark label="Enforcement" detail="the contract bites" />

# Setup did not succeed.<br>The contract <span class="accent">would not guess</span>.

<p class="muted">Step two, <code>runner_search</code>, as the adapter recorded it:</p>

```json
{
  "tool": "runner_search",
  "status": "blocked",
  "reason": "requires_evidence: investigation_ready"
}
```

<div class="grid-2" style="margin-top: 1.4rem">
  <div class="card">
    <h3>Evidence missing</h3>
    <p>Setup never returned <code>"ok": true</code>, so step two had nothing to build on.</p>
  </div>
  <div class="card">
    <h3>Answer refused</h3>
    <p>The engineer gets the missing evidence, not a confident guess.</p>
  </div>
</div>

<div class="callout">
The trace explains the refusal to humans, tests, and observability systems.
</div>

---

<StageMark label="Composability" detail="more MCP servers, same limits" />

# Connect more MCP servers.<br>Each skill still gets only its own tools.

<div class="flow">
  <div class="flow-box">Everything Sophia can reach<br><span class="muted tiny">every tool on every MCP server</span></div>
  <span class="arrow">→</span>
  <div class="flow-box highlight">Skill contract<br><span class="muted tiny"><code>tool_ids</code> allow-list</span></div>
  <span class="arrow">→</span>
  <div class="flow-box">What this skill may call<br><span class="muted tiny"><code>investigation_setup</code>, <code>runner_search</code></span></div>
</div>

<div class="grid-3" style="margin-top: 1.5rem">
  <div class="card"><h3>Safe to add servers</h3><p>A new server's tools stay out of reach of skills that don't list them.</p></div>
  <div class="card"><h3>No accidental calls</h3><p>Anything outside the allow-list is blocked, even if it exists.</p></div>
  <div class="card"><h3>Comparable runs</h3><p>The same steps and evidence every time, so runs can be compared.</p></div>
</div>

<div class="callout warning">
Open question: an allow-list is logical, not a sandbox. How do we isolate remote tools?
</div>

---

<StageMark label="Version 3" detail="loop until the contract is satisfied" />

# Sophia keeps going<br>until the contract is satisfied.

<ContractLoopGraph />

<div class="callout warning">
The loop is bounded: if the step budget runs out first, the answer is refused. Remote tools are next; the adapter cannot call that server yet.
</div>

---
layout: section
---

<div class="eyebrow">Stage 4 · now and next</div>

# Hello,<br><span class="gradient-text">context engineering</span>

<p class="dek">RAG chooses documents. Context engineering governs every input, tool, state transition, and proof around the model.</p>

---

<StageMark label="Agent Builder" detail="the agent moves to the data" />
<img class="corner-logo" src="/elastic-logo.svg" alt="Elastic logo">

# Stop pulling data out.<br>Put the agent where the data lives.

<div class="grid-2">
  <div class="card">
    <h3>Agents</h3>
    <p>An LLM with its own instructions and a set of tools. Use the built-in agents or create your own.</p>
  </div>
  <div class="card">
    <h3>Tools</h3>
    <p>Functions over your data. Built-in ones, plus your own <code>ES|QL</code>, index search, workflow and MCP tools.</p>
  </div>
  <div class="card">
    <h3>Skills</h3>
    <p>Reusable instruction sets that bundle knowledge and tools, loaded only when a request needs them.</p>
  </div>
  <div class="card">
    <h3>Agent Chat</h3>
    <p>Talk to agents in Kibana, or call the same conversations through an API.</p>
  </div>
</div>

<div style="display: flex; gap: .6rem; flex-wrap: wrap; margin-top: 1rem; align-items: center">
  <span class="muted tiny">Reach it from</span>
  <span class="pill">Kibana chat</span>
  <span class="pill">REST API</span>
  <span class="pill">MCP server</span>
  <span class="pill">A2A server</span>
</div>

<p class="tiny muted" style="margin-top: .8rem">Built into Kibana. Generally available on Serverless and Elastic Stack 9.3+, preview in 9.2. Source: Elastic docs.</p>

---

<StageMark label="Agent Builder" detail="Phase 6 pilot · how Sophia uses it" />
<img class="corner-logo" src="/elastic-logo.svg" alt="Elastic logo">

# Sophia gives each tenant<br>its own agent.

<div class="grid-3">
  <div class="card">
    <h3>One agent per tenant</h3>
    <p>Named <code>{agent}-{org}</code>, so two tenants never share an agent.</p>
  </div>
  <div class="card">
    <h3>Tools pinned to the org</h3>
    <p>Each tool queries only that org's index. The model cannot change the org filter.</p>
  </div>
  <div class="card">
    <h3>Compared, not migrated</h3>
    <p>The same test questions go to today's agent and to Agent Builder, side by side.</p>
  </div>
</div>

<div style="margin-top: 1rem"><TenantAgentsGraph /></div>

---

<StageMark label="Phase 7 · candidate" detail="the composer" />

# Many specialists. One ledger.

<ComposerGraph />

<div class="callout">
Every source is a tool. The answer may cite only what is in the ledger—empty ledger, "no evidence".
</div>

---

<StageMark label="Phase 7 · candidate" detail="three loops, three guarantees" />

# Three engines, one per layer.

<div class="grid-3">
  <div class="card">
    <span class="number">Composer</span>
    <h3>The model decides</h3>
    <p>Which source next, and when to stop.</p>
    <p class="tiny muted">Guards: usage limits, per-source call caps, timeouts, only registered tools, org from the request.</p>
  </div>
  <div class="card">
    <span class="number">Agent Builder</span>
    <h3>The agent searches</h3>
    <p>Its own model loops over its pinned tools.</p>
    <p class="tiny muted">Guards: tools pinned per tenant, drift check, about two calls per question.</p>
  </div>
  <div class="card" style="border-color: rgba(23,105,170,.52)">
    <span class="number">SCP skill</span>
    <h3>The contract decides</h3>
    <p>A fixed plan with evidence gates.</p>
    <p class="tiny muted">Guards: tool allow-list, required evidence, max iterations.</p>
  </div>
</div>

<div class="callout warning">
Open loops where judgement helps. Fixed plans where predictability matters. Citations checked in one place.
</div>

---
layout: section
---

# <span class="gradient-text">Demo</span>

---

<StageMark label="Takeaways" detail="start where you hurt" />

# Three ideas worth stealing

<div class="grid-3">
  <div class="card" v-click>
    <span class="number">01</span>
    <h3>Retrieve, don't stuff</h3>
    <p>Hybrid search and citations make messy knowledge usable.</p>
  </div>
  <div class="card" v-click>
    <span class="number">02</span>
    <h3>Make uncertainty legal</h3>
    <p>A typed “none” is safer than unsupported fluency.</p>
  </div>
  <div class="card" v-click>
    <span class="number">03</span>
    <h3>Bound the agent</h3>
    <p>Allow-list tools, require evidence, and make refusal observable.</p>
  </div>
</div>

<p class="quote" v-click>The tools will keep changing. Build the guarantees so they can.</p>

<div class="footer-link">Python gives us the flexibility · Elasticsearch gives context a home · contracts keep the workflow honest</div>

---
layout: cover
---

<div class="eyebrow">Thank you</div>
<img class="hero-logo" src="/sophia-logo.jpg" alt="Sophia owl logo">

# Build context,<br>not just prompts.

Questions?

<div style="margin-top: 2rem">
  <span class="pill active">github.com/nikfot</span>
  <span class="pill">github.com/nikfot/skill-contracts-protocol</span>
</div>

