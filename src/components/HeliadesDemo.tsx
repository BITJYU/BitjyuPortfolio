import { useEffect, useRef, useState } from 'react'
import './HeliadesDemo.css'

type DemoState = 'IDLE' | 'THINKING' | 'LISTENING' | 'SPEAKING'

interface Color { r: number; g: number; b: number }
interface StateConfig { r: number; g: number; b: number; count: number; speed: number; spread: number; glow: number }
interface BreatheMetrics { breathePhase: number; breathCycle: number; spreadFactor: number; ringRadius: number; ringWidth: number; cloudRadius: number }
interface WaveProfile { enabled: boolean; rippleFreq: number; rippleDrift: number; angularShear: number; secondaryDrift: number; amplitude: number; fineAmplitude: number; scatter: number; smoothing: number; crestGain: number }

const STATE_CONFIG: Record<DemoState, StateConfig> = {
  IDLE:      { r: 140, g: 160, b: 200, count: 760,  speed: 0.28, spread: 0.58, glow: 0.12 },
  THINKING:  { r: 255, g: 210, b: 80,  count: 940,  speed: 0.35, spread: 0.64, glow: 0.22 },
  LISTENING: { r: 80,  g: 200, b: 255, count: 980,  speed: 0.42, spread: 0.68, glow: 0.26 },
  SPEAKING:  { r: 255, g: 212, b: 96,  count: 1380, speed: 0.72, spread: 0.84, glow: 0.56 },
}

const STAGE = {
  r: 104, g: 118, b: 240,
  pulseRate: 1.0, pulseDepth: 0.13, cohesion: 0.44,
  ringOpacity: 0.10, ringWidth: 1.5,
  trailBias: 1.08, centerBias: 0.30, motionReact: 0.48,
  fogAmp: 0.14, orbitShare: 0.12, accentShare: 0.03,
  glowBoost: 1.46, hazeScale: 1.24, fogScale: 1.28, densityScale: 1.42,
}

const DEMO_CYCLE: { state: DemoState; ms: number }[] = [
  { state: 'IDLE',      ms: 3000 },
  { state: 'THINKING',  ms: 2500 },
  { state: 'LISTENING', ms: 2500 },
  { state: 'SPEAKING',  ms: 2500 },
]

const SIZE = 280
const CX = SIZE / 2
const CY = SIZE / 2
const MAX_PARTICLES = 900

