import type { ReactNode } from 'react'
import { Home, User, Code2, Briefcase, FolderGit2, Gamepad2, Mail, Map, Check, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './GameMap.css'

interface Chapter {
  id: string
  icon: ReactNode
}

const CHAPTERS: Chapter[] = [
  { id: 'intro',      icon: <Home size={16} /> },
  { id: 'about',      icon: <User size={16} /> },
  { id: 'skills',     icon: <Code2 size={16} /> },
  { id: 'experience', icon: <Briefcase size={16} /> },
  { id: 'ai',         icon: <FolderGit2 size={16} /> },
  { id: 'frontend',   icon: <Gamepad2 size={16} /> },
  { id: 'backend',    icon: <Map size={16} /> },
  { id: 'contact',    icon: <Mail size={16} /> },
]

interface Props {
  onClose: () => void
}

function GameMap({ onClose }: Props) {
  const { visitedSections } = useTheme()
  const { lang } = useLanguage()
  const t = i18n[lang].gameUi

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }

  return (
    <div className="gamemap-overlay" onClick={onClose} role="dialog" aria-label={t.mapTitle}>
      <div className="gamemap-panel" onClick={(e) => e.stopPropagation()}>
        <div className="gamemap-header">
          <h3 className="gamemap-title"><Map size={18} /> {t.mapTitle}</h3>
          <button className="gamemap-close" onClick={onClose} aria-label={t.closeMap}><X size={16} /></button>
        </div>

        <div className="gamemap-nodes">
          {CHAPTERS.map((ch, i) => {
            const unlocked = visitedSections.has(ch.id)
            const label = t.chapters[ch.id as keyof typeof t.chapters]
            return (
              <div key={ch.id} className="gamemap-node-row">
                {i > 0 && <div className={`gamemap-connector${unlocked ? ' is-unlocked' : ''}`} />}
                <button
                  className={`gamemap-node${unlocked ? ' is-unlocked' : ''}`}
                  onClick={() => goTo(ch.id)}
                  aria-label={`${label}${unlocked ? ` (${t.visited})` : ''}`}
                >
                  <span className="gamemap-node-icon">{ch.icon}</span>
                  <span className="gamemap-node-label">{label}</span>
                  {unlocked && <span className="gamemap-node-check" aria-hidden="true"><Check size={10} /></span>}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default GameMap
