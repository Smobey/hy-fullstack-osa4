const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { usersInDb } = require('./test_helper')

describe('HTTP POST', () => {
  beforeAll(async () => {
    await User.remove({})
  })

  test('a valid user can be added ', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: "paprika",
      author: "Petra Pippurinen",
      adult: true,
      password: "verysecurepassword"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length+1)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user with a password length of 3 does not get added ', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUser = {
      username: "onion",
      author: "Salla Sipuli",
      adult: true,
      password: "vsp"
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length)
    const usernames = usersAfterOperation.map(u=>u.username)
    expect(usernames).not.toContain(newUser.username)
  })

  test('no two users with the same username ', async () => {
    const usersBeforeOperation = await usersInDb()

    const newUserOne = {
      username: "vinegar",
      author: "Elli Etikka",
      adult: true,
      password: "verysecurepassword"
    }

    const newUserTwo = {
      username: "vinegar",
      author: "Ella Etikka",
      adult: true,
      password: "verysecurepassword"
    }

    await api
      .post('/api/users')
      .send(newUserOne)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    await api
      .post('/api/users')
      .send(newUserTwo)
      .expect(403)
      .expect('Content-Type', /application\/json/)

    const usersAfterOperation = await usersInDb()
    expect(usersAfterOperation.length).toBe(usersBeforeOperation.length + 1)
  })
})

afterAll(() => {
  server.close()
})