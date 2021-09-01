/*
  Integration tests for the Apollo Server, uses the DB
*/

import { ApolloServer } from 'apollo-server-micro'
import { loadEnvConfig } from '@next/env'
import { Knex } from 'knex'
import knexCleaner from 'knex-cleaner'
import { gql } from '@apollo/client'
import { Model } from 'objection'
import moment from 'moment'
import createApolloServer from '../../apollo/server'
import { HELLO_MESSAGE_QUERY } from '../../pages/index'
import createDatabase from '../../db/createDatabase'
import createKnexInstance from '../../db/knexInstance'
import LottieFile from '../../models/LottieFile'

const projectDir = process.cwd()
loadEnvConfig(projectDir)

let server: ApolloServer
let knex: Knex


describe('Resolvers', () => {
  beforeAll(async () => {
    // create test database if not already created, run migrations, and setup objection
    await createDatabase()
    knex = createKnexInstance()
    await knex.migrate.latest({
      directory: './db/migrations'
    })
    Model.knex(knex)

    server = createApolloServer()
  })

  afterAll(async () => {
    await knex.destroy()
  })

  beforeEach(async () => {
    await knexCleaner
      .clean(knex, { ignoreTables: ['knex_migrations', 'knex_migrations_lock'] })
  })

  it('runs the home query successfully', async () => {
    const res = await server.executeOperation({ query: HELLO_MESSAGE_QUERY })
    expect(res).toMatchSnapshot()
  })

  it('runs the lottieFiles query successfuly and returns data', async () => {
    await LottieFile.query().insert({
      id: '1',
      createdAt: moment('2021-09-01'),
      updatedAt: moment('2021-09-02')
    })
    await LottieFile.query().insert({
      id: '2',
      createdAt: moment('2021-09-03'),
      updatedAt: moment('2021-09-04')
    })

    const LOTTIE_FILES_QUERY = gql`
      query {
        lottieFiles {
          id,
          createdAt,
          updatedAt
        }
      }
    `
    const res = await server.executeOperation({ query:  LOTTIE_FILES_QUERY})
    expect(res).toMatchSnapshot()
  })
})
