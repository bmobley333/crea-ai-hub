<template>
  <div class="row1-legal-header">
    <div class="banner-container">
      <div class="banner-content">
        <span class="warning-icon">⚠️</span>
        <span class="banner-text">
          <strong>CONCEPTUAL &amp; AI-ASSISTED FOOD FOR THOUGHT ONLY</strong> — The author holds no operational REA utility authority. Strictly prohibited from execution on OT/SCADA/EMS networks. Provided AS IS without warranty.
        </span>
      </div>
      <a href="/disclaimer" class="banner-action">
        Read Legal Notice →
      </a>
    </div>
  </div>
</template>

<style scoped>
.row1-legal-header {
  background: linear-gradient(90deg, #78350f 0%, #92400e 50%, #78350f 100%);
  border-bottom: 1px solid #f59e0b;
  color: #fef3c7;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 38px;
  z-index: 60;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.35);
  display: flex;
  align-items: center;
}

.banner-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11.5px;
  line-height: 1.2;
  color: #fef3c7;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.warning-icon {
  font-size: 14px;
  flex-shrink: 0;
}

.banner-action {
  background: #f59e0b;
  color: #0f172a !important;
  font-weight: 800;
  font-size: 10.5px;
  padding: 3px 10px;
  border-radius: 5px;
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

@media (max-width: 960px) {
  .row1-legal-header {
    height: auto;
    padding: 6px 0;
  }
  .banner-container {
    flex-direction: column;
    text-align: center;
    gap: 6px;
    padding: 0 12px;
  }
  .banner-content {
    white-space: normal;
    font-size: 10.5px;
    justify-content: center;
  }
}
</style>
