<template>
  <Teleport to="body">
    <div v-if="isFireworksOpen" class="fireworks-overlay" @click="handleCanvasClick">
      <!-- Fullscreen 2D Canvas -->
      <canvas ref="canvasRef" class="fireworks-canvas"></canvas>

      <!-- Glassmorphic Header / Control Panel -->
      <div class="fireworks-control-bar" @click.stop>
        <div class="control-brand">
          <span class="brand-icon">🎆</span>
          <div>
            <h3 class="brand-title">2D Fireworks Simulation</h3>
            <p class="brand-sub">Click anywhere on screen to detonate custom bursts</p>
          </div>
        </div>

        <div class="control-actions">
          <button type="button" class="fx-action-btn primary" @click="launchMultipleRockets(5)">
            🚀 Launch Wave
          </button>
          
          <button 
            type="button" 
            class="fx-action-btn" 
            :class="{ active: isSoundEnabled }"
            @click="toggleSound"
          >
            {{ isSoundEnabled ? '🔊 Sound: ON' : '🔇 Muted' }}
          </button>

          <button type="button" class="fx-action-btn proof-btn" @click="openProof">
            ⚡ Built in 49s Proof ↗
          </button>

          <button type="button" class="fx-close-btn" @click="handleClose" title="Exit Fireworks (Esc)">
            ✕ Close (Esc)
          </button>
        </div>
      </div>

      <!-- Bottom Hint Banner -->
      <div class="fireworks-footer-hint" @click.stop>
        <span>⚡ <strong>Interactive FX Demo:</strong> HTML5 2D Particle Engine with Web Audio API Synthesizer</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { isFireworksOpen, closeFireworks, isSoundEnabled, toggleSound } from './fireworksState'
import { openDemo } from './demoState'

const canvasRef = ref<HTMLCanvasElement | null>(null)
let animId: number | null = null
let audioCtx: AudioContext | null = null

// Palette definition
const COLORS = [
  '#38bdf8', // Cyan
  '#fbbf24', // Amber gold
  '#34d399', // Emerald
  '#f43f5e', // Ruby Rose
  '#c084fc', // Violet
  '#38ef7d', // Neon Green
  '#ff7675'  // Bright Coral
]

interface Rocket {
  x: number
  y: number
  targetY: number
  vx: number
  vy: number
  color: string
  trail: { x: number; y: number; alpha: number }[]
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  alpha: number
  decay: number
  size: number
  gravity: number
  friction: number
  hasCrackle: boolean
}

let rockets: Rocket[] = []
let particles: Particle[] = []

// Web Audio API Synthesizer
function initAudio() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
}

function playLaunchSound(xRatio: number) {
  if (!isSoundEnabled.value || !audioCtx) return
  try {
    const now = audioCtx.currentTime
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    const panner = audioCtx.createStereoPanner ? audioCtx.createStereoPanner() : null

    osc.type = 'sine'
    osc.frequency.setValueAtTime(140, now)
    osc.frequency.exponentialRampToValueAtTime(500, now + 0.45)

    gain.gain.setValueAtTime(0.08, now)
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5)

    if (panner) {
      panner.pan.setValueAtTime((xRatio - 0.5) * 1.6, now)
      osc.connect(panner)
      panner.connect(gain)
    } else {
      osc.connect(gain)
    }
    gain.connect(audioCtx.destination)

    osc.start(now)
    osc.stop(now + 0.5)
  } catch {
    // Audio fallback safe
  }
}

