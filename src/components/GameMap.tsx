import type { ReactNode } from 'react'
import { Home, User, Code2, Briefcase, FolderGit2, Gamepad2, Mail, Map, Check, X } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './GameMap.css'

interface Chapter {
  id: string
  label: string
  icon: ReactNode
}

const CHAPTERS: Chapter[] = [
  { id: 'intro',      label: '시작',        icon: <Home size={16} /> },
  { id: 'about',      label: 'About',      icon: <User size={16} /> },
  { id: 'skills',     label: 'Skills',     icon: <Code2 size={16} /> },
  { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
  { id: 'projects',   label: 'Projects',   icon: <FolderGit2 size={16} /> },
  { id: 'games',      label: 'Games',      icon: <Gamepad2 size={16} /> },
  { id: 'contact',    label: 'Contact',    icon: <Mail size={16} /> },
]

interface Props {
  onClose: () => void
}

function GameMap({ onClose }: Props) {
  const { visitedSections } = useTheme()

  const goTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    onClose()
  }

  return (
    <div className="gamemap-overlay" onClick={onClose} role="dialog" aria-label="챕터 맵">
      <div className="gamemap-panel" onClick={(e) => e.stopPropagation()}>
        <div className="gamemap-header">
          <h3 className="gamemap-title"><Map size={18} /> Chapter Map</h3>
          <button className="gamemap-close" onClick={onClose} aria-label="닫기"><X size={16} /></button>
        </div>

        <div className="gamemap-nodes">
          {CHAPTERS.map((ch, i) => {
            const unlocked = visitedSections.has(ch.id)
            return (
              <div key={ch.id} className="gamemap-node-row">
                {i > 0 && <div className={`gamemap-connector${unlocked ? ' is-unlocked' : ''}`} />}
                <button
                  className={`gamemap-node${unlocked ? ' is-unlocked' : ''}`}
                  onClick={() => goTo(ch.id)}
                  aria-label={`${ch.label}${unlocked ? ' (방문함)' : ''}`}
                >
                  <span className="gamemap-node-icon">{ch.icon}</span>
                  <span className="gamemap-node-label">{ch.label}</span>
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
