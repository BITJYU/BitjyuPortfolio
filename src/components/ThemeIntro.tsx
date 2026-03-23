import { useState } from 'react'
import type { ReactNode } from 'react'
import { Terminal, Bot, Gamepad2, Zap, PartyPopper } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import type { Theme, Style } from '../context/ThemeContext'
import './ThemeIntro.css'

const THEME_OPTIONS: { value: Theme; icon: ReactNode; label: string; desc: string }[] = [
  { value: 'backend', icon: <Terminal size={28} />, label: 'Backend', desc: '서버 · 인프라 · DB' },
  { value: 'ai',      icon: <Bot size={28} />,      label: 'AI',      desc: 'ML · LLM · 파인튜닝' },
  { value: 'game',    icon: <Gamepad2 size={28} />, label: 'Game',    desc: '게임 개발 · AI 게임' },
]

const STYLE_OPTIONS: { value: Style; icon: ReactNode; label: string; desc: string }[] = [
  { value: 'formal', icon: <Zap size={22} />,         label: '빠르고 딱딱하게',        desc: '핵심 정보 중심, 간결하게' },
  { value: 'fun',    icon: <PartyPopper size={22} />, label: '합법적으로 시간 때우기', desc: '인터랙티브 풀 경험' },
]

const DOTS = ['Q1', 'Q2', 'Q3']

function ThemeIntro() {
  const { theme, style, isReady, setTheme, setStyle, launch } = useTheme()
  const [slide, setSlide] = useState(0)
  const [leaving, setLeaving] = useState(false)   // slide-up exit animation

  // If already configured from a previous session, skip
  if (isReady) return null

  const goNext = () => setSlide((s) => s + 1)

  const handleTheme = (t: Theme) => {
    setTheme(t)
    goNext()
  }

  const handleStyle = (s: Style) => {
    setStyle(s)
    goNext()
  }

  const handleLaunch = () => {
    setLeaving(true)
    setTimeout(() => launch(), 500)
  }

  return (
    <div className={`intro-overlay${leaving ? ' intro-overlay--leaving' : ''}`} aria-modal="true" role="dialog">
      {/* Progress dots */}
      {slide > 0 && (
        <div className="intro-dots" aria-label={`Step ${slide + 1} of 3`}>
          {DOTS.map((_, i) => (
            <span key={i} className={`intro-dot${i <= slide ? ' intro-dot--active' : ''}`} />
          ))}
        </div>
      )}

      {/* Slide 0: Q1 — Theme */}
      {slide === 0 && (
        <div className="intro-slide">
          <h1 className="intro-question">어느 분야를 중점적으로<br />보고 싶으신가요?</h1>
          <div className="intro-theme-grid">
            {THEME_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`intro-theme-card${theme === opt.value ? ' is-selected' : ''}`}
                onClick={() => handleTheme(opt.value)}
                data-theme-pick={opt.value}
              >
                <span className="intro-theme-icon">{opt.icon}</span>
                <span className="intro-theme-label">{opt.label}</span>
                <span className="intro-theme-desc">{opt.desc}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Slide 1: Q2 — Style */}
      {slide === 1 && (
        <div className="intro-slide">
          <h2 className="intro-question">어떤 스타일로<br />보시겠어요?</h2>
          <div className="intro-style-list">
            {STYLE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                className={`intro-style-card${style === opt.value ? ' is-selected' : ''}`}
                onClick={() => handleStyle(opt.value)}
              >
                <span className="intro-style-icon">{opt.icon}</span>
                <div className="intro-style-text">
                  <span className="intro-style-label">{opt.label}</span>
                  <span className="intro-style-desc">{opt.desc}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Slide 2: Q3 — Launch */}
      {slide === 2 && (
        <div className="intro-slide intro-slide--center">
          <p className="intro-ready-sub">설정 완료</p>
          <h2 className="intro-question intro-question--ready">준비되셨나요?</h2>
          <button className="intro-launch-btn" onClick={handleLaunch}>
            네.
          </button>
        </div>
      )}
    </div>
  )
}

export default ThemeIntro
