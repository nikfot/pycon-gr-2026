<script setup lang="ts">
const nodes = [
  { id: 'slack', x: 0, y: 105, w: 190, h: 90, title: 'Slack', subs: ['engineer asks,', 'answer lands in the thread'], fill: 'white' as const, stroke: 'b' as const },
  { id: 'app', x: 300, y: 70, w: 250, h: 160, title: 'Python Slack app', subs: ['slack-bolt', 'builds the prompt', 'from a few files'], fill: 'orange' as const, tag: 'prototype', tagKind: 'outline' as const },
  { id: 'llm', x: 800, y: 105, w: 200, h: 90, title: 'LLM', subs: ['hosted model API'], fill: 'blue' as const },
  { id: 'docs', x: 325, y: 280, w: 200, h: 62, title: 'Local docs on disk', subs: ['hand-picked files'], fill: 'white' as const, stroke: 'o' as const, dashed: true },
]
const edges = [
  { from: 'slack', to: 'app', both: true, color: 'b' as const, label: 'ask / reply' },
  { from: 'app', to: 'llm', both: true, label: 'prompt' },
  { from: 'docs', to: 'app', fromSide: 'top' as const, toSide: 'bottom' as const, dashed: true, label: 'pasted in' },
]
</script>

<template>
  <ArchGraph :width="1000" :height="352" :nodes="nodes" :edges="edges"
             label="A Slack app builds a prompt from a few local files and sends it to an LLM" />
</template>
