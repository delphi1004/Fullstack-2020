const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)
const Blog = require('../models/blog')
const blogHelper = require('./blog_test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')
    const blogObject = blogHelper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObject.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(blogHelper.initialBlogs.length)
})

test('verify unique identifier', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog =>{
        expect(blog.id).toBeDefined()
    })
})

afterAll(() => {
    mongoose.connection.close()
})