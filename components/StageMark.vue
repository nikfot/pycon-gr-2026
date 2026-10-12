<script setup lang="ts">
defineProps<{
  label: string
  detail?: string
}>()
</script>

<template>
  <div class="stage-mark">
    <span>{{ label }}</span>
    <small v-if="detail">{{ detail }}</small>
  </div>
</template>
