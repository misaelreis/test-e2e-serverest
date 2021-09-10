/// <reference types="Cypress" />
import login from '../page/login.page'
import createUser from '../page/createUser.page'

Cypress.Commands.add('login', (user, password) => {
    cy.CreateUserFix()
    cy.get(login.imputEmail).type(user)
    cy.get(login.imputSenha).type(password)
    cy.get(login.btnEntrar).click()
})

Cypress.Commands.add('createUserAdm', (name, email, password) => {
    cy.get(createUser.imputNome).type(name)
    cy.get(createUser.imputEmail).type(email)
    cy.get(createUser.imputSenha).type(password)
    cy.get(createUser.btnCadastrarAdm).click()
    cy.get(createUser.btnCadastrar).click()
})

Cypress.Commands.add('createUser', (name, email, password) => {
    cy.get(createUser.imputNome).type(name)
    cy.get(createUser.imputEmail).type(email)
    cy.get(createUser.imputSenha).type(password)
    cy.get(createUser.btnCadastrar).click()
})
