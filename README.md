# Pinia Vuejs Todo App

Pinia is an improvement of Vuex (the state management for VueJS)

There are:

- no mutaions in Pinia, unlike Vuex

It has:

- a modular design
- a built-in TS-Support!
- and hooks into broswers DevTools

---

For every bit of global state you have different pinia stores (which are just javascript modules), and thats makes pinia more "organized", more modular by default than Vuex would be.

In this project ill use pinia for a small todo application, in which all of the state for the tasks are being managed by a pinia store.

When a new task is added, deleted, etc. the store's state is updated using the "action" functions which pinia provides.

I am also persisting these changes to a json file which is storing the initial state of the application.

After installing Vue and Pinia you need to register Pinia as middleware.

Import the package in main.js:

```sh
import { createPinia } from 'pinia'
```

..and invoke this function to get the middleware instance:

```sh
createApp(App).use(createPinia()).mount('#app')
```

---

If you want to take a look at it, don't forget to install the json-server globally:

`npm i -g json-server`

And with:

`json-server -w ./data/db.json`

..you start the JSON-Server (the -w / --watch flag is mandatory)

You could add an additional port flag if the default Port (3000) is already in use:

`json-server -w ./data/db.son --port 3001`

Then you are good to go! Visit the excellent [documentation](https://pinia.vuejs.org/getting-started.html) for further actions!

Have fun! :)

---

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
