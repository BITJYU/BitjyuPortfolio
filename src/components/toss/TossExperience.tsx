import { useLanguage } from '../../context/LanguageContext'
import i18n from '../../i18n'
import './TossExperience.css'

function TossExperience() {
  const { lang } = useLanguage()
  const t = i18n[lang].experience

  return (
    <section className="toss-section toss-section--alt" id="toss-experience">
      <h2 className="toss-section-title">
        {t.titlePrefix} <span>{t.titleHighlight}</span>
      </h2>
      <p className="toss-section-subtitle">{t.globalDesc}</p>

      <div className="toss-card-grid">
        {t.work.map((item) => (
          <article key={item.role} className="toss-glass-card toss-content-card">
            <div className="toss-card-kicker">{item.period}</div>
            <h3>{item.role}</h3>
            <p className="toss-card-sub">{item.company}</p>
            <ul className="toss-list">
              {item.description.slice(0, 3).map((desc) => (
                <li key={desc}>{desc}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="toss-lang-section">
        <div className="toss-exp-group-label">🌐 {t.globalCommunication}</div>
        <div className="toss-lang-grid">
          {t.languages.map((lang) => (
            <div key={lang.language} className="toss-glass-card toss-lang-card">
              <div className="toss-lang-name">{lang.language}</div>
              <div className="toss-lang-level">{lang.level}</div>
              {'score' in lang && lang.score && (
                <div className="toss-lang-score">
                  {lang.score.split('\n').map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TossExperience
