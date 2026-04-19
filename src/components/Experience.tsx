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
    role: 'Mastodon Operations & Tuning',
    company: 'Self-hosted Infrastructure',
    period: '운영 / 튜닝',
    description: [
      'Mastodon은 ActivityPub 기반의 연합형 소셜 네트워크 서버이며, 자체 인스턴스를 운영하며 구조와 병목을 분석했습니다.',
      'Docker Compose 기반으로 web, streaming, sidekiq 역할을 분리하고 서비스별 책임 범위를 파악했습니다.',
      'Redis DB를 cache, sidekiq, default 용도로 나누어 큐와 캐시 역할이 섞이지 않도록 운영 구조를 정리했습니다.',
      'PostgreSQL WAL, autovacuum, checkpoint 같은 운영 포인트를 확인하며 부하와 장애 가능성을 추적했습니다.',
      'Sidekiq queue와 scheduler 보호 관점에서 작업량이 몰릴 때 어떤 큐가 병목이 되는지 검토했습니다.',
    ],
  },
  {
    role: 'Automation Rule Design',
    company: 'Google Sheets / Apps Script',
    period: '자동화 사례',
    description: [
      'Google Sheets 데이터를 기반으로 조건 파싱, 태그 매칭, 우선순위 판정 로직을 설계했습니다.',
      '반복 입력을 줄이기 위해 Apps Script로 미니 룰 엔진 형태의 자동화 흐름을 구성했습니다.',
      '상태 잔존, 데이터 정규화, 구조 분리 문제를 개선 대상으로 파악하고 설계 보완 방향을 정리했습니다.',
    ],
  },
]

const CERTS: CertItem[] = [
  { name: 'Operations Debugging', issuer: 'Docker · Redis · PostgreSQL', year: 'Strength' },
  { name: 'Automation Logic', issuer: 'Apps Script · Rule Design', year: 'Focus' },
]

const LANGUAGES: LanguageItem[] = [
  { language: 'Korean', level: 'Native', score: undefined },
  {
    language: 'English',
    level: 'Technical Reading',
    score: 'TOEIC: 800+\nDocs / Error logs / API references\nSan Diego State University exchange student',
  },
]

function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="section-inner">
        <h2 className="section-title">
          Experience &amp; <span className="gradient-text">Strengths</span>
        </h2>

        <div className="experience-layout">
          {/* Work Experience */}
          <div
            className="experience-col reveal"
            data-reveal
            style={{ '--delay': '0s' } as React.CSSProperties}
          >
            <h3 className="experience-col-title">
              <span className="experience-col-icon"><Briefcase size={16} /></span> Operational Experience
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
                <span className="experience-col-icon"><Award size={16} /></span> Strengths
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
                기술 문서, 에러 로그, API 레퍼런스를 읽고 문제 원인을 좁혀가는 데 익숙합니다.
                필요한 내용을 한국어로 구조화해 기록하고 재현 가능한 해결 절차로 정리합니다.
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
