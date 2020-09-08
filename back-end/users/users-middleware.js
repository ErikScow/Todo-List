const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets')
const { orWhereNotExists } = require('../data/db-config')

module.exports = {
    authenticate,
}

function authenticate(req, res, next){
    const [authType, token] = req.headers.authorization.split(" ")

    if (token){
        jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
            console.log('decoded token: ', decodedToken)
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