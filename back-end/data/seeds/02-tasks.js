
exports.seed = function(knex) {
  return knex('tasks').insert([
    {
      user_id: 1,
      task_name: 'some task',
      task_description: 'the description of that task',
      created: '09-06-2020'
    }
  ]);
};
