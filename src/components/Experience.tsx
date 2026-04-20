import { Briefcase, Award, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './Experience.css'

interface WorkItem {
  role: string
  company: string
  period: string
  description: string[]
}

function Experience() {
  const { lang } = useLanguage()
  const t = i18n[lang].experience

  const WORK: WorkItem[] = t.work.map((item) => ({
    role: item.role,
    company: item.company,
    period: item.period,
    description: [...item.description],
  }))

  return (
    <section id="experience" className="section experience">
      <div className="section-inner">
        <h2 className="section-title">
          {t.titlePrefix} <span className="gradient-text">{t.titleHighlight}</span>
        </h2>

        <div className="experience-layout">
          {/* Work Experience */}
          <div
            className="experience-col reveal"
            data-reveal
            style={{ '--delay': '0s' } as React.CSSProperties}
          >
            <h3 className="experience-col-title">
              <span className="experience-col-icon"><Briefcase size={16} /></span> {t.operationalExperience}
            </h3>
            <div className="timeline">
              {WORK.map((item) => (
                <div key={item.role + item.company} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content glass-card">
                    <div className="timeline-header">
                      <span className="timeline-role">{item.role}</span>
                      <span className="timeline-period">{item.period}</span>
                    </div>
                    <span className="timeline-company">{item.company}</span>
                    <ul className="timeline-desc">
                      {item.description.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: Certs + Languages */}
          <div className="experience-right">
            {/* Certifications */}
            <div
              className="reveal"
              data-reveal
              style={{ '--delay': '0.12s' } as React.CSSProperties}
            >
              <h3 className="experience-col-title">
                <span className="experience-col-icon"><Award size={16} /></span> {t.strengths}
              </h3>
              <div className="certs-list">
                {t.strengthsList.map((cert) => (
                  <div key={cert.name} className="glass-card cert-card">
                    <span className="cert-name">{cert.name}</span>
                    <div className="cert-meta">
                      <span className="cert-issuer">{cert.issuer}</span>
                      <span className="cert-year">{cert.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Global Communication */}
            <div
              className="reveal"
              data-reveal
              style={{ '--delay': '0.24s' } as React.CSSProperties}
            >
              <h3 className="experience-col-title">
                <span className="experience-col-icon"><Globe size={16} /></span> {t.globalCommunication}
              </h3>
              <p className="global-desc">{t.globalDesc}</p>
              <div className="languages-list">
                {t.languages.map((langItem) => (
                  <div key={langItem.language} className="glass-card lang-card">
                    <div className="lang-header">
                      <span className="lang-name">{langItem.language}</span>
                      <span className="lang-level">{langItem.level}</span>
                    </div>
                    {'score' in langItem && langItem.score && (
                      <span className="lang-score">{langItem.score}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
