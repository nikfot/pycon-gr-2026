<script setup lang="ts">
import { computed } from 'vue'
import { nextGraphId } from './nextGraphId'

type Side = 'left' | 'right' | 'top' | 'bottom'

interface GraphNode {
  id: string
  x: number
  y: number
  w: number
  h: number
  title: string
  subs?: string[]
  /** Visual weight: orange or blue filled, or a white card. */
  fill?: 'orange' | 'blue' | 'white'
  /** Outline colour for white cards: orange, blue or neutral. */
  stroke?: 'o' | 'b' | 'g'
  dashed?: boolean
  logo?: string
  tag?: string
  tagKind?: 'orange' | 'blue' | 'outline'
}

interface GraphEdge {
  from: string
  to: string
  fromSide?: Side
  toSide?: Side
  color?: 'o' | 'b' | 'g'
  dashed?: boolean
  both?: boolean
  label?: string
}

const props = defineProps<{
  width: number
  height: number
  nodes: GraphNode[]
  edges: GraphEdge[]
  label: string
}>()

// Unique ids per instance: url(#id) refs resolve to the first match in the
// document, and defs inside a hidden slide's SVG do not render.
const uid = nextGraphId()

const byId = computed(() => Object.fromEntries(props.nodes.map(n => [n.id, n])))

function anchor(n: GraphNode, side: Side): [number, number] {
  if (side === 'left') return [n.x, n.y + n.h / 2]
  if (side === 'right') return [n.x + n.w, n.y + n.h / 2]
  if (side === 'top') return [n.x + n.w / 2, n.y]
  return [n.x + n.w / 2, n.y + n.h]
}

function push(side: Side, d: number): [number, number] {
  if (side === 'left') return [-d, 0]
  if (side === 'right') return [d, 0]
  if (side === 'top') return [0, -d]
  return [0, d]
}

const paths = computed(() =>
  props.edges.map((e) => {
    const a = byId.value[e.from]
    const b = byId.value[e.to]
    const fs = e.fromSide ?? 'right'
    const ts = e.toSide ?? 'left'
    const [x1, y1] = anchor(a, fs)
    const [x2, y2] = anchor(b, ts)
    const d = Math.max(22, Math.hypot(x2 - x1, y2 - y1) / 2.6)
    const [ox1, oy1] = push(fs, d)
    const [ox2, oy2] = push(ts, d)
    const c1 = [x1 + ox1, y1 + oy1]
    const c2 = [x2 + ox2, y2 + oy2]
    const mid = [(x1 + 3 * c1[0] + 3 * c2[0] + x2) / 8, (y1 + 3 * c1[1] + 3 * c2[1] + y2) / 8]
    return {
      d: `M${x1} ${y1} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${x2} ${y2}`,
      color: e.color ?? 'o',
      dashed: !!e.dashed,
      both: !!e.both,
      label: e.label,
      mid,
    }
  }),
)

function textLines(n: GraphNode) {
  const subs = n.subs ?? []
  const block = 18 + (subs.length ? 4 + subs.length * 16 : 0)
  const top = n.y + (n.h - block) / 2
  const left = !!n.logo
  const x = left ? n.x + 58 : n.x + n.w / 2
  return {
    anchor: left ? 'start' : 'middle',
    x,
    title: top + 14,
    subs: subs.map((s, i) => ({ s, y: top + 18 + 4 + i * 16 + 11 })),
  }
}

function tagWidth(t: string) {
  return t.length * 6.3 + 18
}

function onDark(n: GraphNode) {
  return n.fill === 'orange' || n.fill === 'blue'
}
</script>

