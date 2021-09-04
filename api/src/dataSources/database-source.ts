import { DataSource } from 'apollo-datasource'
import LottieFile from '../models/LottieFile'

export default class DatabaseSource extends DataSource{

  async getLottieFiles(): Promise<LottieFile[]> {
    const lottieFiles = await LottieFile.query()
    return lottieFiles
  }

  async createLottieFile({slug, url}: { slug: string, url: string }): Promise<LottieFile> {
    return await LottieFile.query().insert({
      slug,
      url
    })
  }
}
