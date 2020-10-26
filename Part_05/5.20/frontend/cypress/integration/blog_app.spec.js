/* eslint-disable no-undef */

const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
}

const blog = {
    id: '1234567',
    title: 'Generative DEsign',
    author: 'onformative',
    url: 'http://www.generative-gestaltung.de/2/',
    likes: 10,
    user: user.name
}

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
            cy.addblog(blog)
        })

        it('A blog can be liked', function () {
            cy.contains(`${user.name} logged in`)
            cy.addblog(blog)
            cy.contains('view').click()
            cy.contains('like').click()
            cy.contains('1 like')
        })
    })
})