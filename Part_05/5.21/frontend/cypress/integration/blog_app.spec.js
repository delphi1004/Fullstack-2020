/* eslint-disable no-undef */

const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
}

const blogs = [
    { title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 0 },
    { title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5 },
    { title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12 },
    { title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10 },
    { title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0 },
    { title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2 }
]

describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.login(user)
    })

    describe('show login', function () {
        it('login form is shown', function () {
            cy.logout()
            cy.contains('Blogs')
        })
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.logout()
            cy.contains('login').click()
            cy.get('#username').type(user.username)
            cy.get('#password').type(user.password)
            cy.get('#login-button').click()
            cy.contains(`${user.name} logged in`)
            cy.logout()
        })

        it('fails with wrong credentials', function () {
            cy.logout()
            cy.contains('login').click()
            cy.get('#username').type(user.username)
            cy.get('#password').type('test')
            cy.get('#login-button').click()
            cy.get('#notification')
                .should('contain', 'wrong username or password')
                .and('have.css', 'color', 'rgb(0, 128, 0)')
            cy.get('html').should('not.contain', `${user.name} logged in`)
        })
    })

    describe('When logged in', function () {
        it('A blog can be created', function () {
            cy.contains(`${user.name} logged in`)
            cy.addblog(blogs[0])
            cy.addblog(blogs[1])
            cy.contains(blogs[0].title)
            cy.contains(blogs[1].title)
        })
    })

    describe('When logged in', function () {
        it('A blog can be liked', function () {
            cy.contains(`${user.name} logged in`)
            cy.addblogDirectly(blogs[0])
            cy.visit('http://localhost:3000')
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1 like')
        })
    })

    describe('When logged in', function () {
        it('user can delete it', function () {
            cy.contains(`${user.name} logged in`)
            cy.addblogDirectly(blogs[0])
            cy.visit('http://localhost:3000')
            cy.contains('view').click()
            cy.contains('remove').click()
            cy.contains(`${blogs[0].title} removed`)
        })

        it('wrong user can not delete it', function () {
            cy.addblogDirectly(blogs[0])
            cy.addblogDirectly(blogs[1])
            cy.visit('http://localhost:3000')

            cy.addblogDirectly(blogs[2]).then(res => {
                const targetUrl = `http://localhost:3001/api/blogs/${res.id}`
                cy.request({
                    failOnStatusCode: false,
                    url: targetUrl,
                    method: 'DELETE',
                    headers: {
                        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}12345`
                    }
                }).its('body').should('include', { error: 'invalid token' })
            })

            cy.visit('http://localhost:3000')
        })
    })
})