exports.up = function up(knex) {
  return knex.schema
    .createTable('lottie_files', function (table) {
      table.bigIncrements('id')
      table.timestamps(true, true)
    })
}

exports.down = function down(knex) {
  return knex.schema
    .dropTable('lottie_files')
}
