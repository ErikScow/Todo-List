const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

const users = require('./users-model')
const { isUnique, validateId, validateUser, authenticate } = require('./users-middleware')

const tasksRouter = require('./tasks/tasks-router')
router.use('/:id/tasks', authenticate, validateId, tasksRouter)

router.post('/register', validateUser, isUnique, async (req, res) => {
    const newUserInfo = req.body

    hash = bcrypt.hashSync(newUserInfo.password, 12)
    newUserInfo.password = hash

    try {
        const newUser = await users.register(newUserInfo)
        res.status(201).json(newUser)
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not post to database'})
    }
    
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await users.findByUsername(username)
        if (user && bcrypt.compareSync(password, user.password)){
            const token = generateToken(user)
            const userData = await users.findUserInfo(username)
            res.status(200).json({ 
                message: ` ${username} logged in`, 
                token: token, 
                user: {...userData}
            })
        } else {
            res.status(400).json({ message: 'invalid username or password'})
        }
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not login to database'})
    }
})

router.put('/:id', authenticate, isUnique, validateId, validateUser, async (req, res) => {
    const userInfo = req.body
    const id  = req.params.id

    try{
        const updatedUser = await users.update(userInfo, id)
        res.status(200).json({ updated: updatedUser })
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not update user'})
    }
})

router.delete('/:id', authenticate, validateId, async (req, res) => {
    const { id } = req.params

    try{
        const deleted = await users.remove(id)
        res.status(200).json({ deleted: deleted })
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not delete user'})
    }
})

function generateToken(user){
    const payload = {
        userId: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router