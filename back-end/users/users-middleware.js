const db = require('./users-model')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

module.exports = {
    authenticate,
    isUnique,
    validateUser,
    validateId
}

function authenticate(req, res, next){
    const [authType, token] = req.headers.authorization.split(" ")

    if (token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            if (err){
                res.status(401).json({ message: 'invalid token' })
            } else {
                req.decodedToken = decodedToken
                next()
            }
        })
    } else {
        res.status(401).json({ message: 'no token included' })
    }
}

async function isUnique(req, res, next){
    const username = req.body.username
    const usernameTaken = await db.findByUsername(username)

    if (usernameTaken){
        res.status(400).json({ message: "username taken"})
    } else {
        next()
    }
}

async function validateUser(req, res, next) {
    const { username, password } = req.body
    if (username, password){
        next()
    } else {
        res.status(400).json({ message: 'must include username and password' })
    }
}

async function validateId(req, res, next){
    const { id }  = req.params
        
    try{
        const exists = await db.findById(id)
        if (exists){
            next()
        } else {
            res.status(400).json({ message: 'invalid user id'})
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'could not validate user' })
    }
}