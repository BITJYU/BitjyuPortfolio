import { useEffect } from 'react'

/**
 * Attaches a global mousemove listener that writes --mouse-x / --mouse-y
 * onto every .glass-card so the CSS spotlight gradient can follow the cursor.
 */
function MouseSpotlight() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll<HTMLElement>('.glass-card')
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`)
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`)
      })
    }
    document.addEventListener('mousemove', handleMouseMove)
    return () => document.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return null
}

export default MouseSpotlight
