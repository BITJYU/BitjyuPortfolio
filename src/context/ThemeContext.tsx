import { createContext, useContext, useState, useEffect, useCallback } from 'react'

export type Theme = 'backend' | 'ai' | 'game' | 'toss'
export type Style = 'formal' | 'fun'

interface ThemeContextValue {
  theme: Theme | null
  style: Style | null
  isReady: boolean
  visitedSections: Set<string>
  setTheme: (t: Theme) => void
  setStyle: (s: Style) => void
  launch: () => void
  markVisited: (id: string) => void
  resetTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme | null>(() => {
    return (sessionStorage.getItem('pf-theme') as Theme) ?? null
  })
  const [style, setStyleState] = useState<Style | null>(() => {
    return (sessionStorage.getItem('pf-style') as Style) ?? null
  })
  // isReady: true if both theme+style are set AND user entered the portfolio.
  const [isReady, setIsReady] = useState(() => {
    return !!(sessionStorage.getItem('pf-theme') && sessionStorage.getItem('pf-style'))
  })
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set())

  // Apply data-theme / data-style to body whenever they change
  useEffect(() => {
    if (theme) {
      document.body.setAttribute('data-theme', theme)
      sessionStorage.setItem('pf-theme', theme)
    }
  }, [theme])

  useEffect(() => {
    if (style) {
      document.body.setAttribute('data-style', style)
      sessionStorage.setItem('pf-style', style)
    }
  }, [style])

  const setTheme = useCallback((t: Theme) => setThemeState(t), [])
  const setStyle = useCallback((s: Style) => setStyleState(s), [])

  const launch = useCallback(() => {
    setIsReady(true)
  }, [])

  const resetTheme = useCallback(() => {
    sessionStorage.removeItem('pf-theme')
    sessionStorage.removeItem('pf-style')
    document.body.removeAttribute('data-theme')
    document.body.removeAttribute('data-style')
    setThemeState(null)
    setStyleState(null)
    setIsReady(false)
    setVisitedSections(new Set())
    window.scrollTo({ top: 0 })
  }, [])

  const markVisited = useCallback((id: string) => {
    setVisitedSections((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })
  }, [])

  return (
    <ThemeContext.Provider value={{ theme, style, isReady, visitedSections, setTheme, setStyle, launch, markVisited, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider')
  return ctx
}
