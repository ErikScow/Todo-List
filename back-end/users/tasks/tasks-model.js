const db = require('../../data/db-config')

module.exports = {
    findByUserId
}

function findByUserId(id){
    return db('tasks').where({ user_id: id })
}