export default function HeliadesDemo() {
  const particleRef = useRef<HTMLCanvasElement>(null)
  const waveRef     = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [displayState, setDisplayState] = useState<string>('idle')

  useEffect(() => {
    const pCanvas = particleRef.current
    const wCanvas = waveRef.current
    const container = containerRef.current
    if (!pCanvas || !wCanvas || !container) return

    const pCtx = pCanvas.getContext('2d')!
    const wCtx = wCanvas.getContext('2d')!
    const DPR = window.devicePixelRatio || 1

    pCanvas.width  = SIZE * DPR
    pCanvas.height = SIZE * DPR
    pCtx.scale(DPR, DPR)

    let containerW = container.offsetWidth
    let containerH = container.offsetHeight

    function resizeWave() {
      containerW = container!.offsetWidth
      containerH = container!.offsetHeight
      wCanvas!.width  = Math.max(1, Math.floor(containerW * DPR))
      wCanvas!.height = Math.max(1, Math.floor(containerH * DPR))
      wCtx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }
    resizeWave()
    const ro = new ResizeObserver(resizeWave)
    ro.observe(container)

    // --- helpers ---
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t
    const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi)
    const rgba = (c: Color, a: number) => `rgba(${c.r | 0},${c.g | 0},${c.b | 0},${a.toFixed(3)})`
    const blend = (a: Color, b: Color, t: number): Color => ({ r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t) })
    const lerpCfg = (a: StateConfig, b: StateConfig, t: number): StateConfig => ({
      r: lerp(a.r, b.r, t), g: lerp(a.g, b.g, t), b: lerp(a.b, b.b, t),
      count: lerp(a.count, b.count, t), speed: lerp(a.speed, b.speed, t),
      spread: lerp(a.spread, b.spread, t), glow: lerp(a.glow, b.glow, t),
    })

    // --- mutable state ---
    let currentConfig: StateConfig = { ...STATE_CONFIG.IDLE }
    let targetConfig:  StateConfig = { ...STATE_CONFIG.IDLE }
    let lerpT = 1
    let currentState: DemoState = 'IDLE'
    let amplitude  = 0
    let smoothAmp  = 0
    let time       = 0
    const glowStrength  = 0.22
    const renderStage   = 2
    let centerBias = STAGE.centerBias

    interface Wave { radius: number; speed: number; width: number; alpha: number; jitter: number }
    let waves: Wave[] = []
    let prevBreathPhase = 0
    let waveEmitCooldown = 0

    const stateColor  = (): Color => ({ r: currentConfig.r, g: currentConfig.g, b: currentConfig.b })
    const stageColor  = (): Color => ({ r: STAGE.r, g: STAGE.g, b: STAGE.b })
    const particleColor = (): Color => blend(stateColor(), stageColor(), 0.22 + renderStage * 0.05)
    const shimmerColor  = (): Color => blend(stateColor(), stageColor(), 0.40)

    // --- breathe metrics ---
    function breathe(amp: number): BreatheMetrics {
      const breathePhase  = Math.sin(time * STAGE.pulseRate)
      const breathCycle   = (breathePhase + 1) / 2
      const spreadFactor  = Math.max(0.74, 1 + breathePhase * STAGE.pulseDepth * STAGE.cohesion + amp * STAGE.motionReact * 0.16)
      const ringRadius    = CX * (0.65 + breathCycle * 0.22 + amp * 0.08)
      const ringWidth     = STAGE.ringWidth * (1 + amp * 1.5)
      const cloudRadius   = CX * currentConfig.spread * spreadFactor * (0.82 + centerBias * 0.18)
      return { breathePhase, breathCycle, spreadFactor, ringRadius, ringWidth, cloudRadius }
    }

    // --- wave profile (stage 2) ---
    function waveProfile(amp: number): WaveProfile {
      return {
        enabled: true,
        rippleFreq: 0.205, rippleDrift: 2.95 + amp * 0.38, angularShear: 1.34,
        secondaryDrift: 2.10, amplitude: 30 + amp * 20, fineAmplitude: 15 + amp * 10,
        scatter: 9.4 + amp * 5.6, smoothing: 0.14, crestGain: 0.92,
      }
    }

    function waveOffset(angle: number, radius: number, wp: WaveProfile, seed: number) {
      const rp  = radius * wp.rippleFreq - time * wp.rippleDrift + seed
      const al  = Math.sin(angle + time * wp.angularShear + seed * 0.7) * (0.7 + wp.angularShear)
      const w1  = Math.sin(rp + al) * wp.amplitude
      const w2  = Math.sin(rp * 1.7 - time * wp.secondaryDrift + seed * 1.9) * wp.fineAmplitude
      const chp = Math.sin(rp * 2.45 + angle * (2.2 + wp.angularShear) + seed * 2.4) * wp.scatter
      return w1 + w2 + chp * (1 - wp.smoothing)
    }

    function pickBand() {
      const r = Math.random()
      if (r < STAGE.accentShare) return 'accent'
      if (r < STAGE.accentShare + STAGE.orbitShare) return Math.random() < 0.55 ? 'orbitInner' : 'orbitOuter'
      return 'free'
    }

    // --- Particle class ---
    class Particle {
      band = ''; seed = 0; x = 0; y = 0; vx = 0; vy = 0
      life = 0; maxLife = 1; size = 1.18; orbitR = 0; orbitA = 0
      waveNorm = 0; orbitSpeed = 0

      constructor() { this.reset(true) }

      reset(init = false) {
        this.band = pickBand()
        this.seed = Math.random()
        const angle = Math.random() * Math.PI * 2
        let rb = (0.22 + Math.random() * 0.72) * (1.08 - centerBias * 0.32)
        if (this.band === 'orbitInner') rb = 0.38 + Math.random() * 0.10
        if (this.band === 'orbitOuter') rb = 0.62 + Math.random() * 0.10
        if (this.band === 'accent')     rb = 0.78 + Math.random() * 0.08
        const r = currentConfig.spread * CX * rb
        this.x = CX + Math.cos(angle) * r
        this.y = CY + Math.sin(angle) * r
        this.vx = (Math.random() - 0.5) * currentConfig.speed
        this.vy = (Math.random() - 0.5) * currentConfig.speed
        this.life    = init ? Math.random() : 0
        this.maxLife = 0.7 + Math.random() * 1.6
        this.size    = 1.18
        this.orbitR  = r
        this.orbitA  = angle
        this.waveNorm = 0
        let ss = 1.0
        if (this.band === 'orbitInner') ss = 1.25
        if (this.band === 'orbitOuter') ss = 0.85
        if (this.band === 'accent')     ss = 0.55
        this.orbitSpeed = (Math.random() - 0.5) * 0.008 * STAGE.trailBias * ss
      }

      update(m: BreatheMetrics, amp: number) {
        this.life += 0.004 + currentConfig.speed * 0.012
        if (this.life > this.maxLife) { this.reset(); return }

        this.orbitA += this.orbitSpeed * (1 + amp * (0.8 + STAGE.motionReact))
        const gp  = 1 + m.breathePhase * STAGE.pulseDepth * STAGE.cohesion
        const pp  = 1 + Math.sin(time * (1.0 + STAGE.trailBias * 0.15) + this.orbitA * (2.5 + renderStage)) * 0.08 * (1 + amp * STAGE.motionReact)
        const wp  = waveProfile(amp)
        const sn  = currentConfig.spread * m.spreadFactor

        let tAngle  = this.orbitA
        let tRadius = this.orbitR * gp * pp * sn / 0.62
        if (this.band === 'orbitInner') tRadius = CX * (0.24 + currentConfig.spread * 0.16) * (1 + m.breathePhase * 0.10 + amp * 0.03)
        else if (this.band === 'orbitOuter') tRadius = CX * (0.46 + currentConfig.spread * 0.18) * (1 + m.breathePhase * 0.12 + amp * 0.05)
        else if (this.band === 'accent')     tRadius = CX * (0.68 + currentConfig.spread * 0.14) * (1 + m.breathePhase * 0.08 + amp * 0.04)

        const wo = waveOffset(tAngle, tRadius, wp, this.seed * Math.PI * 2)
        const wj = Math.sin(time * (wp.rippleDrift + this.seed * 0.8) + this.seed * 18 + tAngle * (1.4 + wp.angularShear)) * wp.scatter *
          (this.band === 'free' ? 0.55 : this.band === 'accent' ? 0.22 : 0.10)
        tRadius += wo + wj
        this.waveNorm = wo / Math.max(wp.amplitude + wp.fineAmplitude, 1)

        if (currentState === 'THINKING') {
          tAngle  += Math.sin(time * 1.2 + this.seed * 10) * (0.04 + STAGE.cohesion * 0.05) * 0.10
          tRadius *= 1 + Math.sin(tAngle + time * 0.9) * (0.04 + STAGE.cohesion * 0.05) * 0.14
        }

        const tx = CX + Math.cos(tAngle) * tRadius
        const ty = CY + Math.sin(tAngle) * tRadius
        let cp = 0.0018 + STAGE.cohesion * 0.008 + m.breathCycle * STAGE.cohesion * 0.003
        if (this.band === 'orbitInner') cp *= 0.40
        if (this.band === 'orbitOuter') cp *= 0.16
        if (this.band === 'accent')     cp *= 0.08
        if (this.band === 'free')       cp *= 0.45

        this.vx += (tx - this.x) * 0.014 + (CX - this.x) * cp
        this.vy += (ty - this.y) * 0.014 + (CY - this.y) * cp
        this.vx *= 0.88; this.vy *= 0.88
        this.x  += this.vx * (1 + amp * STAGE.motionReact)
        this.y  += this.vy * (1 + amp * STAGE.motionReact)
      }

      draw(color: Color, m: BreatheMetrics) {
        const fade  = Math.sin((this.life / this.maxLife) * Math.PI)
        const dist  = Math.hypot(this.x - CX, this.y - CY)
        const edge  = Math.max(0, 1 - dist / Math.max(m.cloudRadius, 1))
        const den   = Math.pow(edge, 1.35)
        const wp    = waveProfile(smoothAmp)
        const crest = 1 + Math.abs(this.waveNorm) * (wp.crestGain || 0.35)
        const ba    = this.band === 'accent' ? 0.10 : this.band.startsWith('orbit') ? 0.05 : 0.0
        const alpha = fade * (0.12 + den * 0.22 + STAGE.cohesion * 0.06 + ba) * crest
        pCtx.beginPath(); pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        pCtx.fillStyle = rgba(color, alpha); pCtx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < MAX_PARTICLES; i++) particles.push(new Particle())

    function ensureCount(n: number) {
      while (particles.length < n) particles.push(new Particle())
      if (particles.length > n) particles.splice(n)
    }

    // --- screen waves ---
    function spawnWave(str: number, rnd: boolean) {
      const bs = 128 + renderStage * 24 + smoothAmp * 36
      const bw = 18  + renderStage * 7  + smoothAmp * 12
      waves.push({
        radius: 8,
        speed:  bs * (rnd ? (0.94 + Math.random() * 0.12) : 1.0),
        width:  bw * (rnd ? (0.92 + Math.random() * 0.14) : 1.0),
        alpha:  (0.11 + STAGE.glowBoost * 0.045 + smoothAmp * 0.04) * str,
        jitter: rnd ? Math.random() * Math.PI * 2 : 0,
      })
    }

    function drawScreenWaves(m: BreatheMetrics, dt: number) {
      wCtx.clearRect(0, 0, containerW, containerH)
      const wr  = wCanvas!.getBoundingClientRect()
      const pr  = pCanvas!.getBoundingClientRect()
      const ox  = pr.left - wr.left + pr.width  * 0.5
      const oy  = pr.top  - wr.top  + pr.height * 0.5
      const max = Math.hypot(containerW, containerH) * 0.72
      const gold = blend({ r: 255, g: 214, b: 116 }, blend(stateColor(), stageColor(), 0.24), 0.16)

      waveEmitCooldown -= dt
      const pulse = prevBreathPhase < 0.84 && m.breathePhase >= 0.84
      if (pulse && waveEmitCooldown <= 0) {
        spawnWave(1.0, false); spawnWave(0.74, true)
        waveEmitCooldown = Math.max(0.62, 0.96 - renderStage * 0.08)
      }
      prevBreathPhase = m.breathePhase

      waves = waves.filter(w => w.radius - w.width < max)
      for (const w of waves) {
        w.radius += w.speed * dt
        const life  = 1 - clamp(w.radius / max, 0, 1)
        const alpha = w.alpha * Math.pow(life, 1.1)
        const width = w.width * (0.88 + life * 0.32)
        const ir    = Math.max(1, w.radius - width)
        const or_   = w.radius + width
        const g     = wCtx.createRadialGradient(ox, oy, ir, ox, oy, or_)
        g.addColorStop(0.0,  rgba(gold, 0))
        g.addColorStop(0.42, rgba(gold, alpha * 0.22))
        g.addColorStop(0.50, rgba(gold, alpha))
        g.addColorStop(0.64, rgba(gold, alpha * 0.28))
        g.addColorStop(1.0,  rgba(gold, 0))
        wCtx.beginPath(); wCtx.arc(ox, oy, or_, 0, Math.PI * 2)
        wCtx.fillStyle = g; wCtx.fill()
      }
    }

    // --- particle canvas draw functions ---
    function drawHaze(sc: Color, m: BreatheMetrics, amp: number) {
      pCtx.clearRect(0, 0, SIZE, SIZE)
      const hr  = CX * (1.06 + currentConfig.spread * 0.34 + glowStrength * 0.10 + m.breathCycle * 0.12) * STAGE.hazeScale
      const g   = pCtx.createRadialGradient(CX, CY, 0, CX, CY, hr)
      const int = (currentConfig.glow + glowStrength * 0.22 + m.breathCycle * 0.06 + amp * 0.10) * STAGE.glowBoost
      g.addColorStop(0,    rgba(sc, int * 0.56))
      g.addColorStop(0.55, rgba(sc, int * 0.24))
      g.addColorStop(1,    rgba(sc, 0))
      pCtx.beginPath(); pCtx.arc(CX, CY, hr, 0, Math.PI * 2)
      pCtx.fillStyle = g; pCtx.fill()
    }

    function drawGoldenBursts(m: BreatheMetrics, amp: number) {
      const gold = blend({ r: 255, g: 214, b: 120 }, stageColor(), 0.18)
      const cnt  = 2 + renderStage
      const spd  = 0.10 + renderStage * 0.035 + amp * 0.025
      const str  = 0.12 + STAGE.glowBoost * 0.075 + amp * 0.08
      for (let i = 0; i < cnt; i++) {
        const cyc = (time * spd + i * 0.19) % 1
        const r   = CX * (0.22 + cyc * (1.34 + renderStage * 0.10))
        const th  = 7 + (1 - cyc) * 20 + renderStage * 4
        const al  = Math.pow(1 - cyc, 1.15) * str * (1 - i / (cnt + 1))
        const ir  = Math.max(1, r - th); const or_ = r + th
        const g   = pCtx.createRadialGradient(CX, CY, ir, CX, CY, or_)
        g.addColorStop(0.0, rgba(gold, 0)); g.addColorStop(0.50, rgba(gold, al)); g.addColorStop(1.0, rgba(gold, 0))
        pCtx.beginPath(); pCtx.arc(CX, CY, or_, 0, Math.PI * 2); pCtx.fillStyle = g; pCtx.fill()
      }
    }

    function drawFog(sc: Color, m: BreatheMetrics, amp: number) {
      const fr = CX * (0.46 + STAGE.cohesion * 0.24 + glowStrength * 0.08 + m.breathCycle * STAGE.pulseDepth * 1.4) * STAGE.fogScale
      const g  = pCtx.createRadialGradient(CX, CY, 0, CX, CY, fr)
      const fi = (0.12 + glowStrength * 0.28 + STAGE.fogAmp * amp + m.breathCycle * 0.14) * STAGE.glowBoost
      g.addColorStop(0, rgba(sc, fi * 0.82)); g.addColorStop(0.45, rgba(sc, fi * 0.42)); g.addColorStop(1, rgba(sc, 0))
      pCtx.beginPath(); pCtx.arc(CX, CY, fr, 0, Math.PI * 2); pCtx.fillStyle = g; pCtx.fill()
    }

    function drawDust(sc: Color, stc: Color) {
      const gold = blend({ r: 255, g: 214, b: 120 }, blend(sc, stc, 0.30), 0.22)
      const cnt  = 80 + renderStage * 36
      for (let i = 0; i < cnt; i++) {
        const seed  = i * 0.61803398875
        const angle = seed * Math.PI * 2 + time * 0.005
        const shell = 0.78 + ((i * 17) % 100) / 100 * 0.78
        const r     = CX * shell + Math.sin(time * 0.8 + i * 0.37) * 8
        const x     = CX + Math.cos(angle) * r; const y = CY + Math.sin(angle) * r
        const al    = 0.05 + ((i * 13) % 10) / 10 * 0.08 + renderStage * 0.015
        pCtx.beginPath(); pCtx.arc(x, y, 0.6 + ((i * 7) % 10) / 10 * 0.9, 0, Math.PI * 2)
        pCtx.fillStyle = rgba(gold, al); pCtx.fill()
      }
    }

    function drawCore(sc: Color, stc: Color, m: BreatheMetrics, amp: number) {
      const gold = blend({ r: 255, g: 212, b: 118 }, blend(sc, stc, 0.22), 0.26)
      const lc   = 2 + renderStage; const br = CX * (0.22 + renderStage * 0.034)
      for (let i = 0; i < lc; i++) {
        const r  = br + i * 14 + m.breathCycle * (1.8 + i * 0.45)
        const th = 8 + i * 1.8 + renderStage * 0.8
        const or_ = r + th; const ir = Math.max(1, r - th * 0.72)
        const al  = (0.16 + STAGE.glowBoost * 0.032 + amp * 0.05) * (1 - i / (lc + 2))
        const g   = pCtx.createRadialGradient(CX, CY, ir, CX, CY, or_)
        g.addColorStop(0.0, rgba(gold, 0)); g.addColorStop(0.52, rgba(gold, al)); g.addColorStop(1.0, rgba(gold, 0))
        pCtx.beginPath(); pCtx.arc(CX, CY, or_, 0, Math.PI * 2); pCtx.fillStyle = g; pCtx.fill()
        const nc = 10 + i * 6
        for (let n = 0; n < nc; n++) {
          const a  = (n / nc) * Math.PI * 2 + time * 0.04 * (i % 2 === 0 ? 1 : -1)
          const nr = r + Math.sin(time * 0.9 + n * 0.3) * 0.9
          pCtx.beginPath(); pCtx.arc(CX + Math.cos(a) * nr, CY + Math.sin(a) * nr, 1.1 + i * 0.18, 0, Math.PI * 2)
          pCtx.fillStyle = rgba(gold, al * 0.72); pCtx.fill()
        }
      }
    }

    function drawOrnaments(sc: Color, stc: Color, m: BreatheMetrics, amp: number) {
      const gold = blend({ r: 255, g: 216, b: 126 }, blend(sc, stc, 0.22), 0.22)
      const rr   = CX * (0.35 + renderStage * 0.034 + m.breathCycle * 0.012)
      const mc   = 12 + renderStage * 5
      const sa   = 0.10 + STAGE.glowBoost * 0.035 + amp * 0.04
      for (let i = 0; i < mc; i++) {
        const a  = (i / mc) * Math.PI * 2 + time * 0.08
        const ir = rr - 10; const or_ = rr + 14 + Math.sin(time * 1.1 + i * 0.4) * 2.5
        pCtx.beginPath()
        pCtx.moveTo(CX + Math.cos(a) * ir, CY + Math.sin(a) * ir)
        pCtx.lineTo(CX + Math.cos(a) * or_, CY + Math.sin(a) * or_)
        pCtx.strokeStyle = rgba(gold, sa); pCtx.lineWidth = 1.3; pCtx.stroke()
      }
      pCtx.beginPath(); pCtx.arc(CX, CY, rr + 2, 0, Math.PI * 2)
      pCtx.strokeStyle = rgba(gold, sa * 0.72); pCtx.lineWidth = 2.2; pCtx.stroke()
    }

    function drawVoid() {
      const vr = CX * (0.14 + renderStage * 0.024 + smoothAmp * 0.016)
      const g  = pCtx.createRadialGradient(CX, CY, 0, CX, CY, vr * 1.24)
      g.addColorStop(0.0, 'rgba(3,4,8,0.98)'); g.addColorStop(0.52, 'rgba(5,7,13,0.92)'); g.addColorStop(1.0, 'rgba(5,7,13,0)')
      pCtx.beginPath(); pCtx.arc(CX, CY, vr * 1.24, 0, Math.PI * 2); pCtx.fillStyle = g; pCtx.fill()
      pCtx.beginPath(); pCtx.arc(CX, CY, vr, 0, Math.PI * 2); pCtx.fillStyle = 'rgba(4,5,10,0.96)'; pCtx.fill()
    }

    function drawHalo(sc: Color, stc: Color, m: BreatheMetrics, amp: number) {
      const gold = blend({ r: 255, g: 210, b: 110 }, blend(sc, stc, 0.28), 0.22)
      const hl   = 3 + renderStage
      for (let i = 0; i < hl; i++) {
        const r  = CX * (0.38 + renderStage * 0.028 + i * 0.090 + m.breathCycle * 0.012 * (i + 1))
        const al = (0.03 + STAGE.glowBoost * 0.025 + amp * 0.03) * (1 - i / (hl + 1))
        pCtx.beginPath(); pCtx.arc(CX, CY, r, 0, Math.PI * 2)
        pCtx.strokeStyle = rgba(gold, al); pCtx.lineWidth = 1.2 + (hl - i) * 0.35; pCtx.stroke()
      }
    }

    function drawRing(sc: Color, m: BreatheMetrics, amp: number) {
      const or_ = m.ringRadius + m.ringWidth; const ir = Math.max(1, m.ringRadius - m.ringWidth)
      const al  = STAGE.ringOpacity * m.breathCycle * (0.75 + amp * 0.35)
      const g   = pCtx.createRadialGradient(CX, CY, ir, CX, CY, or_)
      g.addColorStop(0.0, rgba(sc, 0)); g.addColorStop(0.5, rgba(sc, al)); g.addColorStop(1.0, rgba(sc, 0))
      pCtx.beginPath(); pCtx.arc(CX, CY, or_, 0, Math.PI * 2); pCtx.fillStyle = g; pCtx.fill()
    }

    function drawListeningCue(sc: Color, m: BreatheMetrics, amp: number) {
      if (currentState !== 'LISTENING') return
      const cue   = blend(sc, { r: 214, g: 248, b: 255 }, 0.42)
      const pulse = 0.5 + m.breathCycle * 0.5
      const react = clamp(amp, 0, 1)
      const outerR = m.cloudRadius * (1.04 + pulse * 0.06 + react * 0.12)
      const innerR = Math.max(1, outerR - 9 - pulse * 3 - react * 2.5)
      const g = pCtx.createRadialGradient(CX, CY, innerR, CX, CY, outerR)
      g.addColorStop(0.0,  rgba(cue, 0))
      g.addColorStop(0.42, rgba(cue, 0.12 + pulse * 0.10 + react * 0.16))
      g.addColorStop(0.60, rgba(cue, 0.26 + pulse * 0.14 + react * 0.28))
      g.addColorStop(1.0,  rgba(cue, 0))
      pCtx.beginPath(); pCtx.arc(CX, CY, outerR, 0, Math.PI * 2); pCtx.fillStyle = g; pCtx.fill()

      pCtx.save()
      pCtx.strokeStyle = rgba(cue, 0.30 + pulse * 0.18 + react * 0.22)
      pCtx.lineWidth = 2.2 + pulse * 0.9 + react * 1.8
      pCtx.lineCap = 'round'
      const sideR   = m.cloudRadius * (0.98 + react * 0.05)
      const arcSpan = 0.42 + pulse * 0.06 + react * 0.08
      pCtx.beginPath(); pCtx.arc(CX, CY, sideR, Math.PI - arcSpan, Math.PI + arcSpan * 0.28); pCtx.stroke()
      pCtx.beginPath(); pCtx.arc(CX, CY, sideR, -arcSpan * 0.28, arcSpan); pCtx.stroke()
      pCtx.restore()
    }

    function drawShimmer(sc: Color, m: BreatheMetrics, amp: number) {
      const al = 0.04 + m.breathCycle * 0.05 + amp * 0.04
      const r  = m.cloudRadius * (0.92 + STAGE.cohesion * 0.08)
      pCtx.beginPath(); pCtx.arc(CX, CY, r, 0, Math.PI * 2)
      pCtx.strokeStyle = rgba(sc, al); pCtx.lineWidth = 1.0 + STAGE.cohesion * 1.3 + amp * 0.8; pCtx.stroke()
    }

    // --- apply state ---
    function applyState(state: DemoState) {
      currentState = state
      targetConfig = { ...STATE_CONFIG[state] }
      lerpT = 0
      amplitude = state === 'SPEAKING' ? 0.6 : state === 'LISTENING' ? 0.4 : state === 'THINKING' ? 0.3 : 0
    }

    // --- demo cycle ---
    let cycleIdx = 0
    let cycleTimer: ReturnType<typeof setTimeout>
    function scheduleCycle() {
      cycleTimer = setTimeout(() => {
        cycleIdx = (cycleIdx + 1) % DEMO_CYCLE.length
        applyState(DEMO_CYCLE[cycleIdx].state)
        setDisplayState(DEMO_CYCLE[cycleIdx].state.toLowerCase())
        scheduleCycle()
      }, DEMO_CYCLE[cycleIdx].ms)
    }
    scheduleCycle()

    // --- animation loop ---
    let rafId = 0
    function loop() {
      const dt = 0.016
      time += dt
      smoothAmp += (amplitude - smoothAmp) * 0.18

      if (lerpT < 1) { lerpT = Math.min(1, lerpT + 0.025); currentConfig = lerpCfg(currentConfig, targetConfig, lerpT) }
      centerBias += (STAGE.centerBias - centerBias) * (1 / 300)

      const m   = breathe(smoothAmp)
      const sc  = stateColor(); const stc = stageColor()
      const pc  = particleColor(); const shc = shimmerColor()

      drawScreenWaves(m, dt)

      const want = Math.min(MAX_PARTICLES, (currentConfig.count * STAGE.densityScale * (1 + smoothAmp * 0.22)) | 0)
      ensureCount(want)

      drawHaze(sc, m, smoothAmp)
      drawGoldenBursts(m, smoothAmp)
      drawFog(stc, m, smoothAmp)
      drawDust(sc, stc)
      for (const p of particles) { p.update(m, smoothAmp); p.draw(pc, m) }
      drawCore(sc, stc, m, smoothAmp)
      drawOrnaments(sc, stc, m, smoothAmp)
      drawVoid()
      drawHalo(sc, stc, m, smoothAmp)
      drawRing(sc, m, smoothAmp)
      drawShimmer(shc, m, smoothAmp)
      drawListeningCue(sc, m, smoothAmp)

      rafId = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(cycleTimer)
      ro.disconnect()
    }
  }, [])

  return (
    <div ref={containerRef} className="heliades-demo">
      <canvas ref={waveRef} className="heliades-wave" />
      <div className="heliades-content">
        <div className="heliades-status">{displayState}</div>
        <div className="heliades-orb-wrap">
          <canvas ref={particleRef} className="heliades-particle" style={{ width: SIZE, height: SIZE }} />
          <span className="heliades-label">HELLIADES</span>
        </div>
        <div className="heliades-demo-tag">DEMO MODE</div>
      </div>
    </div>
  )
}
