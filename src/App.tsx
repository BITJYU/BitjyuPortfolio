import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
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

const TossPage = lazy(() => import('./components/toss/TossPage'))

function MainPortfolio() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', color: '#3182F6', fontFamily: 'Pretendard, sans-serif', fontSize: '1.1rem' }}>Loading...</div>}>
              <TossPage />
            </Suspense>
          }
        />
        <Route path="/classic" element={<MainPortfolio />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
