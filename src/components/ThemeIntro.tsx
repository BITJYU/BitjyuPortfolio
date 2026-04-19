import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Bot, Code2, Send, Terminal } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import type { Theme } from '../context/ThemeContext'
import './ThemeIntro.css'

interface PresetPrompt {
  id: string
  label: string
  theme: Theme
  icon: ReactNode
  reply: string
}

interface ChatLine {
  id: string
  speaker: 'heliades' | 'visitor'
  text: string
}

const PRESET_PROMPTS: PresetPrompt[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    theme: 'game',
    icon: <Code2 size={18} />,
    reply:
      '프론트엔드 관점으로 안내합니다. React/Vite 기반 인터랙션, 세계관 사이트, 배포된 웹 페이지와 사용자 경험을 중심으로 아래 포트폴리오를 확인해보세요.',
  },
  {
    id: 'backend',
    label: 'Backend',
    theme: 'backend',
    icon: <Terminal size={18} />,
    reply:
      '백엔드 관점으로 안내합니다. Mastodon 운영/튜닝, Docker Compose 기반 서비스 분리, 데이터 흐름, 배포 가능한 구조를 중심으로 아래 포트폴리오를 확인해보세요.',
  },
  {
    id: 'ai',
    label: 'AI',
    theme: 'ai',
    icon: <Bot size={18} />,
    reply:
      'AI 관점으로 안내합니다. 모델 활용, 자동화 흐름, LLM 기반 인터랙션을 중심으로 살펴보면 좋습니다.',
  },
]

const DEFAULT_REPLY =
  '지금은 고정 응답 모드입니다. 입력 내용은 서버로 전송되지 않고, 준비된 안내 문장만 출력됩니다.'

const TITLES = ['Frontend & Backend Developer', 'AI Engineer', 'ML Model Builder']

function useTypewriter(titles: string[]) {
  const [display, setDisplay] = useState('')
  const idxRef      = useRef(0)
  const deletingRef = useRef(false)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    function tick() {
      const title = titles[idxRef.current]
      if (deletingRef.current) {
        setDisplay((prev) => prev.slice(0, -1))
        timerRef.current = setTimeout(tick, display.length <= 1 ? 420 : 40)
      } else {
        const next = title.slice(0, display.length + 1)
        setDisplay(next)
        if (next === title) {
          timerRef.current = setTimeout(() => {
            deletingRef.current = true
            tick()
          }, 1800)
          return
        }
        timerRef.current = setTimeout(tick, 80)
      }

      if (deletingRef.current && display.length === 0) {
        idxRef.current = (idxRef.current + 1) % titles.length
        deletingRef.current = false
      }
    }
    timerRef.current = setTimeout(tick, 120)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display])

  return display
}

function ThemeIntro() {
  const { theme, setTheme, setStyle, launch } = useTheme()
  const typedTitle = useTypewriter(TITLES)
  const [input, setInput] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState<PresetPrompt>(() => {
    return PRESET_PROMPTS.find((prompt) => prompt.theme === theme) ?? PRESET_PROMPTS[1]
  })
  const [chatLines, setChatLines] = useState<ChatLine[]>([
    {
      id: 'hello',
      speaker: 'heliades',
      text:
        '안녕하세요. 신입 주니어 개발자 조수민 입니다! 더욱 자세한 포트폴리오로 안내해드리겠습니다.',
    },
  ])

  const latestReply = useMemo(() => chatLines[chatLines.length - 1]?.text ?? DEFAULT_REPLY, [chatLines])

  const scrollToAbout = () => {
    window.requestAnimationFrame(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const pushReply = (prompt: PresetPrompt) => {
    setSelectedPrompt(prompt)
    setTheme(prompt.theme)
    setChatLines((prev) => [
      ...prev,
      { id: `${prompt.id}-ask-${prev.length}`, speaker: 'visitor', text: prompt.label },
      { id: `${prompt.id}-reply-${prev.length}`, speaker: 'heliades', text: prompt.reply },
    ])
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = input.trim()
    if (!text) return

    setInput('')
    setChatLines((prev) => [
      ...prev,
      { id: `custom-ask-${prev.length}`, speaker: 'visitor', text },
      { id: `custom-reply-${prev.length}`, speaker: 'heliades', text: DEFAULT_REPLY },
    ])
  }

  const handleLaunch = () => {
    setTheme(selectedPrompt.theme)
    setStyle('formal')
    launch()
    scrollToAbout()
  }

  return (
    <section id="intro" className="intro-overlay" data-intro-theme={selectedPrompt.theme} aria-label="Heliades intro">
      <div className="intro-shell">
        <main className="intro-main">
          <section className="intro-hero">
            <p className="intro-greeting">안녕하세요. 저는</p>
            <h1 className="intro-name gradient-text">Soomin Jo</h1>
            <div className="intro-title" aria-label={TITLES.join(', ')}>
              <span className="intro-title-text">{typedTitle}</span>
              <span className="intro-title-cursor" aria-hidden="true">|</span>
            </div>
            <p className="intro-copy">
              IT &amp; 소프트웨어 전공 개발자로 React, 백엔드 시스템과 AI 모델을 설계하고 배포합니다.
            </p>
            <div className="intro-cta">
              <button className="btn-primary" type="button" onClick={handleLaunch}>
                About Me
              </button>
              <a href="#contact" className="btn-ghost">Contact</a>
            </div>
          </section>

          <section className="intro-console" aria-label="포트폴리오 안내">
            <div className="intro-console-head">
              <div>
                <span className="intro-status-dot" aria-hidden="true" />
              </div>
            </div>

            <div className="intro-chat-log" aria-live="polite">
              {chatLines.slice(-4).map((line) => (
                <div key={line.id} className={`intro-chat-line intro-chat-line--${line.speaker}`}>
                  <span className="intro-chat-speaker">{line.speaker === 'heliades' ? 'H' : 'You'}</span>
                  <p>{line.text}</p>
                </div>
              ))}
            </div>

            <form className="intro-prompt" onSubmit={handleSubmit}>
              <Code2 size={18} aria-hidden="true" />
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="궁금한 점을 물어보세요"
                aria-label="궁금한 점을 물어보세요"
              />
              <button type="submit" aria-label="고정 응답 출력">
                <Send size={18} />
              </button>
            </form>
          </section>
        </main>

        <div className="intro-preset-grid" aria-label="추천 프롬프트">
          {PRESET_PROMPTS.map((prompt) => (
            <button
              key={prompt.id}
              className={`intro-preset-card${selectedPrompt.id === prompt.id ? ' is-selected' : ''}`}
              type="button"
              onClick={() => pushReply(prompt)}
            >
              <span className="intro-preset-icon">{prompt.icon}</span>
              <span>{prompt.label}</span>
            </button>
          ))}
        </div>

        <p className="intro-static-note">{latestReply}</p>
      </div>
    </section>
  )
}

export default ThemeIntro
