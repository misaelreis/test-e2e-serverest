/// <reference types = "Cypress" />

const faker = require('faker');

const baseUrl = Cypress.config('baseUrl');
const alertSelector = '.alert';
const passwordSelector = '[data-testid=senha]';
const nameSelector = '[data-testid=nome]';
const emailSelector = '[data-testid=email]';
const btnCreateSelector = '[data-testid=cadastrar]';

describe('Testes - Cadastro de usuário', () => {
  const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'teste',
  };

  beforeEach(() => {
    cy.visit('cadastrarusuarios');
  });

  it('valida cadastro usuário adm sucesso', { tags: 'smoke' }, () => {
    user.email = faker.internet.email();
    cy.createUserAdm(user.name, user.email, user.password);
    cy.contains(alertSelector, 'Cadastro realizado com sucesso').should('be.visible');
    cy.url().should('be.equal', `${baseUrl}admin/home`);
  });

  it('valida cadastro usuário sucesso', { tags: 'smoke' }, () => {
    user.email = faker.internet.email();
    cy.createUser(user.name, user.email, user.password);
    cy.contains(alertSelector, 'Cadastro realizado com sucesso').should('be.visible');
    cy.url().should('be.equal', `${baseUrl}home`);
  });

  it('valida cadastro sem senha', () => {
    cy.get(nameSelector).type(user.name);
    cy.get(emailSelector).type(user.email);
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible');
  });

  it('valida email invalido', () => {
    cy.get(nameSelector).type('Maria');
    cy.get(emailSelector).type('m@m');
    cy.get(passwordSelector).type('teste');
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible');
  });

  it('valida cadastro sem email', () => {
    cy.get(nameSelector).type('Maria');
    cy.get(passwordSelector).type('teste');
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible');
  });

  it('valida sem nome', () => {
    cy.get(emailSelector).type('misael@email.com');
    cy.get(passwordSelector).type('teste');
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible');
  });

  it('valida cadastro sem email, senha e nome', () => {
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible');
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible');
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible');
  });
});