<template>
  <svg class="arch-graph" :viewBox="`0 0 ${width} ${height}`" role="img" :aria-label="label">
    <defs>
      <linearGradient :id="`${uid}-orange`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f36f21" />
        <stop offset="1" stop-color="#d95b14" />
      </linearGradient>
      <linearGradient :id="`${uid}-blue`" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#1769aa" />
        <stop offset="1" stop-color="#4f8fc4" />
      </linearGradient>
      <filter :id="`${uid}-shadow`" x="-20%" y="-20%" width="140%" height="150%">
        <feDropShadow dx="0" dy="6" stdDeviation="7" flood-color="#172033" flood-opacity="0.14" />
      </filter>
      <marker v-for="c in ['o', 'b', 'g']" :id="`${uid}-arrow-${c}`" :key="c" viewBox="0 0 10 10" refX="8" refY="5"
              markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M0 0 L10 5 L0 10 z" :class="`arrow-${c}`" />
      </marker>
    </defs>

    <g v-for="(p, i) in paths" :key="'e' + i">
      <path :d="p.d" :class="['edge', `edge-${p.color}`, p.dashed ? 'flow-dash' : '']"
            :marker-end="`url(#${uid}-arrow-${p.color})`" :marker-start="p.both ? `url(#${uid}-arrow-${p.color})` : undefined" />
      <g v-if="p.label">
        <rect :x="p.mid[0] - (p.label.length * 3.4 + 6)" :y="p.mid[1] - 9" :width="p.label.length * 6.8 + 12" height="18"
              rx="9" class="edge-label-bg" />
        <text :x="p.mid[0]" :y="p.mid[1] + 0.5" text-anchor="middle" class="t-mono t-label">{{ p.label }}</text>
      </g>
    </g>

    <g v-for="n in nodes" :key="n.id" :filter="`url(#${uid}-shadow)`">
      <rect :x="n.x" :y="n.y" :width="n.w" :height="n.h" rx="16"
            :fill="n.fill === 'orange' ? `url(#${uid}-orange)` : n.fill === 'blue' ? `url(#${uid}-blue)` : undefined"
            :class="['node', n.fill ? 'node-' + n.fill : 'node-white', 'stroke-' + (n.stroke ?? 'g'), n.dashed ? 'node-dashed' : '']" />
      <image v-if="n.logo" :href="n.logo" :x="n.x + 16" :y="n.y + n.h / 2 - 15" width="30" height="30" />
      <text :x="textLines(n).x" :y="textLines(n).title" :text-anchor="textLines(n).anchor"
            :class="['t-title', onDark(n) ? 't-on-dark' : '']">{{ n.title }}</text>
      <text v-for="(l, i) in textLines(n).subs" :key="i" :x="textLines(n).x" :y="l.y"
            :text-anchor="textLines(n).anchor" :class="['t-mono', onDark(n) ? 't-on-dark' : '']">{{ l.s }}</text>
      <g v-if="n.tag">
        <rect :x="n.x + n.w - tagWidth(n.tag) - 12" :y="n.y - 9.5" :width="tagWidth(n.tag)" height="19" rx="9.5"
              :class="['tag', 'tag-' + (n.tagKind ?? 'orange')]" />
        <text :x="n.x + n.w - tagWidth(n.tag) / 2 - 12" :y="n.y + 1" text-anchor="middle"
              :class="['t-tag', 'tag-text-' + (n.tagKind ?? 'orange')]">{{ n.tag }}</text>
      </g>
    </g>
  </svg>
</template>

<style scoped>
.arch-graph {
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
  opacity: 0.8;
}

.edge-g {
  stroke: #8a93a5;
}

.arrow-o {
  fill: #f36f21;
}

.arrow-b {
  fill: #1769aa;
}

.arrow-g {
  fill: #8a93a5;
}

.flow-dash {
  stroke-dasharray: 7 7;
  animation: ag-flow 1.2s linear infinite;
}

@keyframes ag-flow {
  to {
    stroke-dashoffset: -14;
  }
}

.edge-label-bg {
  fill: #f8f5ee;
  stroke: rgba(23, 32, 51, 0.12);
}

.node {
  stroke-width: 2;
}

.node-white {
  fill: rgba(255, 255, 255, 0.97);
}

.node-orange,
.node-blue {
  stroke: none;
}

.stroke-o {
  stroke: #f36f21;
}

.stroke-b {
  stroke: #1769aa;
}

.stroke-g {
  stroke: rgba(23, 32, 51, 0.22);
}

.node-dashed {
  stroke-dasharray: 6 5;
}

.tag-orange {
  fill: #f36f21;
}

.tag-blue {
  fill: #1769aa;
}

.tag-outline {
  fill: #ffffff;
  stroke: #f36f21;
  stroke-width: 1.4;
}

.t-title {
  fill: #172033;
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.t-mono {
  fill: #5f697b;
  font-family: "DM Mono", monospace;
  font-size: 11.5px;
}

.t-label {
  font-size: 10.5px;
  dominant-baseline: middle;
}

.t-on-dark {
  fill: #ffffff;
}

.t-tag {
  font-family: "DM Mono", monospace;
  font-size: 10.5px;
  dominant-baseline: middle;
}

.tag-text-orange,
.tag-text-blue {
  fill: #ffffff;
}

.tag-text-outline {
  fill: #d95b14;
}
</style>
