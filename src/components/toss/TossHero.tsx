import { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import './TossHero.css'

interface ShapeProps {
  position: [number, number, number]
  geometry: 'rounded' | 'sphere' | 'icosahedron' | 'torus'
  color: string
  speed: number
  rotationAxis: 'x' | 'y' | 'xy'
  scale?: number
}

function FloatingShape({ position, geometry, color, speed, rotationAxis, scale = 1 }: ShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    meshRef.current.position.y = position[1] + Math.sin(t * speed) * 0.25
    if (rotationAxis === 'x' || rotationAxis === 'xy') meshRef.current.rotation.x += 0.006
    if (rotationAxis === 'y' || rotationAxis === 'xy') meshRef.current.rotation.y += 0.009
  })

  const mat = <meshStandardMaterial color={color} metalness={0.1} roughness={0.25} emissive={color} emissiveIntensity={0.25} />

  if (geometry === 'rounded') {
    return (
      <RoundedBox ref={meshRef} position={position} scale={scale} args={[1, 1, 1]} radius={0.3} smoothness={6}>
        {mat}
      </RoundedBox>
    )
  }

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {geometry === 'sphere'      && <sphereGeometry args={[0.6, 32, 32]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[0.7, 2]} />}
      {geometry === 'torus'       && <torusGeometry args={[0.5, 0.22, 20, 40]} />}
      {mat}
    </mesh>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <pointLight position={[-4, 2, 3]} intensity={1.0} color="#60A5FA" />
      <pointLight position={[3, -2, 2]} intensity={0.6} color="#C4B5FD" />
      <FloatingShape position={[-1.8, 0.8, 0]}   geometry="rounded"      color="#60A5FA" speed={0.9}  rotationAxis="xy" scale={0.85} />
      <FloatingShape position={[1.6, 1.0, -0.5]}  geometry="sphere"       color="#818CF8" speed={1.1}  rotationAxis="y"  scale={0.75} />
      <FloatingShape position={[-0.4, -1.2, 0.5]} geometry="icosahedron"  color="#22D3EE" speed={0.75} rotationAxis="xy" scale={0.8}  />
      <FloatingShape position={[1.2, -0.8, -1]}   geometry="torus"        color="#A78BFA" speed={1.3}  rotationAxis="x"  scale={0.7}  />
      <FloatingShape position={[0.2, 1.8, -1]}    geometry="rounded"      color="#FCA5A5" speed={0.65} rotationAxis="xy" scale={0.5}  />
    </>
  )
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight
    const W = canvas.width
    const H = canvas.height

    const dots = Array.from({ length: 25 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.15 + 0.05,
    }))

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      for (const d of dots) {
        ctx!.beginPath()
        ctx!.arc(d.x, d.y, d.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(49,130,246,${d.alpha})`
        ctx!.fill()
        d.x += d.dx
        d.y += d.dy
        if (d.x < 0 || d.x > W) d.dx *= -1
        if (d.y < 0 || d.y > H) d.dy *= -1
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(animId)
  }, [canvasRef])
}

const CARD_DATA = {
  frontend: {
    role: 'Frontend Developer',
    sub: 'React · TypeScript · Vite',
    gradient: 'linear-gradient(135deg, #3182F6, #22D3EE)',
    tags: [
      { label: 'React', cls: 'blue' },
      { label: 'TypeScript', cls: 'violet' },
      { label: 'Vite', cls: 'cyan' },
      { label: 'CSS', cls: 'amber' },
    ],
    statLabel: 'Projects',
    statValue: '8+',
  },
  backend: {
    role: 'Backend / AI',
    sub: 'Python · Node.js · PyTorch',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
    tags: [
      { label: 'Python', cls: 'blue' },
      { label: 'Node.js', cls: 'violet' },
      { label: 'GCP', cls: 'cyan' },
      { label: 'AWS', cls: 'amber' },
    ],
    statLabel: 'Projects',
    statValue: '12+',
  },
} as const

type CardKey = keyof typeof CARD_DATA

function TiltCard() {
  const cardRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<CardKey>('backend')
  const [animKey, setAnimKey] = useState(0)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width  - 0.5
      const y = (e.clientY - rect.top)  / rect.height - 0.5
      card.style.transform = `perspective(600px) rotateY(${x * 18}deg) rotateX(${-y * 12}deg)`
    }
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(600px) rotateY(-6deg) rotateX(3deg)'
    }
    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const handleToggle = () => {
    setActive(prev => prev === 'frontend' ? 'backend' : 'frontend')
    setAnimKey(k => k + 1)
  }

  const data = CARD_DATA[active]

  return (
    <div ref={cardRef} className="toss-hero-card">
      <div className="toss-hero-card-content" key={animKey}>
        <div className="toss-hero-card-header">
          <div className="toss-hero-card-icon" style={{ background: data.gradient }} />
          <div>
            <div className="toss-hero-card-role">{data.role}</div>
            <div className="toss-hero-card-sub">{data.sub}</div>
          </div>
        </div>
        <div className="toss-hero-card-divider" style={{ background: data.gradient }} />
        <div className="toss-hero-card-tags">
          {data.tags.map(t => (
            <span key={t.label} className={`toss-hero-card-tag toss-hero-card-tag--${t.cls}`}>{t.label}</span>
          ))}
        </div>
        <div className="toss-hero-card-stats">
          <span className="toss-hero-card-stats-label">{data.statLabel}</span>
          <span className="toss-hero-card-stats-value">{data.statValue}</span>
        </div>
      </div>
      <div className="toss-hero-card-toggle" onClick={handleToggle}>
        <span className={`toss-hero-card-tab${active === 'frontend' ? ' toss-hero-card-tab--on' : ''}`}>Frontend</span>
        <span className={`toss-hero-card-tab${active === 'backend' ? ' toss-hero-card-tab--on' : ''}`}>Backend</span>
      </div>
    </div>
  )
}

function TossHero() {
  const particleRef = useRef<HTMLCanvasElement>(null)
  useParticles(particleRef)

  return (
    <section id="toss-hero" className="toss-hero">
      <canvas ref={particleRef} className="toss-hero-particles" />

      <div className="toss-hero-inner">
        <div className="toss-hero-text">
          <span className="toss-hero-badge">Backend Developer · AI Engineer</span>
          <h1 className="toss-hero-title">
            안녕하세요,<br />
            <span>신입 개발자</span><br />
            Soomin Jo입니다
          </h1>
          <p className="toss-hero-sub">
            백엔드와 AI를 연결하는 엔지니어.<br />
            Python · Node.js · PyTorch · GCP
          </p>
          <div className="toss-hero-cta">
            <a href="#toss-projects" className="toss-btn-primary">프로젝트 보기 →</a>
            <a href="#toss-contact" className="toss-btn-ghost">연락하기</a>
          </div>
          <div className="toss-hero-scroll-hint">
            <div className="toss-hero-scroll-line" />
            스크롤하여 더 보기
          </div>
        </div>

        <div className="toss-hero-scene">
          <div className="toss-hero-canvas-wrap">
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }} style={{ background: 'transparent' }}>
                <Scene />
              </Canvas>
            </Suspense>
          </div>
          <TiltCard />
        </div>
      </div>
    </section>
  )
}

export default TossHero
