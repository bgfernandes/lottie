/*
  Integration tests for the Apollo Server, uses the DB
*/

import { ApolloServer } from 'apollo-server-express'
import knexCleaner from 'knex-cleaner'
import { gql } from 'apollo-server-core'
import { Model } from 'objection'
import moment from 'moment'
import createApolloServer from '../src/apollo-server'
import createDatabase from '../db/createDatabase'
import LottieFile from '../src/models/LottieFile'
import initializeDb from '../src/config/initializeDb'

let server: ApolloServer

const HELLO_MESSAGE_QUERY = gql`
  query HelloMessage {
    hello {
      message
    }
  }
`

describe('Resolvers', () => {
  beforeAll(async () => {
    // create test database if not already created, run migrations, and setup objection
    await createDatabase()
    initializeDb()
    await Model.knex().migrate.latest({
      directory: './db/migrations',
    })

    server = createApolloServer()
  })

  afterAll(async () => {
    await Model.knex().destroy()
  })

  beforeEach(async () => {
    await knexCleaner.clean(Model.knex(), {
      ignoreTables: ['knex_migrations', 'knex_migrations_lock'],
    })
  })

  it('runs the home query successfully', async () => {
    const res = await server.executeOperation({ query: HELLO_MESSAGE_QUERY })
    expect(res).toMatchSnapshot()
  })

  describe('lottieFiles query', () => {
    const LOTTIE_FILES_QUERY = gql`
      query ($limit: Int!, $offset: Int!, $type: String) {
        lottieFiles(limit: $limit, offset: $offset, type: $type) {
          total
          lotties {
            id
            slug
            url
            createdAt
            updatedAt
          }
        }
      }
    `

    it('runs the lottieFiles query successfuly and returns data', async () => {
      await LottieFile.query().insert({
        id: '1',
        slug: 'W6HDcJoY946T8gGYLiiAJ',
        url: 'http://some_url.json',
        createdAt: moment('2021-09-01 00:00:00Z').toISOString(),
        updatedAt: moment('2021-09-02 00:00:00Z').toISOString(),
      })
      await LottieFile.query().insert({
        id: '2',
        slug: 'W6HDcJoY946T8gGYLiiA2',
        url: 'http://some_url2.json',
        createdAt: moment('2021-09-03 00:00:00Z').toISOString(),
        updatedAt: moment('2021-09-04 00:00:00Z').toISOString(),
      })

      const res = await server.executeOperation({
        query: LOTTIE_FILES_QUERY,
        variables: { limit: 10, offset: 0 },
      })
      expect(res).toMatchSnapshot()
    })
  })

  describe('lottieFile query', () => {
    const LOTTIE_FILE_QUERY = gql`
      query ($slug: String!) {
        lottieFile(slug: $slug) {
          id
          slug
          url
          createdAt
          updatedAt
        }
      }
    `

    it('returns empty when the lottie is not found', async () => {
      const res = await server.executeOperation({
        query: LOTTIE_FILE_QUERY,
        variables: { slug: 'some slug' },
      })
      expect(res).toMatchSnapshot()
    })

    it('returns the lottie successfully', async () => {
      await LottieFile.query().insert({
        id: '1',
        slug: 'W6HDcJoY946T8gGYLiiAJ',
        url: 'http://some_url.json',
        createdAt: moment('2021-09-01 00:00:00Z').toISOString(),
        updatedAt: moment('2021-09-02 00:00:00Z').toISOString(),
      })

      const res = await server.executeOperation({
        query: LOTTIE_FILE_QUERY,
        variables: { slug: 'W6HDcJoY946T8gGYLiiAJ' },
      })
      expect(res).toMatchSnapshot()
    })
  })
})
