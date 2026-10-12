<script setup lang="ts">
const nodes = [
  { id: 'sophia', x: 0, y: 65, w: 200, h: 100, title: 'Sophia', subs: ['org comes from', 'the request'], fill: 'orange' as const },
  { id: 'a', x: 290, y: 0, w: 250, h: 92, title: 'knowledge-acme', subs: ['Agent Builder agent', 'tools pinned to acme'], fill: 'blue' as const, tag: 'pilot', tagKind: 'outline' as const },
  { id: 'b', x: 290, y: 138, w: 250, h: 92, title: 'knowledge-globex', subs: ['Agent Builder agent', 'tools pinned to globex'], fill: 'blue' as const, tag: 'pilot', tagKind: 'outline' as const },
  { id: 'ia', x: 640, y: 0, w: 260, h: 92, title: 'acme index', subs: ['sophia-acme-*'], fill: 'white' as const, stroke: 'o' as const, logo: '/elastic-logo.svg' },
  { id: 'ib', x: 640, y: 138, w: 260, h: 92, title: 'globex index', subs: ['sophia-globex-*'], fill: 'white' as const, stroke: 'o' as const, logo: '/elastic-logo.svg' },
]

const edges = [
  { from: 'sophia', to: 'a' },
  { from: 'sophia', to: 'b' },
  { from: 'a', to: 'ia', color: 'b' as const },
  { from: 'b', to: 'ib', color: 'b' as const },
]
</script>

<template>
  <ArchGraph :width="900" :height="230" :nodes="nodes" :edges="edges"
             label="Sophia sends each request to the Agent Builder agent of its tenant, and each agent can only query that tenant's index" />
</template>
