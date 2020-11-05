const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, author: 1 })
  response.json(users)
})

usersRouter.get('/:user', async (req, res, next) => {
  const body = req.body
  const response401 = (res) => res.status(401).json({ error: 'token missing or invalid' })

  if (!req.token) {
    return response401(res)
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!req.token || !decodedToken.id) {
    return response401(res)
  }

  const blog = await Blog.find({ user: req.params.user}).exec();

  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

usersRouter.post('/', async (req, res) => {

  const body = req.body
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  if (body.password.length < 3) {
    return res.status(400).json({ error: 'Password validation failed: password is empty or the length is smaller than 3' })
  }

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  res.json(savedUser)
})

module.exports = usersRouter