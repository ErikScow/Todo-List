const db = require('../data/db-config')

module.exports = {
    findById,
    register,
    findByUsername
}

function findById(id){
    return db('users').where({ id }).first().select('id', 'username')
}

async function register(userInfo){
    const userIds = db('users').insert(userInfo)
    return findById(userIds[0])
}

function findByUsername(username){
    return db('users').where({ username }).first()
}