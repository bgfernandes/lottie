import { ApolloServer } from 'apollo-server-micro'
import createApolloServer from '../../apollo/server'
import { HELLO_MESSAGE_QUERY } from '../../pages/index'

let server: ApolloServer

describe('Resolvers', () => {
  beforeEach(() => {
    server = createApolloServer()
  })

  it('runs the home query successfully', async () => {
    const res = await server.executeOperation({ query: HELLO_MESSAGE_QUERY })
    expect(res).toMatchSnapshot()
  })
})
