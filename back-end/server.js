const express = require('express')

require('dotenv').config()
const server = express()

server.use(express.json())

const port = process.env.PORT

server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})

module.exports = server