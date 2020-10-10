
exports.seed = function(knex) {
  return knex('sub_tasks_2').insert([
    {
      sub_task_id: 1,
      task_name: 'some sub sub task',
      task_description: 'the description of that sub sub task',
      created: '09-13-2020'
    }
  ]);
};
