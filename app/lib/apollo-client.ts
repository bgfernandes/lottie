import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import { useMemo } from 'react'

let apolloClient: ApolloClient<NormalizedCacheObject>

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // set to true for SSR
    link: createUploadLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_SERVER_URL }),
    cache: new InMemoryCache(),
  })
}

/*
  Initializes the apollo client with an existing cache if able
  Copied over from https://www.apollographql.com/blog/apollo-client/next-js/building-a-next-js-app-with-slash-graphql/

  Saw in more than one place saying that you are not supposed to re-use an apollo client between multiple SSR requests.
  Makes sense, the data being cached may be current-logged-in-user related, could result in security issues.

  As for the CSR apollo client cache being "hydrated" with the SSR cache, depends on the particular situation if it
  would be a performance improvement. I guess it would be useful for situations like a front-end paginated list, where
  the client may go back to the first page that was loaded via server side.
*/
export function initializeApollo(
  initialState: NormalizedCacheObject | null = null
) {
  const _apolloClient = apolloClient ?? createApolloClient()

  // If your page has Next.js data fetching methods that use Apollo Client,
  // the initial state gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Restore the cache using the data passed from
    // getStaticProps/getServerSideProps combined with the existing cached data
    _apolloClient.cache.restore({
      ...existingCache,
      ...(initialState as object),
    })
  }

  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient

  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(initialState: NormalizedCacheObject | undefined) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}
