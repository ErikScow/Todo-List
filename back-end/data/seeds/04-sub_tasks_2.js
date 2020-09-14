
exports.seed = function(knex) {
  return knex('sub_tasks_2').insert([
    {
      sub_task_id: 1,
      sub_task_name: 'some sub sub task',
      sub_task_description: 'the description of that sub sub task',
      created: '09-13-2020'
    }
  ]);
};
