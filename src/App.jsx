import Navbar        from './components/Navbar'
import Hero          from './components/Hero'
import Stats         from './components/Stats'
import Projects      from './components/Projects'
import Services      from './components/Services'
import About         from './components/About'
import WhyUs         from './components/WhyUs'
import Contact       from './components/Contact'
import Footer        from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Services />
        <About />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
