# Next JS Static App on Azure Static Web Apps (ASWA's)

This starter template / example was created based on the [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs). At the time of writing the Microsoft Docs had quite a few issues I wanted to address before I could use and share it.

- It never actually used any Azure Functions as a back end API.
  - From doing this previously I knew there were a few gotcha's in here that would get me (and others!) trying to get going with this. SO I wanted to solve them and put them out in the community.
  - I also wanted to give an example of doing Client Side rendering using these API's and show how you can make this work with the `next export` that you need to run for ASWA's (I couldn't get Next to work using a Server like you can with Create React App as in `next start` mode it doesn't seem to create an index.html anywhere that ASWA's need to be in the artifact folder at the moment!)
- It used some outdated methods to do pre-rendering and the more modern exports of `getStaticProps` and `getStaticPaths` are nicer.
- The version of next.js being used was out of date and didn't allow the use of things like Exposed Environmental Variables on the front end (The `NEXT_PUBLIC` prefix).
- I wanted to fix various other issues liek out of data references that would stop us being immediately productive!

With all of those things added this starter should allow you to pick this up and get creating your own Next.js Azure Static Web App in no time!

## Notes from the author

I'm only at the start of my React / Next.js journey so I'm sure there are loads of things that could be improved here, especially how I have done some of the react pages! Please raise issues or drop me a note to suggest improvements here - I won't be offended!

## Getting Started

As this is a template / starter it's not meant to be cloned but instead it is best to download the source as a .zip and then initiate your own Git Source control in the folder when it is saved in the location you would like to work with it:

- Download and extract a zip of the main branch. To do this hit the down arrow on the green "Code" button top right of the Code Tab.
- In that folder run:

```bash
git init
git add .
git commit -m "Initial Commit of Next.JS Azure Static Web App"
```

- Push this Repo to GitHub to a project of your choice (Required for steps below!)
- Make sure you have the [Azure Static Web App Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) Installed in VS Code (At time of writing you will need to be using Visual Studio Code Insiders to install this). You will also need a GitHub account and and an active Azure Subscription (There are lots of options to get free credit each month and ASWA's are free at the moment too!)
- In the ASWA Extension, login to Azure and GitHub then click to create a new Azure Static Web App.
Work through the guided steps making sure you use the following as answers for the specified questions:

| Root Folder   | API Location  | App Artifact Location           |
| ---  | --- | --- |
| `/`           | `api`         | `out`                           |

- Once this is done you should have a .github folder with the Github Workflow that will automate all of our deployments to Azure 🔥🔥🏃‍♂️🏃‍♂️.
- Replace the README.md file with yoru own.
- Add a local.settings.json to your API folder to fix CORS locally (GOTCHA explained below)

Commits to the Main Branch will now publish your project straight to Azure and if you create a feature branch with a Pull Request it will even create a Staging Version for you to test and let you know where it is (Awesome!).

## Gotchas to look out for

### API Local VS Live

Make sure that whenever you want to call an azure function API that you work out the URL using the `NEXT_PUBLIC_API` environmental variable. This will ensure it will work when you are developing and when it's published!

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

By default React will not be able to use Fetch on the Local azure functions as they are on a completely different port (Effectively site). You need to tell the Azure Functions to allow CORS when in development. To do this add the below to ``local.settings.json`` of each api.

```json
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
```

### Dynamic Paths

Next.JS has some really nice support for Dynamics Paths where you can put a parameter in a Page Path.

For example a page in the folder `\pages\people\[name].js` can utilise the URL path of `/people/Jon` to then create a page specific to Jon. This is great when using Next.JS in server mode but ASWA's arn't quite there yet for Next.js...Because we are running Next.js in Static PreRendering mode Next.js needs to be told what all the possible Pages are for this Dynamic route. In a lot of cases this is not convenient and so you may want to use CLient Side rendering to handle this case instead treating the route like an normal React SPA.

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

Some things to note - You unfortunately can't call out to one of your own API's that are defined as an Azure Function to figure out all the possible routes here. Unfortunately these pre-rendered pages are created at Build Time on Github and I don't belive it spins up the azure functions and it woul;dn't have any databases etc you need defined! You can however call to external API's and also read the files in the repo. So for things like Blogs or some CMS Dta managed in the Repo you can still do this like the above!

### Getting Azure Function Runtime installed on Windows

Manually install [Chocolatey](https://chocolatey.org/docs/installation) (I used Power Shell), Make sure that you Manually install [Node](https://phoenixnap.com/kb/install-node-js-npm-on-windows) (LTS Version) and allow it to run the extra chocolatey scripts, add Node to your [Path Registry variable](https://stackoverflow.com/questions/30318628/the-term-node-is-not-recognized-in-powershell), then install the azure functions run time with [npm or chocolatey](https://www.npmjs.com/package/azure-functions-core-tools).
