import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const TOTAL = 240
const frameSrc = (n) => `/frames/ezgif-frame-${String(n).padStart(3, '0')}.jpg`

function drawCover(ctx, img, cw, ch) {
  if (!img?.complete || !img.naturalWidth) return
  const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
  const dw = img.naturalWidth * scale
  const dh = img.naturalHeight * scale
  ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)
}

export default function ScrubHero() {
  const outerRef    = useRef(null)
  const canvasRef   = useRef(null)
  const layer1Ref   = useRef(null)
  const layer3Ref   = useRef(null)
  const scrollCueRef = useRef(null)
  const [loadPct, setLoadPct] = useState(0)
  const [ready, setReady]     = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx    = canvas.getContext('2d')
    const images = []
    let loadedCount = 0
    const frameIdx = { v: 0 }

    const setSize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    setSize()

    const redraw = () => drawCover(ctx, images[Math.round(frameIdx.v)], canvas.width, canvas.height)

    const onResize = () => { setSize(); redraw() }
    window.addEventListener('resize', onResize)

    // Preload all frames; render first frame immediately
    for (let i = 1; i <= TOTAL; i++) {
      const img = new Image()
      img.src = frameSrc(i)
      img.onload = () => {
        loadedCount++
        setLoadPct(Math.round((loadedCount / TOTAL) * 100))
        if (i === 1) { setSize(); drawCover(ctx, img, canvas.width, canvas.height) }
        if (loadedCount === TOTAL) setReady(true)
      }
      images.push(img)
    }

    // Master timeline — all durations are normalised (0..1 = full scroll)
    const tl = gsap.timeline({ defaults: { ease: 'none' } })

    // Frame scrub: linear across full scroll
    tl.to(frameIdx, {
      v: TOTAL - 1,
      duration: 1,
      ease: 'none',
      onUpdate() { redraw() },
    }, 0)

    // Scroll-cue fades out in first 6% of scroll
    tl.fromTo(scrollCueRef.current,
      { opacity: 1 },
      { opacity: 0, duration: 0.06, ease: 'none' },
      0
    )

    // Layer 1 — brand headline: visible initially, out at 0.35→0.45
    tl.to(layer1Ref.current, { opacity: 0, y: -24, duration: 0.1, ease: 'power2.in' }, 0.35)

    // Layer 3 — CTA: in 0.90→1.00 (appear only at the very end)
    tl.fromTo(layer3Ref.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.1, ease: 'power2.out' }, 0.90)

    const st = ScrollTrigger.create({
      trigger: outerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.5,
      animation: tl,
    })

    return () => {
      window.removeEventListener('resize', onResize)
      st.kill()
      tl.kill()
    }
  }, [])

  const goContact  = () => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  const goProjects = () => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="home" ref={outerRef} className="relative p-0" style={{ height: '500vh', padding: 0 }}>

      {/* ── Preload overlay ── */}
      <div
        className="fixed inset-0 z-[1000] flex flex-col items-center justify-center gap-5"
        style={{
          background: '#12160E',
          opacity: ready ? 0 : 1,
          pointerEvents: ready ? 'none' : 'all',
          transition: 'opacity 0.9s ease',
        }}
      >
        <span style={{
          fontFamily: 'var(--serif)', fontSize: '1.15rem',
          letterSpacing: '0.28em', color: 'rgba(245,240,229,0.42)',
        }}>
          Loading
        </span>
        <div className="relative overflow-hidden" style={{ width: 220, height: 1, background: 'rgba(255,255,255,0.08)' }}>
          <div style={{
            position: 'absolute', inset: 0, transformOrigin: 'left',
            background: '#C4622D',
            transform: `scaleX(${loadPct / 100})`,
            transition: 'transform 0.18s linear',
          }} />
        </div>
        <span style={{
          fontFamily: 'var(--sans)', fontSize: '0.58rem',
          letterSpacing: '0.18em', color: 'rgba(245,240,229,0.22)',
        }}>
          {loadPct}%
        </span>
      </div>

      {/* ── Sticky canvas shell (CSS pin — no GSAP pin jitter) ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0" />

        {/* Gradient overlays */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 28% 52%, transparent 12%, rgba(18,22,14,0.64) 100%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to bottom, rgba(18,22,14,0.42) 0%, transparent 22%, transparent 62%, rgba(18,22,14,0.74) 100%)',
        }} />

        {/* ── Layer 1 — Brand Headline ── */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 flex flex-col justify-center items-center text-center gap-6"
          style={{ padding: '0 10%', opacity: 1, transform: 'none' }}
        >
          <h1 className="flex flex-col gap-2" style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(3.5rem, 7vw, 7rem)',
            fontWeight: 700, lineHeight: 1,
            color: '#fff',
            textShadow: '0 8px 40px rgba(0,0,0,0.6)',
            letterSpacing: '0.02em',
          }}>
            <span>Where Design</span>
            <span>Becomes Art.</span>
          </h1>
        </div>

        {/* ── Layer 3 — CTA ── */}
        <div
          ref={layer3Ref}
          className="absolute inset-0 flex flex-col justify-end items-center text-center"
          style={{ padding: '0 10% 12%', opacity: 0, transform: 'translateY(30px)' }}
        >
          <span className="flex items-center justify-center gap-4 w-full" style={{
            fontFamily: 'var(--sans)', fontSize: '0.7rem', fontWeight: 600,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--clay)', marginBottom: 28,
          }}>
            <span style={{ display: 'inline-block', width: 40, height: 1, background: 'var(--grad-warm)' }} />
            Ready to Begin?
            <span style={{ display: 'inline-block', width: 40, height: 1, background: 'var(--grad-warm)' }} />
          </span>

          <div className="flex items-center justify-center flex-wrap gap-6">
            <button
              onClick={goContact}
              className="cursor-pointer"
              style={{
                fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '16px 42px',
                background: 'var(--grad-warm)', color: '#fff',
                border: 'none', borderRadius: 4,
                boxShadow: '0 4px 20px rgba(185, 122, 86, 0.2)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(185, 122, 86, 0.35)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(185, 122, 86, 0.2)'; }}
            >
              Enquire Now →
            </button>
            <button
              onClick={goProjects}
              className="cursor-pointer"
              style={{
                fontFamily: 'var(--sans)', fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                padding: '16px 42px',
                background: 'transparent', color: '#fff',
                border: '1px solid rgba(255,255,255,0.2)', borderRadius: 4,
                transition: 'background 0.3s, color 0.3s, border-color 0.3s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#000'; e.currentTarget.style.borderColor = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; }}
            >
              View Work
            </button>
          </div>
        </div>

        {/* ── Scroll cue ── */}
        <div
          ref={scrollCueRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span style={{
            fontFamily: 'var(--sans)', fontSize: '0.57rem',
            letterSpacing: '0.26em', textTransform: 'uppercase',
            color: 'rgba(244,242,236,0.42)',
          }}>
            Scroll
          </span>
          <div style={{ width: 1, height: 58, background: 'rgba(244,242,236,0.14)', position: 'relative', overflow: 'hidden' }}>
            <div style={{
              position: 'absolute', top: '-100%', left: 0, width: '100%', height: '100%',
              background: '#C4622D',
              animation: 'trackRunVertical 2.2s ease-in-out infinite',
            }} />
          </div>
        </div>

      </div>
    </section>
  )
}
