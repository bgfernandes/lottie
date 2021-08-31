import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type Query {
    hello: HelloMessage!
  }

  type HelloMessage {
    message: String!
  }
`
