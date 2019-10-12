# Tempest Vue Client

This is the front end client for what will eventually become Tempest, a web-based email client.

The front end for this project is written in Vue, a wonderful and beautiful framework for developing applications. All state is managed using Vuex, non-component scripting is all written in TypeScript, and this project utilizes the Buefy SCSS framework, which is Bulma written for Vue.

This Vue Client will be updated in conjunction with the Rocket API server.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites


```
NodeJs
NPM
```

### Running

To run the web server on localhost, you will need to run from the root directory: 

```
npm install
```

#### Compiles and hot-reloads for development
```
npm run serve
```

#### Compiles and minifies for production
```
npm run build
```

## Code Style

All Typescript is formatted to the linting rules found in ~/tslint. The linting rules are quite standard, with the exception of variable shadowing, which I have disabled as I disagree with the practice of not allowing it.

### Lints and fixes files
```
npm run lint
```

## Authors

* **Ryan Christian** - *Entire Project* - [Ryan Christian](https://github.com/RyanChristian4427)
