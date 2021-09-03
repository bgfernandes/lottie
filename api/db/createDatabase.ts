/*
  Helper script file to create the DB
*/

import knex from 'knex'
import dotenv from 'dotenv'
import path from 'path'

if (require.main === module) {
  dotenv.config({
    path: path.resolve(__dirname, '..', '.env.local')
  })

  createDatabase()
}

export default function createDatabase():Promise<void> {
  const knexInstance = knex({
    client: 'pg',
    connection: {
      host : process.env.DB_HOST,
      user : process.env.DB_USER,
      password : process.env.DB_PASS
    }
  })

  return knexInstance.raw(`CREATE DATABASE ${process.env.DB_DATABASE};`)
    .then(() => {
      console.log(`Created Database ${process.env.DB_DATABASE}`)
    })
    .catch((err) => {
      if (err.message.match(/^CREATE DATABASE .*; - database ".*" already exists$/)) {
        console.log(`Database ${process.env.DB_DATABASE} already exists.`)
      } else {
        console.error(`Error creating database ${process.env.DB_DATABASE}`)
        console.error(err)
      }
    })
    .finally(() => {
      knexInstance.destroy()
    })
}
