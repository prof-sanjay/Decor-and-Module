import Reveal from './Reveal'

const STRIP_IMGS = [
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85',
  'https://images.unsplash.com/photo-1560185127-6a1b867db998?auto=format&fit=crop&w=700&q=85',
  'https://images.unsplash.com/photo-1567538096630-0c50f0f35cac?auto=format&fit=crop&w=500&q=85',
]

function scrollToContact() {
  const el = document.getElementById('contact')
  if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' })
}

export default function About() {
  return (
    <section id="about">
      <div className="container">

        {/* Pull-quote + text grid */}
        <div className="about-split">

          <Reveal dir="left">
            <p className="about-quote">
              "We design rooms that feel <em>inevitable</em> — as if they could never have been any other way."
            </p>
            <span className="about-since">— Decor &amp; Modules, Est. 2014</span>
          </Reveal>

          <Reveal dir="right">
            <span className="eyebrow" style={{ marginBottom: 20, display: 'inline-flex' }}>Our Story</span>
            <p className="about-txt">
              Founded in 2014 with a singular belief — that a well-designed space changes how you think, feel, and live — Decor and Modules has spent a decade turning that conviction into rooms worth remembering.
            </p>
            <p className="about-txt">
              Our team of designers, architects, and craftspeople works across residential and commercial projects, bringing the same rigour and imagination to a private bedroom as to a flagship office. No template. No shortcuts.
            </p>

            <div className="about-metrics">
              <div>
                <div className="metric-num">150+</div>
                <div className="metric-lbl">Projects</div>
              </div>
              <div>
                <div className="metric-num">10+</div>
                <div className="metric-lbl">Years</div>
              </div>
              <div>
                <div className="metric-num">120+</div>
                <div className="metric-lbl">Clients</div>
              </div>
            </div>

            <button className="btn btn-ghost-dark" onClick={scrollToContact}>
              Start a Conversation <i className="fas fa-arrow-right" />
            </button>
          </Reveal>

        </div>

        {/* Image strip */}
        <Reveal className="about-strip">
          {STRIP_IMGS.map((src, i) => (
            <div className="strip-img" key={i}>
              <img src={src} alt={`Interior ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  )
}
