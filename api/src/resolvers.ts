import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { nanoid } from 'nanoid'
import { extension } from 'mime-types'
import DatabaseSource from './dataSources/database-source'
import LottieFile from './models/LottieFile'
import localUploader from './util/file-uploaders/localUploader'

type Context = {
  dataSources: {
    databaseSource: DatabaseSource
  }
}

type UploadLottieFileArgs = {
  file: Promise<FileUpload>
}

export const resolvers = {
  Query: {
    hello: (): { message: string } => ({ message: 'Hello from Apollo.' }),

    lottieFiles: (
      _parent: undefined,
      _args: Record<string, never>,
      { dataSources }: Context
    ): Promise<LottieFile[]> =>
      dataSources.databaseSource.getLottieFiles(),

    lottieFile: (
      _parent: undefined,
      { slug }: { slug: string },
      { dataSources }: Context
    ): Promise<LottieFile | null> =>
      dataSources.databaseSource.getLottieFile({ slug })
  },

  Mutation: {
    uploadLottieFile: async (
      _parent: undefined,
      { file } : UploadLottieFileArgs,
      { dataSources }: Context
    ) : Promise<LottieFile> => {
      const { createReadStream, mimetype } = await file

      const slug = nanoid()
      const newFileName = slug + '.' + extension(mimetype)

      const { url } = await localUploader(newFileName, createReadStream())

      return await dataSources.databaseSource.createLottieFile({ slug, url })
    },
  },

  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload
}
