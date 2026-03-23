import { useState, useEffect, useRef } from 'react'
import './Hero.css'

const TITLES = ['Backend Developer', 'AI Engineer', 'ML Model Builder & Deployer']
const TYPE_SPEED = 100
const DELETE_SPEED = 60
const PAUSE_AFTER_TYPE = 1500

function Hero() {
  const [displayed, setDisplayed] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Typing animation
  useEffect(() => {
    const current = TITLES[titleIndex]

    if (!isDeleting) {
      if (displayed.length < current.length) {
        timerRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1))
        }, TYPE_SPEED)
      } else {
        timerRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, PAUSE_AFTER_TYPE)
      }
    } else {
      if (displayed.length > 0) {
        timerRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1))
        }, DELETE_SPEED)
      } else {
        setIsDeleting(false)
        setTitleIndex((prev) => (prev + 1) % TITLES.length)
      }
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [displayed, isDeleting, titleIndex])

  // Mouse parallax for orbs
  const heroRef = useRef<HTMLElement>(null)
  const orb1Ref = useRef<HTMLDivElement>(null)
  const orb2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 50
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 35
      if (orb1Ref.current) orb1Ref.current.style.transform = `translate(${x}px, ${y}px)`
      if (orb2Ref.current) orb2Ref.current.style.transform = `translate(${-x * 0.6}px, ${-y * 0.6}px)`
    }

    const handleMouseLeave = () => {
      if (orb1Ref.current) orb1Ref.current.style.transform = ''
      if (orb2Ref.current) orb2Ref.current.style.transform = ''
    }

    hero.addEventListener('mousemove', handleMouseMove)
    hero.addEventListener('mouseleave', handleMouseLeave)
    return () => {
      hero.removeEventListener('mousemove', handleMouseMove)
      hero.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <section ref={heroRef} id="hero" className="hero">
      {/* Background orbs */}
      <div ref={orb1Ref} className="hero-orb hero-orb--1" aria-hidden="true" />
      <div ref={orb2Ref} className="hero-orb hero-orb--2" aria-hidden="true" />

      <div className="hero-content">
        <p className="hero-greeting">안녕하세요, 저는</p>
        <h1 className="hero-name gradient-text">[Your Name]</h1>
        <div className="hero-title" aria-label={TITLES[titleIndex]}>
          <span className="hero-title-text">{displayed}</span>
          <span className="hero-cursor" aria-hidden="true">|</span>
        </div>
        <p className="hero-subtitle">
          IT &amp; AI 전공 개발자. 백엔드 시스템과 AI 모델을 설계하고 배포합니다.
        </p>
        <div className="hero-cta">
          <a href="#about" className="btn-primary">About Me</a>
          <a href="#contact" className="btn-ghost">Contact</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
