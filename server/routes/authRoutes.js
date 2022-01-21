const express = require('express')
const User = require('../schemas/userSchema')
const encryptPassword = require('../auth/encrypt')
const passwordValidation = require('../auth/decrypt')
const generateToken = require('../auth/generate')
const authRouter = express.Router()

//REQUIRED: Register & Login
//REQUIRED: BCrypt Encryption
//REQUIRED: JWT

authRouter.post('/register', async(req, res)=>{
    let user = await encryptPassword(req.body.user)

    User.create(user, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === undefined || result === null){
            res.status(400).json({message: "Something went wrong"})
        }
        res.status(200).json({data: result})
    })
})

authRouter.post('/login', async (req, res)=>{
    let username = req.body.username
    let password = req.body.password
    User.findOne({username: username}, (error, result)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status(404).json({message: "Not Found"})
        }
        
        let valid = await passwordValidation(password, result.password)
        if(!!valid){
            res.status(403).json({message: "Please enter valid credentials"})
        }

        let token = generateToken(username)

        res.setHeader('Authorization', token)
        res.status(200).json({data: result})
    })
})

module.exports = authRouter