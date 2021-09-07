import { gql } from 'apollo-server-express'

export const typeDefs = gql`
  type Query {
    hello: HelloMessage!

    """
    Query for LottieFiles
    """
    lottieFiles(
      """
      For pagination, to apply this offset to the list of returned results.
      Send 0 (zero) for the first page.
      """
      offset: Int!

      """
      For pagination, the amount of items to be returned in each fetch.
      Minimum: 1, Maximum: 20.
      """
      limit: Int!

      """
      The type of list to return, availble options:
        - "recent": Returns the most recent lotties. (default)
      """
      type: String
    ): LottieFilesResponse!

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

  type LottieFilesResponse {
    """
    The total number of lotties (to use for calculating number of pages).
    """
    total: Int!

    """
    The list for the requested page of lotties.
    """
    lotties: [LottieFile]!
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
