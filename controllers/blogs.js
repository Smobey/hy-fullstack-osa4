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

blogsRouter.delete('/:id', async (request, response) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
    
        response.status(204).end()
      } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

blogsRouter.put('/:id', async (request, response) => {
    try {
        const body = request.body
        const blog = {
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes
        }

        await Blog.findByIdAndUpdate(request.params.id, blog)
    
        response.status(204).end()
      } catch (exception) {
        console.log(exception)
        response.status(400).send({ error: 'malformatted id' })
    }
})

module.exports = blogsRouter