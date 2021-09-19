/// <reference types = "Cypress" />

describe('Testes - Acessar lista de compra', ()=>{

    beforeEach(()=>{
        cy.createLoginUser()
        cy.visit('minhaListaDeProdutos')
    })

    it('Valida lista de compra', ()=>{
        cy.get('h1').should('have.text', 'Lista de Compras')
        cy.get('[data-testid=shopping-cart-empty-message]').should('have.text', 
        'Seu carrinho está vazio')
    })

    it('Voltar para a home', ()=>{
        cy.get('[data-testid=paginaInicial]').click()
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/home'
        )
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
        cy.get('.card-link').click()
        cy.get('h1').should('have.text', 'Detalhes do produto')
        cy.get('[data-testid=product-detail-name]').should('have.text', 'Teste Zael Uai')
        cy.get('[data-testid=voltarHome]').click()
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/home'
        )
    })

    it('Valida detalhes produto - adicionar lista', ()=>{
        cy.get('.card-link').click()
        cy.get('h1').should('have.text', 'Detalhes do produto')
        cy.get('[data-testid=product-detail-name]').should('have.text', 'Teste Zael Uai')
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/minhaListaDeProdutos'
        )
        cy.get('[data-testid=limparLista]').click()
        cy.get('[data-testid=shopping-cart-empty-message]').should('have.text',
         'Seu carrinho está vazio')
    })

    it('Valida detalhes produto - adicionar lista e carrinho', ()=>{
        cy.get('.card-link').click()
        cy.get('h1').should('have.text','Detalhes do produto')
        cy.get('[data-testid=product-detail-name]').should('have.text','Teste Zael Uai')
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.get('[data-testid="adicionar carrinho"]').click()
        cy.get('h1').should('have.text', 'Em construção aguarde')
    })

    it('Valida detalhes produto - Adicionar produtos', ()=>{
        cy.get('.card-link').click()
        cy.get('h1').should('have.text','Detalhes do produto')
        cy.get('[data-testid=product-detail-name]').should('have.text','Teste Zael Uai')
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.get('[data-testid=product-increase-quantity]').click()
        cy.get('.row > :nth-child(3)').should('have.text',2)
    })


    it('Valida detalhes produto - Remover produtos', ()=>{
        cy.get('.card-link').click()
        cy.get('h1').should('have.text','Detalhes do produto')
        cy.get('[data-testid=product-detail-name]').should('have.text','Teste Zael Uai')
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.get('[data-testid=product-increase-quantity]').click()
        cy.get('.row > :nth-child(3)').should('have.text',2)
        cy.get('[data-testid=product-decrease-quantity]').click()
        cy.get('.row > :nth-child(3)').should('have.text',1)
    })

    it('Valida detalhes produto - Adicionar Lista', ()=>{
        cy.get('[data-testid=adicionarNaLista]').click()
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/minhaListaDeProdutos'
        )
    })
})