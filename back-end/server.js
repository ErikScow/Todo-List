const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

require('dotenv').config()

const server = express()
const userRouter = require('./users/users-router')

server.use(express.json())
server.use(cors())
server.use(helmet())
server.use('/api/users', userRouter)

const port = process.env.PORT || 5000

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

module.exports = server