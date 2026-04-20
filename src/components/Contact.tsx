import type { ReactNode } from 'react'
import { BriefcaseBusiness, FolderGit2, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import i18n from '../i18n'
import './Contact.css'

interface ContactItem {
  icon: ReactNode
  label: string
  description: string
  href: string
}

function Contact() {
  const { lang } = useLanguage()
  const t = i18n[lang].contact

  const CONTACTS: ContactItem[] = [
    {
      icon: <FolderGit2 size={28} />,
      label: t.githubLabel,
      description: t.githubDesc,
      href: 'https://github.com/BITJYU',
    },
    {
      icon: <Mail size={28} />,
      label: t.emailLabel,
      description: 'whtnals0417@gmail.com',
      href: 'mailto:whtnals0417@gmail.com',
    },
    {
      icon: <BriefcaseBusiness size={28} />,
      label: t.linkedinLabel,
      description: t.linkedinDesc,
      href: '#',
    },
  ]

  return (
    <section id="contact" className="section contact">
      <div className="section-inner">
        <h2 className="section-title">
          {t.titlePrefix} <span className="gradient-text">{t.titleHighlight}</span>
        </h2>
        <p className="contact-subtitle">{t.subtitle}</p>

        <div className="contact-grid">
          {CONTACTS.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className="glass-card contact-card reveal"
              data-reveal
              style={{ '--delay': `${i * 0.12}s` } as React.CSSProperties}
              target={item.href.startsWith('http') ? '_blank' : undefined}
              rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span className="contact-icon" aria-hidden="true">{item.icon}</span>
              <span className="contact-label">{item.label}</span>
              <span className="contact-description">{item.description}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact
