
exports.seed = function(knex) {
  return knex('sub_tasks').insert([
    {
      task_id: 1,
      task_name: 'some sub task',
      task_description: 'the description of that sub task',
      created: '09-13-2020'
    }
  ]);
};
