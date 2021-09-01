import type { NextApiRequest, NextApiResponse } from 'next'
import { Model } from 'objection'
import createApolloServer from '../../apollo/server'
import createKnexInstance from '../../db/knexInstance'

// Configure Objection and start up the Database
Model.knex(createKnexInstance())

const apolloServer = createApolloServer()

const startServer = apolloServer.start()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Origin',
    'https://studio.apollographql.com'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: false,
  },
}
