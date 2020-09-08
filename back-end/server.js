const express = require('express')

require('dotenv').config()
const server = express()
const userRouter = require('./auth/users-router')

server.use(express.json())
server.use('/api/users', userRouter)

const port = process.env.PORT

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

module.exports = server