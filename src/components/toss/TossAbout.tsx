import { useLanguage } from '../../context/LanguageContext'
import i18n from '../../i18n'
import './TossAbout.css'

function TossAbout() {
  const { lang } = useLanguage()
  const t = i18n[lang].about

  const INFO_ITEMS = [
    { label: t.majorLabel,     value: t.majorValue },
    { label: t.roleLabel,      value: t.roleValue },
    { label: t.aiToolsLabel,   value: 'Claude · Cursor · Copilot · Codex' },
    { label: t.interestsLabel, value: t.interestsValue },
    { label: t.locationLabel,  value: t.locationValue },
  ]

  return (
    <section id="toss-about" className="toss-section toss-section--alt">
      <h2 className="toss-section-title">
        {t.titlePrefix} <span>{t.titleHighlight}</span>
      </h2>
      <div className="toss-about-grid">
        <div className="toss-about-text">
          <p>{t.p1}</p>
          <p>{t.p2}</p>
          <p>{t.p3}</p>
        </div>
        <div className="toss-glass-card toss-about-card">
          <h3 className="toss-about-card-title">{t.quickInfo}</h3>
          <ul className="toss-about-info-list">
            {INFO_ITEMS.map((item) => (
              <li key={item.label} className="toss-about-info-item">
                <span className="toss-about-info-label">{item.label}</span>
                <span className="toss-about-info-value">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default TossAbout
