import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './Skills.css'

function Skills() {
  const { lang } = useLanguage()
  const t = i18n[lang].skills

  return (
    <section id="skills" className="section skills">
      <div className="section-inner">
        <h2 className="section-title">
          {t.titlePrefix} <span className="gradient-text">{t.titleHighlight}</span>
        </h2>

        <div className="skills-grid">
          {t.categories.map((item, i) => (
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
