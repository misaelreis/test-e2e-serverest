/// <reference types = "Cypress" />

const faker = require('faker')

describe('Testes - Cadastro de usuário', ()=>{
    const user = {
        name: faker.name.firstName(),
        email : faker.internet.email(),
        password: 'teste'
    }

    beforeEach(()=>{
        cy.visit('cadastrarusuarios')
    })

    it('valida cadastro usuário adm sucesso', ()=>{
        user.email = faker.internet.email()
        cy.createUserAdm(user.name, user.email, user.password)
        cy.get('.alert-link')
        .should('have.text', 'Cadastro realizado com sucesso')
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/admin/home'
        )
    })

    it('valida cadastro usuário sucesso', ()=>{
        user.email = faker.internet.email()
        cy.createUser(user.name, user.email, user.password)
        cy.get('.alert-link')
        .should('have.text', 'Cadastro realizado com sucesso')
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/home'
        )
    })

    it('valida cadastro sem senha', ()=>{
        cy.get('[data-testid=nome]').type(user.name)
        cy.get('[data-testid=email]').type(user.email)
        cy.get('[data-testid=cadastrar]').click()
        cy.get('.alert')
        .should('have.text', 'password não pode ficar em branco')
    })

    it('valida email invalido', ()=>{
        cy.get('[data-testid=nome]').type('Maria')
        cy.get('[data-testid=email]').type('m@m')
        cy.get('[data-testid=senha]').type('teste')
        cy.get('[data-testid=cadastrar]').click()
        cy.get('.alert')
        .should('have.text', 'email deve ser um email válido')
    })

    it('valida cadastro sem email', ()=>{
        cy.get('[data-testid=nome]').type('Maria')
        cy.get('[data-testid=senha]').type('teste')
        cy.get('[data-testid=cadastrar]').click()
        cy.get('.alert')
        .should('have.text', 'email não pode ficar em branco')
    })


    it('valida sem nome', ()=>{
        cy.get('[data-testid=email]').type('misael@email.com')
        cy.get('[data-testid=senha]').type('teste')
        cy.get('[data-testid=cadastrar]').click()
        cy.get('.alert')
        .should('have.text', 'nome não pode ficar em branco')
    })

    it('valida cadastro sem email, senha e nome', ()=>{
        cy.get('[data-testid=cadastrar]').click()
        cy.get(':nth-child(4) > .alert')
        .should('have.text', 'email não pode ficar em branco')
        cy.get(':nth-child(5) > .alert')
        .should('have.text', 'password não pode ficar em branco')
        cy.get(':nth-child(3) > .alert')
        .should('have.text', 'nome não pode ficar em branco')
    })
})