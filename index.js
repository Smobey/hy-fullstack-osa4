const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

if ( process.env.NODE_ENV !== 'production' ) {
    require('dotenv').config()
}

mongoose
  .connect(process.env.MONGODB_URI)
  .then( () => { 
    console.log('connected to database', process.env.MONGODB_URI) 
  })
  .catch( err => { 
    console.log(err) 
  })  

mongoose.Promise = global.Promise

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

app.use(cors())
app.use(bodyParser.json())

app.use('/api/blogs', blogsRouter)
