const router = require('express').Router

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/api/register')

function generatToken(user){
    payload = {
        username: user.username
    }
}

module.exports = router