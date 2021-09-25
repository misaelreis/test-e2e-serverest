/// <reference types = "Cypress" />

const faker = require('faker');

const baseUrl = Cypress.config('baseUrl');
const alertSelector = '.alert';
const passwordSelector = '[data-testid=senha]';
const nameSelector = '[data-testid=nome]';
const emailSelector = '[data-testid=email]';
const btnCreateSelector = '[data-testid=cadastrarUsuario]';

describe('Testes - Cadastro de usuário Adm', () => {
  // Não tem mensagem de sucesso
  const user = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: 'teste',
  };

  beforeEach(() => {
    cy.createLoginAdm();
    cy.visit('admin/cadastrarusuarios');
  });

  it('valida cadastro usuário adm sucesso', () => {
    user.email = faker.internet.email();
    cy.createUserAdminAdm(user.name, user.email, user.password);
    cy.url().should('be.equal', `${baseUrl}admin/listarusuarios`);
  });

  it('valida cadastro usuário sucesso', () => {
    user.email = faker.internet.email();
    cy.createAdminUser(user.name, user.email, user.password);
    cy.url().should('be.equal', `${baseUrl}admin/listarusuarios`);
  });

  it('valida cadastro sem senha', () => {
    cy.get(nameSelector).type(user.name);
    cy.get(emailSelector).type(user.email);
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible');
  });

  it('valida email invalido', () => {
    cy.get(nameSelector).type(user.name);
    cy.get(emailSelector).type('m@m');
    cy.get(passwordSelector).type('teste');
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible');
  });

  it('valida cadastro sem email', () => {
    cy.get(nameSelector).type(user.name);
    cy.get(passwordSelector).type('teste');
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible');
  });

  it('valida sem nome', () => {
    cy.get(emailSelector).type('misael@mailer.com');
    cy.get(passwordSelector).type('teste');
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible');
  });

  it('valida cadastro sem email, senha e nome', () => {
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible');
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible');
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible');
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible');
  });
});

describe('Testes - Listar usuários Adm', () => {
  beforeEach(() => {
    cy.createLoginAdm();
    cy.visit('admin/listarusuarios');
  });

  it('valida página - listagem de usuários', () => {
    cy.contains('h1', 'Lista dos usuários').should('be.visible');
    cy.contains('thead > tr > :nth-child(1)', 'Nome').should('be.visible');
    cy.contains('thead > tr > :nth-child(2)', 'Email').should('be.visible');
    cy.contains('thead > tr > :nth-child(3)', 'Senha').should('be.visible');
    cy.contains('thead > tr > :nth-child(4)', 'Administrador').should('be.visible');
    cy.contains('thead > tr > :nth-child(5)', 'Ações').should('be.visible');
    cy.get(':nth-child(1) > :nth-child(5) > .row > .btn-info').should('be.visible');
    cy.get(':nth-child(4) > :nth-child(5) > .row > .btn-danger').should('be.visible');
  });
});

describe('Testes - Editar usuários', () => {
  // Feature não desenvolvida ainda
});

describe('Testes - Listar usuários Adm', () => {
  beforeEach(() => {
    cy.createLoginAdm();
    cy.visit('admin/listarusuarios');
  });

  it('Teste excluir primeiro usuário', () => {
    cy.get(':nth-child(4) > :nth-child(5) > .row > .btn-danger').click();
    cy.url().should('be.equal', `${baseUrl}admin/listarusuarios`);
    // não tem mensagem de exclusão de usuário
  });
});
