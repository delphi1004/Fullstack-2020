const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const Helper = require('./test_helper')

beforeEach(async () => {

  console.log('Users and Blogs are cleared')

  await Helper.CreateNewUsers()
  await Helper.CreateNewBlogs()
})

describe('when there is initially some blogs saved', () => {

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(Helper.initialBlogs.length)
  })

  test('user blogs returned', async () => {
    const loggedUser = await Helper.SelectRandomUser()
    const response = await api
      .get(`/api/blogs/${loggedUser.id.toString()}`)
      .set('Authorization', 'Bearer ' + loggedUser.token)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('viewing a specific blog', () => {

  test('verify unique identifier', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})

describe('addition of a new blog', () => {

  test('succeeds with valid data', async () => {

    const newBlog = {
      title: "Generative DEsign",
      author: "onformative",
      url: "http://www.generative-gestaltung.de/2/",
      likes: 10,
      comments:Helper.commentList
    }

    const loggedUser = await Helper.SelectRandomUser()
    const savedBlog = await Helper.SaveBlog(newBlog, loggedUser)

    // verify the blogs count incresed
    const blogsAtEnd = await Helper.BlogsInDb()
    expect(blogsAtEnd).toHaveLength(Helper.initialBlogs.length + 1)

    // the blog post is saved correctly
    newBlog.user = loggedUser.id
    delete savedBlog.body.id
    expect(savedBlog.body).toEqual(newBlog)
  })

  test('succeeds without likes property', async () => {

    const newBlog = {
      title: "Nature of Code",
      author: "Daniel Shiffman",
      url: "https://natureofcode.com/",
      comments: Helper.commentList
    }

    const loggedUser = await Helper.SelectRandomUser()
    const savedBlog = await Helper.SaveBlog(newBlog, loggedUser)

    // verify the blogs count incresed
    const blogsAtEnd = await Helper.BlogsInDb()
    expect(blogsAtEnd).toHaveLength(Helper.initialBlogs.length + 1)

    // the blog post is saved correctly
    newBlog.user = loggedUser.id
    newBlog.likes = savedBlog.body.likes
    delete savedBlog.body.id
    expect(savedBlog.body).toEqual(newBlog)
  })

  test('verify 400 response when title and url are mssing', async () => {

    const newBlog = {
      author: "Daniel Shiffman",
      like: 10
    }

    const loggedUser = await Helper.SelectRandomUser()
    const savedBlog = await api.post('/api/blogs')
      .set('Authorization', 'Bearer ' + loggedUser.token)
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {

  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await Helper.BlogsInDb()
    const users = await Helper.usersInDb()
    let userHasBlog

    users.forEach(user => {
      if (user.blogs.length > 0) {
        userHasBlog = user
        return
      }
    })

    const targetUser = Helper.initialUsers.find(user => user.username === userHasBlog.username ? user : null)
    const user = {
      username: targetUser.username,
      password: targetUser.password,
    }

    const foundBlog = await Blog.findById(userHasBlog.blogs[0])
    const blogToDelete = {
      author: foundBlog.author,
      id: foundBlog.id,
      likes: foundBlog.likes,
      title: foundBlog.title,
      url: foundBlog.url,
      user: foundBlog.user
    }

    const blogCountAtStart = userHasBlog.blogs.length
    const loggedUser = await Helper.UserLogIn(user)

    await api.delete(`/api/blogs/${userHasBlog.blogs[0]}`)
      .set('Authorization', 'Bearer ' + loggedUser.token)
      .expect(204)

    const blogsAtEnd = await Helper.BlogsInDb()
    expect(blogsAtEnd).toHaveLength(Helper.initialBlogs.length - 1)
    expect(blogsAtEnd).not.toContain(blogToDelete)

    const userAtEnd = await User.findById(foundBlog.user)
    expect(userAtEnd.blogs).toHaveLength(blogCountAtStart - 1)
  })
})

describe('updating of a blog', () => {

  test('succeeds with status code 204 if blog is updated', async () => {
    const users = await Helper.usersInDb()
    let userHasBlog

    users.forEach(user => {
      if (user.blogs.length > 0) {
        userHasBlog = user
        return
      }
    })

    const targetUser = Helper.initialUsers.find(user => user.username === userHasBlog.username ? user : null)
    const user = {
      username: targetUser.username,
      password: targetUser.password,
    }

    const foundBlog = await Blog.findById(userHasBlog.blogs[0])
    const blogCountAtStart = userHasBlog.blogs.length
    const blogToUpdate = {
      author: foundBlog.author,
      id: foundBlog.id,
      likes: foundBlog.likes + 10,
      title: foundBlog.title,
      url: foundBlog.url,
      user: foundBlog.user,
      comments: foundBlog.comments
    }

    const loggedUser = await Helper.UserLogIn(user)
    const updatedBlog = await api.put(`/api/blogs/${userHasBlog.blogs[0]}`)
      .set('Authorization', 'Bearer ' + loggedUser.token)
      .send(blogToUpdate)
      .expect(200)

    expect(blogToUpdate.likes).toEqual(updatedBlog.body.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})