import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'home',     label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'about',    label: 'Studio' },
  { id: 'why-us',   label: 'Why Us' },
  { id: 'contact',  label: 'Contact' },
]

export default function SectionNav() {
  const [active, setActive] = useState('home')

  useEffect(() => {
    const observers = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { threshold: 0.35 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const goTo = (id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' })
  }

  return (
    <nav className="section-nav" aria-label="Page sections">
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`sn-dot${active === id ? ' active' : ''}`}
          onClick={() => goTo(id)}
          title={label}
          aria-label={`Go to ${label}`}
        />
      ))}
    </nav>
  )
}
