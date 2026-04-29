import { useCallback, useState, useEffect, useRef } from 'react'

const IMG = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=88'

const CYCLING_WORDS = ['Simple.', 'Elegant.', 'Functional.']
const CYCLE_MS = 2600

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const [tick,    setTick]    = useState(0)
  const contentRef = useRef(null)

  useEffect(() => {
    const id = setInterval(() => {
      setTick(t => t + 1)
      setWordIdx(i => (i + 1) % CYCLING_WORDS.length)
    }, CYCLE_MS)
    return () => clearInterval(id)
  }, [])

  // Parallax: content drifts up and fades as the hero scrolls out of view
  useEffect(() => {
    const onScroll = () => {
      if (!contentRef.current) return
      const y = window.scrollY
      const vh = window.innerHeight
      contentRef.current.style.transform = `translateY(${y * 0.22}px)`
      contentRef.current.style.opacity   = String(Math.max(0, 1 - (y / vh) * 1.4))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const goContact = useCallback(() => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' })
  }, [])

  const goProjects = useCallback(() => {
    const el = document.getElementById('projects')
    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' })
  }, [])

  return (
    <section id="home" className="hero-section">
      <div className="hero-bg">
        <img src={IMG} alt="Luxury interior design" />
        <div className="hero-overlay" />
      </div>

      <div className="hero-content container" ref={contentRef}>
        <div className="hero-glass-card">
          <span className="hero-kicker">Interior Design Studio</span>

          <h1 className="hero-display">
            Where Design is
            <span className="hero-words" aria-live="polite" aria-label="Brand values">
              <span className="hero-word" key={tick}>
                {CYCLING_WORDS[wordIdx]}
              </span>
            </span>
          </h1>

          <p className="hero-tagline">
            Premium interiors crafted to inspire — every material chosen, every proportion considered, every space unmistakably yours.
          </p>

          <div className="hero-actions">
            <button className="btn btn-clay" onClick={goContact}>
              Enquire Now <i className="fas fa-arrow-right" />
            </button>
            <button className="btn btn-ghost-light" onClick={goProjects}>
              View Work
            </button>
          </div>
        </div>
      </div>

      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-track" />
      </div>
    </section>
  )
}
