import fs, { ReadStream } from 'fs'
import { finished } from 'stream/promises'
import config from '../../config/config'

type FileUploadResponse = Promise<{
  url: string
}>

export default async function localUploader(fileName: string, stream: ReadStream): FileUploadResponse {
  const localFilePath = 'local_file_store/' + fileName
  const fileUrl = config.domain + '/local_file_store/' + fileName

  const out = fs.createWriteStream(localFilePath)
  stream.pipe(out)
  await finished(out)

  return { url: fileUrl }
}
