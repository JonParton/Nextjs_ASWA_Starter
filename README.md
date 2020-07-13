# Next JS Static App on Azure Static Web Apps (ASWA's)

This starter template / example was created based on the [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs). At the time of writing the Microsoft Docs had quite a few issues I wanted to address before I could use and share it to others.

- It never actually gave an example of using Azure Functions as a back end API.
  - From doing this previously I knew there were a few GOTCHA's in here that would get me (and others!) that were trying to get going with this. So I wanted to solve them and put them out in the community.
  - I also wanted to give an example of doing pre rendering using [Static Generation](https://nextjs.org/docs/advanced-features/static-html-export) that ASWA's require you to do (`next export`) while still utilising these API's.
- It used some outdated methods to define the pre-rendering and the more modern exports of `getStaticProps` and `getStaticPaths` are nicer.
- The version of Next.js being used was out of date and didn't allow the use of things like Exposed Environmental Variables on the front end (The `NEXT_PUBLIC` prefix) which is essential to make the API's work in all environments!
- I wanted to fix various other issues like out of date references that would stop us being immediately productive!

With all of those things added this starter should allow you to pick this up and get creating your own Next.js Azure Static Web App in no time! (A few 🔋🔋🔋's included!)

## Notes from the author

I'm only at the start of my React / Next.js journey so I'm sure there are loads of things that could be improved here, especially how I have done some of the react pages! Please raise issues or drop me a note to suggest improvements here - I won't be offended!

## Dependencies

For the instruction below to work you need to have these dependencies installed on your machine:

- [Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) with your [Username and Email set up](https://linuxize.com/post/how-to-configure-git-username-and-email/) (Preferably the same as GitHub!)
- [Node installed](https://nodejs.org/en/download/) using the latest LTS version.
- [Yarn installed](https://classic.yarnpkg.com/en/docs/install/)
- [VS Code Insiders](https://code.visualstudio.com/insiders/) Version (Not required but easiest!)
  - The Insiders version is required for the Azure Static Web Apps Extension to work! I've had 0 issues using the insiders version vs the stable.
  - Install the [Azure Static Web Apps Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)!

## Getting Started

As this is a template / starter it's not meant to be cloned but instead it is best to download the source as a .zip and then push it to a new repository you create on GitHub.

- Create a blank repositry in github, either public or private and copy the git URL given.

- Using a terminal in your projects folder (Powershell, CMD etc) do a git clone:
  - *I find Git plays nicer if you do a clone rather then commiting to a blank repo from the command line. It allows the setup from Github to be downloaded ensureing things like creating new branches and pushing them is painless!*

```git
git clone <[YOUR_REPO_URL_HERE]>
```

- Download a zip of the branch of your choice. To do this hit the down arrow on the green "Code" button top right of the Code Tab.
- Export the folder into the Blank repo we cloned above.
- Push this,newly popualted Repo to GitHub with a suitable git comment such as `Initial Commit of Next.js ASWAs starter`
- Using the [Azure Static Web App Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) login to Azure and GitHub then click to create a new Azure Static Web App.Work through the guided steps making sure you use the following as answers for the specified questions:

| Root Folder   | API Location  | App Artifact Location           |
| ---  | --- | --- |
| `/`           | `api`         | `out`                           |

- Azure will then push a .github folder to your GitHub reposiroty so make sure you do a `git pull`.
- Once this is done you should have a .github folder with the Github Workflow that will automate all of our deployments to Azure 🔥🔥🏃‍♂️🏃‍♂️.
- Replace the README.md file with your own.
- Add a `local.settings.json` to your API folder to fix CORS locally ([**GOTCHA** explained below](#getting-cors-to-work-locally))

Commits to the Main Branch will now publish your project straight to Azure and if you create a feature branch with a Pull Request it will even create a Staging Version for you to test and let you know where it is (Awesome!).

## Starting a Local Development Server

The repo is set up to use Yarn so to start a local development server use

```cmd
yarn install
yarn dev
```

You will also need to start the Azure Function API's if you are using them. If you are using VSCode (Reccomended!) do this by opening the debug pane in VS code and hit play on the attach to Node. You can also do `ctrl-shift-p` and use the `Debug:` commands or just hit `F5`.

## Gotchas to look out for

### API Local VS Live

Make sure that when ever you want to call an azure function API that you work out the URL using the `NEXT_PUBLIC_API` environmental variable. This will ensure it will work when you are developing and when it's published!

an example:

```js
    const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual`;

    setErrorMessage("");

    const res = await fetch(`${apiURL}?name=${name}`).catch((error) => {
      setErrorMessage(
        "We got an error trying to call the get person manual API ... Are the Azure Functions running?"
      );
    });

    // Other code!
```

### Getting CORS to work locally

By default React will not be able to use Fetch on the Local azure functions as they are on a completely different port (Effectively site). You need to tell the Azure Functions to allow CORS when in development. To do this add the below to ``local.settings.json`` of within the api Folder.

`api\local.settings.json`
```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "",
    "FUNCTIONS_WORKER_RUNTIME": "node"
  },
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
}
```

### Dynamic Paths

Next.js has some really nice support for Dynamics Paths where you can put a parameter in a Page Path.

For example a page in the folder `\pages\people\[name].js` can utilise the URL path of `/people/Jon` to then create a page specific to Jon. This is great when using Next.js in server mode but ASWA's arn't quite there yet for Next.js...Because we are running Next.js in Static PreRendering mode Next.js needs to be told what all the possible Pages are for this Dynamic route. In a lot of cases this is not convenient and so you may want to use CLient Side rendering to handle this case instead treating the route like an normal React SPA.

However if you do want to do these dynamic routes and pre render them you need to define the two exports for Static Rendering:

```js
// Page Code ^^

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

  // Get the paths we want to pre-render from the data returned.
  const paths = projectsData.projects.map((project) => ({params: { path: project.slug}}))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // If we had a server we can do progressive pre rendering where new routes are rendered and stored!.. But we can't!
  return { paths, fallback: false }
}

export default Project;

```

Some things to note - You unfortunately can't call out to one of your own API's that are defined as an Azure Function to figure out all the possible routes here. Unfortunately these pre-rendered pages are created at Build Time on Github and I don't belive it spins up the azure functions and it wouldn't have any databases etc you need defined! You can however call to external API's and also read the files in the repo. So for things like Blogs or some CMS Data managed in the Repo you can still do this like the above!
