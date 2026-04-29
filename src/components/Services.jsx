import Reveal from './Reveal'

const SERVICES = [
  { id:1, num:'01', title:'Modular Kitchen Design',  desc:'Functional yet stunning kitchens built around premium materials and ergonomic logic — where every drawer, shelf, and surface earns its place.', gridClass: 'span-2-2 dark-sage' },
  { id:2, num:'02', title:'Interior Decoration',     desc:'Curated décor, furnishings, and layered styling that translate your personality into tangible, beautiful environments.', gridClass: 'span-1-2 clay-bg' },
  { id:3, num:'03', title:'Space Planning',           desc:'Intelligent layouts that unlock the full potential of any footprint — maximising flow.', gridClass: 'span-1-1 linen-bg' },
  { id:4, num:'04', title:'Renovation Services',     desc:'End-to-end remodelling handled with precision.', gridClass: 'span-1-1 dark-ink' },
  { id:5, num:'05', title:'Custom Furniture',         desc:'Bespoke pieces designed around your space and lifestyle, crafted to dimensions and details that off-the-shelf can never match.', gridClass: 'span-2-1 white-bg' },
  { id:6, num:'06', title:'Lighting Design',          desc:'Layered ambient, accent, and task lighting that sculpts the mood, flatters the architecture, and makes rooms feel alive after dark.', gridClass: 'span-2-1 smoke-bg' },
]

function scrollToContact() {
  const el = document.getElementById('contact')
  if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' })
}

export default function Services() {
  return (
    <section id="services" className="services-bento-section">
      <div className="container">
        
        <Reveal className="bento-intro" dir="up">
          <div className="bento-intro-header">
            <div>
              <span className="eyebrow">Our Capabilities</span>
              <h2 className="section-title">Design Services</h2>
            </div>
            <p>We approach every project as a unique canvas. From structural renovations to the finest decorative details, we offer comprehensive services tailored to your specific needs.</p>
          </div>
        </Reveal>

        <Reveal className="bento-grid">
          {SERVICES.map(svc => (
            <div key={svc.id} className={`bento-item ${svc.gridClass}`}>
              <div className="bento-num">{svc.num}</div>
              <div className="bento-content">
                <h3 className="bento-title">{svc.title}</h3>
                <p className="bento-desc">{svc.desc}</p>
              </div>
              <button className="bento-btn" onClick={scrollToContact} aria-label="Enquire about this service">
                <i className="fas fa-arrow-right" />
              </button>
            </div>
          ))}
        </Reveal>

      </div>
    </section>
  )
}
