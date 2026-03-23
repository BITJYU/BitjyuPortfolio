import { useState, useEffect } from 'react'
import { RefreshCw } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import './Navbar.css'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Games', href: '#games' },
  { label: 'Contact', href: '#contact' },
]

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { theme, resetTheme, isReady } = useTheme()

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
        <a href="#hero" className="navbar-logo gradient-text">
          [Your Name]
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

        {/* Theme reset button — only show after survey is done */}
        {isReady && (
          <button
            className="navbar-theme-reset"
            onClick={resetTheme}
            title="테마 다시 고르기"
            aria-label={`현재 테마: ${theme}. 다시 고르기`}
          >
            <RefreshCw size={13} /> {theme}
          </button>
        )}

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
          {isReady && (
            <li>
              <button className="navbar-mobile-theme-reset" onClick={() => { resetTheme(); closeMenu() }}>
                <RefreshCw size={13} /> 테마 다시 고르기
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  )
}

export default Navbar