function playExplosionSound(xRatio: number, power: number = 1) {
  if (!isSoundEnabled.value || !audioCtx) return
  try {
    const now = audioCtx.currentTime

    // 1. Sub-bass boom
    const boomOsc = audioCtx.createOscillator()
    const boomGain = audioCtx.createGain()
    boomOsc.type = 'triangle'
    boomOsc.frequency.setValueAtTime(120, now)
    boomOsc.frequency.exponentialRampToValueAtTime(30, now + 0.5)

    boomGain.gain.setValueAtTime(0.25 * power, now)
    boomGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6)

    boomOsc.connect(boomGain)
    boomGain.connect(audioCtx.destination)
    boomOsc.start(now)
    boomOsc.stop(now + 0.6)

    // 2. Crackle noise burst
    const bufferSize = audioCtx.sampleRate * 0.4
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25))
    }

    const noise = audioCtx.createBufferSource()
    noise.buffer = buffer

    const filter = audioCtx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(800, now)

    const noiseGain = audioCtx.createGain()
    noiseGain.gain.setValueAtTime(0.2 * power, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(audioCtx.destination)

    noise.start(now)
    noise.stop(now + 0.4)
  } catch {
    // Audio fallback safe
  }
}

function createRocket(startX?: number, targetX?: number, targetY?: number) {
  if (!canvasRef.value) return
  const w = canvasRef.value.width
  const h = canvasRef.value.height

  const x = startX !== undefined ? startX : Math.random() * (w * 0.8) + w * 0.1
  const tY = targetY !== undefined ? targetY : Math.random() * (h * 0.45) + h * 0.12
  const tX = targetX !== undefined ? targetX : x + (Math.random() - 0.5) * 120

  const vy = -(Math.sqrt(2 * 0.2 * (h - tY)) * 0.75 + Math.random() * 2)
  const vx = (tX - x) / (Math.abs(vy) * 2.2)

  const color = COLORS[Math.floor(Math.random() * COLORS.length)]

  rockets.push({
    x,
    y: h,
    targetY: tY,
    vx,
    vy,
    color,
    trail: []
  })

  playLaunchSound(x / w)
}

function explode(x: number, y: number, color: string) {
  if (!canvasRef.value) return
  const w = canvasRef.value.width
  const count = 90 + Math.floor(Math.random() * 40)

  playExplosionSound(x / w, 1.2)

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = Math.random() * 6.5 + 1.2
    const vx = Math.cos(angle) * speed
    const vy = Math.sin(angle) * speed

    particles.push({
      x,
      y,
      vx,
      vy,
      color,
      alpha: 1,
      decay: Math.random() * 0.015 + 0.012,
      size: Math.random() * 2.5 + 1.5,
      gravity: 0.065,
      friction: 0.965,
      hasCrackle: Math.random() > 0.6
    })
  }
}

function launchMultipleRockets(count: number = 4) {
  initAudio()
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      if (isFireworksOpen.value) {
        createRocket()
      }
    }, i * 220)
  }
}

function handleCanvasClick(e: MouseEvent) {
  initAudio()
  if (!canvasRef.value) return
  const rect = canvasRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const color = COLORS[Math.floor(Math.random() * COLORS.length)]
  explode(x, y, color)
}

function resizeCanvas() {
  if (!canvasRef.value) return
  canvasRef.value.width = window.innerWidth
  canvasRef.value.height = window.innerHeight
}

function animate() {
  if (!canvasRef.value || !isFireworksOpen.value) return
  const ctx = canvasRef.value.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = 'rgba(15, 23, 42, 0.22)'
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height)

  for (let i = rockets.length - 1; i >= 0; i--) {
    const r = rockets[i]
    r.trail.push({ x: r.x, y: r.y, alpha: 1 })
    if (r.trail.length > 8) r.trail.shift()

    r.x += r.vx
    r.y += r.vy
    r.vy += 0.08

    for (let t = 0; t < r.trail.length; t++) {
      const pt = r.trail[t]
      ctx.beginPath()
      ctx.arc(pt.x, pt.y, 1.8, 0, Math.PI * 2)
      ctx.fillStyle = r.color
      ctx.globalAlpha = (t / r.trail.length) * 0.7
      ctx.fill()
    }
    ctx.globalAlpha = 1

    ctx.beginPath()
    ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2)
    ctx.fillStyle = '#ffffff'
    ctx.fill()

    if (r.y <= r.targetY || r.vy >= -0.5) {
      explode(r.x, r.y, r.color)
      rockets.splice(i, 1)
    }
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i]
    p.vx *= p.friction
    p.vy *= p.friction
    p.vy += p.gravity
    p.x += p.vx
    p.y += p.vy
    p.alpha -= p.decay

    if (p.alpha <= 0) {
      particles.splice(i, 1)
      continue
    }

    ctx.beginPath()
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
    ctx.fillStyle = p.color
    ctx.globalAlpha = p.alpha
    ctx.shadowBlur = 6
    ctx.shadowColor = p.color
    ctx.fill()
    ctx.shadowBlur = 0
  }
  ctx.globalAlpha = 1

  animId = requestAnimationFrame(animate)
}

