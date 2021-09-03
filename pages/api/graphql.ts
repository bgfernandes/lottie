import type { NextApiRequest, NextApiResponse } from 'next'
import { Model } from 'objection'
import { GraphQLOperation, processRequest } from 'graphql-upload'
import createApolloServer from '../../apollo/server'
import createKnexInstance from '../../db/knexInstance'

// Configure Objection and start up the Database
Model.knex(createKnexInstance())

const apolloServer = createApolloServer()

const startServer = apolloServer.start()

interface Request extends NextApiRequest {
  filePayload: GraphQLOperation | GraphQLOperation[]
}

export default async function handler(req: Request, res: NextApiResponse) {
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

  const contentType = req.headers['content-type']
  if (contentType && contentType.startsWith('multipart/form-data')) {
    console.log('IS MULTIPART!!!')
    req.filePayload = await processRequest(req, res)
    console.log('FILE IS HERE')
    console.log(req.filePayload)
  }

  await startServer
  await apolloServer.createHandler({
    path: '/api/graphql',
  })(req, res)
}

export const config = {
  api: {
    bodyParser: true,
  },
}
