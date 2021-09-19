/// <reference types = "Cypress" />

const faker = require('faker')

describe('Testes - Cadastro de produtos', ()=>{
    const prod = {
        nome: faker.name.firstName(),
        preco: 10,
        descricao : faker.internet.email(),
        quantidade: 10,
    }
  
    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/cadastrarprodutos')
    })

    it('valida página de cadastro', ()=>{
        cy.get('h1').should('have.text', 'Cadastro de Produtos')
    })

    it('Cadastrar produto com sucesso', ()=>{
        cy.get('[data-testid=imagem]').as('fileInput').attachFile('cy.png')
        cy.get('[data-testid=nome]').type(prod.nome)
        cy.get('[data-testid=descricao]').type(prod.descricao)
        cy.get('[data-testid=preco]').type(prod.preco)
        cy.get('[data-testid=quantidade]').type(prod.quantidade)
        cy.get('[data-testid=cadastarProdutos]').click()
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/admin/listarprodutos'
        )
    })

    it('Cadastrar produto sem nome', ()=>{
        cy.get('[data-testid=descricao]').type(prod.descricao)
        cy.get('[data-testid=preco]').type(prod.preco)
        cy.get('[data-testid=quantidade]').type(prod.quantidade)
        cy.get('[data-testid=cadastarProdutos]').click()
        cy.get('.alert')
        .should('have.text', 'nome não pode ficar em branco')
    })

    it('Cadastrar produto sem descrição', ()=>{
        cy.get('[data-testid=nome]').type(prod.nome)
        cy.get('[data-testid=preco]').type(prod.preco)
        cy.get('[data-testid=quantidade]').type(prod.quantidade)
        cy.get('[data-testid=cadastarProdutos]').click()
        cy.get('.alert')
        .should('have.text', 'descricao não pode ficar em branco')
    })

    it('Cadastrar produto sem preço', ()=>{
        cy.get('[data-testid=imagem]').as('fileInput').attachFile('cy.png')
        cy.get('[data-testid=nome]').type(prod.nome)
        cy.get('[data-testid=descricao]').type(prod.descricao)
        cy.get('[data-testid=quantidade]').type(prod.quantidade)
        cy.get('[data-testid=cadastarProdutos]').click()
        cy.get('.alert')
        .should('have.text', 'preco deve ser um número')
    })

    it('Cadastrar produto tipo de preço incorreto', ()=>{
        cy.get('[data-testid=imagem]').as('fileInput').attachFile('cy.png')
        cy.get('[data-testid=nome]').type(prod.nome)
        cy.get('[data-testid=descricao]').type(prod.descricao)
        cy.get('[data-testid=preco]').type('a')
        cy.get('[data-testid=quantidade]').type(prod.quantidade)
        cy.get('[data-testid=cadastarProdutos]').click()
        cy.get('.alert')
        .should('have.text', 'preco deve ser um número')
    })

    it('Cadastrar produto sem quantidade', ()=>{
        cy.get('[data-testid=imagem]').as('fileInput').attachFile('cy.png')
        cy.get('[data-testid=nome]').type(prod.nome)
        cy.get('[data-testid=descricao]').type(prod.descricao)
        cy.get('[data-testid=preco]').type(prod.preco)
        cy.get('[data-testid=cadastarProdutos]').click()
        cy.get('.alert')
        .should('have.text', 'quantidade deve ser um número')
    })

    it('Cadastrar produtos - campos obrigatórios', ()=>{
        cy.get('[data-testid=cadastarProdutos]').click()
        cy.get(':nth-child(4) > .alert')
        .should('have.text', 'quantidade deve ser um número')
        cy.get(':nth-child(2) > .alert')
        .should('have.text', 'preco deve ser um número')
        cy.get(':nth-child(1) > .alert')
        .should('have.text', 'nome não pode ficar em branco')
        cy.get(':nth-child(3) > .alert')
        .should('have.text', 'descricao não pode ficar em branco')
    })
})

describe('Testes - Excluir produtos', ()=>{
  
    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/listarprodutos')
    })

    it('valida página de listagem', ()=>{
        cy.get('h1').should('have.text', 'Lista dos Produtos')
    })

    it('excluir produto', ()=>{
        cy.get(':nth-child(1) > :nth-child(6) > .row > .btn-danger').click()
    })

    describe('Testes - Editar produtos', ()=>{

        //funcionalidade não desenvolvida ainda
        beforeEach(()=>{
            cy.createLoginAdm()
            cy.visit('admin/listarprodutos')
        })

    })
})