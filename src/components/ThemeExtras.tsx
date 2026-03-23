import { useTheme } from '../context/ThemeContext'
import ChatBot from './ChatBot'
import GameHUD from './GameHUD'

function ThemeExtras() {
  const { theme, isReady } = useTheme()

  // Don't render extras until portfolio is visible
  if (!isReady) return null

  return (
    <>
      {theme === 'ai'   && <ChatBot />}
      {theme === 'game' && <GameHUD />}
    </>
  )
}

export default ThemeExtras
