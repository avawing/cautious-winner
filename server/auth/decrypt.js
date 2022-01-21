const bcrypt = require('bcrypt')

async function passwordValidation(input, hashedPassword){
    let isValid = await bcrypt.compare(input, hashedPassword)
    return isValid
}

module.exports = passwordValidation