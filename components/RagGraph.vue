<script setup lang="ts">
const sources = ['GitHub', 'Confluence', 'Slack', 'Google Docs']
const sourceNodes = sources.map((title, i) => ({
  id: `src${i}`, x: 0, y: i * 66, w: 140, h: 52, title, fill: 'white' as const, stroke: 'g' as const,
}))

const nodes = [
  ...sourceNodes,
  { id: 'ing', x: 195, y: 65, w: 150, h: 120, title: 'Ingesters', subs: ['async, per source', 'chunk · embed', 'checksum'], fill: 'white' as const, stroke: 'o' as const },
  { id: 'es', x: 400, y: 45, w: 190, h: 160, title: 'Elasticsearch', subs: ['hybrid search', 'BM25 + vectors', 'one index per org'], fill: 'white' as const, stroke: 'o' as const, logo: '/elastic-logo.svg', tag: 'RAG', tagKind: 'orange' as const },
  { id: 'agents', x: 645, y: 65, w: 160, h: 120, title: 'Agents', subs: ['router', 'pydantic-ai', 'typed answers'], fill: 'orange' as const },
  { id: 'ui', x: 860, y: 45, w: 140, h: 160, title: 'Interfaces', subs: ['Slack', 'REST (FastAPI)', 'CLI'], fill: 'white' as const, stroke: 'b' as const },
  { id: 'llm', x: 645, y: 250, w: 160, h: 56, title: 'LLM', subs: ['hosted model API'], fill: 'blue' as const },
]

const edges = [
  ...sources.map((_, i) => ({ from: `src${i}`, to: 'ing', color: 'g' as const })),
  { from: 'ing', to: 'es' },
  { from: 'es', to: 'agents', both: true, color: 'b' as const },
  { from: 'agents', to: 'ui', both: true, color: 'b' as const },
  { from: 'agents', to: 'llm', fromSide: 'bottom' as const, toSide: 'top' as const, both: true, dashed: true },
]
</script>

<template>
  <ArchGraph :width="1000" :height="322" :nodes="nodes" :edges="edges"
             label="Ingesters load several sources into Elasticsearch; agents retrieve from it and answer through Slack, REST and CLI" />
</template>
