<template>
  <Teleport to="body">
    <div v-if="isModalOpen" class="demo-modal-overlay" @click.self="handleClose">
      <div class="demo-modal-container" :class="{ 'case-study-wide': activeDemo === 'fireworks-case-study' || activeDemo === 'full-stack-architecture' }" role="dialog" aria-modal="true">
        <!-- Header -->
        <div class="demo-modal-header">
          <div class="demo-modal-title-box">
            <span class="demo-modal-badge">{{ badgeText }}</span>
            <h3 class="demo-modal-title">{{ titleText }}</h3>
          </div>
          <div class="demo-modal-actions">
            <a 
              v-if="popoutUrl" 
              :href="popoutUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="demo-popout-btn" 
              title="Open in new browser tab"
            >
              ↗ Popout Tab
            </a>
            <button type="button" class="demo-close-btn" @click="handleClose" title="Close modal (Esc)">
              ✕
            </button>
          </div>
        </div>

        <!-- Body -->
        <div class="demo-modal-body">
          <!-- 1. Doc Visual Card -->
          <div v-if="activeDemo === 'doc-card'" class="demo-iframe-wrapper">
            <iframe 
              src="/assets/demo_cards/card_use_case_1_documentation.html" 
              title="Documentation Engine Visual Card" 
              class="demo-iframe"
            />
          </div>

          <!-- 2. Triage Visual Card -->
          <div v-if="activeDemo === 'triage-card'" class="demo-iframe-wrapper">
            <iframe 
              src="/assets/demo_cards/card_use_case_2_triage.html" 
              title="IT Ticket Triage Visual Card" 
              class="demo-iframe"
            />
          </div>

          <!-- 3. Doc Walkthrough -->
          <div v-if="activeDemo === 'doc-walkthrough'" class="demo-walkthrough-content">
            <div class="demo-callout-box cyan">
              <h4>🎯 The Operational Challenge</h4>
              <p>
                Decades of legacy institutional knowledge (substation transformer tap changers, recloser schematics, SEL relay settings, and storm playbooks) are locked inside dusty physical binders and scanned unsearchable PDFs.
              </p>
            </div>

            <h4 class="pipeline-heading">⚡ The 3-Step Bounded Ingestion Pipeline</h4>
            <div class="steps-grid">
              <div class="step-card">
                <div class="step-badge">1. INGESTION</div>
                <h5>Raw Legacy Docs</h5>
                <p>20 years of scanned PDFs, paper manuals, and wiring schematics detected automatically in monitored watcher folder.</p>
              </div>
              <div class="step-card highlight-cyan">
                <div class="step-badge">2. LOCAL OCR & RAG</div>
                <h5>Structure & Index</h5>
                <p>Local OCR extracts text, cleans formatting into Markdown notes with YAML metadata, and embeds into local vector store.</p>
              </div>
              <div class="step-card">
                <div class="step-badge">3. RETRIEVAL & AUDIO</div>
                <h5>Grounded Briefing</h5>
                <p>Exact page-cited answers on mobile devices + 2-minute synthesized spoken audio overview briefings for lineworkers in transit.</p>
              </div>
            </div>

            <div class="takeaway-banner">
              💡 <strong>Key Takeaway:</strong> Instant synthesis of decades of institutional knowledge into cited, verifiable runbooks for field staff with zero cloud data leakage.
            </div>
          </div>

          <!-- 4. Triage Walkthrough -->
          <div v-if="activeDemo === 'triage-walkthrough'" class="demo-walkthrough-content">
            <div class="demo-callout-box amber">
              <h4>🎯 The Operational Challenge</h4>
              <p>
                Vague helpdesk emails like <em>"VPN disconnecting every 20 minutes from Meeker substation office laptop"</em> usually cost systems administrators 25 minutes of manual IP lookups, firewall policy verification, and PowerShell script writing.
              </p>
            </div>

            <h4 class="pipeline-heading">⚡ The 3-Step Bounded Execution Loop</h4>
            <div class="steps-grid">
              <div class="step-card">
                <div class="step-badge">1. INGEST TICKET</div>
                <h5>Parse Unstructured Email</h5>
                <p>Agent parses user report, extracts substation site, machine hostname, and affected user ID.</p>
              </div>
              <div class="step-card highlight-amber">
                <div class="step-badge">2. SANDBOXED LINTING</div>
                <h5>Verify & Stage Change</h5>
                <p>Agent checks firewall timeout SOPs, drafts PowerShell command, and validates syntax inside read-only sandbox.</p>
              </div>
              <div class="step-card highlight-gate">
                <div class="step-badge gate">3. [AWAITING APPROVAL]</div>
                <h5>Human Approval Gate</h5>
                <p>Sysadmin inspects staged change diff and signs off with 1 click. Zero autonomous mutations allowed.</p>
              </div>
            </div>

            <div class="takeaway-banner">
              💡 <strong>Key Takeaway:</strong> The agent prepares 100% of the research, script drafting, and change documentation — but the human administrator remains the sole execution authority.
            </div>
          </div>

          <!-- 5. Fireworks 49-Second Case Study -->
          <div v-if="activeDemo === 'fireworks-case-study'" class="case-study-content">
            <!-- Velocity Hero Badges -->
            <div class="metric-ribbon">
              <div class="metric-pill gold">
                <span class="metric-label">⏱️ TOTAL TIME</span>
                <span class="metric-val">59 Seconds</span>
              </div>
              <div class="metric-pill cyan">
                <span class="metric-label">📐 PLANNING TIME</span>
                <span class="metric-val">10 Seconds</span>
              </div>
              <div class="metric-pill emerald">
                <span class="metric-label">🚀 FULL-STACK CODE & DEPLOY</span>
                <span class="metric-val">49 Seconds</span>
              </div>
              <div class="metric-pill purple">
                <span class="metric-label">💻 HUMAN CODE WRITTEN</span>
                <span class="metric-val">0 Lines</span>
              </div>
            </div>

            <!-- Two-Stage Screenshot Comparison -->
            <div class="case-study-grid">
              <div class="stage-card">
                <div class="stage-header">
                  <span class="stage-badge cyan-badge">STAGE 1 • 10-SECOND ARCHITECTURE PLAN</span>
                  <h4>Natural Language Prompt ➔ S-Tier Blueprint</h4>
                  <p>Human operator requests a 2D particle fireworks simulation with sound effects. The agent outputs full physics architecture, Web Audio synthesis plan, and Vue integration in 10s.</p>
                </div>
                <div 
                  class="screenshot-frame interactive stage1" 
                  @click="openLightbox('stage1')"
                  role="button"
                  tabindex="0"
                  @keydown.enter="openLightbox('stage1')"
                  @keydown.space.prevent="openLightbox('stage1')"
                  title="Click to view full-screen in high resolution"
                >
                  <img 
                    src="/assets/case_studies/fireworks_step1_plan_10s.png" 
                    alt="Antigravity IDE 10-second architecture planning phase" 
                    class="screenshot-img"
                  />
                  <div class="screenshot-hover-badge cyan">
                    <span class="hover-badge-icon">🔍</span>
                    <span class="hover-badge-text">Click for Full Screen</span>
                  </div>
                </div>
              </div>

              <div class="stage-card">
                <div class="stage-header">
                  <span class="stage-badge gold-badge">STAGE 2 • 49-SECOND CODE & DEPLOY</span>
                  <h4>1-Click Approval ➔ Live Production on Vercel</h4>
                  <p>Upon human approval, Jodar authored 613 lines of code (Canvas particle loop, stereo Web Audio engine, Vue modal), passed VitePress build, verified parity, and pushed to production.</p>
                </div>
                <div 
                  class="screenshot-frame interactive stage2" 
                  @click="openLightbox('stage2')"
                  role="button"
                  tabindex="0"
                  @keydown.enter="openLightbox('stage2')"
                  @keydown.space.prevent="openLightbox('stage2')"
                  title="Click to view full-screen in high resolution"
                >
                  <img 
                    src="/assets/case_studies/fireworks_step2_deploy_49s.png" 
                    alt="Antigravity IDE 49-second execution and deployment phase" 
                    class="screenshot-img"
                  />
                  <div class="screenshot-hover-badge gold">
                    <span class="hover-badge-icon">🔍</span>
                    <span class="hover-badge-text">Click for Full Screen</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="case-study-takeaway">
              💡 <strong>The Vibe-Coding Reality:</strong> This interactive 2D simulation did not exist 1 minute ago. It was conceived in one sentence, planned in 10 seconds, and coded + deployed in 49 seconds. That is the extreme leverage of modern agentic development.
            </div>
          </div>

          <!-- 6. Full-Stack Architecture Autobiography -->
          <div v-if="activeDemo === 'full-stack-architecture'" class="fullstack-content">
            <!-- Hero Metric Ribbon -->
            <div class="metric-ribbon">
              <div class="metric-pill cyan">
                <span class="metric-label">🧠 COGNITIVE AGENT</span>
                <span class="metric-val">Jodar Shanask</span>
              </div>
              <div class="metric-pill gold">
                <span class="metric-label">🛠️ DEVELOPER HARNESS</span>
                <span class="metric-val">Google Antigravity 2.0</span>
              </div>
              <div class="metric-pill emerald">
                <span class="metric-label">💻 HUMAN CODE WRITTEN</span>
                <span class="metric-val">0 Lines (100% Vibe)</span>
              </div>
              <div class="metric-pill purple">
                <span class="metric-label">⚡ PROD BUILD & DEPLOY</span>
                <span class="metric-val">1.64s / 18s Global Edge</span>
              </div>
            </div>

            <div class="fullstack-intro-box">
              <h3>⚡ The 8-Layer Architectural Stack of the CREA Web App</h3>
              <p>This entire application—from TypeScript logic, Vue 3 components, and 2D canvas physics to Web Audio synthesizers, Google OAuth 2.0, real-time Supabase PostgreSQL database persistence, VitePress builds, and Vercel edge CI/CD—was created through <strong>100% Agentic Vibe Coding</strong>. The human architect specified intent in natural language; Jodar planned, coded, tested, and deployed the complete stack.</p>
            </div>

            <!-- 8 Structured Layer Cards -->
            <div class="layers-container">
              <!-- Layer 1 -->
              <div class="layer-item">
                <div class="layer-number">01</div>
                <div class="layer-body">
                  <div class="layer-badge-row">
                    <span class="layer-tag cyan">COGNITIVE ARCHITECTURE</span>
                    <span class="layer-tech">Gemini 3.7 / 3.1 Pro • OpenClaw • Qwen Critic</span>
                  </div>
                  <h4>Layer 1: Cognitive Agent & Prompt Blueprint</h4>
                  <p>Persistent persona grounded in modular Markdown contracts (<code>soul.md</code>, <code>user.md</code>, <code>rules.md</code>, <code>memory.md</code>). Evaluated by Gemini frontier models (2M context) and audited by a secondary local Qwen 14B critic via Ollama.</p>
                </div>
              </div>

              <!-- Layer 2 -->
              <div class="layer-item">
                <div class="layer-number">02</div>
                <div class="layer-body">
                  <div class="layer-badge-row">
                    <span class="layer-tag gold">DEVELOPER HARNESS</span>
                    <span class="layer-tech">Google Antigravity 2.0 • PowerShell Sandbox • MCP Tools</span>
                  </div>
                  <h4>Layer 2: Developer Harness & Agentic Tooling</h4>
                  <p>Antigravity 2.0 IDE equips the agent with autonomous terminal/PowerShell command execution, atomic file replacement tools, Model Context Protocol (MCP), and Google Workspace API integrations (Slides UTF-16 exact indexing).</p>
                </div>
              </div>

              <!-- Layer 3 -->
              <div class="layer-item">
                <div class="layer-number">03</div>
                <div class="layer-body">
                  <div class="layer-badge-row">
                    <span class="layer-tag emerald">CI/CD & INFRASTRUCTURE</span>
                    <span class="layer-tech">Git • GitHub • Vercel Serverless Edge Network</span>
                  </div>
                  <h4>Layer 3: Version Control, CI/CD & Edge Deployment</h4>
                  <p>Atomic Git commits with automated branch lifecycle management. Pushed to GitHub (<code>bmobley333/crea-ai-hub</code>) triggering automatic sub-20s serverless builds and zero-downtime deployment on Vercel's Anycast Edge CDN.</p>
                </div>
              </div>

              <!-- Layer 4 -->
              <div class="layer-item">
                <div class="layer-number">04</div>
                <div class="layer-body">
                  <div class="layer-badge-row">
                    <span class="layer-tag purple">STATIC ENGINE & ROUTER</span>
                    <span class="layer-tech">VitePress 1.6.4 • Vite 5 + Rollup • TypeScript 5.x • Vue 3</span>
                  </div>
                  <h4>Layer 4: Application Framework & Static Generation</h4>
                  <p>VitePress SSG engine compiling in 1.64 seconds. Strongly typed with TypeScript 5.x, Vue 3 Composition API (<code>&lt;script setup lang="ts"&gt;</code>), and client-side SPA routing with clean URLs and deep anchor resolution.</p>
                </div>
              </div>

              <!-- Layer 5 -->
              <div class="layer-item">
                <div class="layer-number">05</div>
                <div class="layer-body">
                  <div class="layer-badge-row">
                    <span class="layer-tag cyan">DESIGN & ACCESSIBILITY</span>
                    <span class="layer-tech">Electric Dark-Slate • Cyan/Gold/Ruby • KISS Multi-Option Switches</span>
                  </div>
                  <h4>Layer 5: Design System & Dyslexia UX Architecture</h4>
                  <p>Custom glassmorphic utility palette (<code>#0f172a</code> deep slate, <code>#1e293b</code> surface). Features dyslexia-friendly side-by-side pill switches (no central slider knobs), inline label density, and scalable ⚡ SVG/ICO favicons.</p>
                </div>
              </div>

              <!-- Layer 6 -->
              <div class="layer-item">
                <div class="layer-number">06</div>
                <div class="layer-body">
                  <div class="layer-badge-row">
                    <span class="layer-tag gold">DYNAMIC ENGINES & FX</span>
                    <span class="layer-tech">In-Place Modal Subsystem • HTML5 Canvas 2D Loop • Web Audio Synthesizer</span>
                  </div>
                  <h4>Layer 6: Custom Frontend Engines & Graphical Subsystems</h4>
                  <p>In-place modal overlay engine with body scroll-locking; 60 FPS 2D particle physics fireworks engine (gravity, drag, tap detonation); and a zero-dependency Web Audio API stereo sound synthesizer (whooshes, sub-bass booms, crackles).</p>
                </div>
              </div>

              <!-- Layer 7 -->
              <div class="layer-item">
                <div class="layer-number">07</div>
                <div class="layer-body">
                  <div class="layer-badge-row">
                    <span class="layer-tag cyan">AUTH & REAL-TIME DATABASE</span>
                    <span class="layer-tech">Google OAuth 2.0 • Supabase PostgreSQL • Row Level Security (RLS) • WebSockets</span>
                  </div>
                  <h4>Layer 7: Auth Gateway & Real-Time Cloud Database</h4>
                  <p>Enterprise-grade Google OAuth 2.0 authentication with automated session recovery and callback intercept. Grounded in a cloud PostgreSQL database on Supabase with strict Row Level Security (RLS) policies (public read, authenticated insert, and owner-only update/delete) and live WebSocket Realtime subscriptions for instantaneous zero-latency client synchronization.</p>
                </div>
              </div>

              <!-- Layer 8 -->
              <div class="layer-item">
                <div class="layer-number">08</div>
                <div class="layer-body">
                  <div class="layer-badge-row">
                    <span class="layer-tag emerald">SOURCE OF TRUTH</span>
                    <span class="layer-tech">SoT_CREA_2026.md • Google Slides (19 Slides) • NotebookLM Workspace</span>
                  </div>
                  <h4>Layer 8: Source of Truth (SoT) & Synchronized Ecosystem</h4>
                  <p>Unified documentation contracts (<code>SoT_CREA_2026.md</code>, <code>Manifest.md</code>); 19-slide master keynote deck with character-exact UTF-16 links; 2-page executive playbook PDF; and Google NotebookLM grounded synthetic workspace.</p>
                </div>
              </div>
            </div>

            <!-- Benchmark Table -->
            <div class="benchmark-section">
              <h4>📊 The Vibe-Coding Paradigm Shift</h4>
              <div class="table-scroll-wrapper">
                <table class="benchmark-table">
                  <thead>
                    <tr>
                      <th>Engineering Metric</th>
                      <th>Traditional Software Engineering</th>
                      <th>Agentic Vibe Coding (Jodar + Antigravity 2.0)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Team Structure</strong></td>
                      <td>3–5 Full-Stack Devs + 1 UI Designer</td>
                      <td><strong>1 Systems Architect + 1 AI Agent</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Human Code Written</strong></td>
                      <td>~15,000 Lines of Manual Code</td>
                      <td><strong>0 Lines (100% Vibe Coded)</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Fireworks Simulation (Demo 3)</strong></td>
                      <td>2–3 Days (Physics + Audio + Vue)</td>
                      <td><strong>59 Seconds Total</strong> (10s Plan + 49s Deploy)</td>
                    </tr>
                    <tr>
                      <td><strong>Google OAuth & Live DB Setup</strong></td>
                      <td>2–4 Days (OAuth console, token handling, REST endpoints, DB schema, RLS)</td>
                      <td><strong>3–4 Minutes</strong> (Agentic client integration, reactive auth lifecycle, RLS policies, live WebSocket sync)</td>
                    </tr>
                    <tr>
                      <td><strong>Production Build Time</strong></td>
                      <td>30–60 Seconds</td>
                      <td><strong>1.64 Seconds</strong> (Vite 5 + Rollup)</td>
                    </tr>
                    <tr>
                      <td><strong>Global Edge Deployment</strong></td>
                      <td>5–10 Minutes</td>
                      <td><strong>18 Seconds</strong> (Git Push ➔ Vercel Edge)</td>
                    </tr>
                    <tr>
                      <td><strong>Total Multi-Repo Lines Managed</strong></td>
                      <td>Months of Sprint Overhead</td>
                      <td><strong>~400,000 Production Lines Maintained</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Keynote Takeaway -->
            <div class="case-study-takeaway">
              💡 <strong>Keynote Takeaway:</strong> Every line of TypeScript, Vue 3, HTML5 Canvas physics, Web Audio synthesizer, and CSS styling in this application was generated, tested, and deployed autonomously by Jodar. That is the raw power and complexity modern AI harnesses deliver to a single systems architect.
            </div>
          </div>
        </div>

        <!-- Footer -->
        <div class="demo-modal-footer">
          <span class="footer-hint">Press <strong>Esc</strong> or click outside to return to Resources table</span>
          <button type="button" class="demo-modal-done-btn" @click="handleClose">
            ✕ Close Window
          </button>
        </div>
      </div>
    </div>
  </Teleport>

  <!-- S-Tier Full-Screen Screenshot Lightbox Overlay (Independent Body Teleport, Z-Index 10000) -->
  <Teleport to="body">
    <div 
      v-if="isLightboxOpen" 
      class="screenshot-lightbox-overlay" 
      @click.self="closeLightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Full-screen screenshot viewer"
    >
      <div class="lightbox-modal-container">
        <!-- Lightbox Header -->
        <div class="lightbox-header">
          <!-- Left: Title & Badge -->
          <div class="lightbox-title-box">
            <span class="stage-badge" :class="lightboxData.badgeColor === 'cyan' ? 'cyan-badge' : 'gold-badge'">
              {{ lightboxData.badge }}
            </span>
            <h3 class="lightbox-title">{{ lightboxData.title }}</h3>
          </div>

          <!-- Center: Dyslexia-Friendly KISS Multi-Option Pill Switch -->
          <div class="lightbox-pill-switch">
            <button
              type="button"
              @click="setLightboxStage('stage1')"
              class="lightbox-pill-btn"
              :class="{ 'active-stage1': lightboxStage === 'stage1' }"
              title="View Stage 1: 10s Plan"
            >
              📐 Stage 1 (10s Plan)
            </button>
            <button
              type="button"
              @click="setLightboxStage('stage2')"
              class="lightbox-pill-btn"
              :class="{ 'active-stage2': lightboxStage === 'stage2' }"
              title="View Stage 2: 49s Deploy"
            >
              🚀 Stage 2 (49s Deploy)
            </button>
          </div>

          <!-- Right: Controls & Zoom Tools -->
          <div class="lightbox-actions">
            <!-- Zoom Controls Group -->
            <div class="lightbox-zoom-group">
              <button 
                type="button" 
                class="lightbox-zoom-btn" 
                @click="zoomOut"
                :disabled="zoomLevel <= 1.0"
                title="Zoom Out (Mouse Wheel Down)"
              >
                ➖
              </button>
              <button 
                type="button" 
                class="lightbox-zoom-btn reset-btn" 
                @click="resetZoom"
                :title="zoomLevel === 1.0 ? 'Fit to Screen (Double Click Image to Zoom)' : 'Reset to 100% Fit'"
              >
                🔍 {{ Math.round(zoomLevel * 100) }}%
              </button>
              <button 
                type="button" 
                class="lightbox-zoom-btn" 
                @click="zoomIn"
                :disabled="zoomLevel >= 4.5"
                title="Zoom In (Mouse Wheel Up)"
              >
                ➕
              </button>
            </div>

            <a 
              :href="lightboxData.src" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="lightbox-popout-btn"
              title="Open full RAW image in new browser tab"
            >
              ↗ RAW Tab
            </a>
            <button 
              type="button" 
              class="lightbox-close-btn" 
              @click="closeLightbox" 
              title="Close full screen view (Esc)"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Lightbox Image Viewport with Mouse Wheel Zoom & Drag-Pan -->
        <div 
          class="lightbox-viewport"
          @wheel.prevent="handleWheel"
          @mousedown="handleMouseDown"
          @mousemove="handleMouseMove"
          @mouseup="handleMouseUp"
          @mouseleave="handleMouseUp"
          @dblclick="handleDoubleClick"
        >
          <!-- Left Nav Arrow (to Stage 1) -->
          <button 
            v-if="lightboxStage === 'stage2'" 
            type="button" 
            class="lightbox-nav-arrow left" 
            @click.stop="setLightboxStage('stage1')"
            title="Previous: Stage 1 (Left Arrow)"
          >
            ‹
          </button>

          <!-- The Image Display with Zoom & Pan -->
          <div 
            class="lightbox-img-wrapper" 
            :class="{ 'is-dragging': isDragging, 'is-zoomed': zoomLevel > 1.0 }"
            :style="{
              transform: `translate3d(${panX}px, ${panY}px, 0px) scale(${zoomLevel})`,
              cursor: zoomLevel > 1.0 ? (isDragging ? 'grabbing' : 'grab') : 'zoom-in'
            }"
          >
            <img 
              :src="lightboxData.src" 
              :alt="lightboxData.alt" 
              class="lightbox-img" 
              :class="lightboxData.badgeColor === 'cyan' ? 'border-cyan' : 'border-gold'"
              draggable="false"
            />
          </div>

          <!-- Right Nav Arrow (to Stage 2) -->
          <button 
            v-if="lightboxStage === 'stage1'" 
            type="button" 
            class="lightbox-nav-arrow right" 
            @click.stop="setLightboxStage('stage2')"
            title="Next: Stage 2 (Right Arrow)"
          >
            ›
          </button>
        </div>

        <!-- Lightbox Footer Info Ribbon -->
        <div class="lightbox-footer">
          <div class="lightbox-caption">
            <span class="caption-icon">💡</span>
            <span class="caption-text">{{ lightboxData.subtitle }}</span>
          </div>
          <div class="lightbox-hints">
            <span class="hint-tag">🖱️ <strong>Wheel</strong> Zoom</span>
            <span class="hint-tag">🖱️ <strong>Drag</strong> Pan</span>
            <span class="hint-tag">⌨️ <strong>Esc</strong> Close</span>
            <span class="hint-tag">⌨️ <strong>← / →</strong> Switch</span>
            <button type="button" class="lightbox-done-btn" @click="closeLightbox">
              ✕ Back to Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { isModalOpen, activeDemo, closeDemo } from './demoState'

