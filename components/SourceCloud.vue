<script setup lang="ts">
const knowledge = ['Docs', 'Slack', 'Runbooks', 'GitHub', 'Research']
const messy = ['Application logs', 'System telemetry', 'Audit logs', 'Support tickets']
</script>

<template>
  <div class="source-cloud" aria-label="Knowledge sources and messy data flowing into one context window">
    <div class="source-groups">
      <div class="source-group">
        <div class="source-label">Scattered knowledge</div>
        <div class="source-row">
          <div v-for="s in knowledge" :key="s" class="source-node">{{ s }}</div>
        </div>
      </div>
      <div class="source-group messy">
        <div class="source-label">Same goes for messy data in general</div>
        <div class="source-row">
          <div v-for="s in messy" :key="s" class="source-node">{{ s }}</div>
        </div>
      </div>
    </div>
    <div class="flow-arrow">→</div>
    <div class="context-window">
      <small>ONE</small>
      context<br>window
    </div>
  </div>
</template>
