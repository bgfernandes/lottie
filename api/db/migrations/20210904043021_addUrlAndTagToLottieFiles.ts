import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.table('lottie_files', (table) => {
    table.string('slug', 21).unique()
    table.string('url').unique()
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.table('lottie_files', (table) => {
    table.dropColumn('slug')
    table.dropColumn('url')
  })
}
