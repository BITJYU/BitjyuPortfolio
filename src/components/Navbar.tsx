import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'AI', href: '#ai' },
  { label: 'Frontend', href: '#frontend' },
  { label: 'Backend', href: '#backend' },
  { label: 'Contact', href: '#contact' },
] as const

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, resetTheme, isReady } = useTheme()
  const { lang, toggleLang } = useLanguage()
  const t = i18n[lang].navbar

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar-inner">
        <a href="#intro" className="navbar-logo gradient-text">
          Soomin Jo
        </a>

        {/* Desktop links */}
        <ul className="navbar-links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="navbar-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Language toggle */}
        <button
          className="navbar-lang-toggle"
          onClick={toggleLang}
          aria-label={`Switch to ${lang === 'ko' ? 'English' : '한국어'}`}
        >
          {lang === 'ko' ? 'EN' : 'KO'}
        </button>

        {/* Theme reset button — only show after survey is done */}
        {isReady && (
          <button
            className="navbar-theme-reset"
            onClick={resetTheme}
            title={t.changeTheme}
            aria-label={t.currentTheme(theme)}
          >
            <RefreshCw size={13} /> {theme}
          </button>
        )}

        {/* Toss UI page link */}
        <Link to="/toss" className="navbar-toss-link">
          Toss UI →
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          className={`navbar-hamburger${menuOpen ? ' is-open' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="navbar-mobile-menu">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="navbar-mobile-link" onClick={closeMenu}>
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <button className="navbar-mobile-lang-toggle" onClick={() => { toggleLang(); closeMenu() }}>
              {lang === 'ko' ? 'EN' : 'KO'}
            </button>
          </li>
          {isReady && (
            <li>
              <button className="navbar-mobile-theme-reset" onClick={() => { resetTheme(); closeMenu() }}>
                <RefreshCw size={13} /> {t.changeTheme}
              </button>
            </li>
          )}
          <li>
            <Link to="/toss" className="navbar-mobile-toss-link" onClick={closeMenu}>
              Toss UI →
            </Link>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default Navbar
