/* eslint-disable no-undef */

const user = {
    name: 'Matti Luukkainen',
    username: 'mluukkai',
    password: 'salainen'
}

describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('Blogs')
    })
})
