/* eslint-disable no-undef */
describe('Blog app', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
    })

    const user = {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
    }

    it('front page can be opened', function () {
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
        cy.contains('Blogs')
    })
})
