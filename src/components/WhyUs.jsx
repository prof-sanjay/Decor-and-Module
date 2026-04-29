import Reveal from './Reveal'

const REASONS = [
  { n:'01', title:'Experienced Designers',    desc:'A decade of craft across residential, hospitality, and commercial interiors — every style, every scale.' },
  { n:'02', title:'Tailored to You',          desc:'No stock solutions. Every project starts with listening, and every decision traces back to your brief.' },
  { n:'03', title:'Material Integrity',       desc:'We specify and source only what we would put in our own homes — durable, honest, and worth touching.' },
  { n:'04', title:'Transparent Pricing',      desc:'Detailed quotes upfront. No surprise line items. You know exactly where every rupee goes.' },
  { n:'05', title:'On-Time, Every Time',      desc:'Realistic timelines set at the start, tracked diligently, and delivered without drama at the end.' },
]

export default function WhyUs() {
  return (
    <section id="why-us">
      <div className="container">
        <div className="why-layout">

          <Reveal dir="left" className="why-heading">
            <span className="eyebrow">Our Strengths</span>
            <h2 className="section-title on-dark">Why<br />Choose Us</h2>
            <p>Five reasons our clients come back — and refer their friends.</p>
            <div className="why-deco-num">05</div>
          </Reveal>

          <Reveal dir="right" className="why-list">
            {REASONS.map(r => (
              <div className="why-item" key={r.n}>
                <span className="why-n">{r.n}</span>
                <div>
                  <div className="why-title">{r.title}</div>
                  <div className="why-desc">{r.desc}</div>
                </div>
              </div>
            ))}
          </Reveal>

        </div>
      </div>
    </section>
  )
}
