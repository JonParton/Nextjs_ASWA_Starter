import SmallCard from "../components/SmallCard";
import { projectIcons } from "../components/Icons";

const Home = () => (
  <div className="home">
    <h1>Splash Screen</h1>
    <div className="card-grid">
      <a className="card-small" href={`/personManuals`}>
        <h3>People Instruction Manuals</h3>
        <p>An example of client side rendered content served up by azure functions. This is how to interact with server side code from a "static" page.</p>
      </a>
      <a className="card-small" href={`/project/projects`}>
        <h3>Projects</h3>
        <p>An example of pre-rendered pages which could be useful for things like blogs or slowly changing data such as tournament results.</p>
      </a>
      <a className="card-small" href={`/about`}>
        <h3>About</h3>
        <p>An example of a completely static page with that is pre rendered and server super fast bu the Azure Static Web App</p>
      </a>
    </div>
  </div>
);

export default Home;
