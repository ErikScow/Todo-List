const tasks = require('./sub-task-2-model')

module.exports = {
    validateSubTask,
    validateId
}

function validateSubTask(req, res, next){
    const { sub_task_name } = req.body
    if (sub_task_name){
        next()
    } else {
        res.status(400).json({ message: 'must include a sub_task_name'})
    }
}

async function validateId(req, res, next){
    const subTaskId = req.params.subTaskId
    console.log(subTaskId)

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