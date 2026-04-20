import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './TossNavbar.css'

const TOSS_NAV_LINKS = [
  { label: 'About', href: '#toss-about' },
  { label: 'Skills', href: '#toss-skills' },
  { label: 'Experience', href: '#toss-experience' },
  { label: 'Projects', href: '#toss-projects' },
  { label: 'Games', href: '#toss-games' },
  { label: 'Contact', href: '#toss-contact' },
] as const

function TossNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`toss-navbar${scrolled ? ' toss-navbar--scrolled' : ''}`}>
      <div className="toss-navbar-inner">
        <a href="#toss-hero" className="toss-navbar-logo">
          Soomin <span>Jo</span>
        </a>
        <ul className="toss-navbar-links">
          {TOSS_NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="toss-navbar-link">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Link to="/" className="toss-navbar-back">
          ← 기존 포트폴리오
        </Link>
      </div>
    </nav>
  )
}

export default TossNavbar
