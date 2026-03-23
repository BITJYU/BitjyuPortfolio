import './Skills.css'

interface SkillCategory {
  category: string
  skills: string[]
}

const SKILL_DATA: SkillCategory[] = [
  { category: 'Languages', skills: ['Python', 'JavaScript', 'TypeScript'] },
  { category: 'Frontend', skills: ['React'] },
  { category: 'Backend', skills: ['Node.js'] },
  { category: 'Backend / DB', skills: ['MongoDB', 'MySQL', 'Oracle'] },
  { category: 'Cloud / DevOps', skills: ['GCP', 'AWS', 'Server Deployment'] },
  { category: 'AI / ML', skills: ['PyTorch', 'LoRA Fine-tuning', 'Hugging Face'] },
]

function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="section-inner">
        <h2 className="section-title">
          Tech <span className="gradient-text">Skills</span>
        </h2>

        <div className="skills-grid">
          {SKILL_DATA.map((item, i) => (
            <div
              key={item.category}
              className="glass-card skills-card reveal"
              data-reveal
              style={{ '--delay': `${i * 0.08}s` } as React.CSSProperties}
            >
              <h3 className="skills-category">{item.category}</h3>
              <div className="skills-pills">
                {item.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
