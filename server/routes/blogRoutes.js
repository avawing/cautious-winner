const express = require('express')
const authenticateToken = require('../middleware/authenticate')
const userOwnsResource = require('../middleware/userOwns')
const Blog = require('../schemas/blogSchema')
const blogRouter = express.Router()

//STRETCH: return NON private blogs
//REQUIRED: return all blogs
blogRouter.get('/', (req, res)=>{
    Blog.find({private: false}, (error, result)=>{
        if(error){
            res.status(404).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status(404).json({message: "NOT FOUND"})
        }
        res.status(200).json({data: result})
    })
})

//REQUIRED return ALL blogs for an authenticated user
// STRETCH return all blogs for authenticated user IF user owns resources
//REQUIRED User Posts a Blog
// STRETCH - user can only post a blog if it's THEIR blog

blogRouter.route('/:username')
.post(authenticateToken, (req, res)=>{
    const username = req.params.username
    let isValid = userOwnsResource(req._body, username)
    if(!isValid){
        res.status(403).json({message: "You don't have that permission"})
    }
    let blog = req.body
    blog.created_by = username
    Blog.create(blog, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status(404).json({message: "NOT FOUND"})
        }
        res.status(200).json({data: result})
    })
})

.get(authenticateToken, (req, res)=>{
    let created_by = req.params.username
    let private = userOwnsResource(req._user, created_by)
    Blog.find({created_by: created_by, private: private}, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status(404).json({message: "NOT FOUND"})
        }
        res.status(200).json({data: result})
    })
})

// update blogs by id
// REQUIRED user can update/delete by id
// STRETCH user must own the resource
blogRouter.route('/:id')
.update(authenticateToken, (req, res)=>{
    let id = req.params.id
    let updates = req.body
    Blog.findByIdAndUpdate(id, updates, (error, result)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        if(result === null || result === undefined){
            res.status(404).json({message: "NOT FOUND"})
        }
        res.status(200).json({data: result})
    })
})

.delete(authenticateToken, (req, res)=>{
    let id = req.params.id

    Blog.findByIdAndDelete(id, (error)=>{
        if(error){
            res.status(400).json({message: error.message})
        }
        res.status(204).json({message: "DELETED"})
    })
})

module.exports = blogRouter