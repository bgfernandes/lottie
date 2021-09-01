import moment from 'moment'
import { Model, snakeCaseMappers } from 'objection'

export default class BaseModel extends Model {
  createdAt: string | moment.Moment | undefined
  updatedAt: string | moment.Moment | undefined;

  static get columnNameMappers() {
    return snakeCaseMappers()
  }

  $beforeUpdate():void {
    this.updatedAt = moment().toISOString()
  }

  $afterFind():void {
    this.createdAt = moment(this.createdAt).utc()
    this.updatedAt = moment(this.updatedAt).utc()
  }
}
