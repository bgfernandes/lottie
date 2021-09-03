import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('lottie_files', function (table) {
      table.bigIncrements('id')
      table.timestamps(true, true)
    })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTable('lottie_files')
}
