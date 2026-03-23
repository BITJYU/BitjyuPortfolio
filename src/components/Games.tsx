import { Wrench, Sparkles } from 'lucide-react'
import './Games.css'

interface Game {
  title: string
  description: string
  tags: string[]
  status: 'live' | 'in-development'
  url?: string
  githubUrl?: string
  aiFeature?: string
}

const GAMES: Game[] = [
  {
    title: '[게임 이름]',
    description: '직접 제작한 게임 웹사이트. [간략 설명을 입력하세요.]',
    tags: ['JavaScript', 'HTML5 Canvas'],
    status: 'live',
    url: '#',
    githubUrl: '#',
  },
  {
    title: 'AI Enemy & NPC Game',
    description: 'AI를 접목한 게임 에너미와 NPC 구현. LLM 기반 NPC 대화, 강화학습 기반 적 AI 등을 연구 및 개발 중.',
    tags: ['PyTorch', 'Python', 'AI/ML', 'Reinforcement Learning'],
    status: 'in-development',
    aiFeature: 'AI-powered enemy behavior & LLM-based NPC dialogue',
  },
]

function Games() {
  return (
    <section id="games" className="section games">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">Games</span>
        </h2>
        <p className="games-subtitle">
          게임 개발을 통해 AI와 프로그래밍을 결합하는 실험적 프로젝트들입니다.
        </p>

        <div className="games-grid">
          {GAMES.map((game, i) => (
            <article
              key={game.title}
              className="glass-card game-card reveal"
              data-reveal
              style={{ '--delay': `${i * 0.15}s` } as React.CSSProperties}
            >
              <div className="game-body">
                <div className="game-header">
                  <h3 className="game-title">{game.title}</h3>
                  <span className={`game-badge game-badge--${game.status}`}>
                    {game.status === 'live' ? '● Live' : <><Wrench size={12} /> 개발 중</>}
                  </span>
                </div>

                <p className="game-description">{game.description}</p>

                <div className="game-tags">
                  {game.tags.map((tag) => (
                    <span key={tag} className="game-tag">{tag}</span>
                  ))}
                </div>

                {game.aiFeature && (
                  <div className="game-ai-highlight">
                    <span className="game-ai-icon"><Sparkles size={14} /></span>
                    <span className="game-ai-text">{game.aiFeature}</span>
                  </div>
                )}
              </div>

              <div className="game-links">
                {game.url && (
                  <a
                    href={game.url}
                    className="btn-primary game-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play
                  </a>
                )}
                {game.githubUrl && (
                  <a
                    href={game.githubUrl}
                    className="btn-ghost game-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
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
