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
      dataSources.databaseSource.getLottieFiles()
  },

  Mutation: {
    uploadLottieFile: async (
      _parent: undefined,
      { file } : UploadLottieFileArgs
    ) : Promise<{ filename: string, mimetype: string, encoding: string }> => {
      const { createReadStream, filename, mimetype, encoding } = await file

      const newFileName = nanoid() + '.' + extension(mimetype)

      const { url } = await localUploader(newFileName, createReadStream())
      console.log(url) // TODO save in the DB

      return { filename, mimetype, encoding }
    },
  },

  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload
}