const isLightboxOpen = ref(false)
const lightboxStage = ref<'stage1' | 'stage2'>('stage1')
const zoomLevel = ref(1.0)
const panX = ref(0)
const panY = ref(0)
const isDragging = ref(false)

let startMouseX = 0
let startMouseY = 0
let startPanX = 0
let startPanY = 0

function resetZoom() {
  zoomLevel.value = 1.0
  panX.value = 0
  panY.value = 0
  isDragging.value = false
}

function openLightbox(stage: 'stage1' | 'stage2') {
  lightboxStage.value = stage
  resetZoom()
  isLightboxOpen.value = true
}

function closeLightbox() {
  isLightboxOpen.value = false
  resetZoom()
}

function setLightboxStage(stage: 'stage1' | 'stage2') {
  lightboxStage.value = stage
  resetZoom()
}

function zoomIn() {
  zoomLevel.value = Math.min(4.5, +(zoomLevel.value + 0.25).toFixed(2))
}

function zoomOut() {
  const newZoom = Math.max(1.0, +(zoomLevel.value - 0.25).toFixed(2))
  zoomLevel.value = newZoom
  if (newZoom === 1.0) {
    panX.value = 0
    panY.value = 0
  }
}

function handleWheel(e: WheelEvent) {
  e.preventDefault()
  const zoomFactor = e.deltaY < 0 ? 0.15 : -0.15
  const targetZoom = +(zoomLevel.value + zoomFactor).toFixed(2)
  const clampedZoom = Math.min(Math.max(1.0, targetZoom), 4.5)

  if (clampedZoom === 1.0) {
    panX.value = 0
    panY.value = 0
  }
  zoomLevel.value = clampedZoom
}

