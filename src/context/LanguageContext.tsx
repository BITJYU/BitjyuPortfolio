import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'ko' | 'en'

interface LanguageContextValue {
  lang: Lang
  toggleLang: () => void
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'ko',
  toggleLang: () => {},
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ko')
  const toggleLang = () => setLang((prev) => (prev === 'ko' ? 'en' : 'ko'))
  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  return useContext(LanguageContext)
}
