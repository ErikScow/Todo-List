const express = require('express')

const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secrets = require('../config/secrets')
const users = require('./users-model')

router.post('/register', async (req, res) => {
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
            res.status(200).json({ 
                message: ` ${username} logged in`, 
                jwt: token, 
                user: {id: user.id, username: user.username, theme: user.theme}
            })
        } else {
            res.status(400).json({ message: 'invalid username or password'})
        }
    } catch (err){
        console.log(err)
        res.status(500).json({ message: 'could not login to database'})
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