const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    try {
        const blog = new Blog(request.body)

        if (request.body.title === undefined || request.body.url === undefined) {
            return response.status(400).json({ error: 'content missing' })
        }

        const savedBlog = await blog.save()
        response.json(blog)

    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = blogsRouter