/// <reference types = "Cypress" />

import product from '../page/product.page'
import loginPage from '../page/login.page'
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
        cy.get(product.btnImagem).as('fileInput').attachFile('cy.png')
        digitar(product.inputNome, prod.nome)
        digitar(product.inputDescricao, prod.descricao)
        digitar(product.inputPreco, prod.preco)
        digitar(product.inputQuantidade, prod.quantidade)
        clicar(product.btnCadastrar)
        validaUrl('https://front.serverest.dev/admin/listarprodutos')
    })

    it('Cadastrar produto sem nome', ()=>{
        digitar(product.inputDescricao, prod.descricao)
        digitar(product.inputPreco, prod.preco)
        digitar(product.inputQuantidade, prod.quantidade)
        clicar(product.btnCadastrar)
        validaTexto(loginPage.textAlert, 'nome não pode ficar em branco')
    })

    it('Cadastrar produto sem descrição', ()=>{
        digitar(product.inputNome, prod.nome)
        digitar(product.inputPreco, prod.preco)
        digitar(product.inputQuantidade, prod.quantidade)
        clicar(product.btnCadastrar)
        validaTexto(loginPage.textAlert, 'descricao não pode ficar em branco')
    })

    it('Cadastrar produto sem preço', ()=>{
        digitar(product.inputDescricao, prod.descricao)
        digitar(product.inputNome, prod.nome)
        digitar(product.inputQuantidade, prod.quantidade)
        clicar(product.btnCadastrar)
        validaTexto(loginPage.textAlert, 'preco deve ser um número')
    })

    it('Cadastrar produto tipo de preço incorreto', ()=>{
        digitar(product.inputPreco, 'a')
        digitar(product.inputDescricao, prod.descricao)
        digitar(product.inputNome, prod.nome)
        digitar(product.inputQuantidade, prod.quantidade)
        clicar(product.btnCadastrar)
        validaTexto(loginPage.textAlert, 'preco deve ser um número')
    })

    it('Cadastrar produto sem quantidade', ()=>{
        digitar(product.inputPreco, prod.preco)
        digitar(product.inputDescricao, prod.descricao)
        digitar(product.inputNome, prod.nome)
        clicar(product.btnCadastrar)
        validaTexto(loginPage.textAlert, 'quantidade deve ser um número')
    })

    it('Cadastrar produtos - campos obrigatórios', ()=>{
        clicar(product.btnCadastrar)
        validaTexto(loginPage.textAlertEmail, 'quantidade deve ser um número')
        validaTexto(loginPage.textAlertnomeAdmin, 'nome não pode ficar em branco')
        validaTexto(loginPage.textAlertPasswordAdmin, 'descricao não pode ficar em branco')
        validaTexto(loginPage.textAlertEmailAdmin, 'preco deve ser um número')
    })
})

describe('Testes - Excluir produtos', ()=>{
  
    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/listarprodutos')
    })

    it('valida página de listagem', ()=>{
        validaUrl('https://front.serverest.dev/admin/listarprodutos')
        validaTexto(product.textProduto, 'Lista dos Produtos')
    })

    it('excluir produto', ()=>{
        clicar(product.btnExcluirPrimeiroProduto)
    })

    describe('Testes - Editar produtos', ()=>{

        //funcionalidade não desenvolvida
        beforeEach(()=>{
            cy.createLoginAdm()
            cy.visit('admin/listarprodutos')
        })

    })
})