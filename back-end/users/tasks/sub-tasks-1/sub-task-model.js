const db = require('../../../data/db-config')

module.exports = {
    findById,
    findByTaskId,
    add,
    update,
    remove
}

function findById(id){
    return db('sub_tasks').where({ id }).first()
}

function findByTaskId(taskId){
    return db('sub_tasks').where({ task_id: taskId })
}

async function add(subTask){
    const taskIds = await db('sub_tasks').insert(subTask)
    return findById(taskIds[0])
}

async function update(newInfo, id){
    const original = await findById(id)
    const updated = { ...original, ...newInfo }
    await db('sub_tasks').where({ id }).update(updated)
    return findById(id)
}

async function remove(id){
    const deleted = await findById(id)
    await db('sub_tasks').where({ id }).del()
    return deleted
}