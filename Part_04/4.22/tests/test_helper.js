const _ = require("lodash");
const Blog = require('../models/blog')
const User = require('../models/user')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)

const initialBlogs = [
    { title: "React patterns", author: "Michael Chan", url: "https://reactpatterns.com/", likes: 7 },
    { title: "Go To Statement Considered Harmful", author: "Edsger W. Dijkstra", url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", likes: 5 },
    { title: "Canonical string reduction", author: "Edsger W. Dijkstra", url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", likes: 12 },
    { title: "First class tests", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", likes: 10 },
    { title: "TDD harms architecture", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", likes: 0 },
    { title: "Type wars", author: "Robert C. Martin", url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", likes: 2 }
]

const initialUsers = [
    { username: 'root', name: 'Superuser', password: '1234' },
    { username: 'delphi1004', name: 'John Lee', password: '1234' },
    { username: 'apple', name: 'David Young', password: '1234' },
    { username: 'orange', name: 'Jane Fonda', password: '1234' },
    { username: 'silver', name: 'R2D2', password: '1234' }
]

const CreateNewUsers = async () => {
    await User.deleteMany({})

    const userObject = initialUsers.map(user => {
        return new User({ ...user, passwordHash: GetPasswordHash(user.password) })
    })

    const promiseArray = userObject.map(user => user.save())
    await Promise.all(promiseArray)
}

const CreateNewBlogs = async () => {
    await Blog.deleteMany({})
    const user = await usersInDb()

    const blogObject = initialBlogs.map(blog => {
        const userIndex = Math.floor(Math.random() * initialUsers.length)
        return new Blog({ ...blog, user: user[userIndex].id })
    })

    const blogsPromiseArray = blogObject.map(blog => blog.save())
    await Promise.all(blogsPromiseArray)

    const userHasBlogs = _.chain(blogObject)
        .groupBy("user")
        .map((value, key) => {
            return { userId: key, blogId: value.map(blog => blog.id) }
        })
        .value()

    const userObject = userHasBlogs.map(async (user) => {
        const foundUser = await User.findById(user.userId);
        foundUser.blogs = user.blogId
        await foundUser.save()
        return foundUser
    })

    await Promise.all(userObject)
}

const GetPasswordHash = (password) => {
    return bcrypt.hashSync(password, 10)
}

const BlogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

const UserLogIn = async (user) => {
    const result = await api
        .post('/api/login')
        .send(user)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    return result.body
}

const SelectRandomUser = async () => {
    const userIndex = Math.floor(Math.random() * initialUsers.length)
    const selectedUser = initialUsers[userIndex]
    const user = {
        username: selectedUser.username,
        password: selectedUser.password,
    }

    const loggedUser = await UserLogIn(user)

    return loggedUser
}

const SaveBlog = async (newBlog, loggedUser) => {

    const result = await api.post('/api/blogs')
        .set('Authorization', 'Bearer ' + loggedUser.token)
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    return result
}

module.exports = {
    initialBlogs, initialUsers, GetPasswordHash, BlogsInDb, SaveBlog, usersInDb,
    CreateNewUsers, CreateNewBlogs, UserLogIn, SelectRandomUser
}