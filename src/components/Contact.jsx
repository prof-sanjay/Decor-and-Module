import { useState } from 'react'
import Reveal from './Reveal'

const DETAILS = [
  { icon: 'phone',          label: 'Phone',  value: '+91 98765 43210' },
  { icon: 'envelope',       label: 'Email',  value: 'hello@decorandmodules.com' },
  { icon: 'map-marker-alt', label: 'Studio', value: '123 Design Street, Mumbai 400 001' },
]

const SOCIALS = [
  { cls: 'wa', icon: 'fab fa-whatsapp',   href: '#',                               title: 'WhatsApp' },
  { cls: 'fb', icon: 'fab fa-facebook-f', href: '#',                               title: 'Facebook' },
  { cls: 'ig', icon: 'fab fa-instagram',  href: '#',                               title: 'Instagram' },
  { cls: 'em', icon: 'fas fa-envelope',   href: 'mailto:hello@decorandmodules.com', title: 'Email' },
]

const INIT = { name: '', phone: '', email: '', message: '' }

export default function Contact() {
  const [form,    setForm]    = useState(INIT)
  const [loading, setLoading] = useState(false)
  const [done,    setDone]    = useState(false)

  const update = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setLoading(false); setDone(true) }, 1400)
  }

  return (
    <section id="contact">
      <div className="container">

        <Reveal>
          <h2 className="contact-headline">
            Ready to build something<br /><em>worth living in?</em>
          </h2>
        </Reveal>

        <div className="contact-grid">

          <Reveal dir="left">
            <p className="ci-sub">
              Tell us about your project and we'll come back to you within 24 hours with a plan for how to move forward together.
            </p>

            {DETAILS.map(d => (
              <div className="c-row" key={d.label}>
                <div className="c-ico"><i className={`fas fa-${d.icon}`} /></div>
                <div className="c-txt">
                  <strong>{d.label}</strong>
                  <span>{d.value}</span>
                </div>
              </div>
            ))}

            <div className="socials">
              {SOCIALS.map(s => (
                <a key={s.cls} href={s.href} className={`s-btn ${s.cls}`} title={s.title}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal dir="right" className="form-box">
            {done ? (
              <div className="form-ok">
                <div className="ok-ico"><i className="fas fa-check" /></div>
                <h3 className="ok-title">Message Received</h3>
                <p className="ok-sub">We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="form-ttl">Send an Enquiry</h3>
                <p className="form-sub">All fields required.</p>
                <form onSubmit={submit}>
                  <div className="form-row">
                    <div className="fg fg-float">
                      <input type="text"  name="name"    value={form.name}    onChange={update} placeholder=" " required />
                      <label>Name</label>
                    </div>
                    <div className="fg fg-float">
                      <input type="tel"   name="phone"   value={form.phone}   onChange={update} placeholder=" " required />
                      <label>Phone</label>
                    </div>
                  </div>
                  <div className="fg fg-float">
                    <input type="email" name="email"   value={form.email}   onChange={update} placeholder=" " required />
                    <label>Email</label>
                  </div>
                  <div className="fg fg-float">
                    <textarea name="message" value={form.message} onChange={update} placeholder=" " required />
                    <label>Project Brief</label>
                  </div>
                  <button type="submit" className="btn btn-clay btn-full" disabled={loading}>
                    {loading
                      ? <><i className="fas fa-spinner fa-spin" /> Sending…</>
                      : <><span>Submit Enquiry</span><i className="fas fa-arrow-right" /></>
                    }
                  </button>
                </form>
              </>
            )}
          </Reveal>

        </div>
      </div>
    </section>
  )
}
