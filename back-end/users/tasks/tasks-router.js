const express = require('express')
const router = express.Router({ mergeParams: true })

const tasks = require('./tasks-model')
const { validateTask, validateId } = require('./tasks-middleware')

router.get('/', async (req, res) => {
    const { id } = req.params

    try {
        const userTasks = await tasks.findByUserId(id)
        res.status(200).json(userTasks)
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not get from database'})
    }
})

router.post('/', validateTask, async (req, res) => {
    req.body.user_id = req.params.id
    const newTaskInfo = req.body

    try {
        const newTask = await tasks.add(newTaskInfo)
        res.status(201).json(newTask)
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not post to database'})
    }
    
})

router.put('/:taskId', validateId, async (req, res) => {
    const taskInfo = req.body
    const id = req.params.taskId

    try{
        const updatedTask = await tasks.update(taskInfo, id)
        res.status(200).json({ updated: updatedTask})
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not update task'})
    }
})

router.delete('/:taskId', validateId, async (req, res) => {
    const id = req.params.taskId

    try{
        const deleted = await tasks.remove(id)
        res.status(200).json({ deleted: deleted })
    } catch (err){
        console.log(err)
        res.status(500).json({message: 'could not delete task'})
    }
})
module.exports = router