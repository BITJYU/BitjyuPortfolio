import type { ReactNode } from 'react'
import { BriefcaseBusiness, FolderGit2, Mail } from 'lucide-react'
import './Contact.css'

interface ContactItem {
  icon: ReactNode
  label: string
  description: string
  href: string
}

const CONTACTS: ContactItem[] = [
  {
    icon: <FolderGit2 size={28} />,
    label: 'GitHub',
    description: '프로젝트 코드 및 오픈소스 기여',
    href: '#',
  },
  {
    icon: <Mail size={28} />,
    label: 'Email',
    description: 'whtnals0417@gmail.com',
    href: 'mailto:whtnals0417@gmail.com',
  },
  {
    icon: <BriefcaseBusiness size={28} />,
    label: 'LinkedIn',
    description: '경력 및 네트워크',
    href: '#',
  },
]

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="section-inner">
        <h2 className="section-title">
          Get in <span className="gradient-text">Touch</span>
        </h2>
        <p className="contact-subtitle">
          프로젝트 협업이나 채용 문의 등 언제든지 연락주세요.
        </p>

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
