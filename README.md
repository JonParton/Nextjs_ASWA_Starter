# Next JS Static App on Azure Static Web Apps (ASWA's)

## The Example App

This Repository is connected to the Example App at the following URL (CI/CD!).

[https://NextjsASWAExample.co.uk/](https://NextjsASWAExample.co.uk/)

Take a look around or read on to see what this starter is all about and how to get cooking 👩‍🍳🔥🍳.

## It's reason for being

This starter template / example was created based on the following [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/static-web-apps/deploy-nextjs). At the time of writing the Microsoft Docs had a few issues I wanted to address before sharing it to others.

- It doesn't give an example of using Azure Functions as a back end API.
  - From doing this previously I knew there were a few **GOTCHA's** in getting these set up. So I wanted to solve them and put that knowledge into this starter.
  - I also wanted to give an example of how to use these API's on pre rendered pages using [Static Generation](https://nextjs.org/docs/advanced-features/static-html-export) that ASWA's require you to do (`next export`).
- It used some outdated methods to define the pre rendering to be done and the more modern exports of `getStaticProps` and `getStaticPaths` are nicer.
- The version of Next.js being used was out of date and didn't allow the use of things like Exposed Environmental Variables on the front end (The `NEXT_PUBLIC` prefix) which is essential to make the API's work in all environments!
- I wanted to fix various other issues like out of date references that would stop us being immediately productive!

I then got a bit carried away, partly for my learning/curiosity, and added in other extras that should help you be more productive! ... Although it has made this starter much more opinionated! 📣🤷‍♂️

- I wanted to switch the code across to use Typescript so we could make use of the better static error catching! (Strict mode not currently enabled...I'm building up to it! 😨)
- I added [Material UI](https://material-ui.com/) to style the Example Web Page and [fixed a few issues](#Material-UI-Hot-Reloading-when-using-makeStyles) related to using MUI with Next.js. If you use this as a starter for your own project I strongly suggest taking a good look at the ease of use, aesthetics and practicality of Material UI!
- I added 2 state handlers for the application; I subscribe to the idea that [Application state and Server state should be treated differently](https://www.youtube.com/watch?v=seU46c6Jz7E). New kid on the block [Recoil.js](https://recoiljs.org/) is used for Application State (IE synchronous state solely dictated by the user / application!) and [React-Query](https://react-query.tanstack.com/docs) is utilised to manage the interface with our remote Server State (IE state related to data that is almost always asynchronous and that we don't solely control! (other users, background tasks etc)). These two can then work nicely together to keep our application in sync while avoiding reams of boiler plate code (👍👌). More details on this and my thinking behind it can be found in the [readme in the state folder](/state/README.md) 📁 as well as being seen in action on the CSR page of the Example App.
- Added an easy way to set the page title from anywhere in the code flow of your application (In a component, in an if flow, on a page etc) See `currentPageTitleState`
- Set up VS code to debug and made the various `package.json` scripts play nice with each other.
- I also added and configured some opinionated use of ESLint and Prettier to make cleaning up our code mess easier.
- As a last addition I have also added a set of recommended VSCode extensions. Feel free to follow (🐏🐑) or ignore!

With all of those things added this starter should allow you to get started with your own Next.js Azure Static Web App in no time! (Just a few 🔋🔋🔋's included!)

## Notes from the author

I'm only at the start of my React / Next.js journey so I'm sure there are loads of things that could be improved here, especially how I have done some of the react pages! Please raise issues, a pull request or drop me a note to suggest improvements here - I won't be offended!

If you do contribute to this repository be sure to add your "Manual" / "Profile" to the CSR Example. The avatars are Bitmoji's and the data is stored in a JSON file in the API folder. Submit as part of your PR!

## A few notes on Azure Static Web Apps

Azure Static Web Apps are Microsoft's new service to host Static Web applications with the minimal of fuss (Automagical CI/CD, SSL Certificate by default, zero effort hosting). It works with a plethora of frameworks (As displayed in the [Dynamic Route Prerendering](https://NextjsASWAExample.co.uk/DeployableFramework/PreRenderedDynamicRoutesExample) section of the Example App!) but as it is still in preview there are a few limitations to bear in mind.

- Currently you can only register a top level custom domain to work with them, not sub domains.
  - Also you can only one of register `xxx.co.blah` or `www.xxx.co.blah`
- There is an element of limited authentication that can be switched on for defined routes in the azure portal but at the moment this is limited to only 25 users. This will sorely limit it's use to be predominantly for open facing web sites. Probably by design while in preview!

## Dependencies

For the instruction below to work you need to have these dependencies installed on your machine:

- [Git installed](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) with your [Username and Email set up](https://linuxize.com/post/how-to-configure-git-username-and-email/) (Preferably the same as GitHub!)
- [Node installed](https://nodejs.org/en/download/) using the latest LTS version.
- [Yarn installed](https://classic.yarnpkg.com/en/docs/install/)
- [VS Code Insiders](https://code.visualstudio.com/insiders/) Version (Not required but easiest!)
  - The Insiders version is required for the Azure Static Web Apps Extension to work! I've had 0 issues using the insiders vs the stable version.
  - Install the [Azure Static Web Apps Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps)!

## Getting Started

As this is a template / starter it's not meant to be cloned but instead it is best to download the latest release .zip and then push it to a new repository you create on GitHub.

- Create a blank repository in github, either public or private and copy the git URL given.

- Using a terminal in your projects folder (Powershell, CMD etc) do a git clone:
  - _I find Git plays nicer if you do a clone rather then committing to a blank repo from the command line. It allows the setup from Github to be downloaded ensuring things like creating new branches and pushing them is painless!_

```git
git clone YOUR_REPO_URL_HERE
```

- Download a release zip of the branch of your choice. To do this on the Code Tab select the branch you want to download then find the latest release on the right hand side.
- Export the folder into the Blank repo we cloned above.
- Push this,newly populated Repo to GitHub with a suitable git comment such as `Initial Commit of Next.js ASWAs starter`
- Using the [Azure Static Web App Extension](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-azurestaticwebapps) login to Azure and GitHub then click to create a new Azure Static Web App.Work through the guided steps making sure you use the following as answers for the specified questions:

| Root Folder | API Location | App Artifact Location |
| ----------- | ------------ | --------------------- |
| `/`         | `api`        | `out`                 |

- Azure will then push a .github folder to your GitHub repository so make sure you do a `git pull`.
- Once this is done you should have a .github folder with the Github Workflow that will automate all of our deployments to Azure 🔥🔥🏃‍♂️🏃‍♂️.
- Replace the README.md file with your own.
- Check you have the `local.settings.json` file in your API folder to fix CORS locally ([**GOTCHA** explained below](#getting-cors-to-work-locally)). All being well (🤞) if you downloaded this from the Release section this will already be included, However it is listed in the gitignore so just double check.

Commits to the Main Branch will now publish your project straight to Azure and if you create a feature branch with a Pull Request it will even create a Staging Version for you to test and let you know where it is (Awesome!).

## Starting a Local Development Server

The repo is set up to use Yarn so to start a local development server use

```cmd
yarn install
yarn dev
```

You will also need to start the Azure Function API's if you are using them. If you are using VSCode (Recommended!) do this by opening the debug pane in VS code and hit play on the attach to Node. You can also do `ctrl-shift-p` and use the `Debug:` commands or just hit `F5`.

Note for convenience I have included configurations to launch:

1. Azure Functions and Debug them
2. Launch Server Side Next.js Debugging
3. Launch Client Side Next.js Debugging

For a full debugging experience with debuggers listening on the correct ports you will want to run `yarn dev` then each debug config in order! 🔍🐛🏏

## Gotchas to look out for

### API Local VS Live

Make sure that when ever you want to call an azure function API that you work out the URL using the `NEXT_PUBLIC_API` environmental variable. This will ensure it will work when you are developing and when it's published!

an example:

```js
const apiURL = `${process.env.NEXT_PUBLIC_API}/PersonManual`

setErrorMessage('')

const res = await fetch(`${apiURL}?name=${name}`).catch((error) => {
  setErrorMessage(
    'We got an error trying to call the get person manual API ... Are the Azure Functions running?',
  )
})

// Other code!
```

### Getting CORS to work locally

By default React will not be able to use Fetch on the Local azure functions as they are on a completely different port (Effectively site). You need to tell the Azure Functions to allow CORS when in development. To do this add the below to `local.settings.json` of within the api Folder.

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

For example a page in the folder `\pages\people\[name].js` can utilise the URL path of `/people/Jon` to then create a page specific to Jon. This is great when using Next.js in server mode but ASWA's aren't set up to do this (They expect static files!). To do this we are running Next.js in static pre rendering mode (`next export`) so it needs be told what all the possible Pages are for this Dynamic route so it can create them at build time. In a lot of cases this is not convenient and so you may want to use Client Side rendering to handle this by treating the route like a normal React SPA.

However if you do want to do these dynamic routes and pre render them you need to define the two exports for Static Rendering:

```js
// Page Code ^^

export async function getStaticProps({ params }) {
  const projectsData = require('../../utils/projectsData')
  const projectData = projectsData.projects.find(
    (project) => project.slug === params.path,
  )
  const ghPath = projectData.path
  const path = params.path

  const res = await fetch(`https://api.github.com/repos/${ghPath}`)
  const project = await res.json()
  return { props: { project, path } }
}

// This function gets called at build time
export async function getStaticPaths() {
  // Get hold of the list of all possible Dynamic Routes we want to render.
  // This could be a file in code (as below) or an external API (Not one of
  // this projects Azure Functions)
  const projectsData = require('../../utils/projectsData')

  // Get the paths we want to pre-render from the data returned.
  const paths = projectsData.projects.map((project) => ({
    params: { path: project.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  // If we had a server we can do progressive pre rendering where new routes are rendered and stored!.. But we can't!
  return { paths, fallback: false }
}

export default Project
```

One thing to note with this is that, unfortunately, you can't call out to an API you have defined as an Azure Function in this project within these methods. These pre-rendered pages are created at Build Time on Github and I don't believe it spins up the azure functions during this build and besides they may not be set up in the pipeline environment with things like databases you have defined! You can however call to external API's and also read the files in the repo. So for things like Blogs or some data you are managing in the Repo you can still do this like the above!

## Some Other Gotchas Solved by using this starter (IE don't worry about them!)

<details>
  <summary>Click to expand!</summary>

### Material UI Hot Reloading when using makeStyles

I was finding that if you use `makeStyles` the standard way of extending the styling MUI components hot reload during development was causing the page to loose all the styles applied.

This is caused by a conflict between the original styles generated on the Server side and then styles that get updated during hot reload on the client side (CSR). To solve this you need to add some extra code to the `_app.tsx` file and the `_document.tsx file`.

```tsx
// pages/_app.tsx

//inside the default MyApp component

React.useEffect(() => {
  // Remove the server-side injected CSS.
  const jssStyles = document.querySelector('#jss-server-side')
  if (jssStyles) {
    jssStyles.parentElement.removeChild(jssStyles)
  }
}, [])
```

```tsx
// pages/_document.tsx

// As part of the _document module
// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}
```

Thank you to [this post](https://stackoverflow.com/questions/50685175/react-material-ui-warning-prop-classname-did-not-match) for putting me on to the answer of this one!

</details>
