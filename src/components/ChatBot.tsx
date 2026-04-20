import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './ChatBot.css'

interface Message {
  role: 'user' | 'bot'
  text: string
}

function findAnswer(input: string, qaData: readonly { a: string; keywords: readonly string[] }[], fallback: string): string {
  const lower = input.toLowerCase()
  for (const qa of qaData) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      return qa.a
    }
  }
  return fallback
}

function ChatBot() {
  const { style } = useTheme()
  const { lang } = useLanguage()
  const t = i18n[lang].chatbot
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: t.initialMessage },
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Auto-open only in fun mode
  useEffect(() => {
    if (style === 'fun') {
      timerRef.current = setTimeout(() => setOpen(true), 2000)
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [style])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  useEffect(() => {
    setMessages([{ role: 'bot', text: t.initialMessage }])
  }, [t.initialMessage])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setTyping(true)
    timerRef.current = setTimeout(() => {
      const answer = findAnswer(text, t.qa, t.fallback)
      setMessages((prev) => [...prev, { role: 'bot', text: answer }])
      setTyping(false)
    }, 700)
  }

  return (
    <>
      {/* Toggle button */}
      <button
        className={`chatbot-toggle${open ? ' chatbot-toggle--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? t.closeLabel : t.openLabel}
      >
        {open ? <X size={20} /> : <Bot size={20} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span className="chatbot-title">{t.title}</span>
            <span className="chatbot-status">{t.status}</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {typing && (
              <div className="chatbot-msg chatbot-msg--bot chatbot-typing">
                <span /><span /><span />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick-pick buttons */}
          <div className="chatbot-quickpicks">
            {t.qa.map((qa) => (
              <button
                key={qa.q}
                className="chatbot-quickpick"
                onClick={() => sendMessage(qa.q)}
              >
                {qa.q}
              </button>
            ))}
          </div>

          <form
            className="chatbot-input-row"
            onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
          >
            <input
              className="chatbot-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.placeholder}
              disabled={typing}
            />
            <button className="chatbot-send" type="submit" disabled={typing || !input.trim()}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatBot
