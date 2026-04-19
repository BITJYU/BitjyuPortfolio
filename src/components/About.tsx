import './About.css'

const INFO_ITEMS = [
  { label: '전공', value: 'IT & AI' },
  { label: '역할', value: 'Backend / Infra-oriented Developer' },
  { label: 'AI 툴', value: 'Claude · Cursor · Copilot · Codex' },
  { label: '관심사', value: '운영 자동화, 백엔드 시스템, LLM 도구화' },
  { label: '위치', value: 'Korea' },
]

function About() {
  return (
    <section id="about" className="section about">
      <div className="section-inner">
        <h2 className="section-title">
          About <span className="gradient-text">Me</span>
        </h2>

        <div className="about-grid">
          {/* Description */}
          <div
            className="about-text reveal"
            data-reveal
            style={{ '--delay': '0s' } as React.CSSProperties}
          >
            <p>
              안녕하세요. 구현 중심의 문제 해결에서 출발해 운영과 설계까지
              시야를 넓혀가고 있는 IT &amp; AI 전공 개발자입니다.
            </p>
            <p>
              Docker Compose 기반 서비스 분리, Redis 역할 분리, PostgreSQL 운영
              포인트, Sidekiq 큐 구조처럼 실제 서비스가 안정적으로 움직이는
              조건을 추적하고 개선하는 작업에 관심이 많습니다.
            </p>
            <p>
              에러를 넘기지 않고 원인을 확인한 뒤 우회, 검증, 재시도를 반복하는
              편입니다. 지금은 잘 고치는 개발자에서 왜 그렇게 설계해야 하는지
              설명할 수 있는 개발자로 확장하는 중입니다.
            </p>
          </div>

          {/* Info card */}
          <div
            className="glass-card about-card reveal"
            data-reveal
            style={{ '--delay': '0.15s' } as React.CSSProperties}
          >
            <h3 className="about-card-title">Quick Info</h3>
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
