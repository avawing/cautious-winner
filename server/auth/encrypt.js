const bcrypt = require('bcrypt')

async function encryptPassword(user){
    let salt = Number(process.env.SALT)
    let hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
    return user
}

module.exports = encryptPassword

