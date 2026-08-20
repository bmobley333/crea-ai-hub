<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isVisible = ref(false)

onMounted(() => {
  const dismissed = sessionStorage.getItem('crea_legal_banner_dismissed')
  if (!dismissed) {
    isVisible.value = true
  }
})

const dismissBanner = () => {
  isVisible.value = false
  sessionStorage.setItem('crea_legal_banner_dismissed', 'true')
}
</script>

<template>
  <transition name="slide-fade">
    <div v-if="isVisible" class="top-legal-banner">
      <div class="banner-container">
        <div class="banner-content">
          <span class="warning-icon">⚠️</span>
          <span class="banner-text">
            <strong>CONCEPTUAL &amp; AI-ASSISTED FOOD FOR THOUGHT ONLY</strong> — The author holds no operational REA utility authority. Strictly prohibited from execution on OT/SCADA/EMS networks. Provided AS IS without warranty.
          </span>
        </div>
        <div class="banner-actions">
          <a href="/disclaimer" class="banner-action">
            Read Legal Notice →
          </a>
          <button
            type="button"
            class="close-btn"
            @click="dismissBanner"
            aria-label="Dismiss banner"
            title="Dismiss banner for this session"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.top-legal-banner {
  background: linear-gradient(90deg, #78350f 0%, #92400e 50%, #78350f 100%);
  border-bottom: 1px solid #f59e0b;
  color: #fef3c7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
}

.banner-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 7px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  line-height: 1.35;
  color: #fef3c7;
  flex: 1;
}

.warning-icon {
  font-size: 15px;
  flex-shrink: 0;
}

.banner-actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.banner-action {
  background: #f59e0b;
  color: #0f172a !important;
  font-weight: 800;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 6px;
  text-decoration: none !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  transition: background 0.15s ease-in-out;
}

.banner-action:hover {
  background: #fbbf24;
}

.close-btn {
  background: rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(245, 158, 11, 0.4);
  color: #fef3c7;
  font-size: 12px;
  font-weight: 700;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  padding: 0;
  line-height: 1;
}

.close-btn:hover {
  background: rgba(245, 158, 11, 0.3);
  border-color: #f59e0b;
  color: #ffffff;
  transform: scale(1.08);
}

/* Transition effects */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 60px;
  overflow: hidden;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-100%);
}

@media (max-width: 768px) {
  .banner-container {
    flex-direction: column;
    text-align: center;
    padding: 8px 12px;
    gap: 8px;
  }
  .banner-content {
    font-size: 11px;
    justify-content: center;
  }
}
</style>
