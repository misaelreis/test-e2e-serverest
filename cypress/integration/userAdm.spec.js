/// <reference types = "Cypress" />

const faker = require('faker')

describe('Testes - Cadastro de usuário Adm', ()=>{
    //Não tem mensagem de sucesso
    const user = {
        name: faker.name.firstName(),
        email : faker.internet.email(),
        password: 'teste'
    }

    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/cadastrarusuarios')
    })

    it('valida cadastro usuário adm sucesso', ()=>{
        user.email = faker.internet.email()
        cy.createUserAdminAdm(user.name, user.email, user.password)
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/admin/listarusuarios'
        )
    })

    it('valida cadastro usuário sucesso', ()=>{
        user.email = faker.internet.email()
        cy.createAdminUser(user.name, user.email, user.password)
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/admin/listarusuarios'
        )
    })

    it('valida cadastro sem senha', ()=>{
        cy.get('[data-testid=nome]').type(user.name)
        cy.get('[data-testid=email]').type(user.email)
        cy.get('[data-testid=cadastrarUsuario]').click()
        cy.get('.alert')
        .should('have.text', 'password não pode ficar em branco')
    })

    it('valida email invalido', ()=>{
        cy.get('[data-testid=nome]').type(user.name)
        cy.get('[data-testid=email]').type('m@m')
        cy.get('[data-testid=senha]').type('teste')
        cy.get('[data-testid=cadastrarUsuario]').click()
        cy.get('.alert')
        .should('have.text', 'email deve ser um email válido')
    })

    it('valida cadastro sem email', ()=>{
        cy.get('[data-testid=nome]').type(user.name)
        cy.get('[data-testid=senha]').type('teste')
        cy.get('[data-testid=cadastrarUsuario]').click()
        cy.get('.alert')
        .should('have.text', 'email não pode ficar em branco')
    })


    it('valida sem nome', ()=>{
        cy.get('[data-testid=email]').type('misael@mailer.com')
        cy.get('[data-testid=senha]').type('teste')
        cy.get('[data-testid=cadastrarUsuario]').click()
        cy.get('.alert')
        .should('have.text', 'nome não pode ficar em branco')
    })

    it('valida cadastro sem email, senha e nome', ()=>{
        cy.get('[data-testid=cadastrarUsuario]').click()
        cy.get(':nth-child(1) > .alert')
        .should('have.text', 'nome não pode ficar em branco')
        cy.get(':nth-child(3) > .alert')
        .should('have.text', 'password não pode ficar em branco')
        cy.get(':nth-child(2) > .alert')
        .should('have.text', 'email não pode ficar em branco')
    })
})

describe('Testes - Listar usuários Adm', ()=>{

    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/listarusuarios')
    })

    it('valida página - listagem de usuários', ()=>{
        cy.get('h1').should('have.text', 'Lista dos usuários')
        cy.get('thead > tr > :nth-child(1)').should('have.text', 'Nome')
        cy.get('thead > tr > :nth-child(2)').should('have.text', 'Email')
        cy.get('thead > tr > :nth-child(3)').should('have.text', 'Senha')
        cy.get('thead > tr > :nth-child(4)').should('have.text', 'Administrador')
        cy.get('thead > tr > :nth-child(5)').should('have.text', 'Ações')
        cy.get(':nth-child(1) > :nth-child(5) > .row > .btn-info').should('be.visible')
        cy.get(':nth-child(4) > :nth-child(5) > .row > .btn-danger').should('be.visible')
    })
})

describe('Testes - Editar usuários', ()=>{
    //Feature não desenvolvida ainda
})

describe('Testes - Listar usuários Adm', ()=>{

    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/listarusuarios')
    })

    it('Teste excluir primeiro usuário', ()=>{
        cy.get(':nth-child(4) > :nth-child(5) > .row > .btn-danger').click()
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/admin/listarusuarios'
        )
        //não tem mensagem de exclusão de usuário
    })
})