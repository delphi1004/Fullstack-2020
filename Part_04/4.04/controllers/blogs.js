const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogsRouter.get('/:id', (req, res, next) => {
  Blog.findById(req.params.id)
    .then(blog => {
      if (blog) {
        res.json(blog)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

blogsRouter.post('/', (req, res, next) => {
  const body = req.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.number
  })

  Blog.save()
    .then(savedBlog => {
      res.json(savedBlog)
    })
    .catch(error => next(error))
})

blogsRouter.delete('/:id', (req, res, next) => {
  Blog.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch(error => next(error))
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