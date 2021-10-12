/// <reference types = "Cypress" />

const faker = require('faker');

const baseUrl = Cypress.config('baseUrl');
const imageSelector = '[data-testid=imagem]';
const nameSelector = '[data-testid=nome]';
const descriptionSelector = '[data-testid=descricao]';
const priceSelector = '[data-testid=preco]';
const alertSelector = '.alert';
const quantitySelector = '[data-testid=quantidade]';
const btnCreateSelector = '[data-testid=cadastarProdutos]';

describe('Testes - Cadastro de produtos', () => {
  const prod = {
    nome: faker.name.firstName(),
    preco: 10,
    descricao: faker.internet.email(),
    quantidade: 10,
  };

  beforeEach(() => {
    cy.createLoginAdm();
    cy.visit('admin/cadastrarprodutos');
  });

  it('valida página de cadastro', () => {
    cy.contains('h1', 'Cadastro de Produtos').should('be.visible');
  });

  it('Cadastrar produto com sucesso', { tags: 'smoke' }, () => {
    cy.get(imageSelector).attachFile('cy.png');
    cy.get(nameSelector).type(prod.nome);
    cy.get(descriptionSelector).type(prod.descricao);
    cy.get(priceSelector).type(prod.preco);
    cy.get(quantitySelector).type(prod.quantidade);
    cy.get(btnCreateSelector).click();
    cy.url().should('be.equal', `${baseUrl}admin/listarprodutos`);
  });

  it('Cadastrar produto sem nome', () => {
    cy.get(descriptionSelector).type(prod.descricao);
    cy.get(priceSelector).type(prod.preco);
    cy.get(quantitySelector).type(prod.quantidade);
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible');
  });

  it('Cadastrar produto sem descrição', () => {
    cy.get(nameSelector).type(prod.nome);
    cy.get(priceSelector).type(prod.preco);
    cy.get(quantitySelector).type(prod.quantidade);
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'descricao não pode ficar em branco').should('be.visible');
  });

  it('Cadastrar produto sem preço', () => {
    cy.get(imageSelector).attachFile('cy.png');
    cy.get(nameSelector).type(prod.nome);
    cy.get(descriptionSelector).type(prod.descricao);
    cy.get(quantitySelector).type(prod.quantidade);
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'preco deve ser um número').should('be.visible');
  });

  it('Cadastrar produto tipo de preço incorreto', () => {
    cy.get(imageSelector).attachFile('cy.png');
    cy.get(nameSelector).type(prod.nome);
    cy.get(descriptionSelector).type(prod.descricao);
    cy.get(priceSelector).type('a');
    cy.get(quantitySelector).type(prod.quantidade);
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'preco deve ser um número').should('be.visible');
  });

  it('Cadastrar produto sem quantidade', () => {
    cy.get(imageSelector).attachFile('cy.png');
    cy.get(nameSelector).type(prod.nome);
    cy.get(descriptionSelector).type(prod.descricao);
    cy.get(priceSelector).type(prod.preco);
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'quantidade deve ser um número').should('be.visible');
  });

  it('Cadastrar produtos - campos obrigatórios', () => {
    cy.get(btnCreateSelector).click();
    cy.contains(alertSelector, 'preco deve ser um número').should('be.visible');
    cy.contains(alertSelector, 'quantidade deve ser um número').should('be.visible');
    cy.contains(alertSelector, 'nome não pode ficar em branco').should('be.visible');
    cy.contains(alertSelector, 'descricao não pode ficar em branco').should('be.visible');
  });
});

describe('Testes - Excluir produtos', () => {
  beforeEach(() => {
    cy.createLoginAdm();
    cy.visit('admin/listarprodutos');
  });

  it('valida página de listagem', () => {
    cy.contains('h1', 'Lista dos Produtos').should('be.visible');
  });

  it('excluir produto', () => {
    cy.get(':nth-child(1) > :nth-child(6) > .row > .btn-danger').click();
  });

  describe('Testes - Editar produtos', () => {
    // funcionalidade não desenvolvida ainda
    beforeEach(() => {
      cy.createLoginAdm();
      cy.visit('admin/listarprodutos');
    });
  });
});
