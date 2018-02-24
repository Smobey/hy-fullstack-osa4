const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    try {
      const body = request.body
  
      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)

      if (body.password.length < 4) {
        response.status(403).json({ error: 'Password too short (min. 4 characters)' })
      }

      const user = new User({
        username: body.username,
        name: body.name,
        adult: body.adult,
        passwordHash
      })
  
      const savedUser = await user.save()
  
      response.json(savedUser)

    } catch (exception) {
      console.log(exception)
      if (exception.message.includes("duplicate key")) {
        response.status(403).json({ error: 'Duplicate username' })
      }

      response.status(500).json({ error: 'something went wrong...' })
    }
})

module.exports = usersRouter