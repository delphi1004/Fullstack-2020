const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find()
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

  if (body.likes !== undefined) {
    blogLikes = body.likes
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: blogLikes
  })

  if (blog.title === undefined && blog.url === undefined) {
    res.status(400).end()
  } else {
    const savedBlog = await blog.save()
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