import HeliadesDemo from './HeliadesDemo'
import bnwDemo from '../assets/bnw_home_demo.mp4'
import './Projects.css'

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  demoUrl?: string
  huggingfaceUrl?: string
}

/* ── AI 섹션 ── */
const AI_PROJECTS: Project[] = [
  {
    title: 'Qwen Image Korean Font LoRA',
    description:
      'Qwen-Image 기반 LoRA 파인튜닝으로 한글 폰트 생성·로고 스타일 렌더링을 구현한 연구 프로젝트입니다. 가독성 높은 한글 글리프 생성, 비주얼 스타일 제어, 웹 기반 실시간 폰트 편집 플레이그라운드(Space)를 포함합니다.',
    tags: ['LoRA', 'Fine-tuning', 'Qwen-Image', 'Korean Typography', 'HuggingFace'],
    huggingfaceUrl: 'https://huggingface.co/Glyphress',
  },
  {
    title: 'AI Enemy & NPC Game',
    description:
      '게임 내 적 행동과 NPC 대화에 AI를 접목하는 연구형 프로젝트입니다. LLM 기반 NPC 대화 흐름과 상태 기반 적 행동 설계를 중심으로 프로토타입 방향을 정리하고 있습니다.',
    tags: ['Python', 'LLM', 'Game AI', 'NPC Dialogue', 'Prototype'],
  },
  {
    title: 'NewsInsight',
    description:
      '뉴스 수집, 팩트체킹, 심층 분석, AI 리포팅을 하나의 워크벤치로 묶은 뉴스 인텔리전스 플랫폼입니다. MCP 서버 연결 흐름을 구성하고, 뉴스 분석과 리포팅에 필요한 LLM 프롬프트를 작성했습니다.',
    tags: ['React', 'Spring Boot', 'Python', 'MCP Server', 'Prompt Engineering'],
    githubUrl: 'https://github.com/Sumin0510/NewsInsight',
  },
]

/* ── Frontend 섹션 ── */
const FRONTEND_PROJECTS: Project[] = [
  {
    title: 'BNWMassRaid',
    description:
      'GM이 방을 만들고 참가자들이 같은 전장에 접속해 턴제 전투를 진행하는 웹 기반 전술 배틀 시뮬레이터입니다. 인증, 초대 링크, 전투 보드, Firebase 실시간 동기화를 포함합니다.',
    tags: ['React', 'TypeScript', 'Firebase', 'Realtime DB', 'Turn-based'],
    demoUrl: 'https://bnwmassraid.web.app/',
    githubUrl: 'https://github.com/BITJYU/BNWMassRaid',
  },
  {
    title: 'bitjyuhome',
    description:
      'Next.js와 Prisma 기반의 개인/팬덤형 콘텐츠 CMS입니다. 블로그, 캐릭터/페어 데이터, 갤러리, 방명록, 관리자 페이지, Markdown 렌더링과 인증 흐름을 갖춘 풀스택 웹앱입니다.',
    tags: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'NextAuth', 'CMS'],
  },
]

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <article
      className="glass-card proj-card reveal"
      data-reveal
      style={{ '--delay': `${delay}s` } as React.CSSProperties}
    >
      <div className="proj-card-body--fill">
        <h3 className="proj-title">{project.title}</h3>
        <p className="proj-description">{project.description}</p>
        <div className="proj-tags">
          {project.tags.map((tag) => <span key={tag} className="proj-tag">{tag}</span>)}
        </div>
      </div>
      {(project.githubUrl || project.demoUrl || project.huggingfaceUrl) && (
        <div className="proj-links">
          {project.demoUrl && <a href={project.demoUrl} className="btn-primary proj-btn" target="_blank" rel="noopener noreferrer">Demo</a>}
          {project.huggingfaceUrl && <a href={project.huggingfaceUrl} className="btn-primary proj-btn" target="_blank" rel="noopener noreferrer">HuggingFace</a>}
          {project.githubUrl && <a href={project.githubUrl} className="btn-ghost proj-btn" target="_blank" rel="noopener noreferrer">GitHub</a>}
        </div>
      )}
    </article>
  )
}

export function AISection() {
  return (
    <section id="ai" className="section projects">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">AI</span>
        </h2>
        <p className="proj-subtitle">
          LLM 활용, 모델 파인튜닝, AI 인터페이스 구현 사례입니다.
        </p>

        <article
          className="glass-card proj-featured-card reveal"
          data-reveal
          style={{ '--delay': '0s' } as React.CSSProperties}
        >
          <HeliadesDemo />
          <div className="proj-card-body">
            <div className="proj-card-header">
              <span className="proj-badge proj-badge--ai">AI PROJECT</span>
              <h3 className="proj-title">Heliades-1A</h3>
            </div>
            <p className="proj-description">
              음성/텍스트 상호작용, 로컬 메모리, 행동 로그, 상태 추적, 시각 피드백을 결합한 Python 기반 개인 AI 비서.
              IDLE·THINKING·LISTENING·SPEAKING 상태를 파티클 렌더러로 실시간 표현하며 WebSocket으로 백엔드와 통신합니다.
            </p>
            <div className="proj-tags">
              {['Python', 'LLM', 'WebSocket', 'Canvas API', 'Voice AI', 'State Machine'].map((tag) => (
                <span key={tag} className="proj-tag">{tag}</span>
              ))}
            </div>
            <div className="proj-links">
              <a href="https://github.com/BITJYU/Heliades-AI" className="btn-ghost proj-btn" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </article>

        <div className="projects-grid">
          {AI_PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={0.08 + i * 0.1} />)}
        </div>
      </div>
    </section>
  )
}

export function FrontendSection() {
  return (
    <section id="frontend" className="section projects">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">Frontend</span>
        </h2>
        <p className="proj-subtitle">
          React · Vue 기반 프론트엔드 구현 및 배포 사례입니다.
        </p>

        <article
          className="glass-card proj-featured-card reveal"
          data-reveal
          style={{ '--delay': '0s' } as React.CSSProperties}
        >
          <div className="proj-video-wrap">
            <video src={bnwDemo} autoPlay loop muted playsInline className="proj-video" />
          </div>
          <div className="proj-card-body">
            <div className="proj-card-header">
              <span className="proj-badge proj-badge--fe">FRONTEND</span>
              <h3 className="proj-title">창작 세계관 소개 사이트</h3>
            </div>
            <p className="proj-description">
              React/Vite 기반 세계관 소개 사이트. 멤버 프로필, 전투 시스템 문서, 세계관·공지 페이지,
              BGM 플레이어, 이스터에그 등 콘텐츠 중심 인터랙션을 구성했습니다.
            </p>
            <div className="proj-tags">
              {['React', 'TypeScript', 'Vite', 'Framer Motion', 'Content Site'].map((tag) => (
                <span key={tag} className="proj-tag">{tag}</span>
              ))}
            </div>
            <div className="proj-links">
              <a href="https://blooming-nest-woods.bit-jyu9272.workers.dev/" className="btn-primary proj-btn" target="_blank" rel="noopener noreferrer">Live</a>
              <a href="https://github.com/BITJYU/Blooming-Nest-Woods" className="btn-ghost proj-btn" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </article>

        <div className="projects-grid">
          {FRONTEND_PROJECTS.map((p, i) => <ProjectCard key={p.title} project={p} delay={0.08 + i * 0.1} />)}
        </div>
      </div>
    </section>
  )
}

export default function Projects() {
  return null
}
