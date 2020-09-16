const db = require('../data/db-config')

module.exports = {
    findById,
    register,
    findByUsername,
    update, 
    remove,
    findUserInfo
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
    return findById(id)
}

async function remove(id){
    const deleted = await findById(id)
    await db('users').where({ id }).del()
    return deleted
}

async function findUserInfo(username){
    const user = await db('users').where({ username }).select('id', 'username', 'theme')
    const userTasks = await db('tasks').where({ user_id: user[0].id })

    const userTasksData = await Promise.all(userTasks.map( async (task, i) => {

        try {
            const taskSubTasks = await db('sub_tasks').where({ task_id: task.id })
            const taskSubTasksData = await Promise.all(taskSubTasks.map( async (subTask, i) => {
                const subTasks2 = await db('sub_tasks_2').where({ sub_task_id: subTask.id})

                    const subTaskData = {
                        ...subTask,
                        subTasks2: subTasks2
                    }
                    return subTaskData
            }))
            const taskData = {
                ...task,
                subTasks: taskSubTasksData
            }
            return taskData
        } catch (err){
            console.log(err)
            res.status(500).json({ message: 'problem retrieving data' })
        }
     
    }))

    const userData = {
        id: user[0].id,
        username: user[0].username,
        theme: user[0].theme,
        tasks: userTasksData
    }

    return {
        ...userData
    }
}