const jwt = require('jsonwebtoken')

//REQUIRED

function authenticateToken(req, res, next){
    const token = req.get('Authorization')

    if(token === null){
        res.status(403).json({message: "Token Required"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            res.status(400).json({message: err.message})
        }
        req._user = user
        next()
    })
}

module.exports = authenticateToken