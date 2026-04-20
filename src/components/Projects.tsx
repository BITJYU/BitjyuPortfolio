import HeliadesDemo from './HeliadesDemo'
import bnwDemo from '../assets/bnw_home_demo.mp4'
import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './Projects.css'

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl?: string
  demoUrl?: string
  huggingfaceUrl?: string
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const { lang } = useLanguage()
  const t = i18n[lang].projects

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
          {project.demoUrl && <a href={project.demoUrl} className="btn-primary proj-btn" target="_blank" rel="noopener noreferrer">{t.demoButton}</a>}
          {project.huggingfaceUrl && <a href={project.huggingfaceUrl} className="btn-primary proj-btn" target="_blank" rel="noopener noreferrer">{t.huggingFaceButton}</a>}
          {project.githubUrl && <a href={project.githubUrl} className="btn-ghost proj-btn" target="_blank" rel="noopener noreferrer">{t.githubButton}</a>}
        </div>
      )}
    </article>
  )
}

export function AISection() {
  const { lang } = useLanguage()
  const t = i18n[lang].projects

  const AI_PROJECTS: Project[] = [
    {
      title: t.aiProjects[0].title,
      description: t.aiProjects[0].description,
      tags: ['LoRA', 'Fine-tuning', 'Qwen-Image', 'Korean Typography', 'HuggingFace'],
      huggingfaceUrl: 'https://huggingface.co/Glyphress',
    },
    {
      title: t.aiProjects[1].title,
      description: t.aiProjects[1].description,
      tags: ['Python', 'LLM', 'Game AI', 'NPC Dialogue', 'Prototype'],
    },
    {
      title: t.aiProjects[2].title,
      description: t.aiProjects[2].description,
      tags: ['React', 'Spring Boot', 'Python', 'MCP Server', 'Prompt Engineering'],
      githubUrl: 'https://github.com/Sumin0510/NewsInsight',
    },
  ]

  return (
    <section id="ai" className="section projects">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">{t.aiTitle}</span>
        </h2>
        <p className="proj-subtitle">{t.aiSubtitle}</p>

        <article
          className="glass-card proj-featured-card reveal"
          data-reveal
          style={{ '--delay': '0s' } as React.CSSProperties}
        >
          <HeliadesDemo />
          <div className="proj-card-body">
            <div className="proj-card-header">
              <span className="proj-badge proj-badge--ai">{t.aiBadge}</span>
              <h3 className="proj-title">{t.heliadesTitle}</h3>
            </div>
            <p className="proj-description">{t.heliadesDesc}</p>
            <div className="proj-tags">
              {['Python', 'LLM', 'WebSocket', 'Canvas API', 'Voice AI', 'State Machine'].map((tag) => (
                <span key={tag} className="proj-tag">{tag}</span>
              ))}
            </div>
            <div className="proj-links">
              <a href="https://github.com/BITJYU/Heliades-AI" className="btn-ghost proj-btn" target="_blank" rel="noopener noreferrer">{t.githubButton}</a>
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
  const { lang } = useLanguage()
  const t = i18n[lang].projects

  const FRONTEND_PROJECTS: Project[] = [
    {
      title: t.frontendProjects[0].title,
      description: t.frontendProjects[0].description,
      tags: ['React', 'TypeScript', 'Firebase', 'Realtime DB', 'Turn-based'],
      demoUrl: 'https://bnwmassraid.web.app/',
      githubUrl: 'https://github.com/BITJYU/BNWMassRaid',
    },
    {
      title: t.frontendProjects[1].title,
      description: t.frontendProjects[1].description,
      tags: ['Next.js', 'TypeScript', 'Prisma', 'SQLite', 'NextAuth', 'CMS'],
    },
  ]

  return (
    <section id="frontend" className="section projects">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">{t.frontendTitle}</span>
        </h2>
        <p className="proj-subtitle">{t.frontendSubtitle}</p>

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
              <span className="proj-badge proj-badge--fe">{t.frontendBadge}</span>
              <h3 className="proj-title">{t.bnwTitle}</h3>
            </div>
            <p className="proj-description">{t.bnwDesc}</p>
            <div className="proj-tags">
              {['React', 'TypeScript', 'Vite', 'Framer Motion', 'Content Site'].map((tag) => (
                <span key={tag} className="proj-tag">{tag}</span>
              ))}
            </div>
            <div className="proj-links">
              <a href="https://blooming-nest-woods.bit-jyu9272.workers.dev/" className="btn-primary proj-btn" target="_blank" rel="noopener noreferrer">{t.liveButton}</a>
              <a href="https://github.com/BITJYU/Blooming-Nest-Woods" className="btn-ghost proj-btn" target="_blank" rel="noopener noreferrer">{t.githubButton}</a>
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
