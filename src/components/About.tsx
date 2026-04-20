import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './About.css'

function About() {
  const { lang } = useLanguage()
  const t = i18n[lang].about

  const INFO_ITEMS = [
    { label: t.majorLabel, value: t.majorValue },
    { label: t.roleLabel, value: t.roleValue },
    { label: t.aiToolsLabel, value: 'Claude · Cursor · Copilot · Codex' },
    { label: t.interestsLabel, value: t.interestsValue },
    { label: t.locationLabel, value: t.locationValue },
  ]

  return (
    <section id="about" className="section about">
      <div className="section-inner">
        <h2 className="section-title">
          {t.titlePrefix} <span className="gradient-text">{t.titleHighlight}</span>
        </h2>

        <div className="about-grid">
          {/* Description */}
          <div
            className="about-text reveal"
            data-reveal
            style={{ '--delay': '0s' } as React.CSSProperties}
          >
            <p>{t.p1}</p>
            <p>{t.p2}</p>
            <p>{t.p3}</p>
          </div>

          {/* Info card */}
          <div
            className="glass-card about-card reveal"
            data-reveal
            style={{ '--delay': '0.15s' } as React.CSSProperties}
          >
            <h3 className="about-card-title">{t.quickInfo}</h3>
            <ul className="about-info-list">
              {INFO_ITEMS.map((item) => (
                <li key={item.label} className="about-info-item">
                  <span className="about-info-label">{item.label}</span>
                  <span className="about-info-value">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
