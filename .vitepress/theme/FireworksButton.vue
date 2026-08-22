<template>
  <button 
    type="button" 
    class="fireworks-launch-btn" 
    @click="handleClick"
    title="Launch interactive 2D fireworks particle simulation with sound effects"
  >
    <slot>🎆 {{ label || 'Launch Fireworks' }}</slot>
  </button>
</template>

<script setup lang="ts">
import { openFireworks } from './fireworksState'

defineProps<{
  label?: string
}>()

function handleClick() {
  openFireworks()
}
</script>

<style scoped>
.fireworks-launch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.8rem;
  border-radius: 8px;
  font-size: 0.84rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  text-decoration: none;
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.22), rgba(244, 63, 94, 0.22));
  border: 1.5px solid rgba(251, 191, 36, 0.6);
  color: #fef08a;
  box-shadow: 0 2px 10px rgba(245, 158, 11, 0.2);
  margin: 0.15rem 0.2rem;
  font-family: inherit;
}

.fireworks-launch-btn:hover {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.4), rgba(244, 63, 94, 0.4));
  border-color: #fbbf24;
  color: #ffffff;
  transform: translateY(-1.5px) scale(1.02);
  box-shadow: 0 4px 18px rgba(245, 158, 11, 0.4);
}

:global(html:not(.dark)) .fireworks-launch-btn {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.18), rgba(244, 63, 94, 0.15)) !important;
  border: 1.5px solid #ea580c !important;
  color: #9a3412 !important;
  box-shadow: 0 2px 8px rgba(234, 88, 12, 0.2) !important;
}

:global(html:not(.dark)) .fireworks-launch-btn:hover {
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.28), rgba(244, 63, 94, 0.22)) !important;
  border-color: #c2410c !important;
  color: #7c2d12 !important;
  box-shadow: 0 4px 14px rgba(234, 88, 12, 0.3) !important;
}
</style>