function handleMouseDown(e: MouseEvent) {
  if (zoomLevel.value <= 1.0) return
  isDragging.value = true
  startMouseX = e.clientX
  startMouseY = e.clientY
  startPanX = panX.value
  startPanY = panY.value
}

function handleMouseMove(e: MouseEvent) {
  if (!isDragging.value || zoomLevel.value <= 1.0) return
  e.preventDefault()
  const dx = e.clientX - startMouseX
  const dy = e.clientY - startMouseY
  panX.value = startPanX + dx
  panY.value = startPanY + dy
}

function handleMouseUp() {
  isDragging.value = false
}

function handleDoubleClick() {
  if (zoomLevel.value > 1.0) {
    resetZoom()
  } else {
    zoomLevel.value = 2.0
  }
}

const lightboxData = computed(() => {
  if (lightboxStage.value === 'stage1') {
    return {
      stage: 'stage1',
      badge: 'STAGE 1 • 10-SECOND ARCHITECTURE PLAN',
      title: 'Natural Language Prompt ➔ S-Tier Blueprint',
      subtitle: 'Antigravity IDE 2.0 autonomous planning phase (Web Audio, Canvas 2D, Vue 3 integration).',
      src: '/assets/case_studies/fireworks_step1_plan_10s.png',
      alt: 'Antigravity IDE 10-second architecture planning phase',
      badgeColor: 'cyan'
    }
  } else {
    return {
      stage: 'stage2',
      badge: 'STAGE 2 • 49-SECOND CODE & DEPLOY',
      title: '1-Click Approval ➔ Live Production on Vercel',
      subtitle: '613 lines of Canvas loop, stereo Web Audio synthesis, Vue modal — 0 lines of human code.',
      src: '/assets/case_studies/fireworks_step2_deploy_49s.png',
      alt: 'Antigravity IDE 49-second execution and deployment phase',
      badgeColor: 'gold'
    }
  }
})

