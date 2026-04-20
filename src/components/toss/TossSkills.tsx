import { useLanguage } from '../../context/LanguageContext'
import i18n from '../../i18n'
import './TossSkills.css'

function TossSkills() {
  const { lang } = useLanguage()
  const t = i18n[lang].skills

  return (
    <section className="toss-section" id="toss-skills">
      <h2 className="toss-section-title">
        {t.titlePrefix} <span>{t.titleHighlight}</span>
      </h2>
      <p className="toss-section-subtitle">Practical tools used across web, infra, cloud, and AI work.</p>

      <div className="toss-skills-grid">
        {t.categories.map((item) => (
          <article key={item.category} className="toss-glass-card toss-skills-card">
            <h3 className="toss-skills-category">{item.category}</h3>
            <div className="toss-skills-pills">
              {item.skills.map((skill) => (
                <span key={skill} className="toss-skill-pill">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default TossSkills
