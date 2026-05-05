import { useState, useEffect } from 'react'
import logo from '../assets/logo.webp'

const LINKS = [
  ['home',     'Home'],
  ['projects', 'Projects'],
  ['services', 'Services'],
  ['about',    'About'],
  ['why-us',   'Why Us'],
]

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' })
}

export default function Navbar() {
  const [solid,   setSolid]   = useState(false)
  const [visible, setVisible] = useState(false)
  const [open,    setOpen]    = useState(false)

  useEffect(() => {
    const fn = () => {
      setSolid(window.scrollY > 60)
      setVisible(window.scrollY > 120)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)
  const nav   = id => { close(); setTimeout(() => scrollTo(id), 80) }

  return (
    <>
      <nav className={`nav${solid ? ' solid' : ''}${visible ? ' visible' : ''}`}>
        <div className="nav-inner">
          <a href="#home" className="logo-wrap" onClick={e => { e.preventDefault(); nav('home') }}>
            <img src={logo} alt="Decor & Modules" style={{ height: '48px', width: 'auto', objectFit: 'contain' }} />
          </a>

          <ul className="nav-links">
            {LINKS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={e => { e.preventDefault(); nav(id) }}>{label}</a>
              </li>
            ))}
            <li>
              <a href="#contact" className="nav-cta-btn" onClick={e => { e.preventDefault(); nav('contact') }}>
                Enquire
              </a>
            </li>
          </ul>

          <button className={`burger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <div className={`overlay${open ? ' show' : ''}`} onClick={close} />

      <div className={`drawer${open ? ' open' : ''}`}>
        <ul>
          {[...LINKS, ['contact', 'Contact']].map(([id, label]) => (
            <li key={id}>
              <a href={`#${id}`} onClick={e => { e.preventDefault(); nav(id) }}>{label}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
