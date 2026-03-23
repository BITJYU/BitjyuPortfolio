import { useState } from 'react'
import { Map } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import GameMap from './GameMap'
import './GameHUD.css'

const TOTAL_SECTIONS = 7

function GameHUD() {
  const { visitedSections } = useTheme()
  const [mapOpen, setMapOpen] = useState(false)

  const visited = visitedSections.size
  const level = Math.floor(visited / 2) + 1
  const xpPct = Math.round((visited / TOTAL_SECTIONS) * 100)

  return (
    <>
      <div className="game-hud" role="status" aria-label="게임 진행 상황">
        <span className="hud-level">LV.{level}</span>

        <div className="hud-xp-bar" aria-label={`XP ${xpPct}%`}>
          <div className="hud-xp-fill" style={{ width: `${xpPct}%` }} />
        </div>

        <span className="hud-chapters">{visited} / {TOTAL_SECTIONS}</span>

        <button
          className="hud-map-btn"
          onClick={() => setMapOpen(true)}
          aria-label="챕터 맵 열기"
        >
          <Map size={14} /> Map
        </button>
      </div>

      {mapOpen && <GameMap onClose={() => setMapOpen(false)} />}
    </>
  )
}

export default GameHUD
