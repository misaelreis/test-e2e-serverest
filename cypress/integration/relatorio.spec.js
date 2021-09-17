/// <reference types = "Cypress" />

import product from '../page/product.page'
const faker = require('faker')

import{ validaTexto, validaUrl }from "../actions/principal.action";

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