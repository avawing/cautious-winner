const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const mongoConnection = require('./config/mongoConfig')

// REQUIRED: authRoute, blogRoute
// STRETCH: userRoute
const userRoute = require('./routes/userRoutes')
const authRoute = require('./routes/authRoutes')
const blogRoute = require('./routes/blogRoutes')
dotenv.config()

const app = express()
const port = 3000 || process.env.PORT
app.use(morgan('dev'))
app.use(helmet())
app.use(bodyParser.json())

app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/blogs', blogRoute)

app.get('/', (req, res)=>{
    res.status(200).json({message: "API UP!"})
})

app.listen(port, ()=>{
    mongoConnection()
    console.log(`Server is listening at port: ${port}`)
})