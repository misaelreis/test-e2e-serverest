/// <reference types = "Cypress" />
const baseUrl = Cypress.config('baseUrl')

describe('Testes - relatório', ()=>{
  
    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/relatorios')
    })

    it('valida página de cadastro', ()=>{
        cy.url().should('be.equal',`${baseUrl}admin/relatorios`)
        cy.contains('h1', 'Em construção aguarde').should('be.visible')
    })
})