const badgeText = computed(() => {
  if (activeDemo.value === 'full-stack-architecture') return 'META-DEMONSTRATION • FULL-STACK AUTOBIOGRAPHY'
  if (activeDemo.value === 'fireworks-case-study') return 'LIVE KEYNOTE CASE STUDY • VIBE CODING PROOF'
  if (activeDemo.value?.includes('doc')) return 'DEMO 1 • DOCUMENTATION ENGINE'
  if (activeDemo.value?.includes('triage')) return 'DEMO 2 • IT TICKET TRIAGE'
  return 'KEYNOTE DEMO'
})

const titleText = computed(() => {
  switch (activeDemo.value) {
    case 'full-stack-architecture':
      return 'The 7-Layer Full-Stack Autobiography of the CREA Web App & Ecosystem'
    case 'fireworks-case-study':
      return 'From Natural Language Prompt to Live Production in 49 Seconds'
    case 'doc-card':
      return 'Legacy Binder Recovery Visual Card'
    case 'doc-walkthrough':
      return 'Documentation Engine 3-Step Architecture Walkthrough'
    case 'triage-card':
      return 'IT Ticket Triage & Approval Gate Visual Card'
    case 'triage-walkthrough':
      return 'IT Ticket Triage & Change Drafting Walkthrough'
    default:
      return 'Demonstration Details'
  }
})

