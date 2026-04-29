import { useCallback } from 'react'

const IMG = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=88'

export default function Hero() {
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

      <div className="hero-content container">
        <div className="hero-glass-card">
          <span className="hero-kicker">Interior Design Studio</span>

          <h1 className="hero-display">
            Decor
            <em>&amp; Modules</em>
          </h1>

          <p className="hero-tagline">
            Transforming Spaces,<br />Creating Experiences
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
