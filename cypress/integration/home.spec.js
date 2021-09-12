/// <reference types = "Cypress" />

import{ visit, validaTexto, validaUrl, clicar, digitar }from "../actions/principal.action";
import loginPage from '../page/login.page'

describe('testes Home', ()=>{
    const login = {
        user: 'misael@gmail.com',
        password: 'teste'
    }

    beforeEach(()=>{
        visit()
    })

    it('valida home adm', ()=>{
        cy.createLoginAdm()
        cy.visit('admin/home')
        validaUrl('https://front.serverest.dev/admin/home')
    })

    it('valida home user', ()=>{
        cy.login(login.user, login.password)
        cy.visit('home')
        validaUrl('https://front.serverest.dev/home')
    })
})