const popoutUrl = computed(() => {
  switch (activeDemo.value) {
    case 'doc-card':
      return '/assets/demo_cards/card_use_case_1_documentation.html'
    case 'doc-walkthrough':
      return '/demos/documentation-engine'
    case 'triage-card':
      return '/assets/demo_cards/card_use_case_2_triage.html'
    case 'triage-walkthrough':
      return '/demos/ticket-triage'
    case 'fireworks-case-study':
    case 'full-stack-architecture':
      return '/resources'
    default:
      return null
  }
})

function handleClose() {
  closeLightbox()
  closeDemo()
}

function handleKeydown(e: KeyboardEvent) {
  if (isLightboxOpen.value) {
    if (e.key === 'Escape') {
      e.preventDefault()
      e.stopPropagation()
      closeLightbox()
      return
    }
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setLightboxStage('stage1')
      return
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setLightboxStage('stage2')
      return
    }
  } else if (e.key === 'Escape' && isModalOpen.value) {
    closeDemo()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
.demo-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  animation: fadeIn 0.15s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.demo-modal-container {
  background: #0f172a;
  border: 1.5px solid #334155;
  border-radius: 16px;
  width: 100%;
  max-width: 1050px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(2, 132, 199, 0.15);
  overflow: hidden;
  animation: slideUp 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.demo-modal-container.case-study-wide {
  max-width: 1250px;
}

@keyframes slideUp {
  from { transform: scale(0.96) translateY(10px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
}

.demo-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background: #1e293b;
  border-bottom: 1px solid #334155;
  gap: 16px;
}

.demo-modal-title-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.demo-modal-badge {
  font-size: 10.5px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #38bdf8;
}

.demo-modal-title {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #f8fafc;
}

.demo-modal-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.demo-popout-btn {
  background: #334155;
  color: #e2e8f0 !important;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 12px;
  border-radius: 6px;
  text-decoration: none !important;
  transition: background 0.15s ease;
}
.demo-popout-btn:hover {
  background: #475569;
  color: #ffffff !important;
}

.demo-close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 20px;
  font-weight: 700;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}
.demo-close-btn:hover {
  background: #334155;
  color: #ffffff;
}

.demo-modal-body {
  padding: 24px;
  overflow-y: auto;
  flex-grow: 1;
}

.demo-iframe-wrapper {
  width: 100%;
  height: 600px;
  background: #0f172a;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #334155;
}

.demo-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.demo-walkthrough-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.demo-callout-box {
  padding: 16px 20px;
  border-radius: 10px;
  background: #1e293b;
  border: 1px solid #334155;
}
.demo-callout-box.cyan {
  border-left: 4px solid #38bdf8;
}
.demo-callout-box.amber {
  border-left: 4px solid #f59e0b;
}
.demo-callout-box h4 {
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
}
.demo-callout-box p {
  margin: 0;
  font-size: 0.92rem;
  color: #cbd5e1;
  line-height: 1.5;
}

.pipeline-heading {
  margin: 10px 0 0 0;
  font-size: 1rem;
  font-weight: 700;
  color: #38bdf8;
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
}

.step-card {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 18px;
  display: flex;
  flex-direction: column;
}
.step-card.highlight-cyan {
  border-color: #0284c7;
  background: rgba(2, 132, 199, 0.08);
}
.step-card.highlight-amber {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.08);
}
.step-card.highlight-gate {
  border-color: #f59e0b;
  background: rgba(245, 158, 11, 0.12);
}

.step-badge {
  font-size: 11px;
  font-weight: 800;
  color: #38bdf8;
  margin-bottom: 8px;
}
.step-badge.gate {
  color: #fbbf24;
}

.step-card h5 {
  margin: 0 0 8px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
}

.step-card p {
  margin: 0;
  font-size: 0.88rem;
  color: #94a3b8;
  line-height: 1.45;
}

.takeaway-banner {
  background: #1e293b;
  border: 1px solid #0284c7;
  border-radius: 10px;
  padding: 14px 18px;
  font-size: 0.9rem;
  color: #e2e8f0;
  line-height: 1.45;
}

/* 49-Second Case Study Styles */
.case-study-content, .fullstack-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.metric-ribbon {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.metric-pill {
  padding: 12px 16px;
  border-radius: 10px;
  background: #1e293b;
  border: 1px solid #334155;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.metric-pill.gold { border-color: rgba(245, 158, 11, 0.5); background: rgba(245, 158, 11, 0.08); }
.metric-pill.cyan { border-color: rgba(56, 189, 248, 0.5); background: rgba(56, 189, 248, 0.08); }
.metric-pill.emerald { border-color: rgba(52, 211, 153, 0.5); background: rgba(52, 211, 153, 0.08); }
.metric-pill.purple { border-color: rgba(192, 132, 252, 0.5); background: rgba(192, 132, 252, 0.08); }

.metric-label {
  font-size: 10.5px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: #94a3b8;
}
.metric-val {
  font-size: 1.15rem;
  font-weight: 800;
  color: #ffffff;
}

.case-study-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(480px, 1fr));
  gap: 20px;
}

.stage-card {
  background: #1e293b;
  border: 1.5px solid #334155;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stage-badge {
  display: inline-block;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.5px;
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: 6px;
}
.cyan-badge { background: rgba(2, 132, 199, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
.gold-badge { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.4); }

.stage-header h4 {
  margin: 0 0 6px 0;
  font-size: 1rem;
  font-weight: 700;
  color: #f8fafc;
}
.stage-header p {
  margin: 0;
  font-size: 0.86rem;
  color: #94a3b8;
  line-height: 1.45;
}

/* Interactive Screenshot Frame */
.screenshot-frame {
  background: #0f172a;
  border: 1.5px solid #334155;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
  position: relative;
}

.screenshot-frame.interactive {
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  outline: none;
}

.screenshot-frame.interactive:hover,
.screenshot-frame.interactive:focus-visible {
  transform: translateY(-2px);
}

.screenshot-frame.interactive.stage1:hover,
.screenshot-frame.interactive.stage1:focus-visible {
  border-color: #38bdf8;
  box-shadow: 0 8px 24px rgba(2, 132, 199, 0.3), 0 0 16px rgba(56, 189, 248, 0.2);
}

.screenshot-frame.interactive.stage2:hover,
.screenshot-frame.interactive.stage2:focus-visible {
  border-color: #fbbf24;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3), 0 0 16px rgba(251, 191, 36, 0.2);
}

.screenshot-hover-badge {
  position: absolute;
  bottom: 12px;
  right: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid #475569;
  font-size: 11px;
  font-weight: 800;
  color: #f8fafc;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease;
  pointer-events: none;
}

.screenshot-hover-badge.cyan {
  border-color: rgba(56, 189, 248, 0.6);
  color: #38bdf8;
}

.screenshot-hover-badge.gold {
  border-color: rgba(251, 191, 36, 0.6);
  color: #fbbf24;
}

.screenshot-frame.interactive:hover .screenshot-hover-badge {
  transform: scale(1.05);
  background: rgba(15, 23, 42, 0.98);
}

.screenshot-img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.2s ease;
}
.screenshot-frame.interactive:hover .screenshot-img {
  transform: scale(1.015);
}

.case-study-takeaway {
  background: linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(245, 158, 11, 0.15));
  border: 1.5px solid #0284c7;
  border-radius: 10px;
  padding: 16px 20px;
  font-size: 0.95rem;
  color: #f8fafc;
  line-height: 1.5;
}

