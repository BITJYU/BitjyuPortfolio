import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './Footer.css'

function Footer() {
  const { lang } = useLanguage()
  const t = i18n[lang].footer

  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">
          © {new Date().getFullYear()} Soomin Jo. {t.rights}
        </p>
      </div>
    </footer>
  )
}

export default Footer
