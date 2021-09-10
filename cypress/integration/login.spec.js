/// <reference types = "Cypress" />

import{ visit, validaTexto, validaUrl, clicar, digitar }from "../actions/principal.action";
import loginPage from '../page/login.page'

describe('testes de login', ()=>{
    const login = {
        user: 'misael@qa.com.br',
        password: 'teste'
    }
    beforeEach(()=>{
        visit()
    })

    it('valida página de login', ()=>{
        cy.login(login.user, login.password)
        validaUrl('https://front.serverest.dev/login')
    })

    it('valida login sucesso', ()=>{
        cy.login(login.user, login.password)
        validaUrl('https://front.serverest.dev/admin/home')
    })

    it('valida email incorreto', ()=>{
        cy.login('misael@qc.com.br', login.password)
        validaTexto(loginPage.textAlert, 'Email e/ou senha inválidos')
    })

    it('valida senha incorreta', ()=>{
        cy.login(login.user, 'testing')
        validaTexto(loginPage.textAlert, 'Email e/ou senha inválidos')
    })

    it('valida logout sucesso', ()=>{
        cy.login(login.user, login.password)
        validaUrl('https://front.serverest.dev/admin/home')
        clicar(loginPage.btnSair)
        validaUrl('https://front.serverest.dev/login')
    })

    it('valida login sem senha', ()=>{
        digitar(loginPage.imputEmail,login.user)
        clicar(loginPage.btnEntrar)
        validaTexto(loginPage.textAlert, 'password não pode ficar em branco')
    })

    it('valida email invalido', ()=>{
        cy.login('m@m', login.password)
        validaTexto(loginPage.textAlert, 'email deve ser um email válido')
    })

    it('valida login sem email', ()=>{
        digitar(loginPage.imputSenha, 'teste')
        clicar(loginPage.btnEntrar)
        validaTexto(loginPage.textAlert, 'email não pode ficar em branco')
    })

    it('valida login sem email e senha', ()=>{
        clicar(loginPage.btnEntrar)
        validaTexto(loginPage.textAlertEmail, 'email não pode ficar em branco')
        validaTexto(loginPage.textAlertPassword, 'password não pode ficar em branco')
    })
})