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

describe('when there is initially some blogs saved', () => {

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
            likes: 10
        }

        const savedBlog = await blogHelper.SaveBlog(newBlog)

        // verify the blogs count incresed
        const blogsAtEnd = await blogHelper.BlogsInDb()
        expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length + 1)

        // the blog post is saved correctly
        delete savedBlog.body.id
        expect(savedBlog.body).toEqual(newBlog)
    })

    test('succeeds without likes property', async () => {

        const newBlog = {
            title: "Nature of Code",
            author: "Daniel Shiffman",
            url: "https://natureofcode.com/",
        }

        const savedBlog = await blogHelper.SaveBlog(newBlog)

        // verify the blogs count incresed
        const blogsAtEnd = await blogHelper.BlogsInDb()
        expect(blogsAtEnd).toHaveLength(blogHelper.initialBlogs.length + 1)

        // the blog post is saved correctly
        newBlog.likes = 0
        delete savedBlog.body.id
        expect(savedBlog.body).toEqual(newBlog)
    })

    test('verify 400 response when title and url are mssing', async () => {

        const newBlog = {
            author: "Daniel Shiffman",
            like:10
        }

        const savedBlog = await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

afterAll(() => {
    mongoose.connection.close()
})