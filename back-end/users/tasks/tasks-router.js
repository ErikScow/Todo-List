const express = require('express')
const router = express.Router({ mergeParams: true })

const tasks = require('./tasks-model')

router.get('/', async (req, res) => {
    const { id } = req.params

    const userTasks = await tasks.findByUserId(id)
    res.status(200).json(userTasks)
})

module.exports = router