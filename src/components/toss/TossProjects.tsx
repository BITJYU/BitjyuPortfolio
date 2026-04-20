import { useLanguage } from '../../context/LanguageContext'
import i18n from '../../i18n'
import HeliadesDemo from '../HeliadesDemo'
import './TossProjects.css'

interface CardData {
  badge: string
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  demoUrl?: string
  huggingfaceUrl?: string
}

function ProjectCard({ project }: { project: CardData }) {
  const { lang } = useLanguage()
  const t = i18n[lang].projects

  return (
    <article key={`${project.badge}-${project.title}`} className="toss-glass-card toss-content-card">
      <div className="toss-card-kicker">{project.badge}</div>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
      <div className="toss-tag-row">
        {project.tags.map((tag) => (
          <span key={tag} className="toss-proj-tag">{tag}</span>
        ))}
      </div>
      {(project.githubUrl || project.demoUrl || project.huggingfaceUrl) && (
        <div className="toss-proj-links">
          {project.demoUrl && (
            <a href={project.demoUrl} className="toss-proj-btn toss-proj-btn--primary" target="_blank" rel="noopener noreferrer">{t.demoButton}</a>
          )}
          {project.huggingfaceUrl && (
            <a href={project.huggingfaceUrl} className="toss-proj-btn toss-proj-btn--primary" target="_blank" rel="noopener noreferrer">{t.huggingFaceButton}</a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} className="toss-proj-btn toss-proj-btn--ghost" target="_blank" rel="noopener noreferrer">{t.githubButton}</a>
          )}
        </div>
      )}
    </article>
  )
}

function TossProjects() {
  const { lang } = useLanguage()
  const t = i18n[lang].projects

  const cards: CardData[] = [
    {
      badge: t.aiBadge,
      title: t.aiProjects[0].title,
      description: t.aiProjects[0].description,
      tags: ['LoRA', 'Fine-tuning', 'Qwen-Image', 'Korean Typography'],
      huggingfaceUrl: 'https://huggingface.co/Glyphress',
    },
    {
      badge: t.aiBadge,
      title: t.aiProjects[1].title,
      description: t.aiProjects[1].description,
      tags: ['Python', 'LLM', 'Game AI', 'NPC Dialogue'],
    },
    {
      badge: t.aiBadge,
      title: t.aiProjects[2].title,
      description: t.aiProjects[2].description,
      tags: ['React', 'Spring Boot', 'Python', 'MCP Server'],
      githubUrl: 'https://github.com/Sumin0510/NewsInsight',
    },
    {
      badge: t.frontendBadge,
      title: t.bnwTitle,
      description: t.bnwDesc,
      tags: ['React', 'Vite', 'Deploy'],
      demoUrl: 'https://blooming-nest-woods.bit-jyu9272.workers.dev/',
      githubUrl: 'https://github.com/BITJYU/Blooming-Nest-Woods',
    },
    {
      badge: t.frontendBadge,
      title: t.frontendProjects[0].title,
      description: t.frontendProjects[0].description,
      tags: ['React', 'TypeScript', 'Firebase', 'Realtime DB'],
      demoUrl: 'https://bnwmassraid.web.app/',
      githubUrl: 'https://github.com/BITJYU/BNWMassRaid',
    },
    {
      badge: t.frontendBadge,
      title: t.frontendProjects[1].title,
      description: t.frontendProjects[1].description,
      tags: ['Next.js', 'TypeScript', 'Prisma', 'NextAuth'],
    },
  ]

  return (
    <section className="toss-section" id="toss-projects">
      <h2 className="toss-section-title">
        Selected <span>Projects</span>
      </h2>
      <p className="toss-section-subtitle">지금까지 진행한 프로젝트입니다.</p>

      <article className="toss-glass-card toss-featured-card">
        <div className="toss-featured-demo">
          <HeliadesDemo />
        </div>
        <div className="toss-featured-info">
          <div className="toss-mastodon-kicker-row">
            <div className="toss-card-kicker">{t.aiBadge}</div>
            <span className="toss-game-badge toss-game-badge--live">{i18n[lang].games.liveLabel}</span>
          </div>
          <h3 className="toss-featured-title">{t.heliadesTitle}</h3>
          <p className="toss-featured-desc">{t.heliadesDesc}</p>
          <div className="toss-tag-row">
            {['Python', 'LLM', 'WebSocket', 'Canvas API'].map((tag) => (
              <span key={tag} className="toss-proj-tag">{tag}</span>
            ))}
          </div>
          <div className="toss-proj-links">
            <a href="https://github.com/BITJYU/Heliades-AI" className="toss-proj-btn toss-proj-btn--ghost" target="_blank" rel="noopener noreferrer">{t.githubButton}</a>
          </div>
        </div>
      </article>

      <div className="toss-card-grid toss-projects-grid">
        {cards.map((project) => (
          <ProjectCard key={`${project.badge}-${project.title}`} project={project} />
        ))}
      </div>
    </section>
  )
}

export default TossProjects
