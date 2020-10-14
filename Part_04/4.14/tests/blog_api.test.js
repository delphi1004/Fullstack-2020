const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)
const Blog = require('../models/blog')
const BlogHelper = require('./blog_test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared')
    const blogObject = BlogHelper.initialBlogs.map(blog => new Blog(blog))
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
        expect(response.body).toHaveLength(BlogHelper.initialBlogs.length)
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

        const savedBlog = await BlogHelper.SaveBlog(newBlog)

        // verify the blogs count incresed
        const blogsAtEnd = await BlogHelper.BlogsInDb()
        expect(blogsAtEnd).toHaveLength(BlogHelper.initialBlogs.length + 1)

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

        const savedBlog = await BlogHelper.SaveBlog(newBlog)

        // verify the blogs count incresed
        const blogsAtEnd = await BlogHelper.BlogsInDb()
        expect(blogsAtEnd).toHaveLength(BlogHelper.initialBlogs.length + 1)

        // the blog post is saved correctly
        newBlog.likes = 0
        delete savedBlog.body.id
        expect(savedBlog.body).toEqual(newBlog)
    })

    test('verify 400 response when title and url are mssing', async () => {

        const newBlog = {
            author: "Daniel Shiffman",
            like: 10
        }

        const savedBlog = await api.post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('deletion of a blog', () => {

    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await BlogHelper.BlogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await BlogHelper.BlogsInDb()
        expect(blogsAtEnd).toHaveLength(BlogHelper.initialBlogs.length - 1)
        expect(blogsAtEnd).not.toContain(blogToDelete)

        console.log(blogToDelete)
    })
})

describe('updating of a blog', () => {

    test('succeeds with status code 204 if blog is updated', async () => {
        const blogsAtStart = await BlogHelper.BlogsInDb()
        const targetBlog = blogsAtStart[0]
        const blogToUpdate = { ...targetBlog, likes: targetBlog.likes + 10 }

        const updatedLikes = (await api
            .put(`/api/blogs/${targetBlog.id}`)
            .send(blogToUpdate)
            .expect(200)).body.likes

        expect(updatedLikes).toEqual(blogToUpdate.likes)
    })
})

afterAll(() => {
    mongoose.connection.close()
})