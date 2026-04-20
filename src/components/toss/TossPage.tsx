import './TossPage.css'
import TossNavbar from './TossNavbar'
import TossHero from './TossHero'
import TossAbout from './TossAbout'
import TossSkills from './TossSkills'
import TossExperience from './TossExperience'
import TossProjects from './TossProjects'
import TossGames from './TossGames'
import TossContact from './TossContact'
import TossFooter from './TossFooter'

function TossPage() {
  return (
    <div className="toss-page">
      <TossNavbar />
      <main>
        <TossHero />
        <TossAbout />
        <TossSkills />
        <TossExperience />
        <TossProjects />
        <TossGames />
        <TossContact />
      </main>
      <TossFooter />
    </div>
  )
}

export default TossPage
