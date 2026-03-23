import { Briefcase, Award, Globe } from 'lucide-react'
import './Experience.css'

interface WorkItem {
  role: string
  company: string
  period: string
  description: string[]
}

interface CertItem {
  name: string
  issuer: string
  year: string
}

interface LanguageItem {
  language: string
  level: string
  score?: string
}

const WORK: WorkItem[] = [
  {
    role: '[직책 / Role]',
    company: '[회사명 / Company]',
    period: '2024.01 – 현재',
    description: [
      '주요 업무 내용을 입력하세요.',
      '사용한 기술 스택 및 성과를 입력하세요.',
    ],
  },
  {
    role: '[인턴십 / Internship]',
    company: '[회사명 / Company]',
    period: '2023.06 – 2023.12',
    description: [
      '인턴십 주요 업무를 입력하세요.',
      '기여한 내용을 입력하세요.',
    ],
  },
]

const CERTS: CertItem[] = [
  { name: '[자격증 이름]', issuer: '[발급 기관]', year: '2024' },
  { name: '[자격증 이름]', issuer: '[발급 기관]', year: '2023' },
]

const LANGUAGES: LanguageItem[] = [
  { language: 'Korean', level: 'Native', score: undefined },
  { language: 'English', level: 'Professional', score: '[TOEIC / IELTS score]' },
  { language: '[기타 언어]', level: '[수준]', score: undefined },
]

function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="section-inner">
        <h2 className="section-title">
          Experience &amp; <span className="gradient-text">Credentials</span>
        </h2>

        <div className="experience-layout">
          {/* Work Experience */}
          <div
            className="experience-col reveal"
            data-reveal
            style={{ '--delay': '0s' } as React.CSSProperties}
          >
            <h3 className="experience-col-title">
              <span className="experience-col-icon"><Briefcase size={16} /></span> Work Experience
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
                <span className="experience-col-icon"><Award size={16} /></span> Certifications
              </h3>
              <div className="certs-list">
                {CERTS.map((cert) => (
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
                <span className="experience-col-icon"><Globe size={16} /></span> Global Communication
              </h3>
              <p className="global-desc">
                글로벌 팀 환경에서의 협업 및 커뮤니케이션 경험을 보유하고 있습니다.
                영어로 기술 문서 작성, 코드 리뷰, 미팅 진행이 가능합니다.
              </p>
              <div className="languages-list">
                {LANGUAGES.map((lang) => (
                  <div key={lang.language} className="glass-card lang-card">
                    <div className="lang-header">
                      <span className="lang-name">{lang.language}</span>
                      <span className="lang-level">{lang.level}</span>
                    </div>
                    {lang.score && (
                      <span className="lang-score">{lang.score}</span>
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
