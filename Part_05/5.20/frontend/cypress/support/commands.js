// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-wait-until'

Cypress.Commands.add('login', (user) => {
    cy.request('POST', 'http://localhost:3001/api/login', user)
        .then(({ body }) => {
            localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
            cy.visit('http://localhost:3000')
        })
})

Cypress.Commands.add('logout', () => {
    if (cy.contains('logout')) {
        cy.contains('logout').click()
    }
})

Cypress.Commands.add('addblog', (blog) => {
    cy.contains('new blog').click()
    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.url)
    cy.contains('create').click()
    cy.contains('view').click()
    cy.contains(blog.title)
    cy.contains(blog.author)
    cy.contains(blog.url)
    cy.contains('hide').click()
})


