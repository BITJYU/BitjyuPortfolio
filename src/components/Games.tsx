import { useState, useEffect, useRef } from 'react'
import { Wrench, ChevronLeft, ChevronRight } from 'lucide-react'
import mastodon from '../assets/mastodon.png'
import mastodon2 from '../assets/mastodon2.png'
import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './Games.css'

interface BackendProject {
  title: string
  description: string
  tags: string[]
  status: 'live' | 'in-development'
  url?: string
  githubUrl?: string
}

const MASTODON_SLIDES = [mastodon, mastodon2]

function MastodonSlider() {
  const { lang } = useLanguage()
  const t = i18n[lang].games
  const [idx, setIdx] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const go = (i: number) => {
    setIdx(i)
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => setIdx((c) => (c + 1) % MASTODON_SLIDES.length), 3000)
  }
  const prev = () => go((idx - 1 + MASTODON_SLIDES.length) % MASTODON_SLIDES.length)
  const next = () => go((idx + 1) % MASTODON_SLIDES.length)

  useEffect(() => {
    timerRef.current = setInterval(() => setIdx((c) => (c + 1) % MASTODON_SLIDES.length), 3000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [])

  return (
    <article
      className="glass-card backend-featured-card reveal"
      data-reveal
      style={{ '--delay': '0s' } as React.CSSProperties}
    >
      <div className="backend-slider-wrap">
        <img src={MASTODON_SLIDES[idx]} alt={`Mastodon screenshot ${idx + 1}`} className="backend-slider-img" />
        <button className="slider-btn slider-btn--prev" onClick={prev} aria-label={t.prevSlide}>
          <ChevronLeft size={20} />
        </button>
        <button className="slider-btn slider-btn--next" onClick={next} aria-label={t.nextSlide}>
          <ChevronRight size={20} />
        </button>
        <div className="slider-dots">
          {MASTODON_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`slider-dot${i === idx ? ' slider-dot--active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={t.slideLabel(i + 1)}
            />
          ))}
        </div>
      </div>
      <div className="backend-card-body">
        <div className="backend-card-header">
          <span className="proj-badge proj-badge--be">{t.backendBadge}</span>
          <h3 className="game-title">{t.mastodonTitle}</h3>
          <span className="game-badge game-badge--live">{t.liveLabel}</span>
        </div>
        <p className="game-description">{t.mastodonDesc}</p>
        <div className="game-tags">
          {['Ruby', 'Rails', 'Mastodon', 'Self-hosted', 'AGPL-3.0'].map((tag) => (
            <span key={tag} className="game-tag">{tag}</span>
          ))}
        </div>
        <div className="game-links">
          <a href="https://github.com/BITJYU/BNWmastodon" className="btn-ghost game-btn" target="_blank" rel="noopener noreferrer">{t.githubButton}</a>
        </div>
      </div>
    </article>
  )
}

function Games() {
  const { lang } = useLanguage()
  const t = i18n[lang].games

  const BACKEND_PROJECTS: BackendProject[] = [
    {
      title: t.projects[0].title,
      description: t.projects[0].description,
      tags: ['LibGDX', 'Java', '2D Runner', 'Game Client'],
      status: 'live',
      githubUrl: 'https://github.com/Sumin0510/2025-VR-term',
    },
  ]

  return (
    <section id="backend" className="section games">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">{t.title}</span>
        </h2>
        <p className="games-subtitle">{t.subtitle}</p>

        <MastodonSlider />

        <div className="games-grid">
          {BACKEND_PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="glass-card game-card reveal"
              data-reveal
              style={{ '--delay': `${i * 0.15}s` } as React.CSSProperties}
            >
              <div className="game-body">
                <div className="game-header">
                  <h3 className="game-title">{project.title}</h3>
                  <span className={`game-badge game-badge--${project.status}`}>
                    {project.status === 'live' ? t.liveLabel : <><Wrench size={12} /> {t.inDevelopment}</>}
                  </span>
                </div>
                <p className="game-description">{project.description}</p>
                <div className="game-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="game-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="game-links">
                {project.url && (
                  <a href={project.url} className="btn-primary game-btn" target="_blank" rel="noopener noreferrer">
                    {t.demoButton}
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} className="btn-ghost game-btn" target="_blank" rel="noopener noreferrer">
                    {t.githubButton}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Games
