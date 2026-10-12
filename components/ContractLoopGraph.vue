<script setup lang="ts">
const nodes = [
  { id: 'sophia', x: 0, y: 0, w: 180, h: 110, title: 'Sophia', subs: ['runs the loop', 'one plan step at a time'], fill: 'orange' as const },
  { id: 'contract', x: 260, y: 0, w: 200, h: 110, title: 'SCP contract', subs: ['is this tool allowed?', 'is the proof in place?'], fill: 'blue' as const },
  { id: 'remote', x: 540, y: 0, w: 200, h: 110, title: 'my_mcp', subs: ['remote tool server', 'bearer-token auth'], fill: 'white' as const, stroke: 'b' as const, dashed: true, tag: 'next', tagKind: 'outline' as const },
  { id: 'ledger', x: 540, y: 232, w: 200, h: 96, title: 'Evidence ledger', subs: ['required proof', 'collected so far'], fill: 'white' as const, stroke: 'o' as const },
  { id: 'answer', x: 820, y: 116, w: 180, h: 96, title: 'Cited answer', subs: ['only when all', 'proof exists'], fill: 'orange' as const },
]

const edges = [
  { from: 'sophia', to: 'contract', label: 'next step' },
  { from: 'contract', to: 'remote', color: 'b' as const, label: 'allowed' },
  { from: 'remote', to: 'ledger', fromSide: 'bottom' as const, toSide: 'top' as const, color: 'b' as const, label: 'result' },
  { from: 'ledger', to: 'sophia', fromSide: 'left' as const, toSide: 'bottom' as const, dashed: true, label: 'not yet: loop' },
  { from: 'ledger', to: 'answer', fromSide: 'right' as const, toSide: 'bottom' as const, label: 'satisfied' },
]
</script>

<template>
  <ArchGraph :width="1000" :height="328" :nodes="nodes" :edges="edges"
             label="Sophia runs one plan step at a time through the SCP contract, calls the remote tool, records the result as evidence, and loops until every required piece of proof exists, then writes the cited answer" />
</template>
