const tasks = require('./sub-task-model')

module.exports = {
    validateSubTask,
    validateId
}

function validateSubTask(req, res, next){
    const { task_name } = req.body
    if (task_name){
        next()
    } else {
        res.status(400).json({ message: 'must include a task_name'})
    }
}

async function validateId(req, res, next){
    const subTaskId = req.params.subTaskId

    try {
        const exists = await tasks.findById(subTaskId)
        if (exists){
            next()
        } else {
            res.status(400).json({ message: 'invalid sub-task id'})
        }
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not validate sub-task id'})
    }
}