/* Full-Stack Layers Styling */
.fullstack-intro-box {
  background: #1e293b;
  border: 1.5px solid #334155;
  border-radius: 12px;
  padding: 18px 22px;
}
.fullstack-intro-box h3 {
  margin: 0 0 8px 0;
  font-size: 1.15rem;
  font-weight: 800;
  color: #38bdf8;
}
.fullstack-intro-box p {
  margin: 0;
  font-size: 0.92rem;
  color: #cbd5e1;
  line-height: 1.5;
}

.layers-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.layer-item {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  gap: 20px;
  align-items: flex-start;
  transition: border-color 0.15s ease;
}
.layer-item:hover {
  border-color: #38bdf8;
}

.layer-number {
  font-size: 1.6rem;
  font-weight: 900;
  color: #475569;
  line-height: 1;
  padding-top: 4px;
}

.layer-body {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.layer-badge-row {
  display: flex;
  gap: 10px;
  align-items: center;
  flex-wrap: wrap;
}

.layer-tag {
  font-size: 10px;
  font-weight: 800;
  padding: 2px 8px;
  border-radius: 4px;
  text-transform: uppercase;
}
.layer-tag.cyan { background: rgba(2, 132, 199, 0.2); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.4); }
.layer-tag.gold { background: rgba(245, 158, 11, 0.2); color: #fbbf24; border: 1px solid rgba(251, 191, 36, 0.4); }
.layer-tag.emerald { background: rgba(16, 185, 129, 0.2); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.4); }
.layer-tag.purple { background: rgba(192, 132, 252, 0.2); color: #c084fc; border: 1px solid rgba(192, 132, 252, 0.4); }

.layer-tech {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
}

.layer-body h4 {
  margin: 0;
  font-size: 1.02rem;
  font-weight: 700;
  color: #f8fafc;
}

.layer-body p {
  margin: 0;
  font-size: 0.88rem;
  color: #cbd5e1;
  line-height: 1.45;
}
.layer-body code {
  background: #0f172a;
  color: #38bdf8;
  padding: 1px 5px;
  border-radius: 4px;
  font-size: 0.82rem;
}

.benchmark-section {
  background: #1e293b;
  border: 1.5px solid #334155;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.benchmark-section h4 {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: #f8fafc;
}

.table-scroll-wrapper {
  overflow-x: auto;
}

.benchmark-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 !important;
}
.benchmark-table th {
  background: #0f172a !important;
  color: #38bdf8 !important;
  font-size: 0.86rem;
  padding: 10px 14px !important;
  border: 1px solid #334155 !important;
  text-align: left;
}
.benchmark-table td {
  padding: 10px 14px !important;
  font-size: 0.86rem;
  border: 1px solid #334155 !important;
  color: #cbd5e1;
}

