/// <reference types = "Cypress" />
const baseUrl = Cypress.config('baseUrl');

describe('Smoke teste adm', () => {
  beforeEach('Login adm', () => {
    cy.visit('');
    cy.login(Cypress.env('admUser'), Cypress.env('password'));
  });

  it('Teste realiza login e valida home', () => {
    cy.url().should('be.equal', `${baseUrl}admin/home`);
  });

  it('Teste valida página - cadastro de produto', () => {
    cy.visit('admin/cadastrarprodutos');
    cy.contains('h1', 'Cadastro de Produtos').should('be.visible');
  });

  it('Teste valida página - cadastro de usuário', () => {
    cy.visit('admin/cadastrarusuarios');
    cy.contains('h1', 'Cadastro de usuários').should('be.visible');
  });
});

describe('Smoke teste user', () => {
  beforeEach('Login user', () => {
    cy.visit('');
    cy.login(Cypress.env('user'), Cypress.env('password'));
  });

  it('Teste realiza login e valida home', () => {
    cy.url().should('be.equal', `${baseUrl}home`);
  });

  it('Teste valida lista de compra', () => {
    cy.visit('minhaListaDeProdutos');
    cy.contains('h1', 'Lista de Compras').should('be.visible');
  });
});
