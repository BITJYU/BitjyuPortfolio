import HeliadesDemo from './HeliadesDemo'
import bnwDemo from '../assets/bnw_home_demo.mp4'
import './Frontend.css'

interface FrontendProject {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  demoUrl?: string
}

const FRONTEND_PROJECTS: FrontendProject[] = [
  {
    title: '턴제 전투 웹페이지',
    description:
      'GM이 방을 만들고 참가자들이 같은 전장에 접속해 턴제 전투를 진행하는 웹 기반 전술 배틀 시뮬레이터입니다. 인증, 초대 링크, 전투 보드, Firebase 실시간 동기화를 포함합니다.',
    tags: ['React', 'TypeScript', 'Firebase', 'Realtime DB', 'Turn-based'],
    demoUrl: 'https://bnwmassraid.web.app/',
    githubUrl: 'https://github.com/BITJYU/BNWMassRaid',
  },
  {
    title: 'News Insight',
    description:
      '뉴스 수집, 팩트체킹, 심층 분석, AI 리포팅을 하나의 워크벤치로 묶은 뉴스 인텔리전스 플랫폼입니다. MCP 서버 연결 흐름을 구성하고, 뉴스 분석과 리포팅에 필요한 LLM 프롬프트를 작성했습니다.',
    tags: ['React', 'Spring Boot', 'Python', 'MCP Server', 'Prompt Engineering'],
    githubUrl: 'https://github.com/Sumin0510/NewsInsight',
  },
  {
    title: '개인 콘텐츠 홈페이지',
    description:
      'Next.js와 Prisma 기반의 개인/팬덤형 콘텐츠 CMS입니다. 블로그, 캐릭터/페어 데이터, 갤러리, 방명록, 관리자 페이지, Markdown 렌더링과 인증 흐름을 갖춘 풀스택 웹앱입니다.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'NextAuth', 'CMS'],
  },
  {
    title: 'AI Enemy & NPC Game',
    description:
      '게임 내 적 행동과 NPC 대화에 AI를 접목하는 연구형 프로젝트입니다. LLM 기반 NPC 대화 흐름과 상태 기반 적 행동 설계를 중심으로 프로토타입 방향을 정리하고 있습니다.',
    tags: ['Python', 'LLM', 'Game AI', 'NPC Dialogue', 'Prototype'],
  },
  {
    title: 'Mastodon 운영 및 자동화 사례',
    description:
      'Docker Compose 기반 Mastodon 운영 경험을 바탕으로 web, streaming, sidekiq 역할 분리와 Redis/PostgreSQL 운영 포인트를 정리했습니다. Google Sheets와 Apps Script를 활용한 조건 기반 자동화 사례도 함께 포함합니다.',
    tags: ['Docker Compose', 'Redis', 'PostgreSQL', 'Sidekiq', 'Apps Script', 'Operations'],
  },
]

function Frontend() {
  return (
    <section id="frontend" className="section frontend">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">Frontend</span>
        </h2>
        <p className="frontend-subtitle">
          React · Vue 기반 프론트엔드 구현 사례를 모은 섹션입니다.
        </p>

        {/* Heliades AI featured */}
        <article
          className="glass-card fe-featured-card reveal"
          data-reveal
          style={{ '--delay': '0s' } as React.CSSProperties}
        >
          <HeliadesDemo />
          <div className="fe-card-body">
            <div className="fe-card-header">
              <span className="fe-badge fe-badge--ai">AI PROJECT</span>
              <h3 className="fe-title">Heliades-1A</h3>
            </div>
            <p className="fe-description">
              음성/텍스트 상호작용, 로컬 메모리, 행동 로그, 상태 추적, 시각 피드백을 결합한 Python 기반 개인 AI 비서.
              IDLE·THINKING·LISTENING·SPEAKING 상태를 파티클 렌더러로 실시간 표현하며 WebSocket으로 백엔드와 통신합니다.
            </p>
            <div className="fe-tags">
              {['Python', 'LLM', 'WebSocket', 'Canvas API', 'Voice AI', 'State Machine'].map((tag) => (
                <span key={tag} className="fe-tag">{tag}</span>
              ))}
            </div>
            <div className="fe-links">
              <a href="https://github.com/BITJYU/Heliades-AI" className="btn-ghost fe-btn" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </article>

        {/* BNW video featured */}
        <article
          className="glass-card fe-featured-card reveal"
          data-reveal
          style={{ '--delay': '0.08s' } as React.CSSProperties}
        >
          <div className="fe-video-wrap">
            <video src={bnwDemo} autoPlay loop muted playsInline className="fe-video" />
          </div>
          <div className="fe-card-body">
            <div className="fe-card-header">
              <span className="fe-badge">FRONTEND</span>
              <h3 className="fe-title">창작 세계관 소개 사이트</h3>
            </div>
            <p className="fe-description">
              React/Vite 기반 세계관 소개 사이트. 멤버 프로필, 전투 시스템 문서, 세계관·공지 페이지,
              BGM 플레이어, 이스터에그 등 콘텐츠 중심 인터랙션을 구성했습니다.
            </p>
            <div className="fe-tags">
              {['React', 'TypeScript', 'Vite', 'Framer Motion', 'Content Site'].map((tag) => (
                <span key={tag} className="fe-tag">{tag}</span>
              ))}
            </div>
            <div className="fe-links">
              <a href="https://blooming-nest-woods.bit-jyu9272.workers.dev/" className="btn-primary fe-btn" target="_blank" rel="noopener noreferrer">
                Live
              </a>
              <a href="https://github.com/BITJYU/Blooming-Nest-Woods" className="btn-ghost fe-btn" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </article>

        {/* Project grid */}
        <div className="fe-grid">
          {FRONTEND_PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="glass-card fe-project-card reveal"
              data-reveal
              style={{ '--delay': `${0.16 + i * 0.1}s` } as React.CSSProperties}
            >
              <div className="fe-project-body">
                <h3 className="fe-project-title">{project.title}</h3>
                <p className="fe-project-description">{project.description}</p>
                <div className="fe-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="fe-tag">{tag}</span>
                  ))}
                </div>
              </div>
              {(project.githubUrl || project.demoUrl) && (
                <div className="fe-links" style={{ marginTop: 'auto', paddingTop: 'var(--space-md)' }}>
                  {project.demoUrl && (
                    <a href={project.demoUrl} className="btn-primary fe-btn" target="_blank" rel="noopener noreferrer">Demo</a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="btn-ghost fe-btn" target="_blank" rel="noopener noreferrer">GitHub</a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Frontend
