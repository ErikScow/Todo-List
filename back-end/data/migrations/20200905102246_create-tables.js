
exports.up = function(knex) {
    return knex.schema
    .createTable('users', (tbl) => {
        tbl.increments()
        tbl.text('username', 128)
          .unique()
          .notNullable()
        tbl.text('password', 128)
          .notNullable()
        tbl.integer('theme')
    })
    .createTable('tasks', (tbl) => {
      tbl.increments()
      tbl.integer('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .notNullable()
      tbl.text('task_name')
        .notNullable()
      tbl.text('task_description', 2560)
      tbl.text('created', 128)
      tbl.text('complete_by', 128)
      tbl.integer('priority')
        .defaultTo(1)
      tbl.boolean('completed')
        .defaultTo(false)
    })
  };
  
  exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('users')
  };
  