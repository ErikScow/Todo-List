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
    console.log('1 ', user)
    const userTasks = await db('tasks').where({ user_id: user[0].id })

    const userTasksData = await userTasks.map( async (task, i) => {
        const taskSubTasks = await db('sub_tasks').where({ task_id: task.id })
        console.log('2 ',task.task_name)
        const taskSubTasksData = await taskSubTasks.map( async (subTask, i) => {
            const subTasks2 = await db('sub_tasks_2').where({ sub_task_id: subTask.id})

            const subTaskData = {
                ...subTask,
                subTasks2: subTasks2
            }
            console.log('5' ,subTaskData)
            return subTaskData
        })
        console.log('8',taskSubTasks)
        const taskData = {
            ...task,
            subTasks: taskSubTasksData
        }
        console.log('6',taskData)
        return taskData
        console.log('3.1 ', task.subTasks)
    })

    console.log('7',userTasksData)

    const userData = {
        id: user[0].id,
        username: user[0].username,
        theme: user[0].theme,
        tasks: userTasksData
    }

    console.log('3 ', userData.tasks[0].subTasks)

    return {
        ...userData
    }
}


// This is what I want the return data to be when the front end requests user data. To be used on login.
/* [
    {
        user: allUserInfo,
        tasks: [
            {
                task: allTaskInfo,
                subTasks: [
                    {
                        subTask: allSubTaskInfo,
                        subSubTasks: [
                            {
                                subSubTask: allSubSubTaskInfo
                            }
                        ]
                    },
                    {
                        subTask: anotherSubTasksInfo,
                        subSubTasks: [
                            {
                                subSubTask: anotherSubSubTasksInfo
                            },
                            {
                                subSubTask: yetAnotherSubSubTasksInfo
                            }
                        ]
                    }
                ]
            },
            {
                task: anotherTasksInfo,
                subTasks: []
            }
        ]
    }
] */