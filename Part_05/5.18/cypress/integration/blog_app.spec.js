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
  })


  it('login form is shown', function () {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type(user.password)
      cy.get('#login-button').click()
      cy.contains(`${user.name} logged in`)
      cy.contains('logout').click()
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type(user.username)
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
      cy.get('#notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('html').should('not.contain', `${user.name} logged in`)
    })
  })
})
