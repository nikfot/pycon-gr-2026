<script setup lang="ts">
const nodes = [
  { id: 'eng', x: 0, y: 124, w: 175, h: 112, title: 'On-call engineer', subs: ['asks in Slack:', '“host i-0abc is', 'unhealthy since 10:42”'], fill: 'white' as const, stroke: 'g' as const },
  { id: 'sophia', x: 235, y: 124, w: 175, h: 112, title: 'Sophia', subs: ['orchestrator', 'matches trigger words', 'picks the skill'], fill: 'orange' as const },
  { id: 'skill', x: 470, y: 0, w: 220, h: 92, title: 'sre-investigation', subs: ['SKILL.md in Sophia’s repo', 'instructions + contract'], fill: 'white' as const, stroke: 'b' as const },
  { id: 'adapter', x: 470, y: 128, w: 220, h: 112, title: 'SCP adapter', subs: ['runs the fixed plan', 'checks every tool call', 'records evidence'], fill: 'blue' as const },
  { id: 'llm', x: 470, y: 282, w: 220, h: 78, title: 'LLM', subs: ['fills in host and time', 'writes the cited answer'], fill: 'white' as const, stroke: 'o' as const },
  { id: 'mcp', x: 780, y: 124, w: 220, h: 112, title: 'sre-investigator', subs: ['MCP tools', 'setup · runner_search', '→ Elasticsearch'], fill: 'white' as const, stroke: 'b' as const },
]

const edges = [
  { from: 'eng', to: 'sophia', label: 'asks' },
  { from: 'sophia', to: 'adapter' },
  { from: 'skill', to: 'adapter', fromSide: 'bottom' as const, toSide: 'top' as const, color: 'b' as const, label: 'contract' },
  { from: 'adapter', to: 'llm', fromSide: 'bottom' as const, toSide: 'top' as const, both: true, dashed: true, label: 'inputs · answer' },
  { from: 'adapter', to: 'mcp', color: 'b' as const, label: 'allowed' },
]
</script>

<template>
  <ArchGraph :width="1000" :height="360" :nodes="nodes" :edges="edges"
             label="An engineer asks Sophia, Sophia picks the sre-investigation skill, and the SCP adapter runs its contract against the sre-investigator tools, using the LLM only for inputs and the final answer" />
</template>
