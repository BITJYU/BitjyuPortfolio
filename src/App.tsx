import ThemeIntro from './components/ThemeIntro'
import ThemeExtras from './components/ThemeExtras'
import Navbar from './components/Navbar'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import { AISection, FrontendSection } from './components/Projects'
import Games from './components/Games'
import Contact from './components/Contact'
import Footer from './components/Footer'
import MouseSpotlight from './components/MouseSpotlight'
import ScrollReveal from './components/ScrollReveal'

function App() {
  return (
    <>
      <ThemeIntro />
      <ThemeExtras />
      <MouseSpotlight />
      <ScrollReveal />
      <Navbar />
      <main>
        <About />
        <Skills />
        <Experience />
        <AISection />
        <FrontendSection />
        <Games />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
