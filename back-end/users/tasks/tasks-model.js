const db = require('../../data/db-config')

module.exports = {
    findById,
    findByUserId,
    add,
    update,
    remove
}

function findById(id){
    return db('tasks').where({ id}).first()
}

function findByUserId(userId){
    return db('tasks').where({ user_id: userId })
}

async function add(task){
    const taskIds = await db('tasks').insert(task)
    return findById(taskIds[0])
}

async function update(newInfo, id){
    const original = await findById(id)
    const updated = { ...original, ...newInfo }
    await db('tasks').where({ id }).update(updated)
    return findById(id)
}

async function remove(id){
    const deleted = await findById(id)
    await db('tasks').where({ id }).del()
    return deleted
}