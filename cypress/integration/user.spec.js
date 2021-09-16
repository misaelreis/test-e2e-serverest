/// <reference types = "Cypress" />

import createUser from '../page/user.page'
const faker = require('faker')

import{ visit, validaTexto, validaUrl, clicar, digitar, validaElementoVisivel }from "../actions/principal.action";
import userPage from '../page/user.page'
import login from '../page/login.page';

describe('Testes - Cadastro de usuário', ()=>{
    const user = {
        name: faker.name.firstName(),
        email : faker.internet.email(),
        password: 'teste'
    }

    beforeEach(()=>{
        visit()
        clicar(userPage.btnCadastrar)
    })

    it('valida página de cadastro', ()=>{
        validaUrl('https://front.serverest.dev/cadastrarusuarios')
    })

    it('valida cadastro usuário adm sucesso', ()=>{
        user.email = faker.internet.email()
        cy.createUserAdm(user.name, user.email, user.password)
        validaElementoVisivel(login.textAlert)
        validaTexto(userPage.textAlertLink, 'Cadastro realizado com sucesso')
        validaUrl('https://front.serverest.dev/admin/home')
    })

    it('valida cadastro usuário sucesso', ()=>{
        user.email = faker.internet.email()
        cy.createUser(user.name, user.email, user.password)
        validaElementoVisivel(login.textAlert)
        validaTexto(userPage.textAlertLink, 'Cadastro realizado com sucesso')
        validaUrl('https://front.serverest.dev/home')
    })

    it('valida cadastro sem senha', ()=>{
        cy.get(createUser.imputNome).type(user.name)
        cy.get(createUser.imputEmail).type(user.email)
        cy.get(createUser.btnCadastrar).click()
        validaTexto(login.textAlert, 'password não pode ficar em branco')
    })

    it('valida email invalido', ()=>{
        cy.get(createUser.imputNome).type('Maria')
        cy.get(createUser.imputEmail).type('m@m')
        cy.get(createUser.imputSenha).type('teste')
        cy.get(createUser.btnCadastrar).click()
        validaTexto(login.textAlert, 'email deve ser um email válido')
    })

    it('valida cadastro sem email', ()=>{
        cy.get(createUser.imputNome).type('Maria')
        cy.get(createUser.imputSenha).type('teste')
        cy.get(createUser.btnCadastrar).click()
        validaTexto(login.textAlert, 'email não pode ficar em branco')
    })


    it('valida sem nome', ()=>{
        cy.get(createUser.imputEmail).type('misael@email.com')
        cy.get(createUser.imputSenha).type('teste')
        cy.get(createUser.btnCadastrar).click()
        validaTexto(login.textAlert, 'nome não pode ficar em branco')
    })

    it('valida cadastro sem email, senha e nome', ()=>{
        cy.get(createUser.btnCadastrar).click()
        validaTexto(login.textAlertEmail, 'email não pode ficar em branco')
        validaTexto(login.textAlertPassword, 'password não pode ficar em branco')
        validaTexto(login.textAlertnome, 'nome não pode ficar em branco')
    })
})