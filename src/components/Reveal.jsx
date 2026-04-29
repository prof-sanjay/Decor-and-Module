import { useEffect, useRef, useState } from 'react'

const dirClass = { up: 'reveal', left: 'rev-l', right: 'rev-r' }

export default function Reveal({ children, dir = 'up', delay = 0, className = '', tag: Tag = 'div' }) {
  const ref = useRef(null)
  const [vis, setVis] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect() } },
      { threshold: 0.14 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      className={`${dirClass[dir]}${vis ? ' in' : ''} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </Tag>
  )
}