.demo-modal-footer {
  padding: 12px 24px;
  background: #1e293b;
  border-top: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-hint {
  font-size: 12px;
  color: #64748b;
}

.demo-modal-done-btn {
  background: #334155;
  color: #f8fafc;
  font-size: 12.5px;
  font-weight: 700;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid #475569;
  cursor: pointer;
  transition: all 0.15s ease;
}
.demo-modal-done-btn:hover {
  background: #475569;
  color: #ffffff;
}

/* ==========================================================================
   S-TIER FULL-SCREEN LIGHTBOX OVERLAY (Z-INDEX 10000)
   ========================================================================== */
.screenshot-lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(6, 10, 20, 0.94);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  box-sizing: border-box;
  animation: lightboxFadeIn 0.18s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes lightboxFadeIn {
  from { opacity: 0; transform: scale(0.98); }
  to { opacity: 1; transform: scale(1); }
}

.lightbox-modal-container {
  background: #090e1a;
  border: 1.5px solid #334155;
  border-radius: 16px;
  width: 100%;
  max-width: 96vw;
  height: 94vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(56, 189, 248, 0.12);
  overflow: hidden;
}

.lightbox-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 20px;
  background: #131d31;
  border-bottom: 1px solid #334155;
  gap: 16px;
  flex-shrink: 0;
}

