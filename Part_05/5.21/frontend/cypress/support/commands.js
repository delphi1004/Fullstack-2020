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
    cy.contains('logout').click()
})

Cypress.Commands.add('addblogDirectly', (blog) => {
    cy.request({
        url: 'http://localhost:3001/api/blogs',
        method: 'POST',
        body: blog,
        failOnStatusCode: false,
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
    }).then(res => res.body)
})

Cypress.Commands.add('addblog', (blog) => {
    cy.wait(3500)
    cy.contains('new blog').click()
    cy.get('#title').type(blog.title)
    cy.get('#author').type(blog.author)
    cy.get('#url').type(blog.url)
    cy.contains('create').click()
})

