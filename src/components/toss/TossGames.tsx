import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import mastodon from '../../assets/mastodon.png'
import mastodon2 from '../../assets/mastodon2.png'
import { useLanguage } from '../../context/LanguageContext'
import i18n from '../../i18n'
import './TossGames.css'

const MASTODON_SLIDES = [mastodon, mastodon2]

function TossMastodonSlider() {
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
    <article className="toss-glass-card toss-featured-card toss-mastodon-card">
      <div className="toss-mastodon-slider">
        <img
          src={MASTODON_SLIDES[idx]}
          alt={`Mastodon screenshot ${idx + 1}`}
          className="toss-mastodon-img"
        />
        <button className="toss-slider-btn toss-slider-btn--prev" onClick={prev} aria-label={t.prevSlide}>
          <ChevronLeft size={18} />
        </button>
        <button className="toss-slider-btn toss-slider-btn--next" onClick={next} aria-label={t.nextSlide}>
          <ChevronRight size={18} />
        </button>
        <div className="toss-slider-dots">
          {MASTODON_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`toss-slider-dot${i === idx ? ' toss-slider-dot--active' : ''}`}
              onClick={() => go(i)}
              aria-label={t.slideLabel(i + 1)}
            />
          ))}
        </div>
      </div>
      <div className="toss-featured-info">
        <div className="toss-mastodon-kicker-row">
          <div className="toss-card-kicker">{t.backendBadge}</div>
          <span className="toss-game-badge toss-game-badge--live">{t.liveLabel}</span>
        </div>
        <h3 className="toss-featured-title">{t.mastodonTitle}</h3>
        <p className="toss-featured-desc">{t.mastodonDesc}</p>
        <div className="toss-tag-row">
          {['Ruby', 'Rails', 'Mastodon', 'Self-hosted', 'AGPL-3.0'].map((tag) => (
            <span key={tag} className="toss-proj-tag">{tag}</span>
          ))}
        </div>
        <div className="toss-proj-links">
          <a href="https://github.com/BITJYU/BNWmastodon" className="toss-proj-btn toss-proj-btn--ghost" target="_blank" rel="noopener noreferrer">
            {t.githubButton}
          </a>
        </div>
      </div>
    </article>
  )
}

function TossGames() {
  const { lang } = useLanguage()
  const t = i18n[lang].games

  const projects = t.projects.map((project) => ({
    title: project.title,
    description: project.description,
    tags: ['Java', 'LibGDX', 'Game Client'],
    githubUrl: 'https://github.com/Sumin0510/2025-VR-term',
  }))

  return (
    <section className="toss-section toss-section--alt" id="toss-backend">
      <h2 className="toss-section-title">
        <span>{t.title}</span>
      </h2>
      <p className="toss-section-subtitle">{t.subtitle}</p>

      <TossMastodonSlider />

      <div className="toss-card-grid" style={{ marginTop: '24px' }}>
        {projects.map((project) => (
          <article key={project.title} className="toss-glass-card toss-content-card">
            <div className="toss-card-kicker">{t.backendBadge}</div>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div className="toss-tag-row">
              {project.tags.map((tag) => (
                <span key={tag} className="toss-proj-tag">{tag}</span>
              ))}
            </div>
            {project.githubUrl && (
              <div className="toss-proj-links">
                <a href={project.githubUrl} className="toss-proj-btn toss-proj-btn--ghost" target="_blank" rel="noopener noreferrer">
                  {t.githubButton}
                </a>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default TossGames
