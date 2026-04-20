import { useLanguage } from '../../context/LanguageContext'
import i18n from '../../i18n'
import './TossContact.css'

function TossContact() {
  const { lang } = useLanguage()
  const t = i18n[lang].contact

  return (
    <section className="toss-section" id="toss-contact">
      <h2 className="toss-section-title">
        {t.titlePrefix} <span>{t.titleHighlight}</span>
      </h2>
      <p className="toss-section-subtitle">{t.subtitle}</p>

      <div className="toss-contact-actions">
        <a className="toss-btn-primary" href="https://github.com/BITJYU" target="_blank" rel="noopener noreferrer">
          {t.githubLabel}
        </a>
        <a className="toss-btn-ghost" href="mailto:whtnals0417@gmail.com">
          {t.emailLabel}
        </a>
      </div>
    </section>
  )
}

export default TossContact
