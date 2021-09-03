import DatabaseSource from './dataSources/database-source'
import LottieFile from './models/LottieFile'

type Context = {
  dataSources: {
    databaseSource: DatabaseSource
  }
}

export const resolvers = {
  Query: {
    hello: (): { message: string } => ({ message: 'Hello from Apollo.' }),

    lottieFiles: (
      _parent: undefined,
      _args: Record<string, never>,
      { dataSources }: Context
    ): Promise<LottieFile[]> =>
      dataSources.databaseSource.getLottieFiles()
  }
}
