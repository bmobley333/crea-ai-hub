import { ref } from 'vue'

export const isFireworksOpen = ref<boolean>(false)
export const isSoundEnabled = ref<boolean>(true)

export function openFireworks() {
  isFireworksOpen.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

export function closeFireworks() {
  isFireworksOpen.value = false
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
}

export function toggleSound() {
  isSoundEnabled.value = !isSoundEnabled.value
}
