import { useState, useEffect } from 'react'
import Reveal from './Reveal'

const ALL = [
  { id:1, cat:'living',  src:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=85', cat_label:'Living Room', name:'Modern Luxe Living' },
  { id:2, cat:'bedroom', src:'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=900&q=85',  cat_label:'Bedroom',     name:'Serene Retreat' },
  { id:3, cat:'kitchen', src:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=900&q=85',  cat_label:'Kitchen',     name:"Chef's Paradise" },
  { id:4, cat:'living',  src:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85',  cat_label:'Living Room', name:'Contemporary Lounge' },
  { id:5, cat:'office',  src:'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=900&q=85', cat_label:'Office',      name:'Executive Workspace' },
  { id:6, cat:'bedroom', src:'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85', cat_label:'Bedroom',    name:'Master Suite Elegance' },
]

const FILTERS = [['all','All'],['living','Living Room'],['kitchen','Kitchen'],['bedroom','Bedroom'],['office','Office']]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const [lbSrc,  setLbSrc]  = useState(null)

  const visible = filter === 'all' ? ALL : ALL.filter(p => p.cat === filter)

  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') setLbSrc(null) }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = lbSrc ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lbSrc])

  return (
    <section id="projects">
      <div className="container">

        <Reveal className="proj-top">
          <div>
            <span className="eyebrow">Portfolio</span>
            <h2 className="section-title">Selected Works</h2>
          </div>
          <div className="filter-row">
            {FILTERS.map(([v, l]) => (
              <button key={v} className={`f-btn${filter === v ? ' on' : ''}`} onClick={() => setFilter(v)}>
                {l}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="proj-grid">
          {visible.map(p => (
            <div
              key={`${p.id}-${filter}`}
              className="proj-card"
              onClick={() => setLbSrc(p.src)}
            >
              <img src={p.src} alt={p.name} loading="lazy" />
              <div className="proj-over">
                <span className="proj-cat">{p.cat_label}</span>
                <h3 className="proj-name">{p.name}</h3>
                <span className="proj-view">Open <i className="fas fa-arrow-right" /></span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {lbSrc && (
        <div className="lb" onClick={e => e.target === e.currentTarget && setLbSrc(null)}>
          <div className="lb-close" onClick={() => setLbSrc(null)}><i className="fas fa-times" /></div>
          <img src={lbSrc} alt="Interior preview" />
        </div>
      )}
    </section>
  )
}
