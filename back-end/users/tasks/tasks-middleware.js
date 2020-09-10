const tasks = require('./tasks-model')

module.exports = {
    validateTask,
    validateId
}

function validateTask(req, res, next){
    const { task_name } = req.body
    if (task_name){
        next()
    } else {
        res.status(400).json({ message: 'must include a task_name'})
    }
}

async function validateId(req, res, next){
    const { taskId } = req.params

    try {
        const exists = await tasks.findById(taskId)
        if (exists){
            next()
        } else {
            res.status(400).json({ message: 'invalid task id'})
        }
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'coule not validate task id'})
    }
}