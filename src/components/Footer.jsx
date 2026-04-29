const NAV     = ['home', 'projects', 'services', 'about', 'contact']
const SVCS    = ['Modular Kitchen', 'Interior Decoration', 'Space Planning', 'Renovation', 'Custom Furniture', 'Lighting Design']

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) window.scrollTo({ top: el.offsetTop - 76, behavior: 'smooth' })
}

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="foot-grid">

          <div>
            <div className="logo-wrap">
              <span className="logo-name">Decor <em>&amp;</em> Modules</span>
              <span className="logo-sub" style={{ display:'block', marginTop:5 }}>Interior Design Studio</span>
            </div>
            <p className="foot-desc">
              A Mumbai-based interior design practice building spaces that are beautiful to look at and honest to live in — since 2014.
            </p>
          </div>

          <div>
            <h4 className="foot-h">Navigation</h4>
            <ul className="foot-links">
              {NAV.map(id => (
                <li key={id}>
                  <a href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="foot-h">Services</h4>
            <ul className="foot-links">
              {SVCS.map(s => (
                <li key={s}>
                  <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services') }}>{s}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="foot-bottom">
          <p className="foot-copy">&copy; 2024 <em>Decor &amp; Modules</em>. All rights reserved.</p>
          <p className="foot-copy">Mumbai, India</p>
        </div>
      </div>
    </footer>
  )
}
