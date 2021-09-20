/// <reference types = "Cypress" />
const baseUrl = Cypress.config('baseUrl')
const btnCarSelecto = '.card-link'

describe('Testes - Acessar lista de compra', ()=>{

    beforeEach(()=>{
        cy.createLoginUser()
        cy.visit('minhaListaDeProdutos')
    })

    it('Valida lista de compra', ()=>{
        cy.contains('h1', 'Lista de Compras').should('be.visible')
        cy.get('[data-testid=shopping-cart-empty-message]').should('have.text', 
        'Seu carrinho está vazio')
    })

    it('Voltar para a home', ()=>{
        cy.get('[data-testid=paginaInicial]').click()
        cy.url().should('be.equal',`${baseUrl}home`)
    })
})

describe('Testes - Acessar lista de compra com produto', ()=>{

    beforeEach(()=>{
        cy.createProduct()
        cy.createLoginUser()
        cy.visit('home')
        cy.get('[data-testid=pesquisar]').type('Teste Zael Uai')
        cy.get('[data-testid=botaoPesquisar]').click()
    })

    it('Valida detalhes produto - voltar', ()=>{
        cy.get(btnCarSelecto).click()
        cy.contains('h1', 'Detalhes do produto').should('be.visible')
        cy.get('[data-testid=product-detail-name]').should('have.text', 'Teste Zael Uai')
        cy.get('[data-testid=voltarHome]').click()
        cy.url().should('be.equal',`${baseUrl}home`)
    })

    it('Valida detalhes produto - adicionar lista', ()=>{
        cy.get(btnCarSelecto).click()
        cy.contains('h1', 'Detalhes do produto').should('be.visible')
        cy.get('[data-testid=product-detail-name]').should('have.text', 'Teste Zael Uai')
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.url().should('be.equal',`${baseUrl}minhaListaDeProdutos`)
        cy.get('[data-testid=limparLista]').click()
        cy.contains('[data-testid=shopping-cart-empty-message]','Seu carrinho está vazio').should('be.visible')
    })

    it('Valida detalhes produto - adicionar lista e carrinho', ()=>{
        cy.get(btnCarSelecto).click()
        cy.contains('h1', 'Detalhes do produto').should('be.visible')
        cy.get('[data-testid=product-detail-name]').should('have.text','Teste Zael Uai')
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.get('[data-testid="adicionar carrinho"]').click()
        cy.contains('h1', 'Em construção aguarde').should('be.visible')
    })

    it('Valida detalhes produto - Adicionar produtos', ()=>{
        cy.get(btnCarSelecto).click()
        cy.contains('h1', 'Detalhes do produto').should('be.visible')
        cy.get('[data-testid=product-detail-name]').should('have.text','Teste Zael Uai')
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.get('[data-testid=product-increase-quantity]').click()
        cy.get('.row > :nth-child(3)').should('have.text',2)
    })


    it('Valida detalhes produto - Remover produtos', ()=>{
        cy.get(btnCarSelecto).click()
        cy.contains('h1', 'Detalhes do produto').should('be.visible')
        cy.get('[data-testid=product-detail-name]').should('have.text','Teste Zael Uai')
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.get('[data-testid=product-increase-quantity]').click()
        cy.get('.row > :nth-child(3)').should('have.text',2)
        cy.get('[data-testid=product-decrease-quantity]').click()
        cy.get('.row > :nth-child(3)').should('have.text',1)
    })

    it('Valida detalhes produto - Adicionar Lista', ()=>{
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.url().should('be.equal',`${baseUrl}minhaListaDeProdutos`)
    })
})