function handleClose() {
  closeFireworks()
}

function openProof() {
  closeFireworks()
  openDemo('fireworks-case-study')
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isFireworksOpen.value) {
    closeFireworks()
  }
}

watch(isFireworksOpen, (open) => {
  if (open) {
    initAudio()
    setTimeout(() => {
      resizeCanvas()
      rockets = []
      particles = []
      launchMultipleRockets(5)
      animate()
    }, 50)
  } else {
    if (animId) {
      cancelAnimationFrame(animId)
      animId = null
    }
  }
})

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', resizeCanvas)
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', resizeCanvas)
    window.removeEventListener('keydown', handleKeydown)
    if (animId) cancelAnimationFrame(animId)
  }
})
</script>

<style scoped>
.fireworks-overlay {
  position: fixed;
  inset: 0;
  background: #0f172a;
  z-index: 99999;
  overflow: hidden;
  cursor: crosshair;
  animation: fadeIn 0.2s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.fireworks-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.fireworks-control-bar {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.88);
  border: 1.5px solid #334155;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(245, 158, 11, 0.2);
  z-index: 10;
  width: 92%;
  max-width: 920px;
  cursor: default;
}

.control-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon {
  font-size: 26px;
}

.brand-title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 800;
  color: #fef08a;
}

.brand-sub {
  margin: 2px 0 0 0;
  font-size: 0.78rem;
  color: #94a3b8;
}

.control-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.fx-action-btn {
  background: #1e293b;
  border: 1px solid #475569;
  color: #cbd5e1;
  font-size: 0.82rem;
  font-weight: 700;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.fx-action-btn:hover {
  background: #334155;
  color: #ffffff;
  border-color: #64748b;
}
.fx-action-btn.primary {
  background: linear-gradient(135deg, #d97706, #f59e0b);
  border-color: #fbbf24;
  color: #0f172a;
  font-weight: 800;
}
.fx-action-btn.primary:hover {
  background: linear-gradient(135deg, #f59e0b, #fbbf24);
  box-shadow: 0 0 15px rgba(251, 191, 36, 0.4);
}
.fx-action-btn.active {
  border-color: #38bdf8;
  color: #38bdf8;
}
.fx-action-btn.proof-btn {
  background: rgba(2, 132, 199, 0.2);
  border-color: rgba(56, 189, 248, 0.5);
  color: #38bdf8;
  font-weight: 800;
}
.fx-action-btn.proof-btn:hover {
  background: rgba(2, 132, 199, 0.35);
  border-color: #38bdf8;
  color: #ffffff;
  box-shadow: 0 0 12px rgba(56, 189, 248, 0.3);
}

.fx-close-btn {
  background: #334155;
  border: 1px solid #475569;
  color: #f8fafc;
  font-size: 0.82rem;
  font-weight: 800;
  padding: 6px 14px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.fx-close-btn:hover {
  background: #ef4444;
  border-color: #f87171;
  color: #ffffff;
}

.fireworks-footer-hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(15, 23, 42, 0.75);
  border: 1px solid rgba(51, 65, 85, 0.7);
  backdrop-filter: blur(8px);
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.78rem;
  color: #cbd5e1;
  pointer-events: none;
}

@media (max-width: 900px) {
  .fireworks-control-bar {
    flex-direction: column;
    gap: 12px;
    top: 10px;
    padding: 12px;
  }
  .control-actions {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
