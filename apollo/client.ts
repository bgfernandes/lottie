
import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'

let apolloClient: ApolloClient<NormalizedCacheObject>

if (typeof window === 'undefined') {
  // code is running in the server side
  const { SchemaLink } = require('@apollo/client/link/schema')
  const { schema } = require('./schema')

  apolloClient = new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache(),
  })
} else {
  // code is running in the browser
  const { HttpLink } = require('@apollo/client/link/http')

  apolloClient = new ApolloClient({
    ssrMode: false,
    link: new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    }),
    cache: new InMemoryCache(),
  })
}

export default apolloClient
