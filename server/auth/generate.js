const jwt = require('jsonwebtoken')

function generateToken(username){
    let token = jwt.sign(username, process.env.JWT_SECRET)
    return token
}

module.exports = generateToken