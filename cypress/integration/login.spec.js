/// <reference types = "Cypress" />
const baseUrl = Cypress.config('baseUrl');
const alertSelector = '.alert';
const passwordSelector = '[data-testid=senha]';
const emailSelector = '[data-testid=email]';
const btnLoginSelector = '[data-testid=entrar]';

describe('Testes de Login', () => {
  beforeEach(() => {
    cy.visit('');
  });

  it('valida página de login', () => {
    cy.url().should('be.equal', `${baseUrl}login`);
  });

  it('valida login adm sucesso', { tags: 'smoke' }, () => {
    cy.login(Cypress.env('admUser'), Cypress.env('password'));
    cy.url().should('be.equal', `${baseUrl}admin/home`);
  });

  it('valida login user sucesso', { tags: 'smoke' }, () => {
    cy.login(Cypress.env('user'), Cypress.env('password'));
    cy.url().should('be.equal', `${baseUrl}home`);
  });

  it('valida email incorreto', () => {
    cy.login('misael@qc.com.br', Cypress.env('password'));
    cy.contains(alertSelector, 'Email e/ou senha inválidos').should('be.visible');
  });

  it('valida senha incorreta', () => {
    cy.login(Cypress.env('user'), 'testing');
    cy.contains(alertSelector, 'Email e/ou senha inválidos').should('be.visible');
  });

  it('valida logout sucesso', { tags: 'smoke' }, () => {
    cy.login(Cypress.env('user'), Cypress.env('password'));
    cy.get('[data-testid=logout]').click();
    cy.url().should('be.equal', `${baseUrl}login`);
  });

  it('valida login sem senha', () => {
    cy.get(emailSelector).type(Cypress.env('user'));
    cy.get(btnLoginSelector).click();
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible');
  });

  it('valida email invalido', () => {
    cy.login('m@m', Cypress.env('password'));
    cy.contains(alertSelector, 'email deve ser um email válido').should('be.visible');
  });

  it('valida login sem email', () => {
    cy.get(passwordSelector).type(Cypress.env('password'));
    cy.get(btnLoginSelector).click();
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible');
  });

  it('valida login sem email e senha', () => {
    cy.get(btnLoginSelector).click();
    cy.contains(alertSelector, 'email não pode ficar em branco').should('be.visible');
    cy.contains(alertSelector, 'password não pode ficar em branco').should('be.visible');
  });
});
