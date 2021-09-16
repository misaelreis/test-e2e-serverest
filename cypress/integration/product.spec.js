/// <reference types = "Cypress" />

import product from '../page/product.page'
const faker = require('faker')

import{ visit, validaTexto, validaUrl, clicar, digitar, validaElementoVisivel }from "../actions/principal.action";

describe('Testes - Cadastro de produtos', ()=>{
    const prod = {
        nome: faker.name.firstName(),
        preco: 10,
        descricao : faker.internet.email(),
        quantidade: 10,
    }
  
    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/cadastrarprodutos')
    })

    it('valida página de cadastro', ()=>{
        validaUrl('https://front.serverest.dev/admin/cadastrarprodutos')
        validaTexto(product.textProduto, 'Cadastro de Produtos')
    })

    it('Cadastrar produto com sucesso', ()=>{
        digitar(product.inputNome, prod.nome)
        digitar(product.inputDescricao, prod.descricao)
        digitar(product.inputPreco, prod.preco)
        digitar(product.inputQuantidade, prod.quantidade)
        clicar(product.btnCadastrar)
        validaUrl('https://front.serverest.dev/admin/listarprodutos')
    })
})