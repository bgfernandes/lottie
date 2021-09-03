
import express from 'express'
import http from 'http'
import createApolloServer from './apollo-server'
import initializeDb from './config/initializeDb'

export default async function createHttpServer(): Promise<http.Server> {
  const app = express()
  const httpServer = http.createServer(app)

  initializeDb()

  const apolloServer = createApolloServer(httpServer)

  // You must await server.start() before calling server.applyMiddleware. You can add other middleware to app before or after calling applyMiddleware.
  await apolloServer.start()

  apolloServer.applyMiddleware({ app })

  return httpServer
}
