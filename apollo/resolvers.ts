import DatabaseSource from './dataSources/database-source'

type Context = {
  dataSources: {
    databaseSource: DatabaseSource
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
      dataSources.databaseSource.getLottieFiles()
  }
}
