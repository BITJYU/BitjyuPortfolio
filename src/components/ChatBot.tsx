import { useState, useRef, useEffect } from 'react'
import { Bot, X, Send } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './ChatBot.css'

interface QA {
  q: string
  a: string
  keywords: string[]
}

const QA_DATA: QA[] = [
  {
    q: '기술 스택이 뭔가요?',
    a: 'Python, Node.js, TypeScript를 주로 사용합니다. 프론트엔드는 React, DB는 MongoDB / MySQL / Oracle을 다룰 수 있고, 클라우드는 GCP와 AWS 경험이 있습니다.',
    keywords: ['기술', '스택', 'stack', 'tech', '언어', '사용'],
  },
  {
    q: 'AI / ML 경험은?',
    a: 'PyTorch 기반 모델 학습과 LoRA Fine-tuning 경험이 있습니다. Hugging Face를 통한 LLM 실험 및 배포까지 직접 진행했습니다.',
    keywords: ['ai', 'ml', '파인튜닝', 'pytorch', '모델', 'llm', '딥러닝', '머신러닝'],
  },
  {
    q: '경력 / 경험은?',
    a: 'IT & AI 전공 배경으로 다수의 프로젝트 경험을 보유하고 있습니다. 백엔드 서버 개발부터 AI 모델 배포까지 풀스택 경험이 있습니다. [Experience 섹션을 참고해주세요]',
    keywords: ['경력', '경험', 'experience', '인턴', '일한', '직장'],
  },
  {
    q: '프로젝트 소개',
    a: 'Node.js + MongoDB 기반 백엔드 프로젝트, PyTorch AI 모델 프로젝트, GCP 기반 React 서비스 등 다양한 프로젝트를 진행했습니다. [Projects 섹션에서 자세히 확인하세요]',
    keywords: ['프로젝트', 'project', '만든', '개발한', '포트폴리오'],
  },
  {
    q: '연락처는?',
    a: 'GitHub, Email, LinkedIn을 통해 연락하실 수 있습니다. 페이지 하단 Contact 섹션에서 확인해주세요!',
    keywords: ['연락', 'contact', '이메일', '메일', '연락처', '깃허브', 'github'],
  },
]

interface Message {
  role: 'user' | 'bot'
  text: string
}

function findAnswer(input: string): string {
  const lower = input.toLowerCase()
  for (const qa of QA_DATA) {
    if (qa.keywords.some((kw) => lower.includes(kw))) {
      return qa.a
    }
  }
  return '음... 제가 잘 모르는 질문이네요. 아래 버튼 중에 선택하시거나 직접 연락해주세요!'
}

function ChatBot() {
  const { style } = useTheme()
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: '안녕하세요! 궁금한 것을 물어보세요.' },
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

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    setMessages((prev) => [...prev, { role: 'user', text }])
    setInput('')
    setTyping(true)
    timerRef.current = setTimeout(() => {
      const answer = findAnswer(text)
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
        aria-label={open ? '채팅 닫기' : '채팅 열기'}
      >
        {open ? <X size={20} /> : <Bot size={20} />}
      </button>

      {/* Chat window */}
      {open && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <span className="chatbot-title">Portfolio Assistant</span>
            <span className="chatbot-status">● online</span>
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
            {QA_DATA.map((qa) => (
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
              placeholder="질문을 입력하세요..."
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
