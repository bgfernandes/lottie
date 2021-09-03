import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import http from 'http'
import { typeDefs } from './type-defs'
import { resolvers } from './resolvers'
import DatabaseSource from './dataSources/database-source'
import { Model } from 'objection'

export default function createApolloServer(httpServer: http.Server ): ApolloServer {
  // This server requires that Objection is already set with a knex instance
  if (!Model.knex()) {
    throw new Error('Initialize a Knex instance and give it to Objection before using createApolloServer.')
  }

  const dataSources = () => ({
    databaseSource: new DatabaseSource()
  })

  return new ApolloServer({
    typeDefs,
    resolvers,
    dataSources,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  })
}
