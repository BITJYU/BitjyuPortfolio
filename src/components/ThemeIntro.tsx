import { useEffect, useMemo, useRef, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { Bot, Code2, Send, Terminal, Layers } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import type { Theme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
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

function useTypewriter(titles: readonly string[]) {
  const [display, setDisplay] = useState('')
  const idxRef      = useRef(0)
  const deletingRef = useRef(false)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    idxRef.current = 0
    deletingRef.current = false
    setDisplay('')
  }, [titles])

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
  }, [display, titles])

  return display
}

function ThemeIntro() {
  const { theme, setTheme, setStyle, launch } = useTheme()
  const { lang } = useLanguage()
  const t = i18n[lang].themeIntro
  const typedTitle = useTypewriter(t.titles)
  const [input, setInput] = useState('')
  const chatLogRef = useRef<HTMLDivElement | null>(null)

  const PRESET_PROMPTS: PresetPrompt[] = useMemo(() => [
    {
      id: 'frontend',
      label: t.presetLabels.frontend,
      theme: 'game' as Theme,
      icon: <Code2 size={18} />,
      reply: t.presetReplies.frontend,
    },
    {
      id: 'backend',
      label: t.presetLabels.backend,
      theme: 'backend' as Theme,
      icon: <Terminal size={18} />,
      reply: t.presetReplies.backend,
    },
    {
      id: 'ai',
      label: t.presetLabels.ai,
      theme: 'ai' as Theme,
      icon: <Bot size={18} />,
      reply: t.presetReplies.ai,
    },
    {
      id: 'toss',
      label: t.presetLabels.toss,
      theme: 'toss' as Theme,
      icon: <Layers size={18} />,
      reply: t.presetReplies.toss,
    },
  ], [t])

  const [selectedId, setSelectedId] = useState<string>(
    () => (PRESET_PROMPTS.find((p) => p.theme === theme) ?? PRESET_PROMPTS[1]).id
  )
  const selectedPrompt = PRESET_PROMPTS.find((p) => p.id === selectedId) ?? PRESET_PROMPTS[1]

  const [chatLines, setChatLines] = useState<ChatLine[]>([
    { id: 'hello', speaker: 'heliades', text: t.initialMessage },
  ])

  useEffect(() => {
    const chatLog = chatLogRef.current
    if (!chatLog) return
    chatLog.scrollTop = chatLog.scrollHeight
  }, [chatLines])

  const scrollToAbout = () => {
    window.requestAnimationFrame(() => {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  const pushReply = (prompt: PresetPrompt) => {
    const current = PRESET_PROMPTS.find((p) => p.id === prompt.id) ?? prompt
    setSelectedId(current.id)
    setTheme(current.theme)
    setChatLines((prev) => [
      ...prev,
      { id: `${current.id}-ask-${prev.length}`, speaker: 'visitor', text: current.label },
      { id: `${current.id}-reply-${prev.length}`, speaker: 'heliades', text: current.reply },
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
      { id: `custom-reply-${prev.length}`, speaker: 'heliades', text: t.defaultReply },
    ])
  }

  const handleLaunch = () => {
    setTheme(selectedPrompt.theme)
    setStyle('formal')
    launch()
    scrollToAbout()
  }

  return (
    <section id="intro" className="intro-overlay" data-intro-theme={selectedPrompt.theme} aria-label={t.consoleLabel}>
      <div className="intro-shell">
        <main className="intro-main">
          <section className="intro-hero">
            <p className="intro-greeting">{t.greeting}</p>
            <h1 className="intro-name gradient-text">Soomin Jo</h1>
            <div className="intro-title" aria-label={t.titles.join(', ')}>
              <span className="intro-title-text">{typedTitle}</span>
              <span className="intro-title-cursor" aria-hidden="true">|</span>
            </div>
            <p className="intro-copy">{t.copy}</p>
            <div className="intro-cta">
              <button className="btn-primary" type="button" onClick={handleLaunch}>
                {t.aboutButton}
              </button>
              <a href="#contact" className="btn-ghost">{t.contactButton}</a>
            </div>
          </section>

          <section className="intro-console" aria-label={t.consoleLabel}>
            <div className="intro-console-head">
              <div>
                <span className="intro-status-dot" aria-hidden="true" />
              </div>
            </div>

            <div className="intro-chat-log" aria-live="polite" ref={chatLogRef}>
              {chatLines.map((line) => (
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
                placeholder={t.placeholder}
                aria-label={t.placeholder}
              />
              <button type="submit" aria-label={t.placeholder}>
                <Send size={18} />
              </button>
            </form>
          </section>
        </main>

        <div className="intro-preset-grid" aria-label={t.presetLabel}>
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
      </div>
    </section>
  )
}

export default ThemeIntro
