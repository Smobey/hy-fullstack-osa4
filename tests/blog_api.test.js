const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const {initialBlogs, blogsInDb} = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})
  
  const blogObjects = initialBlogs.map(n => new Blog(n))
  await Promise.all(blogObjects.map(n => n.save()))
})

describe('HTTP GET', () => {

  test('all blogs are returned as json', async () => {
    const blogsInDatabase = await blogsInDb()

    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(blogsInDatabase.length)

    const returnedTitles = response.body.map(n => n.title)
    blogsInDatabase.forEach(blog => {
      expect(returnedTitles).toContain(blog.title)
    })
  })

  test('404 is returned by GET /api/blogs/:id with nonexisting id', async () => {
    const invalidId = "5a3d5da59070081a82a3445"

    const response = await api
      .get(`/api/blogs/${invalidId}`)
      .expect(404)
  })

})

describe('HTTP POST', () => {

  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api
      .get('/api/blogs')

    const titles = response.body.map(r => r.title)
  
    expect(titles).toContain('First class tests')
  })

  test('when likes are undefined, they are set to zero ', async () => {
    const newBlogWithNoLikes = {
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html"
    }

    await api
      .post('/api/blogs')
      .send(newBlogWithNoLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api
      .get('/api/blogs')

    const likes = response.body.map(r => r.likes)

    expect(likes).not.toContain(undefined)
    expect(likes).toContain(0)
  })

  test('when title and url are undefined, 400 error is returned', async () => {
    const newBlogWithNoTitleNoUrl = {
      author: "Douglas Adams"
    }    

    await api
      .post('/api/blogs')
      .send(newBlogWithNoTitleNoUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  })

})

afterAll(() => {
  server.close()
})