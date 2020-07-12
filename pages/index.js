import SmallCard from '../components/SmallCard'
import { projectIcons } from '../components/Icons'


const Home = () => (
  <div className="home">
    <h1>Splash Screen</h1>
    <div className="card-grid">
      <a className="card-small" href={`/personManuals`}>
        <h3>People Instruction Manuals</h3>
    </a>
    </div>
  </div>
  )

export default Home
