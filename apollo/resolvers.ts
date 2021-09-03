import { FileUpload, GraphQLUpload } from 'graphql-upload'
import { finished } from 'stream/promises'
import DatabaseSource from './dataSources/database-source'

type Context = {
  dataSources: {
    databaseSource: DatabaseSource
  }
}

type UploadLottieFileArgs = {
  file: FileUpload
}

export const resolvers = {
  Query: {
    hello: () => ({ message: 'Hello from Apollo.' }),

    lottieFiles: (
      _parent: undefined,
      _args: {},
      { dataSources }: Context
    ) =>
      dataSources.databaseSource.getLottieFiles()
  },
  Mutation: {
    uploadLottieFile: async (
      _parent: undefined,
      { file } : UploadLottieFileArgs
    ) => {
      console.log('here!')
      const { createReadStream, filename, mimetype, encoding } = await file

      // Invoking the `createReadStream` will return a Readable Stream.
      // See https://nodejs.org/api/stream.html#stream_readable_streams
      const stream = createReadStream()

      // This is purely for demonstration purposes and will overwrite the
      // local-file-output.txt in the current working directory on EACH upload.
      const out = require('fs').createWriteStream('local-file-output.txt')
      stream.pipe(out)
      await finished(out)

      return { filename, mimetype, encoding }
    },
  },
  // This maps the `Upload` scalar to the implementation provided
  // by the `graphql-upload` package.
  Upload: GraphQLUpload
}
