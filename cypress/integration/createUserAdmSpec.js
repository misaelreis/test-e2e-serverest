/// <reference types = "Cypress" />

import createUser from '../page/createUser.page'
const faker = require('faker')

import{ visit, validaTexto, validaUrl, clicar, digitar, validaElementoVisivel }from "../actions/principal.action";
import userPage from '../page/createUser.page'
import login from '../page/login.page';

describe('Testes - Cadastro de usuário Adm', ()=>{
    const user = {
        name: faker.name.firstName(),
        email : faker.internet.email(),
        password: 'teste'
    }

    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/cadastrarusuarios')
    })

    it('valida página de cadastro', ()=>{
        validaUrl('https://front.serverest.dev/admin/cadastrarusuarios')
    })

    it('valida cadastro usuário adm sucesso', ()=>{
        user.email = faker.internet.email()
        cy.createUserAdminAdm(user.name, user.email, user.password)
        validaUrl('https://front.serverest.dev/admin/listarusuarios')
    })

    it('valida cadastro usuário sucesso', ()=>{
        user.email = faker.internet.email()
        cy.createAdminUser(user.name, user.email, user.password)
        validaUrl('https://front.serverest.dev/admin/listarusuarios')
    })

    it('valida cadastro sem senha', ()=>{
        cy.get(createUser.imputNome).type(user.name)
        cy.get(createUser.imputEmail).type(user.email)
        cy.get(createUser.btnCadastrarAdmin).click()
        validaTexto(login.textAlert, 'password não pode ficar em branco')
    })

    it('valida email invalido', ()=>{
        cy.get(createUser.imputNome).type('Maria')
        cy.get(createUser.imputEmail).type('m@m')
        cy.get(createUser.imputSenha).type('teste')
        cy.get(createUser.btnCadastrarAdmin).click()
        validaTexto(login.textAlert, 'email deve ser um email válido')
    })

    it('valida cadastro sem email', ()=>{
        cy.get(createUser.imputNome).type('Maria')
        cy.get(createUser.imputSenha).type('teste')
        cy.get(createUser.btnCadastrarAdmin).click()
        validaTexto(login.textAlert, 'email não pode ficar em branco')
    })


    it('valida sem nome', ()=>{
        cy.get(createUser.imputEmail).type('misael@email.com')
        cy.get(createUser.imputSenha).type('teste')
        cy.get(createUser.btnCadastrarAdmin).click()
        validaTexto(login.textAlert, 'nome não pode ficar em branco')
    })

    it('valida cadastro sem email, senha e nome', ()=>{
        cy.get(createUser.btnCadastrarAdmin).click()
        validaTexto(login.textAlertEmailAdmin, 'email não pode ficar em branco')
        validaTexto(login.textAlertPasswordAdmin, 'password não pode ficar em branco')
        validaTexto(login.textAlertnomeAdmin, 'nome não pode ficar em branco')
    })
})