import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'
import Database from './dataSources/database'

export default function createApolloServer() {
  const dataSources = () => ({
    database: new Database()
  })

  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources
  })
}
