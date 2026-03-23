import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './themes/backend.css'
import './themes/ai.css'
import './themes/game.css'
import './themes/formal.css'
import { ThemeProvider } from './context/ThemeContext'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
