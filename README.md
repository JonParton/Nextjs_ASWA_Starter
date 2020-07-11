This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js/) - your feedback and contributions are welcome!

## JP

## Gotchas encountered

### API Local VS Live

There is a need to setup a .env file to control where the API lives on Development vs live. This is because on live the API will be magically made avialable at /api at the same web address of the main app. On local it will appear at localhost:7071

To solve this I had to add two .env files (``.env.production.local`` and ``.env.development.local``) and commit them to source control. This is because environmental variables for front end frameworks do not seem to be available in static web apps yet. By commiting them to source we make sure it will work even when in a pull request and ensure [build replicability](https://medium.com/@tacomanator/environments-with-create-react-app-7b645312c09d).

### Getting CORS to work locally

By default React will not be able to use Fetch on the Local azure functions as they are on a completely different port (Effectively site). You need to tell the Azure Functions to allow CORS when in development. To do this add the below to ``local.settings.json`` of each api.

```json
  "Host": {
    "LocalHttpPort": 7071,
    "CORS": "*"
  }
```

### Getting Chrome Debugging to work for react

To get React Debugging to work you need to:

- Install Chrome Debug Extension
- Change the Launch File to include:

    ```json
    {
        "type": "chrome",
        "request": "launch",
        "name": "Launch Chrome against localhost",
        "url": "http://localhost:3000",
        "webRoot": "${workspaceFolder}"
    }
    ```

- Make sure you run the API Launch, Then NPM Start (Launch Code), Then attach to chrome.

## Getting Azure Function Runtime installed

Manually install [Chocolatey](https://chocolatey.org/docs/installation) (I used Power Shell), Make sure that you Manually install [Node](https://phoenixnap.com/kb/install-node-js-npm-on-windows) (LTS Version) and allow it to run the extra chocolatey scripts, add Node to your [Path Registry variable](https://stackoverflow.com/questions/30318628/the-term-node-is-not-recognized-in-powershell), then install the azure functions run time with [npm or chocolatey](https://www.npmjs.com/package/azure-functions-core-tools).
