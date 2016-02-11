> Note: Rook is still in a beta state.

## Rook Starter

This repository provides the easiest way to get started with [Rook](https://github.com/apazzolini/rook). Simply

- `git clone git@github.com:apazzolini/rook-starter.git`
- `cd rook-starter`
- `npm install`
- `npm run dev`

and you'll be up and running with a base Rook application. In the following section we'll discuss patterns you can use to get started right away. For more detailed information, check out the Rook documentation.

This guide assumes a basic understanding of Redux and React.

## Developing an app in Rook

### Useful commands

- `npm run dev` launches the Hapi server and a webpack dev server for hot reload support
- `npm run build` bundles your app for production
- `npm run start` starts the Hapi server in production mode
- `npm run lint` lints your code for you
- `npm run test` runs all files that end in `.test.js` through mocha

### API server

#### Routes

Your API routes are defined in `src/api/routes` directory. Each file in this directory should export a `routes` Array, of which each object conforms to:

```js
{
  path: <String path from the root>, 
  method: <HTTP request method>
  handler: <Function that handles your route>,
  auth: <Optional. Forwarded to Hapi under config.auth>,
  query: <Optional. Joi validation forwarded under config.validate.query>,
  params: <Optional. Joi validation forwarded under config.validate.params>,
  payload: <Optional. Joi validation forwarded under config.validate.payload>,
  config: <Optional. Forwarded under config. Overwrites above shortcuts>
}
```

For an example, take a look at `src/api/routes/random.js`.

#### Hapi Extensions

Additionally, Rook will look at every file in `src/extensions` and call each file's default export with two parameters, the Hapi server object and the combined Rook configuration object. This allows you to configure Hapi for your needs, such as adding authentication. Look at `src/api/extensions/auth.js` for a template.

#### Testing

Hapi is incredibly easy to test as it comes with a server.inject() method that allows you to simulate a network request. `src/api/__tests__/random.test.js` shows the minimal configuration necessary for testing your routes.

### The Redux store

#### Overview

Your application state in Rook is managed by Redux, with each reducer module managed by Immutable.js. In `src/redux/modules/index.js`, you specify your reducer modules. In this example, the only reducer module is the random module. Rook provides a couple things by default, so your combined reducers would look like:

```js
{
  apiLoading: {
    loading: <boolean>,
    loadError: {
      msg: <string>,
      stack: <string>
    }
  },

  routing: <the struture from react-router-redux>,

  random: <the structure from src/redux/modules/random
}
```

#### Your reducers

Each of your reducer modules **must** do two things:

- Export an `initialState` object, even if it's just `{}`
- Export a `reducers` object, such that each key is a string name of your reducer and each value is a function that takes in the previousState and an action and returns a new state.

Although you provide your `initialState` as a plain JS object, Rook will convert this to an Immutable.js structure during initialization. Therefore, your reducer functions will receive state as an Immutable.js object. Typically, you will use [the functions described here](https://facebook.github.io/immutable-js/docs/#/Map) to perform your business logic.

You're on your own for what else your reducer modules export, but we suggest an `actions` object (for creating actions) and a `selectors` object (for viewing parts of the state tree).

#### Data fetching

Rook provides custom Redux middleware that handles API calls, both server and client side. This happens when your actions have an `apiRequest` property in them. This property should be a function that receives an ApiClient object and returns a promise. For example:

```js
apiRequest: (api) => api.get(`/random`)
```

You can perform the typical http methods on this object. By the way, Rook will forward along your client cookies server-side in case your API routes need authentication, etc.

#### Dynamic initial state

You may need to control the initial state of your Redux store based on properties unique to each request. For example, if you determine that a user is authenticated server-side, you might want to populate this data in your Redux store.

`src/redux/modules/index.js` may provide an export named `updateInitialServerState`, which is a function that receives two parameters, `request` and `initialState`. You may inspect the `request` parameter (the Hapi request) and modify the `initialState` object as appropriate.

#### Testing

Testing Redux reducers is very easy, since they just take an initial state and action and return a new state. There is a little bit of plumbing that needs to happen in your tests, but an example of this is provided in `src/redux/__tests__/random.test.js`

### Your React views and tying everything together

Rook is pretty hands-off when it comes to your actual React app aside from providing a basic skeleton for your project and handling react-router data fetching. The `src/views/` directory shows an example of how you may choose to structure your project.

Data fetching is handled by providing a `static fetchData` method in any component that needs data from the server. When transitioning to a page that has a component with such a method, Rook waits until the data loads to allow navigation. As your Redux state will build up as users navigate your app, you have the opportunity to leverage pre-downloaded state. For example,

```js
static fetchData(getState, dispatch, location, params) {
  if (!Random.selectors.currentNumber(getState())) {
    return dispatch(Random.actions.loadNewRandom());
  }
}
```

The key here is to only dispatch the Redux action if the data you need for the given page for the given component is not loaded. `fetchData` should return a Promise (which is returned from dispatch for you). Rook will prevent react-router from navigating to the destination page until that Promise is resolved.

### Static content

This one's easy - anything under `static/` will be served straight up, with precendence over your React routes.

### Configuration

There are three configuration patterns in a Rook app.

1. Client configuration (`config/client.js`). These are variables that are passed to the client app, such as the path to the API server. You shouldn't store any type of keys here, as the JS file will be sent to the client. 

1. Server configuration (`config/server/*)`. These files are loaded through the excellent [config](https://www.npmjs.com/package/config) package in NPM. View their docs for more info.

1. Rook configuration (`config/rook.js`). This allows you to customize certain aspects of how Rook wires your app together.
