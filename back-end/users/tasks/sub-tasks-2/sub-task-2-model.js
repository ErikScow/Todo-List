const db = require('../../../data/db-config')

module.exports = {
    findById,
    findBySubTaskId,
    add,
    update,
    remove
}

function findById(id){
    return db('sub_tasks_2').where({ id }).first()
}

function findBySubTaskId(subTaskId){
    return db('sub_tasks_2').where({ sub_task_id: subTaskId })
}

async function add(subTask){
    const taskIds = await db('sub_tasks_2').insert(subTask)
    return findById(taskIds[0])
}

async function update(newInfo, id){
    const original = await findById(id)
    const updated = { ...original, ...newInfo }
    await db('sub_tasks_2').where({ id }).update(updated)
    return findById(id)
}

async function remove(id){
    const deleted = await findById(id)
    await db('sub_tasks_2').where({ id }).del()
    return deleted
}