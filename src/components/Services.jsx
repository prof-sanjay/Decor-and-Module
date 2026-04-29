import { useRef, useCallback } from 'react'
import Reveal from './Reveal'

const SERVICES = [
  {
    id: 1,
    icon: 'fa-kitchen-set',
    title: 'Modular Kitchen Design',
    desc: 'Functional yet stunning kitchens built around premium materials and ergonomic logic — where every drawer, shelf, and surface earns its place.',
    img: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 2,
    icon: 'fa-paintbrush',
    title: 'Interior Decoration',
    desc: 'Curated décor, furnishings, and layered styling that translate your personality into tangible, beautiful environments.',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 3,
    icon: 'fa-ruler-combined',
    title: 'Space Planning',
    desc: 'Intelligent layouts that unlock the full potential of any footprint — maximising flow, light, and livability.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 4,
    icon: 'fa-hammer',
    title: 'Renovation Services',
    desc: 'End-to-end remodelling handled with precision — on time, on budget, and built to exceed expectations.',
    img: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 5,
    icon: 'fa-couch',
    title: 'Custom Furniture',
    desc: 'Bespoke pieces designed around your space and lifestyle, crafted to dimensions and details that off-the-shelf can never match.',
    img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=85',
  },
  {
    id: 6,
    icon: 'fa-lightbulb',
    title: 'Lighting Design',
    desc: 'Layered ambient, accent, and task lighting that sculpts the mood, flatters the architecture, and makes rooms feel alive after dark.',
    img: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=85',
  },
]

export default function Services() {
  const trackRef = useRef(null)

  const scrollToContact = useCallback(() => {
    const el = document.getElementById('contact')
    if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' })
  }, [])

  const slide = useCallback((dir) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * 420, behavior: 'smooth' })
  }, [])

  return (
    <section id="services" className="services-section">
      <div className="container">

        <Reveal>
          <div className="svc-header">
            <div>
              <span className="eyebrow">Our Capabilities</span>
              <h2 className="section-title">Design Services</h2>
            </div>
            <div className="svc-nav">
              <button className="svc-nav-btn" onClick={() => slide(-1)} aria-label="Previous">
                <i className="fas fa-arrow-left" />
              </button>
              <button className="svc-nav-btn" onClick={() => slide(1)} aria-label="Next">
                <i className="fas fa-arrow-right" />
              </button>
            </div>
          </div>
        </Reveal>

        <div className="svc-track-wrap">
          <div className="svc-track" ref={trackRef}>
            {SERVICES.map(svc => (
              <div key={svc.id} className="svc-card">
                <img src={svc.img} alt={svc.title} loading="lazy" />
                <div className="svc-overlay">
                  <i className={`fas ${svc.icon} svc-icon`} />
                  <div className="svc-body">
                    <h3 className="svc-title">{svc.title}</h3>
                    <p className="svc-desc">{svc.desc}</p>
                    <button className="svc-enquire" onClick={scrollToContact}>
                      Enquire <i className="fas fa-arrow-right" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
