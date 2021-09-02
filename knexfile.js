const dotenv = require('dotenv')

dotenv.config({
  path: './.env.local'
})

console.log(process.env.DB_HOST)

module.exports = {
  client: 'postgresql',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_DATABASE
  },
  pool: {
    min: 2,
    max: 5
  },
  migrations: {
    extension: 'ts',
    tableName: 'knex_migrations',
    directory: './db/migrations'
  }
}
