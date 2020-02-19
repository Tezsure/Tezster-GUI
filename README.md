## This project was generated with React.Js & Electron.

Tezster-GUI comes with pretty much the same functionalities as CLI but in its beta version, it comes integrated with the CLI. After starting tezos node on your local machine with Tezster-CLI, you can clone it from here.
To start the app in the dev environment run the following command :

```bash
$ npm run dev
```

This starts the renderer process in hot-module-replacement mode and starts a webpack dev server that sends hot updates to the renderer process.
To create the build package for different OS based environment run :

```bash
$ npm run package
```

This will create a build package in the release folder of the root directory depending upon the OS you're working on. On linux systems it requires an additional dependency of wine package installer to create a build package.
To create build package for other platform run the following command

```bash
$ npm run package-all
```
