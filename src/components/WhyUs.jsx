import Reveal from './Reveal'

const REASONS = [
  { n:'01', icon: 'fa-award',          title:'Experienced Designers',  desc:'A decade of craft across residential, hospitality, and commercial interiors — every style, every scale.' },
  { n:'02', icon: 'fa-fingerprint',    title:'Tailored to You',        desc:'No stock solutions. Every project starts with listening, and every decision traces back to your brief.' },
  { n:'03', icon: 'fa-gem',            title:'Material Integrity',     desc:'We specify and source only what we would put in our own homes — durable, honest, and worth touching.' },
  { n:'04', icon: 'fa-receipt',        title:'Transparent Pricing',    desc:'Detailed quotes upfront. No surprise line items. You know exactly where every rupee goes.' },
  { n:'05', icon: 'fa-calendar-check', title:'On-Time, Every Time',    desc:'Realistic timelines set at the start, tracked diligently, and delivered without drama at the end.' },
]

export default function WhyUs() {
  return (
    <section id="why-us">
      <div className="container">

        <Reveal className="why-top">
          <span className="eyebrow">Our Strengths</span>
          <h2 className="section-title">Why Choose Us</h2>
          <p className="why-intro">Five reasons our clients come back — and refer their friends.</p>
        </Reveal>

        <div className="why-grid">
          {REASONS.map((r, i) => (
            <Reveal key={r.n} className="why-card" delay={i * 0.1}>
              <span className="why-card-n">{r.n}</span>
              <div className="why-card-icon">
                <i className={`fas ${r.icon}`} />
              </div>
              <h3 className="why-card-title">{r.title}</h3>
              <p className="why-card-desc">{r.desc}</p>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  )
}
