# State Management in this app

This app treats "Global State" as two separate constituents. **Client State** and **Server State**. This is because I subscribe to the idea that [Client State and Server state should be treated differently](https://www.youtube.com/watch?v=seU46c6Jz7E).

## Client State

Client state can be relied on as a true source of truth as it is only ever effected by the user or the client application and is almost always synchronous. There are lots of ways to manage Client State including but not limited to:

- React's inbuilt ideas around component state and [raising state to the lowest common ancestor](https://fjorgedigital.com/insights/blog/the-philosophy-of-react-a-single-source-of-truth/) ...however this can get messy with all the passing of state through components (Especially with Typescript and defining prop types!).
- You can use [Reacts Context API](https://reactjs.org/docs/context.html) but this also has a few limitations and forces you to keep either lots of context routes or one massive object as the context that will cause lots of updates
- You can also use something like [Redux](https://redux.js.org/) or [MobX](https://mobx.js.org/README.html) which if used alongside something like [Thunk](https://github.com/reduxjs/redux-thunk) can even handle server state in one behemoth. However from my limited experience (and it is limited!) these seem pretty boilerplate intensive with their reducers, actions and slicers.

So instead I opted to use the new kid on the block [Recoil.js](https://recoiljs.org/) from Facebook. By placing a `RecoilRoot` around our `_app.tsx` this provides as many `atoms` ⚛⚛ of state as our application could need and only links them into a dependency graph 🕸🕸 when we specifically ask it to using `selectors`.

Some simple examples of `atoms` and a `selector` can be seen in the `atoms.ts` [file](atoms.ts) of this example and are used all over the app but mainly in the [CSR Example page](../pages/CSRExample.tsx).

Recoil.js can also handle [asynchronous data](https://recoiljs.org/docs/guides/asynchronous-data-queries/) as part of its state graph through `selectors`. You may ask why we are not just using this? ⁉ As it stands I think having a dedicated server state manager has some advantages above what is currently available here.

## Server State

Server State is remote from the application (Asynchronous... We'll be kept waiting while it loads and it could even error!), it's likely to be changed by many different actors (Other users, background server tasks, data flows etc etc) and will quickly become out of date. On top of this due to the latency involved it can often be one of the big things that makes our app feel Rapid and responsive 🐇 or slow and sluggish 🐢!

When dealing with Server State we want to do a number of things:

- Cache results so that we don't have to wait to get the same data back again and again.
- Deduplicate requests to the server to stop multiple components all spamming it at the same time.
- Show our best guess at the truth and then let the server go back and confirm this for us in the background and then update the UI
  - This comes in two forms
    - Using Cached data as that's all we have right now and then refreshing it to make sure it's not stale.
    - When editing server state (AKA `Mutating`) where we can take a good guess at what state will look like after user input but want to get the server to confirm this for us (Optimistic Updating!)
      - By the way, if our update fails we want an easy way to "Roll Back" out optimistic state too so we don't get out of sync.
- Refreshing server state if the application has been idle for a while such as when a user has been taking a look at another tab 👀👀.
- Even when the server is not idle we may be dealing with a rapidly changing data source. In these instances we may want to poll it repeatedly to make sure we don't skip a beat.

[React-Query](https://react-query.tanstack.com/docs) allows us to do all of this and more and even better the majority of it is already configuring and working otu of the box. We can then impose higher expectations through very simple configuration like adding polling.

_Note in this example I don't currently have an example of mutating server state and optimistic updating. The React-Query docs has a good [simple example](https://react-query.tanstack.com/docs/guides/optimistic-updates) of this that we can mangle with our Typescript from this example to use in anger!_

## Rest Vs GraphQL and use of React-Query

In this example we are using Rest Requests that are being handled by our Azure Functions; The actual API calling is being done by a really simple interface `isomorphic-fetch` (The isomorphic bit is just so it works server side and client side), however if we were using a Graph QL end point we would use something like [Apollo Client](https://www.apollographql.com/docs/react/) which may have a lot of these features already ... to be investigated how these two may play together!
