const users = require('./users-model')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')

module.exports = {
    authenticate,
    isUnique,
    validateUser,
    validateId
}

function authenticate(req, res, next){
    const id = parseInt(req.params.id)

    if(req.headers.authorization){
        const token = req.headers.authorization.split(" ")[1]
        if (token){
            jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
                if (err){
                    console.log(err)
                    res.status(401).json({ message: 'invalid token' })
                } else if (decodedToken.userId === id){
                    req.decodedToken = decodedToken
                    next()
                } else {
                    res.status(403).json({ message: 'you dont have access to this'})
                } 
            })
        } else {
            res.status(401).json({ message: 'no token included in authorization header' })
        }
    } else {
        res.status(401).json({ message: 'no authorization header included'})
    }
   
}

async function isUnique(req, res, next){

    const username = req.body.username
    const id = parseInt(req.params.id)
    const dbUser = await users.findByUsername(username)

    if (req.method === "PUT"){
        if (dbUser && dbUser.id === id){
            next()
        } else if (dbUser){
            res.status(400).json({ message: "username taken" })
        } else {
            next()
        }
    } else if (dbUser){
        res.status(400).json({ message: "username taken" })
    } else {
        next()
    }
    
 
}

function validateUser(req, res, next){

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
        const exists = await users.findById(id)
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