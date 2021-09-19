/// <reference types = "Cypress" />

describe('Testes de Login', ()=>{

    beforeEach(()=>{
        cy.visit('')
    })
    
    it('valida página de login', ()=>{
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/login'
        )
    })

    it('valida login adm sucesso', ()=>{
        cy.login(Cypress.env('admUser'), Cypress.env('password'))
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/admin/home'
        )
    })

    it('valida login user sucesso', ()=>{
        cy.login(Cypress.env('user'), Cypress.env('password'))
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/home'
        )
    })

    it('valida email incorreto', ()=>{
        cy.login('misael@qc.com.br', Cypress.env('password'))
        cy.get('.alert')
        .should('have.text', 'Email e/ou senha inválidos')
    })

    it('valida senha incorreta', ()=>{
        cy.login(Cypress.env('user'), 'testing')
        cy.get('.alert')
        .should('have.text', 'Email e/ou senha inválidos')
    })

    it('valida logout sucesso', ()=>{
        cy.login(Cypress.env('user'), Cypress.env('password'))
        cy.get('[data-testid=logout]').click()
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/login'
        )
    })

    it('valida login sem senha', ()=>{
        cy.get('[data-testid=email]').type(Cypress.env('user'))
        cy.get('[data-testid=entrar]').click()
        cy.get('.alert')
        .should('have.text', 'password não pode ficar em branco')
    })

    it('valida email invalido', ()=>{
        cy.login('m@m', Cypress.env('password'))
        cy.get('.alert')
        .should('have.text', 'email deve ser um email válido')
    })

    it('valida login sem email', ()=>{
        cy.get('[data-testid=senha]').type(Cypress.env('password'))
        cy.get('[data-testid=entrar]').click()
        cy.get('.alert')
        .should('have.text', 'email não pode ficar em branco')
    })

    it('valida login sem email e senha', ()=>{
        cy.get('[data-testid=entrar]').click()
        cy.get(':nth-child(4) > .alert')
        .should('have.text', 'email não pode ficar em branco')
        cy.get(':nth-child(5) > .alert')
        .should('have.text', 'password não pode ficar em branco')
    })
})