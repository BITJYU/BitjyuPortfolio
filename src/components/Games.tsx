import { useState, useEffect, useRef } from 'react'
import { Wrench, ChevronLeft, ChevronRight } from 'lucide-react'
import mastodon from '../assets/mastodon.png'
import mastodon2 from '../assets/mastodon2.png'
import './Games.css'

interface BackendProject {
  title: string
  description: string
  tags: string[]
  status: 'live' | 'in-development'
  url?: string
  githubUrl?: string
}

const BACKEND_PROJECTS: BackendProject[] = [
  {
    title: '그NOM',
    description:
      'LibGDX로 제작한 2D 러너 게임입니다. 게임 클라이언트 제작 경험과 빌드 산출물을 보여주는 보조 프로젝트입니다.',
    tags: ['LibGDX', 'Java', '2D Runner', 'Game Client'],
    status: 'live',
    githubUrl: 'https://github.com/Sumin0510/2025-VR-term',
  },
]

const MASTODON_SLIDES = [mastodon, mastodon2]

function MastodonSlider() {
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
        <button className="slider-btn slider-btn--prev" onClick={prev} aria-label="이전">
          <ChevronLeft size={20} />
        </button>
        <button className="slider-btn slider-btn--next" onClick={next} aria-label="다음">
          <ChevronRight size={20} />
        </button>
        <div className="slider-dots">
          {MASTODON_SLIDES.map((_, i) => (
            <button
              key={i}
              className={`slider-dot${i === idx ? ' slider-dot--active' : ''}`}
              onClick={() => setIdx(i)}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      </div>
      <div className="backend-card-body">
        <div className="backend-card-header">
          <span className="proj-badge proj-badge--be">BACKEND</span>
          <h3 className="game-title">Mastodon 커뮤니티 인스턴스</h3>
          <span className="game-badge game-badge--live">● Live</span>
        </div>
        <p className="game-description">
          소규모 커뮤니티 전용 Mastodon 인스턴스를 포크해 직접 운영·커스터마이징했습니다.
          Ruby on Rails 기반 분산형 SNS 서버 배포 및 설정 경험을 포함합니다.
        </p>
        <div className="game-tags">
          {['Ruby', 'Rails', 'Mastodon', 'Self-hosted', 'AGPL-3.0'].map((tag) => (
            <span key={tag} className="game-tag">{tag}</span>
          ))}
        </div>
        <div className="game-links">
          <a href="https://github.com/BITJYU/BNWmastodon" className="btn-ghost game-btn" target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </article>
  )
}

function Games() {
  return (
    <section id="backend" className="section games">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">Backend</span>
        </h2>
        <p className="games-subtitle">
          서버·운영·게임 클라이언트 등 백엔드 및 기타 구현 사례입니다.
        </p>

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
                    {project.status === 'live' ? '● Live' : <><Wrench size={12} /> 개발 중</>}
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
                    Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} className="btn-ghost game-btn" target="_blank" rel="noopener noreferrer">
                    GitHub
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
