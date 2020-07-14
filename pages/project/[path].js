import fetch from 'isomorphic-unfetch';
import {
  StarIcon,
  WatchIcon,
  BugIcon,
  AzureIcon,
  GithubIcon,
  projectIcons
} from '../../components/Icons';
import { projects } from '../../utils/projectsData';

function Project({ project, path }) {
  const projectData = projects.find(project => project.slug === path);
  const Icon = projectIcons[projectData.id]
  console.log(path);
  return (
    <div className="project">
      <aside>
        <h3>You can deploy...</h3>
        <ul>
          {projects.map((project) => {
            return (
              <li key={project.id}>
                <a href={`/project/${project.slug}`}>{project.name}</a>
              </li>
            );
          })}

          <li>
            <a href="/">Home</a>
          </li>
        </ul>
      </aside>
      <main>
        <div className="card-big">
          <Icon w={249} h={278} />
          <div className="stats">
            <div className="stats-details">
              <div>
                <StarIcon w={18} h={18} />
                <p>{project.stargazers_count}</p>
              </div>
              <p>stars</p>
            </div>
            <div className="stats-details">
              <div>
                <WatchIcon w={18} h={18} />
                <p>{project.watchers_count}</p>
              </div>
              <p>watchers</p>
            </div>
            <div className="stats-details">
              <div>
                <BugIcon w={18} h={18} />
                <p>{project.open_issues}</p>
              </div>
              <p>issues</p>
            </div>
          </div>
          <p className="description">{project.description}</p>
          <div className="cta">
            <a
              className="button-github"
              href={project.html_url}
              target="_blank"
            >
              <GithubIcon w={24} h={24} />
              Learn more...
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps({params}) {

  const projectsData = require("../../utils/projectsData")
  const projectData = projectsData.projects.find(project => project.slug === params.path);
  const ghPath = projectData.path;
  const path = params.path
  
  const res = await fetch(`https://api.github.com/repos/${ghPath}`);
  const project = await res.json();
  return { props: {project, path} };
};

// This function gets called at build time
export async function getStaticPaths() {
  // Get hold of the list of all possible Dynamic Routes we want to render. 
  // This could be a file in code (as below) or an external API (Not one of 
  // this projects Azure Functions)
  const projectsData = require("../../utils/projectsData")

  // Get the paths we want to pre-render the data returned. 
  const paths = projectsData.projects.map((project) => ({params: { path: project.slug}}))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404. 
  // If we had a server we can do progressive pre rendering where new routes are rendered and stored!
  return { paths, fallback: false }
}

export default Project;
