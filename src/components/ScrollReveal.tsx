import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

/**
 * Watches every [data-reveal] element with IntersectionObserver.
 * Adds .is-visible when the element enters the viewport.
 * Also marks visited section IDs for the Game theme chapter map.
 */
function ScrollReveal() {
  const { markVisited } = useTheme()

  useEffect(() => {
    // --- Reveal animation observer ---
    const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]')

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            ;(entry.target as HTMLElement).classList.add('is-visible')
            revealObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    )

    revealEls.forEach((el) => {
      el.classList.remove('is-visible')
      revealObserver.observe(el)
    })

    // --- Section visit observer (game theme chapter map) ---
    const sections = document.querySelectorAll<HTMLElement>('section[id]')

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            markVisited((entry.target as HTMLElement).id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((sec) => sectionObserver.observe(sec))

    return () => {
      revealObserver.disconnect()
      sectionObserver.disconnect()
    }
  }, [markVisited])

  return null
}

export default ScrollReveal
