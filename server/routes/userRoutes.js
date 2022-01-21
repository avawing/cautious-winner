const express = require('express')
const User = require('../schemas/userSchema')
const authenticateToken = require('../middleware/authenticate')

const userRouter = express.Router()

userRouter.route('/:id')
.put(authenticateToken, (req, res)=>{
    let id = req.params.id
    let update = req.body

    User.findByIdAndUpdate(id, update, (error, result)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        res.status(201).json({data: result})
    })
})
.delete(authenticateToken, (req, res)=>{
    let id = req.params.id

    User.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        res.status(204).json({data: "DELETED"})
    })
})

module.exports = userRouter