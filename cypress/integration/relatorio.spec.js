/// <reference types = "Cypress" />

describe('Testes - relatório', ()=>{
  
    beforeEach(()=>{
        cy.createLoginAdm()
        cy.visit('admin/relatorios')
    })

    it('valida página de cadastro', ()=>{
        cy.url()
        .should(
            'be.equal',
            'https://front.serverest.dev/admin/relatorios'
        )
        cy.get('h1').should('have.text', 'Em construção aguarde')
    })
})