import { DataSource } from 'apollo-datasource'
import LottieFile from '../../models/LottieFile'

export default class Database extends DataSource{

  async getLottieFiles() {
    const lottieFiles = await LottieFile.query()
    return lottieFiles
  }
}
