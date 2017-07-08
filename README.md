# Universal React Starter Kit
> A minimal attempt at making a universal Typescript React Boilerplate.

This is the most basic "universal production ready" boilerplate that I could come up with. It does not currently feature any testing and will never include state management or offline support. This is to make it extremely extensible and doesn't tie anyone into any frameworks but merely serves as a base to extend from.

## Features

### What does it include?
After the opening statement about not including a lot, what does this boilerplate include? Well...

- **Express**: I feel like Express has become the standard server engine, but the code surface area of this project is so small that it could easily be replaced by another engine.
- **Typescript**: All the code in this project is written in Typescript. I found very few minimal boilerplates or examples which beginners could easily get started with without having to understand a lot of other libraries as well.
- **Webpack Server Side Rendering** Webpack-dev-middleware has a feature which I discovered in the process of writing this boilerplate for [server side rendering](https://github.com/webpack/webpack-dev-middleware#server-side-rendering). I've used this to avoid any build step in this project. Simply run the server with `npm run start` or `npm run start:dev`!
- **CSS Modules** This is one of the few personal preferences I imposed on this project in the webpack config (again though, the surface area is so small it could be easily changed.) I am not a fan on CSS-in-JS and thus chose this as a middleground for universal CSS rendering.

### What doesn't it include?
This boilerplate is the most basic setup that I could come up with. Thus is doesn't include:

- **Testing** None of this is tested. However I will probably add a basic [Jest](http://facebook.github.io/jest/) setup soon.
- **State Management** Introducing global statement management adds complications for hydration and tooling. I have avoided all of this in this boilerplate.
- **Hot reloading** Currently there seem to be issues with hot reloading React Router / Typescript, and thus there is no hot reloading in this application. If you have a fix please do submit a PR!

## Installing / Getting started

To get setup with this simply clone the Github repo to your local machine and do an NPM install:

```shell
git clone git@github.com:LukeSheard/typescript-universal-boilerplate-react.git
npm install
npm run start(:dev)
```

This will install all the necessary dependencies to run the application on port 8080 in either production or development mode.

## Licensing

This project is completely open to use under the [MIT license](https://github.com/LukeSheard/typescript-universal-boilerplate-react/blob/master/LICENSE).