const db = require('../data/db-config')

module.exports = {
    findById,
    register,
    findByUsername,
    update, 
    remove
}

function findById(id){
    return db('users').where({ id }).first().select('id','username')
}

async function register(userInfo){
    const userIds = await db('users').insert(userInfo)
    return findById(userIds[0])
}

function findByUsername(username){
    return db('users').where({ username }).first()
}

async function update(newInfo, id){
    const original = await findById(id)
    const updated = { ...original, ...newInfo }
    await db('users').where({ id }).update(updated)
    const newUser = await findById(id)
    return newUser
}

async function remove(id){
    const userInfo = await findById(id)
    await db('users').where({ id }).del()
    return userInfo
}