import { useLanguage } from '../../context/LanguageContext'
import i18n from '../../i18n'
import './TossFooter.css'

function TossFooter() {
  const { lang } = useLanguage()
  const t = i18n[lang].footer

  return (
    <footer className="toss-footer">
      <span>Soomin Jo</span>
      <span>{t.rights}</span>
    </footer>
  )
}

export default TossFooter
