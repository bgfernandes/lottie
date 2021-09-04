import { JSONSchema7 } from 'json-schema'
import BaseModel from './BaseModel'

export default class LottieFile extends BaseModel {
  id: string | undefined
  slug: string | undefined
  url: string | undefined

  static get tableName():string {
    return 'lottie_files'
  }

  static get jsonSchema():JSONSchema7 {
    return {
      type: 'object',

      properties: {
        id: { type: 'string' },
        slug: { type: 'string', minLength: 21, maxLength: 21 },
        url: { type: 'string' },
        created_at: { type: 'string' },
        updated_at: { type: 'string' }
      },

      required: ['slug', 'url']
    }
  }
}
