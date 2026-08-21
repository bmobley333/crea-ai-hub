import { ref } from 'vue'

export type DemoType = 'doc-walkthrough' | 'doc-card' | 'triage-walkthrough' | 'triage-card' | 'fireworks-case-study' | 'full-stack-architecture' | 'oauth-db-demo' | null

export const activeDemo = ref<DemoType>(null)
export const isModalOpen = ref<boolean>(false)

export function openDemo(type: DemoType) {
  activeDemo.value = type
  isModalOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

export function closeDemo() {
  isModalOpen.value = false
  activeDemo.value = null
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}
