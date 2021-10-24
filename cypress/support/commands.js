/// <reference types="Cypress" />
import 'cypress-file-upload';

Cypress.Commands.add('login', (user, password) => {
  cy.createUserFix();
  cy.get('[data-testid=email]').type(user);
  cy.get('[data-testid=senha]').type(password, { log: false });
  cy.get('[data-testid=entrar]').click();
});

Cypress.Commands.add('createUserAdm', (name, email, password) => {
  cy.get('[data-testid=nome]').type(name);
  cy.get('[data-testid=email]').type(email);
  cy.get('[data-testid=password]').type(password);
  cy.get('[data-testid=checkbox]').check();
  cy.get('[data-testid=cadastrar]').click();
});

Cypress.Commands.add('createUser', (name, email, password) => {
  cy.get('[data-testid=nome]').type(name);
  cy.get('[data-testid=email]').type(email);
  cy.get('[data-testid=password]').type(password);
  cy.get('[data-testid=cadastrar]').click();
});

Cypress.Commands.add('createUserAdminAdm', (name, email, password) => {
  cy.get('[data-testid=nome]').type(name);
  cy.get('[data-testid=email]').type(email);
  cy.get('[data-testid=password]').type(password);
  cy.get('[data-testid=checkbox]').check();
  cy.get('[data-testid=cadastrarUsuario]').click();
});

Cypress.Commands.add('createAdminUser', (name, email, password) => {
  cy.get('[data-testid=nome]').type(name);
  cy.get('[data-testid=email]').type(email);
  cy.get('[data-testid=password]').type(password);
  cy.get('[data-testid=cadastrarUsuario]').click();
});
