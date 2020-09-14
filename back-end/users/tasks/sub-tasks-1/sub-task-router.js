const express = require('express')
const router = express.Router({ mergeParams: true })

const subTasks = require('./sub-task-model')
const { validateSubTask, validateId } = require('./sub-task-middleware')

router.get('/', async (req, res) => {
    const { id } = req.params

    try {
        const taskSubTasks = await subTasks.findByTaskId(id)
        res.status(200).json(taskSubTasks)
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not get from database'})
    }
})

router.post('/', validateSubTask, async (req, res) => {
    req.body.task_id = req.params.taskId
    const newTaskInfo = req.body

    try {
        const newTask = await subTasks.add(newTaskInfo)
        res.status(201).json(newTask)
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not post to database'})
    }
    
})

router.put('/:SubTaskId', validateId, async (req, res) => {
    const taskInfo = req.body
    const id = req.params.taskId

    try{
        const updatedTask = await subTasks.update(taskInfo, id)
        res.status(200).json({ updated: updatedTask})
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not update sub task'})
    }
})

router.delete('/:SubTaskId', validateId, async (req, res) => {
    const id = req.params.taskId

    try{
        const deleted = await subTasks.remove(id)
        res.status(200).json({ deleted: deleted })
    } catch (err){
        console.log(err)
        res.status(500).json({message: 'could not delete sub task'})
    }
})
module.exports = router