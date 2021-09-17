/// <reference types = "Cypress" />

import{ validaTexto, validaUrl, clicar, digitar }from "../actions/principal.action";
import listPage from '../page/list.page'
import homePage from '../page/home.page'

describe('Testes - Acessar lista de compra', ()=>{

    beforeEach(()=>{
        cy.createLoginUser()
        cy.visit('minhaListaDeProdutos')
    })

    it('Valida lista de compra', ()=>{
       validaTexto(listPage.textListaCompra, 'Lista de Compras')
       validaTexto(listPage.textCarrinhoVazio, 'Seu carrinho está vazio')
       validaUrl('https://front.serverest.dev/minhaListaDeProdutos')
    })

    it('Voltar para a home', ()=>{
        clicar(listPage.btnPaginaInicial)
        validaUrl('https://front.serverest.dev/home')
    })
})

describe('Testes - Acessar lista de compra com produto', ()=>{

    beforeEach(()=>{
        cy.createProduct()
        cy.createLoginUser()
        cy.visit('home')
        digitar(homePage.inputPesquisar, 'Teste Zael Uai')
        clicar(homePage.btnPesquisar)
    })

    it('Valida detalhes produto - voltar', ()=>{
        clicar(homePage.btnDetalhe)
        validaTexto(listPage.textListaCompra, 'Detalhes do produto')
        validaTexto(listPage.textNomeProduto, 'Teste Zael Uai')
        clicar(listPage.btnVoltar)
        validaUrl('https://front.serverest.dev/home')
    })

    it('Valida detalhes produto - adicionar lista', ()=>{
        clicar(homePage.btnDetalhe)
        validaTexto(listPage.textListaCompra, 'Detalhes do produto')
        validaTexto(listPage.textNomeProduto, 'Teste Zael Uai')
        clicar(listPage.btnAdicionarLista)
        validaUrl('https://front.serverest.dev/minhaListaDeProdutos')
        clicar(listPage.btnLimparLista)
        validaTexto(listPage.textCarrinhoVazio, 'Seu carrinho está vazio')
    })

    it('Valida detalhes produto - adicionar lista e carrinho', ()=>{
        clicar(homePage.btnDetalhe)
        validaTexto(listPage.textListaCompra, 'Detalhes do produto')
        validaTexto(listPage.textNomeProduto, 'Teste Zael Uai')
        clicar(listPage.btnAdicionarLista)
        validaUrl('https://front.serverest.dev/minhaListaDeProdutos')
        clicar(listPage.btnAdicionarCarrinho)
        validaUrl('https://front.serverest.dev/carrinho')
        validaTexto(listPage.textListaCompra, 'Em construção aguarde')
    })

    it('Valida detalhes produto - Adicionar produtos', ()=>{
        clicar(homePage.btnDetalhe)
        validaTexto(listPage.textListaCompra, 'Detalhes do produto')
        validaTexto(listPage.textNomeProduto, 'Teste Zael Uai')
        clicar(listPage.btnAdicionarLista)
        clicar(listPage.btnAdicionarMais)
        validaTexto(listPage.textQtdItem,2)
        validaUrl('https://front.serverest.dev/minhaListaDeProdutos')
    })


    it('Valida detalhes produto - Remover produtos', ()=>{
        clicar(homePage.btnDetalhe)
        validaTexto(listPage.textListaCompra, 'Detalhes do produto')
        validaTexto(listPage.textNomeProduto, 'Teste Zael Uai')
        clicar(listPage.btnAdicionarLista)
        clicar(listPage.btnAdicionarMais)
        validaTexto(listPage.textQtdItem,2)
        clicar(listPage.btnRemover)
        validaTexto(listPage.textQtdItem,1)
        validaUrl('https://front.serverest.dev/minhaListaDeProdutos')
    })

    it('Valida detalhes produto - Adicionar Lista', ()=>{
        clicar(listPage.btnAdicionarLista)
        validaUrl('https://front.serverest.dev/minhaListaDeProdutos')
    })
})