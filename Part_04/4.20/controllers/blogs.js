const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find().populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  if (blog) {
    res.json(blog)
  } else {
    res.status(404).end()
  }
})

blogsRouter.post('/', async (req, res, next) => {
  const body = req.body
  let blogLikes = 0
  const response401 = (res) => res.status(401).json({ error: 'token missing or invalid' })

  if(!req.token){
    return response401(res)
  }
  
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  console.log(req.token)

  if (!req.token || !decodedToken.id) {
    return response401(res)
  }
  const user = await User.findById(decodedToken.id)

  if (body.likes !== undefined) {
    blogLikes = body.likes
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: blogLikes,
    user: user._id
  })

  if (blog.title === undefined && blog.url === undefined) {
    res.status(400).end()
  } else {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
  res.json(updatedBlog)
})

module.exports = blogsRouter