# React Universal Typescript Boilerplate

This is a minimal boilerplate for a universal application written in [Typescript](http://typescriptlang.org) using React and React-Router and CSS-Modules for styling. It's built using webpack 2 and [universal-webpack](https://github.com/halt-hammerzeit/universal-webpack). This boilerplate includes a basic setup for Redux to store application state, but could easily be removed or swapper out for Mobx. 

## Development
After cloning this repository run `npm install` to install all the dependecies. Run `npm start:dev` to get started. You may find that you need to restart `nodemon` by calling `rs` in the terminal to load the latest webpack client bundle. Otherwise this bundle should hot reload and the server restart automatically. 

### Building
The command `npm run build` will build the application into `dist`. This will not bundle external dependencies required by the server. These should be added to `config/index.ts` in the `universalWebpack.external_dependencies` field. 


### Testing 
This boilerplate contains [tslint](https://palantir.github.io/tslint/) and [jest](https://facebook.github.io/jest/) as testing utilities, and a `travis.yml` to get started. 

## Contributing
I'm always open to pull requests, if you think there is something wrong or could be improved with this repo let me know. 
