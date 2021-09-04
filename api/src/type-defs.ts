import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    hello: HelloMessage!

    """
    Query for LottieFiles
    """
    lottieFiles: [LottieFile]
  }

  type Mutation {
    """
    Uploads a LottieFile
    """
    uploadLottieFile(file: Upload!): File!
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
  }

  scalar Upload

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
`
