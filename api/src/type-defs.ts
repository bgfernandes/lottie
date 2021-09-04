import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    hello: HelloMessage!

    """
    Query for LottieFiles
    """
    lottieFiles: [LottieFile]!

    """
    Query for a single LottieFile by slug
    """
    lottieFile(slug: String!): LottieFile
  }

  type Mutation {
    """
    Uploads a LottieFile
    """
    uploadLottieFile(file: Upload!): LottieFile!
  }

  type HelloMessage {
    message: String!
  }

  """
  A Lottie File
  """
  type LottieFile {
    id: ID!
    createdAt: String!
    updatedAt: String!
    slug: String!
    url: String!
  }

  scalar Upload
`
