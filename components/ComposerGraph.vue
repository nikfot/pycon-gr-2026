<script setup lang="ts">
const tools = [
  { y: 8, kind: 'ab', title: 'Docs knowledge', sub: 'Agent Builder agent', tag: 'pilot' },
  { y: 108, kind: 'ab', title: 'application_troubleshooter', sub: 'Agent Builder agent', tag: 'candidate' },
  { y: 208, kind: 'ab', title: 'system_troubleshooter', sub: 'Agent Builder · ES|QL tools', tag: 'candidate' },
  { y: 308, kind: 'scp', title: 'my_mcp', sub: 'SCP skill · fixed plan → MCP', tag: 'today' },
]
const cy = (y: number) => y + 40
</script>

<template>
  <svg class="composer-graph" viewBox="0 0 1000 396" role="img"
       aria-label="A composer calls several Agent Builder agents and an SCP skill, collects evidence in a ledger and returns one cited answer">
    <defs>
      <linearGradient id="cg-composer" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f36f21" />
        <stop offset="1" stop-color="#d95b14" />
      </linearGradient>
      <linearGradient id="cg-ledger" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1769aa" />
        <stop offset="1" stop-color="#4f8fc4" />
      </linearGradient>
      <filter id="cg-shadow" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#172033" flood-opacity="0.14" />
      </filter>
      <marker id="cg-arrow-o" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="#f36f21" />
      </marker>
      <marker id="cg-arrow-b" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
        <path d="M0 0 L10 5 L0 10 z" fill="#1769aa" />
      </marker>
    </defs>

    <!-- question -> composer -->
    <path d="M118 198 H168" class="edge edge-o" marker-end="url(#cg-arrow-o)" />

    <!-- composer -> tools (dispatch) -->
    <path v-for="t in tools" :key="'d' + t.y"
          :d="`M356 198 C 390 198, 386 ${cy(t.y)}, 420 ${cy(t.y)}`"
          class="edge edge-o flow-dash" marker-end="url(#cg-arrow-o)" />

    <!-- tools -> ledger (evidence) -->
    <path v-for="t in tools" :key="'e' + t.y"
          :d="`M710 ${cy(t.y)} C 740 ${cy(t.y)}, 738 198, 770 198`"
          class="edge edge-b" />
    <path d="M880 198 H902" class="edge edge-b" marker-end="url(#cg-arrow-b)" />

    <!-- question -->
    <g filter="url(#cg-shadow)">
      <rect x="0" y="166" width="118" height="64" rx="32" class="node-question" />
    </g>
    <text x="59" y="195" text-anchor="middle" class="t-title">Question</text>
    <text x="59" y="213" text-anchor="middle" class="t-mono">many sources</text>

    <!-- composer -->
    <g filter="url(#cg-shadow)">
      <rect x="168" y="128" width="188" height="140" rx="20" fill="url(#cg-composer)" />
    </g>
    <text x="262" y="170" text-anchor="middle" class="t-title t-on-dark">Sophia composer</text>
    <text x="262" y="193" text-anchor="middle" class="t-sub t-on-dark">pydantic-ai + Gemini</text>
    <text x="262" y="218" text-anchor="middle" class="t-mono t-on-dark">model picks the order</text>
    <text x="262" y="236" text-anchor="middle" class="t-mono t-on-dark">calls run in parallel</text>
    <text x="262" y="254" text-anchor="middle" class="t-mono t-on-dark">org from the request</text>

    <!-- tools -->
    <g v-for="t in tools" :key="t.y" filter="url(#cg-shadow)">
      <rect x="420" :y="t.y" width="290" height="80" rx="16"
            :class="['node-tool', t.kind === 'scp' ? 'node-scp' : 'node-ab', t.tag === 'candidate' ? 'node-candidate' : '']" />
      <image v-if="t.kind === 'ab'" href="/elastic-logo.svg" :x="436" :y="t.y + 24" width="30" height="30" />
      <text :x="t.kind === 'ab' ? 478 : 440" :y="t.y + 36" class="t-title t-left t-tool">{{ t.title }}</text>
      <text :x="t.kind === 'ab' ? 478 : 440" :y="t.y + 56" class="t-mono t-left">{{ t.sub }}</text>
      <rect :x="710 - 78" :y="t.y - 9" width="66" height="19" rx="9.5" :class="['tag', 'tag-' + t.tag]" />
      <text :x="710 - 45" :y="t.y + 1" text-anchor="middle" class="t-tag">{{ t.tag }}</text>
    </g>

    <!-- ledger -->
    <g filter="url(#cg-shadow)">
      <rect x="770" y="140" width="110" height="116" rx="18" fill="url(#cg-ledger)" />
    </g>
    <text x="825" y="184" text-anchor="middle" class="t-title t-on-dark">Evidence</text>
    <text x="825" y="204" text-anchor="middle" class="t-title t-on-dark">ledger</text>
    <text x="825" y="230" text-anchor="middle" class="t-mono t-on-dark">hits + records</text>

    <!-- answer -->
    <g filter="url(#cg-shadow)">
      <rect x="902" y="150" width="98" height="96" rx="18" class="node-answer" />
    </g>
    <text x="951" y="190" text-anchor="middle" class="t-title">One</text>
    <text x="951" y="210" text-anchor="middle" class="t-title">cited</text>
    <text x="951" y="230" text-anchor="middle" class="t-title">answer</text>
  </svg>
</template>

<style scoped>
.composer-graph {
  display: block;
  width: 94%;
  height: auto;
  margin: 0.2rem auto 0;
  overflow: visible;
  font-family: "Manrope", sans-serif;
}

.edge {
  fill: none;
  stroke-width: 2.4;
  stroke-linecap: round;
}

.edge-o {
  stroke: #f36f21;
}

.edge-b {
  stroke: #1769aa;
  opacity: 0.75;
}

.flow-dash {
  stroke-dasharray: 7 7;
  animation: cg-flow 1.2s linear infinite;
}

@keyframes cg-flow {
  to {
    stroke-dashoffset: -14;
  }
}

.node-question,
.node-answer {
  fill: #ffffff;
  stroke: #172033;
  stroke-opacity: 0.18;
  stroke-width: 1.4;
}

.node-answer {
  stroke: #1769aa;
  stroke-opacity: 0.6;
  stroke-width: 2;
}

.node-tool {
  fill: rgba(255, 255, 255, 0.96);
  stroke-width: 2;
}

.node-ab {
  stroke: #f36f21;
}

.node-scp {
  stroke: #1769aa;
}

.node-candidate {
  stroke-dasharray: 6 5;
}

.tag-pilot {
  fill: #f36f21;
}

.tag-candidate {
  fill: #ffffff;
  stroke: #f36f21;
  stroke-width: 1.4;
}

.tag-today {
  fill: #1769aa;
}

.t-title {
  fill: #172033;
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.t-tool {
  font-size: 14.5px;
}

.t-sub {
  font-size: 13px;
  font-weight: 700;
}

.t-mono {
  fill: #5f697b;
  font-family: "DM Mono", monospace;
  font-size: 11.5px;
}

.t-left {
  text-anchor: start;
}

.t-on-dark {
  fill: #ffffff;
}

.t-tag {
  fill: #ffffff;
  font-family: "DM Mono", monospace;
  font-size: 10.5px;
  font-weight: 500;
  dominant-baseline: middle;
}

.tag-candidate + .t-tag {
  fill: #d95b14;
}
</style>