.lightbox-title-box {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 260px;
}

.lightbox-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 700;
  color: #f8fafc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Dyslexia-Friendly KISS Multi-Option Pill Switch */
.lightbox-pill-switch {
  background: rgba(2, 6, 23, 0.85);
  border: 1px solid #334155;
  padding: 3px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.4);
}

.lightbox-pill-btn {
  padding: 6px 14px;
  font-size: 11.5px;
  font-weight: 700;
  border-radius: 7px;
  border: 1px solid transparent;
  cursor: pointer;
  color: #94a3b8;
  background: transparent;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.lightbox-pill-btn:hover {
  color: #f1f5f9;
}

.lightbox-pill-btn.active-stage1 {
  background: #0284c7;
  color: #ffffff;
  font-weight: 800;
  border-color: #38bdf8;
  box-shadow: 0 2px 8px rgba(2, 132, 199, 0.4);
}

.lightbox-pill-btn.active-stage2 {
  background: #d97706;
  color: #ffffff;
  font-weight: 800;
  border-color: #fbbf24;
  box-shadow: 0 2px 8px rgba(217, 119, 6, 0.4);
}

.lightbox-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

/* Lightbox Zoom Controls Group */
.lightbox-zoom-group {
  display: flex;
  align-items: center;
  background: rgba(2, 6, 23, 0.85);
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 2px;
  gap: 2px;
}

.lightbox-zoom-btn {
  background: transparent;
  border: none;
  color: #e2e8f0;
  font-size: 11px;
  font-weight: 700;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-zoom-btn:hover:not(:disabled) {
  background: #334155;
  color: #ffffff;
}

.lightbox-zoom-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.lightbox-zoom-btn.reset-btn {
  font-size: 11.5px;
  font-weight: 800;
  padding: 4px 10px;
  color: #38bdf8;
  border-left: 1px solid #334155;
  border-right: 1px solid #334155;
}
.lightbox-zoom-btn.reset-btn:hover {
  background: #0284c7;
  color: #ffffff;
}

.lightbox-popout-btn {
  background: #1e293b;
  color: #e2e8f0 !important;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid #475569;
  cursor: pointer;
  text-decoration: none !important;
  transition: all 0.15s ease;
  display: inline-flex;
  align-items: center;
}

.lightbox-popout-btn:hover {
  background: #334155;
  color: #ffffff !important;
  border-color: #64748b;
}

.lightbox-close-btn {
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 22px;
  font-weight: 700;
  width: 34px;
  height: 34px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s ease;
}

.lightbox-close-btn:hover {
  background: #1e293b;
  color: #ffffff;
}

/* Lightbox Image Viewport */
.lightbox-viewport {
  flex-grow: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 16px;
  background: radial-gradient(circle at center, #111827 0%, #030712 100%);
  user-select: none;
  touch-action: none;
}

.lightbox-img-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.08s cubic-bezier(0.16, 1, 0.3, 1);
  transform-origin: center center;
  user-select: none;
}

.lightbox-img-wrapper.is-dragging {
  transition: none !important;
}

.lightbox-img {
  max-width: 90vw;
  max-height: calc(94vh - 140px);
  object-fit: contain;
  display: block;
  border-radius: 8px;
  pointer-events: auto;
  user-select: none;
  -webkit-user-drag: none;
  transition: all 0.2s ease;
}

.lightbox-img.border-cyan {
  border: 1.5px solid rgba(56, 189, 248, 0.45);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7), 0 0 30px rgba(56, 189, 248, 0.15);
}

.lightbox-img.border-gold {
  border: 1.5px solid rgba(251, 191, 36, 0.45);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.7), 0 0 30px rgba(245, 158, 11, 0.15);
}

/* Floating Navigation Arrows */
.lightbox-nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(15, 23, 42, 0.85);
  border: 1.5px solid #475569;
  color: #ffffff;
  font-size: 30px;
  font-weight: 300;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  z-index: 10;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  padding: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
}

.lightbox-nav-arrow.left {
  left: 20px;
}

.lightbox-nav-arrow.right {
  right: 20px;
}

.lightbox-nav-arrow:hover {
  background: #0284c7;
  border-color: #38bdf8;
  transform: translateY(-50%) scale(1.1);
  box-shadow: 0 0 20px rgba(56, 189, 248, 0.6);
}

/* Lightbox Footer Info Ribbon */
.lightbox-footer {
  padding: 10px 20px;
  background: #0f172a;
  border-top: 1px solid #334155;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  gap: 16px;
}

.lightbox-caption {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
  color: #cbd5e1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.caption-icon {
  font-size: 1rem;
}

.lightbox-hints {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
}

.hint-tag {
  background: #1e293b;
  border: 1px solid #334155;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: 11px;
  color: #94a3b8;
}

.lightbox-done-btn {
  background: #334155;
  color: #f8fafc;
  font-size: 12px;
  font-weight: 700;
  padding: 5px 14px;
  border-radius: 6px;
  border: 1px solid #475569;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}

.lightbox-done-btn:hover {
  background: #475569;
  color: #ffffff;
}

@media (max-width: 900px) {
  .case-study-grid {
    grid-template-columns: 1fr;
  }
  .layer-item {
    flex-direction: column;
    gap: 8px;
  }
  .lightbox-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .lightbox-actions {
    width: 100%;
    justify-content: space-between;
  }
  .lightbox-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  .lightbox-hints {
    width: 100%;
    justify-content: space-between;
  }
}

@media (max-width: 768px) {
  .demo-modal-header {
    flex-direction: column;
    align-items: flex-start;
  }
  .demo-modal-actions {
    width: 100%;
    justify-content: space-between;
  }
  .demo-iframe-wrapper {
    height: 420px;
  }
  .lightbox-nav-arrow {
    width: 38px;
    height: 38px;
    font-size: 24px;
  }
}
</style>
