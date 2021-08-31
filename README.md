# lottie
A web application using Next.JS and Apollo Server.

This project uses a [Github Project Board](https://github.com/bgfernandes/lottie/projects/1) for organization.

For simplicity, the GraphQL endpoint is served together with the application, in a more scalable setup it should be separated into it's own service.

## Development setup
1. Install Node (https://nodejs.org/). For this project, I'm using version 14.17.4, as denoted in the *.tool-versions* file. I recommend using a node versioning manager, like ASDF (https://github.com/asdf-vm/asdf) with the NodeJS plugin (https://github.com/asdf-vm/asdf-nodejs). NVM is also very popular (https://github.com/nvm-sh/nvm).
2. Install Yarn package manager: `npm install -g yarn`.
3. Run `yarn install` to install the dependencies.

## Running in Development

To run the app in development mode, run:

```bash
yarn dev
```

The app will be running on [http://localhost:3000](http://localhost:3000).

## Linting and Testing

To lint the app using ESLint, use:
```bash
yarn lint
```

To run tests using Jest, use:
```bash
yarn test
```

## Using the Apollo Studio Explorer

You can explore the schema and run test GraphQL queries using the Apollo Studio Explorer. With the application running on local, visit [this link](https://studio.apollographql.com/sandbox?endpoint=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fgraphql) to use it.
