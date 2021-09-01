import Database from './dataSources/database'

type Context = {
  dataSources: {
    database: Database
  }
}

export const resolvers = {
  Query: {
    hello: () => ({ message: 'Hello from Apollo.' }),

    lottieFiles: (
      _parent: undefined,
      _args: {},
      { dataSources }: Context
    ) =>
      dataSources.database.getLottieFiles()
  }
}
