import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'
import DatabaseSource from './dataSources/database-source'

export default function createApolloServer() {
  const dataSources = () => ({
    databaseSource: new DatabaseSource()
  })

  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  })
}
