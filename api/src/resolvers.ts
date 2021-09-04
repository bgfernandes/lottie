import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { finished } from 'stream/promises'
import fs from 'fs'
import DatabaseSource from './dataSources/database-source'
import LottieFile from './models/LottieFile'

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

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream()

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = fs.createWriteStream('local-file-output.txt')
      stream.pipe(out)
      await finished(out)

      return { filename, mimetype, encoding }
    },
  },

  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload
}
