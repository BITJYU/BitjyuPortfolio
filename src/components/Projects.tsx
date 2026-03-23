import './Projects.css'

interface Project {
  title: string
  description: string
  tags: string[]
  githubUrl: string
  demoUrl?: string
}

const PROJECTS: Project[] = [
  {
    title: '[프로젝트 이름 1]',
    description: '프로젝트 설명을 입력하세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 간략히 작성합니다.',
    tags: ['Node.js', 'MongoDB', 'TypeScript'],
    githubUrl: '#',
    demoUrl: '#',
  },
  {
    title: '[프로젝트 이름 2]',
    description: '프로젝트 설명을 입력하세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 간략히 작성합니다.',
    tags: ['Python', 'PyTorch', 'FastAPI'],
    githubUrl: '#',
  },
  {
    title: '[프로젝트 이름 3]',
    description: '프로젝트 설명을 입력하세요. 어떤 문제를 해결했는지, 어떤 기술을 사용했는지 간략히 작성합니다.',
    tags: ['React', 'TypeScript', 'GCP'],
    githubUrl: '#',
    demoUrl: '#',
  },
]

function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="section-inner">
        <h2 className="section-title">
          <span className="gradient-text">Projects</span>
        </h2>

        <div className="projects-grid">
          {PROJECTS.map((project, i) => (
            <article
              key={project.title}
              className="glass-card project-card reveal"
              data-reveal
              style={{ '--delay': `${i * 0.12}s` } as React.CSSProperties}
            >
              <div className="project-body">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="project-links">
                <a
                  href={project.githubUrl}
                  className="btn-ghost project-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    className="btn-primary project-btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Demo
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

export default Projects
