/// <reference types = "Cypress" />

import product from '../page/product.page'
import loginPage from '../page/login.page'
const faker = require('faker')

import{ visit, validaTexto, validaUrl, clicar, digitar, validaElementoVisivel }from "../actions/principal.action";

describe('Testes - relatório', ()=>{
  
    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/relatorios')
    })

    it('valida página de cadastro', ()=>{
        validaUrl('https://front.serverest.dev/admin/relatorios')
        validaTexto(product.textProduto, 'Em construção aguarde')
    })
})