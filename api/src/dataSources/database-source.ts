import { DataSource } from 'apollo-datasource'
import LottieFile from '../models/LottieFile'

export default class DatabaseSource extends DataSource {
  async getLottieFiles({
    offset,
    limit,
    type,
  }: {
    offset: number
    limit: number
    type: string | undefined
  }): Promise<{ total: number; lotties: LottieFile[] }> {
    if (limit < 1 || limit > 20) {
      throw new Error('Invalid value for offset param')
    }

    let lottieFilesQuery = LottieFile.query()

    if (!type || type === 'recent') {
      lottieFilesQuery = lottieFilesQuery.orderBy('created_at', 'desc')
    } else {
      throw new Error('Invalid argument "type" for query')
    }

    const [total, lotties] = await Promise.all([
      lottieFilesQuery.resultSize(),
      lottieFilesQuery.offset(offset).limit(limit),
    ])

    return { total, lotties }
  }

  async getLottieFile({ slug }: { slug: string }): Promise<LottieFile | null> {
    const lottieFile = await LottieFile.query().findOne({ slug })
    return lottieFile
  }

  async createLottieFile({
    slug,
    url,
  }: {
    slug: string
    url: string
  }): Promise<LottieFile> {
    return await LottieFile.query().insert({
      slug,
      url,
    })
  }
}
