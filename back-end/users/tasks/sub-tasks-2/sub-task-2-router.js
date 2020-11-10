const express = require('express')
const router = express.Router({ mergeParams: true })

const subTasks2 = require('./sub-task-2-model')
const { validateSubTask, validateId } = require('./sub-task-2-middleware')

router.get('/', async (req, res) => {
    const { id } = req.params

    try {
        const subTaskSubTasks = await subTasks2.findBySubTaskId(id)
        res.status(200).json(subTaskSubTasks)
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not get from database'})
    }
})

router.post('/', validateSubTask, async (req, res) => {
    req.body.sub_task_id = req.params.subTaskId
    const newTaskInfo = req.body

    try {
        const newTask = await subTasks2.add(newTaskInfo)
        res.status(201).json(newTask)
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not post to database'})
    }
    
})

router.put('/:subTask2Id', validateId, async (req, res) => {
    const subTaskInfo = req.body
    const subTaskId = req.params.subTask2Id

    try{
        const updatedTask = await subTasks2.update(subTaskInfo, subTaskId)
        res.status(200).json({ updated: updatedTask })
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not update sub task' })
    }
})

router.delete('/:subTask2Id', validateId, async (req, res) => {
    const subTask2Id = req.params.subTask2Id

    try{
        const deleted = await subTasks2.remove(subTask2Id)
        res.status(200).json({ deleted: deleted })
    } catch (err){
        console.log(err)
        res.status(500).json({message: 'could not delete sub task'})
    }
})
module.exports = router