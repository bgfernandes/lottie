import { ApolloServer } from 'apollo-server-micro'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'

export default function createApolloServer() {
  return new ApolloServer({
    typeDefs,
    resolvers
  })
}
