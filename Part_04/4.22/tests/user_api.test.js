const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const app = require('../app')
const logger = require('../utils/logger')
const api = supertest(app)
const Helper = require('./test_helper')

beforeEach(async () => {
    console.log('clear users and add several users')
    await Helper.CreateNewUsers()
})

describe('Testing for adding user(s)', () => {

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await Helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salainen',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('`username` to be unique')

        const usersAtEnd = await Helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await Helper.usersInDb()

        const newUser = {
            username: 'fresh',
            name: 'Mike Kim',
            password: '1234'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await Helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(user => user.username)
        expect(usernames).toContain(newUser.username)
    })

    test('validation with insufficient length of username', async () => {
        const usersAtStart = await Helper.usersInDb()

        const newUser = {
            username: 'a',
            name: 'John Lee',
            password: '1234'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be logner')
        const usersAtEnd = await Helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('validation with insufficient length of password', async () => {
        const usersAtStart = await Helper.usersInDb()

        const newUser = {
            username: 'insufficient',
            name: 'Tim Bolton',
            password: '12'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('Password validation failed')

        const usersAtEnd = await Helper.usersInDb()
        expect(usersAtEnd.length).toBe(usersAtStart.length)
    })
})

describe('Testing for user logging', () => {

    test('login validation', async () => {
        const userIndex = Math.floor(Math.random() * Helper.initialUsers.length)
        const selectedUser = Helper.initialUsers[userIndex]

        const user = {
            username: selectedUser.username,
            password: selectedUser.password
        }

        const result = await Helper.UserLogIn(user)
    
        expect(result.username).toBe(selectedUser.username)
        expect(result.name).toBe(selectedUser.name)
    })

    test('invalid login with empty password', async () => {
        const userIndex = Math.floor(Math.random() * Helper.initialUsers.length)
        const selectedUser = Helper.initialUsers[userIndex]

        const user = {
            username: selectedUser.username,
            password:''
        }

        const result = await api
            .post('/api/login')
            .send(user)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    
            expect(result.body.error).toContain('invalid username or password')
    })

    test('invalid login with wrong user name', async () => {
        const userIndex = Math.floor(Math.random() * Helper.initialUsers.length)
        const selectedUser = Helper.initialUsers[userIndex]

        const user = {
            username: 'dummy',
            password: selectedUser.password
        }

        const result = await api
            .post('/api/login')
            .send(user)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    
            expect(result.body.error).toContain('invalid username or password')
    })
})

afterAll(() => {
    mongoose.connection.close()
})