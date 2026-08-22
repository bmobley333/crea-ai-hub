<template>
  <button 
    type="button" 
    class="demo-modal-btn" 
    :class="btnClass"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { openDemo, type DemoType } from './demoState'

const props = defineProps<{
  type: DemoType
  label?: string
  accent?: 'cyan' | 'amber' | 'emerald' | 'blue'
}>()

const btnClass = computed(() => {
  if (props.type === 'full-stack-architecture' || props.type === 'fireworks-case-study') {
    return 'demo-btn-fireworks'
  }
  if (props.accent === 'amber' || props.type?.includes('triage')) {
    return 'demo-btn-amber'
  }
  if (props.type?.includes('card')) {
    return 'demo-btn-emerald'
  }
  return 'demo-btn-cyan'
})

function handleClick() {
  openDemo(props.type)
}
</script>

<style scoped>
.demo-modal-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.65rem;
  border-radius: 6px;
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  text-decoration: none;
  border: 1px solid transparent;
  margin: 0.15rem 0.2rem;
  font-family: inherit;
}

.demo-btn-cyan {
  background: rgba(2, 132, 199, 0.15);
  border-color: rgba(56, 189, 248, 0.4);
  color: #38bdf8;
}
.demo-btn-cyan:hover {
  background: rgba(2, 132, 199, 0.3);
  border-color: #38bdf8;
  color: #ffffff;
  transform: translateY(-1px);
}

.demo-btn-emerald {
  background: rgba(16, 185, 129, 0.15);
  border-color: rgba(52, 211, 153, 0.4);
  color: #34d399;
}
.demo-btn-emerald:hover {
  background: rgba(16, 185, 129, 0.3);
  border-color: #34d399;
  color: #ffffff;
  transform: translateY(-1px);
}

.demo-btn-amber {
  background: rgba(245, 158, 11, 0.15);
  border-color: rgba(251, 191, 36, 0.4);
  color: #fbbf24;
}
.demo-btn-amber:hover {
  background: rgba(245, 158, 11, 0.3);
  border-color: #fbbf24;
  color: #ffffff;
  transform: translateY(-1px);
}

.demo-btn-fireworks {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.2), rgba(245, 158, 11, 0.2));
  border-color: rgba(56, 189, 248, 0.6);
  color: #38bdf8;
}
.demo-btn-fireworks:hover {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.35), rgba(245, 158, 11, 0.35));
  border-color: #fbbf24;
  color: #ffffff;
  transform: translateY(-1px);
  box-shadow: 0 0 10px rgba(56, 189, 248, 0.3);
}

/* Light Mode Overrides */
:global(html:not(.dark)) .demo-btn-cyan {
  background: rgba(2, 132, 199, 0.12) !important;
  border-color: rgba(2, 132, 199, 0.5) !important;
  color: #0284c7 !important;
}

:global(html:not(.dark)) .demo-btn-cyan:hover {
  background: #0284c7 !important;
  color: #ffffff !important;
}

:global(html:not(.dark)) .demo-btn-emerald {
  background: rgba(5, 150, 105, 0.12) !important;
  border-color: rgba(5, 150, 105, 0.5) !important;
  color: #059669 !important;
}

:global(html:not(.dark)) .demo-btn-emerald:hover {
  background: #059669 !important;
  color: #ffffff !important;
}

:global(html:not(.dark)) .demo-btn-amber {
  background: rgba(217, 119, 6, 0.12) !important;
  border-color: rgba(217, 119, 6, 0.5) !important;
  color: #b45309 !important;
}

:global(html:not(.dark)) .demo-btn-amber:hover {
  background: #d97706 !important;
  color: #ffffff !important;
}

:global(html:not(.dark)) .demo-btn-fireworks {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.12), rgba(217, 119, 6, 0.12)) !important;
  border-color: rgba(2, 132, 199, 0.6) !important;
  color: #0369a1 !important;
}

:global(html:not(.dark)) .demo-btn-fireworks:hover {
  background: #0284c7 !important;
  color: #ffffff !important;
}
</style>
