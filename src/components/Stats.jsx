import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'

const STATS = [
  { to: 150, sfx: '+', label: 'Projects Completed', delay: 'd1', desc: 'From cozy apartments to sprawling commercial spaces.' },
  { to: 12,  sfx: '+', label: 'Years of Experience',  delay: 'd2', desc: 'Over a decade of mastering spatial aesthetics.' },
  { to: 120, sfx: '+', label: 'Happy Clients',      delay: 'd3', desc: 'Transforming houses into beloved homes.' },
]

function StatItem({ to, sfx, label, desc, delay, index }) {
  const [count,   setCount]   = useState(0)
  const [visible, setVisible] = useState(false)
  const ref     = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      setVisible(true)
      if (started.current) return
      started.current = true
      const dur = 2400
      const t0  = performance.now()
      const tick = now => {
        const p = Math.min((now - t0) / dur, 1)
        setCount(Math.floor((1 - (1 - p) ** 3) * to))
        if (p < 1) requestAnimationFrame(tick)
        else setCount(to)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return (
    <div ref={ref} className={`stat-card${visible ? ' in' : ''} ${delay} style-${index}`}>
      <div className="stat-num">
        <span>{count}</span>
        <span className="sfx">{sfx}</span>
      </div>
      <div className="stat-lbl">{label}</div>
      <div className="stat-desc">{desc}</div>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          
          <Reveal className="stats-intro" dir="up">
            <span className="eyebrow">By The Numbers</span>
            <h2>Proven Expertise, Measured in Milestones.</h2>
            <p>We don't just design spaces; we build lasting relationships and craft environments that stand the test of time. Our portfolio speaks for itself.</p>
          </Reveal>

          <div className="stats-cards">
            {STATS.map((s, i) => <StatItem key={s.label} {...s} index={i} />)}
          </div>

        </div>
      </div>
    </section>
  )
}
