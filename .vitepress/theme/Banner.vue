<template>
  <div class="top-legal-banner">
    <div class="banner-container">
      <div class="banner-content">
        <span class="warning-icon">⚠️</span>
        <span class="banner-text">
          <strong>CONCEPTUAL & AI-ASSISTED FOOD FOR THOUGHT ONLY</strong> — The author holds no operational REA utility authority. Strictly prohibited from execution on OT/SCADA/EMS networks. Provided AS IS without warranty.
        </span>
      </div>
      <a href="/disclaimer" class="banner-action">
        Read Legal Notice →
      </a>
    </div>
  </div>
</template>

<style scoped>
.top-legal-banner {
  background: linear-gradient(90deg, #78350f 0%, #92400e 50%, #78350f 100%);
  border-bottom: 1px solid #f59e0b;
  color: #fef3c7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  width: 100%;
  position: relative;
  z-index: 50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.banner-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 8px 20px;
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
  font-size: 12.5px;
  line-height: 1.35;
  color: #fef3c7;
}

.warning-icon {
  font-size: 16px;
  flex-shrink: 0;
}

.banner-action {
  background: #f59e0b;
  color: #0f172a !important;
  font-weight: 800;
  font-size: 11px;
  padding: 5px 12px;
  border-radius: 6px;
  text-decoration: none !important;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;
  transition: background 0.15s ease-in-out;
  flex-shrink: 0;
}

.banner-action:hover {
  background: #fbbf24;
}

@media (max-width: 768px) {
  .banner-container {
    flex-direction: column;
    text-align: center;
    padding: 10px 14px;
    gap: 8px;
  }
  .banner-content {
    font-size: 11.5px;
    justify-content: center;
  }
}
</style>
