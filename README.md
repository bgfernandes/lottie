# lottie
A web application using Next.JS and Apollo Server.

This project uses a [Github Project Board](https://github.com/bgfernandes/lottie/projects/1) for organization.

## Development setup
This repo contains two applications, and both require Node JS (https://nodejs.org/). For this repo, I'm using version 14.17.4, as denoted in the *.tool-versions* files. I recommend using a node versioning manager, like ASDF (https://github.com/asdf-vm/asdf) with the NodeJS plugin (https://github.com/asdf-vm/asdf-nodejs). NVM is also very popular (https://github.com/nvm-sh/nvm).

The apps in this repo also require the Yarn package manager, that you can install it with `npm install -g yarn`.

Each of the applications also have their own setup steps.

### GraphQL API
In the */api* folder sits the application that hosts the GraphQL API endpoint.

1. Run `yarn install` to install the dependencies.
2. Install and run a local Postgres instance. A `docker-compose.yml` file is provided, run `docker-compose up` to have a DB instance running with no hassle.
3. Copy *.env.local.sample* to *.env.local* and update it as needed.
4. Update *.env.test* file as needed, some of the integration tests need a live DB to run.
5. Initialize the DB and run migrations with `yarn db:setup`.

### Next.JS Front-End
In the */app* folder sits the application that serves the front-end pages using the Next.JS framework.

1. Run `yarn install` to install the dependencies.


## Running in Development

To run the apps in development mode, run, inside both folders */api* and */app*:

```bash
yarn dev
```

The Next.JS app will be running on [http://localhost:3000](http://localhost:3000).
The GraphQL Api will be running on [http://localhost:3001](http://localhost:3001)

## Linting and Testing
Inside the folders of both applications:

To lint the app using ESLint, use:
```bash
yarn lint
```

To run tests using Jest, use:
```bash
yarn test
```

## Using the Apollo Studio Explorer

You can explore the schema and run test GraphQL queries using the Apollo Studio Explorer. With the application running on local, visit [this link](https://studio.apollographql.com/sandbox?endpoint=http%3A%2F%2Flocalhost%3A3001%2Fgraphql) to use it.
