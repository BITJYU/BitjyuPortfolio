import './About.css'

const INFO_ITEMS = [
  { label: '전공', value: 'IT & AI' },
  { label: '역할', value: 'Backend Developer / AI Engineer' },
  { label: '관심사', value: 'LLM, 강화학습, 백엔드 시스템' },
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
              안녕하세요! IT &amp; AI 전공 개발자입니다. 백엔드 시스템 설계부터
              AI 모델 파인튜닝, 클라우드 배포까지 폭넓은 스택을 다룹니다.
            </p>
            <p>
              Node.js / Python 기반 서버 개발과 함께 PyTorch, LoRA Fine-tuning,
              Hugging Face를 활용한 LLM 모델 실험 및 배포 경험이 있습니다.
            </p>
            <p>
              새로운 기술을 탐구하고 실제 프로젝트에 적용하는 것을 즐깁니다.
              게임 개발과 AI를 결합한 실험적인 프로젝트에도 관심이 많습니다.
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
